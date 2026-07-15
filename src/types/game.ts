export interface Game {
  id: string;
  title: string;
  genre: string;
  platform: string;
  cover: string;
  status: "Featured" | "Trending" | "Popular";
}