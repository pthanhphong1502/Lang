const usersState$ = state => state.users.data;
const userState$ = state => state.user.data;
const authState$ = state => state.auth.data;
const courseState$ = state => state.courses;
const courseTypeState$ = state => state.courseTypes;
const levelState$ = state => state.levels;
const columnTranscriptState$ = state => state.columnTranscripts;
const classState$ = state => state.classes;
const timeFrameState$ = state => state.timeFrames;
const employeeState$ = state => state.employees;
const lecturerState$ = state => state.lecturers;
const studentState$ = state => state.students;
const testTypeState$ = state => state.testTypes;
const examState$ = state => state.exams;
const billState$ = state => state.bills;

const parameterState$ = state => state.parameters;
export {
  usersState$,
  userState$,
  authState$,
  classState$,
  courseState$,
  courseTypeState$,
  levelState$,
  timeFrameState$,
  employeeState$,
  lecturerState$,
  studentState$,
  columnTranscriptState$,
  testTypeState$,
  examState$,
  billState$,
  parameterState$,
};
