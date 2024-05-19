import { Meta, StoryObj } from "@storybook/react";
import DrumRollDatePicker from "./DrumRollDatePicker";

const meta: Meta<typeof DrumRollDatePicker> = {
  title: "Atoms/DrumRollDatePicker",
  component: DrumRollDatePicker,
  argTypes: {
    selected: { control: "date" },
    onChange: { action: "changed" },
  },
};

export default meta;

export const Default: StoryObj<typeof DrumRollDatePicker> = {
  args: {
    selected: new Date(),
    onChange: (date: Date) => console.log(date),
  },
};
