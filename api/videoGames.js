const express = require('express');
const router = express.Router();

const REPLACE_ME = 'HELP REPLACE ME!!!!';

const { getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame
    } = require('../db/videoGames');

// GET - /api/video-games - get all video games
router.get('/', async (req, res, next) => {
    try {
        const videoGames = await getAllVideoGames();
        res.send(videoGames);
    } catch (error) {
        next(error);
    }
});

// GET - /api/video-games/:id - get a single video game by id
// need req.params.id based on (id) on the db videogames function
// res.send the variable created
// 
router.get('/:id', async (req, res, next) => {
    try {
        const videoGame = await getVideoGameById(req.params.id);
        res.send(videoGame);
    } catch (error) {
        next(error);
    }
});

// POST - /api/video-games - create a new video game
// req.body because body is in the db videoGames file
// same as before
router.post('/', async (req, res, next) => {
    try {
        const createdVideoGame = await createVideoGame(req.body);
        res.send(createdVideoGame);
    } catch (err){
        console.log(err);
        next(err);
    }
    // LOGIC GOES HERE 
});


// PUT - /api/video-games/:id - update a single video game by id
// req.params.id and body , fields is part of the body
router.put('/:id', async (req, res, next) => {
    try {
        const updatedVideoGame = await updateVideoGame(req.params.id, req.body);
        res.send(updatedVideoGame);
    } catch (err) {
        console.log(err);
        next(err);
    }
    // LOGIC GOES HERE 
});

// DELETE - /api/video-games/:id - delete a single video game by id
// just need an id for delete
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedGame = await deleteVideoGame(req.params.id);
        res.send(deletedGame);
    } catch (err) {
        next(err);
    }
    // LOGIC GOES HERE
});

module.exports = router;
