'use client';

import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import { editDocumentApi } from './api.editDoc';
import LoadingModal from '@/components/common/LoadingModal';
import toast from 'react-hot-toast';
import {
  CloudUpload,
  FileText,
  X,
  Type,
  Download,
  Trash2,
  Palette,
  ChevronLeft,
  ChevronRight,
  Move,
  Eraser,
  Bold,
  Italic,
  Settings2,
  Undo2,
  Redo2,
  Edit2,
  ZoomIn,
  ZoomOut,
  MousePointer2,
  Underline
} from 'lucide-react';
import { FileItem, TextModification } from './type.editDoc';
import dynamic from 'next/dynamic';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const Document = dynamic(() => import('react-pdf').then(mod => mod.Document), { ssr: false });
const Page = dynamic(() => import('react-pdf').then(mod => mod.Page), { ssr: false });

const COLORS = ['#000000', '#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#6366F1'];

export default function EditPdf() {
  const [file, setFile] = useState<FileItem | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfScale, setPdfScale] = useState(1.2);

  const [modifications, setModifications] = useState<TextModification[]>([]);
  const [selectedModId, setSelectedModId] = useState<string | null>(null);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [toolMode, setToolMode] = useState<'select' | 'text' | 'erase' | 'edit-text'>('edit-text');

  // History for Undo/Redo
  const [history, setHistory] = useState<TextModification[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const pushToHistory = (newMods: TextModification[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newMods);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    setHistoryIndex((prev) => {
      if (prev > 0) {
        setModifications(history[prev - 1]);
        return prev - 1;
      }
      return prev;
    });
    setSelectedModId(null);
  };

  const redo = () => {
    setHistoryIndex((prev) => {
      if (prev < history.length - 1) {
        setModifications(history[prev + 1]);
        return prev + 1;
      }
      return prev;
    });
    setSelectedModId(null);
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z') {
          e.preventDefault();
          undo();
        } else if (e.key === 'y') {
          e.preventDefault();
          redo();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [history, historyIndex]);

  // Active Dragging State
  const [dragState, setDragState] = useState<{ id: string, startX: number, startY: number, startRatioX: number, startRatioY: number, isResizing?: boolean } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const lastTapRef = useRef<{ id: string, time: number }>({ id: '', time: 0 });

  // Ctrl + Mouse Wheel Zoom
  useEffect(() => {
    const container = outerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault(); // Prevent browser zoom
        const zoomSensitivity = 0.002;
        const delta = -e.deltaY * zoomSensitivity;

        React.startTransition(() => {
          setPdfScale(p => Math.max(0.4, Math.min(3, p + delta)));
        });
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    import('react-pdf').then(({ pdfjs }) => {
      pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
    });
  }, []);

  const onDocumentLoadSuccess = (pdf: any) => {
    setNumPages(pdf.numPages);
    setCurrentPage(1);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const processSelectedFile = (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      toast.error('Please upload a valid PDF file.');
      return;
    }

    if (selectedFile.size > 50 * 1024 * 1024) {
      toast.error(`File is too large. Max limit is 50MB`);
      return;
    }

    const newItem: FileItem = {
      id: crypto.randomUUID(),
      file: selectedFile,
      previewUrl: URL.createObjectURL(selectedFile),
      status: 'pending',
      progress: 0
    };

    setFile(newItem);
    setModifications([]);
    setToolMode('edit-text');
    setSelectedModId(null);
  };

  const removeFile = () => {
    if (file?.previewUrl) URL.revokeObjectURL(file.previewUrl);
    setFile(null);
    setModifications([]);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (toolMode === 'select') {
      // If clicking on empty space in select mode, deselect
      setSelectedModId(null);
      return;
    }

    if (toolMode === 'text') {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ratioX = x / rect.width;
      const ratioY = y / rect.height;

      const newMod: TextModification = {
        id: crypto.randomUUID(),
        type: 'text',
        pageIndex: currentPage - 1,
        text: 'Double click to edit',
        ratioX,
        ratioY,
        size: 16,
        color: '#000000'
      };

      const newMods = [...modifications, newMod];
      setModifications(newMods);
      pushToHistory(newMods);
      setSelectedModId(newMod.id);
      setEditingTextId(newMod.id);
      setToolMode('select'); // Switch back to select mode automatically
    }

    if (toolMode === 'edit-text') {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'span' && target.closest('.react-pdf__Page__textContent')) {
        const text = target.textContent || '';
        const rect = target.getBoundingClientRect();
        const containerRect = e.currentTarget.getBoundingClientRect();

        const ratioX = (rect.left - containerRect.left) / containerRect.width;
        const ratioY = (rect.top - containerRect.top) / containerRect.height;
        const widthRatio = rect.width / containerRect.width;
        const heightRatio = rect.height / containerRect.height;

        const computedStyle = window.getComputedStyle(target);
        const fontSizePx = parseFloat(computedStyle.fontSize) || 16;
        const size = fontSizePx / pdfScale;

        let textColor = '#000000';
        const rgbColor = computedStyle.color;
        if (rgbColor && rgbColor.startsWith('rgb')) {
          const match = rgbColor.match(/\d+/g);
          if (match && match.length >= 3) {
            textColor = "#" + ("000000" + ((1 << 24) + (parseInt(match[0]) << 16) + (parseInt(match[1]) << 8) + parseInt(match[2])).toString(16)).slice(-6);
          }
        }

        let fontFamily = 'Helvetica';
        const rawFont = (computedStyle.fontFamily || '').toLowerCase();
        if (rawFont.includes('times')) {
          fontFamily = 'TimesRoman';
        } else if (rawFont.includes('courier')) {
          fontFamily = 'Courier';
        }

        const isBold = computedStyle.fontWeight === 'bold' || parseInt(computedStyle.fontWeight || '400') >= 600;
        const isItalic = computedStyle.fontStyle === 'italic' || computedStyle.fontStyle === 'oblique';

        let autoColor = '#ffffff';
        const canvas = target.closest('.react-pdf__Page')?.querySelector('canvas');
        if (canvas) {
          try {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              const canvasRect = canvas.getBoundingClientRect();
              const scaleX = canvas.width / canvasRect.width;
              const scaleY = canvas.height / canvasRect.height;
              // Sample a pixel slightly to the left and top of the text to get the background color
              const sampleX = Math.max(0, (rect.left - canvasRect.left - 4) * scaleX);
              const sampleY = Math.max(0, (rect.top - canvasRect.top + rect.height / 2) * scaleY); // middle-left
              const pixel = ctx.getImageData(sampleX, sampleY, 1, 1).data;
              autoColor = "#" + ("000000" + ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16)).slice(-6);
            }
          } catch (e) {
            console.warn('Could not auto-detect background color', e);
          }
        }

        const eraseMod: TextModification = {
          id: crypto.randomUUID(),
          type: 'erase',
          pageIndex: currentPage - 1,
          text: '',
          ratioX: Math.max(0, ratioX - 0.002),
          ratioY: Math.max(0, ratioY - 0.002),
          widthRatio: widthRatio + 0.004,
          heightRatio: heightRatio + 0.004,
          size: 16,
          color: autoColor
        };

        const textMod: TextModification = {
          id: crypto.randomUUID(),
          type: 'text',
          pageIndex: currentPage - 1,
          text: text,
          ratioX: ratioX,
          ratioY: ratioY,
          size: size,
          color: textColor,
          fontFamily: fontFamily,
          isBold: isBold,
          isItalic: isItalic
        };

        const newMods = [...modifications, eraseMod, textMod];
        setModifications(newMods);
        pushToHistory(newMods);
        setSelectedModId(textMod.id);
        setEditingTextId(textMod.id);
        setToolMode('select');
      }
    }
  };

  const handleContainerPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (toolMode === 'erase') {
      e.preventDefault();
      // Make sure we are clicking on the container, not on an existing modification
      if ((e.target as HTMLElement).closest('.modification-item')) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ratioX = x / rect.width;
      const ratioY = y / rect.height;

      const newMod: TextModification = {
        id: crypto.randomUUID(),
        type: 'erase',
        pageIndex: currentPage - 1,
        text: '',
        ratioX,
        ratioY,
        widthRatio: 0,
        heightRatio: 0,
        size: 16,
        color: '#ffffff'
      };

      const newMods = [...modifications, newMod];
      setModifications(newMods);
      pushToHistory(newMods);
      setSelectedModId(newMod.id);

      setDragState({
        id: newMod.id,
        startX: e.clientX,
        startY: e.clientY,
        startRatioX: ratioX,
        startRatioY: ratioY,
        isResizing: true
      });

      e.currentTarget.setPointerCapture(e.pointerId);
    }
  };

  const handleModChange = (id: string, updates: Partial<TextModification>) => {
    setModifications(prev => prev.map(mod => mod.id === id ? { ...mod, ...updates } : mod));
  };

  const handleModChangeCommit = (id: string, updates: Partial<TextModification>) => {
    const newMods = modifications.map(mod => mod.id === id ? { ...mod, ...updates } : mod);
    setModifications(newMods);
    pushToHistory(newMods);
  };

  const handleModDelete = (id: string) => {
    const newMods = modifications.filter(mod => mod.id !== id);
    setModifications(newMods);
    pushToHistory(newMods);
    setSelectedModId(null);
    setEditingTextId(null);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, mod: TextModification) => {
    if (toolMode !== 'select') return;
    e.stopPropagation();
    setSelectedModId(mod.id);

    setDragState({
      id: mod.id,
      startX: e.clientX,
      startY: e.clientY,
      startRatioX: mod.ratioX,
      startRatioY: mod.ratioY
    });

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const dx = e.clientX - dragState.startX;
    const dy = e.clientY - dragState.startY;

    const dRatioX = dx / rect.width;
    const dRatioY = dy / rect.height;

    if (dragState.isResizing) {
      const w = Math.abs(dRatioX);
      const h = Math.abs(dRatioY);
      const rx = dRatioX < 0 ? dragState.startRatioX + dRatioX : dragState.startRatioX;
      const ry = dRatioY < 0 ? dragState.startRatioY + dRatioY : dragState.startRatioY;

      handleModChange(dragState.id, {
        ratioX: Math.max(0, Math.min(1, rx)),
        ratioY: Math.max(0, Math.min(1, ry)),
        widthRatio: w,
        heightRatio: h
      });
    } else {
      handleModChange(dragState.id, {
        ratioX: Math.max(0, Math.min(1, dragState.startRatioX + dRatioX)),
        ratioY: Math.max(0, Math.min(1, dragState.startRatioY + dRatioY))
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragState) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      const mod = modifications.find(m => m.id === dragState.id);

      // If it's a new erase box but the user didn't drag to give it a size, remove it
      if (mod && mod.type === 'erase' && dragState.isResizing && (!mod.widthRatio || mod.widthRatio < 0.005 || !mod.heightRatio || mod.heightRatio < 0.005)) {
        handleModDelete(mod.id);
      } else {
        pushToHistory(modifications);
      }

      setDragState(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    try {
      setIsProcessing(true);
      const resultBlob = await editDocumentApi(
        file.file,
        modifications,
        (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setFile(f => f ? { ...f, progress } : null);
          }
        }
      );

      const url = URL.createObjectURL(resultBlob);
      setFile(f => f ? { ...f, status: 'done', resultUrl: url, progress: 100 } : null);
      toast.success('Document edited successfully!');

      const a = document.createElement('a');
      a.href = url;
      a.download = `docviahub-edited-${file.file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

    } catch (error: any) {
      toast.error(error.message || 'Error processing document');
      setFile(f => f ? { ...f, status: 'error', error: error.message } : null);
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedMod = modifications.find(m => m.id === selectedModId);

  return (
    <div ref={outerRef} className="w-full max-w-[1400px] min-w-0 mx-auto px-4 md:px-6 py-8 overflow-hidden lg:overflow-visible">
      <div className="relative flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="w-full md:w-1/3"></div>
        <div className="text-center w-full md:w-1/3">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Edit PDF
          </h1>
          <p className="text-base text-slate-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Add text, annotations and fill out forms securely in your browser.
          </p>
        </div>
        <div className="w-full md:w-1/3 flex justify-end">
          {file && (
            <button
              onClick={handleSubmit}
              disabled={isProcessing || modifications.length === 0}
              className="py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-800 text-white rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg disabled:shadow-none flex items-center justify-center gap-2"
            >
              <Download size={18} />
              {isProcessing ? 'Processing...' : 'Export Edited PDF'}
            </button>
          )}
        </div>
      </div>

      {!file ? (
        <div className="max-w-3xl mx-auto mt-10">
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="group relative flex flex-col items-center justify-center w-full h-80 border-2 border-dashed rounded-3xl transition-all duration-300 bg-slate-50 dark:bg-gray-800/50 border-blue-200 dark:border-gray-700 hover:bg-blue-50/50 dark:hover:bg-gray-800 hover:border-blue-400 cursor-pointer overflow-hidden shadow-sm hover:shadow-md"
          >
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              accept=".pdf,application/pdf"
              onChange={handleFileSelect}
              ref={fileInputRef}
            />
            <div className="flex flex-col items-center justify-center p-6 text-center z-0 pointer-events-none">
              <div className="w-20 h-20 mb-6 rounded-full bg-blue-100 dark:bg-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                <CloudUpload className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                Choose a PDF file
              </h3>
              <p className="text-sm text-slate-500 dark:text-gray-400 mb-6">
                or drag & drop your file here
              </p>
              <button suppressHydrationWarning className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-colors pointer-events-none">
                Select file
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_288px] gap-6 lg:h-[800px] w-full min-w-0">
          <div className="min-w-0 rounded-2xl border border-slate-200 dark:border-gray-800 overflow-hidden flex flex-col shadow-sm bg-slate-50 dark:bg-gray-950 relative">

            {/* Floating Glassmorphism Toolbar */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 p-2 bg-white/70 dark:bg-gray-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-gray-700/50 rounded-2xl shadow-2xl">

              {/* File Info */}
              <div className="flex items-center gap-3 px-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-slate-800 dark:text-gray-200 truncate max-w-[150px]" title={file.file.name}>
                  {file.file.name}
                </span>
                <button
                  onClick={removeFile}
                  className="p-1 hover:bg-slate-200/50 dark:hover:bg-gray-700/50 rounded-full text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="w-px h-6 bg-slate-300 dark:bg-gray-700 mx-1"></div>

              {/* Tools */}
              <div className="flex items-center gap-1">
                {/* <button
                  onClick={() => { setToolMode('select'); setSelectedModId(null); }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-95 ${toolMode === 'select' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-gray-300 hover:bg-slate-200/50 dark:hover:bg-gray-800/50'}`}
                >
                  <MousePointer2 size={14} />
                  Select
                </button> */}
                <button
                  onClick={() => setToolMode('text')}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-95 ${toolMode === 'text' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-gray-300 hover:bg-slate-200/50 dark:hover:bg-gray-800/50'}`}
                >
                  <Type size={14} />
                  Text
                </button>
                <button
                  onClick={() => setToolMode('erase')}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-95 ${toolMode === 'erase' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-gray-300 hover:bg-slate-200/50 dark:hover:bg-gray-800/50'}`}
                  title="Whiteout / Erase Text"
                >
                  <Eraser size={14} />
                  Erase
                </button>
                <div className="w-px h-4 bg-slate-300 dark:bg-gray-700 mx-1"></div>
                <button
                  onClick={() => setToolMode('edit-text')}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-95 ${toolMode === 'edit-text' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-gray-300 hover:bg-slate-200/50 dark:hover:bg-gray-800/50'}`}
                  title="Edit existing PDF text"
                >
                  <Edit2 size={14} />
                  Edit
                </button>
              </div>

              <div className="w-px h-6 bg-slate-300 dark:bg-gray-700 mx-1"></div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <button
                  onClick={undo}
                  disabled={historyIndex === 0}
                  className="p-2 rounded-xl text-slate-500 hover:bg-slate-200/50 dark:hover:bg-gray-800/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                  title="Undo (Ctrl+Z)"
                >
                  <Undo2 size={16} />
                </button>
                <button
                  onClick={redo}
                  disabled={historyIndex === history.length - 1}
                  className="p-2 rounded-xl text-slate-500 hover:bg-slate-200/50 dark:hover:bg-gray-800/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                  title="Redo (Ctrl+Y)"
                >
                  <Redo2 size={16} />
                </button>
              </div>

              <div className="w-px h-6 bg-slate-300 dark:bg-gray-700 mx-1"></div>

              {/* Zoom & Navigation */}
              <div className="flex items-center gap-1 pr-2">
                <button
                  onClick={() => setPdfScale(p => Math.max(0.4, p - 0.2))}
                  className="p-2 rounded-xl text-slate-500 hover:bg-slate-200/50 dark:hover:bg-gray-800/50 transition-all active:scale-95"
                  title="Zoom Out"
                >
                  <ZoomOut size={16} />
                </button>
                <span className="text-xs font-medium text-slate-600 dark:text-gray-400 w-10 text-center select-none">
                  {Math.round(pdfScale * 100)}%
                </span>
                <button
                  onClick={() => setPdfScale(p => Math.min(3, p + 0.2))}
                  className="p-2 rounded-xl text-slate-500 hover:bg-slate-200/50 dark:hover:bg-gray-800/50 transition-all active:scale-95"
                  title="Zoom In"
                >
                  <ZoomIn size={16} />
                </button>

                <div className="w-px h-4 bg-slate-300 dark:bg-gray-700 mx-1"></div>

                <button
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="p-1.5 rounded-xl text-slate-500 hover:bg-slate-200/50 dark:hover:bg-gray-800/50 disabled:opacity-30 transition-all active:scale-95"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-xs text-slate-600 dark:text-gray-400 min-w-[3rem] text-center">
                  {currentPage}/{numPages || '-'}
                </span>
                <button
                  disabled={!numPages || currentPage >= numPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="p-1.5 rounded-xl text-slate-500 hover:bg-slate-200/50 dark:hover:bg-gray-800/50 disabled:opacity-30 transition-all active:scale-95"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto min-w-0 min-h-0 relative bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:24px_24px]">
              <div className="min-w-full min-h-full flex items-start justify-center p-6 pt-28 w-fit">
                <div
                  ref={containerRef}
                  className={`relative shadow-2xl ring-1 ring-black/5 dark:ring-white/10 transition-all ${toolMode === 'edit-text' ? '[&_.react-pdf__Page__textContent]:pointer-events-auto [&_.react-pdf__Page__textContent_span]:cursor-text [&_.react-pdf__Page__textContent_span]:hover:bg-blue-500/20' : ''} ${toolMode !== 'select' ? 'cursor-crosshair [&_.modification-item]:pointer-events-none [&_textarea]:pointer-events-auto' : 'cursor-default'}`}
                  onClick={handleCanvasClick}
                  onPointerDown={handleContainerPointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                >
                  {file.previewUrl && (
                    <Document
                      file={file.previewUrl}
                      onLoadSuccess={onDocumentLoadSuccess}
                      loading={<div className="p-8 text-slate-500">Loading PDF...</div>}
                    >
                      <Page
                        key={`page_${currentPage}_${pdfScale}`}
                        pageNumber={currentPage}
                        scale={pdfScale}
                        renderTextLayer={true}
                        renderAnnotationLayer={false}
                        className="bg-white"
                      />
                    </Document>
                  )}

                  {containerRef.current && modifications.filter(m => m.pageIndex === currentPage - 1).map((mod) => {
                    if (mod.type === 'erase') {
                      return (
                        <div
                          key={mod.id}
                          className={`absolute modification-item border-2 ${selectedModId === mod.id ? 'border-blue-500 border-dashed' : 'border-gray-300 border-dashed hover:border-blue-400'}`}
                          style={{
                            left: `${mod.ratioX * 100}%`,
                            top: `${mod.ratioY * 100}%`,
                            width: `${(mod.widthRatio || 0) * 100}%`,
                            height: `${(mod.heightRatio || 0) * 100}%`,
                            backgroundColor: mod.color,
                            zIndex: selectedModId === mod.id ? 20 : 10
                          }}
                          onClick={(e) => { e.stopPropagation(); setSelectedModId(mod.id); }}
                        >
                          {selectedModId === mod.id && toolMode === 'select' && (
                            <div
                              className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white rounded p-1.5 cursor-move shadow-md hover:bg-blue-700 transition-colors z-20"
                              onPointerDown={(e) => handlePointerDown(e, mod)}
                            >
                              <Move size={16} />
                            </div>
                          )}
                          {selectedModId === mod.id && toolMode === 'select' && (
                            <div
                              className="absolute -bottom-2 -right-2 w-4 h-4 bg-white border-2 border-blue-600 rounded-full cursor-se-resize z-20"
                              onPointerDown={(e) => {
                                e.stopPropagation();
                                setDragState({
                                  id: mod.id,
                                  startX: e.clientX - (mod.widthRatio || 0) * containerRef.current!.getBoundingClientRect().width,
                                  startY: e.clientY - (mod.heightRatio || 0) * containerRef.current!.getBoundingClientRect().height,
                                  startRatioX: mod.ratioX,
                                  startRatioY: mod.ratioY,
                                  isResizing: true
                                });
                                e.currentTarget.setPointerCapture(e.pointerId);
                              }}
                            ></div>
                          )}
                        </div>
                      );
                    }

                    const isEditing = editingTextId === mod.id;

                    return (
                      <div
                        key={mod.id}
                        className={`absolute modification-item group ${selectedModId === mod.id ? 'ring-2 ring-blue-500 ring-dashed bg-white/10' : 'ring-2 ring-transparent hover:ring-gray-300 hover:ring-dashed'} ${!isEditing ? 'cursor-move' : ''}`}
                        style={{
                          left: `${mod.ratioX * 100}%`,
                          top: `${mod.ratioY * 100}%`,
                          fontSize: `${mod.size * pdfScale}px`,
                          color: mod.color,
                          fontFamily: mod.fontFamily === 'TimesRoman' ? '"Times New Roman", Times, serif' : mod.fontFamily === 'Courier' ? '"Courier New", Courier, monospace' : mod.fontFamily === 'Helvetica' ? 'Arial, Helvetica, sans-serif' : `"${mod.fontFamily}", sans-serif`,
                          fontWeight: mod.isBold ? 'bold' : 'normal',
                          fontStyle: mod.isItalic ? 'italic' : 'normal',
                          zIndex: selectedModId === mod.id ? 20 : 10
                        }}
                        onPointerDown={(e) => {
                          if (!isEditing) {
                            e.stopPropagation();

                            const now = Date.now();
                            if (lastTapRef.current.id === mod.id && now - lastTapRef.current.time < 600) {
                              // Double tap detected
                              setEditingTextId(mod.id);
                              lastTapRef.current = { id: '', time: 0 };
                              return;
                            }
                            lastTapRef.current = { id: mod.id, time: now };

                            setSelectedModId(mod.id);
                            handlePointerDown(e, mod);
                          }
                        }}
                        onClick={(e) => e.stopPropagation()}
                        onDoubleClick={(e) => {
                          e.stopPropagation();
                          setEditingTextId(mod.id);
                        }}
                      >
                        {/* Floating Toolbar */}
                        {selectedModId === mod.id && toolMode === 'select' && (
                          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 flex items-center bg-blue-600 text-white rounded shadow-md z-20">
                            <div
                              className="p-1.5 cursor-move hover:bg-blue-700 transition-colors rounded-l"
                              onPointerDown={(e) => {
                                if (isEditing) e.stopPropagation();
                                handlePointerDown(e, mod);
                              }}
                              title="Drag to move"
                            >
                              <Move size={16} />
                            </div>
                            {!isEditing && (
                              <button
                                className="p-1.5 cursor-pointer hover:bg-blue-700 transition-colors border-l border-blue-500 flex items-center gap-1 px-2 text-sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingTextId(mod.id);
                                }}
                                title="Edit text"
                              >
                                <Edit2 size={14} />
                                Edit
                              </button>
                            )}
                            <button
                              className="p-1.5 cursor-pointer hover:bg-red-500 transition-colors rounded-r border-l border-blue-500 flex items-center gap-1 px-2 text-sm text-white"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleModDelete(mod.id);
                              }}
                              title="Delete text"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}

                        {isEditing ? (
                          <textarea
                            autoFocus
                            value={mod.text}
                            onChange={(e) => handleModChange(mod.id, { text: e.target.value })}
                            onBlur={(e) => {
                              handleModChangeCommit(mod.id, { text: e.target.value });
                              setEditingTextId(null);
                            }}
                            onFocus={(e) => {
                              if (e.target.value === 'Double click to edit') {
                                e.target.select();
                              } else {
                                const len = e.target.value.length;
                                e.target.setSelectionRange(len, len);
                              }
                            }}
                            className="bg-transparent ring-1 ring-blue-500 outline-none resize-none cursor-text shadow-sm rounded-sm whitespace-pre overflow-hidden block leading-none"
                            style={{
                              color: mod.color,
                              height: `${Math.max(1, (mod.text || ' ').split('\n').length)}em`,
                              minWidth: '100px',
                              width: `${Math.max(10, Math.max(...(mod.text || ' ').split('\n').map(l => l.length)) + 2)}ch`,
                              fontFamily: mod.fontFamily === 'TimesRoman' ? '"Times New Roman", Times, serif' : mod.fontFamily === 'Courier' ? 'Courier, monospace' : mod.fontFamily === 'Helvetica' ? 'Helvetica, Arial, sans-serif' : `"${mod.fontFamily}", sans-serif`,
                              fontWeight: mod.isBold ? 'bold' : 'normal',
                              fontStyle: mod.isItalic ? 'italic' : 'normal',
                              textDecoration: mod.isUnderline ? 'underline' : 'none'
                            }}
                          />
                        ) : (
                          <div className="whitespace-pre text-left min-w-[50px] leading-none" style={{ color: mod.color, fontFamily: mod.fontFamily === 'TimesRoman' ? '"Times New Roman", Times, serif' : mod.fontFamily === 'Courier' ? 'Courier, monospace' : mod.fontFamily === 'Helvetica' ? 'Helvetica, Arial, sans-serif' : `"${mod.fontFamily}", sans-serif`, fontWeight: mod.isBold ? 'bold' : 'normal', fontStyle: mod.isItalic ? 'italic' : 'normal', textDecoration: mod.isUnderline ? 'underline' : 'none' }}>
                            {mod.text || '\u00A0'}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Properties */}
          <div className="w-full flex flex-col gap-4 min-w-0">

            {/* Contextual Properties Panel */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-5 border border-slate-200 dark:border-gray-700 shadow-sm flex-1">
              <h3 className="font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-blue-500" />
                Properties
              </h3>

              {!selectedMod ? (
                <div className="flex flex-col items-center justify-center text-center h-48 opacity-60">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
                    <MousePointer2 className="w-6 h-6 text-slate-400 dark:text-gray-400" />
                  </div>
                  <p className="text-sm text-slate-500 dark:text-gray-400">
                    Select a text or eraser element<br />to edit its properties.
                  </p>
                </div>
              ) : selectedMod.type === 'erase' ? (
                <div className="space-y-6">
                  <div className="text-center text-slate-500 dark:text-gray-400 py-4 text-sm bg-slate-50 dark:bg-gray-900 rounded-lg border border-slate-100 dark:border-gray-800">
                    <Eraser className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    Whiteout Box<br />
                    <span className="text-xs opacity-75">Drag to move or resize on the canvas.</span>
                  </div>

                  {/* Colors */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
                      <Palette className="w-4 h-4 text-slate-500" />
                      Background Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={selectedMod.color || '#ffffff'}
                        onChange={(e) => handleModChange(selectedMod.id, { color: e.target.value })}
                        onBlur={(e) => handleModChangeCommit(selectedMod.id, { color: e.target.value })}
                        className="w-10 h-10 p-1 rounded cursor-pointer border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                        title="Pick background color"
                      />
                      <span className="text-xs text-slate-500">Tip: Use the eyedropper to match the PDF background!</span>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <div className="pt-4 border-t border-slate-100 dark:border-gray-700">
                    <button
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleModDelete(selectedMod.id);
                      }}
                      className="w-full py-2.5 flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors font-medium text-sm"
                    >
                      <Trash2 size={16} />
                      Remove Eraser
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Text Editor */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1.5">Text Content</label>
                    <textarea
                      value={selectedMod.text}
                      onChange={(e) => handleModChange(selectedMod.id, { text: e.target.value })}
                      onBlur={(e) => handleModChangeCommit(selectedMod.id, { text: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                      rows={3}
                    />
                  </div>

                  {/* Typography Options */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Font Family */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1.5">Font Family</label>
                      <select
                        value={selectedMod.fontFamily || 'Helvetica'}
                        onChange={(e) => handleModChangeCommit(selectedMod.id, { fontFamily: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                      >
                        <optgroup label="Standard">
                          <option value="Helvetica">Helvetica (Sans-Serif)</option>
                          <option value="TimesRoman">Times Roman (Serif)</option>
                          <option value="Courier">Courier (Monospace)</option>
                        </optgroup>
                        <optgroup label="Google Fonts (Sans-Serif)">
                          <option value="Roboto">Roboto</option>
                          <option value="Open Sans">Open Sans</option>
                          <option value="Lato">Lato</option>
                          <option value="Montserrat">Montserrat</option>
                          <option value="Poppins">Poppins</option>
                        </optgroup>
                        <optgroup label="Google Fonts (Serif)">
                          <option value="Merriweather">Merriweather</option>
                        </optgroup>
                        <optgroup label="Handwriting & Script">
                          <option value="Pacifico">Pacifico</option>
                          <option value="Indie Flower">Indie Flower</option>
                          <option value="Amatic SC">Amatic SC</option>
                          <option value="Great Vibes">Great Vibes</option>
                          <option value="Sacramento">Sacramento</option>
                          <option value="Lobster">Lobster</option>
                        </optgroup>
                      </select>
                    </div>

                    {/* Bold & Italic */}
                    <div className="col-span-2 flex gap-2">
                      <button
                        onPointerDown={(e) => {
                          e.preventDefault();
                          handleModChangeCommit(selectedMod.id, { isBold: !selectedMod.isBold });
                        }}
                        className={`flex-1 py-2 flex justify-center items-center rounded-lg border transition-colors ${selectedMod.isBold ? 'bg-slate-800 border-slate-800 text-white dark:bg-white dark:border-white dark:text-slate-900' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'}`}
                        title="Bold"
                      >
                        <Bold size={16} />
                      </button>
                      <button
                        onPointerDown={(e) => {
                          e.preventDefault();
                          handleModChangeCommit(selectedMod.id, { isItalic: !selectedMod.isItalic });
                        }}
                        className={`flex-1 py-2 flex justify-center items-center rounded-lg border transition-colors ${selectedMod.isItalic ? 'bg-slate-800 border-slate-800 text-white dark:bg-white dark:border-white dark:text-slate-900' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'}`}
                        title="Italic"
                      >
                        <Italic size={16} />
                      </button>
                      <button
                        onPointerDown={(e) => {
                          e.preventDefault();
                          handleModChangeCommit(selectedMod.id, { isUnderline: !selectedMod.isUnderline });
                        }}
                        className={`flex-1 py-2 flex justify-center items-center rounded-lg border transition-colors ${selectedMod.isUnderline ? 'bg-slate-800 border-slate-800 text-white dark:bg-white dark:border-white dark:text-slate-900' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'}`}
                        title="Underline"
                      >
                        <Underline size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Font Size */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Font Size</label>
                      <span className="text-xs font-mono text-slate-500">{selectedMod.size}px</span>
                    </div>
                    <input
                      type="range"
                      min="8"
                      max="72"
                      value={selectedMod.size}
                      onChange={(e) => handleModChange(selectedMod.id, { size: parseInt(e.target.value) })}
                      onMouseUp={(e) => handleModChangeCommit(selectedMod.id, { size: parseInt((e.target as HTMLInputElement).value) })}
                      onTouchEnd={(e) => handleModChangeCommit(selectedMod.id, { size: parseInt((e.target as HTMLInputElement).value) })}
                      className="w-full h-2 bg-slate-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  {/* Colors */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
                      <Palette className="w-4 h-4 text-slate-500" />
                      Text Color
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={selectedMod.color}
                        onChange={(e) => handleModChange(selectedMod.id, { color: e.target.value })}
                        onBlur={(e) => handleModChangeCommit(selectedMod.id, { color: e.target.value })}
                        className="w-10 h-10 p-1 rounded cursor-pointer border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                      />
                      <div className="flex flex-wrap gap-2 flex-1">
                        {COLORS.map(c => (
                          <button
                            key={c}
                            onClick={() => handleModChangeCommit(selectedMod.id, { color: c })}
                            className={`w-8 h-8 rounded-full border-2 transition-transform ${selectedMod.color === c ? 'border-slate-800 dark:border-white scale-110' : 'border-transparent hover:scale-105 shadow-sm'}`}
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {(() => {
                    const linkedErase = modifications.find(m => m.type === 'erase' && m.pageIndex === selectedMod.pageIndex && Math.abs(m.ratioX - selectedMod.ratioX) < 0.05 && Math.abs(m.ratioY - selectedMod.ratioY) < 0.05);
                    if (!linkedErase) return null;
                    return (
                      <div className="pt-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
                          <Palette className="w-4 h-4 text-slate-500" />
                          Whiteout Background Color
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={linkedErase.color === 'transparent' ? '#ffffff' : (linkedErase.color || '#ffffff')}
                            onChange={(e) => handleModChange(linkedErase.id, { color: e.target.value })}
                            onBlur={(e) => handleModChangeCommit(linkedErase.id, { color: e.target.value })}
                            className="w-10 h-10 p-1 rounded cursor-pointer border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                            title="Pick background color"
                          />
                          <button
                            onClick={() => handleModChangeCommit(linkedErase.id, { color: 'transparent' })}
                            className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${linkedErase.color === 'transparent' ? 'bg-slate-800 text-white border-slate-800' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                          >
                            Transparent
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                          Note: Making this transparent will reveal the original PDF text underneath. Use the color picker to match the PDF background instead if you want to hide the original text.
                        </p>
                      </div>
                    );
                  })()}

                  {/* Delete Button */}
                  <div className="pt-4 border-t border-slate-100 dark:border-gray-700">
                    <button
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleModDelete(selectedMod.id);
                      }}
                      className="w-full py-2.5 flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors font-medium text-sm"
                    >
                      <Trash2 size={16} />
                      Remove Text
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Loading Modal */}
      <LoadingModal
        isOpen={isProcessing}
        title="Processing Document"
        subtitle={`Applying ${modifications.length} modifications...`}
        progress={file?.progress}
      />
    </div>
  );
} 
