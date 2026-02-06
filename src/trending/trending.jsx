import React from 'react';

export function Trending() {
    return (
        <main className="flex-grow-1">
            <section>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-4">

                            <article>
                                <div>
                                    <p><strong>@username</strong></p>
                                    <p>Check out my awesome tinkering project! I've been working on this for weeks and
                                        finally got it
                                        working. It's a custom circuit board that controls LED strips with motion detection.
                                    </p>
                                    <p>^^^ Placeholder for content to be fetched from the database</p>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}