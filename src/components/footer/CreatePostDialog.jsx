
import React, { useState } from 'react';
import { Dialog } from "@components/footer/Dialog"
import { useUser } from "@/src/UserContext";
import { usePostsData } from '@src/PostContext';
import { Show } from "@/src/utils/showOrHide";

export function CreatePostDialog() {

    const { username, isLoggedIn } = useUser();
    const { addPost } = usePostsData();
    const [postContent, setPostContent] = useState('');
    const [showPostDialog, setShowPostDialog] = useState(false);

    const handleSubmit = () => {
        if (!postContent.trim()) return;

        addPost({
            author: username || 'Anonymous',
            content: postContent,
            imageUrl: 'placeholder',
        });

        setPostContent('');
        setShowPostDialog(false);
    }


    {/* CREATE POST DIALOG */ }
    return (

        <Show when={isLoggedIn}>
            <Dialog isOpen={showPostDialog} onClose={() => setShowPostDialog(false)} title='Create Post'>
                <p>Post your tinkering projects here</p>
                <textarea className="form-control mb-3" value={postContent} onChange={(e) => setPostContent(e.target.value)} placeholder="Describe your beloved project..." />
                <button type="button" id="submitPost" className="btn btn-primary" onClick={handleSubmit}>Post To Gallery</button>
            </Dialog>

            <button type="button" id="openPostDialog" className="btn btn-primary"
                onClick={() => setShowPostDialog(true)}>create post &#9998;
            </button>
        </Show>

    );
}


