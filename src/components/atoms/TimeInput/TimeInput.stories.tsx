import type { Meta, StoryObj } from '@storybook/react';
import TimeInput from './TimeInput';

const meta = {
  title: 'Atoms/TimeInput',
  component: TimeInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    onChange: { action: 'changed' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
  },
} satisfies Meta<typeof TimeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Time',
    onChange: (value) => console.log('Time changed to:', value),
    placeholder: 'Select time',
    value: '12:00',
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: 'Time',
    onChange: (value) => console.log('Time changed to:', value),
    placeholder: 'Select time',
    value: '',
  },
};
