import React, {Component, useState, useEffect} from 'react';
import moment from 'moment';
import {calendarMode} from '../../constants/enums';
import Header from '../Header/Header';
import EventList from '../EventList/EventList';
import styles from './Calendar.module.sass';
import db from '../../constants/databaseSimulation';

import Day from '../Day/Day';


export default class Calendar extends Component {
    constructor(props) {
        super(props);
        const defaultFormat = calendarMode.WEEK;
        this.state = {
            today: moment(),
            selectedDate: null,
            firstDate: moment().startOf(defaultFormat),
            lastDate: moment().endOf(defaultFormat),
            mode: defaultFormat,
        };
    }


    onSelectedDay = (date) => {
        this.setState({selectedDate: date})
    };


    onPrevClick = () => {

        const newFirstDate = this.state.firstDate.clone().subtract(1, this.state.mode).startOf(this.state.mode);

        const newLastDate = this.state.lastDate.clone().subtract(1, this.state.mode).endOf(this.state.mode);
        console.group('1');
        console.log(newFirstDate.format('YYYY-MM-DD'));
        console.log(newLastDate.format('YYYY-MM-DD'));
        console.groupEnd();

        if (newFirstDate.month() !== newLastDate.month()) {
            newFirstDate.month(newLastDate.month()).startOf('M')
        }
        console.group('2');
        console.log(newFirstDate.format('YYYY-MM-DD'));
        console.log(newLastDate.format('YYYY-MM-DD'));
        console.groupEnd();

        this.setState({
            firstDate: newFirstDate,
            lastDate: newLastDate,
        });

    };


    onNextClick = () => {
        const newFirstDate = this.state.firstDate.clone().add(1, this.state.mode).startOf(this.state.mode);
        const newLastDate = this.state.lastDate.clone().add(1, this.state.mode).endOf(this.state.mode);
        if (newFirstDate.month() !== newLastDate.month()) {
            newLastDate.month(newFirstDate.month()).endOf('M')
        }
        this.setState({
            firstDate: newFirstDate,
            lastDate: newLastDate,
        });
    };


    renderBody = () => {
        switch (this.state.mode) {
            case calendarMode.WEEK:
                return this.weekRender();
            case  calendarMode.MONTH:
                return this.monthRender();
        }
    };

    dayRender = (date) => (<Day date={date} events={db.find((elem) => elem.date === date.format('DD.MM.YYYY'))} selectedDate={this.state.selectedDate} today={this.state.today}

                                onSelected={this.onSelectedDay} />);

    weekRender = () => {
        const dates = [];
        const date = this.state.firstDate.clone();
        for (let i = 0; i < 7; i++) {
            if (i < this.state.firstDate.day() || date.isAfter(this.state.lastDate, "date")) {
                dates.push(<div className={styles.fakeDay}/>);
            } else {
                dates.push(this.dayRender(date.clone()));
                date.add(1, "d");
            }
        }

        return <div className={styles.week}>{
            dates
        }</div>

    }
    ;

    monthRender = () => {
        const dates = [];
        const date = this.state.firstDate.clone();

    };

    setMode = (mode) => {

        this.setState({
            mode: mode,
            firstDate: this.state.today.clone().startOf(mode),
            lastDate: this.state.today.clone().endOf(mode)
        });
    };

    render() {
        let currentHeaderTitle = `${this.state.firstDate.format('MMMM')}`;
        let prevHeaderTitle = '';
        let nextHeaderTitle = '';
        if (this.state.mode === calendarMode.WEEK) {
            currentHeaderTitle += ` ${this.state.firstDate.date()} - ${this.state.lastDate.date()}`;
            prevHeaderTitle = 'PREV';
            nextHeaderTitle = 'NEXT';
        } else if (this.state.mode === calendarMode.MONTH) {
            prevHeaderTitle = this.state.firstDate.clone().subtract(1, 'M').format('MMM');
            nextHeaderTitle = this.state.firstDate.clone().add(1, 'M').format('MMM');
        }


        return (
            <div className={styles.container}>
                <Header prev={prevHeaderTitle}
                        next={nextHeaderTitle}
                        current={currentHeaderTitle} onModeChange={this.setMode}
                        onNextClick={this.onNextClick}
                        onPrevClick={this.onPrevClick}/>
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
                    this.renderBody()
                }


                <p onClick={() => console.log('p')}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet animi
                    architecto cupiditate dolorem
                    nesciunt obcaecati omnis perspiciatis quam sit tempore.</p>

                <EventList/>
            </div>
        );

    }


}
;



