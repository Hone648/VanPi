const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList } = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        access: { type: GraphQLBoolean },
        password: { type: GraphQLString }
    })
});

const SettingsType = new GraphQLObjectType({
    name: 'Settings',
    fields: () => ({
        id: { type: GraphQLID },
        mode: { type: GraphQLString },
        alternatorVisible: { type: GraphQLBoolean },
        GWAlarm: { type: GraphQLInt },
        GWDump: { type: GraphQLInt },
        BWAlarm: { type: GraphQLInt },
        BWDump: { type: GraphQLInt }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                console.log(args.id)
            }
        },
        settings: {
            type: SettingsType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                console.log(args.id)
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return users;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});