'use client';

import React, { useState, useRef } from 'react';
import LoadingModal from '@/components/common/LoadingModal';
import toast from 'react-hot-toast';
import { CloudUpload, Settings2, FileText, X, Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { addWatermarkApi } from './api.addWatermark';
import { ADD_WATERMARK_CONFIG } from './config.addWatermark';
import { WatermarkAlignment } from './type.addWatermark';

const Document = dynamic(() => import('react-pdf').then(mod => mod.Document), { ssr: false });
const Page = dynamic(() => import('react-pdf').then(mod => mod.Page), { ssr: false });

export default function AddWatermark() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  React.useEffect(() => {
    import('react-pdf').then(({ pdfjs }) => {
      pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
    });
  }, []);

  React.useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
      setNumPages(null);
    }
  }, [file]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const [text, setText] = useState('CONFIDENTIAL');
  const [color, setColor] = useState('#000000');
  const [opacity, setOpacity] = useState(0.3);
  const [size, setSize] = useState(50);
  const [alignment, setAlignment] = useState<WatermarkAlignment>('diagonal');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const processWatermark = async () => {
    if (!file) return;

    setIsProcessing(true);

    try {
      const blob = await addWatermarkApi(file, { text, color, opacity, size, alignment });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `watermarked-${file.name}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Watermark added successfully!');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Failed to add watermark.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <LoadingModal isOpen={isProcessing} message="Adding watermark..." />

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Upload Document</h2>
            {!file ? (
              <div
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all group"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <CloudUpload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Click or drag to upload
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">PDF files only (max {ADD_WATERMARK_CONFIG.maxFileSizeMB}MB)</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-750 rounded-xl p-4 border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">{file.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button onClick={removeFile} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {previewUrl && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Document Preview</h3>
                    <div className="hidden">
                      <Document file={previewUrl} onLoadSuccess={onDocumentLoadSuccess} />
                    </div>
                    {numPages ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700">
                        {Array.from(new Array(numPages), (el, index) => (
                          <div key={`page_${index + 1}`} className="flex flex-col items-center gap-2">
                            <div className="w-full aspect-[1/1.4] bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden flex items-center justify-center shadow-sm relative">
                              <Document file={previewUrl} loading={<Loader2 className="w-5 h-5 animate-spin text-gray-400" />}>
                                <Page
                                  pageNumber={index + 1}
                                  renderTextLayer={false}
                                  renderAnnotationLayer={false}
                                  className="w-full flex justify-center [&>.react-pdf__Page__canvas]:max-w-full [&>.react-pdf__Page__canvas]:h-auto"
                                  width={150}
                                />
                              </Document>
                              
                              <div 
                                className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
                                style={{ zIndex: 10 }}
                              >
                                <div 
                                  style={{
                                    color: color,
                                    opacity: opacity,
                                    fontSize: `${size / 3}px`, 
                                    transform: `rotate(${alignment === 'diagonal' ? -45 : alignment === 'vertical' ? -90 : 0}deg)`,
                                    whiteSpace: 'nowrap',
                                    fontWeight: 'bold',
                                    userSelect: 'none'
                                  }}
                                >
                                  {text}
                                </div>
                              </div>
                            </div>
                            <span className="text-xs font-medium text-gray-500">Page {index + 1}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700">
                        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                        <span className="ml-2 text-sm text-gray-500">Loading preview...</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept={ADD_WATERMARK_CONFIG.acceptedFileTypes} className="hidden" />
          </div>
        </div>

        <div className="w-full md:w-80 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-gray-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Watermark Options</h3>
            </div>
            <div className="p-4 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text</label>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Color</label>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-10 px-1 py-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Opacity ({opacity})</label>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.1"
                  value={opacity}
                  onChange={(e) => setOpacity(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Size ({size}px)</label>
                <input
                  type="range"
                  min="10"
                  max="150"
                  step="1"
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Alignment</label>
                <select
                  value={alignment}
                  onChange={(e) => setAlignment(e.target.value as any)}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="diagonal">Diagonal</option>
                  <option value="horizontal">Horizontal</option>
                  <option value="vertical">Vertical</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={processWatermark}
            disabled={!file || isProcessing}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            Add Watermark
          </button>
        </div>
      </div>
    </div>
  );
}
