import usersDal from "./dal/dal.users.js";


const isAdmin = async (req, res, next) => {
    try {const email = req.query.email
    const password = req.query.password
    const allUsers = await usersDal.readFiles()
    const user = allUsers.find((user) => user.email === email && user.password === password)
    if (!user){
        res.send('User not found')
        return
    } else {
        if (user.isAdmin) {
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


const middleWare = {
    isAdmin,
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
  
  
  
  
  
  