'use server';

import { suggestRecipe } from '@/ai/flows/suggest-recipe';
import { recipes as allRecipes, type Recipe } from '@/lib/data';

export async function getSurpriseRecipe(): Promise<Recipe | null> {
  try {
    const recipeNames = allRecipes.map((r) => r.name);
    
    // Ensure we have recipes to suggest from
    if(recipeNames.length === 0) {
      console.error("No recipes available to suggest.");
      return null;
    }

    const result = await suggestRecipe({ recipes: recipeNames });
    
    if (result.suggestedRecipe) {
      const suggested = allRecipes.find(r => r.name === result.suggestedRecipe);
      if (suggested) {
        return suggested;
      }
      console.warn(`AI suggested a recipe not in the list: "${result.suggestedRecipe}". Falling back to random.`);
    }
    
    // Fallback if AI gives an invalid response or no suggestion
    return allRecipes[Math.floor(Math.random() * allRecipes.length)];
  } catch (error) {
    console.error("Error getting surprise recipe:", error);
    // Fallback to random recipe if AI fails
    if (allRecipes.length > 0) {
      return allRecipes[Math.floor(Math.random() * allRecipes.length)];
    }
    return null;
  }
}
