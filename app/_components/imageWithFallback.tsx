import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface Props extends ImageProps {
  src: string;
  fallbackSrc: string;
}

export default function ImageWithFallback({ src, fallbackSrc, ...rest }: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt=''
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};
