import { Variants, motion } from "framer-motion";
import { CHIPMUNK } from "../../constants/symbol";

import ThoughtBalloon from "../../assets/thought-balloon.svg";
import { Centered } from "../layout";
import { CSSProperties, useState } from "react";

const BALLOON_STYLE: CSSProperties = {
  position: "absolute",
  top: 20,
  right: 20,
  width: 200,
  height: 200,
  backgroundImage: `url(${ThoughtBalloon})`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  zIndex: 1,
};

const BALLOON_VARIANTS: Variants = {
  open: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
  closed: {
    opacity: 0,
  },
};

const BALLOON_ICON_VARIANTS: Variants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: 20,
    opacity: 0,
  },
};

const list = ["🏠", "💸", "💕", "💻"];

function Thinking() {
  const [isThinking, setIsThinking] = useState(false);

  const BALLOON_STATE = isThinking ? "open" : "closed";

  return (
    <Centered style={{ width: "100%", height: "100%" }}>
      <motion.div
        animate={BALLOON_STATE}
        variants={BALLOON_VARIANTS}
        style={BALLOON_STYLE}
      >
        <Centered style={{ top: "45%", width: "100%", textAlign: "center" }}>
          {list.map((icon, key) => (
            <motion.span
              key={key}
              variants={BALLOON_ICON_VARIANTS}
              style={{ margin: "0 4px", fontSize: "1.5rem" }}
              transition={{ duration: 1 }}
            >
              {icon}
            </motion.span>
          ))}
        </Centered>
      </motion.div>
      <motion.span
        initial={{
          top: "50%",
          left: "50%",
          scale: 1,
        }}
        animate={{
          top: "70%",
          left: "25%",
          scale: 11,
        }}
        transition={{
          delay: 0.5,
          duration: 1,
        }}
        style={{
          position: "absolute",
        }}
        onAnimationComplete={() => setIsThinking(true)}
      >
        {CHIPMUNK}
      </motion.span>
    </Centered>
  );
}

export default Thinking;
