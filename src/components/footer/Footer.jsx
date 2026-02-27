import React, { useState } from 'react';
import { useUser } from '@src/UserContext';
import { Show } from '@src/utils/showOrHide'
import { Dialog } from '@components/footer/Dialog';
import { useWeather } from '@/src/hooks/useWeather';


export function Footer() {

    const { isLoggedIn, logout, theme, toggleTheme } = useUser();

    const [showSettings, setShowSettings] = useState(false);
    const [showPost, setShowPost] = useState(false);
    const { weather, loading } = useWeather();

    return (
        <footer>
            <div className="container">

                <div className='weather-widget'>
                    {loading ? (<span>Detecting local climate...</span>
                    ) : (
                        <span>{weather.icon} {weather.temp}F - {weather.condition}</span>)}
                </div>
                {/* SETTINGS DIALOG */}
                <Dialog isOpen={showSettings} onClose={() => setShowSettings(false)} title='Settings'>
                    <p>Edit your settings here</p>

                    <button onClick={toggleTheme} className='btn btn-primary'>
                        Switch to {theme === 'light' ? 'Dark' : 'Light'} mode
                    </button>
                </Dialog>

                {/* CREATE POST DIALOG */}
                <Dialog isOpen={showPost} onClose={() => setShowPost(false)} title='Create Post'>
                    <p>Post your tinkering projects here</p>
                    <textarea className="form-control" placeholder="Put the text for your post here<"></textarea>
                    <button type="button" id="submitPost" className="btn btn-primary">post</button>
                </Dialog>

                {/* BUTTONS IN FOOTER */}
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div>
                            <button type="button" className="btn btn-primary"
                                onClick={() => setShowSettings(true)}>
                                settings &#x2699;
                            </button>

                            {/* BUTTONS FOR FOOTER */}
                            <Show when={isLoggedIn}>
                                <button type="button" id="openPostDialog" className="btn btn-primary"
                                    onClick={() => setShowPost(true)}>create post &#9998;
                                </button>

                                <button type="button" className="btn btn-primary" onClick={(e) => logout(e)}>
                                    logout &#8592;
                                </button>
                            </Show>

                        </div>
                    </div>
                </div>
            </div>
        </footer >
    );
}
