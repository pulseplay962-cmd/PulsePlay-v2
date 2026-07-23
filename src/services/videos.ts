export type Video = {
  id: string;
  title: string;
  description?: string | null;
  thumbnail?: string | null;
  url?: string | null;
  platform?: string | null;
  featured?: boolean;
  created_at?: string;
};