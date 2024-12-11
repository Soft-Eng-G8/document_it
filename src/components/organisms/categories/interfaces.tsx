export interface Document {
  Id: number;
  Title: string;
  Description: string;
  FileType: string;
  FileSize: string;
}

export interface Category {
  Id: number;
  Title: string;
  Icon: string;
  Description: string;
  Documents: Document[];
  Categories: Category[];
}
