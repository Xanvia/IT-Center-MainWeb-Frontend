import React from "react";
import { Chat } from "./chat";

export const Phone = () => {
  return (
    <div className="mockup-phone">
      <div className="camera"></div>
      <div className="display">
        <div className="artboard artboard-demo phone-1">
          <Chat />
        </div>
      </div>
    </div>
  );
};
