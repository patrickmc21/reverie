import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Nav />, div);
  ReactDOM.unmountComponentAtNode(div);
});
