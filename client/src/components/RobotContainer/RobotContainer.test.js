import React from 'react';
import ReactDOM from 'react-dom';
import RobotContainer from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RobotContainer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
