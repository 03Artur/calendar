import React from 'react';
import PropTypes from 'prop-types';
import styles from './Day.module.sass';
import moment from "moment";


export default function Day({date, today, selectedDate, events, onSelected, ...props}) {

    const todayMarkRender = () => {
        if (today.isSame(date, "date")) {
            return <div className={styles.round}/>
        }
    };

    const eventMarkRender = () => {
        if (events) {
            return <div className={styles.event}/>
        }
    };

    const getContainerClassNames = () => {
        const containerClassNames = [styles.container];
        if (selectedDate && selectedDate.isSame(date, "date")) {
            containerClassNames.push(styles.selected);
        }
        return containerClassNames.join(' ');
    };

    return (
        <div onClick={() => onSelected(date)}
             className={getContainerClassNames()}>
            <div className={styles.roundContainer}>
                {
                    todayMarkRender()
                }
            </div>
            <div className={styles.date}>
                {
                    date.date()
                }
            </div>
            <div className={styles.eventContainer}>
                {
                    eventMarkRender()
                }
            </div>
        </div>
    );
}

Day.propTypes = {
    date: PropTypes.instanceOf(moment),
    today: PropTypes.instanceOf(moment),
    selectedDate: PropTypes.instanceOf(moment),
    events: PropTypes.object,
};

Day.defaultProps = {
    date: moment(),
    today: moment(),
    selectedDate: null,
    events: null,
};

