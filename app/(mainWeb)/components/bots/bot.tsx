"use client";

import dynamic from "next/dynamic";

const Bot = dynamic(() => import("./botComponent"), {
  ssr: false,
  loading: () => <div className="w-[500px] h-[500px]"></div>,
});

export default Bot;
