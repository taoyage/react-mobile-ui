import React from 'react';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

export interface ImageProps {
  /** 图片地址 */
  src: string;
  /** 图片描述 */
  alt?: string;
  /** 图片宽度 */
  width?: number | string;
  /** 图片高度 */
  height?: number | string;
  /** 加载时的占位图地址 */
  loading?: string;
  style?: React.CSSProperties;
  /** 是否懒加载 */
  lazy?: boolean;
  /** 图片填充模式 */
  fit?: 'contain' | 'cover' | 'fill' | 'scale-down';
  className?: string;
  /** 图片点击事件 */
  onClick?: (event: React.MouseEvent<HTMLImageElement, Event>) => void;
  /** 图片加载失败时回调 */
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  /** 图片加载完成时回调 */
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const Image: React.FC<ImageProps> = (props) => {
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
};

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
