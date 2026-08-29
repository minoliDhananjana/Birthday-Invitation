import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";

import Hero from "./components/Hero";
import BabyWelcome from "./components/BabyWelcome";
import Countdown from "./components/Countdown";
import EventDetails from "./components/EventDetails";
import RSVP from "./components/RSVP";
import Footer from "./components/Footer";
import FloatingStars from "./components/FloatingStars";

import fairyMusic from "./assets/audio/fairy-music.mp3";

const NORMAL_MUSIC_VOLUME = 0.3;
const MESSAGE_MUSIC_VOLUME = 0.05;

function App() {
  const [invitationOpened, setInvitationOpened] =
    useState(false);

  const [musicPlaying, setMusicPlaying] =
    useState(false);

  const [
    mionMessagePlaying,
    setMionMessagePlaying,
  ] = useState(false);

  const audioRef = useRef(null);

  // =====================================
  // OPEN INVITATION
  // =====================================

  const openInvitation = async () => {
    try {
      if (audioRef.current) {
        audioRef.current.volume =
          NORMAL_MUSIC_VOLUME;

        await audioRef.current.play();

        setMusicPlaying(true);
      }
    } catch (error) {
      console.log(
        "Music could not start:",
        error
      );
    }

    setInvitationOpened(true);
  };

  // =====================================
  // MUSIC ON / OFF
  // =====================================

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    // Music currently OFF
    if (audioRef.current.paused) {
      try {
        audioRef.current.volume =
          mionMessagePlaying
            ? MESSAGE_MUSIC_VOLUME
            : NORMAL_MUSIC_VOLUME;

        await audioRef.current.play();

        setMusicPlaying(true);
      } catch (error) {
        console.log(
          "Music could not play:",
          error
        );
      }
    }

    // Music currently ON
    else {
      audioRef.current.pause();

      setMusicPlaying(false);
    }
  };

  // =====================================
  // MION MESSAGE START
  // =====================================

  const handleMionMessageStart = () => {
    setMionMessagePlaying(true);

    // Lower fairy music while MION talks
    if (
      audioRef.current &&
      !audioRef.current.paused
    ) {
      audioRef.current.volume =
        MESSAGE_MUSIC_VOLUME;
    }
  };

  // =====================================
  // MION MESSAGE END
  // =====================================

  const handleMionMessageEnd = () => {
    setMionMessagePlaying(false);

    // Return fairy music to normal volume
    if (
      audioRef.current &&
      !audioRef.current.paused
    ) {
      audioRef.current.volume =
        NORMAL_MUSIC_VOLUME;
    }
  };

  return (
    <>
      {/* =====================================
          FAIRY BACKGROUND MUSIC
      ===================================== */}

      <audio
        ref={audioRef}
        src={fairyMusic}
        loop
        preload="auto"
      />

      {/* =====================================
          MAGICAL FLOATING STARS
          Visible across the entire invitation
      ===================================== */}

      <FloatingStars />

      {/* =====================================
          INVITATION
      ===================================== */}

      <AnimatePresence mode="wait">
        {!invitationOpened ? (
          /* =============================
             OPENING HERO SCREEN
          ============================= */

          <Hero
            key="hero"
            onEnter={openInvitation}
          />
        ) : (
          /* =============================
             MAIN INVITATION
          ============================= */

          <motion.div
            key="invitation"
            className="invitation-content"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            {/* MION MESSAGE */}

            <BabyWelcome
              musicPlaying={musicPlaying}
              toggleMusic={toggleMusic}
              onMessageStart={
                handleMionMessageStart
              }
              onMessageEnd={
                handleMionMessageEnd
              }
            />

            {/* COUNTDOWN */}

            <Countdown />

            {/* EVENT DETAILS */}

            <EventDetails />

            {/* RSVP */}

            <RSVP />

            {/* FOOTER */}

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;