const router = require('express').Router();

const {
    getAllUsers,
    createUser,
    getOneUser,
    updateUser,
    removeUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controllers');

//   /api/users
router.route('/')
        .get(getAllUsers)
        .post(createUser)
            // example data
            // {
            //     "username": "lernantino",
            //     "email": "lernantino@gmail.com"
            // }

//   /api/users/ID
router.route('/:id')
        .get(getOneUser)
            // populate thought and friend data
        .put(updateUser)
        .delete(removeUser)
            // BONUS remove user's associated thoughts on deletion

//   /api/users/ID/friends/ID
router.route('/:userId/friends/:friendId')
        .post(addFriend)
        .delete(removeFriend)

module.exports = router;