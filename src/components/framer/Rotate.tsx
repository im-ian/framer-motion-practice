import { CSSProperties } from "react";
import { Transition, motion, useTime, useTransform } from "framer-motion";

import { Centered } from "../layout";

import { CHIPMUNK } from "../../constants/symbol";

const ICON_STYLE: CSSProperties = {
  fontSize: "5rem",
  position: "absolute",
};

const ICON_TRANSITION: Transition = {
  duration: 3,
  ease: "linear",
  loop: Infinity,
};

const DURATION = 3000;

function Rotate() {
  const time = useTime();

  const transform = useTransform(() => {
    const deg = (time.get() / DURATION) * 360;
    return `rotate3d(0, 1, 0, ${deg}deg)`;
  });

  return (
    <Centered>
      <motion.div transition={ICON_TRANSITION}>
        <motion.div
          style={{
            width: 100,
            height: 100,
            transformStyle: "preserve-3d",
            transform,
          }}
        >
          <motion.span
            style={{
              ...ICON_STYLE,
              rotateY: 0,
              backfaceVisibility: "visible",
            }}
          >
            {CHIPMUNK}
          </motion.span>
          <motion.span
            style={{
              ...ICON_STYLE,
              rotateY: 180,
              backfaceVisibility: "hidden",
            }}
          >
            🌰
          </motion.span>
        </motion.div>
      </motion.div>
    </Centered>
  );
}

export default Rotate;
