import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DarkModeToggle from "@/components/DarkModeToggle";

const queryClient = new QueryClient();

const App = () => {
  // Default to dark
  const [isDarkMode, setIsDarkMode] = useState(true);

  // On mount or whenever `isDarkMode` changes, toggle the 'dark' class on <html>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* This wrapper will change colors automatically based on light/dark */}
        <div className="min-h-screen bg-background text-foreground transition-colors">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* The toggle button for switching dark/light */}
            <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
