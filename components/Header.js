export default function Header({ adminName, adminLocation }) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100 shadow-sm px-6 py-4 flex justify-between items-center transition-all duration-300">
      {/* Title + Location */}
      <div>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">
          Admin Panel
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          📍 {adminLocation}
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-600">
          👋 Welcome, <span className="font-medium text-slate-800">{adminName}</span>
        </span>
        <button
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-xl shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
