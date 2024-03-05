import { customFetch, logger } from '../utils/helpers';

//! ===== ACTIONS ======
const GET_USER = 'session/GET_USER';
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const ADD_USER_GOAL = 'session/ADD_USER_GOAL';
const CLEAR_USER_GOALS = 'session/REMOVE_USER';

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

const addUserGoal = goal => {
  return {
    type: ADD_USER_GOAL,
    payload: goal,
  };
};

const clearUserGoals = goalId => {
  return {
    type: CLEAR_USER_GOALS,
    payload: goalId,
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

export const thunkClearUserGoals = goalId => async dispatch => {
  dispatch(clearUserGoals(goalId));
};

export const thunkAddUserGoal = goal => async dispatch => {
  dispatch(addUserGoal(goal));
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
    // GOALS
    case ADD_USER_GOAL:
      return { user: { ...state.user, goals: [...state.user.goals, action.payload] } };
    case CLEAR_USER_GOALS:
      const filteredGoals = state.user.goals.filter(goal => goal.id !== action.payload);
      return { user: { ...state.user, goals: filteredGoals } };
    default:
      return state;
  }
}
