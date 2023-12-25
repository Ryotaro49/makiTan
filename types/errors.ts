export const ClientErrors = {
  RECORD_NOT_FOUND: "RECORD_NOT_FOUND",
  USER_ID_IS_REQUIRED: "USER_ID_IS_REQUIRED",
  CATEGORY_IS_REQUIRED: "CATEGORY_IS_REQUIRED",
  REGISTRATION_DATE_IS_INVALID: "REGISTRATION_DATE_IS_INVALID",
  UPDATED_AT_IS_INVALID: "UPDATED_AT_IS_INVALID",
} as const;

// type ErrorType = "OBJECT_NOT_FOUND" | "SHARE_NOT_FOUND" | ...
export type ClientErrorType = (typeof ClientErrors)[keyof typeof ClientErrors];

// 全てのtypeを配列として取得
// const AllClientErrorType: ("OBJECT_NOT_FOUND" | "SHARE_NOT_FOUND" | ...)[]
export const AllClientErrorType = Object.values(ClientErrors);

export class ClientError extends Error {
  constructor(name: ClientErrorType) {
    super(name);

    // this.name = this.constructor.name; でも問題ないが
    // enumerable を false にしたほうがビルトインエラーに近づく
    Object.defineProperty(this, "name", {
      configurable: true,
      enumerable: false,
      value: this.constructor.name,
      writable: true,
    });

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ClientError);
    }
  }
}

export class ConflictError extends Error {
  constructor(...args: any[]) {
    super(...args);

    // this.name = this.constructor.name; でも問題ないが
    // enumerable を false にしたほうがビルトインエラーに近づく
    Object.defineProperty(this, "name", {
      configurable: true,
      enumerable: false,
      value: this.constructor.name,
      writable: true,
    });

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ClientError);
    }
  }
}

export class UnauthorizedError extends Error {
  constructor(...args: any[]) {
    super(...args);

    // this.name = this.constructor.name; でも問題ないが
    // enumerable を false にしたほうがビルトインエラーに近づく
    Object.defineProperty(this, "name", {
      configurable: true,
      enumerable: false,
      value: this.constructor.name,
      writable: true,
    });

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ClientError);
    }
  }
}

export class NotFoundError extends Error {
  constructor(...args: any[]) {
    super(...args);

    // this.name = this.constructor.name; でも問題ないが
    // enumerable を false にしたほうがビルトインエラーに近づく
    Object.defineProperty(this, "name", {
      configurable: true,
      enumerable: false,
      value: this.constructor.name,
      writable: true,
    });

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError);
    }
  }
}
