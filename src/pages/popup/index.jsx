import React from 'react';
import { createRoot } from 'react-dom/client';
import './popup.css';
import Popup from './popup';

function init() {
  const appContainer = document.querySelector('#app-container')
  const root = createRoot(appContainer)
  root.render(<Popup />)
}

init();