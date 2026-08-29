import { useMemo } from "react";

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
          {star.symbol}
        </span>
      ))}
    </div>
  );
}

export default FloatingStars;
