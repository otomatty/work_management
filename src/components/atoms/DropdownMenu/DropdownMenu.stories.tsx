import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from "./DropdownMenu";

const meta: Meta<typeof DropdownMenu> = {
  title: "Atoms/DropdownMenu",
  component: DropdownMenu,
};

export default meta;

export const Default: StoryObj<typeof DropdownMenu> = {
  args: {
    children: (
      <div>
        <p>Menu Item 1</p>
        <p>Menu Item 2</p>
        <p>Menu Item 3</p>
      </div>
    ),
  },
};
