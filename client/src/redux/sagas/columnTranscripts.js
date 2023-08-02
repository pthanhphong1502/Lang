import { call, put } from 'redux-saga/effects';
import columnTranscriptApi from 'api/columnTranscriptApi';
import * as columnTranscriptActions from 'redux/actions/columnTranscripts';
import { takeLatest } from 'redux-saga/effects';

export function* columnTranscriptSaga() {
  //column transcript
  yield takeLatest(
    columnTranscriptActions.getColumnTranscripts.getColumnTranscriptsRequest,
    fetchColumnTranscripts
  );
  yield takeLatest(
    columnTranscriptActions.createColumnTranscript.createColumnTranscriptRequest,
    createColumnTranscript
  );
  yield takeLatest(
    columnTranscriptActions.updateColumnTranscript.updateColumnTranscriptRequest,
    updateColumnTranscript
  );
  yield takeLatest(
    columnTranscriptActions.deleteColumnTranscript.deleteColumnTranscriptRequest,
    deleteColumnTranscript
  );
}

function* fetchColumnTranscripts(action) {
  try {
    const columnTranscripts = yield call(columnTranscriptApi.getAll);

    yield put(
      columnTranscriptActions.getColumnTranscripts.getColumnTranscriptsSuccess(columnTranscripts)
    );
  } catch (error) {
    yield put(columnTranscriptActions.getColumnTranscripts.getColumnTranscriptsFailure(error));
  }
}

function* createColumnTranscript(action) {
  try {
    const newColumnTranscript = yield call(columnTranscriptApi.create, action.payload);

    yield put(
      columnTranscriptActions.createColumnTranscript.createColumnTranscriptSuccess(
        newColumnTranscript
      )
    );
  } catch (error) {
    yield put(columnTranscriptActions.createColumnTranscript.createColumnTranscriptFailure(error));
  }
}

function* updateColumnTranscript(action) {
  try {
    yield call(columnTranscriptApi.update, action.payload);
    yield put(
      columnTranscriptActions.updateColumnTranscript.updateColumnTranscriptSuccess(action.payload)
    );
  } catch (error) {
    yield put(columnTranscriptActions.updateColumnTranscript.updateColumnTranscriptFailure(error));
  }
}

export function* deleteColumnTranscript(action) {
  try {
    yield call(columnTranscriptApi.delete, action.payload);

    yield put(
      columnTranscriptActions.deleteColumnTranscript.deleteColumnTranscriptSuccess(action.payload)
    );
  } catch (error) {
    yield put(columnTranscriptActions.deleteColumnTranscript.deleteColumnTranscriptFailure(error));
  }
}
