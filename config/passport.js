const passport = require('passport');
const app = require('express');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const flash = require('connect-flash');
const database = require('../db/database_connection');
const {
    encryptPassword,
    matchPassword
} = require('../config/helper_pass');
console.log("GOTHERE1")
passport.use('local.signin', new LocalStrategy({

    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, username, password, done) => {
    
    console.log("GOTHERE2")
    // const rows = await database.query("SELECT * FROM iStock_users WHERE username = ?", [username]);
    const rows = await database.get("SELECT * FROM iStock_users WHERE username = ?", [username]);
    console.log("get databse with username", rows)
    console.log("rows.length", Object.keys(rows).length)
    // if (rows.length > 0) {
    if (Object.keys(rows).length > 0) {

        // const user = rows[0];
        const user = rows;
        const validPassword = await matchPassword(password, user.password);
        console.log("validPassword", validPassword)

        if (validPassword) {

            done(null, user, req.flash('success', 'Welcome user: ' + user.username));

        } else {

            done(null, false, req.flash('message', 'Incorrect password'));

        }

    } else {

        return done(null, false, req.flash('message', 'The username does not exists'));

    }

}));

passport.use('local.signup', new LocalStrategy({

    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, username, password, done) => {
    console.log("GOTHERE3")

    const {
        firstname
    } = req.body;

    const {
        lastname
    } = req.body;

    const newUser = {
        username: username,
        password: password,
        first_name: firstname,
        last_name: lastname
    } 

    const check = async () =>{
        if(!firstname || !lastname || !username || !password){
            console.log(message,'Please enter all fields', 'fail') 
       } else {
            if(password.length < 6) {
              console.log({ msg: 'Password must be at least 6 characters'});
             }else{
                    // database.query("SELECT * FROM iStock_users WHERE username = ?", [username]).then((req, res) => {
                    database.get("SELECT * FROM iStock_users WHERE username = ?", [username]).then((req, res) => {
                        const check2 = async () => {
                            newUser.password = await encryptPassword(password);

                            // const result = await database.query("INSERT INTO iStock_users SET ?", [newUser]);
                            console.log("GOTHERE4")
                            console.log("GOTHERE4::::", newUser)
                            // const result = await database.run("INSERT INTO istock_users(username,password,first_name,last_name)  VALUES(?,?,?,?)", 
                            // [newUser.username, newUser.password, newUser.first_name, newUser.last_name]);
                            // const result = database.run("INSERT INTO istock_users(username,password,first_name,last_name)  VALUES(?,?,?,?)", 
                            // [newUser.username, newUser.password, newUser.first_name, newUser.last_name]);
                            database.run("INSERT INTO istock_users(username,password,first_name,last_name)  VALUES(?,?,?,?)", 
                            [newUser.username, newUser.password, newUser.first_name, newUser.last_name], function(err) {
                                if (err) {
                                  return console.error(err.message);
                                }
                                console.log(`Rows inserted ${this.changes}`);//lastrowid
                                console.log(`Rows inserted ${Object.keys(this)}`);//lastID
                                console.log(`Rows inserted ${this.lastID}`);
                                console.log("GOTHERE5")
                                // console.log(result.changes)//Object.keys(object1)
                                // console.log(Object.keys(result))
                                console.log("GOTHERE6")
                                newUser.id = this.lastID;
    
                                console.log(newUser);
                                return done(null, newUser, console.log('success', 'Welcome user: ', newUser.username));
                                
                              })
                            //   console.log(result.changes)//Object.keys(object1)
                            //   console.log(Object.keys(result))

                            // return done(null, newUser, console.log('success', 'Welcome user: ', newUser.username));

                        }
                        check2 ();
                        //console.log('req: ', Object.keys(req));
                        //console.log('res: ', req[0].username);
                        // console.log('req ', req.length);
                        // if(!req.lenght > 0){
                        //     // newUser.password = function operation(encryptPassword) {encryptPassword(password);}
                        //     //     console.log('yo!1:', newUser.password)
                        //     //     database.query("INSERT INTO iStock_users SET ?", [newUser]).then(function(){
                        //     //         newUser.id = result.insertId;
        
                        //     //         console.log(newUser);
        
                        //     //         return done(null, newUser, req.flash('success', 'Welcome user: ', newUser.username));
                        //     //     });
                        // } else {
                        //     if(req[0].username) {
                        //         console.log({ msg: 'User already exists'});
                        //     } else {
                                
        
                        //         // newUser.id = result.insertId;
        
                        //         // console.log(newUser);
        
                        //         // return done(null, newUser, req.flash('success', 'Welcome user: ', newUser.username));
                        //     } 

                        // }
                            
                            
                        
                    }) 
          
           
            
        }
    }
    }
        check();
    // newUser.password = await encryptPassword(password);

    // const result = await database.query("INSERT INTO iStock_users SET ?", [newUser]);

    // newUser.id = result.insertId;

    // console.log(newUser);

    // return done(null, newUser, req.flash('success', 'Welcome user: ', newUser.username));

}));

passport.serializeUser((user, done) => {

    done(null, user.id);

});

passport.deserializeUser(async (id, done) => {

    // const rows = await database.query("SELECT * FROM iStock_users WHERE id = ?", [id]);
    console.log("AAAAAAAAAAAAAAAAAAA", id)
    const rows = await database.get("SELECT * FROM iStock_users WHERE id = ?", [id]);
    console.log("BBBBBBBBBBBBBBB", rows.id)
    // done(null, rows[0]);
    done(null, rows.id);

});