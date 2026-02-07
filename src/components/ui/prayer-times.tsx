import React from 'react';

const SalahTimeIcon = ({
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
      viewBox={viewBox}
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        opacity,
        transform: transforms.join(' ') || undefined,
        filter: shadow > 0 ? `drop-shadow(0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.3))` : undefined,
        backgroundColor: background !== 'transparent' ? background : undefined
      }}
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth={strokeWidth}><path d="M15.01 5.002C13.742 3.187 11.385 2 9.004 2A7.004 7.004 0 0 0 2 9.003c0 3.7 2.87 6.746 6.504 7.003"/><path strokeLinejoin="round" d="M9.005 7.002v2.501l-1.501 1m5.111 5.046c-1.361-1.656-1.594-3.32.354-5.339c2.046-1.825 3.224-2.688 3.538-3.208c.314.52 1.511 1.383 3.557 3.208c1.854 1.654 1.738 3.682.377 5.339m-7.826 0h-.523m.523 0h7.826m0 0h.46m-9.88 0h1.071m0 0v5.544c.04.668 0 .98 1.211.892h3.185m4.413-6.436H22m-1.1 0v5.646c.117.907-.605.748-1.067.79h-3.346m0 0l.035-2.134"/></g>
    </svg>
  );
};

export default SalahTimeIcon;