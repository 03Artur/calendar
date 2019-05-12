import React, {Component, useState, useEffect} from 'react';
import moment from 'moment';
import {calendarFormat} from '../../constants/enums';
import Header from '../Header/Header';
import EventList from '../EventList/EventList';
import styles from './Calendar.module.sass';
import db from '../../constants/databaseSimulation';

import Day from '../Day/Day';


export default class Calendar extends Component {
    constructor(props) {
        super(props);
        const defaultFormat = calendarFormat.WEEK;

        this.state = {
            today: moment(),
            selectedDate: null,
            firstDate: moment().startOf(defaultFormat),
            lastDate: moment().endOf(defaultFormat),
            format: defaultFormat,
        };


    }


    onSelectedDay = (date) => {
        this.setState({selectedDate: date})
    };


    onPrevClick = () => {

        const newFirstDate = this.state.firstDate.clone().subtract(1, this.state.format).startOf(this.state.format);

        const newLastDate = this.state.lastDate.clone().subtract(1, this.state.format).endOf(this.state.format);
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
        const newFirstDate = this.state.firstDate.clone().add(1, this.state.format).startOf(this.state.format);
        const newLastDate = this.state.lastDate.clone().add(1, this.state.format).endOf(this.state.format);
        if (newFirstDate.month() !== newLastDate.month()) {
            newLastDate.month(newFirstDate.month()).endOf('M')
        }
        this.setState({
            firstDate: newFirstDate,
            lastDate: newLastDate,
        });
    };


    renderBody = () => {
        switch (this.state.format) {
            case calendarFormat.WEEK:
                return this.weekRender();
            case  calendarFormat.MONTH:
                return this.monthRender();
        }
    };

    dayRender = (date) => (<Day date={date}
                                isSelected={this.state.selectedDate && this.state.selectedDate.isSame(date, "date")}
                                onSelected={this.onSelectedDay} isToday={this.state.today.isSame(date, "date")}/>);

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

    monthRender = (month) => {


    };

    setMode = (format) => {

        this.setState({
            format: format,
            firstDate: this.state.today.clone().startOf(format),
            lastDate: this.state.today.clone().endOf(format)
        });
    };

    render() {

        let extra = '';
        if (this.state.format === calendarFormat.WEEK) {
            extra = ` ${this.state.firstDate.date()} - ${this.state.lastDate.date()}`
        }


        return (
            <div className={styles.container}>
                <Header prev={this.state.firstDate.clone().subtract(1, 'M').format('MMM')}
                        next={this.state.firstDate.clone().add(1, 'M').format('MMM')}
                        current={`${this.state.firstDate.format('MMMM')}${extra}`} onModeChange={this.setMode}
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



