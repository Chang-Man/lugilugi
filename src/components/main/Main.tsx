import React, { useEffect, useState } from 'react';
import Logo from '../../public/tkdmark.jpg';
import styles from './Main.module.scss';
import { BsPerson } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import lugilugi from '../../public/lugilugi.png';
import workOut from '../../public/workOut.png';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { subDays } from 'date-fns';
import WorkOutModal from './workOutModal/WorkOutModal';
import AttendanceModal from './attendanceModal/AttendanceModal';
import Moment from 'moment';
import defaultProfile from './../../public/defaultProfile.png';
import authAPI from '../../API/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/module/auth';
import userAPI from '../../API/userAPI';
import { setUser } from '../../redux/module/user';
import rootReducer from '../../redux';
import { FiLogOut } from 'react-icons/fi';
import moment from 'moment';
import attendanceAPI from '../../API/attendanceAPI';
import { toastErrorData } from '../../API/errorHandling';
import lovePanda from '../../public/love_panda.png';
import facePanda from '../../public/face_panda.png';
type RootState = ReturnType<typeof rootReducer>;

interface attendanceDateObjectType {
  id: string;
  date: string;
}

const Main = () => {
  const [nowDate, setNowDate] = useState(new Date());
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [isAttendanceModal, setIsAttendanceModal] = useState<boolean>(false);
  const [attendanceDate, setAttendanceDate] = useState<Date[]>([]);
  const [dateToPost, setDateToPost] = useState<Date>();
  const [formatDate, setFormatDate] = useState(Moment(nowDate).format('YYYY/MM'));
  const dispatch = useDispatch();
  const user_info = useSelector((state: RootState) => state.user).user_info;

  const onClickLogout = () => {
    authAPI.logout();
    dispatch(logout());
  };

  const handleMonthChange = (date: Date) => {
    setDateToPost(date);
    setFormatDate(Moment(date).format('YYYY/MM'));
  };

  useEffect(() => {
    userAPI.getUser().then(
      res => dispatch(setUser(res)),
      error => {
        toastErrorData(error);
        authAPI.logout();
      },
    );

    attendanceAPI.getAttendanceMonth({ year: moment().format('YYYY'), month: moment().format('MM') }).then(
      res => {
        setAttendanceDate([]);
        res.results.map((res: string, idx: number) => {
          setAttendanceDate(prevArray => [...prevArray, subDays(new Date(res), 0)]);
        });
      },
      error => {
        toastErrorData(error);
      },
    );
  }, []);

  useEffect(() => {
    const yearToGet = moment(dateToPost).format('YYYY');
    const monthToGet = moment(dateToPost).format('MM');

    attendanceAPI.getAttendanceMonth({ year: yearToGet, month: monthToGet }).then(res => {
      setAttendanceDate([]);
      res.results.map((res: string, idx: number) => {
        setAttendanceDate(prevArray => [...prevArray, subDays(new Date(res), 0)]);
      });
    });
  }, [dateToPost, setDateToPost]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logos}>
          <img src={Logo} alt={'logo'} className={styles.logo} />
          <span>LUGI-LUGI</span>
        </div>
        <div className={styles.status}>
          <BsPerson className={styles.profile} size={'5vw'} onClick={() => navigate('/profile')} />
          <FiLogOut className={styles.menu} size={'5vw'} onClick={onClickLogout} />
        </div>
      </div>
      <WorkOutModal isModal={isModal} setIsModal={setIsModal} setAttendanceDate={setAttendanceDate} />
      <AttendanceModal isModal={isAttendanceModal} setIsModal={setIsAttendanceModal} date={nowDate} />
      <div className={styles.mainContainer}>
        <div className={styles.profile}>
          {user_info == null ? (
            <></>
          ) : user_info.image ? (
            <img className={styles.userImg} src={user_info.image} />
          ) : (
            <img className={styles.defaultImg} src={defaultProfile} />
          )}

          {user_info == null ? (
            <></>
          ) : (
            <div className={styles.userTxt}>
              <div className={styles.name_code}>
                {/* <span></span> */}
                <span className={styles.user}>
                  {user_info.username === '강다연' && <img className={styles.facepanda} src={facePanda} alt={'facepanda'} />}
                  {user_info.username}
                </span>
                <span className={styles.cuteName}></span>
                <span className={styles.slash}>/</span>
                <span className={styles.code}>{user_info.code}</span>
              </div>

              <span className={styles.nickName}>{user_info.nickname}</span>
            </div>
          )}
        </div>
        <style>
          {`.react-datepicker {
          width: 100%;
          font-family: RussoOne;
          font-weight: lighter;
          font-size: 110%;
      }
      .react-datepicker__month-container {
        width: 100%;
      }
      .react-datepicker__day--today {
         color : #D3D3D3;

      }
      .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected {
        background-color : black;
      }
      .react-datepicker__day--highlighted {
        background-color : gray;
      }
      .react-datepicker__day--selected:hover {
        background-color : black;
      }
      .react-datepicker__day--outside-month {
        color: transparent !important;
        pointer-events: none;
      }
      `}
        </style>
        <div className={styles.count}>
          <span>
            {formatDate} 운동 : &nbsp;{attendanceDate.length}회
          </span>
          {user_info && user_info.username === '강다연' && <img className={styles.hiddenPanda} src={lovePanda} alt={'dayeon'} />}
        </div>

        <Datepicker
          className='form-control'
          selected={nowDate}
          onChange={(date: Date) => {
            setNowDate(date);
            setIsAttendanceModal(true);
          }}
          highlightDates={attendanceDate}
          isClearable={false}
          onMonthChange={handleMonthChange}
          inline
        />

        <div className={styles.menus}>
          <img src={workOut} alt={'workOut'} onClick={() => setIsModal(true)} />
          <img
            src={lugilugi}
            alt={'lugilugi'}
            onClick={() => {
              navigate('/lugilugi');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
