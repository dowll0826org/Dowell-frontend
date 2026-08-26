'use client';

import React, { useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import {
    History, Download, RefreshCw, X, CloudUpload, FileText, Image as ImageIcon
} from 'lucide-react';
import { convertToPdfApi, convertFromPdfApi } from './api.convertDoc';
import toast from 'react-hot-toast';

export default function ConvertDoc() {
    const params = useParams();
    const tool = params?.tool as string || 'jpg-to-pdf';

    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Config for each tool
    const toolConfig: Record<string, any> = {
        'jpg-to-pdf': { title: 'JPG to PDF', type: 'image', direction: 'to-pdf', accept: '.jpg,.jpeg,image/jpeg', icon: <ImageIcon size={32} className="text-yellow-500" /> },
        'jpeg-to-pdf': { title: 'JPEG to PDF', type: 'image', direction: 'to-pdf', accept: '.jpeg,.jpg,image/jpeg', icon: <ImageIcon size={32} className="text-yellow-500" /> },
        'png-to-pdf': { title: 'PNG to PDF', type: 'image', direction: 'to-pdf', accept: 'image/*,.jpg,.jpeg,.png,.webp', icon: <ImageIcon size={32} className="text-yellow-400" /> },
        'word-to-pdf': { title: 'Word to PDF', type: 'word', direction: 'to-pdf', accept: '.doc,.docx,application/msword', icon: <FileText size={32} className="text-blue-500" /> },
        'powerpoint-to-pdf': { title: 'PowerPoint to PDF', type: 'powerpoint', direction: 'to-pdf', accept: '.ppt,.pptx', icon: <FileText size={32} className="text-orange-500" /> },
        'excel-to-pdf': { title: 'Excel to PDF', type: 'excel', direction: 'to-pdf', accept: '.xls,.xlsx', icon: <FileText size={32} className="text-green-500" /> },
        'pdf-to-jpg': { title: 'PDF to JPG', type: 'jpg', direction: 'from-pdf', accept: '.pdf,application/pdf', icon: <ImageIcon size={32} className="text-yellow-500" /> },
        'pdf-to-jpeg': { title: 'PDF to JPEG', type: 'jpeg', direction: 'from-pdf', accept: '.pdf,application/pdf', icon: <ImageIcon size={32} className="text-yellow-500" /> },
        'pdf-to-png': { title: 'PDF to PNG', type: 'png', direction: 'from-pdf', accept: '.pdf,application/pdf', icon: <ImageIcon size={32} className="text-yellow-400" /> },
        'pdf-to-word': { title: 'PDF to Word', type: 'word', direction: 'from-pdf', accept: '.pdf,application/pdf', icon: <FileText size={32} className="text-blue-500" /> },
        'pdf-to-powerpoint': { title: 'PDF to PowerPoint', type: 'powerpoint', direction: 'from-pdf', accept: '.pdf,application/pdf', icon: <FileText size={32} className="text-orange-500" /> },
        'pdf-to-excel': { title: 'PDF to Excel', type: 'excel', direction: 'from-pdf', accept: '.pdf,application/pdf', icon: <FileText size={32} className="text-green-500" /> },
    };

    const currentConfig = toolConfig[tool] || toolConfig['jpg-to-pdf'];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleConvert = async () => {
        if (!file) return;

        setIsProcessing(true);
        try {
            let result;
            if (currentConfig.direction === 'to-pdf') {
                result = await convertToPdfApi(file, currentConfig.type);
            } else {
                result = await convertFromPdfApi(file, currentConfig.type);
            }

            // Create download link
            const contentTypeStr = String(result.contentType || '');
            const url = window.URL.createObjectURL(new Blob([result.blob], { type: contentTypeStr }));
            const link = document.createElement('a');
            link.href = url;

            // Try to extract filename from Content-Disposition header first
            let filename = '';
            if (result.contentDisposition) {
                const filenameMatch = result.contentDisposition.match(/filename="?([^"]+)"?/);
                if (filenameMatch && filenameMatch[1]) {
                    filename = filenameMatch[1];
                }
            }

            // Fallback to generating filename based on original file name
            if (!filename) {
                const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
                let ext = '';

                if (currentConfig.direction === 'to-pdf') {
                    ext = '.pdf';
                } else {
                    if (contentTypeStr.includes('zip')) {
                        ext = '.zip';
                    } else if (contentTypeStr.includes('jpeg') || contentTypeStr.includes('jpg')) {
                        ext = '.jpg';
                    } else if (currentConfig.type === 'word') {
                        ext = '.docx';
                    } else if (currentConfig.type === 'excel') {
                        ext = '.xlsx';
                    } else if (currentConfig.type === 'powerpoint') {
                        ext = '.pptx';
                    } else {
                        ext = `.${currentConfig.type}`;
                    }
                }
                filename = `${baseName}${ext}`;
            }

            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => window.URL.revokeObjectURL(url), 100);

            toast.success('Conversion successful!');
            setFile(null);
        } catch (error: any) {
            toast.error(error.message || 'An error occurred during conversion.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-12">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{currentConfig.title}</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                        Convert files to PDF and vice versa with ease.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex justify-center items-center py-10">
                {!file ? (
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onClick={() => fileInputRef.current?.click()}
                        className={`w-full max-w-3xl rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-6 md:p-12 text-center cursor-pointer transition-all duration-300 ${isDragging
                            ? 'border-[#3b5b9c] bg-[#3b5b9c]/5'
                            : 'border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50'
                            }`}
                        style={{ minHeight: '400px' }}
                    >
                        <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
                            {currentConfig.icon}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                            Select {currentConfig.title.split(' ')[0]} File
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
                            Drag and drop your file here or click to browse from your device
                        </p>
                        <button className="bg-[#1b4ba1] hover:bg-[#143a7e] text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all flex items-center gap-3">
                            <CloudUpload size={20} />
                            Choose File
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept={currentConfig.accept}
                        />
                    </div>
                ) : isProcessing ? (
                    <div className="bg-[#f8f9fb] dark:bg-gray-900 w-full max-w-2xl rounded-2xl p-6 md:p-12 flex flex-col items-center text-center shadow-sm border border-gray-100 dark:border-gray-800">
                        <div className="relative w-24 h-24 mb-8">
                            <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-[#3b5b9c] border-t-transparent border-r-transparent rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-[#3b5b9c] dark:text-blue-400">
                                <RefreshCw size={28} strokeWidth={2.5} />
                            </div>
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                            Converting your document...
                        </h2>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 max-w-sm mb-12 leading-relaxed">
                            Please wait while we process your file securely.
                            This might take a few moments depending on file size.
                        </p>
                    </div>
                ) : (
                    <div className="w-full max-w-3xl rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 md:p-8 shadow-sm">
                        <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center">
                                    <FileText className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="text-left flex-1 min-w-0">
                                    <h3 className="font-bold text-gray-900 dark:text-white text-base md:text-lg truncate">{file.name}</h3>
                                    <p className="text-xs md:text-sm text-gray-500 truncate">
                                        Ready to convert to {currentConfig.direction === 'to-pdf' ? 'PDF' : currentConfig.type.toUpperCase()}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setFile(null)}
                                className="p-2 shrink-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6 md:mt-8">
                            <button
                                onClick={() => setFile(null)}
                                className="w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-xl sm:rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConvert}
                                className="w-full sm:w-auto bg-[#1b4ba1] hover:bg-[#143a7e] text-white px-8 py-3 sm:py-2.5 rounded-xl sm:rounded-lg font-semibold shadow-md transition-colors flex items-center justify-center gap-2"
                            >
                                <RefreshCw size={18} /> Convert Now
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}