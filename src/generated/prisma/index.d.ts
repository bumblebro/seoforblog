
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
 * Model Blogs
 * 
 */
export type Blogs = $Result.DefaultSelection<Prisma.$BlogsPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Blogs
 * const blogs = await prisma.blogs.findMany()
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
   * // Fetch zero or more Blogs
   * const blogs = await prisma.blogs.findMany()
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
   * `prisma.blogs`: Exposes CRUD operations for the **Blogs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Blogs
    * const blogs = await prisma.blogs.findMany()
    * ```
    */
  get blogs(): Prisma.BlogsDelegate<ExtArgs, ClientOptions>;
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
    Blogs: 'Blogs'
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
      modelProps: "blogs"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Blogs: {
        payload: Prisma.$BlogsPayload<ExtArgs>
        fields: Prisma.BlogsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlogsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlogsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogsPayload>
          }
          findFirst: {
            args: Prisma.BlogsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlogsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogsPayload>
          }
          findMany: {
            args: Prisma.BlogsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogsPayload>[]
          }
          create: {
            args: Prisma.BlogsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogsPayload>
          }
          createMany: {
            args: Prisma.BlogsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BlogsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogsPayload>[]
          }
          delete: {
            args: Prisma.BlogsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogsPayload>
          }
          update: {
            args: Prisma.BlogsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogsPayload>
          }
          deleteMany: {
            args: Prisma.BlogsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlogsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BlogsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogsPayload>[]
          }
          upsert: {
            args: Prisma.BlogsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogsPayload>
          }
          aggregate: {
            args: Prisma.BlogsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlogs>
          }
          groupBy: {
            args: Prisma.BlogsGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlogsGroupByOutputType>[]
          }
          count: {
            args: Prisma.BlogsCountArgs<ExtArgs>
            result: $Utils.Optional<BlogsCountAggregateOutputType> | number
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
    blogs?: BlogsOmit
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
   * Models
   */

  /**
   * Model Blogs
   */

  export type AggregateBlogs = {
    _count: BlogsCountAggregateOutputType | null
    _min: BlogsMinAggregateOutputType | null
    _max: BlogsMaxAggregateOutputType | null
  }

  export type BlogsMinAggregateOutputType = {
    id: string | null
    author: string | null
    title: string | null
    slug: string | null
    imageurl: string | null
    imagealt: string | null
    quote: string | null
    section: string | null
    subsection: string | null
    subsubsection: string | null
    creationDate: Date | null
  }

  export type BlogsMaxAggregateOutputType = {
    id: string | null
    author: string | null
    title: string | null
    slug: string | null
    imageurl: string | null
    imagealt: string | null
    quote: string | null
    section: string | null
    subsection: string | null
    subsubsection: string | null
    creationDate: Date | null
  }

  export type BlogsCountAggregateOutputType = {
    id: number
    author: number
    title: number
    slug: number
    imageurl: number
    imagealt: number
    quote: number
    section: number
    subsection: number
    subsubsection: number
    content: number
    seo: number
    creationDate: number
    reviews: number
    _all: number
  }


  export type BlogsMinAggregateInputType = {
    id?: true
    author?: true
    title?: true
    slug?: true
    imageurl?: true
    imagealt?: true
    quote?: true
    section?: true
    subsection?: true
    subsubsection?: true
    creationDate?: true
  }

  export type BlogsMaxAggregateInputType = {
    id?: true
    author?: true
    title?: true
    slug?: true
    imageurl?: true
    imagealt?: true
    quote?: true
    section?: true
    subsection?: true
    subsubsection?: true
    creationDate?: true
  }

  export type BlogsCountAggregateInputType = {
    id?: true
    author?: true
    title?: true
    slug?: true
    imageurl?: true
    imagealt?: true
    quote?: true
    section?: true
    subsection?: true
    subsubsection?: true
    content?: true
    seo?: true
    creationDate?: true
    reviews?: true
    _all?: true
  }

  export type BlogsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Blogs to aggregate.
     */
    where?: BlogsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blogs to fetch.
     */
    orderBy?: BlogsOrderByWithRelationInput | BlogsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlogsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Blogs
    **/
    _count?: true | BlogsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlogsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlogsMaxAggregateInputType
  }

  export type GetBlogsAggregateType<T extends BlogsAggregateArgs> = {
        [P in keyof T & keyof AggregateBlogs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlogs[P]>
      : GetScalarType<T[P], AggregateBlogs[P]>
  }




  export type BlogsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogsWhereInput
    orderBy?: BlogsOrderByWithAggregationInput | BlogsOrderByWithAggregationInput[]
    by: BlogsScalarFieldEnum[] | BlogsScalarFieldEnum
    having?: BlogsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlogsCountAggregateInputType | true
    _min?: BlogsMinAggregateInputType
    _max?: BlogsMaxAggregateInputType
  }

  export type BlogsGroupByOutputType = {
    id: string
    author: string
    title: string
    slug: string
    imageurl: string
    imagealt: string
    quote: string
    section: string
    subsection: string
    subsubsection: string
    content: JsonValue[]
    seo: JsonValue
    creationDate: Date
    reviews: JsonValue[]
    _count: BlogsCountAggregateOutputType | null
    _min: BlogsMinAggregateOutputType | null
    _max: BlogsMaxAggregateOutputType | null
  }

  type GetBlogsGroupByPayload<T extends BlogsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlogsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlogsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlogsGroupByOutputType[P]>
            : GetScalarType<T[P], BlogsGroupByOutputType[P]>
        }
      >
    >


  export type BlogsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    author?: boolean
    title?: boolean
    slug?: boolean
    imageurl?: boolean
    imagealt?: boolean
    quote?: boolean
    section?: boolean
    subsection?: boolean
    subsubsection?: boolean
    content?: boolean
    seo?: boolean
    creationDate?: boolean
    reviews?: boolean
  }, ExtArgs["result"]["blogs"]>

  export type BlogsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    author?: boolean
    title?: boolean
    slug?: boolean
    imageurl?: boolean
    imagealt?: boolean
    quote?: boolean
    section?: boolean
    subsection?: boolean
    subsubsection?: boolean
    content?: boolean
    seo?: boolean
    creationDate?: boolean
    reviews?: boolean
  }, ExtArgs["result"]["blogs"]>

  export type BlogsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    author?: boolean
    title?: boolean
    slug?: boolean
    imageurl?: boolean
    imagealt?: boolean
    quote?: boolean
    section?: boolean
    subsection?: boolean
    subsubsection?: boolean
    content?: boolean
    seo?: boolean
    creationDate?: boolean
    reviews?: boolean
  }, ExtArgs["result"]["blogs"]>

  export type BlogsSelectScalar = {
    id?: boolean
    author?: boolean
    title?: boolean
    slug?: boolean
    imageurl?: boolean
    imagealt?: boolean
    quote?: boolean
    section?: boolean
    subsection?: boolean
    subsubsection?: boolean
    content?: boolean
    seo?: boolean
    creationDate?: boolean
    reviews?: boolean
  }

  export type BlogsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "author" | "title" | "slug" | "imageurl" | "imagealt" | "quote" | "section" | "subsection" | "subsubsection" | "content" | "seo" | "creationDate" | "reviews", ExtArgs["result"]["blogs"]>

  export type $BlogsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Blogs"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      author: string
      title: string
      slug: string
      imageurl: string
      imagealt: string
      quote: string
      section: string
      subsection: string
      subsubsection: string
      content: Prisma.JsonValue[]
      seo: Prisma.JsonValue
      creationDate: Date
      reviews: Prisma.JsonValue[]
    }, ExtArgs["result"]["blogs"]>
    composites: {}
  }

  type BlogsGetPayload<S extends boolean | null | undefined | BlogsDefaultArgs> = $Result.GetResult<Prisma.$BlogsPayload, S>

  type BlogsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BlogsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BlogsCountAggregateInputType | true
    }

  export interface BlogsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Blogs'], meta: { name: 'Blogs' } }
    /**
     * Find zero or one Blogs that matches the filter.
     * @param {BlogsFindUniqueArgs} args - Arguments to find a Blogs
     * @example
     * // Get one Blogs
     * const blogs = await prisma.blogs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlogsFindUniqueArgs>(args: SelectSubset<T, BlogsFindUniqueArgs<ExtArgs>>): Prisma__BlogsClient<$Result.GetResult<Prisma.$BlogsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Blogs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BlogsFindUniqueOrThrowArgs} args - Arguments to find a Blogs
     * @example
     * // Get one Blogs
     * const blogs = await prisma.blogs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlogsFindUniqueOrThrowArgs>(args: SelectSubset<T, BlogsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlogsClient<$Result.GetResult<Prisma.$BlogsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Blogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogsFindFirstArgs} args - Arguments to find a Blogs
     * @example
     * // Get one Blogs
     * const blogs = await prisma.blogs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlogsFindFirstArgs>(args?: SelectSubset<T, BlogsFindFirstArgs<ExtArgs>>): Prisma__BlogsClient<$Result.GetResult<Prisma.$BlogsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Blogs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogsFindFirstOrThrowArgs} args - Arguments to find a Blogs
     * @example
     * // Get one Blogs
     * const blogs = await prisma.blogs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlogsFindFirstOrThrowArgs>(args?: SelectSubset<T, BlogsFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlogsClient<$Result.GetResult<Prisma.$BlogsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Blogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Blogs
     * const blogs = await prisma.blogs.findMany()
     * 
     * // Get first 10 Blogs
     * const blogs = await prisma.blogs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const blogsWithIdOnly = await prisma.blogs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BlogsFindManyArgs>(args?: SelectSubset<T, BlogsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Blogs.
     * @param {BlogsCreateArgs} args - Arguments to create a Blogs.
     * @example
     * // Create one Blogs
     * const Blogs = await prisma.blogs.create({
     *   data: {
     *     // ... data to create a Blogs
     *   }
     * })
     * 
     */
    create<T extends BlogsCreateArgs>(args: SelectSubset<T, BlogsCreateArgs<ExtArgs>>): Prisma__BlogsClient<$Result.GetResult<Prisma.$BlogsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Blogs.
     * @param {BlogsCreateManyArgs} args - Arguments to create many Blogs.
     * @example
     * // Create many Blogs
     * const blogs = await prisma.blogs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlogsCreateManyArgs>(args?: SelectSubset<T, BlogsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Blogs and returns the data saved in the database.
     * @param {BlogsCreateManyAndReturnArgs} args - Arguments to create many Blogs.
     * @example
     * // Create many Blogs
     * const blogs = await prisma.blogs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Blogs and only return the `id`
     * const blogsWithIdOnly = await prisma.blogs.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BlogsCreateManyAndReturnArgs>(args?: SelectSubset<T, BlogsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Blogs.
     * @param {BlogsDeleteArgs} args - Arguments to delete one Blogs.
     * @example
     * // Delete one Blogs
     * const Blogs = await prisma.blogs.delete({
     *   where: {
     *     // ... filter to delete one Blogs
     *   }
     * })
     * 
     */
    delete<T extends BlogsDeleteArgs>(args: SelectSubset<T, BlogsDeleteArgs<ExtArgs>>): Prisma__BlogsClient<$Result.GetResult<Prisma.$BlogsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Blogs.
     * @param {BlogsUpdateArgs} args - Arguments to update one Blogs.
     * @example
     * // Update one Blogs
     * const blogs = await prisma.blogs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlogsUpdateArgs>(args: SelectSubset<T, BlogsUpdateArgs<ExtArgs>>): Prisma__BlogsClient<$Result.GetResult<Prisma.$BlogsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Blogs.
     * @param {BlogsDeleteManyArgs} args - Arguments to filter Blogs to delete.
     * @example
     * // Delete a few Blogs
     * const { count } = await prisma.blogs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlogsDeleteManyArgs>(args?: SelectSubset<T, BlogsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Blogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Blogs
     * const blogs = await prisma.blogs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlogsUpdateManyArgs>(args: SelectSubset<T, BlogsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Blogs and returns the data updated in the database.
     * @param {BlogsUpdateManyAndReturnArgs} args - Arguments to update many Blogs.
     * @example
     * // Update many Blogs
     * const blogs = await prisma.blogs.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Blogs and only return the `id`
     * const blogsWithIdOnly = await prisma.blogs.updateManyAndReturn({
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
    updateManyAndReturn<T extends BlogsUpdateManyAndReturnArgs>(args: SelectSubset<T, BlogsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Blogs.
     * @param {BlogsUpsertArgs} args - Arguments to update or create a Blogs.
     * @example
     * // Update or create a Blogs
     * const blogs = await prisma.blogs.upsert({
     *   create: {
     *     // ... data to create a Blogs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Blogs we want to update
     *   }
     * })
     */
    upsert<T extends BlogsUpsertArgs>(args: SelectSubset<T, BlogsUpsertArgs<ExtArgs>>): Prisma__BlogsClient<$Result.GetResult<Prisma.$BlogsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Blogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogsCountArgs} args - Arguments to filter Blogs to count.
     * @example
     * // Count the number of Blogs
     * const count = await prisma.blogs.count({
     *   where: {
     *     // ... the filter for the Blogs we want to count
     *   }
     * })
    **/
    count<T extends BlogsCountArgs>(
      args?: Subset<T, BlogsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlogsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Blogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BlogsAggregateArgs>(args: Subset<T, BlogsAggregateArgs>): Prisma.PrismaPromise<GetBlogsAggregateType<T>>

    /**
     * Group by Blogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogsGroupByArgs} args - Group by arguments.
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
      T extends BlogsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlogsGroupByArgs['orderBy'] }
        : { orderBy?: BlogsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BlogsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlogsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Blogs model
   */
  readonly fields: BlogsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Blogs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlogsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the Blogs model
   */
  interface BlogsFieldRefs {
    readonly id: FieldRef<"Blogs", 'String'>
    readonly author: FieldRef<"Blogs", 'String'>
    readonly title: FieldRef<"Blogs", 'String'>
    readonly slug: FieldRef<"Blogs", 'String'>
    readonly imageurl: FieldRef<"Blogs", 'String'>
    readonly imagealt: FieldRef<"Blogs", 'String'>
    readonly quote: FieldRef<"Blogs", 'String'>
    readonly section: FieldRef<"Blogs", 'String'>
    readonly subsection: FieldRef<"Blogs", 'String'>
    readonly subsubsection: FieldRef<"Blogs", 'String'>
    readonly content: FieldRef<"Blogs", 'Json[]'>
    readonly seo: FieldRef<"Blogs", 'Json'>
    readonly creationDate: FieldRef<"Blogs", 'DateTime'>
    readonly reviews: FieldRef<"Blogs", 'Json[]'>
  }
    

  // Custom InputTypes
  /**
   * Blogs findUnique
   */
  export type BlogsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blogs
     */
    select?: BlogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blogs
     */
    omit?: BlogsOmit<ExtArgs> | null
    /**
     * Filter, which Blogs to fetch.
     */
    where: BlogsWhereUniqueInput
  }

  /**
   * Blogs findUniqueOrThrow
   */
  export type BlogsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blogs
     */
    select?: BlogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blogs
     */
    omit?: BlogsOmit<ExtArgs> | null
    /**
     * Filter, which Blogs to fetch.
     */
    where: BlogsWhereUniqueInput
  }

  /**
   * Blogs findFirst
   */
  export type BlogsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blogs
     */
    select?: BlogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blogs
     */
    omit?: BlogsOmit<ExtArgs> | null
    /**
     * Filter, which Blogs to fetch.
     */
    where?: BlogsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blogs to fetch.
     */
    orderBy?: BlogsOrderByWithRelationInput | BlogsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Blogs.
     */
    cursor?: BlogsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Blogs.
     */
    distinct?: BlogsScalarFieldEnum | BlogsScalarFieldEnum[]
  }

  /**
   * Blogs findFirstOrThrow
   */
  export type BlogsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blogs
     */
    select?: BlogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blogs
     */
    omit?: BlogsOmit<ExtArgs> | null
    /**
     * Filter, which Blogs to fetch.
     */
    where?: BlogsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blogs to fetch.
     */
    orderBy?: BlogsOrderByWithRelationInput | BlogsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Blogs.
     */
    cursor?: BlogsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Blogs.
     */
    distinct?: BlogsScalarFieldEnum | BlogsScalarFieldEnum[]
  }

  /**
   * Blogs findMany
   */
  export type BlogsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blogs
     */
    select?: BlogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blogs
     */
    omit?: BlogsOmit<ExtArgs> | null
    /**
     * Filter, which Blogs to fetch.
     */
    where?: BlogsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blogs to fetch.
     */
    orderBy?: BlogsOrderByWithRelationInput | BlogsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Blogs.
     */
    cursor?: BlogsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blogs.
     */
    skip?: number
    distinct?: BlogsScalarFieldEnum | BlogsScalarFieldEnum[]
  }

  /**
   * Blogs create
   */
  export type BlogsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blogs
     */
    select?: BlogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blogs
     */
    omit?: BlogsOmit<ExtArgs> | null
    /**
     * The data needed to create a Blogs.
     */
    data: XOR<BlogsCreateInput, BlogsUncheckedCreateInput>
  }

  /**
   * Blogs createMany
   */
  export type BlogsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Blogs.
     */
    data: BlogsCreateManyInput | BlogsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Blogs createManyAndReturn
   */
  export type BlogsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blogs
     */
    select?: BlogsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Blogs
     */
    omit?: BlogsOmit<ExtArgs> | null
    /**
     * The data used to create many Blogs.
     */
    data: BlogsCreateManyInput | BlogsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Blogs update
   */
  export type BlogsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blogs
     */
    select?: BlogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blogs
     */
    omit?: BlogsOmit<ExtArgs> | null
    /**
     * The data needed to update a Blogs.
     */
    data: XOR<BlogsUpdateInput, BlogsUncheckedUpdateInput>
    /**
     * Choose, which Blogs to update.
     */
    where: BlogsWhereUniqueInput
  }

  /**
   * Blogs updateMany
   */
  export type BlogsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Blogs.
     */
    data: XOR<BlogsUpdateManyMutationInput, BlogsUncheckedUpdateManyInput>
    /**
     * Filter which Blogs to update
     */
    where?: BlogsWhereInput
    /**
     * Limit how many Blogs to update.
     */
    limit?: number
  }

  /**
   * Blogs updateManyAndReturn
   */
  export type BlogsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blogs
     */
    select?: BlogsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Blogs
     */
    omit?: BlogsOmit<ExtArgs> | null
    /**
     * The data used to update Blogs.
     */
    data: XOR<BlogsUpdateManyMutationInput, BlogsUncheckedUpdateManyInput>
    /**
     * Filter which Blogs to update
     */
    where?: BlogsWhereInput
    /**
     * Limit how many Blogs to update.
     */
    limit?: number
  }

  /**
   * Blogs upsert
   */
  export type BlogsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blogs
     */
    select?: BlogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blogs
     */
    omit?: BlogsOmit<ExtArgs> | null
    /**
     * The filter to search for the Blogs to update in case it exists.
     */
    where: BlogsWhereUniqueInput
    /**
     * In case the Blogs found by the `where` argument doesn't exist, create a new Blogs with this data.
     */
    create: XOR<BlogsCreateInput, BlogsUncheckedCreateInput>
    /**
     * In case the Blogs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlogsUpdateInput, BlogsUncheckedUpdateInput>
  }

  /**
   * Blogs delete
   */
  export type BlogsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blogs
     */
    select?: BlogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blogs
     */
    omit?: BlogsOmit<ExtArgs> | null
    /**
     * Filter which Blogs to delete.
     */
    where: BlogsWhereUniqueInput
  }

  /**
   * Blogs deleteMany
   */
  export type BlogsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Blogs to delete
     */
    where?: BlogsWhereInput
    /**
     * Limit how many Blogs to delete.
     */
    limit?: number
  }

  /**
   * Blogs without action
   */
  export type BlogsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blogs
     */
    select?: BlogsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Blogs
     */
    omit?: BlogsOmit<ExtArgs> | null
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


  export const BlogsScalarFieldEnum: {
    id: 'id',
    author: 'author',
    title: 'title',
    slug: 'slug',
    imageurl: 'imageurl',
    imagealt: 'imagealt',
    quote: 'quote',
    section: 'section',
    subsection: 'subsection',
    subsubsection: 'subsubsection',
    content: 'content',
    seo: 'seo',
    creationDate: 'creationDate',
    reviews: 'reviews'
  };

  export type BlogsScalarFieldEnum = (typeof BlogsScalarFieldEnum)[keyof typeof BlogsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


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
   * Reference to a field of type 'Json[]'
   */
  export type ListJsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type BlogsWhereInput = {
    AND?: BlogsWhereInput | BlogsWhereInput[]
    OR?: BlogsWhereInput[]
    NOT?: BlogsWhereInput | BlogsWhereInput[]
    id?: StringFilter<"Blogs"> | string
    author?: StringFilter<"Blogs"> | string
    title?: StringFilter<"Blogs"> | string
    slug?: StringFilter<"Blogs"> | string
    imageurl?: StringFilter<"Blogs"> | string
    imagealt?: StringFilter<"Blogs"> | string
    quote?: StringFilter<"Blogs"> | string
    section?: StringFilter<"Blogs"> | string
    subsection?: StringFilter<"Blogs"> | string
    subsubsection?: StringFilter<"Blogs"> | string
    content?: JsonNullableListFilter<"Blogs">
    seo?: JsonFilter<"Blogs">
    creationDate?: DateTimeFilter<"Blogs"> | Date | string
    reviews?: JsonNullableListFilter<"Blogs">
  }

  export type BlogsOrderByWithRelationInput = {
    id?: SortOrder
    author?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    imageurl?: SortOrder
    imagealt?: SortOrder
    quote?: SortOrder
    section?: SortOrder
    subsection?: SortOrder
    subsubsection?: SortOrder
    content?: SortOrder
    seo?: SortOrder
    creationDate?: SortOrder
    reviews?: SortOrder
  }

  export type BlogsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    title?: string
    slug?: string
    AND?: BlogsWhereInput | BlogsWhereInput[]
    OR?: BlogsWhereInput[]
    NOT?: BlogsWhereInput | BlogsWhereInput[]
    author?: StringFilter<"Blogs"> | string
    imageurl?: StringFilter<"Blogs"> | string
    imagealt?: StringFilter<"Blogs"> | string
    quote?: StringFilter<"Blogs"> | string
    section?: StringFilter<"Blogs"> | string
    subsection?: StringFilter<"Blogs"> | string
    subsubsection?: StringFilter<"Blogs"> | string
    content?: JsonNullableListFilter<"Blogs">
    seo?: JsonFilter<"Blogs">
    creationDate?: DateTimeFilter<"Blogs"> | Date | string
    reviews?: JsonNullableListFilter<"Blogs">
  }, "id" | "title" | "slug">

  export type BlogsOrderByWithAggregationInput = {
    id?: SortOrder
    author?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    imageurl?: SortOrder
    imagealt?: SortOrder
    quote?: SortOrder
    section?: SortOrder
    subsection?: SortOrder
    subsubsection?: SortOrder
    content?: SortOrder
    seo?: SortOrder
    creationDate?: SortOrder
    reviews?: SortOrder
    _count?: BlogsCountOrderByAggregateInput
    _max?: BlogsMaxOrderByAggregateInput
    _min?: BlogsMinOrderByAggregateInput
  }

  export type BlogsScalarWhereWithAggregatesInput = {
    AND?: BlogsScalarWhereWithAggregatesInput | BlogsScalarWhereWithAggregatesInput[]
    OR?: BlogsScalarWhereWithAggregatesInput[]
    NOT?: BlogsScalarWhereWithAggregatesInput | BlogsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Blogs"> | string
    author?: StringWithAggregatesFilter<"Blogs"> | string
    title?: StringWithAggregatesFilter<"Blogs"> | string
    slug?: StringWithAggregatesFilter<"Blogs"> | string
    imageurl?: StringWithAggregatesFilter<"Blogs"> | string
    imagealt?: StringWithAggregatesFilter<"Blogs"> | string
    quote?: StringWithAggregatesFilter<"Blogs"> | string
    section?: StringWithAggregatesFilter<"Blogs"> | string
    subsection?: StringWithAggregatesFilter<"Blogs"> | string
    subsubsection?: StringWithAggregatesFilter<"Blogs"> | string
    content?: JsonNullableListFilter<"Blogs">
    seo?: JsonWithAggregatesFilter<"Blogs">
    creationDate?: DateTimeWithAggregatesFilter<"Blogs"> | Date | string
    reviews?: JsonNullableListFilter<"Blogs">
  }

  export type BlogsCreateInput = {
    id?: string
    author: string
    title: string
    slug: string
    imageurl: string
    imagealt: string
    quote: string
    section: string
    subsection: string
    subsubsection: string
    content?: BlogsCreatecontentInput | InputJsonValue[]
    seo: JsonNullValueInput | InputJsonValue
    creationDate?: Date | string
    reviews?: BlogsCreatereviewsInput | InputJsonValue[]
  }

  export type BlogsUncheckedCreateInput = {
    id?: string
    author: string
    title: string
    slug: string
    imageurl: string
    imagealt: string
    quote: string
    section: string
    subsection: string
    subsubsection: string
    content?: BlogsCreatecontentInput | InputJsonValue[]
    seo: JsonNullValueInput | InputJsonValue
    creationDate?: Date | string
    reviews?: BlogsCreatereviewsInput | InputJsonValue[]
  }

  export type BlogsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    imageurl?: StringFieldUpdateOperationsInput | string
    imagealt?: StringFieldUpdateOperationsInput | string
    quote?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    subsection?: StringFieldUpdateOperationsInput | string
    subsubsection?: StringFieldUpdateOperationsInput | string
    content?: BlogsUpdatecontentInput | InputJsonValue[]
    seo?: JsonNullValueInput | InputJsonValue
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: BlogsUpdatereviewsInput | InputJsonValue[]
  }

  export type BlogsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    imageurl?: StringFieldUpdateOperationsInput | string
    imagealt?: StringFieldUpdateOperationsInput | string
    quote?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    subsection?: StringFieldUpdateOperationsInput | string
    subsubsection?: StringFieldUpdateOperationsInput | string
    content?: BlogsUpdatecontentInput | InputJsonValue[]
    seo?: JsonNullValueInput | InputJsonValue
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: BlogsUpdatereviewsInput | InputJsonValue[]
  }

  export type BlogsCreateManyInput = {
    id?: string
    author: string
    title: string
    slug: string
    imageurl: string
    imagealt: string
    quote: string
    section: string
    subsection: string
    subsubsection: string
    content?: BlogsCreatecontentInput | InputJsonValue[]
    seo: JsonNullValueInput | InputJsonValue
    creationDate?: Date | string
    reviews?: BlogsCreatereviewsInput | InputJsonValue[]
  }

  export type BlogsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    imageurl?: StringFieldUpdateOperationsInput | string
    imagealt?: StringFieldUpdateOperationsInput | string
    quote?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    subsection?: StringFieldUpdateOperationsInput | string
    subsubsection?: StringFieldUpdateOperationsInput | string
    content?: BlogsUpdatecontentInput | InputJsonValue[]
    seo?: JsonNullValueInput | InputJsonValue
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: BlogsUpdatereviewsInput | InputJsonValue[]
  }

  export type BlogsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    imageurl?: StringFieldUpdateOperationsInput | string
    imagealt?: StringFieldUpdateOperationsInput | string
    quote?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    subsection?: StringFieldUpdateOperationsInput | string
    subsubsection?: StringFieldUpdateOperationsInput | string
    content?: BlogsUpdatecontentInput | InputJsonValue[]
    seo?: JsonNullValueInput | InputJsonValue
    creationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: BlogsUpdatereviewsInput | InputJsonValue[]
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
  export type JsonNullableListFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableListFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableListFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableListFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableListFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableListFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue[] | ListJsonFieldRefInput<$PrismaModel> | null
    has?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    hasEvery?: InputJsonValue[] | ListJsonFieldRefInput<$PrismaModel>
    hasSome?: InputJsonValue[] | ListJsonFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
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

  export type BlogsCountOrderByAggregateInput = {
    id?: SortOrder
    author?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    imageurl?: SortOrder
    imagealt?: SortOrder
    quote?: SortOrder
    section?: SortOrder
    subsection?: SortOrder
    subsubsection?: SortOrder
    content?: SortOrder
    seo?: SortOrder
    creationDate?: SortOrder
    reviews?: SortOrder
  }

  export type BlogsMaxOrderByAggregateInput = {
    id?: SortOrder
    author?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    imageurl?: SortOrder
    imagealt?: SortOrder
    quote?: SortOrder
    section?: SortOrder
    subsection?: SortOrder
    subsubsection?: SortOrder
    creationDate?: SortOrder
  }

  export type BlogsMinOrderByAggregateInput = {
    id?: SortOrder
    author?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    imageurl?: SortOrder
    imagealt?: SortOrder
    quote?: SortOrder
    section?: SortOrder
    subsection?: SortOrder
    subsubsection?: SortOrder
    creationDate?: SortOrder
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
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
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
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
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

  export type BlogsCreatecontentInput = {
    set: InputJsonValue[]
  }

  export type BlogsCreatereviewsInput = {
    set: InputJsonValue[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BlogsUpdatecontentInput = {
    set?: InputJsonValue[]
    push?: InputJsonValue | InputJsonValue[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BlogsUpdatereviewsInput = {
    set?: InputJsonValue[]
    push?: InputJsonValue | InputJsonValue[]
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
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
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