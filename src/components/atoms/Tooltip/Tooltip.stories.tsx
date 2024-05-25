import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';

const meta = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    linkText: { control: 'text' },
    href: { control: 'text' },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'This is a tooltip',
    linkText: 'Learn more',
    href: 'https://example.com',
  },
};

export const WithoutLink: Story = {
  args: {
    text: 'This is a tooltip without a link',
  },
};
