import { useEffect, useRef, useState } from "react";
import { Left, Right } from "../icons";
import { Slide } from "./slide";

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const TOTAL_SLIDE = 7;
  const slideRef = useRef(null);
  const boxRef = useRef(null);

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDE) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDE);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    let width = boxRef.current.clientWidth;
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${width * currentSlide}px)`;
    console.log(`width: ${width}, current: ${currentSlide}`);
  }, [currentSlide]);
  console.log(slideRef.current);

  return (
    <div>
      {currentSlide}
      <div
        ref={boxRef}
        className="w-screen relative border-solid border-red-950 h-80">
        <div ref={slideRef}>
          <Slide current={currentSlide} />
        </div>
      </div>
      <div>
        <button onClick={prevSlide}>
          <Left />
        </button>
        <button onClick={nextSlide}>
          <Right />
        </button>
      </div>
    </div>
  );
}
