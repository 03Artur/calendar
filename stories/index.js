import React from 'react';
import {storiesOf} from '@storybook/react';
import Day from '../src/components/Day/Day';
import moment from 'moment/moment';

storiesOf('Day', module)
    .add('current', () => (
            <Day date = {moment('2019-04-25')}/>
        )
    );
