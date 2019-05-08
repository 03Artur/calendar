import React from 'react';
import PropTypes from 'prop-types'
import styles from './Day.module.sass';
import moment from "moment";


export default function Day({date, events, onSelected, ...props}) {

    return (
        <div onClick={onSelected} className={[styles.container, styles.test, styles.selected].join(' ')}>
            <div className={styles.round}></div>
            <div className={styles.date}>{date.date()}</div>
            <div className={styles.event}></div>
        </div>
    );
}

Day.propTypes = {
    date: PropTypes.instanceOf(moment),
    events: PropTypes.arrayOf(PropTypes.object),
    isToday: PropTypes.bool,

};

