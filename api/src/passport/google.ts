import GoogleTokenStrategy from 'passport-google-id-token'
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
        done(null)
      } catch (err) {
        done(err)
      }
    }
  )
}
