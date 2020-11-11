'use strict'

const session = require('express-session');
const util = require('util');
const fs = require('fs');
const path = require('path');
const tv4 = require('tv4');
const config = require('../config');


const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const SCHEMA = path.join(__dirname, '/..', config.DATA_DIR, '/_-schema.json');
const DATA_PATH = path.join(__dirname, '..', 'data', 'data.json');

const controllers = {
  hello: (req, res) => {
    res.json(data);
  },
 signUp: async (req,res)=>{
  const newUser = req.body
  
  
  try{
    const readData = await readFile(DATA_PATH,'utf-8')
    const parseRead = JSON.parse(readData);
 
     newUser.id = parseRead.nextID;
      parseRead.nextID++;

      const isValid = tv4.validate(newUser, SCHEMA)

      if (!isValid) {
        const error = tv4.error
        console.error(error)

        res.status(400).json({
          error: {
            message: error.message,
            dataPath: error.dataPath
          }
        })
        return
      }
      
     parseRead.users.push(newUser) 
    
     const newUserData= JSON.stringify(parseRead,null,' ');
     await writeFile(DATA_PATH,newUserData);
     console.log(newUser)
     res.json(newUser);

  }catch{
console.log(err);

      if (err && err.code === 'ENOENT') {
        res.status(404).end();
        return;
      }
  }
 },
 readAll: async (req, res) => {
    try {
      const usersData = await readFile(DATA_PATH, 'utf-8');
      const userdata = JSON.parse(usersData);

      res.json(userdata.users);

    } catch (err) {
      console.log(err)

      if (err && err.code === 'ENOENT') {
        res.status(404).end();
        return;
      }


    }
  },
};

module.exports = controllers;
