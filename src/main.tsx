import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toolbar } from './components/Header';
import { NoteList } from './components/NoteList';

import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toolbar />
    <NoteList />
  </React.StrictMode>
);
