import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { Box, Centered } from "../layout";

function ChipmunkInTheBox() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chipmunkBoxRef = useRef<HTMLDivElement>(null);

  const chipmunkMotionValueX = useMotionValue(0);
  const chipmunkMotionValueY = useMotionValue(0);

  const chipmunkSmoothX = useSpring(chipmunkMotionValueX, {
    damping: 50,
    stiffness: 100,
  });
  const chipmunkSmoothY = useSpring(chipmunkMotionValueY, {
    damping: 50,
    stiffness: 100,
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
      <div
        ref={containerRef}
        style={{
          width: 400,
          height: 400,
          border: "1px solid #fff",
          borderRadius: 14,
        }}
      >
        <motion.div
          drag
          dragElastic={0.3}
          dragConstraints={containerRef}
          style={{
            width: "fit-content",
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
      </div>
    </Centered>
  );
}

export default ChipmunkInTheBox;
