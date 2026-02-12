import React from 'react';

export function StartGame() {
  return (
    <main>
      <section>
        <h2>Welcome to adventure!</h2>
        <form method="get" action="character.html" className="row g-3 align-items-end">
          <div className="col-12 col-md-8">
            <label htmlFor="adventure-name" className="form-label">Adventure</label>
            <input id="adventure-name" name="adventure" type="text" className="form-control" placeholder="Enter the game name" />
          </div>
          <div className="col-12 col-md-4 d-flex gap-2">
            <button type="submit" name="action" value="first" className="btn btn-primary">Join</button>
            <button type="submit" name="action" value="second" className="btn btn-outline-secondary">Create</button>
          </div>
        </form>
      </section>
    </main>
  );
}