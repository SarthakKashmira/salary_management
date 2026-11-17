import { Flex, Spin } from 'antd'

export default function Spinner({ size = 'large' }) {
  return (
    <Flex align="center" className="h-full min-h-[70vh]" justify="center">
      <Spin size={size} />
    </Flex>
  )
}
