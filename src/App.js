import React from 'react';
import './App.css';
import Calendar from './components/Calendar/Calendar'
import db from './constants/databaseSimulation';

function App() {
    return (
        <div style={{background: 'gray', display: 'flex', justifyContent: 'center', minHeight: '100vh'}}>
            <Calendar events={db}/>
        </div>
    );
}

export default App;
