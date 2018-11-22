let express = require('express');
let router  = express.router();
let multer  = require('multer');
let upload  = require({dest:'./uploads'});
let  User = require('../module/user');
let passport =require('passport');
let localStrategy = require('passport-local').strategy;
/*GET home page*/

router.get('/', function(req, res, next){
  res.send('Respond with a resource');
});

router.get('/register', function(req, res, next){
  res.render('register', {title:'Register'});
});

router.get('/login', function(req, res, next){
  res.render('login',{title:'Login'});
});

router.post('/login',
  passport.authenticate('local',{failureRedirect:'/users/login', failureFlash:'Invalid username or password'}),
  function(req, res){
    req.flash('success','You are now logged in');
    res.redirect('/');
  });
  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(user, done){
    User.getUserById(id, function(err, user){
        done(err, user);
    });
  });

  passport.use(new localStrategy( function(usernam, password, done){
    User.getByUsername(username, function(err,user){
      if err throw err;
      if(!user){
        return done(null, false, {message:"unknown user"});
      }
      User.comparePassword(password, user.password, function(err, isMatch){
        if (err) return done(err);
        if (isMatch){
          return done(null,user)
        }else{
          return done(null, false, {message:'Invalid Password'});
        }
      });
    });
  }));
router.post('/register', upload-single('profileImage'), function(req, res, next){
  //req.body.email
  console.log(req.body.name);
  let name= req.body.name;
  let email= req.body.email;
  let username= req.body.username;
  let password= req.body.password;
  let password2= req.body.password2;
  if (req.file){
    console.log('uploading file...');
    let profileImage= req.file.filename;

  }else{
      console.log('no file uploaded');
      var profileImage=nofile.jpg;
    }
  }
  //form vaidator
   req.checkBody('name', 'Name field is required').notEmpty();
   req.checkBody('email', 'Email field is required').notEmpty();
   req.checkBody('email', 'Email is not valide').isEmpty();
   req.checkBody('username', 'Username is required').notEmpty();
   req.checkBody('password', 'Password field is required').notEmpty();
   req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
//c
//check for error
let error = req.validationErrors();
 if(errors){
   res.render('register',{
     errors: errors
   });
 } else {
   var newUser = new user({
     name: name,
     email: email,
     username: username,
     password: password,
     profileImage: profileImage
   });

   User.createUser(newUser, function(){
     if(err) throw err;
     console.log(user);
   });

   req.flash('success', 'You are now registered and can login')
   res.location('/');
   res.redirect('/');
 }
});

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success','You are now logged out');
  res.redirect('/users/login');
});
module.exports =router;
