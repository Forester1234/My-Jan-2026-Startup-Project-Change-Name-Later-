import React from 'react';
import { useNavigate } from 'react-router-dom';

export function StartGame({ onGameSelect, setRole, character }) {
  const navigate = useNavigate();
  const [adventure, setAdventure] = React.useState('');

  function handleAction(type){
    if (!adventure) return;

    const gameData = {
      name: adventure,
    };

    onGameSelect(gameData);

    if (type === 'join') {
      setRole('player');

      if (character) {
        navigate('/game');
      } else {
        navigate('/character');
      }

    } else if (type === 'create') {
      setRole('gm');
      navigate('/game');
    }
  }

  return (
    <main>
      <section>
        <h2>Welcome to adventure!</h2>
        <form onSubmit={(e) =>e.preventDefault()} className="row g-3 align-items-end">
          <div className="col-12 col-md-8">
            <label htmlFor="adventure-name" className="form-label">
              Adventure
            </label>
            <input
              id="adventure-name"
              name="adventure"
              type="text"
              className="form-control"
              placeholder="Enter the game name"
              value={adventure}
              onChange={(e) => setAdventure(e.target.value)}
            />
          </div>

          <div className="col-12 col-md-4 d-flex gap-2">
            <button
              type="button"
              name="action"
              value="first"
              className="btn btn-primary"
              onClick={() => handleAction('join')}
              disabled={!adventure}
            >
              Join
            </button>

            <button
              type="button"
              name="action"
              value="second"
              className="btn btn-outline-secondary"
              onClick={() => handleAction('create')}
              disabled={!adventure}
            >
              Create
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
