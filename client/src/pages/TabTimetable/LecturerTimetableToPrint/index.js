import { Row, Col, notification } from 'antd';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClasses } from 'redux/actions/classes';
import { classState$ } from 'redux/selectors';
import { currentDate } from 'utils/dateTime';
import { dateSvg, timeSvg } from 'utils/iconsvg';
import styles from './index.module.less';
import Icon from '@ant-design/icons';
import lecturerApi from 'api/lecturerApi';

const LecturerTimetableToPrint = React.forwardRef((props, ref) => {
  const [timetable, setTimetable] = useState([]);
  const dayOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const { idLecturer } = props;
  const [lecturer, setLecturer] = useState();
  const classes = useSelector(classState$);
  const dispatch = useDispatch();

  //get lecturer by id
  useEffect(() => {
    if (idLecturer) {
      lecturerApi
        .getLecturerById(idLecturer)
        .then(res => setLecturer(res.data))
        .catch(err =>
          notification.error({
            message: `${err}`,
          })
        );
    }
  }, [idLecturer]);

  // get class
  useEffect(() => {
    dispatch(getClasses.getClassesRequest());
  }, []);

  //load timetable
  useEffect(() => {
    if (lecturer && classes.data.length > 0) {
      const keyClassesTeaching = lecturer.Classes.reduce((pre, curr) => {
        if (moment(curr.endDate) >= currentDate()) {
          pre.push(curr.idClass);
        }
        return pre;
      }, []);
      const currentClass = classes.data.filter(element =>
        keyClassesTeaching.includes(element.idClass)
      );
      const tmp = currentClass.reduce((pre, curr) => {
        pre.push({
          className: curr.className,
          startDate: moment(curr.startDate).format('DD/MM/YYYY'),
          endDate: moment(curr.endDate).format('DD/MM/YYYY'),
          Timetables: curr.ClassTimes.map(element => {
            return {
              day: dayOfWeek[element.dayOfWeek],
              start: element.TimeFrame.startingTime.slice(
                0,
                element.TimeFrame.startingTime.length - 3
              ),
              end: element.TimeFrame.endingTime.slice(0, element.TimeFrame.startingTime.length - 3),
            };
          }),
        });
        return pre;
      }, []);
      setTimetable(tmp);
    }
  }, [lecturer, classes.data]);

  const TimetableItem = ({ day, start, end }) => {
    return (
      <Col span={24}>
        <div className={styles.day}>
          <Icon className={styles['icon-time']} component={timeSvg} />
          {day}:
          <span className={styles.time}>
            {start} - {end}
          </span>
        </div>
      </Col>
    );
  };

  return (
    <div className={styles.container} ref={ref}>
      <h1>Timetable</h1>
      <Row>
        {timetable.map(element => (
          <Col key={element.className} span={12}>
            <Col span={24}>
              <strong className={styles.className}>{element.className}</strong>
            </Col>
            <Col span={24}>
              <Icon className={styles['icon-date']} component={dateSvg} />
              {element.startDate} - {element.endDate}
            </Col>
            {element.Timetables.map(item => (
              <TimetableItem day={item.day} start={item.start} end={item.end} />
            ))}
          </Col>
        ))}
      </Row>
    </div>
  );
});

export default LecturerTimetableToPrint;
