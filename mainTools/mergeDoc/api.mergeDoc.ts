import { api } from '@/lib/api';
import { FileItem } from './type.mergeDoc';

export const mergeDocumentsApi = async (files: FileItem[]) => {
  if (files.length === 0) return;

  const formData = new FormData();
  files.forEach(f => {
    formData.append('documents', f.file);
  });

  const response = await api.post('/api/v1/documents/merge', formData, {
    responseType: 'blob'
  });

  const blob = response.data;
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const randomId = crypto.randomUUID();
  a.download = `docviahub-merge-${randomId}.pdf`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
