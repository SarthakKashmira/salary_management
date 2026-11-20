import {
  ApartmentOutlined,
  DashboardOutlined,
  IdcardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { Button, Drawer, Flex, Grid, Layout, Menu, theme, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import logo from 'assets/A-logo.webp'
import routes from 'constants/routes'
import { clearSession } from 'utils/auth'

import Profile from './Profile'

const { Sider } = Layout
const { useBreakpoint } = Grid
const { useToken } = theme

const NAV_ITEMS = [
  { key: routes.employees.index, labelKey: 'nav.employees', Icon: TeamOutlined },
  { key: routes.teamMembers.index, labelKey: 'nav.teamMembers', Icon: IdcardOutlined },
  { key: routes.departments.index, labelKey: 'nav.departments', Icon: ApartmentOutlined },
  { key: routes.summary.index, labelKey: 'nav.summary', Icon: DashboardOutlined },
]

const SIDEBAR_WIDTH = 240
const SIDEBAR_COLLAPSED_WIDTH = 72

export default function Sidebar({ isCollapsed, isMobileOpen, onCloseMobile, onToggleCollapse }) {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const screens = useBreakpoint()
  const { token } = useToken()

  const isDesktop = Boolean(screens.lg)
  // The root path renders the employee list, so it should light up that nav item.
  const selectedKey = location.pathname === routes.root ? routes.employees.index : location.pathname

  const menuItems = NAV_ITEMS.map(({ key, labelKey, Icon }) => ({
    key,
    icon: <Icon style={{ color: token.colorPrimary }} />,
    label: t(labelKey),
  }))

  const handleSelect = ({ key }) => {
    navigate(key)
    onCloseMobile()
  }

  const handleLogout = () => {
    clearSession()
    navigate(routes.login)
    onCloseMobile()
  }

  const brand = (showToggle) => (
    <div className="flex min-h-14 items-center gap-2 px-4 py-4">
      <img
        alt={t('app.name')}
        className="h-8 w-8 shrink-0 object-contain"
        src={logo}
        style={{ borderRadius: token.borderRadius }}
      />
      {!(isCollapsed && showToggle) && (
        <Typography.Text className="min-w-0 flex-1 leading-tight" strong>
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
        footer={<Profile isCollapsed={false} onLogout={handleLogout} />}
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
      <Flex className="h-full" justify="space-between" vertical>
        <div>
          {brand(true)}
          {navigation}
        </div>
        <Profile isCollapsed={isCollapsed} onLogout={handleLogout} />
      </Flex>
    </Sider>
  )
}
