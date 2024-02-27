import { customFetch, normalizeData } from '../utils/helpers';

const GET_ALL_PRACTICE_SESSIONS = 'practiceSessions/GET_ALL_PRACTICE_SESSIONS';
const GET_SINGLE_PRACTICE_SESSION = 'practiceSessions/GET_SINGLE_PRACTICE_SESSION';
const CREATE_PRACTICE_SESSION = 'practiceSessions/CREATE_PRACTICE_SESSION';
const CLEAR_PRACTICE_SESSIONS = 'practiceSessions/CLEAR_PRACTICE_SESSIONS';

//! ===== ACTION CREATORS =====
const getAllPracticeSessions = practiceSessions => {
  return {
    type: GET_ALL_PRACTICE_SESSIONS,
    payload: practiceSessions,
  };
};

const getSinglePracticeSession = practiceSession => {
  return {
    type: GET_SINGLE_PRACTICE_SESSION,
    payload: practiceSession,
  };
};

const createPracticeSession = practiceSession => {
  return {
    type: CREATE_PRACTICE_SESSION,
    payload: practiceSession,
  };
};

const clearPracticeSessions = instrumentId => {
  return {
    type: CLEAR_PRACTICE_SESSIONS,
    payload: instrumentId,
  };
};

//! ===== THUNKS =====
export const thunkGetAllPracticeSessions = userId => async dispatch => {
  try {
    const resData = await customFetch(`/api/users/${userId}/sessions`);

    if (resData.errors) {
      const error = resData;
      return error;
    }

    const practiceSessions = resData;
    dispatch(getAllPracticeSessions(practiceSessions));
    return practiceSessions;
  } catch (error) {
    return error;
  }
};

export const thunkGetSinglePracticeSession = (userId, practiceSessionId) => async dispatch => {
  try {
    const resData = await customFetch(`/api/users/${userId}/sessions/${practiceSessionId}`);

    if (resData.errors) {
      const error = resData;
      return error;
    }

    const practiceSession = resData;
    dispatch(getSinglePracticeSession(practiceSession));
    return practiceSession;
  } catch (error) {
    return error;
  }
};

export const thunkCreatePracticeSession = (userId, newPracticeSession) => async dispatch => {
  try {
    const resData = await customFetch(
      `/api/users/${userId}/sessions`,
      'POST',
      newPracticeSession
    );

    if (resData.errors) {
      const error = resData;
      return error;
    }

    const practiceSession = resData;
    dispatch(createPracticeSession(practiceSession));
    return practiceSession;
  } catch (error) {
    return error;
  }
};

export const thunkClearPracticeSessions = instrumentId => async dispatch => {
  dispatch(clearPracticeSessions(instrumentId));
};

//! ===== REDUCER =====

const initialState = { allPracticeSessions: {}, singlePracticeSession: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRACTICE_SESSIONS:
      return {
        ...state,
        allPracticeSessions: normalizeData(action.payload.practiceSessions),
      };
    case GET_SINGLE_PRACTICE_SESSION:
      return {
        ...state,
        singlePracticeSession: action.payload,
      };
    case CREATE_PRACTICE_SESSION:
      return {
        ...state,
        allPracticeSessions: {
          ...state.allPracticeSessions,
          [action.payload.id]: action.payload,
        },
        singlePracticeSession: action.payload,
      };
    case CLEAR_PRACTICE_SESSIONS:
      const filteredSessionsArr = Object.values(state.allPracticeSessions).filter(({ id }) => {
        const instrumentId = state.allPracticeSessions[id].instrument.id;
        return instrumentId !== action.payload;
      });
      const filteredSessions = normalizeData(filteredSessionsArr);

      if (state.singlePracticeSession.instrument?.id === action.payload) {
        return {
          ...state,
          allPracticeSessions: filteredSessions,
          singlePracticeSession: {},
        };
      } else {
        return {
          ...state,
          allPracticeSessions: filteredSessions,
        };
      }

    default:
      return state;
  }
}
