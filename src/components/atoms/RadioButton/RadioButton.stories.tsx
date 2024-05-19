import { Meta, StoryObj } from "@storybook/react";
import RadioButton from "./RadioButton";

const meta: Meta<typeof RadioButton> = {
  title: "Atoms/RadioButton",
  component: RadioButton,
  argTypes: {
    checked: {
      control: "boolean",
      defaultValue: false,
    },
    label: {
      control: "text",
      defaultValue: "Option 1",
    },
    name: {
      control: "text",
      defaultValue: "option",
    },
    value: {
      control: "text",
      defaultValue: "1",
    },
  },
};

export default meta;

export const Default: StoryObj<typeof RadioButton> = {
  args: {
    onChange: (e) => console.log(e.target.value),
  },
};
