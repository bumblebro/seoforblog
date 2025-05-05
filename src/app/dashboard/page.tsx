"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  slug: string;
  seo: {
    primaryKeyword?: string;
    secondaryKeyword?: string;
  };
}

export default function Dashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Blog SEO Dashboard</h1>
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
                    <span className="font-medium">Primary Keyword:</span>{" "}
                    {blog.seo.primaryKeyword || "Not set"}
                  </p>
                  <p>
                    <span className="font-medium">Secondary Keyword:</span>{" "}
                    {blog.seo.secondaryKeyword || "Not set"}
                  </p>
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
