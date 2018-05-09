export default `
	enum RobotCategoryEnum {
		SURVEY
		HARVEST
	}
    
	type Robot {
		id: ID!
        jValue: Int!
        kValue: Int!
		byzantine: Boolean!
		nodeId: String!
        opinion: Int
        countX: Int
        countAll: Int
        localGroup: [ID]
        localGroupOpinions: [Int]
	}
	
    input RobotCreateInput {
		category: RobotCategoryEnum!
		byzantine: Boolean!
		nodeId: String!
    }
    
    input RobotUpdateInput {
        id: ID!
		category: RobotCategoryEnum
		byzantine: Boolean
		nodeId: String
    }
   
	type Query {
    
        robot(
            id: ID!
        ): Robot
        
        robots(
            # A limit over how many objects are returned as specified http://docs.sequelizejs.com/manual/tutorial/querying.html#pagination-limiting
            take: Int
            
            # An offset determining how many objects should be skipped when returning as specified http://docs.sequelizejs.com/manual/tutorial/querying.html#pagination-limiting
            skip: Int
            
            # A JSON object conforming the the shape specified http://docs.sequelizejs.com/en/latest/docs/querying/
            where: JSON
            
            # An array of an array of strings in the form [[\\'field\\',\\'ASC|DESC\\']] as specified http://docs.sequelizejs.com/en/latest/docs/querying/#ordering
            order: [[String]]
            ): [Robot]    
    }
    
    type Mutation {
    
        createRobot(
            swarmId: ID!
            category: String!
		    byzantine: Boolean!
		    nodeId: String!
            ): Robot
           
        updateRobot(
            id: ID!
            swarmId: ID
            category: String
		    byzantine: Boolean
		    nodeId: String
            ): Robot
            
        deleteRobot(
            id: ID!
        ): Robot
    }
`;
