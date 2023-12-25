import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

export function createDynamoDbClient(region?: string) {
  return new DynamoDBClient({
    region: region ?? process.env.DYNAMODB_REGION,
    credentials: !!process.env.DYNAMODB_ENDPOINT
      ? { accessKeyId: "FAKE", secretAccessKey: "FAKE" }
      : undefined,
    endpoint: process.env.DYNAMODB_ENDPOINT,
  });
}

export function createDynamoDbDocumentClient(region?: string) {
  return DynamoDBDocumentClient.from(createDynamoDbClient(region), {
    marshallOptions: {
      removeUndefinedValues: true,
    },
  });
}
