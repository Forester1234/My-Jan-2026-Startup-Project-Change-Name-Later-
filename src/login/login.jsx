import React from 'react';

export function Login() {
  return (
    <main>
      <section>
        <h2>Login</h2>
        <form method="get" action="startgame.html">
          <div className="mb-3">
            <label for="username" className="form-label">Player Name</label>
            <input id="username" name="username" type="text" className="form-control" placeholder="Enter your name" />
          </div>
          <div className="mb-3">
            <label for="password" className="form-label">Password</label>
            <input id="password" name="password" type="password" className="form-control" placeholder="Enter your password" />
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary" type="submit" name="action" value="first">Login</button>
            <button className="btn btn-outline-secondary" type="submit" name="action" value="second">Create</button>
          </div>
        </form>
      </section>
    </main>
  );
}