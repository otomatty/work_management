import { Meta, StoryObj } from "@storybook/react";
import Checkbox from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  argTypes: {
    checked: { control: "boolean" },
    className: { control: "text" },
  },
};

export default meta;

export const Default: StoryObj<typeof Checkbox> = {
  args: {
    checked: false,
  },
};

export const Checked: StoryObj<typeof Checkbox> = {
  args: {
    checked: true,
  },
};
