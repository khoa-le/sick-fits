//This file connects to the remote Prisma server
const {Prisma} = require('prisma-binding');
var typeDefs = require("./generated/prisma-schema").typeDefs;

const db = new Prisma({
    typeDefs,
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    debug: false,
});

module.exports = db;