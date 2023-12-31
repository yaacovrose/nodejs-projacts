import usersDal from "./dal/dal.users.js";
import bcrypt from 'bcrypt';
import Joi from "joi";


const allUsersValid = (req, res, next) => {
    const { email, password } = req.query
    const user = {
        email,
        password,
    }
    const valid = validate(user)
    if (valid !== true){
        res.send(valid)
    } else {
        next()
    }
}
const userByIdValid = (req, res, next) => {
    const id = req.params.id
    const { email, password } = req.query
    const user = {
        id,
        email,
        password,
    }
    const valid = validate(user)
    if (valid !== true){
        res.send(valid)
    } else {
        next()
    }
}

const loginValid = (req, res, next) => {
    const { email, password } = req.body
    const user = {
        email,
        password,
    }
    const valid = validate(user)
    if (valid !== true){
        res.send(valid)
    } else {
        next()
    }
}


const updateValid = (req, res, next) => {
    const details = req.body
    const valid = validate(details)
    if (valid !== true){
        res.send(valid)
    } else {
        next()
    }
}


const deleteValid = (req, res, next) => {
    const id = req.params.id
    const { email, password } = req.query
    const user = {
        id,
        email,
        password,
    }
    const valid = validate(user)
    if (valid !== true){
        res.send(valid)
    } else {
        next()
    }
}


const addUserValid = (req, res, next) => {
    const details = req.body
    const valid = validate(details)
    if (valid !== true){
        res.send(valid)
    } else {
        next()
    }
}


function validate (user) {
    const userSchema = Joi.object({
        id: Joi.number().integer().min(1),
        idCreator: Joi.number().integer().min(1),
        email: Joi.string().email(),
        password: Joi.string().min(8),
        isAdmin: Joi.boolean(),
    });

    const validationResult = userSchema.validate(user);
    
    if (validationResult.error) {
        return (validationResult.error.details)
        
    } else {
        return true
        
    }
}



const isAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.query
        const exist = await isExist(email, password)
        if (!exist){
            res.send('User not found')
            return
        } else {
            const check = isUserAdmin(exist)
            if (check) {
                next()
            } else {
                res.send('no access')
                return
            }
        }
    } catch (err){
        res.send(err)
    }
    }
    

const isCreator = async (req, res, next) => {
    try {
        const { email, password } = req.query
        const exist = await isExist(email, password)
        if (!exist){
            res.send('User not found')
            return
        } else {
            const id = req.params.id
            const check = cardCreator(id)
            if (check) {
                next()
            } else {
                res.send('no access')
                return
            }
        }
    } catch (err){
        res.send(err)
    }
}


const adminOrCreator = async (req, res, next) => {
    try {
        const { email, password } = req.query
        const exist = await isExist(email, password)
        if (!exist){
            res.send('User not found')
            return
        } else {
            const checkAdmin = isUserAdmin(exist) 
            const id = req.params.id
            const checkCreator = cardCreator(id)
            if (checkAdmin || checkCreator) {
                next()
            } else {
                res.send('no access')
                return
            }
        }
    } catch (err){
        res.send(err)
    }
}



async function isExist (email, password){
    const allUsers = await usersDal.readFiles()
    const user = allUsers.find((user) => user.email === email && bcrypt.compareSync(password,user.password))
    if (user){
        return user
    } else {
        return false
    }
}


function isUserAdmin (user) {
    if (user.isAdmin){
        return true
    } else {
        return false
    }
}


async function cardCreator (id) {
    const allUsers = await usersDal.readFiles()
    const user = allUsers.find(user => user.id == id)
    if (user.id === user.idCreator){
        return true
    } else {
        return false
    }
}

const middleWare = {
    allUsersValid,
    userByIdValid,
    loginValid,
    updateValid,
    addUserValid,
    deleteValid,
    isAdmin,
    isCreator,
    adminOrCreator,
}

export default middleWare



























// passport.use(new LocalStrategy(
//     async (username, password, done) => {
//       try {
//         const user = await User.findOne({ username });
//         if (!user) {
//           return done(null, false, { message: 'Incorrect username.' });
//         }
//         if (!user.validatePassword(password)) {
//           return done(null, false, { message: 'Incorrect password.' });
//         }
//         return done(null, user);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   ));
// //   Initialize Passport Middleware:



//   Set up Passport middleware in your application.
  
//   javascript
//   Copy code
//   app.use(passport.initialize());
//   app.use(passport.session());
// //   Serialize and Deserialize User:
  
// //   Passport needs to serialize and deserialize user instances to and from the session.
  
// //   javascript
// //   Copy code
//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });
  
//   passport.deserializeUser(async (id, done) => {
//     try {
//       const user = await User.findById(id);
//       done(null, user);
//     } catch (error) {
//       done(error);
//     }
//   });
// //   Routes for Authentication:
  
// //   Create routes for login, logout, and registration using Passport's authenticate middleware.
  
// //   javascript
// //   Copy code
//   app.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
//   }));
  
//   app.get('/logout', (req, res) => {
//     req.logout();
//     res.redirect('/');
//   });
// //   Protect Routes:
  
// //   Use Passport's ensureAuthenticated middleware to protect routes that require authentication.
  
// //   javascript
// //   Copy code
//   function ensureAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//       return next();
//     }
//     res.redirect('/login');
//   }
  
//   app.get('/protected', ensureAuthenticated, (req, res) => {
//     res.send('This is a protected route.');
//   });
// //   Remember, this is a basic guide to using Passport.js for local authentication. Depending on your application's needs, you might need to adjust and expand these steps. Additionally, ensure you have the necessary database setup and user model for your authentication system.
  
  
  
  
  
  