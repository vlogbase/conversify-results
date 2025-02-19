import { Sun, Moon } from "lucide-react";

interface DarkModeToggleProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  isDarkMode,
  setIsDarkMode,
}) => {
  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="fixed top-4 right-4 z-50 p-2 rounded-md 
                 text-foreground hover:bg-secondary hover:text-secondary-foreground
                 transition-colors"
      aria-label="Toggle Dark Mode"
    >
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">Toggle Dark Mode</span>
    </button>
  );
};

export default DarkModeToggle;
