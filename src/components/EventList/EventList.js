import React, {Component} from 'react';
import PropTypes from 'prop-types';


function EventList({events, ...props}) {

    const renderEvents = () =>{

    };

    return (
        <div>
            {
                renderEvents()
            }
        </div>

    );
}

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),

};

export default EventList;