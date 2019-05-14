import React from 'react';
import './App.css';
import Calendar from './components/Calendar/Calendar'
import db from './constants/databaseSimulation';

function App() {
    return (
        <Calendar events={db}/>
    );
}

export default App;
