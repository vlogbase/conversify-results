
import { Button } from "./ui/button";

interface ModeToggleProps {
  mode: "chat" | "results";
  onModeChange: (mode: "chat" | "results") => void;
}

const ModeToggle = ({ mode, onModeChange }: ModeToggleProps) => {
  return (
    <div className="mode-toggle">
      <button
        className="mode-button"
        data-active={mode === "chat"}
        onClick={() => onModeChange("chat")}
      >
        Chat
      </button>
      <button
        className="mode-button"
        data-active={mode === "results"}
        onClick={() => onModeChange("results")}
      >
        Results
      </button>
    </div>
  );
};

export default ModeToggle;
