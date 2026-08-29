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

  // Open invitation + start fairy music
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

  // Music ON / OFF button
  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      try {
        // If MION is talking,
        // start music at lower volume
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
    } else {
      audioRef.current.pause();

      setMusicPlaying(false);
    }
  };

  // MION starts talking
  const handleMionMessageStart = () => {
    setMionMessagePlaying(true);

    if (
      audioRef.current &&
      !audioRef.current.paused
    ) {
      audioRef.current.volume =
        MESSAGE_MUSIC_VOLUME;
    }
  };

  // MION finishes talking
  const handleMionMessageEnd = () => {
    setMionMessagePlaying(false);

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
      {/* Fairy background music */}
      <audio
        ref={audioRef}
        src={fairyMusic}
        loop
        preload="auto"
      />

      <AnimatePresence mode="wait">
        {!invitationOpened ? (
          <Hero
            key="hero"
            onEnter={openInvitation}
          />
        ) : (
          <motion.div
            key="invitation"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
            }}
          >
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

            <Countdown />

            <EventDetails />

            <RSVP />

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;