import { useEffect, useRef, useState } from "react";

export default function useHover() {
  const [hovering, setHovering] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current as unknown as HTMLElement;
    if (!node) return;

    const handleMouseEnter = () => setHovering(true);

    const handleMouseLeave = () => setHovering(false);

    node.addEventListener("mouseenter", handleMouseEnter);
    node.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      node.removeEventListener("mouseenter", handleMouseEnter);
      node.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return [ref, hovering];
}
