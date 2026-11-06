
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
 * Model location
 * 
 */
export type location = $Result.DefaultSelection<Prisma.$locationPayload>
/**
 * Model item
 * 
 */
export type item = $Result.DefaultSelection<Prisma.$itemPayload>
/**
 * Model item_in_list
 * 
 */
export type item_in_list = $Result.DefaultSelection<Prisma.$item_in_listPayload>
/**
 * Model item_price_history
 * 
 */
export type item_price_history = $Result.DefaultSelection<Prisma.$item_price_historyPayload>
/**
 * Model item_status
 * 
 */
export type item_status = $Result.DefaultSelection<Prisma.$item_statusPayload>
/**
 * Model item_favorite
 * 
 */
export type item_favorite = $Result.DefaultSelection<Prisma.$item_favoritePayload>
/**
 * Model shopping_list
 * 
 */
export type shopping_list = $Result.DefaultSelection<Prisma.$shopping_listPayload>
/**
 * Model store_section
 * 
 */
export type store_section = $Result.DefaultSelection<Prisma.$store_sectionPayload>
/**
 * Model user
 * 
 */
export type user = $Result.DefaultSelection<Prisma.$userPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Locations
 * const locations = await prisma.location.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Locations
   * const locations = await prisma.location.findMany()
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
   * `prisma.location`: Exposes CRUD operations for the **location** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Locations
    * const locations = await prisma.location.findMany()
    * ```
    */
  get location(): Prisma.locationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.item`: Exposes CRUD operations for the **item** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Items
    * const items = await prisma.item.findMany()
    * ```
    */
  get item(): Prisma.itemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.item_in_list`: Exposes CRUD operations for the **item_in_list** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Item_in_lists
    * const item_in_lists = await prisma.item_in_list.findMany()
    * ```
    */
  get item_in_list(): Prisma.item_in_listDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.item_price_history`: Exposes CRUD operations for the **item_price_history** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Item_price_histories
    * const item_price_histories = await prisma.item_price_history.findMany()
    * ```
    */
  get item_price_history(): Prisma.item_price_historyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.item_status`: Exposes CRUD operations for the **item_status** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Item_statuses
    * const item_statuses = await prisma.item_status.findMany()
    * ```
    */
  get item_status(): Prisma.item_statusDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.item_favorite`: Exposes CRUD operations for the **item_favorite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Item_favorites
    * const item_favorites = await prisma.item_favorite.findMany()
    * ```
    */
  get item_favorite(): Prisma.item_favoriteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.shopping_list`: Exposes CRUD operations for the **shopping_list** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Shopping_lists
    * const shopping_lists = await prisma.shopping_list.findMany()
    * ```
    */
  get shopping_list(): Prisma.shopping_listDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.store_section`: Exposes CRUD operations for the **store_section** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Store_sections
    * const store_sections = await prisma.store_section.findMany()
    * ```
    */
  get store_section(): Prisma.store_sectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **user** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.userDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    location: 'location',
    item: 'item',
    item_in_list: 'item_in_list',
    item_price_history: 'item_price_history',
    item_status: 'item_status',
    item_favorite: 'item_favorite',
    shopping_list: 'shopping_list',
    store_section: 'store_section',
    user: 'user'
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
      modelProps: "location" | "item" | "item_in_list" | "item_price_history" | "item_status" | "item_favorite" | "shopping_list" | "store_section" | "user"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      location: {
        payload: Prisma.$locationPayload<ExtArgs>
        fields: Prisma.locationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.locationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$locationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.locationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$locationPayload>
          }
          findFirst: {
            args: Prisma.locationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$locationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.locationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$locationPayload>
          }
          findMany: {
            args: Prisma.locationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$locationPayload>[]
          }
          create: {
            args: Prisma.locationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$locationPayload>
          }
          createMany: {
            args: Prisma.locationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.locationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$locationPayload>
          }
          update: {
            args: Prisma.locationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$locationPayload>
          }
          deleteMany: {
            args: Prisma.locationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.locationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.locationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$locationPayload>
          }
          aggregate: {
            args: Prisma.LocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocation>
          }
          groupBy: {
            args: Prisma.locationGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.locationCountArgs<ExtArgs>
            result: $Utils.Optional<LocationCountAggregateOutputType> | number
          }
        }
      }
      item: {
        payload: Prisma.$itemPayload<ExtArgs>
        fields: Prisma.itemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.itemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$itemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.itemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$itemPayload>
          }
          findFirst: {
            args: Prisma.itemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$itemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.itemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$itemPayload>
          }
          findMany: {
            args: Prisma.itemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$itemPayload>[]
          }
          create: {
            args: Prisma.itemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$itemPayload>
          }
          createMany: {
            args: Prisma.itemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.itemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$itemPayload>
          }
          update: {
            args: Prisma.itemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$itemPayload>
          }
          deleteMany: {
            args: Prisma.itemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.itemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.itemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$itemPayload>
          }
          aggregate: {
            args: Prisma.ItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItem>
          }
          groupBy: {
            args: Prisma.itemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.itemCountArgs<ExtArgs>
            result: $Utils.Optional<ItemCountAggregateOutputType> | number
          }
        }
      }
      item_in_list: {
        payload: Prisma.$item_in_listPayload<ExtArgs>
        fields: Prisma.item_in_listFieldRefs
        operations: {
          findUnique: {
            args: Prisma.item_in_listFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_in_listPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.item_in_listFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_in_listPayload>
          }
          findFirst: {
            args: Prisma.item_in_listFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_in_listPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.item_in_listFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_in_listPayload>
          }
          findMany: {
            args: Prisma.item_in_listFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_in_listPayload>[]
          }
          create: {
            args: Prisma.item_in_listCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_in_listPayload>
          }
          createMany: {
            args: Prisma.item_in_listCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.item_in_listDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_in_listPayload>
          }
          update: {
            args: Prisma.item_in_listUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_in_listPayload>
          }
          deleteMany: {
            args: Prisma.item_in_listDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.item_in_listUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.item_in_listUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_in_listPayload>
          }
          aggregate: {
            args: Prisma.Item_in_listAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItem_in_list>
          }
          groupBy: {
            args: Prisma.item_in_listGroupByArgs<ExtArgs>
            result: $Utils.Optional<Item_in_listGroupByOutputType>[]
          }
          count: {
            args: Prisma.item_in_listCountArgs<ExtArgs>
            result: $Utils.Optional<Item_in_listCountAggregateOutputType> | number
          }
        }
      }
      item_price_history: {
        payload: Prisma.$item_price_historyPayload<ExtArgs>
        fields: Prisma.item_price_historyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.item_price_historyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_price_historyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.item_price_historyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_price_historyPayload>
          }
          findFirst: {
            args: Prisma.item_price_historyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_price_historyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.item_price_historyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_price_historyPayload>
          }
          findMany: {
            args: Prisma.item_price_historyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_price_historyPayload>[]
          }
          create: {
            args: Prisma.item_price_historyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_price_historyPayload>
          }
          createMany: {
            args: Prisma.item_price_historyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.item_price_historyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_price_historyPayload>
          }
          update: {
            args: Prisma.item_price_historyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_price_historyPayload>
          }
          deleteMany: {
            args: Prisma.item_price_historyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.item_price_historyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.item_price_historyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_price_historyPayload>
          }
          aggregate: {
            args: Prisma.Item_price_historyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItem_price_history>
          }
          groupBy: {
            args: Prisma.item_price_historyGroupByArgs<ExtArgs>
            result: $Utils.Optional<Item_price_historyGroupByOutputType>[]
          }
          count: {
            args: Prisma.item_price_historyCountArgs<ExtArgs>
            result: $Utils.Optional<Item_price_historyCountAggregateOutputType> | number
          }
        }
      }
      item_status: {
        payload: Prisma.$item_statusPayload<ExtArgs>
        fields: Prisma.item_statusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.item_statusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_statusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.item_statusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_statusPayload>
          }
          findFirst: {
            args: Prisma.item_statusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_statusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.item_statusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_statusPayload>
          }
          findMany: {
            args: Prisma.item_statusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_statusPayload>[]
          }
          create: {
            args: Prisma.item_statusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_statusPayload>
          }
          createMany: {
            args: Prisma.item_statusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.item_statusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_statusPayload>
          }
          update: {
            args: Prisma.item_statusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_statusPayload>
          }
          deleteMany: {
            args: Prisma.item_statusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.item_statusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.item_statusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_statusPayload>
          }
          aggregate: {
            args: Prisma.Item_statusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItem_status>
          }
          groupBy: {
            args: Prisma.item_statusGroupByArgs<ExtArgs>
            result: $Utils.Optional<Item_statusGroupByOutputType>[]
          }
          count: {
            args: Prisma.item_statusCountArgs<ExtArgs>
            result: $Utils.Optional<Item_statusCountAggregateOutputType> | number
          }
        }
      }
      item_favorite: {
        payload: Prisma.$item_favoritePayload<ExtArgs>
        fields: Prisma.item_favoriteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.item_favoriteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_favoritePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.item_favoriteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_favoritePayload>
          }
          findFirst: {
            args: Prisma.item_favoriteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_favoritePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.item_favoriteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_favoritePayload>
          }
          findMany: {
            args: Prisma.item_favoriteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_favoritePayload>[]
          }
          create: {
            args: Prisma.item_favoriteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_favoritePayload>
          }
          createMany: {
            args: Prisma.item_favoriteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.item_favoriteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_favoritePayload>
          }
          update: {
            args: Prisma.item_favoriteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_favoritePayload>
          }
          deleteMany: {
            args: Prisma.item_favoriteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.item_favoriteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.item_favoriteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$item_favoritePayload>
          }
          aggregate: {
            args: Prisma.Item_favoriteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItem_favorite>
          }
          groupBy: {
            args: Prisma.item_favoriteGroupByArgs<ExtArgs>
            result: $Utils.Optional<Item_favoriteGroupByOutputType>[]
          }
          count: {
            args: Prisma.item_favoriteCountArgs<ExtArgs>
            result: $Utils.Optional<Item_favoriteCountAggregateOutputType> | number
          }
        }
      }
      shopping_list: {
        payload: Prisma.$shopping_listPayload<ExtArgs>
        fields: Prisma.shopping_listFieldRefs
        operations: {
          findUnique: {
            args: Prisma.shopping_listFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$shopping_listPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.shopping_listFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$shopping_listPayload>
          }
          findFirst: {
            args: Prisma.shopping_listFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$shopping_listPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.shopping_listFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$shopping_listPayload>
          }
          findMany: {
            args: Prisma.shopping_listFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$shopping_listPayload>[]
          }
          create: {
            args: Prisma.shopping_listCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$shopping_listPayload>
          }
          createMany: {
            args: Prisma.shopping_listCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.shopping_listDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$shopping_listPayload>
          }
          update: {
            args: Prisma.shopping_listUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$shopping_listPayload>
          }
          deleteMany: {
            args: Prisma.shopping_listDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.shopping_listUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.shopping_listUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$shopping_listPayload>
          }
          aggregate: {
            args: Prisma.Shopping_listAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShopping_list>
          }
          groupBy: {
            args: Prisma.shopping_listGroupByArgs<ExtArgs>
            result: $Utils.Optional<Shopping_listGroupByOutputType>[]
          }
          count: {
            args: Prisma.shopping_listCountArgs<ExtArgs>
            result: $Utils.Optional<Shopping_listCountAggregateOutputType> | number
          }
        }
      }
      store_section: {
        payload: Prisma.$store_sectionPayload<ExtArgs>
        fields: Prisma.store_sectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.store_sectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$store_sectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.store_sectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$store_sectionPayload>
          }
          findFirst: {
            args: Prisma.store_sectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$store_sectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.store_sectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$store_sectionPayload>
          }
          findMany: {
            args: Prisma.store_sectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$store_sectionPayload>[]
          }
          create: {
            args: Prisma.store_sectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$store_sectionPayload>
          }
          createMany: {
            args: Prisma.store_sectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.store_sectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$store_sectionPayload>
          }
          update: {
            args: Prisma.store_sectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$store_sectionPayload>
          }
          deleteMany: {
            args: Prisma.store_sectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.store_sectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.store_sectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$store_sectionPayload>
          }
          aggregate: {
            args: Prisma.Store_sectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStore_section>
          }
          groupBy: {
            args: Prisma.store_sectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<Store_sectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.store_sectionCountArgs<ExtArgs>
            result: $Utils.Optional<Store_sectionCountAggregateOutputType> | number
          }
        }
      }
      user: {
        payload: Prisma.$userPayload<ExtArgs>
        fields: Prisma.userFieldRefs
        operations: {
          findUnique: {
            args: Prisma.userFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.userFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findFirst: {
            args: Prisma.userFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.userFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findMany: {
            args: Prisma.userFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          create: {
            args: Prisma.userCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          createMany: {
            args: Prisma.userCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.userDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          update: {
            args: Prisma.userUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          deleteMany: {
            args: Prisma.userDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.userUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.userUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.userGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.userCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
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
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
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
    location?: locationOmit
    item?: itemOmit
    item_in_list?: item_in_listOmit
    item_price_history?: item_price_historyOmit
    item_status?: item_statusOmit
    item_favorite?: item_favoriteOmit
    shopping_list?: shopping_listOmit
    store_section?: store_sectionOmit
    user?: userOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
   * Count Type LocationCountOutputType
   */

  export type LocationCountOutputType = {
    item: number
    shopping_list: number
    store_section: number
  }

  export type LocationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | LocationCountOutputTypeCountItemArgs
    shopping_list?: boolean | LocationCountOutputTypeCountShopping_listArgs
    store_section?: boolean | LocationCountOutputTypeCountStore_sectionArgs
  }

  // Custom InputTypes
  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationCountOutputType
     */
    select?: LocationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: itemWhereInput
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountShopping_listArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: shopping_listWhereInput
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountStore_sectionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: store_sectionWhereInput
  }


  /**
   * Count Type ItemCountOutputType
   */

  export type ItemCountOutputType = {
    item_in_list: number
    item_price_history: number
    item_favorite: number
  }

  export type ItemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item_in_list?: boolean | ItemCountOutputTypeCountItem_in_listArgs
    item_price_history?: boolean | ItemCountOutputTypeCountItem_price_historyArgs
    item_favorite?: boolean | ItemCountOutputTypeCountItem_favoriteArgs
  }

  // Custom InputTypes
  /**
   * ItemCountOutputType without action
   */
  export type ItemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ItemCountOutputType
     */
    select?: ItemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ItemCountOutputType without action
   */
  export type ItemCountOutputTypeCountItem_in_listArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: item_in_listWhereInput
  }

  /**
   * ItemCountOutputType without action
   */
  export type ItemCountOutputTypeCountItem_price_historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: item_price_historyWhereInput
  }

  /**
   * ItemCountOutputType without action
   */
  export type ItemCountOutputTypeCountItem_favoriteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: item_favoriteWhereInput
  }


  /**
   * Count Type Item_statusCountOutputType
   */

  export type Item_statusCountOutputType = {
    item_in_list: number
  }

  export type Item_statusCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item_in_list?: boolean | Item_statusCountOutputTypeCountItem_in_listArgs
  }

  // Custom InputTypes
  /**
   * Item_statusCountOutputType without action
   */
  export type Item_statusCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item_statusCountOutputType
     */
    select?: Item_statusCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Item_statusCountOutputType without action
   */
  export type Item_statusCountOutputTypeCountItem_in_listArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: item_in_listWhereInput
  }


  /**
   * Count Type Shopping_listCountOutputType
   */

  export type Shopping_listCountOutputType = {
    item_in_list: number
  }

  export type Shopping_listCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item_in_list?: boolean | Shopping_listCountOutputTypeCountItem_in_listArgs
  }

  // Custom InputTypes
  /**
   * Shopping_listCountOutputType without action
   */
  export type Shopping_listCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shopping_listCountOutputType
     */
    select?: Shopping_listCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Shopping_listCountOutputType without action
   */
  export type Shopping_listCountOutputTypeCountItem_in_listArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: item_in_listWhereInput
  }


  /**
   * Count Type Store_sectionCountOutputType
   */

  export type Store_sectionCountOutputType = {
    item: number
  }

  export type Store_sectionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | Store_sectionCountOutputTypeCountItemArgs
  }

  // Custom InputTypes
  /**
   * Store_sectionCountOutputType without action
   */
  export type Store_sectionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store_sectionCountOutputType
     */
    select?: Store_sectionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Store_sectionCountOutputType without action
   */
  export type Store_sectionCountOutputTypeCountItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: itemWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    item_in_list: number
    item_favorite: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item_in_list?: boolean | UserCountOutputTypeCountItem_in_listArgs
    item_favorite?: boolean | UserCountOutputTypeCountItem_favoriteArgs
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
  export type UserCountOutputTypeCountItem_in_listArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: item_in_listWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountItem_favoriteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: item_favoriteWhereInput
  }


  /**
   * Models
   */

  /**
   * Model location
   */

  export type AggregateLocation = {
    _count: LocationCountAggregateOutputType | null
    _avg: LocationAvgAggregateOutputType | null
    _sum: LocationSumAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  export type LocationAvgAggregateOutputType = {
    location_id: number | null
  }

  export type LocationSumAggregateOutputType = {
    location_id: number | null
  }

  export type LocationMinAggregateOutputType = {
    location_id: number | null
    name: string | null
    address: string | null
  }

  export type LocationMaxAggregateOutputType = {
    location_id: number | null
    name: string | null
    address: string | null
  }

  export type LocationCountAggregateOutputType = {
    location_id: number
    name: number
    address: number
    _all: number
  }


  export type LocationAvgAggregateInputType = {
    location_id?: true
  }

  export type LocationSumAggregateInputType = {
    location_id?: true
  }

  export type LocationMinAggregateInputType = {
    location_id?: true
    name?: true
    address?: true
  }

  export type LocationMaxAggregateInputType = {
    location_id?: true
    name?: true
    address?: true
  }

  export type LocationCountAggregateInputType = {
    location_id?: true
    name?: true
    address?: true
    _all?: true
  }

  export type LocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which location to aggregate.
     */
    where?: locationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of locations to fetch.
     */
    orderBy?: locationOrderByWithRelationInput | locationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: locationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned locations
    **/
    _count?: true | LocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocationMaxAggregateInputType
  }

  export type GetLocationAggregateType<T extends LocationAggregateArgs> = {
        [P in keyof T & keyof AggregateLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocation[P]>
      : GetScalarType<T[P], AggregateLocation[P]>
  }




  export type locationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: locationWhereInput
    orderBy?: locationOrderByWithAggregationInput | locationOrderByWithAggregationInput[]
    by: LocationScalarFieldEnum[] | LocationScalarFieldEnum
    having?: locationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocationCountAggregateInputType | true
    _avg?: LocationAvgAggregateInputType
    _sum?: LocationSumAggregateInputType
    _min?: LocationMinAggregateInputType
    _max?: LocationMaxAggregateInputType
  }

  export type LocationGroupByOutputType = {
    location_id: number
    name: string | null
    address: string | null
    _count: LocationCountAggregateOutputType | null
    _avg: LocationAvgAggregateOutputType | null
    _sum: LocationSumAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  type GetLocationGroupByPayload<T extends locationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocationGroupByOutputType[P]>
            : GetScalarType<T[P], LocationGroupByOutputType[P]>
        }
      >
    >


  export type locationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    location_id?: boolean
    name?: boolean
    address?: boolean
    item?: boolean | location$itemArgs<ExtArgs>
    shopping_list?: boolean | location$shopping_listArgs<ExtArgs>
    store_section?: boolean | location$store_sectionArgs<ExtArgs>
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>



  export type locationSelectScalar = {
    location_id?: boolean
    name?: boolean
    address?: boolean
  }

  export type locationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"location_id" | "name" | "address", ExtArgs["result"]["location"]>
  export type locationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | location$itemArgs<ExtArgs>
    shopping_list?: boolean | location$shopping_listArgs<ExtArgs>
    store_section?: boolean | location$store_sectionArgs<ExtArgs>
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $locationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "location"
    objects: {
      item: Prisma.$itemPayload<ExtArgs>[]
      shopping_list: Prisma.$shopping_listPayload<ExtArgs>[]
      store_section: Prisma.$store_sectionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      location_id: number
      name: string | null
      address: string | null
    }, ExtArgs["result"]["location"]>
    composites: {}
  }

  type locationGetPayload<S extends boolean | null | undefined | locationDefaultArgs> = $Result.GetResult<Prisma.$locationPayload, S>

  type locationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<locationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LocationCountAggregateInputType | true
    }

  export interface locationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['location'], meta: { name: 'location' } }
    /**
     * Find zero or one Location that matches the filter.
     * @param {locationFindUniqueArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends locationFindUniqueArgs>(args: SelectSubset<T, locationFindUniqueArgs<ExtArgs>>): Prisma__locationClient<$Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Location that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {locationFindUniqueOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends locationFindUniqueOrThrowArgs>(args: SelectSubset<T, locationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__locationClient<$Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {locationFindFirstArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends locationFindFirstArgs>(args?: SelectSubset<T, locationFindFirstArgs<ExtArgs>>): Prisma__locationClient<$Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {locationFindFirstOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends locationFindFirstOrThrowArgs>(args?: SelectSubset<T, locationFindFirstOrThrowArgs<ExtArgs>>): Prisma__locationClient<$Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Locations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {locationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Locations
     * const locations = await prisma.location.findMany()
     * 
     * // Get first 10 Locations
     * const locations = await prisma.location.findMany({ take: 10 })
     * 
     * // Only select the `location_id`
     * const locationWithLocation_idOnly = await prisma.location.findMany({ select: { location_id: true } })
     * 
     */
    findMany<T extends locationFindManyArgs>(args?: SelectSubset<T, locationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Location.
     * @param {locationCreateArgs} args - Arguments to create a Location.
     * @example
     * // Create one Location
     * const Location = await prisma.location.create({
     *   data: {
     *     // ... data to create a Location
     *   }
     * })
     * 
     */
    create<T extends locationCreateArgs>(args: SelectSubset<T, locationCreateArgs<ExtArgs>>): Prisma__locationClient<$Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Locations.
     * @param {locationCreateManyArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends locationCreateManyArgs>(args?: SelectSubset<T, locationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Location.
     * @param {locationDeleteArgs} args - Arguments to delete one Location.
     * @example
     * // Delete one Location
     * const Location = await prisma.location.delete({
     *   where: {
     *     // ... filter to delete one Location
     *   }
     * })
     * 
     */
    delete<T extends locationDeleteArgs>(args: SelectSubset<T, locationDeleteArgs<ExtArgs>>): Prisma__locationClient<$Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Location.
     * @param {locationUpdateArgs} args - Arguments to update one Location.
     * @example
     * // Update one Location
     * const location = await prisma.location.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends locationUpdateArgs>(args: SelectSubset<T, locationUpdateArgs<ExtArgs>>): Prisma__locationClient<$Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Locations.
     * @param {locationDeleteManyArgs} args - Arguments to filter Locations to delete.
     * @example
     * // Delete a few Locations
     * const { count } = await prisma.location.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends locationDeleteManyArgs>(args?: SelectSubset<T, locationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {locationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends locationUpdateManyArgs>(args: SelectSubset<T, locationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Location.
     * @param {locationUpsertArgs} args - Arguments to update or create a Location.
     * @example
     * // Update or create a Location
     * const location = await prisma.location.upsert({
     *   create: {
     *     // ... data to create a Location
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Location we want to update
     *   }
     * })
     */
    upsert<T extends locationUpsertArgs>(args: SelectSubset<T, locationUpsertArgs<ExtArgs>>): Prisma__locationClient<$Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {locationCountArgs} args - Arguments to filter Locations to count.
     * @example
     * // Count the number of Locations
     * const count = await prisma.location.count({
     *   where: {
     *     // ... the filter for the Locations we want to count
     *   }
     * })
    **/
    count<T extends locationCountArgs>(
      args?: Subset<T, locationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LocationAggregateArgs>(args: Subset<T, LocationAggregateArgs>): Prisma.PrismaPromise<GetLocationAggregateType<T>>

    /**
     * Group by Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {locationGroupByArgs} args - Group by arguments.
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
      T extends locationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: locationGroupByArgs['orderBy'] }
        : { orderBy?: locationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, locationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the location model
   */
  readonly fields: locationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for location.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__locationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    item<T extends location$itemArgs<ExtArgs> = {}>(args?: Subset<T, location$itemArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$itemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    shopping_list<T extends location$shopping_listArgs<ExtArgs> = {}>(args?: Subset<T, location$shopping_listArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$shopping_listPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    store_section<T extends location$store_sectionArgs<ExtArgs> = {}>(args?: Subset<T, location$store_sectionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$store_sectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the location model
   */
  interface locationFieldRefs {
    readonly location_id: FieldRef<"location", 'Int'>
    readonly name: FieldRef<"location", 'String'>
    readonly address: FieldRef<"location", 'String'>
  }
    

  // Custom InputTypes
  /**
   * location findUnique
   */
  export type locationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the location
     */
    omit?: locationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null
    /**
     * Filter, which location to fetch.
     */
    where: locationWhereUniqueInput
  }

  /**
   * location findUniqueOrThrow
   */
  export type locationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the location
     */
    omit?: locationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null
    /**
     * Filter, which location to fetch.
     */
    where: locationWhereUniqueInput
  }

  /**
   * location findFirst
   */
  export type locationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the location
     */
    omit?: locationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null
    /**
     * Filter, which location to fetch.
     */
    where?: locationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of locations to fetch.
     */
    orderBy?: locationOrderByWithRelationInput | locationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for locations.
     */
    cursor?: locationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * location findFirstOrThrow
   */
  export type locationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the location
     */
    omit?: locationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null
    /**
     * Filter, which location to fetch.
     */
    where?: locationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of locations to fetch.
     */
    orderBy?: locationOrderByWithRelationInput | locationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for locations.
     */
    cursor?: locationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * location findMany
   */
  export type locationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the location
     */
    omit?: locationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null
    /**
     * Filter, which locations to fetch.
     */
    where?: locationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of locations to fetch.
     */
    orderBy?: locationOrderByWithRelationInput | locationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing locations.
     */
    cursor?: locationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` locations.
     */
    skip?: number
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * location create
   */
  export type locationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the location
     */
    omit?: locationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null
    /**
     * The data needed to create a location.
     */
    data?: XOR<locationCreateInput, locationUncheckedCreateInput>
  }

  /**
   * location createMany
   */
  export type locationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many locations.
     */
    data: locationCreateManyInput | locationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * location update
   */
  export type locationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the location
     */
    omit?: locationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null
    /**
     * The data needed to update a location.
     */
    data: XOR<locationUpdateInput, locationUncheckedUpdateInput>
    /**
     * Choose, which location to update.
     */
    where: locationWhereUniqueInput
  }

  /**
   * location updateMany
   */
  export type locationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update locations.
     */
    data: XOR<locationUpdateManyMutationInput, locationUncheckedUpdateManyInput>
    /**
     * Filter which locations to update
     */
    where?: locationWhereInput
    /**
     * Limit how many locations to update.
     */
    limit?: number
  }

  /**
   * location upsert
   */
  export type locationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the location
     */
    omit?: locationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null
    /**
     * The filter to search for the location to update in case it exists.
     */
    where: locationWhereUniqueInput
    /**
     * In case the location found by the `where` argument doesn't exist, create a new location with this data.
     */
    create: XOR<locationCreateInput, locationUncheckedCreateInput>
    /**
     * In case the location was found with the provided `where` argument, update it with this data.
     */
    update: XOR<locationUpdateInput, locationUncheckedUpdateInput>
  }

  /**
   * location delete
   */
  export type locationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the location
     */
    omit?: locationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null
    /**
     * Filter which location to delete.
     */
    where: locationWhereUniqueInput
  }

  /**
   * location deleteMany
   */
  export type locationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which locations to delete
     */
    where?: locationWhereInput
    /**
     * Limit how many locations to delete.
     */
    limit?: number
  }

  /**
   * location.item
   */
  export type location$itemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item
     */
    select?: itemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item
     */
    omit?: itemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itemInclude<ExtArgs> | null
    where?: itemWhereInput
    orderBy?: itemOrderByWithRelationInput | itemOrderByWithRelationInput[]
    cursor?: itemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * location.shopping_list
   */
  export type location$shopping_listArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shopping_list
     */
    select?: shopping_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shopping_list
     */
    omit?: shopping_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: shopping_listInclude<ExtArgs> | null
    where?: shopping_listWhereInput
    orderBy?: shopping_listOrderByWithRelationInput | shopping_listOrderByWithRelationInput[]
    cursor?: shopping_listWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Shopping_listScalarFieldEnum | Shopping_listScalarFieldEnum[]
  }

  /**
   * location.store_section
   */
  export type location$store_sectionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store_section
     */
    select?: store_sectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store_section
     */
    omit?: store_sectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: store_sectionInclude<ExtArgs> | null
    where?: store_sectionWhereInput
    orderBy?: store_sectionOrderByWithRelationInput | store_sectionOrderByWithRelationInput[]
    cursor?: store_sectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Store_sectionScalarFieldEnum | Store_sectionScalarFieldEnum[]
  }

  /**
   * location without action
   */
  export type locationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the location
     */
    omit?: locationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null
  }


  /**
   * Model item
   */

  export type AggregateItem = {
    _count: ItemCountAggregateOutputType | null
    _avg: ItemAvgAggregateOutputType | null
    _sum: ItemSumAggregateOutputType | null
    _min: ItemMinAggregateOutputType | null
    _max: ItemMaxAggregateOutputType | null
  }

  export type ItemAvgAggregateOutputType = {
    item_id: number | null
    section_id: number | null
    location_id: number | null
  }

  export type ItemSumAggregateOutputType = {
    item_id: number | null
    section_id: number | null
    location_id: number | null
  }

  export type ItemMinAggregateOutputType = {
    item_id: number | null
    name: string | null
    image_path: string | null
    section_id: number | null
    location_id: number | null
  }

  export type ItemMaxAggregateOutputType = {
    item_id: number | null
    name: string | null
    image_path: string | null
    section_id: number | null
    location_id: number | null
  }

  export type ItemCountAggregateOutputType = {
    item_id: number
    name: number
    image_path: number
    section_id: number
    location_id: number
    _all: number
  }


  export type ItemAvgAggregateInputType = {
    item_id?: true
    section_id?: true
    location_id?: true
  }

  export type ItemSumAggregateInputType = {
    item_id?: true
    section_id?: true
    location_id?: true
  }

  export type ItemMinAggregateInputType = {
    item_id?: true
    name?: true
    image_path?: true
    section_id?: true
    location_id?: true
  }

  export type ItemMaxAggregateInputType = {
    item_id?: true
    name?: true
    image_path?: true
    section_id?: true
    location_id?: true
  }

  export type ItemCountAggregateInputType = {
    item_id?: true
    name?: true
    image_path?: true
    section_id?: true
    location_id?: true
    _all?: true
  }

  export type ItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which item to aggregate.
     */
    where?: itemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of items to fetch.
     */
    orderBy?: itemOrderByWithRelationInput | itemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: itemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned items
    **/
    _count?: true | ItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemMaxAggregateInputType
  }

  export type GetItemAggregateType<T extends ItemAggregateArgs> = {
        [P in keyof T & keyof AggregateItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItem[P]>
      : GetScalarType<T[P], AggregateItem[P]>
  }




  export type itemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: itemWhereInput
    orderBy?: itemOrderByWithAggregationInput | itemOrderByWithAggregationInput[]
    by: ItemScalarFieldEnum[] | ItemScalarFieldEnum
    having?: itemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemCountAggregateInputType | true
    _avg?: ItemAvgAggregateInputType
    _sum?: ItemSumAggregateInputType
    _min?: ItemMinAggregateInputType
    _max?: ItemMaxAggregateInputType
  }

  export type ItemGroupByOutputType = {
    item_id: number
    name: string | null
    image_path: string | null
    section_id: number | null
    location_id: number | null
    _count: ItemCountAggregateOutputType | null
    _avg: ItemAvgAggregateOutputType | null
    _sum: ItemSumAggregateOutputType | null
    _min: ItemMinAggregateOutputType | null
    _max: ItemMaxAggregateOutputType | null
  }

  type GetItemGroupByPayload<T extends itemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemGroupByOutputType[P]>
            : GetScalarType<T[P], ItemGroupByOutputType[P]>
        }
      >
    >


  export type itemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    item_id?: boolean
    name?: boolean
    image_path?: boolean
    section_id?: boolean
    location_id?: boolean
    location?: boolean | item$locationArgs<ExtArgs>
    store_section?: boolean | item$store_sectionArgs<ExtArgs>
    item_in_list?: boolean | item$item_in_listArgs<ExtArgs>
    item_price_history?: boolean | item$item_price_historyArgs<ExtArgs>
    item_favorite?: boolean | item$item_favoriteArgs<ExtArgs>
    _count?: boolean | ItemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["item"]>



  export type itemSelectScalar = {
    item_id?: boolean
    name?: boolean
    image_path?: boolean
    section_id?: boolean
    location_id?: boolean
  }

  export type itemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"item_id" | "name" | "image_path" | "section_id" | "location_id", ExtArgs["result"]["item"]>
  export type itemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | item$locationArgs<ExtArgs>
    store_section?: boolean | item$store_sectionArgs<ExtArgs>
    item_in_list?: boolean | item$item_in_listArgs<ExtArgs>
    item_price_history?: boolean | item$item_price_historyArgs<ExtArgs>
    item_favorite?: boolean | item$item_favoriteArgs<ExtArgs>
    _count?: boolean | ItemCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $itemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "item"
    objects: {
      location: Prisma.$locationPayload<ExtArgs> | null
      store_section: Prisma.$store_sectionPayload<ExtArgs> | null
      item_in_list: Prisma.$item_in_listPayload<ExtArgs>[]
      item_price_history: Prisma.$item_price_historyPayload<ExtArgs>[]
      item_favorite: Prisma.$item_favoritePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      item_id: number
      name: string | null
      image_path: string | null
      section_id: number | null
      location_id: number | null
    }, ExtArgs["result"]["item"]>
    composites: {}
  }

  type itemGetPayload<S extends boolean | null | undefined | itemDefaultArgs> = $Result.GetResult<Prisma.$itemPayload, S>

  type itemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<itemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItemCountAggregateInputType | true
    }

  export interface itemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['item'], meta: { name: 'item' } }
    /**
     * Find zero or one Item that matches the filter.
     * @param {itemFindUniqueArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends itemFindUniqueArgs>(args: SelectSubset<T, itemFindUniqueArgs<ExtArgs>>): Prisma__itemClient<$Result.GetResult<Prisma.$itemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Item that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {itemFindUniqueOrThrowArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends itemFindUniqueOrThrowArgs>(args: SelectSubset<T, itemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__itemClient<$Result.GetResult<Prisma.$itemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {itemFindFirstArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends itemFindFirstArgs>(args?: SelectSubset<T, itemFindFirstArgs<ExtArgs>>): Prisma__itemClient<$Result.GetResult<Prisma.$itemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {itemFindFirstOrThrowArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends itemFindFirstOrThrowArgs>(args?: SelectSubset<T, itemFindFirstOrThrowArgs<ExtArgs>>): Prisma__itemClient<$Result.GetResult<Prisma.$itemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {itemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Items
     * const items = await prisma.item.findMany()
     * 
     * // Get first 10 Items
     * const items = await prisma.item.findMany({ take: 10 })
     * 
     * // Only select the `item_id`
     * const itemWithItem_idOnly = await prisma.item.findMany({ select: { item_id: true } })
     * 
     */
    findMany<T extends itemFindManyArgs>(args?: SelectSubset<T, itemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$itemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Item.
     * @param {itemCreateArgs} args - Arguments to create a Item.
     * @example
     * // Create one Item
     * const Item = await prisma.item.create({
     *   data: {
     *     // ... data to create a Item
     *   }
     * })
     * 
     */
    create<T extends itemCreateArgs>(args: SelectSubset<T, itemCreateArgs<ExtArgs>>): Prisma__itemClient<$Result.GetResult<Prisma.$itemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Items.
     * @param {itemCreateManyArgs} args - Arguments to create many Items.
     * @example
     * // Create many Items
     * const item = await prisma.item.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends itemCreateManyArgs>(args?: SelectSubset<T, itemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Item.
     * @param {itemDeleteArgs} args - Arguments to delete one Item.
     * @example
     * // Delete one Item
     * const Item = await prisma.item.delete({
     *   where: {
     *     // ... filter to delete one Item
     *   }
     * })
     * 
     */
    delete<T extends itemDeleteArgs>(args: SelectSubset<T, itemDeleteArgs<ExtArgs>>): Prisma__itemClient<$Result.GetResult<Prisma.$itemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Item.
     * @param {itemUpdateArgs} args - Arguments to update one Item.
     * @example
     * // Update one Item
     * const item = await prisma.item.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends itemUpdateArgs>(args: SelectSubset<T, itemUpdateArgs<ExtArgs>>): Prisma__itemClient<$Result.GetResult<Prisma.$itemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Items.
     * @param {itemDeleteManyArgs} args - Arguments to filter Items to delete.
     * @example
     * // Delete a few Items
     * const { count } = await prisma.item.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends itemDeleteManyArgs>(args?: SelectSubset<T, itemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {itemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Items
     * const item = await prisma.item.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends itemUpdateManyArgs>(args: SelectSubset<T, itemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Item.
     * @param {itemUpsertArgs} args - Arguments to update or create a Item.
     * @example
     * // Update or create a Item
     * const item = await prisma.item.upsert({
     *   create: {
     *     // ... data to create a Item
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Item we want to update
     *   }
     * })
     */
    upsert<T extends itemUpsertArgs>(args: SelectSubset<T, itemUpsertArgs<ExtArgs>>): Prisma__itemClient<$Result.GetResult<Prisma.$itemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {itemCountArgs} args - Arguments to filter Items to count.
     * @example
     * // Count the number of Items
     * const count = await prisma.item.count({
     *   where: {
     *     // ... the filter for the Items we want to count
     *   }
     * })
    **/
    count<T extends itemCountArgs>(
      args?: Subset<T, itemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Item.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ItemAggregateArgs>(args: Subset<T, ItemAggregateArgs>): Prisma.PrismaPromise<GetItemAggregateType<T>>

    /**
     * Group by Item.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {itemGroupByArgs} args - Group by arguments.
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
      T extends itemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: itemGroupByArgs['orderBy'] }
        : { orderBy?: itemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, itemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the item model
   */
  readonly fields: itemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for item.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__itemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    location<T extends item$locationArgs<ExtArgs> = {}>(args?: Subset<T, item$locationArgs<ExtArgs>>): Prisma__locationClient<$Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    store_section<T extends item$store_sectionArgs<ExtArgs> = {}>(args?: Subset<T, item$store_sectionArgs<ExtArgs>>): Prisma__store_sectionClient<$Result.GetResult<Prisma.$store_sectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    item_in_list<T extends item$item_in_listArgs<ExtArgs> = {}>(args?: Subset<T, item$item_in_listArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$item_in_listPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    item_price_history<T extends item$item_price_historyArgs<ExtArgs> = {}>(args?: Subset<T, item$item_price_historyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$item_price_historyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    item_favorite<T extends item$item_favoriteArgs<ExtArgs> = {}>(args?: Subset<T, item$item_favoriteArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$item_favoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the item model
   */
  interface itemFieldRefs {
    readonly item_id: FieldRef<"item", 'Int'>
    readonly name: FieldRef<"item", 'String'>
    readonly image_path: FieldRef<"item", 'String'>
    readonly section_id: FieldRef<"item", 'Int'>
    readonly location_id: FieldRef<"item", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * item findUnique
   */
  export type itemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item
     */
    select?: itemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item
     */
    omit?: itemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itemInclude<ExtArgs> | null
    /**
     * Filter, which item to fetch.
     */
    where: itemWhereUniqueInput
  }

  /**
   * item findUniqueOrThrow
   */
  export type itemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item
     */
    select?: itemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item
     */
    omit?: itemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itemInclude<ExtArgs> | null
    /**
     * Filter, which item to fetch.
     */
    where: itemWhereUniqueInput
  }

  /**
   * item findFirst
   */
  export type itemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item
     */
    select?: itemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item
     */
    omit?: itemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itemInclude<ExtArgs> | null
    /**
     * Filter, which item to fetch.
     */
    where?: itemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of items to fetch.
     */
    orderBy?: itemOrderByWithRelationInput | itemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for items.
     */
    cursor?: itemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of items.
     */
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * item findFirstOrThrow
   */
  export type itemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item
     */
    select?: itemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item
     */
    omit?: itemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itemInclude<ExtArgs> | null
    /**
     * Filter, which item to fetch.
     */
    where?: itemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of items to fetch.
     */
    orderBy?: itemOrderByWithRelationInput | itemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for items.
     */
    cursor?: itemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of items.
     */
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * item findMany
   */
  export type itemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item
     */
    select?: itemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item
     */
    omit?: itemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itemInclude<ExtArgs> | null
    /**
     * Filter, which items to fetch.
     */
    where?: itemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of items to fetch.
     */
    orderBy?: itemOrderByWithRelationInput | itemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing items.
     */
    cursor?: itemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` items.
     */
    skip?: number
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * item create
   */
  export type itemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item
     */
    select?: itemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item
     */
    omit?: itemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itemInclude<ExtArgs> | null
    /**
     * The data needed to create a item.
     */
    data?: XOR<itemCreateInput, itemUncheckedCreateInput>
  }

  /**
   * item createMany
   */
  export type itemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many items.
     */
    data: itemCreateManyInput | itemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * item update
   */
  export type itemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item
     */
    select?: itemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item
     */
    omit?: itemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itemInclude<ExtArgs> | null
    /**
     * The data needed to update a item.
     */
    data: XOR<itemUpdateInput, itemUncheckedUpdateInput>
    /**
     * Choose, which item to update.
     */
    where: itemWhereUniqueInput
  }

  /**
   * item updateMany
   */
  export type itemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update items.
     */
    data: XOR<itemUpdateManyMutationInput, itemUncheckedUpdateManyInput>
    /**
     * Filter which items to update
     */
    where?: itemWhereInput
    /**
     * Limit how many items to update.
     */
    limit?: number
  }

  /**
   * item upsert
   */
  export type itemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item
     */
    select?: itemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item
     */
    omit?: itemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itemInclude<ExtArgs> | null
    /**
     * The filter to search for the item to update in case it exists.
     */
    where: itemWhereUniqueInput
    /**
     * In case the item found by the `where` argument doesn't exist, create a new item with this data.
     */
    create: XOR<itemCreateInput, itemUncheckedCreateInput>
    /**
     * In case the item was found with the provided `where` argument, update it with this data.
     */
    update: XOR<itemUpdateInput, itemUncheckedUpdateInput>
  }

  /**
   * item delete
   */
  export type itemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item
     */
    select?: itemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item
     */
    omit?: itemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itemInclude<ExtArgs> | null
    /**
     * Filter which item to delete.
     */
    where: itemWhereUniqueInput
  }

  /**
   * item deleteMany
   */
  export type itemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which items to delete
     */
    where?: itemWhereInput
    /**
     * Limit how many items to delete.
     */
    limit?: number
  }

  /**
   * item.location
   */
  export type item$locationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the location
     */
    omit?: locationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null
    where?: locationWhereInput
  }

  /**
   * item.store_section
   */
  export type item$store_sectionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store_section
     */
    select?: store_sectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store_section
     */
    omit?: store_sectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: store_sectionInclude<ExtArgs> | null
    where?: store_sectionWhereInput
  }

  /**
   * item.item_in_list
   */
  export type item$item_in_listArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_in_list
     */
    select?: item_in_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_in_list
     */
    omit?: item_in_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_in_listInclude<ExtArgs> | null
    where?: item_in_listWhereInput
    orderBy?: item_in_listOrderByWithRelationInput | item_in_listOrderByWithRelationInput[]
    cursor?: item_in_listWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Item_in_listScalarFieldEnum | Item_in_listScalarFieldEnum[]
  }

  /**
   * item.item_price_history
   */
  export type item$item_price_historyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_price_history
     */
    select?: item_price_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_price_history
     */
    omit?: item_price_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_price_historyInclude<ExtArgs> | null
    where?: item_price_historyWhereInput
    orderBy?: item_price_historyOrderByWithRelationInput | item_price_historyOrderByWithRelationInput[]
    cursor?: item_price_historyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Item_price_historyScalarFieldEnum | Item_price_historyScalarFieldEnum[]
  }

  /**
   * item.item_favorite
   */
  export type item$item_favoriteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_favorite
     */
    select?: item_favoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_favorite
     */
    omit?: item_favoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_favoriteInclude<ExtArgs> | null
    where?: item_favoriteWhereInput
    orderBy?: item_favoriteOrderByWithRelationInput | item_favoriteOrderByWithRelationInput[]
    cursor?: item_favoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Item_favoriteScalarFieldEnum | Item_favoriteScalarFieldEnum[]
  }

  /**
   * item without action
   */
  export type itemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item
     */
    select?: itemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item
     */
    omit?: itemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itemInclude<ExtArgs> | null
  }


  /**
   * Model item_in_list
   */

  export type AggregateItem_in_list = {
    _count: Item_in_listCountAggregateOutputType | null
    _avg: Item_in_listAvgAggregateOutputType | null
    _sum: Item_in_listSumAggregateOutputType | null
    _min: Item_in_listMinAggregateOutputType | null
    _max: Item_in_listMaxAggregateOutputType | null
  }

  export type Item_in_listAvgAggregateOutputType = {
    item_in_list_id: number | null
    item_id: number | null
    shopping_list_id: number | null
    buyer_id: number | null
    quantity: number | null
    discount_price: number | null
    status_id: number | null
  }

  export type Item_in_listSumAggregateOutputType = {
    item_in_list_id: number | null
    item_id: number | null
    shopping_list_id: number | null
    buyer_id: number | null
    quantity: number | null
    discount_price: number | null
    status_id: number | null
  }

  export type Item_in_listMinAggregateOutputType = {
    item_in_list_id: number | null
    item_id: number | null
    shopping_list_id: number | null
    buyer_id: number | null
    quantity: number | null
    discount_price: number | null
    status_id: number | null
  }

  export type Item_in_listMaxAggregateOutputType = {
    item_in_list_id: number | null
    item_id: number | null
    shopping_list_id: number | null
    buyer_id: number | null
    quantity: number | null
    discount_price: number | null
    status_id: number | null
  }

  export type Item_in_listCountAggregateOutputType = {
    item_in_list_id: number
    item_id: number
    shopping_list_id: number
    buyer_id: number
    quantity: number
    discount_price: number
    status_id: number
    _all: number
  }


  export type Item_in_listAvgAggregateInputType = {
    item_in_list_id?: true
    item_id?: true
    shopping_list_id?: true
    buyer_id?: true
    quantity?: true
    discount_price?: true
    status_id?: true
  }

  export type Item_in_listSumAggregateInputType = {
    item_in_list_id?: true
    item_id?: true
    shopping_list_id?: true
    buyer_id?: true
    quantity?: true
    discount_price?: true
    status_id?: true
  }

  export type Item_in_listMinAggregateInputType = {
    item_in_list_id?: true
    item_id?: true
    shopping_list_id?: true
    buyer_id?: true
    quantity?: true
    discount_price?: true
    status_id?: true
  }

  export type Item_in_listMaxAggregateInputType = {
    item_in_list_id?: true
    item_id?: true
    shopping_list_id?: true
    buyer_id?: true
    quantity?: true
    discount_price?: true
    status_id?: true
  }

  export type Item_in_listCountAggregateInputType = {
    item_in_list_id?: true
    item_id?: true
    shopping_list_id?: true
    buyer_id?: true
    quantity?: true
    discount_price?: true
    status_id?: true
    _all?: true
  }

  export type Item_in_listAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which item_in_list to aggregate.
     */
    where?: item_in_listWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of item_in_lists to fetch.
     */
    orderBy?: item_in_listOrderByWithRelationInput | item_in_listOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: item_in_listWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` item_in_lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` item_in_lists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned item_in_lists
    **/
    _count?: true | Item_in_listCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Item_in_listAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Item_in_listSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Item_in_listMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Item_in_listMaxAggregateInputType
  }

  export type GetItem_in_listAggregateType<T extends Item_in_listAggregateArgs> = {
        [P in keyof T & keyof AggregateItem_in_list]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItem_in_list[P]>
      : GetScalarType<T[P], AggregateItem_in_list[P]>
  }




  export type item_in_listGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: item_in_listWhereInput
    orderBy?: item_in_listOrderByWithAggregationInput | item_in_listOrderByWithAggregationInput[]
    by: Item_in_listScalarFieldEnum[] | Item_in_listScalarFieldEnum
    having?: item_in_listScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Item_in_listCountAggregateInputType | true
    _avg?: Item_in_listAvgAggregateInputType
    _sum?: Item_in_listSumAggregateInputType
    _min?: Item_in_listMinAggregateInputType
    _max?: Item_in_listMaxAggregateInputType
  }

  export type Item_in_listGroupByOutputType = {
    item_in_list_id: number
    item_id: number | null
    shopping_list_id: number | null
    buyer_id: number | null
    quantity: number | null
    discount_price: number | null
    status_id: number | null
    _count: Item_in_listCountAggregateOutputType | null
    _avg: Item_in_listAvgAggregateOutputType | null
    _sum: Item_in_listSumAggregateOutputType | null
    _min: Item_in_listMinAggregateOutputType | null
    _max: Item_in_listMaxAggregateOutputType | null
  }

  type GetItem_in_listGroupByPayload<T extends item_in_listGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Item_in_listGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Item_in_listGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Item_in_listGroupByOutputType[P]>
            : GetScalarType<T[P], Item_in_listGroupByOutputType[P]>
        }
      >
    >


  export type item_in_listSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    item_in_list_id?: boolean
    item_id?: boolean
    shopping_list_id?: boolean
    buyer_id?: boolean
    quantity?: boolean
    discount_price?: boolean
    status_id?: boolean
    user?: boolean | item_in_list$userArgs<ExtArgs>
    item?: boolean | item_in_list$itemArgs<ExtArgs>
    shopping_list?: boolean | item_in_list$shopping_listArgs<ExtArgs>
    item_status?: boolean | item_in_list$item_statusArgs<ExtArgs>
  }, ExtArgs["result"]["item_in_list"]>



  export type item_in_listSelectScalar = {
    item_in_list_id?: boolean
    item_id?: boolean
    shopping_list_id?: boolean
    buyer_id?: boolean
    quantity?: boolean
    discount_price?: boolean
    status_id?: boolean
  }

  export type item_in_listOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"item_in_list_id" | "item_id" | "shopping_list_id" | "buyer_id" | "quantity" | "discount_price" | "status_id", ExtArgs["result"]["item_in_list"]>
  export type item_in_listInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | item_in_list$userArgs<ExtArgs>
    item?: boolean | item_in_list$itemArgs<ExtArgs>
    shopping_list?: boolean | item_in_list$shopping_listArgs<ExtArgs>
    item_status?: boolean | item_in_list$item_statusArgs<ExtArgs>
  }

  export type $item_in_listPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "item_in_list"
    objects: {
      user: Prisma.$userPayload<ExtArgs> | null
      item: Prisma.$itemPayload<ExtArgs> | null
      shopping_list: Prisma.$shopping_listPayload<ExtArgs> | null
      item_status: Prisma.$item_statusPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      item_in_list_id: number
      item_id: number | null
      shopping_list_id: number | null
      buyer_id: number | null
      quantity: number | null
      discount_price: number | null
      status_id: number | null
    }, ExtArgs["result"]["item_in_list"]>
    composites: {}
  }

  type item_in_listGetPayload<S extends boolean | null | undefined | item_in_listDefaultArgs> = $Result.GetResult<Prisma.$item_in_listPayload, S>

  type item_in_listCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<item_in_listFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Item_in_listCountAggregateInputType | true
    }

  export interface item_in_listDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['item_in_list'], meta: { name: 'item_in_list' } }
    /**
     * Find zero or one Item_in_list that matches the filter.
     * @param {item_in_listFindUniqueArgs} args - Arguments to find a Item_in_list
     * @example
     * // Get one Item_in_list
     * const item_in_list = await prisma.item_in_list.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends item_in_listFindUniqueArgs>(args: SelectSubset<T, item_in_listFindUniqueArgs<ExtArgs>>): Prisma__item_in_listClient<$Result.GetResult<Prisma.$item_in_listPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Item_in_list that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {item_in_listFindUniqueOrThrowArgs} args - Arguments to find a Item_in_list
     * @example
     * // Get one Item_in_list
     * const item_in_list = await prisma.item_in_list.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends item_in_listFindUniqueOrThrowArgs>(args: SelectSubset<T, item_in_listFindUniqueOrThrowArgs<ExtArgs>>): Prisma__item_in_listClient<$Result.GetResult<Prisma.$item_in_listPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item_in_list that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_in_listFindFirstArgs} args - Arguments to find a Item_in_list
     * @example
     * // Get one Item_in_list
     * const item_in_list = await prisma.item_in_list.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends item_in_listFindFirstArgs>(args?: SelectSubset<T, item_in_listFindFirstArgs<ExtArgs>>): Prisma__item_in_listClient<$Result.GetResult<Prisma.$item_in_listPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item_in_list that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_in_listFindFirstOrThrowArgs} args - Arguments to find a Item_in_list
     * @example
     * // Get one Item_in_list
     * const item_in_list = await prisma.item_in_list.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends item_in_listFindFirstOrThrowArgs>(args?: SelectSubset<T, item_in_listFindFirstOrThrowArgs<ExtArgs>>): Prisma__item_in_listClient<$Result.GetResult<Prisma.$item_in_listPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Item_in_lists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_in_listFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Item_in_lists
     * const item_in_lists = await prisma.item_in_list.findMany()
     * 
     * // Get first 10 Item_in_lists
     * const item_in_lists = await prisma.item_in_list.findMany({ take: 10 })
     * 
     * // Only select the `item_in_list_id`
     * const item_in_listWithItem_in_list_idOnly = await prisma.item_in_list.findMany({ select: { item_in_list_id: true } })
     * 
     */
    findMany<T extends item_in_listFindManyArgs>(args?: SelectSubset<T, item_in_listFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$item_in_listPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Item_in_list.
     * @param {item_in_listCreateArgs} args - Arguments to create a Item_in_list.
     * @example
     * // Create one Item_in_list
     * const Item_in_list = await prisma.item_in_list.create({
     *   data: {
     *     // ... data to create a Item_in_list
     *   }
     * })
     * 
     */
    create<T extends item_in_listCreateArgs>(args: SelectSubset<T, item_in_listCreateArgs<ExtArgs>>): Prisma__item_in_listClient<$Result.GetResult<Prisma.$item_in_listPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Item_in_lists.
     * @param {item_in_listCreateManyArgs} args - Arguments to create many Item_in_lists.
     * @example
     * // Create many Item_in_lists
     * const item_in_list = await prisma.item_in_list.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends item_in_listCreateManyArgs>(args?: SelectSubset<T, item_in_listCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Item_in_list.
     * @param {item_in_listDeleteArgs} args - Arguments to delete one Item_in_list.
     * @example
     * // Delete one Item_in_list
     * const Item_in_list = await prisma.item_in_list.delete({
     *   where: {
     *     // ... filter to delete one Item_in_list
     *   }
     * })
     * 
     */
    delete<T extends item_in_listDeleteArgs>(args: SelectSubset<T, item_in_listDeleteArgs<ExtArgs>>): Prisma__item_in_listClient<$Result.GetResult<Prisma.$item_in_listPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Item_in_list.
     * @param {item_in_listUpdateArgs} args - Arguments to update one Item_in_list.
     * @example
     * // Update one Item_in_list
     * const item_in_list = await prisma.item_in_list.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends item_in_listUpdateArgs>(args: SelectSubset<T, item_in_listUpdateArgs<ExtArgs>>): Prisma__item_in_listClient<$Result.GetResult<Prisma.$item_in_listPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Item_in_lists.
     * @param {item_in_listDeleteManyArgs} args - Arguments to filter Item_in_lists to delete.
     * @example
     * // Delete a few Item_in_lists
     * const { count } = await prisma.item_in_list.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends item_in_listDeleteManyArgs>(args?: SelectSubset<T, item_in_listDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Item_in_lists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_in_listUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Item_in_lists
     * const item_in_list = await prisma.item_in_list.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends item_in_listUpdateManyArgs>(args: SelectSubset<T, item_in_listUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Item_in_list.
     * @param {item_in_listUpsertArgs} args - Arguments to update or create a Item_in_list.
     * @example
     * // Update or create a Item_in_list
     * const item_in_list = await prisma.item_in_list.upsert({
     *   create: {
     *     // ... data to create a Item_in_list
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Item_in_list we want to update
     *   }
     * })
     */
    upsert<T extends item_in_listUpsertArgs>(args: SelectSubset<T, item_in_listUpsertArgs<ExtArgs>>): Prisma__item_in_listClient<$Result.GetResult<Prisma.$item_in_listPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Item_in_lists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_in_listCountArgs} args - Arguments to filter Item_in_lists to count.
     * @example
     * // Count the number of Item_in_lists
     * const count = await prisma.item_in_list.count({
     *   where: {
     *     // ... the filter for the Item_in_lists we want to count
     *   }
     * })
    **/
    count<T extends item_in_listCountArgs>(
      args?: Subset<T, item_in_listCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Item_in_listCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Item_in_list.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Item_in_listAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Item_in_listAggregateArgs>(args: Subset<T, Item_in_listAggregateArgs>): Prisma.PrismaPromise<GetItem_in_listAggregateType<T>>

    /**
     * Group by Item_in_list.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_in_listGroupByArgs} args - Group by arguments.
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
      T extends item_in_listGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: item_in_listGroupByArgs['orderBy'] }
        : { orderBy?: item_in_listGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, item_in_listGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItem_in_listGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the item_in_list model
   */
  readonly fields: item_in_listFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for item_in_list.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__item_in_listClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends item_in_list$userArgs<ExtArgs> = {}>(args?: Subset<T, item_in_list$userArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    item<T extends item_in_list$itemArgs<ExtArgs> = {}>(args?: Subset<T, item_in_list$itemArgs<ExtArgs>>): Prisma__itemClient<$Result.GetResult<Prisma.$itemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    shopping_list<T extends item_in_list$shopping_listArgs<ExtArgs> = {}>(args?: Subset<T, item_in_list$shopping_listArgs<ExtArgs>>): Prisma__shopping_listClient<$Result.GetResult<Prisma.$shopping_listPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    item_status<T extends item_in_list$item_statusArgs<ExtArgs> = {}>(args?: Subset<T, item_in_list$item_statusArgs<ExtArgs>>): Prisma__item_statusClient<$Result.GetResult<Prisma.$item_statusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the item_in_list model
   */
  interface item_in_listFieldRefs {
    readonly item_in_list_id: FieldRef<"item_in_list", 'Int'>
    readonly item_id: FieldRef<"item_in_list", 'Int'>
    readonly shopping_list_id: FieldRef<"item_in_list", 'Int'>
    readonly buyer_id: FieldRef<"item_in_list", 'Int'>
    readonly quantity: FieldRef<"item_in_list", 'Int'>
    readonly discount_price: FieldRef<"item_in_list", 'Int'>
    readonly status_id: FieldRef<"item_in_list", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * item_in_list findUnique
   */
  export type item_in_listFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_in_list
     */
    select?: item_in_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_in_list
     */
    omit?: item_in_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_in_listInclude<ExtArgs> | null
    /**
     * Filter, which item_in_list to fetch.
     */
    where: item_in_listWhereUniqueInput
  }

  /**
   * item_in_list findUniqueOrThrow
   */
  export type item_in_listFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_in_list
     */
    select?: item_in_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_in_list
     */
    omit?: item_in_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_in_listInclude<ExtArgs> | null
    /**
     * Filter, which item_in_list to fetch.
     */
    where: item_in_listWhereUniqueInput
  }

  /**
   * item_in_list findFirst
   */
  export type item_in_listFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_in_list
     */
    select?: item_in_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_in_list
     */
    omit?: item_in_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_in_listInclude<ExtArgs> | null
    /**
     * Filter, which item_in_list to fetch.
     */
    where?: item_in_listWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of item_in_lists to fetch.
     */
    orderBy?: item_in_listOrderByWithRelationInput | item_in_listOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for item_in_lists.
     */
    cursor?: item_in_listWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` item_in_lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` item_in_lists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of item_in_lists.
     */
    distinct?: Item_in_listScalarFieldEnum | Item_in_listScalarFieldEnum[]
  }

  /**
   * item_in_list findFirstOrThrow
   */
  export type item_in_listFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_in_list
     */
    select?: item_in_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_in_list
     */
    omit?: item_in_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_in_listInclude<ExtArgs> | null
    /**
     * Filter, which item_in_list to fetch.
     */
    where?: item_in_listWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of item_in_lists to fetch.
     */
    orderBy?: item_in_listOrderByWithRelationInput | item_in_listOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for item_in_lists.
     */
    cursor?: item_in_listWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` item_in_lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` item_in_lists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of item_in_lists.
     */
    distinct?: Item_in_listScalarFieldEnum | Item_in_listScalarFieldEnum[]
  }

  /**
   * item_in_list findMany
   */
  export type item_in_listFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_in_list
     */
    select?: item_in_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_in_list
     */
    omit?: item_in_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_in_listInclude<ExtArgs> | null
    /**
     * Filter, which item_in_lists to fetch.
     */
    where?: item_in_listWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of item_in_lists to fetch.
     */
    orderBy?: item_in_listOrderByWithRelationInput | item_in_listOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing item_in_lists.
     */
    cursor?: item_in_listWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` item_in_lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` item_in_lists.
     */
    skip?: number
    distinct?: Item_in_listScalarFieldEnum | Item_in_listScalarFieldEnum[]
  }

  /**
   * item_in_list create
   */
  export type item_in_listCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_in_list
     */
    select?: item_in_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_in_list
     */
    omit?: item_in_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_in_listInclude<ExtArgs> | null
    /**
     * The data needed to create a item_in_list.
     */
    data?: XOR<item_in_listCreateInput, item_in_listUncheckedCreateInput>
  }

  /**
   * item_in_list createMany
   */
  export type item_in_listCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many item_in_lists.
     */
    data: item_in_listCreateManyInput | item_in_listCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * item_in_list update
   */
  export type item_in_listUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_in_list
     */
    select?: item_in_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_in_list
     */
    omit?: item_in_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_in_listInclude<ExtArgs> | null
    /**
     * The data needed to update a item_in_list.
     */
    data: XOR<item_in_listUpdateInput, item_in_listUncheckedUpdateInput>
    /**
     * Choose, which item_in_list to update.
     */
    where: item_in_listWhereUniqueInput
  }

  /**
   * item_in_list updateMany
   */
  export type item_in_listUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update item_in_lists.
     */
    data: XOR<item_in_listUpdateManyMutationInput, item_in_listUncheckedUpdateManyInput>
    /**
     * Filter which item_in_lists to update
     */
    where?: item_in_listWhereInput
    /**
     * Limit how many item_in_lists to update.
     */
    limit?: number
  }

  /**
   * item_in_list upsert
   */
  export type item_in_listUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_in_list
     */
    select?: item_in_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_in_list
     */
    omit?: item_in_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_in_listInclude<ExtArgs> | null
    /**
     * The filter to search for the item_in_list to update in case it exists.
     */
    where: item_in_listWhereUniqueInput
    /**
     * In case the item_in_list found by the `where` argument doesn't exist, create a new item_in_list with this data.
     */
    create: XOR<item_in_listCreateInput, item_in_listUncheckedCreateInput>
    /**
     * In case the item_in_list was found with the provided `where` argument, update it with this data.
     */
    update: XOR<item_in_listUpdateInput, item_in_listUncheckedUpdateInput>
  }

  /**
   * item_in_list delete
   */
  export type item_in_listDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_in_list
     */
    select?: item_in_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_in_list
     */
    omit?: item_in_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_in_listInclude<ExtArgs> | null
    /**
     * Filter which item_in_list to delete.
     */
    where: item_in_listWhereUniqueInput
  }

  /**
   * item_in_list deleteMany
   */
  export type item_in_listDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which item_in_lists to delete
     */
    where?: item_in_listWhereInput
    /**
     * Limit how many item_in_lists to delete.
     */
    limit?: number
  }

  /**
   * item_in_list.user
   */
  export type item_in_list$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    where?: userWhereInput
  }

  /**
   * item_in_list.item
   */
  export type item_in_list$itemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item
     */
    select?: itemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item
     */
    omit?: itemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itemInclude<ExtArgs> | null
    where?: itemWhereInput
  }

  /**
   * item_in_list.shopping_list
   */
  export type item_in_list$shopping_listArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shopping_list
     */
    select?: shopping_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shopping_list
     */
    omit?: shopping_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: shopping_listInclude<ExtArgs> | null
    where?: shopping_listWhereInput
  }

  /**
   * item_in_list.item_status
   */
  export type item_in_list$item_statusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_status
     */
    select?: item_statusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_status
     */
    omit?: item_statusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_statusInclude<ExtArgs> | null
    where?: item_statusWhereInput
  }

  /**
   * item_in_list without action
   */
  export type item_in_listDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_in_list
     */
    select?: item_in_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_in_list
     */
    omit?: item_in_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_in_listInclude<ExtArgs> | null
  }


  /**
   * Model item_price_history
   */

  export type AggregateItem_price_history = {
    _count: Item_price_historyCountAggregateOutputType | null
    _avg: Item_price_historyAvgAggregateOutputType | null
    _sum: Item_price_historySumAggregateOutputType | null
    _min: Item_price_historyMinAggregateOutputType | null
    _max: Item_price_historyMaxAggregateOutputType | null
  }

  export type Item_price_historyAvgAggregateOutputType = {
    item_price_history_id: number | null
    item_id: number | null
    price: number | null
  }

  export type Item_price_historySumAggregateOutputType = {
    item_price_history_id: number | null
    item_id: number | null
    price: number | null
  }

  export type Item_price_historyMinAggregateOutputType = {
    item_price_history_id: number | null
    item_id: number | null
    price: number | null
    effective_date: Date | null
  }

  export type Item_price_historyMaxAggregateOutputType = {
    item_price_history_id: number | null
    item_id: number | null
    price: number | null
    effective_date: Date | null
  }

  export type Item_price_historyCountAggregateOutputType = {
    item_price_history_id: number
    item_id: number
    price: number
    effective_date: number
    _all: number
  }


  export type Item_price_historyAvgAggregateInputType = {
    item_price_history_id?: true
    item_id?: true
    price?: true
  }

  export type Item_price_historySumAggregateInputType = {
    item_price_history_id?: true
    item_id?: true
    price?: true
  }

  export type Item_price_historyMinAggregateInputType = {
    item_price_history_id?: true
    item_id?: true
    price?: true
    effective_date?: true
  }

  export type Item_price_historyMaxAggregateInputType = {
    item_price_history_id?: true
    item_id?: true
    price?: true
    effective_date?: true
  }

  export type Item_price_historyCountAggregateInputType = {
    item_price_history_id?: true
    item_id?: true
    price?: true
    effective_date?: true
    _all?: true
  }

  export type Item_price_historyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which item_price_history to aggregate.
     */
    where?: item_price_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of item_price_histories to fetch.
     */
    orderBy?: item_price_historyOrderByWithRelationInput | item_price_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: item_price_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` item_price_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` item_price_histories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned item_price_histories
    **/
    _count?: true | Item_price_historyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Item_price_historyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Item_price_historySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Item_price_historyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Item_price_historyMaxAggregateInputType
  }

  export type GetItem_price_historyAggregateType<T extends Item_price_historyAggregateArgs> = {
        [P in keyof T & keyof AggregateItem_price_history]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItem_price_history[P]>
      : GetScalarType<T[P], AggregateItem_price_history[P]>
  }




  export type item_price_historyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: item_price_historyWhereInput
    orderBy?: item_price_historyOrderByWithAggregationInput | item_price_historyOrderByWithAggregationInput[]
    by: Item_price_historyScalarFieldEnum[] | Item_price_historyScalarFieldEnum
    having?: item_price_historyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Item_price_historyCountAggregateInputType | true
    _avg?: Item_price_historyAvgAggregateInputType
    _sum?: Item_price_historySumAggregateInputType
    _min?: Item_price_historyMinAggregateInputType
    _max?: Item_price_historyMaxAggregateInputType
  }

  export type Item_price_historyGroupByOutputType = {
    item_price_history_id: number
    item_id: number | null
    price: number | null
    effective_date: Date | null
    _count: Item_price_historyCountAggregateOutputType | null
    _avg: Item_price_historyAvgAggregateOutputType | null
    _sum: Item_price_historySumAggregateOutputType | null
    _min: Item_price_historyMinAggregateOutputType | null
    _max: Item_price_historyMaxAggregateOutputType | null
  }

  type GetItem_price_historyGroupByPayload<T extends item_price_historyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Item_price_historyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Item_price_historyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Item_price_historyGroupByOutputType[P]>
            : GetScalarType<T[P], Item_price_historyGroupByOutputType[P]>
        }
      >
    >


  export type item_price_historySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    item_price_history_id?: boolean
    item_id?: boolean
    price?: boolean
    effective_date?: boolean
    item?: boolean | item_price_history$itemArgs<ExtArgs>
  }, ExtArgs["result"]["item_price_history"]>



  export type item_price_historySelectScalar = {
    item_price_history_id?: boolean
    item_id?: boolean
    price?: boolean
    effective_date?: boolean
  }

  export type item_price_historyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"item_price_history_id" | "item_id" | "price" | "effective_date", ExtArgs["result"]["item_price_history"]>
  export type item_price_historyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | item_price_history$itemArgs<ExtArgs>
  }

  export type $item_price_historyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "item_price_history"
    objects: {
      item: Prisma.$itemPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      item_price_history_id: number
      item_id: number | null
      price: number | null
      effective_date: Date | null
    }, ExtArgs["result"]["item_price_history"]>
    composites: {}
  }

  type item_price_historyGetPayload<S extends boolean | null | undefined | item_price_historyDefaultArgs> = $Result.GetResult<Prisma.$item_price_historyPayload, S>

  type item_price_historyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<item_price_historyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Item_price_historyCountAggregateInputType | true
    }

  export interface item_price_historyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['item_price_history'], meta: { name: 'item_price_history' } }
    /**
     * Find zero or one Item_price_history that matches the filter.
     * @param {item_price_historyFindUniqueArgs} args - Arguments to find a Item_price_history
     * @example
     * // Get one Item_price_history
     * const item_price_history = await prisma.item_price_history.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends item_price_historyFindUniqueArgs>(args: SelectSubset<T, item_price_historyFindUniqueArgs<ExtArgs>>): Prisma__item_price_historyClient<$Result.GetResult<Prisma.$item_price_historyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Item_price_history that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {item_price_historyFindUniqueOrThrowArgs} args - Arguments to find a Item_price_history
     * @example
     * // Get one Item_price_history
     * const item_price_history = await prisma.item_price_history.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends item_price_historyFindUniqueOrThrowArgs>(args: SelectSubset<T, item_price_historyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__item_price_historyClient<$Result.GetResult<Prisma.$item_price_historyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item_price_history that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_price_historyFindFirstArgs} args - Arguments to find a Item_price_history
     * @example
     * // Get one Item_price_history
     * const item_price_history = await prisma.item_price_history.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends item_price_historyFindFirstArgs>(args?: SelectSubset<T, item_price_historyFindFirstArgs<ExtArgs>>): Prisma__item_price_historyClient<$Result.GetResult<Prisma.$item_price_historyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item_price_history that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_price_historyFindFirstOrThrowArgs} args - Arguments to find a Item_price_history
     * @example
     * // Get one Item_price_history
     * const item_price_history = await prisma.item_price_history.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends item_price_historyFindFirstOrThrowArgs>(args?: SelectSubset<T, item_price_historyFindFirstOrThrowArgs<ExtArgs>>): Prisma__item_price_historyClient<$Result.GetResult<Prisma.$item_price_historyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Item_price_histories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_price_historyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Item_price_histories
     * const item_price_histories = await prisma.item_price_history.findMany()
     * 
     * // Get first 10 Item_price_histories
     * const item_price_histories = await prisma.item_price_history.findMany({ take: 10 })
     * 
     * // Only select the `item_price_history_id`
     * const item_price_historyWithItem_price_history_idOnly = await prisma.item_price_history.findMany({ select: { item_price_history_id: true } })
     * 
     */
    findMany<T extends item_price_historyFindManyArgs>(args?: SelectSubset<T, item_price_historyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$item_price_historyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Item_price_history.
     * @param {item_price_historyCreateArgs} args - Arguments to create a Item_price_history.
     * @example
     * // Create one Item_price_history
     * const Item_price_history = await prisma.item_price_history.create({
     *   data: {
     *     // ... data to create a Item_price_history
     *   }
     * })
     * 
     */
    create<T extends item_price_historyCreateArgs>(args: SelectSubset<T, item_price_historyCreateArgs<ExtArgs>>): Prisma__item_price_historyClient<$Result.GetResult<Prisma.$item_price_historyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Item_price_histories.
     * @param {item_price_historyCreateManyArgs} args - Arguments to create many Item_price_histories.
     * @example
     * // Create many Item_price_histories
     * const item_price_history = await prisma.item_price_history.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends item_price_historyCreateManyArgs>(args?: SelectSubset<T, item_price_historyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Item_price_history.
     * @param {item_price_historyDeleteArgs} args - Arguments to delete one Item_price_history.
     * @example
     * // Delete one Item_price_history
     * const Item_price_history = await prisma.item_price_history.delete({
     *   where: {
     *     // ... filter to delete one Item_price_history
     *   }
     * })
     * 
     */
    delete<T extends item_price_historyDeleteArgs>(args: SelectSubset<T, item_price_historyDeleteArgs<ExtArgs>>): Prisma__item_price_historyClient<$Result.GetResult<Prisma.$item_price_historyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Item_price_history.
     * @param {item_price_historyUpdateArgs} args - Arguments to update one Item_price_history.
     * @example
     * // Update one Item_price_history
     * const item_price_history = await prisma.item_price_history.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends item_price_historyUpdateArgs>(args: SelectSubset<T, item_price_historyUpdateArgs<ExtArgs>>): Prisma__item_price_historyClient<$Result.GetResult<Prisma.$item_price_historyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Item_price_histories.
     * @param {item_price_historyDeleteManyArgs} args - Arguments to filter Item_price_histories to delete.
     * @example
     * // Delete a few Item_price_histories
     * const { count } = await prisma.item_price_history.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends item_price_historyDeleteManyArgs>(args?: SelectSubset<T, item_price_historyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Item_price_histories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_price_historyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Item_price_histories
     * const item_price_history = await prisma.item_price_history.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends item_price_historyUpdateManyArgs>(args: SelectSubset<T, item_price_historyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Item_price_history.
     * @param {item_price_historyUpsertArgs} args - Arguments to update or create a Item_price_history.
     * @example
     * // Update or create a Item_price_history
     * const item_price_history = await prisma.item_price_history.upsert({
     *   create: {
     *     // ... data to create a Item_price_history
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Item_price_history we want to update
     *   }
     * })
     */
    upsert<T extends item_price_historyUpsertArgs>(args: SelectSubset<T, item_price_historyUpsertArgs<ExtArgs>>): Prisma__item_price_historyClient<$Result.GetResult<Prisma.$item_price_historyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Item_price_histories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_price_historyCountArgs} args - Arguments to filter Item_price_histories to count.
     * @example
     * // Count the number of Item_price_histories
     * const count = await prisma.item_price_history.count({
     *   where: {
     *     // ... the filter for the Item_price_histories we want to count
     *   }
     * })
    **/
    count<T extends item_price_historyCountArgs>(
      args?: Subset<T, item_price_historyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Item_price_historyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Item_price_history.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Item_price_historyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Item_price_historyAggregateArgs>(args: Subset<T, Item_price_historyAggregateArgs>): Prisma.PrismaPromise<GetItem_price_historyAggregateType<T>>

    /**
     * Group by Item_price_history.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_price_historyGroupByArgs} args - Group by arguments.
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
      T extends item_price_historyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: item_price_historyGroupByArgs['orderBy'] }
        : { orderBy?: item_price_historyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, item_price_historyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItem_price_historyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the item_price_history model
   */
  readonly fields: item_price_historyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for item_price_history.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__item_price_historyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    item<T extends item_price_history$itemArgs<ExtArgs> = {}>(args?: Subset<T, item_price_history$itemArgs<ExtArgs>>): Prisma__itemClient<$Result.GetResult<Prisma.$itemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the item_price_history model
   */
  interface item_price_historyFieldRefs {
    readonly item_price_history_id: FieldRef<"item_price_history", 'Int'>
    readonly item_id: FieldRef<"item_price_history", 'Int'>
    readonly price: FieldRef<"item_price_history", 'Int'>
    readonly effective_date: FieldRef<"item_price_history", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * item_price_history findUnique
   */
  export type item_price_historyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_price_history
     */
    select?: item_price_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_price_history
     */
    omit?: item_price_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_price_historyInclude<ExtArgs> | null
    /**
     * Filter, which item_price_history to fetch.
     */
    where: item_price_historyWhereUniqueInput
  }

  /**
   * item_price_history findUniqueOrThrow
   */
  export type item_price_historyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_price_history
     */
    select?: item_price_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_price_history
     */
    omit?: item_price_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_price_historyInclude<ExtArgs> | null
    /**
     * Filter, which item_price_history to fetch.
     */
    where: item_price_historyWhereUniqueInput
  }

  /**
   * item_price_history findFirst
   */
  export type item_price_historyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_price_history
     */
    select?: item_price_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_price_history
     */
    omit?: item_price_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_price_historyInclude<ExtArgs> | null
    /**
     * Filter, which item_price_history to fetch.
     */
    where?: item_price_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of item_price_histories to fetch.
     */
    orderBy?: item_price_historyOrderByWithRelationInput | item_price_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for item_price_histories.
     */
    cursor?: item_price_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` item_price_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` item_price_histories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of item_price_histories.
     */
    distinct?: Item_price_historyScalarFieldEnum | Item_price_historyScalarFieldEnum[]
  }

  /**
   * item_price_history findFirstOrThrow
   */
  export type item_price_historyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_price_history
     */
    select?: item_price_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_price_history
     */
    omit?: item_price_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_price_historyInclude<ExtArgs> | null
    /**
     * Filter, which item_price_history to fetch.
     */
    where?: item_price_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of item_price_histories to fetch.
     */
    orderBy?: item_price_historyOrderByWithRelationInput | item_price_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for item_price_histories.
     */
    cursor?: item_price_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` item_price_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` item_price_histories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of item_price_histories.
     */
    distinct?: Item_price_historyScalarFieldEnum | Item_price_historyScalarFieldEnum[]
  }

  /**
   * item_price_history findMany
   */
  export type item_price_historyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_price_history
     */
    select?: item_price_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_price_history
     */
    omit?: item_price_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_price_historyInclude<ExtArgs> | null
    /**
     * Filter, which item_price_histories to fetch.
     */
    where?: item_price_historyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of item_price_histories to fetch.
     */
    orderBy?: item_price_historyOrderByWithRelationInput | item_price_historyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing item_price_histories.
     */
    cursor?: item_price_historyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` item_price_histories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` item_price_histories.
     */
    skip?: number
    distinct?: Item_price_historyScalarFieldEnum | Item_price_historyScalarFieldEnum[]
  }

  /**
   * item_price_history create
   */
  export type item_price_historyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_price_history
     */
    select?: item_price_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_price_history
     */
    omit?: item_price_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_price_historyInclude<ExtArgs> | null
    /**
     * The data needed to create a item_price_history.
     */
    data?: XOR<item_price_historyCreateInput, item_price_historyUncheckedCreateInput>
  }

  /**
   * item_price_history createMany
   */
  export type item_price_historyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many item_price_histories.
     */
    data: item_price_historyCreateManyInput | item_price_historyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * item_price_history update
   */
  export type item_price_historyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_price_history
     */
    select?: item_price_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_price_history
     */
    omit?: item_price_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_price_historyInclude<ExtArgs> | null
    /**
     * The data needed to update a item_price_history.
     */
    data: XOR<item_price_historyUpdateInput, item_price_historyUncheckedUpdateInput>
    /**
     * Choose, which item_price_history to update.
     */
    where: item_price_historyWhereUniqueInput
  }

  /**
   * item_price_history updateMany
   */
  export type item_price_historyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update item_price_histories.
     */
    data: XOR<item_price_historyUpdateManyMutationInput, item_price_historyUncheckedUpdateManyInput>
    /**
     * Filter which item_price_histories to update
     */
    where?: item_price_historyWhereInput
    /**
     * Limit how many item_price_histories to update.
     */
    limit?: number
  }

  /**
   * item_price_history upsert
   */
  export type item_price_historyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_price_history
     */
    select?: item_price_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_price_history
     */
    omit?: item_price_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_price_historyInclude<ExtArgs> | null
    /**
     * The filter to search for the item_price_history to update in case it exists.
     */
    where: item_price_historyWhereUniqueInput
    /**
     * In case the item_price_history found by the `where` argument doesn't exist, create a new item_price_history with this data.
     */
    create: XOR<item_price_historyCreateInput, item_price_historyUncheckedCreateInput>
    /**
     * In case the item_price_history was found with the provided `where` argument, update it with this data.
     */
    update: XOR<item_price_historyUpdateInput, item_price_historyUncheckedUpdateInput>
  }

  /**
   * item_price_history delete
   */
  export type item_price_historyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_price_history
     */
    select?: item_price_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_price_history
     */
    omit?: item_price_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_price_historyInclude<ExtArgs> | null
    /**
     * Filter which item_price_history to delete.
     */
    where: item_price_historyWhereUniqueInput
  }

  /**
   * item_price_history deleteMany
   */
  export type item_price_historyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which item_price_histories to delete
     */
    where?: item_price_historyWhereInput
    /**
     * Limit how many item_price_histories to delete.
     */
    limit?: number
  }

  /**
   * item_price_history.item
   */
  export type item_price_history$itemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item
     */
    select?: itemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item
     */
    omit?: itemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itemInclude<ExtArgs> | null
    where?: itemWhereInput
  }

  /**
   * item_price_history without action
   */
  export type item_price_historyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_price_history
     */
    select?: item_price_historySelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_price_history
     */
    omit?: item_price_historyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_price_historyInclude<ExtArgs> | null
  }


  /**
   * Model item_status
   */

  export type AggregateItem_status = {
    _count: Item_statusCountAggregateOutputType | null
    _avg: Item_statusAvgAggregateOutputType | null
    _sum: Item_statusSumAggregateOutputType | null
    _min: Item_statusMinAggregateOutputType | null
    _max: Item_statusMaxAggregateOutputType | null
  }

  export type Item_statusAvgAggregateOutputType = {
    status_id: number | null
  }

  export type Item_statusSumAggregateOutputType = {
    status_id: number | null
  }

  export type Item_statusMinAggregateOutputType = {
    status_id: number | null
    name: string | null
  }

  export type Item_statusMaxAggregateOutputType = {
    status_id: number | null
    name: string | null
  }

  export type Item_statusCountAggregateOutputType = {
    status_id: number
    name: number
    _all: number
  }


  export type Item_statusAvgAggregateInputType = {
    status_id?: true
  }

  export type Item_statusSumAggregateInputType = {
    status_id?: true
  }

  export type Item_statusMinAggregateInputType = {
    status_id?: true
    name?: true
  }

  export type Item_statusMaxAggregateInputType = {
    status_id?: true
    name?: true
  }

  export type Item_statusCountAggregateInputType = {
    status_id?: true
    name?: true
    _all?: true
  }

  export type Item_statusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which item_status to aggregate.
     */
    where?: item_statusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of item_statuses to fetch.
     */
    orderBy?: item_statusOrderByWithRelationInput | item_statusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: item_statusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` item_statuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` item_statuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned item_statuses
    **/
    _count?: true | Item_statusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Item_statusAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Item_statusSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Item_statusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Item_statusMaxAggregateInputType
  }

  export type GetItem_statusAggregateType<T extends Item_statusAggregateArgs> = {
        [P in keyof T & keyof AggregateItem_status]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItem_status[P]>
      : GetScalarType<T[P], AggregateItem_status[P]>
  }




  export type item_statusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: item_statusWhereInput
    orderBy?: item_statusOrderByWithAggregationInput | item_statusOrderByWithAggregationInput[]
    by: Item_statusScalarFieldEnum[] | Item_statusScalarFieldEnum
    having?: item_statusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Item_statusCountAggregateInputType | true
    _avg?: Item_statusAvgAggregateInputType
    _sum?: Item_statusSumAggregateInputType
    _min?: Item_statusMinAggregateInputType
    _max?: Item_statusMaxAggregateInputType
  }

  export type Item_statusGroupByOutputType = {
    status_id: number
    name: string | null
    _count: Item_statusCountAggregateOutputType | null
    _avg: Item_statusAvgAggregateOutputType | null
    _sum: Item_statusSumAggregateOutputType | null
    _min: Item_statusMinAggregateOutputType | null
    _max: Item_statusMaxAggregateOutputType | null
  }

  type GetItem_statusGroupByPayload<T extends item_statusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Item_statusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Item_statusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Item_statusGroupByOutputType[P]>
            : GetScalarType<T[P], Item_statusGroupByOutputType[P]>
        }
      >
    >


  export type item_statusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    status_id?: boolean
    name?: boolean
    item_in_list?: boolean | item_status$item_in_listArgs<ExtArgs>
    _count?: boolean | Item_statusCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["item_status"]>



  export type item_statusSelectScalar = {
    status_id?: boolean
    name?: boolean
  }

  export type item_statusOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"status_id" | "name", ExtArgs["result"]["item_status"]>
  export type item_statusInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item_in_list?: boolean | item_status$item_in_listArgs<ExtArgs>
    _count?: boolean | Item_statusCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $item_statusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "item_status"
    objects: {
      item_in_list: Prisma.$item_in_listPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      status_id: number
      name: string | null
    }, ExtArgs["result"]["item_status"]>
    composites: {}
  }

  type item_statusGetPayload<S extends boolean | null | undefined | item_statusDefaultArgs> = $Result.GetResult<Prisma.$item_statusPayload, S>

  type item_statusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<item_statusFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Item_statusCountAggregateInputType | true
    }

  export interface item_statusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['item_status'], meta: { name: 'item_status' } }
    /**
     * Find zero or one Item_status that matches the filter.
     * @param {item_statusFindUniqueArgs} args - Arguments to find a Item_status
     * @example
     * // Get one Item_status
     * const item_status = await prisma.item_status.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends item_statusFindUniqueArgs>(args: SelectSubset<T, item_statusFindUniqueArgs<ExtArgs>>): Prisma__item_statusClient<$Result.GetResult<Prisma.$item_statusPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Item_status that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {item_statusFindUniqueOrThrowArgs} args - Arguments to find a Item_status
     * @example
     * // Get one Item_status
     * const item_status = await prisma.item_status.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends item_statusFindUniqueOrThrowArgs>(args: SelectSubset<T, item_statusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__item_statusClient<$Result.GetResult<Prisma.$item_statusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item_status that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_statusFindFirstArgs} args - Arguments to find a Item_status
     * @example
     * // Get one Item_status
     * const item_status = await prisma.item_status.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends item_statusFindFirstArgs>(args?: SelectSubset<T, item_statusFindFirstArgs<ExtArgs>>): Prisma__item_statusClient<$Result.GetResult<Prisma.$item_statusPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item_status that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_statusFindFirstOrThrowArgs} args - Arguments to find a Item_status
     * @example
     * // Get one Item_status
     * const item_status = await prisma.item_status.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends item_statusFindFirstOrThrowArgs>(args?: SelectSubset<T, item_statusFindFirstOrThrowArgs<ExtArgs>>): Prisma__item_statusClient<$Result.GetResult<Prisma.$item_statusPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Item_statuses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_statusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Item_statuses
     * const item_statuses = await prisma.item_status.findMany()
     * 
     * // Get first 10 Item_statuses
     * const item_statuses = await prisma.item_status.findMany({ take: 10 })
     * 
     * // Only select the `status_id`
     * const item_statusWithStatus_idOnly = await prisma.item_status.findMany({ select: { status_id: true } })
     * 
     */
    findMany<T extends item_statusFindManyArgs>(args?: SelectSubset<T, item_statusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$item_statusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Item_status.
     * @param {item_statusCreateArgs} args - Arguments to create a Item_status.
     * @example
     * // Create one Item_status
     * const Item_status = await prisma.item_status.create({
     *   data: {
     *     // ... data to create a Item_status
     *   }
     * })
     * 
     */
    create<T extends item_statusCreateArgs>(args: SelectSubset<T, item_statusCreateArgs<ExtArgs>>): Prisma__item_statusClient<$Result.GetResult<Prisma.$item_statusPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Item_statuses.
     * @param {item_statusCreateManyArgs} args - Arguments to create many Item_statuses.
     * @example
     * // Create many Item_statuses
     * const item_status = await prisma.item_status.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends item_statusCreateManyArgs>(args?: SelectSubset<T, item_statusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Item_status.
     * @param {item_statusDeleteArgs} args - Arguments to delete one Item_status.
     * @example
     * // Delete one Item_status
     * const Item_status = await prisma.item_status.delete({
     *   where: {
     *     // ... filter to delete one Item_status
     *   }
     * })
     * 
     */
    delete<T extends item_statusDeleteArgs>(args: SelectSubset<T, item_statusDeleteArgs<ExtArgs>>): Prisma__item_statusClient<$Result.GetResult<Prisma.$item_statusPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Item_status.
     * @param {item_statusUpdateArgs} args - Arguments to update one Item_status.
     * @example
     * // Update one Item_status
     * const item_status = await prisma.item_status.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends item_statusUpdateArgs>(args: SelectSubset<T, item_statusUpdateArgs<ExtArgs>>): Prisma__item_statusClient<$Result.GetResult<Prisma.$item_statusPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Item_statuses.
     * @param {item_statusDeleteManyArgs} args - Arguments to filter Item_statuses to delete.
     * @example
     * // Delete a few Item_statuses
     * const { count } = await prisma.item_status.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends item_statusDeleteManyArgs>(args?: SelectSubset<T, item_statusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Item_statuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_statusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Item_statuses
     * const item_status = await prisma.item_status.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends item_statusUpdateManyArgs>(args: SelectSubset<T, item_statusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Item_status.
     * @param {item_statusUpsertArgs} args - Arguments to update or create a Item_status.
     * @example
     * // Update or create a Item_status
     * const item_status = await prisma.item_status.upsert({
     *   create: {
     *     // ... data to create a Item_status
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Item_status we want to update
     *   }
     * })
     */
    upsert<T extends item_statusUpsertArgs>(args: SelectSubset<T, item_statusUpsertArgs<ExtArgs>>): Prisma__item_statusClient<$Result.GetResult<Prisma.$item_statusPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Item_statuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_statusCountArgs} args - Arguments to filter Item_statuses to count.
     * @example
     * // Count the number of Item_statuses
     * const count = await prisma.item_status.count({
     *   where: {
     *     // ... the filter for the Item_statuses we want to count
     *   }
     * })
    **/
    count<T extends item_statusCountArgs>(
      args?: Subset<T, item_statusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Item_statusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Item_status.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Item_statusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Item_statusAggregateArgs>(args: Subset<T, Item_statusAggregateArgs>): Prisma.PrismaPromise<GetItem_statusAggregateType<T>>

    /**
     * Group by Item_status.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_statusGroupByArgs} args - Group by arguments.
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
      T extends item_statusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: item_statusGroupByArgs['orderBy'] }
        : { orderBy?: item_statusGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, item_statusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItem_statusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the item_status model
   */
  readonly fields: item_statusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for item_status.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__item_statusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    item_in_list<T extends item_status$item_in_listArgs<ExtArgs> = {}>(args?: Subset<T, item_status$item_in_listArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$item_in_listPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the item_status model
   */
  interface item_statusFieldRefs {
    readonly status_id: FieldRef<"item_status", 'Int'>
    readonly name: FieldRef<"item_status", 'String'>
  }
    

  // Custom InputTypes
  /**
   * item_status findUnique
   */
  export type item_statusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_status
     */
    select?: item_statusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_status
     */
    omit?: item_statusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_statusInclude<ExtArgs> | null
    /**
     * Filter, which item_status to fetch.
     */
    where: item_statusWhereUniqueInput
  }

  /**
   * item_status findUniqueOrThrow
   */
  export type item_statusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_status
     */
    select?: item_statusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_status
     */
    omit?: item_statusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_statusInclude<ExtArgs> | null
    /**
     * Filter, which item_status to fetch.
     */
    where: item_statusWhereUniqueInput
  }

  /**
   * item_status findFirst
   */
  export type item_statusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_status
     */
    select?: item_statusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_status
     */
    omit?: item_statusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_statusInclude<ExtArgs> | null
    /**
     * Filter, which item_status to fetch.
     */
    where?: item_statusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of item_statuses to fetch.
     */
    orderBy?: item_statusOrderByWithRelationInput | item_statusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for item_statuses.
     */
    cursor?: item_statusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` item_statuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` item_statuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of item_statuses.
     */
    distinct?: Item_statusScalarFieldEnum | Item_statusScalarFieldEnum[]
  }

  /**
   * item_status findFirstOrThrow
   */
  export type item_statusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_status
     */
    select?: item_statusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_status
     */
    omit?: item_statusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_statusInclude<ExtArgs> | null
    /**
     * Filter, which item_status to fetch.
     */
    where?: item_statusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of item_statuses to fetch.
     */
    orderBy?: item_statusOrderByWithRelationInput | item_statusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for item_statuses.
     */
    cursor?: item_statusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` item_statuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` item_statuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of item_statuses.
     */
    distinct?: Item_statusScalarFieldEnum | Item_statusScalarFieldEnum[]
  }

  /**
   * item_status findMany
   */
  export type item_statusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_status
     */
    select?: item_statusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_status
     */
    omit?: item_statusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_statusInclude<ExtArgs> | null
    /**
     * Filter, which item_statuses to fetch.
     */
    where?: item_statusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of item_statuses to fetch.
     */
    orderBy?: item_statusOrderByWithRelationInput | item_statusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing item_statuses.
     */
    cursor?: item_statusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` item_statuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` item_statuses.
     */
    skip?: number
    distinct?: Item_statusScalarFieldEnum | Item_statusScalarFieldEnum[]
  }

  /**
   * item_status create
   */
  export type item_statusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_status
     */
    select?: item_statusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_status
     */
    omit?: item_statusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_statusInclude<ExtArgs> | null
    /**
     * The data needed to create a item_status.
     */
    data?: XOR<item_statusCreateInput, item_statusUncheckedCreateInput>
  }

  /**
   * item_status createMany
   */
  export type item_statusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many item_statuses.
     */
    data: item_statusCreateManyInput | item_statusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * item_status update
   */
  export type item_statusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_status
     */
    select?: item_statusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_status
     */
    omit?: item_statusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_statusInclude<ExtArgs> | null
    /**
     * The data needed to update a item_status.
     */
    data: XOR<item_statusUpdateInput, item_statusUncheckedUpdateInput>
    /**
     * Choose, which item_status to update.
     */
    where: item_statusWhereUniqueInput
  }

  /**
   * item_status updateMany
   */
  export type item_statusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update item_statuses.
     */
    data: XOR<item_statusUpdateManyMutationInput, item_statusUncheckedUpdateManyInput>
    /**
     * Filter which item_statuses to update
     */
    where?: item_statusWhereInput
    /**
     * Limit how many item_statuses to update.
     */
    limit?: number
  }

  /**
   * item_status upsert
   */
  export type item_statusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_status
     */
    select?: item_statusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_status
     */
    omit?: item_statusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_statusInclude<ExtArgs> | null
    /**
     * The filter to search for the item_status to update in case it exists.
     */
    where: item_statusWhereUniqueInput
    /**
     * In case the item_status found by the `where` argument doesn't exist, create a new item_status with this data.
     */
    create: XOR<item_statusCreateInput, item_statusUncheckedCreateInput>
    /**
     * In case the item_status was found with the provided `where` argument, update it with this data.
     */
    update: XOR<item_statusUpdateInput, item_statusUncheckedUpdateInput>
  }

  /**
   * item_status delete
   */
  export type item_statusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_status
     */
    select?: item_statusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_status
     */
    omit?: item_statusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_statusInclude<ExtArgs> | null
    /**
     * Filter which item_status to delete.
     */
    where: item_statusWhereUniqueInput
  }

  /**
   * item_status deleteMany
   */
  export type item_statusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which item_statuses to delete
     */
    where?: item_statusWhereInput
    /**
     * Limit how many item_statuses to delete.
     */
    limit?: number
  }

  /**
   * item_status.item_in_list
   */
  export type item_status$item_in_listArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_in_list
     */
    select?: item_in_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_in_list
     */
    omit?: item_in_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_in_listInclude<ExtArgs> | null
    where?: item_in_listWhereInput
    orderBy?: item_in_listOrderByWithRelationInput | item_in_listOrderByWithRelationInput[]
    cursor?: item_in_listWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Item_in_listScalarFieldEnum | Item_in_listScalarFieldEnum[]
  }

  /**
   * item_status without action
   */
  export type item_statusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_status
     */
    select?: item_statusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_status
     */
    omit?: item_statusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_statusInclude<ExtArgs> | null
  }


  /**
   * Model item_favorite
   */

  export type AggregateItem_favorite = {
    _count: Item_favoriteCountAggregateOutputType | null
    _avg: Item_favoriteAvgAggregateOutputType | null
    _sum: Item_favoriteSumAggregateOutputType | null
    _min: Item_favoriteMinAggregateOutputType | null
    _max: Item_favoriteMaxAggregateOutputType | null
  }

  export type Item_favoriteAvgAggregateOutputType = {
    user_id: number | null
    item_id: number | null
  }

  export type Item_favoriteSumAggregateOutputType = {
    user_id: number | null
    item_id: number | null
  }

  export type Item_favoriteMinAggregateOutputType = {
    user_id: number | null
    item_id: number | null
  }

  export type Item_favoriteMaxAggregateOutputType = {
    user_id: number | null
    item_id: number | null
  }

  export type Item_favoriteCountAggregateOutputType = {
    user_id: number
    item_id: number
    _all: number
  }


  export type Item_favoriteAvgAggregateInputType = {
    user_id?: true
    item_id?: true
  }

  export type Item_favoriteSumAggregateInputType = {
    user_id?: true
    item_id?: true
  }

  export type Item_favoriteMinAggregateInputType = {
    user_id?: true
    item_id?: true
  }

  export type Item_favoriteMaxAggregateInputType = {
    user_id?: true
    item_id?: true
  }

  export type Item_favoriteCountAggregateInputType = {
    user_id?: true
    item_id?: true
    _all?: true
  }

  export type Item_favoriteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which item_favorite to aggregate.
     */
    where?: item_favoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of item_favorites to fetch.
     */
    orderBy?: item_favoriteOrderByWithRelationInput | item_favoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: item_favoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` item_favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` item_favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned item_favorites
    **/
    _count?: true | Item_favoriteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Item_favoriteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Item_favoriteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Item_favoriteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Item_favoriteMaxAggregateInputType
  }

  export type GetItem_favoriteAggregateType<T extends Item_favoriteAggregateArgs> = {
        [P in keyof T & keyof AggregateItem_favorite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItem_favorite[P]>
      : GetScalarType<T[P], AggregateItem_favorite[P]>
  }




  export type item_favoriteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: item_favoriteWhereInput
    orderBy?: item_favoriteOrderByWithAggregationInput | item_favoriteOrderByWithAggregationInput[]
    by: Item_favoriteScalarFieldEnum[] | Item_favoriteScalarFieldEnum
    having?: item_favoriteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Item_favoriteCountAggregateInputType | true
    _avg?: Item_favoriteAvgAggregateInputType
    _sum?: Item_favoriteSumAggregateInputType
    _min?: Item_favoriteMinAggregateInputType
    _max?: Item_favoriteMaxAggregateInputType
  }

  export type Item_favoriteGroupByOutputType = {
    user_id: number
    item_id: number
    _count: Item_favoriteCountAggregateOutputType | null
    _avg: Item_favoriteAvgAggregateOutputType | null
    _sum: Item_favoriteSumAggregateOutputType | null
    _min: Item_favoriteMinAggregateOutputType | null
    _max: Item_favoriteMaxAggregateOutputType | null
  }

  type GetItem_favoriteGroupByPayload<T extends item_favoriteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Item_favoriteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Item_favoriteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Item_favoriteGroupByOutputType[P]>
            : GetScalarType<T[P], Item_favoriteGroupByOutputType[P]>
        }
      >
    >


  export type item_favoriteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    item_id?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    item?: boolean | itemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["item_favorite"]>



  export type item_favoriteSelectScalar = {
    user_id?: boolean
    item_id?: boolean
  }

  export type item_favoriteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "item_id", ExtArgs["result"]["item_favorite"]>
  export type item_favoriteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    item?: boolean | itemDefaultArgs<ExtArgs>
  }

  export type $item_favoritePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "item_favorite"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
      item: Prisma.$itemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: number
      item_id: number
    }, ExtArgs["result"]["item_favorite"]>
    composites: {}
  }

  type item_favoriteGetPayload<S extends boolean | null | undefined | item_favoriteDefaultArgs> = $Result.GetResult<Prisma.$item_favoritePayload, S>

  type item_favoriteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<item_favoriteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Item_favoriteCountAggregateInputType | true
    }

  export interface item_favoriteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['item_favorite'], meta: { name: 'item_favorite' } }
    /**
     * Find zero or one Item_favorite that matches the filter.
     * @param {item_favoriteFindUniqueArgs} args - Arguments to find a Item_favorite
     * @example
     * // Get one Item_favorite
     * const item_favorite = await prisma.item_favorite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends item_favoriteFindUniqueArgs>(args: SelectSubset<T, item_favoriteFindUniqueArgs<ExtArgs>>): Prisma__item_favoriteClient<$Result.GetResult<Prisma.$item_favoritePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Item_favorite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {item_favoriteFindUniqueOrThrowArgs} args - Arguments to find a Item_favorite
     * @example
     * // Get one Item_favorite
     * const item_favorite = await prisma.item_favorite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends item_favoriteFindUniqueOrThrowArgs>(args: SelectSubset<T, item_favoriteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__item_favoriteClient<$Result.GetResult<Prisma.$item_favoritePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item_favorite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_favoriteFindFirstArgs} args - Arguments to find a Item_favorite
     * @example
     * // Get one Item_favorite
     * const item_favorite = await prisma.item_favorite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends item_favoriteFindFirstArgs>(args?: SelectSubset<T, item_favoriteFindFirstArgs<ExtArgs>>): Prisma__item_favoriteClient<$Result.GetResult<Prisma.$item_favoritePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item_favorite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_favoriteFindFirstOrThrowArgs} args - Arguments to find a Item_favorite
     * @example
     * // Get one Item_favorite
     * const item_favorite = await prisma.item_favorite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends item_favoriteFindFirstOrThrowArgs>(args?: SelectSubset<T, item_favoriteFindFirstOrThrowArgs<ExtArgs>>): Prisma__item_favoriteClient<$Result.GetResult<Prisma.$item_favoritePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Item_favorites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_favoriteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Item_favorites
     * const item_favorites = await prisma.item_favorite.findMany()
     * 
     * // Get first 10 Item_favorites
     * const item_favorites = await prisma.item_favorite.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const item_favoriteWithUser_idOnly = await prisma.item_favorite.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends item_favoriteFindManyArgs>(args?: SelectSubset<T, item_favoriteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$item_favoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Item_favorite.
     * @param {item_favoriteCreateArgs} args - Arguments to create a Item_favorite.
     * @example
     * // Create one Item_favorite
     * const Item_favorite = await prisma.item_favorite.create({
     *   data: {
     *     // ... data to create a Item_favorite
     *   }
     * })
     * 
     */
    create<T extends item_favoriteCreateArgs>(args: SelectSubset<T, item_favoriteCreateArgs<ExtArgs>>): Prisma__item_favoriteClient<$Result.GetResult<Prisma.$item_favoritePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Item_favorites.
     * @param {item_favoriteCreateManyArgs} args - Arguments to create many Item_favorites.
     * @example
     * // Create many Item_favorites
     * const item_favorite = await prisma.item_favorite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends item_favoriteCreateManyArgs>(args?: SelectSubset<T, item_favoriteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Item_favorite.
     * @param {item_favoriteDeleteArgs} args - Arguments to delete one Item_favorite.
     * @example
     * // Delete one Item_favorite
     * const Item_favorite = await prisma.item_favorite.delete({
     *   where: {
     *     // ... filter to delete one Item_favorite
     *   }
     * })
     * 
     */
    delete<T extends item_favoriteDeleteArgs>(args: SelectSubset<T, item_favoriteDeleteArgs<ExtArgs>>): Prisma__item_favoriteClient<$Result.GetResult<Prisma.$item_favoritePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Item_favorite.
     * @param {item_favoriteUpdateArgs} args - Arguments to update one Item_favorite.
     * @example
     * // Update one Item_favorite
     * const item_favorite = await prisma.item_favorite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends item_favoriteUpdateArgs>(args: SelectSubset<T, item_favoriteUpdateArgs<ExtArgs>>): Prisma__item_favoriteClient<$Result.GetResult<Prisma.$item_favoritePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Item_favorites.
     * @param {item_favoriteDeleteManyArgs} args - Arguments to filter Item_favorites to delete.
     * @example
     * // Delete a few Item_favorites
     * const { count } = await prisma.item_favorite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends item_favoriteDeleteManyArgs>(args?: SelectSubset<T, item_favoriteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Item_favorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_favoriteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Item_favorites
     * const item_favorite = await prisma.item_favorite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends item_favoriteUpdateManyArgs>(args: SelectSubset<T, item_favoriteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Item_favorite.
     * @param {item_favoriteUpsertArgs} args - Arguments to update or create a Item_favorite.
     * @example
     * // Update or create a Item_favorite
     * const item_favorite = await prisma.item_favorite.upsert({
     *   create: {
     *     // ... data to create a Item_favorite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Item_favorite we want to update
     *   }
     * })
     */
    upsert<T extends item_favoriteUpsertArgs>(args: SelectSubset<T, item_favoriteUpsertArgs<ExtArgs>>): Prisma__item_favoriteClient<$Result.GetResult<Prisma.$item_favoritePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Item_favorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_favoriteCountArgs} args - Arguments to filter Item_favorites to count.
     * @example
     * // Count the number of Item_favorites
     * const count = await prisma.item_favorite.count({
     *   where: {
     *     // ... the filter for the Item_favorites we want to count
     *   }
     * })
    **/
    count<T extends item_favoriteCountArgs>(
      args?: Subset<T, item_favoriteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Item_favoriteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Item_favorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Item_favoriteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Item_favoriteAggregateArgs>(args: Subset<T, Item_favoriteAggregateArgs>): Prisma.PrismaPromise<GetItem_favoriteAggregateType<T>>

    /**
     * Group by Item_favorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {item_favoriteGroupByArgs} args - Group by arguments.
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
      T extends item_favoriteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: item_favoriteGroupByArgs['orderBy'] }
        : { orderBy?: item_favoriteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, item_favoriteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItem_favoriteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the item_favorite model
   */
  readonly fields: item_favoriteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for item_favorite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__item_favoriteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    item<T extends itemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, itemDefaultArgs<ExtArgs>>): Prisma__itemClient<$Result.GetResult<Prisma.$itemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the item_favorite model
   */
  interface item_favoriteFieldRefs {
    readonly user_id: FieldRef<"item_favorite", 'Int'>
    readonly item_id: FieldRef<"item_favorite", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * item_favorite findUnique
   */
  export type item_favoriteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_favorite
     */
    select?: item_favoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_favorite
     */
    omit?: item_favoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_favoriteInclude<ExtArgs> | null
    /**
     * Filter, which item_favorite to fetch.
     */
    where: item_favoriteWhereUniqueInput
  }

  /**
   * item_favorite findUniqueOrThrow
   */
  export type item_favoriteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_favorite
     */
    select?: item_favoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_favorite
     */
    omit?: item_favoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_favoriteInclude<ExtArgs> | null
    /**
     * Filter, which item_favorite to fetch.
     */
    where: item_favoriteWhereUniqueInput
  }

  /**
   * item_favorite findFirst
   */
  export type item_favoriteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_favorite
     */
    select?: item_favoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_favorite
     */
    omit?: item_favoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_favoriteInclude<ExtArgs> | null
    /**
     * Filter, which item_favorite to fetch.
     */
    where?: item_favoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of item_favorites to fetch.
     */
    orderBy?: item_favoriteOrderByWithRelationInput | item_favoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for item_favorites.
     */
    cursor?: item_favoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` item_favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` item_favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of item_favorites.
     */
    distinct?: Item_favoriteScalarFieldEnum | Item_favoriteScalarFieldEnum[]
  }

  /**
   * item_favorite findFirstOrThrow
   */
  export type item_favoriteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_favorite
     */
    select?: item_favoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_favorite
     */
    omit?: item_favoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_favoriteInclude<ExtArgs> | null
    /**
     * Filter, which item_favorite to fetch.
     */
    where?: item_favoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of item_favorites to fetch.
     */
    orderBy?: item_favoriteOrderByWithRelationInput | item_favoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for item_favorites.
     */
    cursor?: item_favoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` item_favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` item_favorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of item_favorites.
     */
    distinct?: Item_favoriteScalarFieldEnum | Item_favoriteScalarFieldEnum[]
  }

  /**
   * item_favorite findMany
   */
  export type item_favoriteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_favorite
     */
    select?: item_favoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_favorite
     */
    omit?: item_favoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_favoriteInclude<ExtArgs> | null
    /**
     * Filter, which item_favorites to fetch.
     */
    where?: item_favoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of item_favorites to fetch.
     */
    orderBy?: item_favoriteOrderByWithRelationInput | item_favoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing item_favorites.
     */
    cursor?: item_favoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` item_favorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` item_favorites.
     */
    skip?: number
    distinct?: Item_favoriteScalarFieldEnum | Item_favoriteScalarFieldEnum[]
  }

  /**
   * item_favorite create
   */
  export type item_favoriteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_favorite
     */
    select?: item_favoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_favorite
     */
    omit?: item_favoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_favoriteInclude<ExtArgs> | null
    /**
     * The data needed to create a item_favorite.
     */
    data: XOR<item_favoriteCreateInput, item_favoriteUncheckedCreateInput>
  }

  /**
   * item_favorite createMany
   */
  export type item_favoriteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many item_favorites.
     */
    data: item_favoriteCreateManyInput | item_favoriteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * item_favorite update
   */
  export type item_favoriteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_favorite
     */
    select?: item_favoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_favorite
     */
    omit?: item_favoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_favoriteInclude<ExtArgs> | null
    /**
     * The data needed to update a item_favorite.
     */
    data: XOR<item_favoriteUpdateInput, item_favoriteUncheckedUpdateInput>
    /**
     * Choose, which item_favorite to update.
     */
    where: item_favoriteWhereUniqueInput
  }

  /**
   * item_favorite updateMany
   */
  export type item_favoriteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update item_favorites.
     */
    data: XOR<item_favoriteUpdateManyMutationInput, item_favoriteUncheckedUpdateManyInput>
    /**
     * Filter which item_favorites to update
     */
    where?: item_favoriteWhereInput
    /**
     * Limit how many item_favorites to update.
     */
    limit?: number
  }

  /**
   * item_favorite upsert
   */
  export type item_favoriteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_favorite
     */
    select?: item_favoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_favorite
     */
    omit?: item_favoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_favoriteInclude<ExtArgs> | null
    /**
     * The filter to search for the item_favorite to update in case it exists.
     */
    where: item_favoriteWhereUniqueInput
    /**
     * In case the item_favorite found by the `where` argument doesn't exist, create a new item_favorite with this data.
     */
    create: XOR<item_favoriteCreateInput, item_favoriteUncheckedCreateInput>
    /**
     * In case the item_favorite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<item_favoriteUpdateInput, item_favoriteUncheckedUpdateInput>
  }

  /**
   * item_favorite delete
   */
  export type item_favoriteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_favorite
     */
    select?: item_favoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_favorite
     */
    omit?: item_favoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_favoriteInclude<ExtArgs> | null
    /**
     * Filter which item_favorite to delete.
     */
    where: item_favoriteWhereUniqueInput
  }

  /**
   * item_favorite deleteMany
   */
  export type item_favoriteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which item_favorites to delete
     */
    where?: item_favoriteWhereInput
    /**
     * Limit how many item_favorites to delete.
     */
    limit?: number
  }

  /**
   * item_favorite without action
   */
  export type item_favoriteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_favorite
     */
    select?: item_favoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_favorite
     */
    omit?: item_favoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_favoriteInclude<ExtArgs> | null
  }


  /**
   * Model shopping_list
   */

  export type AggregateShopping_list = {
    _count: Shopping_listCountAggregateOutputType | null
    _avg: Shopping_listAvgAggregateOutputType | null
    _sum: Shopping_listSumAggregateOutputType | null
    _min: Shopping_listMinAggregateOutputType | null
    _max: Shopping_listMaxAggregateOutputType | null
  }

  export type Shopping_listAvgAggregateOutputType = {
    shopping_list_id: number | null
    location_id: number | null
  }

  export type Shopping_listSumAggregateOutputType = {
    shopping_list_id: number | null
    location_id: number | null
  }

  export type Shopping_listMinAggregateOutputType = {
    shopping_list_id: number | null
    location_id: number | null
    paid: boolean | null
    completed_at: Date | null
  }

  export type Shopping_listMaxAggregateOutputType = {
    shopping_list_id: number | null
    location_id: number | null
    paid: boolean | null
    completed_at: Date | null
  }

  export type Shopping_listCountAggregateOutputType = {
    shopping_list_id: number
    location_id: number
    paid: number
    completed_at: number
    _all: number
  }


  export type Shopping_listAvgAggregateInputType = {
    shopping_list_id?: true
    location_id?: true
  }

  export type Shopping_listSumAggregateInputType = {
    shopping_list_id?: true
    location_id?: true
  }

  export type Shopping_listMinAggregateInputType = {
    shopping_list_id?: true
    location_id?: true
    paid?: true
    completed_at?: true
  }

  export type Shopping_listMaxAggregateInputType = {
    shopping_list_id?: true
    location_id?: true
    paid?: true
    completed_at?: true
  }

  export type Shopping_listCountAggregateInputType = {
    shopping_list_id?: true
    location_id?: true
    paid?: true
    completed_at?: true
    _all?: true
  }

  export type Shopping_listAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which shopping_list to aggregate.
     */
    where?: shopping_listWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of shopping_lists to fetch.
     */
    orderBy?: shopping_listOrderByWithRelationInput | shopping_listOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: shopping_listWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` shopping_lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` shopping_lists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned shopping_lists
    **/
    _count?: true | Shopping_listCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Shopping_listAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Shopping_listSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Shopping_listMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Shopping_listMaxAggregateInputType
  }

  export type GetShopping_listAggregateType<T extends Shopping_listAggregateArgs> = {
        [P in keyof T & keyof AggregateShopping_list]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShopping_list[P]>
      : GetScalarType<T[P], AggregateShopping_list[P]>
  }




  export type shopping_listGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: shopping_listWhereInput
    orderBy?: shopping_listOrderByWithAggregationInput | shopping_listOrderByWithAggregationInput[]
    by: Shopping_listScalarFieldEnum[] | Shopping_listScalarFieldEnum
    having?: shopping_listScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Shopping_listCountAggregateInputType | true
    _avg?: Shopping_listAvgAggregateInputType
    _sum?: Shopping_listSumAggregateInputType
    _min?: Shopping_listMinAggregateInputType
    _max?: Shopping_listMaxAggregateInputType
  }

  export type Shopping_listGroupByOutputType = {
    shopping_list_id: number
    location_id: number | null
    paid: boolean | null
    completed_at: Date | null
    _count: Shopping_listCountAggregateOutputType | null
    _avg: Shopping_listAvgAggregateOutputType | null
    _sum: Shopping_listSumAggregateOutputType | null
    _min: Shopping_listMinAggregateOutputType | null
    _max: Shopping_listMaxAggregateOutputType | null
  }

  type GetShopping_listGroupByPayload<T extends shopping_listGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Shopping_listGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Shopping_listGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Shopping_listGroupByOutputType[P]>
            : GetScalarType<T[P], Shopping_listGroupByOutputType[P]>
        }
      >
    >


  export type shopping_listSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    shopping_list_id?: boolean
    location_id?: boolean
    paid?: boolean
    completed_at?: boolean
    item_in_list?: boolean | shopping_list$item_in_listArgs<ExtArgs>
    location?: boolean | shopping_list$locationArgs<ExtArgs>
    _count?: boolean | Shopping_listCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shopping_list"]>



  export type shopping_listSelectScalar = {
    shopping_list_id?: boolean
    location_id?: boolean
    paid?: boolean
    completed_at?: boolean
  }

  export type shopping_listOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"shopping_list_id" | "location_id" | "paid" | "completed_at", ExtArgs["result"]["shopping_list"]>
  export type shopping_listInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item_in_list?: boolean | shopping_list$item_in_listArgs<ExtArgs>
    location?: boolean | shopping_list$locationArgs<ExtArgs>
    _count?: boolean | Shopping_listCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $shopping_listPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "shopping_list"
    objects: {
      item_in_list: Prisma.$item_in_listPayload<ExtArgs>[]
      location: Prisma.$locationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      shopping_list_id: number
      location_id: number | null
      paid: boolean | null
      completed_at: Date | null
    }, ExtArgs["result"]["shopping_list"]>
    composites: {}
  }

  type shopping_listGetPayload<S extends boolean | null | undefined | shopping_listDefaultArgs> = $Result.GetResult<Prisma.$shopping_listPayload, S>

  type shopping_listCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<shopping_listFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Shopping_listCountAggregateInputType | true
    }

  export interface shopping_listDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['shopping_list'], meta: { name: 'shopping_list' } }
    /**
     * Find zero or one Shopping_list that matches the filter.
     * @param {shopping_listFindUniqueArgs} args - Arguments to find a Shopping_list
     * @example
     * // Get one Shopping_list
     * const shopping_list = await prisma.shopping_list.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends shopping_listFindUniqueArgs>(args: SelectSubset<T, shopping_listFindUniqueArgs<ExtArgs>>): Prisma__shopping_listClient<$Result.GetResult<Prisma.$shopping_listPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Shopping_list that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {shopping_listFindUniqueOrThrowArgs} args - Arguments to find a Shopping_list
     * @example
     * // Get one Shopping_list
     * const shopping_list = await prisma.shopping_list.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends shopping_listFindUniqueOrThrowArgs>(args: SelectSubset<T, shopping_listFindUniqueOrThrowArgs<ExtArgs>>): Prisma__shopping_listClient<$Result.GetResult<Prisma.$shopping_listPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shopping_list that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {shopping_listFindFirstArgs} args - Arguments to find a Shopping_list
     * @example
     * // Get one Shopping_list
     * const shopping_list = await prisma.shopping_list.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends shopping_listFindFirstArgs>(args?: SelectSubset<T, shopping_listFindFirstArgs<ExtArgs>>): Prisma__shopping_listClient<$Result.GetResult<Prisma.$shopping_listPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shopping_list that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {shopping_listFindFirstOrThrowArgs} args - Arguments to find a Shopping_list
     * @example
     * // Get one Shopping_list
     * const shopping_list = await prisma.shopping_list.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends shopping_listFindFirstOrThrowArgs>(args?: SelectSubset<T, shopping_listFindFirstOrThrowArgs<ExtArgs>>): Prisma__shopping_listClient<$Result.GetResult<Prisma.$shopping_listPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Shopping_lists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {shopping_listFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Shopping_lists
     * const shopping_lists = await prisma.shopping_list.findMany()
     * 
     * // Get first 10 Shopping_lists
     * const shopping_lists = await prisma.shopping_list.findMany({ take: 10 })
     * 
     * // Only select the `shopping_list_id`
     * const shopping_listWithShopping_list_idOnly = await prisma.shopping_list.findMany({ select: { shopping_list_id: true } })
     * 
     */
    findMany<T extends shopping_listFindManyArgs>(args?: SelectSubset<T, shopping_listFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$shopping_listPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Shopping_list.
     * @param {shopping_listCreateArgs} args - Arguments to create a Shopping_list.
     * @example
     * // Create one Shopping_list
     * const Shopping_list = await prisma.shopping_list.create({
     *   data: {
     *     // ... data to create a Shopping_list
     *   }
     * })
     * 
     */
    create<T extends shopping_listCreateArgs>(args: SelectSubset<T, shopping_listCreateArgs<ExtArgs>>): Prisma__shopping_listClient<$Result.GetResult<Prisma.$shopping_listPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Shopping_lists.
     * @param {shopping_listCreateManyArgs} args - Arguments to create many Shopping_lists.
     * @example
     * // Create many Shopping_lists
     * const shopping_list = await prisma.shopping_list.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends shopping_listCreateManyArgs>(args?: SelectSubset<T, shopping_listCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Shopping_list.
     * @param {shopping_listDeleteArgs} args - Arguments to delete one Shopping_list.
     * @example
     * // Delete one Shopping_list
     * const Shopping_list = await prisma.shopping_list.delete({
     *   where: {
     *     // ... filter to delete one Shopping_list
     *   }
     * })
     * 
     */
    delete<T extends shopping_listDeleteArgs>(args: SelectSubset<T, shopping_listDeleteArgs<ExtArgs>>): Prisma__shopping_listClient<$Result.GetResult<Prisma.$shopping_listPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Shopping_list.
     * @param {shopping_listUpdateArgs} args - Arguments to update one Shopping_list.
     * @example
     * // Update one Shopping_list
     * const shopping_list = await prisma.shopping_list.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends shopping_listUpdateArgs>(args: SelectSubset<T, shopping_listUpdateArgs<ExtArgs>>): Prisma__shopping_listClient<$Result.GetResult<Prisma.$shopping_listPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Shopping_lists.
     * @param {shopping_listDeleteManyArgs} args - Arguments to filter Shopping_lists to delete.
     * @example
     * // Delete a few Shopping_lists
     * const { count } = await prisma.shopping_list.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends shopping_listDeleteManyArgs>(args?: SelectSubset<T, shopping_listDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shopping_lists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {shopping_listUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Shopping_lists
     * const shopping_list = await prisma.shopping_list.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends shopping_listUpdateManyArgs>(args: SelectSubset<T, shopping_listUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Shopping_list.
     * @param {shopping_listUpsertArgs} args - Arguments to update or create a Shopping_list.
     * @example
     * // Update or create a Shopping_list
     * const shopping_list = await prisma.shopping_list.upsert({
     *   create: {
     *     // ... data to create a Shopping_list
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Shopping_list we want to update
     *   }
     * })
     */
    upsert<T extends shopping_listUpsertArgs>(args: SelectSubset<T, shopping_listUpsertArgs<ExtArgs>>): Prisma__shopping_listClient<$Result.GetResult<Prisma.$shopping_listPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Shopping_lists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {shopping_listCountArgs} args - Arguments to filter Shopping_lists to count.
     * @example
     * // Count the number of Shopping_lists
     * const count = await prisma.shopping_list.count({
     *   where: {
     *     // ... the filter for the Shopping_lists we want to count
     *   }
     * })
    **/
    count<T extends shopping_listCountArgs>(
      args?: Subset<T, shopping_listCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Shopping_listCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Shopping_list.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Shopping_listAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Shopping_listAggregateArgs>(args: Subset<T, Shopping_listAggregateArgs>): Prisma.PrismaPromise<GetShopping_listAggregateType<T>>

    /**
     * Group by Shopping_list.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {shopping_listGroupByArgs} args - Group by arguments.
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
      T extends shopping_listGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: shopping_listGroupByArgs['orderBy'] }
        : { orderBy?: shopping_listGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, shopping_listGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShopping_listGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the shopping_list model
   */
  readonly fields: shopping_listFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for shopping_list.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__shopping_listClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    item_in_list<T extends shopping_list$item_in_listArgs<ExtArgs> = {}>(args?: Subset<T, shopping_list$item_in_listArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$item_in_listPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    location<T extends shopping_list$locationArgs<ExtArgs> = {}>(args?: Subset<T, shopping_list$locationArgs<ExtArgs>>): Prisma__locationClient<$Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the shopping_list model
   */
  interface shopping_listFieldRefs {
    readonly shopping_list_id: FieldRef<"shopping_list", 'Int'>
    readonly location_id: FieldRef<"shopping_list", 'Int'>
    readonly paid: FieldRef<"shopping_list", 'Boolean'>
    readonly completed_at: FieldRef<"shopping_list", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * shopping_list findUnique
   */
  export type shopping_listFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shopping_list
     */
    select?: shopping_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shopping_list
     */
    omit?: shopping_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: shopping_listInclude<ExtArgs> | null
    /**
     * Filter, which shopping_list to fetch.
     */
    where: shopping_listWhereUniqueInput
  }

  /**
   * shopping_list findUniqueOrThrow
   */
  export type shopping_listFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shopping_list
     */
    select?: shopping_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shopping_list
     */
    omit?: shopping_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: shopping_listInclude<ExtArgs> | null
    /**
     * Filter, which shopping_list to fetch.
     */
    where: shopping_listWhereUniqueInput
  }

  /**
   * shopping_list findFirst
   */
  export type shopping_listFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shopping_list
     */
    select?: shopping_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shopping_list
     */
    omit?: shopping_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: shopping_listInclude<ExtArgs> | null
    /**
     * Filter, which shopping_list to fetch.
     */
    where?: shopping_listWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of shopping_lists to fetch.
     */
    orderBy?: shopping_listOrderByWithRelationInput | shopping_listOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for shopping_lists.
     */
    cursor?: shopping_listWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` shopping_lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` shopping_lists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of shopping_lists.
     */
    distinct?: Shopping_listScalarFieldEnum | Shopping_listScalarFieldEnum[]
  }

  /**
   * shopping_list findFirstOrThrow
   */
  export type shopping_listFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shopping_list
     */
    select?: shopping_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shopping_list
     */
    omit?: shopping_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: shopping_listInclude<ExtArgs> | null
    /**
     * Filter, which shopping_list to fetch.
     */
    where?: shopping_listWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of shopping_lists to fetch.
     */
    orderBy?: shopping_listOrderByWithRelationInput | shopping_listOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for shopping_lists.
     */
    cursor?: shopping_listWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` shopping_lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` shopping_lists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of shopping_lists.
     */
    distinct?: Shopping_listScalarFieldEnum | Shopping_listScalarFieldEnum[]
  }

  /**
   * shopping_list findMany
   */
  export type shopping_listFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shopping_list
     */
    select?: shopping_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shopping_list
     */
    omit?: shopping_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: shopping_listInclude<ExtArgs> | null
    /**
     * Filter, which shopping_lists to fetch.
     */
    where?: shopping_listWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of shopping_lists to fetch.
     */
    orderBy?: shopping_listOrderByWithRelationInput | shopping_listOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing shopping_lists.
     */
    cursor?: shopping_listWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` shopping_lists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` shopping_lists.
     */
    skip?: number
    distinct?: Shopping_listScalarFieldEnum | Shopping_listScalarFieldEnum[]
  }

  /**
   * shopping_list create
   */
  export type shopping_listCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shopping_list
     */
    select?: shopping_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shopping_list
     */
    omit?: shopping_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: shopping_listInclude<ExtArgs> | null
    /**
     * The data needed to create a shopping_list.
     */
    data?: XOR<shopping_listCreateInput, shopping_listUncheckedCreateInput>
  }

  /**
   * shopping_list createMany
   */
  export type shopping_listCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many shopping_lists.
     */
    data: shopping_listCreateManyInput | shopping_listCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * shopping_list update
   */
  export type shopping_listUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shopping_list
     */
    select?: shopping_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shopping_list
     */
    omit?: shopping_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: shopping_listInclude<ExtArgs> | null
    /**
     * The data needed to update a shopping_list.
     */
    data: XOR<shopping_listUpdateInput, shopping_listUncheckedUpdateInput>
    /**
     * Choose, which shopping_list to update.
     */
    where: shopping_listWhereUniqueInput
  }

  /**
   * shopping_list updateMany
   */
  export type shopping_listUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update shopping_lists.
     */
    data: XOR<shopping_listUpdateManyMutationInput, shopping_listUncheckedUpdateManyInput>
    /**
     * Filter which shopping_lists to update
     */
    where?: shopping_listWhereInput
    /**
     * Limit how many shopping_lists to update.
     */
    limit?: number
  }

  /**
   * shopping_list upsert
   */
  export type shopping_listUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shopping_list
     */
    select?: shopping_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shopping_list
     */
    omit?: shopping_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: shopping_listInclude<ExtArgs> | null
    /**
     * The filter to search for the shopping_list to update in case it exists.
     */
    where: shopping_listWhereUniqueInput
    /**
     * In case the shopping_list found by the `where` argument doesn't exist, create a new shopping_list with this data.
     */
    create: XOR<shopping_listCreateInput, shopping_listUncheckedCreateInput>
    /**
     * In case the shopping_list was found with the provided `where` argument, update it with this data.
     */
    update: XOR<shopping_listUpdateInput, shopping_listUncheckedUpdateInput>
  }

  /**
   * shopping_list delete
   */
  export type shopping_listDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shopping_list
     */
    select?: shopping_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shopping_list
     */
    omit?: shopping_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: shopping_listInclude<ExtArgs> | null
    /**
     * Filter which shopping_list to delete.
     */
    where: shopping_listWhereUniqueInput
  }

  /**
   * shopping_list deleteMany
   */
  export type shopping_listDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which shopping_lists to delete
     */
    where?: shopping_listWhereInput
    /**
     * Limit how many shopping_lists to delete.
     */
    limit?: number
  }

  /**
   * shopping_list.item_in_list
   */
  export type shopping_list$item_in_listArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_in_list
     */
    select?: item_in_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_in_list
     */
    omit?: item_in_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_in_listInclude<ExtArgs> | null
    where?: item_in_listWhereInput
    orderBy?: item_in_listOrderByWithRelationInput | item_in_listOrderByWithRelationInput[]
    cursor?: item_in_listWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Item_in_listScalarFieldEnum | Item_in_listScalarFieldEnum[]
  }

  /**
   * shopping_list.location
   */
  export type shopping_list$locationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the location
     */
    omit?: locationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null
    where?: locationWhereInput
  }

  /**
   * shopping_list without action
   */
  export type shopping_listDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shopping_list
     */
    select?: shopping_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shopping_list
     */
    omit?: shopping_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: shopping_listInclude<ExtArgs> | null
  }


  /**
   * Model store_section
   */

  export type AggregateStore_section = {
    _count: Store_sectionCountAggregateOutputType | null
    _avg: Store_sectionAvgAggregateOutputType | null
    _sum: Store_sectionSumAggregateOutputType | null
    _min: Store_sectionMinAggregateOutputType | null
    _max: Store_sectionMaxAggregateOutputType | null
  }

  export type Store_sectionAvgAggregateOutputType = {
    section_id: number | null
    location_id: number | null
    sort_order: number | null
  }

  export type Store_sectionSumAggregateOutputType = {
    section_id: number | null
    location_id: number | null
    sort_order: number | null
  }

  export type Store_sectionMinAggregateOutputType = {
    section_id: number | null
    location_id: number | null
    name: string | null
    sort_order: number | null
  }

  export type Store_sectionMaxAggregateOutputType = {
    section_id: number | null
    location_id: number | null
    name: string | null
    sort_order: number | null
  }

  export type Store_sectionCountAggregateOutputType = {
    section_id: number
    location_id: number
    name: number
    sort_order: number
    _all: number
  }


  export type Store_sectionAvgAggregateInputType = {
    section_id?: true
    location_id?: true
    sort_order?: true
  }

  export type Store_sectionSumAggregateInputType = {
    section_id?: true
    location_id?: true
    sort_order?: true
  }

  export type Store_sectionMinAggregateInputType = {
    section_id?: true
    location_id?: true
    name?: true
    sort_order?: true
  }

  export type Store_sectionMaxAggregateInputType = {
    section_id?: true
    location_id?: true
    name?: true
    sort_order?: true
  }

  export type Store_sectionCountAggregateInputType = {
    section_id?: true
    location_id?: true
    name?: true
    sort_order?: true
    _all?: true
  }

  export type Store_sectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which store_section to aggregate.
     */
    where?: store_sectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of store_sections to fetch.
     */
    orderBy?: store_sectionOrderByWithRelationInput | store_sectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: store_sectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` store_sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` store_sections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned store_sections
    **/
    _count?: true | Store_sectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Store_sectionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Store_sectionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Store_sectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Store_sectionMaxAggregateInputType
  }

  export type GetStore_sectionAggregateType<T extends Store_sectionAggregateArgs> = {
        [P in keyof T & keyof AggregateStore_section]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStore_section[P]>
      : GetScalarType<T[P], AggregateStore_section[P]>
  }




  export type store_sectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: store_sectionWhereInput
    orderBy?: store_sectionOrderByWithAggregationInput | store_sectionOrderByWithAggregationInput[]
    by: Store_sectionScalarFieldEnum[] | Store_sectionScalarFieldEnum
    having?: store_sectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Store_sectionCountAggregateInputType | true
    _avg?: Store_sectionAvgAggregateInputType
    _sum?: Store_sectionSumAggregateInputType
    _min?: Store_sectionMinAggregateInputType
    _max?: Store_sectionMaxAggregateInputType
  }

  export type Store_sectionGroupByOutputType = {
    section_id: number
    location_id: number | null
    name: string | null
    sort_order: number | null
    _count: Store_sectionCountAggregateOutputType | null
    _avg: Store_sectionAvgAggregateOutputType | null
    _sum: Store_sectionSumAggregateOutputType | null
    _min: Store_sectionMinAggregateOutputType | null
    _max: Store_sectionMaxAggregateOutputType | null
  }

  type GetStore_sectionGroupByPayload<T extends store_sectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Store_sectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Store_sectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Store_sectionGroupByOutputType[P]>
            : GetScalarType<T[P], Store_sectionGroupByOutputType[P]>
        }
      >
    >


  export type store_sectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    section_id?: boolean
    location_id?: boolean
    name?: boolean
    sort_order?: boolean
    item?: boolean | store_section$itemArgs<ExtArgs>
    location?: boolean | store_section$locationArgs<ExtArgs>
    _count?: boolean | Store_sectionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["store_section"]>



  export type store_sectionSelectScalar = {
    section_id?: boolean
    location_id?: boolean
    name?: boolean
    sort_order?: boolean
  }

  export type store_sectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"section_id" | "location_id" | "name" | "sort_order", ExtArgs["result"]["store_section"]>
  export type store_sectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | store_section$itemArgs<ExtArgs>
    location?: boolean | store_section$locationArgs<ExtArgs>
    _count?: boolean | Store_sectionCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $store_sectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "store_section"
    objects: {
      item: Prisma.$itemPayload<ExtArgs>[]
      location: Prisma.$locationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      section_id: number
      location_id: number | null
      name: string | null
      sort_order: number | null
    }, ExtArgs["result"]["store_section"]>
    composites: {}
  }

  type store_sectionGetPayload<S extends boolean | null | undefined | store_sectionDefaultArgs> = $Result.GetResult<Prisma.$store_sectionPayload, S>

  type store_sectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<store_sectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Store_sectionCountAggregateInputType | true
    }

  export interface store_sectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['store_section'], meta: { name: 'store_section' } }
    /**
     * Find zero or one Store_section that matches the filter.
     * @param {store_sectionFindUniqueArgs} args - Arguments to find a Store_section
     * @example
     * // Get one Store_section
     * const store_section = await prisma.store_section.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends store_sectionFindUniqueArgs>(args: SelectSubset<T, store_sectionFindUniqueArgs<ExtArgs>>): Prisma__store_sectionClient<$Result.GetResult<Prisma.$store_sectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Store_section that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {store_sectionFindUniqueOrThrowArgs} args - Arguments to find a Store_section
     * @example
     * // Get one Store_section
     * const store_section = await prisma.store_section.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends store_sectionFindUniqueOrThrowArgs>(args: SelectSubset<T, store_sectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__store_sectionClient<$Result.GetResult<Prisma.$store_sectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Store_section that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {store_sectionFindFirstArgs} args - Arguments to find a Store_section
     * @example
     * // Get one Store_section
     * const store_section = await prisma.store_section.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends store_sectionFindFirstArgs>(args?: SelectSubset<T, store_sectionFindFirstArgs<ExtArgs>>): Prisma__store_sectionClient<$Result.GetResult<Prisma.$store_sectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Store_section that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {store_sectionFindFirstOrThrowArgs} args - Arguments to find a Store_section
     * @example
     * // Get one Store_section
     * const store_section = await prisma.store_section.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends store_sectionFindFirstOrThrowArgs>(args?: SelectSubset<T, store_sectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__store_sectionClient<$Result.GetResult<Prisma.$store_sectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Store_sections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {store_sectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Store_sections
     * const store_sections = await prisma.store_section.findMany()
     * 
     * // Get first 10 Store_sections
     * const store_sections = await prisma.store_section.findMany({ take: 10 })
     * 
     * // Only select the `section_id`
     * const store_sectionWithSection_idOnly = await prisma.store_section.findMany({ select: { section_id: true } })
     * 
     */
    findMany<T extends store_sectionFindManyArgs>(args?: SelectSubset<T, store_sectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$store_sectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Store_section.
     * @param {store_sectionCreateArgs} args - Arguments to create a Store_section.
     * @example
     * // Create one Store_section
     * const Store_section = await prisma.store_section.create({
     *   data: {
     *     // ... data to create a Store_section
     *   }
     * })
     * 
     */
    create<T extends store_sectionCreateArgs>(args: SelectSubset<T, store_sectionCreateArgs<ExtArgs>>): Prisma__store_sectionClient<$Result.GetResult<Prisma.$store_sectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Store_sections.
     * @param {store_sectionCreateManyArgs} args - Arguments to create many Store_sections.
     * @example
     * // Create many Store_sections
     * const store_section = await prisma.store_section.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends store_sectionCreateManyArgs>(args?: SelectSubset<T, store_sectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Store_section.
     * @param {store_sectionDeleteArgs} args - Arguments to delete one Store_section.
     * @example
     * // Delete one Store_section
     * const Store_section = await prisma.store_section.delete({
     *   where: {
     *     // ... filter to delete one Store_section
     *   }
     * })
     * 
     */
    delete<T extends store_sectionDeleteArgs>(args: SelectSubset<T, store_sectionDeleteArgs<ExtArgs>>): Prisma__store_sectionClient<$Result.GetResult<Prisma.$store_sectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Store_section.
     * @param {store_sectionUpdateArgs} args - Arguments to update one Store_section.
     * @example
     * // Update one Store_section
     * const store_section = await prisma.store_section.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends store_sectionUpdateArgs>(args: SelectSubset<T, store_sectionUpdateArgs<ExtArgs>>): Prisma__store_sectionClient<$Result.GetResult<Prisma.$store_sectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Store_sections.
     * @param {store_sectionDeleteManyArgs} args - Arguments to filter Store_sections to delete.
     * @example
     * // Delete a few Store_sections
     * const { count } = await prisma.store_section.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends store_sectionDeleteManyArgs>(args?: SelectSubset<T, store_sectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Store_sections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {store_sectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Store_sections
     * const store_section = await prisma.store_section.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends store_sectionUpdateManyArgs>(args: SelectSubset<T, store_sectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Store_section.
     * @param {store_sectionUpsertArgs} args - Arguments to update or create a Store_section.
     * @example
     * // Update or create a Store_section
     * const store_section = await prisma.store_section.upsert({
     *   create: {
     *     // ... data to create a Store_section
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Store_section we want to update
     *   }
     * })
     */
    upsert<T extends store_sectionUpsertArgs>(args: SelectSubset<T, store_sectionUpsertArgs<ExtArgs>>): Prisma__store_sectionClient<$Result.GetResult<Prisma.$store_sectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Store_sections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {store_sectionCountArgs} args - Arguments to filter Store_sections to count.
     * @example
     * // Count the number of Store_sections
     * const count = await prisma.store_section.count({
     *   where: {
     *     // ... the filter for the Store_sections we want to count
     *   }
     * })
    **/
    count<T extends store_sectionCountArgs>(
      args?: Subset<T, store_sectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Store_sectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Store_section.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Store_sectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Store_sectionAggregateArgs>(args: Subset<T, Store_sectionAggregateArgs>): Prisma.PrismaPromise<GetStore_sectionAggregateType<T>>

    /**
     * Group by Store_section.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {store_sectionGroupByArgs} args - Group by arguments.
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
      T extends store_sectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: store_sectionGroupByArgs['orderBy'] }
        : { orderBy?: store_sectionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, store_sectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStore_sectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the store_section model
   */
  readonly fields: store_sectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for store_section.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__store_sectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    item<T extends store_section$itemArgs<ExtArgs> = {}>(args?: Subset<T, store_section$itemArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$itemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    location<T extends store_section$locationArgs<ExtArgs> = {}>(args?: Subset<T, store_section$locationArgs<ExtArgs>>): Prisma__locationClient<$Result.GetResult<Prisma.$locationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the store_section model
   */
  interface store_sectionFieldRefs {
    readonly section_id: FieldRef<"store_section", 'Int'>
    readonly location_id: FieldRef<"store_section", 'Int'>
    readonly name: FieldRef<"store_section", 'String'>
    readonly sort_order: FieldRef<"store_section", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * store_section findUnique
   */
  export type store_sectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store_section
     */
    select?: store_sectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store_section
     */
    omit?: store_sectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: store_sectionInclude<ExtArgs> | null
    /**
     * Filter, which store_section to fetch.
     */
    where: store_sectionWhereUniqueInput
  }

  /**
   * store_section findUniqueOrThrow
   */
  export type store_sectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store_section
     */
    select?: store_sectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store_section
     */
    omit?: store_sectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: store_sectionInclude<ExtArgs> | null
    /**
     * Filter, which store_section to fetch.
     */
    where: store_sectionWhereUniqueInput
  }

  /**
   * store_section findFirst
   */
  export type store_sectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store_section
     */
    select?: store_sectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store_section
     */
    omit?: store_sectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: store_sectionInclude<ExtArgs> | null
    /**
     * Filter, which store_section to fetch.
     */
    where?: store_sectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of store_sections to fetch.
     */
    orderBy?: store_sectionOrderByWithRelationInput | store_sectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for store_sections.
     */
    cursor?: store_sectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` store_sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` store_sections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of store_sections.
     */
    distinct?: Store_sectionScalarFieldEnum | Store_sectionScalarFieldEnum[]
  }

  /**
   * store_section findFirstOrThrow
   */
  export type store_sectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store_section
     */
    select?: store_sectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store_section
     */
    omit?: store_sectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: store_sectionInclude<ExtArgs> | null
    /**
     * Filter, which store_section to fetch.
     */
    where?: store_sectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of store_sections to fetch.
     */
    orderBy?: store_sectionOrderByWithRelationInput | store_sectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for store_sections.
     */
    cursor?: store_sectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` store_sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` store_sections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of store_sections.
     */
    distinct?: Store_sectionScalarFieldEnum | Store_sectionScalarFieldEnum[]
  }

  /**
   * store_section findMany
   */
  export type store_sectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store_section
     */
    select?: store_sectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store_section
     */
    omit?: store_sectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: store_sectionInclude<ExtArgs> | null
    /**
     * Filter, which store_sections to fetch.
     */
    where?: store_sectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of store_sections to fetch.
     */
    orderBy?: store_sectionOrderByWithRelationInput | store_sectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing store_sections.
     */
    cursor?: store_sectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` store_sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` store_sections.
     */
    skip?: number
    distinct?: Store_sectionScalarFieldEnum | Store_sectionScalarFieldEnum[]
  }

  /**
   * store_section create
   */
  export type store_sectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store_section
     */
    select?: store_sectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store_section
     */
    omit?: store_sectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: store_sectionInclude<ExtArgs> | null
    /**
     * The data needed to create a store_section.
     */
    data?: XOR<store_sectionCreateInput, store_sectionUncheckedCreateInput>
  }

  /**
   * store_section createMany
   */
  export type store_sectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many store_sections.
     */
    data: store_sectionCreateManyInput | store_sectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * store_section update
   */
  export type store_sectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store_section
     */
    select?: store_sectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store_section
     */
    omit?: store_sectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: store_sectionInclude<ExtArgs> | null
    /**
     * The data needed to update a store_section.
     */
    data: XOR<store_sectionUpdateInput, store_sectionUncheckedUpdateInput>
    /**
     * Choose, which store_section to update.
     */
    where: store_sectionWhereUniqueInput
  }

  /**
   * store_section updateMany
   */
  export type store_sectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update store_sections.
     */
    data: XOR<store_sectionUpdateManyMutationInput, store_sectionUncheckedUpdateManyInput>
    /**
     * Filter which store_sections to update
     */
    where?: store_sectionWhereInput
    /**
     * Limit how many store_sections to update.
     */
    limit?: number
  }

  /**
   * store_section upsert
   */
  export type store_sectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store_section
     */
    select?: store_sectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store_section
     */
    omit?: store_sectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: store_sectionInclude<ExtArgs> | null
    /**
     * The filter to search for the store_section to update in case it exists.
     */
    where: store_sectionWhereUniqueInput
    /**
     * In case the store_section found by the `where` argument doesn't exist, create a new store_section with this data.
     */
    create: XOR<store_sectionCreateInput, store_sectionUncheckedCreateInput>
    /**
     * In case the store_section was found with the provided `where` argument, update it with this data.
     */
    update: XOR<store_sectionUpdateInput, store_sectionUncheckedUpdateInput>
  }

  /**
   * store_section delete
   */
  export type store_sectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store_section
     */
    select?: store_sectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store_section
     */
    omit?: store_sectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: store_sectionInclude<ExtArgs> | null
    /**
     * Filter which store_section to delete.
     */
    where: store_sectionWhereUniqueInput
  }

  /**
   * store_section deleteMany
   */
  export type store_sectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which store_sections to delete
     */
    where?: store_sectionWhereInput
    /**
     * Limit how many store_sections to delete.
     */
    limit?: number
  }

  /**
   * store_section.item
   */
  export type store_section$itemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item
     */
    select?: itemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item
     */
    omit?: itemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: itemInclude<ExtArgs> | null
    where?: itemWhereInput
    orderBy?: itemOrderByWithRelationInput | itemOrderByWithRelationInput[]
    cursor?: itemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * store_section.location
   */
  export type store_section$locationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the location
     */
    select?: locationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the location
     */
    omit?: locationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: locationInclude<ExtArgs> | null
    where?: locationWhereInput
  }

  /**
   * store_section without action
   */
  export type store_sectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the store_section
     */
    select?: store_sectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the store_section
     */
    omit?: store_sectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: store_sectionInclude<ExtArgs> | null
  }


  /**
   * Model user
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    user_id: number | null
  }

  export type UserSumAggregateOutputType = {
    user_id: number | null
  }

  export type UserMinAggregateOutputType = {
    user_id: number | null
    name: string | null
    role: string | null
    auth_key: string | null
  }

  export type UserMaxAggregateOutputType = {
    user_id: number | null
    name: string | null
    role: string | null
    auth_key: string | null
  }

  export type UserCountAggregateOutputType = {
    user_id: number
    name: number
    role: number
    auth_key: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    user_id?: true
  }

  export type UserSumAggregateInputType = {
    user_id?: true
  }

  export type UserMinAggregateInputType = {
    user_id?: true
    name?: true
    role?: true
    auth_key?: true
  }

  export type UserMaxAggregateInputType = {
    user_id?: true
    name?: true
    role?: true
    auth_key?: true
  }

  export type UserCountAggregateInputType = {
    user_id?: true
    name?: true
    role?: true
    auth_key?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user to aggregate.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
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




  export type userGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: userWhereInput
    orderBy?: userOrderByWithAggregationInput | userOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: userScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    user_id: number
    name: string | null
    role: string
    auth_key: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends userGroupByArgs> = Prisma.PrismaPromise<
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


  export type userSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    name?: boolean
    role?: boolean
    auth_key?: boolean
    item_in_list?: boolean | user$item_in_listArgs<ExtArgs>
    item_favorite?: boolean | user$item_favoriteArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type userSelectScalar = {
    user_id?: boolean
    name?: boolean
    role?: boolean
    auth_key?: boolean
  }

  export type userOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "name" | "role" | "auth_key", ExtArgs["result"]["user"]>
  export type userInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item_in_list?: boolean | user$item_in_listArgs<ExtArgs>
    item_favorite?: boolean | user$item_favoriteArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $userPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user"
    objects: {
      item_in_list: Prisma.$item_in_listPayload<ExtArgs>[]
      item_favorite: Prisma.$item_favoritePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: number
      name: string | null
      role: string
      auth_key: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type userGetPayload<S extends boolean | null | undefined | userDefaultArgs> = $Result.GetResult<Prisma.$userPayload, S>

  type userCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<userFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface userDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user'], meta: { name: 'user' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {userFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends userFindUniqueArgs>(args: SelectSubset<T, userFindUniqueArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {userFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends userFindUniqueOrThrowArgs>(args: SelectSubset<T, userFindUniqueOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends userFindFirstArgs>(args?: SelectSubset<T, userFindFirstArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends userFindFirstOrThrowArgs>(args?: SelectSubset<T, userFindFirstOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const userWithUser_idOnly = await prisma.user.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends userFindManyArgs>(args?: SelectSubset<T, userFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {userCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends userCreateArgs>(args: SelectSubset<T, userCreateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {userCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends userCreateManyArgs>(args?: SelectSubset<T, userCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {userDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends userDeleteArgs>(args: SelectSubset<T, userDeleteArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {userUpdateArgs} args - Arguments to update one User.
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
    update<T extends userUpdateArgs>(args: SelectSubset<T, userUpdateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {userDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends userDeleteManyArgs>(args?: SelectSubset<T, userDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userUpdateManyArgs} args - Arguments to update one or more rows.
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
    updateMany<T extends userUpdateManyArgs>(args: SelectSubset<T, userUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {userUpsertArgs} args - Arguments to update or create a User.
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
    upsert<T extends userUpsertArgs>(args: SelectSubset<T, userUpsertArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends userCountArgs>(
      args?: Subset<T, userCountArgs>,
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
     * @param {userGroupByArgs} args - Group by arguments.
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
      T extends userGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: userGroupByArgs['orderBy'] }
        : { orderBy?: userGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, userGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user model
   */
  readonly fields: userFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__userClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    item_in_list<T extends user$item_in_listArgs<ExtArgs> = {}>(args?: Subset<T, user$item_in_listArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$item_in_listPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    item_favorite<T extends user$item_favoriteArgs<ExtArgs> = {}>(args?: Subset<T, user$item_favoriteArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$item_favoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the user model
   */
  interface userFieldRefs {
    readonly user_id: FieldRef<"user", 'Int'>
    readonly name: FieldRef<"user", 'String'>
    readonly role: FieldRef<"user", 'String'>
    readonly auth_key: FieldRef<"user", 'String'>
  }
    

  // Custom InputTypes
  /**
   * user findUnique
   */
  export type userFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findUniqueOrThrow
   */
  export type userFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findFirst
   */
  export type userFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findFirstOrThrow
   */
  export type userFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findMany
   */
  export type userFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user create
   */
  export type userCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to create a user.
     */
    data?: XOR<userCreateInput, userUncheckedCreateInput>
  }

  /**
   * user createMany
   */
  export type userCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user update
   */
  export type userUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to update a user.
     */
    data: XOR<userUpdateInput, userUncheckedUpdateInput>
    /**
     * Choose, which user to update.
     */
    where: userWhereUniqueInput
  }

  /**
   * user updateMany
   */
  export type userUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * user upsert
   */
  export type userUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The filter to search for the user to update in case it exists.
     */
    where: userWhereUniqueInput
    /**
     * In case the user found by the `where` argument doesn't exist, create a new user with this data.
     */
    create: XOR<userCreateInput, userUncheckedCreateInput>
    /**
     * In case the user was found with the provided `where` argument, update it with this data.
     */
    update: XOR<userUpdateInput, userUncheckedUpdateInput>
  }

  /**
   * user delete
   */
  export type userDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter which user to delete.
     */
    where: userWhereUniqueInput
  }

  /**
   * user deleteMany
   */
  export type userDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: userWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * user.item_in_list
   */
  export type user$item_in_listArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_in_list
     */
    select?: item_in_listSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_in_list
     */
    omit?: item_in_listOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_in_listInclude<ExtArgs> | null
    where?: item_in_listWhereInput
    orderBy?: item_in_listOrderByWithRelationInput | item_in_listOrderByWithRelationInput[]
    cursor?: item_in_listWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Item_in_listScalarFieldEnum | Item_in_listScalarFieldEnum[]
  }

  /**
   * user.item_favorite
   */
  export type user$item_favoriteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the item_favorite
     */
    select?: item_favoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the item_favorite
     */
    omit?: item_favoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: item_favoriteInclude<ExtArgs> | null
    where?: item_favoriteWhereInput
    orderBy?: item_favoriteOrderByWithRelationInput | item_favoriteOrderByWithRelationInput[]
    cursor?: item_favoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Item_favoriteScalarFieldEnum | Item_favoriteScalarFieldEnum[]
  }

  /**
   * user without action
   */
  export type userDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
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


  export const LocationScalarFieldEnum: {
    location_id: 'location_id',
    name: 'name',
    address: 'address'
  };

  export type LocationScalarFieldEnum = (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum]


  export const ItemScalarFieldEnum: {
    item_id: 'item_id',
    name: 'name',
    image_path: 'image_path',
    section_id: 'section_id',
    location_id: 'location_id'
  };

  export type ItemScalarFieldEnum = (typeof ItemScalarFieldEnum)[keyof typeof ItemScalarFieldEnum]


  export const Item_in_listScalarFieldEnum: {
    item_in_list_id: 'item_in_list_id',
    item_id: 'item_id',
    shopping_list_id: 'shopping_list_id',
    buyer_id: 'buyer_id',
    quantity: 'quantity',
    discount_price: 'discount_price',
    status_id: 'status_id'
  };

  export type Item_in_listScalarFieldEnum = (typeof Item_in_listScalarFieldEnum)[keyof typeof Item_in_listScalarFieldEnum]


  export const Item_price_historyScalarFieldEnum: {
    item_price_history_id: 'item_price_history_id',
    item_id: 'item_id',
    price: 'price',
    effective_date: 'effective_date'
  };

  export type Item_price_historyScalarFieldEnum = (typeof Item_price_historyScalarFieldEnum)[keyof typeof Item_price_historyScalarFieldEnum]


  export const Item_statusScalarFieldEnum: {
    status_id: 'status_id',
    name: 'name'
  };

  export type Item_statusScalarFieldEnum = (typeof Item_statusScalarFieldEnum)[keyof typeof Item_statusScalarFieldEnum]


  export const Item_favoriteScalarFieldEnum: {
    user_id: 'user_id',
    item_id: 'item_id'
  };

  export type Item_favoriteScalarFieldEnum = (typeof Item_favoriteScalarFieldEnum)[keyof typeof Item_favoriteScalarFieldEnum]


  export const Shopping_listScalarFieldEnum: {
    shopping_list_id: 'shopping_list_id',
    location_id: 'location_id',
    paid: 'paid',
    completed_at: 'completed_at'
  };

  export type Shopping_listScalarFieldEnum = (typeof Shopping_listScalarFieldEnum)[keyof typeof Shopping_listScalarFieldEnum]


  export const Store_sectionScalarFieldEnum: {
    section_id: 'section_id',
    location_id: 'location_id',
    name: 'name',
    sort_order: 'sort_order'
  };

  export type Store_sectionScalarFieldEnum = (typeof Store_sectionScalarFieldEnum)[keyof typeof Store_sectionScalarFieldEnum]


  export const UserScalarFieldEnum: {
    user_id: 'user_id',
    name: 'name',
    role: 'role',
    auth_key: 'auth_key'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const locationOrderByRelevanceFieldEnum: {
    name: 'name',
    address: 'address'
  };

  export type locationOrderByRelevanceFieldEnum = (typeof locationOrderByRelevanceFieldEnum)[keyof typeof locationOrderByRelevanceFieldEnum]


  export const itemOrderByRelevanceFieldEnum: {
    name: 'name',
    image_path: 'image_path'
  };

  export type itemOrderByRelevanceFieldEnum = (typeof itemOrderByRelevanceFieldEnum)[keyof typeof itemOrderByRelevanceFieldEnum]


  export const item_statusOrderByRelevanceFieldEnum: {
    name: 'name'
  };

  export type item_statusOrderByRelevanceFieldEnum = (typeof item_statusOrderByRelevanceFieldEnum)[keyof typeof item_statusOrderByRelevanceFieldEnum]


  export const store_sectionOrderByRelevanceFieldEnum: {
    name: 'name'
  };

  export type store_sectionOrderByRelevanceFieldEnum = (typeof store_sectionOrderByRelevanceFieldEnum)[keyof typeof store_sectionOrderByRelevanceFieldEnum]


  export const userOrderByRelevanceFieldEnum: {
    name: 'name',
    role: 'role',
    auth_key: 'auth_key'
  };

  export type userOrderByRelevanceFieldEnum = (typeof userOrderByRelevanceFieldEnum)[keyof typeof userOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type locationWhereInput = {
    AND?: locationWhereInput | locationWhereInput[]
    OR?: locationWhereInput[]
    NOT?: locationWhereInput | locationWhereInput[]
    location_id?: IntFilter<"location"> | number
    name?: StringNullableFilter<"location"> | string | null
    address?: StringNullableFilter<"location"> | string | null
    item?: ItemListRelationFilter
    shopping_list?: Shopping_listListRelationFilter
    store_section?: Store_sectionListRelationFilter
  }

  export type locationOrderByWithRelationInput = {
    location_id?: SortOrder
    name?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    item?: itemOrderByRelationAggregateInput
    shopping_list?: shopping_listOrderByRelationAggregateInput
    store_section?: store_sectionOrderByRelationAggregateInput
    _relevance?: locationOrderByRelevanceInput
  }

  export type locationWhereUniqueInput = Prisma.AtLeast<{
    location_id?: number
    AND?: locationWhereInput | locationWhereInput[]
    OR?: locationWhereInput[]
    NOT?: locationWhereInput | locationWhereInput[]
    name?: StringNullableFilter<"location"> | string | null
    address?: StringNullableFilter<"location"> | string | null
    item?: ItemListRelationFilter
    shopping_list?: Shopping_listListRelationFilter
    store_section?: Store_sectionListRelationFilter
  }, "location_id">

  export type locationOrderByWithAggregationInput = {
    location_id?: SortOrder
    name?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    _count?: locationCountOrderByAggregateInput
    _avg?: locationAvgOrderByAggregateInput
    _max?: locationMaxOrderByAggregateInput
    _min?: locationMinOrderByAggregateInput
    _sum?: locationSumOrderByAggregateInput
  }

  export type locationScalarWhereWithAggregatesInput = {
    AND?: locationScalarWhereWithAggregatesInput | locationScalarWhereWithAggregatesInput[]
    OR?: locationScalarWhereWithAggregatesInput[]
    NOT?: locationScalarWhereWithAggregatesInput | locationScalarWhereWithAggregatesInput[]
    location_id?: IntWithAggregatesFilter<"location"> | number
    name?: StringNullableWithAggregatesFilter<"location"> | string | null
    address?: StringNullableWithAggregatesFilter<"location"> | string | null
  }

  export type itemWhereInput = {
    AND?: itemWhereInput | itemWhereInput[]
    OR?: itemWhereInput[]
    NOT?: itemWhereInput | itemWhereInput[]
    item_id?: IntFilter<"item"> | number
    name?: StringNullableFilter<"item"> | string | null
    image_path?: StringNullableFilter<"item"> | string | null
    section_id?: IntNullableFilter<"item"> | number | null
    location_id?: IntNullableFilter<"item"> | number | null
    location?: XOR<LocationNullableScalarRelationFilter, locationWhereInput> | null
    store_section?: XOR<Store_sectionNullableScalarRelationFilter, store_sectionWhereInput> | null
    item_in_list?: Item_in_listListRelationFilter
    item_price_history?: Item_price_historyListRelationFilter
    item_favorite?: Item_favoriteListRelationFilter
  }

  export type itemOrderByWithRelationInput = {
    item_id?: SortOrder
    name?: SortOrderInput | SortOrder
    image_path?: SortOrderInput | SortOrder
    section_id?: SortOrderInput | SortOrder
    location_id?: SortOrderInput | SortOrder
    location?: locationOrderByWithRelationInput
    store_section?: store_sectionOrderByWithRelationInput
    item_in_list?: item_in_listOrderByRelationAggregateInput
    item_price_history?: item_price_historyOrderByRelationAggregateInput
    item_favorite?: item_favoriteOrderByRelationAggregateInput
    _relevance?: itemOrderByRelevanceInput
  }

  export type itemWhereUniqueInput = Prisma.AtLeast<{
    item_id?: number
    AND?: itemWhereInput | itemWhereInput[]
    OR?: itemWhereInput[]
    NOT?: itemWhereInput | itemWhereInput[]
    name?: StringNullableFilter<"item"> | string | null
    image_path?: StringNullableFilter<"item"> | string | null
    section_id?: IntNullableFilter<"item"> | number | null
    location_id?: IntNullableFilter<"item"> | number | null
    location?: XOR<LocationNullableScalarRelationFilter, locationWhereInput> | null
    store_section?: XOR<Store_sectionNullableScalarRelationFilter, store_sectionWhereInput> | null
    item_in_list?: Item_in_listListRelationFilter
    item_price_history?: Item_price_historyListRelationFilter
    item_favorite?: Item_favoriteListRelationFilter
  }, "item_id">

  export type itemOrderByWithAggregationInput = {
    item_id?: SortOrder
    name?: SortOrderInput | SortOrder
    image_path?: SortOrderInput | SortOrder
    section_id?: SortOrderInput | SortOrder
    location_id?: SortOrderInput | SortOrder
    _count?: itemCountOrderByAggregateInput
    _avg?: itemAvgOrderByAggregateInput
    _max?: itemMaxOrderByAggregateInput
    _min?: itemMinOrderByAggregateInput
    _sum?: itemSumOrderByAggregateInput
  }

  export type itemScalarWhereWithAggregatesInput = {
    AND?: itemScalarWhereWithAggregatesInput | itemScalarWhereWithAggregatesInput[]
    OR?: itemScalarWhereWithAggregatesInput[]
    NOT?: itemScalarWhereWithAggregatesInput | itemScalarWhereWithAggregatesInput[]
    item_id?: IntWithAggregatesFilter<"item"> | number
    name?: StringNullableWithAggregatesFilter<"item"> | string | null
    image_path?: StringNullableWithAggregatesFilter<"item"> | string | null
    section_id?: IntNullableWithAggregatesFilter<"item"> | number | null
    location_id?: IntNullableWithAggregatesFilter<"item"> | number | null
  }

  export type item_in_listWhereInput = {
    AND?: item_in_listWhereInput | item_in_listWhereInput[]
    OR?: item_in_listWhereInput[]
    NOT?: item_in_listWhereInput | item_in_listWhereInput[]
    item_in_list_id?: IntFilter<"item_in_list"> | number
    item_id?: IntNullableFilter<"item_in_list"> | number | null
    shopping_list_id?: IntNullableFilter<"item_in_list"> | number | null
    buyer_id?: IntNullableFilter<"item_in_list"> | number | null
    quantity?: IntNullableFilter<"item_in_list"> | number | null
    discount_price?: IntNullableFilter<"item_in_list"> | number | null
    status_id?: IntNullableFilter<"item_in_list"> | number | null
    user?: XOR<UserNullableScalarRelationFilter, userWhereInput> | null
    item?: XOR<ItemNullableScalarRelationFilter, itemWhereInput> | null
    shopping_list?: XOR<Shopping_listNullableScalarRelationFilter, shopping_listWhereInput> | null
    item_status?: XOR<Item_statusNullableScalarRelationFilter, item_statusWhereInput> | null
  }

  export type item_in_listOrderByWithRelationInput = {
    item_in_list_id?: SortOrder
    item_id?: SortOrderInput | SortOrder
    shopping_list_id?: SortOrderInput | SortOrder
    buyer_id?: SortOrderInput | SortOrder
    quantity?: SortOrderInput | SortOrder
    discount_price?: SortOrderInput | SortOrder
    status_id?: SortOrderInput | SortOrder
    user?: userOrderByWithRelationInput
    item?: itemOrderByWithRelationInput
    shopping_list?: shopping_listOrderByWithRelationInput
    item_status?: item_statusOrderByWithRelationInput
  }

  export type item_in_listWhereUniqueInput = Prisma.AtLeast<{
    item_in_list_id?: number
    AND?: item_in_listWhereInput | item_in_listWhereInput[]
    OR?: item_in_listWhereInput[]
    NOT?: item_in_listWhereInput | item_in_listWhereInput[]
    item_id?: IntNullableFilter<"item_in_list"> | number | null
    shopping_list_id?: IntNullableFilter<"item_in_list"> | number | null
    buyer_id?: IntNullableFilter<"item_in_list"> | number | null
    quantity?: IntNullableFilter<"item_in_list"> | number | null
    discount_price?: IntNullableFilter<"item_in_list"> | number | null
    status_id?: IntNullableFilter<"item_in_list"> | number | null
    user?: XOR<UserNullableScalarRelationFilter, userWhereInput> | null
    item?: XOR<ItemNullableScalarRelationFilter, itemWhereInput> | null
    shopping_list?: XOR<Shopping_listNullableScalarRelationFilter, shopping_listWhereInput> | null
    item_status?: XOR<Item_statusNullableScalarRelationFilter, item_statusWhereInput> | null
  }, "item_in_list_id">

  export type item_in_listOrderByWithAggregationInput = {
    item_in_list_id?: SortOrder
    item_id?: SortOrderInput | SortOrder
    shopping_list_id?: SortOrderInput | SortOrder
    buyer_id?: SortOrderInput | SortOrder
    quantity?: SortOrderInput | SortOrder
    discount_price?: SortOrderInput | SortOrder
    status_id?: SortOrderInput | SortOrder
    _count?: item_in_listCountOrderByAggregateInput
    _avg?: item_in_listAvgOrderByAggregateInput
    _max?: item_in_listMaxOrderByAggregateInput
    _min?: item_in_listMinOrderByAggregateInput
    _sum?: item_in_listSumOrderByAggregateInput
  }

  export type item_in_listScalarWhereWithAggregatesInput = {
    AND?: item_in_listScalarWhereWithAggregatesInput | item_in_listScalarWhereWithAggregatesInput[]
    OR?: item_in_listScalarWhereWithAggregatesInput[]
    NOT?: item_in_listScalarWhereWithAggregatesInput | item_in_listScalarWhereWithAggregatesInput[]
    item_in_list_id?: IntWithAggregatesFilter<"item_in_list"> | number
    item_id?: IntNullableWithAggregatesFilter<"item_in_list"> | number | null
    shopping_list_id?: IntNullableWithAggregatesFilter<"item_in_list"> | number | null
    buyer_id?: IntNullableWithAggregatesFilter<"item_in_list"> | number | null
    quantity?: IntNullableWithAggregatesFilter<"item_in_list"> | number | null
    discount_price?: IntNullableWithAggregatesFilter<"item_in_list"> | number | null
    status_id?: IntNullableWithAggregatesFilter<"item_in_list"> | number | null
  }

  export type item_price_historyWhereInput = {
    AND?: item_price_historyWhereInput | item_price_historyWhereInput[]
    OR?: item_price_historyWhereInput[]
    NOT?: item_price_historyWhereInput | item_price_historyWhereInput[]
    item_price_history_id?: IntFilter<"item_price_history"> | number
    item_id?: IntNullableFilter<"item_price_history"> | number | null
    price?: IntNullableFilter<"item_price_history"> | number | null
    effective_date?: DateTimeNullableFilter<"item_price_history"> | Date | string | null
    item?: XOR<ItemNullableScalarRelationFilter, itemWhereInput> | null
  }

  export type item_price_historyOrderByWithRelationInput = {
    item_price_history_id?: SortOrder
    item_id?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    effective_date?: SortOrderInput | SortOrder
    item?: itemOrderByWithRelationInput
  }

  export type item_price_historyWhereUniqueInput = Prisma.AtLeast<{
    item_price_history_id?: number
    AND?: item_price_historyWhereInput | item_price_historyWhereInput[]
    OR?: item_price_historyWhereInput[]
    NOT?: item_price_historyWhereInput | item_price_historyWhereInput[]
    item_id?: IntNullableFilter<"item_price_history"> | number | null
    price?: IntNullableFilter<"item_price_history"> | number | null
    effective_date?: DateTimeNullableFilter<"item_price_history"> | Date | string | null
    item?: XOR<ItemNullableScalarRelationFilter, itemWhereInput> | null
  }, "item_price_history_id">

  export type item_price_historyOrderByWithAggregationInput = {
    item_price_history_id?: SortOrder
    item_id?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    effective_date?: SortOrderInput | SortOrder
    _count?: item_price_historyCountOrderByAggregateInput
    _avg?: item_price_historyAvgOrderByAggregateInput
    _max?: item_price_historyMaxOrderByAggregateInput
    _min?: item_price_historyMinOrderByAggregateInput
    _sum?: item_price_historySumOrderByAggregateInput
  }

  export type item_price_historyScalarWhereWithAggregatesInput = {
    AND?: item_price_historyScalarWhereWithAggregatesInput | item_price_historyScalarWhereWithAggregatesInput[]
    OR?: item_price_historyScalarWhereWithAggregatesInput[]
    NOT?: item_price_historyScalarWhereWithAggregatesInput | item_price_historyScalarWhereWithAggregatesInput[]
    item_price_history_id?: IntWithAggregatesFilter<"item_price_history"> | number
    item_id?: IntNullableWithAggregatesFilter<"item_price_history"> | number | null
    price?: IntNullableWithAggregatesFilter<"item_price_history"> | number | null
    effective_date?: DateTimeNullableWithAggregatesFilter<"item_price_history"> | Date | string | null
  }

  export type item_statusWhereInput = {
    AND?: item_statusWhereInput | item_statusWhereInput[]
    OR?: item_statusWhereInput[]
    NOT?: item_statusWhereInput | item_statusWhereInput[]
    status_id?: IntFilter<"item_status"> | number
    name?: StringNullableFilter<"item_status"> | string | null
    item_in_list?: Item_in_listListRelationFilter
  }

  export type item_statusOrderByWithRelationInput = {
    status_id?: SortOrder
    name?: SortOrderInput | SortOrder
    item_in_list?: item_in_listOrderByRelationAggregateInput
    _relevance?: item_statusOrderByRelevanceInput
  }

  export type item_statusWhereUniqueInput = Prisma.AtLeast<{
    status_id?: number
    name?: string
    AND?: item_statusWhereInput | item_statusWhereInput[]
    OR?: item_statusWhereInput[]
    NOT?: item_statusWhereInput | item_statusWhereInput[]
    item_in_list?: Item_in_listListRelationFilter
  }, "status_id" | "name">

  export type item_statusOrderByWithAggregationInput = {
    status_id?: SortOrder
    name?: SortOrderInput | SortOrder
    _count?: item_statusCountOrderByAggregateInput
    _avg?: item_statusAvgOrderByAggregateInput
    _max?: item_statusMaxOrderByAggregateInput
    _min?: item_statusMinOrderByAggregateInput
    _sum?: item_statusSumOrderByAggregateInput
  }

  export type item_statusScalarWhereWithAggregatesInput = {
    AND?: item_statusScalarWhereWithAggregatesInput | item_statusScalarWhereWithAggregatesInput[]
    OR?: item_statusScalarWhereWithAggregatesInput[]
    NOT?: item_statusScalarWhereWithAggregatesInput | item_statusScalarWhereWithAggregatesInput[]
    status_id?: IntWithAggregatesFilter<"item_status"> | number
    name?: StringNullableWithAggregatesFilter<"item_status"> | string | null
  }

  export type item_favoriteWhereInput = {
    AND?: item_favoriteWhereInput | item_favoriteWhereInput[]
    OR?: item_favoriteWhereInput[]
    NOT?: item_favoriteWhereInput | item_favoriteWhereInput[]
    user_id?: IntFilter<"item_favorite"> | number
    item_id?: IntFilter<"item_favorite"> | number
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    item?: XOR<ItemScalarRelationFilter, itemWhereInput>
  }

  export type item_favoriteOrderByWithRelationInput = {
    user_id?: SortOrder
    item_id?: SortOrder
    user?: userOrderByWithRelationInput
    item?: itemOrderByWithRelationInput
  }

  export type item_favoriteWhereUniqueInput = Prisma.AtLeast<{
    user_id_item_id?: item_favoriteUser_idItem_idCompoundUniqueInput
    AND?: item_favoriteWhereInput | item_favoriteWhereInput[]
    OR?: item_favoriteWhereInput[]
    NOT?: item_favoriteWhereInput | item_favoriteWhereInput[]
    user_id?: IntFilter<"item_favorite"> | number
    item_id?: IntFilter<"item_favorite"> | number
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    item?: XOR<ItemScalarRelationFilter, itemWhereInput>
  }, "user_id_item_id">

  export type item_favoriteOrderByWithAggregationInput = {
    user_id?: SortOrder
    item_id?: SortOrder
    _count?: item_favoriteCountOrderByAggregateInput
    _avg?: item_favoriteAvgOrderByAggregateInput
    _max?: item_favoriteMaxOrderByAggregateInput
    _min?: item_favoriteMinOrderByAggregateInput
    _sum?: item_favoriteSumOrderByAggregateInput
  }

  export type item_favoriteScalarWhereWithAggregatesInput = {
    AND?: item_favoriteScalarWhereWithAggregatesInput | item_favoriteScalarWhereWithAggregatesInput[]
    OR?: item_favoriteScalarWhereWithAggregatesInput[]
    NOT?: item_favoriteScalarWhereWithAggregatesInput | item_favoriteScalarWhereWithAggregatesInput[]
    user_id?: IntWithAggregatesFilter<"item_favorite"> | number
    item_id?: IntWithAggregatesFilter<"item_favorite"> | number
  }

  export type shopping_listWhereInput = {
    AND?: shopping_listWhereInput | shopping_listWhereInput[]
    OR?: shopping_listWhereInput[]
    NOT?: shopping_listWhereInput | shopping_listWhereInput[]
    shopping_list_id?: IntFilter<"shopping_list"> | number
    location_id?: IntNullableFilter<"shopping_list"> | number | null
    paid?: BoolNullableFilter<"shopping_list"> | boolean | null
    completed_at?: DateTimeNullableFilter<"shopping_list"> | Date | string | null
    item_in_list?: Item_in_listListRelationFilter
    location?: XOR<LocationNullableScalarRelationFilter, locationWhereInput> | null
  }

  export type shopping_listOrderByWithRelationInput = {
    shopping_list_id?: SortOrder
    location_id?: SortOrderInput | SortOrder
    paid?: SortOrderInput | SortOrder
    completed_at?: SortOrderInput | SortOrder
    item_in_list?: item_in_listOrderByRelationAggregateInput
    location?: locationOrderByWithRelationInput
  }

  export type shopping_listWhereUniqueInput = Prisma.AtLeast<{
    shopping_list_id?: number
    AND?: shopping_listWhereInput | shopping_listWhereInput[]
    OR?: shopping_listWhereInput[]
    NOT?: shopping_listWhereInput | shopping_listWhereInput[]
    location_id?: IntNullableFilter<"shopping_list"> | number | null
    paid?: BoolNullableFilter<"shopping_list"> | boolean | null
    completed_at?: DateTimeNullableFilter<"shopping_list"> | Date | string | null
    item_in_list?: Item_in_listListRelationFilter
    location?: XOR<LocationNullableScalarRelationFilter, locationWhereInput> | null
  }, "shopping_list_id">

  export type shopping_listOrderByWithAggregationInput = {
    shopping_list_id?: SortOrder
    location_id?: SortOrderInput | SortOrder
    paid?: SortOrderInput | SortOrder
    completed_at?: SortOrderInput | SortOrder
    _count?: shopping_listCountOrderByAggregateInput
    _avg?: shopping_listAvgOrderByAggregateInput
    _max?: shopping_listMaxOrderByAggregateInput
    _min?: shopping_listMinOrderByAggregateInput
    _sum?: shopping_listSumOrderByAggregateInput
  }

  export type shopping_listScalarWhereWithAggregatesInput = {
    AND?: shopping_listScalarWhereWithAggregatesInput | shopping_listScalarWhereWithAggregatesInput[]
    OR?: shopping_listScalarWhereWithAggregatesInput[]
    NOT?: shopping_listScalarWhereWithAggregatesInput | shopping_listScalarWhereWithAggregatesInput[]
    shopping_list_id?: IntWithAggregatesFilter<"shopping_list"> | number
    location_id?: IntNullableWithAggregatesFilter<"shopping_list"> | number | null
    paid?: BoolNullableWithAggregatesFilter<"shopping_list"> | boolean | null
    completed_at?: DateTimeNullableWithAggregatesFilter<"shopping_list"> | Date | string | null
  }

  export type store_sectionWhereInput = {
    AND?: store_sectionWhereInput | store_sectionWhereInput[]
    OR?: store_sectionWhereInput[]
    NOT?: store_sectionWhereInput | store_sectionWhereInput[]
    section_id?: IntFilter<"store_section"> | number
    location_id?: IntNullableFilter<"store_section"> | number | null
    name?: StringNullableFilter<"store_section"> | string | null
    sort_order?: IntNullableFilter<"store_section"> | number | null
    item?: ItemListRelationFilter
    location?: XOR<LocationNullableScalarRelationFilter, locationWhereInput> | null
  }

  export type store_sectionOrderByWithRelationInput = {
    section_id?: SortOrder
    location_id?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    sort_order?: SortOrderInput | SortOrder
    item?: itemOrderByRelationAggregateInput
    location?: locationOrderByWithRelationInput
    _relevance?: store_sectionOrderByRelevanceInput
  }

  export type store_sectionWhereUniqueInput = Prisma.AtLeast<{
    section_id?: number
    AND?: store_sectionWhereInput | store_sectionWhereInput[]
    OR?: store_sectionWhereInput[]
    NOT?: store_sectionWhereInput | store_sectionWhereInput[]
    location_id?: IntNullableFilter<"store_section"> | number | null
    name?: StringNullableFilter<"store_section"> | string | null
    sort_order?: IntNullableFilter<"store_section"> | number | null
    item?: ItemListRelationFilter
    location?: XOR<LocationNullableScalarRelationFilter, locationWhereInput> | null
  }, "section_id">

  export type store_sectionOrderByWithAggregationInput = {
    section_id?: SortOrder
    location_id?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    sort_order?: SortOrderInput | SortOrder
    _count?: store_sectionCountOrderByAggregateInput
    _avg?: store_sectionAvgOrderByAggregateInput
    _max?: store_sectionMaxOrderByAggregateInput
    _min?: store_sectionMinOrderByAggregateInput
    _sum?: store_sectionSumOrderByAggregateInput
  }

  export type store_sectionScalarWhereWithAggregatesInput = {
    AND?: store_sectionScalarWhereWithAggregatesInput | store_sectionScalarWhereWithAggregatesInput[]
    OR?: store_sectionScalarWhereWithAggregatesInput[]
    NOT?: store_sectionScalarWhereWithAggregatesInput | store_sectionScalarWhereWithAggregatesInput[]
    section_id?: IntWithAggregatesFilter<"store_section"> | number
    location_id?: IntNullableWithAggregatesFilter<"store_section"> | number | null
    name?: StringNullableWithAggregatesFilter<"store_section"> | string | null
    sort_order?: IntNullableWithAggregatesFilter<"store_section"> | number | null
  }

  export type userWhereInput = {
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    user_id?: IntFilter<"user"> | number
    name?: StringNullableFilter<"user"> | string | null
    role?: StringFilter<"user"> | string
    auth_key?: StringNullableFilter<"user"> | string | null
    item_in_list?: Item_in_listListRelationFilter
    item_favorite?: Item_favoriteListRelationFilter
  }

  export type userOrderByWithRelationInput = {
    user_id?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    auth_key?: SortOrderInput | SortOrder
    item_in_list?: item_in_listOrderByRelationAggregateInput
    item_favorite?: item_favoriteOrderByRelationAggregateInput
    _relevance?: userOrderByRelevanceInput
  }

  export type userWhereUniqueInput = Prisma.AtLeast<{
    user_id?: number
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    name?: StringNullableFilter<"user"> | string | null
    role?: StringFilter<"user"> | string
    auth_key?: StringNullableFilter<"user"> | string | null
    item_in_list?: Item_in_listListRelationFilter
    item_favorite?: Item_favoriteListRelationFilter
  }, "user_id">

  export type userOrderByWithAggregationInput = {
    user_id?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    auth_key?: SortOrderInput | SortOrder
    _count?: userCountOrderByAggregateInput
    _avg?: userAvgOrderByAggregateInput
    _max?: userMaxOrderByAggregateInput
    _min?: userMinOrderByAggregateInput
    _sum?: userSumOrderByAggregateInput
  }

  export type userScalarWhereWithAggregatesInput = {
    AND?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    OR?: userScalarWhereWithAggregatesInput[]
    NOT?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    user_id?: IntWithAggregatesFilter<"user"> | number
    name?: StringNullableWithAggregatesFilter<"user"> | string | null
    role?: StringWithAggregatesFilter<"user"> | string
    auth_key?: StringNullableWithAggregatesFilter<"user"> | string | null
  }

  export type locationCreateInput = {
    name?: string | null
    address?: string | null
    item?: itemCreateNestedManyWithoutLocationInput
    shopping_list?: shopping_listCreateNestedManyWithoutLocationInput
    store_section?: store_sectionCreateNestedManyWithoutLocationInput
  }

  export type locationUncheckedCreateInput = {
    location_id?: number
    name?: string | null
    address?: string | null
    item?: itemUncheckedCreateNestedManyWithoutLocationInput
    shopping_list?: shopping_listUncheckedCreateNestedManyWithoutLocationInput
    store_section?: store_sectionUncheckedCreateNestedManyWithoutLocationInput
  }

  export type locationUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    item?: itemUpdateManyWithoutLocationNestedInput
    shopping_list?: shopping_listUpdateManyWithoutLocationNestedInput
    store_section?: store_sectionUpdateManyWithoutLocationNestedInput
  }

  export type locationUncheckedUpdateInput = {
    location_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    item?: itemUncheckedUpdateManyWithoutLocationNestedInput
    shopping_list?: shopping_listUncheckedUpdateManyWithoutLocationNestedInput
    store_section?: store_sectionUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type locationCreateManyInput = {
    location_id?: number
    name?: string | null
    address?: string | null
  }

  export type locationUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type locationUncheckedUpdateManyInput = {
    location_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type itemCreateInput = {
    name?: string | null
    image_path?: string | null
    location?: locationCreateNestedOneWithoutItemInput
    store_section?: store_sectionCreateNestedOneWithoutItemInput
    item_in_list?: item_in_listCreateNestedManyWithoutItemInput
    item_price_history?: item_price_historyCreateNestedManyWithoutItemInput
    item_favorite?: item_favoriteCreateNestedManyWithoutItemInput
  }

  export type itemUncheckedCreateInput = {
    item_id?: number
    name?: string | null
    image_path?: string | null
    section_id?: number | null
    location_id?: number | null
    item_in_list?: item_in_listUncheckedCreateNestedManyWithoutItemInput
    item_price_history?: item_price_historyUncheckedCreateNestedManyWithoutItemInput
    item_favorite?: item_favoriteUncheckedCreateNestedManyWithoutItemInput
  }

  export type itemUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image_path?: NullableStringFieldUpdateOperationsInput | string | null
    location?: locationUpdateOneWithoutItemNestedInput
    store_section?: store_sectionUpdateOneWithoutItemNestedInput
    item_in_list?: item_in_listUpdateManyWithoutItemNestedInput
    item_price_history?: item_price_historyUpdateManyWithoutItemNestedInput
    item_favorite?: item_favoriteUpdateManyWithoutItemNestedInput
  }

  export type itemUncheckedUpdateInput = {
    item_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image_path?: NullableStringFieldUpdateOperationsInput | string | null
    section_id?: NullableIntFieldUpdateOperationsInput | number | null
    location_id?: NullableIntFieldUpdateOperationsInput | number | null
    item_in_list?: item_in_listUncheckedUpdateManyWithoutItemNestedInput
    item_price_history?: item_price_historyUncheckedUpdateManyWithoutItemNestedInput
    item_favorite?: item_favoriteUncheckedUpdateManyWithoutItemNestedInput
  }

  export type itemCreateManyInput = {
    item_id?: number
    name?: string | null
    image_path?: string | null
    section_id?: number | null
    location_id?: number | null
  }

  export type itemUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image_path?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type itemUncheckedUpdateManyInput = {
    item_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image_path?: NullableStringFieldUpdateOperationsInput | string | null
    section_id?: NullableIntFieldUpdateOperationsInput | number | null
    location_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type item_in_listCreateInput = {
    quantity?: number | null
    discount_price?: number | null
    user?: userCreateNestedOneWithoutItem_in_listInput
    item?: itemCreateNestedOneWithoutItem_in_listInput
    shopping_list?: shopping_listCreateNestedOneWithoutItem_in_listInput
    item_status?: item_statusCreateNestedOneWithoutItem_in_listInput
  }

  export type item_in_listUncheckedCreateInput = {
    item_in_list_id?: number
    item_id?: number | null
    shopping_list_id?: number | null
    buyer_id?: number | null
    quantity?: number | null
    discount_price?: number | null
    status_id?: number | null
  }

  export type item_in_listUpdateInput = {
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    discount_price?: NullableIntFieldUpdateOperationsInput | number | null
    user?: userUpdateOneWithoutItem_in_listNestedInput
    item?: itemUpdateOneWithoutItem_in_listNestedInput
    shopping_list?: shopping_listUpdateOneWithoutItem_in_listNestedInput
    item_status?: item_statusUpdateOneWithoutItem_in_listNestedInput
  }

  export type item_in_listUncheckedUpdateInput = {
    item_in_list_id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    shopping_list_id?: NullableIntFieldUpdateOperationsInput | number | null
    buyer_id?: NullableIntFieldUpdateOperationsInput | number | null
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    discount_price?: NullableIntFieldUpdateOperationsInput | number | null
    status_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type item_in_listCreateManyInput = {
    item_in_list_id?: number
    item_id?: number | null
    shopping_list_id?: number | null
    buyer_id?: number | null
    quantity?: number | null
    discount_price?: number | null
    status_id?: number | null
  }

  export type item_in_listUpdateManyMutationInput = {
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    discount_price?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type item_in_listUncheckedUpdateManyInput = {
    item_in_list_id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    shopping_list_id?: NullableIntFieldUpdateOperationsInput | number | null
    buyer_id?: NullableIntFieldUpdateOperationsInput | number | null
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    discount_price?: NullableIntFieldUpdateOperationsInput | number | null
    status_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type item_price_historyCreateInput = {
    price?: number | null
    effective_date?: Date | string | null
    item?: itemCreateNestedOneWithoutItem_price_historyInput
  }

  export type item_price_historyUncheckedCreateInput = {
    item_price_history_id?: number
    item_id?: number | null
    price?: number | null
    effective_date?: Date | string | null
  }

  export type item_price_historyUpdateInput = {
    price?: NullableIntFieldUpdateOperationsInput | number | null
    effective_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    item?: itemUpdateOneWithoutItem_price_historyNestedInput
  }

  export type item_price_historyUncheckedUpdateInput = {
    item_price_history_id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableIntFieldUpdateOperationsInput | number | null
    effective_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type item_price_historyCreateManyInput = {
    item_price_history_id?: number
    item_id?: number | null
    price?: number | null
    effective_date?: Date | string | null
  }

  export type item_price_historyUpdateManyMutationInput = {
    price?: NullableIntFieldUpdateOperationsInput | number | null
    effective_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type item_price_historyUncheckedUpdateManyInput = {
    item_price_history_id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableIntFieldUpdateOperationsInput | number | null
    effective_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type item_statusCreateInput = {
    name?: string | null
    item_in_list?: item_in_listCreateNestedManyWithoutItem_statusInput
  }

  export type item_statusUncheckedCreateInput = {
    status_id?: number
    name?: string | null
    item_in_list?: item_in_listUncheckedCreateNestedManyWithoutItem_statusInput
  }

  export type item_statusUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    item_in_list?: item_in_listUpdateManyWithoutItem_statusNestedInput
  }

  export type item_statusUncheckedUpdateInput = {
    status_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    item_in_list?: item_in_listUncheckedUpdateManyWithoutItem_statusNestedInput
  }

  export type item_statusCreateManyInput = {
    status_id?: number
    name?: string | null
  }

  export type item_statusUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type item_statusUncheckedUpdateManyInput = {
    status_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type item_favoriteCreateInput = {
    user: userCreateNestedOneWithoutItem_favoriteInput
    item: itemCreateNestedOneWithoutItem_favoriteInput
  }

  export type item_favoriteUncheckedCreateInput = {
    user_id: number
    item_id: number
  }

  export type item_favoriteUpdateInput = {
    user?: userUpdateOneRequiredWithoutItem_favoriteNestedInput
    item?: itemUpdateOneRequiredWithoutItem_favoriteNestedInput
  }

  export type item_favoriteUncheckedUpdateInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    item_id?: IntFieldUpdateOperationsInput | number
  }

  export type item_favoriteCreateManyInput = {
    user_id: number
    item_id: number
  }

  export type item_favoriteUpdateManyMutationInput = {

  }

  export type item_favoriteUncheckedUpdateManyInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    item_id?: IntFieldUpdateOperationsInput | number
  }

  export type shopping_listCreateInput = {
    paid?: boolean | null
    completed_at?: Date | string | null
    item_in_list?: item_in_listCreateNestedManyWithoutShopping_listInput
    location?: locationCreateNestedOneWithoutShopping_listInput
  }

  export type shopping_listUncheckedCreateInput = {
    shopping_list_id?: number
    location_id?: number | null
    paid?: boolean | null
    completed_at?: Date | string | null
    item_in_list?: item_in_listUncheckedCreateNestedManyWithoutShopping_listInput
  }

  export type shopping_listUpdateInput = {
    paid?: NullableBoolFieldUpdateOperationsInput | boolean | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    item_in_list?: item_in_listUpdateManyWithoutShopping_listNestedInput
    location?: locationUpdateOneWithoutShopping_listNestedInput
  }

  export type shopping_listUncheckedUpdateInput = {
    shopping_list_id?: IntFieldUpdateOperationsInput | number
    location_id?: NullableIntFieldUpdateOperationsInput | number | null
    paid?: NullableBoolFieldUpdateOperationsInput | boolean | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    item_in_list?: item_in_listUncheckedUpdateManyWithoutShopping_listNestedInput
  }

  export type shopping_listCreateManyInput = {
    shopping_list_id?: number
    location_id?: number | null
    paid?: boolean | null
    completed_at?: Date | string | null
  }

  export type shopping_listUpdateManyMutationInput = {
    paid?: NullableBoolFieldUpdateOperationsInput | boolean | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type shopping_listUncheckedUpdateManyInput = {
    shopping_list_id?: IntFieldUpdateOperationsInput | number
    location_id?: NullableIntFieldUpdateOperationsInput | number | null
    paid?: NullableBoolFieldUpdateOperationsInput | boolean | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type store_sectionCreateInput = {
    name?: string | null
    sort_order?: number | null
    item?: itemCreateNestedManyWithoutStore_sectionInput
    location?: locationCreateNestedOneWithoutStore_sectionInput
  }

  export type store_sectionUncheckedCreateInput = {
    section_id?: number
    location_id?: number | null
    name?: string | null
    sort_order?: number | null
    item?: itemUncheckedCreateNestedManyWithoutStore_sectionInput
  }

  export type store_sectionUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    sort_order?: NullableIntFieldUpdateOperationsInput | number | null
    item?: itemUpdateManyWithoutStore_sectionNestedInput
    location?: locationUpdateOneWithoutStore_sectionNestedInput
  }

  export type store_sectionUncheckedUpdateInput = {
    section_id?: IntFieldUpdateOperationsInput | number
    location_id?: NullableIntFieldUpdateOperationsInput | number | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    sort_order?: NullableIntFieldUpdateOperationsInput | number | null
    item?: itemUncheckedUpdateManyWithoutStore_sectionNestedInput
  }

  export type store_sectionCreateManyInput = {
    section_id?: number
    location_id?: number | null
    name?: string | null
    sort_order?: number | null
  }

  export type store_sectionUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    sort_order?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type store_sectionUncheckedUpdateManyInput = {
    section_id?: IntFieldUpdateOperationsInput | number
    location_id?: NullableIntFieldUpdateOperationsInput | number | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    sort_order?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type userCreateInput = {
    name?: string | null
    role?: string
    auth_key?: string | null
    item_in_list?: item_in_listCreateNestedManyWithoutUserInput
    item_favorite?: item_favoriteCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateInput = {
    user_id?: number
    name?: string | null
    role?: string
    auth_key?: string | null
    item_in_list?: item_in_listUncheckedCreateNestedManyWithoutUserInput
    item_favorite?: item_favoriteUncheckedCreateNestedManyWithoutUserInput
  }

  export type userUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    auth_key?: NullableStringFieldUpdateOperationsInput | string | null
    item_in_list?: item_in_listUpdateManyWithoutUserNestedInput
    item_favorite?: item_favoriteUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    auth_key?: NullableStringFieldUpdateOperationsInput | string | null
    item_in_list?: item_in_listUncheckedUpdateManyWithoutUserNestedInput
    item_favorite?: item_favoriteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type userCreateManyInput = {
    user_id?: number
    name?: string | null
    role?: string
    auth_key?: string | null
  }

  export type userUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    auth_key?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type userUncheckedUpdateManyInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    auth_key?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type ItemListRelationFilter = {
    every?: itemWhereInput
    some?: itemWhereInput
    none?: itemWhereInput
  }

  export type Shopping_listListRelationFilter = {
    every?: shopping_listWhereInput
    some?: shopping_listWhereInput
    none?: shopping_listWhereInput
  }

  export type Store_sectionListRelationFilter = {
    every?: store_sectionWhereInput
    some?: store_sectionWhereInput
    none?: store_sectionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type itemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type shopping_listOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type store_sectionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type locationOrderByRelevanceInput = {
    fields: locationOrderByRelevanceFieldEnum | locationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type locationCountOrderByAggregateInput = {
    location_id?: SortOrder
    name?: SortOrder
    address?: SortOrder
  }

  export type locationAvgOrderByAggregateInput = {
    location_id?: SortOrder
  }

  export type locationMaxOrderByAggregateInput = {
    location_id?: SortOrder
    name?: SortOrder
    address?: SortOrder
  }

  export type locationMinOrderByAggregateInput = {
    location_id?: SortOrder
    name?: SortOrder
    address?: SortOrder
  }

  export type locationSumOrderByAggregateInput = {
    location_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type LocationNullableScalarRelationFilter = {
    is?: locationWhereInput | null
    isNot?: locationWhereInput | null
  }

  export type Store_sectionNullableScalarRelationFilter = {
    is?: store_sectionWhereInput | null
    isNot?: store_sectionWhereInput | null
  }

  export type Item_in_listListRelationFilter = {
    every?: item_in_listWhereInput
    some?: item_in_listWhereInput
    none?: item_in_listWhereInput
  }

  export type Item_price_historyListRelationFilter = {
    every?: item_price_historyWhereInput
    some?: item_price_historyWhereInput
    none?: item_price_historyWhereInput
  }

  export type Item_favoriteListRelationFilter = {
    every?: item_favoriteWhereInput
    some?: item_favoriteWhereInput
    none?: item_favoriteWhereInput
  }

  export type item_in_listOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type item_price_historyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type item_favoriteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type itemOrderByRelevanceInput = {
    fields: itemOrderByRelevanceFieldEnum | itemOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type itemCountOrderByAggregateInput = {
    item_id?: SortOrder
    name?: SortOrder
    image_path?: SortOrder
    section_id?: SortOrder
    location_id?: SortOrder
  }

  export type itemAvgOrderByAggregateInput = {
    item_id?: SortOrder
    section_id?: SortOrder
    location_id?: SortOrder
  }

  export type itemMaxOrderByAggregateInput = {
    item_id?: SortOrder
    name?: SortOrder
    image_path?: SortOrder
    section_id?: SortOrder
    location_id?: SortOrder
  }

  export type itemMinOrderByAggregateInput = {
    item_id?: SortOrder
    name?: SortOrder
    image_path?: SortOrder
    section_id?: SortOrder
    location_id?: SortOrder
  }

  export type itemSumOrderByAggregateInput = {
    item_id?: SortOrder
    section_id?: SortOrder
    location_id?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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

  export type UserNullableScalarRelationFilter = {
    is?: userWhereInput | null
    isNot?: userWhereInput | null
  }

  export type ItemNullableScalarRelationFilter = {
    is?: itemWhereInput | null
    isNot?: itemWhereInput | null
  }

  export type Shopping_listNullableScalarRelationFilter = {
    is?: shopping_listWhereInput | null
    isNot?: shopping_listWhereInput | null
  }

  export type Item_statusNullableScalarRelationFilter = {
    is?: item_statusWhereInput | null
    isNot?: item_statusWhereInput | null
  }

  export type item_in_listCountOrderByAggregateInput = {
    item_in_list_id?: SortOrder
    item_id?: SortOrder
    shopping_list_id?: SortOrder
    buyer_id?: SortOrder
    quantity?: SortOrder
    discount_price?: SortOrder
    status_id?: SortOrder
  }

  export type item_in_listAvgOrderByAggregateInput = {
    item_in_list_id?: SortOrder
    item_id?: SortOrder
    shopping_list_id?: SortOrder
    buyer_id?: SortOrder
    quantity?: SortOrder
    discount_price?: SortOrder
    status_id?: SortOrder
  }

  export type item_in_listMaxOrderByAggregateInput = {
    item_in_list_id?: SortOrder
    item_id?: SortOrder
    shopping_list_id?: SortOrder
    buyer_id?: SortOrder
    quantity?: SortOrder
    discount_price?: SortOrder
    status_id?: SortOrder
  }

  export type item_in_listMinOrderByAggregateInput = {
    item_in_list_id?: SortOrder
    item_id?: SortOrder
    shopping_list_id?: SortOrder
    buyer_id?: SortOrder
    quantity?: SortOrder
    discount_price?: SortOrder
    status_id?: SortOrder
  }

  export type item_in_listSumOrderByAggregateInput = {
    item_in_list_id?: SortOrder
    item_id?: SortOrder
    shopping_list_id?: SortOrder
    buyer_id?: SortOrder
    quantity?: SortOrder
    discount_price?: SortOrder
    status_id?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type item_price_historyCountOrderByAggregateInput = {
    item_price_history_id?: SortOrder
    item_id?: SortOrder
    price?: SortOrder
    effective_date?: SortOrder
  }

  export type item_price_historyAvgOrderByAggregateInput = {
    item_price_history_id?: SortOrder
    item_id?: SortOrder
    price?: SortOrder
  }

  export type item_price_historyMaxOrderByAggregateInput = {
    item_price_history_id?: SortOrder
    item_id?: SortOrder
    price?: SortOrder
    effective_date?: SortOrder
  }

  export type item_price_historyMinOrderByAggregateInput = {
    item_price_history_id?: SortOrder
    item_id?: SortOrder
    price?: SortOrder
    effective_date?: SortOrder
  }

  export type item_price_historySumOrderByAggregateInput = {
    item_price_history_id?: SortOrder
    item_id?: SortOrder
    price?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type item_statusOrderByRelevanceInput = {
    fields: item_statusOrderByRelevanceFieldEnum | item_statusOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type item_statusCountOrderByAggregateInput = {
    status_id?: SortOrder
    name?: SortOrder
  }

  export type item_statusAvgOrderByAggregateInput = {
    status_id?: SortOrder
  }

  export type item_statusMaxOrderByAggregateInput = {
    status_id?: SortOrder
    name?: SortOrder
  }

  export type item_statusMinOrderByAggregateInput = {
    status_id?: SortOrder
    name?: SortOrder
  }

  export type item_statusSumOrderByAggregateInput = {
    status_id?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: userWhereInput
    isNot?: userWhereInput
  }

  export type ItemScalarRelationFilter = {
    is?: itemWhereInput
    isNot?: itemWhereInput
  }

  export type item_favoriteUser_idItem_idCompoundUniqueInput = {
    user_id: number
    item_id: number
  }

  export type item_favoriteCountOrderByAggregateInput = {
    user_id?: SortOrder
    item_id?: SortOrder
  }

  export type item_favoriteAvgOrderByAggregateInput = {
    user_id?: SortOrder
    item_id?: SortOrder
  }

  export type item_favoriteMaxOrderByAggregateInput = {
    user_id?: SortOrder
    item_id?: SortOrder
  }

  export type item_favoriteMinOrderByAggregateInput = {
    user_id?: SortOrder
    item_id?: SortOrder
  }

  export type item_favoriteSumOrderByAggregateInput = {
    user_id?: SortOrder
    item_id?: SortOrder
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type shopping_listCountOrderByAggregateInput = {
    shopping_list_id?: SortOrder
    location_id?: SortOrder
    paid?: SortOrder
    completed_at?: SortOrder
  }

  export type shopping_listAvgOrderByAggregateInput = {
    shopping_list_id?: SortOrder
    location_id?: SortOrder
  }

  export type shopping_listMaxOrderByAggregateInput = {
    shopping_list_id?: SortOrder
    location_id?: SortOrder
    paid?: SortOrder
    completed_at?: SortOrder
  }

  export type shopping_listMinOrderByAggregateInput = {
    shopping_list_id?: SortOrder
    location_id?: SortOrder
    paid?: SortOrder
    completed_at?: SortOrder
  }

  export type shopping_listSumOrderByAggregateInput = {
    shopping_list_id?: SortOrder
    location_id?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type store_sectionOrderByRelevanceInput = {
    fields: store_sectionOrderByRelevanceFieldEnum | store_sectionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type store_sectionCountOrderByAggregateInput = {
    section_id?: SortOrder
    location_id?: SortOrder
    name?: SortOrder
    sort_order?: SortOrder
  }

  export type store_sectionAvgOrderByAggregateInput = {
    section_id?: SortOrder
    location_id?: SortOrder
    sort_order?: SortOrder
  }

  export type store_sectionMaxOrderByAggregateInput = {
    section_id?: SortOrder
    location_id?: SortOrder
    name?: SortOrder
    sort_order?: SortOrder
  }

  export type store_sectionMinOrderByAggregateInput = {
    section_id?: SortOrder
    location_id?: SortOrder
    name?: SortOrder
    sort_order?: SortOrder
  }

  export type store_sectionSumOrderByAggregateInput = {
    section_id?: SortOrder
    location_id?: SortOrder
    sort_order?: SortOrder
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type userOrderByRelevanceInput = {
    fields: userOrderByRelevanceFieldEnum | userOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type userCountOrderByAggregateInput = {
    user_id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    auth_key?: SortOrder
  }

  export type userAvgOrderByAggregateInput = {
    user_id?: SortOrder
  }

  export type userMaxOrderByAggregateInput = {
    user_id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    auth_key?: SortOrder
  }

  export type userMinOrderByAggregateInput = {
    user_id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    auth_key?: SortOrder
  }

  export type userSumOrderByAggregateInput = {
    user_id?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type itemCreateNestedManyWithoutLocationInput = {
    create?: XOR<itemCreateWithoutLocationInput, itemUncheckedCreateWithoutLocationInput> | itemCreateWithoutLocationInput[] | itemUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: itemCreateOrConnectWithoutLocationInput | itemCreateOrConnectWithoutLocationInput[]
    createMany?: itemCreateManyLocationInputEnvelope
    connect?: itemWhereUniqueInput | itemWhereUniqueInput[]
  }

  export type shopping_listCreateNestedManyWithoutLocationInput = {
    create?: XOR<shopping_listCreateWithoutLocationInput, shopping_listUncheckedCreateWithoutLocationInput> | shopping_listCreateWithoutLocationInput[] | shopping_listUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: shopping_listCreateOrConnectWithoutLocationInput | shopping_listCreateOrConnectWithoutLocationInput[]
    createMany?: shopping_listCreateManyLocationInputEnvelope
    connect?: shopping_listWhereUniqueInput | shopping_listWhereUniqueInput[]
  }

  export type store_sectionCreateNestedManyWithoutLocationInput = {
    create?: XOR<store_sectionCreateWithoutLocationInput, store_sectionUncheckedCreateWithoutLocationInput> | store_sectionCreateWithoutLocationInput[] | store_sectionUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: store_sectionCreateOrConnectWithoutLocationInput | store_sectionCreateOrConnectWithoutLocationInput[]
    createMany?: store_sectionCreateManyLocationInputEnvelope
    connect?: store_sectionWhereUniqueInput | store_sectionWhereUniqueInput[]
  }

  export type itemUncheckedCreateNestedManyWithoutLocationInput = {
    create?: XOR<itemCreateWithoutLocationInput, itemUncheckedCreateWithoutLocationInput> | itemCreateWithoutLocationInput[] | itemUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: itemCreateOrConnectWithoutLocationInput | itemCreateOrConnectWithoutLocationInput[]
    createMany?: itemCreateManyLocationInputEnvelope
    connect?: itemWhereUniqueInput | itemWhereUniqueInput[]
  }

  export type shopping_listUncheckedCreateNestedManyWithoutLocationInput = {
    create?: XOR<shopping_listCreateWithoutLocationInput, shopping_listUncheckedCreateWithoutLocationInput> | shopping_listCreateWithoutLocationInput[] | shopping_listUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: shopping_listCreateOrConnectWithoutLocationInput | shopping_listCreateOrConnectWithoutLocationInput[]
    createMany?: shopping_listCreateManyLocationInputEnvelope
    connect?: shopping_listWhereUniqueInput | shopping_listWhereUniqueInput[]
  }

  export type store_sectionUncheckedCreateNestedManyWithoutLocationInput = {
    create?: XOR<store_sectionCreateWithoutLocationInput, store_sectionUncheckedCreateWithoutLocationInput> | store_sectionCreateWithoutLocationInput[] | store_sectionUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: store_sectionCreateOrConnectWithoutLocationInput | store_sectionCreateOrConnectWithoutLocationInput[]
    createMany?: store_sectionCreateManyLocationInputEnvelope
    connect?: store_sectionWhereUniqueInput | store_sectionWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type itemUpdateManyWithoutLocationNestedInput = {
    create?: XOR<itemCreateWithoutLocationInput, itemUncheckedCreateWithoutLocationInput> | itemCreateWithoutLocationInput[] | itemUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: itemCreateOrConnectWithoutLocationInput | itemCreateOrConnectWithoutLocationInput[]
    upsert?: itemUpsertWithWhereUniqueWithoutLocationInput | itemUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: itemCreateManyLocationInputEnvelope
    set?: itemWhereUniqueInput | itemWhereUniqueInput[]
    disconnect?: itemWhereUniqueInput | itemWhereUniqueInput[]
    delete?: itemWhereUniqueInput | itemWhereUniqueInput[]
    connect?: itemWhereUniqueInput | itemWhereUniqueInput[]
    update?: itemUpdateWithWhereUniqueWithoutLocationInput | itemUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: itemUpdateManyWithWhereWithoutLocationInput | itemUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: itemScalarWhereInput | itemScalarWhereInput[]
  }

  export type shopping_listUpdateManyWithoutLocationNestedInput = {
    create?: XOR<shopping_listCreateWithoutLocationInput, shopping_listUncheckedCreateWithoutLocationInput> | shopping_listCreateWithoutLocationInput[] | shopping_listUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: shopping_listCreateOrConnectWithoutLocationInput | shopping_listCreateOrConnectWithoutLocationInput[]
    upsert?: shopping_listUpsertWithWhereUniqueWithoutLocationInput | shopping_listUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: shopping_listCreateManyLocationInputEnvelope
    set?: shopping_listWhereUniqueInput | shopping_listWhereUniqueInput[]
    disconnect?: shopping_listWhereUniqueInput | shopping_listWhereUniqueInput[]
    delete?: shopping_listWhereUniqueInput | shopping_listWhereUniqueInput[]
    connect?: shopping_listWhereUniqueInput | shopping_listWhereUniqueInput[]
    update?: shopping_listUpdateWithWhereUniqueWithoutLocationInput | shopping_listUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: shopping_listUpdateManyWithWhereWithoutLocationInput | shopping_listUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: shopping_listScalarWhereInput | shopping_listScalarWhereInput[]
  }

  export type store_sectionUpdateManyWithoutLocationNestedInput = {
    create?: XOR<store_sectionCreateWithoutLocationInput, store_sectionUncheckedCreateWithoutLocationInput> | store_sectionCreateWithoutLocationInput[] | store_sectionUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: store_sectionCreateOrConnectWithoutLocationInput | store_sectionCreateOrConnectWithoutLocationInput[]
    upsert?: store_sectionUpsertWithWhereUniqueWithoutLocationInput | store_sectionUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: store_sectionCreateManyLocationInputEnvelope
    set?: store_sectionWhereUniqueInput | store_sectionWhereUniqueInput[]
    disconnect?: store_sectionWhereUniqueInput | store_sectionWhereUniqueInput[]
    delete?: store_sectionWhereUniqueInput | store_sectionWhereUniqueInput[]
    connect?: store_sectionWhereUniqueInput | store_sectionWhereUniqueInput[]
    update?: store_sectionUpdateWithWhereUniqueWithoutLocationInput | store_sectionUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: store_sectionUpdateManyWithWhereWithoutLocationInput | store_sectionUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: store_sectionScalarWhereInput | store_sectionScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type itemUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<itemCreateWithoutLocationInput, itemUncheckedCreateWithoutLocationInput> | itemCreateWithoutLocationInput[] | itemUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: itemCreateOrConnectWithoutLocationInput | itemCreateOrConnectWithoutLocationInput[]
    upsert?: itemUpsertWithWhereUniqueWithoutLocationInput | itemUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: itemCreateManyLocationInputEnvelope
    set?: itemWhereUniqueInput | itemWhereUniqueInput[]
    disconnect?: itemWhereUniqueInput | itemWhereUniqueInput[]
    delete?: itemWhereUniqueInput | itemWhereUniqueInput[]
    connect?: itemWhereUniqueInput | itemWhereUniqueInput[]
    update?: itemUpdateWithWhereUniqueWithoutLocationInput | itemUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: itemUpdateManyWithWhereWithoutLocationInput | itemUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: itemScalarWhereInput | itemScalarWhereInput[]
  }

  export type shopping_listUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<shopping_listCreateWithoutLocationInput, shopping_listUncheckedCreateWithoutLocationInput> | shopping_listCreateWithoutLocationInput[] | shopping_listUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: shopping_listCreateOrConnectWithoutLocationInput | shopping_listCreateOrConnectWithoutLocationInput[]
    upsert?: shopping_listUpsertWithWhereUniqueWithoutLocationInput | shopping_listUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: shopping_listCreateManyLocationInputEnvelope
    set?: shopping_listWhereUniqueInput | shopping_listWhereUniqueInput[]
    disconnect?: shopping_listWhereUniqueInput | shopping_listWhereUniqueInput[]
    delete?: shopping_listWhereUniqueInput | shopping_listWhereUniqueInput[]
    connect?: shopping_listWhereUniqueInput | shopping_listWhereUniqueInput[]
    update?: shopping_listUpdateWithWhereUniqueWithoutLocationInput | shopping_listUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: shopping_listUpdateManyWithWhereWithoutLocationInput | shopping_listUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: shopping_listScalarWhereInput | shopping_listScalarWhereInput[]
  }

  export type store_sectionUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<store_sectionCreateWithoutLocationInput, store_sectionUncheckedCreateWithoutLocationInput> | store_sectionCreateWithoutLocationInput[] | store_sectionUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: store_sectionCreateOrConnectWithoutLocationInput | store_sectionCreateOrConnectWithoutLocationInput[]
    upsert?: store_sectionUpsertWithWhereUniqueWithoutLocationInput | store_sectionUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: store_sectionCreateManyLocationInputEnvelope
    set?: store_sectionWhereUniqueInput | store_sectionWhereUniqueInput[]
    disconnect?: store_sectionWhereUniqueInput | store_sectionWhereUniqueInput[]
    delete?: store_sectionWhereUniqueInput | store_sectionWhereUniqueInput[]
    connect?: store_sectionWhereUniqueInput | store_sectionWhereUniqueInput[]
    update?: store_sectionUpdateWithWhereUniqueWithoutLocationInput | store_sectionUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: store_sectionUpdateManyWithWhereWithoutLocationInput | store_sectionUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: store_sectionScalarWhereInput | store_sectionScalarWhereInput[]
  }

  export type locationCreateNestedOneWithoutItemInput = {
    create?: XOR<locationCreateWithoutItemInput, locationUncheckedCreateWithoutItemInput>
    connectOrCreate?: locationCreateOrConnectWithoutItemInput
    connect?: locationWhereUniqueInput
  }

  export type store_sectionCreateNestedOneWithoutItemInput = {
    create?: XOR<store_sectionCreateWithoutItemInput, store_sectionUncheckedCreateWithoutItemInput>
    connectOrCreate?: store_sectionCreateOrConnectWithoutItemInput
    connect?: store_sectionWhereUniqueInput
  }

  export type item_in_listCreateNestedManyWithoutItemInput = {
    create?: XOR<item_in_listCreateWithoutItemInput, item_in_listUncheckedCreateWithoutItemInput> | item_in_listCreateWithoutItemInput[] | item_in_listUncheckedCreateWithoutItemInput[]
    connectOrCreate?: item_in_listCreateOrConnectWithoutItemInput | item_in_listCreateOrConnectWithoutItemInput[]
    createMany?: item_in_listCreateManyItemInputEnvelope
    connect?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
  }

  export type item_price_historyCreateNestedManyWithoutItemInput = {
    create?: XOR<item_price_historyCreateWithoutItemInput, item_price_historyUncheckedCreateWithoutItemInput> | item_price_historyCreateWithoutItemInput[] | item_price_historyUncheckedCreateWithoutItemInput[]
    connectOrCreate?: item_price_historyCreateOrConnectWithoutItemInput | item_price_historyCreateOrConnectWithoutItemInput[]
    createMany?: item_price_historyCreateManyItemInputEnvelope
    connect?: item_price_historyWhereUniqueInput | item_price_historyWhereUniqueInput[]
  }

  export type item_favoriteCreateNestedManyWithoutItemInput = {
    create?: XOR<item_favoriteCreateWithoutItemInput, item_favoriteUncheckedCreateWithoutItemInput> | item_favoriteCreateWithoutItemInput[] | item_favoriteUncheckedCreateWithoutItemInput[]
    connectOrCreate?: item_favoriteCreateOrConnectWithoutItemInput | item_favoriteCreateOrConnectWithoutItemInput[]
    createMany?: item_favoriteCreateManyItemInputEnvelope
    connect?: item_favoriteWhereUniqueInput | item_favoriteWhereUniqueInput[]
  }

  export type item_in_listUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<item_in_listCreateWithoutItemInput, item_in_listUncheckedCreateWithoutItemInput> | item_in_listCreateWithoutItemInput[] | item_in_listUncheckedCreateWithoutItemInput[]
    connectOrCreate?: item_in_listCreateOrConnectWithoutItemInput | item_in_listCreateOrConnectWithoutItemInput[]
    createMany?: item_in_listCreateManyItemInputEnvelope
    connect?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
  }

  export type item_price_historyUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<item_price_historyCreateWithoutItemInput, item_price_historyUncheckedCreateWithoutItemInput> | item_price_historyCreateWithoutItemInput[] | item_price_historyUncheckedCreateWithoutItemInput[]
    connectOrCreate?: item_price_historyCreateOrConnectWithoutItemInput | item_price_historyCreateOrConnectWithoutItemInput[]
    createMany?: item_price_historyCreateManyItemInputEnvelope
    connect?: item_price_historyWhereUniqueInput | item_price_historyWhereUniqueInput[]
  }

  export type item_favoriteUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<item_favoriteCreateWithoutItemInput, item_favoriteUncheckedCreateWithoutItemInput> | item_favoriteCreateWithoutItemInput[] | item_favoriteUncheckedCreateWithoutItemInput[]
    connectOrCreate?: item_favoriteCreateOrConnectWithoutItemInput | item_favoriteCreateOrConnectWithoutItemInput[]
    createMany?: item_favoriteCreateManyItemInputEnvelope
    connect?: item_favoriteWhereUniqueInput | item_favoriteWhereUniqueInput[]
  }

  export type locationUpdateOneWithoutItemNestedInput = {
    create?: XOR<locationCreateWithoutItemInput, locationUncheckedCreateWithoutItemInput>
    connectOrCreate?: locationCreateOrConnectWithoutItemInput
    upsert?: locationUpsertWithoutItemInput
    disconnect?: locationWhereInput | boolean
    delete?: locationWhereInput | boolean
    connect?: locationWhereUniqueInput
    update?: XOR<XOR<locationUpdateToOneWithWhereWithoutItemInput, locationUpdateWithoutItemInput>, locationUncheckedUpdateWithoutItemInput>
  }

  export type store_sectionUpdateOneWithoutItemNestedInput = {
    create?: XOR<store_sectionCreateWithoutItemInput, store_sectionUncheckedCreateWithoutItemInput>
    connectOrCreate?: store_sectionCreateOrConnectWithoutItemInput
    upsert?: store_sectionUpsertWithoutItemInput
    disconnect?: store_sectionWhereInput | boolean
    delete?: store_sectionWhereInput | boolean
    connect?: store_sectionWhereUniqueInput
    update?: XOR<XOR<store_sectionUpdateToOneWithWhereWithoutItemInput, store_sectionUpdateWithoutItemInput>, store_sectionUncheckedUpdateWithoutItemInput>
  }

  export type item_in_listUpdateManyWithoutItemNestedInput = {
    create?: XOR<item_in_listCreateWithoutItemInput, item_in_listUncheckedCreateWithoutItemInput> | item_in_listCreateWithoutItemInput[] | item_in_listUncheckedCreateWithoutItemInput[]
    connectOrCreate?: item_in_listCreateOrConnectWithoutItemInput | item_in_listCreateOrConnectWithoutItemInput[]
    upsert?: item_in_listUpsertWithWhereUniqueWithoutItemInput | item_in_listUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: item_in_listCreateManyItemInputEnvelope
    set?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    disconnect?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    delete?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    connect?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    update?: item_in_listUpdateWithWhereUniqueWithoutItemInput | item_in_listUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: item_in_listUpdateManyWithWhereWithoutItemInput | item_in_listUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: item_in_listScalarWhereInput | item_in_listScalarWhereInput[]
  }

  export type item_price_historyUpdateManyWithoutItemNestedInput = {
    create?: XOR<item_price_historyCreateWithoutItemInput, item_price_historyUncheckedCreateWithoutItemInput> | item_price_historyCreateWithoutItemInput[] | item_price_historyUncheckedCreateWithoutItemInput[]
    connectOrCreate?: item_price_historyCreateOrConnectWithoutItemInput | item_price_historyCreateOrConnectWithoutItemInput[]
    upsert?: item_price_historyUpsertWithWhereUniqueWithoutItemInput | item_price_historyUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: item_price_historyCreateManyItemInputEnvelope
    set?: item_price_historyWhereUniqueInput | item_price_historyWhereUniqueInput[]
    disconnect?: item_price_historyWhereUniqueInput | item_price_historyWhereUniqueInput[]
    delete?: item_price_historyWhereUniqueInput | item_price_historyWhereUniqueInput[]
    connect?: item_price_historyWhereUniqueInput | item_price_historyWhereUniqueInput[]
    update?: item_price_historyUpdateWithWhereUniqueWithoutItemInput | item_price_historyUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: item_price_historyUpdateManyWithWhereWithoutItemInput | item_price_historyUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: item_price_historyScalarWhereInput | item_price_historyScalarWhereInput[]
  }

  export type item_favoriteUpdateManyWithoutItemNestedInput = {
    create?: XOR<item_favoriteCreateWithoutItemInput, item_favoriteUncheckedCreateWithoutItemInput> | item_favoriteCreateWithoutItemInput[] | item_favoriteUncheckedCreateWithoutItemInput[]
    connectOrCreate?: item_favoriteCreateOrConnectWithoutItemInput | item_favoriteCreateOrConnectWithoutItemInput[]
    upsert?: item_favoriteUpsertWithWhereUniqueWithoutItemInput | item_favoriteUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: item_favoriteCreateManyItemInputEnvelope
    set?: item_favoriteWhereUniqueInput | item_favoriteWhereUniqueInput[]
    disconnect?: item_favoriteWhereUniqueInput | item_favoriteWhereUniqueInput[]
    delete?: item_favoriteWhereUniqueInput | item_favoriteWhereUniqueInput[]
    connect?: item_favoriteWhereUniqueInput | item_favoriteWhereUniqueInput[]
    update?: item_favoriteUpdateWithWhereUniqueWithoutItemInput | item_favoriteUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: item_favoriteUpdateManyWithWhereWithoutItemInput | item_favoriteUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: item_favoriteScalarWhereInput | item_favoriteScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type item_in_listUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<item_in_listCreateWithoutItemInput, item_in_listUncheckedCreateWithoutItemInput> | item_in_listCreateWithoutItemInput[] | item_in_listUncheckedCreateWithoutItemInput[]
    connectOrCreate?: item_in_listCreateOrConnectWithoutItemInput | item_in_listCreateOrConnectWithoutItemInput[]
    upsert?: item_in_listUpsertWithWhereUniqueWithoutItemInput | item_in_listUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: item_in_listCreateManyItemInputEnvelope
    set?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    disconnect?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    delete?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    connect?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    update?: item_in_listUpdateWithWhereUniqueWithoutItemInput | item_in_listUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: item_in_listUpdateManyWithWhereWithoutItemInput | item_in_listUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: item_in_listScalarWhereInput | item_in_listScalarWhereInput[]
  }

  export type item_price_historyUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<item_price_historyCreateWithoutItemInput, item_price_historyUncheckedCreateWithoutItemInput> | item_price_historyCreateWithoutItemInput[] | item_price_historyUncheckedCreateWithoutItemInput[]
    connectOrCreate?: item_price_historyCreateOrConnectWithoutItemInput | item_price_historyCreateOrConnectWithoutItemInput[]
    upsert?: item_price_historyUpsertWithWhereUniqueWithoutItemInput | item_price_historyUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: item_price_historyCreateManyItemInputEnvelope
    set?: item_price_historyWhereUniqueInput | item_price_historyWhereUniqueInput[]
    disconnect?: item_price_historyWhereUniqueInput | item_price_historyWhereUniqueInput[]
    delete?: item_price_historyWhereUniqueInput | item_price_historyWhereUniqueInput[]
    connect?: item_price_historyWhereUniqueInput | item_price_historyWhereUniqueInput[]
    update?: item_price_historyUpdateWithWhereUniqueWithoutItemInput | item_price_historyUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: item_price_historyUpdateManyWithWhereWithoutItemInput | item_price_historyUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: item_price_historyScalarWhereInput | item_price_historyScalarWhereInput[]
  }

  export type item_favoriteUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<item_favoriteCreateWithoutItemInput, item_favoriteUncheckedCreateWithoutItemInput> | item_favoriteCreateWithoutItemInput[] | item_favoriteUncheckedCreateWithoutItemInput[]
    connectOrCreate?: item_favoriteCreateOrConnectWithoutItemInput | item_favoriteCreateOrConnectWithoutItemInput[]
    upsert?: item_favoriteUpsertWithWhereUniqueWithoutItemInput | item_favoriteUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: item_favoriteCreateManyItemInputEnvelope
    set?: item_favoriteWhereUniqueInput | item_favoriteWhereUniqueInput[]
    disconnect?: item_favoriteWhereUniqueInput | item_favoriteWhereUniqueInput[]
    delete?: item_favoriteWhereUniqueInput | item_favoriteWhereUniqueInput[]
    connect?: item_favoriteWhereUniqueInput | item_favoriteWhereUniqueInput[]
    update?: item_favoriteUpdateWithWhereUniqueWithoutItemInput | item_favoriteUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: item_favoriteUpdateManyWithWhereWithoutItemInput | item_favoriteUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: item_favoriteScalarWhereInput | item_favoriteScalarWhereInput[]
  }

  export type userCreateNestedOneWithoutItem_in_listInput = {
    create?: XOR<userCreateWithoutItem_in_listInput, userUncheckedCreateWithoutItem_in_listInput>
    connectOrCreate?: userCreateOrConnectWithoutItem_in_listInput
    connect?: userWhereUniqueInput
  }

  export type itemCreateNestedOneWithoutItem_in_listInput = {
    create?: XOR<itemCreateWithoutItem_in_listInput, itemUncheckedCreateWithoutItem_in_listInput>
    connectOrCreate?: itemCreateOrConnectWithoutItem_in_listInput
    connect?: itemWhereUniqueInput
  }

  export type shopping_listCreateNestedOneWithoutItem_in_listInput = {
    create?: XOR<shopping_listCreateWithoutItem_in_listInput, shopping_listUncheckedCreateWithoutItem_in_listInput>
    connectOrCreate?: shopping_listCreateOrConnectWithoutItem_in_listInput
    connect?: shopping_listWhereUniqueInput
  }

  export type item_statusCreateNestedOneWithoutItem_in_listInput = {
    create?: XOR<item_statusCreateWithoutItem_in_listInput, item_statusUncheckedCreateWithoutItem_in_listInput>
    connectOrCreate?: item_statusCreateOrConnectWithoutItem_in_listInput
    connect?: item_statusWhereUniqueInput
  }

  export type userUpdateOneWithoutItem_in_listNestedInput = {
    create?: XOR<userCreateWithoutItem_in_listInput, userUncheckedCreateWithoutItem_in_listInput>
    connectOrCreate?: userCreateOrConnectWithoutItem_in_listInput
    upsert?: userUpsertWithoutItem_in_listInput
    disconnect?: userWhereInput | boolean
    delete?: userWhereInput | boolean
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutItem_in_listInput, userUpdateWithoutItem_in_listInput>, userUncheckedUpdateWithoutItem_in_listInput>
  }

  export type itemUpdateOneWithoutItem_in_listNestedInput = {
    create?: XOR<itemCreateWithoutItem_in_listInput, itemUncheckedCreateWithoutItem_in_listInput>
    connectOrCreate?: itemCreateOrConnectWithoutItem_in_listInput
    upsert?: itemUpsertWithoutItem_in_listInput
    disconnect?: itemWhereInput | boolean
    delete?: itemWhereInput | boolean
    connect?: itemWhereUniqueInput
    update?: XOR<XOR<itemUpdateToOneWithWhereWithoutItem_in_listInput, itemUpdateWithoutItem_in_listInput>, itemUncheckedUpdateWithoutItem_in_listInput>
  }

  export type shopping_listUpdateOneWithoutItem_in_listNestedInput = {
    create?: XOR<shopping_listCreateWithoutItem_in_listInput, shopping_listUncheckedCreateWithoutItem_in_listInput>
    connectOrCreate?: shopping_listCreateOrConnectWithoutItem_in_listInput
    upsert?: shopping_listUpsertWithoutItem_in_listInput
    disconnect?: shopping_listWhereInput | boolean
    delete?: shopping_listWhereInput | boolean
    connect?: shopping_listWhereUniqueInput
    update?: XOR<XOR<shopping_listUpdateToOneWithWhereWithoutItem_in_listInput, shopping_listUpdateWithoutItem_in_listInput>, shopping_listUncheckedUpdateWithoutItem_in_listInput>
  }

  export type item_statusUpdateOneWithoutItem_in_listNestedInput = {
    create?: XOR<item_statusCreateWithoutItem_in_listInput, item_statusUncheckedCreateWithoutItem_in_listInput>
    connectOrCreate?: item_statusCreateOrConnectWithoutItem_in_listInput
    upsert?: item_statusUpsertWithoutItem_in_listInput
    disconnect?: item_statusWhereInput | boolean
    delete?: item_statusWhereInput | boolean
    connect?: item_statusWhereUniqueInput
    update?: XOR<XOR<item_statusUpdateToOneWithWhereWithoutItem_in_listInput, item_statusUpdateWithoutItem_in_listInput>, item_statusUncheckedUpdateWithoutItem_in_listInput>
  }

  export type itemCreateNestedOneWithoutItem_price_historyInput = {
    create?: XOR<itemCreateWithoutItem_price_historyInput, itemUncheckedCreateWithoutItem_price_historyInput>
    connectOrCreate?: itemCreateOrConnectWithoutItem_price_historyInput
    connect?: itemWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type itemUpdateOneWithoutItem_price_historyNestedInput = {
    create?: XOR<itemCreateWithoutItem_price_historyInput, itemUncheckedCreateWithoutItem_price_historyInput>
    connectOrCreate?: itemCreateOrConnectWithoutItem_price_historyInput
    upsert?: itemUpsertWithoutItem_price_historyInput
    disconnect?: itemWhereInput | boolean
    delete?: itemWhereInput | boolean
    connect?: itemWhereUniqueInput
    update?: XOR<XOR<itemUpdateToOneWithWhereWithoutItem_price_historyInput, itemUpdateWithoutItem_price_historyInput>, itemUncheckedUpdateWithoutItem_price_historyInput>
  }

  export type item_in_listCreateNestedManyWithoutItem_statusInput = {
    create?: XOR<item_in_listCreateWithoutItem_statusInput, item_in_listUncheckedCreateWithoutItem_statusInput> | item_in_listCreateWithoutItem_statusInput[] | item_in_listUncheckedCreateWithoutItem_statusInput[]
    connectOrCreate?: item_in_listCreateOrConnectWithoutItem_statusInput | item_in_listCreateOrConnectWithoutItem_statusInput[]
    createMany?: item_in_listCreateManyItem_statusInputEnvelope
    connect?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
  }

  export type item_in_listUncheckedCreateNestedManyWithoutItem_statusInput = {
    create?: XOR<item_in_listCreateWithoutItem_statusInput, item_in_listUncheckedCreateWithoutItem_statusInput> | item_in_listCreateWithoutItem_statusInput[] | item_in_listUncheckedCreateWithoutItem_statusInput[]
    connectOrCreate?: item_in_listCreateOrConnectWithoutItem_statusInput | item_in_listCreateOrConnectWithoutItem_statusInput[]
    createMany?: item_in_listCreateManyItem_statusInputEnvelope
    connect?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
  }

  export type item_in_listUpdateManyWithoutItem_statusNestedInput = {
    create?: XOR<item_in_listCreateWithoutItem_statusInput, item_in_listUncheckedCreateWithoutItem_statusInput> | item_in_listCreateWithoutItem_statusInput[] | item_in_listUncheckedCreateWithoutItem_statusInput[]
    connectOrCreate?: item_in_listCreateOrConnectWithoutItem_statusInput | item_in_listCreateOrConnectWithoutItem_statusInput[]
    upsert?: item_in_listUpsertWithWhereUniqueWithoutItem_statusInput | item_in_listUpsertWithWhereUniqueWithoutItem_statusInput[]
    createMany?: item_in_listCreateManyItem_statusInputEnvelope
    set?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    disconnect?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    delete?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    connect?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    update?: item_in_listUpdateWithWhereUniqueWithoutItem_statusInput | item_in_listUpdateWithWhereUniqueWithoutItem_statusInput[]
    updateMany?: item_in_listUpdateManyWithWhereWithoutItem_statusInput | item_in_listUpdateManyWithWhereWithoutItem_statusInput[]
    deleteMany?: item_in_listScalarWhereInput | item_in_listScalarWhereInput[]
  }

  export type item_in_listUncheckedUpdateManyWithoutItem_statusNestedInput = {
    create?: XOR<item_in_listCreateWithoutItem_statusInput, item_in_listUncheckedCreateWithoutItem_statusInput> | item_in_listCreateWithoutItem_statusInput[] | item_in_listUncheckedCreateWithoutItem_statusInput[]
    connectOrCreate?: item_in_listCreateOrConnectWithoutItem_statusInput | item_in_listCreateOrConnectWithoutItem_statusInput[]
    upsert?: item_in_listUpsertWithWhereUniqueWithoutItem_statusInput | item_in_listUpsertWithWhereUniqueWithoutItem_statusInput[]
    createMany?: item_in_listCreateManyItem_statusInputEnvelope
    set?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    disconnect?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    delete?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    connect?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    update?: item_in_listUpdateWithWhereUniqueWithoutItem_statusInput | item_in_listUpdateWithWhereUniqueWithoutItem_statusInput[]
    updateMany?: item_in_listUpdateManyWithWhereWithoutItem_statusInput | item_in_listUpdateManyWithWhereWithoutItem_statusInput[]
    deleteMany?: item_in_listScalarWhereInput | item_in_listScalarWhereInput[]
  }

  export type userCreateNestedOneWithoutItem_favoriteInput = {
    create?: XOR<userCreateWithoutItem_favoriteInput, userUncheckedCreateWithoutItem_favoriteInput>
    connectOrCreate?: userCreateOrConnectWithoutItem_favoriteInput
    connect?: userWhereUniqueInput
  }

  export type itemCreateNestedOneWithoutItem_favoriteInput = {
    create?: XOR<itemCreateWithoutItem_favoriteInput, itemUncheckedCreateWithoutItem_favoriteInput>
    connectOrCreate?: itemCreateOrConnectWithoutItem_favoriteInput
    connect?: itemWhereUniqueInput
  }

  export type userUpdateOneRequiredWithoutItem_favoriteNestedInput = {
    create?: XOR<userCreateWithoutItem_favoriteInput, userUncheckedCreateWithoutItem_favoriteInput>
    connectOrCreate?: userCreateOrConnectWithoutItem_favoriteInput
    upsert?: userUpsertWithoutItem_favoriteInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutItem_favoriteInput, userUpdateWithoutItem_favoriteInput>, userUncheckedUpdateWithoutItem_favoriteInput>
  }

  export type itemUpdateOneRequiredWithoutItem_favoriteNestedInput = {
    create?: XOR<itemCreateWithoutItem_favoriteInput, itemUncheckedCreateWithoutItem_favoriteInput>
    connectOrCreate?: itemCreateOrConnectWithoutItem_favoriteInput
    upsert?: itemUpsertWithoutItem_favoriteInput
    connect?: itemWhereUniqueInput
    update?: XOR<XOR<itemUpdateToOneWithWhereWithoutItem_favoriteInput, itemUpdateWithoutItem_favoriteInput>, itemUncheckedUpdateWithoutItem_favoriteInput>
  }

  export type item_in_listCreateNestedManyWithoutShopping_listInput = {
    create?: XOR<item_in_listCreateWithoutShopping_listInput, item_in_listUncheckedCreateWithoutShopping_listInput> | item_in_listCreateWithoutShopping_listInput[] | item_in_listUncheckedCreateWithoutShopping_listInput[]
    connectOrCreate?: item_in_listCreateOrConnectWithoutShopping_listInput | item_in_listCreateOrConnectWithoutShopping_listInput[]
    createMany?: item_in_listCreateManyShopping_listInputEnvelope
    connect?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
  }

  export type locationCreateNestedOneWithoutShopping_listInput = {
    create?: XOR<locationCreateWithoutShopping_listInput, locationUncheckedCreateWithoutShopping_listInput>
    connectOrCreate?: locationCreateOrConnectWithoutShopping_listInput
    connect?: locationWhereUniqueInput
  }

  export type item_in_listUncheckedCreateNestedManyWithoutShopping_listInput = {
    create?: XOR<item_in_listCreateWithoutShopping_listInput, item_in_listUncheckedCreateWithoutShopping_listInput> | item_in_listCreateWithoutShopping_listInput[] | item_in_listUncheckedCreateWithoutShopping_listInput[]
    connectOrCreate?: item_in_listCreateOrConnectWithoutShopping_listInput | item_in_listCreateOrConnectWithoutShopping_listInput[]
    createMany?: item_in_listCreateManyShopping_listInputEnvelope
    connect?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type item_in_listUpdateManyWithoutShopping_listNestedInput = {
    create?: XOR<item_in_listCreateWithoutShopping_listInput, item_in_listUncheckedCreateWithoutShopping_listInput> | item_in_listCreateWithoutShopping_listInput[] | item_in_listUncheckedCreateWithoutShopping_listInput[]
    connectOrCreate?: item_in_listCreateOrConnectWithoutShopping_listInput | item_in_listCreateOrConnectWithoutShopping_listInput[]
    upsert?: item_in_listUpsertWithWhereUniqueWithoutShopping_listInput | item_in_listUpsertWithWhereUniqueWithoutShopping_listInput[]
    createMany?: item_in_listCreateManyShopping_listInputEnvelope
    set?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    disconnect?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    delete?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    connect?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    update?: item_in_listUpdateWithWhereUniqueWithoutShopping_listInput | item_in_listUpdateWithWhereUniqueWithoutShopping_listInput[]
    updateMany?: item_in_listUpdateManyWithWhereWithoutShopping_listInput | item_in_listUpdateManyWithWhereWithoutShopping_listInput[]
    deleteMany?: item_in_listScalarWhereInput | item_in_listScalarWhereInput[]
  }

  export type locationUpdateOneWithoutShopping_listNestedInput = {
    create?: XOR<locationCreateWithoutShopping_listInput, locationUncheckedCreateWithoutShopping_listInput>
    connectOrCreate?: locationCreateOrConnectWithoutShopping_listInput
    upsert?: locationUpsertWithoutShopping_listInput
    disconnect?: locationWhereInput | boolean
    delete?: locationWhereInput | boolean
    connect?: locationWhereUniqueInput
    update?: XOR<XOR<locationUpdateToOneWithWhereWithoutShopping_listInput, locationUpdateWithoutShopping_listInput>, locationUncheckedUpdateWithoutShopping_listInput>
  }

  export type item_in_listUncheckedUpdateManyWithoutShopping_listNestedInput = {
    create?: XOR<item_in_listCreateWithoutShopping_listInput, item_in_listUncheckedCreateWithoutShopping_listInput> | item_in_listCreateWithoutShopping_listInput[] | item_in_listUncheckedCreateWithoutShopping_listInput[]
    connectOrCreate?: item_in_listCreateOrConnectWithoutShopping_listInput | item_in_listCreateOrConnectWithoutShopping_listInput[]
    upsert?: item_in_listUpsertWithWhereUniqueWithoutShopping_listInput | item_in_listUpsertWithWhereUniqueWithoutShopping_listInput[]
    createMany?: item_in_listCreateManyShopping_listInputEnvelope
    set?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    disconnect?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    delete?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    connect?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    update?: item_in_listUpdateWithWhereUniqueWithoutShopping_listInput | item_in_listUpdateWithWhereUniqueWithoutShopping_listInput[]
    updateMany?: item_in_listUpdateManyWithWhereWithoutShopping_listInput | item_in_listUpdateManyWithWhereWithoutShopping_listInput[]
    deleteMany?: item_in_listScalarWhereInput | item_in_listScalarWhereInput[]
  }

  export type itemCreateNestedManyWithoutStore_sectionInput = {
    create?: XOR<itemCreateWithoutStore_sectionInput, itemUncheckedCreateWithoutStore_sectionInput> | itemCreateWithoutStore_sectionInput[] | itemUncheckedCreateWithoutStore_sectionInput[]
    connectOrCreate?: itemCreateOrConnectWithoutStore_sectionInput | itemCreateOrConnectWithoutStore_sectionInput[]
    createMany?: itemCreateManyStore_sectionInputEnvelope
    connect?: itemWhereUniqueInput | itemWhereUniqueInput[]
  }

  export type locationCreateNestedOneWithoutStore_sectionInput = {
    create?: XOR<locationCreateWithoutStore_sectionInput, locationUncheckedCreateWithoutStore_sectionInput>
    connectOrCreate?: locationCreateOrConnectWithoutStore_sectionInput
    connect?: locationWhereUniqueInput
  }

  export type itemUncheckedCreateNestedManyWithoutStore_sectionInput = {
    create?: XOR<itemCreateWithoutStore_sectionInput, itemUncheckedCreateWithoutStore_sectionInput> | itemCreateWithoutStore_sectionInput[] | itemUncheckedCreateWithoutStore_sectionInput[]
    connectOrCreate?: itemCreateOrConnectWithoutStore_sectionInput | itemCreateOrConnectWithoutStore_sectionInput[]
    createMany?: itemCreateManyStore_sectionInputEnvelope
    connect?: itemWhereUniqueInput | itemWhereUniqueInput[]
  }

  export type itemUpdateManyWithoutStore_sectionNestedInput = {
    create?: XOR<itemCreateWithoutStore_sectionInput, itemUncheckedCreateWithoutStore_sectionInput> | itemCreateWithoutStore_sectionInput[] | itemUncheckedCreateWithoutStore_sectionInput[]
    connectOrCreate?: itemCreateOrConnectWithoutStore_sectionInput | itemCreateOrConnectWithoutStore_sectionInput[]
    upsert?: itemUpsertWithWhereUniqueWithoutStore_sectionInput | itemUpsertWithWhereUniqueWithoutStore_sectionInput[]
    createMany?: itemCreateManyStore_sectionInputEnvelope
    set?: itemWhereUniqueInput | itemWhereUniqueInput[]
    disconnect?: itemWhereUniqueInput | itemWhereUniqueInput[]
    delete?: itemWhereUniqueInput | itemWhereUniqueInput[]
    connect?: itemWhereUniqueInput | itemWhereUniqueInput[]
    update?: itemUpdateWithWhereUniqueWithoutStore_sectionInput | itemUpdateWithWhereUniqueWithoutStore_sectionInput[]
    updateMany?: itemUpdateManyWithWhereWithoutStore_sectionInput | itemUpdateManyWithWhereWithoutStore_sectionInput[]
    deleteMany?: itemScalarWhereInput | itemScalarWhereInput[]
  }

  export type locationUpdateOneWithoutStore_sectionNestedInput = {
    create?: XOR<locationCreateWithoutStore_sectionInput, locationUncheckedCreateWithoutStore_sectionInput>
    connectOrCreate?: locationCreateOrConnectWithoutStore_sectionInput
    upsert?: locationUpsertWithoutStore_sectionInput
    disconnect?: locationWhereInput | boolean
    delete?: locationWhereInput | boolean
    connect?: locationWhereUniqueInput
    update?: XOR<XOR<locationUpdateToOneWithWhereWithoutStore_sectionInput, locationUpdateWithoutStore_sectionInput>, locationUncheckedUpdateWithoutStore_sectionInput>
  }

  export type itemUncheckedUpdateManyWithoutStore_sectionNestedInput = {
    create?: XOR<itemCreateWithoutStore_sectionInput, itemUncheckedCreateWithoutStore_sectionInput> | itemCreateWithoutStore_sectionInput[] | itemUncheckedCreateWithoutStore_sectionInput[]
    connectOrCreate?: itemCreateOrConnectWithoutStore_sectionInput | itemCreateOrConnectWithoutStore_sectionInput[]
    upsert?: itemUpsertWithWhereUniqueWithoutStore_sectionInput | itemUpsertWithWhereUniqueWithoutStore_sectionInput[]
    createMany?: itemCreateManyStore_sectionInputEnvelope
    set?: itemWhereUniqueInput | itemWhereUniqueInput[]
    disconnect?: itemWhereUniqueInput | itemWhereUniqueInput[]
    delete?: itemWhereUniqueInput | itemWhereUniqueInput[]
    connect?: itemWhereUniqueInput | itemWhereUniqueInput[]
    update?: itemUpdateWithWhereUniqueWithoutStore_sectionInput | itemUpdateWithWhereUniqueWithoutStore_sectionInput[]
    updateMany?: itemUpdateManyWithWhereWithoutStore_sectionInput | itemUpdateManyWithWhereWithoutStore_sectionInput[]
    deleteMany?: itemScalarWhereInput | itemScalarWhereInput[]
  }

  export type item_in_listCreateNestedManyWithoutUserInput = {
    create?: XOR<item_in_listCreateWithoutUserInput, item_in_listUncheckedCreateWithoutUserInput> | item_in_listCreateWithoutUserInput[] | item_in_listUncheckedCreateWithoutUserInput[]
    connectOrCreate?: item_in_listCreateOrConnectWithoutUserInput | item_in_listCreateOrConnectWithoutUserInput[]
    createMany?: item_in_listCreateManyUserInputEnvelope
    connect?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
  }

  export type item_favoriteCreateNestedManyWithoutUserInput = {
    create?: XOR<item_favoriteCreateWithoutUserInput, item_favoriteUncheckedCreateWithoutUserInput> | item_favoriteCreateWithoutUserInput[] | item_favoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: item_favoriteCreateOrConnectWithoutUserInput | item_favoriteCreateOrConnectWithoutUserInput[]
    createMany?: item_favoriteCreateManyUserInputEnvelope
    connect?: item_favoriteWhereUniqueInput | item_favoriteWhereUniqueInput[]
  }

  export type item_in_listUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<item_in_listCreateWithoutUserInput, item_in_listUncheckedCreateWithoutUserInput> | item_in_listCreateWithoutUserInput[] | item_in_listUncheckedCreateWithoutUserInput[]
    connectOrCreate?: item_in_listCreateOrConnectWithoutUserInput | item_in_listCreateOrConnectWithoutUserInput[]
    createMany?: item_in_listCreateManyUserInputEnvelope
    connect?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
  }

  export type item_favoriteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<item_favoriteCreateWithoutUserInput, item_favoriteUncheckedCreateWithoutUserInput> | item_favoriteCreateWithoutUserInput[] | item_favoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: item_favoriteCreateOrConnectWithoutUserInput | item_favoriteCreateOrConnectWithoutUserInput[]
    createMany?: item_favoriteCreateManyUserInputEnvelope
    connect?: item_favoriteWhereUniqueInput | item_favoriteWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type item_in_listUpdateManyWithoutUserNestedInput = {
    create?: XOR<item_in_listCreateWithoutUserInput, item_in_listUncheckedCreateWithoutUserInput> | item_in_listCreateWithoutUserInput[] | item_in_listUncheckedCreateWithoutUserInput[]
    connectOrCreate?: item_in_listCreateOrConnectWithoutUserInput | item_in_listCreateOrConnectWithoutUserInput[]
    upsert?: item_in_listUpsertWithWhereUniqueWithoutUserInput | item_in_listUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: item_in_listCreateManyUserInputEnvelope
    set?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    disconnect?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    delete?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    connect?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    update?: item_in_listUpdateWithWhereUniqueWithoutUserInput | item_in_listUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: item_in_listUpdateManyWithWhereWithoutUserInput | item_in_listUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: item_in_listScalarWhereInput | item_in_listScalarWhereInput[]
  }

  export type item_favoriteUpdateManyWithoutUserNestedInput = {
    create?: XOR<item_favoriteCreateWithoutUserInput, item_favoriteUncheckedCreateWithoutUserInput> | item_favoriteCreateWithoutUserInput[] | item_favoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: item_favoriteCreateOrConnectWithoutUserInput | item_favoriteCreateOrConnectWithoutUserInput[]
    upsert?: item_favoriteUpsertWithWhereUniqueWithoutUserInput | item_favoriteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: item_favoriteCreateManyUserInputEnvelope
    set?: item_favoriteWhereUniqueInput | item_favoriteWhereUniqueInput[]
    disconnect?: item_favoriteWhereUniqueInput | item_favoriteWhereUniqueInput[]
    delete?: item_favoriteWhereUniqueInput | item_favoriteWhereUniqueInput[]
    connect?: item_favoriteWhereUniqueInput | item_favoriteWhereUniqueInput[]
    update?: item_favoriteUpdateWithWhereUniqueWithoutUserInput | item_favoriteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: item_favoriteUpdateManyWithWhereWithoutUserInput | item_favoriteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: item_favoriteScalarWhereInput | item_favoriteScalarWhereInput[]
  }

  export type item_in_listUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<item_in_listCreateWithoutUserInput, item_in_listUncheckedCreateWithoutUserInput> | item_in_listCreateWithoutUserInput[] | item_in_listUncheckedCreateWithoutUserInput[]
    connectOrCreate?: item_in_listCreateOrConnectWithoutUserInput | item_in_listCreateOrConnectWithoutUserInput[]
    upsert?: item_in_listUpsertWithWhereUniqueWithoutUserInput | item_in_listUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: item_in_listCreateManyUserInputEnvelope
    set?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    disconnect?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    delete?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    connect?: item_in_listWhereUniqueInput | item_in_listWhereUniqueInput[]
    update?: item_in_listUpdateWithWhereUniqueWithoutUserInput | item_in_listUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: item_in_listUpdateManyWithWhereWithoutUserInput | item_in_listUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: item_in_listScalarWhereInput | item_in_listScalarWhereInput[]
  }

  export type item_favoriteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<item_favoriteCreateWithoutUserInput, item_favoriteUncheckedCreateWithoutUserInput> | item_favoriteCreateWithoutUserInput[] | item_favoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: item_favoriteCreateOrConnectWithoutUserInput | item_favoriteCreateOrConnectWithoutUserInput[]
    upsert?: item_favoriteUpsertWithWhereUniqueWithoutUserInput | item_favoriteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: item_favoriteCreateManyUserInputEnvelope
    set?: item_favoriteWhereUniqueInput | item_favoriteWhereUniqueInput[]
    disconnect?: item_favoriteWhereUniqueInput | item_favoriteWhereUniqueInput[]
    delete?: item_favoriteWhereUniqueInput | item_favoriteWhereUniqueInput[]
    connect?: item_favoriteWhereUniqueInput | item_favoriteWhereUniqueInput[]
    update?: item_favoriteUpdateWithWhereUniqueWithoutUserInput | item_favoriteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: item_favoriteUpdateManyWithWhereWithoutUserInput | item_favoriteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: item_favoriteScalarWhereInput | item_favoriteScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type itemCreateWithoutLocationInput = {
    name?: string | null
    image_path?: string | null
    store_section?: store_sectionCreateNestedOneWithoutItemInput
    item_in_list?: item_in_listCreateNestedManyWithoutItemInput
    item_price_history?: item_price_historyCreateNestedManyWithoutItemInput
    item_favorite?: item_favoriteCreateNestedManyWithoutItemInput
  }

  export type itemUncheckedCreateWithoutLocationInput = {
    item_id?: number
    name?: string | null
    image_path?: string | null
    section_id?: number | null
    item_in_list?: item_in_listUncheckedCreateNestedManyWithoutItemInput
    item_price_history?: item_price_historyUncheckedCreateNestedManyWithoutItemInput
    item_favorite?: item_favoriteUncheckedCreateNestedManyWithoutItemInput
  }

  export type itemCreateOrConnectWithoutLocationInput = {
    where: itemWhereUniqueInput
    create: XOR<itemCreateWithoutLocationInput, itemUncheckedCreateWithoutLocationInput>
  }

  export type itemCreateManyLocationInputEnvelope = {
    data: itemCreateManyLocationInput | itemCreateManyLocationInput[]
    skipDuplicates?: boolean
  }

  export type shopping_listCreateWithoutLocationInput = {
    paid?: boolean | null
    completed_at?: Date | string | null
    item_in_list?: item_in_listCreateNestedManyWithoutShopping_listInput
  }

  export type shopping_listUncheckedCreateWithoutLocationInput = {
    shopping_list_id?: number
    paid?: boolean | null
    completed_at?: Date | string | null
    item_in_list?: item_in_listUncheckedCreateNestedManyWithoutShopping_listInput
  }

  export type shopping_listCreateOrConnectWithoutLocationInput = {
    where: shopping_listWhereUniqueInput
    create: XOR<shopping_listCreateWithoutLocationInput, shopping_listUncheckedCreateWithoutLocationInput>
  }

  export type shopping_listCreateManyLocationInputEnvelope = {
    data: shopping_listCreateManyLocationInput | shopping_listCreateManyLocationInput[]
    skipDuplicates?: boolean
  }

  export type store_sectionCreateWithoutLocationInput = {
    name?: string | null
    sort_order?: number | null
    item?: itemCreateNestedManyWithoutStore_sectionInput
  }

  export type store_sectionUncheckedCreateWithoutLocationInput = {
    section_id?: number
    name?: string | null
    sort_order?: number | null
    item?: itemUncheckedCreateNestedManyWithoutStore_sectionInput
  }

  export type store_sectionCreateOrConnectWithoutLocationInput = {
    where: store_sectionWhereUniqueInput
    create: XOR<store_sectionCreateWithoutLocationInput, store_sectionUncheckedCreateWithoutLocationInput>
  }

  export type store_sectionCreateManyLocationInputEnvelope = {
    data: store_sectionCreateManyLocationInput | store_sectionCreateManyLocationInput[]
    skipDuplicates?: boolean
  }

  export type itemUpsertWithWhereUniqueWithoutLocationInput = {
    where: itemWhereUniqueInput
    update: XOR<itemUpdateWithoutLocationInput, itemUncheckedUpdateWithoutLocationInput>
    create: XOR<itemCreateWithoutLocationInput, itemUncheckedCreateWithoutLocationInput>
  }

  export type itemUpdateWithWhereUniqueWithoutLocationInput = {
    where: itemWhereUniqueInput
    data: XOR<itemUpdateWithoutLocationInput, itemUncheckedUpdateWithoutLocationInput>
  }

  export type itemUpdateManyWithWhereWithoutLocationInput = {
    where: itemScalarWhereInput
    data: XOR<itemUpdateManyMutationInput, itemUncheckedUpdateManyWithoutLocationInput>
  }

  export type itemScalarWhereInput = {
    AND?: itemScalarWhereInput | itemScalarWhereInput[]
    OR?: itemScalarWhereInput[]
    NOT?: itemScalarWhereInput | itemScalarWhereInput[]
    item_id?: IntFilter<"item"> | number
    name?: StringNullableFilter<"item"> | string | null
    image_path?: StringNullableFilter<"item"> | string | null
    section_id?: IntNullableFilter<"item"> | number | null
    location_id?: IntNullableFilter<"item"> | number | null
  }

  export type shopping_listUpsertWithWhereUniqueWithoutLocationInput = {
    where: shopping_listWhereUniqueInput
    update: XOR<shopping_listUpdateWithoutLocationInput, shopping_listUncheckedUpdateWithoutLocationInput>
    create: XOR<shopping_listCreateWithoutLocationInput, shopping_listUncheckedCreateWithoutLocationInput>
  }

  export type shopping_listUpdateWithWhereUniqueWithoutLocationInput = {
    where: shopping_listWhereUniqueInput
    data: XOR<shopping_listUpdateWithoutLocationInput, shopping_listUncheckedUpdateWithoutLocationInput>
  }

  export type shopping_listUpdateManyWithWhereWithoutLocationInput = {
    where: shopping_listScalarWhereInput
    data: XOR<shopping_listUpdateManyMutationInput, shopping_listUncheckedUpdateManyWithoutLocationInput>
  }

  export type shopping_listScalarWhereInput = {
    AND?: shopping_listScalarWhereInput | shopping_listScalarWhereInput[]
    OR?: shopping_listScalarWhereInput[]
    NOT?: shopping_listScalarWhereInput | shopping_listScalarWhereInput[]
    shopping_list_id?: IntFilter<"shopping_list"> | number
    location_id?: IntNullableFilter<"shopping_list"> | number | null
    paid?: BoolNullableFilter<"shopping_list"> | boolean | null
    completed_at?: DateTimeNullableFilter<"shopping_list"> | Date | string | null
  }

  export type store_sectionUpsertWithWhereUniqueWithoutLocationInput = {
    where: store_sectionWhereUniqueInput
    update: XOR<store_sectionUpdateWithoutLocationInput, store_sectionUncheckedUpdateWithoutLocationInput>
    create: XOR<store_sectionCreateWithoutLocationInput, store_sectionUncheckedCreateWithoutLocationInput>
  }

  export type store_sectionUpdateWithWhereUniqueWithoutLocationInput = {
    where: store_sectionWhereUniqueInput
    data: XOR<store_sectionUpdateWithoutLocationInput, store_sectionUncheckedUpdateWithoutLocationInput>
  }

  export type store_sectionUpdateManyWithWhereWithoutLocationInput = {
    where: store_sectionScalarWhereInput
    data: XOR<store_sectionUpdateManyMutationInput, store_sectionUncheckedUpdateManyWithoutLocationInput>
  }

  export type store_sectionScalarWhereInput = {
    AND?: store_sectionScalarWhereInput | store_sectionScalarWhereInput[]
    OR?: store_sectionScalarWhereInput[]
    NOT?: store_sectionScalarWhereInput | store_sectionScalarWhereInput[]
    section_id?: IntFilter<"store_section"> | number
    location_id?: IntNullableFilter<"store_section"> | number | null
    name?: StringNullableFilter<"store_section"> | string | null
    sort_order?: IntNullableFilter<"store_section"> | number | null
  }

  export type locationCreateWithoutItemInput = {
    name?: string | null
    address?: string | null
    shopping_list?: shopping_listCreateNestedManyWithoutLocationInput
    store_section?: store_sectionCreateNestedManyWithoutLocationInput
  }

  export type locationUncheckedCreateWithoutItemInput = {
    location_id?: number
    name?: string | null
    address?: string | null
    shopping_list?: shopping_listUncheckedCreateNestedManyWithoutLocationInput
    store_section?: store_sectionUncheckedCreateNestedManyWithoutLocationInput
  }

  export type locationCreateOrConnectWithoutItemInput = {
    where: locationWhereUniqueInput
    create: XOR<locationCreateWithoutItemInput, locationUncheckedCreateWithoutItemInput>
  }

  export type store_sectionCreateWithoutItemInput = {
    name?: string | null
    sort_order?: number | null
    location?: locationCreateNestedOneWithoutStore_sectionInput
  }

  export type store_sectionUncheckedCreateWithoutItemInput = {
    section_id?: number
    location_id?: number | null
    name?: string | null
    sort_order?: number | null
  }

  export type store_sectionCreateOrConnectWithoutItemInput = {
    where: store_sectionWhereUniqueInput
    create: XOR<store_sectionCreateWithoutItemInput, store_sectionUncheckedCreateWithoutItemInput>
  }

  export type item_in_listCreateWithoutItemInput = {
    quantity?: number | null
    discount_price?: number | null
    user?: userCreateNestedOneWithoutItem_in_listInput
    shopping_list?: shopping_listCreateNestedOneWithoutItem_in_listInput
    item_status?: item_statusCreateNestedOneWithoutItem_in_listInput
  }

  export type item_in_listUncheckedCreateWithoutItemInput = {
    item_in_list_id?: number
    shopping_list_id?: number | null
    buyer_id?: number | null
    quantity?: number | null
    discount_price?: number | null
    status_id?: number | null
  }

  export type item_in_listCreateOrConnectWithoutItemInput = {
    where: item_in_listWhereUniqueInput
    create: XOR<item_in_listCreateWithoutItemInput, item_in_listUncheckedCreateWithoutItemInput>
  }

  export type item_in_listCreateManyItemInputEnvelope = {
    data: item_in_listCreateManyItemInput | item_in_listCreateManyItemInput[]
    skipDuplicates?: boolean
  }

  export type item_price_historyCreateWithoutItemInput = {
    price?: number | null
    effective_date?: Date | string | null
  }

  export type item_price_historyUncheckedCreateWithoutItemInput = {
    item_price_history_id?: number
    price?: number | null
    effective_date?: Date | string | null
  }

  export type item_price_historyCreateOrConnectWithoutItemInput = {
    where: item_price_historyWhereUniqueInput
    create: XOR<item_price_historyCreateWithoutItemInput, item_price_historyUncheckedCreateWithoutItemInput>
  }

  export type item_price_historyCreateManyItemInputEnvelope = {
    data: item_price_historyCreateManyItemInput | item_price_historyCreateManyItemInput[]
    skipDuplicates?: boolean
  }

  export type item_favoriteCreateWithoutItemInput = {
    user: userCreateNestedOneWithoutItem_favoriteInput
  }

  export type item_favoriteUncheckedCreateWithoutItemInput = {
    user_id: number
  }

  export type item_favoriteCreateOrConnectWithoutItemInput = {
    where: item_favoriteWhereUniqueInput
    create: XOR<item_favoriteCreateWithoutItemInput, item_favoriteUncheckedCreateWithoutItemInput>
  }

  export type item_favoriteCreateManyItemInputEnvelope = {
    data: item_favoriteCreateManyItemInput | item_favoriteCreateManyItemInput[]
    skipDuplicates?: boolean
  }

  export type locationUpsertWithoutItemInput = {
    update: XOR<locationUpdateWithoutItemInput, locationUncheckedUpdateWithoutItemInput>
    create: XOR<locationCreateWithoutItemInput, locationUncheckedCreateWithoutItemInput>
    where?: locationWhereInput
  }

  export type locationUpdateToOneWithWhereWithoutItemInput = {
    where?: locationWhereInput
    data: XOR<locationUpdateWithoutItemInput, locationUncheckedUpdateWithoutItemInput>
  }

  export type locationUpdateWithoutItemInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    shopping_list?: shopping_listUpdateManyWithoutLocationNestedInput
    store_section?: store_sectionUpdateManyWithoutLocationNestedInput
  }

  export type locationUncheckedUpdateWithoutItemInput = {
    location_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    shopping_list?: shopping_listUncheckedUpdateManyWithoutLocationNestedInput
    store_section?: store_sectionUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type store_sectionUpsertWithoutItemInput = {
    update: XOR<store_sectionUpdateWithoutItemInput, store_sectionUncheckedUpdateWithoutItemInput>
    create: XOR<store_sectionCreateWithoutItemInput, store_sectionUncheckedCreateWithoutItemInput>
    where?: store_sectionWhereInput
  }

  export type store_sectionUpdateToOneWithWhereWithoutItemInput = {
    where?: store_sectionWhereInput
    data: XOR<store_sectionUpdateWithoutItemInput, store_sectionUncheckedUpdateWithoutItemInput>
  }

  export type store_sectionUpdateWithoutItemInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    sort_order?: NullableIntFieldUpdateOperationsInput | number | null
    location?: locationUpdateOneWithoutStore_sectionNestedInput
  }

  export type store_sectionUncheckedUpdateWithoutItemInput = {
    section_id?: IntFieldUpdateOperationsInput | number
    location_id?: NullableIntFieldUpdateOperationsInput | number | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    sort_order?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type item_in_listUpsertWithWhereUniqueWithoutItemInput = {
    where: item_in_listWhereUniqueInput
    update: XOR<item_in_listUpdateWithoutItemInput, item_in_listUncheckedUpdateWithoutItemInput>
    create: XOR<item_in_listCreateWithoutItemInput, item_in_listUncheckedCreateWithoutItemInput>
  }

  export type item_in_listUpdateWithWhereUniqueWithoutItemInput = {
    where: item_in_listWhereUniqueInput
    data: XOR<item_in_listUpdateWithoutItemInput, item_in_listUncheckedUpdateWithoutItemInput>
  }

  export type item_in_listUpdateManyWithWhereWithoutItemInput = {
    where: item_in_listScalarWhereInput
    data: XOR<item_in_listUpdateManyMutationInput, item_in_listUncheckedUpdateManyWithoutItemInput>
  }

  export type item_in_listScalarWhereInput = {
    AND?: item_in_listScalarWhereInput | item_in_listScalarWhereInput[]
    OR?: item_in_listScalarWhereInput[]
    NOT?: item_in_listScalarWhereInput | item_in_listScalarWhereInput[]
    item_in_list_id?: IntFilter<"item_in_list"> | number
    item_id?: IntNullableFilter<"item_in_list"> | number | null
    shopping_list_id?: IntNullableFilter<"item_in_list"> | number | null
    buyer_id?: IntNullableFilter<"item_in_list"> | number | null
    quantity?: IntNullableFilter<"item_in_list"> | number | null
    discount_price?: IntNullableFilter<"item_in_list"> | number | null
    status_id?: IntNullableFilter<"item_in_list"> | number | null
  }

  export type item_price_historyUpsertWithWhereUniqueWithoutItemInput = {
    where: item_price_historyWhereUniqueInput
    update: XOR<item_price_historyUpdateWithoutItemInput, item_price_historyUncheckedUpdateWithoutItemInput>
    create: XOR<item_price_historyCreateWithoutItemInput, item_price_historyUncheckedCreateWithoutItemInput>
  }

  export type item_price_historyUpdateWithWhereUniqueWithoutItemInput = {
    where: item_price_historyWhereUniqueInput
    data: XOR<item_price_historyUpdateWithoutItemInput, item_price_historyUncheckedUpdateWithoutItemInput>
  }

  export type item_price_historyUpdateManyWithWhereWithoutItemInput = {
    where: item_price_historyScalarWhereInput
    data: XOR<item_price_historyUpdateManyMutationInput, item_price_historyUncheckedUpdateManyWithoutItemInput>
  }

  export type item_price_historyScalarWhereInput = {
    AND?: item_price_historyScalarWhereInput | item_price_historyScalarWhereInput[]
    OR?: item_price_historyScalarWhereInput[]
    NOT?: item_price_historyScalarWhereInput | item_price_historyScalarWhereInput[]
    item_price_history_id?: IntFilter<"item_price_history"> | number
    item_id?: IntNullableFilter<"item_price_history"> | number | null
    price?: IntNullableFilter<"item_price_history"> | number | null
    effective_date?: DateTimeNullableFilter<"item_price_history"> | Date | string | null
  }

  export type item_favoriteUpsertWithWhereUniqueWithoutItemInput = {
    where: item_favoriteWhereUniqueInput
    update: XOR<item_favoriteUpdateWithoutItemInput, item_favoriteUncheckedUpdateWithoutItemInput>
    create: XOR<item_favoriteCreateWithoutItemInput, item_favoriteUncheckedCreateWithoutItemInput>
  }

  export type item_favoriteUpdateWithWhereUniqueWithoutItemInput = {
    where: item_favoriteWhereUniqueInput
    data: XOR<item_favoriteUpdateWithoutItemInput, item_favoriteUncheckedUpdateWithoutItemInput>
  }

  export type item_favoriteUpdateManyWithWhereWithoutItemInput = {
    where: item_favoriteScalarWhereInput
    data: XOR<item_favoriteUpdateManyMutationInput, item_favoriteUncheckedUpdateManyWithoutItemInput>
  }

  export type item_favoriteScalarWhereInput = {
    AND?: item_favoriteScalarWhereInput | item_favoriteScalarWhereInput[]
    OR?: item_favoriteScalarWhereInput[]
    NOT?: item_favoriteScalarWhereInput | item_favoriteScalarWhereInput[]
    user_id?: IntFilter<"item_favorite"> | number
    item_id?: IntFilter<"item_favorite"> | number
  }

  export type userCreateWithoutItem_in_listInput = {
    name?: string | null
    role?: string
    auth_key?: string | null
    item_favorite?: item_favoriteCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutItem_in_listInput = {
    user_id?: number
    name?: string | null
    role?: string
    auth_key?: string | null
    item_favorite?: item_favoriteUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutItem_in_listInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutItem_in_listInput, userUncheckedCreateWithoutItem_in_listInput>
  }

  export type itemCreateWithoutItem_in_listInput = {
    name?: string | null
    image_path?: string | null
    location?: locationCreateNestedOneWithoutItemInput
    store_section?: store_sectionCreateNestedOneWithoutItemInput
    item_price_history?: item_price_historyCreateNestedManyWithoutItemInput
    item_favorite?: item_favoriteCreateNestedManyWithoutItemInput
  }

  export type itemUncheckedCreateWithoutItem_in_listInput = {
    item_id?: number
    name?: string | null
    image_path?: string | null
    section_id?: number | null
    location_id?: number | null
    item_price_history?: item_price_historyUncheckedCreateNestedManyWithoutItemInput
    item_favorite?: item_favoriteUncheckedCreateNestedManyWithoutItemInput
  }

  export type itemCreateOrConnectWithoutItem_in_listInput = {
    where: itemWhereUniqueInput
    create: XOR<itemCreateWithoutItem_in_listInput, itemUncheckedCreateWithoutItem_in_listInput>
  }

  export type shopping_listCreateWithoutItem_in_listInput = {
    paid?: boolean | null
    completed_at?: Date | string | null
    location?: locationCreateNestedOneWithoutShopping_listInput
  }

  export type shopping_listUncheckedCreateWithoutItem_in_listInput = {
    shopping_list_id?: number
    location_id?: number | null
    paid?: boolean | null
    completed_at?: Date | string | null
  }

  export type shopping_listCreateOrConnectWithoutItem_in_listInput = {
    where: shopping_listWhereUniqueInput
    create: XOR<shopping_listCreateWithoutItem_in_listInput, shopping_listUncheckedCreateWithoutItem_in_listInput>
  }

  export type item_statusCreateWithoutItem_in_listInput = {
    name?: string | null
  }

  export type item_statusUncheckedCreateWithoutItem_in_listInput = {
    status_id?: number
    name?: string | null
  }

  export type item_statusCreateOrConnectWithoutItem_in_listInput = {
    where: item_statusWhereUniqueInput
    create: XOR<item_statusCreateWithoutItem_in_listInput, item_statusUncheckedCreateWithoutItem_in_listInput>
  }

  export type userUpsertWithoutItem_in_listInput = {
    update: XOR<userUpdateWithoutItem_in_listInput, userUncheckedUpdateWithoutItem_in_listInput>
    create: XOR<userCreateWithoutItem_in_listInput, userUncheckedCreateWithoutItem_in_listInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutItem_in_listInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutItem_in_listInput, userUncheckedUpdateWithoutItem_in_listInput>
  }

  export type userUpdateWithoutItem_in_listInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    auth_key?: NullableStringFieldUpdateOperationsInput | string | null
    item_favorite?: item_favoriteUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutItem_in_listInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    auth_key?: NullableStringFieldUpdateOperationsInput | string | null
    item_favorite?: item_favoriteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type itemUpsertWithoutItem_in_listInput = {
    update: XOR<itemUpdateWithoutItem_in_listInput, itemUncheckedUpdateWithoutItem_in_listInput>
    create: XOR<itemCreateWithoutItem_in_listInput, itemUncheckedCreateWithoutItem_in_listInput>
    where?: itemWhereInput
  }

  export type itemUpdateToOneWithWhereWithoutItem_in_listInput = {
    where?: itemWhereInput
    data: XOR<itemUpdateWithoutItem_in_listInput, itemUncheckedUpdateWithoutItem_in_listInput>
  }

  export type itemUpdateWithoutItem_in_listInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image_path?: NullableStringFieldUpdateOperationsInput | string | null
    location?: locationUpdateOneWithoutItemNestedInput
    store_section?: store_sectionUpdateOneWithoutItemNestedInput
    item_price_history?: item_price_historyUpdateManyWithoutItemNestedInput
    item_favorite?: item_favoriteUpdateManyWithoutItemNestedInput
  }

  export type itemUncheckedUpdateWithoutItem_in_listInput = {
    item_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image_path?: NullableStringFieldUpdateOperationsInput | string | null
    section_id?: NullableIntFieldUpdateOperationsInput | number | null
    location_id?: NullableIntFieldUpdateOperationsInput | number | null
    item_price_history?: item_price_historyUncheckedUpdateManyWithoutItemNestedInput
    item_favorite?: item_favoriteUncheckedUpdateManyWithoutItemNestedInput
  }

  export type shopping_listUpsertWithoutItem_in_listInput = {
    update: XOR<shopping_listUpdateWithoutItem_in_listInput, shopping_listUncheckedUpdateWithoutItem_in_listInput>
    create: XOR<shopping_listCreateWithoutItem_in_listInput, shopping_listUncheckedCreateWithoutItem_in_listInput>
    where?: shopping_listWhereInput
  }

  export type shopping_listUpdateToOneWithWhereWithoutItem_in_listInput = {
    where?: shopping_listWhereInput
    data: XOR<shopping_listUpdateWithoutItem_in_listInput, shopping_listUncheckedUpdateWithoutItem_in_listInput>
  }

  export type shopping_listUpdateWithoutItem_in_listInput = {
    paid?: NullableBoolFieldUpdateOperationsInput | boolean | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    location?: locationUpdateOneWithoutShopping_listNestedInput
  }

  export type shopping_listUncheckedUpdateWithoutItem_in_listInput = {
    shopping_list_id?: IntFieldUpdateOperationsInput | number
    location_id?: NullableIntFieldUpdateOperationsInput | number | null
    paid?: NullableBoolFieldUpdateOperationsInput | boolean | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type item_statusUpsertWithoutItem_in_listInput = {
    update: XOR<item_statusUpdateWithoutItem_in_listInput, item_statusUncheckedUpdateWithoutItem_in_listInput>
    create: XOR<item_statusCreateWithoutItem_in_listInput, item_statusUncheckedCreateWithoutItem_in_listInput>
    where?: item_statusWhereInput
  }

  export type item_statusUpdateToOneWithWhereWithoutItem_in_listInput = {
    where?: item_statusWhereInput
    data: XOR<item_statusUpdateWithoutItem_in_listInput, item_statusUncheckedUpdateWithoutItem_in_listInput>
  }

  export type item_statusUpdateWithoutItem_in_listInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type item_statusUncheckedUpdateWithoutItem_in_listInput = {
    status_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type itemCreateWithoutItem_price_historyInput = {
    name?: string | null
    image_path?: string | null
    location?: locationCreateNestedOneWithoutItemInput
    store_section?: store_sectionCreateNestedOneWithoutItemInput
    item_in_list?: item_in_listCreateNestedManyWithoutItemInput
    item_favorite?: item_favoriteCreateNestedManyWithoutItemInput
  }

  export type itemUncheckedCreateWithoutItem_price_historyInput = {
    item_id?: number
    name?: string | null
    image_path?: string | null
    section_id?: number | null
    location_id?: number | null
    item_in_list?: item_in_listUncheckedCreateNestedManyWithoutItemInput
    item_favorite?: item_favoriteUncheckedCreateNestedManyWithoutItemInput
  }

  export type itemCreateOrConnectWithoutItem_price_historyInput = {
    where: itemWhereUniqueInput
    create: XOR<itemCreateWithoutItem_price_historyInput, itemUncheckedCreateWithoutItem_price_historyInput>
  }

  export type itemUpsertWithoutItem_price_historyInput = {
    update: XOR<itemUpdateWithoutItem_price_historyInput, itemUncheckedUpdateWithoutItem_price_historyInput>
    create: XOR<itemCreateWithoutItem_price_historyInput, itemUncheckedCreateWithoutItem_price_historyInput>
    where?: itemWhereInput
  }

  export type itemUpdateToOneWithWhereWithoutItem_price_historyInput = {
    where?: itemWhereInput
    data: XOR<itemUpdateWithoutItem_price_historyInput, itemUncheckedUpdateWithoutItem_price_historyInput>
  }

  export type itemUpdateWithoutItem_price_historyInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image_path?: NullableStringFieldUpdateOperationsInput | string | null
    location?: locationUpdateOneWithoutItemNestedInput
    store_section?: store_sectionUpdateOneWithoutItemNestedInput
    item_in_list?: item_in_listUpdateManyWithoutItemNestedInput
    item_favorite?: item_favoriteUpdateManyWithoutItemNestedInput
  }

  export type itemUncheckedUpdateWithoutItem_price_historyInput = {
    item_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image_path?: NullableStringFieldUpdateOperationsInput | string | null
    section_id?: NullableIntFieldUpdateOperationsInput | number | null
    location_id?: NullableIntFieldUpdateOperationsInput | number | null
    item_in_list?: item_in_listUncheckedUpdateManyWithoutItemNestedInput
    item_favorite?: item_favoriteUncheckedUpdateManyWithoutItemNestedInput
  }

  export type item_in_listCreateWithoutItem_statusInput = {
    quantity?: number | null
    discount_price?: number | null
    user?: userCreateNestedOneWithoutItem_in_listInput
    item?: itemCreateNestedOneWithoutItem_in_listInput
    shopping_list?: shopping_listCreateNestedOneWithoutItem_in_listInput
  }

  export type item_in_listUncheckedCreateWithoutItem_statusInput = {
    item_in_list_id?: number
    item_id?: number | null
    shopping_list_id?: number | null
    buyer_id?: number | null
    quantity?: number | null
    discount_price?: number | null
  }

  export type item_in_listCreateOrConnectWithoutItem_statusInput = {
    where: item_in_listWhereUniqueInput
    create: XOR<item_in_listCreateWithoutItem_statusInput, item_in_listUncheckedCreateWithoutItem_statusInput>
  }

  export type item_in_listCreateManyItem_statusInputEnvelope = {
    data: item_in_listCreateManyItem_statusInput | item_in_listCreateManyItem_statusInput[]
    skipDuplicates?: boolean
  }

  export type item_in_listUpsertWithWhereUniqueWithoutItem_statusInput = {
    where: item_in_listWhereUniqueInput
    update: XOR<item_in_listUpdateWithoutItem_statusInput, item_in_listUncheckedUpdateWithoutItem_statusInput>
    create: XOR<item_in_listCreateWithoutItem_statusInput, item_in_listUncheckedCreateWithoutItem_statusInput>
  }

  export type item_in_listUpdateWithWhereUniqueWithoutItem_statusInput = {
    where: item_in_listWhereUniqueInput
    data: XOR<item_in_listUpdateWithoutItem_statusInput, item_in_listUncheckedUpdateWithoutItem_statusInput>
  }

  export type item_in_listUpdateManyWithWhereWithoutItem_statusInput = {
    where: item_in_listScalarWhereInput
    data: XOR<item_in_listUpdateManyMutationInput, item_in_listUncheckedUpdateManyWithoutItem_statusInput>
  }

  export type userCreateWithoutItem_favoriteInput = {
    name?: string | null
    role?: string
    auth_key?: string | null
    item_in_list?: item_in_listCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutItem_favoriteInput = {
    user_id?: number
    name?: string | null
    role?: string
    auth_key?: string | null
    item_in_list?: item_in_listUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutItem_favoriteInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutItem_favoriteInput, userUncheckedCreateWithoutItem_favoriteInput>
  }

  export type itemCreateWithoutItem_favoriteInput = {
    name?: string | null
    image_path?: string | null
    location?: locationCreateNestedOneWithoutItemInput
    store_section?: store_sectionCreateNestedOneWithoutItemInput
    item_in_list?: item_in_listCreateNestedManyWithoutItemInput
    item_price_history?: item_price_historyCreateNestedManyWithoutItemInput
  }

  export type itemUncheckedCreateWithoutItem_favoriteInput = {
    item_id?: number
    name?: string | null
    image_path?: string | null
    section_id?: number | null
    location_id?: number | null
    item_in_list?: item_in_listUncheckedCreateNestedManyWithoutItemInput
    item_price_history?: item_price_historyUncheckedCreateNestedManyWithoutItemInput
  }

  export type itemCreateOrConnectWithoutItem_favoriteInput = {
    where: itemWhereUniqueInput
    create: XOR<itemCreateWithoutItem_favoriteInput, itemUncheckedCreateWithoutItem_favoriteInput>
  }

  export type userUpsertWithoutItem_favoriteInput = {
    update: XOR<userUpdateWithoutItem_favoriteInput, userUncheckedUpdateWithoutItem_favoriteInput>
    create: XOR<userCreateWithoutItem_favoriteInput, userUncheckedCreateWithoutItem_favoriteInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutItem_favoriteInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutItem_favoriteInput, userUncheckedUpdateWithoutItem_favoriteInput>
  }

  export type userUpdateWithoutItem_favoriteInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    auth_key?: NullableStringFieldUpdateOperationsInput | string | null
    item_in_list?: item_in_listUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutItem_favoriteInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    auth_key?: NullableStringFieldUpdateOperationsInput | string | null
    item_in_list?: item_in_listUncheckedUpdateManyWithoutUserNestedInput
  }

  export type itemUpsertWithoutItem_favoriteInput = {
    update: XOR<itemUpdateWithoutItem_favoriteInput, itemUncheckedUpdateWithoutItem_favoriteInput>
    create: XOR<itemCreateWithoutItem_favoriteInput, itemUncheckedCreateWithoutItem_favoriteInput>
    where?: itemWhereInput
  }

  export type itemUpdateToOneWithWhereWithoutItem_favoriteInput = {
    where?: itemWhereInput
    data: XOR<itemUpdateWithoutItem_favoriteInput, itemUncheckedUpdateWithoutItem_favoriteInput>
  }

  export type itemUpdateWithoutItem_favoriteInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image_path?: NullableStringFieldUpdateOperationsInput | string | null
    location?: locationUpdateOneWithoutItemNestedInput
    store_section?: store_sectionUpdateOneWithoutItemNestedInput
    item_in_list?: item_in_listUpdateManyWithoutItemNestedInput
    item_price_history?: item_price_historyUpdateManyWithoutItemNestedInput
  }

  export type itemUncheckedUpdateWithoutItem_favoriteInput = {
    item_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image_path?: NullableStringFieldUpdateOperationsInput | string | null
    section_id?: NullableIntFieldUpdateOperationsInput | number | null
    location_id?: NullableIntFieldUpdateOperationsInput | number | null
    item_in_list?: item_in_listUncheckedUpdateManyWithoutItemNestedInput
    item_price_history?: item_price_historyUncheckedUpdateManyWithoutItemNestedInput
  }

  export type item_in_listCreateWithoutShopping_listInput = {
    quantity?: number | null
    discount_price?: number | null
    user?: userCreateNestedOneWithoutItem_in_listInput
    item?: itemCreateNestedOneWithoutItem_in_listInput
    item_status?: item_statusCreateNestedOneWithoutItem_in_listInput
  }

  export type item_in_listUncheckedCreateWithoutShopping_listInput = {
    item_in_list_id?: number
    item_id?: number | null
    buyer_id?: number | null
    quantity?: number | null
    discount_price?: number | null
    status_id?: number | null
  }

  export type item_in_listCreateOrConnectWithoutShopping_listInput = {
    where: item_in_listWhereUniqueInput
    create: XOR<item_in_listCreateWithoutShopping_listInput, item_in_listUncheckedCreateWithoutShopping_listInput>
  }

  export type item_in_listCreateManyShopping_listInputEnvelope = {
    data: item_in_listCreateManyShopping_listInput | item_in_listCreateManyShopping_listInput[]
    skipDuplicates?: boolean
  }

  export type locationCreateWithoutShopping_listInput = {
    name?: string | null
    address?: string | null
    item?: itemCreateNestedManyWithoutLocationInput
    store_section?: store_sectionCreateNestedManyWithoutLocationInput
  }

  export type locationUncheckedCreateWithoutShopping_listInput = {
    location_id?: number
    name?: string | null
    address?: string | null
    item?: itemUncheckedCreateNestedManyWithoutLocationInput
    store_section?: store_sectionUncheckedCreateNestedManyWithoutLocationInput
  }

  export type locationCreateOrConnectWithoutShopping_listInput = {
    where: locationWhereUniqueInput
    create: XOR<locationCreateWithoutShopping_listInput, locationUncheckedCreateWithoutShopping_listInput>
  }

  export type item_in_listUpsertWithWhereUniqueWithoutShopping_listInput = {
    where: item_in_listWhereUniqueInput
    update: XOR<item_in_listUpdateWithoutShopping_listInput, item_in_listUncheckedUpdateWithoutShopping_listInput>
    create: XOR<item_in_listCreateWithoutShopping_listInput, item_in_listUncheckedCreateWithoutShopping_listInput>
  }

  export type item_in_listUpdateWithWhereUniqueWithoutShopping_listInput = {
    where: item_in_listWhereUniqueInput
    data: XOR<item_in_listUpdateWithoutShopping_listInput, item_in_listUncheckedUpdateWithoutShopping_listInput>
  }

  export type item_in_listUpdateManyWithWhereWithoutShopping_listInput = {
    where: item_in_listScalarWhereInput
    data: XOR<item_in_listUpdateManyMutationInput, item_in_listUncheckedUpdateManyWithoutShopping_listInput>
  }

  export type locationUpsertWithoutShopping_listInput = {
    update: XOR<locationUpdateWithoutShopping_listInput, locationUncheckedUpdateWithoutShopping_listInput>
    create: XOR<locationCreateWithoutShopping_listInput, locationUncheckedCreateWithoutShopping_listInput>
    where?: locationWhereInput
  }

  export type locationUpdateToOneWithWhereWithoutShopping_listInput = {
    where?: locationWhereInput
    data: XOR<locationUpdateWithoutShopping_listInput, locationUncheckedUpdateWithoutShopping_listInput>
  }

  export type locationUpdateWithoutShopping_listInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    item?: itemUpdateManyWithoutLocationNestedInput
    store_section?: store_sectionUpdateManyWithoutLocationNestedInput
  }

  export type locationUncheckedUpdateWithoutShopping_listInput = {
    location_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    item?: itemUncheckedUpdateManyWithoutLocationNestedInput
    store_section?: store_sectionUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type itemCreateWithoutStore_sectionInput = {
    name?: string | null
    image_path?: string | null
    location?: locationCreateNestedOneWithoutItemInput
    item_in_list?: item_in_listCreateNestedManyWithoutItemInput
    item_price_history?: item_price_historyCreateNestedManyWithoutItemInput
    item_favorite?: item_favoriteCreateNestedManyWithoutItemInput
  }

  export type itemUncheckedCreateWithoutStore_sectionInput = {
    item_id?: number
    name?: string | null
    image_path?: string | null
    location_id?: number | null
    item_in_list?: item_in_listUncheckedCreateNestedManyWithoutItemInput
    item_price_history?: item_price_historyUncheckedCreateNestedManyWithoutItemInput
    item_favorite?: item_favoriteUncheckedCreateNestedManyWithoutItemInput
  }

  export type itemCreateOrConnectWithoutStore_sectionInput = {
    where: itemWhereUniqueInput
    create: XOR<itemCreateWithoutStore_sectionInput, itemUncheckedCreateWithoutStore_sectionInput>
  }

  export type itemCreateManyStore_sectionInputEnvelope = {
    data: itemCreateManyStore_sectionInput | itemCreateManyStore_sectionInput[]
    skipDuplicates?: boolean
  }

  export type locationCreateWithoutStore_sectionInput = {
    name?: string | null
    address?: string | null
    item?: itemCreateNestedManyWithoutLocationInput
    shopping_list?: shopping_listCreateNestedManyWithoutLocationInput
  }

  export type locationUncheckedCreateWithoutStore_sectionInput = {
    location_id?: number
    name?: string | null
    address?: string | null
    item?: itemUncheckedCreateNestedManyWithoutLocationInput
    shopping_list?: shopping_listUncheckedCreateNestedManyWithoutLocationInput
  }

  export type locationCreateOrConnectWithoutStore_sectionInput = {
    where: locationWhereUniqueInput
    create: XOR<locationCreateWithoutStore_sectionInput, locationUncheckedCreateWithoutStore_sectionInput>
  }

  export type itemUpsertWithWhereUniqueWithoutStore_sectionInput = {
    where: itemWhereUniqueInput
    update: XOR<itemUpdateWithoutStore_sectionInput, itemUncheckedUpdateWithoutStore_sectionInput>
    create: XOR<itemCreateWithoutStore_sectionInput, itemUncheckedCreateWithoutStore_sectionInput>
  }

  export type itemUpdateWithWhereUniqueWithoutStore_sectionInput = {
    where: itemWhereUniqueInput
    data: XOR<itemUpdateWithoutStore_sectionInput, itemUncheckedUpdateWithoutStore_sectionInput>
  }

  export type itemUpdateManyWithWhereWithoutStore_sectionInput = {
    where: itemScalarWhereInput
    data: XOR<itemUpdateManyMutationInput, itemUncheckedUpdateManyWithoutStore_sectionInput>
  }

  export type locationUpsertWithoutStore_sectionInput = {
    update: XOR<locationUpdateWithoutStore_sectionInput, locationUncheckedUpdateWithoutStore_sectionInput>
    create: XOR<locationCreateWithoutStore_sectionInput, locationUncheckedCreateWithoutStore_sectionInput>
    where?: locationWhereInput
  }

  export type locationUpdateToOneWithWhereWithoutStore_sectionInput = {
    where?: locationWhereInput
    data: XOR<locationUpdateWithoutStore_sectionInput, locationUncheckedUpdateWithoutStore_sectionInput>
  }

  export type locationUpdateWithoutStore_sectionInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    item?: itemUpdateManyWithoutLocationNestedInput
    shopping_list?: shopping_listUpdateManyWithoutLocationNestedInput
  }

  export type locationUncheckedUpdateWithoutStore_sectionInput = {
    location_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    item?: itemUncheckedUpdateManyWithoutLocationNestedInput
    shopping_list?: shopping_listUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type item_in_listCreateWithoutUserInput = {
    quantity?: number | null
    discount_price?: number | null
    item?: itemCreateNestedOneWithoutItem_in_listInput
    shopping_list?: shopping_listCreateNestedOneWithoutItem_in_listInput
    item_status?: item_statusCreateNestedOneWithoutItem_in_listInput
  }

  export type item_in_listUncheckedCreateWithoutUserInput = {
    item_in_list_id?: number
    item_id?: number | null
    shopping_list_id?: number | null
    quantity?: number | null
    discount_price?: number | null
    status_id?: number | null
  }

  export type item_in_listCreateOrConnectWithoutUserInput = {
    where: item_in_listWhereUniqueInput
    create: XOR<item_in_listCreateWithoutUserInput, item_in_listUncheckedCreateWithoutUserInput>
  }

  export type item_in_listCreateManyUserInputEnvelope = {
    data: item_in_listCreateManyUserInput | item_in_listCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type item_favoriteCreateWithoutUserInput = {
    item: itemCreateNestedOneWithoutItem_favoriteInput
  }

  export type item_favoriteUncheckedCreateWithoutUserInput = {
    item_id: number
  }

  export type item_favoriteCreateOrConnectWithoutUserInput = {
    where: item_favoriteWhereUniqueInput
    create: XOR<item_favoriteCreateWithoutUserInput, item_favoriteUncheckedCreateWithoutUserInput>
  }

  export type item_favoriteCreateManyUserInputEnvelope = {
    data: item_favoriteCreateManyUserInput | item_favoriteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type item_in_listUpsertWithWhereUniqueWithoutUserInput = {
    where: item_in_listWhereUniqueInput
    update: XOR<item_in_listUpdateWithoutUserInput, item_in_listUncheckedUpdateWithoutUserInput>
    create: XOR<item_in_listCreateWithoutUserInput, item_in_listUncheckedCreateWithoutUserInput>
  }

  export type item_in_listUpdateWithWhereUniqueWithoutUserInput = {
    where: item_in_listWhereUniqueInput
    data: XOR<item_in_listUpdateWithoutUserInput, item_in_listUncheckedUpdateWithoutUserInput>
  }

  export type item_in_listUpdateManyWithWhereWithoutUserInput = {
    where: item_in_listScalarWhereInput
    data: XOR<item_in_listUpdateManyMutationInput, item_in_listUncheckedUpdateManyWithoutUserInput>
  }

  export type item_favoriteUpsertWithWhereUniqueWithoutUserInput = {
    where: item_favoriteWhereUniqueInput
    update: XOR<item_favoriteUpdateWithoutUserInput, item_favoriteUncheckedUpdateWithoutUserInput>
    create: XOR<item_favoriteCreateWithoutUserInput, item_favoriteUncheckedCreateWithoutUserInput>
  }

  export type item_favoriteUpdateWithWhereUniqueWithoutUserInput = {
    where: item_favoriteWhereUniqueInput
    data: XOR<item_favoriteUpdateWithoutUserInput, item_favoriteUncheckedUpdateWithoutUserInput>
  }

  export type item_favoriteUpdateManyWithWhereWithoutUserInput = {
    where: item_favoriteScalarWhereInput
    data: XOR<item_favoriteUpdateManyMutationInput, item_favoriteUncheckedUpdateManyWithoutUserInput>
  }

  export type itemCreateManyLocationInput = {
    item_id?: number
    name?: string | null
    image_path?: string | null
    section_id?: number | null
  }

  export type shopping_listCreateManyLocationInput = {
    shopping_list_id?: number
    paid?: boolean | null
    completed_at?: Date | string | null
  }

  export type store_sectionCreateManyLocationInput = {
    section_id?: number
    name?: string | null
    sort_order?: number | null
  }

  export type itemUpdateWithoutLocationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image_path?: NullableStringFieldUpdateOperationsInput | string | null
    store_section?: store_sectionUpdateOneWithoutItemNestedInput
    item_in_list?: item_in_listUpdateManyWithoutItemNestedInput
    item_price_history?: item_price_historyUpdateManyWithoutItemNestedInput
    item_favorite?: item_favoriteUpdateManyWithoutItemNestedInput
  }

  export type itemUncheckedUpdateWithoutLocationInput = {
    item_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image_path?: NullableStringFieldUpdateOperationsInput | string | null
    section_id?: NullableIntFieldUpdateOperationsInput | number | null
    item_in_list?: item_in_listUncheckedUpdateManyWithoutItemNestedInput
    item_price_history?: item_price_historyUncheckedUpdateManyWithoutItemNestedInput
    item_favorite?: item_favoriteUncheckedUpdateManyWithoutItemNestedInput
  }

  export type itemUncheckedUpdateManyWithoutLocationInput = {
    item_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image_path?: NullableStringFieldUpdateOperationsInput | string | null
    section_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type shopping_listUpdateWithoutLocationInput = {
    paid?: NullableBoolFieldUpdateOperationsInput | boolean | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    item_in_list?: item_in_listUpdateManyWithoutShopping_listNestedInput
  }

  export type shopping_listUncheckedUpdateWithoutLocationInput = {
    shopping_list_id?: IntFieldUpdateOperationsInput | number
    paid?: NullableBoolFieldUpdateOperationsInput | boolean | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    item_in_list?: item_in_listUncheckedUpdateManyWithoutShopping_listNestedInput
  }

  export type shopping_listUncheckedUpdateManyWithoutLocationInput = {
    shopping_list_id?: IntFieldUpdateOperationsInput | number
    paid?: NullableBoolFieldUpdateOperationsInput | boolean | null
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type store_sectionUpdateWithoutLocationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    sort_order?: NullableIntFieldUpdateOperationsInput | number | null
    item?: itemUpdateManyWithoutStore_sectionNestedInput
  }

  export type store_sectionUncheckedUpdateWithoutLocationInput = {
    section_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    sort_order?: NullableIntFieldUpdateOperationsInput | number | null
    item?: itemUncheckedUpdateManyWithoutStore_sectionNestedInput
  }

  export type store_sectionUncheckedUpdateManyWithoutLocationInput = {
    section_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    sort_order?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type item_in_listCreateManyItemInput = {
    item_in_list_id?: number
    shopping_list_id?: number | null
    buyer_id?: number | null
    quantity?: number | null
    discount_price?: number | null
    status_id?: number | null
  }

  export type item_price_historyCreateManyItemInput = {
    item_price_history_id?: number
    price?: number | null
    effective_date?: Date | string | null
  }

  export type item_favoriteCreateManyItemInput = {
    user_id: number
  }

  export type item_in_listUpdateWithoutItemInput = {
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    discount_price?: NullableIntFieldUpdateOperationsInput | number | null
    user?: userUpdateOneWithoutItem_in_listNestedInput
    shopping_list?: shopping_listUpdateOneWithoutItem_in_listNestedInput
    item_status?: item_statusUpdateOneWithoutItem_in_listNestedInput
  }

  export type item_in_listUncheckedUpdateWithoutItemInput = {
    item_in_list_id?: IntFieldUpdateOperationsInput | number
    shopping_list_id?: NullableIntFieldUpdateOperationsInput | number | null
    buyer_id?: NullableIntFieldUpdateOperationsInput | number | null
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    discount_price?: NullableIntFieldUpdateOperationsInput | number | null
    status_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type item_in_listUncheckedUpdateManyWithoutItemInput = {
    item_in_list_id?: IntFieldUpdateOperationsInput | number
    shopping_list_id?: NullableIntFieldUpdateOperationsInput | number | null
    buyer_id?: NullableIntFieldUpdateOperationsInput | number | null
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    discount_price?: NullableIntFieldUpdateOperationsInput | number | null
    status_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type item_price_historyUpdateWithoutItemInput = {
    price?: NullableIntFieldUpdateOperationsInput | number | null
    effective_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type item_price_historyUncheckedUpdateWithoutItemInput = {
    item_price_history_id?: IntFieldUpdateOperationsInput | number
    price?: NullableIntFieldUpdateOperationsInput | number | null
    effective_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type item_price_historyUncheckedUpdateManyWithoutItemInput = {
    item_price_history_id?: IntFieldUpdateOperationsInput | number
    price?: NullableIntFieldUpdateOperationsInput | number | null
    effective_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type item_favoriteUpdateWithoutItemInput = {
    user?: userUpdateOneRequiredWithoutItem_favoriteNestedInput
  }

  export type item_favoriteUncheckedUpdateWithoutItemInput = {
    user_id?: IntFieldUpdateOperationsInput | number
  }

  export type item_favoriteUncheckedUpdateManyWithoutItemInput = {
    user_id?: IntFieldUpdateOperationsInput | number
  }

  export type item_in_listCreateManyItem_statusInput = {
    item_in_list_id?: number
    item_id?: number | null
    shopping_list_id?: number | null
    buyer_id?: number | null
    quantity?: number | null
    discount_price?: number | null
  }

  export type item_in_listUpdateWithoutItem_statusInput = {
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    discount_price?: NullableIntFieldUpdateOperationsInput | number | null
    user?: userUpdateOneWithoutItem_in_listNestedInput
    item?: itemUpdateOneWithoutItem_in_listNestedInput
    shopping_list?: shopping_listUpdateOneWithoutItem_in_listNestedInput
  }

  export type item_in_listUncheckedUpdateWithoutItem_statusInput = {
    item_in_list_id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    shopping_list_id?: NullableIntFieldUpdateOperationsInput | number | null
    buyer_id?: NullableIntFieldUpdateOperationsInput | number | null
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    discount_price?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type item_in_listUncheckedUpdateManyWithoutItem_statusInput = {
    item_in_list_id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    shopping_list_id?: NullableIntFieldUpdateOperationsInput | number | null
    buyer_id?: NullableIntFieldUpdateOperationsInput | number | null
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    discount_price?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type item_in_listCreateManyShopping_listInput = {
    item_in_list_id?: number
    item_id?: number | null
    buyer_id?: number | null
    quantity?: number | null
    discount_price?: number | null
    status_id?: number | null
  }

  export type item_in_listUpdateWithoutShopping_listInput = {
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    discount_price?: NullableIntFieldUpdateOperationsInput | number | null
    user?: userUpdateOneWithoutItem_in_listNestedInput
    item?: itemUpdateOneWithoutItem_in_listNestedInput
    item_status?: item_statusUpdateOneWithoutItem_in_listNestedInput
  }

  export type item_in_listUncheckedUpdateWithoutShopping_listInput = {
    item_in_list_id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    buyer_id?: NullableIntFieldUpdateOperationsInput | number | null
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    discount_price?: NullableIntFieldUpdateOperationsInput | number | null
    status_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type item_in_listUncheckedUpdateManyWithoutShopping_listInput = {
    item_in_list_id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    buyer_id?: NullableIntFieldUpdateOperationsInput | number | null
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    discount_price?: NullableIntFieldUpdateOperationsInput | number | null
    status_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type itemCreateManyStore_sectionInput = {
    item_id?: number
    name?: string | null
    image_path?: string | null
    location_id?: number | null
  }

  export type itemUpdateWithoutStore_sectionInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image_path?: NullableStringFieldUpdateOperationsInput | string | null
    location?: locationUpdateOneWithoutItemNestedInput
    item_in_list?: item_in_listUpdateManyWithoutItemNestedInput
    item_price_history?: item_price_historyUpdateManyWithoutItemNestedInput
    item_favorite?: item_favoriteUpdateManyWithoutItemNestedInput
  }

  export type itemUncheckedUpdateWithoutStore_sectionInput = {
    item_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image_path?: NullableStringFieldUpdateOperationsInput | string | null
    location_id?: NullableIntFieldUpdateOperationsInput | number | null
    item_in_list?: item_in_listUncheckedUpdateManyWithoutItemNestedInput
    item_price_history?: item_price_historyUncheckedUpdateManyWithoutItemNestedInput
    item_favorite?: item_favoriteUncheckedUpdateManyWithoutItemNestedInput
  }

  export type itemUncheckedUpdateManyWithoutStore_sectionInput = {
    item_id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image_path?: NullableStringFieldUpdateOperationsInput | string | null
    location_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type item_in_listCreateManyUserInput = {
    item_in_list_id?: number
    item_id?: number | null
    shopping_list_id?: number | null
    quantity?: number | null
    discount_price?: number | null
    status_id?: number | null
  }

  export type item_favoriteCreateManyUserInput = {
    item_id: number
  }

  export type item_in_listUpdateWithoutUserInput = {
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    discount_price?: NullableIntFieldUpdateOperationsInput | number | null
    item?: itemUpdateOneWithoutItem_in_listNestedInput
    shopping_list?: shopping_listUpdateOneWithoutItem_in_listNestedInput
    item_status?: item_statusUpdateOneWithoutItem_in_listNestedInput
  }

  export type item_in_listUncheckedUpdateWithoutUserInput = {
    item_in_list_id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    shopping_list_id?: NullableIntFieldUpdateOperationsInput | number | null
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    discount_price?: NullableIntFieldUpdateOperationsInput | number | null
    status_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type item_in_listUncheckedUpdateManyWithoutUserInput = {
    item_in_list_id?: IntFieldUpdateOperationsInput | number
    item_id?: NullableIntFieldUpdateOperationsInput | number | null
    shopping_list_id?: NullableIntFieldUpdateOperationsInput | number | null
    quantity?: NullableIntFieldUpdateOperationsInput | number | null
    discount_price?: NullableIntFieldUpdateOperationsInput | number | null
    status_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type item_favoriteUpdateWithoutUserInput = {
    item?: itemUpdateOneRequiredWithoutItem_favoriteNestedInput
  }

  export type item_favoriteUncheckedUpdateWithoutUserInput = {
    item_id?: IntFieldUpdateOperationsInput | number
  }

  export type item_favoriteUncheckedUpdateManyWithoutUserInput = {
    item_id?: IntFieldUpdateOperationsInput | number
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