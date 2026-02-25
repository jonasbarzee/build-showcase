import React, { useState, useEffect } from 'react';

export function usePosts() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadPosts() {
			try {

				// mocking database call with postsList
				const postsList = [{
					author: 'You',
					imageUrl: 'https://media.istockphoto.com/id/1282514444/photo/cow-udder-large-and-full-and-with-horns-in-the-green-pasture-and-a-blue-sky.jpg?s=612x612&w=0&k=20&c=a2TuO1u4H4wKW7aSizBh7Df8CLA70MEPTcadLfc35bk=',
					content: 'I finally completed my first project, a hotdog maker! I used a smart fridge and a GPU to make it work with custom RGB.'
				},
				{
					author: 'You',
					imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0sOA9N5tXNCRWuSoihvRD4F4qPf6_30El1A&s',
					content: 'I am so happy that my hydroponic bonzai tree wifi router project is finally working. I did it as a class project for the 15th grade.',
				},
				{
					author: 'You',
					imageUrl: 'https://www.royalplantscape.com/cdn/shop/collections/Buy_Plants_Online_Cheap_Prices.jpg?v=1703681047',
					content: 'After hours of work my rotating manticore 3d printer hot tub crossover is complete. Shoutout to mom and dad for telling me I was a failure.',
				}];

				setPosts(postsList);
			} catch (error) {
				console.error("Failed to load posts", error);
			} finally {
				setLoading(false);
			}
		}
		loadPosts();
	}, []);

	return { posts, loading };
}

