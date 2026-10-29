import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, CartesianGrid } from 'recharts'

const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#10b981', '#06b6d4', '#0ea5e9']

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#1e2235', border: '1px solid #3b4268', borderRadius: 8, padding: '10px 14px' }}>
      <p style={{ color: '#94a3b8', marginBottom: 4, fontSize: 13 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontWeight: 600 }}>{p.name}: {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}</p>
      ))}
    </div>
  )
}

export default function HomePage({ trends, onSelectField }) {
  const fields = [
    { id: 'data science', label: 'Data Science', icon: '🤖' },
    { id: 'web development', label: 'Web Dev', icon: '🌐' },
    { id: 'devops', label: 'DevOps', icon: '⚙️' },
    { id: 'mobile', label: 'Mobile', icon: '📱' },
    { id: 'cybersecurity', label: 'Security', icon: '🔒' },
    { id: 'game development', label: 'Game Dev', icon: '🎮' },
  ]

  return (
    <div>
      <h1 style={s.pageTitle}>📊 Global Tech Trends 2024</h1>
      <p style={s.pageSub}>Insights from the Stack Overflow Developer Survey</p>

      <div style={s.grid2}>
        <ChartCard title="🔥 Most Used Languages" subtitle="By total developer usage">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={trends.overall.slice(0, 10)} layout="vertical" margin={{ left: 10 }}>
              <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} width={90} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {trends.overall.slice(0, 10).map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="📈 Trending Languages" subtitle="High desire-to-learn ratio (want / have)">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={trends.trending.slice(0, 10)} layout="vertical" margin={{ left: 10 }}>
              <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} width={90} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="trend_score" name="Trend Score" radius={[0, 4, 4, 0]}>
                {trends.trending.slice(0, 10).map((_, i) => <Cell key={i} fill={COLORS[(i + 4) % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div style={s.grid2}>
        <ChartCard title="🤖 Most Used AI Models" subtitle="AI tools developers are working with">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={trends.aiTools.slice(0, 8)} layout="vertical" margin={{ left: 10 }}>
              <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} width={160} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Developers" radius={[0, 4, 4, 0]}>
                {trends.aiTools.slice(0, 8).map((_, i) => <Cell key={i} fill={COLORS[(i + 2) % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="👨‍💻 Developer Types" subtitle="Most common developer roles">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={trends.devTypes.slice(0, 8)} layout="vertical" margin={{ left: 10 }}>
              <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} width={160} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Developers" radius={[0, 4, 4, 0]}>
                {trends.devTypes.slice(0, 8).map((_, i) => <Cell key={i} fill={COLORS[(i + 6) % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <h2 style={{ ...s.pageTitle, fontSize: 22, marginTop: 40 }}>🗺️ Explore a Field</h2>
      <div style={s.fieldRow}>
        {fields.map(f => (
          <button key={f.id} style={s.fieldBtn} onClick={() => onSelectField(f.id)}>
            {f.icon} {f.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function ChartCard({ title, subtitle, children }) {
  return (
    <div style={s.card}>
      <h3 style={s.cardTitle}>{title}</h3>
      {subtitle && <p style={s.cardSub}>{subtitle}</p>}
      {children}
    </div>
  )
}

const s = {
  pageTitle: { fontSize: 28, fontWeight: 800, color: '#e2e8f0', marginBottom: 6 },
  pageSub: { color: '#64748b', marginBottom: 32 },
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: 20, marginBottom: 20 },
  card: { background: '#1a1d27', border: '1px solid #2d3148', borderRadius: 14, padding: 24 },
  cardTitle: { fontSize: 16, fontWeight: 700, color: '#e2e8f0', marginBottom: 4 },
  cardSub: { fontSize: 12, color: '#64748b', marginBottom: 16 },
  fieldRow: { display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 16 },
  fieldBtn: { background: '#1a1d27', border: '1px solid #3b4268', color: '#94a3b8', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600 },
}
