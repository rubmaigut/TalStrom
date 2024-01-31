import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter"

export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
      // @ts-ignore
      scope: "read:user",
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
  ],
  secret: process.env.SECRET,

  session: { 
    strategy: 'jwt'
  },

  jwt: {
    secret: process.env.SECRET,
  },

  pages: {
  },

  callbacks: {
  },

  events: {},

  debug: false,
})