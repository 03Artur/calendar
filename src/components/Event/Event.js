import React, {Component} from 'react';
import styles from './Event.module.sass';
import moment from "moment";


function Event({date, event, ...props}) {


    return (
        <div className={styles.container}>

            <div className={`${styles.row} ${styles.title}`}>
                <span className={styles.shortText}>{event.name}</span>
                <div className={styles.time}>{moment(event.time, 'HH:mm').format('hh:mm A')}</div>
            </div>
            <div className={`${styles.shortText} ${styles.body}`}>{
                event.body
            }</div>
        </div>
    );

}

Event.propTypes = {};

export default Event;