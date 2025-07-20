import { useState, useEffect } from "react";

const Banner = () => {
  const banners = [
    {
      id: 1,
      img: "https://www.motilaloswal.com/learning-centre/2024/7/media_1147a54fe3b9f5000a68640aa33196f335ad89dfa.jpg?width=750&format=jpg&optimize=medium",
      alt: "Financial education banner",
    },
    {
      id: 2,
      img: "https://s7d9.scene7.com/is/image/statepa/websiteheroimage%20(1200%20x%20600%20px)?ts=1743522343362&dpr=off",
      alt: "Investment opportunities",
    },
    {
      id: 3,
      img: "https://via.placeholder.com/150",
      alt: "Placeholder banner",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  // Auto-advance banner every 5 seconds
  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-4 overflow-hidden rounded-lg shadow-lg">
      <div className="relative h-64 md:h-96">
        <img
          src={banners[currentIndex].img}
          alt={banners[currentIndex].alt}
          className="object-cover w-full h-full transition-opacity duration-500"
        />

        {/* Navigation buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white  p-2 rounded-full hover:bg-black/70 transition-colors"
          aria-label="Previous banner"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          aria-label="Next banner"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Indicator dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
