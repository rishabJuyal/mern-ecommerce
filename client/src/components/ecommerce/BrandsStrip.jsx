import React from "react";
import { Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8 } from "../../assets/images"; // Adjust path accordingly

const brands = [
  { name: "Tanishq (Jewelry)", url: "https://www.tanishq.co.in", logo: Img1 },
  { name: "Fastrack (Watches)", url: "https://www.fastrack.in", logo: Img2 },
  { name: "Amazon India", url: "https://www.amazon.in", logo: Img3 },
  { name: "Apple India", url: "https://www.apple.com/in/", logo: Img4 },
  { name: "Google India", url: "https://www.google.co.in", logo: Img5 },
  { name: "Facebook India", url: "https://www.facebook.com", logo: Img6 },
  { name: "Instagram India", url: "https://www.instagram.com", logo: Img7 },
  { name: "YouTube India", url: "https://www.youtube.com", logo: Img8 },
];

const BrandsStrip = () => {
  return (
    <div className="bg-white py-10 border-t">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6 items-center justify-items-center">
          {brands.map((brand, idx) => (
            <a
              key={idx}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              title={brand.name}
              className="block"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-10 object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsStrip;
