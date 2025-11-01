import { FoodEnum, FoodType } from "@/shared/types/tour.types";

export const tourFoodOptions: FoodType = [
  {value: 'Room only', id: 1, exitValue: FoodEnum.RO},
  {value: 'Bed & Breakfast', id: 2, exitValue: FoodEnum.BB},
  {value: 'Half Board', id: 3, exitValue: FoodEnum.HB},
  {value: 'Full Board', id: 4, exitValue: FoodEnum.FB},
  {value: 'All Inclusive', id: 5, exitValue: FoodEnum.AI},
];