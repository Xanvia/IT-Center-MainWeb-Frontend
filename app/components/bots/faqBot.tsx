"use client";

import { Player } from "@lottiefiles/react-lottie-player";

export default function BotFAQ() {
  return (
    <Player
      autoplay
      keepLastFrame
      hover
      src="/animation/bot.json"
      style={{ height: "350px", width: "350px" }}
    ></Player>
  );
}
