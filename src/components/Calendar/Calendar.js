import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {calendarMode} from '../../constants/enums';
import Header from '../Header/Header';
import EventList from '../EventList/EventList';


function Calendar(props) {

    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedWeek, setSelectedWeek] = useState();
    const [selectedDay, setSelectedDay] = useState();


    const onPrevClick = () => {

    };

    const onNextClick = () => {

    };


    return (
        <div>
            <Header onNextClick={this.onNextClick} onPrevClick={this.onPrevClick}/>
            <div></div>
            <EventList/>
        </div>
    );


}

Calendar.propTypes = {};

export default Calendar;