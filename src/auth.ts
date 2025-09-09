import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch(`${process.env.API}auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const payload = await res.json();
          console.log("Authorize payload:", payload);

          if (payload?.message === "success" && payload?.token) {
            const decode = JSON.parse(
              Buffer.from(payload.token.split(".")[1], "base64").toString()
            );

            return {
              id: decode.id,
              name: payload.user?.name ?? "",
              email: payload.user?.email ?? "",
              role: payload.user?.role ?? "user", // ✅ أضفنا role
              token: payload.token,
            };
          }

          throw new Error(`API Login Failed: ${JSON.stringify(payload)}`);
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider === "github") {
          token.user = {
            name: user?.name || "",
            email: user?.email || "",
            image: user?.image || "",
            role: "user",
          };
        } else {
          token.user = user;
          token.token = (user as any).token;
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user as any;
      (session as any).accessToken = token.token;
      return session;
    },
  },
};

export default NextAuth(authOptions);
