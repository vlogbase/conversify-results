
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
        <textarea
          name="search"
          className="search-bar pr-[132px] resize-none min-h-[60px] max-h-[200px]"
          placeholder="Ask your question or enter search terms"
          aria-label="Search input"
          rows={1}
          // Enable auto-height adjustment
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = `${target.scrollHeight}px`;
          }}
        />
        <div className="absolute right-4 top-4 flex items-center gap-2 bg-background">
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
