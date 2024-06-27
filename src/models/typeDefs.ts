import gql from "graphql-tag";

const typeDefs = gql`
  input IntFilter {
    from: Int
    to: Int
  }

  input DateFilter {
    from: String
    to: String
  }

  input PodkraduliesFilters {
    speeds: IntFilter
    sizes: [String]
    creation: DateFilter
  }

  input PodkraduliesInput {
    id: [ID!]
    filter: PodkraduliesFilters
  }

  type Query {
    podkradulies(input: PodkraduliesInput): [Podkradulya]
    podkradulya(id: ID!): Podkradulya
  }

  type Podkradulya {
    id: ID
    size: String
    speed: Int
    createdAt: String
    updatedAt: String
  }

  type Mutation {
    create(size: String, speed: Int): Podkradulya
    update(id: ID, size: String, speed: Int): Podkradulya
    delete(id: ID): Podkradulya
  }
`;

export default typeDefs