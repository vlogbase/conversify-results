import { Mic, Image as ImageIcon, Search } from "lucide-react";
import { Button } from "./ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem("search") as HTMLInputElement;
    onSearch(input.value);
    input.value = "";
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="relative">
        {/* Increased right padding from pr-[132px] to pr-40 so icons won't overlap text */}
        <textarea
          name="search"
          className="search-bar pr-40 resize-none min-h-[60px] overflow-hidden"
          placeholder="Ask your question or enter search terms"
          aria-label="Search input"
          rows={1}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            // Reset height to auto to shrink if text is deleted
            target.style.height = "auto";
            // Then set it to match the new scroll height
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
