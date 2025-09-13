import { AsideTypes } from "../types/aside.types";
import {
  CircleQuestionMark,
  CircleUser,
  Coins,
  Compass,
  LucideIcon,
  Settings,
  TableOfContents,
} from 'lucide-react';

export const ASIDE_MAIN_DATA: AsideTypes = [
  { icon: 'Compass', text: 'Discover', href: '/' },
  { icon: 'Coins', text: 'Tokens', href: '/' },
  { icon: 'TableOfContents', text: 'Activities', href: '/' },
  { icon: 'CircleUser', text: 'Profile', href: '/' },
  { icon: 'Settings', text: 'Settings', href: '/', isNew: true,
    extentions: [{text: 'Theme'}, {text: 'Language'}],
   },
  { icon: 'CircleQuestionMark', text: 'Support', href: '/' },
];

export const iconMap: Record<string, LucideIcon> = {
  Compass,
  Settings,
  CircleUser,
  Coins,
  TableOfContents,
  CircleQuestionMark
};
