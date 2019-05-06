import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import styles from './Header.module.sass'
import {calendarMode} from '../../constants/enums'

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false,
        };
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (e) => {
        if ((this._dropDownButton && !this._dropDownButton.contains(e.target)) && this._dropDownContent && !this._dropDownContent.contains(e.target)) {
            this.setState({isMenuOpen: false});
        }

    };

    onDropDownButtonClick = (e) => {
        this.setState({isMenuOpen: !this.state.isMenuOpen});
    };
    /*
    *
    * ref callback
    * */

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
                    <div onClick={() => {this.changeMode(calendarMode.WEEK);}}>This week</div>
                    <div onClick={() => {this.changeMode(calendarMode.MONTH);}}>This month</div>
                </div>
            );
        }
    };

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.headerNav}>
                    <span onClick={this.props.onPrevClick} className={styles.prevNext}>{
                        this.props.prev
                    }</span>
                    <div
                        ref={this.setDropDownButton} className={styles.currentContainer}
                        onClick={this.onDropDownButtonClick}>
                        <span className={styles.current}>{this.props.current}</span>
                        <FontAwesomeIcon className={styles.dropDownButton}
                                         icon={this.state.isMenuOpen ? faChevronUp : faChevronDown}/>
                    </div>
                    <span onClick={this.props.onNextClick}
                          className={styles.prevNext}>{this.props.next}</span>
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
    current: PropTypes.string,
    onPrevClick: PropTypes.func,
    onNextClick: PropTypes.func,
    onModeChange: PropTypes.func,
};

Header.defaultProps = {
    prev: 'PREV',
    next: 'NEXT',
    current: 'CURRENT',
    onPrevClick: function (e) {
        console.log('onPrevClick')
    },
    onNextClick: function (e) {
        console.log('onNextClick')
    },
    onModeChange: function () {

    }
};


export default Header;