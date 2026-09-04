import butterfly from "../assets/images/butterfly3.png";

function Butterfly({ className = "", decorative = true }) {
  return (
    <img
      src={butterfly}
      alt={decorative ? "" : "Butterfly"}
      aria-hidden={decorative ? "true" : undefined}
      className={`butterfly-image ${className}`.trim()}
      loading="lazy"
      decoding="async"
      draggable="false"
    />
  );
}

export default Butterfly;
