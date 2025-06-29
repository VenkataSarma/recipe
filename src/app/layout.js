"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
require("./globals.css");
const theme_provider_1 = require("@/components/theme-provider");
const toaster_1 = require("@/components/ui/toaster");
exports.metadata = {
    title: 'Culinary Canvas',
    description: 'A visually stunning and highly interactive single-page recipe website.',
    keywords: ['recipe', 'food', 'cooking', 'culinary', 'canvas'],
};
function RootLayout({ children, }) {
    return (<html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet"/>
      </head>
      <body className="font-body antialiased">
        <theme_provider_1.ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <toaster_1.Toaster />
        </theme_provider_1.ThemeProvider>
      </body>
    </html>);
}
