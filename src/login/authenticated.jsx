import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userName');
    props.onLogout();
  }

  return (
    <section className="container text-center mt-5">
      <h2>Welcome, {props.userName}!</h2>
      <div>
        <div className='playerName'>{props.userName}</div>
        <div className="d-flex justify-content-center gap-2">
          <Button
            type="button"
            name="action"
            value="first"
            onClick={() => navigate('/startgame')}
          >
            Find Game
          </Button>
          <Button
            type="button"
            name="action"
            value="second"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </div>
    </section>
  );
}
