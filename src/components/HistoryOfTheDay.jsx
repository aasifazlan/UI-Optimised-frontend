import { useEffect, useState } from 'react';
import { getTodayHistory } from '../api/history';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const HistoryOfTheDay = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTodayHistory();
        setEvent(data);
      } catch (error) {
        console.error('Failed to fetch today\'s history:', error);
        setEvent(null);
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
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-6 rounded-xl shadow-lg animate-pulse">
        {/* Image skeleton */}
        <div className="w-full md:w-1/2 h-64 bg-gray-200 rounded-lg" />

        {/* Text skeletons */}
        <div className="flex-1 w-full space-y-4">
          <div className="h-8 bg-gray-300 rounded w-3/4" />  {/* Title */}
          <div className="h-5 bg-gray-200 rounded w-1/4" />  {/* Date */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-100 rounded w-full" />
            <div className="h-4 bg-gray-100 rounded w-5/6" />
            <div className="h-4 bg-gray-100 rounded w-2/3" />
          </div>
          <div className="h-10 bg-blue-300 rounded w-40" />  {/* Button */}
        </div>
      </div>
    </div>
  );
}


  if (!event) {
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        Unable to load today's history. Please try again later.
      </div>
    );
  }

  const previewText = event.content
    ? event.content.split('\n').slice(0, 3).join(' ')
    : 'No preview available.';

  const eventTitle = event?.title || 'On This Day in History';
  const eventDesc = previewText.length > 160
    ? previewText.slice(0, 157) + '...'
    : previewText;

  return (
    <>
      <Helmet>
        <title>{eventTitle}</title>
        <meta
          name="description"
          content={eventDesc}
        />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article
          className="flex flex-col md:flex-row gap-8 items-center bg-white/90 p-6 rounded-xl shadow-lg"
          aria-label="Today's historical event"
        >
          {event.images?.[0]?.url ? (
            <img
              src={event.images[0].url}
              alt={event.images[0].alt || `Image for ${event.title}`}
              className="w-full md:w-1/2 max-h-[400px] object-cover rounded-lg shadow-md"
              loading="lazy"
            />
          ) : (
            <div className="w-full md:w-1/2 h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
              No image available
            </div>
          )}

          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">{event.title}</h1>
            <time className="text-gray-500 block">
              {formatDate(event.date || event.createdAt)}
            </time>
            <div className="text-gray-700 max-h-24 overflow-hidden">
              <div
                dangerouslySetInnerHTML={{ __html: previewText }}
              />
            </div>
            <Link
              to="/today-history"
              className="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            >
              Read Full Article →
            </Link>
          </div>
        </article>
      </div>
    </>
  );
};

export default HistoryOfTheDay;
