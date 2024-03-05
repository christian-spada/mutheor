import { customFetch } from '../utils/helpers';

//! ===== ACTIONS ======
const GET_USER = 'session/GET_USER';
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const ADD_USER_GOAL = 'session/ADD_USER_GOAL';
const CLEAR_USER_GOALS = 'session/CLEAR_USER_GOALS';
const EDIT_USER_GOAL = 'session/EDIT_USER_GOAL';
const ADD_USER_INSTRUMENT = 'session/ADD_USER_INSTRUMENT';
const EDIT_USER_INSTRUMENT = 'session/EDIT_USER_INSTRUMENT';
const CLEAR_USER_INSTRUMENTS = 'session/CLEAR_USER_INSTRUMENTS';
const ADD_USER_PRACTICE_SESSION = 'session/ADD_USER_PRACTICE_SESSION';

//! ===== ACTION CREATORS ======
const getUser = user => {
  return {
    type: GET_USER,
    payload: user,
  };
};

const setUser = user => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

// GOALS
const addUserGoal = goal => {
  return {
    type: ADD_USER_GOAL,
    payload: goal,
  };
};

const editUserGoal = goal => {
  return {
    type: EDIT_USER_GOAL,
    payload: goal,
  };
};

const clearUserGoals = goalId => {
  return {
    type: CLEAR_USER_GOALS,
    payload: goalId,
  };
};

// INSTRUMENTS
const addUserInstrument = instrument => {
  return {
    type: ADD_USER_INSTRUMENT,
    payload: instrument,
  };
};

const editUserInstrument = instrument => {
  return {
    type: EDIT_USER_INSTRUMENT,
    payload: instrument,
  };
};

const clearUserInstruments = instrumentId => {
  return {
    type: CLEAR_USER_INSTRUMENTS,
    payload: instrumentId,
  };
};

// PRACTICE SESSIONS
const addUserPracticeSession = session => {
  return {
    type: ADD_USER_PRACTICE_SESSION,
    payload: session,
  };
};

//! ===== THUNKS =====
export const authenticate = () => async dispatch => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const thunkGetUser = userId => async dispatch => {
  try {
    const resData = await customFetch(`/api/users/${userId}`);

    if (resData.errors) {
      const error = resData;
      return error;
    }

    const user = resData;
    dispatch(getUser(user));
    return user;
  } catch (error) {
    return error;
  }
};

export const login = (email, password) => async dispatch => {
  try {
    const resData = await customFetch('/api/auth/login', 'POST', {
      email,
      password,
    });

    if (resData.errors) {
      const error = resData;
      return error;
    }

    const user = resData;
    dispatch(setUser(user));
    return user;
  } catch (error) {
    return error;
  }
};

export const logout = () => async dispatch => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp = newUser => async dispatch => {
  try {
    const res = await fetch('/api/auth/signup', { method: 'POST', body: newUser });

    if (res.ok) {
      const user = await res.json();
      dispatch(setUser(user));
      return user;
    } else {
      const error = await res.json();
      return error;
    }
  } catch (error) {
    return error;
  }
};

//! ===== UPDATE USER STORE DATA ONLY =====

// GOALS
export const thunkClearUserGoals = goalId => async dispatch => {
  dispatch(clearUserGoals(goalId));
};

export const thunkAddUserGoal = goal => async dispatch => {
  dispatch(addUserGoal(goal));
};

export const thunkEditUserGoal = goal => async dispatch => {
  dispatch(editUserGoal(goal));
};

// INSTRUMENTS
export const thunkAddUserInstrument = instrument => async dispatch => {
  dispatch(addUserInstrument(instrument));
};

export const thunkEditUserInstrument = instrument => async dispatch => {
  dispatch(editUserInstrument(instrument));
};

export const thunkClearUserInstruments = instrumentId => async dispatch => {
  dispatch(clearUserInstruments(instrumentId));
};

// PRACTICE SESSIONS
export const thunkAddUserPracticeSession = session => async dispatch => {
  dispatch(addUserPracticeSession(session));
};

const initialState = { user: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case GET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };

    // INSTRUMENTS
    case ADD_USER_INSTRUMENT:
      return {
        user: { ...state.user, instruments: [...state.user.instruments, action.payload] },
      };
    case EDIT_USER_INSTRUMENT:
      const updatedInstruments = state.user.instruments.map(instrument => {
        if (instrument.id === action.payload.id) {
          return action.payload;
        }
        return instrument;
      });
      return { user: { ...state.user, instruments: updatedInstruments } };
    case CLEAR_USER_INSTRUMENTS: {
      const filteredInstruments = state.user.instruments.filter(
        instrument => instrument.id !== action.payload
      );

      // Remove goals and practice sessions associated with the instrument only if they exist
      let filteredGoals;
      let filteredSessions;
      if (state.user.goals.length) {
        filteredGoals = state.user.goals.filter(goal => goal.instrument.id !== action.payload);
      }
      if (state.user.practiceSessions.length) {
        filteredSessions = state.user.practiceSessions.filter(
          session => session.instrument.id !== action.payload
        );
      }

      const newState = {
        user: { ...state.user, instruments: filteredInstruments },
      };

      if (filteredGoals) {
        newState.user.goals = filteredGoals;
      }
      if (filteredSessions) {
        newState.user.practiceSessions = filteredSessions;
      }

      return newState;
    }
    // GOALS
    case ADD_USER_GOAL:
      return { user: { ...state.user, goals: [...state.user.goals, action.payload] } };
    case EDIT_USER_GOAL:
      const updatedGoals = state.user.goals.map(goal => {
        if (goal.id === action.payload.id) {
          return action.payload;
        }
        return goal;
      });
      return { user: { ...state.user, goals: updatedGoals } };
    case CLEAR_USER_GOALS:
      const filteredGoals = state.user.goals.filter(goal => goal.id !== action.payload);
      return { user: { ...state.user, goals: filteredGoals } };

    // PRACTICE SESSIONS
    case ADD_USER_PRACTICE_SESSION:
      return {
        user: {
          ...state.user,
          practiceSessions: [...state.user.practiceSessions, action.payload],
        },
      };
    default:
      return state;
  }
}
