import React, { useState } from "react";
import { useUser } from "@/src/UserContext"
import { Show } from "@/src/utils/showOrHide";
import { Dialog } from "@components/footer/Dialog"


export function SettingsDialog() {

    const { theme, toggleTheme, isLoggedIn } = useUser();
    const [showSettings, setShowSettings] = useState(false);

    {/* SETTINGS DIALOG */ }
    return (
        <Show when={isLoggedIn}>
            <Dialog isOpen={showSettings} onClose={() => setShowSettings(false)} title='Settings'>
                <p>Edit your settings here</p>

                <button onClick={toggleTheme} className='btn btn-primary'>
                    Switch to {theme === 'light' ? 'Dark' : 'Light'} mode
                </button>
            </Dialog>

            <button type="button" className="btn btn-primary"
                onClick={() => setShowSettings(true)}>
                settings &#x2699;
            </button>
        </Show>
    );
}

