const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const app = express();

const authCookieName = 'token';

// The scores and users are saved in memory and disappear whenever the service is restarted.
let users = [];
let posts = [{
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
];

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Dynamically determining the correct path
const productionPath = path.join(__dirname, 'public');
const devPath = path.join(__dirname, '../dist');
const staticPath = fs.existsSync(productionPath) ? productionPath : devPath;

app.use(express.static(staticPath));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('username', req.body.username)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await createUser(req.body.username, req.body.password);

        setAuthCookie(res, user.token);
        res.send({ username: user.username, passwordHash: user.password });
    }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('username', req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            setAuthCookie(res, user.token);
            res.send({ username: user.username, token: user.token });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    console.log(user);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

// GetPosts 
apiRouter.get('/posts', verifyAuth, (_req, res) => {
    res.send(posts);
});

// SubmitPost
apiRouter.post('/posts', verifyAuth, (req, res) => {
    posts = updatePosts(req.body);
    res.send(posts);
});

apiRouter.put('/posts/:id/vote', verifyAuth, (req, res) => {
    const postId = parseInt(req.params.id);
    const { type, action } = req.body;

    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex === -1) {
        return res.status(404).send({ msg: 'Post not found' });
    }
    if (action === 'cast') {
        posts[postIndex][type] += 1;
    } else if (action === 'rescind') {
        posts[postIndex][type] = Math.max(0, posts[postIndex][type] - 1);
    }

    res.send(posts[postIndex]);
});

// Default error handler
app.use(function(err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});



// updateScores considers a new score for inclusion in the high scores.
function updatePosts(newPost) {
    posts.push(newPost);
    return posts;
}

async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
    };
    users.push(user);

    return user;
}

async function findUser(field, value) {
    if (!value) return null;

    return users.find((u) => u[field] === value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.clearCookie(authCookieName);
    res.cookie(authCookieName, authToken, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
