import React, { useState, useEffect } from 'react';
import { usePostsData } from '@src/PostContext';

export function usePosts(requestedCategory = 'all') {
    const [loading, setLoading] = useState(true);
    const { posts, castVote, rescindVote } = usePostsData();

        const filteredPosts = requestedCategory === 'all'
            ? posts
            : posts.filter(post => post.category === requestedCategory)


    return { filteredPosts, castVote, rescindVote, loading };
}

