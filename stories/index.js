import React from 'react';
import {storiesOf} from '@storybook/react';
import Day from '../src/components/Day/Day';
import Header from '../src/components/Header/Header'
import Calendar from '../src/components/Calendar/Calendar'
import moment from 'moment/moment';


storiesOf('Day', module)
    .add('current', () => (
            <Day date={moment('2019-04-25')} events={[
                {
                    name: 'event name',
                    body: 'event body',
                    time: '11:00',
                }
            ]}/>
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
