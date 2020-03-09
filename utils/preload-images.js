export default function PreloadImages(imagesArray) {
  imagesArray.forEach(imgSrc => {
    const img = new Image();
    img.src = imgSrc
  });
}