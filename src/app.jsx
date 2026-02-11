import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
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
                <li className="nav-item"><a className="nav-link" href="index.html">Login</a></li>
                <li className="nav-item"><a className="nav-link" href="startgame.html">Join Game</a></li>
                <li className="nav-item"><a className="nav-link" href="character.html">Character Creator</a></li>
                <li className="nav-item"><a className="nav-link" href="game.html">Game</a></li>
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
  );
}