"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: any[];
  recipedescription: string;
  instructions: string[];
  recipedetails: any;
  faq: any;
  equipments: string[];
  seo: {
    primaryKeywords?: string[];
    secondaryKeywords?: string[];
    primaryKeywordsNew?: string[];
    secondaryKeywordsNew?: string[];
  };
}

export default function Dashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
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

  // Constants for batch processing
  const BATCH_SIZE = 10; // Process 10 blogs at a time
  const DELAY_BETWEEN_BLOGS = 200; // 200ms delay between each blog
  const DELAY_BETWEEN_BATCHES = 2000; // 2 second delay between batches

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      const data = await response.json();
      setBlogs(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  const stopBulkUpdate = () => {
    setUpdateProgress((prev) => ({ ...prev, shouldStop: true }));
  };

  const bulkUpdateBlogs = async () => {
    setBulkUpdating(true);
    setUpdateProgress({
      current: 0,
      total: 0,
      status: "Starting bulk update...",
      shouldStop: false,
      batchNumber: 0,
      totalBatches: 0,
      failedBlogs: [],
      skippedBlogs: [],
    });

    try {
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

      // Refresh the blogs list after update
      await fetchBlogs();
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

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog SEO Dashboard</h1>
        <button
          onClick={bulkUpdateBlogs}
          disabled={bulkUpdating}
          className={`px-6 py-2 rounded flex items-center gap-2 ${
            bulkUpdating
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
      </div>

      {bulkUpdating && (
        <div className="border p-6 rounded-lg bg-gray-50 mb-6">
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
              Batch {updateProgress.batchNumber} / {updateProgress.totalBatches}
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

      <div className="grid gap-4">
        {blogs.map((blog) => (
          <Link
            href={`/dashboard/${blog.id}`}
            key={blog.id}
            className="block p-4 border rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <div className="space-y-1 text-gray-600">
                  <p>
                    <span className="font-medium">Slug:</span> {blog.slug}
                  </p>
                  <p>
                    <span className="font-medium">Primary Keywords:</span>{" "}
                    {blog.seo.primaryKeywords?.join(", ") || "Not set"}
                  </p>
                  <p>
                    <span className="font-medium">Secondary Keywords:</span>{" "}
                    {blog.seo.secondaryKeywords?.join(", ") || "Not set"}
                  </p>
                  {blog.seo.primaryKeywordsNew?.length > 0 && (
                    <p>
                      <span className="font-medium">New Primary Keywords:</span>{" "}
                      {blog.seo.primaryKeywordsNew.join(", ")}
                    </p>
                  )}
                  {blog.seo.secondaryKeywordsNew?.length > 0 && (
                    <p>
                      <span className="font-medium">
                        New Secondary Keywords:
                      </span>{" "}
                      {blog.seo.secondaryKeywordsNew.join(", ")}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
