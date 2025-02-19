
import { Info, Undo } from "lucide-react";
import { Button } from "./ui/button";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatViewProps {
  messages: Message[];
  onUndo?: (messageId: string) => void;
}

const ChatView = ({ messages, onUndo }: ChatViewProps) => {
  return (
    <div className="flex flex-col gap-4 p-4 max-w-3xl mx-auto h-[calc(100vh-240px)] overflow-y-auto">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`chat-message ${
            message.sender === "user" ? "user-message" : "ai-message"
          }`}
        >
          <div className="flex justify-between items-start gap-2">
            <p className="text-sm">{message.content}</p>
            {message.sender === "ai" && (
              <div className="flex items-center gap-2 mt-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  aria-label="More information"
                >
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          {message.sender === "user" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onUndo?.(message.id)}
              className="mt-2 text-xs"
            >
              <Undo className="h-3 w-3 mr-1" />
              Undo
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatView;
