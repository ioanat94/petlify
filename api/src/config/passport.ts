import passport from 'passport'

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user: any, done) {
  done(null, user)
})
