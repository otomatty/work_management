import { dateNavigationSlice } from "./dateNavigationSlice";
import { monthNavigationSlice } from "./monthNavigationSlice";
import { StudentChangeInfo } from "../types";

// ストアの全体の状態を表す型
export interface RootState {
  monthNavigation: {
    direction: number;
  };
}

export interface WorkRecordState {
  startTime: string;
  endTime: string;
  students: StudentChangeInfo[];
  workDescription: string;
  isVisible: boolean;
}

export interface ClassroomState {
  selectedClassroom: string;
}

export interface RootState {
  dateNavigation: ReturnType<typeof dateNavigationSlice.reducer>;
  monthNavigation: ReturnType<typeof monthNavigationSlice.reducer>;
}
