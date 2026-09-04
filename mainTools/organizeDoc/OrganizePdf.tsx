'use client';

import React, { useState, useRef, useEffect } from 'react';
import { organizeDocumentApi } from './api.organizeDoc';
import LoadingModal from '@/components/common/LoadingModal';
import toast from 'react-hot-toast';
import { useTranslation } from "@/hooks/useTranslation";
import {
  CloudUpload,
  Settings2,
  FileText,
  X,
  Loader2,
  RotateCw,
  Trash2,
  GripVertical
} from 'lucide-react';
import { FileItem, PageConfig } from './type.organizeDoc';
import dynamic from 'next/dynamic';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const Document = dynamic(() => import('react-pdf').then(mod => mod.Document), { ssr: false });
const Page = dynamic(() => import('react-pdf').then(mod => mod.Page), { ssr: false });

export default function OrganizePdf() {
  // Drag and Drop state
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [documentFile, setDocumentFile] = useState<FileItem | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageOrder, setPageOrder] = useState<PageConfig[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    import('react-pdf').then(({ pdfjs }) => {
      pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
    });
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
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

    setDocumentFile(newItem);
    setNumPages(null);
    setPageOrder([]);
  };

  const removeFile = () => {
    if (documentFile?.previewUrl) URL.revokeObjectURL(documentFile.previewUrl);
    setDocumentFile(null);
    setNumPages(null);
    setPageOrder([]);
  };

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);

    // Initialize page order
    const initialOrder: PageConfig[] = [];
    for (let i = 0; i < numPages; i++) {
      initialOrder.push({
        id: crypto.randomUUID(),
        originalIndex: i,
        rotation: 0
      });
    }
    setPageOrder(initialOrder);
  }

  // --- Grid Drag & Drop Handlers ---
  const handleGridDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
    // Firefox requires some data to be set for drag to work
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleGridDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === index) return;

    // Reorder the array
    const newOrder = [...pageOrder];
    const item = newOrder.splice(draggedIdx, 1)[0];
    newOrder.splice(index, 0, item);

    setDraggedIdx(index);
    setPageOrder(newOrder);
  };

  const handleGridDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleGridDragEnd = () => {
    setDraggedIdx(null);
  };

  // --- Page Actions ---
  const handleRotate = (id: string) => {
    setPageOrder(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, rotation: (p.rotation + 90) % 360 };
      }
      return p;
    }));
  };

  const handleDeletePage = (id: string) => {
    setPageOrder(prev => prev.filter(p => p.id !== id));
  };

  // --- Process ---
  const handleOrganize = async () => {
    if (!documentFile) {
      toast.error(t('organizepdf.noFileToast', 'Please select a file to process.'));
      return;
    }
    if (pageOrder.length === 0) {
      toast.error(t('organizepdf.minPageToast', 'The document must have at least one page.'));
      return;
    }

    try {
      setIsProcessing(true);

      const blob = await organizeDocumentApi(documentFile, pageOrder);

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `organized_${documentFile.file.name}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success(t('organizepdf.successToast', 'Document organized successfully!'));
    } catch (error: any) {
      toast.error(error.message || t('organizepdf.errorToast', 'Failed to organize document'));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-gray-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header Section Removed */}

        {/* Upload Area */}
        {!documentFile && (
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="w-full max-w-2xl mx-auto h-64 border-2 border-dashed border-blue-300 dark:border-blue-700/50 rounded-2xl bg-white dark:bg-gray-800 dark:hover:bg-gray-700 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-750 transition-all group shadow-sm hover:shadow-md"
          >
            <div className="w-16 h-16 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CloudUpload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
              {t('organizepdf.choosePdf', 'Choose PDF file')}
            </h3>
            <p className="text-sm text-slate-500 dark:text-gray-400 mb-4">
              {t('upload.dragAndDropSimple', 'or drag and drop your file here')}
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".pdf"
              className="hidden"
            />
          </div>
        )}

        {/* Workspace */}
        {documentFile && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

            {/* Main Area: Page Grid */}
            <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-sm border border-slate-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <FileText className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white truncate max-w-[200px] md:max-w-md">
                      {documentFile.file.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-gray-400">
                      {pageOrder.length} {t('organizepdf.pagesCount', 'Pages')} • {(documentFile.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={removeFile}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg text-slate-500 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* PDF Loader - Invisible but used to render thumbnails */}
              <div className="hidden">
                <Document
                  file={documentFile.previewUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                />
              </div>

              {/* Grid Workspace */}
              {!numPages ? (
                <div className="h-64 flex flex-col items-center justify-center text-slate-500">
                  <Loader2 className="w-8 h-8 animate-spin mb-4" />
                  <p>Loading document pages...</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-slate-50 dark:bg-gray-900 p-4 rounded-xl border border-slate-100 dark:border-gray-700 min-h-[300px] max-h-[600px] overflow-y-auto custom-scrollbar">
                  {pageOrder.map((page, index) => (
                    <div
                      key={page.id}
                      draggable
                      onDragStart={(e) => handleGridDragStart(e, index)}
                      onDragEnter={(e) => handleGridDragEnter(e, index)}
                      onDragOver={handleGridDragOver}
                      onDragEnd={handleGridDragEnd}
                      className={`relative group bg-white dark:bg-gray-800 rounded-lg shadow-sm border-2 transition-all ${draggedIdx === index ? 'opacity-40 border-dashed border-blue-400' : 'border-transparent hover:border-blue-400 cursor-grab active:cursor-grabbing'}`}
                    >
                      {/* Thumbnail container */}
                      <div className="p-2 flex flex-col items-center justify-center">
                        <div
                          className="shadow-sm border border-slate-200 dark:border-gray-700 overflow-hidden bg-white"
                          style={{
                            transform: `rotate(${page.rotation}deg)`,
                            transition: 'transform 0.3s ease'
                          }}
                        >
                          <Document file={documentFile.previewUrl}>
                            <Page
                              pageNumber={page.originalIndex + 1}
                              width={120}
                              renderTextLayer={false}
                              renderAnnotationLayer={false}
                            />
                          </Document>
                        </div>
                      </div>

                      {/* Page Number Label */}
                      <div className="absolute top-2 left-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded">
                        {index + 1}
                      </div>

                      {/* Actions Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleRotate(page.id)}
                          className="p-2 bg-white text-slate-800 hover:text-blue-600 rounded-full shadow-sm transform hover:scale-110 transition-all"
                          title="Rotate"
                        >
                          <RotateCw size={16} />
                        </button>
                        <button
                          onClick={() => handleDeletePage(page.id)}
                          className="p-2 bg-white text-slate-800 hover:text-red-600 rounded-full shadow-sm transform hover:scale-110 transition-all"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Drag Handle (Visual only) */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-white">
                        <GripVertical size={16} />
                      </div>
                    </div>
                  ))}

                  {pageOrder.length === 0 && (
                    <div className="col-span-full h-full flex items-center justify-center text-slate-400">
                      {t('organizepdf.emptyState', 'All pages deleted. Reload document to start over.')}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar: Actions */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 shadow-sm border border-slate-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100 dark:border-gray-700">
                  <Settings2 className="text-blue-600 dark:text-blue-400" />
                  <h3 className="font-semibold text-slate-900 dark:text-white">{t('organizepdf.summary', 'Summary')}</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-gray-400">{t('organizepdf.originalPages', 'Original Pages:')}</span>
                    <span className="font-medium text-slate-900 dark:text-white">{numPages || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-gray-400">{t('organizepdf.finalPages', 'Final Pages:')}</span>
                    <span className="font-medium text-slate-900 dark:text-white">{pageOrder.length}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleOrganize}
                    disabled={isProcessing || !numPages || pageOrder.length === 0}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2.5 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        {t('organizepdf.processing', 'Processing...')}
                      </>
                    ) : (
                      <>
                        {/* <FileText size={18} /> */}
                        {t('organizepdf.organizeBtn', 'Organize PDF')}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      <LoadingModal
        isOpen={isProcessing}
        title="Organizing Document"
        subtitle="Reordering and rotating pages..."
        progress={undefined}
      />
    </div>
  );
}
