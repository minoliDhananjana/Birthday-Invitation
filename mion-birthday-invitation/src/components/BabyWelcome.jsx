import {
  useEffect,
  useRef,
  useState,
} from "react";

import { motion } from "framer-motion";

import mionTransparentVideo from "../assets/video/mion-welcome-final.webm";
import mionGreenVideo from "../assets/video/mion-welcome.mp4";
import fairyOne from "../assets/images/fairy1.png";
import fairySix from "../assets/images/fairy6.png";
import fairyEight from "../assets/images/fairy8.png";
import Butterfly from "./Butterfly";

function BabyWelcome({
  musicPlaying,
  toggleMusic,
  onMessageStart,
  onMessageEnd,
}) {
  const webmVideoRef = useRef(null);
  const iosVideoRef = useRef(null);
  const canvasRef = useRef(null);

  const animationFrameRef = useRef(null);

  const [videoPlaying, setVideoPlaying] =
    useState(false);

  const [videoFinished, setVideoFinished] =
    useState(false);

  const [isIOS, setIsIOS] =
    useState(false);

  // =====================================
  // DETECT IPHONE / IPAD
  // =====================================

  useEffect(() => {
    const userAgent =
      navigator.userAgent || "";

    const platform =
      navigator.platform || "";

    const iosDevice =
      /iPad|iPhone|iPod/.test(userAgent) ||
      (
        platform === "MacIntel" &&
        navigator.maxTouchPoints > 1
      );

    setIsIOS(iosDevice);
  }, []);

  // =====================================
  // REMOVE GREEN SCREEN ON IOS
  // =====================================

  const drawIOSFrame = () => {
    const video = iosVideoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    if (
      video.readyState < 2 ||
      video.videoWidth === 0
    ) {
      animationFrameRef.current =
        requestAnimationFrame(
          drawIOSFrame
        );

      return;
    }

    const ctx =
      canvas.getContext(
        "2d",
        {
          willReadFrequently: true,
        }
      );

    if (!ctx) return;

    // Keep canvas light for good
    // mobile performance
    const targetWidth = Math.min(
      video.videoWidth,
      420
    );

    const ratio =
      video.videoHeight /
      video.videoWidth;

    const targetHeight =
      Math.round(
        targetWidth * ratio
      );

    if (
      canvas.width !== targetWidth ||
      canvas.height !== targetHeight
    ) {
      canvas.width =
        targetWidth;

      canvas.height =
        targetHeight;
    }

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    ctx.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    try {
      const frame =
        ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );

      const pixels =
        frame.data;

      for (
        let i = 0;
        i < pixels.length;
        i += 4
      ) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        const maxRB =
          Math.max(r, b);

        const greenDifference =
          g - maxRB;

        /*
          Strong green background
          -> completely transparent
        */

        if (
          g > 80 &&
          greenDifference > 55
        ) {
          pixels[i + 3] = 0;
        }

        /*
          Green edge around MION
          -> partially transparent
          + gentle green despill
        */

        else if (
          g > 70 &&
          greenDifference > 24
        ) {
          const strength =
            Math.min(
              1,
              (
                greenDifference -
                24
              ) / 31
            );

          pixels[i + 3] =
            Math.round(
              255 *
                (
                  1 -
                  strength
                )
            );

          const balancedGreen =
            Math.round(
              (
                r +
                b
              ) / 2
            ) + 10;

          pixels[i + 1] =
            Math.min(
              g,
              balancedGreen
            );
        }
      }

      ctx.putImageData(
        frame,
        0,
        0
      );
    } catch (error) {
      console.error(
        "Canvas chroma key error:",
        error
      );
    }

    if (
      !video.paused &&
      !video.ended
    ) {
      animationFrameRef.current =
        requestAnimationFrame(
          drawIOSFrame
        );
    }
  };

  // =====================================
  // DRAW IOS FIRST FRAME
  // =====================================

  const handleIOSLoaded = () => {
    const video =
      iosVideoRef.current;

    if (!video) return;

    try {
      video.currentTime = 0.01;
    } catch {
      // Ignore seek error
    }

    setTimeout(() => {
      drawIOSFrame();
    }, 120);
  };

  // =====================================
  // PLAY MION MESSAGE
  // =====================================

  const playMionMessage =
    async () => {
      const video = isIOS
        ? iosVideoRef.current
        : webmVideoRef.current;

      if (!video) return;

      try {
        if (videoFinished) {
          video.currentTime = 0;

          setVideoFinished(false);
        }

        // MION voice ON
        video.muted = false;
        video.volume = 1;

        await video.play();

        setVideoPlaying(true);

        // Start iPhone canvas rendering
        if (isIOS) {
          cancelAnimationFrame(
            animationFrameRef.current
          );

          drawIOSFrame();
        }

        // Lower fairy music
        if (onMessageStart) {
          onMessageStart();
        }
      } catch (error) {
        console.error(
          "MION video could not play:",
          error
        );
      }
    };

  // =====================================
  // VIDEO FINISHED
  // =====================================

  const handleVideoEnded =
    () => {
      setVideoPlaying(false);

      setVideoFinished(true);

      if (
        animationFrameRef.current
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }

      // Restore fairy music
      if (onMessageEnd) {
        onMessageEnd();
      }
    };

  // =====================================
  // CLEANUP
  // =====================================

  useEffect(() => {
    return () => {
      if (
        animationFrameRef.current
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }
    };
  }, []);

  return (
    <motion.section
      className="welcome-section"
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
      <img
        src={fairyOne}
        alt=""
        aria-hidden="true"
        className="welcome-fairy welcome-fairy-left"
        loading="lazy"
        decoding="async"
      />

      <img
        src={fairySix}
        alt=""
        aria-hidden="true"
        className="welcome-fairy welcome-fairy-right"
        loading="lazy"
        decoding="async"
      />

      <img
        src={fairyEight}
        alt=""
        aria-hidden="true"
        className="welcome-feature-fairy"
        loading="lazy"
        decoding="async"
      />

      {/* Decorations */}

      <span className="welcome-decoration decor-1">
        ✨
      </span>

      <Butterfly className="welcome-decoration decor-2" />

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

        {/* =================================
            MION VIDEO
        ================================= */}

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
          {isIOS ? (
            <>
              {/* Hidden green-screen source */}

              <video
                ref={iosVideoRef}
                className="ios-source-video"
                src={mionGreenVideo}
                playsInline
                preload="auto"
                onLoadedData={
                  handleIOSLoaded
                }
                onEnded={
                  handleVideoEnded
                }
              />

              {/* Visible transparent result */}

              <canvas
                ref={canvasRef}
                className="welcome-video ios-mion-canvas"
                aria-label="MION fairy birthday message"
              />
            </>
          ) : (
            <video
              ref={webmVideoRef}
              className="welcome-video"
              src={
                mionTransparentVideo
              }
              playsInline
              preload="metadata"
              onEnded={
                handleVideoEnded
              }
            >
              Your browser does not
              support video.
            </video>
          )}
        </motion.div>

        {/* =================================
            TWO BUTTONS
        ================================= */}

        <div className="welcome-buttons">

          {/* MUSIC ON/OFF */}

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

          {/* MION MESSAGE */}

          <motion.button
            type="button"
            className="mion-message-button"
            onClick={
              playMionMessage
            }
            whileHover={{
              scale: videoPlaying
                ? 1
                : 1.03,
            }}
            whileTap={{
              scale: videoPlaying
                ? 1
                : 0.97,
            }}
            disabled={
              videoPlaying
            }
          >
            {videoPlaying
              ? "🧚 MION is Talking..."
              : videoFinished
              ? "↻ Replay MION’s Message"
              : "▶ MION’s Message"}
          </motion.button>
        </div>

        {/* =================================
            TEXT
        ================================= */}

        <motion.h2
          className="welcome-title"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.6,
          }}
        >
          Our little fairy MION  
        </motion.h2>

        <p className="welcome-one">
          is turning{" "}
          <strong>
            ONE!
          </strong>
        </p>

        <p className="welcome-message">
          With love and joy, we invite you to<br /> 
          join us for a magical fairy celebration <br />
          as we celebrate her 
          <br />
          very first birthday.
        </p>

        <div className="welcome-divider" />

        <p className="welcome-date">
          04 • OCTOBER • 2026
        </p>

        <motion.div
          className="scroll-hint"
          animate={{
            y: [
              0,
              5,
              0,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Butterfly className="scroll-butterfly" />

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
