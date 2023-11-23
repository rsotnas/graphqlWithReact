const graphql = require('graphql');
// const _ = require('lodash');
const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList, 
  GraphQLNonNull
} = graphql;

// const users = [
//   { id: '23', firstName: 'Bill', age: 20 },
//   { id: '47', firstName: 'Samantha', age: 21 }
// ];

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    // this is a function because we have to tell GraphQL how to get the users associated with the company
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      // resolve function is where we actually go into our database and find the data we are looking for
      resolve(parentValue, args) {
        // parentValue is the company we are currently working with
        // return _.filter(users, { companyId: parentValue.id });
        return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
          .then(resp => resp.data);
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        // parentValue is the user we are currently working with
        // return _.find(companies, { id: parentValue.companyId });
        return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then(resp => resp.data);
      }
    }
  })
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/users/${args.id}`)
          .then(resp => resp.data);
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString }},
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3000/companies/${args.id}`)
          .then(resp => resp.data);
      }
    }
  }
});


const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // name of mutation
    addUser: {
      // type of data we are returning
      type: UserType,
      // args we need to pass in to complete the mutation
      args: {
        // GraphQLNonNull means the field is required
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        // companyId is not required because we can add a user without a company
        companyId: { type: GraphQLString }
      },
      // resolve function is where we actually go into our database and find the data we are looking for
      resolve(parentValue, { firstName, age, companyId}) {
        // post request to our json server
        return axios.post('http://localhost:3000/users', { firstName, age, companyId })
          .then(resp => resp.data);
      }
    },
    // name of mutation
    deleteUser: {
      // type of data we are returning
      type: UserType,
      // args we need to pass in to complete the mutation
      args: {
        // GraphQLNonNull means the field is required
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      // resolve function is where we actually go into our database and find the data we are looking for
      resolve(parentValue, { id }) {
        // delete request to our json server
        return axios.delete(`http://localhost:3000/users/${id}`)
          .then(resp => resp.data);
      }
    },
    // name of mutation
    editUser: {
      // type of data we are returning
      type: UserType,
      // args we need to pass in to complete the mutation
      args: {
        // GraphQLNonNull means the field is required
        id: { type: new GraphQLNonNull(GraphQLString) },
        // GraphQLNonNull means the field is required
        firstName: { type: GraphQLString },
        // GraphQLNonNull means the field is required
        age: { type: GraphQLInt },
        // GraphQLNonNull means the field is required
        companyId: { type: GraphQLString }
      },
      // resolve function is where we actually go into our database and find the data we are looking for
      resolve(parentValue, args) {
        // patch request to our json server
        return axios.patch(`http://localhost:3000/users/${args.id}`, args)
          .then(resp => resp.data);
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});

