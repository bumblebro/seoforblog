"use client";

import { useState } from "react";

interface SEOResearchProps {
  content: string;
  onKeywordsSelected: (primary: string[], secondary: string[]) => void;
}

interface KeywordAnalysis {
  keyword: string;
  density: number;
  occurrences: number;
  relevance: number;
}

export default function SEOResearch({
  content,
  onKeywordsSelected,
}: SEOResearchProps) {
  const [analysis, setAnalysis] = useState<{
    keywords: KeywordAnalysis[];
    readability: number;
    suggestions: {
      primary: string[];
      secondary: string[];
    };
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeContent = () => {
    try {
      setError(null);

      if (!content || typeof content !== "string") {
        throw new Error("Invalid content format");
      }

      // Clean and prepare the content
      const cleanContent = content
        .toLowerCase()
        .replace(/[^\w\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      if (cleanContent.length === 0) {
        throw new Error("No content to analyze");
      }

      // Split into words and phrases
      const words = cleanContent.split(" ");
      const phrases = extractPhrases(cleanContent);

      // Calculate word frequency
      const wordFrequency = calculateWordFrequency(words);

      // Calculate phrase frequency
      const phraseFrequency = calculatePhraseFrequency(phrases);

      // Combine and analyze keywords
      const keywordAnalysis = analyzeKeywords(
        wordFrequency,
        phraseFrequency,
        cleanContent
      );

      // Calculate readability score
      const readabilityScore = calculateReadability(cleanContent);

      // Generate suggestions
      const suggestions = generateSuggestions(keywordAnalysis);

      setAnalysis({
        keywords: keywordAnalysis,
        readability: readabilityScore,
        suggestions,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during analysis"
      );
      setAnalysis(null);
    }
  };

  const extractPhrases = (text: string): string[] => {
    const words = text.split(" ");
    const phrases: string[] = [];

    // Extract 2-3 word phrases
    for (let i = 0; i < words.length - 1; i++) {
      phrases.push(`${words[i]} ${words[i + 1]}`);
      if (i < words.length - 2) {
        phrases.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
      }
    }

    return phrases;
  };

  const calculateWordFrequency = (words: string[]): Map<string, number> => {
    const frequency = new Map<string, number>();
    words.forEach((word) => {
      if (word.length > 3) {
        // Ignore short words
        frequency.set(word, (frequency.get(word) || 0) + 1);
      }
    });
    return frequency;
  };

  const calculatePhraseFrequency = (phrases: string[]): Map<string, number> => {
    const frequency = new Map<string, number>();
    phrases.forEach((phrase) => {
      frequency.set(phrase, (frequency.get(phrase) || 0) + 1);
    });
    return frequency;
  };

  const analyzeKeywords = (
    wordFreq: Map<string, number>,
    phraseFreq: Map<string, number>,
    content: string
  ): KeywordAnalysis[] => {
    const totalWords = content.split(" ").length;
    const keywords: KeywordAnalysis[] = [];

    // Analyze single words
    wordFreq.forEach((count, word) => {
      const density = (count / totalWords) * 100;
      if (density > 0.5) {
        // Only include words with significant density
        keywords.push({
          keyword: word,
          density,
          occurrences: count,
          relevance: calculateRelevance(word, density),
        });
      }
    });

    // Analyze phrases
    phraseFreq.forEach((count, phrase) => {
      const density = (count / totalWords) * 100;
      if (density > 0.3) {
        // Lower threshold for phrases
        keywords.push({
          keyword: phrase,
          density,
          occurrences: count,
          relevance: calculateRelevance(phrase, density),
        });
      }
    });

    return keywords.sort((a, b) => b.relevance - a.relevance);
  };

  const calculateRelevance = (keyword: string, density: number): number => {
    // Simple relevance score based on density and length
    const lengthScore = Math.min(keyword.split(" ").length / 3, 1);
    return density * (1 + lengthScore);
  };

  const calculateReadability = (text: string): number => {
    // Simple Flesch Reading Ease score
    const sentences = text.split(/[.!?]+/).length;
    const words = text.split(" ").length;
    const syllables = countSyllables(text);

    return 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
  };

  const countSyllables = (text: string): number => {
    // Simple syllable counting
    return text
      .toLowerCase()
      .replace(/[^a-z]/g, "")
      .replace(/[^aeiouy]+/g, " ")
      .trim()
      .split(" ").length;
  };

  const generateSuggestions = (
    keywords: KeywordAnalysis[]
  ): {
    primary: string[];
    secondary: string[];
  } => {
    // Select top keywords for primary and secondary suggestions
    const primary = keywords
      .filter((k) => k.keyword.split(" ").length >= 2) // Prefer phrases for primary
      .slice(0, 3)
      .map((k) => k.keyword);

    const secondary = keywords
      .filter((k) => k.keyword.split(" ").length === 1) // Prefer single words for secondary
      .slice(0, 5)
      .map((k) => k.keyword);

    return { primary, secondary };
  };

  const handleKeywordSelect = (
    keyword: string,
    type: "primary" | "secondary"
  ) => {
    if (!analysis) return;

    const currentPrimary = analysis.suggestions.primary;
    const currentSecondary = analysis.suggestions.secondary;

    if (type === "primary") {
      onKeywordsSelected([...currentPrimary, keyword], currentSecondary);
    } else {
      onKeywordsSelected(currentPrimary, [...currentSecondary, keyword]);
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={analyzeContent}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Analyze Content
      </button>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded">{error}</div>
      )}

      {analysis && (
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded">
            <h3 className="font-medium mb-2">Readability Score</h3>
            <p className="text-sm">
              {analysis.readability.toFixed(1)} -
              {analysis.readability > 90
                ? "Very Easy"
                : analysis.readability > 80
                ? "Easy"
                : analysis.readability > 70
                ? "Fairly Easy"
                : analysis.readability > 60
                ? "Standard"
                : analysis.readability > 50
                ? "Fairly Difficult"
                : "Difficult"}
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Suggested Primary Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.suggestions.primary.map((keyword, index) => (
                <button
                  key={index}
                  onClick={() => handleKeywordSelect(keyword, "primary")}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Suggested Secondary Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.suggestions.secondary.map((keyword, index) => (
                <button
                  key={index}
                  onClick={() => handleKeywordSelect(keyword, "secondary")}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full hover:bg-green-200"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Keyword Analysis</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Keyword
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Density
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Occurrences
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analysis.keywords.slice(0, 10).map((keyword, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {keyword.keyword}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {keyword.density.toFixed(2)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {keyword.occurrences}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
