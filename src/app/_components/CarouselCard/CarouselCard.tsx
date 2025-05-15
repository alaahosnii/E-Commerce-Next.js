"use client"
import Carousel from "react-bootstrap/Carousel";
import Image from "next/image";
function CarouselCard() {
  return (
    <Carousel style={{ width: "100%", height: "350px" }}>
      <Carousel.Item>
        <Image src="/cover_image.png" height={350} alt="cover image" width={1000} />
      </Carousel.Item>
      <Carousel.Item>
        <Image src="/cover_image.png" height={350} alt="cover image" width={1000} />
      </Carousel.Item>
      <Carousel.Item>
        <Image src="/cover_image.png" height={350} alt="cover image" width={1000} />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselCard;