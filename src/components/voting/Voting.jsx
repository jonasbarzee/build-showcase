import React from 'react';
import { usePosts } from '@/src/hooks/usePosts';
import { PostCard } from '@components/posts/PostCard';

export function Voting() {

    const { filteredPosts } = usePosts('voting');

    return (
        <main className="flex-grow-1">
            <section>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-4">
                            <div>
                                <article>
                                    <div id='posts-container'>

                                        {filteredPosts.map(post => (
                                            <PostCard key={post.id} post={post} />
                                        ))}
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
