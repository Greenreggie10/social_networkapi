const { User, Thought } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            // add thoughts to retrieved data
            // .populate({
            //     path: 'thoughts',
            //     select: '-__v'
            // })
            .select('-__v')
            .sort({ _id: -1 })
            .then(usersData => res.json(usersData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get one user by id
    // populate thought and friend data
    getOneUser({ params }, res) {
        User.findOne({ _id: params.id })
            // add thoughts and friends to retrieved data
            .populate({
                    path: 'thoughts',
                    select: '-__v'
                })
            .populate({
                    path: 'friends',
                    select: '-__v'
                })
            .select('-__v')
            .then(userData => {
                // if no user is found, send 404 error
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this ID.'});
                    return;
                };
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create a user
    createUser({ body }, res) {
        User.create(body)
        // expects body { "username": "USERNAME", "email": "EMAIL" }
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err));
    },

    // update a user by id
    // expects body w/ one or more keys: { "username": "NEWUSERNAME", "email": "NEWEMAIL" } etc.
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            {
                _id: params.id
            },
            body,
            {
                new: true,
                runValidators: true
            })
            .then(userData => {
                // if no user is found, send 404 error
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this ID.'});
                    return;
                };
                res.json(userData);
            })
            .catch(err => res.status(400).json(err));
    },

    // add a friend
    // expects params userId and friendId
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            // select user with ID userId
            { _id: params.userId },
            // add user with ID friendId to selected user's friends array
            { $push: { friends: params.friendId }},
            { new: true }
        )
            .then(userData => {
                // if no user is found, send 404 error
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this ID.'});
                    return;
                };
                res.json(userData);
            })
            .catch(err => res.json(err));
    },

    // remove a user by id
    removeUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(userData => {
                // if no user is found, send 404 error
                if (!userData) {
                    res.status(404).json({ message: 'No user found with this ID.'});
                    return;
                };
                // remove any thoughts associated with the user (bonus functionality)
                return Thought.deleteMany({ username: userData.username });
            })
            .then(({ deletedCount }) => {
                if (!deletedCount) {
                    res.json({ message: 'User deleted.' });
                    return;
                };
                // if any associated thoughts were deleted, send delete count
                res.json({ message: `User deleted. Associated thoughts deleted: ${deletedCount}.` });
            })
            .catch(err => res.json(err));
    },

    // remove a friend by user and friend id
    // expects params userId and friendId
    removeFriend({ params }, res) {
        console.log(params)
        User.findOneAndUpdate(
            { _id: params.userId },
            // removes friend with friendId from user with userId
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(userData => res.json(userData))
            .catch(err => res.json(err));
    }
};

module.exports = userController;