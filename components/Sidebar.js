'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, AlertTriangle } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/issues", label: "Issue Management", icon: AlertTriangle },
    { href: "/reports", label: "Reports", icon: FileText },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-50 via-white to-blue-100 border-r border-blue-100 shadow-md flex flex-col">
      {/* Brand / Logo */}
      <div className="px-6 py-5 font-extrabold text-xl tracking-tight text-slate-800 border-b border-blue-100 flex items-center gap-2">
        <img src="/fmtlogo.png" className="w-[30px]" alt="" srcset="" />
        FixMyTown
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-slate-700 hover:bg-blue-100 hover:text-blue-600"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

