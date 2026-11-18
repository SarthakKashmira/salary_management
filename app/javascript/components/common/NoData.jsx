import { Empty, Flex } from 'antd'

import { COLORS } from 'common/theme'

export default function NoData({ description }) {
  return (
    <Flex align="center" className="h-full min-h-[70vh]" justify="center">
      <Empty
        description={<span style={{ color: COLORS.black }}>{description}</span>}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    </Flex>
  )
}
