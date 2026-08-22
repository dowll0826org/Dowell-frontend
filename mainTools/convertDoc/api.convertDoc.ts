import { api } from '@/lib/api';
export const convertToPdfApi = async (file: File | File[], type: string) => {
    const formData = new FormData();
    formData.append('type', type);
    
    if (Array.isArray(file)) {
        file.forEach(f => formData.append('document', f));
    } else {
        formData.append('document', file);
    }

    try {
        const response = await api.post('/api/v1/convert/to-pdf', formData, {
            responseType: 'blob',
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        return {
            blob: response.data,
            contentType: response.headers['content-type'],
            contentDisposition: response.headers['content-disposition']
        };
    } catch (error: any) {
        if (error.response?.data instanceof Blob) {
            let parsedData;
            try {
                const text = await error.response.data.text();
                parsedData = JSON.parse(text);
            } catch (e) {
                // Ignore parsing errors
            }
            if (parsedData?.message) {
                throw new Error(parsedData.message);
            }
        }
        throw new Error(error.response?.data?.message || error.message || 'Failed to convert document.');
    }
};

export const convertFromPdfApi = async (file: File, targetFormat: string) => {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('targetFormat', targetFormat);

    try {
        const response = await api.post('/api/v1/convert/from-pdf', formData, {
            responseType: 'blob',
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        return {
            blob: response.data,
            contentType: response.headers['content-type'],
            contentDisposition: response.headers['content-disposition']
        };
    } catch (error: any) {
        if (error.response?.data instanceof Blob) {
            let parsedData;
            try {
                const text = await error.response.data.text();
                parsedData = JSON.parse(text);
            } catch (e) {
                // Ignore
            }
            if (parsedData?.message) {
                throw new Error(parsedData.message);
            }
        }
        throw new Error(error.response?.data?.message || error.message || 'Failed to convert from PDF.');
    }
};
