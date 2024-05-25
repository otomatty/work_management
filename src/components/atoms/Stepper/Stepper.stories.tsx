import type { Meta, StoryObj } from '@storybook/react';
import Stepper from './Stepper';

const meta = {
  title: 'Atoms/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    initialValue: { control: 'number' },
    onValueChange: { action: 'valueChanged' },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initialValue: 0,
    onValueChange: (newValue) => console.log('Value changed to:', newValue),
  },
};

export const WithInitialValue: Story = {
  args: {
    initialValue: 5,
    onValueChange: (newValue) => console.log('Value changed to:', newValue),
  },
};
