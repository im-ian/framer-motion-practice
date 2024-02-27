import {
  CSSProperties,
  HTMLAttributes,
  PropsWithChildren,
  forwardRef,
} from "react";
import { Minimize } from "react-feather";
import { motion } from "framer-motion";

import { addUnit } from "../../utils/unit";

import style from "./index.module.css";

type CenteredProps = PropsWithChildren<{
  style?: CSSProperties;
}>;

export function Centered({ style: _style, children }: CenteredProps) {
  return (
    <div className={style.layout} style={_style}>
      {children}
    </div>
  );
}

export const Box = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function Box({ style: _style, children, ...props }, ref) {
    return (
      <div ref={ref} className={style.box} style={_style} {...props}>
        {children}
      </div>
    );
  }
);

type GridProps = PropsWithChildren<{
  gridCols?: number;
  gridGap?: number;
}>;

export function Grid({ gridCols = 4, gridGap = 4, children }: GridProps) {
  return (
    <div
      className={style.grid}
      style={{
        gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
        gridGap: addUnit(gridGap, "px"),
      }}
    >
      {children}
    </div>
  );
}

type OverlayProps = PropsWithChildren<{
  title?: string;
  onClose?: () => void;
}>;

export function Overlay({ title, onClose, children }: OverlayProps) {
  return (
    <motion.div className={style.overlay}>
      <div className={style["overlay-header"]}>
        <div className={style["overlay-title"]}>{title}</div>
        <div className={style["overlay-header-close"]} onClick={onClose}>
          <motion.div
            whileHover={{
              rotate: 45,
            }}
          >
            <Minimize color={"#fff"} />
          </motion.div>
        </div>
      </div>
      {children}
    </motion.div>
  );
}
