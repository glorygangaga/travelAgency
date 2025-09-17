import { LucideIcon, Moon, Sun, SunMoon } from 'lucide-react';

export type THEMES_DATA_TYPE_EL = {
  icon: LucideIcon;
  id: number;
  type: 'dark' | 'light' | 'system',
}

export type THEMES_DATA_TYPE = THEMES_DATA_TYPE_EL[];

export const THEMES_DATA: THEMES_DATA_TYPE = [
  {icon: Moon, id: 1, type: 'dark'},
  {icon: Sun, id: 2, type: 'light'},
  {icon: SunMoon, id: 3, type: 'system'}

];

