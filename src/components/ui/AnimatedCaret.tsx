import React from "react";
import { motion } from "framer-motion";

interface AnimatedIconProps {
  isOpen: boolean;
}

const AnimatedCaret: React.FC<AnimatedIconProps> = ({ isOpen }) => {
  const variants = {
    opened: { rotate: 180 },
    closed: { rotate: 0 },
  };

  return (
    <motion.svg
      width="40" // SVGの幅を40pxに設定
      height="40" // SVGの高さを40pxに設定
      viewBox="0 0 40 40" // viewBoxを40x40に設定
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={isOpen ? "opened" : "closed"}
      variants={variants}
      transition={{ duration: 0.3 }}
    >
      <path
        d="M10 15L20 25L30 15" // pathの座標を調整して幅を28pxに見えるようにする
        fill="none"
        stroke="currentColor" // 線の色を設定
        strokeWidth="4" // 線の太さを2pxに設定
      />
    </motion.svg>
  );
};

export default AnimatedCaret;
