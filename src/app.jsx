import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Gallery } from '@components/gallery/Gallery';
import { Trending } from '@components/trending/Trending';
import { Voting } from '@components/voting/Voting';
import { Login } from '@components/login/Login';
import { Header } from '@components/header/Header';
import { Footer } from '@components/footer/Footer';
import { UserProvider } from '@src/UserContext';
import { ProtectedRoute } from '@src/routes/ProtectedRoute';
import { PublicOnlyRoute } from '@src/routes/PublicOnlyRoute';

export default function App() {
    return (
        <BrowserRouter>
            <div className='app-container'>

                <UserProvider>

                    <Header></Header>

                    <Routes>
                        <Route path='/' element={
                            <PublicOnlyRoute> <Login /> </PublicOnlyRoute>
                        } exact />

                        <Route path='/gallery' element={
                            <ProtectedRoute> <Gallery /> </ProtectedRoute>
                        } />
                        <Route path='/trending' element={
                            <ProtectedRoute> <Trending /> </ProtectedRoute>
                        } />
                        <Route path='/voting' element={
                            <ProtectedRoute> <Voting /> </ProtectedRoute>
                        } />

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
