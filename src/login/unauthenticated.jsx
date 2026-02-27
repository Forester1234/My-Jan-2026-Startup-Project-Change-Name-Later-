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
        <div>
            

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