import { customFetch, normalizeData } from '../utils/helpers';

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
    const resData = await customFetch(
      `/api/users/${userId}/goals/${updatedGoal.id}`,
      'PUT',
      updatedGoal
    );

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
    const resData = await customFetch(
      `/api/users/${userId}/goals/${goalToDelete.id}`,
      'DELETE'
    );

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

const initialState = { allGoals: {}, singleGoal: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_GOALS:
      return {
        ...state,
        allGoals: normalizeData(action.payload.goals),
      };
    case GET_SINGLE_GOAL:
      return {
        ...state,
        singleGoal: action.payload,
      };
    case CREATE_GOAL:
      return {
        ...state,
        allGoals: { ...state.allGoals, [action.payload.id]: action.payload },
        singleGoal: action.payload,
      };
    case EDIT_GOAL:
      return {
        ...state,
        allGoals: { ...state.allGoals, [action.payload.id]: action.payload },
        singleGoal: action.payload,
      };
    case DELETE_GOAL:
      const newState = {
        ...state,
        allGoals: { ...state.allGoals },
        singleGoal: {},
      };
      delete newState.allGoals[action.payload];
      return newState;
    default:
      return state;
  }
}
