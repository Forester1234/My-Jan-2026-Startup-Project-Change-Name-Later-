import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Character({onCharacterCreate}) {
  const navigate = useNavigate();

  const [name, setName] = React.useState('');
  const [health, setHealth] = React.useState(0);
  const [skill, setSkill] = React.useState(0);
  const [magic, setMagic] = React.useState(0);
  const [error, setError] = React.useState(null);

  async function handleSubmit() {
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

    const maxHP = 7 + Number(health);

    const characterData = {
      name,
      healthStat: Number(health),
      skillStat: Number(skill),
      magicStat: Number(magic),
      maxHP,
      currentHP: maxHP,
    };
    try {
      const response = await fetch('/api/game/join', {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: localStorage.getItem('gameName'),
          player: localStorage.getItem('userName'),
          character: characterData,
        }),
      });

      if (response.status === 409) {
        setError('You have already joined this game.');
        return;
      }

      if (response.status === 403) {
        setError('The GM cannot join as a player.');
        return;
      }

      onCharacterCreate(characterData);
      navigate('/game');
    }
    catch (err) {
      console.error(err);
    }
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
                  onChange={(e) => setHealth(Number(Math.min(3, Math.max(0, Number(e.target.value)))))}
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
                  onChange={(e) => setSkill(Number(Math.min(3, Math.max(0, Number(e.target.value)))))}
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
                  onChange={(e) => setMagic(Number(Math.min(3, Math.max(0, Number(e.target.value)))))}
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
