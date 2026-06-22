"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function SunLoader() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const hide = () => setHidden(true);

    if (document.readyState === "complete") {
      const timer = window.setTimeout(hide, 800);
      return () => window.clearTimeout(timer);
    }

    const onLoad = () => window.setTimeout(hide, 800);
    window.addEventListener("load", onLoad);

    const fallback = window.setTimeout(hide, 1500);

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!hidden) return;
    const timer = window.setTimeout(() => setRemoved(true), 600);
    return () => window.clearTimeout(timer);
  }, [hidden]);

  if (removed) return null;

  return (
    <div
      id="loader"
      className={cn("sun-loader", hidden && "sun-loader-hide")}
      aria-hidden={hidden}
      aria-label="Loading"
    >
      <div className="loader-sun" />
    </div>
  );
}
