"use strict";
require('dotenv').config()
const mongoose = require("mongoose");
// const {db: {host, port, name, url} } = require('../configs/config.mongodb')


const connectString = process.env.DATABASE_URL

console.log(connectString)

class Database {
  constructor() {
    this.connect();
  }

  connect(type = 'mongodb') {
    if( 1=== 1){
        mongoose.set('debug', true)
        mongoose.set('debug', {color: true})
    }

    mongoose
      .connect(connectString)
      .then((_) => console.log(`Connected Mongodb Success Pro`))
      .catch((err) => {
        console.log(err);
      });
  }

  static getInstance(){
    if(!Database.instance){
        Database.instance = new Database()
    }

    return Database.instance
  }
}

const instanceMongodb = Database.getInstance()

module.exports = instanceMongodb