import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import BasicSelect from '../components/BasicSelect'

const meta = {
  title: 'Example/BasicSelect',
  component: BasicSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onChange: fn() },
} satisfies Meta<typeof BasicSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Test: Story = {
  args: {
    label: 'Test',
    defaultValue: '1',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: '4' },
      { label: 'Option 5', value: '5' },
      { label: 'Option 6', value: '6' },
      { label: 'Option 7', value: '7' },
    ],
  },
}

export const Sort: Story = {
  args: {
    label: 'Sort',
    defaultValue: 'popular',
    options: [
      { label: 'Popular', value: 'popular' },
      { label: 'Activity', value: 'activity' },
      { label: 'Name', value: 'name' },
    ],
  },
}

export const Order: Story = {
  args: {
    label: 'Order',
    defaultValue: 'desc',
    options: [
      { label: 'Descending', value: 'desc' },
      { label: 'Ascending', value: 'asc' },
    ],
  },
}
