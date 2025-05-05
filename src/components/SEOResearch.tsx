"use client";

import { useState } from "react";

interface SEOResearchProps {
  title: string;
  content: any[];
  currentKeywords: {
    primaryKeyword?: string;
    secondaryKeyword?: string;
  };
  onUpdateKeywords: (keywords: {
    primaryKeyword: string;
    secondaryKeyword: string;
  }) => void;
}

export default function SEOResearch({
  title,
  content,
  currentKeywords,
  onUpdateKeywords,
}: SEOResearchProps) {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<{
    primarySuggestions: string[];
    secondarySuggestions: string[];
    keywordDensity: { [key: string]: number };
    readabilityScore: number;
    suggestions: string[];
  } | null>(null);

  const analyzeContent = async () => {
    setLoading(true);
    try {
      // Extract text content from the blog
      const textContent = content
        .map((section: any) => section.text || "")
        .join(" ")
        .toLowerCase();

      // Calculate keyword density
      const words = textContent.split(/\s+/);
      const wordCount = words.length;
      const keywordDensity: { [key: string]: number } = {};

      words.forEach((word) => {
        if (word.length > 3) {
          // Ignore short words
          keywordDensity[word] = (keywordDensity[word] || 0) + 1;
        }
      });

      // Calculate readability score (simple version)
      const sentences = textContent.split(/[.!?]+/).length;
      const readabilityScore = Math.min(
        100,
        Math.max(0, (wordCount / sentences) * 10)
      );

      // Generate keyword suggestions based on content analysis
      const sortedKeywords = Object.entries(keywordDensity)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([word]) => word);

      // Generate suggestions
      const suggestions = [
        readabilityScore < 60
          ? "Consider simplifying your content for better readability"
          : "",
        Object.keys(keywordDensity).length < 5
          ? "Add more relevant keywords to your content"
          : "",
        title.length < 30 ? "Consider making your title more descriptive" : "",
        title.length > 60 ? "Your title might be too long for optimal SEO" : "",
      ].filter(Boolean);

      setSuggestions({
        primarySuggestions: sortedKeywords.slice(0, 3),
        secondarySuggestions: sortedKeywords.slice(3, 6),
        keywordDensity,
        readabilityScore,
        suggestions,
      });
    } catch (error) {
      console.error("Error analyzing content:", error);
    }
    setLoading(false);
  };

  return (
    <div className="mt-6 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">SEO Analysis</h3>

      <button
        onClick={analyzeContent}
        disabled={loading}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
      >
        {loading ? "Analyzing..." : "Analyze SEO"}
      </button>

      {suggestions && (
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Suggested Primary Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {suggestions.primarySuggestions.map((keyword) => (
                <button
                  key={keyword}
                  onClick={() =>
                    onUpdateKeywords({
                      primaryKeyword: keyword,
                      secondaryKeyword: currentKeywords.secondaryKeyword || "",
                    })
                  }
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Suggested Secondary Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {suggestions.secondarySuggestions.map((keyword) => (
                <button
                  key={keyword}
                  onClick={() =>
                    onUpdateKeywords({
                      primaryKeyword: currentKeywords.primaryKeyword || "",
                      secondaryKeyword: keyword,
                    })
                  }
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full hover:bg-green-200"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">
              SEO Score: {suggestions.readabilityScore}/100
            </h4>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${suggestions.readabilityScore}%` }}
              ></div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Suggestions</h4>
            <ul className="list-disc list-inside space-y-1">
              {suggestions.suggestions.map((suggestion, index) => (
                <li key={index} className="text-gray-700">
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
