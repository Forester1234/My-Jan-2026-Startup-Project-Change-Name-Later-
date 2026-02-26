import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { StartGame } from './startgame/startgame';
import { Character } from './character/character';
import { Game } from './game/game';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const [selectedGame, setSelectedGame] = React.useState(null);
  const [character, setCharacter] = React.useState(null);
  return (
    <BrowserRouter>
      <div className="body">
        <header>
          <nav className="navbar navbar-expand-lg navbar-light bg-transparent rounded">
            <div className="container-fluid">
              <NavLink className="navbar-brand" to="/login">Digital Dragons</NavLink>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navMenu">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                  {authState === AuthState.Authenticated && (
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/startgame">
                        Join Game
                      </NavLink>
                    </li>
                  )}
                  {selectedGame && (
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/character">
                        Character Creator
                      </NavLink>
                    </li>
                  )}
                  {selectedGame && character && (
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/game">
                        Game
                      </NavLink>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </header>

        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/startgame' element={<StartGame />} />
          <Route path='/character' element={<Character />} />
          <Route path='/game' element={<Game />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        
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

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}

export default App;
