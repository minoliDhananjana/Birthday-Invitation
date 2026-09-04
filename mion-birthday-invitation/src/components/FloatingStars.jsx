import { createPortal } from "react-dom";

const LEFT_LIGHTS = [
  [7, 8, 7],
  [18, 15, 5],
  [34, 11, 9],
  [11, 28, 6],
  [27, 35, 11],
  [41, 24, 5],
  [6, 48, 9],
  [20, 56, 6],
  [37, 49, 8],
  [13, 70, 5],
  [29, 78, 10],
  [43, 67, 6],
  [8, 91, 7],
  [23, 88, 5],
  [39, 94, 8],
];

const FAIRY_LIGHTS = LEFT_LIGHTS.flatMap(([left, top, size], index) => {
  const shared = {
    top: `${top}%`,
    size,
    duration: 2.8 + (index % 6) * 0.42,
    glow: 12 + (index % 5) * 4,
  };

  return [
    {
      ...shared,
      id: `left-${index}`,
      left: `${left}%`,
      delay: -(index % 7) * 0.38,
    },
    {
      ...shared,
      id: `right-${index}`,
      left: `${100 - left}%`,
      delay: -(index % 7) * 0.38 - 0.55,
    },
  ];
});

function FloatingStars() {
  return createPortal(
    <div className="fairy-lights" aria-hidden="true">
      {FAIRY_LIGHTS.map((light) => (
        <span
          key={light.id}
          className="fairy-light"
          style={{
            left: light.left,
            top: light.top,
            width: `${light.size}px`,
            height: `${light.size}px`,
            "--light-duration": `${light.duration}s`,
            "--light-delay": `${light.delay}s`,
            "--light-glow": `${light.glow}px`,
          }}
        />
      ))}
    </div>,
    document.body
  );
}

export default FloatingStars;
