import { customFetch } from '../utils/helpers';

const GET_ALL_ACHIEVEMENTS = 'achievements/GET_ALL_ACHIEVEMENTS';
const CREATE_ACHIEVEMENT = 'achievements/CREATE_ACHIEVEMENT';

//! ===== ACTION CREATORS =====
const getAllAchievements = achievements => {
  return {
    type: GET_ALL_ACHIEVEMENTS,
    payload: achievements,
  };
};

const createAchievement = achievement => {
  return {
    type: CREATE_ACHIEVEMENT,
    payload: achievement,
  };
};

//! ===== THUNKS =====
export const thunkGetAllAchievements = userId => async dispatch => {
  try {
    const achievements = await customFetch(`/api/users/${userId}/achievements`);

    dispatch(getAllAchievements(achievements));

    return achievements;
  } catch (error) {
    return error;
  }
};

export const thunkCreateAchievement = (userId, newAchievement) => async dispatch => {
  try {
    const achievement = await customFetch(
      `/api/users/${userId}/achievements`,
      'POST',
      newAchievement
    );

    dispatch(createAchievement(achievement));

    return achievement;
  } catch (error) {
    return error;
  }
};

//! ===== REDUCER =====
const initialState = { achievements: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ACHIEVEMENTS:
      return {};
    case CREATE_ACHIEVEMENT:
      return {};
    default:
      return state;
  }
}
