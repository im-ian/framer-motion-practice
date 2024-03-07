export type GalleryItem = {
  id: string;
  title: string;
  description?: string;
  icon: string;
  content: React.ReactNode;
};

export type Gallery = GalleryItem[];
