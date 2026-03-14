import React from 'react';
import { usePostsData } from '@src/PostContext';

export function usePosts(requestedCategory = 'all') {
    const { isLoading, posts, castVote, rescindVote } = usePostsData();

    console.log("CURRENT CONTEXT STATE -> isLoading: ", isLoading, " posts: ", posts);

    const filteredPosts = requestedCategory === 'all'
        ? posts
        : posts.filter(post => post.category === requestedCategory)


    return { filteredPosts, castVote, rescindVote, isLoading };
}

