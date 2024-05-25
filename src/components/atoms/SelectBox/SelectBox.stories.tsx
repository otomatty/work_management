import type { Meta, StoryObj } from '@storybook/react';
import SelectBox from './SelectBox';

const meta = {
  title: 'Atoms/SelectBox',
  component: SelectBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  argTypes: {
    options: { control: 'object' },
    defaultValue: { control: 'text' },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof SelectBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    defaultValue: 'option1',
    onChange: (event) => console.log(event.target.value),
  },
};

export const WithDifferentDefault: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    defaultValue: 'option2',
    onChange: (event) => console.log(event.target.value),
  },
};
