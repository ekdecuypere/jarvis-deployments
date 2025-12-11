import { Component, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import SiteAnalysis from './pages/SiteAnalysis'
import TargetTracking from './pages/TargetTracking'
import Compliance from './pages/Compliance'
import Initiatives from './pages/Initiatives'
import Reports from './pages/Reports'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
          <div className="bg-gray-800 rounded-lg p-8 max-w-lg text-center border border-red-500/30">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
              <span className="text-red-500 text-2xl">!</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-gray-400 mb-4">An unexpected error occurred in the ESG reporting application.</p>
            <pre className="text-left bg-black/30 rounded p-3 mb-4 text-xs text-red-400 overflow-auto max-h-32">
              {this.state.error?.message || 'Unknown error'}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-white transition-colors"
            >
              Reload Application
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="sites" element={<SiteAnalysis />} />
            <Route path="targets" element={<TargetTracking />} />
            <Route path="compliance" element={<Compliance />} />
            <Route path="initiatives" element={<Initiatives />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
