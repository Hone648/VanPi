const graphql = require('graphql');
const Settings = require('../models/settings');
const User = require('../models/user');

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
                return users
            }
        },
        allSettings: {
            type: new GraphQLList(SettingsType),
            resolve(parent, args) {
                return allSettings
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                password: { type: GraphQLString },
                access: { type: GraphQLBoolean }
            },
            resolve(parent, args) {
                let user = new User({
                    name: args.name,
                    password: args.password,
                    access: args.access
                });
                return user.save()
            }
        },
        addSettings: {
            type: SettingsType,
            args: {
                mode: { type: GraphQLString },
                alternatorVisible: { type: GraphQLBoolean },
                GWAlarm: { type: GraphQLInt },
                GWDump: { type: GraphQLInt },
                BWAlarm: { type: GraphQLInt },
                BWDump: { type: GraphQLInt }
            },
            resolve(parent, args) {
                let settings = new Settings({
                    mode: args.mode,
                    alternatorVisible: args.alternatorVisible,
                    GWAlarm: args.GWAlarm,
                    GWDump: args.GWDump,
                    BWAlarm: args.BWAlarm,
                    BWDump: args.BWDump
                });
                return settings.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});