import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import styles from './Header.module.sass'
import {calendarFormat} from '../../constants/enums'
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
                        this.changeMode(calendarFormat.WEEK);
                    }}>This week
                    </div>
                    <div onClick={() => {
                        this.changeMode(calendarFormat.MONTH);
                    }}>This month
                    </div>
                </div>
            );
        }
    };

    render() {

        const chevron = this.state.isMenuOpen ? faChevronUp : faChevronDown;

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
                                this.props.current
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
    current: PropTypes.string,
    next: PropTypes.string,
    onPrevClick: PropTypes.func,
    onNextClick: PropTypes.func,
    onModeChange: PropTypes.func,
};

Header.defaultProps = {
    prev: 'PREV',
    current: moment().format('MMMM'),
    next: 'NEXT',
    onPrevClick: function () {
    },
    onNextClick: function () {
    },
    onModeChange: function () {

    },
};

