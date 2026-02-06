import React from 'react';

export function Voting() {
  return (
    <main className="flex-grow-1">
        <section>
            <div className="continer">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div>
                            <article>
                                <div>
                                    <p><strong>@username</strong></p>
                                    <p>I am thinking about making this banana slicer, as my next project to tinker with!
                                    </p>
                                    <p>^^^ Placeholder for content to be fetched from the database</p>
                                </div>
                            </article>
                            <div>
                                <text>Placeholder for websocket communication with upvote and downvote buttons</text>
                                <button type="button" className="btn btn-secondary">upvote &#8593;</button>
                                <button type="button" className="btn btn-secondary">downvote &#8595;</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
  );
}