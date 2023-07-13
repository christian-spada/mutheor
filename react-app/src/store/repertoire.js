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
    const repertoire = await customFetch(`/api/users/${userId}/repertoire`);

    dispatch(getAllRepertoire(repertoire));

    return repertoire;
  } catch (error) {
    return error;
  }
};

export const thunkCreateRepertoire = (userId, newRepertoire) => async dispatch => {
  try {
    const repertoire = await customFetch(
      `/api/users/${userId}/repertoire`,
      'POST',
      newRepertoire
    );

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
