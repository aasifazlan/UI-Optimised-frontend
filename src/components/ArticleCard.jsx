import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // optional icons

const ArticleCard = ({ title, excerpt, images = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 4000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200">
      {/* Slider container */}
      <div className="relative">
        <div ref={sliderRef} className="keen-slider h-48 w-full">
          {images.map((src, index) => (
            <div key={index} className="keen-slider__slide flex justify-center items-center">
              <img
                src={src}
                alt={`slide-${index}`}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            instanceRef.current?.prev();
          }}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-30 p-1 rounded-full text-white hover:bg-opacity-50"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            instanceRef.current?.next();
          }}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-30 p-1 rounded-full text-white hover:bg-opacity-50"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-2 h-2 rounded-full ${
                currentSlide === idx ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Text Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{excerpt}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
