const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'yalp'
})

const getUser = function (user, cb) {
    //user obj contain username & pw for authentication
    let query = `SELECT * FROM users`

    connection.query(query, (err, results) => {
        if (err) {
            cb(err)
        } else {
            cb(null, results)
        }
    })
}

const postUser = function (user, cb) {
    let query = `INSERT INTO users (name, email, password, username) VALUES (?, ?, ?, ?)`

    connection.query(query, [user.name, user.email, user.password, user.username], (err, results) => {
        if (err) {
            cb(err, null);
        } else {
            cb(null, results);
        }
        return;
    })
}

//get user by id

const getUserByUsername = function (user, cb) {
    let query = `SELECT * FROM users WHERE users.username = ? AND users.password = ?`

    connection.query(query, [user.username, user.password], (err, results) => {
        if (err) {
            cb(err)
        } else {
            cb(null, results)
        }
    })
}

//get business by id 

const getBusinessById = function (id, cb) {

    let query = `SELECT businesses.name FROM businesses WHERE businesses.id = ${id}`

    connection.query(query, (err, results) => {
        if (err) {
            cb(err)
        } else {
            cb(null, results)
        }
    })
}

const getFriendsReviews = function (userID, cb) {

    let query = `SELECT reviews.text FROM reviews INNER JOIN friends ON friends.user_id1 = ${userID} AND friends.user_id2 = reviews.user_id`;

    connection.query(query, (err, results) => {
        if (err) {
            cb(err)
        } else {
            cb(null, results)
        }
    })
}

//get non-friends' reviews for a specific business

const getStrangersReviews = function (userID, cb) {

    let query = `SELECT reviews.text FROM reviews WHERE reviews.text NOT IN (SELECT reviews.text FROM reviews INNER JOIN friends ON friends.user_id1 = ${userID} AND friends.user_id2 = reviews.user_id)`;

    connection.query(query, (err, results) => {
        if (err) {
            cb(err)
        } else {
            cb(null, results)
        }
    })
}

//temp function for searches, using mock data

const tempSearch = function (search, cb) {
    let query = `SELECT * FROM businesses`

    connection.query(query, (err, results) => {
        if (err) {
            cb(err)
        } else {
            cb(null, results)
        }
    })
}

//MYSQL QUERIES FOR:

// Businesses

// INSERT INTO businesses (name) VALUE ("Tu Lan");
// INSERT INTO businesses (name) VALUE ("Chipotle");
// INSERT INTO businesses (name) VALUE ("McDonalds");
// INSERT INTO businesses (name) VALUE ("Fancy Steak House");
// INSERT INTO businesses (name) VALUE ("Tempest");
// INSERT INTO businesses (name) VALUE ("Some Expensive Place");

//Users

// INSERT INTO users (name, email, password, username) VALUES ("Chris", "Chris@Chris.com", "Chris", "ChrisChris");
// INSERT INTO users (name, email, password, username) VALUES ("Kayleigh", "Kayleigh@Kayleigh.com", "Kayleigh", "Kayleigh");
// INSERT INTO users (name, email, password, username) VALUES ("Connor", "Connor@Connor.com", "Connor", "Connor");
// INSERT INTO users (name, email, password, username) VALUES ("Peter", "Peter@Peter.com", "Peter", "PeterPeterPumpkinEater");
// INSERT INTO users (name, email, password, username) VALUES ("Fred", "Fred@Fred.com", "Fred", "Fred");
// INSERT INTO users (name, email, password, username) VALUES ("Moises", "Moises@Chris.com", "BigCuddlyBear", "Weird");

//Reviews 
//user_id, business_id, text

// INSERT INTO reviews (user_id, business_id, text) VALUES (1, 1, "this place is really tasty");
// INSERT INTO reviews (user_id, business_id, text) VALUES (2, 2, "this place sucks ass");
// INSERT INTO reviews (user_id, business_id, text) VALUES (3, 3, "this place could use better service");
// INSERT INTO reviews (user_id, business_id, text) VALUES (4, 4, "this place is pretty mediocre");
// INSERT INTO reviews (user_id, business_id, text) VALUES (5, 5, "this place is pretty good");
// INSERT INTO reviews (user_id, business_id, text) VALUES (6, 6, "this place is utter trash");

//CheckIns

// INSERT INTO checkins (user_id, business_id) VALUES (1, 1);
// INSERT INTO checkins (user_id, business_id) VALUES (2, 2);
// INSERT INTO checkins (user_id, business_id) VALUES (3, 3);
// INSERT INTO checkins (user_id, business_id) VALUES (4, 4);
// INSERT INTO checkins (user_id, business_id) VALUES (5, 5);
// INSERT INTO checkins (user_id, business_id) VALUES (6, 6);

//friends

// INSERT INTO checkins (user_id1, user_id2) VALUES (1, 2);
// INSERT INTO checkins (user_id1, user_id2) VALUES (1, 3);
// INSERT INTO checkins (user_id1, user_id2) VALUES (1, 4);
// INSERT INTO checkins (user_id1, user_id2) VALUES (1, 6);
// INSERT INTO checkins (user_id1, user_id2) VALUES (2, 3);
// INSERT INTO checkins (user_id1, user_id2) VALUES (2, 5);
// INSERT INTO checkins (user_id1, user_id2) VALUES (2, 6);
// INSERT INTO checkins (user_id1, user_id2) VALUES (3, 4);
// INSERT INTO checkins (user_id1, user_id2) VALUES (3, 5);
// INSERT INTO checkins (user_id1, user_id2) VALUES (3, 6);
// INSERT INTO checkins (user_id1, user_id2) VALUES (4, 6);
// INSERT INTO checkins (user_id1, user_id2) VALUES (5, 6);



//TEST FUNCTION CALLS

// connection.query(`SELECT * from USERS`, (err, results) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(results);
//     }
// })

// postUser({ name: "testName", email: "testEmail", password: "testPassword", username: "testUsername" }, (err, results) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(results)
//     }
// })

// getUserById(1, (err, results) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(results);
//     }
// })

// getBusinessById(1, (err, results) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(results);
//     }
// })


//connection.queries

module.exports = {
    connection,
    getUser,
    postUser,
    getUserByUsername,
    getBusinessById,
    tempSearch,
    getStrangersReviews,
    getFriendsReviews
}