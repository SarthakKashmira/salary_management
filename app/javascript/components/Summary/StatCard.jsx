import { theme, Typography } from 'antd'

export default function StatCard({ label, value }) {
  const { token } = theme.useToken()

  return (
    <div style={{ background: token.colorFillTertiary, borderRadius: token.borderRadius, padding: 20 }}>
      <Typography.Text type="secondary">{label}</Typography.Text>
      <Typography.Title level={3} style={{ margin: 0, marginTop: 4 }}>
        {value}
      </Typography.Title>
    </div>
  )
}
