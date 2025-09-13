export type AsideTypesExtentionsData = {
  text: string;
};

export type AsideTypesExtentions = AsideTypesExtentionsData[];

export type AsideElementType = { 
  text: string;
  icon: string;
  href: string;
  isNew?: boolean;
  extentions?: AsideTypesExtentions;
};

export type AsideTypes = AsideElementType[];
