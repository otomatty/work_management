import { Meta, StoryObj } from "@storybook/react";
import { DropdownItem } from "./DropdownItem";

const meta: Meta<typeof DropdownItem> = {
  title: "Atoms/DropdownItem",
  component: DropdownItem,
  argTypes: {
    $isCloseButton: { control: "boolean" },
  },
};

export default meta;

export const Default: StoryObj<typeof DropdownItem> = {
  args: {
    $isCloseButton: false,
    children: "Dropdown Item",
  },
};

export const CloseButton: StoryObj<typeof DropdownItem> = {
  args: {
    $isCloseButton: true,
    children: "Close",
  },
};
