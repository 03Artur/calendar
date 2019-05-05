import React from 'react';
import PropTypes from 'prop-types'
import styles from './Day.module.sass';


function Day({date, events, onClick, ...props}) {
    console.log(date);

    return (
        <div onClick={onClick} className={[styles.container , styles.test].join(' ')}>
            <span className={styles.dateValueContainer}>{date.date()}</span>

        </div>
    );
}

Day.propTypes = {
    events: PropTypes.array,
};

export default Day;