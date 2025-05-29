import HistoryTimeline from "../../components/HistoryTimeline";

const ModernHistory = () => {
  const timeline = [
  { label: "British Rule (1757–1947)", value: "british-rule" },
  { label: "Revolt of 1857", value: "revolt-1857" },
  { label: "Indian National Movement (1885–1947)", value: "national-movement" },
  { label: "Independence & Partition (1947)", value: "independence-partition" },
  { label: "Post-Independence Era", value: "post-independence" },
  { label: "Emergency Period (1975–77)", value: "emergency" },
  { label: "Liberalization (1991 onwards)", value: "liberalization" },
];


  return (
    <div className="mt-32 mb-12">
      <h1>Modern History</h1>
       
      <HistoryTimeline periods={timeline} />
    </div>
  );
};
export default ModernHistory;