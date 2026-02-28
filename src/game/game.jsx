import React from 'react';
import './game.css';
import forestMap from '../../images/forest-map.png';

export function Game({ role, character, selectedGame }) {
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');

  function handleSend(e) {
    e.preventDefault();
    if (!input) return;

    setMessages([...messages, input]);
    setInput('');
  }

  return (
    <main>
      <div className="container">
        <h2 className="mb-3">
          {selectedGame?.name} — {role === 'gm' ? 'Game Master' : 'Adventurer'}
        </h2>

        <div className="row g-4">

          {/* Column 1: Party */}
          <aside className="col-lg-4">
            <section className="framed">
              <h2>Party</h2>
              
              {role === 'player' && character && (
                <div className="party-member">
                  <strong>{character.name}</strong>
                  <div>Health: {character.health}</div>
                  <div>Skill: {character.skill}</div>
                  <div>Magic: {character.magic}</div>
                </div>
              )}

              {role === 'gm' && (
                <div className="party-member">
                  <em>Waiting for players to join...</em>
                </div>
              )}
            </section>
          </aside>

          {/* Column 2: Adventure Area */}
          <div className="col-lg-8">
            <section className="framed">
              <img
                src={forestMap}
                alt="forest map of the current area"
                className="img-fluid rounded adventure-map"
              />
            </section>

            <section className="mt-3 framed">
              <h3>Party Actions</h3>

              <ul>
                {messages.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>

              <form 
                className="d-flex gap-2"
                onSubmit={handleSend}
              >
                <input
                  type="text"
                  className="form-control"
                  placeholder="Talk to your party"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  type="submit"
                  name="action"
                  value="first"
                >
                  Send
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
