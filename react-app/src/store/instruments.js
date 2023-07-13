import { customFetch } from '../utils/helpers';

const GET_ALL_INSTRUMENTS = 'instruments/GET_ALL_INSTRUMENTS';
const GET_SINGLE_INSTRUMENT = 'instruments/GET_SINGLE_INSTRUMENT';
const CREATE_INSTRUMENT = 'instruments/CREATE_INSTRUMENT';
const EDIT_INSTRUMENT = 'instruments/EDIT_INSTRUMENT';
const DELETE_INSTRUMENT = 'instruments/DELETE_INSTRUMENT';

//! ===== ACTION CREATORS =====
const getAllInstruments = instruments => {
  return {
    type: GET_ALL_INSTRUMENTS,
    payload: instruments,
  };
};

const getSingleInstrument = instrument => {
  return {
    type: GET_SINGLE_INSTRUMENT,
    payload: instrument,
  };
};

const createInstrument = instrument => {
  return {
    type: CREATE_INSTRUMENT,
    payload: instrument,
  };
};

const editInstrument = instrument => {
  return {
    type: EDIT_INSTRUMENT,
    payload: instrument,
  };
};

const deleteInstrument = instrumentId => {
  return {
    type: DELETE_INSTRUMENT,
    payload: instrumentId,
  };
};

//! ===== THUNKS =====
export const thunkGetAllInstruments = userId => async dispatch => {
  try {
    const instruments = await customFetch(`/api/users/${userId}/instruments`);

    dispatch(getAllInstruments(instruments));

    return instruments;
  } catch (error) {
    return error;
  }
};

export const thunkGetSingleInstrument = (userId, instrumentId) => async dispatch => {
  try {
    const instrument = await customFetch(`/api/users/${userId}/instruments/${instrumentId}`);

    dispatch(getSingleInstrument(instrument));

    return instrument;
  } catch (error) {
    return error;
  }
};

export const thunkCreateInstrument = (userId, newInstrument) => async dispatch => {
  try {
    const instrument = await customFetch(
      `/api/users/${userId}/instruments`,
      'POST',
      newInstrument
    );

    dispatch(createInstrument(instrument));

    return instrument;
  } catch (error) {
    return error;
  }
};

export const thunkEditInstrument = (userId, updatedInstrument) => async dispatch => {
  try {
    const instrument = await customFetch(
      `/api/users/${userId}/instruments/${updatedInstrument.id}`,
      'PUT',
      updatedInstrument
    );

    dispatch(editInstrument(instrument));

    return instrument;
  } catch (error) {
    return error;
  }
};

export const thunkDeleteInstrument = (userId, instrumentToDelete) => async dispatch => {
  try {
    const messageRes = await customFetch(
      `/api/users/${userId}/instruments/${instrumentToDelete.id}`,
      'DELETE'
    );

    dispatch(deleteInstrument(instrumentToDelete.id));

    return messageRes;
  } catch (error) {
    return error;
  }
};

//! ===== REDUCER =====

const initialState = { instruments: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_INSTRUMENTS:
      return {};
    case GET_SINGLE_INSTRUMENT:
      return {};
    case CREATE_INSTRUMENT:
      return {};
    case EDIT_INSTRUMENT:
      return {};
    case DELETE_INSTRUMENT:
      return {};
    default:
      return state;
  }
}
