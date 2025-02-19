
import { Mic, Image as ImageIcon, Search } from "lucide-react";
import { Button } from "./ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('search') as HTMLInputElement;
    onSearch(input.value);
    input.value = '';
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="relative">
        <input
          name="search"
          type="text"
          // Updated padding to accommodate the icons space
          className="search-bar pr-[132px]"
          placeholder="Ask your question or enter search terms"
          aria-label="Search input"
        />
        {/* Updated icon container positioning and spacing */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-background">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-secondary"
            aria-label="Voice search"
          >
            <Mic className="w-5 h-5 text-primary" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-secondary"
            aria-label="Image search"
          >
            <ImageIcon className="w-5 h-5 text-primary" />
          </Button>
          <Button 
            type="submit" 
            variant="ghost" 
            size="icon" 
            className="hover:bg-secondary"
          >
            <Search className="w-5 h-5 text-primary" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
