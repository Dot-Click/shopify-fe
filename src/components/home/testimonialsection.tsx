import { Box } from "../ui/box";
import { Star } from "lucide-react";

const testimonialsRow1 = [
  {
    quote:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    name: "Jacob Hooper",
    title: "Student in Panadomte Christian College",
    avatar: "/images/avatars/avatar1.png",
    rating: 4,
  },
  {
    quote:
      "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    name: "Esther Howard",
    title: "CEO, Tech Solutions",
    avatar: "/images/avatars/avatar2.png",
    rating: 5,
  },
  {
    quote:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
    name: "Maxi Williams",
    title: "Product Manager, Innovate Co.",
    avatar: "/images/avatars/avatar3.png",
    rating: 5,
  },
];

const testimonialsRow2 = [
  {
    quote:
      "This is a fantastic tool that has saved us countless hours and prevented significant losses. Highly recommended for any Shopify merchant.",
    name: "Sarah Jenkins",
    title: "Owner, The Boutique Hub",
    avatar: "/images/avatars/avatar5.png",
    rating: 5,
  },
  {
    quote:
      "The accuracy is unmatched. We've tried other solutions, but eComProtect's cross-checking gives us the confidence we need.",
    name: "Michael Chen",
    title: "Operations Director, GadgetFlow",
    avatar: "/images/avatars/avatar6.png",
    rating: 5,
  },
  {
    quote:
      "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. A must have!",
    name: "Johnathan Doe",
    title: "Lead Developer, CodeCrafters",
    avatar: "/images/avatars/avatar4.png",
    rating: 4,
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: (typeof testimonialsRow1)[0];
}) => (
  <Box className="mx-4 h-full w-[400px] flex-shrink-0">
    <Box className="flex h-full flex-col justify-between rounded-2xl bg-white p-6 shadow-md">
      <p className="italic text-gray-600">"{testimonial.quote}"</p>
      <hr className="my-4" />
      <div className="flex items-center gap-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div>
          <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
          <p className="text-sm text-gray-500">{testimonial.title}</p>
          <StarRating rating={testimonial.rating} />
        </div>
      </div>
    </Box>
  </Box>
);

export const TestimonialsSection = () => {
  return (
    <Box className="w-full bg-gray-50 py-24 pb-24">
      <Box className="container mx-auto px-6">
        {/* Section Header */}
        <Box className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold text-gray-800">
            <span className="bg-blue-600 px-3 py-1 text-white">What Our</span>{" "}
            Merchants Say?
          </h2>
          <div className="mt-4 flex items-center justify-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">Testimonials</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
        </Box>
      </Box>

      {/* Marquee Container */}
      {/* 'group' is used for pausing animation on hover */}
      <Box className="group mt-16 flex flex-col gap-8 overflow-hidden">
        {/* Row 1: Scrolls Left */}
        <div className="flex animate-marquee-left">
          {testimonialsRow1.map((t, i) => (
            <TestimonialCard key={`r1-${i}`} testimonial={t} />
          ))}
          {/* Duplicate the content for a seamless loop */}
          {testimonialsRow1.map((t, i) => (
            <TestimonialCard key={`r1-dup-${i}`} testimonial={t} />
          ))}
        </div>

        {/* Row 2: Scrolls Right */}
        <div className="flex animate-marquee-right">
          {testimonialsRow2.map((t, i) => (
            <TestimonialCard key={`r2-${i}`} testimonial={t} />
          ))}
          {/* Duplicate the content for a seamless loop */}
          {testimonialsRow2.map((t, i) => (
            <TestimonialCard key={`r2-dup-${i}`} testimonial={t} />
          ))}
        </div>
      </Box>
    </Box>
  );
};
