import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react";

function EventDetails() {
  const details = [
    {
      icon: CalendarDays,
      title: "Date",
      value: "04 October 2026",
      subtext: "Sunday",
    },
    {
      icon: Clock3,
      title: "Time",
      value: "04:00 PM",
      subtext: "Please arrive on time for the celebration",
    },
    {
      icon: MapPin,
      title: "Venue",
      value: "Osaka Kansai Airport Hotel",
      subtext: "address : 4066, HIneno, Izumisano-city, Osaka, 598-0021, Japan",
    },
  ];

  return (
    <section className="event-section">
      <motion.div
        className="event-content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.8,
        }}
      >
        <span className="event-fairy">✨</span>

        <p className="event-small">
          SAVE THE DATE
        </p>

        <h2 className="event-title">
          A Magical Day Awaits
        </h2>

        <p className="event-description">
          Join us as we celebrate MION&apos;s very first
          birthday in a little enchanted fairy garden.
        </p>

        <div className="event-grid">
          {details.map((detail, index) => {
            const Icon = detail.icon;

            return (
              <motion.div
                className="event-card"
                key={detail.title}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                }}
              >
                <div className="event-icon">
                  <Icon size={22} />
                </div>

                <p className="event-card-title">
                  {detail.title}
                </p>

                <h3 className="event-card-value">
                  {detail.value}
                </h3>

                <p className="event-card-subtext">
                  {detail.subtext}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="event-ending">
          <span>🌸</span>

          <p>
            Mark your calendar for a day filled with
            magic, laughter and beautiful memories.
          </p>

          <span>🦋</span>
        </div>
      </motion.div>
    </section>
  );
}

export default EventDetails;