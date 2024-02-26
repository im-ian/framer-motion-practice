import { CSSProperties, PropsWithChildren, forwardRef } from "react";
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

type BoxProps = PropsWithChildren<{
  style?: CSSProperties;
}>;

export const Box = forwardRef<HTMLDivElement, BoxProps>(function Box(
  { style: _style, children },
  ref
) {
  return (
    <div ref={ref} className={style.box} style={_style}>
      {children}
    </div>
  );
});
