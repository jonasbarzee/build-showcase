import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Gallery } from './components/gallery/Gallery';
import { Trending } from './components/trending/Trending';
import { Voting } from './components/voting/Voting';
import { Login } from './components/login/login';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { UserProvider } from './UserContext';

export default function App() {
    return (
        <BrowserRouter>
            <div className='app-container'>

                <UserProvider>

                    <Header></Header>

                    <Routes>
                        <Route path='/' element={<Login />} exact />
                        <Route path='/gallery' element={<Gallery />} />
                        <Route path='/trending' element={<Trending />} />
                        <Route path='/voting' element={<Voting />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>

                    <Footer></Footer>

                </UserProvider>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main>404: Address Unknown.</main>;
}
