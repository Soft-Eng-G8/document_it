import prisma from "./db";

interface OAuthData {
  accessToken: string;
  refreshToken: string;
  providerAccountId: string;
};

interface CredentialsData {
  username: string;
  hashedPassword: string;
};

export async function createAccount(userId: string, provider: string, providerAccountID: string, data: OAuthData | CredentialsData) {
  const accountData: any = {
    userId,
    provider,
    providerAccountID
  }
  if(provider === 'credentials') {
    accountData.username = (data as CredentialsData).username
    accountData.hashedPassword = (data as CredentialsData).hashedPassword
  } else {
    accountData.accessToken  = (data as OAuthData).accessToken
    accountData.refreshToken = (data as OAuthData).refreshToken
  }

  return await prisma.account.create({ data: accountData })
}