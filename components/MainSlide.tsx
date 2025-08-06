'use client'
import Slider from 'react-slick';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface ArrowProps {
  onClick?: () => void;
}

function PrevArrow(props: ArrowProps) {
  const { onClick } = props;
  return (
    <button onClick={onClick} className='main-arrow-prev'>
      <Image src="/icons/arrow_prev.png" alt="이전" width={30} height={50} />
    </button>
  );
}

function NextArrow(props: ArrowProps) {
  const { onClick } = props;
  return (
    <button onClick={onClick} className='main-arrow-next'>
      <Image src="/icons/arrow_next.png" alt="다음" width={30} height={50} />
    </button>
  );
}

export default function MainSlide () {

 const sliderRef = useRef<Slider>(null);

    const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: false,
    afterChange: (current: number) => {
      handleFocusOnSlide(current);
    },
    prevArrow: <PrevArrow/>,
    nextArrow: <NextArrow/>
  };

  const handleFocusOnSlide = (currentIndex: number) => {
    if (!sliderRef.current) return;

    const slides = document.querySelectorAll('.slick-slide');

    slides.forEach((slide, index) => {
      if (index === currentIndex) {
        (slide as HTMLElement).removeAttribute('tabindex');
      } else {
        (slide as HTMLElement).setAttribute('tabindex', '-1');
      }
    });
  };

  useEffect(() => {
    handleFocusOnSlide(0);
  }, []);

  return (
    <Slider {...settings} ref={sliderRef} className='main-slide-wrapper'>
      <div className='main-slider'>
        <Image src="/images/main_banner_1.png" alt='메인배너1' fill/>
      </div>
      <div className='main-slider'>
        <Image src="/images/main_banner_2.jpg" alt='메인배너2' fill/>
      </div>
      <div className='main-slider'>
        <Image src="/images/main_banner_3.jpg" alt='메인배너3' fill/>
      </div>
    </Slider>
  );
};