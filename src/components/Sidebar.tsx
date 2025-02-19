
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps {
  recentSearches: string[];
}

const Sidebar = ({ recentSearches }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
      <div
        className={`sidebar ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Searches</h2>
          <ul className="space-y-2">
            {recentSearches.map((search, index) => (
              <li key={index}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm"
                >
                  {search}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
