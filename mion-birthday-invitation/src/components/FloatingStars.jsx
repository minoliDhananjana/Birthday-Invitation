import { useMemo } from "react";
import { motion } from "framer-motion";

function FloatingStars() {
  const stars = useMemo(() => {
    return Array.from({ length: 26 }, (_, index) => ({
      id: index,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 10 + 5,
      duration: Math.random() * 2.5 + 2,
      delay: Math.random() * 3,
      symbol:
        index % 4 === 0
          ? "✦"
          : index % 3 === 0
          ? "✧"
          : "✨",
    }));
  }, []);

  return (
    <div className="floating-stars" aria-hidden="true">
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="floating-star"
          style={{
            left: star.left,
            top: star.top,
            fontSize: `${star.size}px`,
          }}
          animate={{
            opacity: [0.2, 0.85, 0.2],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {star.symbol}
        </motion.span>
      ))}
    </div>
  );
}

export default FloatingStars;
