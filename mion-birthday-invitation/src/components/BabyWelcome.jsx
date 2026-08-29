import { useRef, useState } from "react";
import { motion } from "framer-motion";
import mionVideo from "../assets/video/mion-welcome-final.webm";
import mionPoster from "../assets/images/mion-fairy1.webp";



function BabyWelcome({
  musicPlaying,
  toggleMusic,
  onMessageStart,
  onMessageEnd,
}) {
  const videoRef = useRef(null);

  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);

  const playMionMessage = async () => {
    if (!videoRef.current) return;

    try {
      // Restart if video has already finished
      if (videoFinished) {
        videoRef.current.currentTime = 0;
        setVideoFinished(false);
      }

      // Make sure MION's voice is ON
      videoRef.current.muted = false;
      videoRef.current.volume = 1;

      await videoRef.current.play();

      setVideoPlaying(true);
      onMessageStart?.();
    } catch (error) {
      console.error("MION video could not play:", error);
    }
  };

  const handleVideoEnded = () => {
    setVideoPlaying(false);
    setVideoFinished(true);
    onMessageEnd?.();
  };

  const handleVideoPause = () => {
    if (!videoRef.current?.ended) {
      setVideoPlaying(false);
      onMessageEnd?.();
    }
  };

  return (
    <motion.section
      className="welcome-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Decorations */}
      <span className="welcome-decoration decor-1">
        ✨
      </span>

      <span className="welcome-decoration decor-2">
        🦋
      </span>

      <span className="welcome-decoration decor-3">
        ✦
      </span>

      <motion.div
        className="welcome-content"
        initial={{
          opacity: 0,
          y: 35,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.2,
        }}
      >
        <p className="welcome-small">
          ✨ A LITTLE MESSAGE FROM MION ✨
        </p>

        {/* MION VIDEO */}
        <motion.div
          className="welcome-video-container"
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <video
            ref={videoRef}
            className="welcome-video"
            src={mionVideo}
            poster={mionPoster}
            playsInline
            preload="none"
            onEnded={handleVideoEnded}
            onPause={handleVideoPause}
          >
            Your browser does not support video.
          </video>
        </motion.div>

        {/* TWO BUTTONS */}
        <div className="welcome-buttons">
          {/* Background Music */}
          <button
            type="button"
            className="music-button"
            onClick={toggleMusic}
            aria-label={
              musicPlaying
                ? "Turn off background music"
                : "Turn on background music"
            }
          >
            {musicPlaying
              ? "♫ Music On"
              : "♫ Music Off"}
          </button>

          {/* MION Message */}
          <motion.button
            type="button"
            className="mion-message-button"
            onClick={playMionMessage}
            whileHover={{
              scale: videoPlaying ? 1 : 1.03,
            }}
            whileTap={{
              scale: videoPlaying ? 1 : 0.97,
            }}
            disabled={videoPlaying}
          >
            {videoPlaying
              ? "🧚 MION is Talking..."
              : videoFinished
              ? "↻ Replay MION’s Message"
              : "▶ MION’s Message"}
          </motion.button>
        </div>

        <motion.h2
          className="welcome-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Hi! I&apos;m MION
        </motion.h2>

        <p className="welcome-one">
          I&apos;m turning <strong>ONE!</strong>
        </p>

        <p className="welcome-message">
          Come join me for a magical
          <br />
          fairy celebration.
        </p>

        <div className="welcome-divider"></div>

        <p className="welcome-date">
          MION TURNS ONE • 03 OCTOBER 2026
        </p>

        <motion.div
          className="scroll-hint"
          animate={{
            y: [0, 5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <span className="scroll-butterfly">
            🦋
          </span>

          <p>
            Scroll to discover the magic
          </p>

          <span className="arrow">
            ↓
          </span>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default BabyWelcome;
