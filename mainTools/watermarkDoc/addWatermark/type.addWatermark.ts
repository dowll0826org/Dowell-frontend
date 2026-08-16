export type WatermarkAlignment = 'diagonal' | 'horizontal' | 'vertical';

export interface WatermarkOptions {
  text: string;
  color: string;
  opacity: number;
  size: number;
  alignment: WatermarkAlignment;
}
