import React from 'react';
import styles from '../../styles/Main.module.scss';
import Logo from '../../public/tkdmark.jpg';
import createGame from '../../public/createGame.png';
import joinGame from '../../public/joinGame.png';
import gameLog from '../../public/gameLog.png';
import { useNavigate } from 'react-router-dom';
import { BsPerson, BsThreeDotsVertical } from 'react-icons/bs';
const Main = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logos}>
          <img src={Logo} alt={'logo'} className={styles.logo} />
          <span>LUGI-LUGI</span>
        </div>
        <div className={styles.status}>
          <BsPerson className={styles.profile} size={'1.5em'} />
          <BsThreeDotsVertical className={styles.menu} size={'1.5em'} />
        </div>
      </div>
      <div className={styles.profile}>
        <div className={styles.userImg}></div>
        <div className={styles.userTxt}>
          <span className={styles.userLabel}>이름</span>
          <br />
          <span className={styles.user}>김창아</span>
          <br />
          <br />
          <span className={styles.userLabel}>선수코드</span>
          <br />
          <span className={styles.code}>ABCD</span>
        </div>
      </div>
      <div className={styles.menus}>
        <img src={gameLog} alt={'gameLog'} />
        <img src={createGame} alt={'createGame'} />
        <img src={joinGame} alt={'joinGame'} />
      </div>
    </div>
  );
};

export default Main;
