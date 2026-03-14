import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@src/UserContext";

const PostContext = createContext();

export function PostProvider({ children }) {
    const { isLoggedIn } = useUser();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('/api/posts').then(response => {
            if (response.ok) return response.json();
            throw new Error('Network response was not ok.');
        })
            .then(data => setPosts(data))
            .catch(error => console.error("Failed to fetch posts: ", error));
    }, []);


    const addPost = async (newPostData) => {
        const newPost = {
            id: Date.now(),
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

    const updateVoteInService = async (postId, type, action) => {
        const response = await fetch(`/api/posts/${postId}/vote`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type, action })
        });

        if (response.ok) {
            const updatedPost = await response.json();
            setPosts(prevPosts => prevPosts.map(post =>
                post.id === postId ? updatedPost : post
            ));
        }
    };

    const castVote = (postId, type) => {
        updateVoteInService(postId, type, 'cast');
        console.log(`User ${type} on post ${postId}`);
    };

    const rescindVote = (postId, type) => {
        updateVoteInService(postId, type, 'rescind');
        console.log(`User rescinds their vote on post ${postId}`);
    };

    useEffect(() => {

        if (!isLoggedIn) return;

        console.log("WebSocket Mock: Connection established");

        const intervalId = setInterval(() => {
            const randomId = Math.floor(Math.random() * 6) + 1;
            const type = Math.random() > 0.5 ? 'upvotes' : 'downvotes';

            console.log("Simulating websocket voting...");
            castVote(randomId, type);
        }, 5000);

        return () => {
            console.log("WebSocket Mock: Disconnected");
            clearInterval(intervalId);
        };
    }, [isLoggedIn]);


    return (
        <PostContext.Provider value={{ posts, addPost, castVote, rescindVote }}>
            {children}
        </PostContext.Provider>
    );
}

export const usePostsData = () => useContext(PostContext);
