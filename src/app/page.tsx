"use client";

import * as React from 'react';
import { recipes as allRecipes, testimonials, type Recipe } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Skeleton } from '@/components/ui/skeleton';
import { ChefHat, Search, Soup, Sandwich, Martini, Dessert, Star, Clock, BarChart, X, Heart, Share2, Youtube, IndianRupee, Grape, Wind, Twitter, Facebook, Instagram, Send, StarHalf } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { getSurpriseRecipe } from './actions';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

const cuisineTypes = ["All", "Italian", "Indian", "Chinese", "Mexican"];
const dietTypes = ["All", "Vegan", "Gluten-Free", "Keto", "Vegetarian"];
const difficultyLevels = ["All", "Easy", "Medium", "Hard"];
const categories = [
  { name: 'Breakfast', icon: Soup },
  { name: 'Lunch', icon: Sandwich },
  { name: 'Snacks', icon: Grape },
  { name: 'Dinner', icon: Soup },
  { name: 'Desserts', icon: Dessert },
  { name: 'Drinks', icon: Martini },
];

const navLinks = [
  { name: 'Categories', id: 'categories' },
  { name: 'Featured', id: 'featured' },
  { name: 'Reviews', id: 'reviews' },
  { name: 'Contact', id: 'footer' },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${rating > i ? 'text-primary fill-current' : 'text-muted-foreground'}`}
      />
    ))}
  </div>
);

export default function CulinaryCanvasPage() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const [filters, setFilters] = React.useState({
    cuisine: 'All',
    diet: 'All',
    cookingTime: [120],
    difficulty: 'All',
    rating: 0,
  });
  const [selectedRecipe, setSelectedRecipe] = React.useState<Recipe | null>(null);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { toast } = useToast();

  const refs = {
    categories: React.useRef<HTMLElement>(null),
    featured: React.useRef<HTMLElement>(null),
    reviews: React.useRef<HTMLElement>(null),
    footer: React.useRef<HTMLElement>(null),
  };

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleFilterChange = (
  key: keyof typeof filters,
  value: string | string[] | number | number[]
) => {
  setFilters(prev => ({ ...prev, [key]: value }));
};


  const resetFilters = () => {
    setFilters({ cuisine: 'All', diet: 'All', cookingTime: [120], difficulty: 'All', rating: 0 });
    setSearchQuery('');
  }

  const filteredRecipes = React.useMemo(() => {
    return allRecipes.filter(recipe => {
      return (
        (recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.ingredients.some(i => i.item.toLowerCase().includes(searchQuery.toLowerCase()))) &&
        (filters.cuisine === 'All' || recipe.cuisine === filters.cuisine) &&
        (filters.diet === 'All' || recipe.diet === filters.diet) &&
        recipe.cookingTime <= filters.cookingTime[0] &&
        (filters.difficulty === 'All' || recipe.difficulty === filters.difficulty) &&
        recipe.rating >= filters.rating
      );
    });
  }, [searchQuery, filters]);

  const handleSurpriseMe = async () => {
    toast({ title: "Finding a surprise recipe for you...", description: "Our AI is picking something delicious!" });
    const recipe = await getSurpriseRecipe();
    if (recipe) {
      setSelectedRecipe(recipe);
    } else {
      toast({ variant: 'destructive', title: "Uh oh!", description: "Couldn't find a surprise recipe. Please try again." });
    }
  };

  const scrollTo = (id: 'categories' | 'featured' | 'reviews' | 'footer') => {
    refs[id].current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen bg-background font-body">
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-2 font-headline text-2xl font-bold text-foreground">
                <ChefHat className="text-primary h-8 w-8" />
                Culinary Canvas
              </div>
              <nav className="hidden md:flex items-center gap-6">
                {navLinks.map(link => (
                  <Button key={link.id} variant="ghost" onClick={() => scrollTo(link.id as keyof typeof refs)}>{link.name}</Button>
                ))}
              </nav>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Input 
                    type="search" 
                    placeholder="Search recipes..." 
                    className={`transition-all duration-300 ease-in-out h-10 ${isSearchFocused ? 'w-48 pr-10' : 'w-10 sm:w-48 sm:pr-10'}`}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  <Search className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-all duration-300 ${isSearchFocused ? 'right-3' : 'right-2.5 sm:right-3'}`} />
                </div>
                <ThemeToggle />
                <Button variant="ghost" className="md:hidden">Menu</Button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white">
            <Image src="https://source.unsplash.com/1920x1080/?delicious,food" alt="Delicious food spread" layout="fill" objectFit="cover" className="brightness-50" data-ai-hint="delicious food" />
            <div className="relative z-10 p-4">
              <h1 className="text-5xl md:text-7xl font-headline font-extrabold mb-4 drop-shadow-lg">Discover Delicious Recipes!</h1>
              <p className="max-w-2xl mx-auto mb-8 text-lg md:text-xl drop-shadow">From quick bites to gourmet meals, find your next favorite dish right here.</p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" onClick={() => scrollTo('categories')}>Explore Recipes</Button>
                <Button size="lg" variant="secondary" onClick={handleSurpriseMe}>
                  <SparklesIcon className="mr-2 h-5 w-5" /> Surprise Me
                </Button>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filter Panel */}
              <aside className="lg:col-span-1 lg:sticky lg:top-24 h-fit">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><FilterIcon className="h-5 w-5" /> Filters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="text-sm font-medium">Cuisine</label>
                      <Select value={filters.cuisine} onValueChange={value => handleFilterChange('cuisine', value)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{cuisineTypes.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Dietary</label>
                      <Select value={filters.diet} onValueChange={value => handleFilterChange('diet', value)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{dietTypes.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                     <div>
                      <label className="text-sm font-medium">Max Cooking Time: {filters.cookingTime[0]} min</label>
                      <Slider value={filters.cookingTime} onValueChange={value => handleFilterChange('cookingTime', value)} max={120} step={5} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Difficulty</label>
                      <Select value={filters.difficulty} onValueChange={value => handleFilterChange('difficulty', value)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{difficultyLevels.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Minimum Rating</label>
                      <div className="flex justify-center"><StarRating rating={filters.rating} /></div>
                       <Slider value={[filters.rating]} onValueChange={value => handleFilterChange('rating', value[0])} max={5} step={1} />
                    </div>
                  </CardContent>
                  <CardFooter>
                     <Button variant="outline" className="w-full" onClick={resetFilters}>Reset Filters</Button>
                  </CardFooter>
                </Card>
              </aside>
              
              {/* Recipes Grid */}
              <div className="lg:col-span-3">
                <section ref={refs.categories} id="categories" className="mb-16">
                  <h2 className="text-4xl font-headline text-center mb-12">Browse by Category</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
                    {categories.map(category => (
                      <Card key={category.name} className="overflow-hidden group cursor-pointer text-center relative flex items-center justify-center h-40 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                          <Image src={`https://source.unsplash.com/400x300/?${category.name.toLowerCase()}-food`} alt={category.name} layout="fill" objectFit="cover" className="group-hover:scale-110 transition-transform duration-500 brightness-50" data-ai-hint={`${category.name.toLowerCase()} food`} />
                          <div className="relative z-10 text-white">
                              <category.icon className="h-10 w-10 mx-auto mb-2" />
                              <h3 className="text-xl font-bold font-headline">{category.name}</h3>
                          </div>
                      </Card>
                    ))}
                  </div>
                </section>
                
                <Separator className="my-16" />

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredRecipes.length > 0 ? (
                    filteredRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} onSelectRecipe={setSelectedRecipe} />)
                  ) : (
                    <div className="md:col-span-2 xl:col-span-3 text-center py-16">
                      <p className="text-2xl font-semibold text-muted-foreground">No recipes found!</p>
                      <p className="mt-2 text-muted-foreground">Try adjusting your filters or search terms.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Featured Recipes Section */}
          <section ref={refs.featured} id="featured" className="py-20 bg-secondary/30">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-headline text-center mb-12">Featured This Week</h2>
              <Carousel opts={{ loop: true }} className="w-full">
                <CarouselContent>
                  {allRecipes.filter(r => r.featured).map(recipe => (
                    <CarouselItem key={recipe.id} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <RecipeCard recipe={recipe} onSelectRecipe={setSelectedRecipe} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="ml-12" />
                <CarouselNext className="mr-12" />
              </Carousel>
            </div>
          </section>

          {/* Testimonials Section */}
          <section ref={refs.reviews} id="reviews" className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-headline text-center mb-12">What Our Foodies Say</h2>
               <Carousel className="w-full max-w-4xl mx-auto" opts={{ loop: true }}>
                  <CarouselContent>
                    {testimonials.map((testimonial, index) => (
                      <CarouselItem key={index}>
                        <Card className="border-0 shadow-none">
                          <CardContent className="flex flex-col items-center text-center p-6">
                            <Avatar className="w-24 h-24 mb-4 border-4 border-primary/20">
                              <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.avatarHint} />
                              <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <p className="text-lg italic text-muted-foreground mb-4">"{testimonial.quote}"</p>
                            <h3 className="font-bold text-lg">{testimonial.name}</h3>
                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
            </div>
          </section>
        </main>

        <footer ref={refs.footer} id="footer" className="bg-card text-card-foreground border-t">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div>
                <h3 className="font-headline text-xl font-bold mb-4">Culinary Canvas</h3>
                <p className="text-muted-foreground text-sm">Your daily dose of deliciousness. Inspiring home cooks with recipes for every occasion.</p>
              </div>
              <div>
                <h3 className="font-headline text-xl font-bold mb-4">Subscribe to our Newsletter</h3>
                <div className="flex w-full max-w-sm mx-auto md:mx-0">
                  <Input type="email" placeholder="Email address" className="rounded-r-none focus:z-10" />
                  <Button type="submit" className="rounded-l-none">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="font-headline text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex justify-center md:justify-start gap-4">
                  <Button variant="ghost" size="icon"><Twitter /></Button>
                  <Button variant="ghost" size="icon"><Facebook /></Button>
                  <Button variant="ghost" size="icon"><Instagram /></Button>
                </div>
              </div>
            </div>
            <Separator className="my-8" />
            <div className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Culinary Canvas. All Rights Reserved.
            </div>
          </div>
        </footer>

        <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      </div>
    </TooltipProvider>
  );
}

const RecipeCard = ({ recipe, onSelectRecipe }: { recipe: Recipe; onSelectRecipe: (recipe: Recipe) => void; }) => (
  <Card className="overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1" onClick={() => onSelectRecipe(recipe)}>
    <CardHeader className="p-0 relative">
      <Image src={recipe.image} alt={recipe.name} width={400} height={300} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" data-ai-hint={recipe.imageHint} />
      {recipe.featured && <Badge className="absolute top-2 right-2">{recipe.featured}</Badge>}
    </CardHeader>
    <CardContent className="p-4">
      <p className="text-sm text-muted-foreground">{recipe.cuisine} • {recipe.category}</p>
      <h3 className="text-lg font-bold font-headline truncate" title={recipe.name}>{recipe.name}</h3>
      <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
        <div className="flex items-center gap-1"><Clock className="h-4 w-4" />{recipe.cookingTime} min</div>
        <div className="flex items-center gap-1"><BarChart className="h-4 w-4" />{recipe.difficulty}</div>
        <StarRating rating={recipe.rating} />
      </div>
    </CardContent>
  </Card>
);

const RecipeModal = ({ recipe, onClose }: { recipe: Recipe | null; onClose: () => void; }) => (
  <Dialog open={!!recipe} onOpenChange={(open) => !open && onClose()}>
    <DialogContent className="max-w-4xl max-h-[90vh] grid-rows-[auto,1fr,auto] p-0">
      {recipe && (
        <>
        <DialogHeader className="p-6 pb-0">
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-3xl font-headline mb-2">{recipe.name}</DialogTitle>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Soup className="h-4 w-4" /> {recipe.cuisine}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {recipe.cookingTime} min</span>
                <span className="flex items-center gap-1"><BarChart className="h-4 w-4" /> {recipe.difficulty}</span>
                <StarRating rating={recipe.rating} />
              </div>
            </div>
            <div className="flex gap-2">
              <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon"><Heart className="h-4 w-4"/></Button></TooltipTrigger><TooltipContent><p>Save to favorites</p></TooltipContent></Tooltip>
              <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon"><Share2 className="h-4 w-4"/></Button></TooltipTrigger><TooltipContent><p>Share recipe</p></TooltipContent></Tooltip>
            </div>
          </div>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6 overflow-y-auto p-6">
          <div className="space-y-4">
            <Image src={recipe.image} alt={recipe.name} width={600} height={400} className="rounded-lg object-cover w-full" data-ai-hint={recipe.imageHint} />
            <h3 className="font-bold text-xl font-headline">Ingredients</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              {recipe.ingredients.map((ing, i) => <li key={i}>{ing.quantity} {ing.item}</li>)}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-xl font-headline">Instructions</h3>
            <ol className="list-decimal list-inside space-y-2">
              {recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
            </ol>
            <Button variant="secondary" className="w-full"><Youtube className="mr-2 h-5 w-5" /> Watch Video Tutorial</Button>
          </div>
        </div>
        </>
      )}
    </DialogContent>
  </Dialog>
);

const LoadingSkeleton = () => (
  <div className="container mx-auto px-4 py-16 animate-pulse">
    <header className="flex items-center justify-between h-20 mb-16">
      <Skeleton className="h-8 w-48" />
      <div className="flex gap-6"><Skeleton className="h-8 w-20" /><Skeleton className="h-8 w-20" /><Skeleton className="h-8 w-20" /></div>
      <div className="flex gap-2"><Skeleton className="h-10 w-48" /><Skeleton className="h-10 w-10 rounded-full" /></div>
    </header>
    <Skeleton className="h-[50vh] w-full rounded-lg mb-16" />
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <Skeleton className="h-96 w-full lg:col-span-1 rounded-lg" />
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-72 w-full rounded-lg" />)}
      </div>
    </div>
  </div>
);

// Custom icons to avoid adding another library for them
const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.25c.34-.005.67.11.93.33l1.83 1.83c.25.26.38.6.38.95v1.29c.34.005.67-.11.93-.33l1.83-1.83c.26-.25.6-.38.95-.38h1.29c.005.34-.11.67-.33.93L18.4 7.08c-.26.25-.38.6-.38.95v1.29c-.005.34.11.67.33.93l1.83 1.83c.25.26.38.6.38.95v1.29c-.34-.005-.67.11-.93.33l-1.83 1.83c-.26.25-.6.38-.95.38h-1.29c-.005-.34.11-.67.33-.93l1.83-1.83c.26-.25.38-.6.38-.95v-1.29c.005-.34-.11-.67-.33-.93l-1.83-1.83a1.32 1.32 0 00-.95-.38h-1.29c-.34.005-.67-.11-.93-.33l-1.83-1.83a1.32 1.32 0 00-.95-.38H8.92c-.34-.005-.67.11-.93.33l-1.83 1.83c-.25.26-.38.6-.38.95v1.29c-.34.005-.67-.11-.93-.33L3.02 5.05c-.26-.25-.6-.38-.95-.38H.79c-.005.34.11.67.33.93L2.95 7.08c.25.26.38.6.38.95v1.29c.005.34-.11.67-.33.93L.82 12.08c-.26.25-.38.6-.38.95v1.29c.34-.005.67.11.93.33l1.83 1.83c.26.25.6.38.95.38h1.29c.005-.34-.11-.67-.33-.93L3.02 15.08c-.26-.25-.38-.6-.38-.95v-1.29c-.005-.34.11-.67-.33-.93l1.83-1.83c.25-.26.38-.6.38-.95V8.92c.34-.005.67.11.93.33l1.83 1.83c.26.25.6.38.95.38h1.29c.005.34-.11-.67-.33-.93L10.9 13.08c-.26.25-.38.6-.38.95v1.29c.005.34.11.67.33.93l1.83 1.83c.25.26.38.6.38.95v1.29c-.34.005-.67-.11-.93-.33l-1.83-1.83c-.25-.26-.38-.6-.38-.95v-1.29c-.34-.005-.67.11-.93-.33l-1.83-1.83c-.26-.25-.6-.38-.95-.38H5.08c-.005.34.11.67.33.93l1.83 1.83c.26.25.38.6.38.95v1.29c.34.005.67-.11.93-.33l1.83-1.83c.25-.26.38-.6.38-.95v-1.29c-.005-.34-.11-.67-.33-.93l-1.83-1.83a1.32 1.32 0 00-.95-.38h-1.29c-.34.005-.67-.11-.93-.33L2.25 12c-.005-.34.11-.67.33-.93l1.83-1.83c.25-.26.38-.6.38-.95V6.92c.34.005.67.11.93.33l1.83 1.83c.26.25.6.38.95.38h1.29c-.34.005-.67-.11-.93-.33l-1.83-1.83a1.32 1.32 0 00-.95-.38H8.92c-.34.005-.67-.11-.93-.33L6.16 3.42c-.25-.26-.38-.6-.38-.95V1.29c.34-.005.67.11.93.33l1.83 1.83c.26.25.6.38.95.38h1.29c.005-.34-.11-.67-.33-.93L8.99.82a1.32 1.32 0 00-.95-.38H6.75c-.34.005-.67.11-.93.33l-1.83 1.83c-.25.26-.38-.6-.38.95v1.29c.34.005.67-.11.93-.33l1.83-1.83c.26-.25.6-.38.95-.38h1.29c-.005.34.11.67-.33-.93l-1.83 1.83c-.26-.25-.38-.6-.38-.95v1.29c-.005.34-.11-.67-.33-.93L1.5 8.92a1.32 1.32 0 00-.95-.38H.22c-.34.005-.67-.11-.93-.33L.82 6.16a1.32 1.32 0 00.38-.95V3.82c-.005-.34.11-.67.33-.93L3.36.82c.25-.26.6-.38.95-.38h1.29c.34-.005.67.11.93.33l1.83 1.83c.26.25.6.38.95.38h1.29c.005-.34-.11-.67-.33-.93l-1.83-1.83A1.32 1.32 0 0012 2.25z" />
  </svg>
);

const FilterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
