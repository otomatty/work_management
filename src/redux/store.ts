import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import dateNavigationReducer from "./teacher/dateNavigationSlice";
import scheduleReducer from "./teacher/scheduleSlice";
import teacherReducer from "./teacher/teacherSlice";
import workRecordsReducer from "./teacher/workRecordsSlice";

const store = configureStore({
  reducer: {
    ...rootReducer,
    dateNavigation: dateNavigationReducer,
    schedule: scheduleReducer,
    teacher: teacherReducer,
    workRecords: workRecordsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
