import React from 'react';
import {storiesOf} from '@storybook/react';
import Day from '../src/components/Day/Day';
import Header from '../src/components/Header/Header'
import Calendar from '../src/components/Calendar/Calendar'
import moment from 'moment/moment';
import styles from './index.module.sass';

storiesOf('Day', module)
    .add('current', () => (
            <div className={styles.dayContainer}>
                {
                    console.log(moment().diff(moment(),'days'))
                }
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
