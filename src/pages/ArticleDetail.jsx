import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../lib/axios';

function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await api.get(`/articles/slug/${slug}`);
        setArticle(res.data.article || res.data);
      } catch (err) {
        console.error('Error fetching article:', err);
      }
    };
    fetchArticle();
  }, [slug]);

  // Skeleton loader component
  if (!article) {
    return (
      <div className="max-w-screen-xl mt-20 mx-auto px-4 sm:px-6 lg:px-8 py-12 font-serif text-[#1a1a1a] animate-pulse">
        <Link to="/" className="bg-gray-300 rounded w-24 h-4 mb-6 block"></Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Article Skeleton */}
          <div className="lg:w-2/3">
            {/* Image Skeleton */}
            <div className="w-full mb-8 bg-gray-300 rounded-md h-64"></div>

            {/* Title Skeleton */}
            <div className="h-10 bg-gray-300 rounded mb-4 w-3/4"></div>

            {/* Author and Date Skeleton */}
            <div className="h-5 bg-gray-300 rounded mb-10 w-1/3"></div>

            {/* Content Skeleton */}
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-4/6"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:w-1/3 border-l border-gray-200 pl-6 mt-10 lg:mt-0">
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/3"></div>
              <div className="h-3 bg-gray-300 rounded w-1/5"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mt-20 mx-auto px-4 sm:px-6 lg:px-8 py-12 font-serif text-[#1a1a1a]">
      {/* Back to Home Link */}
      <Link to="/" className="text-blue-600 hover:underline text-sm block mb-6">
        ← Back to Home
      </Link>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Article Section */}
        <div className="lg:w-2/3">
          {/* Image */}
          {article.imageUrl && (
            <div className="w-full mb-8">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-auto max-h-[400px] object-cover rounded-md shadow-md"
              />
              {article.imageCaption && (
                <p className="text-sm text-gray-500 italic text-center mt-2">{article.imageCaption}</p>
              )}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold leading-tight mb-2">{article.title}</h1>

          {/* Author and Date */}
          <p className="text-gray-500 italic text-lg mb-10">
            {article.author ? `By ${article.author}` : 'By Unknown'} | {new Date(article.createdAt).toLocaleDateString()}
          </p>

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Sidebar Section */}
        <div className="lg:w-1/3 border-l border-gray-200 pl-6 mt-10 lg:mt-0">
          <div className="text-gray-600 text-sm italic">
            <p>This space is reserved for future content such as:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Related Articles</li>
              <li>Sources & References</li>
              <li>Infographics</li>
              <li>More on this Topic</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;
