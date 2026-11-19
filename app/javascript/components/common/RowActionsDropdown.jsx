import { MoreOutlined } from '@ant-design/icons'
import { Button, Dropdown } from 'antd'
import { useTranslation } from 'react-i18next'

const MENU_STYLE = { minWidth: 160, padding: 8 }

export default function RowActionsDropdown({ onDelete, onEdit }) {
  const { t } = useTranslation()

  return (
    <Dropdown
      menu={{
        items: [
          { key: 'edit', label: t('common.edit') },
          { danger: true, key: 'delete', label: t('common.delete') },
        ],
        onClick: ({ domEvent, key }) => {
          domEvent.stopPropagation()
          if (key === 'edit') onEdit()
          else onDelete()
        },
        style: MENU_STYLE,
      }}
      trigger={['click']}
    >
      <Button
        aria-label={t('common.moreActions')}
        icon={<MoreOutlined />}
        onClick={(event) => event.stopPropagation()}
        type="text"
      />
    </Dropdown>
  )
}
