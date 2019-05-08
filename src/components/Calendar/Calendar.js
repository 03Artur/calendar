import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {calendarMode} from '../../constants/enums';
import Header from '../Header/Header';
import EventList from '../EventList/EventList';
import styles from './Calendar.module.sass';
import db from '../../constants/databaseSimulation';

import Day from '../Day/Day';
import Week from '../Week/Week';


export default function Calendar(props) {

    const [selectedDay, setSelectedDay] = useState(moment());
    const [mode, setMode] = useState(calendarMode.MONTH);

    const onPrevClick = () => {
        console.log("onPrevClick");
    };

    const onNextClick = () => {
        console.log("onNextClick");
    };

    useEffect(() => {
        console.log(mode)
    }, [mode]);

    const renderBody = () => {
        const date = moment().startOf('week');
        switch (mode) {

            case calendarMode.WEEK:
                return weekRender();
                break;
            case  calendarMode.MONTH:
                return monthRender();
                break;

        }

    };

    const weekRender = () => {

    };

    const monthRender = () => {

    };

    return (
        <div className={styles.container}>
            <Header current={selectedDay.format('MMMM')} onModeChange={setMode} onNextClick={onNextClick} onPrevClick={onPrevClick}/>
            <div className={styles.tableHeader}>
                <span>S</span>
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
            </div>
            {
                renderBody()
            }
            <Week week={18}/>
            <Week week={19}/>
            <Week week={20}/>
            <Week week={21}/>
            <Week week={22}/>

            <p onClick={()=>console.log('p')}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet animi architecto cupiditate dolorem
                nesciunt obcaecati omnis perspiciatis quam sit tempore.</p>

            <EventList/>
        </div>
    );


}

Calendar.propTypes = {};

