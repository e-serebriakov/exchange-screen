import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App/App';
import './styles/index';

ReactDOM.render(<App />, document.getElementById('app'));

module.hot.accept();
