export interface IcatSub {
  results: number;
  metadata: Metadata;
  data: any[]|Datum[];
}

interface Datum {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}