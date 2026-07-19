import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getNewsBySlug } from "../services/news";
import type { NewsArticle as Article } from "../services/news";

export default function NewsArticle() {
  const { slug } = useParams();

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticle() {
      if (!slug) return;

      try {
        const data = await getNewsBySlug(slug);
        setArticle(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-center text-xl text-gray-400">
          Loading article...
        </p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-20 text-center">
        <h1 className="text-4xl font-black">Article Not Found</h1>

        <p className="mt-4 text-gray-400">
          The article you're looking for doesn't exist.
        </p>

        <Link
          to="/news"
          className="mt-8 inline-block rounded-lg bg-cyan-500 px-6 py-3 font-bold text-black"
        >
          ← Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">

      <Link
        to="/news"
        className="text-cyan-400 hover:text-cyan-300"
      >
        ← Back to News
      </Link>

      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="mt-6 h-96 w-full rounded-xl object-cover"
        />
      )}

      <div className="mt-8">

        <span className="rounded bg-cyan-500 px-3 py-1 text-sm font-bold text-black">
          {article.category}
        </span>

        {article.featured && (
          <span className="ml-3 rounded bg-yellow-500 px-3 py-1 text-sm font-bold text-black">
            Featured
          </span>
        )}

        <h1 className="mt-6 text-5xl font-black">
          {article.title}
        </h1>

        <div className="mt-3 flex flex-wrap gap-4 text-gray-400">

          <span>
            By {article.author}
          </span>

          {article.created_at && (
            <span>
              {new Date(article.created_at).toLocaleDateString()}
            </span>
          )}

        </div>

        {article.excerpt && (
          <p className="mt-6 text-xl text-gray-300 italic">
            {article.excerpt}
          </p>
        )}

        <div className="prose prose-invert mt-10 max-w-none whitespace-pre-wrap text-lg leading-8">
          {article.content}
        </div>

      </div>
    </div>
  );
}