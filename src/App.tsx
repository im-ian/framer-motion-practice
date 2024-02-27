import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Box, Centered, Grid, Overlay } from "./components/layout";
import { GalleryItem } from "./types/gallery";

import { GALLERY_ITEM } from "./constants/gallery";

function App() {
  const [item, setItem] = useState<GalleryItem>();

  return (
    <>
      <Centered>
        <Grid gridGap={8}>
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
          <Overlay
            title={item.title}
            description={item.description}
            onClose={() => setItem(undefined)}
          >
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
