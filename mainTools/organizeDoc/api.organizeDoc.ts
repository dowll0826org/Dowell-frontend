import { api } from '@/lib/api';
import { FileItem, PageConfig } from './type.organizeDoc';

export const organizeDocumentApi = async (fileItem: FileItem, pageOrder: PageConfig[]): Promise<Blob> => {
  const formData = new FormData();
  formData.append('document', fileItem.file);
  
  // We send the array of page configurations as a JSON string
  const orderData = pageOrder.map(page => ({
    originalIndex: page.originalIndex,
    rotation: page.rotation
  }));
  formData.append('pageOrder', JSON.stringify(orderData));

  try {
    const response = await api.post(
      '/api/v1/documents/organize',
      formData,
      {
        responseType: 'blob', // Important for downloading files
        timeout: 60000,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to organize document');
  }
};
