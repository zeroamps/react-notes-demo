import React from 'react';
import ReactDOM from 'react-dom/client';

import { Toolbar } from './layout/Toolbar';
import { NoteList } from './notes/NoteList';

import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toolbar />
    <NoteList />
  </React.StrictMode>
);
