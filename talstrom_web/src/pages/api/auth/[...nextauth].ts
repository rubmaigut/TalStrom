import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          scope: 'openid email profile',
        },
      },
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
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.sub = profile.sub;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user && token.sub) {
        session.user = session.user ?? {}; 
        session.user.sub = token.sub;
      }
      return session;
    },
  },

  events: {},

  debug: false,
})