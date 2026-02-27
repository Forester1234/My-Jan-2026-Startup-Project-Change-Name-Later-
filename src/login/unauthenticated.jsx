import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName || '');
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    if (!userName || !password) {
      setDisplayError('Please enter a name and password.');
      return;
    }
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  async function createUser() {
    if (!userName || !password) {
      setDisplayError('Please enter a name and password.');
      return;
    }
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  return (
    <>
        <div className="login-form container text-center mt-5">
            <h2>Login or Create Account</h2>
            <div className="input-group mb-3">
            <span className="input-group-text">@</span>
            <input
                className="form-control"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Player Name"
            />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">🔒</span>
                <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
            </div>

            <div className="d-flex justify-content-center gap-2">
                <Button variant="primary" onClick={loginUser} disabled={!userName || !password}>
                    Login
                </Button>
                <Button variant="secondary" onClick={createUser} disabled={!userName || !password}>
                    Create
                </Button>
            </div>
        </div>

        <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}