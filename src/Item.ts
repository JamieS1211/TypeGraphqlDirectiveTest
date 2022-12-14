import { Directive, Field, ObjectType } from "type-graphql"

@ObjectType()
export default class Item {
    // Shown in neither "emitSchemaFile" and when using introspection
    @Directive('@deprecated(reason: "Wont work")')
    @Field()
    public manualDirective: string

    // Shown in both "emitSchemaFile" and when using introspection
    @Field({ deprecationReason: "But this works?" })
    public declareInField: string
}
