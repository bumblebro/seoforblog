"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { use } from "react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: any[];
  seo: {
    ogTitle?: string;
    ogDescription?: string;
    metaDescription?: string;
    primaryKeywords?: string[];
    secondaryKeywords?: string[];
  };
}

export default function BlogSEO({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState<{
    primarySuggestions: string[];
    secondarySuggestions: string[];
  } | null>(null);
  const [selectedKeywords, setSelectedKeywords] = useState({
    primaryKeywords: [] as string[],
    secondaryKeywords: [] as string[],
  });

  useEffect(() => {
    fetchBlog();
  }, [resolvedParams.id]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${resolvedParams.id}`);
      const data = await response.json();
      setBlog(data);
      setSelectedKeywords({
        primaryKeywords: data.seo.primaryKeywords || [],
        secondaryKeywords: data.seo.secondaryKeywords || [],
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blog:", error);
      setLoading(false);
    }
  };

  const analyzeContent = async () => {
    if (!blog) return;

    try {
      // Extract text content from the blog
      const textContent = blog.content
        .map((section: any) => {
          const content = JSON.parse(section);
          return content.description || "";
        })
        .join(" ")
        .toLowerCase();

      // Calculate keyword density
      const words = textContent.split(/\s+/);
      const keywordDensity: { [key: string]: number } = {};

      words.forEach((word) => {
        if (word.length > 3) {
          keywordDensity[word] = (keywordDensity[word] || 0) + 1;
        }
      });

      // Generate keyword suggestions
      const sortedKeywords = Object.entries(keywordDensity)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([word]) => word);

      setSuggestions({
        primarySuggestions: sortedKeywords.slice(0, 3),
        secondarySuggestions: sortedKeywords.slice(3, 6),
      });
    } catch (error) {
      console.error("Error analyzing content:", error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/blogs/${resolvedParams.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          seo: {
            ...blog?.seo,
            primaryKeywords: selectedKeywords.primaryKeywords,
            secondaryKeywords: selectedKeywords.secondaryKeywords,
          },
        }),
      });

      if (response.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const addKeyword = (type: "primary" | "secondary", keyword: string) => {
    if (type === "primary") {
      setSelectedKeywords({
        ...selectedKeywords,
        primaryKeywords: [...selectedKeywords.primaryKeywords, keyword],
      });
    } else {
      setSelectedKeywords({
        ...selectedKeywords,
        secondaryKeywords: [...selectedKeywords.secondaryKeywords, keyword],
      });
    }
  };

  const removeKeyword = (type: "primary" | "secondary", index: number) => {
    if (type === "primary") {
      setSelectedKeywords({
        ...selectedKeywords,
        primaryKeywords: selectedKeywords.primaryKeywords.filter(
          (_, i) => i !== index
        ),
      });
    } else {
      setSelectedKeywords({
        ...selectedKeywords,
        secondaryKeywords: selectedKeywords.secondaryKeywords.filter(
          (_, i) => i !== index
        ),
      });
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!blog) {
    return <div className="p-8">Blog not found</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>

      <div className="grid gap-8">
        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Current SEO Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Primary Keywords
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedKeywords.primaryKeywords.map((keyword, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                  >
                    {keyword}
                    <button
                      onClick={() => removeKeyword("primary", index)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Add primary keyword"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value) {
                    addKeyword("primary", e.currentTarget.value);
                    e.currentTarget.value = "";
                  }
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Secondary Keywords
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedKeywords.secondaryKeywords.map((keyword, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full"
                  >
                    {keyword}
                    <button
                      onClick={() => removeKeyword("secondary", index)}
                      className="text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Add secondary keyword"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value) {
                    addKeyword("secondary", e.currentTarget.value);
                    e.currentTarget.value = "";
                  }
                }}
              />
            </div>
          </div>
        </div>

        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Keyword Suggestions</h2>
          <button
            onClick={analyzeContent}
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Analyze Content
          </button>

          {suggestions && (
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Suggested Primary Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {suggestions.primarySuggestions.map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => addKeyword("primary", keyword)}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200"
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">
                  Suggested Secondary Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {suggestions.secondarySuggestions.map((keyword) => (
                    <button
                      key={keyword}
                      onClick={() => addKeyword("secondary", keyword)}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full hover:bg-green-200"
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
