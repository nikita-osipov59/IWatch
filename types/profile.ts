export type TProfile = {
  id: string;
  username: string;
  first_name?: string | null;
  last_name?: string | null;
  email: string;
  description?: string | null;
  avatar_url?: string | null;
  theme: 'light' | 'dark' | 'system';
  is_public: boolean;
  created_at: string;
  updated_at: string;
};
