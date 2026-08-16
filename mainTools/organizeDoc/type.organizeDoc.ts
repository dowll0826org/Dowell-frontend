export interface FileItem {
  id: string;
  file: File;
  previewUrl: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress?: number;
  numPages?: number;
}

export interface PageConfig {
  id: string; // Unique ID for React keys
  originalIndex: number; // 0-based index from the original PDF
  rotation: number; // 0, 90, 180, 270
}
