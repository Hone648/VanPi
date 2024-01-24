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
    GraphQLList,
    GraphQLNonNull
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        access: { type: GraphQLBoolean },
        password: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }

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
        BWDump: { type: GraphQLInt },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return User.findById(args.id)
            }
        },
        settings: {
            type: SettingsType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Settings.findById(args.id)
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({})
            }
        },
        allSettings: {
            type: new GraphQLList(SettingsType),
            resolve(parent, args) {
                return Settings.find({})
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                access: { type: new GraphQLNonNull(GraphQLBoolean) }
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
                mode: { type: new GraphQLNonNull(GraphQLString) },
                alternatorVisible: { type: new GraphQLNonNull(GraphQLBoolean) },
                GWAlarm: { type: new GraphQLNonNull(GraphQLInt) },
                GWDump: { type: new GraphQLNonNull(GraphQLInt) },
                BWAlarm: { type: new GraphQLNonNull(GraphQLInt) },
                BWDump: { type: new GraphQLNonNull(GraphQLInt) }
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