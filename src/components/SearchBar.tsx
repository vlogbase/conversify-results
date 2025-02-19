import { useRef } from "react";
import { Mic, Image as ImageIcon, Search } from "lucide-react";
import { Button } from "./ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const query = textareaRef.current?.value.trim() || "";
    if (!query) return;
    onSearch(query);
    if (textareaRef.current) {
      textareaRef.current.value = "";
      // Reset the textarea height
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // If Enter is pressed without Shift, submit; if Shift+Enter, new line
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    // Auto-resize the textarea
    const target = e.target as HTMLTextAreaElement;
    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  };

  return (
    <div className="search-bar-container">
      {/* We don’t rely on onSubmit; we manually handle Enter */}
      <form
        className="relative"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <textarea
          ref={textareaRef}
          name="search"
          className="search-bar pr-16 pb-12 resize-none min-h-[60px] overflow-hidden"
          placeholder="Ask your question or enter search terms (Enter = submit, Shift+Enter = newline)"
          aria-label="Search input"
          rows={1}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
        />

        {/* Icons pinned to bottom-right, outside the text area content */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-background">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-secondary"
            aria-label="Voice search"
            onClick={(e) => {
              e.preventDefault();
              // e.g. handle voice search here
              console.log("Voice search clicked");
            }}
          >
            <Mic className="w-5 h-5 text-primary" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-secondary"
            aria-label="Image search"
            onClick={(e) => {
              e.preventDefault();
              // e.g. handle image search here
              console.log("Image search clicked");
            }}
          >
            <ImageIcon className="w-5 h-5 text-primary" />
          </Button>
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="hover:bg-secondary"
            aria-label="Submit search"
          >
            <Search className="w-5 h-5 text-primary" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
