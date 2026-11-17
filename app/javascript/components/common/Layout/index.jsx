import { useState } from 'react'
import { MenuOutlined } from '@ant-design/icons'
import { Button, Grid, Layout as AntLayout, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

import Sidebar from './Sidebar'

const { Content, Header } = AntLayout
const { useBreakpoint } = Grid

export default function Layout() {
  const { t } = useTranslation()
  const screens = useBreakpoint()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const isDesktop = Boolean(screens.lg)

  return (
    <AntLayout hasSider={isDesktop} style={{ minHeight: '100vh' }}>
      <Sidebar
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
      />

      <AntLayout>
        {!isDesktop && (
          <Header className="flex items-center gap-3 px-4" style={{ background: '#fff', paddingInline: 16 }}>
            <Button
              aria-label={t('sidebar.open')}
              icon={<MenuOutlined />}
              onClick={() => setIsMobileOpen(true)}
              type="text"
            />
            <Typography.Text strong>{t('app.name')}</Typography.Text>
          </Header>
        )}

        <Content className="p-4 sm:p-6">
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  )
}
