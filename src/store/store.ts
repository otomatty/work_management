import { configureStore } from "@reduxjs/toolkit";
import { WorkRecordState } from "./types";
import dateNavigationReducer from "./dateNavigationSlice";
import monthNavigationReducer from "./monthNavigationSlice";
import workRecordReducer from "./workRecordSlice";
import workHoursReducer from "./workHourSlice"; // workHoursSlice reducer imported

export interface RootState {
  workRecord: WorkRecordState;
  dateNavigation: ReturnType<typeof dateNavigationReducer>;
  monthNavigation: ReturnType<typeof monthNavigationReducer>;
  workHours: ReturnType<typeof workHoursReducer>; // workHours state added
}

export const store = configureStore({
  reducer: {
    dateNavigation: dateNavigationReducer,
    monthNavigation: monthNavigationReducer,
    workRecord: workRecordReducer,
    workHours: workHoursReducer, // workHoursReducer added to store
  },
});
