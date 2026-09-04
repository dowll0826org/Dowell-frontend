'use client';

import React, { useState, useRef } from 'react';
import { mergeDocumentsApi } from './api.mergeDoc';
import LoadingModal from '@/components/common/LoadingModal';
import toast from 'react-hot-toast';
import { 
  CloudUpload, 
  Sparkles, 
  LayoutGrid, 
  FileText,
  Image as ImageIcon,
  File as FileIcon,
  X,
  Loader2
} from 'lucide-react';
import { FileItem } from './type.mergeDoc';
import { MERGE_PDF_CONFIG } from './config.mergeDoc';
import { useTranslation } from '@/hooks/useTranslation';

export const toolProps = {};

export default function MergePdf() {
  const { t } = useTranslation();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Format bytes to human readable
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const processSelectedFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).filter((file) => {
      return (
        file.type === 'application/pdf' ||
        file.type.startsWith('image/')
      );
    });

    if (files.length + newFiles.length > MERGE_PDF_CONFIG.maxFiles) {
      toast.error(`You can only upload up to ${MERGE_PDF_CONFIG.maxFiles} files at a time.`);
      return;
    }

    const newItems: FileItem[] = newFiles.map((file) => {
      let preview = null;
      if (file.type.startsWith('image/')) {
        preview = URL.createObjectURL(file);
      }
      return {
        id: Math.random().toString(36).substring(7),
        file,
        preview,
        size: formatBytes(file.size),
        type: file.type.includes('pdf') ? 'PDF' : file.type.includes('image') ? 'IMG' : 'DOC'
      };
    });

    setFiles((prev) => [...prev, ...newItems]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processSelectedFiles(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      processSelectedFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter(f => {
      if (f.id === id && f.preview) {
        URL.revokeObjectURL(f.preview);
      }
      return f.id !== id;
    }));
  };

  const clearAll = () => {
    files.forEach(f => {
      if (f.preview) URL.revokeObjectURL(f.preview);
    });
    setFiles([]);
  };

  const handleProcess = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    try {
      await mergeDocumentsApi(files);
      toast.success('Documents merged successfully!');
    } catch (error) {
      console.error('Error merging:', error);
      toast.error('An error occurred while merging the documents.');
    } finally {
      setIsProcessing(false);
    }
  };


  const getIconForType = (type: string) => {
    if (type === 'PDF') return FileText;
    if (type === 'IMG') return ImageIcon;
    return FileIcon;
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 pb-12">
      <input
        type="file"
        multiple
        accept={MERGE_PDF_CONFIG.acceptedFileTypes}
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-4">        <div className="flex items-center gap-3">
          {files.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
              {t('upload.clearAll', 'Clear All')}
            </button>
          )}
          <button
            onClick={handleProcess}
            disabled={files.length === 0 || isProcessing}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {isProcessing ? t('upload.processing', 'Processing...') : t('upload.processFiles', { count: files.length }, `Process ${files.length} Files`)}
          </button>
        </div>
      </div>

      {/* Dropzone */}
      <div
        className="w-full relative group cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="absolute inset-0 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 transition-colors group-hover:border-blue-400 dark:group-hover:border-blue-500"></div>
        <div className="relative flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-16 h-16 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <CloudUpload className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('upload.dragAndDropFiles', 'Drag & drop files here')}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {t('upload.clickToSelect', 'or click to select files from your computer')}
          </p>
          <button className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors pointer-events-none">
            {t('upload.browseFiles', 'Browse Files')}
          </button>
        </div>
      </div>

      {/* Preview Gallery Section */}
      {files.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('upload.previewGallery', 'Preview Gallery')}</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file) => {
              const Icon = getIconForType(file.type);
              return (
                <div
                  key={file.id}
                  className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200"
                >
                  {/* Preview Area */}
                  <div className="h-40 bg-gray-100 dark:bg-gray-900 flex items-center justify-center relative overflow-hidden">
                    {file.preview ? (
                      <img
                        src={file.preview}
                        alt={file.file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4">
                        {/* Abstract Document Representation */}
                        <div className="w-20 h-24 bg-white dark:bg-gray-800 rounded shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col p-3 gap-2">
                          <div className="w-3/4 h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                          <div className="w-5/6 h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded mt-auto"></div>
                        </div>
                      </div>
                    )}

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-sm"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* File Details */}
                  <div className="p-3 border-t border-gray-100 dark:border-gray-700 flex items-start gap-3">
                    <div className={`mt-0.5 w-6 h-6 rounded flex items-center justify-center bg-blue-50 text-blue-500`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate" title={file.file.name}>
                        {file.file.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {file.size} • {file.type}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Loading Modal */}
      <LoadingModal isOpen={isProcessing} message={t('upload.merging', 'Merging your documents...')} />
    </div>
  );
}