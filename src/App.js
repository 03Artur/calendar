import React from 'react';
import logo from './logo.svg';
import './App.css';
import moment from 'moment';
import Calendar from './components/Calendar/Calendar'

function App() {
    console.log('moment: ', moment);
    return (
        <div style={{padding:'0 30px'}}>
            <Calendar/>
        </div>
    );
}

export default App;
