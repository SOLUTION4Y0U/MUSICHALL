import { FC, useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

const ImageGallery: FC<ImageGalleryProps> = ({ images, alt }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return <div className="image-gallery-empty">Изображения недоступны</div>;
  }

  return (
    <div className="image-gallery">
      <div className="image-gallery-main">
        <img src={images[selectedImage]} alt={`${alt} - изображение ${selectedImage + 1}`} />
      </div>

      {images.length > 1 && (
        <div className="image-gallery-thumbnails">
          {images.map((image, index) => (
            <div
              key={index}
              className={`image-thumbnail ${selectedImage === index ? 'active' : ''}`}
              onClick={() => setSelectedImage(index)}
            >
              <img src={image} alt={`${alt} - миниатюра ${index + 1}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;