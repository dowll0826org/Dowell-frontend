export interface TextModification {
  id: string;
  type?: 'text' | 'erase';
  pageIndex: number;
  text: string;
  ratioX: number; // 0 to 1
  ratioY: number; // 0 to 1
  widthRatio?: number; // 0 to 1 (used for erase tool)
  heightRatio?: number; // 0 to 1 (used for erase tool)
  size: number;
  color: string; // hex
  fontFamily?: string;
  isBold?: boolean;
  isItalic?: boolean;
  isUnderline?: boolean;
}

export interface FileItem {
  id: string;
  file: File;
  previewUrl: string | null;
  status: 'pending' | 'uploading' | 'processing' | 'done' | 'error';
  progress: number;
  error?: string;
  resultUrl?: string;
}
