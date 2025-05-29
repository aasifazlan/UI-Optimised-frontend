import HistoryTimeline from "../../components/HistoryTimeline";

const MedievalHistory = () => {
  const timeline = [
  { label: "Early Medieval Period (600–1200 CE)", value: "early-medieval" },
  { label: "Delhi Sultanate (1206–1526)", value: "delhi-sultanate" },
  { label: "Vijayanagara Empire (1336–1646)", value: "vijayanagara" },
  { label: "Mughal Empire (1526–1857)", value: "mughal-empire" },
  { label: "Regional Kingdoms", value: "regional-kingdoms" },
];


  return (
    <div className="mt-32 mb-12">
      <h1 className="my-2">Medieval History</h1>
      {/* <p>...</p> */}
      <HistoryTimeline periods={timeline} />
    </div>
  );
};
export default MedievalHistory;