//#region Phrase

interface ListPhraseRequestParams {
  user_id: string;
  category: string;
  exclude_is_passed?: boolean;
  limit?: number;
}

interface ListPhraseResponseBody {}

// Register

type RegisterPhraseRequestBody = Phrase;

type RegisterPhraseResponseBody = Phrase;

// Delete

type DeletePhraseRequestBody = Pick<Phrase, "user_id" | "category" | "phrase">;

//#endregion
