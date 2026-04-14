import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@src/UserContext";
import { VoteEvent, VoteNotifier } from "./voteNotifier";

const PostContext = createContext();

export function PostProvider({ children }) {
    const { isLoggedIn, username } = useUser();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isLoggedIn) {
            setPosts([]);
            setIsLoading(false);
            return;
        }

        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/posts');
                if (response.ok) {
                    const data = await response.json();
                    setPosts(data);
                } else {
                    console.error("Failed to fetch posts:", response.status);
                }
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [isLoggedIn]);

    const addPost = async (newPostData) => {
        const newPost = {
            upvotes: 0,
            downvotes: 0,
            category: 'gallery',
            ...newPostData
        };

        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPost)
        });

        if (response.ok) {
            const updatedPosts = await response.json();
            setPosts(updatedPosts);
        }
    };

    const updateVoteInDatabase = async (postId, type, action) => {
        const response = await fetch(`/api/posts/${postId}/vote`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type, action })
        });

        if (response.ok) {
            const updatedPosts = await response.json();
            setPosts(updatedPosts);
            VoteNotifier.broadcastEvent(username, VoteEvent.Vote, { postId, voteType: type, action });
        }
    };

    const castVote = (postId, type) => {
        updateVoteInDatabase(postId, type, 'cast');
    };

    const rescindVote = (postId, type) => {
        updateVoteInDatabase(postId, type, 'rescind');
    };

    React.useEffect(() => {
        VoteNotifier.addHandler(handleVoteEvent);

        return () => {
            VoteNotifier.removeHandler(handleVoteEvent);
        };
    });

    function handleVoteEvent(event) {
        setPosts(...posts, event);
    }


    return (
        <PostContext.Provider value={{ posts, isLoading, addPost, castVote, rescindVote }}>
            {children}
        </PostContext.Provider>
    );
}

export const usePostsData = () => useContext(PostContext);
