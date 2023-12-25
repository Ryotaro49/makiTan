import { createDynamoDbDocumentClient } from "../lib/aws";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { ClientError } from "../types/errors";
import {
  createErrorResponseObject,
  createResponseObject,
  extractBody,
  extractQueryParameters,
} from "../lib/api-utils";
import { ClientErrors } from "../types/errors";
import {
  convertPhraseRecordToModel,
  deletePhrase,
  listPhrase,
  registerPhrase,
} from "../lib/phrase";

/**
 * 語句一覧を取得する
 * @returns
 */
export async function listPhraseHandler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const dbClient = createDynamoDbDocumentClient(
      process.env.DYNAMODB_TABLE_REGION
    );
    const params = extractQueryParameters<ListPhraseRequestParams>(event);

    const records = await listPhrase(dbClient, {
      user_id: params.user_id,
      category: params.category,
      exclude_is_passed: params.exclude_is_passed,
      limit: params.limit,
    });

    const phrases = records?.map(convertPhraseRecordToModel) ?? [];

    return createResponseObject(phrases);
  } catch (error) {
    return createErrorResponseObject(error);
  }
}

/**
 * 語句を登録する
 * @returns
 */
export async function registerPhraseHandler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const dbClient = createDynamoDbDocumentClient(
      process.env.DYNAMODB_TABLE_REGION
    );

    const params = extractBody<RegisterPhraseRequestBody>(event);

    if (params.registration_date.match(/^\d{4}-\d{2}-\d{2}$/) === null) {
      throw new ClientError(ClientErrors.REGISTRATION_DATE_IS_INVALID);
    }

    if (Number.isNaN(Date.parse(params.registration_date))) {
      throw new ClientError(ClientErrors.UPDATED_AT_IS_INVALID);
    }

    const record: PhraseRecord = {
      user_id: params.user_id,
      category_phrase: `${params.category}/${params.phrase}`,
      meaning: params.meaning,
      is_passed: params.is_passed ? 1 : 0,
      registration_date: params.registration_date,
      updated_at: params.updated_at,
    };

    const resultRecord = await registerPhrase(dbClient, record);

    if (!resultRecord) {
      throw new ClientError(ClientErrors.RECORD_NOT_FOUND);
    }

    const phrase = convertPhraseRecordToModel(resultRecord);

    return createResponseObject(phrase);
  } catch (error) {
    return createErrorResponseObject(error);
  }
}

/**
 * 語句を削除する
 * @returns
 */
export async function deletePhraseHandler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const dbClient = createDynamoDbDocumentClient(
      process.env.DYNAMODB_TABLE_REGION
    );

    const params = extractBody<DeletePhraseRequestBody>(event);

    const recordKey = {
      user_id: params.user_id,
      category_phrase: `${params.category}/${params.phrase}`,
    };

    await deletePhrase(dbClient, recordKey);

    return createResponseObject({});
  } catch (error) {
    return createErrorResponseObject(error);
  }
}
