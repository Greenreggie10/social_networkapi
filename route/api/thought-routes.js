const router = require('express').Router();

const {
    getAllThoughts,
    createThought,
    getOneThought,
    updateThought,
    removeThought,
    createReaction,
    removeReaction
} = require('../../controllers/thought-controllers');

//   /api/thoughts
router.route('/')
    .get(getAllThoughts)
    .post(createThought)
    // push created thought's id to associated user's thoughts array
    // example data
    // {
    //     "thoughtText": "Here's a cool thought...",
    //     "username": "lernantino",
    //     "userId": "5edff358a0fcb779aa7b118b"
    // }
//   /api/thoughts/ID
router.route('/:id')
    .get(getOneThought)
    .put(updateThought)
    .delete(removeThought)

//   /api/thoughts/ID/reactions
router.route('/:id/reactions')
    .post(createReaction)
    // stored in single thought's reactions array
    
//   /api/thoughts/ID/reactions/ID
router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction)

    

module.exports = router;