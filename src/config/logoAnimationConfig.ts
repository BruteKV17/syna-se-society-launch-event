export interface LogoAnimationConfig {
  /** Folder path inside the /public directory. e.g. '/logo-animation' */
  folderPath: string;
  /** Total number of frames in your image sequence (e.g. 91) */
  frameCount: number;
  /** Prefix for each file name (e.g. 'ezgif-frame-') */
  fileNamePrefix: string;
  /** File extension including the dot (e.g. '.png') */
  fileExtension: string;
  /** Number of digits to pad numbers with zeros (e.g. 3 for 001) */
  zeroPadLength: number;
  /** Starting frame index number (usually 0 or 1) */
  startIndex: number;
  /** Target frames per second for auto playback (e.g. 30 fps) */
  fps: number;
}

export const logoAnimationConfig: LogoAnimationConfig = {
  folderPath: '/logo-animation',
  frameCount: 300,
  fileNamePrefix: 'ezgif-frame-',
  fileExtension: '.png',
  zeroPadLength: 3,
  startIndex: 1,
  fps: 30,
};

/**
 * Helper to construct frame URL based on config and index.
 * Example: /logo-animation/ezgif-frame-001.png
 */
export const getFrameUrl = (index: number, config: LogoAnimationConfig = logoAnimationConfig): string => {
  const numStr = config.zeroPadLength > 0
    ? String(index).padStart(config.zeroPadLength, '0')
    : String(index);
  return `${config.folderPath}/${config.fileNamePrefix}${numStr}${config.fileExtension}`;
};
