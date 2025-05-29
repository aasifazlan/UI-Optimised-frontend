import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import api from '../lib/axios';
import { Link } from 'react-router-dom';
import SkeletonArticle from './SkeletonArticle';

const LatestArticles = () => {
  const [articles, setArticles] = useState([]);
  const [visibleArticlesCount, setVisibleArticlesCount] = useState(6);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await api.get('/articles');
        const fetchedArticles = Array.isArray(res.data) ? res.data : res.data.articles;

        const sortedArticles = fetchedArticles.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setArticles(sortedArticles);
        setError(null);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setArticles([]);
        setError('Failed to fetch articles. Please try again later.');
      }
    };

    fetchArticles();
  }, []);

  const loadMoreArticles = () => {
    setVisibleArticlesCount(prev => prev + 6);
  };

  const loadFewerArticles = () => {
    setVisibleArticlesCount(prev => Math.max(prev - 6, 6));
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Latest Articles - Unscripted India",
    "description": "Explore the latest historical and cultural articles from Unscripted India.",
    "mainEntity": articles.slice(0, visibleArticlesCount).map(article => ({
      "@type": "Article",
      "headline": article.title,
      "datePublished": article.createdAt,
      "image": article?.images?.[0]?.url || '/fallback-image.jpg',
      "url": `${window.location.origin}/article/${article.slug}`,
      "author": {
        "@type": "Organization",
        "name": "Unscripted India"
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>Latest Articles - Unscripted India</title>
        <meta
          name="description"
          content="Explore the latest historical and cultural articles from Unscripted India. Stay informed and inspired."
        />
        <link rel="canonical" href={`${window.location.origin}/articles`} />

        {/* Open Graph */}
        <meta property="og:title" content="Latest Articles - Unscripted India" />
        <meta property="og:description" content="Explore the latest historical and cultural articles from Unscripted India." />
        <meta property="og:url" content={`${window.location.origin}/articles`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={articles?.[0]?.images?.[0]?.url || '/fallback-image.jpg'} />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="max-w-screen-xl mt-20 mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        <section className="my-12" aria-labelledby="latest-articles-heading">
          <h1 id="latest-articles-heading" className="text-3xl font-bold text-center mb-8">
            📰 Latest Articles
          </h1>

          {error && (
            <p className="text-center text-red-500 font-medium mb-6">{error}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.length > 0 ? (
              articles.slice(0, visibleArticlesCount).map(article => (
                <Link
                  key={article._id || article.id}
                  to={article.slug ? `/article/${article.slug}` : '#'}
                  className={`bg-white rounded-2xl shadow-lg transition-transform transform ${
                    article.slug ? 'hover:shadow-xl hover:scale-105' : 'opacity-50 cursor-not-allowed'
                  }`}
                  aria-label={`Read article: ${article.title}`}
                >
                  <img
                    src={article?.images?.[0]?.url || '/fallback-image.jpg'}
                    alt={article.title}
                    className="w-full h-56 object-cover rounded-t-2xl"
                  />
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
                    {article.excerpt && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">{article.excerpt}</p>
                    )}
                    <span className="text-blue-600 hover:underline text-sm inline-block">Read more</span>
                  </div>
                </Link>
              ))
            ) : !error ? (
              Array.from({ length: 6 }).map((_, idx) => <SkeletonArticle key={idx} />)
            ) : (
              <p className="text-center text-gray-500 col-span-full">No articles found.</p>
            )}
          </div>

          <div className="text-center mt-6">
            {visibleArticlesCount < articles.length && (
              <button
                onClick={loadMoreArticles}
                className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition mr-4"
              >
                More
              </button>
            )}
            {visibleArticlesCount > 6 && (
              <button
                onClick={loadFewerArticles}
                className="bg-gray-600 text-white py-2 px-6 rounded-full hover:bg-gray-700 transition"
              >
                Less
              </button>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default LatestArticles;
