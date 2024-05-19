import { Meta, StoryObj } from "@storybook/react";
import ModalSubTitle from "./ModalSubTitle";

const meta: Meta<typeof ModalSubTitle> = {
  title: "Atoms/ModalSubTitle",
  component: ModalSubTitle,
};

export default meta;

export const Default: StoryObj<typeof ModalSubTitle> = {
  args: {
    children: "Modal Subtitle Text",
  },
};
