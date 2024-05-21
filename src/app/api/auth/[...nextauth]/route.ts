import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_OAUTH_ID || "",
    //   clientSecret: process.env.GOOGLE_OAUTH_SECRET || "",
    // }),
    // NaverProvider({
    //   clientId: process.env.NAVER_CLIENT_ID || "",
    //   clientSecret: process.env.NAVER_CLIENT_SECRET || "",
    // }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    // async session({ session, token, user }) {
    //   // Send properties to the client, like an access_token from a provider.
    //   session.accessToken = token.accessToken
    //   return session
    // }
  }
});

export { handler as GET, handler as POST };