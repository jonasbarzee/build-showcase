# Tinker-Vote

[My Notes](notes.md)

Tinker-Vote is a simple web application that allows users to vote on a person's next project idea. It gives users a place to post their ideas through text or hyperlink and show it to the public or friends. All ideas are welcome.

## 🚀 Specification Deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Tinker-Vote is a collaborative hub for makers, gamers, and hardware enthusiasts to decide their next big project. Users can post potential "Build Ideas"—ranging from custom Minecraft server rigs to Raspberry Pi smart mirrors—and let the community vote on which one should be tackled next. Additionally, a "Showcase Gallery" allows creators to share links to their completed builds, providing inspiration and proof of concept. It turns the solitary hobby of tinkering into a social, data-driven experience where the best ideas rise to the top in real-time.

### Design

![Mockup image](WebAppMockup.png)

There are 4 views, login, vote, trending, and gallery. Login will allow the user to enter their credentials and if they don't have an account, sign up. In vote users can upvote or downvote the next ideas for someone to make and tinker with. Trending shows the most views posts that are being voted on. Gallery is a view of everyones completed projects.

```mermaid
sequenceDiagram
    actor User
    participant React Client
    participant Server API/WS
    participant Database

    Note over User, Database: Initial Load Workflow
    User->>React Client: Navigates to Voting View
    React Client->>Server API/WS: GET /api/ideas (Fetch current list)
    Server API/WS->>Database: Query active ideas & vote counts
    Database-->>Server API/WS: Return data
    Server API/WS-->>React Client: Return JSON list of ideas
    React Client->>Server API/WS: Establish WebSocket Connection
    React Client-->>User: Displays list of idea cards

    Note over User, Database: Real-time Voting Workflow
    User->>React Client: Clicks "Upvote" button on an idea
    React Client->>Server API/WS: POST /api/vote (Idea ID)
    Server API/WS->>Database: Increment vote count for ID
    Database-->>Server API/WS: Confirm update
    Server API/WS-->React Client: WebSocket Broadcast: {id: 123, newCount: 45}
    Note right of React Client: Client updates the number instantly without reload
    React Client-->>User: Shows updated count
```

### Key features

- Sercure login with password encryption
- Voting and project selection
- Posting projects to vote on
- Preferences like units or light and dark mode
- Treading page based on posts with most traffic
- Gallery for completes projects
- Commenting on posts

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - A simple interface built with html with only the necessary UI elements.  A Dashboard for trending ideas, a Voting Page, and a Showcase Gallery for completed projects.
- **CSS** - Use a simple but beautiful flexbox/grid setup for a pleasing user interface.
- **React** - One page with three different views for the trending ideas, voting page, and gallery.
- **Service** - Using endpoints for voting, checking votes, authentication, and login/logout.
- **DB/Login** - Stores authentication for users and preferences like light or dark mode.
- **WebSocket** - Voting will be done in realtime. When a user votes on a project idea, a message will be broadcast to all users and immediately updated.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://tinkervote.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I created 4 different pages, index, voting, gallery, and trending.
- [x] **Proper HTML element usage** - I used header, footer, body, nav, and main tags as well as other tags like meta.
- [x] **Links** - I have links to the pages between themselves, the link to my Github repository, and a link to a picture for a mock post.
- [x] **Text** - I added headers and titles for the pages as well as some text for mocking posts.
- [x] **3rd party API placeholder** - I added a 3rd party API placeholder for the weather in the footer section of my pages.
- [x] **Images** - I added a TinkerVote logo through an image tag.
- [x] **Login placeholder** - I added a login placeholder that doesn't authenticate but does allow input for logging in.
- [x] **DB data placeholder** - I added mock posts in place of the content to be fetched from the database in the future.
- [x] **WebSocket placeholder** - I added two mock buttons for the websocket interactions, upvoting and downvoting a post, so you can see if people like or hate your next tinkering project in real time!

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Visually appealing colors and layout. No overflowing elements.** - I added some primary and secondary colors specified in my style.css file. I also pushed my footer to the bottom of my screen and pushed the logo and username to the edges of the screen. 
- [x] **Use of a CSS framework** - I used the Bootstrap Framework
- [x] **All visual elements styled using CSS** - I styled all my buttons with a primary and secondary button styling in style.css and I also setup styling for my input boxes like the login and the post dialog box. Everything was styled either inline or in style.css 
- [x] **Responsive to window resizing using flexbox and/or grid display** - I used d-flex and flex-wrap to make the window resizing responsive.
- [x] **Use of a imported font** - I used an imported font called Swanky Moo Moo.
- [x] **Use of different types of selectors including element, class, ID, and pseudo selectors** - I used the class selector to specify things like padding and flex boxes or pushing elements to the edges of the page.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - I did build and bundle with Vite through the deployReact.sh script.
- [x] **Components** - I added multiple React components, like App, Login, Trending, Voting, Header, Footer, and Gallery.
- [x] **Router** - I added routing between all the pages, login, gallery, trending, and voting.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** - I mocked out my weather api call, posts to be populated by the database, posting, voting websocket with intervals and timeouts, light and dark modes with local storage, not allowing users to see posts until logged in, logging in and logging out.
- [x] **Hooks** - I used the useEffect and useState hooks in my .jsx files. Specifically I used it to make a custom hook that uses local storage that I reused multiple times. I also have other hooks throughout my code to help render the webpage content based on state.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - I build an express http service in index.js in my service folder.
- [x] **Static middleware for frontend** - I have my index.js express service serving up my frontend.
- [x] **Calls to third party endpoints** - My third party call is to a simple weather api that displays the weather in the footer.
- [x] **Backend service endpoints** - I have my backend service endpoints in index.js for things like fetching posts and adding posts.
- [x] **Frontend calls service endpoints** - My frontend calls my service endpoints through http requests and the fetch function. It is in my login component, post context file, and others.
- [x] **Supports registration, login, logout, and restricted endpoint** - I support logging in and logging out as well as registering or creating a new user. The browser gives a notification to the user through an alert if they tried to sign in and there is no corresponding username or password.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Stores data in MongoDB** - I put all my posts, upvotes, downvotes, content, and pictureUrls into MongoDB.
- [x] **Stores credentials in MongoDB** - I am now storing all my usernames, hashed passwords, and authentication tokens in the database.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Backend listens for WebSocket connection** - Backend is listening for websocket connections in service/index.js
- [x] **Frontend makes WebSocket connection** - Frontend is making the websocket connection in src/eventNotifier.js
- [x] **Data sent over WebSocket connection** - Data is being send over the websocket, specifically the newly updated post infromation
- [x] **WebSocket data displayed** - The data is displayed for the websocket to the user by the count of votes changing.
- [x] **Application is fully functional** - Nothing is mocked anymore, application is fully functional.
