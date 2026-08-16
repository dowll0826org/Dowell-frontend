import axios, { AxiosProgressEvent } from 'axios';
import { api as axiosApi } from '@/lib/api';

export const removeWatermarkApi = async (
    file: File,
    onProgress?: (progressEvent: AxiosProgressEvent) => void
): Promise<Blob> => {
    try {
        const formData = new FormData();
        formData.append('document', file);

        const response = await axiosApi.post(`/api/v1/documents/remove-watermark`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            responseType: 'blob',
            onUploadProgress: onProgress,
            timeout: 180000,
        });

        if (response.status !== 200) {
            throw new Error(`Failed to remove watermark: Server returned ${response.status}`);
        }

        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            let errorMsg = 'Unknown error occurred while removing watermark.';
            try {
                if (error.response.data instanceof Blob) {
                    const text = await error.response.data.text();
                    const json = JSON.parse(text);
                    if (json && json.message) {
                        errorMsg = json.message;
                    }
                } else if (error.response.data && error.response.data.message) {
                    errorMsg = error.response.data.message;
                }
            } catch (e) {
                errorMsg = error.response.statusText || errorMsg;
            }
            throw new Error(errorMsg);
        }
        throw new Error(error.message || 'Network error occurred while removing watermark.');
    }
};
