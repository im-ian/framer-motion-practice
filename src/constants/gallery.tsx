import ChipmunkInTheBox from "../components/framer/InTheBox";
import Balance from "../components/framer/Balance";

import { Gallery } from "../types/gallery";

export const GALLERY_ITEM: Gallery = [
  {
    id: "in-the-box",
    title: "In the Box",
    description: "하얀 박스를 드래그 해보세요.",
    icon: "📦",
    content: <ChipmunkInTheBox />,
  },
  {
    id: "balance",
    title: "Blance",
    description: "하얀 막대를 위 아래로 드래그해보세요.",
    icon: "⚖️",
    content: <Balance />,
  },
];
