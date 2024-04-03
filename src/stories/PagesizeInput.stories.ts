import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import PagesizeInput from '../components/PagesizeInput'

const meta = {
  title: 'Example/PagesizeInput',
  component: PagesizeInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onChange: fn() },
} satisfies Meta<typeof PagesizeInput>

export default meta
type Story = StoryObj<typeof meta>

export const UsedInProject: Story = {
  args: {
    label: 'Pagesize',
    initValue: 50,
    minValue: 1,
    maxValue: 100,
  },
}

export const NoLimits: Story = {
  args: {
    label: 'No limits',
    changeTimeoutMs: 0,
  },
}
