export interface SwipeAnimationConfig {
  /** Folder path inside /public directory. e.g. '/swipe-animation' */
  folderPath: string;
  /** Total number of frames in your swipe sequence (215 frames uploaded) */
  frameCount: number;
  /** Prefix for each file name ('ezgif-frame-') */
  fileNamePrefix: string;
  /** File extension including the dot ('.png') */
  fileExtension: string;
  /** Number of digits to pad numbers with zeros (3 for 001) */
  zeroPadLength: number;
  /** Starting frame index number (1) */
  startIndex: number;
  /** Target playback frames per second (20 FPS for smooth full screen playback) */
  fps: number;
}

export const swipeAnimationConfig: SwipeAnimationConfig = {
  folderPath: '/swipe-animation',
  frameCount: 215,
  fileNamePrefix: 'ezgif-frame-',
  fileExtension: '.png',
  zeroPadLength: 3,
  startIndex: 1,
  fps: 20,
};

export const getSwipeFrameUrl = (index: number, config: SwipeAnimationConfig = swipeAnimationConfig): string => {
  const numStr = config.zeroPadLength > 0
    ? String(index).padStart(config.zeroPadLength, '0')
    : String(index);
  return `${config.folderPath}/${config.fileNamePrefix}${numStr}${config.fileExtension}`;
};
