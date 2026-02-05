export function Footer() {
    return (
        <footer>
            <div class="continer">
                <div class="row justify-content-center">
                    <div class="col-md-6 col-lg-4">

                        <div>
                            <p>Placeholder for 3rd party weather API call</p>
                        </div>
                        <div>
                            <dialog id="postDialog">
                                <label class="form-label">Post your tinkering projects here</label>
                                <textarea class="form-control">Put the text for your post here</textarea>
                                <button type="button" id="submitPost" class="btn btn-primary">post</button>
                                <button type="button" id="closePostDialog" class="btn btn-secondary"
                                    onclick="document.querySelector('#postDialog').close()">close</button>
                            </dialog>
                            <button type="button" id="openPostDialog" class="btn btn-primary"
                                onclick="document.querySelector('#postDialog').showModal()">create post &#128393</button>

                            <dialog id="settingsDialog">
                                <p>Edit your settings here</p>
                                <button type="button" id="closeSettingsDialog" class="btn btn-primary"
                                    onclick="document.querySelector('#settingsDialog').close()">Close</button>
                            </dialog>
                            <button type="button" class="btn btn-primary"
                                onclick="document.querySelector('#settingsDialog').showModal()">
                                settings &#x2699</button>

                            <button type="button" class="btn btn-primary" onclick="window.location.href='index.html'">
                                logout &#8592</button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    );

}
