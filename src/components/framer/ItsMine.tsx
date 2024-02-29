import { forwardRef, useEffect, useState } from "react";
import { motion, useAnimate } from "framer-motion";

import { Centered } from "../layout";
import { CHIPMUNK } from "../../constants/symbol";

interface ButtonProps {
  onClick?: () => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick }, ref) => {
    return (
      <motion.button
        ref={ref}
        style={{
          padding: "0 16px",
          lineHeight: "40px",
        }}
        onClick={onClick}
      >
        click me!
      </motion.button>
    );
  }
);

const Animation = () => {
  const [buttonScope, buttonAnimate] = useAnimate();
  const [chipmunkScope, chipmunkAnimate] = useAnimate();

  useEffect(() => {
    async function startAnimate() {
      await chipmunkAnimate(chipmunkScope.current, { x: 100 }, { duration: 1 });
      await chipmunkAnimate(
        chipmunkScope.current,
        { y: -20 },
        { duration: 0.2 }
      );
      await chipmunkAnimate(chipmunkScope.current, { y: 0 }, { duration: 0.2 });
      await chipmunkAnimate(
        chipmunkScope.current,
        { x: 0 },
        { delay: 0.5, ease: "easeOut" }
      );

      async function moveButton(x: number) {
        return Promise.all([
          chipmunkAnimate(
            chipmunkScope.current,
            { x },
            { delay: 0.3, duration: 1 }
          ),
          buttonAnimate(
            buttonScope.current,
            { x },
            { delay: 0.3, duration: 1 }
          ),
        ]);
      }

      await moveButton(40);
      await moveButton(80);
      await moveButton(120);
      await moveButton(160);
      await moveButton(200);
      await moveButton(240);
      await moveButton(280);
    }

    startAnimate();
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
      }}
    >
      <Button ref={buttonScope} />
      <motion.span
        ref={chipmunkScope}
        style={{
          position: "absolute",
          fontSize: 34,
        }}
        initial={{
          x: 200,
        }}
      >
        {CHIPMUNK}
      </motion.span>
    </div>
  );
};

function ItsMine() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Centered
      style={{
        width: "100%",
        padding: "15px 0",
        textAlign: "center",
        overflowX: "hidden",
        overflowY: "visible",
      }}
    >
      {!isClicked && <Button onClick={() => setIsClicked(true)} />}
      {isClicked && <Animation />}
    </Centered>
  );
}

export default ItsMine;
