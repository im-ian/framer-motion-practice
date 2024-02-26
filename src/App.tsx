import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { Box, Centered } from "./components/layout";

function App() {
  const chipmunkBoxRef = useRef<HTMLDivElement>(null);

  const chipmunkMotionValueX = useMotionValue(0);
  const chipmunkMotionValueY = useMotionValue(0);

  const chipmunkSmoothX = useSpring(chipmunkMotionValueX, {
    damping: 50,
    stiffness: 400,
  });
  const chipmunkSmoothY = useSpring(chipmunkMotionValueY, {
    damping: 50,
    stiffness: 400,
  });

  const chipmunkVelocityX = useVelocity(chipmunkSmoothX);
  const chipmunkVelocityY = useVelocity(chipmunkSmoothY);

  // 튕겨나는 다람쥐
  const chipmunkTransformX = useTransform(
    chipmunkVelocityX,
    [-100, 0, 100],
    ["-100%", "0%", "100%"]
  );
  const chipmunkTransformY = useTransform(
    chipmunkVelocityY,
    [-100, 0, 100],
    ["100%", "0%", "-100%"]
  );

  return (
    <Centered>
      <motion.div
        drag
        dragElastic={0.3}
        dragConstraints={{ top: -200, left: -200, right: 200, bottom: 200 }}
        style={{
          x: chipmunkMotionValueX,
          y: chipmunkMotionValueY,
        }}
        initial={{
          rotate: 0,
          scale: 0,
          opacity: 0,
        }}
        animate={{
          rotate: 360,
          scale: 1,
          opacity: 1,
        }}
        whileHover={{
          scale: 1.1,
          cursor: "grab",
        }}
      >
        <Box
          ref={chipmunkBoxRef}
          style={{
            height: "auto",
            aspectRatio: "1",
            display: "inline-block",
          }}
        >
          <motion.div
            style={{
              position: "relative",
              top: chipmunkTransformY,
              right: chipmunkTransformX,
            }}
          >
            🐿️
          </motion.div>
        </Box>
      </motion.div>
    </Centered>
  );
}

export default App;
