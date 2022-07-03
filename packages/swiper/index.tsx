import InternalSwiper from './swiper';
import SwiperItem from './swiper-item';

export type { SwiperProps, SwiperRef } from './swiper';
export type { SwiperItemProps } from './swiper-item';

type InternalSwiperType = typeof InternalSwiper;

export interface SwiperInterface extends InternalSwiperType {
  Item: typeof SwiperItem;
}

const Swiper = InternalSwiper as SwiperInterface;

Swiper.Item = SwiperItem;

export default Swiper;
