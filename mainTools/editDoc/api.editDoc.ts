import axios, { AxiosProgressEvent } from 'axios';
import { TextModification } from './type.editDoc';

// Base URL configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const editDocumentApi = async (
    file: File,
    modifications: TextModification[],
    onProgress?: (progressEvent: AxiosProgressEvent) => void
): Promise<Blob> => {
    try {
        const formData = new FormData();
        formData.append('document', file);
        formData.append('modifications', JSON.stringify(modifications));

        const response = await axios.post(`${API_BASE_URL}/api/v1/documents/edit-pdf`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            responseType: 'blob',
            onUploadProgress: onProgress,
            // 3 minutes timeout for heavy editing
            timeout: 180000,
        });

        if (response.status !== 200) {
            throw new Error(`Failed to edit document: Server returned ${response.status}`);
        }

        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response) {
            let errorMsg = 'Unknown error occurred during document editing.';
            try {
                // Try to parse the blob error response as JSON if possible
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
        throw new Error(error.message || 'Network error occurred during document editing.');
    }
};
