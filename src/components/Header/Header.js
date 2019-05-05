import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import styles from './Header.module.sass'

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false,
        }
    }

    componentDidMount() {
        window.addEventListener('mouseup', this.handleClickOutside);
    }

    componentWillUnmount() {
        window.removeEventListener('mouseup', this.handleClickOutside);
    }

    handleClickOutside = (e) => {
        if (this._dropDownRef.contains(e.target)) {
            return;
        }
        this.setState({isMenuOpen: false});
    };

    onDropDownButtonClick = (e) => {
        this.setState({isMenuOpen: !this.state.isMenuOpen});
    };

    getDropDownRef = (node) => {
        this._dropDownRef = node;
    };

    renderMenu = () => {
        if (this.state.isMenuOpen) {
            return (
                <div className={styles.dropContent}>
                    <div>This week</div>
                    <div>This month</div>
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
                    <div className={styles.currentContainer} ref={this.getDropDownRef} onClick={this.onDropDownButtonClick}>
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
};

Header.defaultProps = {
    prev: 'PREV',
    next: 'NEXT',
    current: 'CURRENT',
    onPrevClick: function (e) {

    },
    onNextClick: function (e) {

    },
};


export default Header;