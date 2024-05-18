import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CellComponent from "./AnimatedCell";

const meta = {
  title: "Atoms/AnimatedCell",
  component: CellComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CellComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Hover over me!",
  },
};

export const WithContent: Story = {
  args: {
    children: (
      <div style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
        Hover over this content!
      </div>
    ),
  },
};
