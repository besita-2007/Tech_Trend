import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#10b981']

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

export default function FieldPage({ data, onBack }) {
  const [activeStage, setActiveStage] = useState(null)

  const fieldIcons = {
    'data science': '🤖', 'web development': '🌐', 'devops': '⚙️',
    'mobile': '📱', 'cybersecurity': '🔒', 'game development': '🎮', 'embedded': '🔧'
  }

  return (
    <div>
      <button style={s.backBtn} onClick={onBack}>← Back to Fields</button>

      <div style={s.header}>
        <span style={s.headerIcon}>{fieldIcons[data.field] || '💻'}</span>
        <div>
          <h1 style={s.title}>{data.field.replace(/\b\w/g, c => c.toUpperCase())}</h1>
          <p style={s.desc}>{data.description}</p>
        </div>
      </div>

      <div style={s.grid2}>
        {data.top_languages?.length > 0 && (
          <MiniChart title="🔤 Top Languages" data={data.top_languages} color="#3b82f6" />
        )}
        {data.top_databases?.length > 0 && (
          <MiniChart title="🗄️ Top Databases" data={data.top_databases} color="#10b981" />
        )}
        {data.top_frameworks?.length > 0 && (
          <MiniChart title="🧩 Top Frameworks" data={data.top_frameworks} color="#8b5cf6" />
        )}
        {data.top_tools?.length > 0 && (
          <MiniChart title="🛠️ Top Dev Tools" data={data.top_tools} color="#f59e0b" />
        )}
      </div>

      <div style={s.roadmapSection}>
        <h2 style={s.roadmapTitle}>🗺️ Learning Roadmap</h2>
        <p style={s.roadmapSub}>Click a stage to see details</p>
        <div style={s.stagesRow}>
          {data.roadmap.map((step, i) => (
            <div key={step.stage} style={s.stageWrapper}>
              {i > 0 && <div style={s.connector} />}
              <button
                style={{ ...s.stageBtn, ...(activeStage === step.stage ? s.stageBtnActive : {}) }}
                onClick={() => setActiveStage(activeStage === step.stage ? null : step.stage)}
              >
                <span style={s.stageNum}>{step.stage}</span>
                <span style={s.stageTopic}>{step.topic}</span>
              </button>
            </div>
          ))}
        </div>

        {activeStage && (() => {
          const step = data.roadmap.find(s => s.stage === activeStage)
          return (
            <div style={s.stageDetail}>
              <h3 style={s.detailTitle}>Stage {step.stage}: {step.topic}</h3>
              <div style={s.detailGrid}>
                <div>
                  <h4 style={s.detailLabel}>🎯 Skills to Learn</h4>
                  <div style={s.tagRow}>
                    {step.skills.map(skill => (
                      <span key={skill} style={s.skillTag}>{skill}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 style={s.detailLabel}>📚 Resources</h4>
                  <ul style={s.resourceList}>
                    {step.resources.map(r => (
                      <li key={r} style={s.resourceItem}>📖 {r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        })()}
      </div>
    </div>
  )
}

function MiniChart({ title, data, color }) {
  return (
    <div style={s.card}>
      <h3 style={s.cardTitle}>{title}</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" margin={{ left: 8 }}>
          <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} />
          <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} width={100} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" name="Developers" radius={[0, 4, 4, 0]}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

const s = {
  backBtn: { background: 'transparent', border: '1px solid #3b4268', color: '#94a3b8', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', marginBottom: 24, fontSize: 14 },
  header: { display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 32, background: '#1a1d27', border: '1px solid #2d3148', borderRadius: 14, padding: 24 },
  headerIcon: { fontSize: 52 },
  title: { fontSize: 30, fontWeight: 800, color: '#e2e8f0', marginBottom: 8, textTransform: 'capitalize' },
  desc: { color: '#94a3b8', lineHeight: 1.6, maxWidth: 700 },
  grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 20, marginBottom: 32 },
  card: { background: '#1a1d27', border: '1px solid #2d3148', borderRadius: 14, padding: 20 },
  cardTitle: { fontSize: 15, fontWeight: 700, color: '#e2e8f0', marginBottom: 14 },
  roadmapSection: { background: '#1a1d27', border: '1px solid #2d3148', borderRadius: 14, padding: 28 },
  roadmapTitle: { fontSize: 22, fontWeight: 700, color: '#e2e8f0', marginBottom: 6 },
  roadmapSub: { color: '#64748b', fontSize: 13, marginBottom: 24 },
  stagesRow: { display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0, marginBottom: 24 },
  stageWrapper: { display: 'flex', alignItems: 'center' },
  connector: { width: 24, height: 2, background: '#3b4268', flexShrink: 0 },
  stageBtn: { background: '#0f1117', border: '2px solid #3b4268', borderRadius: 10, padding: '12px 16px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 100, transition: 'all 0.2s' },
  stageBtnActive: { border: '2px solid #3b82f6', background: '#1e2a4a' },
  stageNum: { width: 28, height: 28, borderRadius: '50%', background: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 },
  stageTopic: { color: '#94a3b8', fontSize: 11, textAlign: 'center', maxWidth: 90 },
  stageDetail: { background: '#0f1117', border: '1px solid #3b4268', borderRadius: 12, padding: 24 },
  detailTitle: { fontSize: 18, fontWeight: 700, color: '#e2e8f0', marginBottom: 20 },
  detailGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 },
  detailLabel: { fontSize: 13, fontWeight: 600, color: '#64748b', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 },
  tagRow: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  skillTag: { background: '#1e2a4a', border: '1px solid #3b82f6', color: '#93c5fd', padding: '4px 12px', borderRadius: 20, fontSize: 13 },
  resourceList: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 },
  resourceItem: { color: '#94a3b8', fontSize: 14, padding: '6px 10px', background: '#1a1d27', borderRadius: 6 },
}
