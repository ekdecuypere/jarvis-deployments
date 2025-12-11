import { useState } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import {
  ChartBarIcon,
  BuildingOffice2Icon,
  AdjustmentsHorizontalIcon,
  ClipboardDocumentCheckIcon,
  RocketLaunchIcon,
  DocumentTextIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
  { name: 'Site Analysis', href: '/sites', icon: BuildingOffice2Icon },
  { name: 'Target Tracking', href: '/targets', icon: AdjustmentsHorizontalIcon },
  { name: 'Compliance', href: '/compliance', icon: ClipboardDocumentCheckIcon },
  { name: 'Initiatives', href: '/initiatives', icon: RocketLaunchIcon },
  { name: 'Reports', href: '/reports', icon: DocumentTextIcon }
]

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const getCurrentPageTitle = () => {
    const current = navigation.find(nav => nav.href === location.pathname)
    return current?.name || 'Dashboard'
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-800 border-r border-gray-700 transform transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <h1 className="text-white font-semibold text-sm">Aurubis</h1>
              <p className="text-gray-400 text-xs">ESG Reporting</p>
            </div>
          </div>
          <button
            className="lg:hidden text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                isActive ? 'nav-item-active' : 'nav-item'
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">AU</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Sustainability Team</p>
              <p className="text-xs text-gray-400 truncate">Q4 2024</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="sticky top-0 z-30 h-16 bg-gray-800/80 backdrop-blur-xl border-b border-gray-700 flex items-center px-4 lg:px-6">
          <button
            className="lg:hidden text-gray-400 hover:text-white mr-4"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="w-6 h-6" />
          </button>

          <div className="flex-1">
            <h2 className="text-lg font-semibold text-white">{getCurrentPageTitle()}</h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-gray-400">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Live data" />
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
