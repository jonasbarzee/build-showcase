const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

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
        res.send({ username: user.username });
    }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('username', req.body.username);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            await DB.updateUser(user);
            setAuthCookie(res, user.token);
            res.send({ username: user.username });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        await DB.updateUserRemoveAuth(user);
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

// GetPosts 
apiRouter.get('/posts', verifyAuth, async (_req, res) => {
    const posts = await DB.getPosts();
    res.send(posts);
});

// AddPost
apiRouter.post('/posts', verifyAuth, async (req, res) => {
    const posts = await addPost(req.body);
    res.send(posts);
});

apiRouter.put('/posts/:id/vote', verifyAuth, async (req, res) => {
    const postId = parseInt(req.params.id);
    const { type, action } = req.body;

    const posts = await DB.getPosts();
    const postIndexInArray = posts.findIndex(post => post.id === postId);

    console.log("Given postId: ", postId,)
    console.log("Type: ", type,)
    console.log("Action: ", action,)
    console.log("Posts in DB: ", posts,)
    console.log("Found index: ", postIndexInArray,)

    if (postIndexInArray === -1) {
        return res.status(404).send({ msg: 'Post not found' });
    }

    if (action === 'cast') {
        posts[postIndexInArray][type] += 1;
    } else if (action === 'rescind') {
        posts[postIndexInArray][type] = Math.max(0, posts[postIndexInArray][type] - 1);
    }

    voteOnPost(id, targetPost);

    res.send(posts)
});

async function voteOnPost(id, post) {
    const result = await DB.updatePost(id, post);
    console.log("Result: ", result)

}

// Default error handler
app.use(function(err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});



// updateScores considers a new score for inclusion in the high scores.
async function addPost(newPost) {
    const posts = await DB.addPost(newPost);
    return posts;
}

async function createUser(username, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
    };
    await DB.addUser(user);

    return user;
}

async function findUser(field, value) {
    if (!value) return null;

    if (field === 'token') {
        return DB.getUserByToken(value);
    }
    return DB.getUser(value)
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
