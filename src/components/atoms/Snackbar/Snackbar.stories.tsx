import type { Meta, StoryObj } from '@storybook/react';
import Snackbar from './Snackbar';

const meta = {
  title: 'Atoms/Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
    isVisible: { control: 'boolean' },
    onClose: { action: 'closed' },
  },
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'This is a snackbar message',
    isVisible: true,
    onClose: () => console.log('Snackbar closed'),
  },
};

export const Hidden: Story = {
  args: {
    message: 'This is a snackbar message',
    isVisible: false,
    onClose: () => console.log('Snackbar closed'),
  },
};
