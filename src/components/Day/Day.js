import React from 'react';
import PropTypes from 'prop-types';
import styles from './Day.module.sass';
import moment from "moment";


export default function Day({date, isToday, isSelected, events, onSelected, ...props}) {

    const classNames = [styles.container];
    if (isSelected) {
        classNames.push(styles.selected);
    }


    return (
        <div onClick={() => onSelected(date)}
             className={classNames.join(' ')}>
            <div className={isToday ? styles.round : ''}/>
            <div className={styles.date}>{date.date()}</div>
            <div className={events?styles.event:''}/>
        </div>
    );
}

Day.propTypes = {
    date: PropTypes.instanceOf(moment),
    events: PropTypes.arrayOf(PropTypes.object),
    isToday: PropTypes.bool,
    isSelected: PropTypes.bool,

};

Day.defaultProps = {
    date: moment(),
    events: null,
    isToday: false,
    isSelected: false,
};

