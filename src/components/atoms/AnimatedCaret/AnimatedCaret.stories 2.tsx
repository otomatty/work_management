import type { Meta, StoryObj } from "@storybook/react";
import AnimatedCaret from "./AnimatedCaret";

const meta = {
  title: "Atoms/AnimatedCaret",
  component: AnimatedCaret,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: { control: "boolean" },
  },
} satisfies Meta<typeof AnimatedCaret>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: false,
  },
};

export const Open: Story = {
  args: {
    isOpen: true,
  },
};
