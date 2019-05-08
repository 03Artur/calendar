import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import {forceReRender} from "@storybook/react";
import Day from "../Day/Day";
import styles from './Week.module.sass';

export default class Week extends Component {
    constructor(props) {
        super(props);
        console.log( moment('20 2','w e').format('YYYY-MM-DD'));
    }

    renderDates = () => {
        const dates = [];

        for (let i = 0; i < 7; i++) {
            const date = moment(`${this.props.week} ${i}`, 'w e');
            dates.push(<Day key ={date.unix()} date={date}/>)
        }
        return dates;
    };


    render() {
        return (
            <div className={styles.container}>{
                this.renderDates()
            }</div>
        );
    }

}

Week.propTypes = {
    week: PropTypes.number,
};