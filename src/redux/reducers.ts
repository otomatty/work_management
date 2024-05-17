import {
  FETCH_SCHEDULE_REQUEST,
  FETCH_SCHEDULE_SUCCESS,
  FETCH_SCHEDULE_FAILURE,
  FETCH_WORK_RECORDS_REQUEST,
  FETCH_WORK_RECORDS_SUCCESS,
  FETCH_WORK_RECORDS_FAILURE,
  ADD_SCHEDULE_REQUEST,
  ADD_SCHEDULE_SUCCESS,
  ADD_SCHEDULE_FAILURE,
} from "./actions";

const initialState = {
  schedules: [],
  workRecords: [],
  schedule: null,
  loading: false,
  error: null,
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_SCHEDULE_REQUEST:
    case FETCH_WORK_RECORDS_REQUEST:
    case ADD_SCHEDULE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SCHEDULE_SUCCESS:
      return {
        ...state,
        loading: false,
        schedule: action.payload,
      };
    case FETCH_WORK_RECORDS_SUCCESS:
      return {
        ...state,
        loading: false,
        workRecords: action.payload,
      };
    case ADD_SCHEDULE_SUCCESS:
      return {
        ...state,
        loading: false,
        schedules: [...state.schedules, action.payload],
      };
    case FETCH_SCHEDULE_FAILURE:
    case FETCH_WORK_RECORDS_FAILURE:
    case ADD_SCHEDULE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
