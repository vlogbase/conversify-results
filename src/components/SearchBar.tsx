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
      ha
