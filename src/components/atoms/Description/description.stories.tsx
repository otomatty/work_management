import { Meta, StoryObj } from "@storybook/react";
import Description from "./Description";

const meta: Meta<typeof Description> = {
  title: "Atoms/Description",
  component: Description,
  argTypes: {
    number: { control: "number" },
    text: { control: "text" },
  },
};

export default meta;

export const Default: StoryObj<typeof Description> = {
  args: {
    number: 42,
    text: "Sample text",
  },
};
