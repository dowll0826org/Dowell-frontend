import { api } from '@/lib/api';
import { FileItem, SplitOptions } from './type.splitDoc';
import toast from 'react-hot-toast';

export const splitDocumentApi = async (fileItem: FileItem, options: SplitOptions) => {
  if (options.splitMode === 'extract' && options.extractMode === 'select' && !options.selectedPages) {
    throw new Error('Please enter the pages you want to extract (e.g., "1,3,5-7").');
  }

  const formData = new FormData();
  formData.append('document', fileItem.file);
  formData.append('options', JSON.stringify(options));

  const response = await api.post('/api/v1/documents/split', formData, {
    responseType: 'blob'
  });

  const blob = response.data;
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  
  const isZip = response.headers['content-type'] === 'application/zip';
  const extension = isZip ? 'zip' : 'pdf';
  const randomId = crypto.randomUUID();
  a.download = `docviahub-split-${randomId}.${extension}`;
  
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
