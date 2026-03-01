import React from 'react';
import './game.css';
import forestMap from '../../images/forest-map.png';

export function Game({ role, character, selectedGame }) {
  const [players, setPlayers] = React.useState([]);
  const [spellUses, setSpellUses] = React.useState(
    character?.magicStat || 0
  );
  const [selectedTarget, setSelectedTarget] = React.useState('');
  const [selectedSpellTargets, setSelectedSpellTargets] = React.useState([]);

  const [selectedMonster, setSelectedMonster] = React.useState('');

  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');
  const chatRef = React.useRef(null);
  const [mapImage, setMapImage] = React.useState(forestMap);
  const [mapInput, setMapInput] = React.useState('');

  const [monsters, setMonsters] = React.useState([]);
  const [monsterName, setMonsterName] = React.useState('');
  const [monsterHP, setMonsterHP] = React.useState('');
  const [monsterAttack, setMonsterAttack] = React.useState('');

  React.useEffect(() => {
    if (players.length === 0) {
      setPlayers([
        {
          name: 'Test Player',
          currentHP: 20,
          maxHP: 20,
          skillStat: 2,
          magicStat: 1,
        }
      ]);
    }
  }, []);

  React.useEffect(() => {
    if (monsters.length === 0) {
      setMonsters([
        {
          name: 'Training Dummy 1',
          hp: 20,
          attack: '0d6',
        },
        {
          name: 'Training Dummy 2',
          hp: 20,
          attack: '0d6',
        }
      ]);
    }
  }, []);

  React.useEffect(() => {
    if (character?.magicStat) {
      setSpellUses(character.magicStat);
    }
  }, [character]);

  React.useEffect(() => {
    if (chatRef.current) {
      requestAnimationFrame(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      });
    }
  }, [messages]);

  function getWeapon(skill) {
    const weapons = [
      { name: 'Punch', dice: 1 },
      { name: 'Dagger', dice: 2 },
      { name: 'Longsword', dice: 3 },
      { name: 'Halberd', dice: 4 },
    ];
    return weapons[skill] || weapons[0];
  }

  function getSpell(magic) {
    const spells = [
      null,
      { name: 'Spark', dice: 2 },
      { name: 'Fire Bolt', dice: 3 },
      { name: 'Fireball', dice: 4 },
    ];
    return spells[magic];
  }

  function rollDice(diceCount) {
    let total = 0;
    for (let i = 0; i < diceCount; i++) {
      total += Math.floor(Math.random() * 6) + 1;
    }
    return total;
  }

  function applyDamageToMonster(index, damage) {
    let targetName = '';
    let died = false;

    setMonsters(prev =>
      prev
        .map((monster, i) => {
          if (i !== index) return monster;

          targetName = monster.name;

          const newHP = monster.hp - damage;
          if (newHP <= 0) {
            died = true;
          }

          return {
            ...monster,
            hp: newHP,
          };
        })
        .filter(monster => monster.hp > 0)
    );

    return { targetName, died };
  }

  function handleMonsterAttack() {
    if (selectedTarget === '' || selectedMonster === '') return;

    const monsterIndex = Number(selectedMonster);
    const monster = monsters[monsterIndex];
    const targetIndex = Number(selectedTarget);
    const targetPlayer = players[targetIndex];

    if (!targetPlayer) return;

    let damage = 0;
    const attackStr = monster.attack.trim();

    const diceMatch = attackStr.match(/(\d+)d(\d+)(\+(\d+))?/);
    if (diceMatch) {
      const count = Number(diceMatch[1]);
      const sides = Number(diceMatch[2]);
      const bonus = diceMatch[4] ? Number(diceMatch[4]) : 0;

      for (let i = 0; i < count; i++) {
        damage += Math.floor(Math.random() * sides) + 1;
      }
      damage += bonus;
    } else if (!isNaN(Number(attackStr))) {
      damage = Number(attackStr);
    }

    const newHP = Math.max(0, targetPlayer.currentHP - damage);

    setPlayers(prev =>
      prev.map((p, i) => i === targetIndex ? { ...p, currentHP: newHP } : p)
    );

    setMessages(prev => [
      ...prev,
      { sender: monster.name, text: `${monster.name} attacks ${targetPlayer.name} for ${damage} damage!` },
      ...(newHP <= 0 ? [{ sender: 'System', text: `${targetPlayer.name} has been defeated!` }] : [])
    ]);

    setSelectedTarget('');
    setSelectedMonster('');
  }

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;

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

              {role === 'gm' && players.map((p, i) => (
                <div key={i} className="party-member">
                  <strong>{p.name} (Test)</strong>
                  <div>HP: {p.currentHP} / {p.maxHP}</div>
                  <div>Skill: {p.skillStat}</div>
                  <div>Magic: {p.magicStat}</div>
                </div>
              ))}
              
              {role === 'player' && character && (
                <div className="party-member">
                  <strong>{character.name}</strong>
                  <div>
                    HP: {character.currentHP} / {character.maxHP}
                  </div>
                  <div>
                    Skill: {character.skillStat}
                  </div>
                  {(() => {
                    const weapon = getWeapon(character.skillStat);

                    return (
                      <div>
                        ⚔ Attack: {weapon.name} ({weapon.dice}d6)

                        {monsters.length > 0 && (
                          <>
                            <select
                              className="form-select form-select-sm my-1"
                              value={selectedTarget}
                              onChange={(e) => setSelectedTarget(e.target.value)}
                            >
                              <option value="">Choose target</option>
                              {monsters.map((m, i) => (
                                <option key={i} value={i}>
                                  {m.name} (HP: {m.hp})
                                </option>
                              ))}
                            </select>

                            <button
                              type="submit"
                              name="action"
                              value="first"
                              disabled={selectedTarget === ''}
                              onClick={() => {
                                const damage = rollDice(weapon.dice);
                                const targetPlayerIndex = Number(selectedTarget);
                                const targetPlayer = players[targetPlayerIndex];

                                const newHP = Math.max(0, targetPlayer.currentHP - damage);

                                setPlayers(prev =>
                                  prev.map((p, i) =>
                                    i === targetPlayerIndex ? { ...p, currentHP: newHP } : p
                                  )
                                );

                                setMessages(prev => [
                                  ...prev,
                                  {
                                    sender: character.name,
                                    text: `${weapon.name} hits ${targetName} for ${damage} damage!`
                                  },
                                  ...(died
                                    ? [{
                                        sender: 'System',
                                        text: `${targetName} has been slain!`
                                      }]
                                    : [])
                                ]);

                                setSelectedTarget('');
                              }}
                            >
                              Use
                            </button>
                          </>
                        )}
                      </div>
                    );
                  })()}

                  <div>
                    Magic: {character.magicStat}
                  </div>

                  {character.magicStat > 0 && (() => {
                    const spell = getSpell(character.magicStat);

                    return (
                      <div className="mt-2">
                        🔮 Spell: {spell.name} ({spell.dice}d6)
                        <span className="ms-2">
                          Uses: {spellUses} / {character.magicStat}
                        </span>

                        {monsters.length > 0 && (
                          <>
                            <select
                              multiple
                              className="form-select form-select-sm my-1"
                              value={selectedSpellTargets}
                              onChange={(e) => {
                                const values = Array.from(
                                  e.target.selectedOptions,
                                  option => option.value
                                );

                                if (values.length <= 2) {
                                  setSelectedSpellTargets(values);
                                }
                              }}
                            >
                              {monsters.map((m, i) => (
                                <option key={i} value={i}>
                                  {m.name} (HP: {m.hp})
                                </option>
                              ))}
                            </select>

                            <button
                              type="submit"
                              name="action"
                              value="first"
                              disabled={
                                spellUses <= 0 || selectedSpellTargets.length === 0
                              }
                              onClick={() => {
                                setSpellUses(prev => prev - 1);

                                const newMessages = [];

                                selectedSpellTargets.forEach(index => {
                                  const damage = rollDice(spell.dice);

                                  const { targetName, died } = applyDamageToMonster(Number(index), damage);

                                  newMessages.push({
                                    sender: character.name,
                                    text: `${spell.name} hits ${targetName} for ${damage} damage!`
                                  });

                                  if (died) {
                                    newMessages.push({
                                      sender: 'System',
                                      text: `${targetName} has been incinerated!`
                                    });
                                  }
                                });

                                setMessages(prev => [...prev, ...newMessages]);

                                setSelectedSpellTargets([]);
                              }}
                            >
                              Cast
                            </button>
                          </>
                        )}
                      </div>
                    );
                  })()}
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

            {role === 'gm' && (
              <section className="mt-3 framed">
                <h4>Create Monster</h4>
                <form
                  className="row g-2 align-items-end"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!monsterName || !monsterHP || !monsterAttack) return;

                    setMonsters((prev) => [
                      ...prev,
                      {
                        name: monsterName,
                        hp: Number(monsterHP),
                        attack: monsterAttack,
                      },
                    ]);

                    setMonsterName('');
                    setMonsterHP('');
                    setMonsterAttack('');
                  }}
                >
                  <div className="col-4">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={monsterName}
                      onChange={(e) => setMonsterName(e.target.value)}
                      placeholder="Monster Name"
                    />
                  </div>
                  <div className="col-4">
                    <label className="form-label">HP</label>
                    <input
                      type="number"
                      className="form-control"
                      value={monsterHP}
                      onChange={(e) => setMonsterHP(e.target.value)}
                      placeholder="Health"
                      min="1"
                    />
                  </div>
                  <div className="col-4">
                    <label className="form-label">Attack</label>
                    <input
                      type="text"
                      className="form-control"
                      value={monsterAttack}
                      onChange={(e) => setMonsterAttack(e.target.value)}
                      placeholder="3d6"
                    />
                  </div>
                  <div className="col-12">
                    <button 
                      type="submit"
                      name="action"
                      value="first"
                    >
                      Add Monster
                    </button>
                  </div>
                </form>
              </section>
            )}

            <section className="framed mt-3">
              <h3>Monsters</h3>
              {monsters.length === 0 ? (
                <p>No monsters yet.</p>
              ) : (
                <ul className="list-group">
                  {monsters.map((m, i) => (
                    <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                      <span>
                        <strong>{m.name}</strong> — HP: {m.hp} — Attack: {m.attack}
                      </span>
                      {role === 'gm' && (
                        <button
                          type="button"
                          name="action"
                          value="second"
                          onClick={() =>
                            setMonsters(monsters.filter((_, index) => index !== i))
                          }
                        >
                          Remove
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {role === 'gm' && (
              <section className="mt-3 framed">
                <h4>Attack Player</h4>
                <div className="d-flex gap-2 align-items-end">
                  <select
                    className="form-select"
                    value={selectedMonster}
                    onChange={(e) => setSelectedMonster(e.target.value)}
                  >
                    <option value="">Choose monster</option>
                    {monsters.map((m, i) => (
                      <option key={i} value={i}>{m.name}</option>
                    ))}
                  </select>
                  <select
                    className="form-select"
                    value={selectedTarget}
                    onChange={(e) => setSelectedTarget(e.target.value)}
                  >
                    <option value="">Choose player</option>
                    {players.map((p, i) => (
                      <option key={i} value={i}>{p.name}</option>
                    ))}
                  </select>

                  <button
                    type="submit"
                    name="action"
                    value="first"
                    onClick={() => handleMonsterAttack()}
                    disabled={!selectedTarget || selectedMonster === ''}
                  >
                    Attack Player
                  </button>
                </div>
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
