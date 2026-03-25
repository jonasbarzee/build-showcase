import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@src/UserContext";

const PostContext = createContext();

export function PostProvider({ children }) {
    const { isLoggedIn } = useUser();
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
        }
    };

    const castVote = (postId, type) => {
        updateVoteInDatabase(postId, type, 'cast');
    };

    const rescindVote = (postId, type) => {
        updateVoteInDatabase(postId, type, 'rescind');
    };

    useEffect(() => {
        if (!isLoggedIn || posts.length === 0) return;

        console.log("WebSocket Mock: Connection established");

        const intervalId = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * posts.length);
            const randomPost = posts[randomIndex];
            const type = Math.random() > 0.5 ? 'upvotes' : 'downvotes';

            console.log("Simulating websocket voting...");
            castVote(randomPost._id, type);
        }, 5000);

        return () => {
            console.log("WebSocket Mock: Disconnected");
            clearInterval(intervalId);
        };
    }, [isLoggedIn, posts]);


    return (
        <PostContext.Provider value={{ posts, isLoading, addPost, castVote, rescindVote }}>
            {children}
        </PostContext.Provider>
    );
}

export const usePostsData = () => useContext(PostContext);
