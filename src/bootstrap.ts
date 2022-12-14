/* eslint-disable @typescript-eslint/require-await */

import "reflect-metadata"

import { ApolloServer } from "apollo-server-express"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core/dist/plugin/landingPage/graphqlPlayground"
import ItemResolver from "./ItemResolver"
import { buildSchema } from "type-graphql"
import { createServer } from "http"
import express from "express"
import { specifiedDirectives } from "graphql"

const bootStrap = async () => {
    const app = express()
    const httpServer = createServer(app)

    const schema = await buildSchema({
        resolvers: [ItemResolver],
        validate: false,
        // This includes @include, @skip, @deprecated and @specifiedBy (same as default)
        directives: [...specifiedDirectives],
        // As per docs I would not expect this to show directives from decorators (but it does show deprecated directive from field decorator)
        emitSchemaFile: true
    })

    const apolloServer = new ApolloServer({ schema, plugins: [ApolloServerPluginLandingPageGraphQLPlayground()], introspection: true })
    await apolloServer.start()
    apolloServer.applyMiddleware({ app })

    const port = "3001"

    // Startup server
    httpServer.listen({ port })

    httpServer.once("listening", () => {
        // eslint-disable-next-line no-console
        console.info(`Server listening on port: ${port}`)
    })

    return { app, apolloServer }
}

void bootStrap()
