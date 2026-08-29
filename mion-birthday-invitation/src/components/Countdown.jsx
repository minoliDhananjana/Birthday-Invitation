import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Countdown() {
  const birthday = new Date(2026, 9, 3, 0, 0, 0);

  const calculateTimeLeft = () => {
    const difference = birthday.getTime() - new Date().getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        birthdayReached: true,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      ),
      minutes: Math.floor(
        (difference / (1000 * 60)) % 60
      ),
      seconds: Math.floor(
        (difference / 1000) % 60
      ),
      birthdayReached: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="countdown-section">
      <motion.div
        className="countdown-content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <span className="countdown-butterfly">🦋</span>

        <p className="countdown-small">
          ✨ COUNTING DOWN TO THE MAGIC ✨
        </p>

        <h2 className="countdown-title">
          MION is turning ONE!
        </h2>

        <p className="countdown-date">
          03 • OCTOBER • 2026
        </p>

        {!timeLeft.birthdayReached ? (
          <div className="countdown-grid">
            <CountdownBox
              number={timeLeft.days}
              label="Days"
            />

            <CountdownBox
              number={timeLeft.hours}
              label="Hours"
            />

            <CountdownBox
              number={timeLeft.minutes}
              label="Minutes"
            />

            <CountdownBox
              number={timeLeft.seconds}
              label="Seconds"
            />
          </div>
        ) : (
          <div className="birthday-today">
            🎉 Today is MION&apos;s magical birthday! 🎂
          </div>
        )}

        <p className="countdown-message">
          A magical little celebration is getting closer...
        </p>
      </motion.div>
    </section>
  );
}

function CountdownBox({ number, label }) {
  return (
    <motion.div
      className="countdown-box"
      whileHover={{ y: -4 }}
    >
      <span className="countdown-number">
        {String(number).padStart(2, "0")}
      </span>

      <span className="countdown-label">
        {label}
      </span>
    </motion.div>
  );
}

export default Countdown;