export default `
	type Experiment {
		id: ID!
		percentByzantine: Int!
		startTime: String!
		endTime: String
		boardDimension: Int!
		board: [Int!]
		swarms(
		    # A limit over how many objects are returned as specified http://docs.sequelizejs.com/manual/tutorial/querying.html#pagination-limiting
            take: Int
            
            # An offset determining how many objects should be skipped when returning as specified http://docs.sequelizejs.com/manual/tutorial/querying.html#pagination-limiting
            skip: Int
            
            # A JSON object conforming the the shape specified http://docs.sequelizejs.com/en/latest/docs/querying/
            where: JSON
            
            # An array of an array of strings in the form [[\\'field\\',\\'ASC|DESC\\']] as specified http://docs.sequelizejs.com/en/latest/docs/querying/#ordering
            order: [[String]]): [Swarm]
	}
   
	type Query {
    
        experiment(
            id: ID!
        ): Experiment
        
        experiments(
            # A limit over how many objects are returned as specified http://docs.sequelizejs.com/manual/tutorial/querying.html#pagination-limiting
            take: Int
            
            # An offset determining how many objects should be skipped when returning as specified http://docs.sequelizejs.com/manual/tutorial/querying.html#pagination-limiting
            skip: Int
            
            # A JSON object conforming the the shape specified http://docs.sequelizejs.com/en/latest/docs/querying/
            where: JSON
            
            # An array of an array of strings in the form [[\\'field\\',\\'ASC|DESC\\']] as specified http://docs.sequelizejs.com/en/latest/docs/querying/#ordering
            order: [[String]]
            ): [Experiment]    
    }
    
    type Mutation {
    
        createExperiment(
            percentByzantine: Int!
            endTime: String
            boardDimension: Int
            board: [Int]
            swarms: [SwarmCreateInput]
            ): Experiment
           
        updateExperiment(
            id: ID!
            percentByzantine: Int
            endTime: String
            boardDimension: Int
            board: [Int]
            swarms: [SwarmUpdateInput]
            ): Experiment
            
        deleteExperiment(
            id: ID!
        ): Experiment
    }
`;
