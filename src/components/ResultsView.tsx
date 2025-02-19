
import { ExternalLink } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  url: string;
  thumbnail?: string;
}

interface ResultsViewProps {
  results: SearchResult[];
}

const ResultsView = ({ results }: ResultsViewProps) => {
  return (
    <div className="grid gap-4 p-4 max-w-3xl mx-auto">
      {results.map((result) => (
        <div key={result.id} className="result-card">
          <div className="flex gap-4">
            {result.thumbnail && (
              <img
                src={result.thumbnail}
                alt=""
                className="w-24 h-24 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary flex items-center gap-2"
                >
                  {result.title}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </h3>
              <p className="text-sm text-muted-foreground">{result.snippet}</p>
              <p className="text-xs text-muted-foreground mt-2">{result.url}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultsView;
