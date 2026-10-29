import { useState } from 'react'
import axios from 'axios'
import HomePage from './components/HomePage'
import FieldPage from './components/FieldPage'
import EDAPanel from './components/EDAPanel'

const API = 'http://localhost:8000'

export default function App() {
  const [page, setPage] = useState('home')
  const [trends, setTrends] = useState(null)
  const [fieldData, setFieldData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadHome = async () => {
    if (trends) { setPage('home'); return }
    setLoading(true)
    setError(null)
    try {
      const [trendRes, overallRes, aiRes, devRes] = await Promise.all([
        axios.get(`${API}/trends/languages`),
        axios.get(`${API}/trends/overall`),
        axios.get(`${API}/trends/ai-tools`),
        axios.get(`${API}/trends/devtypes`),
      ])
      setTrends({
        trending: trendRes.data.data,
        overall: overallRes.data.data,
        aiTools: aiRes.data.data,
        devTypes: devRes.data.data,
      })
      setPage('home')
    } catch {
      setError('Cannot connect to backend. Make sure the FastAPI server is running on port 8000.')
    } finally {
      setLoading(false)
    }
  }

  const loadField = async (field) => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get(`${API}/field/${field}`)
      setFieldData(res.data)
      setPage('field')
    } catch {
      setError(`Failed to load data for "${field}".`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <nav style={styles.nav}>
        <span style={styles.logo}>🔭 Tech Trend Explorer</span>
        <div style={styles.navLinks}>
          <button style={styles.navBtn} onClick={loadHome}>📊 Trends</button>
          <button style={styles.navBtn} onClick={() => setPage('explore')}>🗺️ Explore Fields</button>
          <button style={styles.navBtn} onClick={() => setPage('eda')}>🔬 Data Insights</button>
        </div>
      </nav>

      <main style={styles.main}>
        {error && <div style={styles.error}>⚠️ {error}</div>}
        {loading && <div style={styles.loading}><div style={styles.spinner} />Loading data...</div>}

        {!loading && !error && page === 'home' && trends && (
          <HomePage trends={trends} onSelectField={loadField} />
        )}
        {!loading && !error && page === 'field' && fieldData && (
          <FieldPage data={fieldData} onBack={() => setPage('explore')} />
        )}
        {!loading && !error && page === 'eda' && <EDAPanel />}
        {!loading && (page === 'explore' || (page === 'home' && !trends)) && (
          <ExplorePage onSelectField={loadField} onLoadTrends={loadHome} />
        )}
      </main>
    </div>
  )
}

function ExplorePage({ onSelectField, onLoadTrends }) {
  const fields = [
    { id: 'data science', label: 'Data Science', icon: '🤖', color: '#6366f1' },
    { id: 'web development', label: 'Web Development', icon: '🌐', color: '#0ea5e9' },
    { id: 'devops', label: 'DevOps', icon: '⚙️', color: '#10b981' },
    { id: 'mobile', label: 'Mobile Dev', icon: '📱', color: '#f59e0b' },
    { id: 'cybersecurity', label: 'Cybersecurity', icon: '🔒', color: '#ef4444' },
    { id: 'game development', label: 'Game Dev', icon: '🎮', color: '#8b5cf6' },
    { id: 'embedded', label: 'Embedded Systems', icon: '🔧', color: '#06b6d4' },
  ]

  return (
    <div>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Discover Your Tech Path</h1>
        <p style={styles.heroSub}>Based on real Stack Overflow 2024 survey data from 90,000+ developers</p>
        <button style={styles.heroBtn} onClick={onLoadTrends}>📊 View Global Trends</button>
      </div>
      <h2 style={styles.sectionTitle}>Choose Your Field</h2>
      <div style={styles.fieldGrid}>
        {fields.map(f => (
          <button key={f.id} style={{ ...styles.fieldCard, borderColor: f.color }} onClick={() => onSelectField(f.id)}>
            <span style={styles.fieldIcon}>{f.icon}</span>
            <span style={styles.fieldLabel}>{f.label}</span>
            <span style={{ ...styles.fieldArrow, color: f.color }}>→</span>
          </button>
        ))}
      </div>
    </div>
  )
}

const styles = {
  nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px', background: '#1a1d27', borderBottom: '1px solid #2d3148', position: 'sticky', top: 0, zIndex: 100 },
  logo: { fontSize: 20, fontWeight: 700, color: '#fff' },
  navLinks: { display: 'flex', gap: 12 },
  navBtn: { background: 'transparent', border: '1px solid #3b4268', color: '#94a3b8', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontSize: 14, transition: 'all 0.2s' },
  main: { maxWidth: 1200, margin: '0 auto', padding: '32px 24px' },
  error: { background: '#2d1b1b', border: '1px solid #ef4444', color: '#fca5a5', padding: 16, borderRadius: 10, marginBottom: 24 },
  loading: { display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', padding: 80, color: '#94a3b8', fontSize: 18 },
  spinner: { width: 32, height: 32, border: '3px solid #2d3148', borderTop: '3px solid #3b82f6', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
  hero: { textAlign: 'center', padding: '60px 0 40px' },
  heroTitle: { fontSize: 42, fontWeight: 800, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 12 },
  heroSub: { color: '#64748b', fontSize: 16, marginBottom: 28 },
  heroBtn: { background: 'linear-gradient(135deg, #3b82f6, #6366f1)', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 10, fontSize: 15, cursor: 'pointer', fontWeight: 600 },
  sectionTitle: { fontSize: 22, fontWeight: 700, color: '#e2e8f0', marginBottom: 20 },
  fieldGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 },
  fieldCard: { background: '#1a1d27', border: '1px solid', borderRadius: 12, padding: '24px 16px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, transition: 'transform 0.2s, background 0.2s' },
  fieldIcon: { fontSize: 36 },
  fieldLabel: { color: '#e2e8f0', fontWeight: 600, fontSize: 15 },
  fieldArrow: { fontSize: 20, fontWeight: 700 },
}
