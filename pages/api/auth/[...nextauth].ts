import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth, { AuthOptions } from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github'

import bcrypt from "bcrypt"

import prisma from "@/libs/prismadb"

// Custom adapter to handle username generation for OAuth users
const customAdapter = {
  ...PrismaAdapter(prisma),
  async createUser(user: any) {
    if (!user.username && user.email) {
      const baseUsername = user.email.split('@')[0];
      const randomSuffix = Math.floor(Math.random() * 10000);
      user.username = `${baseUsername}${randomSuffix}`;
    }

    return prisma.user.create({
      data: user,
    });
  },
};

export const authOptions: AuthOptions = {
  adapter: customAdapter,
  providers: [
    GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }

        return user;
      }
    })
  ],
  pages: {
    signIn: '/'
  },
  
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);