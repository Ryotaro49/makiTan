import {
  DynamoDBDocumentClient,
  QueryCommandInput,
  QueryCommand,
  PutCommandInput,
  DeleteCommand,
  DeleteCommandInput,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

export async function listPhrase(
  client: DynamoDBDocumentClient,
  params: {
    user_id: string;
    category: string;
    exclude_is_passed?: boolean;
    limit?: number;
  }
): Promise<PhraseRecord[] | undefined> {
  const commandParams = makeListPhraseQueryParams({
    ...params,
  });

  console.log(`List phrases`, JSON.stringify(commandParams));
  const response = await client.send(new QueryCommand(commandParams));
  console.log(`Phrases listed`, JSON.stringify(response));

  if (!response.Items || response.Items.length === 0) {
    return undefined;
  }

  return response.Items as PhraseRecord[];
}

function makeListPhraseQueryParams(params: {
  user_id: string;
  category: string;
  exclude_is_passed?: boolean;
  limit?: number;
}): QueryCommandInput {
  const commandParams: QueryCommandInput = {
    TableName: process.env.PHRASE_TABLE_NAME,
    ConsistentRead: false,
    KeyConditionExpression:
      "user_id = :user_id AND begins_with(category_phrase, :category_phrase)",
    FilterExpression: params.exclude_is_passed
      ? "is_passed = :is_passed"
      : undefined,
    ExpressionAttributeValues: {
      ":user_id": params.user_id,
      ":category_phrase": `${params.category}/`,
      ":is_passed": params.exclude_is_passed ? false : undefined,
    },
    Limit: params.limit,
  };
  return commandParams;
}

export async function registerPhrase(
  client: DynamoDBDocumentClient,
  params: PhraseRecord
): Promise<PhraseRecord | undefined> {
  const putCommandParams = makeRegisterPhrasePutParams({
    ...params,
  });

  console.log(`Registering phrase`, JSON.stringify(putCommandParams));
  const putResponse = await client.send(new PutCommand(putCommandParams));
  console.log(`Phrase registered`, JSON.stringify(putResponse));

  return getPhraseRecord(client, params);
}

async function getPhraseRecord(
  client: DynamoDBDocumentClient,
  params: PhraseRecord
): Promise<PhraseRecord | undefined> {
  const getCommandParams = makeGetPhraseQueryParams({
    ...params,
  });
  console.log(`Getting phrase`, JSON.stringify(getCommandParams));
  const getResponse = await client.send(new QueryCommand(getCommandParams));
  console.log(`Phrase got`, JSON.stringify(getResponse));

  if (!getResponse.Items || getResponse.Items.length === 0) {
    return undefined;
  }

  return getResponse.Items[0] as PhraseRecord;
}

function makeGetPhraseQueryParams(params: {
  user_id: string;
  category_phrase: string;
}): QueryCommandInput {
  const commandParams: QueryCommandInput = {
    TableName: process.env.PHRASE_TABLE_NAME,
    ConsistentRead: true,
    KeyConditionExpression:
      "user_id = :user_id AND category_phrase = :category_phrase",
    ExpressionAttributeValues: {
      ":user_id": params.user_id,
      ":category_phrase": params.category_phrase,
    },
    Limit: 1,
  };
  return commandParams;
}

function makeRegisterPhrasePutParams(params: PhraseRecord): PutCommandInput {
  const commandParams = {
    TableName: process.env.PHRASE_TABLE_NAME,
    Item: params,
  };
  return commandParams;
}

export async function deletePhrase(
  client: DynamoDBDocumentClient,
  params: Pick<PhraseRecord, "user_id" | "category_phrase">
): Promise<void> {
  const putCommandParams = makeDeletePhraseDeleteParams({
    ...params,
  });

  console.log(`Deleting phrase`, JSON.stringify(putCommandParams));
  const putResponse = await client.send(new DeleteCommand(putCommandParams));
  console.log(`Phrase deleted`, JSON.stringify(putResponse));
}

function makeDeletePhraseDeleteParams(
  params: Pick<PhraseRecord, "user_id" | "category_phrase">
): DeleteCommandInput {
  const commandParams: DeleteCommandInput = {
    TableName: process.env.PHRASE_TABLE_NAME,
    Key: {
      user_id: params.user_id,
      category_phrase: params.category_phrase,
    },
  };
  return commandParams;
}

export function convertPhraseRecordToModel(record: PhraseRecord): Phrase {
  const [category, phrase] = record.category_phrase.split("/");
  return {
    user_id: record.user_id,
    category,
    phrase,
    meaning: record.meaning,
    is_passed: record.is_passed === 1 ? true : false,
    registration_date: record.registration_date,
    updated_at: record.updated_at,
  };
}
