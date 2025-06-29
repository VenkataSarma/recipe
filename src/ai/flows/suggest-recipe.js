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
exports.suggestRecipe = suggestRecipe;
/**
 * @fileOverview An AI agent that suggests a recipe from a list of recipes.
 *
 * - suggestRecipe - A function that suggests a recipe.
 * - SuggestRecipeInput - The input type for the suggestRecipe function.
 * - SuggestRecipeOutput - The return type for the suggestRecipe function.
 */
const genkit_1 = require("@/ai/genkit");
const genkit_2 = require("genkit");
const SuggestRecipeInputSchema = genkit_2.z.object({
    recipes: genkit_2.z.array(genkit_2.z.string().describe('A list of available recipes to choose from.')).describe('The list of available recipes.'),
});
const SuggestRecipeOutputSchema = genkit_2.z.object({
    suggestedRecipe: genkit_2.z.string().describe('The name of the suggested recipe.'),
});
function suggestRecipe(input) {
    return __awaiter(this, void 0, void 0, function* () {
        return suggestRecipeFlow(input);
    });
}
const prompt = genkit_1.ai.definePrompt({
    name: 'suggestRecipePrompt',
    input: { schema: SuggestRecipeInputSchema },
    output: { schema: SuggestRecipeOutputSchema },
    prompt: `Given the following list of recipes, suggest one recipe to the user.
Recipes: {{{recipes}}}

Please suggest only one recipe from the list. The recipe name should exactly match one of the items in the list.  Return the name of the suggested recipe in the "suggestedRecipe" field.
`,
});
const suggestRecipeFlow = genkit_1.ai.defineFlow({
    name: 'suggestRecipeFlow',
    inputSchema: SuggestRecipeInputSchema,
    outputSchema: SuggestRecipeOutputSchema,
}, (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { output } = yield prompt(input);
    return output;
}));
