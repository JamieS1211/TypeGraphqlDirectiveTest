import { Query, Resolver } from "type-graphql"

import Item from "./Item"

@Resolver()
export default class ItemResolver {
    @Query(() => [Item])
    public get() {
        return []
    }
}
