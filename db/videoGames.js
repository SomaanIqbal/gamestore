const client = require('./client');
const util = require('util');

// const REPLACE_ME = 'HELP REPLACE ME!!!!';

// GET - /api/video-games - get all video games
// await client.query
// SELECT * FROM videogames
// return videogames
async function getAllVideoGames() {
    try {
        const { rows: videoGames } = await client.query(`
        SELECT * FROM videoGames;
        `);
        return videoGames;
    } catch (error) {
        throw new Error("Make sure you have replaced the REPLACE_ME placeholder.")
    }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
    try {
        const { rows: [videoGame] } = await client.query(`
            SELECT * FROM videoGames
            WHERE id = $1;
        `, [id]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}

// POST - /api/video-games - create a new video game
// not using get, we are now inputing information
// INSERT INTO VIDEO GAME 
// use the variables found in seedData for Values and the INSERT INTO
// remember to call function
async function createVideoGame(body) {
    const {rows: [createdVideoGame] } = await client.query(`
    INSERT INTO videoGames(name, description, price, "inStock", "isPopular","imgUrl")
    VALUES ('${body.name}','${body.description}','${body.price}','${body.inStock}','${body.isPopular}','${body.imgUrl}')
    RETURNING * ;
    `);
    return createdVideoGame;

    // LOGIC GOES HERE
}

// PUT - /api/video-games/:id - update a single video game by id
// looked at guided practice, but map through each key and index to do it the new $1,$2 way
// updatind because of put
// remember to return

async function updateVideoGame(id, fields = {}) {
    
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');

    if (setString.length === 0) {
        return;
    }

    const {rows: [updateVideoGame]} = await client.query(`
    UPDATE videoGames
    SET ${setString}
    WHERE id=${id}
    RETURNING *;
    `,Object.values(fields));

    return updateVideoGame;


    // LOGIC GOES HERE
}

// DELETE - /api/video-games/:id - delete a single video game by id
// delete , from where -> the id
// remember to return
async function deleteVideoGame(id) {
    const {rows: [deleteVideoGame]} = await client.query(`
   DELETE FROM videoGames
   WHERE id=${id}
   RETURNING *;

    `)
    return deleteVideoGame
    // LOGIC GOES HERE
}

module.exports = {
    getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame
}