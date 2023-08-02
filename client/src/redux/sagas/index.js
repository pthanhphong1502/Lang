import { all } from '@redux-saga/core/effects';
import { columnTranscriptSaga } from 'redux/sagas/columnTranscripts';
import { courseSaga } from 'redux/sagas/courses';
import { courseTypeSaga } from 'redux/sagas/courseTypes';
import { levelSaga } from 'redux/sagas/levels';
import { parameterSaga } from 'redux/sagas/parameters';
import { authSaga } from './auth';
import { billSaga } from './bills';
import { classSaga } from './classes';
import { employeeSaga } from './employees';
import { examSaga } from './exams';
import { lecturerSaga } from './lecturers';
import { studentSaga } from './students';
import { testTypeSaga } from './testTypes';
import { timeFrameSaga } from './timeFrames';
import { userSaga } from './users';

export default function* mySaga() {
  //column transcript
  yield all([
    columnTranscriptSaga(),
    lecturerSaga(),
    employeeSaga(),
    levelSaga(),
    parameterSaga(),
    courseTypeSaga(),
    courseSaga(),
    studentSaga(),
    userSaga(),
    authSaga(),
    timeFrameSaga(),
    classSaga(),
    billSaga(),
    examSaga(),
    testTypeSaga(),
  ]);
}
