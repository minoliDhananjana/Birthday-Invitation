import flower from "../assets/images/flower.png";

function Flower({ variant = "default", className = "" }) {
  return (
    <img
      src={flower}
      alt=""
      aria-hidden="true"
      className={`flower-image flower-image-${variant} ${className}`.trim()}
      loading="lazy"
      decoding="async"
      draggable="false"
    />
  );
}

export default Flower;
