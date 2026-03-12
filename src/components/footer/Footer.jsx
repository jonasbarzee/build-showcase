import React from 'react';
import { useUser } from '@src/UserContext';
import { Show } from '@src/utils/showOrHide'
import { WeatherWidget } from './WeatherWidget';
import { SettingsDialog } from './SettingsDialog';
import { CreatePostDialog } from './CreatePostDialog';


export function Footer() {

    const { isLoggedIn, logoutUser, } = useUser();

    return (
        <footer>
            <WeatherWidget />
            <SettingsDialog />
            <CreatePostDialog />

            {/* BUTTONS IN FOOTER */}
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="container">

                        {/* BUTTONS FOR FOOTER */}
                        <Show when={isLoggedIn}>
                            <button type="button" className="btn btn-primary" onClick={(e) => { logoutUser(e); }}>
                                logout &#8592;
                            </button>
                        </Show>

                    </div>
                </div>
            </div>
        </footer >
    );
}
