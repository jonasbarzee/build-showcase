import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLocalStorage } from '../../useLocalStorage';

export function Header() {

    const [username] = useLocalStorage('username', 'Undefined');

    return (
        <header>
            <nav className="d-flex flex-wrap align-items-center justify-content-between border-bottom gap-4 p-3">
                <img src="TinkerVote.png" alt="TinkerVote Logo" style={{ height: 50 }} />
                <div className="d-flex flex-wrap gap-3 px-2 justify-content-cetner">
                    <NavLink className='nav-link' to='/'>Login</NavLink>
                    <NavLink className='nav-link' to='voting'>Voting</NavLink>
                    <NavLink className='nav-link' to='trending'>Trending</NavLink>
                    <NavLink className='nav-link' to='gallery'>Gallery</NavLink>
                </div>

                <a href="https://github.com/jonasbarzee/build-showcase" className="ms-auto btn btn-primary">Jonas Barzee - My Github Repo</a>


                <div className="user-info text-end mt-2 mt-md-0">
                    <span className="d-block d-md-inline">currently Logged In as</span>
                    <strong>{username}</strong>
                </div>
            </nav>
        </header>
    );
}
