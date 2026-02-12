import React from 'react';
import './game.css';
import forestMap from '../../images/forest-map.png';

export function Game() {
  return (
    <main>
      <div className="container">
        <div className="row g-4">
          {/* Column 1: Party */}
          <aside className="col-lg-4">
            <section className="framed">
              <h2>Party</h2>
              
              <div className="party-list">
                  <div className="party-member">
                      <strong>Mordred</strong>
                      HP: 20/20<br />
                      Inventory:<br />
                      <ul>
                          <li>Sword</li>
                          <li>Poison Arrows</li>
                      </ul>
                      Spells:<br />
                  </div>

                  <div className="party-member">
                      <strong>Merlin</strong>
                      HP: 14/14<br />
                      Inventory:<br />
                      <ul>
                          <li>Staff</li>
                      </ul>
                      Spells:<br />
                      <ul>
                          <li>Minor Aid (3/3)</li>
                          <li>Missile (3/3)</li>
                          <li>Greater Aid (2/2)</li>
                          <li>Witch Bolt (2/2)</li>
                          <li>Mage Armor (1/1)</li>
                          <li>Fireball (1/1)</li>
                      </ul>
                  </div>

                  <div className="party-member">
                      <strong>Arthur</strong>
                      HP: 11/11<br />
                      Inventory:<br />
                      <ul>
                          <li>Caliburn</li>
                          <li>The spear Ron</li>
                      </ul>
                      Spells:<br />
                      <ul>
                          <li>Minor Aid (1/1)</li>
                          <li>Missile (1/1)</li>
                      </ul>
                  </div>
              </div>
            </section>
          </aside>

          {/* Column 2: Adventure Area */}
          <div className="col-lg-8">
            <section className="framed">
              <img src={forestMap} alt="forest map of the current area" className="img-fluid rounded adventure-map" />
            </section>

            <section className="mt-3 framed">
              <h3>Party Actions (WebSocket Data)</h3>
              <ul>
                <li>Arthur casts Missile</li>
                <li>
                  Mordred attacks with Sword -
                  <strong>Damage Roll (3rd-Party Dice Service): 1d6 + 5 → 11 damage</strong>
                </li>
                <li>Merlin: "What should we do next"</li>
              </ul>

              <form className="d-flex gap-2" role="search">
                <input id="action" name="message" type="text" className="form-control" placeholder="Talk to your party" />
                <button type="submit" name="action" value="first" className="btn">Send</button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}