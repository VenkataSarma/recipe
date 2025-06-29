"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CulinaryCanvasPage;
const React = __importStar(require("react"));
const data_1 = require("@/lib/data");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const select_1 = require("@/components/ui/select");
const slider_1 = require("@/components/ui/slider");
const card_1 = require("@/components/ui/card");
const badge_1 = require("@/components/ui/badge");
const avatar_1 = require("@/components/ui/avatar");
const separator_1 = require("@/components/ui/separator");
const dialog_1 = require("@/components/ui/dialog");
const carousel_1 = require("@/components/ui/carousel");
const tooltip_1 = require("@/components/ui/tooltip");
const skeleton_1 = require("@/components/ui/skeleton");
const lucide_react_1 = require("lucide-react");
const theme_toggle_1 = require("@/components/theme-toggle");
const actions_1 = require("./actions");
const image_1 = __importDefault(require("next/image"));
const use_toast_1 = require("@/hooks/use-toast");
const cuisineTypes = ["All", "Italian", "Indian", "Chinese", "Mexican"];
const dietTypes = ["All", "Vegan", "Gluten-Free", "Keto", "Vegetarian"];
const difficultyLevels = ["All", "Easy", "Medium", "Hard"];
const categories = [
    { name: 'Breakfast', icon: lucide_react_1.Soup },
    { name: 'Lunch', icon: lucide_react_1.Sandwich },
    { name: 'Snacks', icon: lucide_react_1.Grape },
    { name: 'Dinner', icon: lucide_react_1.Soup },
    { name: 'Desserts', icon: lucide_react_1.Dessert },
    { name: 'Drinks', icon: lucide_react_1.Martini },
];
const navLinks = [
    { name: 'Categories', id: 'categories' },
    { name: 'Featured', id: 'featured' },
    { name: 'Reviews', id: 'reviews' },
    { name: 'Contact', id: 'footer' },
];
const StarRating = ({ rating }) => (<div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (<lucide_react_1.Star key={i} className={`w-4 h-4 ${rating > i ? 'text-primary fill-current' : 'text-muted-foreground'}`}/>))}
  </div>);
function CulinaryCanvasPage() {
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
    const [selectedRecipe, setSelectedRecipe] = React.useState(null);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const { toast } = (0, use_toast_1.useToast)();
    const refs = {
        categories: React.useRef(null),
        featured: React.useRef(null),
        reviews: React.useRef(null),
        footer: React.useRef(null),
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
    const handleFilterChange = (key, value) => {
        setFilters(prev => (Object.assign(Object.assign({}, prev), { [key]: value })));
    };
    const resetFilters = () => {
        setFilters({ cuisine: 'All', diet: 'All', cookingTime: [120], difficulty: 'All', rating: 0 });
        setSearchQuery('');
    };
    const filteredRecipes = React.useMemo(() => {
        return data_1.recipes.filter(recipe => {
            return ((recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                recipe.ingredients.some(i => i.item.toLowerCase().includes(searchQuery.toLowerCase()))) &&
                (filters.cuisine === 'All' || recipe.cuisine === filters.cuisine) &&
                (filters.diet === 'All' || recipe.diet === filters.diet) &&
                recipe.cookingTime <= filters.cookingTime[0] &&
                (filters.difficulty === 'All' || recipe.difficulty === filters.difficulty) &&
                recipe.rating >= filters.rating);
        });
    }, [searchQuery, filters]);
    const handleSurpriseMe = () => __awaiter(this, void 0, void 0, function* () {
        toast({ title: "Finding a surprise recipe for you...", description: "Our AI is picking something delicious!" });
        const recipe = yield (0, actions_1.getSurpriseRecipe)();
        if (recipe) {
            setSelectedRecipe(recipe);
        }
        else {
            toast({ variant: 'destructive', title: "Uh oh!", description: "Couldn't find a surprise recipe. Please try again." });
        }
    });
    const scrollTo = (id) => {
        var _a;
        (_a = refs[id].current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
    };
    if (isLoading) {
        return <LoadingSkeleton />;
    }
    return (<tooltip_1.TooltipProvider>
      <div className="flex flex-col min-h-screen bg-background font-body">
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-2 font-headline text-2xl font-bold text-foreground">
                <lucide_react_1.ChefHat className="text-primary h-8 w-8"/>
                Culinary Canvas
              </div>
              <nav className="hidden md:flex items-center gap-6">
                {navLinks.map(link => (<button_1.Button key={link.id} variant="ghost" onClick={() => scrollTo(link.id)}>{link.name}</button_1.Button>))}
              </nav>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input_1.Input type="search" placeholder="Search recipes..." className={`transition-all duration-300 ease-in-out h-10 ${isSearchFocused ? 'w-48 pr-10' : 'w-10 sm:w-48 sm:pr-10'}`} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onFocus={() => setIsSearchFocused(true)} onBlur={() => setIsSearchFocused(false)}/>
                  <lucide_react_1.Search className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-all duration-300 ${isSearchFocused ? 'right-3' : 'right-2.5 sm:right-3'}`}/>
                </div>
                <theme_toggle_1.ThemeToggle />
                <button_1.Button variant="ghost" className="md:hidden">Menu</button_1.Button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white">
            <image_1.default src="https://source.unsplash.com/1920x1080/?delicious,food" alt="Delicious food spread" layout="fill" objectFit="cover" className="brightness-50" data-ai-hint="delicious food"/>
            <div className="relative z-10 p-4">
              <h1 className="text-5xl md:text-7xl font-headline font-extrabold mb-4 drop-shadow-lg">Discover Delicious Recipes!</h1>
              <p className="max-w-2xl mx-auto mb-8 text-lg md:text-xl drop-shadow">From quick bites to gourmet meals, find your next favorite dish right here.</p>
              <div className="flex gap-4 justify-center">
                <button_1.Button size="lg" onClick={() => scrollTo('categories')}>Explore Recipes</button_1.Button>
                <button_1.Button size="lg" variant="secondary" onClick={handleSurpriseMe}>
                  <SparklesIcon className="mr-2 h-5 w-5"/> Surprise Me
                </button_1.Button>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filter Panel */}
              <aside className="lg:col-span-1 lg:sticky lg:top-24 h-fit">
                <card_1.Card className="shadow-lg">
                  <card_1.CardHeader>
                    <card_1.CardTitle className="flex items-center gap-2"><FilterIcon className="h-5 w-5"/> Filters</card_1.CardTitle>
                  </card_1.CardHeader>
                  <card_1.CardContent className="space-y-6">
                    <div>
                      <label className="text-sm font-medium">Cuisine</label>
                      <select_1.Select value={filters.cuisine} onValueChange={value => handleFilterChange('cuisine', value)}>
                        <select_1.SelectTrigger><select_1.SelectValue /></select_1.SelectTrigger>
                        <select_1.SelectContent>{cuisineTypes.map(c => <select_1.SelectItem key={c} value={c}>{c}</select_1.SelectItem>)}</select_1.SelectContent>
                      </select_1.Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Dietary</label>
                      <select_1.Select value={filters.diet} onValueChange={value => handleFilterChange('diet', value)}>
                        <select_1.SelectTrigger><select_1.SelectValue /></select_1.SelectTrigger>
                        <select_1.SelectContent>{dietTypes.map(d => <select_1.SelectItem key={d} value={d}>{d}</select_1.SelectItem>)}</select_1.SelectContent>
                      </select_1.Select>
                    </div>
                     <div>
                      <label className="text-sm font-medium">Max Cooking Time: {filters.cookingTime[0]} min</label>
                      <slider_1.Slider value={filters.cookingTime} onValueChange={value => handleFilterChange('cookingTime', value)} max={120} step={5}/>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Difficulty</label>
                      <select_1.Select value={filters.difficulty} onValueChange={value => handleFilterChange('difficulty', value)}>
                        <select_1.SelectTrigger><select_1.SelectValue /></select_1.SelectTrigger>
                        <select_1.SelectContent>{difficultyLevels.map(d => <select_1.SelectItem key={d} value={d}>{d}</select_1.SelectItem>)}</select_1.SelectContent>
                      </select_1.Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Minimum Rating</label>
                      <div className="flex justify-center"><StarRating rating={filters.rating}/></div>
                       <slider_1.Slider value={[filters.rating]} onValueChange={value => handleFilterChange('rating', value[0])} max={5} step={1}/>
                    </div>
                  </card_1.CardContent>
                  <card_1.CardFooter>
                     <button_1.Button variant="outline" className="w-full" onClick={resetFilters}>Reset Filters</button_1.Button>
                  </card_1.CardFooter>
                </card_1.Card>
              </aside>
              
              {/* Recipes Grid */}
              <div className="lg:col-span-3">
                <section ref={refs.categories} id="categories" className="mb-16">
                  <h2 className="text-4xl font-headline text-center mb-12">Browse by Category</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
                    {categories.map(category => (<card_1.Card key={category.name} className="overflow-hidden group cursor-pointer text-center relative flex items-center justify-center h-40 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                          <image_1.default src={`https://source.unsplash.com/400x300/?${category.name.toLowerCase()}-food`} alt={category.name} layout="fill" objectFit="cover" className="group-hover:scale-110 transition-transform duration-500 brightness-50" data-ai-hint={`${category.name.toLowerCase()} food`}/>
                          <div className="relative z-10 text-white">
                              <category.icon className="h-10 w-10 mx-auto mb-2"/>
                              <h3 className="text-xl font-bold font-headline">{category.name}</h3>
                          </div>
                      </card_1.Card>))}
                  </div>
                </section>
                
                <separator_1.Separator className="my-16"/>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredRecipes.length > 0 ? (filteredRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} onSelectRecipe={setSelectedRecipe}/>)) : (<div className="md:col-span-2 xl:col-span-3 text-center py-16">
                      <p className="text-2xl font-semibold text-muted-foreground">No recipes found!</p>
                      <p className="mt-2 text-muted-foreground">Try adjusting your filters or search terms.</p>
                    </div>)}
                </div>
              </div>
            </div>
          </div>

          {/* Featured Recipes Section */}
          <section ref={refs.featured} id="featured" className="py-20 bg-secondary/30">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-headline text-center mb-12">Featured This Week</h2>
              <carousel_1.Carousel opts={{ loop: true }} className="w-full">
                <carousel_1.CarouselContent>
                  {data_1.recipes.filter(r => r.featured).map(recipe => (<carousel_1.CarouselItem key={recipe.id} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <RecipeCard recipe={recipe} onSelectRecipe={setSelectedRecipe}/>
                      </div>
                    </carousel_1.CarouselItem>))}
                </carousel_1.CarouselContent>
                <carousel_1.CarouselPrevious className="ml-12"/>
                <carousel_1.CarouselNext className="mr-12"/>
              </carousel_1.Carousel>
            </div>
          </section>

          {/* Testimonials Section */}
          <section ref={refs.reviews} id="reviews" className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-headline text-center mb-12">What Our Foodies Say</h2>
               <carousel_1.Carousel className="w-full max-w-4xl mx-auto" opts={{ loop: true }}>
                  <carousel_1.CarouselContent>
                    {data_1.testimonials.map((testimonial, index) => (<carousel_1.CarouselItem key={index}>
                        <card_1.Card className="border-0 shadow-none">
                          <card_1.CardContent className="flex flex-col items-center text-center p-6">
                            <avatar_1.Avatar className="w-24 h-24 mb-4 border-4 border-primary/20">
                              <avatar_1.AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.avatarHint}/>
                              <avatar_1.AvatarFallback>{testimonial.name.charAt(0)}</avatar_1.AvatarFallback>
                            </avatar_1.Avatar>
                            <p className="text-lg italic text-muted-foreground mb-4">"{testimonial.quote}"</p>
                            <h3 className="font-bold text-lg">{testimonial.name}</h3>
                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                          </card_1.CardContent>
                        </card_1.Card>
                      </carousel_1.CarouselItem>))}
                  </carousel_1.CarouselContent>
                  <carousel_1.CarouselPrevious />
                  <carousel_1.CarouselNext />
                </carousel_1.Carousel>
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
                  <input_1.Input type="email" placeholder="Email address" className="rounded-r-none focus:z-10"/>
                  <button_1.Button type="submit" className="rounded-l-none">
                    <lucide_react_1.Send className="h-4 w-4"/>
                  </button_1.Button>
                </div>
              </div>
              <div>
                <h3 className="font-headline text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex justify-center md:justify-start gap-4">
                  <button_1.Button variant="ghost" size="icon"><lucide_react_1.Twitter /></button_1.Button>
                  <button_1.Button variant="ghost" size="icon"><lucide_react_1.Facebook /></button_1.Button>
                  <button_1.Button variant="ghost" size="icon"><lucide_react_1.Instagram /></button_1.Button>
                </div>
              </div>
            </div>
            <separator_1.Separator className="my-8"/>
            <div className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Culinary Canvas. All Rights Reserved.
            </div>
          </div>
        </footer>

        <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)}/>
      </div>
    </tooltip_1.TooltipProvider>);
}
const RecipeCard = ({ recipe, onSelectRecipe }) => (<card_1.Card className="overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1" onClick={() => onSelectRecipe(recipe)}>
    <card_1.CardHeader className="p-0 relative">
      <image_1.default src={recipe.image} alt={recipe.name} width={400} height={300} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" data-ai-hint={recipe.imageHint}/>
      {recipe.featured && <badge_1.Badge className="absolute top-2 right-2">{recipe.featured}</badge_1.Badge>}
    </card_1.CardHeader>
    <card_1.CardContent className="p-4">
      <p className="text-sm text-muted-foreground">{recipe.cuisine} • {recipe.category}</p>
      <h3 className="text-lg font-bold font-headline truncate" title={recipe.name}>{recipe.name}</h3>
      <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
        <div className="flex items-center gap-1"><lucide_react_1.Clock className="h-4 w-4"/>{recipe.cookingTime} min</div>
        <div className="flex items-center gap-1"><lucide_react_1.BarChart className="h-4 w-4"/>{recipe.difficulty}</div>
        <StarRating rating={recipe.rating}/>
      </div>
    </card_1.CardContent>
  </card_1.Card>);
const RecipeModal = ({ recipe, onClose }) => (<dialog_1.Dialog open={!!recipe} onOpenChange={(open) => !open && onClose()}>
    <dialog_1.DialogContent className="max-w-4xl max-h-[90vh] grid-rows-[auto,1fr,auto] p-0">
      {recipe && (<>
        <dialog_1.DialogHeader className="p-6 pb-0">
          <div className="flex justify-between items-start">
            <div>
              <dialog_1.DialogTitle className="text-3xl font-headline mb-2">{recipe.name}</dialog_1.DialogTitle>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><lucide_react_1.Soup className="h-4 w-4"/> {recipe.cuisine}</span>
                <span className="flex items-center gap-1"><lucide_react_1.Clock className="h-4 w-4"/> {recipe.cookingTime} min</span>
                <span className="flex items-center gap-1"><lucide_react_1.BarChart className="h-4 w-4"/> {recipe.difficulty}</span>
                <StarRating rating={recipe.rating}/>
              </div>
            </div>
            <div className="flex gap-2">
              <tooltip_1.Tooltip><tooltip_1.TooltipTrigger asChild><button_1.Button variant="outline" size="icon"><lucide_react_1.Heart className="h-4 w-4"/></button_1.Button></tooltip_1.TooltipTrigger><tooltip_1.TooltipContent><p>Save to favorites</p></tooltip_1.TooltipContent></tooltip_1.Tooltip>
              <tooltip_1.Tooltip><tooltip_1.TooltipTrigger asChild><button_1.Button variant="outline" size="icon"><lucide_react_1.Share2 className="h-4 w-4"/></button_1.Button></tooltip_1.TooltipTrigger><tooltip_1.TooltipContent><p>Share recipe</p></tooltip_1.TooltipContent></tooltip_1.Tooltip>
            </div>
          </div>
        </dialog_1.DialogHeader>
        <div className="grid md:grid-cols-2 gap-6 overflow-y-auto p-6">
          <div className="space-y-4">
            <image_1.default src={recipe.image} alt={recipe.name} width={600} height={400} className="rounded-lg object-cover w-full" data-ai-hint={recipe.imageHint}/>
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
            <button_1.Button variant="secondary" className="w-full"><lucide_react_1.Youtube className="mr-2 h-5 w-5"/> Watch Video Tutorial</button_1.Button>
          </div>
        </div>
        </>)}
    </dialog_1.DialogContent>
  </dialog_1.Dialog>);
const LoadingSkeleton = () => (<div className="container mx-auto px-4 py-16 animate-pulse">
    <header className="flex items-center justify-between h-20 mb-16">
      <skeleton_1.Skeleton className="h-8 w-48"/>
      <div className="flex gap-6"><skeleton_1.Skeleton className="h-8 w-20"/><skeleton_1.Skeleton className="h-8 w-20"/><skeleton_1.Skeleton className="h-8 w-20"/></div>
      <div className="flex gap-2"><skeleton_1.Skeleton className="h-10 w-48"/><skeleton_1.Skeleton className="h-10 w-10 rounded-full"/></div>
    </header>
    <skeleton_1.Skeleton className="h-[50vh] w-full rounded-lg mb-16"/>
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <skeleton_1.Skeleton className="h-96 w-full lg:col-span-1 rounded-lg"/>
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => <skeleton_1.Skeleton key={i} className="h-72 w-full rounded-lg"/>)}
      </div>
    </div>
  </div>);
// Custom icons to avoid adding another library for them
const SparklesIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.25c.34-.005.67.11.93.33l1.83 1.83c.25.26.38.6.38.95v1.29c.34.005.67-.11.93-.33l1.83-1.83c.26-.25.6-.38.95-.38h1.29c.005.34-.11.67-.33.93L18.4 7.08c-.26.25-.38.6-.38.95v1.29c-.005.34.11.67.33.93l1.83 1.83c.25.26.38.6.38.95v1.29c-.34-.005-.67.11-.93.33l-1.83 1.83c-.26.25-.6.38-.95.38h-1.29c-.005-.34.11-.67.33-.93l1.83-1.83c.26-.25.38-.6.38-.95v-1.29c.005-.34-.11-.67-.33-.93l-1.83-1.83a1.32 1.32 0 00-.95-.38h-1.29c-.34.005-.67-.11-.93-.33l-1.83-1.83a1.32 1.32 0 00-.95-.38H8.92c-.34-.005-.67.11-.93.33l-1.83 1.83c-.25.26-.38.6-.38.95v1.29c-.34.005-.67-.11-.93-.33L3.02 5.05c-.26-.25-.6-.38-.95-.38H.79c-.005.34.11.67.33.93L2.95 7.08c.25.26.38.6.38.95v1.29c.005.34-.11.67-.33.93L.82 12.08c-.26.25-.38.6-.38.95v1.29c.34-.005.67.11.93.33l1.83 1.83c.26.25.6.38.95.38h1.29c.005-.34-.11-.67-.33-.93L3.02 15.08c-.26-.25-.38-.6-.38-.95v-1.29c-.005-.34.11-.67-.33-.93l1.83-1.83c.25-.26.38-.6.38-.95V8.92c.34-.005.67.11.93.33l1.83 1.83c.26.25.6.38.95.38h1.29c.005.34-.11-.67-.33-.93L10.9 13.08c-.26.25-.38.6-.38.95v1.29c.005.34.11.67.33.93l1.83 1.83c.25.26.38.6.38.95v1.29c-.34.005-.67-.11-.93-.33l-1.83-1.83c-.25-.26-.38-.6-.38-.95v-1.29c-.34-.005-.67.11-.93-.33l-1.83-1.83c-.26-.25-.6-.38-.95-.38H5.08c-.005.34.11.67.33.93l1.83 1.83c.26.25.38.6.38.95v1.29c.34.005.67-.11.93-.33l1.83-1.83c.25-.26.38-.6.38-.95v-1.29c-.005-.34-.11-.67-.33-.93l-1.83-1.83a1.32 1.32 0 00-.95-.38h-1.29c-.34.005-.67-.11-.93-.33L2.25 12c-.005-.34.11-.67.33-.93l1.83-1.83c.25-.26.38-.6.38-.95V6.92c.34.005.67.11.93.33l1.83 1.83c.26.25.6.38.95.38h1.29c-.34.005-.67-.11-.93-.33l-1.83-1.83a1.32 1.32 0 00-.95-.38H8.92c-.34.005-.67-.11-.93-.33L6.16 3.42c-.25-.26-.38-.6-.38-.95V1.29c.34-.005.67.11.93.33l1.83 1.83c.26.25.6.38.95.38h1.29c.005-.34-.11-.67-.33-.93L8.99.82a1.32 1.32 0 00-.95-.38H6.75c-.34.005-.67.11-.93.33l-1.83 1.83c-.25.26-.38-.6-.38.95v1.29c.34.005.67-.11.93-.33l1.83-1.83c.26-.25.6-.38.95-.38h1.29c-.005.34.11.67-.33-.93l-1.83 1.83c-.26-.25-.38-.6-.38-.95v1.29c-.005.34-.11-.67-.33-.93L1.5 8.92a1.32 1.32 0 00-.95-.38H.22c-.34.005-.67-.11-.93-.33L.82 6.16a1.32 1.32 0 00.38-.95V3.82c-.005-.34.11-.67.33-.93L3.36.82c.25-.26.6-.38.95-.38h1.29c.34-.005.67.11.93.33l1.83 1.83c.26.25.6.38.95.38h1.29c.005-.34-.11-.67-.33-.93l-1.83-1.83A1.32 1.32 0 0012 2.25z"/>
  </svg>);
const FilterIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>);
