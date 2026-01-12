export type UserRole = 'customer' | 'admin';

export interface User {
  id: number;
  telegram_id: number;
  username?: string;
  role: UserRole;
  created_at: string;
}
