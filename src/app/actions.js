"use strict";
'use server';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSurpriseRecipe = getSurpriseRecipe;
const suggest_recipe_1 = require("@/ai/flows/suggest-recipe");
const data_1 = require("@/lib/data");
function getSurpriseRecipe() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const recipeNames = data_1.recipes.map((r) => r.name);
            // Ensure we have recipes to suggest from
            if (recipeNames.length === 0) {
                console.error("No recipes available to suggest.");
                return null;
            }
            const result = yield (0, suggest_recipe_1.suggestRecipe)({ recipes: recipeNames });
            if (result.suggestedRecipe) {
                const suggested = data_1.recipes.find(r => r.name === result.suggestedRecipe);
                if (suggested) {
                    return suggested;
                }
                console.warn(`AI suggested a recipe not in the list: "${result.suggestedRecipe}". Falling back to random.`);
            }
            // Fallback if AI gives an invalid response or no suggestion
            return data_1.recipes[Math.floor(Math.random() * data_1.recipes.length)];
        }
        catch (error) {
            console.error("Error getting surprise recipe:", error);
            // Fallback to random recipe if AI fails
            if (data_1.recipes.length > 0) {
                return data_1.recipes[Math.floor(Math.random() * data_1.recipes.length)];
            }
            return null;
        }
    });
}
