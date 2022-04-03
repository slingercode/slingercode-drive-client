export type AlbumType = {
  _id: string;
  files: string[];
};

export type GetAlbumType = {
  _id: string;
  name: string;
};

export type FileType = {
  width: number;
  height: number;
  name: string;
  data: string;
};
