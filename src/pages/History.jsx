// src/pages/History.jsx
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();

  const timelines = [
    { label: "Ancient History", value: "ancient" },
    { label: "Medieval History", value: "medieval" },
    { label: "Modern History", value: "modern" },
  ];

  return (
    <div className="mt-32 px-4 md:px-8">
      <div className="lg:hidden mb-6">
        <h2 className="text-2xl font-bold mb-4">Explore Indian History</h2>
        <div className="grid grid-cols-2 gap-3">
          {timelines.map((t) => (
            <button
              key={t.value}
              onClick={() => navigate(`/history/${t.value}`)}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block lg:w-1/4 bg-gray-100 p-6 sticky top-20 self-start h-max">
          <h2 className="text-2xl font-bold mb-6">Explore Indian History</h2>
          <div className="flex flex-col gap-4">
            {timelines.map((t) => (
              <button
                key={t.value}
                onClick={() => navigate(`/history/${t.value}`)}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 text-left"
              >
                {t.label}
              </button>
            ))}
          </div>
        </aside>

        <main className="w-full lg:w-3/4">
          <h1 className="text-3xl font-bold mb-6">History of India</h1>
          <p className="text-gray-700 mb-6">
            Journey through time as we explore India's rich historical tapestry — from the dawn of civilization to the post-independence era. Click on any timeline to delve deeper.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {timelines.map((t) => (
              <div
                key={t.value}
                className="border p-4 rounded-lg shadow-md bg-white hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/history/${t.value}`)}
              >
                <h3 className="text-xl font-semibold mb-2">{t.label}</h3>
                <p className="text-gray-600">
                  Learn about key events, empires, movements, and cultural shifts from the {t.label.toLowerCase()}.
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default History;
