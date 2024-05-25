import type { Meta, StoryObj } from '@storybook/react';
import StyledButton from './StyledButton';

const meta = {
  title: 'Atoms/StyledButton',
  component: StyledButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof StyledButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Click Me',
    onClick: () => console.log('Button clicked'),
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Click Me',
    onClick: () => console.log('Button clicked'),
    disabled: true,
  },
};
