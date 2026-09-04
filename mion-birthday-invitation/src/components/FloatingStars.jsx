import { useMemo } from "react";
import { createPortal } from "react-dom";
import Butterfly from "./Butterfly";
import Flower from "./Flower";

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
        index % 6 === 0
          ? "✦"
          : index % 5 === 0
          ? "✧"
          : index % 4 === 0
          ? "flower"
          : index % 3 === 0
          ? "butterfly"
          : index % 2 === 0
          ? "🧚"
          : "✨",
    }));
  }, []);

  return createPortal(
    <div className="floating-stars" aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className="floating-star"
          style={{
            left: star.left,
            top: star.top,
            fontSize: `${star.size}px`,
            "--star-duration": `${star.duration}s`,
            "--star-delay": `${star.delay}s`,
          }}
        >
          {star.symbol === "butterfly" ? (
            <Butterfly className="floating-butterfly" />
          ) : star.symbol === "flower" ? (
            <Flower
              variant={star.id % 8 === 0 ? "one" : "default"}
              className="floating-flower"
            />
          ) : (
            star.symbol
          )}
        </span>
      ))}
    </div>,
    document.body
  );
}

export default FloatingStars;
