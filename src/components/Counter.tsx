"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

export function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        setValue(Math.floor(v));
      },
    });
    return () => controls.stop();
  }, [inView, target]);

return (
  <span ref={ref} className="whitespace-nowrap">
    {`${value.toLocaleString("ru-RU").replace(/\s/g, "\u00A0")}${suffix}`}
  </span>
);
}
