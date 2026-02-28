import React from 'react';
import './game.css';
import forestMap from '../../images/forest-map.png';

export function Game({ role, character, selectedGame }) {
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');
  const chatRef = React.useRef(null);
  const [mapImage, setMapImage] = React.useState(forestMap);
  const [mapInput, setMapInput] = React.useState('');

  React.useEffect(() => {
    if (chatRef.current) {
      requestAnimationFrame(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      });
    }
  }, [messages]);

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim) return;

    const senderName =
      role === 'gm'
        ? 'GM'
        : character?.name || 'Player';

    const newMessage = {
      sender: senderName,
      text: input.trim(),
    };

    setMessages((prev) => [...prev, newMessage]);
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
                src={mapImage}
                onError={() => setMapImage(forestMap)}
                alt="adventure map"
                className="img-fluid rounded adventure-map"
              />
            </section>
            {role === 'gm' && (
              <section className="mt-3 framed">
                <h4>Change Map</h4>
                <form
                  className="d-flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!mapInput.trim()) return;
                    setMapImage(mapInput.trim());
                    setMapInput('');
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Paste image URL"
                    value={mapInput}
                    onChange={(e) => setMapInput(e.target.value)}
                  />
                  <button 
                    type="submit"
                    name="action"
                    value="first"
                  >
                    Update
                  </button>
                </form>
              </section>
            )}


            <section className="mt-3 framed">
              <h3>Party Actions</h3>

              <div
                ref={chatRef}
                className="chat-box mb-2"
              >
                <ul className="list-unstyled mb-0">
                  {messages.map((msg, index) => (
                    <li key={index}>
                      <strong>{msg.sender}:</strong> {msg.text}
                    </li>
                  ))}
                </ul>
              </div>

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
