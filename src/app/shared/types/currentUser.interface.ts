export interface CurrentUserInterface {
  id: number;
  email: string;

  username: string;
  bio: string;
  image: string | null;
  token: string | null;
}
