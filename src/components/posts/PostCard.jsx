import React from "react";

export function PostCard({ post }) {
	return (
		<div className="post-card border p-3 mb-2 shadow-sm">
			<h4>{post.author}</h4>
			<p>{post.content}</p>
			<img src={post.imageUrl} width="200px" />
		</div>
	);
}
