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
    primaryKeywordsNew?: string[];
    secondaryKeywordsNew?: string[];
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
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [updatingDatabase, setUpdatingDatabase] = useState(false);
  const [bulkUpdating, setBulkUpdating] = useState(false);
  const [updateProgress, setUpdateProgress] = useState({
    current: 0,
    total: 0,
    status: "",
    shouldStop: false,
    batchNumber: 0,
    totalBatches: 0,
    failedBlogs: [] as { id: string; title: string; error: string }[],
    skippedBlogs: [] as { id: string; title: string; reason: string }[],
  });
  const [selectedKeywords, setSelectedKeywords] = useState({
    primaryKeywords: [] as string[],
    secondaryKeywords: [] as string[],
  });
  const [updatedKeywords, setUpdatedKeywords] = useState({
    primaryKeywordsNew: [] as string[],
    secondaryKeywordsNew: [] as string[],
  });

  // Constants for batch processing
  const BATCH_SIZE = 10; // Process 10 blogs at a time
  const DELAY_BETWEEN_BLOGS = 200; // 200ms delay between each blog
  const DELAY_BETWEEN_BATCHES = 2000; // 2 second delay between batches

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
      setUpdatedKeywords({
        primaryKeywordsNew: data.seo.primaryKeywordsNew || [],
        secondaryKeywordsNew: data.seo.secondaryKeywordsNew || [],
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blog:", error);
      setLoading(false);
    }
  };

  const fetchGoogleSuggestions = async () => {
    if (
      !selectedKeywords.primaryKeywords.length ||
      !selectedKeywords.secondaryKeywords.length
    ) {
      alert(
        "Both primary and secondary keywords are required to fetch suggestions"
      );
      return;
    }

    setLoadingSuggestions(true);
    try {
      const primaryKeyword = selectedKeywords.primaryKeywords[0];
      const secondaryKeyword = selectedKeywords.secondaryKeywords[0];

      const response = await fetch(
        `/api/google-suggestions?primaryQuery=${encodeURIComponent(
          primaryKeyword
        )}&secondaryQuery=${encodeURIComponent(secondaryKeyword)}`
      );
      const data = await response.json();

      if (data.primaryKeywords && data.secondaryKeywords) {
        setUpdatedKeywords((prev) => ({
          ...prev,
          primaryKeywordsNew: data.primaryKeywords,
          secondaryKeywordsNew: data.secondaryKeywords,
        }));
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      alert("Failed to fetch suggestions");
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const updateDatabase = async () => {
    if (
      !updatedKeywords.primaryKeywordsNew.length &&
      !updatedKeywords.secondaryKeywordsNew.length
    ) {
      alert("No new keywords to update");
      return;
    }

    setUpdatingDatabase(true);
    try {
      const response = await fetch(`/api/blogs/${resolvedParams.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          seo: {
            ...blog?.seo,
            primaryKeywordsNew: updatedKeywords.primaryKeywordsNew,
            secondaryKeywordsNew: updatedKeywords.secondaryKeywordsNew,
          },
        }),
      });

      if (response.ok) {
        alert("Database updated successfully!");
        // Refresh the blog data
        await fetchBlog();
      } else {
        throw new Error("Failed to update database");
      }
    } catch (error) {
      console.error("Error updating database:", error);
      alert("Failed to update database");
    } finally {
      setUpdatingDatabase(false);
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
            primaryKeywords: [
              ...selectedKeywords.primaryKeywords,
              ...updatedKeywords.primaryKeywordsNew,
            ],
            secondaryKeywords: [
              ...selectedKeywords.secondaryKeywords,
              ...updatedKeywords.secondaryKeywordsNew,
            ],
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
      setUpdatedKeywords({
        ...updatedKeywords,
        primaryKeywordsNew: [...updatedKeywords.primaryKeywordsNew, keyword],
      });
    } else {
      setUpdatedKeywords({
        ...updatedKeywords,
        secondaryKeywordsNew: [
          ...updatedKeywords.secondaryKeywordsNew,
          keyword,
        ],
      });
    }
  };

  const removeKeyword = (type: "primary" | "secondary", index: number) => {
    if (type === "primary") {
      setUpdatedKeywords({
        ...updatedKeywords,
        primaryKeywordsNew: updatedKeywords.primaryKeywordsNew.filter(
          (_, i) => i !== index
        ),
      });
    } else {
      setUpdatedKeywords({
        ...updatedKeywords,
        secondaryKeywordsNew: updatedKeywords.secondaryKeywordsNew.filter(
          (_, i) => i !== index
        ),
      });
    }
  };

  const removeAllKeywords = (type: "primary" | "secondary") => {
    if (type === "primary") {
      setUpdatedKeywords({
        ...updatedKeywords,
        primaryKeywordsNew: [],
      });
    } else {
      setUpdatedKeywords({
        ...updatedKeywords,
        secondaryKeywordsNew: [],
      });
    }
  };

  const cleanTitle = (title: string) => {
    return title.replace(/-/g, " ");
  };

  const copyWebsiteUrl = () => {
    const baseUrl = "https://savorytouch.com";
    const fullUrl = `${baseUrl}/${blog.slug}`;
    navigator.clipboard.writeText(fullUrl);
  };

  const stopBulkUpdate = () => {
    setUpdateProgress((prev) => ({ ...prev, shouldStop: true }));
  };

  const bulkUpdateBlogs = async () => {
    setBulkUpdating(true);
    setUpdateProgress({
      current: 0,
      total: 0,
      status: "Fetching blogs...",
      shouldStop: false,
      batchNumber: 0,
      totalBatches: 0,
      failedBlogs: [],
      skippedBlogs: [],
    });

    try {
      // First, get all blog IDs
      const blogsResponse = await fetch("/api/blogs");
      const blogs = await blogsResponse.json();

      const totalBatches = Math.ceil(blogs.length / BATCH_SIZE);

      setUpdateProgress((prev) => ({
        ...prev,
        total: blogs.length,
        totalBatches,
        status: `Starting update of ${blogs.length} blogs in ${totalBatches} batches...`,
      }));

      let successCount = 0;
      let failCount = 0;

      // Process blogs in batches
      for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
        if (updateProgress.shouldStop) {
          setUpdateProgress((prev) => ({
            ...prev,
            status: `Update stopped. Successfully updated ${successCount} blogs, failed: ${failCount}`,
          }));
          break;
        }

        const startIndex = batchIndex * BATCH_SIZE;
        const endIndex = Math.min(startIndex + BATCH_SIZE, blogs.length);
        const currentBatch = blogs.slice(startIndex, endIndex);

        setUpdateProgress((prev) => ({
          ...prev,
          batchNumber: batchIndex + 1,
          status: `Processing batch ${batchIndex + 1}/${totalBatches} (${
            startIndex + 1
          }-${endIndex} of ${blogs.length})`,
        }));

        // Process each blog in the current batch
        for (const blog of currentBatch) {
          if (updateProgress.shouldStop) break;

          try {
            // Get the first primary and secondary keyword from the blog
            const primaryKeyword = blog.seo?.primaryKeywords?.[0] || "";
            const secondaryKeyword = blog.seo?.secondaryKeywords?.[0] || "";

            if (!primaryKeyword || !secondaryKeyword) {
              setUpdateProgress((prev) => ({
                ...prev,
                skippedBlogs: [
                  ...prev.skippedBlogs,
                  {
                    id: blog.id,
                    title: blog.title,
                    reason: "Missing keywords",
                  },
                ],
              }));
              continue;
            }

            // Fetch Google suggestions for this blog's keywords
            const suggestionsResponse = await fetch(
              `/api/google-suggestions?primaryQuery=${encodeURIComponent(
                primaryKeyword
              )}&secondaryQuery=${encodeURIComponent(secondaryKeyword)}`
            );
            const suggestions = await suggestionsResponse.json();

            if (
              !suggestions.primaryKeywords?.length &&
              !suggestions.secondaryKeywords?.length
            ) {
              setUpdateProgress((prev) => ({
                ...prev,
                skippedBlogs: [
                  ...prev.skippedBlogs,
                  {
                    id: blog.id,
                    title: blog.title,
                    reason: "No suggestions found",
                  },
                ],
              }));
              continue;
            }

            // Update the blog with new suggestions
            const response = await fetch(`/api/blogs/${blog.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                seo: {
                  ...blog.seo,
                  primaryKeywordsNew: suggestions.primaryKeywords,
                  secondaryKeywordsNew: suggestions.secondaryKeywords,
                },
              }),
            });

            if (response.ok) {
              successCount++;
              setUpdateProgress((prev) => ({
                ...prev,
                current: prev.current + 1,
                status: `Updated blog ${prev.current + 1}/${blogs.length}: ${
                  blog.title
                } with ${suggestions.primaryKeywords.length} primary and ${
                  suggestions.secondaryKeywords.length
                } secondary keywords`,
              }));
            } else {
              failCount++;
              setUpdateProgress((prev) => ({
                ...prev,
                failedBlogs: [
                  ...prev.failedBlogs,
                  {
                    id: blog.id,
                    title: blog.title,
                    error: `HTTP ${response.status}`,
                  },
                ],
              }));
            }
          } catch (error) {
            failCount++;
            setUpdateProgress((prev) => ({
              ...prev,
              failedBlogs: [
                ...prev.failedBlogs,
                {
                  id: blog.id,
                  title: blog.title,
                  error: error.message,
                },
              ],
            }));
          }

          // Delay between blogs
          await new Promise((resolve) =>
            setTimeout(resolve, DELAY_BETWEEN_BLOGS)
          );
        }

        // Delay between batches
        if (batchIndex < totalBatches - 1 && !updateProgress.shouldStop) {
          setUpdateProgress((prev) => ({
            ...prev,
            status: `Pausing between batches... (${
              batchIndex + 1
            }/${totalBatches})`,
          }));
          await new Promise((resolve) =>
            setTimeout(resolve, DELAY_BETWEEN_BATCHES)
          );
        }
      }

      if (!updateProgress.shouldStop) {
        setUpdateProgress((prev) => ({
          ...prev,
          status: `Update completed. Successfully updated ${successCount} blogs, failed: ${failCount}, skipped: ${prev.skippedBlogs.length}`,
        }));
      }
    } catch (error) {
      console.error("Error in bulk update:", error);
      setUpdateProgress((prev) => ({
        ...prev,
        status: "Error occurred during bulk update",
      }));
    } finally {
      setBulkUpdating(false);
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

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{cleanTitle(blog.title)}</h1>
        <div className="flex gap-4">
          <button
            onClick={copyWebsiteUrl}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            Copy URL
          </button>
          <button
            onClick={fetchGoogleSuggestions}
            disabled={
              loadingSuggestions || !selectedKeywords.primaryKeywords.length
            }
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              loadingSuggestions || !selectedKeywords.primaryKeywords.length
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {loadingSuggestions ? (
              <span>Loading...</span>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
                Get Google Suggestions
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid gap-8">
        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Current SEO Settings</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium">
                  Primary Keywords
                </label>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedKeywords.primaryKeywords.map((keyword, index) => (
                  <div
                    key={`old-${index}`}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full"
                  >
                    {keyword}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium">
                  Google Suggested Primary Keywords
                </label>
                {updatedKeywords.primaryKeywordsNew.length > 0 && (
                  <button
                    onClick={() => removeAllKeywords("primary")}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Remove All Suggestions
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {updatedKeywords.primaryKeywordsNew.map((keyword, index) => (
                  <div
                    key={`new-${index}`}
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
                {loadingSuggestions && (
                  <div className="flex items-center gap-2 text-gray-500">
                    <span>Loading suggestions...</span>
                  </div>
                )}
                {!loadingSuggestions &&
                  updatedKeywords.primaryKeywordsNew.length === 0 && (
                    <div className="text-gray-500">
                      Click "Get Google Suggestions" to fetch keyword
                      suggestions
                    </div>
                  )}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium">
                  Secondary Keywords
                </label>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedKeywords.secondaryKeywords.map((keyword, index) => (
                  <div
                    key={`old-${index}`}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full"
                  >
                    {keyword}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium">
                  Google Suggested Secondary Keywords
                </label>
                {updatedKeywords.secondaryKeywordsNew.length > 0 && (
                  <button
                    onClick={() => removeAllKeywords("secondary")}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Remove All Suggestions
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {updatedKeywords.secondaryKeywordsNew.map((keyword, index) => (
                  <div
                    key={`new-${index}`}
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
                {loadingSuggestions && (
                  <div className="flex items-center gap-2 text-gray-500">
                    <span>Loading suggestions...</span>
                  </div>
                )}
                {!loadingSuggestions &&
                  updatedKeywords.secondaryKeywordsNew.length === 0 && (
                    <div className="text-gray-500">
                      Click "Get Google Suggestions" to fetch keyword
                      suggestions
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>

        {bulkUpdating && (
          <div className="border p-6 rounded-lg bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Bulk Update Progress</h3>
              <button
                onClick={stopBulkUpdate}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Stop Update
              </button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{updateProgress.status}</span>
                  <span>
                    Blog {updateProgress.current} / {updateProgress.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        (updateProgress.current / updateProgress.total) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Batch Progress */}
              <div className="text-sm text-gray-600">
                Batch {updateProgress.batchNumber} /{" "}
                {updateProgress.totalBatches}
              </div>

              {/* Failed Blogs */}
              {updateProgress.failedBlogs.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-red-600 mb-2">
                    Failed Updates ({updateProgress.failedBlogs.length})
                  </h4>
                  <div className="max-h-40 overflow-y-auto">
                    {updateProgress.failedBlogs.map((blog, index) => (
                      <div key={blog.id} className="text-sm text-red-500">
                        {blog.title}: {blog.error}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skipped Blogs */}
              {updateProgress.skippedBlogs.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-yellow-600 mb-2">
                    Skipped Blogs ({updateProgress.skippedBlogs.length})
                  </h4>
                  <div className="max-h-40 overflow-y-auto">
                    {updateProgress.skippedBlogs.map((blog, index) => (
                      <div key={blog.id} className="text-sm text-yellow-500">
                        {blog.title}: {blog.reason}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button
            onClick={bulkUpdateBlogs}
            disabled={
              bulkUpdating ||
              updatingDatabase ||
              (!updatedKeywords.primaryKeywordsNew.length &&
                !updatedKeywords.secondaryKeywordsNew.length)
            }
            className={`px-6 py-2 rounded flex items-center gap-2 ${
              bulkUpdating ||
              updatingDatabase ||
              (!updatedKeywords.primaryKeywordsNew.length &&
                !updatedKeywords.secondaryKeywordsNew.length)
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-purple-500 text-white hover:bg-purple-600"
            }`}
          >
            {bulkUpdating ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Updating All Blogs...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                Update All Blogs
              </>
            )}
          </button>
          <button
            onClick={updateDatabase}
            disabled={
              updatingDatabase ||
              (!updatedKeywords.primaryKeywordsNew.length &&
                !updatedKeywords.secondaryKeywordsNew.length)
            }
            className={`px-6 py-2 rounded flex items-center gap-2 ${
              updatingDatabase ||
              (!updatedKeywords.primaryKeywordsNew.length &&
                !updatedKeywords.secondaryKeywordsNew.length)
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {updatingDatabase ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Updating...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                Update Database
              </>
            )}
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
}
