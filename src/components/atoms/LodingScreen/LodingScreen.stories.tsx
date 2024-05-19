import { Meta, StoryObj } from "@storybook/react";
import LoadingScreen from "./LoadingScreen";

const meta: Meta<typeof LoadingScreen> = {
  title: "Atoms/LoadingScreen",
  component: LoadingScreen,
};

export default meta;

export const Default: StoryObj<typeof LoadingScreen> = {};
