import GoogleTokenStrategy from 'passport-google-id-token'

import User from '../models/User'
import { GOOGLE_CLIENT_ID } from '../util/secrets'

interface ParsedToken {
  payload: {
    email: string
    name: string
    picture: string
    given_name: string
    family_name: string
  }
}

interface VerifiedCallback {
  (error: any, user?: any, info?: any): void
}

export default function () {
  return new GoogleTokenStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
    },
    async (
      parsedToken: ParsedToken,
      googleId: string,
      done: VerifiedCallback
    ) => {
      try {
        console.log('googleId:', googleId)
        console.log('parsedToken:', parsedToken)

        let user: any = await User.findOne({
          email: parsedToken.payload.email,
        })
        if (!user) {
          user = new User({
            firstname: parsedToken.payload.given_name,
            lastname: parsedToken.payload.family_name,
            email: parsedToken.payload.email,
            image: parsedToken.payload.picture,
          })
          user.save()
        }

        done(null, user)
      } catch (err) {
        done(err)
      }
    }
  )
}
