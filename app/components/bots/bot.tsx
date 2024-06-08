"use client";

import { Player } from "@lottiefiles/react-lottie-player";

export default function Bot() {
  return (
    <Player
      autoplay
      loop
      src="/animation/bot.json"
      style={{ height: "350px", width: "350px" }}
    ></Player>
  );
}
