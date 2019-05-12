import React, {Component} from 'react';
import styles from './Event.module.sass';


function Event({date, event, ...props}) {


    return (
        <div className={styles.container}>
            <div><span>{event.name}</span></div>
        </div>
    );

}

Event.propTypes = {};

export default Event;