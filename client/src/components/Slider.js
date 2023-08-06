import React from 'react';
import { Carousel } from 'react-bootstrap';
import "../styles/slider.css"

const Slider = () => {

  const slides = [
    {
      image: 'https://klippe.qodeinteractive.com/wp-content/uploads/2018/02/event-background-carousel-img-1.jpg',
      caption: 'Ride the Waves of Adventure! Explore Our Exquisite Surf Products Collection Today.',
    },
    {
      image: 'https://thegrand.moonpalace.com/czp_Snorkel_6_explore_and_experience_hero_3600x1800px_8a84a270cf.jpg',
      caption: 'Dive into an Underwater Paradise! Discover Our Snorkeling Products for an Unforgettable Experience.',
    },
    {
      image: 'https://thecarousel.com/wp-content/uploads/2022/08/bigstock-Skin-Care-Woman-With-Beauty-F-412658137-1-780x361.jpeg',
      caption: 'Sun-Kissed Protection for Your Perfect Day at the Beach! Check Out Our Premium Sunscreen Collection',
    },
    {
      image: 'https://www.sunofabeachtowels.com/wp-content/uploads/2017/03/slide1.gif',
      caption: 'Wrap Yourself in Luxury Sands! Unveil Our Plush Beach Towels for Ultimate Comfort and Style',
    },
  ];

  return (
    <div className="slider-wrapper">
      <Carousel interval={3000} indicators={false} prevIcon={<span>&#8249;</span>} nextIcon={<span>&#8250;</span>}>
        {slides.map((slide, index) => (
          <Carousel.Item key={index}>
            <img src={slide.image} alt={`Slide ${index + 1}`} className="slider-image" />
            <div className="slider-caption-container">
              <Carousel.Caption className="slider-caption">
                <h1>{slide.caption}</h1>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;