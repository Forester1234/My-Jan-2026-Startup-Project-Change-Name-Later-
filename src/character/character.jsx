import React from 'react';

export function Character() {
  return (
    <main>
      <div className="container">
        <section className="mb-4">
          <h2>Create Your Character</h2>
          <p>Determine your character for the adventure.</p>

          <form method="get" action="game.html" className="row g-3">
            <div className="col-12">
              <label htmlFor="character-name" className="form-label">Character Name</label>
              <input id="character-name" name="name" type="text" className="form-control" placeholder="Enter character name"/>
            </div>

            <div className="col-12">
              <p className="mb-1">Distribute 5 points across the following stats (max 3 in any stat)</p>
            </div>

            <div className="col-12 col-md-4">
              <label htmlFor="character-health" className="form-label">Health</label>
              <div className="input-group stat-row">
                <input id="character-health" name="health" type="number" className="form-control text-center" value="0" min="0" max="3" aria-label="Health value"/>
              </div>
              <div className="form-text">Increases how much damage you can take</div>
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="character-skill" className="form-label">Skill</label>
              <div className="input-group stat-row">
                <input id="character-skill" name="skill" type="number" className="form-control text-center" value="0" min="0" max="3" aria-label="Skill value"/>
              </div>
              <div className="form-text">Increases weapon damage</div>
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="character-magic" className="form-label">Magic</label>
              <div className="input-group stat-row">
                <input id="character-magic" name="magic" type="number" className="form-control text-center" value="0" min="0" max="3" aria-label="Magic value"/>
              </div>
              <div className="form-text">Gives access to spells</div>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary" name="action" value="first">Finish Character</button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}