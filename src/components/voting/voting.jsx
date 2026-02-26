import React from 'react';
import { usePosts } from '@src/hooks/loadPosts';
import { PostCard } from '@components/posts/PostCard';
export function Voting() {

    const { posts, loading } = usePosts('voting');

    if (loading) return <p>Loading projects...</p>;

    return (
        <main className="flex-grow-1">
            <section>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-4">
                            <div>
                                <article>
                                    <div id='posts-container'>

                                        {posts.map(post => (
                                            <PostCard key={post.id} post={post} />
                                        ))}
                                        <p>^^^ Placeholder for content to be fetched from the database</p>
                                    </div>
                                </article>
                                <div>
                                    <p>Placeholder for websocket communication with upvote and downvote buttons</p>
                                    <button type="button" className="btn btn-primary">upvote &#8593;</button>
                                    <button type="button" className="btn btn-primary">downvote &#8595;</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
