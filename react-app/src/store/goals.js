import { customFetch } from '../utils/helpers';

const GET_ALL_GOALS = 'goals/GET_ALL_';
const GET_SINGLE_GOAL = 'goals/GET_SINGLE_GOAL';
const CREATE_GOAL = 'goals/CREATE_GOAL';
const EDIT_GOAL = 'goals/EDIT_GOAL';
const DELETE_GOAL = 'goals/DELETE_GOAL';

//! ===== ACTION CREATORS =====
const getAllGoals = goals => {
  return {
    type: GET_ALL_GOALS,
    payload: goals,
  };
};

const getSingleGoal = goal => {
  return {
    type: GET_SINGLE_GOAL,
    payload: goal,
  };
};

const createGoal = goal => {
  return {
    type: CREATE_GOAL,
    payload: goal,
  };
};

const editGoal = goal => {
  return {
    type: EDIT_GOAL,
    payload: goal,
  };
};

const deleteGoal = goalId => {
  return {
    type: DELETE_GOAL,
    payload: goalId,
  };
};

//! ===== THUNKS =====
export const thunkGetAllGoals = userId => async dispatch => {
  try {
    const resData = await customFetch(`/api/users/${userId}/goals`);

    if (resData.errors) {
      const error = resData;
      return error;
    }

    const goals = resData;
    dispatch(getAllGoals(goals));

    return goals;
  } catch (error) {
    return error;
  }
};

export const thunkGetSingleGoal = (userId, goalId) => async dispatch => {
  try {
    const resData = await customFetch(`/api/users/${userId}/goals/${goalId}`);

    if (resData.errors) {
      const error = resData;
      return error;
    }

    const goal = resData;
    dispatch(getSingleGoal(goal));

    return goal;
  } catch (error) {
    return error;
  }
};

export const thunkCreateGoal = (userId, newGoal) => async dispatch => {
  try {
    const resData = await customFetch(`/api/users/${userId}/goals`, 'POST', newGoal);

    if (resData.errors) {
      const error = resData;
      return error;
    }

    const goal = resData;
    dispatch(createGoal(goal));

    return goal;
  } catch (error) {
    return error;
  }
};

export const thunkEditGoal = (userId, updatedGoal) => async dispatch => {
  try {
    const resData = await customFetch(`/api/users/${userId}/goals/${updatedGoal.id}`);

    if (resData.errors) {
      const error = resData;
      return error;
    }

    const goal = resData;
    dispatch(editGoal(goal));

    return goal;
  } catch (error) {
    return error;
  }
};

export const thunkDeleteGoal = (userId, goalToDelete) => async dispatch => {
  try {
    const resData = await customFetch(`/api/users/${userId}/goals/${goalToDelete.id}`);

    if (resData.errors) {
      const error = resData;
      return error;
    }

    const message = resData;
    dispatch(deleteGoal(goalToDelete.id));

    return message;
  } catch (error) {
    return error;
  }
};

//! ===== REDUCER =====

const initialState = { goals: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_GOALS:
      return {};
    case GET_SINGLE_GOAL:
      return {};
    case EDIT_GOAL:
      return {};
    case DELETE_GOAL:
      return {};
    default:
      return state;
  }
}
