import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@src/UserContext";
import { useLocalStorage } from "@src/hooks/useLocalStorage";

const PostContext = createContext();

export function PostProvider({ children }) {

    const { isLoggedIn } = useUser();

    // mocking inital database state with list of posts
    const [posts, setPosts] = useLocalStorage('posts', []);

    const addPost = (newPostData) => {
        const newPost = {
            id: Date.now(),
            upvotes: 0,
            downvotes: 0,
            category: 'gallery',
            ...newPostData
        };

        setPosts(prev => [newPost, ...prev]);
    };

    const castVote = (postId, type) => {
        setPosts(prevPosts => prevPosts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    [type]: post[type] + 1
                };
            }
            return post;
        }));

        console.log(`User votes ${type} on post ${postId}`);
    };

    const rescindVote = (postId, type) => {
        setPosts(prevPosts => prevPosts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    [type]: Math.max(0, post[type] - 1)
                };
            }
            return post;
        }));

        console.log(`User rescinded their vote on post ${postId}`);
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
