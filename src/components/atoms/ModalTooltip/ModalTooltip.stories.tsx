import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ModalTooltip from "./ModalTooltip";

const meta: Meta<typeof ModalTooltip> = {
  title: "Atoms/ModalTooltip",
  component: ModalTooltip,
};

export default meta;

export const Default: StoryObj<typeof ModalTooltip> = {
  args: {
    children: <div>Sample content inside the modal</div>,
  },
};
