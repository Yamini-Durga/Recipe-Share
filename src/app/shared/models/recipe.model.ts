import { Ingredient } from "./ingredient.model";

export interface Recipe {
    id?: string;
    name: string;
    imageUrl: string;
    ingredients: Ingredient[],
    instructions: string;
}