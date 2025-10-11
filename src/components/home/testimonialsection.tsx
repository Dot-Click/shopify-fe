import { Box } from "../ui/box";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonialsRow1 = [
  {
    quote:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
    name: "Jacob Hooper",
    title: "Student in Panadomte Christian College",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
  },
  {
    quote:
      "It has survived not only five centuries, but also the leap into electronic typesetting.",
    name: "Esther Howard",
    title: "CEO, Tech Solutions",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    quote: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    name: "Maxi Williams",
    title: "Product Manager, Innovate Co.",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    rating: 5,
  },
];

const testimonialsRow2 = [
  {
    quote:
      "This is a fantastic tool that has saved us countless hours. Highly recommended!",
    name: "Sarah Jenkins",
    title: "Owner, The Boutique Hub",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
  },
  {
    quote:
      "The accuracy is unmatched. We've tried other solutions but this stands out.",
    name: "Michael Chen",
    title: "Operations Director, GadgetFlow",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 5,
  },
  {
    quote:
      "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.",
    name: "Johnathan Doe",
    title: "Lead Developer, CodeCrafters",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
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
  <Box className="mx-4 h-full w-[400px] max-sm:w-[260px] flex-shrink-0">
    <Box className="flex h-full flex-col justify-between rounded-2xl bg-white p-6 shadow-md">
      <p className="italic text-gray-600 max-sm:text-xs">
        "{testimonial.quote}"
      </p>
      <hr className="my-4" />
      <div className="flex items-center gap-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div>
          <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
          <p className="text-sm text-gray-500 max-sm:text-xs">
            {testimonial.title}
          </p>
          <StarRating rating={testimonial.rating} />
        </div>
      </div>
    </Box>
  </Box>
);

export const TestimonialsSection = () => {
  return (
    <Box className="w-full pt-24 pb-16 overflow-hidden">
      <Box className="container mx-auto px-6">
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

      <Box className="mt-16 flex flex-col gap-8">
        {/* Row 1 */}
        <motion.div
          className="flex"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...testimonialsRow1, ...testimonialsRow1].map((t, i) => (
            <TestimonialCard key={`r1-${i}`} testimonial={t} />
          ))}
        </motion.div>

        {/* Row 2 (opposite direction) */}
        <motion.div
          className="flex"
          animate={{ x: ["-100%", "0%"] }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...testimonialsRow2, ...testimonialsRow2].map((t, i) => (
            <TestimonialCard key={`r2-${i}`} testimonial={t} />
          ))}
        </motion.div>
      </Box>
    </Box>
  );
};
