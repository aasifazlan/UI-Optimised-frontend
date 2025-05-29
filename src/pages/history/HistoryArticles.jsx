import { useSearchParams } from "react-router-dom";

const dummyArticles = {
  "indus-valley": [
    { title: "Urban Planning in Harappa", id: "1" },
    { title: "Trade Systems in Indus Civilization", id: "2" },
  ],
  "vedic-period": [
    { title: "Society and Religion in Vedic Period", id: "3" },
  ],
  "maurya-empire": [
    { title: "Ashoka the Great: From War to Dharma", id: "4" },
  ],
  "gupta-empire": [
    { title: "Golden Age of India", id: "5" },
  ],
};

const HistoryArticles = () => {
  const [searchParams] = useSearchParams();
  const period = searchParams.get("period");

  const articles = dummyArticles[period] || [];

  return (
    <div className="max-w-4xl mt-20 mx-auto px-4 py-8 font-serif">
      <h1 className="text-2xl font-bold mb-4 capitalize">
        {period?.replaceAll("-", " ") || "Articles"}
      </h1>

      {articles.length ? (
        <ul className="space-y-3">
          {articles.map((article) => (
            <li key={article.id} className="border p-4 rounded-md bg-white shadow">
              {article.title}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No articles found for this period yet.</p>
      )}
    </div>
  );
};

export default HistoryArticles;
