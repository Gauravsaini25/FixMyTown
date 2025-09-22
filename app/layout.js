import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata = {
  title: "FixMyTown - Admin Panel",
  description: "Admin panel for civic issue reporting",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-blue-50 via-white to-blue-100 text-slate-800 transition-colors duration-300">
        <div className="min-h-screen flex">
          {/* Sidebar with a subtle shadow */}
          <Sidebar />

          <div className="flex-1 flex flex-col">
            {/* Header with sticky positioning and shadow */}
            <Header adminName="Gaurav" adminLocation="Talegaon Pune Municipality" />

            
            <main className="flex-1 overflow-auto p-6 bg-white/60 backdrop-blur-sm rounded-tl-2xl shadow-inner transition-all duration-300">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
