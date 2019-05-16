import React, {Component, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {calendarMode} from '../../constants/enums';
import Header from '../Header/Header';
import EventList from '../EventList/EventList';
import styles from './Calendar.module.sass';

import Day from '../Day/Day';


export default class Calendar extends Component {
    constructor(props) {
        super(props);
        const defaultFormat = calendarMode.MONTH;
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

        const newFirstDate = this.state.firstDate.subtract(1, this.state.mode).startOf(this.state.mode);
        const newLastDate = newFirstDate.clone().endOf(this.state.mode);

        if (newFirstDate.month() !== newLastDate.month()) {
            newFirstDate.month(newLastDate.month()).startOf('M')
        }

        this.setState({
            firstDate: newFirstDate,
            lastDate: newLastDate,
        });

    };


    onNextClick = () => {
        const newFirstDate = this.state.firstDate.add(1, this.state.mode).startOf(this.state.mode);
        const newLastDate = newFirstDate.clone().endOf(this.state.mode);
        console.group('onNextClick');
        console.log(newFirstDate.format('YYYY-MM-DD'));
        console.log(newLastDate.format('YYYY-MM-DD'));
        console.groupEnd();
        this.setState({
            firstDate: newFirstDate,
            lastDate: newLastDate,
        });
    };


    renderBody = () => {
        switch (this.state.mode) {
            case calendarMode.WEEK:
                return this.weekRender(this.state.firstDate.week());
            case  calendarMode.MONTH:
                return this.monthRender();
        }
    };

    dayRender = (date) => (<Day key={date.unix()} date={date}
                                events={this.props.events.find((elem) => elem.date === date.format('DD.MM.YYYY'))}
                                selectedDate={this.state.selectedDate} today={this.state.today}

                                onSelected={this.onSelectedDay}/>);


    weekRender = (date) => {
        let dateBuf = this.state.firstDate.isSame(date, "date") ? date : date.startOf("week");

        if (!dateBuf.isAfter(this.state.firstDate, 'date')) {
            dateBuf = this.state.firstDate.clone();
        }

        const dates = [];

        for (let i = 0; i < 7; i++) {
            if (i < dateBuf.day() || dateBuf.isAfter(this.state.lastDate, "date")) {
                dates.push(<div key={dateBuf.format('YYYY-w') + i} className={styles.fakeDay}/>);
            } else {
                dates.push(this.dayRender(dateBuf.clone()));
                dateBuf.add(1, "d");
            }
        }
        return <div key={date.format('YYYY-w')} className={styles.week}>{
            dates
        }</div>

    };


    bodyRender = () => {

        const weeks = [];


        for (let i = 0;; i++) {

            const dates = [];
            const date = i === 0 ? this.state.firstDate.clone() : this.state.firstDate.clone().startOf('w').add(i, 'w');
            console.log(date.format('YYYY-MM-DD'));
            const weekKey = date.format('YYYY-w');
            for (let j = 0; j < 7; j++) {
                if (j < date.day() || date.isAfter(this.state.lastDate, "date")) {
                    dates.push(<div key={date.format('YYYY-w') + j} className={styles.fakeDay}/>);
                } else {
                    dates.push(this.dayRender(date.clone()));
                    date.add(1, "day");
                }
            }
            weeks.push((
                <div key={weekKey} className={styles.week}>
                    {
                        dates
                    }
                </div>
            ));
            if ( date.isAfter(this.state.lastDate, 'date')) {
                console.log(weeks);
                return weeks;
            }
        }


    };

    monthRender = () => {
        let week = this.state.firstDate.week();
        const weeks = [];

        while (!moment(week, 'w').startOf('w').isAfter(this.state.lastDate, 'date')) {
            weeks.push(this.weekRender(week++));
        }
        return weeks;
    };

    setMode = (mode) => {
        const newFD = this.state.firstDate.clone().startOf(mode);
        const newLD = this.state.firstDate.clone().endOf(mode);

        console.group('onNextClick')
        console.log(newFD.format('YYYY-MM-DD'));
        console.log(newLD.format('YYYY-MM-DD'));
        console.groupEnd();
        this.setState({
            mode: mode,
            firstDate: newFD,
            lastDate: newLD,
        });
    };

    render() {


        return (
            <div className={styles.container}>
                <Header current={this.state.firstDate.format('MMMM')}
                        onModeChange={this.setMode}
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
                    this.bodyRender()
                }


                <p onClick={() => console.log('p')}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet animi
                    architecto cupiditate dolorem
                    nesciunt obcaecati omnis perspiciatis quam sit tempore.</p>

                <EventList/>
            </div>
        );

    }


};

Calendar.propTypes = {
    events: PropTypes.arrayOf(PropTypes.object),
};



