import { useState } from "react";
import { QuoteIcon } from "lucide-react";
import { assets } from "../assets/assets";

const Testimonials = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const testimonials = [
    {
      id: 1,
      text: "AIcruit helped me land my dream job in just two weeks! The recommendations were spot on and the application process was seamless.",
      name: "Priya Sharma",
      role: "Data Scientist",
      review: "Amazing Experience",
      image: assets.p1,
    },
    {
      id: 2,
      text: "I was able to find a remote internship that matched my skills perfectly. The AI suggestions saved me so much time.",
      name: "Alex Kim",
      role: "Frontend Intern",
      review: "Highly Recommend",
      image: assets.p2,
    },
    {
      id: 3,
      text: "The platform is super intuitive and the support team is very responsive. I got multiple interview calls within days.",
      name: "Fatima Al-Farsi",
      role: "Backend Developer",
      review: "Great Support",
      image: assets.p3,
    },
    {
      id: 4,
      text: "As a recruiter, I found the candidate matching feature extremely useful. It made shortlisting applicants much faster.",
      name: "Rahul Mehta",
      role: "Recruiter",
      review: "Efficient Hiring",
      image: assets.p7,
    },
    {
      id: 5,
      text: "I loved the resume upload and tracking features. I always knew the status of my applications.",
      name: "Sofia Garcia",
      role: "UI/UX Designer",
      review: "User Friendly",
      image: assets.p5,
    },
    {
      id: 6,
      text: "The job alerts kept me updated about new opportunities. I finally found a position that fits my interests.",
      name: "Liam O'Connor",
      role: "Product Manager",
      review: "Very Helpful",
      image: assets.p6,
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
                      src={testimonial.image}
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