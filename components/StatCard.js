export default function StatCard({ title, value, colorClass }) {
  return (
    <div
      className={`relative p-6 rounded-2xl shadow-md bg-white/80 backdrop-blur-sm border border-blue-100 hover:shadow-lg transition-all duration-300 ${colorClass || ""}`}
    >
      {/* Accent bar on top */}
      <div
        className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl ${
          colorClass || "bg-blue-500"
        }`}
      />

      <h4 className="text-sm font-medium text-slate-600 tracking-wide">
        {title}
      </h4>
      <p className="text-3xl font-extrabold text-slate-800 mt-2">{value}</p>
    </div>
  );
}
