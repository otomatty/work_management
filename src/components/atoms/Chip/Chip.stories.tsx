import { Meta, StoryObj } from "@storybook/react";
import Chip from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "Atoms/Chip",
  component: Chip,
  argTypes: {
    checked: { control: "boolean" },
    label: { control: "text" },
    icon: { control: "text" },
    fontSize: { control: "text" },
  },
};

export default meta;

export const Default: StoryObj<typeof Chip> = {
  args: {
    icon: "\\sum_{i=1}^nx_i",
    label: "Example Chip",
    checked: false,
    onChange: () => console.log("Changed"),
  },
};

export const Checked: StoryObj<typeof Chip> = {
  args: {
    ...Default.args,
    checked: true,
  },
};
