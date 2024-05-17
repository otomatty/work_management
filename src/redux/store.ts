import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import dateNavigationReducer from "./workRecords/dateNavigationSlice"; // 新しいスライスをインポート
import scheduleReducer from "./workRecords/scheduleSlice"; // Added scheduleReducer
import teacherReducer from "./teacherSlice"; // Added teacherReducer

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    ...rootReducer,
    dateNavigation: dateNavigationReducer, // 新しいスライスを追加
    schedule: scheduleReducer, // Added schedule slice
    teacher: teacherReducer, // Added teacher slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
