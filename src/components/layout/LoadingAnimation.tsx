import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1.5,
    },
  },
  exit: {
    opacity: 0,
    transition: { ease: "easeInOut" },
  },
};

const LoadingContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Loading = styled.div`
  display: flex;
  gap: 4px;
`;

const LoadingBar = styled(motion.div)`
  width: 4px;
  height: 18px;
  border-radius: 4px;
`;

const loadingVariants = {
  start: { scaleY: 1 },
  end: { scaleY: 2.2 },
};

const LoadingAnimation: React.FC = () => {
  return (
    <LoadingContainer
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Loading>
        <LoadingBar
          style={{ backgroundColor: "#555" }}
          variants={loadingVariants}
          initial="start"
          animate="end"
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 0,
          }}
        />
        <LoadingBar
          style={{ backgroundColor: "#777" }}
          variants={loadingVariants}
          initial="start"
          animate="end"
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 0.09,
          }}
        />
        <LoadingBar
          style={{ backgroundColor: "#999" }}
          variants={loadingVariants}
          initial="start"
          animate="end"
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 0.18,
          }}
        />
        <LoadingBar
          style={{ backgroundColor: "#bbb" }}
          variants={loadingVariants}
          initial="start"
          animate="end"
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 0.27,
          }}
        />
      </Loading>
    </LoadingContainer>
  );
};

export default LoadingAnimation;
