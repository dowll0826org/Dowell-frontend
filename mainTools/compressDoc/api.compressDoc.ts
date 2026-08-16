import { api } from '@/lib/api';
import { json } from 'stream/consumers';

export const compressDocumentApi = async (file: File, toolSlug: string, level: string, customQuality?: number, targetSizeInBytes?: number, autoDownload: boolean = true) => {
    let endpoint = '';

    if (toolSlug === 'compress-word') {
        endpoint = '/api/v1/compress/word';
    } else if (toolSlug === 'compress-pdf') {
        endpoint = '/api/v1/compress/pdf';
    } else if (toolSlug === 'compress-excel') {
        endpoint = '/api/v1/compress/excel';
    } else if (toolSlug === 'compress-powerpoint') {
        endpoint = '/api/v1/compress/powerpoint';
    } else {
        endpoint = '/api/v1/compress/image';
    }

    const formData = new FormData();
    formData.append('document', file);
    formData.append('level', level);
    if (customQuality) formData.append('customQuality', customQuality.toString());
    if (targetSizeInBytes) formData.append('targetSizeInBytes', targetSizeInBytes.toString());

    let response;
    try {
        response = await api.post(endpoint, formData, {
            responseType: 'blob'
        });
    } catch (error: any) {
        if (error.response?.data instanceof Blob) {
            let parsedData;
            try {
                const text = await error.response.data.text();
                parsedData = JSON.parse(text);
            } catch (e) {
                // Ignore parsing error, will fall through to default error handlers
            }
            if (parsedData?.message) {
                throw new Error(parsedData.message);
            }
        }

        if (error.response?.status === 429) {
            throw new Error('You are compressing too fast! Please wait a moment.');
        }

        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }

        throw new Error(error.message || 'An error occurred while compressing.');
    }

    const blob = response.data;
    const url = window.URL.createObjectURL(blob);

    if (autoDownload) {
        const a = document.createElement('a');
        a.href = url;

        // Get the filename from the disposition header if possible, else default
        const contentDisposition = response.headers['content-disposition'];
        let filename = `compressed_${file.name}`;
        if (contentDisposition && contentDisposition.indexOf('filename=') !== -1) {
            filename = contentDisposition.split('filename="')[1]?.split('"')[0] || filename;
        }

        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        // Do not revokeObjectURL here because we need it for the preview! 
        // URL.revokeObjectURL will be handled by the component.
    }

    // Try to get original and compressed sizes from headers
    const originalSizeStr = response.headers['x-original-size'];
    const compressedSizeStr = response.headers['x-compressed-size'];

    let originalSize = file.size;
    let compressedSize = blob.size;

    if (originalSizeStr && !isNaN(Number(originalSizeStr))) {
        originalSize = Number(originalSizeStr);
    }
    if (compressedSizeStr && !isNaN(Number(compressedSizeStr))) {
        compressedSize = Number(compressedSizeStr);
    }

    return {
        originalSize,
        compressedSize,
        compressedUrl: url
    };
};
