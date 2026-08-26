'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import {
    History, Download, FileText, X, SlidersHorizontal,
    CloudUpload, Settings2, Loader2, Target, TrendingDown,
    Image as ImageIcon, ChevronDown, LayoutTemplate, ArrowLeftRight,
    ArrowRight, Table, Presentation
} from 'lucide-react';
import { compressDocumentApi } from './api.compressDoc';
import LoadingModal from '@/components/common/LoadingModal';
import toast from 'react-hot-toast';

export default function CompressDoc() {
    const params = useParams();
    const tool = params?.tool as string || 'compress-pdf';

    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Compression Settings
    const [isDragging, setIsDragging] = useState(false);
    const [stats, setStats] = useState<any>(null);
    const [sliderPos, setSliderPos] = useState<number>(50);
    const [useCustomQuality, setUseCustomQuality] = useState(true); // Default to true for live preview
    const [quality, setQuality] = useState<number>(65);
    const [targetSize, setTargetSize] = useState<string>('');
    const [targetSizeUnit, setTargetSizeUnit] = useState<'KB' | 'MB' | 'GB'>('MB');

    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Map tool slug to specific titles and icons
    const toolConfig = {
        'compress-pdf': { title: 'Compress PDF', icon: <FileText size={24} className="fill-[#0f3b90]/10" />, accept: '.pdf,application/pdf', showPreview: false },
        'compress-jpg': { title: 'Compress JPG', icon: <ImageIcon size={24} className="text-yellow-500 fill-yellow-500/10" />, accept: '.jpg,.jpeg,image/jpeg', showPreview: true },
        'compress-jpeg': { title: 'Compress JPEG', icon: <ImageIcon size={24} className="text-yellow-500 fill-yellow-500/10" />, accept: '.jpeg,.jpg,image/jpeg', showPreview: true },
        'compress-png': { title: 'Compress PNG', icon: <ImageIcon size={24} className="text-yellow-400 fill-yellow-400/10" />, accept: '.png,image/png', showPreview: true },
        'compress-webp': { title: 'Compress WEBP', icon: <ImageIcon size={24} className="text-green-400 fill-green-400/10" />, accept: '.webp,image/webp', showPreview: true },
        'compress-images': { title: 'Compress Images', icon: <ImageIcon size={24} className="text-blue-500 fill-blue-500/10" />, accept: 'image/*,.jpg,.jpeg,.png,.webp', showPreview: true },
        'compress-word': { title: 'Compress Word', icon: <FileText size={24} className="text-blue-600 fill-blue-600/10" />, accept: '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document', showPreview: false },
        'compress-excel': { title: 'Compress Excel', icon: <Table size={24} className="text-green-600 fill-green-600/10" />, accept: '.xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', showPreview: false },
        'compress-powerpoint': { title: 'Compress PowerPoint', icon: <Presentation size={24} className="text-orange-600 fill-orange-600/10" />, accept: '.ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation', showPreview: false }
    };

    const currentConfig = toolConfig[tool as keyof typeof toolConfig] || toolConfig['compress-pdf'];

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setStats(null);
            if (currentConfig.showPreview) {
                setPreviewUrl(URL.createObjectURL(selectedFile));
            }
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const droppedFile = e.dataTransfer.files[0];

            // Validate if the dropped file matches the current tool's accepted formats
            const isAccepted = currentConfig.accept.split(',').some(acceptType => {
                acceptType = acceptType.trim();
                if (acceptType.startsWith('.')) {
                    return droppedFile.name.toLowerCase().endsWith(acceptType);
                } else if (acceptType.endsWith('/*')) {
                    const baseType = acceptType.split('/')[0];
                    return droppedFile.type.startsWith(baseType + '/');
                } else {
                    return droppedFile.type === acceptType;
                }
            });

            if (!isAccepted) {
                toast.error(`Invalid file type. Please upload a supported format: ${currentConfig.accept}`);
                return;
            }

            setFile(droppedFile);
            setStats(null);
            if (currentConfig.showPreview) {
                setPreviewUrl(URL.createObjectURL(droppedFile));
            }
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const removeFile = () => {
        setFile(null);
        setStats(null);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const runLiveCompression = async (q: number) => {
        if (!file) return;
        setIsProcessing(true);
        try {
            const resultStats = await compressDocumentApi(
                file,
                tool,
                'balanced',
                q,
                undefined,
                false // NO AUTO DOWNLOAD
            );
            setStats(resultStats);
        } catch (error) {
            console.error('Live compression error:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleLiveQualityChange = (q: number) => {
        setQuality(q);
        setUseCustomQuality(true);
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        debounceTimeout.current = setTimeout(() => {
            runLiveCompression(q);
        }, 300);
    };

    // Auto-compress when an image is uploaded to show live preview immediately
    useEffect(() => {
        if (file && currentConfig.showPreview) {
            runLiveCompression(quality);
        }
    }, [file]);

    const handleProcess = async () => {
        if (!file) return;

        setIsProcessing(true);
        try {
            let targetSizeInBytes = undefined;
            if (targetSize && !isNaN(Number(targetSize))) {
                const num = Number(targetSize);
                if (targetSizeUnit === 'KB') targetSizeInBytes = num * 1024;
                if (targetSizeUnit === 'MB') targetSizeInBytes = num * 1024 * 1024;
                if (targetSizeUnit === 'GB') targetSizeInBytes = num * 1024 * 1024 * 1024;
            }

            const resultStats = await compressDocumentApi(
                file,
                tool,
                'balanced',
                useCustomQuality ? quality : undefined,
                targetSizeInBytes,
                true // AUTO DOWNLOAD
            );
            setStats(resultStats);
            toast.success('Document compressed successfully!');
        } catch (error: any) {
            console.error('Error compressing:', error);
            toast.error(error.message || 'An error occurred while compressing the document.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8 pb-12">
            <input
                type="file"
                accept={currentConfig.accept}
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{currentConfig.title}</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                        Reduce document size while preserving visual fidelity.
                    </p>
                </div>
            </div>

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
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Select file
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                            or drag & drop your file here
                        </p>
                        <button suppressHydrationWarning className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-colors pointer-events-none">
                            Select file
                        </button>
                    </div>
                </div>
            ) : (
                /* Main Content Split (When file is selected) */
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* Left Panel (Controls) */}
                    <div className="w-full lg:w-[380px] flex-shrink-0 flex flex-col gap-4 min-w-0">

                        {/* File Card */}
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm flex items-center justify-between relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0f3b90]"></div>
                            <div className="flex items-center gap-3 sm:gap-4 ml-2 min-w-0 flex-1">
                                <div className="bg-blue-50 dark:bg-blue-900/30 p-2.5 rounded-lg text-[#0f3b90] dark:text-blue-400 flex-shrink-0">
                                    {currentConfig.icon}
                                </div>
                                <div className="overflow-hidden min-w-0 flex-1">
                                    <p className="font-semibold text-sm text-gray-900 dark:text-white truncate" title={file.name}>
                                        {file.name}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                        <span>{formatBytes(file.size)}</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={removeFile} className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Settings Card */}
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">

                            {/* Advanced Target Size Mode */}
                            <div className="mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">How it works:</h4>
                                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-2 list-disc pl-4">
                                    <li>Use the live slider on the right to visually adjust the image quality.</li>
                                    <li>Or enter an exact target size below.</li>
                                    <li>Click Download when you are happy with the preview!</li>
                                </ul>
                            </div>

                            {/* Target File Size */}
                            <div className="flex items-center gap-2 font-bold text-gray-700 dark:text-gray-200 text-sm mb-4">
                                <Target size={18} className="text-[#0f3b90] dark:text-blue-500" />
                                Exact Target Size (Optional)
                            </div>
                            <div className="flex gap-2 sm:gap-3 mb-2">
                                <input
                                    type="number"
                                    min="0"
                                    step="0.1"
                                    value={targetSize}
                                    onChange={(e) => setTargetSize(e.target.value)}
                                    placeholder="e.g. 1.4"
                                    className="flex-1 min-w-0 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 font-semibold text-gray-700 dark:text-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0f3b90]/30"
                                />
                                <div className="relative">
                                    <select
                                        value={targetSizeUnit}
                                        onChange={(e) => setTargetSizeUnit(e.target.value as any)}
                                        className="appearance-none border border-gray-200 dark:border-gray-700 rounded-lg pl-4 pr-10 py-2.5 bg-white dark:bg-gray-800 font-bold text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0f3b90]/30 cursor-pointer"
                                    >
                                        <option value="KB">KB</option>
                                        <option value="MB">MB</option>
                                        <option value="GB">GB</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                                </div>
                            </div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                                Overrides quality slider. Best for Images.
                            </p>

                            <button
                                onClick={handleProcess}
                                disabled={isProcessing}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-[#0f3b90] rounded-xl hover:bg-[#0c2f73] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
                            >
                                {isProcessing ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Settings2 className="w-5 h-5" />
                                )}
                                {isProcessing ? 'Processing...' : 'Download File'}
                            </button>
                        </div>
                    </div>

                    {/* Right Panel (Preview & Results) */}
                    <div className="flex-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex flex-col min-h-[400px] sm:min-h-[500px] overflow-hidden min-w-0">

                        <div className="flex-1 flex flex-col relative">
                            <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-2 font-bold text-sm text-[#0f3b90] dark:text-blue-400">
                                    <LayoutTemplate size={18} /> {stats && currentConfig.showPreview ? 'Live Compression Preview' : 'Quality Preview'}
                                </div>
                            </div>

                            {/* LIVE QUALITY SLIDER HEADER */}
                            {currentConfig.showPreview && file && (
                                <div className="w-full p-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 z-20">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Live Quality Slider</span>
                                        <span className="text-sm font-black text-[#0f3b90] dark:text-blue-400">{quality}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="100"
                                        value={quality}
                                        onChange={(e) => handleLiveQualityChange(Number(e.target.value))}
                                        className="w-full h-2.5 bg-gray-200 rounded-full appearance-none cursor-ew-resize dark:bg-gray-700 accent-[#0f3b90] dark:accent-blue-500 shadow-inner"
                                    />
                                    <div className="flex justify-between text-xs font-bold text-gray-400 dark:text-gray-500 mt-2">
                                        <span>Smaller File Size</span>
                                        <span>Better Visual Quality</span>
                                    </div>
                                </div>
                            )}

                            <div className="flex-1 bg-gray-50/50 dark:bg-gray-900/50 flex justify-center items-center relative overflow-hidden group p-6">
                                {previewUrl && currentConfig.showPreview ? (
                                    stats && stats.compressedUrl ? (
                                        // Slider View
                                        <div
                                            className="relative w-full h-full max-h-[500px] max-w-[500px] mx-auto cursor-ew-resize select-none overflow-hidden rounded-xl border border-gray-200 shadow-sm min-w-0"
                                            onMouseMove={(e) => {
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                const x = e.clientX - rect.left;
                                                setSliderPos(Math.max(0, Math.min(100, (x / rect.width) * 100)));
                                            }}
                                            onTouchMove={(e) => {
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                const x = e.touches[0].clientX - rect.left;
                                                setSliderPos(Math.max(0, Math.min(100, (x / rect.width) * 100)));
                                            }}
                                        >
                                            {/* Compressed Image (Background / Right side) */}
                                            <div className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center">
                                                <img src={stats.compressedUrl} className="max-w-full max-h-full object-contain" alt="Compressed" />
                                            </div>

                                            {/* Original Image (Clipped / Left side) */}
                                            <div
                                                className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center"
                                                style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
                                            >
                                                <img src={previewUrl} className="max-w-full max-h-full object-contain" alt="Original" />
                                            </div>

                                            {/* Top Overlay Badges */}
                                            <div className="absolute top-4 left-4 right-4 flex justify-between z-10 pointer-events-none">
                                                <div className="bg-gray-800/80 backdrop-blur text-white px-3 py-1 rounded text-xs font-bold shadow-md">
                                                    Original
                                                </div>
                                                <div className="bg-[#1546a0]/90 backdrop-blur text-white px-3 py-1 rounded text-xs font-bold shadow-md">
                                                    Compressed
                                                </div>
                                            </div>

                                            {/* Slider Handle */}
                                            <div className="absolute top-0 bottom-0 w-0.5 bg-blue-500 z-10 shadow-md" style={{ left: `${sliderPos}%` }}>
                                                <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center text-blue-500 shadow-lg group-hover:scale-110 transition-transform">
                                                    <ArrowLeftRight size={14} />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        // Original single preview
                                        <img src={previewUrl} alt="Preview" className="max-w-full max-h-[500px] object-contain rounded shadow-sm border border-gray-200 dark:border-gray-700" />
                                    )
                                ) : (
                                    <div className="text-center text-gray-400">
                                        <div className="mx-auto mb-4 opacity-20 flex justify-center">
                                            {currentConfig.icon}
                                        </div>
                                        <p className="font-medium text-lg text-gray-600 dark:text-gray-300">Preview not available</p>
                                        <p className="text-sm mt-2 max-w-sm mx-auto">Visual previews are only supported for image formats.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {stats && (
                            <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 shrink-0 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center">
                                            <TrendingDown size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 dark:text-white">Live Compression Active</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Previewing real-time quality.</p>
                                        </div>
                                    </div>
                                    <div className="text-left sm:text-right w-full sm:w-auto mt-2 sm:mt-0">
                                        <div className="flex items-center gap-3 text-sm justify-start sm:justify-end mb-1">
                                            <span className="text-gray-500 line-through">{formatBytes(stats.originalSize)}</span>
                                            <ArrowRight size={14} className="text-gray-400 shrink-0" />
                                            <span className="font-bold text-green-600 dark:text-green-400">{formatBytes(stats.compressedSize)}</span>
                                        </div>
                                        <p className="text-xs font-bold text-[#0f3b90] dark:text-blue-400">
                                            {stats.originalSize > 0 ? Math.round((1 - (stats.compressedSize / stats.originalSize)) * 100) : 0}% Space Saved
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <LoadingModal isOpen={isProcessing} message="Compressing your document..." />
        </div>
    );
}