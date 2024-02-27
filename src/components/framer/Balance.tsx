import { CSSProperties, useRef } from "react";
import {
  PanInfo,
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { CHIPMUNK } from "../../contants/symbol";

function minMax(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

const boardStyle: CSSProperties = {
  width: 400,
  height: 4,
  textAlign: "center",
  backgroundColor: "#fff",
  borderRadius: 4,
  cursor: "grab",
};

function Balance() {
  const dragStartY = useRef(0);
  const rotateValue = useMotionValue(0);

  const limitedRotateValue = useTransform(rotateValue, (value) =>
    minMax(value, -45, 45)
  );

  const rotateSmooth = useSpring(limitedRotateValue, {
    damping: 70,
    stiffness: 200,
    bounce: 0.5,
  });

  const rotateXTransform = useTransform(
    rotateSmooth,
    [-45, 0, 45],
    [-180, 0, 180]
  );
  const rotateYTransform = useTransform(limitedRotateValue, [-1, 0], [-180, 0]);

  function handleDragStart(event: MouseEvent) {
    dragStartY.current = event.clientY;
  }

  function handleDrag(event: MouseEvent, _: PanInfo) {
    const currentY = event.clientY;
    const diff = currentY - dragStartY.current;
    rotateValue.set(diff);
  }

  return (
    <motion.div
      style={{ ...boardStyle, y: 50, rotate: limitedRotateValue }}
      drag={"x"}
      dragConstraints={{ left: 0, right: 0 }}
      dragDirectionLock
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={() => {
        animate(rotateValue, 0, {
          type: "spring",
          stiffness: 200,
          damping: 50,
        });
      }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 0.2,
        duration: 1,
        ease: "easeInOut",
      }}
    >
      <motion.div
        style={{
          display: "inline-block",
          fontSize: 30,
          x: rotateXTransform,
          y: -36,
          rotateY: rotateYTransform,
        }}
      >
        {CHIPMUNK}
      </motion.div>
    </motion.div>
  );
}

export default Balance;
