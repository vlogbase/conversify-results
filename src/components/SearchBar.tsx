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
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // If Enter is pressed without Shift, submit
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
      <form
        className="flex flex-col items-stretch"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <textarea
          ref={textareaRef}
          name="search"
          className="search-bar resize-none min-h-[60px] overflow-hidden"
          placeholder="Ask your question or enter search terms (Enter = submit, Shift+Enter = newline)"
          aria-label="Search input"
          rows={1}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
        />

        {/* Icons are in their own row below the text */}
        <div className="flex justify-end items-center gap-2 mt-3">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Voice search"
            onClick={(e) => {
              e.preventDefault();
              console.log("Voice search clicked");
            }}
          >
            <Mic className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Image search"
            onClick={(e) => {
              e.preventDefault();
              console.log("Image search clicked");
            }}
          >
            <ImageIcon className="w-5 h-5" />
          </Button>

          <Button
            type="submit"
            variant="ghost"
            size="icon"
            aria-label="Submit search"
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
