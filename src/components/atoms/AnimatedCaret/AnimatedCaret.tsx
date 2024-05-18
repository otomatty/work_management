import React from "react";
import { motion } from "framer-motion";

interface AnimatedCaretProps {
  isOpen: boolean;
}

const AnimatedCaret: React.FC<AnimatedCaretProps> = ({ isOpen }) => {
  const variants = {
    opened: { rotate: 180 },
    closed: { rotate: 0 },
  };

  return (
    <motion.svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={isOpen ? "opened" : "closed"}
      variants={variants}
      transition={{ duration: 0.3 }}
    >
      <path
        d="M10 15L20 25L30 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      />
    </motion.svg>
  );
};

export default AnimatedCaret;
