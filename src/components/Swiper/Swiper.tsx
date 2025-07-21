import { Swiper as SwiperDefault, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import "./Swiper.scss";
import { useContext, useRef } from "react";
import AppContext from "../../lib/context/app-context";
import useWindowSize from "../../lib/hooks/use-window-size";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Slide = ({
  date,
  description,
}: {
  date: number;
  description: string;
}) => {
  return (
    <div className="swiper-slide">
      <span className="swiper-slide__date">{date}</span>
      <p className="swiper-slide__description">{description}</p>
    </div>
  );
};

const Swiper = () => {
  const { events, currentEvent } = useContext(AppContext);
  const { width } = useWindowSize();
  const swiperRef = useRef(null);

  useGSAP(() => {
    if (!swiperRef.current) {
      return;
    }
    gsap.fromTo(
      swiperRef.current,
      { opacity: 0, duration: 2, delay: 1 },
      { opacity: 1, duration: 2, delay: 1 }
    );
  }, [currentEvent]);

  return (
    <div className="swiper-container">
      <SwiperDefault
        ref={swiperRef}
        slidesPerView={width > 988 ? 3 : 1}
        spaceBetween={60}
        freeMode={true}
        pagination={true}
        navigation={true}
        modules={[FreeMode, Navigation, Pagination]}
      >
        {events[currentEvent].events.map((event, index) => (
          <SwiperSlide key={currentEvent + index + event.year}>
            <Slide date={event.year} description={event.description} />
          </SwiperSlide>
        ))}
      </SwiperDefault>
    </div>
  );
};

export default Swiper;
