import React from 'react';
import {storiesOf} from '@storybook/react';
import Day from '../src/components/Day/Day';
import Header from '../src/components/Header/Header'
import Calendar from '../src/components/Calendar/Calendar'
import moment from 'moment/moment';
import styles from './index.module.sass';
import Week from '../src/components/Week/Week';

storiesOf('Day', module)
    .add('date', () => (
            <div className={styles.dayContainer}>

                <Day date={moment()} events={[
                    {
                        name: 'event name',
                        body: 'event body',
                        time: '11:00',
                    }
                ]}/>
            </div>
        )
    );
storiesOf('Calendar header', module)
    .add('header', () => (
            <Header/>
        )
    );
storiesOf('Calendar', module)
    .add('calendar', () => (
        <Calendar/>
    ));
storiesOf('Week', module)
    .add('Week', () => (
        <Week week={19}/>
    ));
