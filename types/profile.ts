export type Profile = {
  id: string;
  username: string;
  full_name?: string | null;
  bio?: string | null;
  avatar_url?: string | null;
  theme: 'light' | 'dark' | 'system';
  updated_at: string;
  is_public: boolean;
  created_at?: string;
};
