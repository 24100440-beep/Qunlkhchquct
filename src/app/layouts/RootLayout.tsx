import { useState } from 'react';
import { Outlet, NavLink } from 'react-router';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  AlertTriangle,
  Menu,
  X,
  FileText,
} from 'lucide-react';

export function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { name: 'Tổng quan', href: '/', icon: LayoutDashboard },
    { name: 'Quản lý du khách', href: '/travelers', icon: Users },
    { name: 'Thống kê', href: '/statistics', icon: BarChart3 },
    { name: 'Cảnh báo', href: '/alerts', icon: AlertTriangle },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-blue-900 to-blue-800 text-white transition-all duration-300 flex flex-col shadow-2xl`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-blue-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur">
              <FileText className="w-6 h-6" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-lg">Xuất Nhập Cảnh</h1>
                <p className="text-xs text-blue-200">Quản lý cửa khẩu</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-blue-900 shadow-lg'
                    : 'text-blue-100 hover:bg-white/10'
                }`
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Toggle button */}
        <div className="p-4 border-t border-blue-700">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
          >
            {sidebarOpen ? (
              <>
                <X className="w-5 h-5" />
                <span>Thu gọn</span>
              </>
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Hệ thống quản lý xuất nhập cảnh
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Quản lý du khách quốc tế tại các cửa khẩu Việt Nam
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Admin</p>
                <p className="text-xs text-gray-500">Quản trị viên</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
