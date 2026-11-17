import {
  ApartmentOutlined,
  BarChartOutlined,
  IdcardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { Button, Drawer, Grid, Layout, Menu, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import routes from 'constants/routes'

const { Sider } = Layout
const { useBreakpoint } = Grid

const NAV_ITEMS = [
  { key: routes.employees.index, labelKey: 'nav.employees', icon: <TeamOutlined /> },
  { key: routes.teamMembers.index, labelKey: 'nav.teamMembers', icon: <IdcardOutlined /> },
  { key: routes.departments.index, labelKey: 'nav.departments', icon: <ApartmentOutlined /> },
  { key: routes.salaryReports.index, labelKey: 'nav.salaryReports', icon: <BarChartOutlined /> },
]

const SIDEBAR_WIDTH = 240
const SIDEBAR_COLLAPSED_WIDTH = 72

export default function Sidebar({ isCollapsed, isMobileOpen, onCloseMobile, onToggleCollapse }) {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const screens = useBreakpoint()

  const isDesktop = Boolean(screens.lg)
  // The root path renders the employee list, so it should light up that nav item.
  const selectedKey = location.pathname === routes.root ? routes.employees.index : location.pathname

  const menuItems = NAV_ITEMS.map(({ key, labelKey, icon }) => ({ key, icon, label: t(labelKey) }))

  const handleSelect = ({ key }) => {
    navigate(key)
    onCloseMobile()
  }

  const brand = (showToggle) => (
    <div className="flex h-14 items-center gap-2 px-4">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-900 text-sm font-bold text-white">
        S
      </span>
      {!(isCollapsed && showToggle) && (
        <Typography.Text className="flex-1 truncate" strong>
          {t('app.name')}
        </Typography.Text>
      )}
      {showToggle && (
        <Button
          aria-label={isCollapsed ? t('sidebar.expand') : t('sidebar.collapse')}
          icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggleCollapse}
          size="small"
          title={isCollapsed ? t('sidebar.expand') : t('sidebar.collapse')}
          type="text"
        />
      )}
    </div>
  )

  const navigation = (
    <Menu
      items={menuItems}
      mode="inline"
      onClick={handleSelect}
      selectedKeys={[selectedKey]}
      style={{ borderInlineEnd: 'none' }}
    />
  )

  if (!isDesktop) {
    return (
      <Drawer
        closable={false}
        onClose={onCloseMobile}
        open={isMobileOpen}
        placement="left"
        size={SIDEBAR_WIDTH}
        styles={{ body: { padding: 0 } }}
        title={brand(false)}
      >
        {navigation}
      </Drawer>
    )
  }

  return (
    <Sider
      collapsed={isCollapsed}
      collapsedWidth={SIDEBAR_COLLAPSED_WIDTH}
      theme="light"
      trigger={null}
      width={SIDEBAR_WIDTH}
    >
      {brand(true)}
      {navigation}
    </Sider>
  )
}
