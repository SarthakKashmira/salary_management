import { LogoutOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Divider, Flex, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import { AVATAR_COLORS, COLORS } from 'common/theme'
import { useShowUser } from 'hooks/user'
import { getCurrentUserId } from 'utils/auth'

const initialsOf = (firstName, lastName) => `${firstName?.charAt(0) ?? ''}${lastName?.charAt(0) ?? ''}`.toUpperCase()

export default function Profile({ isCollapsed, onLogout }) {
  const { t } = useTranslation()
  const userId = getCurrentUserId()

  // Cached by React Query after the first fetch, so reopening the sidebar
  // (or remounting it) doesn't re-request it within the session.
  const { data: user, isLoading } = useShowUser(userId)

  if (isLoading || !user) return null

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ')
  const avatarColor = AVATAR_COLORS[(Number(userId) || 0) % AVATAR_COLORS.length]

  return (
    <Card size="small" style={{ borderColor: COLORS.green, margin: 8 }} styles={{ body: { padding: 12 } }}>
      <Flex align="center" gap="small">
        <Avatar style={{ backgroundColor: avatarColor, flexShrink: 0 }}>
          {initialsOf(user.firstName, user.lastName)}
        </Avatar>
        {!isCollapsed && (
          <div className="min-w-0 flex-1">
            <Typography.Text ellipsis strong style={{ display: 'block' }}>
              {fullName}
            </Typography.Text>
            <Typography.Text ellipsis style={{ display: 'block' }} type="secondary">
              {user.email}
            </Typography.Text>
          </div>
        )}
      </Flex>
      <Divider style={{ margin: '8px 0' }} />

      <Button block icon={<LogoutOutlined />} onClick={onLogout} type="text">
        {!isCollapsed && t('sidebar.logout')}
      </Button>
    </Card>
  )
}
