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
    const res = await fetch(`/api/users/${userId}/instruments`);

    if (res.ok) {
      const instruments = await res.json();
      dispatch(getAllInstruments(instruments));
      return instruments;
    }
  } catch (err) {
    const error = await err.json();
    return error;
  }
};

export const thunkGetSingleInstrument = (userId, instrumentId) => async dispatch => {
  try {
    const res = await fetch(`/api/users/${userId}/instruments/${instrumentId}`);

    if (res.ok) {
      const instrument = await res.json();
      dispatch(getSingleInstrument(instrument));
      return instrument;
    }
  } catch (err) {
    const error = await err.json();
    return error;
  }
};

export const thunkEditInstrument = (userId, instrumentId) => async dispatch => {
  try {
    const res = await fetch(`/api/users/${userId}/instruments/${instrumentId}`);

    if (res.ok) {
      const instrumentToEdit = await res.json();
      dispatch(editInstrument(instrumentToEdit));
      return instrumentToEdit;
    }
  } catch (err) {
    const error = await err.json();
    return error;
  }
};

export const thunkDeleteInstrument = (userId, instrumentId) => async dispatch => {
  try {
    const res = await fetch(`/api/users/${userId}/instruments/${instrumentId}`);

    if (res.ok) {
      const instrumentToDelete = await res.json();
      dispatch(deleteInstrument(instrumentToDelete));
      return instrumentToDelete;
    }
  } catch (err) {
    const error = await err.json();
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
    case EDIT_INSTRUMENT:
      return {};
    case DELETE_INSTRUMENT:
      return {};
    default:
      return state;
  }
}
