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
        this.props.onModeChange(value);
        this.onDropDownButtonClick();

    };

    renderMenu = () => {
        if (this.state.isMenuOpen) {
            return (
                <div ref={this.setDropDownContent} className={styles.dropContent}>
                    <div className={styles.dropDownItem} onClick={() => {
                        this.changeMode(calendarMode.WEEK);
                    }}><span>This week</span>
                    </div>
                    <div className={styles.dropDownItem} onClick={() => {
                        this.changeMode(calendarMode.MONTH);
                    }}><span>This month</span>
                    </div>
                </div>
            );
        }
    };

    render() {

        const chevron = this.state.isMenuOpen ? faChevronUp : faChevronDown;
        let prev = '';
        let next = '';
        let current = '';
        switch (this.props.mode) {
            case calendarMode.WEEK:
                prev = 'PREV';
                next = 'NEXT';
                if (this.props.startDate.month() !== this.props.endDate.month()) {
                    current = `${this.props.startDate.format('MMM')} ${this.props.startDate.date()} - ${this.props.endDate.format('MMM')} ${this.props.endDate.date()}`
                } else {
                    current = `${this.props.startDate.format('MMMM')} ${this.props.startDate.date()} - ${this.props.endDate.date()}`

                }
                break;
            case  calendarMode.MONTH:
                current = this.props.startDate.format('MMMM');
                prev = this.props.startDate.clone().subtract(1, 'M').format('MMM');
                next = this.props.startDate.clone().add(1, 'M').format('MMM');
                break;
            default:
                prev = 'PREV';
                next = 'NEXT';
                current = 'CURRENT';
                break;
        }

        return (
            <div className={styles.container}>
                <div className={styles.headerNav}>
                    <span onClick={this.props.onPrevClick} className={styles.prevNext}>
                        {
                            prev
                        }
                    </span>
                    <div onClick={this.onDropDownButtonClick} className={styles.currentContainer}
                         ref={this.setDropDownButton}>
                        <span className={styles.current}>
                            {
                                current
                            }
                        </span>
                        <FontAwesomeIcon className={styles.dropDownButton} icon={chevron}/>
                    </div>
                    <span onClick={this.props.onNextClick} className={styles.prevNext}>
                        {
                            next
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
    onPrevClick: PropTypes.func,
    onNextClick: PropTypes.func,
    onModeChange: PropTypes.func,
    startDate: PropTypes.instanceOf(moment),
    endDate: PropTypes.instanceOf(moment),
    mode: PropTypes.oneOf(Object.values(calendarMode)),
};



