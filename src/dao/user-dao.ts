import aws from 'aws-sdk';
import { ConfigurationOptions } from 'aws-sdk/lib/config';
import { PassThrough } from 'stream';
const awsConfig: ConfigurationOptions = {
    region: 'us-west-2',
    accessKeyId: process.env.AWS_ERS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ERS_SECRET_ACCESS_KEY
}

aws.config.update(awsConfig);

const dynamodb = new aws.DynamoDB();
const docClient = new aws.DynamoDB.DocumentClient(); //subset of functionallity

export function createUserTable() {
    dynamodb.createTable({
        TableName: 'users',
        KeySchema: [
            // Need to change to match user table in database
            { AttributeName: 'username', KeyType: 'HASH' }
        ],
        AttributeDefinitions: [
            { AttributeName: 'username', AttributeType: 'S' }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 2,
            WriteCapacityUnits: 2
        }
    }, (err, data) => {
        if (err) {
            console.log(`Unable to creat table: \n ${JSON.stringify(err, undefined, 2)}`);
        } else {
            console.log(`Created table: \n ${JSON.stringify(data, undefined, 2)}`);
        }
    });
}

export function findUser(username: string): Promise<any> {
    return docClient.query({
        TableName: 'users',
        KeyConditionExpression: 'username = :username',
        ExpressionAttributeValues: {
            ':username': username
        }
    }).promise();
}

export function saveUser(user): Promise<any> {
    return docClient.put({
        TableName: 'users',
        Item: user
    }).promise();
}

export function loginUser(username: string, password: string): Promise<any> {
    return docClient.query({
        TableName: 'users',
        KeyConditionExpression: 'username = :username',
        FilterExpression: 'password = :password',
        ExpressionAttributeValues: {
            ':username': username,
            ':password': password
        }
    }).promise();
}