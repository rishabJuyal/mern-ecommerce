// components/ui/Carousel.jsx
import React from "react";
import Slider from "react-slick";
import { Img9 } from "../../assets/images";

// Custom arrows
const NextArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{
      ...style,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--color-primary)",
      borderRadius: "4px",
      right: 15,
      zIndex: 2,
      width: 40,
      height: 40,
      color: "white",
      cursor: "pointer",
    }}
    onClick={onClick}
  />
);

const PrevArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{
      ...style,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--color-primary)",
      borderRadius: "4px",
      left: 15,
      zIndex: 2,
      width: 40,
      height: 40,
      color: "white",
      cursor: "pointer",
    }}
    onClick={onClick}
  />
);

const carouselItems = [
  { image: Img9, alt: "Marshall Speaker" },
  { image: Img9, alt: "Smartwatch" },
  { image: Img9, alt: "DSLR Camera" },
];

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "ease-in-out",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="w-full max-w-7xl mx-auto overflow-hidden">
      <Slider {...settings}>
        {carouselItems.map((item, idx) => (
          <div key={idx} className="flex justify-center">
            <img
              src={item.image}
              alt={item.alt}
              className="w-full h-full object-cover block"
              style={{ objectPosition: 'center center' }} // Ensures the image stays centered
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
