"use client"
import Carousel from "react-bootstrap/Carousel";
function CarouselCard() {
  return (
    <Carousel style={{ width: "100%", height: "350px" }}>
      <Carousel.Item>
        <img src="/cover_image.png" height={"350px"} />
      </Carousel.Item>
      <Carousel.Item>
        <img src="/cover_image.png" height={"350px"} />
      </Carousel.Item>
      <Carousel.Item>
        <img src="/cover_image.png" height={"350px"} />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselCard;