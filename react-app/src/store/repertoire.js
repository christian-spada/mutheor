import { customFetch } from '../utils/helpers';

const GET_ALL_REPERTOIRE = 'repertoire/GET_ALL_REPERTOIRE';
const CREATE_REPERTOIRE = 'repertoire/CREATE_REPERTOIRE';

//! ===== ACTION CREATORS =====
const getAllRepertoire = repertoire => {
  return {
    type: GET_ALL_REPERTOIRE,
    payload: repertoire,
  };
};

const createRepertoire = repertoire => {
  return {
    type: CREATE_REPERTOIRE,
    payload: repertoire,
  };
};

//! ===== THUNKS =====
export const thunkGetAllRepertoire = userId => async dispatch => {
  try {
    const resData = await customFetch(`/api/users/${userId}/repertoire`);

    if (resData.errors) {
      const error = resData;
      return error;
    }

    const repertoire = resData;
    dispatch(getAllRepertoire(repertoire));

    return repertoire;
  } catch (error) {
    return error;
  }
};

export const thunkCreateRepertoire = (userId, newRepertoire) => async dispatch => {
  try {
    const resData = await customFetch(
      `/api/users/${userId}/repertoire`,
      'POST',
      newRepertoire
    );

    if (resData.errors) {
      const error = resData;
      return error;
    }

    const repertoire = resData;
    dispatch(createRepertoire(repertoire));

    return repertoire;
  } catch (error) {
    return error;
  }
};

//! ===== REDUCER =====

const initialState = { repertoire: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_REPERTOIRE:
      return {};
    case CREATE_REPERTOIRE:
      return {};
    default:
      return state;
  }
}
