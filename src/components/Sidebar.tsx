import { useState } from "react";
import { ChevronLeft, ChevronRight, X, FolderPlus, FolderMinus, Move } from "lucide-react";
import { Button } from "./ui/button";

interface Project {
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
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Research",
      chats: ["Photosynthesis Discussion", "Plant Growth Analysis"],
    },
  ]);
  const [newProjectName, setNewProjectName] = useState("");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const handleAddProject = () => {
    if (newProjectName.trim()) {
      setProjects((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          name: newProjectName.trim(),
          chats: [],
        },
      ]);
      setNewProjectName("");
    }
  };

  const handleRemoveProject = (projectId: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== projectId));
  };

  const toggleProject = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const handleDragStart = (e: React.DragEvent, search: string) => {
    e.dataTransfer.setData("text/plain", search);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, projectId: string) => {
    e.preventDefault();
    const search = e.dataTransfer.getData("text/plain");

    setProjects((prev) =>
      prev.map((project) => {
        if (project.id === projectId && !project.chats.includes(search)) {
          return {
            ...project,
            chats: [...project.chats, search],
          };
        }
        return project;
      })
    );
  };

  return (
    <>
      {/* <-- Revised toggle button with data-sidebar="trigger" --> */}
      <Button
        data-sidebar="trigger"
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
                <li
                  key={index}
                  className="flex items-center gap-2"
                  draggable
                  onDragStart={(e) => handleDragStart(e, search)}
                >
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

          {/* Projects Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Projects</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleAddProject}
                disabled={!newProjectName.trim()}
                aria-label="Add project"
              >
                <FolderPlus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="New project name"
                  className="w-full px-3 py-1 text-sm rounded-md border border-input bg-background"
                />
              </div>

              <ul className="space-y-2">
                {projects.map((project) => (
                  <li
                    key={project.id}
                    className="space-y-1"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, project.id)}
                  >
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        className="flex-1 justify-start text-sm font-medium"
                        onClick={() => toggleProject(project.id)}
                      >
                        {project.name}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleRemoveProject(project.id)}
                        aria-label="Remove project"
                      >
                        <FolderMinus className="h-4 w-4" />
                      </Button>
                    </div>
                    {expandedProject === project.id && (
                      <ul className="pl-4 space-y-1">
                        {project.chats.map((chat, index) => (
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
