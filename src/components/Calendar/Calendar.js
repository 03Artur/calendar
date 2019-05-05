import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {calendarMode} from '../../constants/enums';
import Header from '../Header/Header';
import EventList from '../EventList/EventList';
import styles from './Calendar.module.sass';


function Calendar(props) {

    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedWeek, setSelectedWeek] = useState();
    const [selectedDay, setSelectedDay] = useState();


    const onPrevClick = () => {

    };

    const onNextClick = () => {

    };


    return (
        <div className={styles.container}>
            <Header onNextClick={onNextClick} onPrevClick={onPrevClick}/>
            <table>
            </table>
            <EventList/>
        </div>
    );


}

Calendar.propTypes = {};

export default Calendar;