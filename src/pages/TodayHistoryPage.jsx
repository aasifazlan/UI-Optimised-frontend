import { useEffect, useState } from 'react';
import { getTodayHistory } from '../api/history';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const TodayHistoryPage = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTodayHistory();
        setEvent(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
  return (
    <div className="max-w-screen-xl mt-16 mx-auto px-4 sm:px-6 lg:px-8 py-12 font-serif animate-pulse">
      <div className="h-5 w-32 bg-gray-300 rounded mb-6"></div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-4">
          <div className="h-64 bg-gray-300 rounded-md mb-4"></div>
          <div className="h-8 bg-gray-300 rounded w-2/3"></div>
          <div className="h-5 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-4/6"></div>
          </div>
        </div>

        <aside className="lg:w-1/3 border-l border-gray-200 pl-6 mt-10 lg:mt-0 space-y-6">
          <div className="h-6 w-1/2 bg-gray-300 rounded mb-2"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </aside>
      </div>
    </div>
  );
}


  if (!event) {
    return <p className="text-center text-red-500 py-10">Failed to load event data.</p>;
  }

  const pageTitle = event.title || 'Today in History';
  const pageDescription = event.summary || 'Explore historical events that happened on this day.';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription.slice(0, 160)} />
        <link rel="canonical" href={`https://yourdomain.com${location.pathname}`} />
      </Helmet>

      <div className="max-w-screen-xl mt-16 mx-auto px-4 sm:px-6 lg:px-8 py-12 font-serif text-[#1a1a1a]">
        <Link to="/" className="text-blue-600 hover:underline text-sm block mb-6">
          ← Back to Home
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Main Article */}
          <div className="lg:w-2/3">
            {event.images?.length > 0 && (
              <div className="mb-6">
                {event.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.url}
                    alt={img.alt || `Image ${idx + 1} for ${event.title}`}
                    className="w-full h-auto max-h-[400px] object-cover rounded-md shadow-md mb-4"
                    loading="lazy"
                  />
                ))}
              </div>
            )}

            <h1 className="text-4xl font-bold leading-tight mb-2">{event.title}</h1>
            <p className="text-gray-500 italic text-lg mb-10">
              {formatDate(event.createdAt)}
            </p>

            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: event.content }}
            />
          </div>

          {/* Right: Sidebar */}
          <aside className="lg:w-1/3 border-l border-gray-200 pl-6 mt-10 lg:mt-0 h-[calc(100vh-8rem)] overflow-y-auto sticky top-32 space-y-8">
            {event.summary && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-3">Summary</h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {event.summary}
                </p>
              </div>
            )}

            {event.relatedArticles?.length > 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-3">Related Articles</h2>
                <ul className="space-y-3">
                  {event.relatedArticles.map((article) => (
                    <li key={article.id}>
                      <Link
                        to={`/history/${article.id}`}
                        className="text-blue-600 hover:underline block"
                      >
                        {article.title}
                      </Link>
                      <p className="text-xs text-gray-500">
                        {formatDate(article.createdAt)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-gray-600 text-sm italic pr-4">
                <p>This space is reserved for future content such as:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Related Articles</li>
                  <li>Sources & References</li>
                  <li>Infographics</li>
                  <li>More on this Topic</li>
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
};

export default TodayHistoryPage;
