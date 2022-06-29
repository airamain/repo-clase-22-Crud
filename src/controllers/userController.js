const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const { validationResult } = require("express-validator");

const bcrypt = require('bcryptjs');

const filePath = path.resolve(__dirname, '../data/users.json');
const usersDb = JSON.parse(fs.readFileSync(filePath, 'utf8'))


const controller = {

    // Formulario
    register: (req, res) => {
        return res.render("register");
    },

    // Register Data
    proccesRegister: (req, res) => {
        try {
            const resultValidation  = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                messageErrors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        // Genero Id para cada registro
        const generateId = () => {
            let lastUser = usersDb[usersDb.length - 1];
            if (lastUser) {
                return lastUser.id + 1;
            }
            return 1;
        }

        // Elimino el rePassword para no guardar en la db
        // los objetos literales tienen la posibilidad de que le podamos eliminar cosas...
        const bodyData = req.body;
        delete bodyData.rePassword;

        let userToCreate = {
            id: generateId(),
            ...bodyData,
            password: bcrypt.hashSync(bodyData.password, 10),
            avatar: req.file.filename
        }

        usersDb.push(userToCreate);

        fs.writeFileSync(filePath, JSON.stringify(usersDb, null, " "));

        return res.redirect("login");
            
        } catch (error) {
            return res.status(400).JSON({msg:"Error del Back", error})
        }
        
    },

    // LoginForm
    login: (req, res) => {
        return res.render("login");
    },

    // Login data
    loginProcess: (req, res) => {
        // 1. Verificar si el usuario exist en la DB
        const userToLogin = usersDb.find(oneUser => oneUser.email === req.body.email)

        if (userToLogin) {
            // 2. Comparamos contraseña
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, userToLogin.password)

            if (isPasswordCorrect) {
                //3. Guardar el usuario en la Session
                delete userToLogin.password; // Borrarmos el pass para no tenerlos en la session
                req.session.userLogged = userToLogin;

                return res.redirect('/users/profile')
            }
        }
    },

    // Formulario Profile User
    profile: (req, res) => {
        return res.render("userProfile", {
            user: req.session.userLogged
        })
    }
}


module.exports = controller;