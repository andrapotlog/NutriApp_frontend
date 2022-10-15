export interface RecipeModel {
  id_recipe: string;
  id_user: string;
  name: string;
  breakfast: number;
  lunch: number;
  dinner: number;
  snacks: number;
  measure_label: string;
  energ_kcal: number;
  protein: number;
  fats: number;
  carbs: number;
  url_image: string;
  url: string;
}
