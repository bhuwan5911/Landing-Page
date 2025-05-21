import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    
    const handleMouseEnterLink = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || 
          (e.target as HTMLElement).tagName === 'BUTTON' ||
          (e.target as HTMLElement).closest('a') ||
          (e.target as HTMLElement).closest('button')) {
        setLinkHovered(true);
      }
    };
    
    const handleMouseLeaveLink = () => {
      setLinkHovered(false);
    };
    
    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseEnterLink);
    document.addEventListener("mouseout", handleMouseLeaveLink);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseEnterLink);
      document.removeEventListener("mouseout", handleMouseLeaveLink);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  const cursorVariants = {
    default: {
      x: position.x - 10,
      y: position.y - 10,
      height: 20,
      width: 20,
      backgroundColor: "rgba(229, 62, 62, 0.5)",
      border: "2px solid rgba(229, 62, 62, 1)",
    },
    clicked: {
      x: position.x - 8,
      y: position.y - 8,
      height: 16,
      width: 16,
      backgroundColor: "rgba(229, 62, 62, 0.8)",
      border: "2px solid rgba(229, 62, 62, 1)",
    },
    linkHovered: {
      x: position.x - 15,
      y: position.y - 15,
      height: 30,
      width: 30,
      backgroundColor: "rgba(229, 62, 62, 0.2)",
      border: "2px solid rgba(229, 62, 62, 1)",
      mixBlendMode: "difference",
    },
    hidden: {
      opacity: 0,
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
      variants={cursorVariants}
      animate={
        hidden
          ? "hidden"
          : clicked
          ? "clicked"
          : linkHovered
          ? "linkHovered"
          : "default"
      }
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
    />
  );
}
