import type { ReactNode } from "react";

export type AsideTypesExtentionsData = {
  element: ReactNode;
  data: string;
};

export type AsideTypesExtentions = AsideTypesExtentionsData[];

export type AsideElementType = { 
  text: string;
  icon: string;
  href?: string;
  element?: ReactNode;
  isNew?: boolean;
  extentions?: AsideTypesExtentions;
};

export type AsideTypes = AsideElementType[];
