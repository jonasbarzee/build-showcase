import React from "react";
import { usePosts } from "@/src/hooks/usePosts";
import { useUser } from "@/src/UserContext";
import { Show } from "@/src/utils/showOrHide";

export function PostCard({ post }) {
    const { castVote, rescindVote } = usePosts();
    const { getExistingVote, recordVote, removeVote, isLoggedIn } = useUser();

    const existingVote = getExistingVote(post.id);
    const canVote = isLoggedIn && !existingVote;

    const handleVote = (type) => {
        if (!canVote) return;

        castVote(post.id, type);
        recordVote(post.id, type);
    };

    const handleVoteRevoke = () => {
        if (!existingVote) return;

        rescindVote(post.id, existingVote.type);
        removeVote(post.id);
    }

    return (
        <div className={`post-card ${existingVote ? 'voted' : ''} border p-3 mb-2 shadow-sm`}>

            <h4>{post.author}</h4>
            <p>{post.content}</p>
            <img src={post.imageUrl} className='p-3' width="200px" />

            <div className="vote-controls">
                <button disabled={!canVote} onClick={() => handleVote('upvotes')} type="button" className="btn btn-primary">{post.upvotes} &#8593;</button>

                <button disabled={!canVote} onClick={() => handleVote('downvotes')} type="button" className="btn btn-primary">{post.downvotes} &#8595;</button>

                <Show when={existingVote}>
                    <button disabled={canVote} onClick={() => handleVoteRevoke()} type="button" className="btn btn-primary"> remove vote </button>
                </Show>
            </div>
        </div>
    );
}
