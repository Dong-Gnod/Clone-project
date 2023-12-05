import Link from "next/link";
import { ArrowLeft, ArrowRight } from "./icons/icons";
import { useEffect, useRef, useState } from "react";

export default function Series({ series }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const TOTAL_SLIDE = 2;
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
    <div className="flex justify-between w-full h-48 absolute">
      <button className="slideBtn z-50" onClick={prevSlide}>
        <ArrowLeft />
      </button>
      <div
        id="slide-box"
        className="flex w-screen overflow-hidden h-48"
        ref={boxRef}>
        <ul className="flex justify-between absolute h-full" ref={slideRef}>
          {series
            .map((item) => {
              return (
                <Link key={item.id} href={`detail/${item.id}`}>
                  <li key={item.id} className="w-64 mb-7 mr-2.5 h-full">
                    <h1 className="bg-gray-600/50 p-3 rounded-md">
                      {item.name}
                    </h1>

                    <img
                      id={item.id}
                      src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                      alt="Image"
                    />
                  </li>
                </Link>
              );
            })
            .sort((a, b) => b.vote_average - a.vote_average)
            .slice(0, 18)}
        </ul>
      </div>
      <button className="slideBtn z-[100]" onClick={nextSlide}>
        <ArrowRight />
      </button>
    </div>
  );
}
