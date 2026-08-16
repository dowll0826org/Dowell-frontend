export interface FileItem {
  id: string;
  file: File;
  preview: string | null;
  size: string;
  type: string;
}

export type SplitMode = 'range' | 'extract';
export type RangeMode = 'custom' | 'fixed';
export type ExtractMode = 'all' | 'select';

export interface SplitOptions {
  splitMode: SplitMode;
  rangeMode: RangeMode;
  extractMode: ExtractMode;
  customRanges: string; // e.g. '1-5'
  fixedRangePages: number; // e.g. 1
  selectedPages: string; // e.g. '1, 5-8'
  mergeExtracted: boolean; // Option to merge extracted pages into one PDF
}
