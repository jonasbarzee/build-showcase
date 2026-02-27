import React from "react";
import { usePosts } from "@/src/hooks/usePosts";

export function PostCard({ post }) {
	const { castVote } = usePosts();

	return (
		<div className="post-card border p-3 mb-2 shadow-sm">
			<h4>{post.author}</h4>
			<p>{post.content}</p>
			<img src={post.imageUrl} className='p-3' width="200px" />
			<div>
				<button onClick={() => castVote(post.id, 'upvotes')} type="button" className="btn btn-primary">{post.upvotes} &#8593;</button>
				<button onClick={() => castVote(post.id, 'downvotes')} type="button" className="btn btn-primary">{post.downvotes} &#8595;</button>
			</div>

		</div>
	);
}
