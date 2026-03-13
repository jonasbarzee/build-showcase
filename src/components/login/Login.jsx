import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@src/UserContext';

export function Login() {


    const { isLoggedIn, createUser, loginUser } = useUser();
    const [username, setUsernameBox] = useState('');
    const [password, setPasswordBox] = useState('');
    const navigate = useNavigate();

    const handleCreate = (e) => {
        e.preventDefault();
        createUser(username, password);
        setUsernameBox('');
        setPasswordBox('');
        if (isLoggedIn) {
            navigate('/trending');
        }
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        loginUser(username, password);
        setUsernameBox('');
        setPasswordBox('');
        if (isLoggedIn) {
            navigate('/trending');
        }
    };


    return (
        <main>
            <section>
                {/* <!--Username and password input boxes--> */}
                <form>
                    <fieldset>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-md-6 col-lg-4">
                                    <h2>Login</h2>
                                    <div className="mb-3">
                                        {/* <!-- Includes validation--> */}
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input type="text" id="username" name="username" autoComplete="username" placeholder="required"
                                            required className="form-control"
                                            value={username}
                                            onChange={(e) => setUsernameBox(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" id="password" name="password" required pattern="[^\s]+"
                                            placeholder="required" aria-describedby="hint" autoComplete="current-password" className="form-control" value={password} onChange={(e) => setPasswordBox(e.target.value)} />
                                        <p id="hint">Password cannot include any spaces</p>
                                        <p>This section is my login placeholder as it doesn't authenticate through a database yet
                                        </p>
                                        <button type="submit" className="btn btn-primary" onClick={(e) => handleSignIn(e)}> sign in </button>
                                        <button type="submit" className="btn btn-primary" onClick={(e) => handleCreate(e)}> create </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    {/* <!-- Submit form with POST method and enctype="multipart/form-data" to send file contents. --> */}
                </form>
            </section>
        </main>
    );
}
