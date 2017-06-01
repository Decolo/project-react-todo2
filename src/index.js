import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import UserDialog from './UserDialog';

ReactDOM.render( 
   <div className="content-wrap">
     <App/>
     <UserDialog/>
   </div>,
    document.getElementById('root')
);