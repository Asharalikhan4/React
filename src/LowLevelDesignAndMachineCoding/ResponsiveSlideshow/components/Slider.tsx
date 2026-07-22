import { useState } from "react";
import "../ResponsiveSlideshow.css";
import Slide from "./Slide";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

interface SliderTypes {
  images: string[]
};

const Slider = ({ images }: SliderTypes) => {
  const [active, setActive] = useState<number>(0);

  const onNext = () => {
    if (active < images.length - 1) {
      setActive((prev) => prev + 1);
    }
  };

  const onPrev = () => {
    if (active > 0) {
      setActive((prev) => prev - 1);
    }
  };

  console.log("Slider Component", images);

  return (
    <div className="slider">
      <div className="slides">
        {images?.map((e, i) => (
          <Slide key={e.caption} {...e} active={i === active} />
        ))}
      </div>
      <div className="navigation">
        <div className="navigation-bottom">
          {images.map((e, i) => (
            <div
              className={`dots ${i === active ? "active" : ""}`}
              key={e.caption}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
        <div className="navigation-next-prev">
          <div className="next-prev prev" onClick={onPrev}>
            <FaChevronCircleLeft />
          </div>
          <div className="next-prev next" onClick={onNext}>
            <FaChevronCircleRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
