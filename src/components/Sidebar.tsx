
import { useState } from "react";
import { ChevronLeft, ChevronRight, X, FolderPlus, FolderMinus, Move } from "lucide-react";
import { Button } from "./ui/button";

interface Folder {
  id: string;
  name: string;
  chats: string[];
}

interface SidebarProps {
  recentSearches: string[];
  onRemoveSearch: (index: number) => void;
}

const Sidebar = ({ recentSearches, onRemoveSearch }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [folders, setFolders] = useState<Folder[]>([
    {
      id: "1",
      name: "Research",
      chats: ["Photosynthesis Discussion", "Plant Growth Analysis"],
    },
  ]);
  const [newFolderName, setNewFolderName] = useState("");
  const [expandedFolder, setExpandedFolder] = useState<string | null>(null);

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      setFolders((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          name: newFolderName.trim(),
          chats: [],
        },
      ]);
      setNewFolderName("");
    }
  };

  const handleRemoveFolder = (folderId: string) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== folderId));
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolder(expandedFolder === folderId ? null : folderId);
  };

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
        <div className="p-6 space-y-8">
          {/* Recent Searches Section */}
          <section>
            <h2 className="text-lg font-semibold mb-4">Recent Searches</h2>
            <ul className="space-y-2">
              {recentSearches.map((search, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    className="flex-1 justify-start text-sm truncate"
                  >
                    {search}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-destructive/10"
                    onClick={() => onRemoveSearch(index)}
                    aria-label="Remove search"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </section>

          {/* Folders Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Folders</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleAddFolder}
                disabled={!newFolderName.trim()}
                aria-label="Add folder"
              >
                <FolderPlus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="New folder name"
                  className="w-full px-3 py-1 text-sm rounded-md border border-input bg-background"
                />
              </div>

              <ul className="space-y-2">
                {folders.map((folder) => (
                  <li key={folder.id} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        className="flex-1 justify-start text-sm font-medium"
                        onClick={() => toggleFolder(folder.id)}
                      >
                        {folder.name}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleRemoveFolder(folder.id)}
                        aria-label="Remove folder"
                      >
                        <FolderMinus className="h-4 w-4" />
                      </Button>
                    </div>
                    {expandedFolder === folder.id && (
                      <ul className="pl-4 space-y-1">
                        {folder.chats.map((chat, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex-1 justify-start text-sm"
                            >
                              {chat}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              aria-label="Move chat"
                            >
                              <Move className="h-3 w-3" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
