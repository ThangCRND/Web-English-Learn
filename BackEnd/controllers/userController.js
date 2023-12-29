const db = require('../models');
const { QueryTypes } = require('sequelize');

const User = db.user;


const allAccess = (req,res) => {
    res.status(200).send("Public Content.");
}

const userBoard = (req,res) => {
    res.status(200).send("User Content");

}

const adminBoard = (req,res) => {
    res.status(200).send("Admin Content");
}



module.exports = {
    allAccess,
    userBoard,
    adminBoard

}