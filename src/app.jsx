import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Gallery } from './gallery/gallery';
import { Trending } from './trending/trending';
import { Voting } from './voting/voting';
import { Login } from './login/login';
import { Header } from './header/header';
import { Footer } from './footer/footer';

export default function App() {
    return (
        <BrowserRouter>
            <div className='app-container'>
                <Header></Header>

                <Routes>
                    <Route path='/' element={<Login />} exact />
                    <Route path='/gallery' element={<Gallery />} />
                    <Route path='/trending' element={<Trending />} />
                    <Route path='/voting' element={<Voting />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <Footer></Footer>

            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main>404: Address Unknown.</main>;
}
