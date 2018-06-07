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
const docClient = new aws.DynamoDB.DocumentClient();

export function createUserTable() {
    dynamodb.createTable({
        TableName: 'reimbursements',
        KeySchema: [
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

export function saveReimbursement(reimbursement): Promise<any> {
    return docClient.put({
        TableName: 'reimbursements',
        Item: reimbursement
    }).promise();
}

export function getEmployeeReimbursement(username: string): Promise<any> {
    return docClient.query({
        TableName: 'reimbursements',
        KeyConditionExpression: 'username = :username',
        ExpressionAttributeValues: {
            ':username': username,
        }
    }).promise();
}

export function getReimbursementByStatus(status: string, username: string): Promise<any> {
    return docClient.query({
        TableName: 'reimbursements',
        IndexName: 'status-index',
        KeyConditionExpression: '#status = :status',
        FilterExpression: '#username <> :username',
        ExpressionAttributeNames: {
            '#status': 'status',
            '#username': 'username'
        },
        ExpressionAttributeValues: {
            ':status': status,
            ':username': username,
        }
    }).promise();
}

export function updateStatus(status: string, username: string, approver: string, timeSubmitted: number): Promise<any> {
    return docClient.update({
        TableName: 'reimbursements',
        Key: {
            'username': username,
            'timeSubmitted': timeSubmitted
        },
        UpdateExpression: 'set #status = :status, approver = :approver',
        ExpressionAttributeNames: {
            '#status': 'status'
        },
        ExpressionAttributeValues: {
            ':approver': approver,
            ':status': status
        }
    }).promise();
}