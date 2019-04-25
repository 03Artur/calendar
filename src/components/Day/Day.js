import React from 'react';
import PropTypes from 'prop-types'
import styles from './Day.module.sass';


function Day({date, events, ...props}) {
    console.log(date);

    return (
        <div className={styles.container}>

        </div>
    );

}

Day.propTypes = {
    events: PropTypes.array,

};

export default Day;