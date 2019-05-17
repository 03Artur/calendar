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
        const today = moment();
        const start = today.clone().startOf(defaultFormat);
        const end = today.clone().endOf(defaultFormat);

        this.state = {
            today: today,
            selectedDate: null,
            selectedEvents: null,
            startDate: start,
            endDate: end,
            events: this.getEvents(start, end),
            mode: defaultFormat,
        };
    }

    getEvents = (start, end) => {
        return this.props.events.filter(item => {
            const date = moment(item.date, 'DD.MM.YYYY');
            return date.isSameOrAfter(start, "date") && date.isSameOrBefore(end, "date")
        })
    };

    onSelectedDay = (date) => {
        this.setState({
            selectedDate: date,
        });
    };

    onPrevNextClick = (isNext = true) => {
        const newStartDate = this.state.startDate.clone();
        if (isNext) {
            newStartDate.add(1, this.state.mode);
        } else {
            newStartDate.subtract(1, this.state.mode);
        }
        const newEndDate = newStartDate.clone().endOf(this.state.mode);
        this.setState({
            startDate: newStartDate.startOf(this.state.mode),
            endDate: newEndDate,
            events: this.getEvents(newStartDate, newEndDate),
        })
    };

    onPrevClick = () => {
        this.onPrevNextClick(false);
    };

    onNextClick = () => {
        this.onPrevNextClick();
    };

    dayRender = (date) => (<Day key={date.unix()} date={date}
                                events={this.state.events.find(item => item.date === date.format('DD.MM.YYYY'))}
                                selectedDate={this.state.selectedDate} today={this.state.today}
                                onSelected={this.onSelectedDay}/>);

    /*    bodyRender = () => {
            const weeks = [];
            const datesEventsKeys = this.state.datesEvents.keys();
            let date = datesEventsKeys.next();
            do {

                const weekDates = [];
                const weekKey = date.value.format('YYYY-w');

                for (let i = 0; i < 7; i++) {
                    if ((!date.done && i < date.value.day()) || date.done) {
                        weekDates.push(<div key={i} className={styles.fakeDay}/>);
                    } else {
                        console.log(date);
                        weekDates.push(this.dayRender(date.value));
                        date = datesEventsKeys.next();

                    }
                }
                weeks.push((
                    <div key={weekKey} className={styles.week}>
                        {
                            weekDates
                        }
                    </div>
                ));
            } while (!date.done);

            return weeks;


        }*/
    bodyRender = () => {
        const weeks = [];
        const date = this.state.startDate.clone();
        do {
            const weekDates = [];
            const weekKey = date.format('YYYY-w');
            for (let j = 0; j < 7; j++) {
                if (j < date.day() || date.isAfter(this.state.endDate, "date")) {
                    weekDates.push(<div key={date.format('YYYY-w') + j} className={styles.fakeDay}/>);
                } else {
                    weekDates.push(this.dayRender(date.clone()));
                    date.add(1, "day");
                }
            }
            weeks.push((
                <div key={weekKey} className={styles.week}>
                    {
                        weekDates
                    }
                </div>
            ));
        }
        while (this.state.endDate.isSameOrAfter(date, 'date')) ;
        return weeks;
    };

    setMode = (mode) => {
        const newStartDate = this.state.startDate.clone().startOf(mode);
        const newEndDate = newStartDate.clone().endOf(mode);
        this.setState({
            mode: mode,
            startDate: newStartDate,
            endDate: newEndDate,
            events: this.getEvents(newStartDate, newEndDate),
        });
    };
    eventsRender = () => {
        return this.state.events.map(item=>(<EventList date={moment(item.date,'DD.MM.YYYY')} events={item.events}/>));
    };

    render() {
        return (
            <div className={styles.container}>
                <Header startDate={this.state.startDate} endDate={this.state.endDate} mode={this.state.mode}
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
                <div>
                    {
                        this.eventsRender()
                    }
                </div>
            </div>
        );
    }
}
;

Calendar.propTypes = {
    events: PropTypes.arrayOf(PropTypes.object),
};



