import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {calendarMode} from '../../constants/enums';
import Header from '../Header/Header';
import EventList from '../EventList/EventList';
import styles from './Calendar.module.sass';
import db from '../../constants/databaseSimulation';

import Day from '../Day/Day';
import Week from '../Week/Week';


export default function Calendar(props) {
    const [today, setToday] = useState(moment());
    const [selectedDate, setSelectedDate] = useState(null);
    const [manipulateDate,setManipulateDate] = useState(moment());
/*
    const [selectedWeek, setSelectedWeek] = useState(today.week());
    const [selectedMonth, setSelectedMonth] = useState(today.month());
*/



    const [mode, setMode] = useState(calendarMode.MONTH);

    const onSelectedDay = (date) => {
        setSelectedDate(date);
    };
    const onPrevClick = () => {
        switch (mode) {
            case calendarMode.MONTH:
                setManipulateDate(manipulateDate.clone().subtract(1,'M'));
                break;
            case calendarMode.WEEK:
                setManipulateDate(manipulateDate.clone().subtract(1,'w'));
                break;
        }
    };
    const onNextClick = () => {
        switch (mode) {
            case calendarMode.MONTH:
                setManipulateDate(manipulateDate.clone().add(1,'M'));
                break;
            case calendarMode.WEEK:
                setManipulateDate(manipulateDate.clone().add(1,'w'));
                break;
        }    };
    useEffect(() => {
        console.log(mode)
    }, [mode]);

    const renderBody = () => {
        switch (mode) {
            case calendarMode.WEEK:
                return weekRender();
            case  calendarMode.MONTH:
                return monthRender();
        }
    };

    const weekRender = (date) => {

        const weekDays = [];
        for (let i = 0; i < 7; i++) {
            const tmp = moment(`${manipulateDate.week()} ${i}`, 'w e');
            if(tmp.month()!==manipulateDate.month()){
                weekDays.push(<div>test</div>);
            }else{
            weekDays.push(<Day onSelected={onSelectedDay} key={tmp.unix()}
                               date={tmp} isToday={tmp.isSame(today,'date')} isSelected={tmp.isSame(selectedDate,'date')}
            />);}
        }
        return (
            <div className={styles.week}>{
                weekDays
            }</div>
        );

    };

    const monthRender = (month) => {

    };

    return (
        <div className={styles.container}>
            <Header mode = {mode} date={manipulateDate.clone()} onModeChange={setMode} onNextClick={onNextClick}
                    onPrevClick={onPrevClick}/>
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



            <p onClick={() => console.log('p')}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet animi
                architecto cupiditate dolorem
                nesciunt obcaecati omnis perspiciatis quam sit tempore.</p>

            <EventList/>
        </div>
    );

}


