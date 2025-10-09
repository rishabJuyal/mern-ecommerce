import React from "react";

const ImageGallery = ({ images, mainImage, setMainImage }) => {
  return (
    <>
      <aside className="col-span-1 space-y-4 text-center">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Thumb ${idx}`}
            className="w-14 h-14 border p-1 cursor-pointer"
            onClick={() => setMainImage(img)}
          />
        ))}
      </aside>

      <section className="col-span-4">
        <img
          src={mainImage}
          alt="Main product"
          className="w-full max-w-md object-contain mx-auto"
        />
      </section>
    </>
  );
};

export default ImageGallery;
