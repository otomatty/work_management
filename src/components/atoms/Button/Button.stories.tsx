import { Meta, StoryObj } from "@storybook/react";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
    label: { control: "text" },
    disabled: { control: "boolean" },
    onClick: { action: "clicked" },
  },
};

export default meta;

export const Default: StoryObj<typeof Button> = {
  args: {
    label: "Click Me",
    backgroundColor: "#007bff",
    disabled: false,
    icon: faCoffee,
  },
};
