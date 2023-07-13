import { customFetch } from '../utils/helpers';

const GET_ALL_PRACTICE_SESSIONS = 'practiceSessions/GET_ALL_PRACTICE_SESSIONS';
const GET_SINGLE_PRACTICE_SESSION = 'practiceSessions/GET_SINGLE_PRACTICE_SESSION';
const CREATE_PRACTICE_SESSION = 'practiceSessions/CREATE_PRACTICE_SESSION';

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

//! ===== THUNKS =====
export const thunkGetAllPracticeSessions = userId => async dispatch => {
  try {
    const practiceSessions = await customFetch(`/api/users/${userId}/practiceSessions`);

    dispatch(getAllPracticeSessions(practiceSessions));

    return practiceSessions;
  } catch (error) {
    return error;
  }
};

export const thunkGetSinglePracticeSession = (userId, practiceSessionId) => async dispatch => {
  try {
    const practiceSession = await customFetch(
      `/api/users/${userId}/practiceSessions/${practiceSessionId}`
    );

    dispatch(getSinglePracticeSession(practiceSession));

    return practiceSession;
  } catch (error) {
    return error;
  }
};

export const thunkCreatePracticeSession = (userId, newPracticeSession) => async dispatch => {
  try {
    const practiceSession = await customFetch(
      `/api/users/${userId}/practiceSessions`,
      'POST',
      newPracticeSession
    );

    dispatch(createPracticeSession(practiceSession));

    return practiceSession;
  } catch (error) {
    return error;
  }
};

//! ===== REDUCER =====

const initialState = { practiceSessions: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRACTICE_SESSIONS:
      return {};
    case GET_SINGLE_PRACTICE_SESSION:
      return {};
    case CREATE_PRACTICE_SESSION:
      return {};
    default:
      return state;
  }
}
