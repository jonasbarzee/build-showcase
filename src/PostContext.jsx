import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@src/UserContext";

const PostContext = createContext();

export function PostProvider({ children }) {

	const { isLoggedIn } = useUser();

	// mocking inital database state with list of posts
	const [posts, setPosts] = useState([
		{
			id: 1,
			upvotes: 0,
			downvotes: 0,
			category: 'gallery',
			author: 'You',
			imageUrl: 'https://media.istockphoto.com/id/1282514444/photo/cow-udder-large-and-full-and-with-horns-in-the-green-pasture-and-a-blue-sky.jpg?s=612x612&w=0&k=20&c=a2TuO1u4H4wKW7aSizBh7Df8CLA70MEPTcadLfc35bk=',
			content: 'I finally completed my first project, a hotdog maker! I used a smart fridge and a GPU to make it work with custom RGB.'
		},
		{
			id: 2,
			upvotes: 0,
			downvotes: 0,
			category: 'gallery',
			author: 'You',
			imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4t2ZwOPQaboirYn2FR6LU_CKJBBwblx1qsw&s',
			content: "This is a car, I made a another one this time with big eyes and a silly, surprised expression on it's face. isn't it cute?"

		},
		{
			id: 3,
			upvotes: 0,
			downvotes: 0,
			category: 'trending',
			author: 'Not You',
			imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0sOA9N5tXNCRWuSoihvRD4F4qPf6_30El1A&s',
			content: 'I am so happy that my hydroponic bonzai tree wifi router project is finally working. I did it as a class project for the 15th grade.',
		},
		{
			id: 4,
			upvotes: 0,
			downvotes: 0,
			category: 'trending',
			author: 'Also Not You',
			imageUrl: 'https://wallpapers.com/images/hd/funny-horse-pictures-cv9t06tu59f6pjb1.jpg',
			content: "I don't even like horses, but I he's cute so he's on here",
		},
		{
			id: 5,
			upvotes: 0,
			downvotes: 0,
			category: 'voting',
			author: 'Not You',
			imageUrl: 'https://www.royalplantscape.com/cdn/shop/collections/Buy_Plants_Online_Cheap_Prices.jpg?v=170368047',
			content: 'After hours of work my rotating manticore 3d printer hot tub crossover is complete. Shoutout to mom and dad for telling me I was a failure.',
		},
		{
			id: 6,
			upvotes: 0,
			downvotes: 0,
			category: 'voting',
			author: "Surprise, it's Not You",
			imageUrl: 'https://cdn.pixabay.com/photo/2024/05/27/20/08/technical-8792191_640.jpg',
			content: 'Here is a blueprint of a perfectly, over-engineeried screw or whatever this is. I hope you like it. I am running out of ideas.'

		}
	]);

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
