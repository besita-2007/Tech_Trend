import { useEffect, useState } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const API = 'http://localhost:8000'
const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#10b981']

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#1e2235', border: '1px solid #3b4268', borderRadius: 8, padding: '10px 14px' }}>
      <p style={{ color: '#94a3b8', marginBottom: 4, fontSize: 13 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontWeight: 600 }}>{p.name}: {p.value?.toLocaleString()}</p>
      ))}
    </div>
  )
}

export default function EDAPanel() {
  const [eda, setEda] = useState(null)
  const [salary, setSalary] = useState([])
  const [aiAdoption, setAiAdoption] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      axios.get(`${API}/eda`),
      axios.get(`${API}/eda/salary-by-experience`),
      axios.get(`${API}/eda/ai-adoption-by-experience`),
    ]).then(([edaRes, salRes, aiRes]) => {
      setEda(edaRes.data)
      setSalary(salRes.data.data)
      setAiAdoption(aiRes.data.data)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) return <div style={s.loading}>Loading EDA insights...</div>
  if (!eda) return null

  const statCards = [
    { label: 'Total Respondents', value: eda.total_rows?.toLocaleString(), icon: '👥' },
    { label: 'Avg Experience', value: `${eda.avg_years_experience} yrs`, icon: '📅' },
    { label: 'Avg Salary (USD)', value: `$${Number(eda.avg_salary_usd)?.toLocaleString()}`, icon: '💰' },
    { label: 'AI Adoption Rate', value: `${eda.ai_adoption_rate}%`, icon: '🤖' },
    { label: 'Avg Languages Known', value: eda.avg_languages_known, icon: '🔤' },
    { label: 'Professional Devs', value: `${eda.professional_pct}%`, icon: '💻' },
  ]

  const expDist = eda.experience_distribution
    ? Object.entries(eda.experience_distribution)
        .filter(([k]) => k !== 'Unknown')
        .map(([name, count]) => ({ name, count }))
    : []

  const topCountries = eda.top_countries
    ? Object.entries(eda.top_countries).slice(0, 8).map(([name, count]) => ({ name, count }))
    : []

  return (
    <div>
      <h2 style={s.title}>🔬 Data Science Pipeline Insights</h2>
      <p style={s.sub}>Cleaned & engineered from {eda.total_rows?.toLocaleString()} survey responses</p>

      <div style={s.pipelineSteps}>
        {['1. Load', '2. Inspect', '3. Clean', '4. Feature Engineering', '5. EDA', '6. Serve API'].map((step, i) => (
          <div key={i} style={s.pipelineStep}>
            <span style={s.pipelineDot} />
            <span style={s.pipelineLabel}>{step}</span>
            {i < 5 && <span style={s.pipelineArrow}>→</span>}
          </div>
        ))}
      </div>

      <div style={s.statGrid}>
        {statCards.map(c => (
          <div key={c.label} style={s.statCard}>
            <span style={s.statIcon}>{c.icon}</span>
            <span style={s.statValue}>{c.value}</span>
            <span style={s.statLabel}>{c.label}</span>
          </div>
        ))}
      </div>

      <div style={s.grid2}>
        {salary.length > 0 && (
          <div style={s.card}>
            <h3 style={s.cardTitle}>💰 Median Salary by Experience (USD)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={salary}>
                <XAxis dataKey="level" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="median_salary" name="Median Salary" radius={[4, 4, 0, 0]}>
                  {salary.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {aiAdoption.length > 0 && (
          <div style={s.card}>
            <h3 style={s.cardTitle}>🤖 AI Adoption Rate by Experience (%)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={aiAdoption}>
                <XAxis dataKey="level" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} tickFormatter={v => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="ai_adoption_pct" name="AI Adoption %" radius={[4, 4, 0, 0]}>
                  {aiAdoption.map((_, i) => <Cell key={i} fill={COLORS[(i + 2) % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {expDist.length > 0 && (
          <div style={s.card}>
            <h3 style={s.cardTitle}>📅 Experience Level Distribution</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={expDist}>
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Developers" radius={[4, 4, 0, 0]}>
                  {expDist.map((_, i) => <Cell key={i} fill={COLORS[(i + 1) % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {topCountries.length > 0 && (
          <div style={s.card}>
            <h3 style={s.cardTitle}>🌍 Top Countries by Respondents</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={topCountries} layout="vertical" margin={{ left: 8 }}>
                <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} width={130} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Respondents" radius={[0, 4, 4, 0]}>
                  {topCountries.map((_, i) => <Cell key={i} fill={COLORS[(i + 3) % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  )
}

const s = {
  loading: { color: '#64748b', padding: 40, textAlign: 'center' },
  title: { fontSize: 24, fontWeight: 800, color: '#e2e8f0', marginBottom: 6 },
  sub: { color: '#64748b', marginBottom: 24 },
  pipelineSteps: { display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4, marginBottom: 28, background: '#1a1d27', border: '1px solid #2d3148', borderRadius: 10, padding: '14px 20px' },
  pipelineStep: { display: 'flex', alignItems: 'center', gap: 6 },
  pipelineDot: { width: 8, height: 8, borderRadius: '50%', background: '#3b82f6' },
  pipelineLabel: { color: '#94a3b8', fontSize: 13, fontWeight: 600 },
  pipelineArrow: { color: '#3b4268', fontSize: 16, margin: '0 4px' },
  statGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14, marginBottom: 24 },
  statCard: { background: '#1a1d27', border: '1px solid #2d3148', borderRadius: 12, padding: '18px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 },
  statIcon: { fontSize: 26 },
  statValue: { fontSize: 22, fontWeight: 800, color: '#3b82f6' },
  statLabel: { fontSize: 12, color: '#64748b', textAlign: 'center' },
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 20 },
  card: { background: '#1a1d27', border: '1px solid #2d3148', borderRadius: 14, padding: 20 },
  cardTitle: { fontSize: 15, fontWeight: 700, color: '#e2e8f0', marginBottom: 14 },
}
