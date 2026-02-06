import React from 'react';

export function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">

                        <div>
                            <p>Placeholder for 3rd party weather API call</p>
                        </div>
                        <div>
                            <dialog id="postDialog">
                                <label className="form-label">Post your tinkering projects here</label>
                                <textarea className="form-control" defaultValue="Put the text for your post here<"></textarea>
                                <button type="button" id="submitPost" className="btn btn-primary">post</button>
                                <button type="button" id="closePostDialog" className="btn btn-secondary"
                                    onClick={() => document.querySelector('#postDialog').close()}>close</button>
                            </dialog>
                            <button type="button" id="openPostDialog" className="btn btn-primary"
                                onClick={() => document.querySelector('#postDialog').showModal()}>create post &#128393;</button>

                            <dialog id="settingsDialog">
                                <p>Edit your settings here</p>
                                <button type="button" id="closeSettingsDialog" className="btn btn-primary"
                                    onClick={() => document.querySelector('#settingsDialog').close()}>Close</button>
                            </dialog>
                            <button type="button" className="btn btn-primary"
                                onClick={() => document.querySelector('#settingsDialog').showModal()}>
                                settings &#x2699;</button>

                            <button type="button" className="btn btn-primary" onClick={() => alert("You are now logged out")}>
                                logout &#8592;</button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
