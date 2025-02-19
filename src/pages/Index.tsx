
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import ModeToggle from "@/components/ModeToggle";
import ChatView from "@/components/ChatView";
import ResultsView from "@/components/ResultsView";
import Sidebar from "@/components/Sidebar";
import { useToast } from "@/hooks/use-toast";

const mockedMessages = [
  {
    id: "1",
    content: "How does photosynthesis work?",
    sender: "user" as const,
    timestamp: new Date(),
  },
  {
    id: "2",
    content:
      "Photosynthesis is the process by which plants convert light energy into chemical energy. It involves capturing sunlight using chlorophyll and using that energy to convert water and carbon dioxide into glucose and oxygen.",
    sender: "ai" as const,
    timestamp: new Date(),
  },
];

const mockedResults = [
  {
    id: "1",
    title: "Photosynthesis - Wikipedia",
    snippet:
      "Photosynthesis is a process used by plants and other organisms to convert light energy into chemical energy that can later be released to fuel the organisms' activities.",
    url: "https://en.wikipedia.org/wiki/Photosynthesis",
    thumbnail: "https://picsum.photos/200",
  },
  {
    id: "2",
    title: "Understanding Photosynthesis",
    snippet:
      "Learn about the fundamental process that powers life on Earth. Discover how plants transform sunlight into energy through photosynthesis.",
    url: "https://example.com/photosynthesis",
  },
];

const Index = () => {
  const [mode, setMode] = useState<"chat" | "results">("chat");
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "What is photosynthesis?",
    "How do plants grow?",
    "What is cellular respiration?",
  ]);
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    setRecentSearches((prev) => [query, ...prev].slice(0, 10));
    toast({
      title: "Search submitted",
      description: `Searching for: ${query}`,
    });
  };

  const handleUndo = (messageId: string) => {
    toast({
      title: "Message undone",
      description: "Your message has been removed.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar recentSearches={recentSearches} />
      <main className="pt-16 px-4">
        <SearchBar onSearch={handleSearch} />
        <ModeToggle mode={mode} onModeChange={setMode} />
        <div className="mt-8">
          {mode === "chat" ? (
            <ChatView messages={mockedMessages} onUndo={handleUndo} />
          ) : (
            <ResultsView results={mockedResults} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
