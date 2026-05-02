function Skeleton({ width = '100%', height = 16, radius = 8, style = {} }) {
  return (
    <div
      className="skeleton-line"
      style={{ width, height, borderRadius: radius, ...style }}
    />
  )
}

export function DashboardSkeleton() {
  return (
    <div className="fade-in" aria-busy="true" aria-label="Loading dashboard">
      <div className="home-welcome-card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Skeleton width={72} height={72} radius={50} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Skeleton width="40%" height={20} />
            <Skeleton width="60%" height={14} />
          </div>
        </div>
      </div>
      <div className="home-stats-row" style={{ marginBottom: 32 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="home-stat-card">
            <Skeleton width={48} height={36} radius={6} style={{ marginBottom: 10 }} />
            <Skeleton width="70%" height={12} />
          </div>
        ))}
      </div>
    </div>
  )
}