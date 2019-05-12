import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import styles from './Header.module.sass'
import {calendarMode} from '../../constants/enums'
import moment from "moment";

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false,
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    };

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    };

    handleClickOutside = (e) => {
        if ((this._dropDownButton && !this._dropDownButton.contains(e.target)) && this._dropDownContent && !this._dropDownContent.contains(e.target)) {
            this.setState({isMenuOpen: false});
        }

    };

    onDropDownButtonClick = () => {
        this.setState({isMenuOpen: !this.state.isMenuOpen});
    };

    setDropDownButton = (node) => {
        this._dropDownButton = node;
    };

    setDropDownContent = (node) => {
        this._dropDownContent = node;
    };

    changeMode = (value) => {
        this.onDropDownButtonClick();
        this.props.onModeChange(value);
    };

    renderMenu = () => {
        if (this.state.isMenuOpen) {
            return (
                <div ref={this.setDropDownContent} className={styles.dropContent}>
                    <div onClick={() => {
                        this.changeMode(calendarMode.WEEK);
                    }}>This week
                    </div>
                    <div onClick={() => {
                        this.changeMode(calendarMode.MONTH);
                    }}>This month
                    </div>
                </div>
            );
        }
    };

    render() {

        const chevron = this.state.isMenuOpen ? faChevronUp : faChevronDown;
        let currentMonthName = this.props.date.format('MMMM');
        if(this.props.mode === calendarMode.WEEK)
        {
            currentMonthName += ` ${this.props.date.startOf("week").date()} - ${this.props.date.endOf("week").date()}`
        }


        return (
            <div className={styles.container}>
                <div className={styles.headerNav}>
                    <span onClick={this.props.onPrevClick} className={styles.prevNext}>
                        {
                            this.props.prev
                        }
                    </span>

                    <div onClick={this.onDropDownButtonClick} className={styles.currentContainer}
                         ref={this.setDropDownButton}>
                        <span className={styles.current}>
                            {
                                currentMonthName
                            }
                        </span>
                        <FontAwesomeIcon className={styles.dropDownButton} icon={chevron}/>
                    </div>

                    <span onClick={this.props.onNextClick} className={styles.prevNext}>
                        {
                            this.props.next
                        }
                    </span>
                </div>
                {
                    this.renderMenu()
                }
            </div>
        );
    }
}

Header.propTypes = {
    prev: PropTypes.string,
    next: PropTypes.string,
    date: PropTypes.instanceOf(moment),
    onPrevClick: PropTypes.func,
    onNextClick: PropTypes.func,
    onModeChange: PropTypes.func,
    mode: PropTypes.oneOf(Object.values(calendarMode)),
};

Header.defaultProps = {
    prev: 'PREV',
    next: 'NEXT',
    date: moment(),
    onPrevClick: function () {
    },
    onNextClick: function () {
    },
    onModeChange: function () {

    },
    mode: calendarMode.MONTH,
};

