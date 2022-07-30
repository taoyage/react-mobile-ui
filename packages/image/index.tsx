import React from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

export interface ImageProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  loading?: string;
  style?: React.CSSProperties;
  lazy?: boolean;
  fit?: 'contain' | 'cover' | 'fill' | 'scale-down';
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLImageElement, Event>) => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const Image: React.FC<ImageProps> = React.memo((props) => {
  const imageRef = React.useRef<HTMLImageElement | null>(null);
  const observerEntry = useIntersectionObserver(imageRef, { freezeOnceVisible: true });

  return (
    <img
      className={props.className}
      ref={imageRef}
      src={observerEntry?.isIntersecting || !props.lazy ? props.src : props.loading}
      alt={props.alt}
      style={{ ...props.style, objectFit: props.fit }}
      width={props.width}
      height={props.height}
      onClick={props.onClick}
      onError={props.onError}
      onLoad={props.onLoad}
      draggable={false}
    />
  );
});

Image.defaultProps = {
  alt: '',
  width: '100%',
  height: '100%',
  lazy: false,
  fit: 'fill',
  loading:
    'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8/x8AAqMB0Fk+W34AAAAASUVORK5CYII=',
};

Image.displayName = 'Image';

export default Image;
