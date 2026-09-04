import { useState } from "react";
import { motion } from "framer-motion";
import fairyOne from "../assets/images/fairy1.png";
import butterfly from "../assets/images/butterfly3.png";
import Butterfly from "./Butterfly";

function RSVP() {
  const [guestName, setGuestName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    setMessage("");

    const cleanName = guestName.trim();

    if (!cleanName) {
      setMessage("Please enter your name.");
      return;
    }

    if (!attendance) {
      setMessage("Please select your attendance.");
      return;
    }

    try {
      setSubmitting(true);

      // Supabase is only needed when a guest submits the form. Loading it
      // here keeps the relatively large SDK out of the initial page bundle.
      const { supabase } = await import("../lib/supabase");

      const { error } = await supabase
        .from("rsvps")
        .insert({
          guest_name: cleanName,
          attendance: attendance,
        });

      if (error) {
        throw error;
      }

      if (attendance === "yes") {
        setMessage(
          `💕 Thank you, ${cleanName}! We can't wait to celebrate with you.`
        );
      } else {
        setMessage(
          `🌸 Thank you, ${cleanName}. We'll miss you on MION's special day.`
        );
      }

      // Clear form after successful submission
      setGuestName("");
      setAttendance("");
    } catch (error) {
      console.error("RSVP submission error:", error);

      setMessage(
        "Something went wrong while sending your RSVP. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="rsvp-section">
      <img
        src={fairyOne}
        alt=""
        aria-hidden="true"
        className="rsvp-fairy"
        loading="lazy"
        decoding="async"
      />

      <img
        src={butterfly}
        alt=""
        aria-hidden="true"
        className="rsvp-butterfly"
        loading="lazy"
        decoding="async"
      />

      <motion.div
        className="rsvp-content"
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
        <Butterfly className="rsvp-icon" />

        <p className="rsvp-small">
          WILL YOU JOIN OUR LITTLE FAIRY?
        </p>

        <h2 className="rsvp-title">
          RSVP
        </h2>

        <p className="rsvp-description">
          Let MION&apos;s family know whether
          you&apos;ll be joining her magical first
          birthday celebration.
        </p>

        <form
          className="rsvp-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="guestName">
              Your Name
            </label>

            <input
              id="guestName"
              name="guestName"
              type="text"
              placeholder="Enter your name"
              value={guestName}
              onChange={(e) =>
                setGuestName(e.target.value)
              }
              disabled={submitting}
              maxLength={80}
              autoComplete="name"
            />
          </div>

          <div className="attendance-options">
            <button
              type="button"
              className={
                attendance === "yes"
                  ? "attendance-button active"
                  : "attendance-button"
              }
              onClick={() =>
                setAttendance("yes")
              }
              disabled={submitting}
              aria-pressed={attendance === "yes"}
            >
              💕 Yes, I&apos;ll be there
            </button>

            <button
              type="button"
              className={
                attendance === "no"
                  ? "attendance-button active"
                  : "attendance-button"
              }
              onClick={() =>
                setAttendance("no")
              }
              disabled={submitting}
              aria-pressed={attendance === "no"}
            >
              🌸 Sorry, I can&apos;t make it
            </button>
          </div>

          <motion.button
            type="submit"
            className="rsvp-submit"
            whileHover={{
              scale: submitting ? 1 : 1.03,
            }}
            whileTap={{
              scale: submitting ? 1 : 0.97,
            }}
            disabled={submitting}
          >
            {submitting
              ? "Sending..."
              : "Send RSVP ✨"}
          </motion.button>

          {message && (
            <motion.p
              className="rsvp-message"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              role="status"
              aria-live="polite"
            >
              {message}
            </motion.p>
          )}
        </form>
      </motion.div>
    </section>
  );
}

export default RSVP;
