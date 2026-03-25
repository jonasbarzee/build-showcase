const { MongoClient, ObjectId } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('tinkervote');
const userCollection = db.collection('user');
const postCollection = db.collection('post');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    try {
        await db.command({ ping: 1 });
        console.log(`Connect to database`);
    } catch (ex) {
        console.log(`Unable to connect to database with ${url} because ${ex.message}`);
        process.exit(1);
    }
})();

function getUser(username) {
    return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function addUser(user) {
    await userCollection.insertOne(user);
}

async function updateUser(user) {
    await userCollection.updateOne({ username: user.username }, { $set: user });
}

async function updateUserRemoveAuth(user) {
    await userCollection.updateOne({ username: user.username }, { $unset: { token: 1 } });
}

async function addPost(post) {
    await postCollection.insertOne(post);
    return postCollection.find().toArray();
}

function getPosts() {
    const cursor = postCollection.find();
    return cursor.toArray();
}

async function upvotePost(_id, value) {
    await postCollection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: { upvotes: value } });
}

async function downvotePost(_id, value) {
    await postCollection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: { downvotes: value } });
}

module.exports = {
    getUser,
    getUserByToken,
    addUser,
    updateUser,
    updateUserRemoveAuth,
    addPost,
    getPosts,
    upvotePost,
    downvotePost
};
