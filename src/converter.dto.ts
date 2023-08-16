export type VideoFormat = 'mp4' | 'avi' | 'webm';

export class ConvertVideoBody {
  url: string;
  format: VideoFormat;
}
