import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Character({onCharacterCreate}) {
  const navigate = useNavigate();

  const [name, setName] = React.useState('');
  const [health, setHealth] = React.useState(0);
  const [skill, setSkill] = React.useState(0);
  const [magic, setMagic] = React.useState(0);
  const [error, setError] = React.useState(null);

  function handleSubmit() {
    setError(null);

    const total = Number(health) + Number(skill) + Number(magic);

    if (!name) {
      setError('Please enter a character name.');
      return;
    }

    if (total !== 5) {
      setError('Must distribute 5 points.');
      return;
    }

    const characterData = {
      name, 
      health: Number(health),
      skill: Number(skill),
      magic: Number(magic)
    };

    onCharacterCreate(characterData);
    navigate('/game');
  }

  const total = health + skill + magic;
  const remaining = 5 - total;

  return (
    <main>
      <div className="container">
        <section className="mb-4">
          <h2>Create Your Character</h2>
          <p>Distribute 5 points across the following stats (max 3 in any stat)</p>

          {error && <div className="text-danger mb-3">{error}</div>}

          <form onSubmit={(e) => e.preventDefault()} className="row g-3">
            <div className="col-12">
              <label htmlFor="character-name" className="form-label">
                Character Name
              </label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter character name"
              />
            </div>

            <p>Points remaining: <strong>{remaining}</strong></p>

            <div className="col-12 col-md-4">
              <label htmlFor="character-health" className="form-label">
                Health
              </label>
              <div className="input-group stat-row">
                <input
                  type="number"
                  className="form-control text-center"
                  min="0"
                  max="3"
                  value={health}
                  onChange={(e) => setHealth(Number(e.target.value))}
                />
              </div>
              <div className="form-text">
                Increases how much damage you can take
              </div>
            </div>

            <div className="col-12 col-md-4">
              <label htmlFor="character-skill" className="form-label">
                Skill
              </label>
              <div className="input-group stat-row">
                <input
                  type="number"
                  className="form-control text-center"
                  min="0"
                  max="3"
                  value={skill}
                  onChange={(e) => setSkill(Number(e.target.value))}
                />
              </div>
              <div className="form-text">
                Increases weapon damage
              </div>
            </div>

            <div className="col-12 col-md-4">
              <label htmlFor="character-magic" className="form-label">
                Magic
              </label>
              <div className="input-group stat-row">
                <input
                  type="number"
                  className="form-control text-center"
                  min="0"
                  max="3"
                  value={magic}
                  onChange={(e) => setMagic(Number(e.target.value))}
                />
              </div>
              <div className="form-text">
                Gives access to spells
              </div>
            </div>


            <div className="col-12">
              <button
                type="button"
                name="action"
                value="first"
                onClick={handleSubmit}
              >
                Finish Character
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
