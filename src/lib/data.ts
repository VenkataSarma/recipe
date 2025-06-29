export type Recipe = {
  id: number;
  name: string;
  category: 'Breakfast' | 'Lunch' | 'Snacks' | 'Desserts' | 'Drinks' | 'Dinner';
  image: string;
  imageHint: string;
  cuisine: 'Italian' | 'Indian' | 'Chinese' | 'Mexican' | 'Japanese';
  diet: 'Vegan' | 'Gluten-Free' | 'Keto' | 'Vegetarian' | 'None';
  cookingTime: number; // in minutes
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number; // 1 to 5
  ingredients: { item: string; quantity: string }[];
  instructions: string[];
  featured?: "Editor's Pick" | 'Trending';
  isQuickBite?: boolean;
};

export const recipes: Recipe[] = [
  {
    id: 1,
    name: 'Classic Spaghetti Carbonara',
    category: 'Dinner',
    image: 'https://source.unsplash.com/600x400/?spaghetti-carbonara',
    imageHint: 'spaghetti carbonara',
    cuisine: 'Italian',
    diet: 'None',
    cookingTime: 25,
    difficulty: 'Medium',
    rating: 5,
    ingredients: [
      { item: 'Spaghetti', quantity: '200g' },
      { item: 'Guanciale', quantity: '100g' },
      { item: 'Eggs', quantity: '2 large' },
      { item: 'Pecorino Romano cheese', quantity: '50g' },
      { item: 'Black pepper', quantity: 'to taste' },
    ],
    instructions: [
      'Cook spaghetti according to package directions.',
      'While pasta is cooking, fry guanciale until crisp.',
      'In a bowl, whisk eggs and cheese.',
      'Drain pasta, reserving some pasta water. Combine pasta with guanciale.',
      'Off heat, stir in egg mixture and pasta water to create a creamy sauce.',
      'Serve immediately with lots of black pepper.',
    ],
    featured: "Editor's Pick",
  },
  {
    id: 2,
    name: 'Vegan Chickpea Curry',
    category: 'Dinner',
    image: 'https://source.unsplash.com/600x400/?vegan-curry',
    imageHint: 'vegan curry',
    cuisine: 'Indian',
    diet: 'Vegan',
    cookingTime: 30,
    difficulty: 'Easy',
    rating: 4,
    ingredients: [
      { item: 'Canned chickpeas', quantity: '1 can' },
      { item: 'Onion', quantity: '1' },
      { item: 'Garlic', quantity: '2 cloves' },
      { item: 'Ginger', quantity: '1 inch' },
      { item: 'Canned tomatoes', quantity: '1 can' },
      { item: 'Coconut milk', quantity: '1 can' },
      { item: 'Spices (cumin, coriander, turmeric)', quantity: '1 tsp each' },
    ],
    instructions: [
      'Sauté onion, garlic, and ginger.',
      'Add spices and cook for another minute.',
      'Stir in tomatoes and chickpeas.',
      'Simmer for 15 minutes.',
      'Add coconut milk and heat through.',
      'Serve with rice or naan.',
    ],
  },
  {
    id: 3,
    name: 'Keto Avocado Smoothie',
    category: 'Drinks',
    image: 'https://source.unsplash.com/600x400/?avocado-smoothie',
    imageHint: 'avocado smoothie',
    cuisine: 'Mexican',
    diet: 'Keto',
    cookingTime: 5,
    difficulty: 'Easy',
    rating: 5,
    ingredients: [
      { item: 'Avocado', quantity: '1/2' },
      { item: 'Almond milk', quantity: '1 cup' },
      { item: 'Spinach', quantity: '1 handful' },
      { item: 'Keto-friendly sweetener', quantity: 'to taste' },
      { item: 'Ice cubes', quantity: 'a few' },
    ],
    instructions: ['Combine all ingredients in a blender.', 'Blend until smooth.', 'Serve immediately.'],
    isQuickBite: true,
  },
  {
    id: 4,
    name: 'Gluten-Free Pancakes',
    category: 'Breakfast',
    image: 'https://source.unsplash.com/600x400/?fluffy-pancakes',
    imageHint: 'fluffy pancakes',
    cuisine: 'Japanese', // (fluffy style)
    diet: 'Gluten-Free',
    cookingTime: 20,
    difficulty: 'Easy',
    rating: 4,
    ingredients: [
        { item: 'Gluten-free all-purpose flour', quantity: '1 cup' },
        { item: 'Baking powder', quantity: '2 tsp' },
        { item: 'Sugar', quantity: '2 tbsp' },
        { item: 'Egg', quantity: '1' },
        { item: 'Milk', quantity: '1 cup' },
        { item: 'Melted butter', quantity: '2 tbsp' },
    ],
    instructions: [
        'Whisk together dry ingredients.',
        'In a separate bowl, whisk wet ingredients.',
        'Combine wet and dry ingredients until just mixed.',
        'Cook on a preheated griddle until golden brown on both sides.',
        'Serve with your favorite toppings.',
    ],
    featured: "Trending",
  },
  {
    id: 5,
    name: 'Spicy Tuna Rolls',
    category: 'Snacks',
    image: 'https://source.unsplash.com/600x400/?sushi-rolls',
    imageHint: 'sushi rolls',
    cuisine: 'Japanese',
    diet: 'None',
    cookingTime: 45,
    difficulty: 'Hard',
    rating: 5,
    ingredients: [
        { item: 'Sushi rice', quantity: '2 cups' },
        { item: 'Nori sheets', quantity: '4' },
        { item: 'Sashimi-grade tuna', quantity: '200g' },
        { item: 'Spicy mayo', quantity: '1/4 cup' },
        { item: 'Cucumber', quantity: '1/2' },
    ],
    instructions: [
        'Prepare sushi rice according to package directions.',
        'Lay a nori sheet on a bamboo mat.',
        'Spread a thin layer of rice over the nori.',
        'Place tuna and cucumber strips at one end.',
        'Roll tightly and slice into pieces.',
        'Top with spicy mayo.',
    ],
    featured: "Editor's Pick",
  },
  {
    id: 6,
    name: 'Quick Chicken Stir-Fry',
    category: 'Lunch',
    image: 'https://source.unsplash.com/600x400/?chicken-stir-fry',
    imageHint: 'chicken stir-fry',
    cuisine: 'Chinese',
    diet: 'None',
    cookingTime: 15,
    difficulty: 'Easy',
    rating: 4,
    ingredients: [
        { item: 'Chicken breast, sliced', quantity: '1' },
        { item: 'Mixed vegetables (broccoli, carrots, bell peppers)', quantity: '2 cups' },
        { item: 'Soy sauce', quantity: '3 tbsp' },
        { item: 'Garlic, minced', quantity: '2 cloves' },
        { item: 'Sesame oil', quantity: '1 tsp' },
    ],
    instructions: [
        'Heat a wok or large skillet over high heat.',
        'Add oil and stir-fry chicken until cooked through.',
        'Add vegetables and stir-fry until tender-crisp.',
        'Add garlic and cook for 30 seconds.',
        'Stir in soy sauce and sesame oil.',
        'Serve immediately over rice.',
    ],
    isQuickBite: true,
    featured: "Trending",
  },
];

export type Testimonial = {
  name: string;
  title: string;
  quote: string;
  avatar: string;
  avatarHint: string;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Jessica Pearson',
    title: 'Home Cook Hero',
    quote: 'Culinary Canvas has transformed my weeknight dinners. The recipes are easy to follow and absolutely delicious. The "Surprise Me" feature is a lifesaver!',
    avatar: 'https://source.unsplash.com/100x100/?smiling-woman',
    avatarHint: 'smiling woman',
  },
  {
    name: 'Mike Ross',
    title: 'Weekend Foodie',
    quote: 'I love exploring new cuisines, and this site makes it so easy. The filter options are fantastic for finding exactly what I\'m in the mood for. Highly recommend!',
    avatar: 'https://source.unsplash.com/100x100/?man-eating',
    avatarHint: 'man eating',
  },
  {
    name: 'Donna Paulsen',
    title: 'Busy Professional',
    quote: 'As someone with a hectic schedule, the "Quick Bites" section is a game-changer. I can find healthy and fast recipes without endless searching. The UI is also gorgeous!',
    avatar: 'https://source.unsplash.com/100x100/?professional-woman',
    avatarHint: 'professional woman',
  },
];
