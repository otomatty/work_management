import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../store";
import {
  getTeachers,
  addTeacher,
  deleteTeacher,
} from "../../services/teachers/teachersService";
import { Teacher } from "../../types";

interface TeacherState {
  teacherId: string;
  teachers: Teacher[];
  loading: boolean;
  error: string | null;
}

const initialState: TeacherState = {
  teacherId: "",
  teachers: [],
  loading: false,
  error: null,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    fetchTeachersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTeachersSuccess(state, action: PayloadAction<Teacher[]>) {
      state.teachers = action.payload;
      state.loading = false;
    },
    fetchTeachersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addTeacherSuccess(state, action: PayloadAction<Teacher>) {
      state.teachers.push(action.payload);
    },
    deleteTeacherSuccess(state, action: PayloadAction<string>) {
      state.teachers = state.teachers.filter(
        (teacher) => teacher.id !== action.payload
      );
    },
    setTeacherId(state, action: PayloadAction<string>) {
      state.teacherId = action.payload;
    },
  },
});

export const {
  fetchTeachersStart,
  fetchTeachersSuccess,
  fetchTeachersFailure,
  addTeacherSuccess,
  deleteTeacherSuccess,
  setTeacherId,
} = teacherSlice.actions;

export const fetchTeachers = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchTeachersStart());
    const teachers = await getTeachers();
    dispatch(fetchTeachersSuccess(teachers));
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    dispatch(fetchTeachersFailure(errorMessage));
  }
};

export const addNewTeacher =
  (name: string): AppThunk =>
  async (dispatch) => {
    try {
      const newTeacher = await addTeacher(name);
      dispatch(addTeacherSuccess(newTeacher));
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(fetchTeachersFailure(errorMessage));
    }
  };

export const removeTeacher =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      await deleteTeacher(id);
      dispatch(deleteTeacherSuccess(id));
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(fetchTeachersFailure(errorMessage));
    }
  };

export default teacherSlice.reducer;
