import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Scores } from './startgame/startgame';
import { Play } from './character/character';
import { About } from './game/game';

export default function App() {
  return (
    <BrowserRouter>
      <div className="body bg-dark text-light">
        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-transparent rounded">
            <div className="container-fluid">
              <a className="navbar-brand" href="index.html">Digital Dragons</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navMenu">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to="/startgame">Join Game</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to="/character">Character Creator</NavLink></li>
                  <li className="nav-item"><NavLink className="nav-link" to="/game">Game</NavLink></li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        <main>App will display here</main>
        
        <footer>
          <hr />
          <div className="footer-content">
            <span className="text-reset">Justin Forester Chapman</span>
            <a href="https://github.com/Forester1234/Foresters-Digital-Dragons-Game" target="_blank" rel="noopener noreferrer">Github</a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}