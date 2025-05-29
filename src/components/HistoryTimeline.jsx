// components/HistoryTimeline.jsx
import { useNavigate } from "react-router-dom";

const HistoryTimeline = ({ periods = [] }) => {
  const navigate = useNavigate();

  const handleClick = (value) => {
    navigate(`/history/articles?period=${value}`);
  };

  return (
    <div className="space-y-2">
      {periods.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => handleClick(value)}
          className="w-full text-left px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm"
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default HistoryTimeline;
