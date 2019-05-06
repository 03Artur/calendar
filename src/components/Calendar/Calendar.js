import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {calendarMode} from '../../constants/enums';
import Header from '../Header/Header';
import EventList from '../EventList/EventList';
import styles from './Calendar.module.sass';
import db from '../../constants/databaseSimulation'

export default function Calendar(props) {

    const [selectedDay, setSelectedDay] = useState(null);
    const [mode, setMode] = useState(calendarMode.MONTH);

    const onPrevClick = () => {
        console.log("onPrevClick");
    };

    const onNextClick = () => {
        console.log("onNextClick");
    };
    const changeMode = (value) => {
        if (mode !== value) {
            setMode(value);
        }
    };
    useEffect(() => {
        console.log(mode)
    }, [mode])

    return (
        <div className={styles.container}>
            <Header onModeChange={changeMode} onNextClick={onNextClick} onPrevClick={onPrevClick}/>
            <div className={styles.tableHeader}>
                <span>S</span>
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
            </div>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet animi architecto cupiditate dolorem
                nesciunt obcaecati omnis perspiciatis quam sit tempore.</p>

            <EventList/>
        </div>
    );


}

Calendar.propTypes = {};

