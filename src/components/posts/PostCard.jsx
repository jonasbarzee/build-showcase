import React from "react";

export function PostCard({ post }) {
	return (
		<div className="post-card border p-3 mb-2 shadow-sm">
			<h4>{post.author}</h4>
			<p>{post.content}</p>
			<img src={post.imageUrl} className='p-3' width="200px" />
			<div>
				<button type="button" className="btn btn-primary">{post.upvotes} upvote &#8593;</button>
				<button type="button" className="btn btn-primary">{post.downvotes} downvote &#8595;</button>
			</div>

		</div>
	);
}
