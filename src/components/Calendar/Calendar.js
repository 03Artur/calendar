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

        const defaultMode = calendarMode.MONTH;
        this.state = {
            today: moment(),
            selectedDate: null,
            selectedEvents: null,
            startDate: moment().startOf(defaultMode),
            endDate: moment().endOf(defaultMode),
            mode: defaultMode,
        };
    }

    onSelectedDay = (date, events) => {
        this.setState({
            selectedDate: date,
            selectedEvents: events,
        });
    };

    onPrevNextClick = (isNext = true) => {
        const newStartDate = this.state.startDate.clone();

        if (isNext) {
            newStartDate.add(1, this.state.mode);
        } else {
            newStartDate.subtract(1, this.state.mode);
        }

        this.setState({
            startDate: newStartDate.startOf(this.state.mode),
            endDate: newStartDate.clone().endOf(this.state.mode),
        })
    };

    onPrevClick = () => {
        this.onPrevNextClick(false);
    };

    onNextClick = () => {
        this.onPrevNextClick();
    };

    onSetMode = (mode) => {
        const newStartDate = this.state.startDate.clone().startOf(mode);
        this.setState({
            mode: mode,
            startDate: newStartDate,
            endDate: newStartDate.clone().endOf(mode),
        });
    };

    dateRender = (date) => (
        <Day key={date.unix()} date={date}
             events={this.props.events.find(item => item.date === date.format('DD.MM.YYYY'))}
             selectedDate={this.state.selectedDate} today={this.state.today}
             onSelected={this.onSelectedDay}/>
    );

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
                    weekDates.push(this.dateRender(date.clone()));
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
        while (this.state.endDate.isSameOrAfter(date, 'date'));

        return weeks;
    };

    eventsRender = () => {
        if (this.state.selectedEvents) {
            return (
                <EventList date={this.state.selectedDate} events={this.state.selectedEvents.events}/>
            );
        }
    };

    render() {
        return (
            <div className={styles.container}>
                <Header startDate={this.state.startDate} endDate={this.state.endDate} mode={this.state.mode}
                        onModeChange={this.onSetMode}
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
                {
                    this.eventsRender()
                }
            </div>
        );
    }
}
;

Calendar.propTypes = {
    events: PropTypes.arrayOf(PropTypes.object),
};



