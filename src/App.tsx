import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ChipmunkInTheBox from "./components/framer/ChipmunkInTheBox";
import { Box, Centered, Grid, Overlay } from "./components/layout";

const GALLERY_ITEM = [
  {
    id: "chipmunk-in-the-box",
    title: "Chipmunk in the Box",
    icon: "🐿",
    content: <ChipmunkInTheBox />,
  },
] as const;

function App() {
  const [item, setItem] = useState<(typeof GALLERY_ITEM)[number]>();

  return (
    <>
      <Centered>
        <Grid>
          {GALLERY_ITEM.map((item) => (
            <motion.div
              key={item.id}
              id={item.id}
              layoutId={item.id}
              whileHover={{ scale: 1.1, rotate: 10, cursor: "pointer" }}
              onClick={() => setItem(item)}
            >
              <Box>{item.icon}</Box>
            </motion.div>
          ))}
        </Grid>
      </Centered>
      <AnimatePresence>
        {item && (
          <Overlay title={item.title} onClose={() => setItem(undefined)}>
            <Centered>
              <motion.div layoutId={item.id}>{item.content}</motion.div>
            </Centered>
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
