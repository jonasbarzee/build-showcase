import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useUser } from '../UserContext';

export function Login() {


    const { login } = useUser();
    const [username, setUsernameBox] = useState('');
    const [password, setPasswordBox] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password);
        setUsernameBox('');
        setPasswordBox('');
    };


    return (
        <main>
            <section>
                {/* <!--Username and password input boxes--> */}
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <div className="continer">
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
                                        <button type="submit" className="btn btn-primary"> sign in </button>
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
