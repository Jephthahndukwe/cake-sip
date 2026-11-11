"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode, type CSSProperties } from "react";

/** Sets data-in="true" once the element scrolls into view. Styling lives in globals.css. */
export function InView({
  as: Tag = "div",
  className = "",
  children,
  style,
  id,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} id={id} data-in={inView} className={className} style={style}>
      {children}
    </Tag>
  );
}

/** Headline that reveals word by word. Pass `accent` words to colour them. */
export function Words({
  text,
  as = "h2",
  className = "",
  accentFrom,
  accentClass = "text-magenta",
}: {
  text: string;
  as?: ElementType;
  className?: string;
  /** index of the first word to colour with accentClass */
  accentFrom?: number;
  accentClass?: string;
}) {
  const words = text.split(" ");
  return (
    <InView as={as} className={`words ${className}`}>
      {words.map((w, i) => (
        <span key={i}>
          <span
            className={`w ${accentFrom !== undefined && i >= accentFrom ? accentClass : ""}`}
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </InView>
  );
}

export function FadeUp({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <InView className={`fade-up ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </InView>
  );
}
