
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Token
 * 
 */
export type Token = $Result.DefaultSelection<Prisma.$TokenPayload>
/**
 * Model TestSettings
 * 
 */
export type TestSettings = $Result.DefaultSelection<Prisma.$TestSettingsPayload>
/**
 * Model Test
 * 
 */
export type Test = $Result.DefaultSelection<Prisma.$TestPayload>
/**
 * Model Question
 * 
 */
export type Question = $Result.DefaultSelection<Prisma.$QuestionPayload>
/**
 * Model Answer
 * 
 */
export type Answer = $Result.DefaultSelection<Prisma.$AnswerPayload>
/**
 * Model TestAttempt
 * 
 */
export type TestAttempt = $Result.DefaultSelection<Prisma.$TestAttemptPayload>
/**
 * Model UserAnswer
 * 
 */
export type UserAnswer = $Result.DefaultSelection<Prisma.$UserAnswerPayload>
/**
 * Model TestSnapshot
 * 
 */
export type TestSnapshot = $Result.DefaultSelection<Prisma.$TestSnapshotPayload>
/**
 * Model QuestionSnapshot
 * 
 */
export type QuestionSnapshot = $Result.DefaultSelection<Prisma.$QuestionSnapshotPayload>
/**
 * Model AnswerSnapshot
 * 
 */
export type AnswerSnapshot = $Result.DefaultSelection<Prisma.$AnswerSnapshotPayload>
/**
 * Model TestSettingsSnapshot
 * 
 */
export type TestSettingsSnapshot = $Result.DefaultSelection<Prisma.$TestSettingsSnapshotPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


export const ModerationStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type ModerationStatus = (typeof ModerationStatus)[keyof typeof ModerationStatus]


export const TestAttemptStatus: {
  EXPIRED: 'EXPIRED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED'
};

export type TestAttemptStatus = (typeof TestAttemptStatus)[keyof typeof TestAttemptStatus]


export const QuestionType: {
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  TEXT_INPUT: 'TEXT_INPUT',
  MATCHING: 'MATCHING',
  FILL_IN_THE_BLANK: 'FILL_IN_THE_BLANK',
  SEQUENCE: 'SEQUENCE'
};

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType]


export const TestVisibilityStatus: {
  HIDDEN: 'HIDDEN',
  PUBLISHED: 'PUBLISHED'
};

export type TestVisibilityStatus = (typeof TestVisibilityStatus)[keyof typeof TestVisibilityStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type ModerationStatus = $Enums.ModerationStatus

export const ModerationStatus: typeof $Enums.ModerationStatus

export type TestAttemptStatus = $Enums.TestAttemptStatus

export const TestAttemptStatus: typeof $Enums.TestAttemptStatus

export type QuestionType = $Enums.QuestionType

export const QuestionType: typeof $Enums.QuestionType

export type TestVisibilityStatus = $Enums.TestVisibilityStatus

export const TestVisibilityStatus: typeof $Enums.TestVisibilityStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.token`: Exposes CRUD operations for the **Token** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tokens
    * const tokens = await prisma.token.findMany()
    * ```
    */
  get token(): Prisma.TokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.testSettings`: Exposes CRUD operations for the **TestSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TestSettings
    * const testSettings = await prisma.testSettings.findMany()
    * ```
    */
  get testSettings(): Prisma.TestSettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.test`: Exposes CRUD operations for the **Test** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tests
    * const tests = await prisma.test.findMany()
    * ```
    */
  get test(): Prisma.TestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.question`: Exposes CRUD operations for the **Question** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Questions
    * const questions = await prisma.question.findMany()
    * ```
    */
  get question(): Prisma.QuestionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.answer`: Exposes CRUD operations for the **Answer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Answers
    * const answers = await prisma.answer.findMany()
    * ```
    */
  get answer(): Prisma.AnswerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.testAttempt`: Exposes CRUD operations for the **TestAttempt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TestAttempts
    * const testAttempts = await prisma.testAttempt.findMany()
    * ```
    */
  get testAttempt(): Prisma.TestAttemptDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userAnswer`: Exposes CRUD operations for the **UserAnswer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserAnswers
    * const userAnswers = await prisma.userAnswer.findMany()
    * ```
    */
  get userAnswer(): Prisma.UserAnswerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.testSnapshot`: Exposes CRUD operations for the **TestSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TestSnapshots
    * const testSnapshots = await prisma.testSnapshot.findMany()
    * ```
    */
  get testSnapshot(): Prisma.TestSnapshotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.questionSnapshot`: Exposes CRUD operations for the **QuestionSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuestionSnapshots
    * const questionSnapshots = await prisma.questionSnapshot.findMany()
    * ```
    */
  get questionSnapshot(): Prisma.QuestionSnapshotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.answerSnapshot`: Exposes CRUD operations for the **AnswerSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AnswerSnapshots
    * const answerSnapshots = await prisma.answerSnapshot.findMany()
    * ```
    */
  get answerSnapshot(): Prisma.AnswerSnapshotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.testSettingsSnapshot`: Exposes CRUD operations for the **TestSettingsSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TestSettingsSnapshots
    * const testSettingsSnapshots = await prisma.testSettingsSnapshot.findMany()
    * ```
    */
  get testSettingsSnapshot(): Prisma.TestSettingsSnapshotDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Token: 'Token',
    TestSettings: 'TestSettings',
    Test: 'Test',
    Question: 'Question',
    Answer: 'Answer',
    TestAttempt: 'TestAttempt',
    UserAnswer: 'UserAnswer',
    TestSnapshot: 'TestSnapshot',
    QuestionSnapshot: 'QuestionSnapshot',
    AnswerSnapshot: 'AnswerSnapshot',
    TestSettingsSnapshot: 'TestSettingsSnapshot'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "token" | "testSettings" | "test" | "question" | "answer" | "testAttempt" | "userAnswer" | "testSnapshot" | "questionSnapshot" | "answerSnapshot" | "testSettingsSnapshot"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Token: {
        payload: Prisma.$TokenPayload<ExtArgs>
        fields: Prisma.TokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          findFirst: {
            args: Prisma.TokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          findMany: {
            args: Prisma.TokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          create: {
            args: Prisma.TokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          createMany: {
            args: Prisma.TokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          delete: {
            args: Prisma.TokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          update: {
            args: Prisma.TokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          deleteMany: {
            args: Prisma.TokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>[]
          }
          upsert: {
            args: Prisma.TokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TokenPayload>
          }
          aggregate: {
            args: Prisma.TokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateToken>
          }
          groupBy: {
            args: Prisma.TokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<TokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.TokenCountArgs<ExtArgs>
            result: $Utils.Optional<TokenCountAggregateOutputType> | number
          }
        }
      }
      TestSettings: {
        payload: Prisma.$TestSettingsPayload<ExtArgs>
        fields: Prisma.TestSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSettingsPayload>
          }
          findFirst: {
            args: Prisma.TestSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSettingsPayload>
          }
          findMany: {
            args: Prisma.TestSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSettingsPayload>[]
          }
          create: {
            args: Prisma.TestSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSettingsPayload>
          }
          createMany: {
            args: Prisma.TestSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TestSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSettingsPayload>[]
          }
          delete: {
            args: Prisma.TestSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSettingsPayload>
          }
          update: {
            args: Prisma.TestSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSettingsPayload>
          }
          deleteMany: {
            args: Prisma.TestSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TestSettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSettingsPayload>[]
          }
          upsert: {
            args: Prisma.TestSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSettingsPayload>
          }
          aggregate: {
            args: Prisma.TestSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTestSettings>
          }
          groupBy: {
            args: Prisma.TestSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<TestSettingsCountAggregateOutputType> | number
          }
        }
      }
      Test: {
        payload: Prisma.$TestPayload<ExtArgs>
        fields: Prisma.TestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>
          }
          findFirst: {
            args: Prisma.TestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>
          }
          findMany: {
            args: Prisma.TestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>[]
          }
          create: {
            args: Prisma.TestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>
          }
          createMany: {
            args: Prisma.TestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>[]
          }
          delete: {
            args: Prisma.TestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>
          }
          update: {
            args: Prisma.TestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>
          }
          deleteMany: {
            args: Prisma.TestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>[]
          }
          upsert: {
            args: Prisma.TestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestPayload>
          }
          aggregate: {
            args: Prisma.TestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTest>
          }
          groupBy: {
            args: Prisma.TestGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestCountArgs<ExtArgs>
            result: $Utils.Optional<TestCountAggregateOutputType> | number
          }
        }
      }
      Question: {
        payload: Prisma.$QuestionPayload<ExtArgs>
        fields: Prisma.QuestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          findFirst: {
            args: Prisma.QuestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          findMany: {
            args: Prisma.QuestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          create: {
            args: Prisma.QuestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          createMany: {
            args: Prisma.QuestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          delete: {
            args: Prisma.QuestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          update: {
            args: Prisma.QuestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          deleteMany: {
            args: Prisma.QuestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuestionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          upsert: {
            args: Prisma.QuestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          aggregate: {
            args: Prisma.QuestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestion>
          }
          groupBy: {
            args: Prisma.QuestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuestionCountArgs<ExtArgs>
            result: $Utils.Optional<QuestionCountAggregateOutputType> | number
          }
        }
      }
      Answer: {
        payload: Prisma.$AnswerPayload<ExtArgs>
        fields: Prisma.AnswerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnswerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnswerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>
          }
          findFirst: {
            args: Prisma.AnswerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnswerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>
          }
          findMany: {
            args: Prisma.AnswerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>[]
          }
          create: {
            args: Prisma.AnswerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>
          }
          createMany: {
            args: Prisma.AnswerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnswerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>[]
          }
          delete: {
            args: Prisma.AnswerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>
          }
          update: {
            args: Prisma.AnswerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>
          }
          deleteMany: {
            args: Prisma.AnswerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnswerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnswerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>[]
          }
          upsert: {
            args: Prisma.AnswerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerPayload>
          }
          aggregate: {
            args: Prisma.AnswerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnswer>
          }
          groupBy: {
            args: Prisma.AnswerGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnswerGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnswerCountArgs<ExtArgs>
            result: $Utils.Optional<AnswerCountAggregateOutputType> | number
          }
        }
      }
      TestAttempt: {
        payload: Prisma.$TestAttemptPayload<ExtArgs>
        fields: Prisma.TestAttemptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestAttemptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestAttemptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestAttemptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestAttemptPayload>
          }
          findFirst: {
            args: Prisma.TestAttemptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestAttemptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestAttemptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestAttemptPayload>
          }
          findMany: {
            args: Prisma.TestAttemptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestAttemptPayload>[]
          }
          create: {
            args: Prisma.TestAttemptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestAttemptPayload>
          }
          createMany: {
            args: Prisma.TestAttemptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TestAttemptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestAttemptPayload>[]
          }
          delete: {
            args: Prisma.TestAttemptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestAttemptPayload>
          }
          update: {
            args: Prisma.TestAttemptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestAttemptPayload>
          }
          deleteMany: {
            args: Prisma.TestAttemptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestAttemptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TestAttemptUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestAttemptPayload>[]
          }
          upsert: {
            args: Prisma.TestAttemptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestAttemptPayload>
          }
          aggregate: {
            args: Prisma.TestAttemptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTestAttempt>
          }
          groupBy: {
            args: Prisma.TestAttemptGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestAttemptGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestAttemptCountArgs<ExtArgs>
            result: $Utils.Optional<TestAttemptCountAggregateOutputType> | number
          }
        }
      }
      UserAnswer: {
        payload: Prisma.$UserAnswerPayload<ExtArgs>
        fields: Prisma.UserAnswerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserAnswerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserAnswerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>
          }
          findFirst: {
            args: Prisma.UserAnswerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserAnswerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>
          }
          findMany: {
            args: Prisma.UserAnswerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>[]
          }
          create: {
            args: Prisma.UserAnswerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>
          }
          createMany: {
            args: Prisma.UserAnswerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserAnswerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>[]
          }
          delete: {
            args: Prisma.UserAnswerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>
          }
          update: {
            args: Prisma.UserAnswerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>
          }
          deleteMany: {
            args: Prisma.UserAnswerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserAnswerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserAnswerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>[]
          }
          upsert: {
            args: Prisma.UserAnswerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserAnswerPayload>
          }
          aggregate: {
            args: Prisma.UserAnswerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserAnswer>
          }
          groupBy: {
            args: Prisma.UserAnswerGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserAnswerGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserAnswerCountArgs<ExtArgs>
            result: $Utils.Optional<UserAnswerCountAggregateOutputType> | number
          }
        }
      }
      TestSnapshot: {
        payload: Prisma.$TestSnapshotPayload<ExtArgs>
        fields: Prisma.TestSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSnapshotPayload>
          }
          findFirst: {
            args: Prisma.TestSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSnapshotPayload>
          }
          findMany: {
            args: Prisma.TestSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSnapshotPayload>[]
          }
          create: {
            args: Prisma.TestSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSnapshotPayload>
          }
          createMany: {
            args: Prisma.TestSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TestSnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSnapshotPayload>[]
          }
          delete: {
            args: Prisma.TestSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSnapshotPayload>
          }
          update: {
            args: Prisma.TestSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.TestSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TestSnapshotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSnapshotPayload>[]
          }
          upsert: {
            args: Prisma.TestSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSnapshotPayload>
          }
          aggregate: {
            args: Prisma.TestSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTestSnapshot>
          }
          groupBy: {
            args: Prisma.TestSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<TestSnapshotCountAggregateOutputType> | number
          }
        }
      }
      QuestionSnapshot: {
        payload: Prisma.$QuestionSnapshotPayload<ExtArgs>
        fields: Prisma.QuestionSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuestionSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuestionSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionSnapshotPayload>
          }
          findFirst: {
            args: Prisma.QuestionSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuestionSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionSnapshotPayload>
          }
          findMany: {
            args: Prisma.QuestionSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionSnapshotPayload>[]
          }
          create: {
            args: Prisma.QuestionSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionSnapshotPayload>
          }
          createMany: {
            args: Prisma.QuestionSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuestionSnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionSnapshotPayload>[]
          }
          delete: {
            args: Prisma.QuestionSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionSnapshotPayload>
          }
          update: {
            args: Prisma.QuestionSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.QuestionSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuestionSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuestionSnapshotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionSnapshotPayload>[]
          }
          upsert: {
            args: Prisma.QuestionSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionSnapshotPayload>
          }
          aggregate: {
            args: Prisma.QuestionSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestionSnapshot>
          }
          groupBy: {
            args: Prisma.QuestionSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuestionSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuestionSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<QuestionSnapshotCountAggregateOutputType> | number
          }
        }
      }
      AnswerSnapshot: {
        payload: Prisma.$AnswerSnapshotPayload<ExtArgs>
        fields: Prisma.AnswerSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnswerSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnswerSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerSnapshotPayload>
          }
          findFirst: {
            args: Prisma.AnswerSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnswerSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerSnapshotPayload>
          }
          findMany: {
            args: Prisma.AnswerSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerSnapshotPayload>[]
          }
          create: {
            args: Prisma.AnswerSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerSnapshotPayload>
          }
          createMany: {
            args: Prisma.AnswerSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnswerSnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerSnapshotPayload>[]
          }
          delete: {
            args: Prisma.AnswerSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerSnapshotPayload>
          }
          update: {
            args: Prisma.AnswerSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.AnswerSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnswerSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AnswerSnapshotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerSnapshotPayload>[]
          }
          upsert: {
            args: Prisma.AnswerSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnswerSnapshotPayload>
          }
          aggregate: {
            args: Prisma.AnswerSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnswerSnapshot>
          }
          groupBy: {
            args: Prisma.AnswerSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnswerSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnswerSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<AnswerSnapshotCountAggregateOutputType> | number
          }
        }
      }
      TestSettingsSnapshot: {
        payload: Prisma.$TestSettingsSnapshotPayload<ExtArgs>
        fields: Prisma.TestSettingsSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestSettingsSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSettingsSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestSettingsSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSettingsSnapshotPayload>
          }
          findFirst: {
            args: Prisma.TestSettingsSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSettingsSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestSettingsSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSettingsSnapshotPayload>
          }
          findMany: {
            args: Prisma.TestSettingsSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSettingsSnapshotPayload>[]
          }
          create: {
            args: Prisma.TestSettingsSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSettingsSnapshotPayload>
          }
          createMany: {
            args: Prisma.TestSettingsSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TestSettingsSnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSettingsSnapshotPayload>[]
          }
          delete: {
            args: Prisma.TestSettingsSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSettingsSnapshotPayload>
          }
          update: {
            args: Prisma.TestSettingsSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSettingsSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.TestSettingsSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestSettingsSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TestSettingsSnapshotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSettingsSnapshotPayload>[]
          }
          upsert: {
            args: Prisma.TestSettingsSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestSettingsSnapshotPayload>
          }
          aggregate: {
            args: Prisma.TestSettingsSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTestSettingsSnapshot>
          }
          groupBy: {
            args: Prisma.TestSettingsSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestSettingsSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestSettingsSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<TestSettingsSnapshotCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    token?: TokenOmit
    testSettings?: TestSettingsOmit
    test?: TestOmit
    question?: QuestionOmit
    answer?: AnswerOmit
    testAttempt?: TestAttemptOmit
    userAnswer?: UserAnswerOmit
    testSnapshot?: TestSnapshotOmit
    questionSnapshot?: QuestionSnapshotOmit
    answerSnapshot?: AnswerSnapshotOmit
    testSettingsSnapshot?: TestSettingsSnapshotOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    testAttempts: number
    testsCreated: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    testAttempts?: boolean | UserCountOutputTypeCountTestAttemptsArgs
    testsCreated?: boolean | UserCountOutputTypeCountTestsCreatedArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTestAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestAttemptWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTestsCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestWhereInput
  }


  /**
   * Count Type TestCountOutputType
   */

  export type TestCountOutputType = {
    questions: number
    testAttempts: number
    snapshots: number
  }

  export type TestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questions?: boolean | TestCountOutputTypeCountQuestionsArgs
    testAttempts?: boolean | TestCountOutputTypeCountTestAttemptsArgs
    snapshots?: boolean | TestCountOutputTypeCountSnapshotsArgs
  }

  // Custom InputTypes
  /**
   * TestCountOutputType without action
   */
  export type TestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestCountOutputType
     */
    select?: TestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TestCountOutputType without action
   */
  export type TestCountOutputTypeCountQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionWhereInput
  }

  /**
   * TestCountOutputType without action
   */
  export type TestCountOutputTypeCountTestAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestAttemptWhereInput
  }

  /**
   * TestCountOutputType without action
   */
  export type TestCountOutputTypeCountSnapshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestSnapshotWhereInput
  }


  /**
   * Count Type QuestionCountOutputType
   */

  export type QuestionCountOutputType = {
    answers: number
    userAnswers: number
  }

  export type QuestionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answers?: boolean | QuestionCountOutputTypeCountAnswersArgs
    userAnswers?: boolean | QuestionCountOutputTypeCountUserAnswersArgs
  }

  // Custom InputTypes
  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionCountOutputType
     */
    select?: QuestionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeCountAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnswerWhereInput
  }

  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeCountUserAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAnswerWhereInput
  }


  /**
   * Count Type AnswerCountOutputType
   */

  export type AnswerCountOutputType = {
    userAnswers: number
  }

  export type AnswerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userAnswers?: boolean | AnswerCountOutputTypeCountUserAnswersArgs
  }

  // Custom InputTypes
  /**
   * AnswerCountOutputType without action
   */
  export type AnswerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerCountOutputType
     */
    select?: AnswerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AnswerCountOutputType without action
   */
  export type AnswerCountOutputTypeCountUserAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAnswerWhereInput
  }


  /**
   * Count Type TestAttemptCountOutputType
   */

  export type TestAttemptCountOutputType = {
    answers: number
  }

  export type TestAttemptCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answers?: boolean | TestAttemptCountOutputTypeCountAnswersArgs
  }

  // Custom InputTypes
  /**
   * TestAttemptCountOutputType without action
   */
  export type TestAttemptCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestAttemptCountOutputType
     */
    select?: TestAttemptCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TestAttemptCountOutputType without action
   */
  export type TestAttemptCountOutputTypeCountAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAnswerWhereInput
  }


  /**
   * Count Type TestSnapshotCountOutputType
   */

  export type TestSnapshotCountOutputType = {
    questions: number
    attempts: number
  }

  export type TestSnapshotCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questions?: boolean | TestSnapshotCountOutputTypeCountQuestionsArgs
    attempts?: boolean | TestSnapshotCountOutputTypeCountAttemptsArgs
  }

  // Custom InputTypes
  /**
   * TestSnapshotCountOutputType without action
   */
  export type TestSnapshotCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSnapshotCountOutputType
     */
    select?: TestSnapshotCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TestSnapshotCountOutputType without action
   */
  export type TestSnapshotCountOutputTypeCountQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionSnapshotWhereInput
  }

  /**
   * TestSnapshotCountOutputType without action
   */
  export type TestSnapshotCountOutputTypeCountAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestAttemptWhereInput
  }


  /**
   * Count Type QuestionSnapshotCountOutputType
   */

  export type QuestionSnapshotCountOutputType = {
    answers: number
  }

  export type QuestionSnapshotCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answers?: boolean | QuestionSnapshotCountOutputTypeCountAnswersArgs
  }

  // Custom InputTypes
  /**
   * QuestionSnapshotCountOutputType without action
   */
  export type QuestionSnapshotCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionSnapshotCountOutputType
     */
    select?: QuestionSnapshotCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuestionSnapshotCountOutputType without action
   */
  export type QuestionSnapshotCountOutputTypeCountAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnswerSnapshotWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    surname: string | null
    patronymic: string | null
    password: string | null
    isActivated: boolean | null
    role: $Enums.Role | null
    activationLink: string | null
    resetCode: string | null
    isBlocked: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    activationLinkExp: Date | null
    resetCodeExp: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    surname: string | null
    patronymic: string | null
    password: string | null
    isActivated: boolean | null
    role: $Enums.Role | null
    activationLink: string | null
    resetCode: string | null
    isBlocked: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    activationLinkExp: Date | null
    resetCodeExp: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    surname: number
    patronymic: number
    password: number
    isActivated: number
    role: number
    activationLink: number
    resetCode: number
    isBlocked: number
    createdAt: number
    updatedAt: number
    activationLinkExp: number
    resetCodeExp: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    surname?: true
    patronymic?: true
    password?: true
    isActivated?: true
    role?: true
    activationLink?: true
    resetCode?: true
    isBlocked?: true
    createdAt?: true
    updatedAt?: true
    activationLinkExp?: true
    resetCodeExp?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    surname?: true
    patronymic?: true
    password?: true
    isActivated?: true
    role?: true
    activationLink?: true
    resetCode?: true
    isBlocked?: true
    createdAt?: true
    updatedAt?: true
    activationLinkExp?: true
    resetCodeExp?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    surname?: true
    patronymic?: true
    password?: true
    isActivated?: true
    role?: true
    activationLink?: true
    resetCode?: true
    isBlocked?: true
    createdAt?: true
    updatedAt?: true
    activationLinkExp?: true
    resetCodeExp?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    surname: string | null
    patronymic: string | null
    password: string
    isActivated: boolean
    role: $Enums.Role
    activationLink: string | null
    resetCode: string | null
    isBlocked: boolean
    createdAt: Date
    updatedAt: Date
    activationLinkExp: Date | null
    resetCodeExp: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    surname?: boolean
    patronymic?: boolean
    password?: boolean
    isActivated?: boolean
    role?: boolean
    activationLink?: boolean
    resetCode?: boolean
    isBlocked?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    activationLinkExp?: boolean
    resetCodeExp?: boolean
    testAttempts?: boolean | User$testAttemptsArgs<ExtArgs>
    testsCreated?: boolean | User$testsCreatedArgs<ExtArgs>
    refreshToken?: boolean | User$refreshTokenArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    surname?: boolean
    patronymic?: boolean
    password?: boolean
    isActivated?: boolean
    role?: boolean
    activationLink?: boolean
    resetCode?: boolean
    isBlocked?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    activationLinkExp?: boolean
    resetCodeExp?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    surname?: boolean
    patronymic?: boolean
    password?: boolean
    isActivated?: boolean
    role?: boolean
    activationLink?: boolean
    resetCode?: boolean
    isBlocked?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    activationLinkExp?: boolean
    resetCodeExp?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    surname?: boolean
    patronymic?: boolean
    password?: boolean
    isActivated?: boolean
    role?: boolean
    activationLink?: boolean
    resetCode?: boolean
    isBlocked?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    activationLinkExp?: boolean
    resetCodeExp?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "surname" | "patronymic" | "password" | "isActivated" | "role" | "activationLink" | "resetCode" | "isBlocked" | "createdAt" | "updatedAt" | "activationLinkExp" | "resetCodeExp", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    testAttempts?: boolean | User$testAttemptsArgs<ExtArgs>
    testsCreated?: boolean | User$testsCreatedArgs<ExtArgs>
    refreshToken?: boolean | User$refreshTokenArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      testAttempts: Prisma.$TestAttemptPayload<ExtArgs>[]
      testsCreated: Prisma.$TestPayload<ExtArgs>[]
      refreshToken: Prisma.$TokenPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      surname: string | null
      patronymic: string | null
      password: string
      isActivated: boolean
      role: $Enums.Role
      activationLink: string | null
      resetCode: string | null
      isBlocked: boolean
      createdAt: Date
      updatedAt: Date
      activationLinkExp: Date | null
      resetCodeExp: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    testAttempts<T extends User$testAttemptsArgs<ExtArgs> = {}>(args?: Subset<T, User$testAttemptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    testsCreated<T extends User$testsCreatedArgs<ExtArgs> = {}>(args?: Subset<T, User$testsCreatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    refreshToken<T extends User$refreshTokenArgs<ExtArgs> = {}>(args?: Subset<T, User$refreshTokenArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly surname: FieldRef<"User", 'String'>
    readonly patronymic: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly isActivated: FieldRef<"User", 'Boolean'>
    readonly role: FieldRef<"User", 'Role'>
    readonly activationLink: FieldRef<"User", 'String'>
    readonly resetCode: FieldRef<"User", 'String'>
    readonly isBlocked: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly activationLinkExp: FieldRef<"User", 'DateTime'>
    readonly resetCodeExp: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.testAttempts
   */
  export type User$testAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestAttempt
     */
    select?: TestAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestAttempt
     */
    omit?: TestAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestAttemptInclude<ExtArgs> | null
    where?: TestAttemptWhereInput
    orderBy?: TestAttemptOrderByWithRelationInput | TestAttemptOrderByWithRelationInput[]
    cursor?: TestAttemptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TestAttemptScalarFieldEnum | TestAttemptScalarFieldEnum[]
  }

  /**
   * User.testsCreated
   */
  export type User$testsCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    where?: TestWhereInput
    orderBy?: TestOrderByWithRelationInput | TestOrderByWithRelationInput[]
    cursor?: TestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TestScalarFieldEnum | TestScalarFieldEnum[]
  }

  /**
   * User.refreshToken
   */
  export type User$refreshTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    where?: TokenWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Token
   */

  export type AggregateToken = {
    _count: TokenCountAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  export type TokenMinAggregateOutputType = {
    id: string | null
    userId: string | null
    refreshToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TokenMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    refreshToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TokenCountAggregateOutputType = {
    id: number
    userId: number
    refreshToken: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TokenMinAggregateInputType = {
    id?: true
    userId?: true
    refreshToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TokenMaxAggregateInputType = {
    id?: true
    userId?: true
    refreshToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TokenCountAggregateInputType = {
    id?: true
    userId?: true
    refreshToken?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Token to aggregate.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tokens
    **/
    _count?: true | TokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokenMaxAggregateInputType
  }

  export type GetTokenAggregateType<T extends TokenAggregateArgs> = {
        [P in keyof T & keyof AggregateToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateToken[P]>
      : GetScalarType<T[P], AggregateToken[P]>
  }




  export type TokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TokenWhereInput
    orderBy?: TokenOrderByWithAggregationInput | TokenOrderByWithAggregationInput[]
    by: TokenScalarFieldEnum[] | TokenScalarFieldEnum
    having?: TokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokenCountAggregateInputType | true
    _min?: TokenMinAggregateInputType
    _max?: TokenMaxAggregateInputType
  }

  export type TokenGroupByOutputType = {
    id: string
    userId: string
    refreshToken: string
    createdAt: Date
    updatedAt: Date
    _count: TokenCountAggregateOutputType | null
    _min: TokenMinAggregateOutputType | null
    _max: TokenMaxAggregateOutputType | null
  }

  type GetTokenGroupByPayload<T extends TokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokenGroupByOutputType[P]>
            : GetScalarType<T[P], TokenGroupByOutputType[P]>
        }
      >
    >


  export type TokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    refreshToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["token"]>

  export type TokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    refreshToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["token"]>

  export type TokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    refreshToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["token"]>

  export type TokenSelectScalar = {
    id?: boolean
    userId?: boolean
    refreshToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "refreshToken" | "createdAt" | "updatedAt", ExtArgs["result"]["token"]>
  export type TokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Token"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      refreshToken: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["token"]>
    composites: {}
  }

  type TokenGetPayload<S extends boolean | null | undefined | TokenDefaultArgs> = $Result.GetResult<Prisma.$TokenPayload, S>

  type TokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TokenCountAggregateInputType | true
    }

  export interface TokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Token'], meta: { name: 'Token' } }
    /**
     * Find zero or one Token that matches the filter.
     * @param {TokenFindUniqueArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TokenFindUniqueArgs>(args: SelectSubset<T, TokenFindUniqueArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Token that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TokenFindUniqueOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TokenFindUniqueOrThrowArgs>(args: SelectSubset<T, TokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Token that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TokenFindFirstArgs>(args?: SelectSubset<T, TokenFindFirstArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Token that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindFirstOrThrowArgs} args - Arguments to find a Token
     * @example
     * // Get one Token
     * const token = await prisma.token.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TokenFindFirstOrThrowArgs>(args?: SelectSubset<T, TokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tokens
     * const tokens = await prisma.token.findMany()
     * 
     * // Get first 10 Tokens
     * const tokens = await prisma.token.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tokenWithIdOnly = await prisma.token.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TokenFindManyArgs>(args?: SelectSubset<T, TokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Token.
     * @param {TokenCreateArgs} args - Arguments to create a Token.
     * @example
     * // Create one Token
     * const Token = await prisma.token.create({
     *   data: {
     *     // ... data to create a Token
     *   }
     * })
     * 
     */
    create<T extends TokenCreateArgs>(args: SelectSubset<T, TokenCreateArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tokens.
     * @param {TokenCreateManyArgs} args - Arguments to create many Tokens.
     * @example
     * // Create many Tokens
     * const token = await prisma.token.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TokenCreateManyArgs>(args?: SelectSubset<T, TokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tokens and returns the data saved in the database.
     * @param {TokenCreateManyAndReturnArgs} args - Arguments to create many Tokens.
     * @example
     * // Create many Tokens
     * const token = await prisma.token.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tokens and only return the `id`
     * const tokenWithIdOnly = await prisma.token.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TokenCreateManyAndReturnArgs>(args?: SelectSubset<T, TokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Token.
     * @param {TokenDeleteArgs} args - Arguments to delete one Token.
     * @example
     * // Delete one Token
     * const Token = await prisma.token.delete({
     *   where: {
     *     // ... filter to delete one Token
     *   }
     * })
     * 
     */
    delete<T extends TokenDeleteArgs>(args: SelectSubset<T, TokenDeleteArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Token.
     * @param {TokenUpdateArgs} args - Arguments to update one Token.
     * @example
     * // Update one Token
     * const token = await prisma.token.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TokenUpdateArgs>(args: SelectSubset<T, TokenUpdateArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tokens.
     * @param {TokenDeleteManyArgs} args - Arguments to filter Tokens to delete.
     * @example
     * // Delete a few Tokens
     * const { count } = await prisma.token.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TokenDeleteManyArgs>(args?: SelectSubset<T, TokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tokens
     * const token = await prisma.token.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TokenUpdateManyArgs>(args: SelectSubset<T, TokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tokens and returns the data updated in the database.
     * @param {TokenUpdateManyAndReturnArgs} args - Arguments to update many Tokens.
     * @example
     * // Update many Tokens
     * const token = await prisma.token.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tokens and only return the `id`
     * const tokenWithIdOnly = await prisma.token.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TokenUpdateManyAndReturnArgs>(args: SelectSubset<T, TokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Token.
     * @param {TokenUpsertArgs} args - Arguments to update or create a Token.
     * @example
     * // Update or create a Token
     * const token = await prisma.token.upsert({
     *   create: {
     *     // ... data to create a Token
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Token we want to update
     *   }
     * })
     */
    upsert<T extends TokenUpsertArgs>(args: SelectSubset<T, TokenUpsertArgs<ExtArgs>>): Prisma__TokenClient<$Result.GetResult<Prisma.$TokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenCountArgs} args - Arguments to filter Tokens to count.
     * @example
     * // Count the number of Tokens
     * const count = await prisma.token.count({
     *   where: {
     *     // ... the filter for the Tokens we want to count
     *   }
     * })
    **/
    count<T extends TokenCountArgs>(
      args?: Subset<T, TokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TokenAggregateArgs>(args: Subset<T, TokenAggregateArgs>): Prisma.PrismaPromise<GetTokenAggregateType<T>>

    /**
     * Group by Token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokenGroupByArgs['orderBy'] }
        : { orderBy?: TokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Token model
   */
  readonly fields: TokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Token.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Token model
   */
  interface TokenFieldRefs {
    readonly id: FieldRef<"Token", 'String'>
    readonly userId: FieldRef<"Token", 'String'>
    readonly refreshToken: FieldRef<"Token", 'String'>
    readonly createdAt: FieldRef<"Token", 'DateTime'>
    readonly updatedAt: FieldRef<"Token", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Token findUnique
   */
  export type TokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token findUniqueOrThrow
   */
  export type TokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token findFirst
   */
  export type TokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     */
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token findFirstOrThrow
   */
  export type TokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Token to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tokens.
     */
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token findMany
   */
  export type TokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter, which Tokens to fetch.
     */
    where?: TokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tokens to fetch.
     */
    orderBy?: TokenOrderByWithRelationInput | TokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tokens.
     */
    cursor?: TokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tokens.
     */
    skip?: number
    distinct?: TokenScalarFieldEnum | TokenScalarFieldEnum[]
  }

  /**
   * Token create
   */
  export type TokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * The data needed to create a Token.
     */
    data: XOR<TokenCreateInput, TokenUncheckedCreateInput>
  }

  /**
   * Token createMany
   */
  export type TokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tokens.
     */
    data: TokenCreateManyInput | TokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Token createManyAndReturn
   */
  export type TokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * The data used to create many Tokens.
     */
    data: TokenCreateManyInput | TokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Token update
   */
  export type TokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * The data needed to update a Token.
     */
    data: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
    /**
     * Choose, which Token to update.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token updateMany
   */
  export type TokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tokens.
     */
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyInput>
    /**
     * Filter which Tokens to update
     */
    where?: TokenWhereInput
    /**
     * Limit how many Tokens to update.
     */
    limit?: number
  }

  /**
   * Token updateManyAndReturn
   */
  export type TokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * The data used to update Tokens.
     */
    data: XOR<TokenUpdateManyMutationInput, TokenUncheckedUpdateManyInput>
    /**
     * Filter which Tokens to update
     */
    where?: TokenWhereInput
    /**
     * Limit how many Tokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Token upsert
   */
  export type TokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * The filter to search for the Token to update in case it exists.
     */
    where: TokenWhereUniqueInput
    /**
     * In case the Token found by the `where` argument doesn't exist, create a new Token with this data.
     */
    create: XOR<TokenCreateInput, TokenUncheckedCreateInput>
    /**
     * In case the Token was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TokenUpdateInput, TokenUncheckedUpdateInput>
  }

  /**
   * Token delete
   */
  export type TokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
    /**
     * Filter which Token to delete.
     */
    where: TokenWhereUniqueInput
  }

  /**
   * Token deleteMany
   */
  export type TokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tokens to delete
     */
    where?: TokenWhereInput
    /**
     * Limit how many Tokens to delete.
     */
    limit?: number
  }

  /**
   * Token without action
   */
  export type TokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Token
     */
    select?: TokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Token
     */
    omit?: TokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TokenInclude<ExtArgs> | null
  }


  /**
   * Model TestSettings
   */

  export type AggregateTestSettings = {
    _count: TestSettingsCountAggregateOutputType | null
    _avg: TestSettingsAvgAggregateOutputType | null
    _sum: TestSettingsSumAggregateOutputType | null
    _min: TestSettingsMinAggregateOutputType | null
    _max: TestSettingsMaxAggregateOutputType | null
  }

  export type TestSettingsAvgAggregateOutputType = {
    timeLimit: number | null
  }

  export type TestSettingsSumAggregateOutputType = {
    timeLimit: number | null
  }

  export type TestSettingsMinAggregateOutputType = {
    id: string | null
    testId: string | null
    requireRegistration: boolean | null
    showDetailedResults: boolean | null
    timeLimit: number | null
    createdAt: Date | null
    updatedAt: Date | null
    shuffleAnswers: boolean | null
    shuffleQuestions: boolean | null
  }

  export type TestSettingsMaxAggregateOutputType = {
    id: string | null
    testId: string | null
    requireRegistration: boolean | null
    showDetailedResults: boolean | null
    timeLimit: number | null
    createdAt: Date | null
    updatedAt: Date | null
    shuffleAnswers: boolean | null
    shuffleQuestions: boolean | null
  }

  export type TestSettingsCountAggregateOutputType = {
    id: number
    testId: number
    requireRegistration: number
    inputFields: number
    showDetailedResults: number
    timeLimit: number
    createdAt: number
    updatedAt: number
    shuffleAnswers: number
    shuffleQuestions: number
    _all: number
  }


  export type TestSettingsAvgAggregateInputType = {
    timeLimit?: true
  }

  export type TestSettingsSumAggregateInputType = {
    timeLimit?: true
  }

  export type TestSettingsMinAggregateInputType = {
    id?: true
    testId?: true
    requireRegistration?: true
    showDetailedResults?: true
    timeLimit?: true
    createdAt?: true
    updatedAt?: true
    shuffleAnswers?: true
    shuffleQuestions?: true
  }

  export type TestSettingsMaxAggregateInputType = {
    id?: true
    testId?: true
    requireRegistration?: true
    showDetailedResults?: true
    timeLimit?: true
    createdAt?: true
    updatedAt?: true
    shuffleAnswers?: true
    shuffleQuestions?: true
  }

  export type TestSettingsCountAggregateInputType = {
    id?: true
    testId?: true
    requireRegistration?: true
    inputFields?: true
    showDetailedResults?: true
    timeLimit?: true
    createdAt?: true
    updatedAt?: true
    shuffleAnswers?: true
    shuffleQuestions?: true
    _all?: true
  }

  export type TestSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestSettings to aggregate.
     */
    where?: TestSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestSettings to fetch.
     */
    orderBy?: TestSettingsOrderByWithRelationInput | TestSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TestSettings
    **/
    _count?: true | TestSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TestSettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TestSettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestSettingsMaxAggregateInputType
  }

  export type GetTestSettingsAggregateType<T extends TestSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateTestSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTestSettings[P]>
      : GetScalarType<T[P], AggregateTestSettings[P]>
  }




  export type TestSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestSettingsWhereInput
    orderBy?: TestSettingsOrderByWithAggregationInput | TestSettingsOrderByWithAggregationInput[]
    by: TestSettingsScalarFieldEnum[] | TestSettingsScalarFieldEnum
    having?: TestSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestSettingsCountAggregateInputType | true
    _avg?: TestSettingsAvgAggregateInputType
    _sum?: TestSettingsSumAggregateInputType
    _min?: TestSettingsMinAggregateInputType
    _max?: TestSettingsMaxAggregateInputType
  }

  export type TestSettingsGroupByOutputType = {
    id: string
    testId: string
    requireRegistration: boolean
    inputFields: JsonValue | null
    showDetailedResults: boolean
    timeLimit: number | null
    createdAt: Date
    updatedAt: Date
    shuffleAnswers: boolean
    shuffleQuestions: boolean
    _count: TestSettingsCountAggregateOutputType | null
    _avg: TestSettingsAvgAggregateOutputType | null
    _sum: TestSettingsSumAggregateOutputType | null
    _min: TestSettingsMinAggregateOutputType | null
    _max: TestSettingsMaxAggregateOutputType | null
  }

  type GetTestSettingsGroupByPayload<T extends TestSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], TestSettingsGroupByOutputType[P]>
        }
      >
    >


  export type TestSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    testId?: boolean
    requireRegistration?: boolean
    inputFields?: boolean
    showDetailedResults?: boolean
    timeLimit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shuffleAnswers?: boolean
    shuffleQuestions?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testSettings"]>

  export type TestSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    testId?: boolean
    requireRegistration?: boolean
    inputFields?: boolean
    showDetailedResults?: boolean
    timeLimit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shuffleAnswers?: boolean
    shuffleQuestions?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testSettings"]>

  export type TestSettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    testId?: boolean
    requireRegistration?: boolean
    inputFields?: boolean
    showDetailedResults?: boolean
    timeLimit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shuffleAnswers?: boolean
    shuffleQuestions?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testSettings"]>

  export type TestSettingsSelectScalar = {
    id?: boolean
    testId?: boolean
    requireRegistration?: boolean
    inputFields?: boolean
    showDetailedResults?: boolean
    timeLimit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    shuffleAnswers?: boolean
    shuffleQuestions?: boolean
  }

  export type TestSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "testId" | "requireRegistration" | "inputFields" | "showDetailedResults" | "timeLimit" | "createdAt" | "updatedAt" | "shuffleAnswers" | "shuffleQuestions", ExtArgs["result"]["testSettings"]>
  export type TestSettingsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
  }
  export type TestSettingsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
  }
  export type TestSettingsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
  }

  export type $TestSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TestSettings"
    objects: {
      test: Prisma.$TestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      testId: string
      requireRegistration: boolean
      inputFields: Prisma.JsonValue | null
      showDetailedResults: boolean
      timeLimit: number | null
      createdAt: Date
      updatedAt: Date
      shuffleAnswers: boolean
      shuffleQuestions: boolean
    }, ExtArgs["result"]["testSettings"]>
    composites: {}
  }

  type TestSettingsGetPayload<S extends boolean | null | undefined | TestSettingsDefaultArgs> = $Result.GetResult<Prisma.$TestSettingsPayload, S>

  type TestSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestSettingsCountAggregateInputType | true
    }

  export interface TestSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TestSettings'], meta: { name: 'TestSettings' } }
    /**
     * Find zero or one TestSettings that matches the filter.
     * @param {TestSettingsFindUniqueArgs} args - Arguments to find a TestSettings
     * @example
     * // Get one TestSettings
     * const testSettings = await prisma.testSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestSettingsFindUniqueArgs>(args: SelectSubset<T, TestSettingsFindUniqueArgs<ExtArgs>>): Prisma__TestSettingsClient<$Result.GetResult<Prisma.$TestSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TestSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestSettingsFindUniqueOrThrowArgs} args - Arguments to find a TestSettings
     * @example
     * // Get one TestSettings
     * const testSettings = await prisma.testSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, TestSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestSettingsClient<$Result.GetResult<Prisma.$TestSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestSettingsFindFirstArgs} args - Arguments to find a TestSettings
     * @example
     * // Get one TestSettings
     * const testSettings = await prisma.testSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestSettingsFindFirstArgs>(args?: SelectSubset<T, TestSettingsFindFirstArgs<ExtArgs>>): Prisma__TestSettingsClient<$Result.GetResult<Prisma.$TestSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestSettingsFindFirstOrThrowArgs} args - Arguments to find a TestSettings
     * @example
     * // Get one TestSettings
     * const testSettings = await prisma.testSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, TestSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestSettingsClient<$Result.GetResult<Prisma.$TestSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TestSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TestSettings
     * const testSettings = await prisma.testSettings.findMany()
     * 
     * // Get first 10 TestSettings
     * const testSettings = await prisma.testSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testSettingsWithIdOnly = await prisma.testSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestSettingsFindManyArgs>(args?: SelectSubset<T, TestSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TestSettings.
     * @param {TestSettingsCreateArgs} args - Arguments to create a TestSettings.
     * @example
     * // Create one TestSettings
     * const TestSettings = await prisma.testSettings.create({
     *   data: {
     *     // ... data to create a TestSettings
     *   }
     * })
     * 
     */
    create<T extends TestSettingsCreateArgs>(args: SelectSubset<T, TestSettingsCreateArgs<ExtArgs>>): Prisma__TestSettingsClient<$Result.GetResult<Prisma.$TestSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TestSettings.
     * @param {TestSettingsCreateManyArgs} args - Arguments to create many TestSettings.
     * @example
     * // Create many TestSettings
     * const testSettings = await prisma.testSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestSettingsCreateManyArgs>(args?: SelectSubset<T, TestSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TestSettings and returns the data saved in the database.
     * @param {TestSettingsCreateManyAndReturnArgs} args - Arguments to create many TestSettings.
     * @example
     * // Create many TestSettings
     * const testSettings = await prisma.testSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TestSettings and only return the `id`
     * const testSettingsWithIdOnly = await prisma.testSettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TestSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, TestSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TestSettings.
     * @param {TestSettingsDeleteArgs} args - Arguments to delete one TestSettings.
     * @example
     * // Delete one TestSettings
     * const TestSettings = await prisma.testSettings.delete({
     *   where: {
     *     // ... filter to delete one TestSettings
     *   }
     * })
     * 
     */
    delete<T extends TestSettingsDeleteArgs>(args: SelectSubset<T, TestSettingsDeleteArgs<ExtArgs>>): Prisma__TestSettingsClient<$Result.GetResult<Prisma.$TestSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TestSettings.
     * @param {TestSettingsUpdateArgs} args - Arguments to update one TestSettings.
     * @example
     * // Update one TestSettings
     * const testSettings = await prisma.testSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestSettingsUpdateArgs>(args: SelectSubset<T, TestSettingsUpdateArgs<ExtArgs>>): Prisma__TestSettingsClient<$Result.GetResult<Prisma.$TestSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TestSettings.
     * @param {TestSettingsDeleteManyArgs} args - Arguments to filter TestSettings to delete.
     * @example
     * // Delete a few TestSettings
     * const { count } = await prisma.testSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestSettingsDeleteManyArgs>(args?: SelectSubset<T, TestSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TestSettings
     * const testSettings = await prisma.testSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestSettingsUpdateManyArgs>(args: SelectSubset<T, TestSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestSettings and returns the data updated in the database.
     * @param {TestSettingsUpdateManyAndReturnArgs} args - Arguments to update many TestSettings.
     * @example
     * // Update many TestSettings
     * const testSettings = await prisma.testSettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TestSettings and only return the `id`
     * const testSettingsWithIdOnly = await prisma.testSettings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TestSettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, TestSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TestSettings.
     * @param {TestSettingsUpsertArgs} args - Arguments to update or create a TestSettings.
     * @example
     * // Update or create a TestSettings
     * const testSettings = await prisma.testSettings.upsert({
     *   create: {
     *     // ... data to create a TestSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TestSettings we want to update
     *   }
     * })
     */
    upsert<T extends TestSettingsUpsertArgs>(args: SelectSubset<T, TestSettingsUpsertArgs<ExtArgs>>): Prisma__TestSettingsClient<$Result.GetResult<Prisma.$TestSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TestSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestSettingsCountArgs} args - Arguments to filter TestSettings to count.
     * @example
     * // Count the number of TestSettings
     * const count = await prisma.testSettings.count({
     *   where: {
     *     // ... the filter for the TestSettings we want to count
     *   }
     * })
    **/
    count<T extends TestSettingsCountArgs>(
      args?: Subset<T, TestSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TestSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TestSettingsAggregateArgs>(args: Subset<T, TestSettingsAggregateArgs>): Prisma.PrismaPromise<GetTestSettingsAggregateType<T>>

    /**
     * Group by TestSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TestSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestSettingsGroupByArgs['orderBy'] }
        : { orderBy?: TestSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TestSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TestSettings model
   */
  readonly fields: TestSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TestSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    test<T extends TestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TestDefaultArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TestSettings model
   */
  interface TestSettingsFieldRefs {
    readonly id: FieldRef<"TestSettings", 'String'>
    readonly testId: FieldRef<"TestSettings", 'String'>
    readonly requireRegistration: FieldRef<"TestSettings", 'Boolean'>
    readonly inputFields: FieldRef<"TestSettings", 'Json'>
    readonly showDetailedResults: FieldRef<"TestSettings", 'Boolean'>
    readonly timeLimit: FieldRef<"TestSettings", 'Int'>
    readonly createdAt: FieldRef<"TestSettings", 'DateTime'>
    readonly updatedAt: FieldRef<"TestSettings", 'DateTime'>
    readonly shuffleAnswers: FieldRef<"TestSettings", 'Boolean'>
    readonly shuffleQuestions: FieldRef<"TestSettings", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * TestSettings findUnique
   */
  export type TestSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSettings
     */
    select?: TestSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSettings
     */
    omit?: TestSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSettingsInclude<ExtArgs> | null
    /**
     * Filter, which TestSettings to fetch.
     */
    where: TestSettingsWhereUniqueInput
  }

  /**
   * TestSettings findUniqueOrThrow
   */
  export type TestSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSettings
     */
    select?: TestSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSettings
     */
    omit?: TestSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSettingsInclude<ExtArgs> | null
    /**
     * Filter, which TestSettings to fetch.
     */
    where: TestSettingsWhereUniqueInput
  }

  /**
   * TestSettings findFirst
   */
  export type TestSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSettings
     */
    select?: TestSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSettings
     */
    omit?: TestSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSettingsInclude<ExtArgs> | null
    /**
     * Filter, which TestSettings to fetch.
     */
    where?: TestSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestSettings to fetch.
     */
    orderBy?: TestSettingsOrderByWithRelationInput | TestSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestSettings.
     */
    cursor?: TestSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestSettings.
     */
    distinct?: TestSettingsScalarFieldEnum | TestSettingsScalarFieldEnum[]
  }

  /**
   * TestSettings findFirstOrThrow
   */
  export type TestSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSettings
     */
    select?: TestSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSettings
     */
    omit?: TestSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSettingsInclude<ExtArgs> | null
    /**
     * Filter, which TestSettings to fetch.
     */
    where?: TestSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestSettings to fetch.
     */
    orderBy?: TestSettingsOrderByWithRelationInput | TestSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestSettings.
     */
    cursor?: TestSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestSettings.
     */
    distinct?: TestSettingsScalarFieldEnum | TestSettingsScalarFieldEnum[]
  }

  /**
   * TestSettings findMany
   */
  export type TestSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSettings
     */
    select?: TestSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSettings
     */
    omit?: TestSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSettingsInclude<ExtArgs> | null
    /**
     * Filter, which TestSettings to fetch.
     */
    where?: TestSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestSettings to fetch.
     */
    orderBy?: TestSettingsOrderByWithRelationInput | TestSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TestSettings.
     */
    cursor?: TestSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestSettings.
     */
    skip?: number
    distinct?: TestSettingsScalarFieldEnum | TestSettingsScalarFieldEnum[]
  }

  /**
   * TestSettings create
   */
  export type TestSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSettings
     */
    select?: TestSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSettings
     */
    omit?: TestSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSettingsInclude<ExtArgs> | null
    /**
     * The data needed to create a TestSettings.
     */
    data: XOR<TestSettingsCreateInput, TestSettingsUncheckedCreateInput>
  }

  /**
   * TestSettings createMany
   */
  export type TestSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TestSettings.
     */
    data: TestSettingsCreateManyInput | TestSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TestSettings createManyAndReturn
   */
  export type TestSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSettings
     */
    select?: TestSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestSettings
     */
    omit?: TestSettingsOmit<ExtArgs> | null
    /**
     * The data used to create many TestSettings.
     */
    data: TestSettingsCreateManyInput | TestSettingsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSettingsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestSettings update
   */
  export type TestSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSettings
     */
    select?: TestSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSettings
     */
    omit?: TestSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSettingsInclude<ExtArgs> | null
    /**
     * The data needed to update a TestSettings.
     */
    data: XOR<TestSettingsUpdateInput, TestSettingsUncheckedUpdateInput>
    /**
     * Choose, which TestSettings to update.
     */
    where: TestSettingsWhereUniqueInput
  }

  /**
   * TestSettings updateMany
   */
  export type TestSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TestSettings.
     */
    data: XOR<TestSettingsUpdateManyMutationInput, TestSettingsUncheckedUpdateManyInput>
    /**
     * Filter which TestSettings to update
     */
    where?: TestSettingsWhereInput
    /**
     * Limit how many TestSettings to update.
     */
    limit?: number
  }

  /**
   * TestSettings updateManyAndReturn
   */
  export type TestSettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSettings
     */
    select?: TestSettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestSettings
     */
    omit?: TestSettingsOmit<ExtArgs> | null
    /**
     * The data used to update TestSettings.
     */
    data: XOR<TestSettingsUpdateManyMutationInput, TestSettingsUncheckedUpdateManyInput>
    /**
     * Filter which TestSettings to update
     */
    where?: TestSettingsWhereInput
    /**
     * Limit how many TestSettings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSettingsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestSettings upsert
   */
  export type TestSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSettings
     */
    select?: TestSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSettings
     */
    omit?: TestSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSettingsInclude<ExtArgs> | null
    /**
     * The filter to search for the TestSettings to update in case it exists.
     */
    where: TestSettingsWhereUniqueInput
    /**
     * In case the TestSettings found by the `where` argument doesn't exist, create a new TestSettings with this data.
     */
    create: XOR<TestSettingsCreateInput, TestSettingsUncheckedCreateInput>
    /**
     * In case the TestSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestSettingsUpdateInput, TestSettingsUncheckedUpdateInput>
  }

  /**
   * TestSettings delete
   */
  export type TestSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSettings
     */
    select?: TestSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSettings
     */
    omit?: TestSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSettingsInclude<ExtArgs> | null
    /**
     * Filter which TestSettings to delete.
     */
    where: TestSettingsWhereUniqueInput
  }

  /**
   * TestSettings deleteMany
   */
  export type TestSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestSettings to delete
     */
    where?: TestSettingsWhereInput
    /**
     * Limit how many TestSettings to delete.
     */
    limit?: number
  }

  /**
   * TestSettings without action
   */
  export type TestSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSettings
     */
    select?: TestSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSettings
     */
    omit?: TestSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSettingsInclude<ExtArgs> | null
  }


  /**
   * Model Test
   */

  export type AggregateTest = {
    _count: TestCountAggregateOutputType | null
    _avg: TestAvgAggregateOutputType | null
    _sum: TestSumAggregateOutputType | null
    _min: TestMinAggregateOutputType | null
    _max: TestMaxAggregateOutputType | null
  }

  export type TestAvgAggregateOutputType = {
    totalAttempts: number | null
    version: number | null
  }

  export type TestSumAggregateOutputType = {
    totalAttempts: number | null
    version: number | null
  }

  export type TestMinAggregateOutputType = {
    id: string | null
    authorId: string | null
    title: string | null
    description: string | null
    status: $Enums.ModerationStatus | null
    totalAttempts: number | null
    createdAt: Date | null
    updatedAt: Date | null
    version: number | null
    visibilityStatus: $Enums.TestVisibilityStatus | null
  }

  export type TestMaxAggregateOutputType = {
    id: string | null
    authorId: string | null
    title: string | null
    description: string | null
    status: $Enums.ModerationStatus | null
    totalAttempts: number | null
    createdAt: Date | null
    updatedAt: Date | null
    version: number | null
    visibilityStatus: $Enums.TestVisibilityStatus | null
  }

  export type TestCountAggregateOutputType = {
    id: number
    authorId: number
    title: number
    description: number
    status: number
    totalAttempts: number
    createdAt: number
    updatedAt: number
    version: number
    visibilityStatus: number
    _all: number
  }


  export type TestAvgAggregateInputType = {
    totalAttempts?: true
    version?: true
  }

  export type TestSumAggregateInputType = {
    totalAttempts?: true
    version?: true
  }

  export type TestMinAggregateInputType = {
    id?: true
    authorId?: true
    title?: true
    description?: true
    status?: true
    totalAttempts?: true
    createdAt?: true
    updatedAt?: true
    version?: true
    visibilityStatus?: true
  }

  export type TestMaxAggregateInputType = {
    id?: true
    authorId?: true
    title?: true
    description?: true
    status?: true
    totalAttempts?: true
    createdAt?: true
    updatedAt?: true
    version?: true
    visibilityStatus?: true
  }

  export type TestCountAggregateInputType = {
    id?: true
    authorId?: true
    title?: true
    description?: true
    status?: true
    totalAttempts?: true
    createdAt?: true
    updatedAt?: true
    version?: true
    visibilityStatus?: true
    _all?: true
  }

  export type TestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Test to aggregate.
     */
    where?: TestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tests to fetch.
     */
    orderBy?: TestOrderByWithRelationInput | TestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tests
    **/
    _count?: true | TestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestMaxAggregateInputType
  }

  export type GetTestAggregateType<T extends TestAggregateArgs> = {
        [P in keyof T & keyof AggregateTest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTest[P]>
      : GetScalarType<T[P], AggregateTest[P]>
  }




  export type TestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestWhereInput
    orderBy?: TestOrderByWithAggregationInput | TestOrderByWithAggregationInput[]
    by: TestScalarFieldEnum[] | TestScalarFieldEnum
    having?: TestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestCountAggregateInputType | true
    _avg?: TestAvgAggregateInputType
    _sum?: TestSumAggregateInputType
    _min?: TestMinAggregateInputType
    _max?: TestMaxAggregateInputType
  }

  export type TestGroupByOutputType = {
    id: string
    authorId: string
    title: string
    description: string | null
    status: $Enums.ModerationStatus
    totalAttempts: number
    createdAt: Date
    updatedAt: Date
    version: number
    visibilityStatus: $Enums.TestVisibilityStatus
    _count: TestCountAggregateOutputType | null
    _avg: TestAvgAggregateOutputType | null
    _sum: TestSumAggregateOutputType | null
    _min: TestMinAggregateOutputType | null
    _max: TestMaxAggregateOutputType | null
  }

  type GetTestGroupByPayload<T extends TestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestGroupByOutputType[P]>
            : GetScalarType<T[P], TestGroupByOutputType[P]>
        }
      >
    >


  export type TestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authorId?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    totalAttempts?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    version?: boolean
    visibilityStatus?: boolean
    questions?: boolean | Test$questionsArgs<ExtArgs>
    testAttempts?: boolean | Test$testAttemptsArgs<ExtArgs>
    settings?: boolean | Test$settingsArgs<ExtArgs>
    snapshots?: boolean | Test$snapshotsArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | TestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["test"]>

  export type TestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authorId?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    totalAttempts?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    version?: boolean
    visibilityStatus?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["test"]>

  export type TestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authorId?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    totalAttempts?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    version?: boolean
    visibilityStatus?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["test"]>

  export type TestSelectScalar = {
    id?: boolean
    authorId?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    totalAttempts?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    version?: boolean
    visibilityStatus?: boolean
  }

  export type TestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "authorId" | "title" | "description" | "status" | "totalAttempts" | "createdAt" | "updatedAt" | "version" | "visibilityStatus", ExtArgs["result"]["test"]>
  export type TestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questions?: boolean | Test$questionsArgs<ExtArgs>
    testAttempts?: boolean | Test$testAttemptsArgs<ExtArgs>
    settings?: boolean | Test$settingsArgs<ExtArgs>
    snapshots?: boolean | Test$snapshotsArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | TestCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Test"
    objects: {
      questions: Prisma.$QuestionPayload<ExtArgs>[]
      testAttempts: Prisma.$TestAttemptPayload<ExtArgs>[]
      settings: Prisma.$TestSettingsPayload<ExtArgs> | null
      snapshots: Prisma.$TestSnapshotPayload<ExtArgs>[]
      author: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      authorId: string
      title: string
      description: string | null
      status: $Enums.ModerationStatus
      totalAttempts: number
      createdAt: Date
      updatedAt: Date
      version: number
      visibilityStatus: $Enums.TestVisibilityStatus
    }, ExtArgs["result"]["test"]>
    composites: {}
  }

  type TestGetPayload<S extends boolean | null | undefined | TestDefaultArgs> = $Result.GetResult<Prisma.$TestPayload, S>

  type TestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestCountAggregateInputType | true
    }

  export interface TestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Test'], meta: { name: 'Test' } }
    /**
     * Find zero or one Test that matches the filter.
     * @param {TestFindUniqueArgs} args - Arguments to find a Test
     * @example
     * // Get one Test
     * const test = await prisma.test.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestFindUniqueArgs>(args: SelectSubset<T, TestFindUniqueArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Test that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestFindUniqueOrThrowArgs} args - Arguments to find a Test
     * @example
     * // Get one Test
     * const test = await prisma.test.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestFindUniqueOrThrowArgs>(args: SelectSubset<T, TestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Test that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestFindFirstArgs} args - Arguments to find a Test
     * @example
     * // Get one Test
     * const test = await prisma.test.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestFindFirstArgs>(args?: SelectSubset<T, TestFindFirstArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Test that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestFindFirstOrThrowArgs} args - Arguments to find a Test
     * @example
     * // Get one Test
     * const test = await prisma.test.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestFindFirstOrThrowArgs>(args?: SelectSubset<T, TestFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tests
     * const tests = await prisma.test.findMany()
     * 
     * // Get first 10 Tests
     * const tests = await prisma.test.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testWithIdOnly = await prisma.test.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestFindManyArgs>(args?: SelectSubset<T, TestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Test.
     * @param {TestCreateArgs} args - Arguments to create a Test.
     * @example
     * // Create one Test
     * const Test = await prisma.test.create({
     *   data: {
     *     // ... data to create a Test
     *   }
     * })
     * 
     */
    create<T extends TestCreateArgs>(args: SelectSubset<T, TestCreateArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tests.
     * @param {TestCreateManyArgs} args - Arguments to create many Tests.
     * @example
     * // Create many Tests
     * const test = await prisma.test.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestCreateManyArgs>(args?: SelectSubset<T, TestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tests and returns the data saved in the database.
     * @param {TestCreateManyAndReturnArgs} args - Arguments to create many Tests.
     * @example
     * // Create many Tests
     * const test = await prisma.test.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tests and only return the `id`
     * const testWithIdOnly = await prisma.test.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TestCreateManyAndReturnArgs>(args?: SelectSubset<T, TestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Test.
     * @param {TestDeleteArgs} args - Arguments to delete one Test.
     * @example
     * // Delete one Test
     * const Test = await prisma.test.delete({
     *   where: {
     *     // ... filter to delete one Test
     *   }
     * })
     * 
     */
    delete<T extends TestDeleteArgs>(args: SelectSubset<T, TestDeleteArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Test.
     * @param {TestUpdateArgs} args - Arguments to update one Test.
     * @example
     * // Update one Test
     * const test = await prisma.test.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestUpdateArgs>(args: SelectSubset<T, TestUpdateArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tests.
     * @param {TestDeleteManyArgs} args - Arguments to filter Tests to delete.
     * @example
     * // Delete a few Tests
     * const { count } = await prisma.test.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestDeleteManyArgs>(args?: SelectSubset<T, TestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tests
     * const test = await prisma.test.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestUpdateManyArgs>(args: SelectSubset<T, TestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tests and returns the data updated in the database.
     * @param {TestUpdateManyAndReturnArgs} args - Arguments to update many Tests.
     * @example
     * // Update many Tests
     * const test = await prisma.test.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tests and only return the `id`
     * const testWithIdOnly = await prisma.test.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TestUpdateManyAndReturnArgs>(args: SelectSubset<T, TestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Test.
     * @param {TestUpsertArgs} args - Arguments to update or create a Test.
     * @example
     * // Update or create a Test
     * const test = await prisma.test.upsert({
     *   create: {
     *     // ... data to create a Test
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Test we want to update
     *   }
     * })
     */
    upsert<T extends TestUpsertArgs>(args: SelectSubset<T, TestUpsertArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestCountArgs} args - Arguments to filter Tests to count.
     * @example
     * // Count the number of Tests
     * const count = await prisma.test.count({
     *   where: {
     *     // ... the filter for the Tests we want to count
     *   }
     * })
    **/
    count<T extends TestCountArgs>(
      args?: Subset<T, TestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Test.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TestAggregateArgs>(args: Subset<T, TestAggregateArgs>): Prisma.PrismaPromise<GetTestAggregateType<T>>

    /**
     * Group by Test.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestGroupByArgs['orderBy'] }
        : { orderBy?: TestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Test model
   */
  readonly fields: TestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Test.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    questions<T extends Test$questionsArgs<ExtArgs> = {}>(args?: Subset<T, Test$questionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    testAttempts<T extends Test$testAttemptsArgs<ExtArgs> = {}>(args?: Subset<T, Test$testAttemptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    settings<T extends Test$settingsArgs<ExtArgs> = {}>(args?: Subset<T, Test$settingsArgs<ExtArgs>>): Prisma__TestSettingsClient<$Result.GetResult<Prisma.$TestSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    snapshots<T extends Test$snapshotsArgs<ExtArgs> = {}>(args?: Subset<T, Test$snapshotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Test model
   */
  interface TestFieldRefs {
    readonly id: FieldRef<"Test", 'String'>
    readonly authorId: FieldRef<"Test", 'String'>
    readonly title: FieldRef<"Test", 'String'>
    readonly description: FieldRef<"Test", 'String'>
    readonly status: FieldRef<"Test", 'ModerationStatus'>
    readonly totalAttempts: FieldRef<"Test", 'Int'>
    readonly createdAt: FieldRef<"Test", 'DateTime'>
    readonly updatedAt: FieldRef<"Test", 'DateTime'>
    readonly version: FieldRef<"Test", 'Int'>
    readonly visibilityStatus: FieldRef<"Test", 'TestVisibilityStatus'>
  }
    

  // Custom InputTypes
  /**
   * Test findUnique
   */
  export type TestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * Filter, which Test to fetch.
     */
    where: TestWhereUniqueInput
  }

  /**
   * Test findUniqueOrThrow
   */
  export type TestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * Filter, which Test to fetch.
     */
    where: TestWhereUniqueInput
  }

  /**
   * Test findFirst
   */
  export type TestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * Filter, which Test to fetch.
     */
    where?: TestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tests to fetch.
     */
    orderBy?: TestOrderByWithRelationInput | TestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tests.
     */
    cursor?: TestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tests.
     */
    distinct?: TestScalarFieldEnum | TestScalarFieldEnum[]
  }

  /**
   * Test findFirstOrThrow
   */
  export type TestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * Filter, which Test to fetch.
     */
    where?: TestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tests to fetch.
     */
    orderBy?: TestOrderByWithRelationInput | TestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tests.
     */
    cursor?: TestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tests.
     */
    distinct?: TestScalarFieldEnum | TestScalarFieldEnum[]
  }

  /**
   * Test findMany
   */
  export type TestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * Filter, which Tests to fetch.
     */
    where?: TestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tests to fetch.
     */
    orderBy?: TestOrderByWithRelationInput | TestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tests.
     */
    cursor?: TestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tests.
     */
    skip?: number
    distinct?: TestScalarFieldEnum | TestScalarFieldEnum[]
  }

  /**
   * Test create
   */
  export type TestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * The data needed to create a Test.
     */
    data: XOR<TestCreateInput, TestUncheckedCreateInput>
  }

  /**
   * Test createMany
   */
  export type TestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tests.
     */
    data: TestCreateManyInput | TestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Test createManyAndReturn
   */
  export type TestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * The data used to create many Tests.
     */
    data: TestCreateManyInput | TestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Test update
   */
  export type TestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * The data needed to update a Test.
     */
    data: XOR<TestUpdateInput, TestUncheckedUpdateInput>
    /**
     * Choose, which Test to update.
     */
    where: TestWhereUniqueInput
  }

  /**
   * Test updateMany
   */
  export type TestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tests.
     */
    data: XOR<TestUpdateManyMutationInput, TestUncheckedUpdateManyInput>
    /**
     * Filter which Tests to update
     */
    where?: TestWhereInput
    /**
     * Limit how many Tests to update.
     */
    limit?: number
  }

  /**
   * Test updateManyAndReturn
   */
  export type TestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * The data used to update Tests.
     */
    data: XOR<TestUpdateManyMutationInput, TestUncheckedUpdateManyInput>
    /**
     * Filter which Tests to update
     */
    where?: TestWhereInput
    /**
     * Limit how many Tests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Test upsert
   */
  export type TestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * The filter to search for the Test to update in case it exists.
     */
    where: TestWhereUniqueInput
    /**
     * In case the Test found by the `where` argument doesn't exist, create a new Test with this data.
     */
    create: XOR<TestCreateInput, TestUncheckedCreateInput>
    /**
     * In case the Test was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestUpdateInput, TestUncheckedUpdateInput>
  }

  /**
   * Test delete
   */
  export type TestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
    /**
     * Filter which Test to delete.
     */
    where: TestWhereUniqueInput
  }

  /**
   * Test deleteMany
   */
  export type TestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tests to delete
     */
    where?: TestWhereInput
    /**
     * Limit how many Tests to delete.
     */
    limit?: number
  }

  /**
   * Test.questions
   */
  export type Test$questionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    where?: QuestionWhereInput
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    cursor?: QuestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Test.testAttempts
   */
  export type Test$testAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestAttempt
     */
    select?: TestAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestAttempt
     */
    omit?: TestAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestAttemptInclude<ExtArgs> | null
    where?: TestAttemptWhereInput
    orderBy?: TestAttemptOrderByWithRelationInput | TestAttemptOrderByWithRelationInput[]
    cursor?: TestAttemptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TestAttemptScalarFieldEnum | TestAttemptScalarFieldEnum[]
  }

  /**
   * Test.settings
   */
  export type Test$settingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSettings
     */
    select?: TestSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSettings
     */
    omit?: TestSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSettingsInclude<ExtArgs> | null
    where?: TestSettingsWhereInput
  }

  /**
   * Test.snapshots
   */
  export type Test$snapshotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSnapshot
     */
    select?: TestSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSnapshot
     */
    omit?: TestSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSnapshotInclude<ExtArgs> | null
    where?: TestSnapshotWhereInput
    orderBy?: TestSnapshotOrderByWithRelationInput | TestSnapshotOrderByWithRelationInput[]
    cursor?: TestSnapshotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TestSnapshotScalarFieldEnum | TestSnapshotScalarFieldEnum[]
  }

  /**
   * Test without action
   */
  export type TestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Test
     */
    select?: TestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Test
     */
    omit?: TestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestInclude<ExtArgs> | null
  }


  /**
   * Model Question
   */

  export type AggregateQuestion = {
    _count: QuestionCountAggregateOutputType | null
    _avg: QuestionAvgAggregateOutputType | null
    _sum: QuestionSumAggregateOutputType | null
    _min: QuestionMinAggregateOutputType | null
    _max: QuestionMaxAggregateOutputType | null
  }

  export type QuestionAvgAggregateOutputType = {
    order: number | null
  }

  export type QuestionSumAggregateOutputType = {
    order: number | null
  }

  export type QuestionMinAggregateOutputType = {
    id: string | null
    testId: string | null
    text: string | null
    order: number | null
    type: $Enums.QuestionType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QuestionMaxAggregateOutputType = {
    id: string | null
    testId: string | null
    text: string | null
    order: number | null
    type: $Enums.QuestionType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type QuestionCountAggregateOutputType = {
    id: number
    testId: number
    text: number
    order: number
    type: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type QuestionAvgAggregateInputType = {
    order?: true
  }

  export type QuestionSumAggregateInputType = {
    order?: true
  }

  export type QuestionMinAggregateInputType = {
    id?: true
    testId?: true
    text?: true
    order?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QuestionMaxAggregateInputType = {
    id?: true
    testId?: true
    text?: true
    order?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type QuestionCountAggregateInputType = {
    id?: true
    testId?: true
    text?: true
    order?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type QuestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Question to aggregate.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Questions
    **/
    _count?: true | QuestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuestionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuestionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuestionMaxAggregateInputType
  }

  export type GetQuestionAggregateType<T extends QuestionAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestion[P]>
      : GetScalarType<T[P], AggregateQuestion[P]>
  }




  export type QuestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionWhereInput
    orderBy?: QuestionOrderByWithAggregationInput | QuestionOrderByWithAggregationInput[]
    by: QuestionScalarFieldEnum[] | QuestionScalarFieldEnum
    having?: QuestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuestionCountAggregateInputType | true
    _avg?: QuestionAvgAggregateInputType
    _sum?: QuestionSumAggregateInputType
    _min?: QuestionMinAggregateInputType
    _max?: QuestionMaxAggregateInputType
  }

  export type QuestionGroupByOutputType = {
    id: string
    testId: string
    text: string
    order: number
    type: $Enums.QuestionType
    createdAt: Date
    updatedAt: Date
    _count: QuestionCountAggregateOutputType | null
    _avg: QuestionAvgAggregateOutputType | null
    _sum: QuestionSumAggregateOutputType | null
    _min: QuestionMinAggregateOutputType | null
    _max: QuestionMaxAggregateOutputType | null
  }

  type GetQuestionGroupByPayload<T extends QuestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuestionGroupByOutputType[P]>
            : GetScalarType<T[P], QuestionGroupByOutputType[P]>
        }
      >
    >


  export type QuestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    testId?: boolean
    text?: boolean
    order?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    answers?: boolean | Question$answersArgs<ExtArgs>
    test?: boolean | TestDefaultArgs<ExtArgs>
    userAnswers?: boolean | Question$userAnswersArgs<ExtArgs>
    _count?: boolean | QuestionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    testId?: boolean
    text?: boolean
    order?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    testId?: boolean
    text?: boolean
    order?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question"]>

  export type QuestionSelectScalar = {
    id?: boolean
    testId?: boolean
    text?: boolean
    order?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type QuestionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "testId" | "text" | "order" | "type" | "createdAt" | "updatedAt", ExtArgs["result"]["question"]>
  export type QuestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answers?: boolean | Question$answersArgs<ExtArgs>
    test?: boolean | TestDefaultArgs<ExtArgs>
    userAnswers?: boolean | Question$userAnswersArgs<ExtArgs>
    _count?: boolean | QuestionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QuestionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
  }
  export type QuestionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
  }

  export type $QuestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Question"
    objects: {
      answers: Prisma.$AnswerPayload<ExtArgs>[]
      test: Prisma.$TestPayload<ExtArgs>
      userAnswers: Prisma.$UserAnswerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      testId: string
      text: string
      order: number
      type: $Enums.QuestionType
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["question"]>
    composites: {}
  }

  type QuestionGetPayload<S extends boolean | null | undefined | QuestionDefaultArgs> = $Result.GetResult<Prisma.$QuestionPayload, S>

  type QuestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuestionCountAggregateInputType | true
    }

  export interface QuestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Question'], meta: { name: 'Question' } }
    /**
     * Find zero or one Question that matches the filter.
     * @param {QuestionFindUniqueArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuestionFindUniqueArgs>(args: SelectSubset<T, QuestionFindUniqueArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Question that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuestionFindUniqueOrThrowArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuestionFindUniqueOrThrowArgs>(args: SelectSubset<T, QuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Question that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindFirstArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuestionFindFirstArgs>(args?: SelectSubset<T, QuestionFindFirstArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Question that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindFirstOrThrowArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuestionFindFirstOrThrowArgs>(args?: SelectSubset<T, QuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Questions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Questions
     * const questions = await prisma.question.findMany()
     * 
     * // Get first 10 Questions
     * const questions = await prisma.question.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const questionWithIdOnly = await prisma.question.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuestionFindManyArgs>(args?: SelectSubset<T, QuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Question.
     * @param {QuestionCreateArgs} args - Arguments to create a Question.
     * @example
     * // Create one Question
     * const Question = await prisma.question.create({
     *   data: {
     *     // ... data to create a Question
     *   }
     * })
     * 
     */
    create<T extends QuestionCreateArgs>(args: SelectSubset<T, QuestionCreateArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Questions.
     * @param {QuestionCreateManyArgs} args - Arguments to create many Questions.
     * @example
     * // Create many Questions
     * const question = await prisma.question.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuestionCreateManyArgs>(args?: SelectSubset<T, QuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Questions and returns the data saved in the database.
     * @param {QuestionCreateManyAndReturnArgs} args - Arguments to create many Questions.
     * @example
     * // Create many Questions
     * const question = await prisma.question.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Questions and only return the `id`
     * const questionWithIdOnly = await prisma.question.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuestionCreateManyAndReturnArgs>(args?: SelectSubset<T, QuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Question.
     * @param {QuestionDeleteArgs} args - Arguments to delete one Question.
     * @example
     * // Delete one Question
     * const Question = await prisma.question.delete({
     *   where: {
     *     // ... filter to delete one Question
     *   }
     * })
     * 
     */
    delete<T extends QuestionDeleteArgs>(args: SelectSubset<T, QuestionDeleteArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Question.
     * @param {QuestionUpdateArgs} args - Arguments to update one Question.
     * @example
     * // Update one Question
     * const question = await prisma.question.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuestionUpdateArgs>(args: SelectSubset<T, QuestionUpdateArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Questions.
     * @param {QuestionDeleteManyArgs} args - Arguments to filter Questions to delete.
     * @example
     * // Delete a few Questions
     * const { count } = await prisma.question.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuestionDeleteManyArgs>(args?: SelectSubset<T, QuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Questions
     * const question = await prisma.question.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuestionUpdateManyArgs>(args: SelectSubset<T, QuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Questions and returns the data updated in the database.
     * @param {QuestionUpdateManyAndReturnArgs} args - Arguments to update many Questions.
     * @example
     * // Update many Questions
     * const question = await prisma.question.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Questions and only return the `id`
     * const questionWithIdOnly = await prisma.question.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QuestionUpdateManyAndReturnArgs>(args: SelectSubset<T, QuestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Question.
     * @param {QuestionUpsertArgs} args - Arguments to update or create a Question.
     * @example
     * // Update or create a Question
     * const question = await prisma.question.upsert({
     *   create: {
     *     // ... data to create a Question
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Question we want to update
     *   }
     * })
     */
    upsert<T extends QuestionUpsertArgs>(args: SelectSubset<T, QuestionUpsertArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionCountArgs} args - Arguments to filter Questions to count.
     * @example
     * // Count the number of Questions
     * const count = await prisma.question.count({
     *   where: {
     *     // ... the filter for the Questions we want to count
     *   }
     * })
    **/
    count<T extends QuestionCountArgs>(
      args?: Subset<T, QuestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuestionAggregateArgs>(args: Subset<T, QuestionAggregateArgs>): Prisma.PrismaPromise<GetQuestionAggregateType<T>>

    /**
     * Group by Question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuestionGroupByArgs['orderBy'] }
        : { orderBy?: QuestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Question model
   */
  readonly fields: QuestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Question.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    answers<T extends Question$answersArgs<ExtArgs> = {}>(args?: Subset<T, Question$answersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    test<T extends TestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TestDefaultArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    userAnswers<T extends Question$userAnswersArgs<ExtArgs> = {}>(args?: Subset<T, Question$userAnswersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Question model
   */
  interface QuestionFieldRefs {
    readonly id: FieldRef<"Question", 'String'>
    readonly testId: FieldRef<"Question", 'String'>
    readonly text: FieldRef<"Question", 'String'>
    readonly order: FieldRef<"Question", 'Int'>
    readonly type: FieldRef<"Question", 'QuestionType'>
    readonly createdAt: FieldRef<"Question", 'DateTime'>
    readonly updatedAt: FieldRef<"Question", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Question findUnique
   */
  export type QuestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question findUniqueOrThrow
   */
  export type QuestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question findFirst
   */
  export type QuestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question findFirstOrThrow
   */
  export type QuestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question findMany
   */
  export type QuestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Questions to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question create
   */
  export type QuestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The data needed to create a Question.
     */
    data: XOR<QuestionCreateInput, QuestionUncheckedCreateInput>
  }

  /**
   * Question createMany
   */
  export type QuestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Questions.
     */
    data: QuestionCreateManyInput | QuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Question createManyAndReturn
   */
  export type QuestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * The data used to create many Questions.
     */
    data: QuestionCreateManyInput | QuestionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Question update
   */
  export type QuestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The data needed to update a Question.
     */
    data: XOR<QuestionUpdateInput, QuestionUncheckedUpdateInput>
    /**
     * Choose, which Question to update.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question updateMany
   */
  export type QuestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Questions.
     */
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyInput>
    /**
     * Filter which Questions to update
     */
    where?: QuestionWhereInput
    /**
     * Limit how many Questions to update.
     */
    limit?: number
  }

  /**
   * Question updateManyAndReturn
   */
  export type QuestionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * The data used to update Questions.
     */
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyInput>
    /**
     * Filter which Questions to update
     */
    where?: QuestionWhereInput
    /**
     * Limit how many Questions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Question upsert
   */
  export type QuestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The filter to search for the Question to update in case it exists.
     */
    where: QuestionWhereUniqueInput
    /**
     * In case the Question found by the `where` argument doesn't exist, create a new Question with this data.
     */
    create: XOR<QuestionCreateInput, QuestionUncheckedCreateInput>
    /**
     * In case the Question was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuestionUpdateInput, QuestionUncheckedUpdateInput>
  }

  /**
   * Question delete
   */
  export type QuestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter which Question to delete.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question deleteMany
   */
  export type QuestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Questions to delete
     */
    where?: QuestionWhereInput
    /**
     * Limit how many Questions to delete.
     */
    limit?: number
  }

  /**
   * Question.answers
   */
  export type Question$answersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    where?: AnswerWhereInput
    orderBy?: AnswerOrderByWithRelationInput | AnswerOrderByWithRelationInput[]
    cursor?: AnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnswerScalarFieldEnum | AnswerScalarFieldEnum[]
  }

  /**
   * Question.userAnswers
   */
  export type Question$userAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    where?: UserAnswerWhereInput
    orderBy?: UserAnswerOrderByWithRelationInput | UserAnswerOrderByWithRelationInput[]
    cursor?: UserAnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserAnswerScalarFieldEnum | UserAnswerScalarFieldEnum[]
  }

  /**
   * Question without action
   */
  export type QuestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
  }


  /**
   * Model Answer
   */

  export type AggregateAnswer = {
    _count: AnswerCountAggregateOutputType | null
    _min: AnswerMinAggregateOutputType | null
    _max: AnswerMaxAggregateOutputType | null
  }

  export type AnswerMinAggregateOutputType = {
    id: string | null
    questionId: string | null
    text: string | null
    isCorrect: boolean | null
    isGenerated: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AnswerMaxAggregateOutputType = {
    id: string | null
    questionId: string | null
    text: string | null
    isCorrect: boolean | null
    isGenerated: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AnswerCountAggregateOutputType = {
    id: number
    questionId: number
    text: number
    isCorrect: number
    isGenerated: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AnswerMinAggregateInputType = {
    id?: true
    questionId?: true
    text?: true
    isCorrect?: true
    isGenerated?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AnswerMaxAggregateInputType = {
    id?: true
    questionId?: true
    text?: true
    isCorrect?: true
    isGenerated?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AnswerCountAggregateInputType = {
    id?: true
    questionId?: true
    text?: true
    isCorrect?: true
    isGenerated?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AnswerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Answer to aggregate.
     */
    where?: AnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Answers to fetch.
     */
    orderBy?: AnswerOrderByWithRelationInput | AnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Answers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Answers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Answers
    **/
    _count?: true | AnswerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnswerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnswerMaxAggregateInputType
  }

  export type GetAnswerAggregateType<T extends AnswerAggregateArgs> = {
        [P in keyof T & keyof AggregateAnswer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnswer[P]>
      : GetScalarType<T[P], AggregateAnswer[P]>
  }




  export type AnswerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnswerWhereInput
    orderBy?: AnswerOrderByWithAggregationInput | AnswerOrderByWithAggregationInput[]
    by: AnswerScalarFieldEnum[] | AnswerScalarFieldEnum
    having?: AnswerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnswerCountAggregateInputType | true
    _min?: AnswerMinAggregateInputType
    _max?: AnswerMaxAggregateInputType
  }

  export type AnswerGroupByOutputType = {
    id: string
    questionId: string
    text: string
    isCorrect: boolean
    isGenerated: boolean
    createdAt: Date
    updatedAt: Date
    _count: AnswerCountAggregateOutputType | null
    _min: AnswerMinAggregateOutputType | null
    _max: AnswerMaxAggregateOutputType | null
  }

  type GetAnswerGroupByPayload<T extends AnswerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnswerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnswerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnswerGroupByOutputType[P]>
            : GetScalarType<T[P], AnswerGroupByOutputType[P]>
        }
      >
    >


  export type AnswerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    questionId?: boolean
    text?: boolean
    isCorrect?: boolean
    isGenerated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    question?: boolean | QuestionDefaultArgs<ExtArgs>
    userAnswers?: boolean | Answer$userAnswersArgs<ExtArgs>
    _count?: boolean | AnswerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["answer"]>

  export type AnswerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    questionId?: boolean
    text?: boolean
    isCorrect?: boolean
    isGenerated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["answer"]>

  export type AnswerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    questionId?: boolean
    text?: boolean
    isCorrect?: boolean
    isGenerated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["answer"]>

  export type AnswerSelectScalar = {
    id?: boolean
    questionId?: boolean
    text?: boolean
    isCorrect?: boolean
    isGenerated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AnswerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "questionId" | "text" | "isCorrect" | "isGenerated" | "createdAt" | "updatedAt", ExtArgs["result"]["answer"]>
  export type AnswerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuestionDefaultArgs<ExtArgs>
    userAnswers?: boolean | Answer$userAnswersArgs<ExtArgs>
    _count?: boolean | AnswerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AnswerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }
  export type AnswerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }

  export type $AnswerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Answer"
    objects: {
      question: Prisma.$QuestionPayload<ExtArgs>
      userAnswers: Prisma.$UserAnswerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      questionId: string
      text: string
      isCorrect: boolean
      isGenerated: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["answer"]>
    composites: {}
  }

  type AnswerGetPayload<S extends boolean | null | undefined | AnswerDefaultArgs> = $Result.GetResult<Prisma.$AnswerPayload, S>

  type AnswerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnswerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnswerCountAggregateInputType | true
    }

  export interface AnswerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Answer'], meta: { name: 'Answer' } }
    /**
     * Find zero or one Answer that matches the filter.
     * @param {AnswerFindUniqueArgs} args - Arguments to find a Answer
     * @example
     * // Get one Answer
     * const answer = await prisma.answer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnswerFindUniqueArgs>(args: SelectSubset<T, AnswerFindUniqueArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Answer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnswerFindUniqueOrThrowArgs} args - Arguments to find a Answer
     * @example
     * // Get one Answer
     * const answer = await prisma.answer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnswerFindUniqueOrThrowArgs>(args: SelectSubset<T, AnswerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Answer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerFindFirstArgs} args - Arguments to find a Answer
     * @example
     * // Get one Answer
     * const answer = await prisma.answer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnswerFindFirstArgs>(args?: SelectSubset<T, AnswerFindFirstArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Answer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerFindFirstOrThrowArgs} args - Arguments to find a Answer
     * @example
     * // Get one Answer
     * const answer = await prisma.answer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnswerFindFirstOrThrowArgs>(args?: SelectSubset<T, AnswerFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Answers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Answers
     * const answers = await prisma.answer.findMany()
     * 
     * // Get first 10 Answers
     * const answers = await prisma.answer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const answerWithIdOnly = await prisma.answer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnswerFindManyArgs>(args?: SelectSubset<T, AnswerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Answer.
     * @param {AnswerCreateArgs} args - Arguments to create a Answer.
     * @example
     * // Create one Answer
     * const Answer = await prisma.answer.create({
     *   data: {
     *     // ... data to create a Answer
     *   }
     * })
     * 
     */
    create<T extends AnswerCreateArgs>(args: SelectSubset<T, AnswerCreateArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Answers.
     * @param {AnswerCreateManyArgs} args - Arguments to create many Answers.
     * @example
     * // Create many Answers
     * const answer = await prisma.answer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnswerCreateManyArgs>(args?: SelectSubset<T, AnswerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Answers and returns the data saved in the database.
     * @param {AnswerCreateManyAndReturnArgs} args - Arguments to create many Answers.
     * @example
     * // Create many Answers
     * const answer = await prisma.answer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Answers and only return the `id`
     * const answerWithIdOnly = await prisma.answer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnswerCreateManyAndReturnArgs>(args?: SelectSubset<T, AnswerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Answer.
     * @param {AnswerDeleteArgs} args - Arguments to delete one Answer.
     * @example
     * // Delete one Answer
     * const Answer = await prisma.answer.delete({
     *   where: {
     *     // ... filter to delete one Answer
     *   }
     * })
     * 
     */
    delete<T extends AnswerDeleteArgs>(args: SelectSubset<T, AnswerDeleteArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Answer.
     * @param {AnswerUpdateArgs} args - Arguments to update one Answer.
     * @example
     * // Update one Answer
     * const answer = await prisma.answer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnswerUpdateArgs>(args: SelectSubset<T, AnswerUpdateArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Answers.
     * @param {AnswerDeleteManyArgs} args - Arguments to filter Answers to delete.
     * @example
     * // Delete a few Answers
     * const { count } = await prisma.answer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnswerDeleteManyArgs>(args?: SelectSubset<T, AnswerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Answers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Answers
     * const answer = await prisma.answer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnswerUpdateManyArgs>(args: SelectSubset<T, AnswerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Answers and returns the data updated in the database.
     * @param {AnswerUpdateManyAndReturnArgs} args - Arguments to update many Answers.
     * @example
     * // Update many Answers
     * const answer = await prisma.answer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Answers and only return the `id`
     * const answerWithIdOnly = await prisma.answer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnswerUpdateManyAndReturnArgs>(args: SelectSubset<T, AnswerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Answer.
     * @param {AnswerUpsertArgs} args - Arguments to update or create a Answer.
     * @example
     * // Update or create a Answer
     * const answer = await prisma.answer.upsert({
     *   create: {
     *     // ... data to create a Answer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Answer we want to update
     *   }
     * })
     */
    upsert<T extends AnswerUpsertArgs>(args: SelectSubset<T, AnswerUpsertArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Answers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerCountArgs} args - Arguments to filter Answers to count.
     * @example
     * // Count the number of Answers
     * const count = await prisma.answer.count({
     *   where: {
     *     // ... the filter for the Answers we want to count
     *   }
     * })
    **/
    count<T extends AnswerCountArgs>(
      args?: Subset<T, AnswerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnswerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Answer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnswerAggregateArgs>(args: Subset<T, AnswerAggregateArgs>): Prisma.PrismaPromise<GetAnswerAggregateType<T>>

    /**
     * Group by Answer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnswerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnswerGroupByArgs['orderBy'] }
        : { orderBy?: AnswerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnswerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnswerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Answer model
   */
  readonly fields: AnswerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Answer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnswerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    question<T extends QuestionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuestionDefaultArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    userAnswers<T extends Answer$userAnswersArgs<ExtArgs> = {}>(args?: Subset<T, Answer$userAnswersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Answer model
   */
  interface AnswerFieldRefs {
    readonly id: FieldRef<"Answer", 'String'>
    readonly questionId: FieldRef<"Answer", 'String'>
    readonly text: FieldRef<"Answer", 'String'>
    readonly isCorrect: FieldRef<"Answer", 'Boolean'>
    readonly isGenerated: FieldRef<"Answer", 'Boolean'>
    readonly createdAt: FieldRef<"Answer", 'DateTime'>
    readonly updatedAt: FieldRef<"Answer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Answer findUnique
   */
  export type AnswerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Filter, which Answer to fetch.
     */
    where: AnswerWhereUniqueInput
  }

  /**
   * Answer findUniqueOrThrow
   */
  export type AnswerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Filter, which Answer to fetch.
     */
    where: AnswerWhereUniqueInput
  }

  /**
   * Answer findFirst
   */
  export type AnswerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Filter, which Answer to fetch.
     */
    where?: AnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Answers to fetch.
     */
    orderBy?: AnswerOrderByWithRelationInput | AnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Answers.
     */
    cursor?: AnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Answers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Answers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Answers.
     */
    distinct?: AnswerScalarFieldEnum | AnswerScalarFieldEnum[]
  }

  /**
   * Answer findFirstOrThrow
   */
  export type AnswerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Filter, which Answer to fetch.
     */
    where?: AnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Answers to fetch.
     */
    orderBy?: AnswerOrderByWithRelationInput | AnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Answers.
     */
    cursor?: AnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Answers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Answers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Answers.
     */
    distinct?: AnswerScalarFieldEnum | AnswerScalarFieldEnum[]
  }

  /**
   * Answer findMany
   */
  export type AnswerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Filter, which Answers to fetch.
     */
    where?: AnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Answers to fetch.
     */
    orderBy?: AnswerOrderByWithRelationInput | AnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Answers.
     */
    cursor?: AnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Answers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Answers.
     */
    skip?: number
    distinct?: AnswerScalarFieldEnum | AnswerScalarFieldEnum[]
  }

  /**
   * Answer create
   */
  export type AnswerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * The data needed to create a Answer.
     */
    data: XOR<AnswerCreateInput, AnswerUncheckedCreateInput>
  }

  /**
   * Answer createMany
   */
  export type AnswerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Answers.
     */
    data: AnswerCreateManyInput | AnswerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Answer createManyAndReturn
   */
  export type AnswerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * The data used to create many Answers.
     */
    data: AnswerCreateManyInput | AnswerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Answer update
   */
  export type AnswerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * The data needed to update a Answer.
     */
    data: XOR<AnswerUpdateInput, AnswerUncheckedUpdateInput>
    /**
     * Choose, which Answer to update.
     */
    where: AnswerWhereUniqueInput
  }

  /**
   * Answer updateMany
   */
  export type AnswerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Answers.
     */
    data: XOR<AnswerUpdateManyMutationInput, AnswerUncheckedUpdateManyInput>
    /**
     * Filter which Answers to update
     */
    where?: AnswerWhereInput
    /**
     * Limit how many Answers to update.
     */
    limit?: number
  }

  /**
   * Answer updateManyAndReturn
   */
  export type AnswerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * The data used to update Answers.
     */
    data: XOR<AnswerUpdateManyMutationInput, AnswerUncheckedUpdateManyInput>
    /**
     * Filter which Answers to update
     */
    where?: AnswerWhereInput
    /**
     * Limit how many Answers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Answer upsert
   */
  export type AnswerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * The filter to search for the Answer to update in case it exists.
     */
    where: AnswerWhereUniqueInput
    /**
     * In case the Answer found by the `where` argument doesn't exist, create a new Answer with this data.
     */
    create: XOR<AnswerCreateInput, AnswerUncheckedCreateInput>
    /**
     * In case the Answer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnswerUpdateInput, AnswerUncheckedUpdateInput>
  }

  /**
   * Answer delete
   */
  export type AnswerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
    /**
     * Filter which Answer to delete.
     */
    where: AnswerWhereUniqueInput
  }

  /**
   * Answer deleteMany
   */
  export type AnswerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Answers to delete
     */
    where?: AnswerWhereInput
    /**
     * Limit how many Answers to delete.
     */
    limit?: number
  }

  /**
   * Answer.userAnswers
   */
  export type Answer$userAnswersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    where?: UserAnswerWhereInput
    orderBy?: UserAnswerOrderByWithRelationInput | UserAnswerOrderByWithRelationInput[]
    cursor?: UserAnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserAnswerScalarFieldEnum | UserAnswerScalarFieldEnum[]
  }

  /**
   * Answer without action
   */
  export type AnswerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Answer
     */
    select?: AnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Answer
     */
    omit?: AnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerInclude<ExtArgs> | null
  }


  /**
   * Model TestAttempt
   */

  export type AggregateTestAttempt = {
    _count: TestAttemptCountAggregateOutputType | null
    _avg: TestAttemptAvgAggregateOutputType | null
    _sum: TestAttemptSumAggregateOutputType | null
    _min: TestAttemptMinAggregateOutputType | null
    _max: TestAttemptMaxAggregateOutputType | null
  }

  export type TestAttemptAvgAggregateOutputType = {
    score: number | null
  }

  export type TestAttemptSumAggregateOutputType = {
    score: number | null
  }

  export type TestAttemptMinAggregateOutputType = {
    id: string | null
    testId: string | null
    userId: string | null
    score: number | null
    startedAt: Date | null
    completedAt: Date | null
    status: $Enums.TestAttemptStatus | null
    updatedAt: Date | null
    testSnapshotId: string | null
    expirationTime: Date | null
  }

  export type TestAttemptMaxAggregateOutputType = {
    id: string | null
    testId: string | null
    userId: string | null
    score: number | null
    startedAt: Date | null
    completedAt: Date | null
    status: $Enums.TestAttemptStatus | null
    updatedAt: Date | null
    testSnapshotId: string | null
    expirationTime: Date | null
  }

  export type TestAttemptCountAggregateOutputType = {
    id: number
    testId: number
    userId: number
    preTestUserData: number
    score: number
    startedAt: number
    completedAt: number
    status: number
    updatedAt: number
    testSnapshotId: number
    expirationTime: number
    _all: number
  }


  export type TestAttemptAvgAggregateInputType = {
    score?: true
  }

  export type TestAttemptSumAggregateInputType = {
    score?: true
  }

  export type TestAttemptMinAggregateInputType = {
    id?: true
    testId?: true
    userId?: true
    score?: true
    startedAt?: true
    completedAt?: true
    status?: true
    updatedAt?: true
    testSnapshotId?: true
    expirationTime?: true
  }

  export type TestAttemptMaxAggregateInputType = {
    id?: true
    testId?: true
    userId?: true
    score?: true
    startedAt?: true
    completedAt?: true
    status?: true
    updatedAt?: true
    testSnapshotId?: true
    expirationTime?: true
  }

  export type TestAttemptCountAggregateInputType = {
    id?: true
    testId?: true
    userId?: true
    preTestUserData?: true
    score?: true
    startedAt?: true
    completedAt?: true
    status?: true
    updatedAt?: true
    testSnapshotId?: true
    expirationTime?: true
    _all?: true
  }

  export type TestAttemptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestAttempt to aggregate.
     */
    where?: TestAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestAttempts to fetch.
     */
    orderBy?: TestAttemptOrderByWithRelationInput | TestAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TestAttempts
    **/
    _count?: true | TestAttemptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TestAttemptAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TestAttemptSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestAttemptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestAttemptMaxAggregateInputType
  }

  export type GetTestAttemptAggregateType<T extends TestAttemptAggregateArgs> = {
        [P in keyof T & keyof AggregateTestAttempt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTestAttempt[P]>
      : GetScalarType<T[P], AggregateTestAttempt[P]>
  }




  export type TestAttemptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestAttemptWhereInput
    orderBy?: TestAttemptOrderByWithAggregationInput | TestAttemptOrderByWithAggregationInput[]
    by: TestAttemptScalarFieldEnum[] | TestAttemptScalarFieldEnum
    having?: TestAttemptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestAttemptCountAggregateInputType | true
    _avg?: TestAttemptAvgAggregateInputType
    _sum?: TestAttemptSumAggregateInputType
    _min?: TestAttemptMinAggregateInputType
    _max?: TestAttemptMaxAggregateInputType
  }

  export type TestAttemptGroupByOutputType = {
    id: string
    testId: string
    userId: string | null
    preTestUserData: JsonValue | null
    score: number | null
    startedAt: Date
    completedAt: Date | null
    status: $Enums.TestAttemptStatus
    updatedAt: Date
    testSnapshotId: string | null
    expirationTime: Date | null
    _count: TestAttemptCountAggregateOutputType | null
    _avg: TestAttemptAvgAggregateOutputType | null
    _sum: TestAttemptSumAggregateOutputType | null
    _min: TestAttemptMinAggregateOutputType | null
    _max: TestAttemptMaxAggregateOutputType | null
  }

  type GetTestAttemptGroupByPayload<T extends TestAttemptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestAttemptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestAttemptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestAttemptGroupByOutputType[P]>
            : GetScalarType<T[P], TestAttemptGroupByOutputType[P]>
        }
      >
    >


  export type TestAttemptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    testId?: boolean
    userId?: boolean
    preTestUserData?: boolean
    score?: boolean
    startedAt?: boolean
    completedAt?: boolean
    status?: boolean
    updatedAt?: boolean
    testSnapshotId?: boolean
    expirationTime?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
    snapshot?: boolean | TestAttempt$snapshotArgs<ExtArgs>
    user?: boolean | TestAttempt$userArgs<ExtArgs>
    answers?: boolean | TestAttempt$answersArgs<ExtArgs>
    _count?: boolean | TestAttemptCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testAttempt"]>

  export type TestAttemptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    testId?: boolean
    userId?: boolean
    preTestUserData?: boolean
    score?: boolean
    startedAt?: boolean
    completedAt?: boolean
    status?: boolean
    updatedAt?: boolean
    testSnapshotId?: boolean
    expirationTime?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
    snapshot?: boolean | TestAttempt$snapshotArgs<ExtArgs>
    user?: boolean | TestAttempt$userArgs<ExtArgs>
  }, ExtArgs["result"]["testAttempt"]>

  export type TestAttemptSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    testId?: boolean
    userId?: boolean
    preTestUserData?: boolean
    score?: boolean
    startedAt?: boolean
    completedAt?: boolean
    status?: boolean
    updatedAt?: boolean
    testSnapshotId?: boolean
    expirationTime?: boolean
    test?: boolean | TestDefaultArgs<ExtArgs>
    snapshot?: boolean | TestAttempt$snapshotArgs<ExtArgs>
    user?: boolean | TestAttempt$userArgs<ExtArgs>
  }, ExtArgs["result"]["testAttempt"]>

  export type TestAttemptSelectScalar = {
    id?: boolean
    testId?: boolean
    userId?: boolean
    preTestUserData?: boolean
    score?: boolean
    startedAt?: boolean
    completedAt?: boolean
    status?: boolean
    updatedAt?: boolean
    testSnapshotId?: boolean
    expirationTime?: boolean
  }

  export type TestAttemptOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "testId" | "userId" | "preTestUserData" | "score" | "startedAt" | "completedAt" | "status" | "updatedAt" | "testSnapshotId" | "expirationTime", ExtArgs["result"]["testAttempt"]>
  export type TestAttemptInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
    snapshot?: boolean | TestAttempt$snapshotArgs<ExtArgs>
    user?: boolean | TestAttempt$userArgs<ExtArgs>
    answers?: boolean | TestAttempt$answersArgs<ExtArgs>
    _count?: boolean | TestAttemptCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TestAttemptIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
    snapshot?: boolean | TestAttempt$snapshotArgs<ExtArgs>
    user?: boolean | TestAttempt$userArgs<ExtArgs>
  }
  export type TestAttemptIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    test?: boolean | TestDefaultArgs<ExtArgs>
    snapshot?: boolean | TestAttempt$snapshotArgs<ExtArgs>
    user?: boolean | TestAttempt$userArgs<ExtArgs>
  }

  export type $TestAttemptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TestAttempt"
    objects: {
      test: Prisma.$TestPayload<ExtArgs>
      snapshot: Prisma.$TestSnapshotPayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs> | null
      answers: Prisma.$UserAnswerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      testId: string
      userId: string | null
      preTestUserData: Prisma.JsonValue | null
      score: number | null
      startedAt: Date
      completedAt: Date | null
      status: $Enums.TestAttemptStatus
      updatedAt: Date
      testSnapshotId: string | null
      expirationTime: Date | null
    }, ExtArgs["result"]["testAttempt"]>
    composites: {}
  }

  type TestAttemptGetPayload<S extends boolean | null | undefined | TestAttemptDefaultArgs> = $Result.GetResult<Prisma.$TestAttemptPayload, S>

  type TestAttemptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestAttemptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestAttemptCountAggregateInputType | true
    }

  export interface TestAttemptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TestAttempt'], meta: { name: 'TestAttempt' } }
    /**
     * Find zero or one TestAttempt that matches the filter.
     * @param {TestAttemptFindUniqueArgs} args - Arguments to find a TestAttempt
     * @example
     * // Get one TestAttempt
     * const testAttempt = await prisma.testAttempt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestAttemptFindUniqueArgs>(args: SelectSubset<T, TestAttemptFindUniqueArgs<ExtArgs>>): Prisma__TestAttemptClient<$Result.GetResult<Prisma.$TestAttemptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TestAttempt that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestAttemptFindUniqueOrThrowArgs} args - Arguments to find a TestAttempt
     * @example
     * // Get one TestAttempt
     * const testAttempt = await prisma.testAttempt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestAttemptFindUniqueOrThrowArgs>(args: SelectSubset<T, TestAttemptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestAttemptClient<$Result.GetResult<Prisma.$TestAttemptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestAttempt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestAttemptFindFirstArgs} args - Arguments to find a TestAttempt
     * @example
     * // Get one TestAttempt
     * const testAttempt = await prisma.testAttempt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestAttemptFindFirstArgs>(args?: SelectSubset<T, TestAttemptFindFirstArgs<ExtArgs>>): Prisma__TestAttemptClient<$Result.GetResult<Prisma.$TestAttemptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestAttempt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestAttemptFindFirstOrThrowArgs} args - Arguments to find a TestAttempt
     * @example
     * // Get one TestAttempt
     * const testAttempt = await prisma.testAttempt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestAttemptFindFirstOrThrowArgs>(args?: SelectSubset<T, TestAttemptFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestAttemptClient<$Result.GetResult<Prisma.$TestAttemptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TestAttempts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestAttemptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TestAttempts
     * const testAttempts = await prisma.testAttempt.findMany()
     * 
     * // Get first 10 TestAttempts
     * const testAttempts = await prisma.testAttempt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testAttemptWithIdOnly = await prisma.testAttempt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestAttemptFindManyArgs>(args?: SelectSubset<T, TestAttemptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TestAttempt.
     * @param {TestAttemptCreateArgs} args - Arguments to create a TestAttempt.
     * @example
     * // Create one TestAttempt
     * const TestAttempt = await prisma.testAttempt.create({
     *   data: {
     *     // ... data to create a TestAttempt
     *   }
     * })
     * 
     */
    create<T extends TestAttemptCreateArgs>(args: SelectSubset<T, TestAttemptCreateArgs<ExtArgs>>): Prisma__TestAttemptClient<$Result.GetResult<Prisma.$TestAttemptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TestAttempts.
     * @param {TestAttemptCreateManyArgs} args - Arguments to create many TestAttempts.
     * @example
     * // Create many TestAttempts
     * const testAttempt = await prisma.testAttempt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestAttemptCreateManyArgs>(args?: SelectSubset<T, TestAttemptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TestAttempts and returns the data saved in the database.
     * @param {TestAttemptCreateManyAndReturnArgs} args - Arguments to create many TestAttempts.
     * @example
     * // Create many TestAttempts
     * const testAttempt = await prisma.testAttempt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TestAttempts and only return the `id`
     * const testAttemptWithIdOnly = await prisma.testAttempt.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TestAttemptCreateManyAndReturnArgs>(args?: SelectSubset<T, TestAttemptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestAttemptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TestAttempt.
     * @param {TestAttemptDeleteArgs} args - Arguments to delete one TestAttempt.
     * @example
     * // Delete one TestAttempt
     * const TestAttempt = await prisma.testAttempt.delete({
     *   where: {
     *     // ... filter to delete one TestAttempt
     *   }
     * })
     * 
     */
    delete<T extends TestAttemptDeleteArgs>(args: SelectSubset<T, TestAttemptDeleteArgs<ExtArgs>>): Prisma__TestAttemptClient<$Result.GetResult<Prisma.$TestAttemptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TestAttempt.
     * @param {TestAttemptUpdateArgs} args - Arguments to update one TestAttempt.
     * @example
     * // Update one TestAttempt
     * const testAttempt = await prisma.testAttempt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestAttemptUpdateArgs>(args: SelectSubset<T, TestAttemptUpdateArgs<ExtArgs>>): Prisma__TestAttemptClient<$Result.GetResult<Prisma.$TestAttemptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TestAttempts.
     * @param {TestAttemptDeleteManyArgs} args - Arguments to filter TestAttempts to delete.
     * @example
     * // Delete a few TestAttempts
     * const { count } = await prisma.testAttempt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestAttemptDeleteManyArgs>(args?: SelectSubset<T, TestAttemptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestAttemptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TestAttempts
     * const testAttempt = await prisma.testAttempt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestAttemptUpdateManyArgs>(args: SelectSubset<T, TestAttemptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestAttempts and returns the data updated in the database.
     * @param {TestAttemptUpdateManyAndReturnArgs} args - Arguments to update many TestAttempts.
     * @example
     * // Update many TestAttempts
     * const testAttempt = await prisma.testAttempt.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TestAttempts and only return the `id`
     * const testAttemptWithIdOnly = await prisma.testAttempt.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TestAttemptUpdateManyAndReturnArgs>(args: SelectSubset<T, TestAttemptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestAttemptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TestAttempt.
     * @param {TestAttemptUpsertArgs} args - Arguments to update or create a TestAttempt.
     * @example
     * // Update or create a TestAttempt
     * const testAttempt = await prisma.testAttempt.upsert({
     *   create: {
     *     // ... data to create a TestAttempt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TestAttempt we want to update
     *   }
     * })
     */
    upsert<T extends TestAttemptUpsertArgs>(args: SelectSubset<T, TestAttemptUpsertArgs<ExtArgs>>): Prisma__TestAttemptClient<$Result.GetResult<Prisma.$TestAttemptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TestAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestAttemptCountArgs} args - Arguments to filter TestAttempts to count.
     * @example
     * // Count the number of TestAttempts
     * const count = await prisma.testAttempt.count({
     *   where: {
     *     // ... the filter for the TestAttempts we want to count
     *   }
     * })
    **/
    count<T extends TestAttemptCountArgs>(
      args?: Subset<T, TestAttemptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestAttemptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TestAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestAttemptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TestAttemptAggregateArgs>(args: Subset<T, TestAttemptAggregateArgs>): Prisma.PrismaPromise<GetTestAttemptAggregateType<T>>

    /**
     * Group by TestAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestAttemptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TestAttemptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestAttemptGroupByArgs['orderBy'] }
        : { orderBy?: TestAttemptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TestAttemptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestAttemptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TestAttempt model
   */
  readonly fields: TestAttemptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TestAttempt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestAttemptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    test<T extends TestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TestDefaultArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    snapshot<T extends TestAttempt$snapshotArgs<ExtArgs> = {}>(args?: Subset<T, TestAttempt$snapshotArgs<ExtArgs>>): Prisma__TestSnapshotClient<$Result.GetResult<Prisma.$TestSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    user<T extends TestAttempt$userArgs<ExtArgs> = {}>(args?: Subset<T, TestAttempt$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    answers<T extends TestAttempt$answersArgs<ExtArgs> = {}>(args?: Subset<T, TestAttempt$answersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TestAttempt model
   */
  interface TestAttemptFieldRefs {
    readonly id: FieldRef<"TestAttempt", 'String'>
    readonly testId: FieldRef<"TestAttempt", 'String'>
    readonly userId: FieldRef<"TestAttempt", 'String'>
    readonly preTestUserData: FieldRef<"TestAttempt", 'Json'>
    readonly score: FieldRef<"TestAttempt", 'Float'>
    readonly startedAt: FieldRef<"TestAttempt", 'DateTime'>
    readonly completedAt: FieldRef<"TestAttempt", 'DateTime'>
    readonly status: FieldRef<"TestAttempt", 'TestAttemptStatus'>
    readonly updatedAt: FieldRef<"TestAttempt", 'DateTime'>
    readonly testSnapshotId: FieldRef<"TestAttempt", 'String'>
    readonly expirationTime: FieldRef<"TestAttempt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TestAttempt findUnique
   */
  export type TestAttemptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestAttempt
     */
    select?: TestAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestAttempt
     */
    omit?: TestAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestAttemptInclude<ExtArgs> | null
    /**
     * Filter, which TestAttempt to fetch.
     */
    where: TestAttemptWhereUniqueInput
  }

  /**
   * TestAttempt findUniqueOrThrow
   */
  export type TestAttemptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestAttempt
     */
    select?: TestAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestAttempt
     */
    omit?: TestAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestAttemptInclude<ExtArgs> | null
    /**
     * Filter, which TestAttempt to fetch.
     */
    where: TestAttemptWhereUniqueInput
  }

  /**
   * TestAttempt findFirst
   */
  export type TestAttemptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestAttempt
     */
    select?: TestAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestAttempt
     */
    omit?: TestAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestAttemptInclude<ExtArgs> | null
    /**
     * Filter, which TestAttempt to fetch.
     */
    where?: TestAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestAttempts to fetch.
     */
    orderBy?: TestAttemptOrderByWithRelationInput | TestAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestAttempts.
     */
    cursor?: TestAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestAttempts.
     */
    distinct?: TestAttemptScalarFieldEnum | TestAttemptScalarFieldEnum[]
  }

  /**
   * TestAttempt findFirstOrThrow
   */
  export type TestAttemptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestAttempt
     */
    select?: TestAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestAttempt
     */
    omit?: TestAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestAttemptInclude<ExtArgs> | null
    /**
     * Filter, which TestAttempt to fetch.
     */
    where?: TestAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestAttempts to fetch.
     */
    orderBy?: TestAttemptOrderByWithRelationInput | TestAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestAttempts.
     */
    cursor?: TestAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestAttempts.
     */
    distinct?: TestAttemptScalarFieldEnum | TestAttemptScalarFieldEnum[]
  }

  /**
   * TestAttempt findMany
   */
  export type TestAttemptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestAttempt
     */
    select?: TestAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestAttempt
     */
    omit?: TestAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestAttemptInclude<ExtArgs> | null
    /**
     * Filter, which TestAttempts to fetch.
     */
    where?: TestAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestAttempts to fetch.
     */
    orderBy?: TestAttemptOrderByWithRelationInput | TestAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TestAttempts.
     */
    cursor?: TestAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestAttempts.
     */
    skip?: number
    distinct?: TestAttemptScalarFieldEnum | TestAttemptScalarFieldEnum[]
  }

  /**
   * TestAttempt create
   */
  export type TestAttemptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestAttempt
     */
    select?: TestAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestAttempt
     */
    omit?: TestAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestAttemptInclude<ExtArgs> | null
    /**
     * The data needed to create a TestAttempt.
     */
    data: XOR<TestAttemptCreateInput, TestAttemptUncheckedCreateInput>
  }

  /**
   * TestAttempt createMany
   */
  export type TestAttemptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TestAttempts.
     */
    data: TestAttemptCreateManyInput | TestAttemptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TestAttempt createManyAndReturn
   */
  export type TestAttemptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestAttempt
     */
    select?: TestAttemptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestAttempt
     */
    omit?: TestAttemptOmit<ExtArgs> | null
    /**
     * The data used to create many TestAttempts.
     */
    data: TestAttemptCreateManyInput | TestAttemptCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestAttemptIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestAttempt update
   */
  export type TestAttemptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestAttempt
     */
    select?: TestAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestAttempt
     */
    omit?: TestAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestAttemptInclude<ExtArgs> | null
    /**
     * The data needed to update a TestAttempt.
     */
    data: XOR<TestAttemptUpdateInput, TestAttemptUncheckedUpdateInput>
    /**
     * Choose, which TestAttempt to update.
     */
    where: TestAttemptWhereUniqueInput
  }

  /**
   * TestAttempt updateMany
   */
  export type TestAttemptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TestAttempts.
     */
    data: XOR<TestAttemptUpdateManyMutationInput, TestAttemptUncheckedUpdateManyInput>
    /**
     * Filter which TestAttempts to update
     */
    where?: TestAttemptWhereInput
    /**
     * Limit how many TestAttempts to update.
     */
    limit?: number
  }

  /**
   * TestAttempt updateManyAndReturn
   */
  export type TestAttemptUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestAttempt
     */
    select?: TestAttemptSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestAttempt
     */
    omit?: TestAttemptOmit<ExtArgs> | null
    /**
     * The data used to update TestAttempts.
     */
    data: XOR<TestAttemptUpdateManyMutationInput, TestAttemptUncheckedUpdateManyInput>
    /**
     * Filter which TestAttempts to update
     */
    where?: TestAttemptWhereInput
    /**
     * Limit how many TestAttempts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestAttemptIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestAttempt upsert
   */
  export type TestAttemptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestAttempt
     */
    select?: TestAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestAttempt
     */
    omit?: TestAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestAttemptInclude<ExtArgs> | null
    /**
     * The filter to search for the TestAttempt to update in case it exists.
     */
    where: TestAttemptWhereUniqueInput
    /**
     * In case the TestAttempt found by the `where` argument doesn't exist, create a new TestAttempt with this data.
     */
    create: XOR<TestAttemptCreateInput, TestAttemptUncheckedCreateInput>
    /**
     * In case the TestAttempt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestAttemptUpdateInput, TestAttemptUncheckedUpdateInput>
  }

  /**
   * TestAttempt delete
   */
  export type TestAttemptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestAttempt
     */
    select?: TestAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestAttempt
     */
    omit?: TestAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestAttemptInclude<ExtArgs> | null
    /**
     * Filter which TestAttempt to delete.
     */
    where: TestAttemptWhereUniqueInput
  }

  /**
   * TestAttempt deleteMany
   */
  export type TestAttemptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestAttempts to delete
     */
    where?: TestAttemptWhereInput
    /**
     * Limit how many TestAttempts to delete.
     */
    limit?: number
  }

  /**
   * TestAttempt.snapshot
   */
  export type TestAttempt$snapshotArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSnapshot
     */
    select?: TestSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSnapshot
     */
    omit?: TestSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSnapshotInclude<ExtArgs> | null
    where?: TestSnapshotWhereInput
  }

  /**
   * TestAttempt.user
   */
  export type TestAttempt$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * TestAttempt.answers
   */
  export type TestAttempt$answersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    where?: UserAnswerWhereInput
    orderBy?: UserAnswerOrderByWithRelationInput | UserAnswerOrderByWithRelationInput[]
    cursor?: UserAnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserAnswerScalarFieldEnum | UserAnswerScalarFieldEnum[]
  }

  /**
   * TestAttempt without action
   */
  export type TestAttemptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestAttempt
     */
    select?: TestAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestAttempt
     */
    omit?: TestAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestAttemptInclude<ExtArgs> | null
  }


  /**
   * Model UserAnswer
   */

  export type AggregateUserAnswer = {
    _count: UserAnswerCountAggregateOutputType | null
    _avg: UserAnswerAvgAggregateOutputType | null
    _sum: UserAnswerSumAggregateOutputType | null
    _min: UserAnswerMinAggregateOutputType | null
    _max: UserAnswerMaxAggregateOutputType | null
  }

  export type UserAnswerAvgAggregateOutputType = {
    timeSpent: number | null
  }

  export type UserAnswerSumAggregateOutputType = {
    timeSpent: number | null
  }

  export type UserAnswerMinAggregateOutputType = {
    id: string | null
    attemptId: string | null
    questionId: string | null
    answerId: string | null
    answeredAt: Date | null
    timeSpent: number | null
    createdAt: Date | null
  }

  export type UserAnswerMaxAggregateOutputType = {
    id: string | null
    attemptId: string | null
    questionId: string | null
    answerId: string | null
    answeredAt: Date | null
    timeSpent: number | null
    createdAt: Date | null
  }

  export type UserAnswerCountAggregateOutputType = {
    id: number
    attemptId: number
    questionId: number
    answerId: number
    answeredAt: number
    timeSpent: number
    createdAt: number
    _all: number
  }


  export type UserAnswerAvgAggregateInputType = {
    timeSpent?: true
  }

  export type UserAnswerSumAggregateInputType = {
    timeSpent?: true
  }

  export type UserAnswerMinAggregateInputType = {
    id?: true
    attemptId?: true
    questionId?: true
    answerId?: true
    answeredAt?: true
    timeSpent?: true
    createdAt?: true
  }

  export type UserAnswerMaxAggregateInputType = {
    id?: true
    attemptId?: true
    questionId?: true
    answerId?: true
    answeredAt?: true
    timeSpent?: true
    createdAt?: true
  }

  export type UserAnswerCountAggregateInputType = {
    id?: true
    attemptId?: true
    questionId?: true
    answerId?: true
    answeredAt?: true
    timeSpent?: true
    createdAt?: true
    _all?: true
  }

  export type UserAnswerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAnswer to aggregate.
     */
    where?: UserAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAnswers to fetch.
     */
    orderBy?: UserAnswerOrderByWithRelationInput | UserAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserAnswers
    **/
    _count?: true | UserAnswerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAnswerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserAnswerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserAnswerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserAnswerMaxAggregateInputType
  }

  export type GetUserAnswerAggregateType<T extends UserAnswerAggregateArgs> = {
        [P in keyof T & keyof AggregateUserAnswer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserAnswer[P]>
      : GetScalarType<T[P], AggregateUserAnswer[P]>
  }




  export type UserAnswerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserAnswerWhereInput
    orderBy?: UserAnswerOrderByWithAggregationInput | UserAnswerOrderByWithAggregationInput[]
    by: UserAnswerScalarFieldEnum[] | UserAnswerScalarFieldEnum
    having?: UserAnswerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserAnswerCountAggregateInputType | true
    _avg?: UserAnswerAvgAggregateInputType
    _sum?: UserAnswerSumAggregateInputType
    _min?: UserAnswerMinAggregateInputType
    _max?: UserAnswerMaxAggregateInputType
  }

  export type UserAnswerGroupByOutputType = {
    id: string
    attemptId: string
    questionId: string
    answerId: string
    answeredAt: Date | null
    timeSpent: number | null
    createdAt: Date
    _count: UserAnswerCountAggregateOutputType | null
    _avg: UserAnswerAvgAggregateOutputType | null
    _sum: UserAnswerSumAggregateOutputType | null
    _min: UserAnswerMinAggregateOutputType | null
    _max: UserAnswerMaxAggregateOutputType | null
  }

  type GetUserAnswerGroupByPayload<T extends UserAnswerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserAnswerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserAnswerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserAnswerGroupByOutputType[P]>
            : GetScalarType<T[P], UserAnswerGroupByOutputType[P]>
        }
      >
    >


  export type UserAnswerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    attemptId?: boolean
    questionId?: boolean
    answerId?: boolean
    answeredAt?: boolean
    timeSpent?: boolean
    createdAt?: boolean
    answer?: boolean | AnswerDefaultArgs<ExtArgs>
    attempt?: boolean | TestAttemptDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAnswer"]>

  export type UserAnswerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    attemptId?: boolean
    questionId?: boolean
    answerId?: boolean
    answeredAt?: boolean
    timeSpent?: boolean
    createdAt?: boolean
    answer?: boolean | AnswerDefaultArgs<ExtArgs>
    attempt?: boolean | TestAttemptDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAnswer"]>

  export type UserAnswerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    attemptId?: boolean
    questionId?: boolean
    answerId?: boolean
    answeredAt?: boolean
    timeSpent?: boolean
    createdAt?: boolean
    answer?: boolean | AnswerDefaultArgs<ExtArgs>
    attempt?: boolean | TestAttemptDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userAnswer"]>

  export type UserAnswerSelectScalar = {
    id?: boolean
    attemptId?: boolean
    questionId?: boolean
    answerId?: boolean
    answeredAt?: boolean
    timeSpent?: boolean
    createdAt?: boolean
  }

  export type UserAnswerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "attemptId" | "questionId" | "answerId" | "answeredAt" | "timeSpent" | "createdAt", ExtArgs["result"]["userAnswer"]>
  export type UserAnswerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answer?: boolean | AnswerDefaultArgs<ExtArgs>
    attempt?: boolean | TestAttemptDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }
  export type UserAnswerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answer?: boolean | AnswerDefaultArgs<ExtArgs>
    attempt?: boolean | TestAttemptDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }
  export type UserAnswerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answer?: boolean | AnswerDefaultArgs<ExtArgs>
    attempt?: boolean | TestAttemptDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }

  export type $UserAnswerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserAnswer"
    objects: {
      answer: Prisma.$AnswerPayload<ExtArgs>
      attempt: Prisma.$TestAttemptPayload<ExtArgs>
      question: Prisma.$QuestionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      attemptId: string
      questionId: string
      answerId: string
      answeredAt: Date | null
      timeSpent: number | null
      createdAt: Date
    }, ExtArgs["result"]["userAnswer"]>
    composites: {}
  }

  type UserAnswerGetPayload<S extends boolean | null | undefined | UserAnswerDefaultArgs> = $Result.GetResult<Prisma.$UserAnswerPayload, S>

  type UserAnswerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserAnswerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserAnswerCountAggregateInputType | true
    }

  export interface UserAnswerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserAnswer'], meta: { name: 'UserAnswer' } }
    /**
     * Find zero or one UserAnswer that matches the filter.
     * @param {UserAnswerFindUniqueArgs} args - Arguments to find a UserAnswer
     * @example
     * // Get one UserAnswer
     * const userAnswer = await prisma.userAnswer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserAnswerFindUniqueArgs>(args: SelectSubset<T, UserAnswerFindUniqueArgs<ExtArgs>>): Prisma__UserAnswerClient<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserAnswer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserAnswerFindUniqueOrThrowArgs} args - Arguments to find a UserAnswer
     * @example
     * // Get one UserAnswer
     * const userAnswer = await prisma.userAnswer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserAnswerFindUniqueOrThrowArgs>(args: SelectSubset<T, UserAnswerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserAnswerClient<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserAnswer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAnswerFindFirstArgs} args - Arguments to find a UserAnswer
     * @example
     * // Get one UserAnswer
     * const userAnswer = await prisma.userAnswer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserAnswerFindFirstArgs>(args?: SelectSubset<T, UserAnswerFindFirstArgs<ExtArgs>>): Prisma__UserAnswerClient<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserAnswer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAnswerFindFirstOrThrowArgs} args - Arguments to find a UserAnswer
     * @example
     * // Get one UserAnswer
     * const userAnswer = await prisma.userAnswer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserAnswerFindFirstOrThrowArgs>(args?: SelectSubset<T, UserAnswerFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserAnswerClient<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserAnswers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAnswerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserAnswers
     * const userAnswers = await prisma.userAnswer.findMany()
     * 
     * // Get first 10 UserAnswers
     * const userAnswers = await prisma.userAnswer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userAnswerWithIdOnly = await prisma.userAnswer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserAnswerFindManyArgs>(args?: SelectSubset<T, UserAnswerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserAnswer.
     * @param {UserAnswerCreateArgs} args - Arguments to create a UserAnswer.
     * @example
     * // Create one UserAnswer
     * const UserAnswer = await prisma.userAnswer.create({
     *   data: {
     *     // ... data to create a UserAnswer
     *   }
     * })
     * 
     */
    create<T extends UserAnswerCreateArgs>(args: SelectSubset<T, UserAnswerCreateArgs<ExtArgs>>): Prisma__UserAnswerClient<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserAnswers.
     * @param {UserAnswerCreateManyArgs} args - Arguments to create many UserAnswers.
     * @example
     * // Create many UserAnswers
     * const userAnswer = await prisma.userAnswer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserAnswerCreateManyArgs>(args?: SelectSubset<T, UserAnswerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserAnswers and returns the data saved in the database.
     * @param {UserAnswerCreateManyAndReturnArgs} args - Arguments to create many UserAnswers.
     * @example
     * // Create many UserAnswers
     * const userAnswer = await prisma.userAnswer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserAnswers and only return the `id`
     * const userAnswerWithIdOnly = await prisma.userAnswer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserAnswerCreateManyAndReturnArgs>(args?: SelectSubset<T, UserAnswerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserAnswer.
     * @param {UserAnswerDeleteArgs} args - Arguments to delete one UserAnswer.
     * @example
     * // Delete one UserAnswer
     * const UserAnswer = await prisma.userAnswer.delete({
     *   where: {
     *     // ... filter to delete one UserAnswer
     *   }
     * })
     * 
     */
    delete<T extends UserAnswerDeleteArgs>(args: SelectSubset<T, UserAnswerDeleteArgs<ExtArgs>>): Prisma__UserAnswerClient<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserAnswer.
     * @param {UserAnswerUpdateArgs} args - Arguments to update one UserAnswer.
     * @example
     * // Update one UserAnswer
     * const userAnswer = await prisma.userAnswer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserAnswerUpdateArgs>(args: SelectSubset<T, UserAnswerUpdateArgs<ExtArgs>>): Prisma__UserAnswerClient<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserAnswers.
     * @param {UserAnswerDeleteManyArgs} args - Arguments to filter UserAnswers to delete.
     * @example
     * // Delete a few UserAnswers
     * const { count } = await prisma.userAnswer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserAnswerDeleteManyArgs>(args?: SelectSubset<T, UserAnswerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserAnswers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAnswerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserAnswers
     * const userAnswer = await prisma.userAnswer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserAnswerUpdateManyArgs>(args: SelectSubset<T, UserAnswerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserAnswers and returns the data updated in the database.
     * @param {UserAnswerUpdateManyAndReturnArgs} args - Arguments to update many UserAnswers.
     * @example
     * // Update many UserAnswers
     * const userAnswer = await prisma.userAnswer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserAnswers and only return the `id`
     * const userAnswerWithIdOnly = await prisma.userAnswer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserAnswerUpdateManyAndReturnArgs>(args: SelectSubset<T, UserAnswerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserAnswer.
     * @param {UserAnswerUpsertArgs} args - Arguments to update or create a UserAnswer.
     * @example
     * // Update or create a UserAnswer
     * const userAnswer = await prisma.userAnswer.upsert({
     *   create: {
     *     // ... data to create a UserAnswer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserAnswer we want to update
     *   }
     * })
     */
    upsert<T extends UserAnswerUpsertArgs>(args: SelectSubset<T, UserAnswerUpsertArgs<ExtArgs>>): Prisma__UserAnswerClient<$Result.GetResult<Prisma.$UserAnswerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserAnswers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAnswerCountArgs} args - Arguments to filter UserAnswers to count.
     * @example
     * // Count the number of UserAnswers
     * const count = await prisma.userAnswer.count({
     *   where: {
     *     // ... the filter for the UserAnswers we want to count
     *   }
     * })
    **/
    count<T extends UserAnswerCountArgs>(
      args?: Subset<T, UserAnswerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserAnswerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserAnswer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAnswerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAnswerAggregateArgs>(args: Subset<T, UserAnswerAggregateArgs>): Prisma.PrismaPromise<GetUserAnswerAggregateType<T>>

    /**
     * Group by UserAnswer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAnswerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserAnswerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserAnswerGroupByArgs['orderBy'] }
        : { orderBy?: UserAnswerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserAnswerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserAnswerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserAnswer model
   */
  readonly fields: UserAnswerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserAnswer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserAnswerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    answer<T extends AnswerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnswerDefaultArgs<ExtArgs>>): Prisma__AnswerClient<$Result.GetResult<Prisma.$AnswerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    attempt<T extends TestAttemptDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TestAttemptDefaultArgs<ExtArgs>>): Prisma__TestAttemptClient<$Result.GetResult<Prisma.$TestAttemptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    question<T extends QuestionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuestionDefaultArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserAnswer model
   */
  interface UserAnswerFieldRefs {
    readonly id: FieldRef<"UserAnswer", 'String'>
    readonly attemptId: FieldRef<"UserAnswer", 'String'>
    readonly questionId: FieldRef<"UserAnswer", 'String'>
    readonly answerId: FieldRef<"UserAnswer", 'String'>
    readonly answeredAt: FieldRef<"UserAnswer", 'DateTime'>
    readonly timeSpent: FieldRef<"UserAnswer", 'Int'>
    readonly createdAt: FieldRef<"UserAnswer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserAnswer findUnique
   */
  export type UserAnswerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * Filter, which UserAnswer to fetch.
     */
    where: UserAnswerWhereUniqueInput
  }

  /**
   * UserAnswer findUniqueOrThrow
   */
  export type UserAnswerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * Filter, which UserAnswer to fetch.
     */
    where: UserAnswerWhereUniqueInput
  }

  /**
   * UserAnswer findFirst
   */
  export type UserAnswerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * Filter, which UserAnswer to fetch.
     */
    where?: UserAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAnswers to fetch.
     */
    orderBy?: UserAnswerOrderByWithRelationInput | UserAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAnswers.
     */
    cursor?: UserAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAnswers.
     */
    distinct?: UserAnswerScalarFieldEnum | UserAnswerScalarFieldEnum[]
  }

  /**
   * UserAnswer findFirstOrThrow
   */
  export type UserAnswerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * Filter, which UserAnswer to fetch.
     */
    where?: UserAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAnswers to fetch.
     */
    orderBy?: UserAnswerOrderByWithRelationInput | UserAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserAnswers.
     */
    cursor?: UserAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserAnswers.
     */
    distinct?: UserAnswerScalarFieldEnum | UserAnswerScalarFieldEnum[]
  }

  /**
   * UserAnswer findMany
   */
  export type UserAnswerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * Filter, which UserAnswers to fetch.
     */
    where?: UserAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserAnswers to fetch.
     */
    orderBy?: UserAnswerOrderByWithRelationInput | UserAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserAnswers.
     */
    cursor?: UserAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserAnswers.
     */
    skip?: number
    distinct?: UserAnswerScalarFieldEnum | UserAnswerScalarFieldEnum[]
  }

  /**
   * UserAnswer create
   */
  export type UserAnswerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * The data needed to create a UserAnswer.
     */
    data: XOR<UserAnswerCreateInput, UserAnswerUncheckedCreateInput>
  }

  /**
   * UserAnswer createMany
   */
  export type UserAnswerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserAnswers.
     */
    data: UserAnswerCreateManyInput | UserAnswerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserAnswer createManyAndReturn
   */
  export type UserAnswerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * The data used to create many UserAnswers.
     */
    data: UserAnswerCreateManyInput | UserAnswerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserAnswer update
   */
  export type UserAnswerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * The data needed to update a UserAnswer.
     */
    data: XOR<UserAnswerUpdateInput, UserAnswerUncheckedUpdateInput>
    /**
     * Choose, which UserAnswer to update.
     */
    where: UserAnswerWhereUniqueInput
  }

  /**
   * UserAnswer updateMany
   */
  export type UserAnswerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserAnswers.
     */
    data: XOR<UserAnswerUpdateManyMutationInput, UserAnswerUncheckedUpdateManyInput>
    /**
     * Filter which UserAnswers to update
     */
    where?: UserAnswerWhereInput
    /**
     * Limit how many UserAnswers to update.
     */
    limit?: number
  }

  /**
   * UserAnswer updateManyAndReturn
   */
  export type UserAnswerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * The data used to update UserAnswers.
     */
    data: XOR<UserAnswerUpdateManyMutationInput, UserAnswerUncheckedUpdateManyInput>
    /**
     * Filter which UserAnswers to update
     */
    where?: UserAnswerWhereInput
    /**
     * Limit how many UserAnswers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserAnswer upsert
   */
  export type UserAnswerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * The filter to search for the UserAnswer to update in case it exists.
     */
    where: UserAnswerWhereUniqueInput
    /**
     * In case the UserAnswer found by the `where` argument doesn't exist, create a new UserAnswer with this data.
     */
    create: XOR<UserAnswerCreateInput, UserAnswerUncheckedCreateInput>
    /**
     * In case the UserAnswer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserAnswerUpdateInput, UserAnswerUncheckedUpdateInput>
  }

  /**
   * UserAnswer delete
   */
  export type UserAnswerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
    /**
     * Filter which UserAnswer to delete.
     */
    where: UserAnswerWhereUniqueInput
  }

  /**
   * UserAnswer deleteMany
   */
  export type UserAnswerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserAnswers to delete
     */
    where?: UserAnswerWhereInput
    /**
     * Limit how many UserAnswers to delete.
     */
    limit?: number
  }

  /**
   * UserAnswer without action
   */
  export type UserAnswerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserAnswer
     */
    select?: UserAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserAnswer
     */
    omit?: UserAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserAnswerInclude<ExtArgs> | null
  }


  /**
   * Model TestSnapshot
   */

  export type AggregateTestSnapshot = {
    _count: TestSnapshotCountAggregateOutputType | null
    _avg: TestSnapshotAvgAggregateOutputType | null
    _sum: TestSnapshotSumAggregateOutputType | null
    _min: TestSnapshotMinAggregateOutputType | null
    _max: TestSnapshotMaxAggregateOutputType | null
  }

  export type TestSnapshotAvgAggregateOutputType = {
    version: number | null
  }

  export type TestSnapshotSumAggregateOutputType = {
    version: number | null
  }

  export type TestSnapshotMinAggregateOutputType = {
    id: string | null
    testId: string | null
    title: string | null
    description: string | null
    status: $Enums.ModerationStatus | null
    createdAt: Date | null
    version: number | null
    visibilityStatus: $Enums.TestVisibilityStatus | null
  }

  export type TestSnapshotMaxAggregateOutputType = {
    id: string | null
    testId: string | null
    title: string | null
    description: string | null
    status: $Enums.ModerationStatus | null
    createdAt: Date | null
    version: number | null
    visibilityStatus: $Enums.TestVisibilityStatus | null
  }

  export type TestSnapshotCountAggregateOutputType = {
    id: number
    testId: number
    title: number
    description: number
    status: number
    createdAt: number
    version: number
    visibilityStatus: number
    _all: number
  }


  export type TestSnapshotAvgAggregateInputType = {
    version?: true
  }

  export type TestSnapshotSumAggregateInputType = {
    version?: true
  }

  export type TestSnapshotMinAggregateInputType = {
    id?: true
    testId?: true
    title?: true
    description?: true
    status?: true
    createdAt?: true
    version?: true
    visibilityStatus?: true
  }

  export type TestSnapshotMaxAggregateInputType = {
    id?: true
    testId?: true
    title?: true
    description?: true
    status?: true
    createdAt?: true
    version?: true
    visibilityStatus?: true
  }

  export type TestSnapshotCountAggregateInputType = {
    id?: true
    testId?: true
    title?: true
    description?: true
    status?: true
    createdAt?: true
    version?: true
    visibilityStatus?: true
    _all?: true
  }

  export type TestSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestSnapshot to aggregate.
     */
    where?: TestSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestSnapshots to fetch.
     */
    orderBy?: TestSnapshotOrderByWithRelationInput | TestSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TestSnapshots
    **/
    _count?: true | TestSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TestSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TestSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestSnapshotMaxAggregateInputType
  }

  export type GetTestSnapshotAggregateType<T extends TestSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateTestSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTestSnapshot[P]>
      : GetScalarType<T[P], AggregateTestSnapshot[P]>
  }




  export type TestSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestSnapshotWhereInput
    orderBy?: TestSnapshotOrderByWithAggregationInput | TestSnapshotOrderByWithAggregationInput[]
    by: TestSnapshotScalarFieldEnum[] | TestSnapshotScalarFieldEnum
    having?: TestSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestSnapshotCountAggregateInputType | true
    _avg?: TestSnapshotAvgAggregateInputType
    _sum?: TestSnapshotSumAggregateInputType
    _min?: TestSnapshotMinAggregateInputType
    _max?: TestSnapshotMaxAggregateInputType
  }

  export type TestSnapshotGroupByOutputType = {
    id: string
    testId: string
    title: string
    description: string | null
    status: $Enums.ModerationStatus
    createdAt: Date
    version: number
    visibilityStatus: $Enums.TestVisibilityStatus
    _count: TestSnapshotCountAggregateOutputType | null
    _avg: TestSnapshotAvgAggregateOutputType | null
    _sum: TestSnapshotSumAggregateOutputType | null
    _min: TestSnapshotMinAggregateOutputType | null
    _max: TestSnapshotMaxAggregateOutputType | null
  }

  type GetTestSnapshotGroupByPayload<T extends TestSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], TestSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type TestSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    testId?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    version?: boolean
    visibilityStatus?: boolean
    questions?: boolean | TestSnapshot$questionsArgs<ExtArgs>
    attempts?: boolean | TestSnapshot$attemptsArgs<ExtArgs>
    settings?: boolean | TestSnapshot$settingsArgs<ExtArgs>
    originalTest?: boolean | TestDefaultArgs<ExtArgs>
    _count?: boolean | TestSnapshotCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testSnapshot"]>

  export type TestSnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    testId?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    version?: boolean
    visibilityStatus?: boolean
    originalTest?: boolean | TestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testSnapshot"]>

  export type TestSnapshotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    testId?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    version?: boolean
    visibilityStatus?: boolean
    originalTest?: boolean | TestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testSnapshot"]>

  export type TestSnapshotSelectScalar = {
    id?: boolean
    testId?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    createdAt?: boolean
    version?: boolean
    visibilityStatus?: boolean
  }

  export type TestSnapshotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "testId" | "title" | "description" | "status" | "createdAt" | "version" | "visibilityStatus", ExtArgs["result"]["testSnapshot"]>
  export type TestSnapshotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questions?: boolean | TestSnapshot$questionsArgs<ExtArgs>
    attempts?: boolean | TestSnapshot$attemptsArgs<ExtArgs>
    settings?: boolean | TestSnapshot$settingsArgs<ExtArgs>
    originalTest?: boolean | TestDefaultArgs<ExtArgs>
    _count?: boolean | TestSnapshotCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TestSnapshotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    originalTest?: boolean | TestDefaultArgs<ExtArgs>
  }
  export type TestSnapshotIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    originalTest?: boolean | TestDefaultArgs<ExtArgs>
  }

  export type $TestSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TestSnapshot"
    objects: {
      questions: Prisma.$QuestionSnapshotPayload<ExtArgs>[]
      attempts: Prisma.$TestAttemptPayload<ExtArgs>[]
      settings: Prisma.$TestSettingsSnapshotPayload<ExtArgs> | null
      originalTest: Prisma.$TestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      testId: string
      title: string
      description: string | null
      status: $Enums.ModerationStatus
      createdAt: Date
      version: number
      visibilityStatus: $Enums.TestVisibilityStatus
    }, ExtArgs["result"]["testSnapshot"]>
    composites: {}
  }

  type TestSnapshotGetPayload<S extends boolean | null | undefined | TestSnapshotDefaultArgs> = $Result.GetResult<Prisma.$TestSnapshotPayload, S>

  type TestSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestSnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestSnapshotCountAggregateInputType | true
    }

  export interface TestSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TestSnapshot'], meta: { name: 'TestSnapshot' } }
    /**
     * Find zero or one TestSnapshot that matches the filter.
     * @param {TestSnapshotFindUniqueArgs} args - Arguments to find a TestSnapshot
     * @example
     * // Get one TestSnapshot
     * const testSnapshot = await prisma.testSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestSnapshotFindUniqueArgs>(args: SelectSubset<T, TestSnapshotFindUniqueArgs<ExtArgs>>): Prisma__TestSnapshotClient<$Result.GetResult<Prisma.$TestSnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TestSnapshot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestSnapshotFindUniqueOrThrowArgs} args - Arguments to find a TestSnapshot
     * @example
     * // Get one TestSnapshot
     * const testSnapshot = await prisma.testSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, TestSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestSnapshotClient<$Result.GetResult<Prisma.$TestSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestSnapshotFindFirstArgs} args - Arguments to find a TestSnapshot
     * @example
     * // Get one TestSnapshot
     * const testSnapshot = await prisma.testSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestSnapshotFindFirstArgs>(args?: SelectSubset<T, TestSnapshotFindFirstArgs<ExtArgs>>): Prisma__TestSnapshotClient<$Result.GetResult<Prisma.$TestSnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestSnapshotFindFirstOrThrowArgs} args - Arguments to find a TestSnapshot
     * @example
     * // Get one TestSnapshot
     * const testSnapshot = await prisma.testSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, TestSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestSnapshotClient<$Result.GetResult<Prisma.$TestSnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TestSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TestSnapshots
     * const testSnapshots = await prisma.testSnapshot.findMany()
     * 
     * // Get first 10 TestSnapshots
     * const testSnapshots = await prisma.testSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testSnapshotWithIdOnly = await prisma.testSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestSnapshotFindManyArgs>(args?: SelectSubset<T, TestSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TestSnapshot.
     * @param {TestSnapshotCreateArgs} args - Arguments to create a TestSnapshot.
     * @example
     * // Create one TestSnapshot
     * const TestSnapshot = await prisma.testSnapshot.create({
     *   data: {
     *     // ... data to create a TestSnapshot
     *   }
     * })
     * 
     */
    create<T extends TestSnapshotCreateArgs>(args: SelectSubset<T, TestSnapshotCreateArgs<ExtArgs>>): Prisma__TestSnapshotClient<$Result.GetResult<Prisma.$TestSnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TestSnapshots.
     * @param {TestSnapshotCreateManyArgs} args - Arguments to create many TestSnapshots.
     * @example
     * // Create many TestSnapshots
     * const testSnapshot = await prisma.testSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestSnapshotCreateManyArgs>(args?: SelectSubset<T, TestSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TestSnapshots and returns the data saved in the database.
     * @param {TestSnapshotCreateManyAndReturnArgs} args - Arguments to create many TestSnapshots.
     * @example
     * // Create many TestSnapshots
     * const testSnapshot = await prisma.testSnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TestSnapshots and only return the `id`
     * const testSnapshotWithIdOnly = await prisma.testSnapshot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TestSnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, TestSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestSnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TestSnapshot.
     * @param {TestSnapshotDeleteArgs} args - Arguments to delete one TestSnapshot.
     * @example
     * // Delete one TestSnapshot
     * const TestSnapshot = await prisma.testSnapshot.delete({
     *   where: {
     *     // ... filter to delete one TestSnapshot
     *   }
     * })
     * 
     */
    delete<T extends TestSnapshotDeleteArgs>(args: SelectSubset<T, TestSnapshotDeleteArgs<ExtArgs>>): Prisma__TestSnapshotClient<$Result.GetResult<Prisma.$TestSnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TestSnapshot.
     * @param {TestSnapshotUpdateArgs} args - Arguments to update one TestSnapshot.
     * @example
     * // Update one TestSnapshot
     * const testSnapshot = await prisma.testSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestSnapshotUpdateArgs>(args: SelectSubset<T, TestSnapshotUpdateArgs<ExtArgs>>): Prisma__TestSnapshotClient<$Result.GetResult<Prisma.$TestSnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TestSnapshots.
     * @param {TestSnapshotDeleteManyArgs} args - Arguments to filter TestSnapshots to delete.
     * @example
     * // Delete a few TestSnapshots
     * const { count } = await prisma.testSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestSnapshotDeleteManyArgs>(args?: SelectSubset<T, TestSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TestSnapshots
     * const testSnapshot = await prisma.testSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestSnapshotUpdateManyArgs>(args: SelectSubset<T, TestSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestSnapshots and returns the data updated in the database.
     * @param {TestSnapshotUpdateManyAndReturnArgs} args - Arguments to update many TestSnapshots.
     * @example
     * // Update many TestSnapshots
     * const testSnapshot = await prisma.testSnapshot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TestSnapshots and only return the `id`
     * const testSnapshotWithIdOnly = await prisma.testSnapshot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TestSnapshotUpdateManyAndReturnArgs>(args: SelectSubset<T, TestSnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestSnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TestSnapshot.
     * @param {TestSnapshotUpsertArgs} args - Arguments to update or create a TestSnapshot.
     * @example
     * // Update or create a TestSnapshot
     * const testSnapshot = await prisma.testSnapshot.upsert({
     *   create: {
     *     // ... data to create a TestSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TestSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends TestSnapshotUpsertArgs>(args: SelectSubset<T, TestSnapshotUpsertArgs<ExtArgs>>): Prisma__TestSnapshotClient<$Result.GetResult<Prisma.$TestSnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TestSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestSnapshotCountArgs} args - Arguments to filter TestSnapshots to count.
     * @example
     * // Count the number of TestSnapshots
     * const count = await prisma.testSnapshot.count({
     *   where: {
     *     // ... the filter for the TestSnapshots we want to count
     *   }
     * })
    **/
    count<T extends TestSnapshotCountArgs>(
      args?: Subset<T, TestSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TestSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TestSnapshotAggregateArgs>(args: Subset<T, TestSnapshotAggregateArgs>): Prisma.PrismaPromise<GetTestSnapshotAggregateType<T>>

    /**
     * Group by TestSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TestSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: TestSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TestSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TestSnapshot model
   */
  readonly fields: TestSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TestSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    questions<T extends TestSnapshot$questionsArgs<ExtArgs> = {}>(args?: Subset<T, TestSnapshot$questionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    attempts<T extends TestSnapshot$attemptsArgs<ExtArgs> = {}>(args?: Subset<T, TestSnapshot$attemptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestAttemptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    settings<T extends TestSnapshot$settingsArgs<ExtArgs> = {}>(args?: Subset<T, TestSnapshot$settingsArgs<ExtArgs>>): Prisma__TestSettingsSnapshotClient<$Result.GetResult<Prisma.$TestSettingsSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    originalTest<T extends TestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TestDefaultArgs<ExtArgs>>): Prisma__TestClient<$Result.GetResult<Prisma.$TestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TestSnapshot model
   */
  interface TestSnapshotFieldRefs {
    readonly id: FieldRef<"TestSnapshot", 'String'>
    readonly testId: FieldRef<"TestSnapshot", 'String'>
    readonly title: FieldRef<"TestSnapshot", 'String'>
    readonly description: FieldRef<"TestSnapshot", 'String'>
    readonly status: FieldRef<"TestSnapshot", 'ModerationStatus'>
    readonly createdAt: FieldRef<"TestSnapshot", 'DateTime'>
    readonly version: FieldRef<"TestSnapshot", 'Int'>
    readonly visibilityStatus: FieldRef<"TestSnapshot", 'TestVisibilityStatus'>
  }
    

  // Custom InputTypes
  /**
   * TestSnapshot findUnique
   */
  export type TestSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSnapshot
     */
    select?: TestSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSnapshot
     */
    omit?: TestSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which TestSnapshot to fetch.
     */
    where: TestSnapshotWhereUniqueInput
  }

  /**
   * TestSnapshot findUniqueOrThrow
   */
  export type TestSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSnapshot
     */
    select?: TestSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSnapshot
     */
    omit?: TestSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which TestSnapshot to fetch.
     */
    where: TestSnapshotWhereUniqueInput
  }

  /**
   * TestSnapshot findFirst
   */
  export type TestSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSnapshot
     */
    select?: TestSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSnapshot
     */
    omit?: TestSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which TestSnapshot to fetch.
     */
    where?: TestSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestSnapshots to fetch.
     */
    orderBy?: TestSnapshotOrderByWithRelationInput | TestSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestSnapshots.
     */
    cursor?: TestSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestSnapshots.
     */
    distinct?: TestSnapshotScalarFieldEnum | TestSnapshotScalarFieldEnum[]
  }

  /**
   * TestSnapshot findFirstOrThrow
   */
  export type TestSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSnapshot
     */
    select?: TestSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSnapshot
     */
    omit?: TestSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which TestSnapshot to fetch.
     */
    where?: TestSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestSnapshots to fetch.
     */
    orderBy?: TestSnapshotOrderByWithRelationInput | TestSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestSnapshots.
     */
    cursor?: TestSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestSnapshots.
     */
    distinct?: TestSnapshotScalarFieldEnum | TestSnapshotScalarFieldEnum[]
  }

  /**
   * TestSnapshot findMany
   */
  export type TestSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSnapshot
     */
    select?: TestSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSnapshot
     */
    omit?: TestSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which TestSnapshots to fetch.
     */
    where?: TestSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestSnapshots to fetch.
     */
    orderBy?: TestSnapshotOrderByWithRelationInput | TestSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TestSnapshots.
     */
    cursor?: TestSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestSnapshots.
     */
    skip?: number
    distinct?: TestSnapshotScalarFieldEnum | TestSnapshotScalarFieldEnum[]
  }

  /**
   * TestSnapshot create
   */
  export type TestSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSnapshot
     */
    select?: TestSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSnapshot
     */
    omit?: TestSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to create a TestSnapshot.
     */
    data: XOR<TestSnapshotCreateInput, TestSnapshotUncheckedCreateInput>
  }

  /**
   * TestSnapshot createMany
   */
  export type TestSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TestSnapshots.
     */
    data: TestSnapshotCreateManyInput | TestSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TestSnapshot createManyAndReturn
   */
  export type TestSnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSnapshot
     */
    select?: TestSnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestSnapshot
     */
    omit?: TestSnapshotOmit<ExtArgs> | null
    /**
     * The data used to create many TestSnapshots.
     */
    data: TestSnapshotCreateManyInput | TestSnapshotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSnapshotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestSnapshot update
   */
  export type TestSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSnapshot
     */
    select?: TestSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSnapshot
     */
    omit?: TestSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to update a TestSnapshot.
     */
    data: XOR<TestSnapshotUpdateInput, TestSnapshotUncheckedUpdateInput>
    /**
     * Choose, which TestSnapshot to update.
     */
    where: TestSnapshotWhereUniqueInput
  }

  /**
   * TestSnapshot updateMany
   */
  export type TestSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TestSnapshots.
     */
    data: XOR<TestSnapshotUpdateManyMutationInput, TestSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which TestSnapshots to update
     */
    where?: TestSnapshotWhereInput
    /**
     * Limit how many TestSnapshots to update.
     */
    limit?: number
  }

  /**
   * TestSnapshot updateManyAndReturn
   */
  export type TestSnapshotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSnapshot
     */
    select?: TestSnapshotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestSnapshot
     */
    omit?: TestSnapshotOmit<ExtArgs> | null
    /**
     * The data used to update TestSnapshots.
     */
    data: XOR<TestSnapshotUpdateManyMutationInput, TestSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which TestSnapshots to update
     */
    where?: TestSnapshotWhereInput
    /**
     * Limit how many TestSnapshots to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSnapshotIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestSnapshot upsert
   */
  export type TestSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSnapshot
     */
    select?: TestSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSnapshot
     */
    omit?: TestSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSnapshotInclude<ExtArgs> | null
    /**
     * The filter to search for the TestSnapshot to update in case it exists.
     */
    where: TestSnapshotWhereUniqueInput
    /**
     * In case the TestSnapshot found by the `where` argument doesn't exist, create a new TestSnapshot with this data.
     */
    create: XOR<TestSnapshotCreateInput, TestSnapshotUncheckedCreateInput>
    /**
     * In case the TestSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestSnapshotUpdateInput, TestSnapshotUncheckedUpdateInput>
  }

  /**
   * TestSnapshot delete
   */
  export type TestSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSnapshot
     */
    select?: TestSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSnapshot
     */
    omit?: TestSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSnapshotInclude<ExtArgs> | null
    /**
     * Filter which TestSnapshot to delete.
     */
    where: TestSnapshotWhereUniqueInput
  }

  /**
   * TestSnapshot deleteMany
   */
  export type TestSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestSnapshots to delete
     */
    where?: TestSnapshotWhereInput
    /**
     * Limit how many TestSnapshots to delete.
     */
    limit?: number
  }

  /**
   * TestSnapshot.questions
   */
  export type TestSnapshot$questionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionSnapshot
     */
    select?: QuestionSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionSnapshot
     */
    omit?: QuestionSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionSnapshotInclude<ExtArgs> | null
    where?: QuestionSnapshotWhereInput
    orderBy?: QuestionSnapshotOrderByWithRelationInput | QuestionSnapshotOrderByWithRelationInput[]
    cursor?: QuestionSnapshotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuestionSnapshotScalarFieldEnum | QuestionSnapshotScalarFieldEnum[]
  }

  /**
   * TestSnapshot.attempts
   */
  export type TestSnapshot$attemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestAttempt
     */
    select?: TestAttemptSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestAttempt
     */
    omit?: TestAttemptOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestAttemptInclude<ExtArgs> | null
    where?: TestAttemptWhereInput
    orderBy?: TestAttemptOrderByWithRelationInput | TestAttemptOrderByWithRelationInput[]
    cursor?: TestAttemptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TestAttemptScalarFieldEnum | TestAttemptScalarFieldEnum[]
  }

  /**
   * TestSnapshot.settings
   */
  export type TestSnapshot$settingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSettingsSnapshot
     */
    select?: TestSettingsSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSettingsSnapshot
     */
    omit?: TestSettingsSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSettingsSnapshotInclude<ExtArgs> | null
    where?: TestSettingsSnapshotWhereInput
  }

  /**
   * TestSnapshot without action
   */
  export type TestSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSnapshot
     */
    select?: TestSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSnapshot
     */
    omit?: TestSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSnapshotInclude<ExtArgs> | null
  }


  /**
   * Model QuestionSnapshot
   */

  export type AggregateQuestionSnapshot = {
    _count: QuestionSnapshotCountAggregateOutputType | null
    _avg: QuestionSnapshotAvgAggregateOutputType | null
    _sum: QuestionSnapshotSumAggregateOutputType | null
    _min: QuestionSnapshotMinAggregateOutputType | null
    _max: QuestionSnapshotMaxAggregateOutputType | null
  }

  export type QuestionSnapshotAvgAggregateOutputType = {
    order: number | null
  }

  export type QuestionSnapshotSumAggregateOutputType = {
    order: number | null
  }

  export type QuestionSnapshotMinAggregateOutputType = {
    id: string | null
    testSnapshotId: string | null
    originalTestId: string | null
    text: string | null
    order: number | null
    type: $Enums.QuestionType | null
    createdAt: Date | null
  }

  export type QuestionSnapshotMaxAggregateOutputType = {
    id: string | null
    testSnapshotId: string | null
    originalTestId: string | null
    text: string | null
    order: number | null
    type: $Enums.QuestionType | null
    createdAt: Date | null
  }

  export type QuestionSnapshotCountAggregateOutputType = {
    id: number
    testSnapshotId: number
    originalTestId: number
    text: number
    order: number
    type: number
    createdAt: number
    _all: number
  }


  export type QuestionSnapshotAvgAggregateInputType = {
    order?: true
  }

  export type QuestionSnapshotSumAggregateInputType = {
    order?: true
  }

  export type QuestionSnapshotMinAggregateInputType = {
    id?: true
    testSnapshotId?: true
    originalTestId?: true
    text?: true
    order?: true
    type?: true
    createdAt?: true
  }

  export type QuestionSnapshotMaxAggregateInputType = {
    id?: true
    testSnapshotId?: true
    originalTestId?: true
    text?: true
    order?: true
    type?: true
    createdAt?: true
  }

  export type QuestionSnapshotCountAggregateInputType = {
    id?: true
    testSnapshotId?: true
    originalTestId?: true
    text?: true
    order?: true
    type?: true
    createdAt?: true
    _all?: true
  }

  export type QuestionSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuestionSnapshot to aggregate.
     */
    where?: QuestionSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionSnapshots to fetch.
     */
    orderBy?: QuestionSnapshotOrderByWithRelationInput | QuestionSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuestionSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuestionSnapshots
    **/
    _count?: true | QuestionSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuestionSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuestionSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuestionSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuestionSnapshotMaxAggregateInputType
  }

  export type GetQuestionSnapshotAggregateType<T extends QuestionSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestionSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestionSnapshot[P]>
      : GetScalarType<T[P], AggregateQuestionSnapshot[P]>
  }




  export type QuestionSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionSnapshotWhereInput
    orderBy?: QuestionSnapshotOrderByWithAggregationInput | QuestionSnapshotOrderByWithAggregationInput[]
    by: QuestionSnapshotScalarFieldEnum[] | QuestionSnapshotScalarFieldEnum
    having?: QuestionSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuestionSnapshotCountAggregateInputType | true
    _avg?: QuestionSnapshotAvgAggregateInputType
    _sum?: QuestionSnapshotSumAggregateInputType
    _min?: QuestionSnapshotMinAggregateInputType
    _max?: QuestionSnapshotMaxAggregateInputType
  }

  export type QuestionSnapshotGroupByOutputType = {
    id: string
    testSnapshotId: string
    originalTestId: string
    text: string
    order: number
    type: $Enums.QuestionType
    createdAt: Date
    _count: QuestionSnapshotCountAggregateOutputType | null
    _avg: QuestionSnapshotAvgAggregateOutputType | null
    _sum: QuestionSnapshotSumAggregateOutputType | null
    _min: QuestionSnapshotMinAggregateOutputType | null
    _max: QuestionSnapshotMaxAggregateOutputType | null
  }

  type GetQuestionSnapshotGroupByPayload<T extends QuestionSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuestionSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuestionSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuestionSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], QuestionSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type QuestionSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    testSnapshotId?: boolean
    originalTestId?: boolean
    text?: boolean
    order?: boolean
    type?: boolean
    createdAt?: boolean
    answers?: boolean | QuestionSnapshot$answersArgs<ExtArgs>
    testSnapshot?: boolean | TestSnapshotDefaultArgs<ExtArgs>
    _count?: boolean | QuestionSnapshotCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["questionSnapshot"]>

  export type QuestionSnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    testSnapshotId?: boolean
    originalTestId?: boolean
    text?: boolean
    order?: boolean
    type?: boolean
    createdAt?: boolean
    testSnapshot?: boolean | TestSnapshotDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["questionSnapshot"]>

  export type QuestionSnapshotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    testSnapshotId?: boolean
    originalTestId?: boolean
    text?: boolean
    order?: boolean
    type?: boolean
    createdAt?: boolean
    testSnapshot?: boolean | TestSnapshotDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["questionSnapshot"]>

  export type QuestionSnapshotSelectScalar = {
    id?: boolean
    testSnapshotId?: boolean
    originalTestId?: boolean
    text?: boolean
    order?: boolean
    type?: boolean
    createdAt?: boolean
  }

  export type QuestionSnapshotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "testSnapshotId" | "originalTestId" | "text" | "order" | "type" | "createdAt", ExtArgs["result"]["questionSnapshot"]>
  export type QuestionSnapshotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    answers?: boolean | QuestionSnapshot$answersArgs<ExtArgs>
    testSnapshot?: boolean | TestSnapshotDefaultArgs<ExtArgs>
    _count?: boolean | QuestionSnapshotCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QuestionSnapshotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    testSnapshot?: boolean | TestSnapshotDefaultArgs<ExtArgs>
  }
  export type QuestionSnapshotIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    testSnapshot?: boolean | TestSnapshotDefaultArgs<ExtArgs>
  }

  export type $QuestionSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuestionSnapshot"
    objects: {
      answers: Prisma.$AnswerSnapshotPayload<ExtArgs>[]
      testSnapshot: Prisma.$TestSnapshotPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      testSnapshotId: string
      originalTestId: string
      text: string
      order: number
      type: $Enums.QuestionType
      createdAt: Date
    }, ExtArgs["result"]["questionSnapshot"]>
    composites: {}
  }

  type QuestionSnapshotGetPayload<S extends boolean | null | undefined | QuestionSnapshotDefaultArgs> = $Result.GetResult<Prisma.$QuestionSnapshotPayload, S>

  type QuestionSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuestionSnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuestionSnapshotCountAggregateInputType | true
    }

  export interface QuestionSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuestionSnapshot'], meta: { name: 'QuestionSnapshot' } }
    /**
     * Find zero or one QuestionSnapshot that matches the filter.
     * @param {QuestionSnapshotFindUniqueArgs} args - Arguments to find a QuestionSnapshot
     * @example
     * // Get one QuestionSnapshot
     * const questionSnapshot = await prisma.questionSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuestionSnapshotFindUniqueArgs>(args: SelectSubset<T, QuestionSnapshotFindUniqueArgs<ExtArgs>>): Prisma__QuestionSnapshotClient<$Result.GetResult<Prisma.$QuestionSnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QuestionSnapshot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuestionSnapshotFindUniqueOrThrowArgs} args - Arguments to find a QuestionSnapshot
     * @example
     * // Get one QuestionSnapshot
     * const questionSnapshot = await prisma.questionSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuestionSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, QuestionSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuestionSnapshotClient<$Result.GetResult<Prisma.$QuestionSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuestionSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionSnapshotFindFirstArgs} args - Arguments to find a QuestionSnapshot
     * @example
     * // Get one QuestionSnapshot
     * const questionSnapshot = await prisma.questionSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuestionSnapshotFindFirstArgs>(args?: SelectSubset<T, QuestionSnapshotFindFirstArgs<ExtArgs>>): Prisma__QuestionSnapshotClient<$Result.GetResult<Prisma.$QuestionSnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuestionSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionSnapshotFindFirstOrThrowArgs} args - Arguments to find a QuestionSnapshot
     * @example
     * // Get one QuestionSnapshot
     * const questionSnapshot = await prisma.questionSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuestionSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, QuestionSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuestionSnapshotClient<$Result.GetResult<Prisma.$QuestionSnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QuestionSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuestionSnapshots
     * const questionSnapshots = await prisma.questionSnapshot.findMany()
     * 
     * // Get first 10 QuestionSnapshots
     * const questionSnapshots = await prisma.questionSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const questionSnapshotWithIdOnly = await prisma.questionSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuestionSnapshotFindManyArgs>(args?: SelectSubset<T, QuestionSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QuestionSnapshot.
     * @param {QuestionSnapshotCreateArgs} args - Arguments to create a QuestionSnapshot.
     * @example
     * // Create one QuestionSnapshot
     * const QuestionSnapshot = await prisma.questionSnapshot.create({
     *   data: {
     *     // ... data to create a QuestionSnapshot
     *   }
     * })
     * 
     */
    create<T extends QuestionSnapshotCreateArgs>(args: SelectSubset<T, QuestionSnapshotCreateArgs<ExtArgs>>): Prisma__QuestionSnapshotClient<$Result.GetResult<Prisma.$QuestionSnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QuestionSnapshots.
     * @param {QuestionSnapshotCreateManyArgs} args - Arguments to create many QuestionSnapshots.
     * @example
     * // Create many QuestionSnapshots
     * const questionSnapshot = await prisma.questionSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuestionSnapshotCreateManyArgs>(args?: SelectSubset<T, QuestionSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QuestionSnapshots and returns the data saved in the database.
     * @param {QuestionSnapshotCreateManyAndReturnArgs} args - Arguments to create many QuestionSnapshots.
     * @example
     * // Create many QuestionSnapshots
     * const questionSnapshot = await prisma.questionSnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QuestionSnapshots and only return the `id`
     * const questionSnapshotWithIdOnly = await prisma.questionSnapshot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuestionSnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, QuestionSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionSnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QuestionSnapshot.
     * @param {QuestionSnapshotDeleteArgs} args - Arguments to delete one QuestionSnapshot.
     * @example
     * // Delete one QuestionSnapshot
     * const QuestionSnapshot = await prisma.questionSnapshot.delete({
     *   where: {
     *     // ... filter to delete one QuestionSnapshot
     *   }
     * })
     * 
     */
    delete<T extends QuestionSnapshotDeleteArgs>(args: SelectSubset<T, QuestionSnapshotDeleteArgs<ExtArgs>>): Prisma__QuestionSnapshotClient<$Result.GetResult<Prisma.$QuestionSnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QuestionSnapshot.
     * @param {QuestionSnapshotUpdateArgs} args - Arguments to update one QuestionSnapshot.
     * @example
     * // Update one QuestionSnapshot
     * const questionSnapshot = await prisma.questionSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuestionSnapshotUpdateArgs>(args: SelectSubset<T, QuestionSnapshotUpdateArgs<ExtArgs>>): Prisma__QuestionSnapshotClient<$Result.GetResult<Prisma.$QuestionSnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QuestionSnapshots.
     * @param {QuestionSnapshotDeleteManyArgs} args - Arguments to filter QuestionSnapshots to delete.
     * @example
     * // Delete a few QuestionSnapshots
     * const { count } = await prisma.questionSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuestionSnapshotDeleteManyArgs>(args?: SelectSubset<T, QuestionSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuestionSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuestionSnapshots
     * const questionSnapshot = await prisma.questionSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuestionSnapshotUpdateManyArgs>(args: SelectSubset<T, QuestionSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuestionSnapshots and returns the data updated in the database.
     * @param {QuestionSnapshotUpdateManyAndReturnArgs} args - Arguments to update many QuestionSnapshots.
     * @example
     * // Update many QuestionSnapshots
     * const questionSnapshot = await prisma.questionSnapshot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QuestionSnapshots and only return the `id`
     * const questionSnapshotWithIdOnly = await prisma.questionSnapshot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QuestionSnapshotUpdateManyAndReturnArgs>(args: SelectSubset<T, QuestionSnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionSnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QuestionSnapshot.
     * @param {QuestionSnapshotUpsertArgs} args - Arguments to update or create a QuestionSnapshot.
     * @example
     * // Update or create a QuestionSnapshot
     * const questionSnapshot = await prisma.questionSnapshot.upsert({
     *   create: {
     *     // ... data to create a QuestionSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuestionSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends QuestionSnapshotUpsertArgs>(args: SelectSubset<T, QuestionSnapshotUpsertArgs<ExtArgs>>): Prisma__QuestionSnapshotClient<$Result.GetResult<Prisma.$QuestionSnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QuestionSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionSnapshotCountArgs} args - Arguments to filter QuestionSnapshots to count.
     * @example
     * // Count the number of QuestionSnapshots
     * const count = await prisma.questionSnapshot.count({
     *   where: {
     *     // ... the filter for the QuestionSnapshots we want to count
     *   }
     * })
    **/
    count<T extends QuestionSnapshotCountArgs>(
      args?: Subset<T, QuestionSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuestionSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuestionSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuestionSnapshotAggregateArgs>(args: Subset<T, QuestionSnapshotAggregateArgs>): Prisma.PrismaPromise<GetQuestionSnapshotAggregateType<T>>

    /**
     * Group by QuestionSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuestionSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuestionSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: QuestionSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuestionSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuestionSnapshot model
   */
  readonly fields: QuestionSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuestionSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuestionSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    answers<T extends QuestionSnapshot$answersArgs<ExtArgs> = {}>(args?: Subset<T, QuestionSnapshot$answersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnswerSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    testSnapshot<T extends TestSnapshotDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TestSnapshotDefaultArgs<ExtArgs>>): Prisma__TestSnapshotClient<$Result.GetResult<Prisma.$TestSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QuestionSnapshot model
   */
  interface QuestionSnapshotFieldRefs {
    readonly id: FieldRef<"QuestionSnapshot", 'String'>
    readonly testSnapshotId: FieldRef<"QuestionSnapshot", 'String'>
    readonly originalTestId: FieldRef<"QuestionSnapshot", 'String'>
    readonly text: FieldRef<"QuestionSnapshot", 'String'>
    readonly order: FieldRef<"QuestionSnapshot", 'Int'>
    readonly type: FieldRef<"QuestionSnapshot", 'QuestionType'>
    readonly createdAt: FieldRef<"QuestionSnapshot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QuestionSnapshot findUnique
   */
  export type QuestionSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionSnapshot
     */
    select?: QuestionSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionSnapshot
     */
    omit?: QuestionSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which QuestionSnapshot to fetch.
     */
    where: QuestionSnapshotWhereUniqueInput
  }

  /**
   * QuestionSnapshot findUniqueOrThrow
   */
  export type QuestionSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionSnapshot
     */
    select?: QuestionSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionSnapshot
     */
    omit?: QuestionSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which QuestionSnapshot to fetch.
     */
    where: QuestionSnapshotWhereUniqueInput
  }

  /**
   * QuestionSnapshot findFirst
   */
  export type QuestionSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionSnapshot
     */
    select?: QuestionSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionSnapshot
     */
    omit?: QuestionSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which QuestionSnapshot to fetch.
     */
    where?: QuestionSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionSnapshots to fetch.
     */
    orderBy?: QuestionSnapshotOrderByWithRelationInput | QuestionSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuestionSnapshots.
     */
    cursor?: QuestionSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuestionSnapshots.
     */
    distinct?: QuestionSnapshotScalarFieldEnum | QuestionSnapshotScalarFieldEnum[]
  }

  /**
   * QuestionSnapshot findFirstOrThrow
   */
  export type QuestionSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionSnapshot
     */
    select?: QuestionSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionSnapshot
     */
    omit?: QuestionSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which QuestionSnapshot to fetch.
     */
    where?: QuestionSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionSnapshots to fetch.
     */
    orderBy?: QuestionSnapshotOrderByWithRelationInput | QuestionSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuestionSnapshots.
     */
    cursor?: QuestionSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuestionSnapshots.
     */
    distinct?: QuestionSnapshotScalarFieldEnum | QuestionSnapshotScalarFieldEnum[]
  }

  /**
   * QuestionSnapshot findMany
   */
  export type QuestionSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionSnapshot
     */
    select?: QuestionSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionSnapshot
     */
    omit?: QuestionSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which QuestionSnapshots to fetch.
     */
    where?: QuestionSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuestionSnapshots to fetch.
     */
    orderBy?: QuestionSnapshotOrderByWithRelationInput | QuestionSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuestionSnapshots.
     */
    cursor?: QuestionSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuestionSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuestionSnapshots.
     */
    skip?: number
    distinct?: QuestionSnapshotScalarFieldEnum | QuestionSnapshotScalarFieldEnum[]
  }

  /**
   * QuestionSnapshot create
   */
  export type QuestionSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionSnapshot
     */
    select?: QuestionSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionSnapshot
     */
    omit?: QuestionSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to create a QuestionSnapshot.
     */
    data: XOR<QuestionSnapshotCreateInput, QuestionSnapshotUncheckedCreateInput>
  }

  /**
   * QuestionSnapshot createMany
   */
  export type QuestionSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuestionSnapshots.
     */
    data: QuestionSnapshotCreateManyInput | QuestionSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuestionSnapshot createManyAndReturn
   */
  export type QuestionSnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionSnapshot
     */
    select?: QuestionSnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionSnapshot
     */
    omit?: QuestionSnapshotOmit<ExtArgs> | null
    /**
     * The data used to create many QuestionSnapshots.
     */
    data: QuestionSnapshotCreateManyInput | QuestionSnapshotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionSnapshotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuestionSnapshot update
   */
  export type QuestionSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionSnapshot
     */
    select?: QuestionSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionSnapshot
     */
    omit?: QuestionSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to update a QuestionSnapshot.
     */
    data: XOR<QuestionSnapshotUpdateInput, QuestionSnapshotUncheckedUpdateInput>
    /**
     * Choose, which QuestionSnapshot to update.
     */
    where: QuestionSnapshotWhereUniqueInput
  }

  /**
   * QuestionSnapshot updateMany
   */
  export type QuestionSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuestionSnapshots.
     */
    data: XOR<QuestionSnapshotUpdateManyMutationInput, QuestionSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which QuestionSnapshots to update
     */
    where?: QuestionSnapshotWhereInput
    /**
     * Limit how many QuestionSnapshots to update.
     */
    limit?: number
  }

  /**
   * QuestionSnapshot updateManyAndReturn
   */
  export type QuestionSnapshotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionSnapshot
     */
    select?: QuestionSnapshotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionSnapshot
     */
    omit?: QuestionSnapshotOmit<ExtArgs> | null
    /**
     * The data used to update QuestionSnapshots.
     */
    data: XOR<QuestionSnapshotUpdateManyMutationInput, QuestionSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which QuestionSnapshots to update
     */
    where?: QuestionSnapshotWhereInput
    /**
     * Limit how many QuestionSnapshots to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionSnapshotIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuestionSnapshot upsert
   */
  export type QuestionSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionSnapshot
     */
    select?: QuestionSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionSnapshot
     */
    omit?: QuestionSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionSnapshotInclude<ExtArgs> | null
    /**
     * The filter to search for the QuestionSnapshot to update in case it exists.
     */
    where: QuestionSnapshotWhereUniqueInput
    /**
     * In case the QuestionSnapshot found by the `where` argument doesn't exist, create a new QuestionSnapshot with this data.
     */
    create: XOR<QuestionSnapshotCreateInput, QuestionSnapshotUncheckedCreateInput>
    /**
     * In case the QuestionSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuestionSnapshotUpdateInput, QuestionSnapshotUncheckedUpdateInput>
  }

  /**
   * QuestionSnapshot delete
   */
  export type QuestionSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionSnapshot
     */
    select?: QuestionSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionSnapshot
     */
    omit?: QuestionSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionSnapshotInclude<ExtArgs> | null
    /**
     * Filter which QuestionSnapshot to delete.
     */
    where: QuestionSnapshotWhereUniqueInput
  }

  /**
   * QuestionSnapshot deleteMany
   */
  export type QuestionSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuestionSnapshots to delete
     */
    where?: QuestionSnapshotWhereInput
    /**
     * Limit how many QuestionSnapshots to delete.
     */
    limit?: number
  }

  /**
   * QuestionSnapshot.answers
   */
  export type QuestionSnapshot$answersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerSnapshot
     */
    select?: AnswerSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnswerSnapshot
     */
    omit?: AnswerSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerSnapshotInclude<ExtArgs> | null
    where?: AnswerSnapshotWhereInput
    orderBy?: AnswerSnapshotOrderByWithRelationInput | AnswerSnapshotOrderByWithRelationInput[]
    cursor?: AnswerSnapshotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnswerSnapshotScalarFieldEnum | AnswerSnapshotScalarFieldEnum[]
  }

  /**
   * QuestionSnapshot without action
   */
  export type QuestionSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionSnapshot
     */
    select?: QuestionSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuestionSnapshot
     */
    omit?: QuestionSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionSnapshotInclude<ExtArgs> | null
  }


  /**
   * Model AnswerSnapshot
   */

  export type AggregateAnswerSnapshot = {
    _count: AnswerSnapshotCountAggregateOutputType | null
    _min: AnswerSnapshotMinAggregateOutputType | null
    _max: AnswerSnapshotMaxAggregateOutputType | null
  }

  export type AnswerSnapshotMinAggregateOutputType = {
    id: string | null
    questionId: string | null
    originalTestId: string | null
    text: string | null
    isCorrect: boolean | null
    createdAt: Date | null
  }

  export type AnswerSnapshotMaxAggregateOutputType = {
    id: string | null
    questionId: string | null
    originalTestId: string | null
    text: string | null
    isCorrect: boolean | null
    createdAt: Date | null
  }

  export type AnswerSnapshotCountAggregateOutputType = {
    id: number
    questionId: number
    originalTestId: number
    text: number
    isCorrect: number
    createdAt: number
    _all: number
  }


  export type AnswerSnapshotMinAggregateInputType = {
    id?: true
    questionId?: true
    originalTestId?: true
    text?: true
    isCorrect?: true
    createdAt?: true
  }

  export type AnswerSnapshotMaxAggregateInputType = {
    id?: true
    questionId?: true
    originalTestId?: true
    text?: true
    isCorrect?: true
    createdAt?: true
  }

  export type AnswerSnapshotCountAggregateInputType = {
    id?: true
    questionId?: true
    originalTestId?: true
    text?: true
    isCorrect?: true
    createdAt?: true
    _all?: true
  }

  export type AnswerSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnswerSnapshot to aggregate.
     */
    where?: AnswerSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnswerSnapshots to fetch.
     */
    orderBy?: AnswerSnapshotOrderByWithRelationInput | AnswerSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnswerSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnswerSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnswerSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AnswerSnapshots
    **/
    _count?: true | AnswerSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnswerSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnswerSnapshotMaxAggregateInputType
  }

  export type GetAnswerSnapshotAggregateType<T extends AnswerSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateAnswerSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnswerSnapshot[P]>
      : GetScalarType<T[P], AggregateAnswerSnapshot[P]>
  }




  export type AnswerSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnswerSnapshotWhereInput
    orderBy?: AnswerSnapshotOrderByWithAggregationInput | AnswerSnapshotOrderByWithAggregationInput[]
    by: AnswerSnapshotScalarFieldEnum[] | AnswerSnapshotScalarFieldEnum
    having?: AnswerSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnswerSnapshotCountAggregateInputType | true
    _min?: AnswerSnapshotMinAggregateInputType
    _max?: AnswerSnapshotMaxAggregateInputType
  }

  export type AnswerSnapshotGroupByOutputType = {
    id: string
    questionId: string
    originalTestId: string
    text: string
    isCorrect: boolean
    createdAt: Date
    _count: AnswerSnapshotCountAggregateOutputType | null
    _min: AnswerSnapshotMinAggregateOutputType | null
    _max: AnswerSnapshotMaxAggregateOutputType | null
  }

  type GetAnswerSnapshotGroupByPayload<T extends AnswerSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnswerSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnswerSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnswerSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], AnswerSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type AnswerSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    questionId?: boolean
    originalTestId?: boolean
    text?: boolean
    isCorrect?: boolean
    createdAt?: boolean
    question?: boolean | QuestionSnapshotDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["answerSnapshot"]>

  export type AnswerSnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    questionId?: boolean
    originalTestId?: boolean
    text?: boolean
    isCorrect?: boolean
    createdAt?: boolean
    question?: boolean | QuestionSnapshotDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["answerSnapshot"]>

  export type AnswerSnapshotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    questionId?: boolean
    originalTestId?: boolean
    text?: boolean
    isCorrect?: boolean
    createdAt?: boolean
    question?: boolean | QuestionSnapshotDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["answerSnapshot"]>

  export type AnswerSnapshotSelectScalar = {
    id?: boolean
    questionId?: boolean
    originalTestId?: boolean
    text?: boolean
    isCorrect?: boolean
    createdAt?: boolean
  }

  export type AnswerSnapshotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "questionId" | "originalTestId" | "text" | "isCorrect" | "createdAt", ExtArgs["result"]["answerSnapshot"]>
  export type AnswerSnapshotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuestionSnapshotDefaultArgs<ExtArgs>
  }
  export type AnswerSnapshotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuestionSnapshotDefaultArgs<ExtArgs>
  }
  export type AnswerSnapshotIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuestionSnapshotDefaultArgs<ExtArgs>
  }

  export type $AnswerSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AnswerSnapshot"
    objects: {
      question: Prisma.$QuestionSnapshotPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      questionId: string
      originalTestId: string
      text: string
      isCorrect: boolean
      createdAt: Date
    }, ExtArgs["result"]["answerSnapshot"]>
    composites: {}
  }

  type AnswerSnapshotGetPayload<S extends boolean | null | undefined | AnswerSnapshotDefaultArgs> = $Result.GetResult<Prisma.$AnswerSnapshotPayload, S>

  type AnswerSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AnswerSnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AnswerSnapshotCountAggregateInputType | true
    }

  export interface AnswerSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AnswerSnapshot'], meta: { name: 'AnswerSnapshot' } }
    /**
     * Find zero or one AnswerSnapshot that matches the filter.
     * @param {AnswerSnapshotFindUniqueArgs} args - Arguments to find a AnswerSnapshot
     * @example
     * // Get one AnswerSnapshot
     * const answerSnapshot = await prisma.answerSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnswerSnapshotFindUniqueArgs>(args: SelectSubset<T, AnswerSnapshotFindUniqueArgs<ExtArgs>>): Prisma__AnswerSnapshotClient<$Result.GetResult<Prisma.$AnswerSnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AnswerSnapshot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AnswerSnapshotFindUniqueOrThrowArgs} args - Arguments to find a AnswerSnapshot
     * @example
     * // Get one AnswerSnapshot
     * const answerSnapshot = await prisma.answerSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnswerSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, AnswerSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnswerSnapshotClient<$Result.GetResult<Prisma.$AnswerSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnswerSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerSnapshotFindFirstArgs} args - Arguments to find a AnswerSnapshot
     * @example
     * // Get one AnswerSnapshot
     * const answerSnapshot = await prisma.answerSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnswerSnapshotFindFirstArgs>(args?: SelectSubset<T, AnswerSnapshotFindFirstArgs<ExtArgs>>): Prisma__AnswerSnapshotClient<$Result.GetResult<Prisma.$AnswerSnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AnswerSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerSnapshotFindFirstOrThrowArgs} args - Arguments to find a AnswerSnapshot
     * @example
     * // Get one AnswerSnapshot
     * const answerSnapshot = await prisma.answerSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnswerSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, AnswerSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnswerSnapshotClient<$Result.GetResult<Prisma.$AnswerSnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AnswerSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AnswerSnapshots
     * const answerSnapshots = await prisma.answerSnapshot.findMany()
     * 
     * // Get first 10 AnswerSnapshots
     * const answerSnapshots = await prisma.answerSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const answerSnapshotWithIdOnly = await prisma.answerSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnswerSnapshotFindManyArgs>(args?: SelectSubset<T, AnswerSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnswerSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AnswerSnapshot.
     * @param {AnswerSnapshotCreateArgs} args - Arguments to create a AnswerSnapshot.
     * @example
     * // Create one AnswerSnapshot
     * const AnswerSnapshot = await prisma.answerSnapshot.create({
     *   data: {
     *     // ... data to create a AnswerSnapshot
     *   }
     * })
     * 
     */
    create<T extends AnswerSnapshotCreateArgs>(args: SelectSubset<T, AnswerSnapshotCreateArgs<ExtArgs>>): Prisma__AnswerSnapshotClient<$Result.GetResult<Prisma.$AnswerSnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AnswerSnapshots.
     * @param {AnswerSnapshotCreateManyArgs} args - Arguments to create many AnswerSnapshots.
     * @example
     * // Create many AnswerSnapshots
     * const answerSnapshot = await prisma.answerSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnswerSnapshotCreateManyArgs>(args?: SelectSubset<T, AnswerSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AnswerSnapshots and returns the data saved in the database.
     * @param {AnswerSnapshotCreateManyAndReturnArgs} args - Arguments to create many AnswerSnapshots.
     * @example
     * // Create many AnswerSnapshots
     * const answerSnapshot = await prisma.answerSnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AnswerSnapshots and only return the `id`
     * const answerSnapshotWithIdOnly = await prisma.answerSnapshot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnswerSnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, AnswerSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnswerSnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AnswerSnapshot.
     * @param {AnswerSnapshotDeleteArgs} args - Arguments to delete one AnswerSnapshot.
     * @example
     * // Delete one AnswerSnapshot
     * const AnswerSnapshot = await prisma.answerSnapshot.delete({
     *   where: {
     *     // ... filter to delete one AnswerSnapshot
     *   }
     * })
     * 
     */
    delete<T extends AnswerSnapshotDeleteArgs>(args: SelectSubset<T, AnswerSnapshotDeleteArgs<ExtArgs>>): Prisma__AnswerSnapshotClient<$Result.GetResult<Prisma.$AnswerSnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AnswerSnapshot.
     * @param {AnswerSnapshotUpdateArgs} args - Arguments to update one AnswerSnapshot.
     * @example
     * // Update one AnswerSnapshot
     * const answerSnapshot = await prisma.answerSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnswerSnapshotUpdateArgs>(args: SelectSubset<T, AnswerSnapshotUpdateArgs<ExtArgs>>): Prisma__AnswerSnapshotClient<$Result.GetResult<Prisma.$AnswerSnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AnswerSnapshots.
     * @param {AnswerSnapshotDeleteManyArgs} args - Arguments to filter AnswerSnapshots to delete.
     * @example
     * // Delete a few AnswerSnapshots
     * const { count } = await prisma.answerSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnswerSnapshotDeleteManyArgs>(args?: SelectSubset<T, AnswerSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnswerSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AnswerSnapshots
     * const answerSnapshot = await prisma.answerSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnswerSnapshotUpdateManyArgs>(args: SelectSubset<T, AnswerSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnswerSnapshots and returns the data updated in the database.
     * @param {AnswerSnapshotUpdateManyAndReturnArgs} args - Arguments to update many AnswerSnapshots.
     * @example
     * // Update many AnswerSnapshots
     * const answerSnapshot = await prisma.answerSnapshot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AnswerSnapshots and only return the `id`
     * const answerSnapshotWithIdOnly = await prisma.answerSnapshot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AnswerSnapshotUpdateManyAndReturnArgs>(args: SelectSubset<T, AnswerSnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnswerSnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AnswerSnapshot.
     * @param {AnswerSnapshotUpsertArgs} args - Arguments to update or create a AnswerSnapshot.
     * @example
     * // Update or create a AnswerSnapshot
     * const answerSnapshot = await prisma.answerSnapshot.upsert({
     *   create: {
     *     // ... data to create a AnswerSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AnswerSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends AnswerSnapshotUpsertArgs>(args: SelectSubset<T, AnswerSnapshotUpsertArgs<ExtArgs>>): Prisma__AnswerSnapshotClient<$Result.GetResult<Prisma.$AnswerSnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AnswerSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerSnapshotCountArgs} args - Arguments to filter AnswerSnapshots to count.
     * @example
     * // Count the number of AnswerSnapshots
     * const count = await prisma.answerSnapshot.count({
     *   where: {
     *     // ... the filter for the AnswerSnapshots we want to count
     *   }
     * })
    **/
    count<T extends AnswerSnapshotCountArgs>(
      args?: Subset<T, AnswerSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnswerSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AnswerSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnswerSnapshotAggregateArgs>(args: Subset<T, AnswerSnapshotAggregateArgs>): Prisma.PrismaPromise<GetAnswerSnapshotAggregateType<T>>

    /**
     * Group by AnswerSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnswerSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnswerSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnswerSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: AnswerSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnswerSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnswerSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AnswerSnapshot model
   */
  readonly fields: AnswerSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AnswerSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnswerSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    question<T extends QuestionSnapshotDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuestionSnapshotDefaultArgs<ExtArgs>>): Prisma__QuestionSnapshotClient<$Result.GetResult<Prisma.$QuestionSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AnswerSnapshot model
   */
  interface AnswerSnapshotFieldRefs {
    readonly id: FieldRef<"AnswerSnapshot", 'String'>
    readonly questionId: FieldRef<"AnswerSnapshot", 'String'>
    readonly originalTestId: FieldRef<"AnswerSnapshot", 'String'>
    readonly text: FieldRef<"AnswerSnapshot", 'String'>
    readonly isCorrect: FieldRef<"AnswerSnapshot", 'Boolean'>
    readonly createdAt: FieldRef<"AnswerSnapshot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AnswerSnapshot findUnique
   */
  export type AnswerSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerSnapshot
     */
    select?: AnswerSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnswerSnapshot
     */
    omit?: AnswerSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which AnswerSnapshot to fetch.
     */
    where: AnswerSnapshotWhereUniqueInput
  }

  /**
   * AnswerSnapshot findUniqueOrThrow
   */
  export type AnswerSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerSnapshot
     */
    select?: AnswerSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnswerSnapshot
     */
    omit?: AnswerSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which AnswerSnapshot to fetch.
     */
    where: AnswerSnapshotWhereUniqueInput
  }

  /**
   * AnswerSnapshot findFirst
   */
  export type AnswerSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerSnapshot
     */
    select?: AnswerSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnswerSnapshot
     */
    omit?: AnswerSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which AnswerSnapshot to fetch.
     */
    where?: AnswerSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnswerSnapshots to fetch.
     */
    orderBy?: AnswerSnapshotOrderByWithRelationInput | AnswerSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnswerSnapshots.
     */
    cursor?: AnswerSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnswerSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnswerSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnswerSnapshots.
     */
    distinct?: AnswerSnapshotScalarFieldEnum | AnswerSnapshotScalarFieldEnum[]
  }

  /**
   * AnswerSnapshot findFirstOrThrow
   */
  export type AnswerSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerSnapshot
     */
    select?: AnswerSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnswerSnapshot
     */
    omit?: AnswerSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which AnswerSnapshot to fetch.
     */
    where?: AnswerSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnswerSnapshots to fetch.
     */
    orderBy?: AnswerSnapshotOrderByWithRelationInput | AnswerSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnswerSnapshots.
     */
    cursor?: AnswerSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnswerSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnswerSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnswerSnapshots.
     */
    distinct?: AnswerSnapshotScalarFieldEnum | AnswerSnapshotScalarFieldEnum[]
  }

  /**
   * AnswerSnapshot findMany
   */
  export type AnswerSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerSnapshot
     */
    select?: AnswerSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnswerSnapshot
     */
    omit?: AnswerSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which AnswerSnapshots to fetch.
     */
    where?: AnswerSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnswerSnapshots to fetch.
     */
    orderBy?: AnswerSnapshotOrderByWithRelationInput | AnswerSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AnswerSnapshots.
     */
    cursor?: AnswerSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnswerSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnswerSnapshots.
     */
    skip?: number
    distinct?: AnswerSnapshotScalarFieldEnum | AnswerSnapshotScalarFieldEnum[]
  }

  /**
   * AnswerSnapshot create
   */
  export type AnswerSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerSnapshot
     */
    select?: AnswerSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnswerSnapshot
     */
    omit?: AnswerSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to create a AnswerSnapshot.
     */
    data: XOR<AnswerSnapshotCreateInput, AnswerSnapshotUncheckedCreateInput>
  }

  /**
   * AnswerSnapshot createMany
   */
  export type AnswerSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AnswerSnapshots.
     */
    data: AnswerSnapshotCreateManyInput | AnswerSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AnswerSnapshot createManyAndReturn
   */
  export type AnswerSnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerSnapshot
     */
    select?: AnswerSnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnswerSnapshot
     */
    omit?: AnswerSnapshotOmit<ExtArgs> | null
    /**
     * The data used to create many AnswerSnapshots.
     */
    data: AnswerSnapshotCreateManyInput | AnswerSnapshotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerSnapshotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AnswerSnapshot update
   */
  export type AnswerSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerSnapshot
     */
    select?: AnswerSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnswerSnapshot
     */
    omit?: AnswerSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to update a AnswerSnapshot.
     */
    data: XOR<AnswerSnapshotUpdateInput, AnswerSnapshotUncheckedUpdateInput>
    /**
     * Choose, which AnswerSnapshot to update.
     */
    where: AnswerSnapshotWhereUniqueInput
  }

  /**
   * AnswerSnapshot updateMany
   */
  export type AnswerSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AnswerSnapshots.
     */
    data: XOR<AnswerSnapshotUpdateManyMutationInput, AnswerSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which AnswerSnapshots to update
     */
    where?: AnswerSnapshotWhereInput
    /**
     * Limit how many AnswerSnapshots to update.
     */
    limit?: number
  }

  /**
   * AnswerSnapshot updateManyAndReturn
   */
  export type AnswerSnapshotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerSnapshot
     */
    select?: AnswerSnapshotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AnswerSnapshot
     */
    omit?: AnswerSnapshotOmit<ExtArgs> | null
    /**
     * The data used to update AnswerSnapshots.
     */
    data: XOR<AnswerSnapshotUpdateManyMutationInput, AnswerSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which AnswerSnapshots to update
     */
    where?: AnswerSnapshotWhereInput
    /**
     * Limit how many AnswerSnapshots to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerSnapshotIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AnswerSnapshot upsert
   */
  export type AnswerSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerSnapshot
     */
    select?: AnswerSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnswerSnapshot
     */
    omit?: AnswerSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerSnapshotInclude<ExtArgs> | null
    /**
     * The filter to search for the AnswerSnapshot to update in case it exists.
     */
    where: AnswerSnapshotWhereUniqueInput
    /**
     * In case the AnswerSnapshot found by the `where` argument doesn't exist, create a new AnswerSnapshot with this data.
     */
    create: XOR<AnswerSnapshotCreateInput, AnswerSnapshotUncheckedCreateInput>
    /**
     * In case the AnswerSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnswerSnapshotUpdateInput, AnswerSnapshotUncheckedUpdateInput>
  }

  /**
   * AnswerSnapshot delete
   */
  export type AnswerSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerSnapshot
     */
    select?: AnswerSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnswerSnapshot
     */
    omit?: AnswerSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerSnapshotInclude<ExtArgs> | null
    /**
     * Filter which AnswerSnapshot to delete.
     */
    where: AnswerSnapshotWhereUniqueInput
  }

  /**
   * AnswerSnapshot deleteMany
   */
  export type AnswerSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnswerSnapshots to delete
     */
    where?: AnswerSnapshotWhereInput
    /**
     * Limit how many AnswerSnapshots to delete.
     */
    limit?: number
  }

  /**
   * AnswerSnapshot without action
   */
  export type AnswerSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnswerSnapshot
     */
    select?: AnswerSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AnswerSnapshot
     */
    omit?: AnswerSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnswerSnapshotInclude<ExtArgs> | null
  }


  /**
   * Model TestSettingsSnapshot
   */

  export type AggregateTestSettingsSnapshot = {
    _count: TestSettingsSnapshotCountAggregateOutputType | null
    _avg: TestSettingsSnapshotAvgAggregateOutputType | null
    _sum: TestSettingsSnapshotSumAggregateOutputType | null
    _min: TestSettingsSnapshotMinAggregateOutputType | null
    _max: TestSettingsSnapshotMaxAggregateOutputType | null
  }

  export type TestSettingsSnapshotAvgAggregateOutputType = {
    timeLimit: number | null
  }

  export type TestSettingsSnapshotSumAggregateOutputType = {
    timeLimit: number | null
  }

  export type TestSettingsSnapshotMinAggregateOutputType = {
    id: string | null
    testSnapshotId: string | null
    requireRegistration: boolean | null
    showDetailedResults: boolean | null
    shuffleQuestions: boolean | null
    shuffleAnswers: boolean | null
    timeLimit: number | null
    createdAt: Date | null
  }

  export type TestSettingsSnapshotMaxAggregateOutputType = {
    id: string | null
    testSnapshotId: string | null
    requireRegistration: boolean | null
    showDetailedResults: boolean | null
    shuffleQuestions: boolean | null
    shuffleAnswers: boolean | null
    timeLimit: number | null
    createdAt: Date | null
  }

  export type TestSettingsSnapshotCountAggregateOutputType = {
    id: number
    testSnapshotId: number
    requireRegistration: number
    inputFields: number
    showDetailedResults: number
    shuffleQuestions: number
    shuffleAnswers: number
    timeLimit: number
    createdAt: number
    _all: number
  }


  export type TestSettingsSnapshotAvgAggregateInputType = {
    timeLimit?: true
  }

  export type TestSettingsSnapshotSumAggregateInputType = {
    timeLimit?: true
  }

  export type TestSettingsSnapshotMinAggregateInputType = {
    id?: true
    testSnapshotId?: true
    requireRegistration?: true
    showDetailedResults?: true
    shuffleQuestions?: true
    shuffleAnswers?: true
    timeLimit?: true
    createdAt?: true
  }

  export type TestSettingsSnapshotMaxAggregateInputType = {
    id?: true
    testSnapshotId?: true
    requireRegistration?: true
    showDetailedResults?: true
    shuffleQuestions?: true
    shuffleAnswers?: true
    timeLimit?: true
    createdAt?: true
  }

  export type TestSettingsSnapshotCountAggregateInputType = {
    id?: true
    testSnapshotId?: true
    requireRegistration?: true
    inputFields?: true
    showDetailedResults?: true
    shuffleQuestions?: true
    shuffleAnswers?: true
    timeLimit?: true
    createdAt?: true
    _all?: true
  }

  export type TestSettingsSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestSettingsSnapshot to aggregate.
     */
    where?: TestSettingsSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestSettingsSnapshots to fetch.
     */
    orderBy?: TestSettingsSnapshotOrderByWithRelationInput | TestSettingsSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestSettingsSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestSettingsSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestSettingsSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TestSettingsSnapshots
    **/
    _count?: true | TestSettingsSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TestSettingsSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TestSettingsSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestSettingsSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestSettingsSnapshotMaxAggregateInputType
  }

  export type GetTestSettingsSnapshotAggregateType<T extends TestSettingsSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateTestSettingsSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTestSettingsSnapshot[P]>
      : GetScalarType<T[P], AggregateTestSettingsSnapshot[P]>
  }




  export type TestSettingsSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestSettingsSnapshotWhereInput
    orderBy?: TestSettingsSnapshotOrderByWithAggregationInput | TestSettingsSnapshotOrderByWithAggregationInput[]
    by: TestSettingsSnapshotScalarFieldEnum[] | TestSettingsSnapshotScalarFieldEnum
    having?: TestSettingsSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestSettingsSnapshotCountAggregateInputType | true
    _avg?: TestSettingsSnapshotAvgAggregateInputType
    _sum?: TestSettingsSnapshotSumAggregateInputType
    _min?: TestSettingsSnapshotMinAggregateInputType
    _max?: TestSettingsSnapshotMaxAggregateInputType
  }

  export type TestSettingsSnapshotGroupByOutputType = {
    id: string
    testSnapshotId: string
    requireRegistration: boolean
    inputFields: JsonValue | null
    showDetailedResults: boolean
    shuffleQuestions: boolean
    shuffleAnswers: boolean
    timeLimit: number | null
    createdAt: Date
    _count: TestSettingsSnapshotCountAggregateOutputType | null
    _avg: TestSettingsSnapshotAvgAggregateOutputType | null
    _sum: TestSettingsSnapshotSumAggregateOutputType | null
    _min: TestSettingsSnapshotMinAggregateOutputType | null
    _max: TestSettingsSnapshotMaxAggregateOutputType | null
  }

  type GetTestSettingsSnapshotGroupByPayload<T extends TestSettingsSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestSettingsSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestSettingsSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestSettingsSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], TestSettingsSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type TestSettingsSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    testSnapshotId?: boolean
    requireRegistration?: boolean
    inputFields?: boolean
    showDetailedResults?: boolean
    shuffleQuestions?: boolean
    shuffleAnswers?: boolean
    timeLimit?: boolean
    createdAt?: boolean
    snapshot?: boolean | TestSnapshotDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testSettingsSnapshot"]>

  export type TestSettingsSnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    testSnapshotId?: boolean
    requireRegistration?: boolean
    inputFields?: boolean
    showDetailedResults?: boolean
    shuffleQuestions?: boolean
    shuffleAnswers?: boolean
    timeLimit?: boolean
    createdAt?: boolean
    snapshot?: boolean | TestSnapshotDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testSettingsSnapshot"]>

  export type TestSettingsSnapshotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    testSnapshotId?: boolean
    requireRegistration?: boolean
    inputFields?: boolean
    showDetailedResults?: boolean
    shuffleQuestions?: boolean
    shuffleAnswers?: boolean
    timeLimit?: boolean
    createdAt?: boolean
    snapshot?: boolean | TestSnapshotDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testSettingsSnapshot"]>

  export type TestSettingsSnapshotSelectScalar = {
    id?: boolean
    testSnapshotId?: boolean
    requireRegistration?: boolean
    inputFields?: boolean
    showDetailedResults?: boolean
    shuffleQuestions?: boolean
    shuffleAnswers?: boolean
    timeLimit?: boolean
    createdAt?: boolean
  }

  export type TestSettingsSnapshotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "testSnapshotId" | "requireRegistration" | "inputFields" | "showDetailedResults" | "shuffleQuestions" | "shuffleAnswers" | "timeLimit" | "createdAt", ExtArgs["result"]["testSettingsSnapshot"]>
  export type TestSettingsSnapshotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    snapshot?: boolean | TestSnapshotDefaultArgs<ExtArgs>
  }
  export type TestSettingsSnapshotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    snapshot?: boolean | TestSnapshotDefaultArgs<ExtArgs>
  }
  export type TestSettingsSnapshotIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    snapshot?: boolean | TestSnapshotDefaultArgs<ExtArgs>
  }

  export type $TestSettingsSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TestSettingsSnapshot"
    objects: {
      snapshot: Prisma.$TestSnapshotPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      testSnapshotId: string
      requireRegistration: boolean
      inputFields: Prisma.JsonValue | null
      showDetailedResults: boolean
      shuffleQuestions: boolean
      shuffleAnswers: boolean
      timeLimit: number | null
      createdAt: Date
    }, ExtArgs["result"]["testSettingsSnapshot"]>
    composites: {}
  }

  type TestSettingsSnapshotGetPayload<S extends boolean | null | undefined | TestSettingsSnapshotDefaultArgs> = $Result.GetResult<Prisma.$TestSettingsSnapshotPayload, S>

  type TestSettingsSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestSettingsSnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestSettingsSnapshotCountAggregateInputType | true
    }

  export interface TestSettingsSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TestSettingsSnapshot'], meta: { name: 'TestSettingsSnapshot' } }
    /**
     * Find zero or one TestSettingsSnapshot that matches the filter.
     * @param {TestSettingsSnapshotFindUniqueArgs} args - Arguments to find a TestSettingsSnapshot
     * @example
     * // Get one TestSettingsSnapshot
     * const testSettingsSnapshot = await prisma.testSettingsSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestSettingsSnapshotFindUniqueArgs>(args: SelectSubset<T, TestSettingsSnapshotFindUniqueArgs<ExtArgs>>): Prisma__TestSettingsSnapshotClient<$Result.GetResult<Prisma.$TestSettingsSnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TestSettingsSnapshot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestSettingsSnapshotFindUniqueOrThrowArgs} args - Arguments to find a TestSettingsSnapshot
     * @example
     * // Get one TestSettingsSnapshot
     * const testSettingsSnapshot = await prisma.testSettingsSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestSettingsSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, TestSettingsSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestSettingsSnapshotClient<$Result.GetResult<Prisma.$TestSettingsSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestSettingsSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestSettingsSnapshotFindFirstArgs} args - Arguments to find a TestSettingsSnapshot
     * @example
     * // Get one TestSettingsSnapshot
     * const testSettingsSnapshot = await prisma.testSettingsSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestSettingsSnapshotFindFirstArgs>(args?: SelectSubset<T, TestSettingsSnapshotFindFirstArgs<ExtArgs>>): Prisma__TestSettingsSnapshotClient<$Result.GetResult<Prisma.$TestSettingsSnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TestSettingsSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestSettingsSnapshotFindFirstOrThrowArgs} args - Arguments to find a TestSettingsSnapshot
     * @example
     * // Get one TestSettingsSnapshot
     * const testSettingsSnapshot = await prisma.testSettingsSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestSettingsSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, TestSettingsSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestSettingsSnapshotClient<$Result.GetResult<Prisma.$TestSettingsSnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TestSettingsSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestSettingsSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TestSettingsSnapshots
     * const testSettingsSnapshots = await prisma.testSettingsSnapshot.findMany()
     * 
     * // Get first 10 TestSettingsSnapshots
     * const testSettingsSnapshots = await prisma.testSettingsSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testSettingsSnapshotWithIdOnly = await prisma.testSettingsSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestSettingsSnapshotFindManyArgs>(args?: SelectSubset<T, TestSettingsSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestSettingsSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TestSettingsSnapshot.
     * @param {TestSettingsSnapshotCreateArgs} args - Arguments to create a TestSettingsSnapshot.
     * @example
     * // Create one TestSettingsSnapshot
     * const TestSettingsSnapshot = await prisma.testSettingsSnapshot.create({
     *   data: {
     *     // ... data to create a TestSettingsSnapshot
     *   }
     * })
     * 
     */
    create<T extends TestSettingsSnapshotCreateArgs>(args: SelectSubset<T, TestSettingsSnapshotCreateArgs<ExtArgs>>): Prisma__TestSettingsSnapshotClient<$Result.GetResult<Prisma.$TestSettingsSnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TestSettingsSnapshots.
     * @param {TestSettingsSnapshotCreateManyArgs} args - Arguments to create many TestSettingsSnapshots.
     * @example
     * // Create many TestSettingsSnapshots
     * const testSettingsSnapshot = await prisma.testSettingsSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestSettingsSnapshotCreateManyArgs>(args?: SelectSubset<T, TestSettingsSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TestSettingsSnapshots and returns the data saved in the database.
     * @param {TestSettingsSnapshotCreateManyAndReturnArgs} args - Arguments to create many TestSettingsSnapshots.
     * @example
     * // Create many TestSettingsSnapshots
     * const testSettingsSnapshot = await prisma.testSettingsSnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TestSettingsSnapshots and only return the `id`
     * const testSettingsSnapshotWithIdOnly = await prisma.testSettingsSnapshot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TestSettingsSnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, TestSettingsSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestSettingsSnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TestSettingsSnapshot.
     * @param {TestSettingsSnapshotDeleteArgs} args - Arguments to delete one TestSettingsSnapshot.
     * @example
     * // Delete one TestSettingsSnapshot
     * const TestSettingsSnapshot = await prisma.testSettingsSnapshot.delete({
     *   where: {
     *     // ... filter to delete one TestSettingsSnapshot
     *   }
     * })
     * 
     */
    delete<T extends TestSettingsSnapshotDeleteArgs>(args: SelectSubset<T, TestSettingsSnapshotDeleteArgs<ExtArgs>>): Prisma__TestSettingsSnapshotClient<$Result.GetResult<Prisma.$TestSettingsSnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TestSettingsSnapshot.
     * @param {TestSettingsSnapshotUpdateArgs} args - Arguments to update one TestSettingsSnapshot.
     * @example
     * // Update one TestSettingsSnapshot
     * const testSettingsSnapshot = await prisma.testSettingsSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestSettingsSnapshotUpdateArgs>(args: SelectSubset<T, TestSettingsSnapshotUpdateArgs<ExtArgs>>): Prisma__TestSettingsSnapshotClient<$Result.GetResult<Prisma.$TestSettingsSnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TestSettingsSnapshots.
     * @param {TestSettingsSnapshotDeleteManyArgs} args - Arguments to filter TestSettingsSnapshots to delete.
     * @example
     * // Delete a few TestSettingsSnapshots
     * const { count } = await prisma.testSettingsSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestSettingsSnapshotDeleteManyArgs>(args?: SelectSubset<T, TestSettingsSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestSettingsSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestSettingsSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TestSettingsSnapshots
     * const testSettingsSnapshot = await prisma.testSettingsSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestSettingsSnapshotUpdateManyArgs>(args: SelectSubset<T, TestSettingsSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TestSettingsSnapshots and returns the data updated in the database.
     * @param {TestSettingsSnapshotUpdateManyAndReturnArgs} args - Arguments to update many TestSettingsSnapshots.
     * @example
     * // Update many TestSettingsSnapshots
     * const testSettingsSnapshot = await prisma.testSettingsSnapshot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TestSettingsSnapshots and only return the `id`
     * const testSettingsSnapshotWithIdOnly = await prisma.testSettingsSnapshot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TestSettingsSnapshotUpdateManyAndReturnArgs>(args: SelectSubset<T, TestSettingsSnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestSettingsSnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TestSettingsSnapshot.
     * @param {TestSettingsSnapshotUpsertArgs} args - Arguments to update or create a TestSettingsSnapshot.
     * @example
     * // Update or create a TestSettingsSnapshot
     * const testSettingsSnapshot = await prisma.testSettingsSnapshot.upsert({
     *   create: {
     *     // ... data to create a TestSettingsSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TestSettingsSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends TestSettingsSnapshotUpsertArgs>(args: SelectSubset<T, TestSettingsSnapshotUpsertArgs<ExtArgs>>): Prisma__TestSettingsSnapshotClient<$Result.GetResult<Prisma.$TestSettingsSnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TestSettingsSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestSettingsSnapshotCountArgs} args - Arguments to filter TestSettingsSnapshots to count.
     * @example
     * // Count the number of TestSettingsSnapshots
     * const count = await prisma.testSettingsSnapshot.count({
     *   where: {
     *     // ... the filter for the TestSettingsSnapshots we want to count
     *   }
     * })
    **/
    count<T extends TestSettingsSnapshotCountArgs>(
      args?: Subset<T, TestSettingsSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestSettingsSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TestSettingsSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestSettingsSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TestSettingsSnapshotAggregateArgs>(args: Subset<T, TestSettingsSnapshotAggregateArgs>): Prisma.PrismaPromise<GetTestSettingsSnapshotAggregateType<T>>

    /**
     * Group by TestSettingsSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestSettingsSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TestSettingsSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestSettingsSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: TestSettingsSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TestSettingsSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestSettingsSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TestSettingsSnapshot model
   */
  readonly fields: TestSettingsSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TestSettingsSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestSettingsSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    snapshot<T extends TestSnapshotDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TestSnapshotDefaultArgs<ExtArgs>>): Prisma__TestSnapshotClient<$Result.GetResult<Prisma.$TestSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TestSettingsSnapshot model
   */
  interface TestSettingsSnapshotFieldRefs {
    readonly id: FieldRef<"TestSettingsSnapshot", 'String'>
    readonly testSnapshotId: FieldRef<"TestSettingsSnapshot", 'String'>
    readonly requireRegistration: FieldRef<"TestSettingsSnapshot", 'Boolean'>
    readonly inputFields: FieldRef<"TestSettingsSnapshot", 'Json'>
    readonly showDetailedResults: FieldRef<"TestSettingsSnapshot", 'Boolean'>
    readonly shuffleQuestions: FieldRef<"TestSettingsSnapshot", 'Boolean'>
    readonly shuffleAnswers: FieldRef<"TestSettingsSnapshot", 'Boolean'>
    readonly timeLimit: FieldRef<"TestSettingsSnapshot", 'Int'>
    readonly createdAt: FieldRef<"TestSettingsSnapshot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TestSettingsSnapshot findUnique
   */
  export type TestSettingsSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSettingsSnapshot
     */
    select?: TestSettingsSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSettingsSnapshot
     */
    omit?: TestSettingsSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSettingsSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which TestSettingsSnapshot to fetch.
     */
    where: TestSettingsSnapshotWhereUniqueInput
  }

  /**
   * TestSettingsSnapshot findUniqueOrThrow
   */
  export type TestSettingsSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSettingsSnapshot
     */
    select?: TestSettingsSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSettingsSnapshot
     */
    omit?: TestSettingsSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSettingsSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which TestSettingsSnapshot to fetch.
     */
    where: TestSettingsSnapshotWhereUniqueInput
  }

  /**
   * TestSettingsSnapshot findFirst
   */
  export type TestSettingsSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSettingsSnapshot
     */
    select?: TestSettingsSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSettingsSnapshot
     */
    omit?: TestSettingsSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSettingsSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which TestSettingsSnapshot to fetch.
     */
    where?: TestSettingsSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestSettingsSnapshots to fetch.
     */
    orderBy?: TestSettingsSnapshotOrderByWithRelationInput | TestSettingsSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestSettingsSnapshots.
     */
    cursor?: TestSettingsSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestSettingsSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestSettingsSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestSettingsSnapshots.
     */
    distinct?: TestSettingsSnapshotScalarFieldEnum | TestSettingsSnapshotScalarFieldEnum[]
  }

  /**
   * TestSettingsSnapshot findFirstOrThrow
   */
  export type TestSettingsSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSettingsSnapshot
     */
    select?: TestSettingsSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSettingsSnapshot
     */
    omit?: TestSettingsSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSettingsSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which TestSettingsSnapshot to fetch.
     */
    where?: TestSettingsSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestSettingsSnapshots to fetch.
     */
    orderBy?: TestSettingsSnapshotOrderByWithRelationInput | TestSettingsSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TestSettingsSnapshots.
     */
    cursor?: TestSettingsSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestSettingsSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestSettingsSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TestSettingsSnapshots.
     */
    distinct?: TestSettingsSnapshotScalarFieldEnum | TestSettingsSnapshotScalarFieldEnum[]
  }

  /**
   * TestSettingsSnapshot findMany
   */
  export type TestSettingsSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSettingsSnapshot
     */
    select?: TestSettingsSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSettingsSnapshot
     */
    omit?: TestSettingsSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSettingsSnapshotInclude<ExtArgs> | null
    /**
     * Filter, which TestSettingsSnapshots to fetch.
     */
    where?: TestSettingsSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TestSettingsSnapshots to fetch.
     */
    orderBy?: TestSettingsSnapshotOrderByWithRelationInput | TestSettingsSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TestSettingsSnapshots.
     */
    cursor?: TestSettingsSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TestSettingsSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TestSettingsSnapshots.
     */
    skip?: number
    distinct?: TestSettingsSnapshotScalarFieldEnum | TestSettingsSnapshotScalarFieldEnum[]
  }

  /**
   * TestSettingsSnapshot create
   */
  export type TestSettingsSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSettingsSnapshot
     */
    select?: TestSettingsSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSettingsSnapshot
     */
    omit?: TestSettingsSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSettingsSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to create a TestSettingsSnapshot.
     */
    data: XOR<TestSettingsSnapshotCreateInput, TestSettingsSnapshotUncheckedCreateInput>
  }

  /**
   * TestSettingsSnapshot createMany
   */
  export type TestSettingsSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TestSettingsSnapshots.
     */
    data: TestSettingsSnapshotCreateManyInput | TestSettingsSnapshotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TestSettingsSnapshot createManyAndReturn
   */
  export type TestSettingsSnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSettingsSnapshot
     */
    select?: TestSettingsSnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestSettingsSnapshot
     */
    omit?: TestSettingsSnapshotOmit<ExtArgs> | null
    /**
     * The data used to create many TestSettingsSnapshots.
     */
    data: TestSettingsSnapshotCreateManyInput | TestSettingsSnapshotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSettingsSnapshotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestSettingsSnapshot update
   */
  export type TestSettingsSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSettingsSnapshot
     */
    select?: TestSettingsSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSettingsSnapshot
     */
    omit?: TestSettingsSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSettingsSnapshotInclude<ExtArgs> | null
    /**
     * The data needed to update a TestSettingsSnapshot.
     */
    data: XOR<TestSettingsSnapshotUpdateInput, TestSettingsSnapshotUncheckedUpdateInput>
    /**
     * Choose, which TestSettingsSnapshot to update.
     */
    where: TestSettingsSnapshotWhereUniqueInput
  }

  /**
   * TestSettingsSnapshot updateMany
   */
  export type TestSettingsSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TestSettingsSnapshots.
     */
    data: XOR<TestSettingsSnapshotUpdateManyMutationInput, TestSettingsSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which TestSettingsSnapshots to update
     */
    where?: TestSettingsSnapshotWhereInput
    /**
     * Limit how many TestSettingsSnapshots to update.
     */
    limit?: number
  }

  /**
   * TestSettingsSnapshot updateManyAndReturn
   */
  export type TestSettingsSnapshotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSettingsSnapshot
     */
    select?: TestSettingsSnapshotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TestSettingsSnapshot
     */
    omit?: TestSettingsSnapshotOmit<ExtArgs> | null
    /**
     * The data used to update TestSettingsSnapshots.
     */
    data: XOR<TestSettingsSnapshotUpdateManyMutationInput, TestSettingsSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which TestSettingsSnapshots to update
     */
    where?: TestSettingsSnapshotWhereInput
    /**
     * Limit how many TestSettingsSnapshots to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSettingsSnapshotIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TestSettingsSnapshot upsert
   */
  export type TestSettingsSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSettingsSnapshot
     */
    select?: TestSettingsSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSettingsSnapshot
     */
    omit?: TestSettingsSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSettingsSnapshotInclude<ExtArgs> | null
    /**
     * The filter to search for the TestSettingsSnapshot to update in case it exists.
     */
    where: TestSettingsSnapshotWhereUniqueInput
    /**
     * In case the TestSettingsSnapshot found by the `where` argument doesn't exist, create a new TestSettingsSnapshot with this data.
     */
    create: XOR<TestSettingsSnapshotCreateInput, TestSettingsSnapshotUncheckedCreateInput>
    /**
     * In case the TestSettingsSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestSettingsSnapshotUpdateInput, TestSettingsSnapshotUncheckedUpdateInput>
  }

  /**
   * TestSettingsSnapshot delete
   */
  export type TestSettingsSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSettingsSnapshot
     */
    select?: TestSettingsSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSettingsSnapshot
     */
    omit?: TestSettingsSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSettingsSnapshotInclude<ExtArgs> | null
    /**
     * Filter which TestSettingsSnapshot to delete.
     */
    where: TestSettingsSnapshotWhereUniqueInput
  }

  /**
   * TestSettingsSnapshot deleteMany
   */
  export type TestSettingsSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TestSettingsSnapshots to delete
     */
    where?: TestSettingsSnapshotWhereInput
    /**
     * Limit how many TestSettingsSnapshots to delete.
     */
    limit?: number
  }

  /**
   * TestSettingsSnapshot without action
   */
  export type TestSettingsSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TestSettingsSnapshot
     */
    select?: TestSettingsSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TestSettingsSnapshot
     */
    omit?: TestSettingsSnapshotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestSettingsSnapshotInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    surname: 'surname',
    patronymic: 'patronymic',
    password: 'password',
    isActivated: 'isActivated',
    role: 'role',
    activationLink: 'activationLink',
    resetCode: 'resetCode',
    isBlocked: 'isBlocked',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    activationLinkExp: 'activationLinkExp',
    resetCodeExp: 'resetCodeExp'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TokenScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    refreshToken: 'refreshToken',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TokenScalarFieldEnum = (typeof TokenScalarFieldEnum)[keyof typeof TokenScalarFieldEnum]


  export const TestSettingsScalarFieldEnum: {
    id: 'id',
    testId: 'testId',
    requireRegistration: 'requireRegistration',
    inputFields: 'inputFields',
    showDetailedResults: 'showDetailedResults',
    timeLimit: 'timeLimit',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    shuffleAnswers: 'shuffleAnswers',
    shuffleQuestions: 'shuffleQuestions'
  };

  export type TestSettingsScalarFieldEnum = (typeof TestSettingsScalarFieldEnum)[keyof typeof TestSettingsScalarFieldEnum]


  export const TestScalarFieldEnum: {
    id: 'id',
    authorId: 'authorId',
    title: 'title',
    description: 'description',
    status: 'status',
    totalAttempts: 'totalAttempts',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    version: 'version',
    visibilityStatus: 'visibilityStatus'
  };

  export type TestScalarFieldEnum = (typeof TestScalarFieldEnum)[keyof typeof TestScalarFieldEnum]


  export const QuestionScalarFieldEnum: {
    id: 'id',
    testId: 'testId',
    text: 'text',
    order: 'order',
    type: 'type',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type QuestionScalarFieldEnum = (typeof QuestionScalarFieldEnum)[keyof typeof QuestionScalarFieldEnum]


  export const AnswerScalarFieldEnum: {
    id: 'id',
    questionId: 'questionId',
    text: 'text',
    isCorrect: 'isCorrect',
    isGenerated: 'isGenerated',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AnswerScalarFieldEnum = (typeof AnswerScalarFieldEnum)[keyof typeof AnswerScalarFieldEnum]


  export const TestAttemptScalarFieldEnum: {
    id: 'id',
    testId: 'testId',
    userId: 'userId',
    preTestUserData: 'preTestUserData',
    score: 'score',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    status: 'status',
    updatedAt: 'updatedAt',
    testSnapshotId: 'testSnapshotId',
    expirationTime: 'expirationTime'
  };

  export type TestAttemptScalarFieldEnum = (typeof TestAttemptScalarFieldEnum)[keyof typeof TestAttemptScalarFieldEnum]


  export const UserAnswerScalarFieldEnum: {
    id: 'id',
    attemptId: 'attemptId',
    questionId: 'questionId',
    answerId: 'answerId',
    answeredAt: 'answeredAt',
    timeSpent: 'timeSpent',
    createdAt: 'createdAt'
  };

  export type UserAnswerScalarFieldEnum = (typeof UserAnswerScalarFieldEnum)[keyof typeof UserAnswerScalarFieldEnum]


  export const TestSnapshotScalarFieldEnum: {
    id: 'id',
    testId: 'testId',
    title: 'title',
    description: 'description',
    status: 'status',
    createdAt: 'createdAt',
    version: 'version',
    visibilityStatus: 'visibilityStatus'
  };

  export type TestSnapshotScalarFieldEnum = (typeof TestSnapshotScalarFieldEnum)[keyof typeof TestSnapshotScalarFieldEnum]


  export const QuestionSnapshotScalarFieldEnum: {
    id: 'id',
    testSnapshotId: 'testSnapshotId',
    originalTestId: 'originalTestId',
    text: 'text',
    order: 'order',
    type: 'type',
    createdAt: 'createdAt'
  };

  export type QuestionSnapshotScalarFieldEnum = (typeof QuestionSnapshotScalarFieldEnum)[keyof typeof QuestionSnapshotScalarFieldEnum]


  export const AnswerSnapshotScalarFieldEnum: {
    id: 'id',
    questionId: 'questionId',
    originalTestId: 'originalTestId',
    text: 'text',
    isCorrect: 'isCorrect',
    createdAt: 'createdAt'
  };

  export type AnswerSnapshotScalarFieldEnum = (typeof AnswerSnapshotScalarFieldEnum)[keyof typeof AnswerSnapshotScalarFieldEnum]


  export const TestSettingsSnapshotScalarFieldEnum: {
    id: 'id',
    testSnapshotId: 'testSnapshotId',
    requireRegistration: 'requireRegistration',
    inputFields: 'inputFields',
    showDetailedResults: 'showDetailedResults',
    shuffleQuestions: 'shuffleQuestions',
    shuffleAnswers: 'shuffleAnswers',
    timeLimit: 'timeLimit',
    createdAt: 'createdAt'
  };

  export type TestSettingsSnapshotScalarFieldEnum = (typeof TestSettingsSnapshotScalarFieldEnum)[keyof typeof TestSettingsSnapshotScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'ModerationStatus'
   */
  export type EnumModerationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ModerationStatus'>
    


  /**
   * Reference to a field of type 'ModerationStatus[]'
   */
  export type ListEnumModerationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ModerationStatus[]'>
    


  /**
   * Reference to a field of type 'TestVisibilityStatus'
   */
  export type EnumTestVisibilityStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TestVisibilityStatus'>
    


  /**
   * Reference to a field of type 'TestVisibilityStatus[]'
   */
  export type ListEnumTestVisibilityStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TestVisibilityStatus[]'>
    


  /**
   * Reference to a field of type 'QuestionType'
   */
  export type EnumQuestionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionType'>
    


  /**
   * Reference to a field of type 'QuestionType[]'
   */
  export type ListEnumQuestionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'TestAttemptStatus'
   */
  export type EnumTestAttemptStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TestAttemptStatus'>
    


  /**
   * Reference to a field of type 'TestAttemptStatus[]'
   */
  export type ListEnumTestAttemptStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TestAttemptStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    surname?: StringNullableFilter<"User"> | string | null
    patronymic?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    isActivated?: BoolFilter<"User"> | boolean
    role?: EnumRoleFilter<"User"> | $Enums.Role
    activationLink?: StringNullableFilter<"User"> | string | null
    resetCode?: StringNullableFilter<"User"> | string | null
    isBlocked?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    activationLinkExp?: DateTimeNullableFilter<"User"> | Date | string | null
    resetCodeExp?: DateTimeNullableFilter<"User"> | Date | string | null
    testAttempts?: TestAttemptListRelationFilter
    testsCreated?: TestListRelationFilter
    refreshToken?: XOR<TokenNullableScalarRelationFilter, TokenWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    surname?: SortOrderInput | SortOrder
    patronymic?: SortOrderInput | SortOrder
    password?: SortOrder
    isActivated?: SortOrder
    role?: SortOrder
    activationLink?: SortOrderInput | SortOrder
    resetCode?: SortOrderInput | SortOrder
    isBlocked?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    activationLinkExp?: SortOrderInput | SortOrder
    resetCodeExp?: SortOrderInput | SortOrder
    testAttempts?: TestAttemptOrderByRelationAggregateInput
    testsCreated?: TestOrderByRelationAggregateInput
    refreshToken?: TokenOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    surname?: StringNullableFilter<"User"> | string | null
    patronymic?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    isActivated?: BoolFilter<"User"> | boolean
    role?: EnumRoleFilter<"User"> | $Enums.Role
    activationLink?: StringNullableFilter<"User"> | string | null
    resetCode?: StringNullableFilter<"User"> | string | null
    isBlocked?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    activationLinkExp?: DateTimeNullableFilter<"User"> | Date | string | null
    resetCodeExp?: DateTimeNullableFilter<"User"> | Date | string | null
    testAttempts?: TestAttemptListRelationFilter
    testsCreated?: TestListRelationFilter
    refreshToken?: XOR<TokenNullableScalarRelationFilter, TokenWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    surname?: SortOrderInput | SortOrder
    patronymic?: SortOrderInput | SortOrder
    password?: SortOrder
    isActivated?: SortOrder
    role?: SortOrder
    activationLink?: SortOrderInput | SortOrder
    resetCode?: SortOrderInput | SortOrder
    isBlocked?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    activationLinkExp?: SortOrderInput | SortOrder
    resetCodeExp?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    surname?: StringNullableWithAggregatesFilter<"User"> | string | null
    patronymic?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringWithAggregatesFilter<"User"> | string
    isActivated?: BoolWithAggregatesFilter<"User"> | boolean
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    activationLink?: StringNullableWithAggregatesFilter<"User"> | string | null
    resetCode?: StringNullableWithAggregatesFilter<"User"> | string | null
    isBlocked?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    activationLinkExp?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    resetCodeExp?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type TokenWhereInput = {
    AND?: TokenWhereInput | TokenWhereInput[]
    OR?: TokenWhereInput[]
    NOT?: TokenWhereInput | TokenWhereInput[]
    id?: StringFilter<"Token"> | string
    userId?: StringFilter<"Token"> | string
    refreshToken?: StringFilter<"Token"> | string
    createdAt?: DateTimeFilter<"Token"> | Date | string
    updatedAt?: DateTimeFilter<"Token"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TokenOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    refreshToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type TokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    refreshToken?: string
    AND?: TokenWhereInput | TokenWhereInput[]
    OR?: TokenWhereInput[]
    NOT?: TokenWhereInput | TokenWhereInput[]
    createdAt?: DateTimeFilter<"Token"> | Date | string
    updatedAt?: DateTimeFilter<"Token"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId" | "refreshToken">

  export type TokenOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    refreshToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TokenCountOrderByAggregateInput
    _max?: TokenMaxOrderByAggregateInput
    _min?: TokenMinOrderByAggregateInput
  }

  export type TokenScalarWhereWithAggregatesInput = {
    AND?: TokenScalarWhereWithAggregatesInput | TokenScalarWhereWithAggregatesInput[]
    OR?: TokenScalarWhereWithAggregatesInput[]
    NOT?: TokenScalarWhereWithAggregatesInput | TokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Token"> | string
    userId?: StringWithAggregatesFilter<"Token"> | string
    refreshToken?: StringWithAggregatesFilter<"Token"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Token"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Token"> | Date | string
  }

  export type TestSettingsWhereInput = {
    AND?: TestSettingsWhereInput | TestSettingsWhereInput[]
    OR?: TestSettingsWhereInput[]
    NOT?: TestSettingsWhereInput | TestSettingsWhereInput[]
    id?: StringFilter<"TestSettings"> | string
    testId?: StringFilter<"TestSettings"> | string
    requireRegistration?: BoolFilter<"TestSettings"> | boolean
    inputFields?: JsonNullableFilter<"TestSettings">
    showDetailedResults?: BoolFilter<"TestSettings"> | boolean
    timeLimit?: IntNullableFilter<"TestSettings"> | number | null
    createdAt?: DateTimeFilter<"TestSettings"> | Date | string
    updatedAt?: DateTimeFilter<"TestSettings"> | Date | string
    shuffleAnswers?: BoolFilter<"TestSettings"> | boolean
    shuffleQuestions?: BoolFilter<"TestSettings"> | boolean
    test?: XOR<TestScalarRelationFilter, TestWhereInput>
  }

  export type TestSettingsOrderByWithRelationInput = {
    id?: SortOrder
    testId?: SortOrder
    requireRegistration?: SortOrder
    inputFields?: SortOrderInput | SortOrder
    showDetailedResults?: SortOrder
    timeLimit?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shuffleAnswers?: SortOrder
    shuffleQuestions?: SortOrder
    test?: TestOrderByWithRelationInput
  }

  export type TestSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    testId?: string
    AND?: TestSettingsWhereInput | TestSettingsWhereInput[]
    OR?: TestSettingsWhereInput[]
    NOT?: TestSettingsWhereInput | TestSettingsWhereInput[]
    requireRegistration?: BoolFilter<"TestSettings"> | boolean
    inputFields?: JsonNullableFilter<"TestSettings">
    showDetailedResults?: BoolFilter<"TestSettings"> | boolean
    timeLimit?: IntNullableFilter<"TestSettings"> | number | null
    createdAt?: DateTimeFilter<"TestSettings"> | Date | string
    updatedAt?: DateTimeFilter<"TestSettings"> | Date | string
    shuffleAnswers?: BoolFilter<"TestSettings"> | boolean
    shuffleQuestions?: BoolFilter<"TestSettings"> | boolean
    test?: XOR<TestScalarRelationFilter, TestWhereInput>
  }, "id" | "testId">

  export type TestSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    testId?: SortOrder
    requireRegistration?: SortOrder
    inputFields?: SortOrderInput | SortOrder
    showDetailedResults?: SortOrder
    timeLimit?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shuffleAnswers?: SortOrder
    shuffleQuestions?: SortOrder
    _count?: TestSettingsCountOrderByAggregateInput
    _avg?: TestSettingsAvgOrderByAggregateInput
    _max?: TestSettingsMaxOrderByAggregateInput
    _min?: TestSettingsMinOrderByAggregateInput
    _sum?: TestSettingsSumOrderByAggregateInput
  }

  export type TestSettingsScalarWhereWithAggregatesInput = {
    AND?: TestSettingsScalarWhereWithAggregatesInput | TestSettingsScalarWhereWithAggregatesInput[]
    OR?: TestSettingsScalarWhereWithAggregatesInput[]
    NOT?: TestSettingsScalarWhereWithAggregatesInput | TestSettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TestSettings"> | string
    testId?: StringWithAggregatesFilter<"TestSettings"> | string
    requireRegistration?: BoolWithAggregatesFilter<"TestSettings"> | boolean
    inputFields?: JsonNullableWithAggregatesFilter<"TestSettings">
    showDetailedResults?: BoolWithAggregatesFilter<"TestSettings"> | boolean
    timeLimit?: IntNullableWithAggregatesFilter<"TestSettings"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"TestSettings"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TestSettings"> | Date | string
    shuffleAnswers?: BoolWithAggregatesFilter<"TestSettings"> | boolean
    shuffleQuestions?: BoolWithAggregatesFilter<"TestSettings"> | boolean
  }

  export type TestWhereInput = {
    AND?: TestWhereInput | TestWhereInput[]
    OR?: TestWhereInput[]
    NOT?: TestWhereInput | TestWhereInput[]
    id?: StringFilter<"Test"> | string
    authorId?: StringFilter<"Test"> | string
    title?: StringFilter<"Test"> | string
    description?: StringNullableFilter<"Test"> | string | null
    status?: EnumModerationStatusFilter<"Test"> | $Enums.ModerationStatus
    totalAttempts?: IntFilter<"Test"> | number
    createdAt?: DateTimeFilter<"Test"> | Date | string
    updatedAt?: DateTimeFilter<"Test"> | Date | string
    version?: IntFilter<"Test"> | number
    visibilityStatus?: EnumTestVisibilityStatusFilter<"Test"> | $Enums.TestVisibilityStatus
    questions?: QuestionListRelationFilter
    testAttempts?: TestAttemptListRelationFilter
    settings?: XOR<TestSettingsNullableScalarRelationFilter, TestSettingsWhereInput> | null
    snapshots?: TestSnapshotListRelationFilter
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TestOrderByWithRelationInput = {
    id?: SortOrder
    authorId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    totalAttempts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    version?: SortOrder
    visibilityStatus?: SortOrder
    questions?: QuestionOrderByRelationAggregateInput
    testAttempts?: TestAttemptOrderByRelationAggregateInput
    settings?: TestSettingsOrderByWithRelationInput
    snapshots?: TestSnapshotOrderByRelationAggregateInput
    author?: UserOrderByWithRelationInput
  }

  export type TestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TestWhereInput | TestWhereInput[]
    OR?: TestWhereInput[]
    NOT?: TestWhereInput | TestWhereInput[]
    authorId?: StringFilter<"Test"> | string
    title?: StringFilter<"Test"> | string
    description?: StringNullableFilter<"Test"> | string | null
    status?: EnumModerationStatusFilter<"Test"> | $Enums.ModerationStatus
    totalAttempts?: IntFilter<"Test"> | number
    createdAt?: DateTimeFilter<"Test"> | Date | string
    updatedAt?: DateTimeFilter<"Test"> | Date | string
    version?: IntFilter<"Test"> | number
    visibilityStatus?: EnumTestVisibilityStatusFilter<"Test"> | $Enums.TestVisibilityStatus
    questions?: QuestionListRelationFilter
    testAttempts?: TestAttemptListRelationFilter
    settings?: XOR<TestSettingsNullableScalarRelationFilter, TestSettingsWhereInput> | null
    snapshots?: TestSnapshotListRelationFilter
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TestOrderByWithAggregationInput = {
    id?: SortOrder
    authorId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    totalAttempts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    version?: SortOrder
    visibilityStatus?: SortOrder
    _count?: TestCountOrderByAggregateInput
    _avg?: TestAvgOrderByAggregateInput
    _max?: TestMaxOrderByAggregateInput
    _min?: TestMinOrderByAggregateInput
    _sum?: TestSumOrderByAggregateInput
  }

  export type TestScalarWhereWithAggregatesInput = {
    AND?: TestScalarWhereWithAggregatesInput | TestScalarWhereWithAggregatesInput[]
    OR?: TestScalarWhereWithAggregatesInput[]
    NOT?: TestScalarWhereWithAggregatesInput | TestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Test"> | string
    authorId?: StringWithAggregatesFilter<"Test"> | string
    title?: StringWithAggregatesFilter<"Test"> | string
    description?: StringNullableWithAggregatesFilter<"Test"> | string | null
    status?: EnumModerationStatusWithAggregatesFilter<"Test"> | $Enums.ModerationStatus
    totalAttempts?: IntWithAggregatesFilter<"Test"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Test"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Test"> | Date | string
    version?: IntWithAggregatesFilter<"Test"> | number
    visibilityStatus?: EnumTestVisibilityStatusWithAggregatesFilter<"Test"> | $Enums.TestVisibilityStatus
  }

  export type QuestionWhereInput = {
    AND?: QuestionWhereInput | QuestionWhereInput[]
    OR?: QuestionWhereInput[]
    NOT?: QuestionWhereInput | QuestionWhereInput[]
    id?: StringFilter<"Question"> | string
    testId?: StringFilter<"Question"> | string
    text?: StringFilter<"Question"> | string
    order?: IntFilter<"Question"> | number
    type?: EnumQuestionTypeFilter<"Question"> | $Enums.QuestionType
    createdAt?: DateTimeFilter<"Question"> | Date | string
    updatedAt?: DateTimeFilter<"Question"> | Date | string
    answers?: AnswerListRelationFilter
    test?: XOR<TestScalarRelationFilter, TestWhereInput>
    userAnswers?: UserAnswerListRelationFilter
  }

  export type QuestionOrderByWithRelationInput = {
    id?: SortOrder
    testId?: SortOrder
    text?: SortOrder
    order?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    answers?: AnswerOrderByRelationAggregateInput
    test?: TestOrderByWithRelationInput
    userAnswers?: UserAnswerOrderByRelationAggregateInput
  }

  export type QuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuestionWhereInput | QuestionWhereInput[]
    OR?: QuestionWhereInput[]
    NOT?: QuestionWhereInput | QuestionWhereInput[]
    testId?: StringFilter<"Question"> | string
    text?: StringFilter<"Question"> | string
    order?: IntFilter<"Question"> | number
    type?: EnumQuestionTypeFilter<"Question"> | $Enums.QuestionType
    createdAt?: DateTimeFilter<"Question"> | Date | string
    updatedAt?: DateTimeFilter<"Question"> | Date | string
    answers?: AnswerListRelationFilter
    test?: XOR<TestScalarRelationFilter, TestWhereInput>
    userAnswers?: UserAnswerListRelationFilter
  }, "id">

  export type QuestionOrderByWithAggregationInput = {
    id?: SortOrder
    testId?: SortOrder
    text?: SortOrder
    order?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: QuestionCountOrderByAggregateInput
    _avg?: QuestionAvgOrderByAggregateInput
    _max?: QuestionMaxOrderByAggregateInput
    _min?: QuestionMinOrderByAggregateInput
    _sum?: QuestionSumOrderByAggregateInput
  }

  export type QuestionScalarWhereWithAggregatesInput = {
    AND?: QuestionScalarWhereWithAggregatesInput | QuestionScalarWhereWithAggregatesInput[]
    OR?: QuestionScalarWhereWithAggregatesInput[]
    NOT?: QuestionScalarWhereWithAggregatesInput | QuestionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Question"> | string
    testId?: StringWithAggregatesFilter<"Question"> | string
    text?: StringWithAggregatesFilter<"Question"> | string
    order?: IntWithAggregatesFilter<"Question"> | number
    type?: EnumQuestionTypeWithAggregatesFilter<"Question"> | $Enums.QuestionType
    createdAt?: DateTimeWithAggregatesFilter<"Question"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Question"> | Date | string
  }

  export type AnswerWhereInput = {
    AND?: AnswerWhereInput | AnswerWhereInput[]
    OR?: AnswerWhereInput[]
    NOT?: AnswerWhereInput | AnswerWhereInput[]
    id?: StringFilter<"Answer"> | string
    questionId?: StringFilter<"Answer"> | string
    text?: StringFilter<"Answer"> | string
    isCorrect?: BoolFilter<"Answer"> | boolean
    isGenerated?: BoolFilter<"Answer"> | boolean
    createdAt?: DateTimeFilter<"Answer"> | Date | string
    updatedAt?: DateTimeFilter<"Answer"> | Date | string
    question?: XOR<QuestionScalarRelationFilter, QuestionWhereInput>
    userAnswers?: UserAnswerListRelationFilter
  }

  export type AnswerOrderByWithRelationInput = {
    id?: SortOrder
    questionId?: SortOrder
    text?: SortOrder
    isCorrect?: SortOrder
    isGenerated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    question?: QuestionOrderByWithRelationInput
    userAnswers?: UserAnswerOrderByRelationAggregateInput
  }

  export type AnswerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AnswerWhereInput | AnswerWhereInput[]
    OR?: AnswerWhereInput[]
    NOT?: AnswerWhereInput | AnswerWhereInput[]
    questionId?: StringFilter<"Answer"> | string
    text?: StringFilter<"Answer"> | string
    isCorrect?: BoolFilter<"Answer"> | boolean
    isGenerated?: BoolFilter<"Answer"> | boolean
    createdAt?: DateTimeFilter<"Answer"> | Date | string
    updatedAt?: DateTimeFilter<"Answer"> | Date | string
    question?: XOR<QuestionScalarRelationFilter, QuestionWhereInput>
    userAnswers?: UserAnswerListRelationFilter
  }, "id">

  export type AnswerOrderByWithAggregationInput = {
    id?: SortOrder
    questionId?: SortOrder
    text?: SortOrder
    isCorrect?: SortOrder
    isGenerated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AnswerCountOrderByAggregateInput
    _max?: AnswerMaxOrderByAggregateInput
    _min?: AnswerMinOrderByAggregateInput
  }

  export type AnswerScalarWhereWithAggregatesInput = {
    AND?: AnswerScalarWhereWithAggregatesInput | AnswerScalarWhereWithAggregatesInput[]
    OR?: AnswerScalarWhereWithAggregatesInput[]
    NOT?: AnswerScalarWhereWithAggregatesInput | AnswerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Answer"> | string
    questionId?: StringWithAggregatesFilter<"Answer"> | string
    text?: StringWithAggregatesFilter<"Answer"> | string
    isCorrect?: BoolWithAggregatesFilter<"Answer"> | boolean
    isGenerated?: BoolWithAggregatesFilter<"Answer"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Answer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Answer"> | Date | string
  }

  export type TestAttemptWhereInput = {
    AND?: TestAttemptWhereInput | TestAttemptWhereInput[]
    OR?: TestAttemptWhereInput[]
    NOT?: TestAttemptWhereInput | TestAttemptWhereInput[]
    id?: StringFilter<"TestAttempt"> | string
    testId?: StringFilter<"TestAttempt"> | string
    userId?: StringNullableFilter<"TestAttempt"> | string | null
    preTestUserData?: JsonNullableFilter<"TestAttempt">
    score?: FloatNullableFilter<"TestAttempt"> | number | null
    startedAt?: DateTimeFilter<"TestAttempt"> | Date | string
    completedAt?: DateTimeNullableFilter<"TestAttempt"> | Date | string | null
    status?: EnumTestAttemptStatusFilter<"TestAttempt"> | $Enums.TestAttemptStatus
    updatedAt?: DateTimeFilter<"TestAttempt"> | Date | string
    testSnapshotId?: StringNullableFilter<"TestAttempt"> | string | null
    expirationTime?: DateTimeNullableFilter<"TestAttempt"> | Date | string | null
    test?: XOR<TestScalarRelationFilter, TestWhereInput>
    snapshot?: XOR<TestSnapshotNullableScalarRelationFilter, TestSnapshotWhereInput> | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    answers?: UserAnswerListRelationFilter
  }

  export type TestAttemptOrderByWithRelationInput = {
    id?: SortOrder
    testId?: SortOrder
    userId?: SortOrderInput | SortOrder
    preTestUserData?: SortOrderInput | SortOrder
    score?: SortOrderInput | SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    updatedAt?: SortOrder
    testSnapshotId?: SortOrderInput | SortOrder
    expirationTime?: SortOrderInput | SortOrder
    test?: TestOrderByWithRelationInput
    snapshot?: TestSnapshotOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    answers?: UserAnswerOrderByRelationAggregateInput
  }

  export type TestAttemptWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TestAttemptWhereInput | TestAttemptWhereInput[]
    OR?: TestAttemptWhereInput[]
    NOT?: TestAttemptWhereInput | TestAttemptWhereInput[]
    testId?: StringFilter<"TestAttempt"> | string
    userId?: StringNullableFilter<"TestAttempt"> | string | null
    preTestUserData?: JsonNullableFilter<"TestAttempt">
    score?: FloatNullableFilter<"TestAttempt"> | number | null
    startedAt?: DateTimeFilter<"TestAttempt"> | Date | string
    completedAt?: DateTimeNullableFilter<"TestAttempt"> | Date | string | null
    status?: EnumTestAttemptStatusFilter<"TestAttempt"> | $Enums.TestAttemptStatus
    updatedAt?: DateTimeFilter<"TestAttempt"> | Date | string
    testSnapshotId?: StringNullableFilter<"TestAttempt"> | string | null
    expirationTime?: DateTimeNullableFilter<"TestAttempt"> | Date | string | null
    test?: XOR<TestScalarRelationFilter, TestWhereInput>
    snapshot?: XOR<TestSnapshotNullableScalarRelationFilter, TestSnapshotWhereInput> | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    answers?: UserAnswerListRelationFilter
  }, "id">

  export type TestAttemptOrderByWithAggregationInput = {
    id?: SortOrder
    testId?: SortOrder
    userId?: SortOrderInput | SortOrder
    preTestUserData?: SortOrderInput | SortOrder
    score?: SortOrderInput | SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    updatedAt?: SortOrder
    testSnapshotId?: SortOrderInput | SortOrder
    expirationTime?: SortOrderInput | SortOrder
    _count?: TestAttemptCountOrderByAggregateInput
    _avg?: TestAttemptAvgOrderByAggregateInput
    _max?: TestAttemptMaxOrderByAggregateInput
    _min?: TestAttemptMinOrderByAggregateInput
    _sum?: TestAttemptSumOrderByAggregateInput
  }

  export type TestAttemptScalarWhereWithAggregatesInput = {
    AND?: TestAttemptScalarWhereWithAggregatesInput | TestAttemptScalarWhereWithAggregatesInput[]
    OR?: TestAttemptScalarWhereWithAggregatesInput[]
    NOT?: TestAttemptScalarWhereWithAggregatesInput | TestAttemptScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TestAttempt"> | string
    testId?: StringWithAggregatesFilter<"TestAttempt"> | string
    userId?: StringNullableWithAggregatesFilter<"TestAttempt"> | string | null
    preTestUserData?: JsonNullableWithAggregatesFilter<"TestAttempt">
    score?: FloatNullableWithAggregatesFilter<"TestAttempt"> | number | null
    startedAt?: DateTimeWithAggregatesFilter<"TestAttempt"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"TestAttempt"> | Date | string | null
    status?: EnumTestAttemptStatusWithAggregatesFilter<"TestAttempt"> | $Enums.TestAttemptStatus
    updatedAt?: DateTimeWithAggregatesFilter<"TestAttempt"> | Date | string
    testSnapshotId?: StringNullableWithAggregatesFilter<"TestAttempt"> | string | null
    expirationTime?: DateTimeNullableWithAggregatesFilter<"TestAttempt"> | Date | string | null
  }

  export type UserAnswerWhereInput = {
    AND?: UserAnswerWhereInput | UserAnswerWhereInput[]
    OR?: UserAnswerWhereInput[]
    NOT?: UserAnswerWhereInput | UserAnswerWhereInput[]
    id?: StringFilter<"UserAnswer"> | string
    attemptId?: StringFilter<"UserAnswer"> | string
    questionId?: StringFilter<"UserAnswer"> | string
    answerId?: StringFilter<"UserAnswer"> | string
    answeredAt?: DateTimeNullableFilter<"UserAnswer"> | Date | string | null
    timeSpent?: IntNullableFilter<"UserAnswer"> | number | null
    createdAt?: DateTimeFilter<"UserAnswer"> | Date | string
    answer?: XOR<AnswerScalarRelationFilter, AnswerWhereInput>
    attempt?: XOR<TestAttemptScalarRelationFilter, TestAttemptWhereInput>
    question?: XOR<QuestionScalarRelationFilter, QuestionWhereInput>
  }

  export type UserAnswerOrderByWithRelationInput = {
    id?: SortOrder
    attemptId?: SortOrder
    questionId?: SortOrder
    answerId?: SortOrder
    answeredAt?: SortOrderInput | SortOrder
    timeSpent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    answer?: AnswerOrderByWithRelationInput
    attempt?: TestAttemptOrderByWithRelationInput
    question?: QuestionOrderByWithRelationInput
  }

  export type UserAnswerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserAnswerWhereInput | UserAnswerWhereInput[]
    OR?: UserAnswerWhereInput[]
    NOT?: UserAnswerWhereInput | UserAnswerWhereInput[]
    attemptId?: StringFilter<"UserAnswer"> | string
    questionId?: StringFilter<"UserAnswer"> | string
    answerId?: StringFilter<"UserAnswer"> | string
    answeredAt?: DateTimeNullableFilter<"UserAnswer"> | Date | string | null
    timeSpent?: IntNullableFilter<"UserAnswer"> | number | null
    createdAt?: DateTimeFilter<"UserAnswer"> | Date | string
    answer?: XOR<AnswerScalarRelationFilter, AnswerWhereInput>
    attempt?: XOR<TestAttemptScalarRelationFilter, TestAttemptWhereInput>
    question?: XOR<QuestionScalarRelationFilter, QuestionWhereInput>
  }, "id">

  export type UserAnswerOrderByWithAggregationInput = {
    id?: SortOrder
    attemptId?: SortOrder
    questionId?: SortOrder
    answerId?: SortOrder
    answeredAt?: SortOrderInput | SortOrder
    timeSpent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UserAnswerCountOrderByAggregateInput
    _avg?: UserAnswerAvgOrderByAggregateInput
    _max?: UserAnswerMaxOrderByAggregateInput
    _min?: UserAnswerMinOrderByAggregateInput
    _sum?: UserAnswerSumOrderByAggregateInput
  }

  export type UserAnswerScalarWhereWithAggregatesInput = {
    AND?: UserAnswerScalarWhereWithAggregatesInput | UserAnswerScalarWhereWithAggregatesInput[]
    OR?: UserAnswerScalarWhereWithAggregatesInput[]
    NOT?: UserAnswerScalarWhereWithAggregatesInput | UserAnswerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserAnswer"> | string
    attemptId?: StringWithAggregatesFilter<"UserAnswer"> | string
    questionId?: StringWithAggregatesFilter<"UserAnswer"> | string
    answerId?: StringWithAggregatesFilter<"UserAnswer"> | string
    answeredAt?: DateTimeNullableWithAggregatesFilter<"UserAnswer"> | Date | string | null
    timeSpent?: IntNullableWithAggregatesFilter<"UserAnswer"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"UserAnswer"> | Date | string
  }

  export type TestSnapshotWhereInput = {
    AND?: TestSnapshotWhereInput | TestSnapshotWhereInput[]
    OR?: TestSnapshotWhereInput[]
    NOT?: TestSnapshotWhereInput | TestSnapshotWhereInput[]
    id?: StringFilter<"TestSnapshot"> | string
    testId?: StringFilter<"TestSnapshot"> | string
    title?: StringFilter<"TestSnapshot"> | string
    description?: StringNullableFilter<"TestSnapshot"> | string | null
    status?: EnumModerationStatusFilter<"TestSnapshot"> | $Enums.ModerationStatus
    createdAt?: DateTimeFilter<"TestSnapshot"> | Date | string
    version?: IntFilter<"TestSnapshot"> | number
    visibilityStatus?: EnumTestVisibilityStatusFilter<"TestSnapshot"> | $Enums.TestVisibilityStatus
    questions?: QuestionSnapshotListRelationFilter
    attempts?: TestAttemptListRelationFilter
    settings?: XOR<TestSettingsSnapshotNullableScalarRelationFilter, TestSettingsSnapshotWhereInput> | null
    originalTest?: XOR<TestScalarRelationFilter, TestWhereInput>
  }

  export type TestSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    testId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    version?: SortOrder
    visibilityStatus?: SortOrder
    questions?: QuestionSnapshotOrderByRelationAggregateInput
    attempts?: TestAttemptOrderByRelationAggregateInput
    settings?: TestSettingsSnapshotOrderByWithRelationInput
    originalTest?: TestOrderByWithRelationInput
  }

  export type TestSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TestSnapshotWhereInput | TestSnapshotWhereInput[]
    OR?: TestSnapshotWhereInput[]
    NOT?: TestSnapshotWhereInput | TestSnapshotWhereInput[]
    testId?: StringFilter<"TestSnapshot"> | string
    title?: StringFilter<"TestSnapshot"> | string
    description?: StringNullableFilter<"TestSnapshot"> | string | null
    status?: EnumModerationStatusFilter<"TestSnapshot"> | $Enums.ModerationStatus
    createdAt?: DateTimeFilter<"TestSnapshot"> | Date | string
    version?: IntFilter<"TestSnapshot"> | number
    visibilityStatus?: EnumTestVisibilityStatusFilter<"TestSnapshot"> | $Enums.TestVisibilityStatus
    questions?: QuestionSnapshotListRelationFilter
    attempts?: TestAttemptListRelationFilter
    settings?: XOR<TestSettingsSnapshotNullableScalarRelationFilter, TestSettingsSnapshotWhereInput> | null
    originalTest?: XOR<TestScalarRelationFilter, TestWhereInput>
  }, "id">

  export type TestSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    testId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    version?: SortOrder
    visibilityStatus?: SortOrder
    _count?: TestSnapshotCountOrderByAggregateInput
    _avg?: TestSnapshotAvgOrderByAggregateInput
    _max?: TestSnapshotMaxOrderByAggregateInput
    _min?: TestSnapshotMinOrderByAggregateInput
    _sum?: TestSnapshotSumOrderByAggregateInput
  }

  export type TestSnapshotScalarWhereWithAggregatesInput = {
    AND?: TestSnapshotScalarWhereWithAggregatesInput | TestSnapshotScalarWhereWithAggregatesInput[]
    OR?: TestSnapshotScalarWhereWithAggregatesInput[]
    NOT?: TestSnapshotScalarWhereWithAggregatesInput | TestSnapshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TestSnapshot"> | string
    testId?: StringWithAggregatesFilter<"TestSnapshot"> | string
    title?: StringWithAggregatesFilter<"TestSnapshot"> | string
    description?: StringNullableWithAggregatesFilter<"TestSnapshot"> | string | null
    status?: EnumModerationStatusWithAggregatesFilter<"TestSnapshot"> | $Enums.ModerationStatus
    createdAt?: DateTimeWithAggregatesFilter<"TestSnapshot"> | Date | string
    version?: IntWithAggregatesFilter<"TestSnapshot"> | number
    visibilityStatus?: EnumTestVisibilityStatusWithAggregatesFilter<"TestSnapshot"> | $Enums.TestVisibilityStatus
  }

  export type QuestionSnapshotWhereInput = {
    AND?: QuestionSnapshotWhereInput | QuestionSnapshotWhereInput[]
    OR?: QuestionSnapshotWhereInput[]
    NOT?: QuestionSnapshotWhereInput | QuestionSnapshotWhereInput[]
    id?: StringFilter<"QuestionSnapshot"> | string
    testSnapshotId?: StringFilter<"QuestionSnapshot"> | string
    originalTestId?: StringFilter<"QuestionSnapshot"> | string
    text?: StringFilter<"QuestionSnapshot"> | string
    order?: IntFilter<"QuestionSnapshot"> | number
    type?: EnumQuestionTypeFilter<"QuestionSnapshot"> | $Enums.QuestionType
    createdAt?: DateTimeFilter<"QuestionSnapshot"> | Date | string
    answers?: AnswerSnapshotListRelationFilter
    testSnapshot?: XOR<TestSnapshotScalarRelationFilter, TestSnapshotWhereInput>
  }

  export type QuestionSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    testSnapshotId?: SortOrder
    originalTestId?: SortOrder
    text?: SortOrder
    order?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    answers?: AnswerSnapshotOrderByRelationAggregateInput
    testSnapshot?: TestSnapshotOrderByWithRelationInput
  }

  export type QuestionSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QuestionSnapshotWhereInput | QuestionSnapshotWhereInput[]
    OR?: QuestionSnapshotWhereInput[]
    NOT?: QuestionSnapshotWhereInput | QuestionSnapshotWhereInput[]
    testSnapshotId?: StringFilter<"QuestionSnapshot"> | string
    originalTestId?: StringFilter<"QuestionSnapshot"> | string
    text?: StringFilter<"QuestionSnapshot"> | string
    order?: IntFilter<"QuestionSnapshot"> | number
    type?: EnumQuestionTypeFilter<"QuestionSnapshot"> | $Enums.QuestionType
    createdAt?: DateTimeFilter<"QuestionSnapshot"> | Date | string
    answers?: AnswerSnapshotListRelationFilter
    testSnapshot?: XOR<TestSnapshotScalarRelationFilter, TestSnapshotWhereInput>
  }, "id">

  export type QuestionSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    testSnapshotId?: SortOrder
    originalTestId?: SortOrder
    text?: SortOrder
    order?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    _count?: QuestionSnapshotCountOrderByAggregateInput
    _avg?: QuestionSnapshotAvgOrderByAggregateInput
    _max?: QuestionSnapshotMaxOrderByAggregateInput
    _min?: QuestionSnapshotMinOrderByAggregateInput
    _sum?: QuestionSnapshotSumOrderByAggregateInput
  }

  export type QuestionSnapshotScalarWhereWithAggregatesInput = {
    AND?: QuestionSnapshotScalarWhereWithAggregatesInput | QuestionSnapshotScalarWhereWithAggregatesInput[]
    OR?: QuestionSnapshotScalarWhereWithAggregatesInput[]
    NOT?: QuestionSnapshotScalarWhereWithAggregatesInput | QuestionSnapshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QuestionSnapshot"> | string
    testSnapshotId?: StringWithAggregatesFilter<"QuestionSnapshot"> | string
    originalTestId?: StringWithAggregatesFilter<"QuestionSnapshot"> | string
    text?: StringWithAggregatesFilter<"QuestionSnapshot"> | string
    order?: IntWithAggregatesFilter<"QuestionSnapshot"> | number
    type?: EnumQuestionTypeWithAggregatesFilter<"QuestionSnapshot"> | $Enums.QuestionType
    createdAt?: DateTimeWithAggregatesFilter<"QuestionSnapshot"> | Date | string
  }

  export type AnswerSnapshotWhereInput = {
    AND?: AnswerSnapshotWhereInput | AnswerSnapshotWhereInput[]
    OR?: AnswerSnapshotWhereInput[]
    NOT?: AnswerSnapshotWhereInput | AnswerSnapshotWhereInput[]
    id?: StringFilter<"AnswerSnapshot"> | string
    questionId?: StringFilter<"AnswerSnapshot"> | string
    originalTestId?: StringFilter<"AnswerSnapshot"> | string
    text?: StringFilter<"AnswerSnapshot"> | string
    isCorrect?: BoolFilter<"AnswerSnapshot"> | boolean
    createdAt?: DateTimeFilter<"AnswerSnapshot"> | Date | string
    question?: XOR<QuestionSnapshotScalarRelationFilter, QuestionSnapshotWhereInput>
  }

  export type AnswerSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    questionId?: SortOrder
    originalTestId?: SortOrder
    text?: SortOrder
    isCorrect?: SortOrder
    createdAt?: SortOrder
    question?: QuestionSnapshotOrderByWithRelationInput
  }

  export type AnswerSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AnswerSnapshotWhereInput | AnswerSnapshotWhereInput[]
    OR?: AnswerSnapshotWhereInput[]
    NOT?: AnswerSnapshotWhereInput | AnswerSnapshotWhereInput[]
    questionId?: StringFilter<"AnswerSnapshot"> | string
    originalTestId?: StringFilter<"AnswerSnapshot"> | string
    text?: StringFilter<"AnswerSnapshot"> | string
    isCorrect?: BoolFilter<"AnswerSnapshot"> | boolean
    createdAt?: DateTimeFilter<"AnswerSnapshot"> | Date | string
    question?: XOR<QuestionSnapshotScalarRelationFilter, QuestionSnapshotWhereInput>
  }, "id">

  export type AnswerSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    questionId?: SortOrder
    originalTestId?: SortOrder
    text?: SortOrder
    isCorrect?: SortOrder
    createdAt?: SortOrder
    _count?: AnswerSnapshotCountOrderByAggregateInput
    _max?: AnswerSnapshotMaxOrderByAggregateInput
    _min?: AnswerSnapshotMinOrderByAggregateInput
  }

  export type AnswerSnapshotScalarWhereWithAggregatesInput = {
    AND?: AnswerSnapshotScalarWhereWithAggregatesInput | AnswerSnapshotScalarWhereWithAggregatesInput[]
    OR?: AnswerSnapshotScalarWhereWithAggregatesInput[]
    NOT?: AnswerSnapshotScalarWhereWithAggregatesInput | AnswerSnapshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AnswerSnapshot"> | string
    questionId?: StringWithAggregatesFilter<"AnswerSnapshot"> | string
    originalTestId?: StringWithAggregatesFilter<"AnswerSnapshot"> | string
    text?: StringWithAggregatesFilter<"AnswerSnapshot"> | string
    isCorrect?: BoolWithAggregatesFilter<"AnswerSnapshot"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"AnswerSnapshot"> | Date | string
  }

  export type TestSettingsSnapshotWhereInput = {
    AND?: TestSettingsSnapshotWhereInput | TestSettingsSnapshotWhereInput[]
    OR?: TestSettingsSnapshotWhereInput[]
    NOT?: TestSettingsSnapshotWhereInput | TestSettingsSnapshotWhereInput[]
    id?: StringFilter<"TestSettingsSnapshot"> | string
    testSnapshotId?: StringFilter<"TestSettingsSnapshot"> | string
    requireRegistration?: BoolFilter<"TestSettingsSnapshot"> | boolean
    inputFields?: JsonNullableFilter<"TestSettingsSnapshot">
    showDetailedResults?: BoolFilter<"TestSettingsSnapshot"> | boolean
    shuffleQuestions?: BoolFilter<"TestSettingsSnapshot"> | boolean
    shuffleAnswers?: BoolFilter<"TestSettingsSnapshot"> | boolean
    timeLimit?: IntNullableFilter<"TestSettingsSnapshot"> | number | null
    createdAt?: DateTimeFilter<"TestSettingsSnapshot"> | Date | string
    snapshot?: XOR<TestSnapshotScalarRelationFilter, TestSnapshotWhereInput>
  }

  export type TestSettingsSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    testSnapshotId?: SortOrder
    requireRegistration?: SortOrder
    inputFields?: SortOrderInput | SortOrder
    showDetailedResults?: SortOrder
    shuffleQuestions?: SortOrder
    shuffleAnswers?: SortOrder
    timeLimit?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    snapshot?: TestSnapshotOrderByWithRelationInput
  }

  export type TestSettingsSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    testSnapshotId?: string
    AND?: TestSettingsSnapshotWhereInput | TestSettingsSnapshotWhereInput[]
    OR?: TestSettingsSnapshotWhereInput[]
    NOT?: TestSettingsSnapshotWhereInput | TestSettingsSnapshotWhereInput[]
    requireRegistration?: BoolFilter<"TestSettingsSnapshot"> | boolean
    inputFields?: JsonNullableFilter<"TestSettingsSnapshot">
    showDetailedResults?: BoolFilter<"TestSettingsSnapshot"> | boolean
    shuffleQuestions?: BoolFilter<"TestSettingsSnapshot"> | boolean
    shuffleAnswers?: BoolFilter<"TestSettingsSnapshot"> | boolean
    timeLimit?: IntNullableFilter<"TestSettingsSnapshot"> | number | null
    createdAt?: DateTimeFilter<"TestSettingsSnapshot"> | Date | string
    snapshot?: XOR<TestSnapshotScalarRelationFilter, TestSnapshotWhereInput>
  }, "id" | "testSnapshotId">

  export type TestSettingsSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    testSnapshotId?: SortOrder
    requireRegistration?: SortOrder
    inputFields?: SortOrderInput | SortOrder
    showDetailedResults?: SortOrder
    shuffleQuestions?: SortOrder
    shuffleAnswers?: SortOrder
    timeLimit?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TestSettingsSnapshotCountOrderByAggregateInput
    _avg?: TestSettingsSnapshotAvgOrderByAggregateInput
    _max?: TestSettingsSnapshotMaxOrderByAggregateInput
    _min?: TestSettingsSnapshotMinOrderByAggregateInput
    _sum?: TestSettingsSnapshotSumOrderByAggregateInput
  }

  export type TestSettingsSnapshotScalarWhereWithAggregatesInput = {
    AND?: TestSettingsSnapshotScalarWhereWithAggregatesInput | TestSettingsSnapshotScalarWhereWithAggregatesInput[]
    OR?: TestSettingsSnapshotScalarWhereWithAggregatesInput[]
    NOT?: TestSettingsSnapshotScalarWhereWithAggregatesInput | TestSettingsSnapshotScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TestSettingsSnapshot"> | string
    testSnapshotId?: StringWithAggregatesFilter<"TestSettingsSnapshot"> | string
    requireRegistration?: BoolWithAggregatesFilter<"TestSettingsSnapshot"> | boolean
    inputFields?: JsonNullableWithAggregatesFilter<"TestSettingsSnapshot">
    showDetailedResults?: BoolWithAggregatesFilter<"TestSettingsSnapshot"> | boolean
    shuffleQuestions?: BoolWithAggregatesFilter<"TestSettingsSnapshot"> | boolean
    shuffleAnswers?: BoolWithAggregatesFilter<"TestSettingsSnapshot"> | boolean
    timeLimit?: IntNullableWithAggregatesFilter<"TestSettingsSnapshot"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"TestSettingsSnapshot"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    surname?: string | null
    patronymic?: string | null
    password: string
    isActivated?: boolean
    role?: $Enums.Role
    activationLink?: string | null
    resetCode?: string | null
    isBlocked?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    activationLinkExp?: Date | string | null
    resetCodeExp?: Date | string | null
    testAttempts?: TestAttemptCreateNestedManyWithoutUserInput
    testsCreated?: TestCreateNestedManyWithoutAuthorInput
    refreshToken?: TokenCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    surname?: string | null
    patronymic?: string | null
    password: string
    isActivated?: boolean
    role?: $Enums.Role
    activationLink?: string | null
    resetCode?: string | null
    isBlocked?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    activationLinkExp?: Date | string | null
    resetCodeExp?: Date | string | null
    testAttempts?: TestAttemptUncheckedCreateNestedManyWithoutUserInput
    testsCreated?: TestUncheckedCreateNestedManyWithoutAuthorInput
    refreshToken?: TokenUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    patronymic?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    isActivated?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    activationLink?: NullableStringFieldUpdateOperationsInput | string | null
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activationLinkExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetCodeExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    testAttempts?: TestAttemptUpdateManyWithoutUserNestedInput
    testsCreated?: TestUpdateManyWithoutAuthorNestedInput
    refreshToken?: TokenUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    patronymic?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    isActivated?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    activationLink?: NullableStringFieldUpdateOperationsInput | string | null
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activationLinkExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetCodeExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    testAttempts?: TestAttemptUncheckedUpdateManyWithoutUserNestedInput
    testsCreated?: TestUncheckedUpdateManyWithoutAuthorNestedInput
    refreshToken?: TokenUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    surname?: string | null
    patronymic?: string | null
    password: string
    isActivated?: boolean
    role?: $Enums.Role
    activationLink?: string | null
    resetCode?: string | null
    isBlocked?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    activationLinkExp?: Date | string | null
    resetCodeExp?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    patronymic?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    isActivated?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    activationLink?: NullableStringFieldUpdateOperationsInput | string | null
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activationLinkExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetCodeExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    patronymic?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    isActivated?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    activationLink?: NullableStringFieldUpdateOperationsInput | string | null
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activationLinkExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetCodeExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TokenCreateInput = {
    id?: string
    refreshToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutRefreshTokenInput
  }

  export type TokenUncheckedCreateInput = {
    id?: string
    userId: string
    refreshToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRefreshTokenNestedInput
  }

  export type TokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenCreateManyInput = {
    id?: string
    userId: string
    refreshToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestSettingsCreateInput = {
    id?: string
    requireRegistration?: boolean
    inputFields?: NullableJsonNullValueInput | InputJsonValue
    showDetailedResults?: boolean
    timeLimit?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    shuffleAnswers?: boolean
    shuffleQuestions?: boolean
    test: TestCreateNestedOneWithoutSettingsInput
  }

  export type TestSettingsUncheckedCreateInput = {
    id?: string
    testId: string
    requireRegistration?: boolean
    inputFields?: NullableJsonNullValueInput | InputJsonValue
    showDetailedResults?: boolean
    timeLimit?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    shuffleAnswers?: boolean
    shuffleQuestions?: boolean
  }

  export type TestSettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requireRegistration?: BoolFieldUpdateOperationsInput | boolean
    inputFields?: NullableJsonNullValueInput | InputJsonValue
    showDetailedResults?: BoolFieldUpdateOperationsInput | boolean
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shuffleAnswers?: BoolFieldUpdateOperationsInput | boolean
    shuffleQuestions?: BoolFieldUpdateOperationsInput | boolean
    test?: TestUpdateOneRequiredWithoutSettingsNestedInput
  }

  export type TestSettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    requireRegistration?: BoolFieldUpdateOperationsInput | boolean
    inputFields?: NullableJsonNullValueInput | InputJsonValue
    showDetailedResults?: BoolFieldUpdateOperationsInput | boolean
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shuffleAnswers?: BoolFieldUpdateOperationsInput | boolean
    shuffleQuestions?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TestSettingsCreateManyInput = {
    id?: string
    testId: string
    requireRegistration?: boolean
    inputFields?: NullableJsonNullValueInput | InputJsonValue
    showDetailedResults?: boolean
    timeLimit?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    shuffleAnswers?: boolean
    shuffleQuestions?: boolean
  }

  export type TestSettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    requireRegistration?: BoolFieldUpdateOperationsInput | boolean
    inputFields?: NullableJsonNullValueInput | InputJsonValue
    showDetailedResults?: BoolFieldUpdateOperationsInput | boolean
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shuffleAnswers?: BoolFieldUpdateOperationsInput | boolean
    shuffleQuestions?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TestSettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    requireRegistration?: BoolFieldUpdateOperationsInput | boolean
    inputFields?: NullableJsonNullValueInput | InputJsonValue
    showDetailedResults?: BoolFieldUpdateOperationsInput | boolean
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shuffleAnswers?: BoolFieldUpdateOperationsInput | boolean
    shuffleQuestions?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TestCreateInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ModerationStatus
    totalAttempts?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    visibilityStatus?: $Enums.TestVisibilityStatus
    questions?: QuestionCreateNestedManyWithoutTestInput
    testAttempts?: TestAttemptCreateNestedManyWithoutTestInput
    settings?: TestSettingsCreateNestedOneWithoutTestInput
    snapshots?: TestSnapshotCreateNestedManyWithoutOriginalTestInput
    author: UserCreateNestedOneWithoutTestsCreatedInput
  }

  export type TestUncheckedCreateInput = {
    id?: string
    authorId: string
    title: string
    description?: string | null
    status?: $Enums.ModerationStatus
    totalAttempts?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    visibilityStatus?: $Enums.TestVisibilityStatus
    questions?: QuestionUncheckedCreateNestedManyWithoutTestInput
    testAttempts?: TestAttemptUncheckedCreateNestedManyWithoutTestInput
    settings?: TestSettingsUncheckedCreateNestedOneWithoutTestInput
    snapshots?: TestSnapshotUncheckedCreateNestedManyWithoutOriginalTestInput
  }

  export type TestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    totalAttempts?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
    questions?: QuestionUpdateManyWithoutTestNestedInput
    testAttempts?: TestAttemptUpdateManyWithoutTestNestedInput
    settings?: TestSettingsUpdateOneWithoutTestNestedInput
    snapshots?: TestSnapshotUpdateManyWithoutOriginalTestNestedInput
    author?: UserUpdateOneRequiredWithoutTestsCreatedNestedInput
  }

  export type TestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    totalAttempts?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
    questions?: QuestionUncheckedUpdateManyWithoutTestNestedInput
    testAttempts?: TestAttemptUncheckedUpdateManyWithoutTestNestedInput
    settings?: TestSettingsUncheckedUpdateOneWithoutTestNestedInput
    snapshots?: TestSnapshotUncheckedUpdateManyWithoutOriginalTestNestedInput
  }

  export type TestCreateManyInput = {
    id?: string
    authorId: string
    title: string
    description?: string | null
    status?: $Enums.ModerationStatus
    totalAttempts?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    visibilityStatus?: $Enums.TestVisibilityStatus
  }

  export type TestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    totalAttempts?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
  }

  export type TestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    totalAttempts?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
  }

  export type QuestionCreateInput = {
    id?: string
    text: string
    order: number
    type?: $Enums.QuestionType
    createdAt?: Date | string
    updatedAt?: Date | string
    answers?: AnswerCreateNestedManyWithoutQuestionInput
    test: TestCreateNestedOneWithoutQuestionsInput
    userAnswers?: UserAnswerCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateInput = {
    id?: string
    testId: string
    text: string
    order: number
    type?: $Enums.QuestionType
    createdAt?: Date | string
    updatedAt?: Date | string
    answers?: AnswerUncheckedCreateNestedManyWithoutQuestionInput
    userAnswers?: UserAnswerUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answers?: AnswerUpdateManyWithoutQuestionNestedInput
    test?: TestUpdateOneRequiredWithoutQuestionsNestedInput
    userAnswers?: UserAnswerUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answers?: AnswerUncheckedUpdateManyWithoutQuestionNestedInput
    userAnswers?: UserAnswerUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionCreateManyInput = {
    id?: string
    testId: string
    text: string
    order: number
    type?: $Enums.QuestionType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuestionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnswerCreateInput = {
    id?: string
    text: string
    isCorrect?: boolean
    isGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    question: QuestionCreateNestedOneWithoutAnswersInput
    userAnswers?: UserAnswerCreateNestedManyWithoutAnswerInput
  }

  export type AnswerUncheckedCreateInput = {
    id?: string
    questionId: string
    text: string
    isCorrect?: boolean
    isGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userAnswers?: UserAnswerUncheckedCreateNestedManyWithoutAnswerInput
  }

  export type AnswerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    isGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    question?: QuestionUpdateOneRequiredWithoutAnswersNestedInput
    userAnswers?: UserAnswerUpdateManyWithoutAnswerNestedInput
  }

  export type AnswerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    isGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userAnswers?: UserAnswerUncheckedUpdateManyWithoutAnswerNestedInput
  }

  export type AnswerCreateManyInput = {
    id?: string
    questionId: string
    text: string
    isCorrect?: boolean
    isGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnswerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    isGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnswerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    isGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestAttemptCreateInput = {
    id?: string
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: number | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    status: $Enums.TestAttemptStatus
    updatedAt?: Date | string
    expirationTime?: Date | string | null
    test: TestCreateNestedOneWithoutTestAttemptsInput
    snapshot?: TestSnapshotCreateNestedOneWithoutAttemptsInput
    user?: UserCreateNestedOneWithoutTestAttemptsInput
    answers?: UserAnswerCreateNestedManyWithoutAttemptInput
  }

  export type TestAttemptUncheckedCreateInput = {
    id?: string
    testId: string
    userId?: string | null
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: number | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    status: $Enums.TestAttemptStatus
    updatedAt?: Date | string
    testSnapshotId?: string | null
    expirationTime?: Date | string | null
    answers?: UserAnswerUncheckedCreateNestedManyWithoutAttemptInput
  }

  export type TestAttemptUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTestAttemptStatusFieldUpdateOperationsInput | $Enums.TestAttemptStatus
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    test?: TestUpdateOneRequiredWithoutTestAttemptsNestedInput
    snapshot?: TestSnapshotUpdateOneWithoutAttemptsNestedInput
    user?: UserUpdateOneWithoutTestAttemptsNestedInput
    answers?: UserAnswerUpdateManyWithoutAttemptNestedInput
  }

  export type TestAttemptUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTestAttemptStatusFieldUpdateOperationsInput | $Enums.TestAttemptStatus
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testSnapshotId?: NullableStringFieldUpdateOperationsInput | string | null
    expirationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: UserAnswerUncheckedUpdateManyWithoutAttemptNestedInput
  }

  export type TestAttemptCreateManyInput = {
    id?: string
    testId: string
    userId?: string | null
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: number | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    status: $Enums.TestAttemptStatus
    updatedAt?: Date | string
    testSnapshotId?: string | null
    expirationTime?: Date | string | null
  }

  export type TestAttemptUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTestAttemptStatusFieldUpdateOperationsInput | $Enums.TestAttemptStatus
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TestAttemptUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTestAttemptStatusFieldUpdateOperationsInput | $Enums.TestAttemptStatus
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testSnapshotId?: NullableStringFieldUpdateOperationsInput | string | null
    expirationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserAnswerCreateInput = {
    id?: string
    answeredAt?: Date | string | null
    timeSpent?: number | null
    createdAt?: Date | string
    answer: AnswerCreateNestedOneWithoutUserAnswersInput
    attempt: TestAttemptCreateNestedOneWithoutAnswersInput
    question: QuestionCreateNestedOneWithoutUserAnswersInput
  }

  export type UserAnswerUncheckedCreateInput = {
    id?: string
    attemptId: string
    questionId: string
    answerId: string
    answeredAt?: Date | string | null
    timeSpent?: number | null
    createdAt?: Date | string
  }

  export type UserAnswerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answer?: AnswerUpdateOneRequiredWithoutUserAnswersNestedInput
    attempt?: TestAttemptUpdateOneRequiredWithoutAnswersNestedInput
    question?: QuestionUpdateOneRequiredWithoutUserAnswersNestedInput
  }

  export type UserAnswerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    attemptId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    answerId?: StringFieldUpdateOperationsInput | string
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAnswerCreateManyInput = {
    id?: string
    attemptId: string
    questionId: string
    answerId: string
    answeredAt?: Date | string | null
    timeSpent?: number | null
    createdAt?: Date | string
  }

  export type UserAnswerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAnswerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    attemptId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    answerId?: StringFieldUpdateOperationsInput | string
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestSnapshotCreateInput = {
    id?: string
    title: string
    description?: string | null
    status: $Enums.ModerationStatus
    createdAt?: Date | string
    version?: number
    visibilityStatus?: $Enums.TestVisibilityStatus
    questions?: QuestionSnapshotCreateNestedManyWithoutTestSnapshotInput
    attempts?: TestAttemptCreateNestedManyWithoutSnapshotInput
    settings?: TestSettingsSnapshotCreateNestedOneWithoutSnapshotInput
    originalTest: TestCreateNestedOneWithoutSnapshotsInput
  }

  export type TestSnapshotUncheckedCreateInput = {
    id?: string
    testId: string
    title: string
    description?: string | null
    status: $Enums.ModerationStatus
    createdAt?: Date | string
    version?: number
    visibilityStatus?: $Enums.TestVisibilityStatus
    questions?: QuestionSnapshotUncheckedCreateNestedManyWithoutTestSnapshotInput
    attempts?: TestAttemptUncheckedCreateNestedManyWithoutSnapshotInput
    settings?: TestSettingsSnapshotUncheckedCreateNestedOneWithoutSnapshotInput
  }

  export type TestSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
    questions?: QuestionSnapshotUpdateManyWithoutTestSnapshotNestedInput
    attempts?: TestAttemptUpdateManyWithoutSnapshotNestedInput
    settings?: TestSettingsSnapshotUpdateOneWithoutSnapshotNestedInput
    originalTest?: TestUpdateOneRequiredWithoutSnapshotsNestedInput
  }

  export type TestSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
    questions?: QuestionSnapshotUncheckedUpdateManyWithoutTestSnapshotNestedInput
    attempts?: TestAttemptUncheckedUpdateManyWithoutSnapshotNestedInput
    settings?: TestSettingsSnapshotUncheckedUpdateOneWithoutSnapshotNestedInput
  }

  export type TestSnapshotCreateManyInput = {
    id?: string
    testId: string
    title: string
    description?: string | null
    status: $Enums.ModerationStatus
    createdAt?: Date | string
    version?: number
    visibilityStatus?: $Enums.TestVisibilityStatus
  }

  export type TestSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
  }

  export type TestSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
  }

  export type QuestionSnapshotCreateInput = {
    id?: string
    originalTestId: string
    text: string
    order: number
    type: $Enums.QuestionType
    createdAt?: Date | string
    answers?: AnswerSnapshotCreateNestedManyWithoutQuestionInput
    testSnapshot: TestSnapshotCreateNestedOneWithoutQuestionsInput
  }

  export type QuestionSnapshotUncheckedCreateInput = {
    id?: string
    testSnapshotId: string
    originalTestId: string
    text: string
    order: number
    type: $Enums.QuestionType
    createdAt?: Date | string
    answers?: AnswerSnapshotUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalTestId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answers?: AnswerSnapshotUpdateManyWithoutQuestionNestedInput
    testSnapshot?: TestSnapshotUpdateOneRequiredWithoutQuestionsNestedInput
  }

  export type QuestionSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    testSnapshotId?: StringFieldUpdateOperationsInput | string
    originalTestId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answers?: AnswerSnapshotUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionSnapshotCreateManyInput = {
    id?: string
    testSnapshotId: string
    originalTestId: string
    text: string
    order: number
    type: $Enums.QuestionType
    createdAt?: Date | string
  }

  export type QuestionSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalTestId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    testSnapshotId?: StringFieldUpdateOperationsInput | string
    originalTestId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnswerSnapshotCreateInput = {
    id?: string
    originalTestId: string
    text: string
    isCorrect?: boolean
    createdAt?: Date | string
    question: QuestionSnapshotCreateNestedOneWithoutAnswersInput
  }

  export type AnswerSnapshotUncheckedCreateInput = {
    id?: string
    questionId: string
    originalTestId: string
    text: string
    isCorrect?: boolean
    createdAt?: Date | string
  }

  export type AnswerSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalTestId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    question?: QuestionSnapshotUpdateOneRequiredWithoutAnswersNestedInput
  }

  export type AnswerSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    originalTestId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnswerSnapshotCreateManyInput = {
    id?: string
    questionId: string
    originalTestId: string
    text: string
    isCorrect?: boolean
    createdAt?: Date | string
  }

  export type AnswerSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalTestId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnswerSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    originalTestId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestSettingsSnapshotCreateInput = {
    id?: string
    requireRegistration?: boolean
    inputFields?: NullableJsonNullValueInput | InputJsonValue
    showDetailedResults?: boolean
    shuffleQuestions?: boolean
    shuffleAnswers?: boolean
    timeLimit?: number | null
    createdAt?: Date | string
    snapshot: TestSnapshotCreateNestedOneWithoutSettingsInput
  }

  export type TestSettingsSnapshotUncheckedCreateInput = {
    id?: string
    testSnapshotId: string
    requireRegistration?: boolean
    inputFields?: NullableJsonNullValueInput | InputJsonValue
    showDetailedResults?: boolean
    shuffleQuestions?: boolean
    shuffleAnswers?: boolean
    timeLimit?: number | null
    createdAt?: Date | string
  }

  export type TestSettingsSnapshotUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requireRegistration?: BoolFieldUpdateOperationsInput | boolean
    inputFields?: NullableJsonNullValueInput | InputJsonValue
    showDetailedResults?: BoolFieldUpdateOperationsInput | boolean
    shuffleQuestions?: BoolFieldUpdateOperationsInput | boolean
    shuffleAnswers?: BoolFieldUpdateOperationsInput | boolean
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    snapshot?: TestSnapshotUpdateOneRequiredWithoutSettingsNestedInput
  }

  export type TestSettingsSnapshotUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    testSnapshotId?: StringFieldUpdateOperationsInput | string
    requireRegistration?: BoolFieldUpdateOperationsInput | boolean
    inputFields?: NullableJsonNullValueInput | InputJsonValue
    showDetailedResults?: BoolFieldUpdateOperationsInput | boolean
    shuffleQuestions?: BoolFieldUpdateOperationsInput | boolean
    shuffleAnswers?: BoolFieldUpdateOperationsInput | boolean
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestSettingsSnapshotCreateManyInput = {
    id?: string
    testSnapshotId: string
    requireRegistration?: boolean
    inputFields?: NullableJsonNullValueInput | InputJsonValue
    showDetailedResults?: boolean
    shuffleQuestions?: boolean
    shuffleAnswers?: boolean
    timeLimit?: number | null
    createdAt?: Date | string
  }

  export type TestSettingsSnapshotUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    requireRegistration?: BoolFieldUpdateOperationsInput | boolean
    inputFields?: NullableJsonNullValueInput | InputJsonValue
    showDetailedResults?: BoolFieldUpdateOperationsInput | boolean
    shuffleQuestions?: BoolFieldUpdateOperationsInput | boolean
    shuffleAnswers?: BoolFieldUpdateOperationsInput | boolean
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestSettingsSnapshotUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    testSnapshotId?: StringFieldUpdateOperationsInput | string
    requireRegistration?: BoolFieldUpdateOperationsInput | boolean
    inputFields?: NullableJsonNullValueInput | InputJsonValue
    showDetailedResults?: BoolFieldUpdateOperationsInput | boolean
    shuffleQuestions?: BoolFieldUpdateOperationsInput | boolean
    shuffleAnswers?: BoolFieldUpdateOperationsInput | boolean
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type TestAttemptListRelationFilter = {
    every?: TestAttemptWhereInput
    some?: TestAttemptWhereInput
    none?: TestAttemptWhereInput
  }

  export type TestListRelationFilter = {
    every?: TestWhereInput
    some?: TestWhereInput
    none?: TestWhereInput
  }

  export type TokenNullableScalarRelationFilter = {
    is?: TokenWhereInput | null
    isNot?: TokenWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TestAttemptOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    patronymic?: SortOrder
    password?: SortOrder
    isActivated?: SortOrder
    role?: SortOrder
    activationLink?: SortOrder
    resetCode?: SortOrder
    isBlocked?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    activationLinkExp?: SortOrder
    resetCodeExp?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    patronymic?: SortOrder
    password?: SortOrder
    isActivated?: SortOrder
    role?: SortOrder
    activationLink?: SortOrder
    resetCode?: SortOrder
    isBlocked?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    activationLinkExp?: SortOrder
    resetCodeExp?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    surname?: SortOrder
    patronymic?: SortOrder
    password?: SortOrder
    isActivated?: SortOrder
    role?: SortOrder
    activationLink?: SortOrder
    resetCode?: SortOrder
    isBlocked?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    activationLinkExp?: SortOrder
    resetCodeExp?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TokenCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    refreshToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TokenMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    refreshToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TokenMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    refreshToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type TestScalarRelationFilter = {
    is?: TestWhereInput
    isNot?: TestWhereInput
  }

  export type TestSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    testId?: SortOrder
    requireRegistration?: SortOrder
    inputFields?: SortOrder
    showDetailedResults?: SortOrder
    timeLimit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shuffleAnswers?: SortOrder
    shuffleQuestions?: SortOrder
  }

  export type TestSettingsAvgOrderByAggregateInput = {
    timeLimit?: SortOrder
  }

  export type TestSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    testId?: SortOrder
    requireRegistration?: SortOrder
    showDetailedResults?: SortOrder
    timeLimit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shuffleAnswers?: SortOrder
    shuffleQuestions?: SortOrder
  }

  export type TestSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    testId?: SortOrder
    requireRegistration?: SortOrder
    showDetailedResults?: SortOrder
    timeLimit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    shuffleAnswers?: SortOrder
    shuffleQuestions?: SortOrder
  }

  export type TestSettingsSumOrderByAggregateInput = {
    timeLimit?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumModerationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ModerationStatus | EnumModerationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ModerationStatus[] | ListEnumModerationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ModerationStatus[] | ListEnumModerationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumModerationStatusFilter<$PrismaModel> | $Enums.ModerationStatus
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumTestVisibilityStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TestVisibilityStatus | EnumTestVisibilityStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TestVisibilityStatus[] | ListEnumTestVisibilityStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TestVisibilityStatus[] | ListEnumTestVisibilityStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTestVisibilityStatusFilter<$PrismaModel> | $Enums.TestVisibilityStatus
  }

  export type QuestionListRelationFilter = {
    every?: QuestionWhereInput
    some?: QuestionWhereInput
    none?: QuestionWhereInput
  }

  export type TestSettingsNullableScalarRelationFilter = {
    is?: TestSettingsWhereInput | null
    isNot?: TestSettingsWhereInput | null
  }

  export type TestSnapshotListRelationFilter = {
    every?: TestSnapshotWhereInput
    some?: TestSnapshotWhereInput
    none?: TestSnapshotWhereInput
  }

  export type QuestionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TestSnapshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TestCountOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    totalAttempts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    version?: SortOrder
    visibilityStatus?: SortOrder
  }

  export type TestAvgOrderByAggregateInput = {
    totalAttempts?: SortOrder
    version?: SortOrder
  }

  export type TestMaxOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    totalAttempts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    version?: SortOrder
    visibilityStatus?: SortOrder
  }

  export type TestMinOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    totalAttempts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    version?: SortOrder
    visibilityStatus?: SortOrder
  }

  export type TestSumOrderByAggregateInput = {
    totalAttempts?: SortOrder
    version?: SortOrder
  }

  export type EnumModerationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ModerationStatus | EnumModerationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ModerationStatus[] | ListEnumModerationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ModerationStatus[] | ListEnumModerationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumModerationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ModerationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumModerationStatusFilter<$PrismaModel>
    _max?: NestedEnumModerationStatusFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumTestVisibilityStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TestVisibilityStatus | EnumTestVisibilityStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TestVisibilityStatus[] | ListEnumTestVisibilityStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TestVisibilityStatus[] | ListEnumTestVisibilityStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTestVisibilityStatusWithAggregatesFilter<$PrismaModel> | $Enums.TestVisibilityStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTestVisibilityStatusFilter<$PrismaModel>
    _max?: NestedEnumTestVisibilityStatusFilter<$PrismaModel>
  }

  export type EnumQuestionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionTypeFilter<$PrismaModel> | $Enums.QuestionType
  }

  export type AnswerListRelationFilter = {
    every?: AnswerWhereInput
    some?: AnswerWhereInput
    none?: AnswerWhereInput
  }

  export type UserAnswerListRelationFilter = {
    every?: UserAnswerWhereInput
    some?: UserAnswerWhereInput
    none?: UserAnswerWhereInput
  }

  export type AnswerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserAnswerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuestionCountOrderByAggregateInput = {
    id?: SortOrder
    testId?: SortOrder
    text?: SortOrder
    order?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuestionAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type QuestionMaxOrderByAggregateInput = {
    id?: SortOrder
    testId?: SortOrder
    text?: SortOrder
    order?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuestionMinOrderByAggregateInput = {
    id?: SortOrder
    testId?: SortOrder
    text?: SortOrder
    order?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type QuestionSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type EnumQuestionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel> | $Enums.QuestionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuestionTypeFilter<$PrismaModel>
    _max?: NestedEnumQuestionTypeFilter<$PrismaModel>
  }

  export type QuestionScalarRelationFilter = {
    is?: QuestionWhereInput
    isNot?: QuestionWhereInput
  }

  export type AnswerCountOrderByAggregateInput = {
    id?: SortOrder
    questionId?: SortOrder
    text?: SortOrder
    isCorrect?: SortOrder
    isGenerated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnswerMaxOrderByAggregateInput = {
    id?: SortOrder
    questionId?: SortOrder
    text?: SortOrder
    isCorrect?: SortOrder
    isGenerated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnswerMinOrderByAggregateInput = {
    id?: SortOrder
    questionId?: SortOrder
    text?: SortOrder
    isCorrect?: SortOrder
    isGenerated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type EnumTestAttemptStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TestAttemptStatus | EnumTestAttemptStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TestAttemptStatus[] | ListEnumTestAttemptStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TestAttemptStatus[] | ListEnumTestAttemptStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTestAttemptStatusFilter<$PrismaModel> | $Enums.TestAttemptStatus
  }

  export type TestSnapshotNullableScalarRelationFilter = {
    is?: TestSnapshotWhereInput | null
    isNot?: TestSnapshotWhereInput | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TestAttemptCountOrderByAggregateInput = {
    id?: SortOrder
    testId?: SortOrder
    userId?: SortOrder
    preTestUserData?: SortOrder
    score?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    status?: SortOrder
    updatedAt?: SortOrder
    testSnapshotId?: SortOrder
    expirationTime?: SortOrder
  }

  export type TestAttemptAvgOrderByAggregateInput = {
    score?: SortOrder
  }

  export type TestAttemptMaxOrderByAggregateInput = {
    id?: SortOrder
    testId?: SortOrder
    userId?: SortOrder
    score?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    status?: SortOrder
    updatedAt?: SortOrder
    testSnapshotId?: SortOrder
    expirationTime?: SortOrder
  }

  export type TestAttemptMinOrderByAggregateInput = {
    id?: SortOrder
    testId?: SortOrder
    userId?: SortOrder
    score?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    status?: SortOrder
    updatedAt?: SortOrder
    testSnapshotId?: SortOrder
    expirationTime?: SortOrder
  }

  export type TestAttemptSumOrderByAggregateInput = {
    score?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumTestAttemptStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TestAttemptStatus | EnumTestAttemptStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TestAttemptStatus[] | ListEnumTestAttemptStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TestAttemptStatus[] | ListEnumTestAttemptStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTestAttemptStatusWithAggregatesFilter<$PrismaModel> | $Enums.TestAttemptStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTestAttemptStatusFilter<$PrismaModel>
    _max?: NestedEnumTestAttemptStatusFilter<$PrismaModel>
  }

  export type AnswerScalarRelationFilter = {
    is?: AnswerWhereInput
    isNot?: AnswerWhereInput
  }

  export type TestAttemptScalarRelationFilter = {
    is?: TestAttemptWhereInput
    isNot?: TestAttemptWhereInput
  }

  export type UserAnswerCountOrderByAggregateInput = {
    id?: SortOrder
    attemptId?: SortOrder
    questionId?: SortOrder
    answerId?: SortOrder
    answeredAt?: SortOrder
    timeSpent?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAnswerAvgOrderByAggregateInput = {
    timeSpent?: SortOrder
  }

  export type UserAnswerMaxOrderByAggregateInput = {
    id?: SortOrder
    attemptId?: SortOrder
    questionId?: SortOrder
    answerId?: SortOrder
    answeredAt?: SortOrder
    timeSpent?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAnswerMinOrderByAggregateInput = {
    id?: SortOrder
    attemptId?: SortOrder
    questionId?: SortOrder
    answerId?: SortOrder
    answeredAt?: SortOrder
    timeSpent?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAnswerSumOrderByAggregateInput = {
    timeSpent?: SortOrder
  }

  export type QuestionSnapshotListRelationFilter = {
    every?: QuestionSnapshotWhereInput
    some?: QuestionSnapshotWhereInput
    none?: QuestionSnapshotWhereInput
  }

  export type TestSettingsSnapshotNullableScalarRelationFilter = {
    is?: TestSettingsSnapshotWhereInput | null
    isNot?: TestSettingsSnapshotWhereInput | null
  }

  export type QuestionSnapshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TestSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    testId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    version?: SortOrder
    visibilityStatus?: SortOrder
  }

  export type TestSnapshotAvgOrderByAggregateInput = {
    version?: SortOrder
  }

  export type TestSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    testId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    version?: SortOrder
    visibilityStatus?: SortOrder
  }

  export type TestSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    testId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    version?: SortOrder
    visibilityStatus?: SortOrder
  }

  export type TestSnapshotSumOrderByAggregateInput = {
    version?: SortOrder
  }

  export type AnswerSnapshotListRelationFilter = {
    every?: AnswerSnapshotWhereInput
    some?: AnswerSnapshotWhereInput
    none?: AnswerSnapshotWhereInput
  }

  export type TestSnapshotScalarRelationFilter = {
    is?: TestSnapshotWhereInput
    isNot?: TestSnapshotWhereInput
  }

  export type AnswerSnapshotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuestionSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    testSnapshotId?: SortOrder
    originalTestId?: SortOrder
    text?: SortOrder
    order?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type QuestionSnapshotAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type QuestionSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    testSnapshotId?: SortOrder
    originalTestId?: SortOrder
    text?: SortOrder
    order?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type QuestionSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    testSnapshotId?: SortOrder
    originalTestId?: SortOrder
    text?: SortOrder
    order?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type QuestionSnapshotSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type QuestionSnapshotScalarRelationFilter = {
    is?: QuestionSnapshotWhereInput
    isNot?: QuestionSnapshotWhereInput
  }

  export type AnswerSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    questionId?: SortOrder
    originalTestId?: SortOrder
    text?: SortOrder
    isCorrect?: SortOrder
    createdAt?: SortOrder
  }

  export type AnswerSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    questionId?: SortOrder
    originalTestId?: SortOrder
    text?: SortOrder
    isCorrect?: SortOrder
    createdAt?: SortOrder
  }

  export type AnswerSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    questionId?: SortOrder
    originalTestId?: SortOrder
    text?: SortOrder
    isCorrect?: SortOrder
    createdAt?: SortOrder
  }

  export type TestSettingsSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    testSnapshotId?: SortOrder
    requireRegistration?: SortOrder
    inputFields?: SortOrder
    showDetailedResults?: SortOrder
    shuffleQuestions?: SortOrder
    shuffleAnswers?: SortOrder
    timeLimit?: SortOrder
    createdAt?: SortOrder
  }

  export type TestSettingsSnapshotAvgOrderByAggregateInput = {
    timeLimit?: SortOrder
  }

  export type TestSettingsSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    testSnapshotId?: SortOrder
    requireRegistration?: SortOrder
    showDetailedResults?: SortOrder
    shuffleQuestions?: SortOrder
    shuffleAnswers?: SortOrder
    timeLimit?: SortOrder
    createdAt?: SortOrder
  }

  export type TestSettingsSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    testSnapshotId?: SortOrder
    requireRegistration?: SortOrder
    showDetailedResults?: SortOrder
    shuffleQuestions?: SortOrder
    shuffleAnswers?: SortOrder
    timeLimit?: SortOrder
    createdAt?: SortOrder
  }

  export type TestSettingsSnapshotSumOrderByAggregateInput = {
    timeLimit?: SortOrder
  }

  export type TestAttemptCreateNestedManyWithoutUserInput = {
    create?: XOR<TestAttemptCreateWithoutUserInput, TestAttemptUncheckedCreateWithoutUserInput> | TestAttemptCreateWithoutUserInput[] | TestAttemptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TestAttemptCreateOrConnectWithoutUserInput | TestAttemptCreateOrConnectWithoutUserInput[]
    createMany?: TestAttemptCreateManyUserInputEnvelope
    connect?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
  }

  export type TestCreateNestedManyWithoutAuthorInput = {
    create?: XOR<TestCreateWithoutAuthorInput, TestUncheckedCreateWithoutAuthorInput> | TestCreateWithoutAuthorInput[] | TestUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TestCreateOrConnectWithoutAuthorInput | TestCreateOrConnectWithoutAuthorInput[]
    createMany?: TestCreateManyAuthorInputEnvelope
    connect?: TestWhereUniqueInput | TestWhereUniqueInput[]
  }

  export type TokenCreateNestedOneWithoutUserInput = {
    create?: XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput>
    connectOrCreate?: TokenCreateOrConnectWithoutUserInput
    connect?: TokenWhereUniqueInput
  }

  export type TestAttemptUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TestAttemptCreateWithoutUserInput, TestAttemptUncheckedCreateWithoutUserInput> | TestAttemptCreateWithoutUserInput[] | TestAttemptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TestAttemptCreateOrConnectWithoutUserInput | TestAttemptCreateOrConnectWithoutUserInput[]
    createMany?: TestAttemptCreateManyUserInputEnvelope
    connect?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
  }

  export type TestUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<TestCreateWithoutAuthorInput, TestUncheckedCreateWithoutAuthorInput> | TestCreateWithoutAuthorInput[] | TestUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TestCreateOrConnectWithoutAuthorInput | TestCreateOrConnectWithoutAuthorInput[]
    createMany?: TestCreateManyAuthorInputEnvelope
    connect?: TestWhereUniqueInput | TestWhereUniqueInput[]
  }

  export type TokenUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput>
    connectOrCreate?: TokenCreateOrConnectWithoutUserInput
    connect?: TokenWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type TestAttemptUpdateManyWithoutUserNestedInput = {
    create?: XOR<TestAttemptCreateWithoutUserInput, TestAttemptUncheckedCreateWithoutUserInput> | TestAttemptCreateWithoutUserInput[] | TestAttemptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TestAttemptCreateOrConnectWithoutUserInput | TestAttemptCreateOrConnectWithoutUserInput[]
    upsert?: TestAttemptUpsertWithWhereUniqueWithoutUserInput | TestAttemptUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TestAttemptCreateManyUserInputEnvelope
    set?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
    disconnect?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
    delete?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
    connect?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
    update?: TestAttemptUpdateWithWhereUniqueWithoutUserInput | TestAttemptUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TestAttemptUpdateManyWithWhereWithoutUserInput | TestAttemptUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TestAttemptScalarWhereInput | TestAttemptScalarWhereInput[]
  }

  export type TestUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<TestCreateWithoutAuthorInput, TestUncheckedCreateWithoutAuthorInput> | TestCreateWithoutAuthorInput[] | TestUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TestCreateOrConnectWithoutAuthorInput | TestCreateOrConnectWithoutAuthorInput[]
    upsert?: TestUpsertWithWhereUniqueWithoutAuthorInput | TestUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: TestCreateManyAuthorInputEnvelope
    set?: TestWhereUniqueInput | TestWhereUniqueInput[]
    disconnect?: TestWhereUniqueInput | TestWhereUniqueInput[]
    delete?: TestWhereUniqueInput | TestWhereUniqueInput[]
    connect?: TestWhereUniqueInput | TestWhereUniqueInput[]
    update?: TestUpdateWithWhereUniqueWithoutAuthorInput | TestUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: TestUpdateManyWithWhereWithoutAuthorInput | TestUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: TestScalarWhereInput | TestScalarWhereInput[]
  }

  export type TokenUpdateOneWithoutUserNestedInput = {
    create?: XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput>
    connectOrCreate?: TokenCreateOrConnectWithoutUserInput
    upsert?: TokenUpsertWithoutUserInput
    disconnect?: TokenWhereInput | boolean
    delete?: TokenWhereInput | boolean
    connect?: TokenWhereUniqueInput
    update?: XOR<XOR<TokenUpdateToOneWithWhereWithoutUserInput, TokenUpdateWithoutUserInput>, TokenUncheckedUpdateWithoutUserInput>
  }

  export type TestAttemptUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TestAttemptCreateWithoutUserInput, TestAttemptUncheckedCreateWithoutUserInput> | TestAttemptCreateWithoutUserInput[] | TestAttemptUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TestAttemptCreateOrConnectWithoutUserInput | TestAttemptCreateOrConnectWithoutUserInput[]
    upsert?: TestAttemptUpsertWithWhereUniqueWithoutUserInput | TestAttemptUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TestAttemptCreateManyUserInputEnvelope
    set?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
    disconnect?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
    delete?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
    connect?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
    update?: TestAttemptUpdateWithWhereUniqueWithoutUserInput | TestAttemptUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TestAttemptUpdateManyWithWhereWithoutUserInput | TestAttemptUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TestAttemptScalarWhereInput | TestAttemptScalarWhereInput[]
  }

  export type TestUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<TestCreateWithoutAuthorInput, TestUncheckedCreateWithoutAuthorInput> | TestCreateWithoutAuthorInput[] | TestUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TestCreateOrConnectWithoutAuthorInput | TestCreateOrConnectWithoutAuthorInput[]
    upsert?: TestUpsertWithWhereUniqueWithoutAuthorInput | TestUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: TestCreateManyAuthorInputEnvelope
    set?: TestWhereUniqueInput | TestWhereUniqueInput[]
    disconnect?: TestWhereUniqueInput | TestWhereUniqueInput[]
    delete?: TestWhereUniqueInput | TestWhereUniqueInput[]
    connect?: TestWhereUniqueInput | TestWhereUniqueInput[]
    update?: TestUpdateWithWhereUniqueWithoutAuthorInput | TestUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: TestUpdateManyWithWhereWithoutAuthorInput | TestUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: TestScalarWhereInput | TestScalarWhereInput[]
  }

  export type TokenUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput>
    connectOrCreate?: TokenCreateOrConnectWithoutUserInput
    upsert?: TokenUpsertWithoutUserInput
    disconnect?: TokenWhereInput | boolean
    delete?: TokenWhereInput | boolean
    connect?: TokenWhereUniqueInput
    update?: XOR<XOR<TokenUpdateToOneWithWhereWithoutUserInput, TokenUpdateWithoutUserInput>, TokenUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutRefreshTokenInput = {
    create?: XOR<UserCreateWithoutRefreshTokenInput, UserUncheckedCreateWithoutRefreshTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokenInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRefreshTokenNestedInput = {
    create?: XOR<UserCreateWithoutRefreshTokenInput, UserUncheckedCreateWithoutRefreshTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokenInput
    upsert?: UserUpsertWithoutRefreshTokenInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRefreshTokenInput, UserUpdateWithoutRefreshTokenInput>, UserUncheckedUpdateWithoutRefreshTokenInput>
  }

  export type TestCreateNestedOneWithoutSettingsInput = {
    create?: XOR<TestCreateWithoutSettingsInput, TestUncheckedCreateWithoutSettingsInput>
    connectOrCreate?: TestCreateOrConnectWithoutSettingsInput
    connect?: TestWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TestUpdateOneRequiredWithoutSettingsNestedInput = {
    create?: XOR<TestCreateWithoutSettingsInput, TestUncheckedCreateWithoutSettingsInput>
    connectOrCreate?: TestCreateOrConnectWithoutSettingsInput
    upsert?: TestUpsertWithoutSettingsInput
    connect?: TestWhereUniqueInput
    update?: XOR<XOR<TestUpdateToOneWithWhereWithoutSettingsInput, TestUpdateWithoutSettingsInput>, TestUncheckedUpdateWithoutSettingsInput>
  }

  export type QuestionCreateNestedManyWithoutTestInput = {
    create?: XOR<QuestionCreateWithoutTestInput, QuestionUncheckedCreateWithoutTestInput> | QuestionCreateWithoutTestInput[] | QuestionUncheckedCreateWithoutTestInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutTestInput | QuestionCreateOrConnectWithoutTestInput[]
    createMany?: QuestionCreateManyTestInputEnvelope
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
  }

  export type TestAttemptCreateNestedManyWithoutTestInput = {
    create?: XOR<TestAttemptCreateWithoutTestInput, TestAttemptUncheckedCreateWithoutTestInput> | TestAttemptCreateWithoutTestInput[] | TestAttemptUncheckedCreateWithoutTestInput[]
    connectOrCreate?: TestAttemptCreateOrConnectWithoutTestInput | TestAttemptCreateOrConnectWithoutTestInput[]
    createMany?: TestAttemptCreateManyTestInputEnvelope
    connect?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
  }

  export type TestSettingsCreateNestedOneWithoutTestInput = {
    create?: XOR<TestSettingsCreateWithoutTestInput, TestSettingsUncheckedCreateWithoutTestInput>
    connectOrCreate?: TestSettingsCreateOrConnectWithoutTestInput
    connect?: TestSettingsWhereUniqueInput
  }

  export type TestSnapshotCreateNestedManyWithoutOriginalTestInput = {
    create?: XOR<TestSnapshotCreateWithoutOriginalTestInput, TestSnapshotUncheckedCreateWithoutOriginalTestInput> | TestSnapshotCreateWithoutOriginalTestInput[] | TestSnapshotUncheckedCreateWithoutOriginalTestInput[]
    connectOrCreate?: TestSnapshotCreateOrConnectWithoutOriginalTestInput | TestSnapshotCreateOrConnectWithoutOriginalTestInput[]
    createMany?: TestSnapshotCreateManyOriginalTestInputEnvelope
    connect?: TestSnapshotWhereUniqueInput | TestSnapshotWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutTestsCreatedInput = {
    create?: XOR<UserCreateWithoutTestsCreatedInput, UserUncheckedCreateWithoutTestsCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutTestsCreatedInput
    connect?: UserWhereUniqueInput
  }

  export type QuestionUncheckedCreateNestedManyWithoutTestInput = {
    create?: XOR<QuestionCreateWithoutTestInput, QuestionUncheckedCreateWithoutTestInput> | QuestionCreateWithoutTestInput[] | QuestionUncheckedCreateWithoutTestInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutTestInput | QuestionCreateOrConnectWithoutTestInput[]
    createMany?: QuestionCreateManyTestInputEnvelope
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
  }

  export type TestAttemptUncheckedCreateNestedManyWithoutTestInput = {
    create?: XOR<TestAttemptCreateWithoutTestInput, TestAttemptUncheckedCreateWithoutTestInput> | TestAttemptCreateWithoutTestInput[] | TestAttemptUncheckedCreateWithoutTestInput[]
    connectOrCreate?: TestAttemptCreateOrConnectWithoutTestInput | TestAttemptCreateOrConnectWithoutTestInput[]
    createMany?: TestAttemptCreateManyTestInputEnvelope
    connect?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
  }

  export type TestSettingsUncheckedCreateNestedOneWithoutTestInput = {
    create?: XOR<TestSettingsCreateWithoutTestInput, TestSettingsUncheckedCreateWithoutTestInput>
    connectOrCreate?: TestSettingsCreateOrConnectWithoutTestInput
    connect?: TestSettingsWhereUniqueInput
  }

  export type TestSnapshotUncheckedCreateNestedManyWithoutOriginalTestInput = {
    create?: XOR<TestSnapshotCreateWithoutOriginalTestInput, TestSnapshotUncheckedCreateWithoutOriginalTestInput> | TestSnapshotCreateWithoutOriginalTestInput[] | TestSnapshotUncheckedCreateWithoutOriginalTestInput[]
    connectOrCreate?: TestSnapshotCreateOrConnectWithoutOriginalTestInput | TestSnapshotCreateOrConnectWithoutOriginalTestInput[]
    createMany?: TestSnapshotCreateManyOriginalTestInputEnvelope
    connect?: TestSnapshotWhereUniqueInput | TestSnapshotWhereUniqueInput[]
  }

  export type EnumModerationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ModerationStatus
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumTestVisibilityStatusFieldUpdateOperationsInput = {
    set?: $Enums.TestVisibilityStatus
  }

  export type QuestionUpdateManyWithoutTestNestedInput = {
    create?: XOR<QuestionCreateWithoutTestInput, QuestionUncheckedCreateWithoutTestInput> | QuestionCreateWithoutTestInput[] | QuestionUncheckedCreateWithoutTestInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutTestInput | QuestionCreateOrConnectWithoutTestInput[]
    upsert?: QuestionUpsertWithWhereUniqueWithoutTestInput | QuestionUpsertWithWhereUniqueWithoutTestInput[]
    createMany?: QuestionCreateManyTestInputEnvelope
    set?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    disconnect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    delete?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    update?: QuestionUpdateWithWhereUniqueWithoutTestInput | QuestionUpdateWithWhereUniqueWithoutTestInput[]
    updateMany?: QuestionUpdateManyWithWhereWithoutTestInput | QuestionUpdateManyWithWhereWithoutTestInput[]
    deleteMany?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
  }

  export type TestAttemptUpdateManyWithoutTestNestedInput = {
    create?: XOR<TestAttemptCreateWithoutTestInput, TestAttemptUncheckedCreateWithoutTestInput> | TestAttemptCreateWithoutTestInput[] | TestAttemptUncheckedCreateWithoutTestInput[]
    connectOrCreate?: TestAttemptCreateOrConnectWithoutTestInput | TestAttemptCreateOrConnectWithoutTestInput[]
    upsert?: TestAttemptUpsertWithWhereUniqueWithoutTestInput | TestAttemptUpsertWithWhereUniqueWithoutTestInput[]
    createMany?: TestAttemptCreateManyTestInputEnvelope
    set?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
    disconnect?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
    delete?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
    connect?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
    update?: TestAttemptUpdateWithWhereUniqueWithoutTestInput | TestAttemptUpdateWithWhereUniqueWithoutTestInput[]
    updateMany?: TestAttemptUpdateManyWithWhereWithoutTestInput | TestAttemptUpdateManyWithWhereWithoutTestInput[]
    deleteMany?: TestAttemptScalarWhereInput | TestAttemptScalarWhereInput[]
  }

  export type TestSettingsUpdateOneWithoutTestNestedInput = {
    create?: XOR<TestSettingsCreateWithoutTestInput, TestSettingsUncheckedCreateWithoutTestInput>
    connectOrCreate?: TestSettingsCreateOrConnectWithoutTestInput
    upsert?: TestSettingsUpsertWithoutTestInput
    disconnect?: TestSettingsWhereInput | boolean
    delete?: TestSettingsWhereInput | boolean
    connect?: TestSettingsWhereUniqueInput
    update?: XOR<XOR<TestSettingsUpdateToOneWithWhereWithoutTestInput, TestSettingsUpdateWithoutTestInput>, TestSettingsUncheckedUpdateWithoutTestInput>
  }

  export type TestSnapshotUpdateManyWithoutOriginalTestNestedInput = {
    create?: XOR<TestSnapshotCreateWithoutOriginalTestInput, TestSnapshotUncheckedCreateWithoutOriginalTestInput> | TestSnapshotCreateWithoutOriginalTestInput[] | TestSnapshotUncheckedCreateWithoutOriginalTestInput[]
    connectOrCreate?: TestSnapshotCreateOrConnectWithoutOriginalTestInput | TestSnapshotCreateOrConnectWithoutOriginalTestInput[]
    upsert?: TestSnapshotUpsertWithWhereUniqueWithoutOriginalTestInput | TestSnapshotUpsertWithWhereUniqueWithoutOriginalTestInput[]
    createMany?: TestSnapshotCreateManyOriginalTestInputEnvelope
    set?: TestSnapshotWhereUniqueInput | TestSnapshotWhereUniqueInput[]
    disconnect?: TestSnapshotWhereUniqueInput | TestSnapshotWhereUniqueInput[]
    delete?: TestSnapshotWhereUniqueInput | TestSnapshotWhereUniqueInput[]
    connect?: TestSnapshotWhereUniqueInput | TestSnapshotWhereUniqueInput[]
    update?: TestSnapshotUpdateWithWhereUniqueWithoutOriginalTestInput | TestSnapshotUpdateWithWhereUniqueWithoutOriginalTestInput[]
    updateMany?: TestSnapshotUpdateManyWithWhereWithoutOriginalTestInput | TestSnapshotUpdateManyWithWhereWithoutOriginalTestInput[]
    deleteMany?: TestSnapshotScalarWhereInput | TestSnapshotScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutTestsCreatedNestedInput = {
    create?: XOR<UserCreateWithoutTestsCreatedInput, UserUncheckedCreateWithoutTestsCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutTestsCreatedInput
    upsert?: UserUpsertWithoutTestsCreatedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTestsCreatedInput, UserUpdateWithoutTestsCreatedInput>, UserUncheckedUpdateWithoutTestsCreatedInput>
  }

  export type QuestionUncheckedUpdateManyWithoutTestNestedInput = {
    create?: XOR<QuestionCreateWithoutTestInput, QuestionUncheckedCreateWithoutTestInput> | QuestionCreateWithoutTestInput[] | QuestionUncheckedCreateWithoutTestInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutTestInput | QuestionCreateOrConnectWithoutTestInput[]
    upsert?: QuestionUpsertWithWhereUniqueWithoutTestInput | QuestionUpsertWithWhereUniqueWithoutTestInput[]
    createMany?: QuestionCreateManyTestInputEnvelope
    set?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    disconnect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    delete?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    update?: QuestionUpdateWithWhereUniqueWithoutTestInput | QuestionUpdateWithWhereUniqueWithoutTestInput[]
    updateMany?: QuestionUpdateManyWithWhereWithoutTestInput | QuestionUpdateManyWithWhereWithoutTestInput[]
    deleteMany?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
  }

  export type TestAttemptUncheckedUpdateManyWithoutTestNestedInput = {
    create?: XOR<TestAttemptCreateWithoutTestInput, TestAttemptUncheckedCreateWithoutTestInput> | TestAttemptCreateWithoutTestInput[] | TestAttemptUncheckedCreateWithoutTestInput[]
    connectOrCreate?: TestAttemptCreateOrConnectWithoutTestInput | TestAttemptCreateOrConnectWithoutTestInput[]
    upsert?: TestAttemptUpsertWithWhereUniqueWithoutTestInput | TestAttemptUpsertWithWhereUniqueWithoutTestInput[]
    createMany?: TestAttemptCreateManyTestInputEnvelope
    set?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
    disconnect?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
    delete?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
    connect?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
    update?: TestAttemptUpdateWithWhereUniqueWithoutTestInput | TestAttemptUpdateWithWhereUniqueWithoutTestInput[]
    updateMany?: TestAttemptUpdateManyWithWhereWithoutTestInput | TestAttemptUpdateManyWithWhereWithoutTestInput[]
    deleteMany?: TestAttemptScalarWhereInput | TestAttemptScalarWhereInput[]
  }

  export type TestSettingsUncheckedUpdateOneWithoutTestNestedInput = {
    create?: XOR<TestSettingsCreateWithoutTestInput, TestSettingsUncheckedCreateWithoutTestInput>
    connectOrCreate?: TestSettingsCreateOrConnectWithoutTestInput
    upsert?: TestSettingsUpsertWithoutTestInput
    disconnect?: TestSettingsWhereInput | boolean
    delete?: TestSettingsWhereInput | boolean
    connect?: TestSettingsWhereUniqueInput
    update?: XOR<XOR<TestSettingsUpdateToOneWithWhereWithoutTestInput, TestSettingsUpdateWithoutTestInput>, TestSettingsUncheckedUpdateWithoutTestInput>
  }

  export type TestSnapshotUncheckedUpdateManyWithoutOriginalTestNestedInput = {
    create?: XOR<TestSnapshotCreateWithoutOriginalTestInput, TestSnapshotUncheckedCreateWithoutOriginalTestInput> | TestSnapshotCreateWithoutOriginalTestInput[] | TestSnapshotUncheckedCreateWithoutOriginalTestInput[]
    connectOrCreate?: TestSnapshotCreateOrConnectWithoutOriginalTestInput | TestSnapshotCreateOrConnectWithoutOriginalTestInput[]
    upsert?: TestSnapshotUpsertWithWhereUniqueWithoutOriginalTestInput | TestSnapshotUpsertWithWhereUniqueWithoutOriginalTestInput[]
    createMany?: TestSnapshotCreateManyOriginalTestInputEnvelope
    set?: TestSnapshotWhereUniqueInput | TestSnapshotWhereUniqueInput[]
    disconnect?: TestSnapshotWhereUniqueInput | TestSnapshotWhereUniqueInput[]
    delete?: TestSnapshotWhereUniqueInput | TestSnapshotWhereUniqueInput[]
    connect?: TestSnapshotWhereUniqueInput | TestSnapshotWhereUniqueInput[]
    update?: TestSnapshotUpdateWithWhereUniqueWithoutOriginalTestInput | TestSnapshotUpdateWithWhereUniqueWithoutOriginalTestInput[]
    updateMany?: TestSnapshotUpdateManyWithWhereWithoutOriginalTestInput | TestSnapshotUpdateManyWithWhereWithoutOriginalTestInput[]
    deleteMany?: TestSnapshotScalarWhereInput | TestSnapshotScalarWhereInput[]
  }

  export type AnswerCreateNestedManyWithoutQuestionInput = {
    create?: XOR<AnswerCreateWithoutQuestionInput, AnswerUncheckedCreateWithoutQuestionInput> | AnswerCreateWithoutQuestionInput[] | AnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: AnswerCreateOrConnectWithoutQuestionInput | AnswerCreateOrConnectWithoutQuestionInput[]
    createMany?: AnswerCreateManyQuestionInputEnvelope
    connect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
  }

  export type TestCreateNestedOneWithoutQuestionsInput = {
    create?: XOR<TestCreateWithoutQuestionsInput, TestUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: TestCreateOrConnectWithoutQuestionsInput
    connect?: TestWhereUniqueInput
  }

  export type UserAnswerCreateNestedManyWithoutQuestionInput = {
    create?: XOR<UserAnswerCreateWithoutQuestionInput, UserAnswerUncheckedCreateWithoutQuestionInput> | UserAnswerCreateWithoutQuestionInput[] | UserAnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutQuestionInput | UserAnswerCreateOrConnectWithoutQuestionInput[]
    createMany?: UserAnswerCreateManyQuestionInputEnvelope
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
  }

  export type AnswerUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: XOR<AnswerCreateWithoutQuestionInput, AnswerUncheckedCreateWithoutQuestionInput> | AnswerCreateWithoutQuestionInput[] | AnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: AnswerCreateOrConnectWithoutQuestionInput | AnswerCreateOrConnectWithoutQuestionInput[]
    createMany?: AnswerCreateManyQuestionInputEnvelope
    connect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
  }

  export type UserAnswerUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: XOR<UserAnswerCreateWithoutQuestionInput, UserAnswerUncheckedCreateWithoutQuestionInput> | UserAnswerCreateWithoutQuestionInput[] | UserAnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutQuestionInput | UserAnswerCreateOrConnectWithoutQuestionInput[]
    createMany?: UserAnswerCreateManyQuestionInputEnvelope
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
  }

  export type EnumQuestionTypeFieldUpdateOperationsInput = {
    set?: $Enums.QuestionType
  }

  export type AnswerUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<AnswerCreateWithoutQuestionInput, AnswerUncheckedCreateWithoutQuestionInput> | AnswerCreateWithoutQuestionInput[] | AnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: AnswerCreateOrConnectWithoutQuestionInput | AnswerCreateOrConnectWithoutQuestionInput[]
    upsert?: AnswerUpsertWithWhereUniqueWithoutQuestionInput | AnswerUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: AnswerCreateManyQuestionInputEnvelope
    set?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    disconnect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    delete?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    connect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    update?: AnswerUpdateWithWhereUniqueWithoutQuestionInput | AnswerUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: AnswerUpdateManyWithWhereWithoutQuestionInput | AnswerUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: AnswerScalarWhereInput | AnswerScalarWhereInput[]
  }

  export type TestUpdateOneRequiredWithoutQuestionsNestedInput = {
    create?: XOR<TestCreateWithoutQuestionsInput, TestUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: TestCreateOrConnectWithoutQuestionsInput
    upsert?: TestUpsertWithoutQuestionsInput
    connect?: TestWhereUniqueInput
    update?: XOR<XOR<TestUpdateToOneWithWhereWithoutQuestionsInput, TestUpdateWithoutQuestionsInput>, TestUncheckedUpdateWithoutQuestionsInput>
  }

  export type UserAnswerUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<UserAnswerCreateWithoutQuestionInput, UserAnswerUncheckedCreateWithoutQuestionInput> | UserAnswerCreateWithoutQuestionInput[] | UserAnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutQuestionInput | UserAnswerCreateOrConnectWithoutQuestionInput[]
    upsert?: UserAnswerUpsertWithWhereUniqueWithoutQuestionInput | UserAnswerUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: UserAnswerCreateManyQuestionInputEnvelope
    set?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    disconnect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    delete?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    update?: UserAnswerUpdateWithWhereUniqueWithoutQuestionInput | UserAnswerUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: UserAnswerUpdateManyWithWhereWithoutQuestionInput | UserAnswerUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: UserAnswerScalarWhereInput | UserAnswerScalarWhereInput[]
  }

  export type AnswerUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<AnswerCreateWithoutQuestionInput, AnswerUncheckedCreateWithoutQuestionInput> | AnswerCreateWithoutQuestionInput[] | AnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: AnswerCreateOrConnectWithoutQuestionInput | AnswerCreateOrConnectWithoutQuestionInput[]
    upsert?: AnswerUpsertWithWhereUniqueWithoutQuestionInput | AnswerUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: AnswerCreateManyQuestionInputEnvelope
    set?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    disconnect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    delete?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    connect?: AnswerWhereUniqueInput | AnswerWhereUniqueInput[]
    update?: AnswerUpdateWithWhereUniqueWithoutQuestionInput | AnswerUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: AnswerUpdateManyWithWhereWithoutQuestionInput | AnswerUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: AnswerScalarWhereInput | AnswerScalarWhereInput[]
  }

  export type UserAnswerUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<UserAnswerCreateWithoutQuestionInput, UserAnswerUncheckedCreateWithoutQuestionInput> | UserAnswerCreateWithoutQuestionInput[] | UserAnswerUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutQuestionInput | UserAnswerCreateOrConnectWithoutQuestionInput[]
    upsert?: UserAnswerUpsertWithWhereUniqueWithoutQuestionInput | UserAnswerUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: UserAnswerCreateManyQuestionInputEnvelope
    set?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    disconnect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    delete?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    update?: UserAnswerUpdateWithWhereUniqueWithoutQuestionInput | UserAnswerUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: UserAnswerUpdateManyWithWhereWithoutQuestionInput | UserAnswerUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: UserAnswerScalarWhereInput | UserAnswerScalarWhereInput[]
  }

  export type QuestionCreateNestedOneWithoutAnswersInput = {
    create?: XOR<QuestionCreateWithoutAnswersInput, QuestionUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutAnswersInput
    connect?: QuestionWhereUniqueInput
  }

  export type UserAnswerCreateNestedManyWithoutAnswerInput = {
    create?: XOR<UserAnswerCreateWithoutAnswerInput, UserAnswerUncheckedCreateWithoutAnswerInput> | UserAnswerCreateWithoutAnswerInput[] | UserAnswerUncheckedCreateWithoutAnswerInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutAnswerInput | UserAnswerCreateOrConnectWithoutAnswerInput[]
    createMany?: UserAnswerCreateManyAnswerInputEnvelope
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
  }

  export type UserAnswerUncheckedCreateNestedManyWithoutAnswerInput = {
    create?: XOR<UserAnswerCreateWithoutAnswerInput, UserAnswerUncheckedCreateWithoutAnswerInput> | UserAnswerCreateWithoutAnswerInput[] | UserAnswerUncheckedCreateWithoutAnswerInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutAnswerInput | UserAnswerCreateOrConnectWithoutAnswerInput[]
    createMany?: UserAnswerCreateManyAnswerInputEnvelope
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
  }

  export type QuestionUpdateOneRequiredWithoutAnswersNestedInput = {
    create?: XOR<QuestionCreateWithoutAnswersInput, QuestionUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutAnswersInput
    upsert?: QuestionUpsertWithoutAnswersInput
    connect?: QuestionWhereUniqueInput
    update?: XOR<XOR<QuestionUpdateToOneWithWhereWithoutAnswersInput, QuestionUpdateWithoutAnswersInput>, QuestionUncheckedUpdateWithoutAnswersInput>
  }

  export type UserAnswerUpdateManyWithoutAnswerNestedInput = {
    create?: XOR<UserAnswerCreateWithoutAnswerInput, UserAnswerUncheckedCreateWithoutAnswerInput> | UserAnswerCreateWithoutAnswerInput[] | UserAnswerUncheckedCreateWithoutAnswerInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutAnswerInput | UserAnswerCreateOrConnectWithoutAnswerInput[]
    upsert?: UserAnswerUpsertWithWhereUniqueWithoutAnswerInput | UserAnswerUpsertWithWhereUniqueWithoutAnswerInput[]
    createMany?: UserAnswerCreateManyAnswerInputEnvelope
    set?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    disconnect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    delete?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    update?: UserAnswerUpdateWithWhereUniqueWithoutAnswerInput | UserAnswerUpdateWithWhereUniqueWithoutAnswerInput[]
    updateMany?: UserAnswerUpdateManyWithWhereWithoutAnswerInput | UserAnswerUpdateManyWithWhereWithoutAnswerInput[]
    deleteMany?: UserAnswerScalarWhereInput | UserAnswerScalarWhereInput[]
  }

  export type UserAnswerUncheckedUpdateManyWithoutAnswerNestedInput = {
    create?: XOR<UserAnswerCreateWithoutAnswerInput, UserAnswerUncheckedCreateWithoutAnswerInput> | UserAnswerCreateWithoutAnswerInput[] | UserAnswerUncheckedCreateWithoutAnswerInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutAnswerInput | UserAnswerCreateOrConnectWithoutAnswerInput[]
    upsert?: UserAnswerUpsertWithWhereUniqueWithoutAnswerInput | UserAnswerUpsertWithWhereUniqueWithoutAnswerInput[]
    createMany?: UserAnswerCreateManyAnswerInputEnvelope
    set?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    disconnect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    delete?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    update?: UserAnswerUpdateWithWhereUniqueWithoutAnswerInput | UserAnswerUpdateWithWhereUniqueWithoutAnswerInput[]
    updateMany?: UserAnswerUpdateManyWithWhereWithoutAnswerInput | UserAnswerUpdateManyWithWhereWithoutAnswerInput[]
    deleteMany?: UserAnswerScalarWhereInput | UserAnswerScalarWhereInput[]
  }

  export type TestCreateNestedOneWithoutTestAttemptsInput = {
    create?: XOR<TestCreateWithoutTestAttemptsInput, TestUncheckedCreateWithoutTestAttemptsInput>
    connectOrCreate?: TestCreateOrConnectWithoutTestAttemptsInput
    connect?: TestWhereUniqueInput
  }

  export type TestSnapshotCreateNestedOneWithoutAttemptsInput = {
    create?: XOR<TestSnapshotCreateWithoutAttemptsInput, TestSnapshotUncheckedCreateWithoutAttemptsInput>
    connectOrCreate?: TestSnapshotCreateOrConnectWithoutAttemptsInput
    connect?: TestSnapshotWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTestAttemptsInput = {
    create?: XOR<UserCreateWithoutTestAttemptsInput, UserUncheckedCreateWithoutTestAttemptsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTestAttemptsInput
    connect?: UserWhereUniqueInput
  }

  export type UserAnswerCreateNestedManyWithoutAttemptInput = {
    create?: XOR<UserAnswerCreateWithoutAttemptInput, UserAnswerUncheckedCreateWithoutAttemptInput> | UserAnswerCreateWithoutAttemptInput[] | UserAnswerUncheckedCreateWithoutAttemptInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutAttemptInput | UserAnswerCreateOrConnectWithoutAttemptInput[]
    createMany?: UserAnswerCreateManyAttemptInputEnvelope
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
  }

  export type UserAnswerUncheckedCreateNestedManyWithoutAttemptInput = {
    create?: XOR<UserAnswerCreateWithoutAttemptInput, UserAnswerUncheckedCreateWithoutAttemptInput> | UserAnswerCreateWithoutAttemptInput[] | UserAnswerUncheckedCreateWithoutAttemptInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutAttemptInput | UserAnswerCreateOrConnectWithoutAttemptInput[]
    createMany?: UserAnswerCreateManyAttemptInputEnvelope
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumTestAttemptStatusFieldUpdateOperationsInput = {
    set?: $Enums.TestAttemptStatus
  }

  export type TestUpdateOneRequiredWithoutTestAttemptsNestedInput = {
    create?: XOR<TestCreateWithoutTestAttemptsInput, TestUncheckedCreateWithoutTestAttemptsInput>
    connectOrCreate?: TestCreateOrConnectWithoutTestAttemptsInput
    upsert?: TestUpsertWithoutTestAttemptsInput
    connect?: TestWhereUniqueInput
    update?: XOR<XOR<TestUpdateToOneWithWhereWithoutTestAttemptsInput, TestUpdateWithoutTestAttemptsInput>, TestUncheckedUpdateWithoutTestAttemptsInput>
  }

  export type TestSnapshotUpdateOneWithoutAttemptsNestedInput = {
    create?: XOR<TestSnapshotCreateWithoutAttemptsInput, TestSnapshotUncheckedCreateWithoutAttemptsInput>
    connectOrCreate?: TestSnapshotCreateOrConnectWithoutAttemptsInput
    upsert?: TestSnapshotUpsertWithoutAttemptsInput
    disconnect?: TestSnapshotWhereInput | boolean
    delete?: TestSnapshotWhereInput | boolean
    connect?: TestSnapshotWhereUniqueInput
    update?: XOR<XOR<TestSnapshotUpdateToOneWithWhereWithoutAttemptsInput, TestSnapshotUpdateWithoutAttemptsInput>, TestSnapshotUncheckedUpdateWithoutAttemptsInput>
  }

  export type UserUpdateOneWithoutTestAttemptsNestedInput = {
    create?: XOR<UserCreateWithoutTestAttemptsInput, UserUncheckedCreateWithoutTestAttemptsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTestAttemptsInput
    upsert?: UserUpsertWithoutTestAttemptsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTestAttemptsInput, UserUpdateWithoutTestAttemptsInput>, UserUncheckedUpdateWithoutTestAttemptsInput>
  }

  export type UserAnswerUpdateManyWithoutAttemptNestedInput = {
    create?: XOR<UserAnswerCreateWithoutAttemptInput, UserAnswerUncheckedCreateWithoutAttemptInput> | UserAnswerCreateWithoutAttemptInput[] | UserAnswerUncheckedCreateWithoutAttemptInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutAttemptInput | UserAnswerCreateOrConnectWithoutAttemptInput[]
    upsert?: UserAnswerUpsertWithWhereUniqueWithoutAttemptInput | UserAnswerUpsertWithWhereUniqueWithoutAttemptInput[]
    createMany?: UserAnswerCreateManyAttemptInputEnvelope
    set?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    disconnect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    delete?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    update?: UserAnswerUpdateWithWhereUniqueWithoutAttemptInput | UserAnswerUpdateWithWhereUniqueWithoutAttemptInput[]
    updateMany?: UserAnswerUpdateManyWithWhereWithoutAttemptInput | UserAnswerUpdateManyWithWhereWithoutAttemptInput[]
    deleteMany?: UserAnswerScalarWhereInput | UserAnswerScalarWhereInput[]
  }

  export type UserAnswerUncheckedUpdateManyWithoutAttemptNestedInput = {
    create?: XOR<UserAnswerCreateWithoutAttemptInput, UserAnswerUncheckedCreateWithoutAttemptInput> | UserAnswerCreateWithoutAttemptInput[] | UserAnswerUncheckedCreateWithoutAttemptInput[]
    connectOrCreate?: UserAnswerCreateOrConnectWithoutAttemptInput | UserAnswerCreateOrConnectWithoutAttemptInput[]
    upsert?: UserAnswerUpsertWithWhereUniqueWithoutAttemptInput | UserAnswerUpsertWithWhereUniqueWithoutAttemptInput[]
    createMany?: UserAnswerCreateManyAttemptInputEnvelope
    set?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    disconnect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    delete?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    connect?: UserAnswerWhereUniqueInput | UserAnswerWhereUniqueInput[]
    update?: UserAnswerUpdateWithWhereUniqueWithoutAttemptInput | UserAnswerUpdateWithWhereUniqueWithoutAttemptInput[]
    updateMany?: UserAnswerUpdateManyWithWhereWithoutAttemptInput | UserAnswerUpdateManyWithWhereWithoutAttemptInput[]
    deleteMany?: UserAnswerScalarWhereInput | UserAnswerScalarWhereInput[]
  }

  export type AnswerCreateNestedOneWithoutUserAnswersInput = {
    create?: XOR<AnswerCreateWithoutUserAnswersInput, AnswerUncheckedCreateWithoutUserAnswersInput>
    connectOrCreate?: AnswerCreateOrConnectWithoutUserAnswersInput
    connect?: AnswerWhereUniqueInput
  }

  export type TestAttemptCreateNestedOneWithoutAnswersInput = {
    create?: XOR<TestAttemptCreateWithoutAnswersInput, TestAttemptUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: TestAttemptCreateOrConnectWithoutAnswersInput
    connect?: TestAttemptWhereUniqueInput
  }

  export type QuestionCreateNestedOneWithoutUserAnswersInput = {
    create?: XOR<QuestionCreateWithoutUserAnswersInput, QuestionUncheckedCreateWithoutUserAnswersInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutUserAnswersInput
    connect?: QuestionWhereUniqueInput
  }

  export type AnswerUpdateOneRequiredWithoutUserAnswersNestedInput = {
    create?: XOR<AnswerCreateWithoutUserAnswersInput, AnswerUncheckedCreateWithoutUserAnswersInput>
    connectOrCreate?: AnswerCreateOrConnectWithoutUserAnswersInput
    upsert?: AnswerUpsertWithoutUserAnswersInput
    connect?: AnswerWhereUniqueInput
    update?: XOR<XOR<AnswerUpdateToOneWithWhereWithoutUserAnswersInput, AnswerUpdateWithoutUserAnswersInput>, AnswerUncheckedUpdateWithoutUserAnswersInput>
  }

  export type TestAttemptUpdateOneRequiredWithoutAnswersNestedInput = {
    create?: XOR<TestAttemptCreateWithoutAnswersInput, TestAttemptUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: TestAttemptCreateOrConnectWithoutAnswersInput
    upsert?: TestAttemptUpsertWithoutAnswersInput
    connect?: TestAttemptWhereUniqueInput
    update?: XOR<XOR<TestAttemptUpdateToOneWithWhereWithoutAnswersInput, TestAttemptUpdateWithoutAnswersInput>, TestAttemptUncheckedUpdateWithoutAnswersInput>
  }

  export type QuestionUpdateOneRequiredWithoutUserAnswersNestedInput = {
    create?: XOR<QuestionCreateWithoutUserAnswersInput, QuestionUncheckedCreateWithoutUserAnswersInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutUserAnswersInput
    upsert?: QuestionUpsertWithoutUserAnswersInput
    connect?: QuestionWhereUniqueInput
    update?: XOR<XOR<QuestionUpdateToOneWithWhereWithoutUserAnswersInput, QuestionUpdateWithoutUserAnswersInput>, QuestionUncheckedUpdateWithoutUserAnswersInput>
  }

  export type QuestionSnapshotCreateNestedManyWithoutTestSnapshotInput = {
    create?: XOR<QuestionSnapshotCreateWithoutTestSnapshotInput, QuestionSnapshotUncheckedCreateWithoutTestSnapshotInput> | QuestionSnapshotCreateWithoutTestSnapshotInput[] | QuestionSnapshotUncheckedCreateWithoutTestSnapshotInput[]
    connectOrCreate?: QuestionSnapshotCreateOrConnectWithoutTestSnapshotInput | QuestionSnapshotCreateOrConnectWithoutTestSnapshotInput[]
    createMany?: QuestionSnapshotCreateManyTestSnapshotInputEnvelope
    connect?: QuestionSnapshotWhereUniqueInput | QuestionSnapshotWhereUniqueInput[]
  }

  export type TestAttemptCreateNestedManyWithoutSnapshotInput = {
    create?: XOR<TestAttemptCreateWithoutSnapshotInput, TestAttemptUncheckedCreateWithoutSnapshotInput> | TestAttemptCreateWithoutSnapshotInput[] | TestAttemptUncheckedCreateWithoutSnapshotInput[]
    connectOrCreate?: TestAttemptCreateOrConnectWithoutSnapshotInput | TestAttemptCreateOrConnectWithoutSnapshotInput[]
    createMany?: TestAttemptCreateManySnapshotInputEnvelope
    connect?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
  }

  export type TestSettingsSnapshotCreateNestedOneWithoutSnapshotInput = {
    create?: XOR<TestSettingsSnapshotCreateWithoutSnapshotInput, TestSettingsSnapshotUncheckedCreateWithoutSnapshotInput>
    connectOrCreate?: TestSettingsSnapshotCreateOrConnectWithoutSnapshotInput
    connect?: TestSettingsSnapshotWhereUniqueInput
  }

  export type TestCreateNestedOneWithoutSnapshotsInput = {
    create?: XOR<TestCreateWithoutSnapshotsInput, TestUncheckedCreateWithoutSnapshotsInput>
    connectOrCreate?: TestCreateOrConnectWithoutSnapshotsInput
    connect?: TestWhereUniqueInput
  }

  export type QuestionSnapshotUncheckedCreateNestedManyWithoutTestSnapshotInput = {
    create?: XOR<QuestionSnapshotCreateWithoutTestSnapshotInput, QuestionSnapshotUncheckedCreateWithoutTestSnapshotInput> | QuestionSnapshotCreateWithoutTestSnapshotInput[] | QuestionSnapshotUncheckedCreateWithoutTestSnapshotInput[]
    connectOrCreate?: QuestionSnapshotCreateOrConnectWithoutTestSnapshotInput | QuestionSnapshotCreateOrConnectWithoutTestSnapshotInput[]
    createMany?: QuestionSnapshotCreateManyTestSnapshotInputEnvelope
    connect?: QuestionSnapshotWhereUniqueInput | QuestionSnapshotWhereUniqueInput[]
  }

  export type TestAttemptUncheckedCreateNestedManyWithoutSnapshotInput = {
    create?: XOR<TestAttemptCreateWithoutSnapshotInput, TestAttemptUncheckedCreateWithoutSnapshotInput> | TestAttemptCreateWithoutSnapshotInput[] | TestAttemptUncheckedCreateWithoutSnapshotInput[]
    connectOrCreate?: TestAttemptCreateOrConnectWithoutSnapshotInput | TestAttemptCreateOrConnectWithoutSnapshotInput[]
    createMany?: TestAttemptCreateManySnapshotInputEnvelope
    connect?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
  }

  export type TestSettingsSnapshotUncheckedCreateNestedOneWithoutSnapshotInput = {
    create?: XOR<TestSettingsSnapshotCreateWithoutSnapshotInput, TestSettingsSnapshotUncheckedCreateWithoutSnapshotInput>
    connectOrCreate?: TestSettingsSnapshotCreateOrConnectWithoutSnapshotInput
    connect?: TestSettingsSnapshotWhereUniqueInput
  }

  export type QuestionSnapshotUpdateManyWithoutTestSnapshotNestedInput = {
    create?: XOR<QuestionSnapshotCreateWithoutTestSnapshotInput, QuestionSnapshotUncheckedCreateWithoutTestSnapshotInput> | QuestionSnapshotCreateWithoutTestSnapshotInput[] | QuestionSnapshotUncheckedCreateWithoutTestSnapshotInput[]
    connectOrCreate?: QuestionSnapshotCreateOrConnectWithoutTestSnapshotInput | QuestionSnapshotCreateOrConnectWithoutTestSnapshotInput[]
    upsert?: QuestionSnapshotUpsertWithWhereUniqueWithoutTestSnapshotInput | QuestionSnapshotUpsertWithWhereUniqueWithoutTestSnapshotInput[]
    createMany?: QuestionSnapshotCreateManyTestSnapshotInputEnvelope
    set?: QuestionSnapshotWhereUniqueInput | QuestionSnapshotWhereUniqueInput[]
    disconnect?: QuestionSnapshotWhereUniqueInput | QuestionSnapshotWhereUniqueInput[]
    delete?: QuestionSnapshotWhereUniqueInput | QuestionSnapshotWhereUniqueInput[]
    connect?: QuestionSnapshotWhereUniqueInput | QuestionSnapshotWhereUniqueInput[]
    update?: QuestionSnapshotUpdateWithWhereUniqueWithoutTestSnapshotInput | QuestionSnapshotUpdateWithWhereUniqueWithoutTestSnapshotInput[]
    updateMany?: QuestionSnapshotUpdateManyWithWhereWithoutTestSnapshotInput | QuestionSnapshotUpdateManyWithWhereWithoutTestSnapshotInput[]
    deleteMany?: QuestionSnapshotScalarWhereInput | QuestionSnapshotScalarWhereInput[]
  }

  export type TestAttemptUpdateManyWithoutSnapshotNestedInput = {
    create?: XOR<TestAttemptCreateWithoutSnapshotInput, TestAttemptUncheckedCreateWithoutSnapshotInput> | TestAttemptCreateWithoutSnapshotInput[] | TestAttemptUncheckedCreateWithoutSnapshotInput[]
    connectOrCreate?: TestAttemptCreateOrConnectWithoutSnapshotInput | TestAttemptCreateOrConnectWithoutSnapshotInput[]
    upsert?: TestAttemptUpsertWithWhereUniqueWithoutSnapshotInput | TestAttemptUpsertWithWhereUniqueWithoutSnapshotInput[]
    createMany?: TestAttemptCreateManySnapshotInputEnvelope
    set?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
    disconnect?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
    delete?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
    connect?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
    update?: TestAttemptUpdateWithWhereUniqueWithoutSnapshotInput | TestAttemptUpdateWithWhereUniqueWithoutSnapshotInput[]
    updateMany?: TestAttemptUpdateManyWithWhereWithoutSnapshotInput | TestAttemptUpdateManyWithWhereWithoutSnapshotInput[]
    deleteMany?: TestAttemptScalarWhereInput | TestAttemptScalarWhereInput[]
  }

  export type TestSettingsSnapshotUpdateOneWithoutSnapshotNestedInput = {
    create?: XOR<TestSettingsSnapshotCreateWithoutSnapshotInput, TestSettingsSnapshotUncheckedCreateWithoutSnapshotInput>
    connectOrCreate?: TestSettingsSnapshotCreateOrConnectWithoutSnapshotInput
    upsert?: TestSettingsSnapshotUpsertWithoutSnapshotInput
    disconnect?: TestSettingsSnapshotWhereInput | boolean
    delete?: TestSettingsSnapshotWhereInput | boolean
    connect?: TestSettingsSnapshotWhereUniqueInput
    update?: XOR<XOR<TestSettingsSnapshotUpdateToOneWithWhereWithoutSnapshotInput, TestSettingsSnapshotUpdateWithoutSnapshotInput>, TestSettingsSnapshotUncheckedUpdateWithoutSnapshotInput>
  }

  export type TestUpdateOneRequiredWithoutSnapshotsNestedInput = {
    create?: XOR<TestCreateWithoutSnapshotsInput, TestUncheckedCreateWithoutSnapshotsInput>
    connectOrCreate?: TestCreateOrConnectWithoutSnapshotsInput
    upsert?: TestUpsertWithoutSnapshotsInput
    connect?: TestWhereUniqueInput
    update?: XOR<XOR<TestUpdateToOneWithWhereWithoutSnapshotsInput, TestUpdateWithoutSnapshotsInput>, TestUncheckedUpdateWithoutSnapshotsInput>
  }

  export type QuestionSnapshotUncheckedUpdateManyWithoutTestSnapshotNestedInput = {
    create?: XOR<QuestionSnapshotCreateWithoutTestSnapshotInput, QuestionSnapshotUncheckedCreateWithoutTestSnapshotInput> | QuestionSnapshotCreateWithoutTestSnapshotInput[] | QuestionSnapshotUncheckedCreateWithoutTestSnapshotInput[]
    connectOrCreate?: QuestionSnapshotCreateOrConnectWithoutTestSnapshotInput | QuestionSnapshotCreateOrConnectWithoutTestSnapshotInput[]
    upsert?: QuestionSnapshotUpsertWithWhereUniqueWithoutTestSnapshotInput | QuestionSnapshotUpsertWithWhereUniqueWithoutTestSnapshotInput[]
    createMany?: QuestionSnapshotCreateManyTestSnapshotInputEnvelope
    set?: QuestionSnapshotWhereUniqueInput | QuestionSnapshotWhereUniqueInput[]
    disconnect?: QuestionSnapshotWhereUniqueInput | QuestionSnapshotWhereUniqueInput[]
    delete?: QuestionSnapshotWhereUniqueInput | QuestionSnapshotWhereUniqueInput[]
    connect?: QuestionSnapshotWhereUniqueInput | QuestionSnapshotWhereUniqueInput[]
    update?: QuestionSnapshotUpdateWithWhereUniqueWithoutTestSnapshotInput | QuestionSnapshotUpdateWithWhereUniqueWithoutTestSnapshotInput[]
    updateMany?: QuestionSnapshotUpdateManyWithWhereWithoutTestSnapshotInput | QuestionSnapshotUpdateManyWithWhereWithoutTestSnapshotInput[]
    deleteMany?: QuestionSnapshotScalarWhereInput | QuestionSnapshotScalarWhereInput[]
  }

  export type TestAttemptUncheckedUpdateManyWithoutSnapshotNestedInput = {
    create?: XOR<TestAttemptCreateWithoutSnapshotInput, TestAttemptUncheckedCreateWithoutSnapshotInput> | TestAttemptCreateWithoutSnapshotInput[] | TestAttemptUncheckedCreateWithoutSnapshotInput[]
    connectOrCreate?: TestAttemptCreateOrConnectWithoutSnapshotInput | TestAttemptCreateOrConnectWithoutSnapshotInput[]
    upsert?: TestAttemptUpsertWithWhereUniqueWithoutSnapshotInput | TestAttemptUpsertWithWhereUniqueWithoutSnapshotInput[]
    createMany?: TestAttemptCreateManySnapshotInputEnvelope
    set?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
    disconnect?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
    delete?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
    connect?: TestAttemptWhereUniqueInput | TestAttemptWhereUniqueInput[]
    update?: TestAttemptUpdateWithWhereUniqueWithoutSnapshotInput | TestAttemptUpdateWithWhereUniqueWithoutSnapshotInput[]
    updateMany?: TestAttemptUpdateManyWithWhereWithoutSnapshotInput | TestAttemptUpdateManyWithWhereWithoutSnapshotInput[]
    deleteMany?: TestAttemptScalarWhereInput | TestAttemptScalarWhereInput[]
  }

  export type TestSettingsSnapshotUncheckedUpdateOneWithoutSnapshotNestedInput = {
    create?: XOR<TestSettingsSnapshotCreateWithoutSnapshotInput, TestSettingsSnapshotUncheckedCreateWithoutSnapshotInput>
    connectOrCreate?: TestSettingsSnapshotCreateOrConnectWithoutSnapshotInput
    upsert?: TestSettingsSnapshotUpsertWithoutSnapshotInput
    disconnect?: TestSettingsSnapshotWhereInput | boolean
    delete?: TestSettingsSnapshotWhereInput | boolean
    connect?: TestSettingsSnapshotWhereUniqueInput
    update?: XOR<XOR<TestSettingsSnapshotUpdateToOneWithWhereWithoutSnapshotInput, TestSettingsSnapshotUpdateWithoutSnapshotInput>, TestSettingsSnapshotUncheckedUpdateWithoutSnapshotInput>
  }

  export type AnswerSnapshotCreateNestedManyWithoutQuestionInput = {
    create?: XOR<AnswerSnapshotCreateWithoutQuestionInput, AnswerSnapshotUncheckedCreateWithoutQuestionInput> | AnswerSnapshotCreateWithoutQuestionInput[] | AnswerSnapshotUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: AnswerSnapshotCreateOrConnectWithoutQuestionInput | AnswerSnapshotCreateOrConnectWithoutQuestionInput[]
    createMany?: AnswerSnapshotCreateManyQuestionInputEnvelope
    connect?: AnswerSnapshotWhereUniqueInput | AnswerSnapshotWhereUniqueInput[]
  }

  export type TestSnapshotCreateNestedOneWithoutQuestionsInput = {
    create?: XOR<TestSnapshotCreateWithoutQuestionsInput, TestSnapshotUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: TestSnapshotCreateOrConnectWithoutQuestionsInput
    connect?: TestSnapshotWhereUniqueInput
  }

  export type AnswerSnapshotUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: XOR<AnswerSnapshotCreateWithoutQuestionInput, AnswerSnapshotUncheckedCreateWithoutQuestionInput> | AnswerSnapshotCreateWithoutQuestionInput[] | AnswerSnapshotUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: AnswerSnapshotCreateOrConnectWithoutQuestionInput | AnswerSnapshotCreateOrConnectWithoutQuestionInput[]
    createMany?: AnswerSnapshotCreateManyQuestionInputEnvelope
    connect?: AnswerSnapshotWhereUniqueInput | AnswerSnapshotWhereUniqueInput[]
  }

  export type AnswerSnapshotUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<AnswerSnapshotCreateWithoutQuestionInput, AnswerSnapshotUncheckedCreateWithoutQuestionInput> | AnswerSnapshotCreateWithoutQuestionInput[] | AnswerSnapshotUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: AnswerSnapshotCreateOrConnectWithoutQuestionInput | AnswerSnapshotCreateOrConnectWithoutQuestionInput[]
    upsert?: AnswerSnapshotUpsertWithWhereUniqueWithoutQuestionInput | AnswerSnapshotUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: AnswerSnapshotCreateManyQuestionInputEnvelope
    set?: AnswerSnapshotWhereUniqueInput | AnswerSnapshotWhereUniqueInput[]
    disconnect?: AnswerSnapshotWhereUniqueInput | AnswerSnapshotWhereUniqueInput[]
    delete?: AnswerSnapshotWhereUniqueInput | AnswerSnapshotWhereUniqueInput[]
    connect?: AnswerSnapshotWhereUniqueInput | AnswerSnapshotWhereUniqueInput[]
    update?: AnswerSnapshotUpdateWithWhereUniqueWithoutQuestionInput | AnswerSnapshotUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: AnswerSnapshotUpdateManyWithWhereWithoutQuestionInput | AnswerSnapshotUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: AnswerSnapshotScalarWhereInput | AnswerSnapshotScalarWhereInput[]
  }

  export type TestSnapshotUpdateOneRequiredWithoutQuestionsNestedInput = {
    create?: XOR<TestSnapshotCreateWithoutQuestionsInput, TestSnapshotUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: TestSnapshotCreateOrConnectWithoutQuestionsInput
    upsert?: TestSnapshotUpsertWithoutQuestionsInput
    connect?: TestSnapshotWhereUniqueInput
    update?: XOR<XOR<TestSnapshotUpdateToOneWithWhereWithoutQuestionsInput, TestSnapshotUpdateWithoutQuestionsInput>, TestSnapshotUncheckedUpdateWithoutQuestionsInput>
  }

  export type AnswerSnapshotUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<AnswerSnapshotCreateWithoutQuestionInput, AnswerSnapshotUncheckedCreateWithoutQuestionInput> | AnswerSnapshotCreateWithoutQuestionInput[] | AnswerSnapshotUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: AnswerSnapshotCreateOrConnectWithoutQuestionInput | AnswerSnapshotCreateOrConnectWithoutQuestionInput[]
    upsert?: AnswerSnapshotUpsertWithWhereUniqueWithoutQuestionInput | AnswerSnapshotUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: AnswerSnapshotCreateManyQuestionInputEnvelope
    set?: AnswerSnapshotWhereUniqueInput | AnswerSnapshotWhereUniqueInput[]
    disconnect?: AnswerSnapshotWhereUniqueInput | AnswerSnapshotWhereUniqueInput[]
    delete?: AnswerSnapshotWhereUniqueInput | AnswerSnapshotWhereUniqueInput[]
    connect?: AnswerSnapshotWhereUniqueInput | AnswerSnapshotWhereUniqueInput[]
    update?: AnswerSnapshotUpdateWithWhereUniqueWithoutQuestionInput | AnswerSnapshotUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: AnswerSnapshotUpdateManyWithWhereWithoutQuestionInput | AnswerSnapshotUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: AnswerSnapshotScalarWhereInput | AnswerSnapshotScalarWhereInput[]
  }

  export type QuestionSnapshotCreateNestedOneWithoutAnswersInput = {
    create?: XOR<QuestionSnapshotCreateWithoutAnswersInput, QuestionSnapshotUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: QuestionSnapshotCreateOrConnectWithoutAnswersInput
    connect?: QuestionSnapshotWhereUniqueInput
  }

  export type QuestionSnapshotUpdateOneRequiredWithoutAnswersNestedInput = {
    create?: XOR<QuestionSnapshotCreateWithoutAnswersInput, QuestionSnapshotUncheckedCreateWithoutAnswersInput>
    connectOrCreate?: QuestionSnapshotCreateOrConnectWithoutAnswersInput
    upsert?: QuestionSnapshotUpsertWithoutAnswersInput
    connect?: QuestionSnapshotWhereUniqueInput
    update?: XOR<XOR<QuestionSnapshotUpdateToOneWithWhereWithoutAnswersInput, QuestionSnapshotUpdateWithoutAnswersInput>, QuestionSnapshotUncheckedUpdateWithoutAnswersInput>
  }

  export type TestSnapshotCreateNestedOneWithoutSettingsInput = {
    create?: XOR<TestSnapshotCreateWithoutSettingsInput, TestSnapshotUncheckedCreateWithoutSettingsInput>
    connectOrCreate?: TestSnapshotCreateOrConnectWithoutSettingsInput
    connect?: TestSnapshotWhereUniqueInput
  }

  export type TestSnapshotUpdateOneRequiredWithoutSettingsNestedInput = {
    create?: XOR<TestSnapshotCreateWithoutSettingsInput, TestSnapshotUncheckedCreateWithoutSettingsInput>
    connectOrCreate?: TestSnapshotCreateOrConnectWithoutSettingsInput
    upsert?: TestSnapshotUpsertWithoutSettingsInput
    connect?: TestSnapshotWhereUniqueInput
    update?: XOR<XOR<TestSnapshotUpdateToOneWithWhereWithoutSettingsInput, TestSnapshotUpdateWithoutSettingsInput>, TestSnapshotUncheckedUpdateWithoutSettingsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumModerationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ModerationStatus | EnumModerationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ModerationStatus[] | ListEnumModerationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ModerationStatus[] | ListEnumModerationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumModerationStatusFilter<$PrismaModel> | $Enums.ModerationStatus
  }

  export type NestedEnumTestVisibilityStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TestVisibilityStatus | EnumTestVisibilityStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TestVisibilityStatus[] | ListEnumTestVisibilityStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TestVisibilityStatus[] | ListEnumTestVisibilityStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTestVisibilityStatusFilter<$PrismaModel> | $Enums.TestVisibilityStatus
  }

  export type NestedEnumModerationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ModerationStatus | EnumModerationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ModerationStatus[] | ListEnumModerationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ModerationStatus[] | ListEnumModerationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumModerationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ModerationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumModerationStatusFilter<$PrismaModel>
    _max?: NestedEnumModerationStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumTestVisibilityStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TestVisibilityStatus | EnumTestVisibilityStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TestVisibilityStatus[] | ListEnumTestVisibilityStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TestVisibilityStatus[] | ListEnumTestVisibilityStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTestVisibilityStatusWithAggregatesFilter<$PrismaModel> | $Enums.TestVisibilityStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTestVisibilityStatusFilter<$PrismaModel>
    _max?: NestedEnumTestVisibilityStatusFilter<$PrismaModel>
  }

  export type NestedEnumQuestionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionTypeFilter<$PrismaModel> | $Enums.QuestionType
  }

  export type NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel> | $Enums.QuestionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuestionTypeFilter<$PrismaModel>
    _max?: NestedEnumQuestionTypeFilter<$PrismaModel>
  }

  export type NestedEnumTestAttemptStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TestAttemptStatus | EnumTestAttemptStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TestAttemptStatus[] | ListEnumTestAttemptStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TestAttemptStatus[] | ListEnumTestAttemptStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTestAttemptStatusFilter<$PrismaModel> | $Enums.TestAttemptStatus
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumTestAttemptStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TestAttemptStatus | EnumTestAttemptStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TestAttemptStatus[] | ListEnumTestAttemptStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TestAttemptStatus[] | ListEnumTestAttemptStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTestAttemptStatusWithAggregatesFilter<$PrismaModel> | $Enums.TestAttemptStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTestAttemptStatusFilter<$PrismaModel>
    _max?: NestedEnumTestAttemptStatusFilter<$PrismaModel>
  }

  export type TestAttemptCreateWithoutUserInput = {
    id?: string
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: number | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    status: $Enums.TestAttemptStatus
    updatedAt?: Date | string
    expirationTime?: Date | string | null
    test: TestCreateNestedOneWithoutTestAttemptsInput
    snapshot?: TestSnapshotCreateNestedOneWithoutAttemptsInput
    answers?: UserAnswerCreateNestedManyWithoutAttemptInput
  }

  export type TestAttemptUncheckedCreateWithoutUserInput = {
    id?: string
    testId: string
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: number | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    status: $Enums.TestAttemptStatus
    updatedAt?: Date | string
    testSnapshotId?: string | null
    expirationTime?: Date | string | null
    answers?: UserAnswerUncheckedCreateNestedManyWithoutAttemptInput
  }

  export type TestAttemptCreateOrConnectWithoutUserInput = {
    where: TestAttemptWhereUniqueInput
    create: XOR<TestAttemptCreateWithoutUserInput, TestAttemptUncheckedCreateWithoutUserInput>
  }

  export type TestAttemptCreateManyUserInputEnvelope = {
    data: TestAttemptCreateManyUserInput | TestAttemptCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TestCreateWithoutAuthorInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ModerationStatus
    totalAttempts?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    visibilityStatus?: $Enums.TestVisibilityStatus
    questions?: QuestionCreateNestedManyWithoutTestInput
    testAttempts?: TestAttemptCreateNestedManyWithoutTestInput
    settings?: TestSettingsCreateNestedOneWithoutTestInput
    snapshots?: TestSnapshotCreateNestedManyWithoutOriginalTestInput
  }

  export type TestUncheckedCreateWithoutAuthorInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ModerationStatus
    totalAttempts?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    visibilityStatus?: $Enums.TestVisibilityStatus
    questions?: QuestionUncheckedCreateNestedManyWithoutTestInput
    testAttempts?: TestAttemptUncheckedCreateNestedManyWithoutTestInput
    settings?: TestSettingsUncheckedCreateNestedOneWithoutTestInput
    snapshots?: TestSnapshotUncheckedCreateNestedManyWithoutOriginalTestInput
  }

  export type TestCreateOrConnectWithoutAuthorInput = {
    where: TestWhereUniqueInput
    create: XOR<TestCreateWithoutAuthorInput, TestUncheckedCreateWithoutAuthorInput>
  }

  export type TestCreateManyAuthorInputEnvelope = {
    data: TestCreateManyAuthorInput | TestCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type TokenCreateWithoutUserInput = {
    id?: string
    refreshToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TokenUncheckedCreateWithoutUserInput = {
    id?: string
    refreshToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TokenCreateOrConnectWithoutUserInput = {
    where: TokenWhereUniqueInput
    create: XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput>
  }

  export type TestAttemptUpsertWithWhereUniqueWithoutUserInput = {
    where: TestAttemptWhereUniqueInput
    update: XOR<TestAttemptUpdateWithoutUserInput, TestAttemptUncheckedUpdateWithoutUserInput>
    create: XOR<TestAttemptCreateWithoutUserInput, TestAttemptUncheckedCreateWithoutUserInput>
  }

  export type TestAttemptUpdateWithWhereUniqueWithoutUserInput = {
    where: TestAttemptWhereUniqueInput
    data: XOR<TestAttemptUpdateWithoutUserInput, TestAttemptUncheckedUpdateWithoutUserInput>
  }

  export type TestAttemptUpdateManyWithWhereWithoutUserInput = {
    where: TestAttemptScalarWhereInput
    data: XOR<TestAttemptUpdateManyMutationInput, TestAttemptUncheckedUpdateManyWithoutUserInput>
  }

  export type TestAttemptScalarWhereInput = {
    AND?: TestAttemptScalarWhereInput | TestAttemptScalarWhereInput[]
    OR?: TestAttemptScalarWhereInput[]
    NOT?: TestAttemptScalarWhereInput | TestAttemptScalarWhereInput[]
    id?: StringFilter<"TestAttempt"> | string
    testId?: StringFilter<"TestAttempt"> | string
    userId?: StringNullableFilter<"TestAttempt"> | string | null
    preTestUserData?: JsonNullableFilter<"TestAttempt">
    score?: FloatNullableFilter<"TestAttempt"> | number | null
    startedAt?: DateTimeFilter<"TestAttempt"> | Date | string
    completedAt?: DateTimeNullableFilter<"TestAttempt"> | Date | string | null
    status?: EnumTestAttemptStatusFilter<"TestAttempt"> | $Enums.TestAttemptStatus
    updatedAt?: DateTimeFilter<"TestAttempt"> | Date | string
    testSnapshotId?: StringNullableFilter<"TestAttempt"> | string | null
    expirationTime?: DateTimeNullableFilter<"TestAttempt"> | Date | string | null
  }

  export type TestUpsertWithWhereUniqueWithoutAuthorInput = {
    where: TestWhereUniqueInput
    update: XOR<TestUpdateWithoutAuthorInput, TestUncheckedUpdateWithoutAuthorInput>
    create: XOR<TestCreateWithoutAuthorInput, TestUncheckedCreateWithoutAuthorInput>
  }

  export type TestUpdateWithWhereUniqueWithoutAuthorInput = {
    where: TestWhereUniqueInput
    data: XOR<TestUpdateWithoutAuthorInput, TestUncheckedUpdateWithoutAuthorInput>
  }

  export type TestUpdateManyWithWhereWithoutAuthorInput = {
    where: TestScalarWhereInput
    data: XOR<TestUpdateManyMutationInput, TestUncheckedUpdateManyWithoutAuthorInput>
  }

  export type TestScalarWhereInput = {
    AND?: TestScalarWhereInput | TestScalarWhereInput[]
    OR?: TestScalarWhereInput[]
    NOT?: TestScalarWhereInput | TestScalarWhereInput[]
    id?: StringFilter<"Test"> | string
    authorId?: StringFilter<"Test"> | string
    title?: StringFilter<"Test"> | string
    description?: StringNullableFilter<"Test"> | string | null
    status?: EnumModerationStatusFilter<"Test"> | $Enums.ModerationStatus
    totalAttempts?: IntFilter<"Test"> | number
    createdAt?: DateTimeFilter<"Test"> | Date | string
    updatedAt?: DateTimeFilter<"Test"> | Date | string
    version?: IntFilter<"Test"> | number
    visibilityStatus?: EnumTestVisibilityStatusFilter<"Test"> | $Enums.TestVisibilityStatus
  }

  export type TokenUpsertWithoutUserInput = {
    update: XOR<TokenUpdateWithoutUserInput, TokenUncheckedUpdateWithoutUserInput>
    create: XOR<TokenCreateWithoutUserInput, TokenUncheckedCreateWithoutUserInput>
    where?: TokenWhereInput
  }

  export type TokenUpdateToOneWithWhereWithoutUserInput = {
    where?: TokenWhereInput
    data: XOR<TokenUpdateWithoutUserInput, TokenUncheckedUpdateWithoutUserInput>
  }

  export type TokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutRefreshTokenInput = {
    id?: string
    email: string
    name?: string | null
    surname?: string | null
    patronymic?: string | null
    password: string
    isActivated?: boolean
    role?: $Enums.Role
    activationLink?: string | null
    resetCode?: string | null
    isBlocked?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    activationLinkExp?: Date | string | null
    resetCodeExp?: Date | string | null
    testAttempts?: TestAttemptCreateNestedManyWithoutUserInput
    testsCreated?: TestCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutRefreshTokenInput = {
    id?: string
    email: string
    name?: string | null
    surname?: string | null
    patronymic?: string | null
    password: string
    isActivated?: boolean
    role?: $Enums.Role
    activationLink?: string | null
    resetCode?: string | null
    isBlocked?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    activationLinkExp?: Date | string | null
    resetCodeExp?: Date | string | null
    testAttempts?: TestAttemptUncheckedCreateNestedManyWithoutUserInput
    testsCreated?: TestUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutRefreshTokenInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRefreshTokenInput, UserUncheckedCreateWithoutRefreshTokenInput>
  }

  export type UserUpsertWithoutRefreshTokenInput = {
    update: XOR<UserUpdateWithoutRefreshTokenInput, UserUncheckedUpdateWithoutRefreshTokenInput>
    create: XOR<UserCreateWithoutRefreshTokenInput, UserUncheckedCreateWithoutRefreshTokenInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRefreshTokenInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRefreshTokenInput, UserUncheckedUpdateWithoutRefreshTokenInput>
  }

  export type UserUpdateWithoutRefreshTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    patronymic?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    isActivated?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    activationLink?: NullableStringFieldUpdateOperationsInput | string | null
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activationLinkExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetCodeExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    testAttempts?: TestAttemptUpdateManyWithoutUserNestedInput
    testsCreated?: TestUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutRefreshTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    patronymic?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    isActivated?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    activationLink?: NullableStringFieldUpdateOperationsInput | string | null
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activationLinkExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetCodeExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    testAttempts?: TestAttemptUncheckedUpdateManyWithoutUserNestedInput
    testsCreated?: TestUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type TestCreateWithoutSettingsInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ModerationStatus
    totalAttempts?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    visibilityStatus?: $Enums.TestVisibilityStatus
    questions?: QuestionCreateNestedManyWithoutTestInput
    testAttempts?: TestAttemptCreateNestedManyWithoutTestInput
    snapshots?: TestSnapshotCreateNestedManyWithoutOriginalTestInput
    author: UserCreateNestedOneWithoutTestsCreatedInput
  }

  export type TestUncheckedCreateWithoutSettingsInput = {
    id?: string
    authorId: string
    title: string
    description?: string | null
    status?: $Enums.ModerationStatus
    totalAttempts?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    visibilityStatus?: $Enums.TestVisibilityStatus
    questions?: QuestionUncheckedCreateNestedManyWithoutTestInput
    testAttempts?: TestAttemptUncheckedCreateNestedManyWithoutTestInput
    snapshots?: TestSnapshotUncheckedCreateNestedManyWithoutOriginalTestInput
  }

  export type TestCreateOrConnectWithoutSettingsInput = {
    where: TestWhereUniqueInput
    create: XOR<TestCreateWithoutSettingsInput, TestUncheckedCreateWithoutSettingsInput>
  }

  export type TestUpsertWithoutSettingsInput = {
    update: XOR<TestUpdateWithoutSettingsInput, TestUncheckedUpdateWithoutSettingsInput>
    create: XOR<TestCreateWithoutSettingsInput, TestUncheckedCreateWithoutSettingsInput>
    where?: TestWhereInput
  }

  export type TestUpdateToOneWithWhereWithoutSettingsInput = {
    where?: TestWhereInput
    data: XOR<TestUpdateWithoutSettingsInput, TestUncheckedUpdateWithoutSettingsInput>
  }

  export type TestUpdateWithoutSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    totalAttempts?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
    questions?: QuestionUpdateManyWithoutTestNestedInput
    testAttempts?: TestAttemptUpdateManyWithoutTestNestedInput
    snapshots?: TestSnapshotUpdateManyWithoutOriginalTestNestedInput
    author?: UserUpdateOneRequiredWithoutTestsCreatedNestedInput
  }

  export type TestUncheckedUpdateWithoutSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    totalAttempts?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
    questions?: QuestionUncheckedUpdateManyWithoutTestNestedInput
    testAttempts?: TestAttemptUncheckedUpdateManyWithoutTestNestedInput
    snapshots?: TestSnapshotUncheckedUpdateManyWithoutOriginalTestNestedInput
  }

  export type QuestionCreateWithoutTestInput = {
    id?: string
    text: string
    order: number
    type?: $Enums.QuestionType
    createdAt?: Date | string
    updatedAt?: Date | string
    answers?: AnswerCreateNestedManyWithoutQuestionInput
    userAnswers?: UserAnswerCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateWithoutTestInput = {
    id?: string
    text: string
    order: number
    type?: $Enums.QuestionType
    createdAt?: Date | string
    updatedAt?: Date | string
    answers?: AnswerUncheckedCreateNestedManyWithoutQuestionInput
    userAnswers?: UserAnswerUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionCreateOrConnectWithoutTestInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutTestInput, QuestionUncheckedCreateWithoutTestInput>
  }

  export type QuestionCreateManyTestInputEnvelope = {
    data: QuestionCreateManyTestInput | QuestionCreateManyTestInput[]
    skipDuplicates?: boolean
  }

  export type TestAttemptCreateWithoutTestInput = {
    id?: string
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: number | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    status: $Enums.TestAttemptStatus
    updatedAt?: Date | string
    expirationTime?: Date | string | null
    snapshot?: TestSnapshotCreateNestedOneWithoutAttemptsInput
    user?: UserCreateNestedOneWithoutTestAttemptsInput
    answers?: UserAnswerCreateNestedManyWithoutAttemptInput
  }

  export type TestAttemptUncheckedCreateWithoutTestInput = {
    id?: string
    userId?: string | null
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: number | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    status: $Enums.TestAttemptStatus
    updatedAt?: Date | string
    testSnapshotId?: string | null
    expirationTime?: Date | string | null
    answers?: UserAnswerUncheckedCreateNestedManyWithoutAttemptInput
  }

  export type TestAttemptCreateOrConnectWithoutTestInput = {
    where: TestAttemptWhereUniqueInput
    create: XOR<TestAttemptCreateWithoutTestInput, TestAttemptUncheckedCreateWithoutTestInput>
  }

  export type TestAttemptCreateManyTestInputEnvelope = {
    data: TestAttemptCreateManyTestInput | TestAttemptCreateManyTestInput[]
    skipDuplicates?: boolean
  }

  export type TestSettingsCreateWithoutTestInput = {
    id?: string
    requireRegistration?: boolean
    inputFields?: NullableJsonNullValueInput | InputJsonValue
    showDetailedResults?: boolean
    timeLimit?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    shuffleAnswers?: boolean
    shuffleQuestions?: boolean
  }

  export type TestSettingsUncheckedCreateWithoutTestInput = {
    id?: string
    requireRegistration?: boolean
    inputFields?: NullableJsonNullValueInput | InputJsonValue
    showDetailedResults?: boolean
    timeLimit?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    shuffleAnswers?: boolean
    shuffleQuestions?: boolean
  }

  export type TestSettingsCreateOrConnectWithoutTestInput = {
    where: TestSettingsWhereUniqueInput
    create: XOR<TestSettingsCreateWithoutTestInput, TestSettingsUncheckedCreateWithoutTestInput>
  }

  export type TestSnapshotCreateWithoutOriginalTestInput = {
    id?: string
    title: string
    description?: string | null
    status: $Enums.ModerationStatus
    createdAt?: Date | string
    version?: number
    visibilityStatus?: $Enums.TestVisibilityStatus
    questions?: QuestionSnapshotCreateNestedManyWithoutTestSnapshotInput
    attempts?: TestAttemptCreateNestedManyWithoutSnapshotInput
    settings?: TestSettingsSnapshotCreateNestedOneWithoutSnapshotInput
  }

  export type TestSnapshotUncheckedCreateWithoutOriginalTestInput = {
    id?: string
    title: string
    description?: string | null
    status: $Enums.ModerationStatus
    createdAt?: Date | string
    version?: number
    visibilityStatus?: $Enums.TestVisibilityStatus
    questions?: QuestionSnapshotUncheckedCreateNestedManyWithoutTestSnapshotInput
    attempts?: TestAttemptUncheckedCreateNestedManyWithoutSnapshotInput
    settings?: TestSettingsSnapshotUncheckedCreateNestedOneWithoutSnapshotInput
  }

  export type TestSnapshotCreateOrConnectWithoutOriginalTestInput = {
    where: TestSnapshotWhereUniqueInput
    create: XOR<TestSnapshotCreateWithoutOriginalTestInput, TestSnapshotUncheckedCreateWithoutOriginalTestInput>
  }

  export type TestSnapshotCreateManyOriginalTestInputEnvelope = {
    data: TestSnapshotCreateManyOriginalTestInput | TestSnapshotCreateManyOriginalTestInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutTestsCreatedInput = {
    id?: string
    email: string
    name?: string | null
    surname?: string | null
    patronymic?: string | null
    password: string
    isActivated?: boolean
    role?: $Enums.Role
    activationLink?: string | null
    resetCode?: string | null
    isBlocked?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    activationLinkExp?: Date | string | null
    resetCodeExp?: Date | string | null
    testAttempts?: TestAttemptCreateNestedManyWithoutUserInput
    refreshToken?: TokenCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTestsCreatedInput = {
    id?: string
    email: string
    name?: string | null
    surname?: string | null
    patronymic?: string | null
    password: string
    isActivated?: boolean
    role?: $Enums.Role
    activationLink?: string | null
    resetCode?: string | null
    isBlocked?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    activationLinkExp?: Date | string | null
    resetCodeExp?: Date | string | null
    testAttempts?: TestAttemptUncheckedCreateNestedManyWithoutUserInput
    refreshToken?: TokenUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTestsCreatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTestsCreatedInput, UserUncheckedCreateWithoutTestsCreatedInput>
  }

  export type QuestionUpsertWithWhereUniqueWithoutTestInput = {
    where: QuestionWhereUniqueInput
    update: XOR<QuestionUpdateWithoutTestInput, QuestionUncheckedUpdateWithoutTestInput>
    create: XOR<QuestionCreateWithoutTestInput, QuestionUncheckedCreateWithoutTestInput>
  }

  export type QuestionUpdateWithWhereUniqueWithoutTestInput = {
    where: QuestionWhereUniqueInput
    data: XOR<QuestionUpdateWithoutTestInput, QuestionUncheckedUpdateWithoutTestInput>
  }

  export type QuestionUpdateManyWithWhereWithoutTestInput = {
    where: QuestionScalarWhereInput
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyWithoutTestInput>
  }

  export type QuestionScalarWhereInput = {
    AND?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
    OR?: QuestionScalarWhereInput[]
    NOT?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
    id?: StringFilter<"Question"> | string
    testId?: StringFilter<"Question"> | string
    text?: StringFilter<"Question"> | string
    order?: IntFilter<"Question"> | number
    type?: EnumQuestionTypeFilter<"Question"> | $Enums.QuestionType
    createdAt?: DateTimeFilter<"Question"> | Date | string
    updatedAt?: DateTimeFilter<"Question"> | Date | string
  }

  export type TestAttemptUpsertWithWhereUniqueWithoutTestInput = {
    where: TestAttemptWhereUniqueInput
    update: XOR<TestAttemptUpdateWithoutTestInput, TestAttemptUncheckedUpdateWithoutTestInput>
    create: XOR<TestAttemptCreateWithoutTestInput, TestAttemptUncheckedCreateWithoutTestInput>
  }

  export type TestAttemptUpdateWithWhereUniqueWithoutTestInput = {
    where: TestAttemptWhereUniqueInput
    data: XOR<TestAttemptUpdateWithoutTestInput, TestAttemptUncheckedUpdateWithoutTestInput>
  }

  export type TestAttemptUpdateManyWithWhereWithoutTestInput = {
    where: TestAttemptScalarWhereInput
    data: XOR<TestAttemptUpdateManyMutationInput, TestAttemptUncheckedUpdateManyWithoutTestInput>
  }

  export type TestSettingsUpsertWithoutTestInput = {
    update: XOR<TestSettingsUpdateWithoutTestInput, TestSettingsUncheckedUpdateWithoutTestInput>
    create: XOR<TestSettingsCreateWithoutTestInput, TestSettingsUncheckedCreateWithoutTestInput>
    where?: TestSettingsWhereInput
  }

  export type TestSettingsUpdateToOneWithWhereWithoutTestInput = {
    where?: TestSettingsWhereInput
    data: XOR<TestSettingsUpdateWithoutTestInput, TestSettingsUncheckedUpdateWithoutTestInput>
  }

  export type TestSettingsUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    requireRegistration?: BoolFieldUpdateOperationsInput | boolean
    inputFields?: NullableJsonNullValueInput | InputJsonValue
    showDetailedResults?: BoolFieldUpdateOperationsInput | boolean
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shuffleAnswers?: BoolFieldUpdateOperationsInput | boolean
    shuffleQuestions?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TestSettingsUncheckedUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    requireRegistration?: BoolFieldUpdateOperationsInput | boolean
    inputFields?: NullableJsonNullValueInput | InputJsonValue
    showDetailedResults?: BoolFieldUpdateOperationsInput | boolean
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    shuffleAnswers?: BoolFieldUpdateOperationsInput | boolean
    shuffleQuestions?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TestSnapshotUpsertWithWhereUniqueWithoutOriginalTestInput = {
    where: TestSnapshotWhereUniqueInput
    update: XOR<TestSnapshotUpdateWithoutOriginalTestInput, TestSnapshotUncheckedUpdateWithoutOriginalTestInput>
    create: XOR<TestSnapshotCreateWithoutOriginalTestInput, TestSnapshotUncheckedCreateWithoutOriginalTestInput>
  }

  export type TestSnapshotUpdateWithWhereUniqueWithoutOriginalTestInput = {
    where: TestSnapshotWhereUniqueInput
    data: XOR<TestSnapshotUpdateWithoutOriginalTestInput, TestSnapshotUncheckedUpdateWithoutOriginalTestInput>
  }

  export type TestSnapshotUpdateManyWithWhereWithoutOriginalTestInput = {
    where: TestSnapshotScalarWhereInput
    data: XOR<TestSnapshotUpdateManyMutationInput, TestSnapshotUncheckedUpdateManyWithoutOriginalTestInput>
  }

  export type TestSnapshotScalarWhereInput = {
    AND?: TestSnapshotScalarWhereInput | TestSnapshotScalarWhereInput[]
    OR?: TestSnapshotScalarWhereInput[]
    NOT?: TestSnapshotScalarWhereInput | TestSnapshotScalarWhereInput[]
    id?: StringFilter<"TestSnapshot"> | string
    testId?: StringFilter<"TestSnapshot"> | string
    title?: StringFilter<"TestSnapshot"> | string
    description?: StringNullableFilter<"TestSnapshot"> | string | null
    status?: EnumModerationStatusFilter<"TestSnapshot"> | $Enums.ModerationStatus
    createdAt?: DateTimeFilter<"TestSnapshot"> | Date | string
    version?: IntFilter<"TestSnapshot"> | number
    visibilityStatus?: EnumTestVisibilityStatusFilter<"TestSnapshot"> | $Enums.TestVisibilityStatus
  }

  export type UserUpsertWithoutTestsCreatedInput = {
    update: XOR<UserUpdateWithoutTestsCreatedInput, UserUncheckedUpdateWithoutTestsCreatedInput>
    create: XOR<UserCreateWithoutTestsCreatedInput, UserUncheckedCreateWithoutTestsCreatedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTestsCreatedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTestsCreatedInput, UserUncheckedUpdateWithoutTestsCreatedInput>
  }

  export type UserUpdateWithoutTestsCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    patronymic?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    isActivated?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    activationLink?: NullableStringFieldUpdateOperationsInput | string | null
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activationLinkExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetCodeExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    testAttempts?: TestAttemptUpdateManyWithoutUserNestedInput
    refreshToken?: TokenUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTestsCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    patronymic?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    isActivated?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    activationLink?: NullableStringFieldUpdateOperationsInput | string | null
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activationLinkExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetCodeExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    testAttempts?: TestAttemptUncheckedUpdateManyWithoutUserNestedInput
    refreshToken?: TokenUncheckedUpdateOneWithoutUserNestedInput
  }

  export type AnswerCreateWithoutQuestionInput = {
    id?: string
    text: string
    isCorrect?: boolean
    isGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userAnswers?: UserAnswerCreateNestedManyWithoutAnswerInput
  }

  export type AnswerUncheckedCreateWithoutQuestionInput = {
    id?: string
    text: string
    isCorrect?: boolean
    isGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    userAnswers?: UserAnswerUncheckedCreateNestedManyWithoutAnswerInput
  }

  export type AnswerCreateOrConnectWithoutQuestionInput = {
    where: AnswerWhereUniqueInput
    create: XOR<AnswerCreateWithoutQuestionInput, AnswerUncheckedCreateWithoutQuestionInput>
  }

  export type AnswerCreateManyQuestionInputEnvelope = {
    data: AnswerCreateManyQuestionInput | AnswerCreateManyQuestionInput[]
    skipDuplicates?: boolean
  }

  export type TestCreateWithoutQuestionsInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ModerationStatus
    totalAttempts?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    visibilityStatus?: $Enums.TestVisibilityStatus
    testAttempts?: TestAttemptCreateNestedManyWithoutTestInput
    settings?: TestSettingsCreateNestedOneWithoutTestInput
    snapshots?: TestSnapshotCreateNestedManyWithoutOriginalTestInput
    author: UserCreateNestedOneWithoutTestsCreatedInput
  }

  export type TestUncheckedCreateWithoutQuestionsInput = {
    id?: string
    authorId: string
    title: string
    description?: string | null
    status?: $Enums.ModerationStatus
    totalAttempts?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    visibilityStatus?: $Enums.TestVisibilityStatus
    testAttempts?: TestAttemptUncheckedCreateNestedManyWithoutTestInput
    settings?: TestSettingsUncheckedCreateNestedOneWithoutTestInput
    snapshots?: TestSnapshotUncheckedCreateNestedManyWithoutOriginalTestInput
  }

  export type TestCreateOrConnectWithoutQuestionsInput = {
    where: TestWhereUniqueInput
    create: XOR<TestCreateWithoutQuestionsInput, TestUncheckedCreateWithoutQuestionsInput>
  }

  export type UserAnswerCreateWithoutQuestionInput = {
    id?: string
    answeredAt?: Date | string | null
    timeSpent?: number | null
    createdAt?: Date | string
    answer: AnswerCreateNestedOneWithoutUserAnswersInput
    attempt: TestAttemptCreateNestedOneWithoutAnswersInput
  }

  export type UserAnswerUncheckedCreateWithoutQuestionInput = {
    id?: string
    attemptId: string
    answerId: string
    answeredAt?: Date | string | null
    timeSpent?: number | null
    createdAt?: Date | string
  }

  export type UserAnswerCreateOrConnectWithoutQuestionInput = {
    where: UserAnswerWhereUniqueInput
    create: XOR<UserAnswerCreateWithoutQuestionInput, UserAnswerUncheckedCreateWithoutQuestionInput>
  }

  export type UserAnswerCreateManyQuestionInputEnvelope = {
    data: UserAnswerCreateManyQuestionInput | UserAnswerCreateManyQuestionInput[]
    skipDuplicates?: boolean
  }

  export type AnswerUpsertWithWhereUniqueWithoutQuestionInput = {
    where: AnswerWhereUniqueInput
    update: XOR<AnswerUpdateWithoutQuestionInput, AnswerUncheckedUpdateWithoutQuestionInput>
    create: XOR<AnswerCreateWithoutQuestionInput, AnswerUncheckedCreateWithoutQuestionInput>
  }

  export type AnswerUpdateWithWhereUniqueWithoutQuestionInput = {
    where: AnswerWhereUniqueInput
    data: XOR<AnswerUpdateWithoutQuestionInput, AnswerUncheckedUpdateWithoutQuestionInput>
  }

  export type AnswerUpdateManyWithWhereWithoutQuestionInput = {
    where: AnswerScalarWhereInput
    data: XOR<AnswerUpdateManyMutationInput, AnswerUncheckedUpdateManyWithoutQuestionInput>
  }

  export type AnswerScalarWhereInput = {
    AND?: AnswerScalarWhereInput | AnswerScalarWhereInput[]
    OR?: AnswerScalarWhereInput[]
    NOT?: AnswerScalarWhereInput | AnswerScalarWhereInput[]
    id?: StringFilter<"Answer"> | string
    questionId?: StringFilter<"Answer"> | string
    text?: StringFilter<"Answer"> | string
    isCorrect?: BoolFilter<"Answer"> | boolean
    isGenerated?: BoolFilter<"Answer"> | boolean
    createdAt?: DateTimeFilter<"Answer"> | Date | string
    updatedAt?: DateTimeFilter<"Answer"> | Date | string
  }

  export type TestUpsertWithoutQuestionsInput = {
    update: XOR<TestUpdateWithoutQuestionsInput, TestUncheckedUpdateWithoutQuestionsInput>
    create: XOR<TestCreateWithoutQuestionsInput, TestUncheckedCreateWithoutQuestionsInput>
    where?: TestWhereInput
  }

  export type TestUpdateToOneWithWhereWithoutQuestionsInput = {
    where?: TestWhereInput
    data: XOR<TestUpdateWithoutQuestionsInput, TestUncheckedUpdateWithoutQuestionsInput>
  }

  export type TestUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    totalAttempts?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
    testAttempts?: TestAttemptUpdateManyWithoutTestNestedInput
    settings?: TestSettingsUpdateOneWithoutTestNestedInput
    snapshots?: TestSnapshotUpdateManyWithoutOriginalTestNestedInput
    author?: UserUpdateOneRequiredWithoutTestsCreatedNestedInput
  }

  export type TestUncheckedUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    totalAttempts?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
    testAttempts?: TestAttemptUncheckedUpdateManyWithoutTestNestedInput
    settings?: TestSettingsUncheckedUpdateOneWithoutTestNestedInput
    snapshots?: TestSnapshotUncheckedUpdateManyWithoutOriginalTestNestedInput
  }

  export type UserAnswerUpsertWithWhereUniqueWithoutQuestionInput = {
    where: UserAnswerWhereUniqueInput
    update: XOR<UserAnswerUpdateWithoutQuestionInput, UserAnswerUncheckedUpdateWithoutQuestionInput>
    create: XOR<UserAnswerCreateWithoutQuestionInput, UserAnswerUncheckedCreateWithoutQuestionInput>
  }

  export type UserAnswerUpdateWithWhereUniqueWithoutQuestionInput = {
    where: UserAnswerWhereUniqueInput
    data: XOR<UserAnswerUpdateWithoutQuestionInput, UserAnswerUncheckedUpdateWithoutQuestionInput>
  }

  export type UserAnswerUpdateManyWithWhereWithoutQuestionInput = {
    where: UserAnswerScalarWhereInput
    data: XOR<UserAnswerUpdateManyMutationInput, UserAnswerUncheckedUpdateManyWithoutQuestionInput>
  }

  export type UserAnswerScalarWhereInput = {
    AND?: UserAnswerScalarWhereInput | UserAnswerScalarWhereInput[]
    OR?: UserAnswerScalarWhereInput[]
    NOT?: UserAnswerScalarWhereInput | UserAnswerScalarWhereInput[]
    id?: StringFilter<"UserAnswer"> | string
    attemptId?: StringFilter<"UserAnswer"> | string
    questionId?: StringFilter<"UserAnswer"> | string
    answerId?: StringFilter<"UserAnswer"> | string
    answeredAt?: DateTimeNullableFilter<"UserAnswer"> | Date | string | null
    timeSpent?: IntNullableFilter<"UserAnswer"> | number | null
    createdAt?: DateTimeFilter<"UserAnswer"> | Date | string
  }

  export type QuestionCreateWithoutAnswersInput = {
    id?: string
    text: string
    order: number
    type?: $Enums.QuestionType
    createdAt?: Date | string
    updatedAt?: Date | string
    test: TestCreateNestedOneWithoutQuestionsInput
    userAnswers?: UserAnswerCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateWithoutAnswersInput = {
    id?: string
    testId: string
    text: string
    order: number
    type?: $Enums.QuestionType
    createdAt?: Date | string
    updatedAt?: Date | string
    userAnswers?: UserAnswerUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionCreateOrConnectWithoutAnswersInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutAnswersInput, QuestionUncheckedCreateWithoutAnswersInput>
  }

  export type UserAnswerCreateWithoutAnswerInput = {
    id?: string
    answeredAt?: Date | string | null
    timeSpent?: number | null
    createdAt?: Date | string
    attempt: TestAttemptCreateNestedOneWithoutAnswersInput
    question: QuestionCreateNestedOneWithoutUserAnswersInput
  }

  export type UserAnswerUncheckedCreateWithoutAnswerInput = {
    id?: string
    attemptId: string
    questionId: string
    answeredAt?: Date | string | null
    timeSpent?: number | null
    createdAt?: Date | string
  }

  export type UserAnswerCreateOrConnectWithoutAnswerInput = {
    where: UserAnswerWhereUniqueInput
    create: XOR<UserAnswerCreateWithoutAnswerInput, UserAnswerUncheckedCreateWithoutAnswerInput>
  }

  export type UserAnswerCreateManyAnswerInputEnvelope = {
    data: UserAnswerCreateManyAnswerInput | UserAnswerCreateManyAnswerInput[]
    skipDuplicates?: boolean
  }

  export type QuestionUpsertWithoutAnswersInput = {
    update: XOR<QuestionUpdateWithoutAnswersInput, QuestionUncheckedUpdateWithoutAnswersInput>
    create: XOR<QuestionCreateWithoutAnswersInput, QuestionUncheckedCreateWithoutAnswersInput>
    where?: QuestionWhereInput
  }

  export type QuestionUpdateToOneWithWhereWithoutAnswersInput = {
    where?: QuestionWhereInput
    data: XOR<QuestionUpdateWithoutAnswersInput, QuestionUncheckedUpdateWithoutAnswersInput>
  }

  export type QuestionUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    test?: TestUpdateOneRequiredWithoutQuestionsNestedInput
    userAnswers?: UserAnswerUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userAnswers?: UserAnswerUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type UserAnswerUpsertWithWhereUniqueWithoutAnswerInput = {
    where: UserAnswerWhereUniqueInput
    update: XOR<UserAnswerUpdateWithoutAnswerInput, UserAnswerUncheckedUpdateWithoutAnswerInput>
    create: XOR<UserAnswerCreateWithoutAnswerInput, UserAnswerUncheckedCreateWithoutAnswerInput>
  }

  export type UserAnswerUpdateWithWhereUniqueWithoutAnswerInput = {
    where: UserAnswerWhereUniqueInput
    data: XOR<UserAnswerUpdateWithoutAnswerInput, UserAnswerUncheckedUpdateWithoutAnswerInput>
  }

  export type UserAnswerUpdateManyWithWhereWithoutAnswerInput = {
    where: UserAnswerScalarWhereInput
    data: XOR<UserAnswerUpdateManyMutationInput, UserAnswerUncheckedUpdateManyWithoutAnswerInput>
  }

  export type TestCreateWithoutTestAttemptsInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ModerationStatus
    totalAttempts?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    visibilityStatus?: $Enums.TestVisibilityStatus
    questions?: QuestionCreateNestedManyWithoutTestInput
    settings?: TestSettingsCreateNestedOneWithoutTestInput
    snapshots?: TestSnapshotCreateNestedManyWithoutOriginalTestInput
    author: UserCreateNestedOneWithoutTestsCreatedInput
  }

  export type TestUncheckedCreateWithoutTestAttemptsInput = {
    id?: string
    authorId: string
    title: string
    description?: string | null
    status?: $Enums.ModerationStatus
    totalAttempts?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    visibilityStatus?: $Enums.TestVisibilityStatus
    questions?: QuestionUncheckedCreateNestedManyWithoutTestInput
    settings?: TestSettingsUncheckedCreateNestedOneWithoutTestInput
    snapshots?: TestSnapshotUncheckedCreateNestedManyWithoutOriginalTestInput
  }

  export type TestCreateOrConnectWithoutTestAttemptsInput = {
    where: TestWhereUniqueInput
    create: XOR<TestCreateWithoutTestAttemptsInput, TestUncheckedCreateWithoutTestAttemptsInput>
  }

  export type TestSnapshotCreateWithoutAttemptsInput = {
    id?: string
    title: string
    description?: string | null
    status: $Enums.ModerationStatus
    createdAt?: Date | string
    version?: number
    visibilityStatus?: $Enums.TestVisibilityStatus
    questions?: QuestionSnapshotCreateNestedManyWithoutTestSnapshotInput
    settings?: TestSettingsSnapshotCreateNestedOneWithoutSnapshotInput
    originalTest: TestCreateNestedOneWithoutSnapshotsInput
  }

  export type TestSnapshotUncheckedCreateWithoutAttemptsInput = {
    id?: string
    testId: string
    title: string
    description?: string | null
    status: $Enums.ModerationStatus
    createdAt?: Date | string
    version?: number
    visibilityStatus?: $Enums.TestVisibilityStatus
    questions?: QuestionSnapshotUncheckedCreateNestedManyWithoutTestSnapshotInput
    settings?: TestSettingsSnapshotUncheckedCreateNestedOneWithoutSnapshotInput
  }

  export type TestSnapshotCreateOrConnectWithoutAttemptsInput = {
    where: TestSnapshotWhereUniqueInput
    create: XOR<TestSnapshotCreateWithoutAttemptsInput, TestSnapshotUncheckedCreateWithoutAttemptsInput>
  }

  export type UserCreateWithoutTestAttemptsInput = {
    id?: string
    email: string
    name?: string | null
    surname?: string | null
    patronymic?: string | null
    password: string
    isActivated?: boolean
    role?: $Enums.Role
    activationLink?: string | null
    resetCode?: string | null
    isBlocked?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    activationLinkExp?: Date | string | null
    resetCodeExp?: Date | string | null
    testsCreated?: TestCreateNestedManyWithoutAuthorInput
    refreshToken?: TokenCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTestAttemptsInput = {
    id?: string
    email: string
    name?: string | null
    surname?: string | null
    patronymic?: string | null
    password: string
    isActivated?: boolean
    role?: $Enums.Role
    activationLink?: string | null
    resetCode?: string | null
    isBlocked?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    activationLinkExp?: Date | string | null
    resetCodeExp?: Date | string | null
    testsCreated?: TestUncheckedCreateNestedManyWithoutAuthorInput
    refreshToken?: TokenUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTestAttemptsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTestAttemptsInput, UserUncheckedCreateWithoutTestAttemptsInput>
  }

  export type UserAnswerCreateWithoutAttemptInput = {
    id?: string
    answeredAt?: Date | string | null
    timeSpent?: number | null
    createdAt?: Date | string
    answer: AnswerCreateNestedOneWithoutUserAnswersInput
    question: QuestionCreateNestedOneWithoutUserAnswersInput
  }

  export type UserAnswerUncheckedCreateWithoutAttemptInput = {
    id?: string
    questionId: string
    answerId: string
    answeredAt?: Date | string | null
    timeSpent?: number | null
    createdAt?: Date | string
  }

  export type UserAnswerCreateOrConnectWithoutAttemptInput = {
    where: UserAnswerWhereUniqueInput
    create: XOR<UserAnswerCreateWithoutAttemptInput, UserAnswerUncheckedCreateWithoutAttemptInput>
  }

  export type UserAnswerCreateManyAttemptInputEnvelope = {
    data: UserAnswerCreateManyAttemptInput | UserAnswerCreateManyAttemptInput[]
    skipDuplicates?: boolean
  }

  export type TestUpsertWithoutTestAttemptsInput = {
    update: XOR<TestUpdateWithoutTestAttemptsInput, TestUncheckedUpdateWithoutTestAttemptsInput>
    create: XOR<TestCreateWithoutTestAttemptsInput, TestUncheckedCreateWithoutTestAttemptsInput>
    where?: TestWhereInput
  }

  export type TestUpdateToOneWithWhereWithoutTestAttemptsInput = {
    where?: TestWhereInput
    data: XOR<TestUpdateWithoutTestAttemptsInput, TestUncheckedUpdateWithoutTestAttemptsInput>
  }

  export type TestUpdateWithoutTestAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    totalAttempts?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
    questions?: QuestionUpdateManyWithoutTestNestedInput
    settings?: TestSettingsUpdateOneWithoutTestNestedInput
    snapshots?: TestSnapshotUpdateManyWithoutOriginalTestNestedInput
    author?: UserUpdateOneRequiredWithoutTestsCreatedNestedInput
  }

  export type TestUncheckedUpdateWithoutTestAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    totalAttempts?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
    questions?: QuestionUncheckedUpdateManyWithoutTestNestedInput
    settings?: TestSettingsUncheckedUpdateOneWithoutTestNestedInput
    snapshots?: TestSnapshotUncheckedUpdateManyWithoutOriginalTestNestedInput
  }

  export type TestSnapshotUpsertWithoutAttemptsInput = {
    update: XOR<TestSnapshotUpdateWithoutAttemptsInput, TestSnapshotUncheckedUpdateWithoutAttemptsInput>
    create: XOR<TestSnapshotCreateWithoutAttemptsInput, TestSnapshotUncheckedCreateWithoutAttemptsInput>
    where?: TestSnapshotWhereInput
  }

  export type TestSnapshotUpdateToOneWithWhereWithoutAttemptsInput = {
    where?: TestSnapshotWhereInput
    data: XOR<TestSnapshotUpdateWithoutAttemptsInput, TestSnapshotUncheckedUpdateWithoutAttemptsInput>
  }

  export type TestSnapshotUpdateWithoutAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
    questions?: QuestionSnapshotUpdateManyWithoutTestSnapshotNestedInput
    settings?: TestSettingsSnapshotUpdateOneWithoutSnapshotNestedInput
    originalTest?: TestUpdateOneRequiredWithoutSnapshotsNestedInput
  }

  export type TestSnapshotUncheckedUpdateWithoutAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
    questions?: QuestionSnapshotUncheckedUpdateManyWithoutTestSnapshotNestedInput
    settings?: TestSettingsSnapshotUncheckedUpdateOneWithoutSnapshotNestedInput
  }

  export type UserUpsertWithoutTestAttemptsInput = {
    update: XOR<UserUpdateWithoutTestAttemptsInput, UserUncheckedUpdateWithoutTestAttemptsInput>
    create: XOR<UserCreateWithoutTestAttemptsInput, UserUncheckedCreateWithoutTestAttemptsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTestAttemptsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTestAttemptsInput, UserUncheckedUpdateWithoutTestAttemptsInput>
  }

  export type UserUpdateWithoutTestAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    patronymic?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    isActivated?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    activationLink?: NullableStringFieldUpdateOperationsInput | string | null
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activationLinkExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetCodeExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    testsCreated?: TestUpdateManyWithoutAuthorNestedInput
    refreshToken?: TokenUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTestAttemptsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    surname?: NullableStringFieldUpdateOperationsInput | string | null
    patronymic?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    isActivated?: BoolFieldUpdateOperationsInput | boolean
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    activationLink?: NullableStringFieldUpdateOperationsInput | string | null
    resetCode?: NullableStringFieldUpdateOperationsInput | string | null
    isBlocked?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activationLinkExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetCodeExp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    testsCreated?: TestUncheckedUpdateManyWithoutAuthorNestedInput
    refreshToken?: TokenUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserAnswerUpsertWithWhereUniqueWithoutAttemptInput = {
    where: UserAnswerWhereUniqueInput
    update: XOR<UserAnswerUpdateWithoutAttemptInput, UserAnswerUncheckedUpdateWithoutAttemptInput>
    create: XOR<UserAnswerCreateWithoutAttemptInput, UserAnswerUncheckedCreateWithoutAttemptInput>
  }

  export type UserAnswerUpdateWithWhereUniqueWithoutAttemptInput = {
    where: UserAnswerWhereUniqueInput
    data: XOR<UserAnswerUpdateWithoutAttemptInput, UserAnswerUncheckedUpdateWithoutAttemptInput>
  }

  export type UserAnswerUpdateManyWithWhereWithoutAttemptInput = {
    where: UserAnswerScalarWhereInput
    data: XOR<UserAnswerUpdateManyMutationInput, UserAnswerUncheckedUpdateManyWithoutAttemptInput>
  }

  export type AnswerCreateWithoutUserAnswersInput = {
    id?: string
    text: string
    isCorrect?: boolean
    isGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    question: QuestionCreateNestedOneWithoutAnswersInput
  }

  export type AnswerUncheckedCreateWithoutUserAnswersInput = {
    id?: string
    questionId: string
    text: string
    isCorrect?: boolean
    isGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnswerCreateOrConnectWithoutUserAnswersInput = {
    where: AnswerWhereUniqueInput
    create: XOR<AnswerCreateWithoutUserAnswersInput, AnswerUncheckedCreateWithoutUserAnswersInput>
  }

  export type TestAttemptCreateWithoutAnswersInput = {
    id?: string
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: number | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    status: $Enums.TestAttemptStatus
    updatedAt?: Date | string
    expirationTime?: Date | string | null
    test: TestCreateNestedOneWithoutTestAttemptsInput
    snapshot?: TestSnapshotCreateNestedOneWithoutAttemptsInput
    user?: UserCreateNestedOneWithoutTestAttemptsInput
  }

  export type TestAttemptUncheckedCreateWithoutAnswersInput = {
    id?: string
    testId: string
    userId?: string | null
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: number | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    status: $Enums.TestAttemptStatus
    updatedAt?: Date | string
    testSnapshotId?: string | null
    expirationTime?: Date | string | null
  }

  export type TestAttemptCreateOrConnectWithoutAnswersInput = {
    where: TestAttemptWhereUniqueInput
    create: XOR<TestAttemptCreateWithoutAnswersInput, TestAttemptUncheckedCreateWithoutAnswersInput>
  }

  export type QuestionCreateWithoutUserAnswersInput = {
    id?: string
    text: string
    order: number
    type?: $Enums.QuestionType
    createdAt?: Date | string
    updatedAt?: Date | string
    answers?: AnswerCreateNestedManyWithoutQuestionInput
    test: TestCreateNestedOneWithoutQuestionsInput
  }

  export type QuestionUncheckedCreateWithoutUserAnswersInput = {
    id?: string
    testId: string
    text: string
    order: number
    type?: $Enums.QuestionType
    createdAt?: Date | string
    updatedAt?: Date | string
    answers?: AnswerUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionCreateOrConnectWithoutUserAnswersInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutUserAnswersInput, QuestionUncheckedCreateWithoutUserAnswersInput>
  }

  export type AnswerUpsertWithoutUserAnswersInput = {
    update: XOR<AnswerUpdateWithoutUserAnswersInput, AnswerUncheckedUpdateWithoutUserAnswersInput>
    create: XOR<AnswerCreateWithoutUserAnswersInput, AnswerUncheckedCreateWithoutUserAnswersInput>
    where?: AnswerWhereInput
  }

  export type AnswerUpdateToOneWithWhereWithoutUserAnswersInput = {
    where?: AnswerWhereInput
    data: XOR<AnswerUpdateWithoutUserAnswersInput, AnswerUncheckedUpdateWithoutUserAnswersInput>
  }

  export type AnswerUpdateWithoutUserAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    isGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    question?: QuestionUpdateOneRequiredWithoutAnswersNestedInput
  }

  export type AnswerUncheckedUpdateWithoutUserAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    isGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestAttemptUpsertWithoutAnswersInput = {
    update: XOR<TestAttemptUpdateWithoutAnswersInput, TestAttemptUncheckedUpdateWithoutAnswersInput>
    create: XOR<TestAttemptCreateWithoutAnswersInput, TestAttemptUncheckedCreateWithoutAnswersInput>
    where?: TestAttemptWhereInput
  }

  export type TestAttemptUpdateToOneWithWhereWithoutAnswersInput = {
    where?: TestAttemptWhereInput
    data: XOR<TestAttemptUpdateWithoutAnswersInput, TestAttemptUncheckedUpdateWithoutAnswersInput>
  }

  export type TestAttemptUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTestAttemptStatusFieldUpdateOperationsInput | $Enums.TestAttemptStatus
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    test?: TestUpdateOneRequiredWithoutTestAttemptsNestedInput
    snapshot?: TestSnapshotUpdateOneWithoutAttemptsNestedInput
    user?: UserUpdateOneWithoutTestAttemptsNestedInput
  }

  export type TestAttemptUncheckedUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTestAttemptStatusFieldUpdateOperationsInput | $Enums.TestAttemptStatus
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testSnapshotId?: NullableStringFieldUpdateOperationsInput | string | null
    expirationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type QuestionUpsertWithoutUserAnswersInput = {
    update: XOR<QuestionUpdateWithoutUserAnswersInput, QuestionUncheckedUpdateWithoutUserAnswersInput>
    create: XOR<QuestionCreateWithoutUserAnswersInput, QuestionUncheckedCreateWithoutUserAnswersInput>
    where?: QuestionWhereInput
  }

  export type QuestionUpdateToOneWithWhereWithoutUserAnswersInput = {
    where?: QuestionWhereInput
    data: XOR<QuestionUpdateWithoutUserAnswersInput, QuestionUncheckedUpdateWithoutUserAnswersInput>
  }

  export type QuestionUpdateWithoutUserAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answers?: AnswerUpdateManyWithoutQuestionNestedInput
    test?: TestUpdateOneRequiredWithoutQuestionsNestedInput
  }

  export type QuestionUncheckedUpdateWithoutUserAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answers?: AnswerUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionSnapshotCreateWithoutTestSnapshotInput = {
    id?: string
    originalTestId: string
    text: string
    order: number
    type: $Enums.QuestionType
    createdAt?: Date | string
    answers?: AnswerSnapshotCreateNestedManyWithoutQuestionInput
  }

  export type QuestionSnapshotUncheckedCreateWithoutTestSnapshotInput = {
    id?: string
    originalTestId: string
    text: string
    order: number
    type: $Enums.QuestionType
    createdAt?: Date | string
    answers?: AnswerSnapshotUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionSnapshotCreateOrConnectWithoutTestSnapshotInput = {
    where: QuestionSnapshotWhereUniqueInput
    create: XOR<QuestionSnapshotCreateWithoutTestSnapshotInput, QuestionSnapshotUncheckedCreateWithoutTestSnapshotInput>
  }

  export type QuestionSnapshotCreateManyTestSnapshotInputEnvelope = {
    data: QuestionSnapshotCreateManyTestSnapshotInput | QuestionSnapshotCreateManyTestSnapshotInput[]
    skipDuplicates?: boolean
  }

  export type TestAttemptCreateWithoutSnapshotInput = {
    id?: string
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: number | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    status: $Enums.TestAttemptStatus
    updatedAt?: Date | string
    expirationTime?: Date | string | null
    test: TestCreateNestedOneWithoutTestAttemptsInput
    user?: UserCreateNestedOneWithoutTestAttemptsInput
    answers?: UserAnswerCreateNestedManyWithoutAttemptInput
  }

  export type TestAttemptUncheckedCreateWithoutSnapshotInput = {
    id?: string
    testId: string
    userId?: string | null
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: number | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    status: $Enums.TestAttemptStatus
    updatedAt?: Date | string
    expirationTime?: Date | string | null
    answers?: UserAnswerUncheckedCreateNestedManyWithoutAttemptInput
  }

  export type TestAttemptCreateOrConnectWithoutSnapshotInput = {
    where: TestAttemptWhereUniqueInput
    create: XOR<TestAttemptCreateWithoutSnapshotInput, TestAttemptUncheckedCreateWithoutSnapshotInput>
  }

  export type TestAttemptCreateManySnapshotInputEnvelope = {
    data: TestAttemptCreateManySnapshotInput | TestAttemptCreateManySnapshotInput[]
    skipDuplicates?: boolean
  }

  export type TestSettingsSnapshotCreateWithoutSnapshotInput = {
    id?: string
    requireRegistration?: boolean
    inputFields?: NullableJsonNullValueInput | InputJsonValue
    showDetailedResults?: boolean
    shuffleQuestions?: boolean
    shuffleAnswers?: boolean
    timeLimit?: number | null
    createdAt?: Date | string
  }

  export type TestSettingsSnapshotUncheckedCreateWithoutSnapshotInput = {
    id?: string
    requireRegistration?: boolean
    inputFields?: NullableJsonNullValueInput | InputJsonValue
    showDetailedResults?: boolean
    shuffleQuestions?: boolean
    shuffleAnswers?: boolean
    timeLimit?: number | null
    createdAt?: Date | string
  }

  export type TestSettingsSnapshotCreateOrConnectWithoutSnapshotInput = {
    where: TestSettingsSnapshotWhereUniqueInput
    create: XOR<TestSettingsSnapshotCreateWithoutSnapshotInput, TestSettingsSnapshotUncheckedCreateWithoutSnapshotInput>
  }

  export type TestCreateWithoutSnapshotsInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ModerationStatus
    totalAttempts?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    visibilityStatus?: $Enums.TestVisibilityStatus
    questions?: QuestionCreateNestedManyWithoutTestInput
    testAttempts?: TestAttemptCreateNestedManyWithoutTestInput
    settings?: TestSettingsCreateNestedOneWithoutTestInput
    author: UserCreateNestedOneWithoutTestsCreatedInput
  }

  export type TestUncheckedCreateWithoutSnapshotsInput = {
    id?: string
    authorId: string
    title: string
    description?: string | null
    status?: $Enums.ModerationStatus
    totalAttempts?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    visibilityStatus?: $Enums.TestVisibilityStatus
    questions?: QuestionUncheckedCreateNestedManyWithoutTestInput
    testAttempts?: TestAttemptUncheckedCreateNestedManyWithoutTestInput
    settings?: TestSettingsUncheckedCreateNestedOneWithoutTestInput
  }

  export type TestCreateOrConnectWithoutSnapshotsInput = {
    where: TestWhereUniqueInput
    create: XOR<TestCreateWithoutSnapshotsInput, TestUncheckedCreateWithoutSnapshotsInput>
  }

  export type QuestionSnapshotUpsertWithWhereUniqueWithoutTestSnapshotInput = {
    where: QuestionSnapshotWhereUniqueInput
    update: XOR<QuestionSnapshotUpdateWithoutTestSnapshotInput, QuestionSnapshotUncheckedUpdateWithoutTestSnapshotInput>
    create: XOR<QuestionSnapshotCreateWithoutTestSnapshotInput, QuestionSnapshotUncheckedCreateWithoutTestSnapshotInput>
  }

  export type QuestionSnapshotUpdateWithWhereUniqueWithoutTestSnapshotInput = {
    where: QuestionSnapshotWhereUniqueInput
    data: XOR<QuestionSnapshotUpdateWithoutTestSnapshotInput, QuestionSnapshotUncheckedUpdateWithoutTestSnapshotInput>
  }

  export type QuestionSnapshotUpdateManyWithWhereWithoutTestSnapshotInput = {
    where: QuestionSnapshotScalarWhereInput
    data: XOR<QuestionSnapshotUpdateManyMutationInput, QuestionSnapshotUncheckedUpdateManyWithoutTestSnapshotInput>
  }

  export type QuestionSnapshotScalarWhereInput = {
    AND?: QuestionSnapshotScalarWhereInput | QuestionSnapshotScalarWhereInput[]
    OR?: QuestionSnapshotScalarWhereInput[]
    NOT?: QuestionSnapshotScalarWhereInput | QuestionSnapshotScalarWhereInput[]
    id?: StringFilter<"QuestionSnapshot"> | string
    testSnapshotId?: StringFilter<"QuestionSnapshot"> | string
    originalTestId?: StringFilter<"QuestionSnapshot"> | string
    text?: StringFilter<"QuestionSnapshot"> | string
    order?: IntFilter<"QuestionSnapshot"> | number
    type?: EnumQuestionTypeFilter<"QuestionSnapshot"> | $Enums.QuestionType
    createdAt?: DateTimeFilter<"QuestionSnapshot"> | Date | string
  }

  export type TestAttemptUpsertWithWhereUniqueWithoutSnapshotInput = {
    where: TestAttemptWhereUniqueInput
    update: XOR<TestAttemptUpdateWithoutSnapshotInput, TestAttemptUncheckedUpdateWithoutSnapshotInput>
    create: XOR<TestAttemptCreateWithoutSnapshotInput, TestAttemptUncheckedCreateWithoutSnapshotInput>
  }

  export type TestAttemptUpdateWithWhereUniqueWithoutSnapshotInput = {
    where: TestAttemptWhereUniqueInput
    data: XOR<TestAttemptUpdateWithoutSnapshotInput, TestAttemptUncheckedUpdateWithoutSnapshotInput>
  }

  export type TestAttemptUpdateManyWithWhereWithoutSnapshotInput = {
    where: TestAttemptScalarWhereInput
    data: XOR<TestAttemptUpdateManyMutationInput, TestAttemptUncheckedUpdateManyWithoutSnapshotInput>
  }

  export type TestSettingsSnapshotUpsertWithoutSnapshotInput = {
    update: XOR<TestSettingsSnapshotUpdateWithoutSnapshotInput, TestSettingsSnapshotUncheckedUpdateWithoutSnapshotInput>
    create: XOR<TestSettingsSnapshotCreateWithoutSnapshotInput, TestSettingsSnapshotUncheckedCreateWithoutSnapshotInput>
    where?: TestSettingsSnapshotWhereInput
  }

  export type TestSettingsSnapshotUpdateToOneWithWhereWithoutSnapshotInput = {
    where?: TestSettingsSnapshotWhereInput
    data: XOR<TestSettingsSnapshotUpdateWithoutSnapshotInput, TestSettingsSnapshotUncheckedUpdateWithoutSnapshotInput>
  }

  export type TestSettingsSnapshotUpdateWithoutSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    requireRegistration?: BoolFieldUpdateOperationsInput | boolean
    inputFields?: NullableJsonNullValueInput | InputJsonValue
    showDetailedResults?: BoolFieldUpdateOperationsInput | boolean
    shuffleQuestions?: BoolFieldUpdateOperationsInput | boolean
    shuffleAnswers?: BoolFieldUpdateOperationsInput | boolean
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestSettingsSnapshotUncheckedUpdateWithoutSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    requireRegistration?: BoolFieldUpdateOperationsInput | boolean
    inputFields?: NullableJsonNullValueInput | InputJsonValue
    showDetailedResults?: BoolFieldUpdateOperationsInput | boolean
    shuffleQuestions?: BoolFieldUpdateOperationsInput | boolean
    shuffleAnswers?: BoolFieldUpdateOperationsInput | boolean
    timeLimit?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestUpsertWithoutSnapshotsInput = {
    update: XOR<TestUpdateWithoutSnapshotsInput, TestUncheckedUpdateWithoutSnapshotsInput>
    create: XOR<TestCreateWithoutSnapshotsInput, TestUncheckedCreateWithoutSnapshotsInput>
    where?: TestWhereInput
  }

  export type TestUpdateToOneWithWhereWithoutSnapshotsInput = {
    where?: TestWhereInput
    data: XOR<TestUpdateWithoutSnapshotsInput, TestUncheckedUpdateWithoutSnapshotsInput>
  }

  export type TestUpdateWithoutSnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    totalAttempts?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
    questions?: QuestionUpdateManyWithoutTestNestedInput
    testAttempts?: TestAttemptUpdateManyWithoutTestNestedInput
    settings?: TestSettingsUpdateOneWithoutTestNestedInput
    author?: UserUpdateOneRequiredWithoutTestsCreatedNestedInput
  }

  export type TestUncheckedUpdateWithoutSnapshotsInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    totalAttempts?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
    questions?: QuestionUncheckedUpdateManyWithoutTestNestedInput
    testAttempts?: TestAttemptUncheckedUpdateManyWithoutTestNestedInput
    settings?: TestSettingsUncheckedUpdateOneWithoutTestNestedInput
  }

  export type AnswerSnapshotCreateWithoutQuestionInput = {
    id?: string
    originalTestId: string
    text: string
    isCorrect?: boolean
    createdAt?: Date | string
  }

  export type AnswerSnapshotUncheckedCreateWithoutQuestionInput = {
    id?: string
    originalTestId: string
    text: string
    isCorrect?: boolean
    createdAt?: Date | string
  }

  export type AnswerSnapshotCreateOrConnectWithoutQuestionInput = {
    where: AnswerSnapshotWhereUniqueInput
    create: XOR<AnswerSnapshotCreateWithoutQuestionInput, AnswerSnapshotUncheckedCreateWithoutQuestionInput>
  }

  export type AnswerSnapshotCreateManyQuestionInputEnvelope = {
    data: AnswerSnapshotCreateManyQuestionInput | AnswerSnapshotCreateManyQuestionInput[]
    skipDuplicates?: boolean
  }

  export type TestSnapshotCreateWithoutQuestionsInput = {
    id?: string
    title: string
    description?: string | null
    status: $Enums.ModerationStatus
    createdAt?: Date | string
    version?: number
    visibilityStatus?: $Enums.TestVisibilityStatus
    attempts?: TestAttemptCreateNestedManyWithoutSnapshotInput
    settings?: TestSettingsSnapshotCreateNestedOneWithoutSnapshotInput
    originalTest: TestCreateNestedOneWithoutSnapshotsInput
  }

  export type TestSnapshotUncheckedCreateWithoutQuestionsInput = {
    id?: string
    testId: string
    title: string
    description?: string | null
    status: $Enums.ModerationStatus
    createdAt?: Date | string
    version?: number
    visibilityStatus?: $Enums.TestVisibilityStatus
    attempts?: TestAttemptUncheckedCreateNestedManyWithoutSnapshotInput
    settings?: TestSettingsSnapshotUncheckedCreateNestedOneWithoutSnapshotInput
  }

  export type TestSnapshotCreateOrConnectWithoutQuestionsInput = {
    where: TestSnapshotWhereUniqueInput
    create: XOR<TestSnapshotCreateWithoutQuestionsInput, TestSnapshotUncheckedCreateWithoutQuestionsInput>
  }

  export type AnswerSnapshotUpsertWithWhereUniqueWithoutQuestionInput = {
    where: AnswerSnapshotWhereUniqueInput
    update: XOR<AnswerSnapshotUpdateWithoutQuestionInput, AnswerSnapshotUncheckedUpdateWithoutQuestionInput>
    create: XOR<AnswerSnapshotCreateWithoutQuestionInput, AnswerSnapshotUncheckedCreateWithoutQuestionInput>
  }

  export type AnswerSnapshotUpdateWithWhereUniqueWithoutQuestionInput = {
    where: AnswerSnapshotWhereUniqueInput
    data: XOR<AnswerSnapshotUpdateWithoutQuestionInput, AnswerSnapshotUncheckedUpdateWithoutQuestionInput>
  }

  export type AnswerSnapshotUpdateManyWithWhereWithoutQuestionInput = {
    where: AnswerSnapshotScalarWhereInput
    data: XOR<AnswerSnapshotUpdateManyMutationInput, AnswerSnapshotUncheckedUpdateManyWithoutQuestionInput>
  }

  export type AnswerSnapshotScalarWhereInput = {
    AND?: AnswerSnapshotScalarWhereInput | AnswerSnapshotScalarWhereInput[]
    OR?: AnswerSnapshotScalarWhereInput[]
    NOT?: AnswerSnapshotScalarWhereInput | AnswerSnapshotScalarWhereInput[]
    id?: StringFilter<"AnswerSnapshot"> | string
    questionId?: StringFilter<"AnswerSnapshot"> | string
    originalTestId?: StringFilter<"AnswerSnapshot"> | string
    text?: StringFilter<"AnswerSnapshot"> | string
    isCorrect?: BoolFilter<"AnswerSnapshot"> | boolean
    createdAt?: DateTimeFilter<"AnswerSnapshot"> | Date | string
  }

  export type TestSnapshotUpsertWithoutQuestionsInput = {
    update: XOR<TestSnapshotUpdateWithoutQuestionsInput, TestSnapshotUncheckedUpdateWithoutQuestionsInput>
    create: XOR<TestSnapshotCreateWithoutQuestionsInput, TestSnapshotUncheckedCreateWithoutQuestionsInput>
    where?: TestSnapshotWhereInput
  }

  export type TestSnapshotUpdateToOneWithWhereWithoutQuestionsInput = {
    where?: TestSnapshotWhereInput
    data: XOR<TestSnapshotUpdateWithoutQuestionsInput, TestSnapshotUncheckedUpdateWithoutQuestionsInput>
  }

  export type TestSnapshotUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
    attempts?: TestAttemptUpdateManyWithoutSnapshotNestedInput
    settings?: TestSettingsSnapshotUpdateOneWithoutSnapshotNestedInput
    originalTest?: TestUpdateOneRequiredWithoutSnapshotsNestedInput
  }

  export type TestSnapshotUncheckedUpdateWithoutQuestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
    attempts?: TestAttemptUncheckedUpdateManyWithoutSnapshotNestedInput
    settings?: TestSettingsSnapshotUncheckedUpdateOneWithoutSnapshotNestedInput
  }

  export type QuestionSnapshotCreateWithoutAnswersInput = {
    id?: string
    originalTestId: string
    text: string
    order: number
    type: $Enums.QuestionType
    createdAt?: Date | string
    testSnapshot: TestSnapshotCreateNestedOneWithoutQuestionsInput
  }

  export type QuestionSnapshotUncheckedCreateWithoutAnswersInput = {
    id?: string
    testSnapshotId: string
    originalTestId: string
    text: string
    order: number
    type: $Enums.QuestionType
    createdAt?: Date | string
  }

  export type QuestionSnapshotCreateOrConnectWithoutAnswersInput = {
    where: QuestionSnapshotWhereUniqueInput
    create: XOR<QuestionSnapshotCreateWithoutAnswersInput, QuestionSnapshotUncheckedCreateWithoutAnswersInput>
  }

  export type QuestionSnapshotUpsertWithoutAnswersInput = {
    update: XOR<QuestionSnapshotUpdateWithoutAnswersInput, QuestionSnapshotUncheckedUpdateWithoutAnswersInput>
    create: XOR<QuestionSnapshotCreateWithoutAnswersInput, QuestionSnapshotUncheckedCreateWithoutAnswersInput>
    where?: QuestionSnapshotWhereInput
  }

  export type QuestionSnapshotUpdateToOneWithWhereWithoutAnswersInput = {
    where?: QuestionSnapshotWhereInput
    data: XOR<QuestionSnapshotUpdateWithoutAnswersInput, QuestionSnapshotUncheckedUpdateWithoutAnswersInput>
  }

  export type QuestionSnapshotUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalTestId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testSnapshot?: TestSnapshotUpdateOneRequiredWithoutQuestionsNestedInput
  }

  export type QuestionSnapshotUncheckedUpdateWithoutAnswersInput = {
    id?: StringFieldUpdateOperationsInput | string
    testSnapshotId?: StringFieldUpdateOperationsInput | string
    originalTestId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestSnapshotCreateWithoutSettingsInput = {
    id?: string
    title: string
    description?: string | null
    status: $Enums.ModerationStatus
    createdAt?: Date | string
    version?: number
    visibilityStatus?: $Enums.TestVisibilityStatus
    questions?: QuestionSnapshotCreateNestedManyWithoutTestSnapshotInput
    attempts?: TestAttemptCreateNestedManyWithoutSnapshotInput
    originalTest: TestCreateNestedOneWithoutSnapshotsInput
  }

  export type TestSnapshotUncheckedCreateWithoutSettingsInput = {
    id?: string
    testId: string
    title: string
    description?: string | null
    status: $Enums.ModerationStatus
    createdAt?: Date | string
    version?: number
    visibilityStatus?: $Enums.TestVisibilityStatus
    questions?: QuestionSnapshotUncheckedCreateNestedManyWithoutTestSnapshotInput
    attempts?: TestAttemptUncheckedCreateNestedManyWithoutSnapshotInput
  }

  export type TestSnapshotCreateOrConnectWithoutSettingsInput = {
    where: TestSnapshotWhereUniqueInput
    create: XOR<TestSnapshotCreateWithoutSettingsInput, TestSnapshotUncheckedCreateWithoutSettingsInput>
  }

  export type TestSnapshotUpsertWithoutSettingsInput = {
    update: XOR<TestSnapshotUpdateWithoutSettingsInput, TestSnapshotUncheckedUpdateWithoutSettingsInput>
    create: XOR<TestSnapshotCreateWithoutSettingsInput, TestSnapshotUncheckedCreateWithoutSettingsInput>
    where?: TestSnapshotWhereInput
  }

  export type TestSnapshotUpdateToOneWithWhereWithoutSettingsInput = {
    where?: TestSnapshotWhereInput
    data: XOR<TestSnapshotUpdateWithoutSettingsInput, TestSnapshotUncheckedUpdateWithoutSettingsInput>
  }

  export type TestSnapshotUpdateWithoutSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
    questions?: QuestionSnapshotUpdateManyWithoutTestSnapshotNestedInput
    attempts?: TestAttemptUpdateManyWithoutSnapshotNestedInput
    originalTest?: TestUpdateOneRequiredWithoutSnapshotsNestedInput
  }

  export type TestSnapshotUncheckedUpdateWithoutSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
    questions?: QuestionSnapshotUncheckedUpdateManyWithoutTestSnapshotNestedInput
    attempts?: TestAttemptUncheckedUpdateManyWithoutSnapshotNestedInput
  }

  export type TestAttemptCreateManyUserInput = {
    id?: string
    testId: string
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: number | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    status: $Enums.TestAttemptStatus
    updatedAt?: Date | string
    testSnapshotId?: string | null
    expirationTime?: Date | string | null
  }

  export type TestCreateManyAuthorInput = {
    id?: string
    title: string
    description?: string | null
    status?: $Enums.ModerationStatus
    totalAttempts?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    version?: number
    visibilityStatus?: $Enums.TestVisibilityStatus
  }

  export type TestAttemptUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTestAttemptStatusFieldUpdateOperationsInput | $Enums.TestAttemptStatus
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    test?: TestUpdateOneRequiredWithoutTestAttemptsNestedInput
    snapshot?: TestSnapshotUpdateOneWithoutAttemptsNestedInput
    answers?: UserAnswerUpdateManyWithoutAttemptNestedInput
  }

  export type TestAttemptUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTestAttemptStatusFieldUpdateOperationsInput | $Enums.TestAttemptStatus
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testSnapshotId?: NullableStringFieldUpdateOperationsInput | string | null
    expirationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: UserAnswerUncheckedUpdateManyWithoutAttemptNestedInput
  }

  export type TestAttemptUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTestAttemptStatusFieldUpdateOperationsInput | $Enums.TestAttemptStatus
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testSnapshotId?: NullableStringFieldUpdateOperationsInput | string | null
    expirationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TestUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    totalAttempts?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
    questions?: QuestionUpdateManyWithoutTestNestedInput
    testAttempts?: TestAttemptUpdateManyWithoutTestNestedInput
    settings?: TestSettingsUpdateOneWithoutTestNestedInput
    snapshots?: TestSnapshotUpdateManyWithoutOriginalTestNestedInput
  }

  export type TestUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    totalAttempts?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
    questions?: QuestionUncheckedUpdateManyWithoutTestNestedInput
    testAttempts?: TestAttemptUncheckedUpdateManyWithoutTestNestedInput
    settings?: TestSettingsUncheckedUpdateOneWithoutTestNestedInput
    snapshots?: TestSnapshotUncheckedUpdateManyWithoutOriginalTestNestedInput
  }

  export type TestUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    totalAttempts?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
  }

  export type QuestionCreateManyTestInput = {
    id?: string
    text: string
    order: number
    type?: $Enums.QuestionType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TestAttemptCreateManyTestInput = {
    id?: string
    userId?: string | null
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: number | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    status: $Enums.TestAttemptStatus
    updatedAt?: Date | string
    testSnapshotId?: string | null
    expirationTime?: Date | string | null
  }

  export type TestSnapshotCreateManyOriginalTestInput = {
    id?: string
    title: string
    description?: string | null
    status: $Enums.ModerationStatus
    createdAt?: Date | string
    version?: number
    visibilityStatus?: $Enums.TestVisibilityStatus
  }

  export type QuestionUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answers?: AnswerUpdateManyWithoutQuestionNestedInput
    userAnswers?: UserAnswerUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answers?: AnswerUncheckedUpdateManyWithoutQuestionNestedInput
    userAnswers?: UserAnswerUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateManyWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestAttemptUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTestAttemptStatusFieldUpdateOperationsInput | $Enums.TestAttemptStatus
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    snapshot?: TestSnapshotUpdateOneWithoutAttemptsNestedInput
    user?: UserUpdateOneWithoutTestAttemptsNestedInput
    answers?: UserAnswerUpdateManyWithoutAttemptNestedInput
  }

  export type TestAttemptUncheckedUpdateWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTestAttemptStatusFieldUpdateOperationsInput | $Enums.TestAttemptStatus
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testSnapshotId?: NullableStringFieldUpdateOperationsInput | string | null
    expirationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: UserAnswerUncheckedUpdateManyWithoutAttemptNestedInput
  }

  export type TestAttemptUncheckedUpdateManyWithoutTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTestAttemptStatusFieldUpdateOperationsInput | $Enums.TestAttemptStatus
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    testSnapshotId?: NullableStringFieldUpdateOperationsInput | string | null
    expirationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TestSnapshotUpdateWithoutOriginalTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
    questions?: QuestionSnapshotUpdateManyWithoutTestSnapshotNestedInput
    attempts?: TestAttemptUpdateManyWithoutSnapshotNestedInput
    settings?: TestSettingsSnapshotUpdateOneWithoutSnapshotNestedInput
  }

  export type TestSnapshotUncheckedUpdateWithoutOriginalTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
    questions?: QuestionSnapshotUncheckedUpdateManyWithoutTestSnapshotNestedInput
    attempts?: TestAttemptUncheckedUpdateManyWithoutSnapshotNestedInput
    settings?: TestSettingsSnapshotUncheckedUpdateOneWithoutSnapshotNestedInput
  }

  export type TestSnapshotUncheckedUpdateManyWithoutOriginalTestInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    version?: IntFieldUpdateOperationsInput | number
    visibilityStatus?: EnumTestVisibilityStatusFieldUpdateOperationsInput | $Enums.TestVisibilityStatus
  }

  export type AnswerCreateManyQuestionInput = {
    id?: string
    text: string
    isCorrect?: boolean
    isGenerated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserAnswerCreateManyQuestionInput = {
    id?: string
    attemptId: string
    answerId: string
    answeredAt?: Date | string | null
    timeSpent?: number | null
    createdAt?: Date | string
  }

  export type AnswerUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    isGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userAnswers?: UserAnswerUpdateManyWithoutAnswerNestedInput
  }

  export type AnswerUncheckedUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    isGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userAnswers?: UserAnswerUncheckedUpdateManyWithoutAnswerNestedInput
  }

  export type AnswerUncheckedUpdateManyWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    isGenerated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAnswerUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answer?: AnswerUpdateOneRequiredWithoutUserAnswersNestedInput
    attempt?: TestAttemptUpdateOneRequiredWithoutAnswersNestedInput
  }

  export type UserAnswerUncheckedUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    attemptId?: StringFieldUpdateOperationsInput | string
    answerId?: StringFieldUpdateOperationsInput | string
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAnswerUncheckedUpdateManyWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    attemptId?: StringFieldUpdateOperationsInput | string
    answerId?: StringFieldUpdateOperationsInput | string
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAnswerCreateManyAnswerInput = {
    id?: string
    attemptId: string
    questionId: string
    answeredAt?: Date | string | null
    timeSpent?: number | null
    createdAt?: Date | string
  }

  export type UserAnswerUpdateWithoutAnswerInput = {
    id?: StringFieldUpdateOperationsInput | string
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attempt?: TestAttemptUpdateOneRequiredWithoutAnswersNestedInput
    question?: QuestionUpdateOneRequiredWithoutUserAnswersNestedInput
  }

  export type UserAnswerUncheckedUpdateWithoutAnswerInput = {
    id?: StringFieldUpdateOperationsInput | string
    attemptId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAnswerUncheckedUpdateManyWithoutAnswerInput = {
    id?: StringFieldUpdateOperationsInput | string
    attemptId?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAnswerCreateManyAttemptInput = {
    id?: string
    questionId: string
    answerId: string
    answeredAt?: Date | string | null
    timeSpent?: number | null
    createdAt?: Date | string
  }

  export type UserAnswerUpdateWithoutAttemptInput = {
    id?: StringFieldUpdateOperationsInput | string
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answer?: AnswerUpdateOneRequiredWithoutUserAnswersNestedInput
    question?: QuestionUpdateOneRequiredWithoutUserAnswersNestedInput
  }

  export type UserAnswerUncheckedUpdateWithoutAttemptInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    answerId?: StringFieldUpdateOperationsInput | string
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserAnswerUncheckedUpdateManyWithoutAttemptInput = {
    id?: StringFieldUpdateOperationsInput | string
    questionId?: StringFieldUpdateOperationsInput | string
    answerId?: StringFieldUpdateOperationsInput | string
    answeredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timeSpent?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionSnapshotCreateManyTestSnapshotInput = {
    id?: string
    originalTestId: string
    text: string
    order: number
    type: $Enums.QuestionType
    createdAt?: Date | string
  }

  export type TestAttemptCreateManySnapshotInput = {
    id?: string
    testId: string
    userId?: string | null
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: number | null
    startedAt?: Date | string
    completedAt?: Date | string | null
    status: $Enums.TestAttemptStatus
    updatedAt?: Date | string
    expirationTime?: Date | string | null
  }

  export type QuestionSnapshotUpdateWithoutTestSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalTestId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answers?: AnswerSnapshotUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionSnapshotUncheckedUpdateWithoutTestSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalTestId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    answers?: AnswerSnapshotUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionSnapshotUncheckedUpdateManyWithoutTestSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalTestId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestAttemptUpdateWithoutSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTestAttemptStatusFieldUpdateOperationsInput | $Enums.TestAttemptStatus
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    test?: TestUpdateOneRequiredWithoutTestAttemptsNestedInput
    user?: UserUpdateOneWithoutTestAttemptsNestedInput
    answers?: UserAnswerUpdateManyWithoutAttemptNestedInput
  }

  export type TestAttemptUncheckedUpdateWithoutSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTestAttemptStatusFieldUpdateOperationsInput | $Enums.TestAttemptStatus
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    answers?: UserAnswerUncheckedUpdateManyWithoutAttemptNestedInput
  }

  export type TestAttemptUncheckedUpdateManyWithoutSnapshotInput = {
    id?: StringFieldUpdateOperationsInput | string
    testId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    preTestUserData?: NullableJsonNullValueInput | InputJsonValue
    score?: NullableFloatFieldUpdateOperationsInput | number | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumTestAttemptStatusFieldUpdateOperationsInput | $Enums.TestAttemptStatus
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expirationTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AnswerSnapshotCreateManyQuestionInput = {
    id?: string
    originalTestId: string
    text: string
    isCorrect?: boolean
    createdAt?: Date | string
  }

  export type AnswerSnapshotUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalTestId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnswerSnapshotUncheckedUpdateWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalTestId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnswerSnapshotUncheckedUpdateManyWithoutQuestionInput = {
    id?: StringFieldUpdateOperationsInput | string
    originalTestId?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}