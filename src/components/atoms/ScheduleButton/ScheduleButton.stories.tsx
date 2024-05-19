import { Meta, StoryObj } from "@storybook/react";
import ScheduleButton from "./ScheduleButton";

const meta: Meta<typeof ScheduleButton> = {
  title: "Atoms/ScheduleButton",
  component: ScheduleButton,
  argTypes: {
    label: {
      control: "text",
      defaultValue: "Click Me",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;

export const Default: StoryObj<typeof ScheduleButton> = {
  args: {
    label: "Schedule",
  },
};
