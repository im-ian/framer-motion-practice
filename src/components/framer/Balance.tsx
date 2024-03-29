import { CSSProperties, useRef } from "react";
import {
  PanInfo,
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { CHIPMUNK } from "../../constants/symbol";
import { getMinMax } from "../../utils/calc";
import { Centered } from "../layout";

const boardStyle: CSSProperties = {
  width: 380,
  height: 10,
  textAlign: "center",
  backgroundColor: "#fff",
  borderRadius: 5,
  cursor: "grab",
};

function Balance() {
  const dragStartY = useRef(0);
  const rotateValue = useMotionValue(0);

  const limitedRotateValue = useTransform(rotateValue, (value) =>
    getMinMax(value, -45, 45)
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

  function handleDragEnd() {
    animate(rotateValue, 0, {
      type: "spring",
      stiffness: 200,
      damping: 50,
    });
  }

  return (
    <Centered>
      <motion.div
        style={{ ...boardStyle, y: 20, rotate: limitedRotateValue }}
        drag={"x"}
        dragConstraints={{ left: 0, right: 0 }}
        dragDirectionLock
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
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
            y: -34,
            rotateY: rotateYTransform,
          }}
        >
          {CHIPMUNK}
        </motion.div>
      </motion.div>
    </Centered>
  );
}

export default Balance;
