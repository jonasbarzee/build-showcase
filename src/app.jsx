import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Gallery } from './gallery/gallery';
import { Trending } from './trending/trending';
import { Voting } from './voting/voting';
import { Login } from './login/login';

export default function App() {
    return (

        <BrowserRouter>
            <header>
                <nav className="d-flex flex-wrap align-items-center justify-content-between border-bottom gap-4 p-3">
                    <img src="TinkerVote.png" alt="TinkerVote Logo" style={{height: 50}} />
                        <div className="d-flex flex-wrap gap-3 px-2 justify-content-cetner">
                            <NavLink className='nav-link' to='voting'>Voting</NavLink>
                            <NavLink className='nav-link' to='trending'>Trending</NavLink>
                            <NavLink className='nav-link' to='gallery'>Gallery</NavLink>
                        </div>

                        <div className="user-info text-end mt-2 mt-md-0">
                            <span className="d-block d-md-inline">currently Logged In as</span>
                            <strong>@YourUsername</strong>
                        </div>
                </nav>
            </header>

            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/gallery' element={<Gallery />} />
                <Route path='/trending' element={<Trending />} />
                <Route path='/voting' element={<Voting />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main>404: Address Unknown.</main>;
}
