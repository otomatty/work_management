import { Meta, StoryObj } from "@storybook/react";
import NoSelectionModal from "./NoSelectionModal";

const meta: Meta<typeof NoSelectionModal> = {
  title: "Atoms/NoSelectionModal",
  component: NoSelectionModal,
  argTypes: {
    isOpen: {
      control: "boolean",
      defaultValue: true,
    },
    onClose: { action: "closed" },
  },
};

export default meta;

export const Open: StoryObj<typeof NoSelectionModal> = {
  args: {
    isOpen: true,
  },
};

export const Closed: StoryObj<typeof NoSelectionModal> = {
  args: {
    isOpen: false,
  },
};
