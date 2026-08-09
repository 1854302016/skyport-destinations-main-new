import React from 'react';
import './Testimonial.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const testimonials = [
  {
    name: 'Kajal',
    feedback: 'The trip was amazing! Everything was well-organized and comfortable.',
    image: '/Images/Images/woman.png',
    location: 'Delhi',
    rating: 5
  },
  {
    name: 'Vinay',
    feedback: 'Beautiful experience in Uttarakhand. Highly recommended!',
    image: '/Images/Images/man.png',
    location: 'Mumbai',
    rating: 4
  },
  {
    name: 'Harsh',
    feedback: 'Wonderful service and very polite staff. Loved it!',
        image: '/Images/Images/man.png',
    location: 'Bangalore',
    rating: 4
  },
  {
    name: 'Anjali Sharma',
    feedback: 'The trip was amazing! Everything was well-organized and comfortable.',
    image: '/Images/Images/woman.png',
    location: 'Delhi',
    rating: 5
  },
  {
    name: 'Rohit Verma',
    feedback: 'Beautiful experience in Uttarakhand. Highly recommended!',
    image: '/Images/Images/man.png',
    location: 'Mumbai',
    rating: 4
  },
  {
    name: 'Priya Mehta',
    feedback: 'Wonderful service and very polite staff. Loved it!',
    image: '/Images/Images/woman.png',
    location: 'Bangalore',
    rating: 5
  },
  
];

const Testimonial = () => {
  return (
    <div className="testimonial-wrapper">
      <h2 className="testimonial-title">What Our Customers Say</h2>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="testimonial-card">
  <img src={item.image} alt={item.name} className="testimonial-image" />
  <p className="testimonial-feedback">“{item.feedback}”</p>
  <div className="testimonial-stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < item.rating ? 'star filled' : 'star'}>★</span>
    ))}
  </div>
  <h5 className="testimonial-name">{item.name}</h5>
  <div className="testimonial-location">{item.location}</div>
</div>

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
