import type { Meta, StoryObj } from '@storybook/react';
import TimeFormatToggle from './TimeFormatToggle';

const meta = {
  title: 'Atoms/TimeFormatToggle',
  component: TimeFormatToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isChecked: { control: 'boolean' },
    onToggle: { action: 'toggled' },
  },
} satisfies Meta<typeof TimeFormatToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isChecked: false,
    onToggle: () => console.log('Toggled'),
  },
};

export const Checked: Story = {
  args: {
    isChecked: true,
    onToggle: () => console.log('Toggled'),
  },
};
