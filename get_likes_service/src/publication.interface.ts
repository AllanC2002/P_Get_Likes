export interface Publication {
  Id_user: number;
  Text: string;
  Multimedia: any[] | null;
  Status: number;
  Datepublish: Date;
  Likes: string[];
}
