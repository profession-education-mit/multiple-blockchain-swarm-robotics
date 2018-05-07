export default `
	type Swarm {
		id: ID!
		chainId: String!
		chainDataLocation: String!
		robots(
		    # A limit over how many objects are returned as specified http://docs.sequelizejs.com/manual/tutorial/querying.html#pagination-limiting
            take: Int
            
            # An offset determining how many objects should be skipped when returning as specified http://docs.sequelizejs.com/manual/tutorial/querying.html#pagination-limiting
            skip: Int
            
            # A JSON object conforming the the shape specified http://docs.sequelizejs.com/en/latest/docs/querying/
            where: JSON
            
            # An array of an array of strings in the form [[\\'field\\',\\'ASC|DESC\\']] as specified http://docs.sequelizejs.com/en/latest/docs/querying/#ordering
            order: [[String]]): [Robot]
	}
	
    input SwarmCreateInput {
		chainId: String!
		chainDataLocation: String!
		robots: [RobotCreateInput]
    }
    
    input SwarmUpdateInput {
        id: ID!
		chainId: String
		chainDataLocation: String
		robots: [RobotUpdateInput]
    }
   
	type Query {
    
        swarm(
            id: ID!
        ): Swarm
        
        swarms(
            # A limit over how many objects are returned as specified http://docs.sequelizejs.com/manual/tutorial/querying.html#pagination-limiting
            take: Int
            
            # An offset determining how many objects should be skipped when returning as specified http://docs.sequelizejs.com/manual/tutorial/querying.html#pagination-limiting
            skip: Int
            
            # A JSON object conforming the the shape specified http://docs.sequelizejs.com/en/latest/docs/querying/
            where: JSON
            
            # An array of an array of strings in the form [[\\'field\\',\\'ASC|DESC\\']] as specified http://docs.sequelizejs.com/en/latest/docs/querying/#ordering
            order: [[String]]
            ): [Swarm]    
    }
    
    type Mutation {
    
        createSwarm(
            id: ID!
		    chainId: String!
		    chainDataLocation: String!
		    robots: [RobotCreateInput]
            ): Swarm
           
        updateSwarm(
            id: ID!
		    chainId: String
		    chainDataLocation: String
		    robots: [RobotUpdateInput]
            ): Swarm
            
        deleteSwarm(
            id: ID!
        ): Swarm
    }
`;
