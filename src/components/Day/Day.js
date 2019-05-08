import React from 'react';
import PropTypes from 'prop-types';
import styles from './Day.module.sass';
import moment from "moment";


export default function Day({date, selectedDate, events, onSelected, ...props}) {

    const classNames = [styles.container];
    if (moment().format('YYYY-MM-DD') === selectedDate.format('YYYY-MM-DD')) {
        classNames.push(styles.selected);
    }

    return (
        <div onClick={() => onSelected(date)}
             className={classNames.join(' ')}>
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
    selectedDate: PropTypes.instanceOf(moment),

};

