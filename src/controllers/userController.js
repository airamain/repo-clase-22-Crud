const fs = require('fs');
const path = require('path');

const { validationResult } = require("express-validator");

const filePath = path.resolve(__dirname, '../data/users.json');
const usersDb = JSON.parse(fs.readFileSync(filePath, 'utf8'))

const controller = {

// Formulario
    register: (req, res) => {
        return res.render("register");
    },

// Register Data
    proccesRegister: (req, res) => {
        const resultValidation  = validationResult(req);

        if(resultValidation.errors.length > 0) {
            return res.render('register', {
                messageErrors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        const generateId = () => {
            let lastUser = usersDb[usersDb.length - 1];
            if(lastUser) {
                return lastUser.id + 1;
            }
            return 1;
        }

        const bodyData = req.body;
        delete bodyData.rePassword;

        let userToCreate = {
            id: generateId(),
            ...bodyData
        }

        usersDb.push(userToCreate);

        fs.writeFileSync(filePath, JSON.stringify(usersDb, null, " "));

        return res.redirect("/users/login");
    },

    // LoginForm
    login: (req, res) => {
        return res.render("login");
    },

    // Login data
    loginProcess: (req, res) => {
        return res.render("Vamos a Loguearnos")
    }
    
    //

}


module.exports = controller;