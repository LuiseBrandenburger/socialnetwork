const express = require("express");
const friendship = express.Router();

const { registerUser } = require("../sql/db");
const { hash } = require("../bc");
// const helpers = require("./utils/helpers");

/*************************** ROUTES ***************************/

console.log("hello from friendship router");

/**
 
A simple way to accomplish this would be to create a table for friend requests that has columns for the id of the sender, the id of the recipient, and a boolean indicating whether or not the request has been accepted. 
 
 
 TODO: When one user sends another a friend request, a row would be inserted with the ids of the sender and receiver in the appropriate columns and the boolean set to false.
 -> POST Route

 TODO: When a user accepts a friend request, the appropriate row would be updated to set the boolean to true.

 TODO: When a user unfriends or cancels a pending request, the row for the request can be deleted (deleting these rows means that we will lose potentially valuable historical information, but that is probably acceptable for our purposes).

 *********************************************************************************
    Is there an existing friend request between a given pair of users?

    If there is a request, has it been accepted?

    If there is a request and it has not been accepted, who is the sender and who is the receiver?






 */


/*************************** EXPORT ***************************/

module.exports = friendship;
