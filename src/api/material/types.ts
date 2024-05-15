export type CreateMaterialReqM = {
  title: string;
  summary: string;
  link: string;
  category: string;
  source: string;
};

export type MaterialResM = {
  category: string;
  id: number;
  isApproved: boolean;
  link: string;
  source: string;
  summary: string;
  title: string;
};
