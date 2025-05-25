import NextAuth, { NextAuthConfig } from "next-auth"
import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"
import { DynamoDBAdapter } from "@auth/dynamodb-adapter"
import Resend from "next-auth/providers/resend"

const config: DynamoDBClientConfig = {
    credentials: {
        accessKeyId: process.env.AUTH_DYNAMODB_ID!,
        secretAccessKey: process.env.AUTH_DYNAMODB_SECRET!,
    },
    region: process.env.AUTH_DYNAMODB_REGION,
}

const client = DynamoDBDocument.from(new DynamoDB(config), {
    marshallOptions: {
        convertEmptyValues: true,
        removeUndefinedValues: true,
        convertClassInstanceToMap: true,
    },
})

const expires = new Date(Date.now() + 10 * 60 * 1000)

export const nextAuthConfig: NextAuthConfig = {
    providers: [Resend({
        from: process.env.AUTH_EMAIL_FROM!,
    })],
    pages: {
        signIn: "/teams",
    },
    adapter: DynamoDBAdapter(client, {
        tableName: "poker_auth",
        partitionKey: "pk"
    }),
}


export const { handlers, auth, signIn, signOut } = NextAuth(nextAuthConfig)