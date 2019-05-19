import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Event from '../Event/Event';
import styles from './EventList.module.sass'
import moment from "moment";

function EventList({date, events, ...props}) {

    const renderEvents = () => {
        return events.map(item => (
            <div key={item.name + item.time} className={styles.eventsContainer}><Event event={item}/></div>));

    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                {
                    date.format('dddd, DD MMMM')
                }
            </div>
            {
                renderEvents()
            }
        </div>

    );
}

EventList.propTypes = {
    date: PropTypes.instanceOf(moment),
    events: PropTypes.arrayOf(PropTypes.object),

};

export default EventList;