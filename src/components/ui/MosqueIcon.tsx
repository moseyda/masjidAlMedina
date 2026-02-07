import React from 'react';

const MosqueIcon = ({
  size = undefined,
  color = '#000000',
  strokeWidth = 2,
  background = 'transparent',
  opacity = 1,
  rotation = 0,
  shadow = 0,
  flipHorizontal = false,
  flipVertical = false,
  padding = 0
}) => {
  const transforms = [];
  if (rotation !== 0) transforms.push(`rotate(${rotation}deg)`);
  if (flipHorizontal) transforms.push('scaleX(-1)');
  if (flipVertical) transforms.push('scaleY(-1)');

  const viewBoxSize = 24 + (padding * 2);
  const viewBoxOffset = -padding;
  const viewBox = `${viewBoxOffset} ${viewBoxOffset} ${viewBoxSize} ${viewBoxSize}`;

  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        width={size}
        height={size}
        fill="currentColor"
        style={{
          color,
          opacity,
          transform: transforms.join(' ') || undefined,
          filter: shadow > 0
            ? `drop-shadow(0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.3))`
            : undefined,
          backgroundColor: background !== 'transparent' ? background : undefined
        }}
      >

      <path fill="currentColor" d="M206.8 288h226.4c43.5 0 78.8-35.3 78.8-78.8c0-25.5-12.3-49.4-33.1-64.2L329.3 38.6c-5.6-3.9-13-3.9-18.5 0L161.1 145a78.74 78.74 0 0 0-33.1 64.2c0 43.5 35.3 78.8 78.8 78.8M544 576c35.3 0 64-28.7 64-64V288c0-17.7-14.3-32-32-32s-32 14.3-32 32v48H96v-48c0-17.7-14.3-32-32-32s-32 14.3-32 32v224c0 35.3 28.7 64 64 64zM272 448c0-26.5 21.5-48 48-48s48 21.5 48 48v80h-96z"/>
    </svg>
  );
};

export default MosqueIcon;