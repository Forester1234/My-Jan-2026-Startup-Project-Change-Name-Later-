import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userName');
    props.onLogout();
  }

  return (
    <section className="container text-center mt-5">
        <h2>Welcome, {userName}!</h2>
        <div>
        <div className='playerName'>{props.userName}</div>
        <Button variant='primary' onClick={() => navigate('/play')}>
            Find Game
        </Button>
        <Button variant='secondary' onClick={() => logout()}>
            Logout
        </Button>
        </div>
    </section>
  );
}
