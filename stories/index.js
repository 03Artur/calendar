import React from 'react';
import {storiesOf} from '@storybook/react';
import Day from '../src/components/Day/Day';
import Header from '../src/components/Header/Header'
import Calendar from '../src/components/Calendar/Calendar'
import moment from 'moment/moment';
import styles from './index.module.sass';
import {calendarMode} from "../src/constants/enums";
import Event from "../src/components/Event/Event";
import EventList from "../src/components/EventList/EventList";

storiesOf('Day', module)
    .add('Selected day', () => (
            <div className={styles.dayContainer}>
                <Day today={moment()} selectedDate={moment('2019-05-17', 'YYYY-MM-DD')}
                     date={moment('2019-05-17', 'YYYY-MM-DD')}/>
            </div>
        )
    )
    .add('Current day', () => (
            <div className={styles.dayContainer}>
                <Day today={moment()} date={moment()}/>
            </div>
        )
    )
    .add('Holiday', () => (
            <div className={styles.dayContainer}>
                <Day today={moment('2019-05-20', 'YYYY-MM-DD')} selectedDate={null}
                     date={moment('2019-05-19', 'YYYY-MM-DD')}/>
            </div>
        )
    )
    .add('with events', () => (
            <div className={styles.dayContainer}>

                <Day today={moment()} selectedDate={null} date={moment('2019-05-17', 'YYYY-MM-DD')} events={[
                    {
                        name: 'event name',
                        body: 'event body',
                        time: '11:00',
                    }
                ]}/>
            </div>
        )
    ).add('with all', () => (
        <div className={styles.dayContainer}>

            <Day today={moment('2019-05-17', 'YYYY-MM-DD')} selectedDate={moment('2019-05-17', 'YYYY-MM-DD')} date={moment('2019-05-17', 'YYYY-MM-DD')} events={[
                {
                    name: 'event name',
                    body: 'event body',
                    time: '11:00',
                }
            ]}/>
        </div>
    )
).add('without all', () => (
        <div className={styles.dayContainer}>

            <Day today={moment()} date={moment('2019-05-17', 'YYYY-MM-DD')}/>
        </div>
    )
);

storiesOf('Header', module)
    .add('Header week mode', () => (
            <Header onModeChange={() => {
            }} mode={calendarMode.WEEK} onNextClick={() => {
            }} onPrevClick={() => {
            }} startDate={moment().startOf("week")} endDate={moment().endOf("week")}/>
        )
    )
    .add('Header month mode', () => (
            <Header onModeChange={() => {
            }} mode={calendarMode.MONTH} onNextClick={() => {
            }} onPrevClick={() => {
            }} startDate={moment().startOf(calendarMode.MONTH)} endDate={moment().endOf(calendarMode.MONTH)}/>
        )
    );

storiesOf('Event', module)
    .add('event', () => (
            <Event event={{name: 'Event name', body: 'event body', time: '14:45'}}/>
        )
    );
storiesOf('EventList', module)
    .add('event list', () => (
            <EventList date={moment()} events={[
                {
                    name: 'Event name',
                    body: 'Event body',
                    time: '11:00',
                }, {
                    name: 'Event name',
                    body: 'Event body',
                    time: '12:24',
                }, {
                    name: 'Event name',
                    body: 'Event body',
                    time: '17:24',
                },
            ]}/>
        )
    );

