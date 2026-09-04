'use client';

import React, { useState, useRef } from 'react';
import { splitDocumentApi } from './api.splitDoc';
import LoadingModal from '@/components/common/LoadingModal';
import toast from 'react-hot-toast';
import { useTranslation } from "@/hooks/useTranslation";
import { 
  CloudUpload, 
  Settings2,
  FileText,
  X,
  Loader2,
  Scissors,
  Files
} from 'lucide-react';
import { FileItem, SplitOptions, SplitMode, RangeMode, ExtractMode } from './type.splitDoc';
import { SPLIT_PDF_CONFIG } from './config.splitDoc';
import dynamic from 'next/dynamic';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const Document = dynamic(() => import('react-pdf').then(mod => mod.Document), { ssr: false });
const Page = dynamic(() => import('react-pdf').then(mod => mod.Page), { ssr: false });

export default function SplitPdf() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [file, setFile] = useState<FileItem | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  React.useEffect(() => {
    import('react-pdf').then(({ pdfjs }) => {
      pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
    });
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  // Parse page ranges helper
  const parsePageRanges = (pageString: string, maxPages: number): number[] => {
    if (!pageString || typeof pageString !== 'string') return [];
    const pagesToExtract = new Set<number>();
    const parts = pageString.split(',');
    for (let part of parts) {
      part = part.trim();
      if (!part) continue;
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-');
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (!isNaN(start) && !isNaN(end) && start > 0 && start <= end) {
          for (let i = start; i <= end; i++) {
            if (i <= maxPages) pagesToExtract.add(i);
          }
        }
      } else {
        const pageNum = parseInt(part, 10);
        if (!isNaN(pageNum) && pageNum > 0 && pageNum <= maxPages) {
          pagesToExtract.add(pageNum);
        }
      }
    }
    return Array.from(pagesToExtract).sort((a, b) => a - b);
  };

  // Settings State
  const [options, setOptions] = useState<SplitOptions>({
    splitMode: 'extract',
    rangeMode: 'custom',
    extractMode: 'select',
    customRanges: '1',
    fixedRangePages: 1,
    selectedPages: '1',
    mergeExtracted: true
  });

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Calculate resulting files
  const calculateResultFiles = () => {
    if (!numPages) return [];
    const resultFiles: { label: string; pages: number[] }[] = [];

    if (options.splitMode === 'extract') {
      if (options.extractMode === 'all') {
        for (let i = 1; i <= numPages; i++) {
          resultFiles.push({ label: `Page ${i}`, pages: [i] });
        }
      } else if (options.extractMode === 'select') {
        const pageIndices = parsePageRanges(options.selectedPages, numPages);
        if (pageIndices.length === 0) return [];
        if (options.mergeExtracted) {
          resultFiles.push({ label: 'Merged Pages', pages: pageIndices });
        } else {
          for (let i of pageIndices) {
            resultFiles.push({ label: `Page ${i}`, pages: [i] });
          }
        }
      }
    } else if (options.splitMode === 'range') {
      if (options.rangeMode === 'custom') {
        const parts = options.customRanges.split(',');
        let rangeCount = 1;
        for (let part of parts) {
          const indices = parsePageRanges(part, numPages);
          if (indices.length > 0) {
            resultFiles.push({ label: `Range ${rangeCount}`, pages: indices });
            rangeCount++;
          }
        }
      } else if (options.rangeMode === 'fixed') {
        const chunkSize = options.fixedRangePages;
        if (isNaN(chunkSize) || chunkSize < 1) return [];
        let rangeCount = 1;
        for (let i = 1; i <= numPages; i += chunkSize) {
          const indices = [];
          for (let j = 0; j < chunkSize && (i + j) <= numPages; j++) {
            indices.push(i + j);
          }
          resultFiles.push({ label: `Range ${rangeCount}`, pages: indices });
          rangeCount++;
        }
      }
    }
    return resultFiles;
  };

  const computedFiles = calculateResultFiles();

  const processSelectedFile = (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      toast.error('Please upload a valid PDF file.');
      return;
    }

    if (selectedFile.size > SPLIT_PDF_CONFIG.maxFileSizeMB * 1024 * 1024) {
      toast.error(`File is too large. Max limit is ${SPLIT_PDF_CONFIG.maxFileSizeMB}MB`);
      return;
    }

    const newItem: FileItem = {
      id: crypto.randomUUID(),
      file: selectedFile,
      preview: URL.createObjectURL(selectedFile),
      size: formatBytes(selectedFile.size),
      type: 'PDF'
    };

    setFile(newItem);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeFile = () => {
    if (file?.preview) URL.revokeObjectURL(file.preview);
    setFile(null);
    setNumPages(null);
  };

  const handleProcess = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      await splitDocumentApi(file, options);
      toast.success('Document split successfully!');
    } catch (error: any) {
      console.error('Error splitting:', error);
      toast.error(error.message || 'An error occurred while splitting the document.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 pb-12">
      <input
        type="file"
        accept={SPLIT_PDF_CONFIG.acceptedFileTypes}
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Header Removed */}

      {!file ? (
        /* Dropzone (When no file is selected) */
        <div
          className="w-full relative group cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="absolute inset-0 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 transition-colors group-hover:border-blue-400 dark:group-hover:border-blue-500"></div>
          <div className="relative flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <CloudUpload className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('upload.selectSpecificFile', 'Select PDF file').replace('{type}', 'PDF')}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              or drag & drop your PDF here
            </p>
            <button className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-colors pointer-events-none">{t('upload.selectSpecificFile', 'Select PDF file').replace('{type}', 'PDF')}</button>
          </div>
        </div>
      ) : (
        /* Workspace Area (File selected) */
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Main Document Preview (Left side) */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center justify-center relative min-h-[400px]">
             {/* File Header */}
             <div className="absolute top-4 left-4 right-4 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700 z-10">
                <div className="flex items-center gap-3 truncate">
                  <div className="w-8 h-8 rounded bg-red-100 text-red-500 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{file.file.name}</p>
                    <p className="text-xs text-gray-500">{file.size} {numPages ? `• ${numPages} pages` : ''}</p>
                  </div>
                </div>
                <button
                  onClick={removeFile}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
             </div>

             {/* Document Rendering */}
             <div className="w-full h-full mt-16 overflow-y-auto overflow-x-hidden flex flex-col">
                {/* Hidden Document to parse pages */}
                <div className="hidden">
                  <Document file={file.preview} onLoadSuccess={onDocumentLoadSuccess} />
                </div>
                
                {numPages ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 p-4 w-full">
                    {computedFiles.map((resultFile, index) => (
                      <div key={index} className="flex flex-col items-center gap-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{resultFile.label}</span>
                        <div className="w-full aspect-[1/1.4] bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden flex items-center justify-center shadow-sm relative">
                           <Document file={file.preview} loading={<Loader2 className="w-6 h-6 animate-spin text-gray-400" />}>
                             <Page 
                               pageNumber={resultFile.pages[0]} 
                               renderTextLayer={false} 
                               renderAnnotationLayer={false} 
                               className="w-full flex justify-center [&>.react-pdf__Page__canvas]:max-w-full [&>.react-pdf__Page__canvas]:h-auto"
                               width={150}
                             />
                           </Document>
                        </div>
                        <div className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-900 px-2 py-1 rounded-md border border-gray-100 dark:border-gray-700">
                          {resultFile.pages.length} {resultFile.pages.length === 1 ? 'page' : 'pages'}
                        </div>
                      </div>
                    ))}
                    {computedFiles.length === 0 && (
                      <div className="col-span-full py-10 text-center text-gray-500">
                         No pages selected for the current configuration.
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                      <p className="text-sm text-gray-500">Loading document...</p>
                    </div>
                  </div>
                )}
             </div>
          </div>

          {/* Settings Sidebar (Right side) */}
          <div className="w-full lg:w-80 shrink-0 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
            
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setOptions({ ...options, splitMode: 'range' })}
                className={`flex-1 py-4 flex flex-col items-center gap-2 transition-colors ${
                  options.splitMode === 'range' 
                    ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50/50 dark:bg-blue-900/10' 
                    : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                <Scissors className="w-5 h-5" />
                <span className="text-xs font-semibold uppercase tracking-wider">Range</span>
              </button>
              <button
                onClick={() => setOptions({ ...options, splitMode: 'extract' })}
                className={`flex-1 py-4 flex flex-col items-center gap-2 transition-colors ${
                  options.splitMode === 'extract' 
                    ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50/50 dark:bg-blue-900/10' 
                    : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                <Files className="w-5 h-5" />
                <span className="text-xs font-semibold uppercase tracking-wider">Extract</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-5 flex-1 overflow-y-auto">
              
              {/* Range Mode Options */}
              {options.splitMode === 'range' && (
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-900 dark:text-white mb-3 block">Range mode:</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setOptions({ ...options, rangeMode: 'custom' })}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors ${
                          options.rangeMode === 'custom'
                            ? 'border-blue-600 text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        Custom
                      </button>
                      <button
                        onClick={() => setOptions({ ...options, rangeMode: 'fixed' })}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors ${
                          options.rangeMode === 'fixed'
                            ? 'border-blue-600 text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        Fixed
                      </button>
                    </div>
                  </div>

                  {options.rangeMode === 'custom' && (
                    <div className="space-y-3">
                      <label className="text-sm text-gray-700 dark:text-gray-300">Custom Ranges:</label>
                      <input
                        type="text"
                        value={options.customRanges}
                        onChange={(e) => setOptions({ ...options, customRanges: e.target.value })}
                        placeholder="e.g. 1-5, 8-10"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  {options.rangeMode === 'fixed' && (
                    <div className="space-y-3">
                      <label className="text-sm text-gray-700 dark:text-gray-300">Split into page ranges of:</label>
                      <input
                        type="number"
                        min="1"
                        value={options.fixedRangePages}
                        onChange={(e) => setOptions({ ...options, fixedRangePages: parseInt(e.target.value) || 1 })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Extract Mode Options */}
              {options.splitMode === 'extract' && (
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-900 dark:text-white mb-3 block">Extract mode:</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setOptions({ ...options, extractMode: 'all' })}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors ${
                          options.extractMode === 'all'
                            ? 'border-blue-600 text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        Extract all
                      </button>
                      <button
                        onClick={() => setOptions({ ...options, extractMode: 'select' })}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors ${
                          options.extractMode === 'select'
                            ? 'border-blue-600 text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        Select pages
                      </button>
                    </div>
                  </div>

                  {options.extractMode === 'all' && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg flex items-start gap-2 text-sm text-blue-700 dark:text-blue-300">
                      <div className="mt-0.5">ℹ️</div>
                      <p>Every page will be converted into a separate PDF file. It will be downloaded as a ZIP.</p>
                    </div>
                  )}

                  {options.extractMode === 'select' && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1">Pages to extract:</label>
                        <input
                          type="text"
                          value={options.selectedPages}
                          onChange={(e) => setOptions({ ...options, selectedPages: e.target.value })}
                          placeholder="example: 1,5-8"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <label className="flex items-start gap-3 cursor-pointer">
                        <div className="flex items-center h-5">
                          <input
                            type="checkbox"
                            checked={options.mergeExtracted}
                            onChange={(e) => setOptions({ ...options, mergeExtracted: e.target.checked })}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </div>
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          Merge extracted pages into one PDF file.
                        </div>
                      </label>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Action Button */}
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleProcess}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
              >
                {isProcessing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Settings2 className="w-5 h-5" />
                )}
                {isProcessing ? 'Processing...' : 'Split PDF'}
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Loading Modal */}
      <LoadingModal isOpen={isProcessing} message="{t('upload.processing', 'Processing your document...')}" />
    </div>
  );
}
