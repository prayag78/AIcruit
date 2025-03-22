import React, { useState } from "react";
import { QuoteIcon } from "lucide-react";

const Testimonials = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      text: "Without JobHunt I'd be homeless, they found me a job and got me sorted out quickly with everything! Can't quite... The Mitech team works really hard to ensure high level of quality",
      name: "Demo John1",
      role: "Web Developer",
      review: "Good Jobs",
      image: "",
    },
    {
      id: 2,
      text: "Without JobHunt I'd be homeless, they found me a job and got me sorted out quickly with everything! Can't quite... The Mitech team works really hard to ensure high level of quality",
      name: "Demo John2",
      role: "Web Developer",
      review: "Good Jobs",
      image: "",
    },
    {
      id: 3,
      text: "Without JobHunt I'd be homeless, they found me a job and got me sorted out quickly with everything! Can't quite... The Mitech team works really hard to ensure high level of quality",
      name: "Demo John3",
      role: "Web Developer",
      review: "Good Jobs",
      image: "",
    },
    {
      id: 4,
      text: "Without JobHunt I'd be homeless, they found me a job and got me sorted out quickly with everything! Can't quite... The Mitech team works really hard to ensure high level of quality",
      name: "Demo John4",
      role: "Developer",
      review: "Good Jobs",
      image: "",
    },
    {
      id: 5,
      text: "Without JobHunt I'd be homeless, they found me a job and got me sorted out quickly with everything! Can't quite... The Mitech team works really hard to ensure high level of quality",
      name: "Demo John5",
      role: "Web",
      review: "Good Jobs",
      image: "",
    },
    {
      id: 6,
      text: "Without JobHunt I'd be homeless, they found me a job and got me sorted out quickly with everything! Can't quite... The Mitech team works really hard to ensure high level of quality",
      name: "Demo John6",
      role: "Web Desighner",
      review: "Good Jobs",
      image: "",
    },
  ];

  // Calculate number of possible slides (total testimonials - items per slide)
  const slidesCount = testimonials.length - 3 + 1;

  // Get current visible testimonials (always exactly 3)
  const visibleTestimonials = testimonials.slice(activeSlide, activeSlide + 3);

  return (
    <div className="w-full bg-[#f0f5f7] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl md:text-4xl font-medium mb-12 md:mb-16">
          Testimonials From Our Customers
        </h2>

        <div className="relative max-w-6xl mx-auto">
          {/* Decorative quotes */}
          <div className="absolute left-0 top-0 text-[#d9d9d9] transform -translate-x-4 -translate-y-4">
            <QuoteIcon className="w-12 h-12 rotate-180" />
          </div>
          <div className="absolute right-0 bottom-0 text-[#d9d9d9] transform translate-x-4 translate-y-4">
            <QuoteIcon className="w-12 h-12" />
          </div>

          {/* Testimonials container */}
          <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-full md:w-auto snap-center bg-white rounded-lg p-6 shadow-sm relative"
                style={{ minWidth: "300px" }} // Set a minimum width for each testimonial
              >
                <div className="text-[#2770d5] font-medium mb-4 block">
                  {testimonial.review}
                </div>
                <p className="text-[#8e8e8e] mb-6 text-xs">{testimonial.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#d9d9d9] overflow-hidden">
                    <img
                      src="/api/placeholder/48/48"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-[#8e8e8e]">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation dots (hidden on small screens) */}
          <div className="hidden md:flex justify-center gap-2 mt-8">
            {[...Array(slidesCount)].map((key, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  activeSlide === index ? "bg-[#2770d5]" : "bg-[#d9d9d9]"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;