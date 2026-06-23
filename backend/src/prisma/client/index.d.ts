
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model cuenta_espacio
 * 
 */
export type cuenta_espacio = $Result.DefaultSelection<Prisma.$cuenta_espacioPayload>
/**
 * Model cuenta_persona
 * 
 */
export type cuenta_persona = $Result.DefaultSelection<Prisma.$cuenta_personaPayload>
/**
 * Model espacio
 * 
 */
export type espacio = $Result.DefaultSelection<Prisma.$espacioPayload>
/**
 * Model huesped
 * 
 */
export type huesped = $Result.DefaultSelection<Prisma.$huespedPayload>
/**
 * Model inventario_minibar
 * 
 */
export type inventario_minibar = $Result.DefaultSelection<Prisma.$inventario_minibarPayload>
/**
 * Model reserva
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type reserva = $Result.DefaultSelection<Prisma.$reservaPayload>
/**
 * Model configuracion_hotel
 * 
 */
export type configuracion_hotel = $Result.DefaultSelection<Prisma.$configuracion_hotelPayload>
/**
 * Model tipo_espacio_config
 * 
 */
export type tipo_espacio_config = $Result.DefaultSelection<Prisma.$tipo_espacio_configPayload>
/**
 * Model categoria_inventario
 * 
 */
export type categoria_inventario = $Result.DefaultSelection<Prisma.$categoria_inventarioPayload>
/**
 * Model proveedor
 * 
 */
export type proveedor = $Result.DefaultSelection<Prisma.$proveedorPayload>
/**
 * Model producto_inventario
 * 
 */
export type producto_inventario = $Result.DefaultSelection<Prisma.$producto_inventarioPayload>
/**
 * Model movimiento_inventario
 * 
 */
export type movimiento_inventario = $Result.DefaultSelection<Prisma.$movimiento_inventarioPayload>
/**
 * Model gasto_operativo
 * 
 */
export type gasto_operativo = $Result.DefaultSelection<Prisma.$gasto_operativoPayload>
/**
 * Model categoria_gasto
 * 
 */
export type categoria_gasto = $Result.DefaultSelection<Prisma.$categoria_gastoPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Cuenta_espacios
 * const cuenta_espacios = await prisma.cuenta_espacio.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
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
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Cuenta_espacios
   * const cuenta_espacios = await prisma.cuenta_espacio.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.cuenta_espacio`: Exposes CRUD operations for the **cuenta_espacio** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cuenta_espacios
    * const cuenta_espacios = await prisma.cuenta_espacio.findMany()
    * ```
    */
  get cuenta_espacio(): Prisma.cuenta_espacioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cuenta_persona`: Exposes CRUD operations for the **cuenta_persona** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cuenta_personas
    * const cuenta_personas = await prisma.cuenta_persona.findMany()
    * ```
    */
  get cuenta_persona(): Prisma.cuenta_personaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.espacio`: Exposes CRUD operations for the **espacio** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Espacios
    * const espacios = await prisma.espacio.findMany()
    * ```
    */
  get espacio(): Prisma.espacioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.huesped`: Exposes CRUD operations for the **huesped** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Huespeds
    * const huespeds = await prisma.huesped.findMany()
    * ```
    */
  get huesped(): Prisma.huespedDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.inventario_minibar`: Exposes CRUD operations for the **inventario_minibar** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Inventario_minibars
    * const inventario_minibars = await prisma.inventario_minibar.findMany()
    * ```
    */
  get inventario_minibar(): Prisma.inventario_minibarDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reserva`: Exposes CRUD operations for the **reserva** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reservas
    * const reservas = await prisma.reserva.findMany()
    * ```
    */
  get reserva(): Prisma.reservaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.configuracion_hotel`: Exposes CRUD operations for the **configuracion_hotel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Configuracion_hotels
    * const configuracion_hotels = await prisma.configuracion_hotel.findMany()
    * ```
    */
  get configuracion_hotel(): Prisma.configuracion_hotelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tipo_espacio_config`: Exposes CRUD operations for the **tipo_espacio_config** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tipo_espacio_configs
    * const tipo_espacio_configs = await prisma.tipo_espacio_config.findMany()
    * ```
    */
  get tipo_espacio_config(): Prisma.tipo_espacio_configDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.categoria_inventario`: Exposes CRUD operations for the **categoria_inventario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categoria_inventarios
    * const categoria_inventarios = await prisma.categoria_inventario.findMany()
    * ```
    */
  get categoria_inventario(): Prisma.categoria_inventarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.proveedor`: Exposes CRUD operations for the **proveedor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Proveedors
    * const proveedors = await prisma.proveedor.findMany()
    * ```
    */
  get proveedor(): Prisma.proveedorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.producto_inventario`: Exposes CRUD operations for the **producto_inventario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Producto_inventarios
    * const producto_inventarios = await prisma.producto_inventario.findMany()
    * ```
    */
  get producto_inventario(): Prisma.producto_inventarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.movimiento_inventario`: Exposes CRUD operations for the **movimiento_inventario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Movimiento_inventarios
    * const movimiento_inventarios = await prisma.movimiento_inventario.findMany()
    * ```
    */
  get movimiento_inventario(): Prisma.movimiento_inventarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gasto_operativo`: Exposes CRUD operations for the **gasto_operativo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Gasto_operativos
    * const gasto_operativos = await prisma.gasto_operativo.findMany()
    * ```
    */
  get gasto_operativo(): Prisma.gasto_operativoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.categoria_gasto`: Exposes CRUD operations for the **categoria_gasto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categoria_gastos
    * const categoria_gastos = await prisma.categoria_gasto.findMany()
    * ```
    */
  get categoria_gasto(): Prisma.categoria_gastoDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
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
    cuenta_espacio: 'cuenta_espacio',
    cuenta_persona: 'cuenta_persona',
    espacio: 'espacio',
    huesped: 'huesped',
    inventario_minibar: 'inventario_minibar',
    reserva: 'reserva',
    configuracion_hotel: 'configuracion_hotel',
    tipo_espacio_config: 'tipo_espacio_config',
    categoria_inventario: 'categoria_inventario',
    proveedor: 'proveedor',
    producto_inventario: 'producto_inventario',
    movimiento_inventario: 'movimiento_inventario',
    gasto_operativo: 'gasto_operativo',
    categoria_gasto: 'categoria_gasto'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "cuenta_espacio" | "cuenta_persona" | "espacio" | "huesped" | "inventario_minibar" | "reserva" | "configuracion_hotel" | "tipo_espacio_config" | "categoria_inventario" | "proveedor" | "producto_inventario" | "movimiento_inventario" | "gasto_operativo" | "categoria_gasto"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      cuenta_espacio: {
        payload: Prisma.$cuenta_espacioPayload<ExtArgs>
        fields: Prisma.cuenta_espacioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.cuenta_espacioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cuenta_espacioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.cuenta_espacioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cuenta_espacioPayload>
          }
          findFirst: {
            args: Prisma.cuenta_espacioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cuenta_espacioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.cuenta_espacioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cuenta_espacioPayload>
          }
          findMany: {
            args: Prisma.cuenta_espacioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cuenta_espacioPayload>[]
          }
          create: {
            args: Prisma.cuenta_espacioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cuenta_espacioPayload>
          }
          createMany: {
            args: Prisma.cuenta_espacioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.cuenta_espacioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cuenta_espacioPayload>[]
          }
          delete: {
            args: Prisma.cuenta_espacioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cuenta_espacioPayload>
          }
          update: {
            args: Prisma.cuenta_espacioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cuenta_espacioPayload>
          }
          deleteMany: {
            args: Prisma.cuenta_espacioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.cuenta_espacioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.cuenta_espacioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cuenta_espacioPayload>[]
          }
          upsert: {
            args: Prisma.cuenta_espacioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cuenta_espacioPayload>
          }
          aggregate: {
            args: Prisma.Cuenta_espacioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCuenta_espacio>
          }
          groupBy: {
            args: Prisma.cuenta_espacioGroupByArgs<ExtArgs>
            result: $Utils.Optional<Cuenta_espacioGroupByOutputType>[]
          }
          count: {
            args: Prisma.cuenta_espacioCountArgs<ExtArgs>
            result: $Utils.Optional<Cuenta_espacioCountAggregateOutputType> | number
          }
        }
      }
      cuenta_persona: {
        payload: Prisma.$cuenta_personaPayload<ExtArgs>
        fields: Prisma.cuenta_personaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.cuenta_personaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cuenta_personaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.cuenta_personaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cuenta_personaPayload>
          }
          findFirst: {
            args: Prisma.cuenta_personaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cuenta_personaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.cuenta_personaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cuenta_personaPayload>
          }
          findMany: {
            args: Prisma.cuenta_personaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cuenta_personaPayload>[]
          }
          create: {
            args: Prisma.cuenta_personaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cuenta_personaPayload>
          }
          createMany: {
            args: Prisma.cuenta_personaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.cuenta_personaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cuenta_personaPayload>[]
          }
          delete: {
            args: Prisma.cuenta_personaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cuenta_personaPayload>
          }
          update: {
            args: Prisma.cuenta_personaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cuenta_personaPayload>
          }
          deleteMany: {
            args: Prisma.cuenta_personaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.cuenta_personaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.cuenta_personaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cuenta_personaPayload>[]
          }
          upsert: {
            args: Prisma.cuenta_personaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$cuenta_personaPayload>
          }
          aggregate: {
            args: Prisma.Cuenta_personaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCuenta_persona>
          }
          groupBy: {
            args: Prisma.cuenta_personaGroupByArgs<ExtArgs>
            result: $Utils.Optional<Cuenta_personaGroupByOutputType>[]
          }
          count: {
            args: Prisma.cuenta_personaCountArgs<ExtArgs>
            result: $Utils.Optional<Cuenta_personaCountAggregateOutputType> | number
          }
        }
      }
      espacio: {
        payload: Prisma.$espacioPayload<ExtArgs>
        fields: Prisma.espacioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.espacioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$espacioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.espacioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$espacioPayload>
          }
          findFirst: {
            args: Prisma.espacioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$espacioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.espacioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$espacioPayload>
          }
          findMany: {
            args: Prisma.espacioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$espacioPayload>[]
          }
          create: {
            args: Prisma.espacioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$espacioPayload>
          }
          createMany: {
            args: Prisma.espacioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.espacioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$espacioPayload>[]
          }
          delete: {
            args: Prisma.espacioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$espacioPayload>
          }
          update: {
            args: Prisma.espacioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$espacioPayload>
          }
          deleteMany: {
            args: Prisma.espacioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.espacioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.espacioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$espacioPayload>[]
          }
          upsert: {
            args: Prisma.espacioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$espacioPayload>
          }
          aggregate: {
            args: Prisma.EspacioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEspacio>
          }
          groupBy: {
            args: Prisma.espacioGroupByArgs<ExtArgs>
            result: $Utils.Optional<EspacioGroupByOutputType>[]
          }
          count: {
            args: Prisma.espacioCountArgs<ExtArgs>
            result: $Utils.Optional<EspacioCountAggregateOutputType> | number
          }
        }
      }
      huesped: {
        payload: Prisma.$huespedPayload<ExtArgs>
        fields: Prisma.huespedFieldRefs
        operations: {
          findUnique: {
            args: Prisma.huespedFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$huespedPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.huespedFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$huespedPayload>
          }
          findFirst: {
            args: Prisma.huespedFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$huespedPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.huespedFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$huespedPayload>
          }
          findMany: {
            args: Prisma.huespedFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$huespedPayload>[]
          }
          create: {
            args: Prisma.huespedCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$huespedPayload>
          }
          createMany: {
            args: Prisma.huespedCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.huespedCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$huespedPayload>[]
          }
          delete: {
            args: Prisma.huespedDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$huespedPayload>
          }
          update: {
            args: Prisma.huespedUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$huespedPayload>
          }
          deleteMany: {
            args: Prisma.huespedDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.huespedUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.huespedUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$huespedPayload>[]
          }
          upsert: {
            args: Prisma.huespedUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$huespedPayload>
          }
          aggregate: {
            args: Prisma.HuespedAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHuesped>
          }
          groupBy: {
            args: Prisma.huespedGroupByArgs<ExtArgs>
            result: $Utils.Optional<HuespedGroupByOutputType>[]
          }
          count: {
            args: Prisma.huespedCountArgs<ExtArgs>
            result: $Utils.Optional<HuespedCountAggregateOutputType> | number
          }
        }
      }
      inventario_minibar: {
        payload: Prisma.$inventario_minibarPayload<ExtArgs>
        fields: Prisma.inventario_minibarFieldRefs
        operations: {
          findUnique: {
            args: Prisma.inventario_minibarFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$inventario_minibarPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.inventario_minibarFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$inventario_minibarPayload>
          }
          findFirst: {
            args: Prisma.inventario_minibarFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$inventario_minibarPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.inventario_minibarFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$inventario_minibarPayload>
          }
          findMany: {
            args: Prisma.inventario_minibarFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$inventario_minibarPayload>[]
          }
          create: {
            args: Prisma.inventario_minibarCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$inventario_minibarPayload>
          }
          createMany: {
            args: Prisma.inventario_minibarCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.inventario_minibarCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$inventario_minibarPayload>[]
          }
          delete: {
            args: Prisma.inventario_minibarDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$inventario_minibarPayload>
          }
          update: {
            args: Prisma.inventario_minibarUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$inventario_minibarPayload>
          }
          deleteMany: {
            args: Prisma.inventario_minibarDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.inventario_minibarUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.inventario_minibarUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$inventario_minibarPayload>[]
          }
          upsert: {
            args: Prisma.inventario_minibarUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$inventario_minibarPayload>
          }
          aggregate: {
            args: Prisma.Inventario_minibarAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInventario_minibar>
          }
          groupBy: {
            args: Prisma.inventario_minibarGroupByArgs<ExtArgs>
            result: $Utils.Optional<Inventario_minibarGroupByOutputType>[]
          }
          count: {
            args: Prisma.inventario_minibarCountArgs<ExtArgs>
            result: $Utils.Optional<Inventario_minibarCountAggregateOutputType> | number
          }
        }
      }
      reserva: {
        payload: Prisma.$reservaPayload<ExtArgs>
        fields: Prisma.reservaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.reservaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reservaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.reservaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reservaPayload>
          }
          findFirst: {
            args: Prisma.reservaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reservaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.reservaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reservaPayload>
          }
          findMany: {
            args: Prisma.reservaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reservaPayload>[]
          }
          create: {
            args: Prisma.reservaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reservaPayload>
          }
          createMany: {
            args: Prisma.reservaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.reservaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reservaPayload>[]
          }
          delete: {
            args: Prisma.reservaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reservaPayload>
          }
          update: {
            args: Prisma.reservaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reservaPayload>
          }
          deleteMany: {
            args: Prisma.reservaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.reservaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.reservaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reservaPayload>[]
          }
          upsert: {
            args: Prisma.reservaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reservaPayload>
          }
          aggregate: {
            args: Prisma.ReservaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReserva>
          }
          groupBy: {
            args: Prisma.reservaGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReservaGroupByOutputType>[]
          }
          count: {
            args: Prisma.reservaCountArgs<ExtArgs>
            result: $Utils.Optional<ReservaCountAggregateOutputType> | number
          }
        }
      }
      configuracion_hotel: {
        payload: Prisma.$configuracion_hotelPayload<ExtArgs>
        fields: Prisma.configuracion_hotelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.configuracion_hotelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_hotelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.configuracion_hotelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_hotelPayload>
          }
          findFirst: {
            args: Prisma.configuracion_hotelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_hotelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.configuracion_hotelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_hotelPayload>
          }
          findMany: {
            args: Prisma.configuracion_hotelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_hotelPayload>[]
          }
          create: {
            args: Prisma.configuracion_hotelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_hotelPayload>
          }
          createMany: {
            args: Prisma.configuracion_hotelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.configuracion_hotelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_hotelPayload>[]
          }
          delete: {
            args: Prisma.configuracion_hotelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_hotelPayload>
          }
          update: {
            args: Prisma.configuracion_hotelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_hotelPayload>
          }
          deleteMany: {
            args: Prisma.configuracion_hotelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.configuracion_hotelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.configuracion_hotelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_hotelPayload>[]
          }
          upsert: {
            args: Prisma.configuracion_hotelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$configuracion_hotelPayload>
          }
          aggregate: {
            args: Prisma.Configuracion_hotelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConfiguracion_hotel>
          }
          groupBy: {
            args: Prisma.configuracion_hotelGroupByArgs<ExtArgs>
            result: $Utils.Optional<Configuracion_hotelGroupByOutputType>[]
          }
          count: {
            args: Prisma.configuracion_hotelCountArgs<ExtArgs>
            result: $Utils.Optional<Configuracion_hotelCountAggregateOutputType> | number
          }
        }
      }
      tipo_espacio_config: {
        payload: Prisma.$tipo_espacio_configPayload<ExtArgs>
        fields: Prisma.tipo_espacio_configFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tipo_espacio_configFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipo_espacio_configPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tipo_espacio_configFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipo_espacio_configPayload>
          }
          findFirst: {
            args: Prisma.tipo_espacio_configFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipo_espacio_configPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tipo_espacio_configFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipo_espacio_configPayload>
          }
          findMany: {
            args: Prisma.tipo_espacio_configFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipo_espacio_configPayload>[]
          }
          create: {
            args: Prisma.tipo_espacio_configCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipo_espacio_configPayload>
          }
          createMany: {
            args: Prisma.tipo_espacio_configCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.tipo_espacio_configCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipo_espacio_configPayload>[]
          }
          delete: {
            args: Prisma.tipo_espacio_configDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipo_espacio_configPayload>
          }
          update: {
            args: Prisma.tipo_espacio_configUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipo_espacio_configPayload>
          }
          deleteMany: {
            args: Prisma.tipo_espacio_configDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tipo_espacio_configUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.tipo_espacio_configUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipo_espacio_configPayload>[]
          }
          upsert: {
            args: Prisma.tipo_espacio_configUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tipo_espacio_configPayload>
          }
          aggregate: {
            args: Prisma.Tipo_espacio_configAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTipo_espacio_config>
          }
          groupBy: {
            args: Prisma.tipo_espacio_configGroupByArgs<ExtArgs>
            result: $Utils.Optional<Tipo_espacio_configGroupByOutputType>[]
          }
          count: {
            args: Prisma.tipo_espacio_configCountArgs<ExtArgs>
            result: $Utils.Optional<Tipo_espacio_configCountAggregateOutputType> | number
          }
        }
      }
      categoria_inventario: {
        payload: Prisma.$categoria_inventarioPayload<ExtArgs>
        fields: Prisma.categoria_inventarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.categoria_inventarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoria_inventarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.categoria_inventarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoria_inventarioPayload>
          }
          findFirst: {
            args: Prisma.categoria_inventarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoria_inventarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.categoria_inventarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoria_inventarioPayload>
          }
          findMany: {
            args: Prisma.categoria_inventarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoria_inventarioPayload>[]
          }
          create: {
            args: Prisma.categoria_inventarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoria_inventarioPayload>
          }
          createMany: {
            args: Prisma.categoria_inventarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.categoria_inventarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoria_inventarioPayload>[]
          }
          delete: {
            args: Prisma.categoria_inventarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoria_inventarioPayload>
          }
          update: {
            args: Prisma.categoria_inventarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoria_inventarioPayload>
          }
          deleteMany: {
            args: Prisma.categoria_inventarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.categoria_inventarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.categoria_inventarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoria_inventarioPayload>[]
          }
          upsert: {
            args: Prisma.categoria_inventarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoria_inventarioPayload>
          }
          aggregate: {
            args: Prisma.Categoria_inventarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategoria_inventario>
          }
          groupBy: {
            args: Prisma.categoria_inventarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<Categoria_inventarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.categoria_inventarioCountArgs<ExtArgs>
            result: $Utils.Optional<Categoria_inventarioCountAggregateOutputType> | number
          }
        }
      }
      proveedor: {
        payload: Prisma.$proveedorPayload<ExtArgs>
        fields: Prisma.proveedorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.proveedorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proveedorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.proveedorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proveedorPayload>
          }
          findFirst: {
            args: Prisma.proveedorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proveedorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.proveedorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proveedorPayload>
          }
          findMany: {
            args: Prisma.proveedorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proveedorPayload>[]
          }
          create: {
            args: Prisma.proveedorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proveedorPayload>
          }
          createMany: {
            args: Prisma.proveedorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.proveedorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proveedorPayload>[]
          }
          delete: {
            args: Prisma.proveedorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proveedorPayload>
          }
          update: {
            args: Prisma.proveedorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proveedorPayload>
          }
          deleteMany: {
            args: Prisma.proveedorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.proveedorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.proveedorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proveedorPayload>[]
          }
          upsert: {
            args: Prisma.proveedorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$proveedorPayload>
          }
          aggregate: {
            args: Prisma.ProveedorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProveedor>
          }
          groupBy: {
            args: Prisma.proveedorGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProveedorGroupByOutputType>[]
          }
          count: {
            args: Prisma.proveedorCountArgs<ExtArgs>
            result: $Utils.Optional<ProveedorCountAggregateOutputType> | number
          }
        }
      }
      producto_inventario: {
        payload: Prisma.$producto_inventarioPayload<ExtArgs>
        fields: Prisma.producto_inventarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.producto_inventarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$producto_inventarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.producto_inventarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$producto_inventarioPayload>
          }
          findFirst: {
            args: Prisma.producto_inventarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$producto_inventarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.producto_inventarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$producto_inventarioPayload>
          }
          findMany: {
            args: Prisma.producto_inventarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$producto_inventarioPayload>[]
          }
          create: {
            args: Prisma.producto_inventarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$producto_inventarioPayload>
          }
          createMany: {
            args: Prisma.producto_inventarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.producto_inventarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$producto_inventarioPayload>[]
          }
          delete: {
            args: Prisma.producto_inventarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$producto_inventarioPayload>
          }
          update: {
            args: Prisma.producto_inventarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$producto_inventarioPayload>
          }
          deleteMany: {
            args: Prisma.producto_inventarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.producto_inventarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.producto_inventarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$producto_inventarioPayload>[]
          }
          upsert: {
            args: Prisma.producto_inventarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$producto_inventarioPayload>
          }
          aggregate: {
            args: Prisma.Producto_inventarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProducto_inventario>
          }
          groupBy: {
            args: Prisma.producto_inventarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<Producto_inventarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.producto_inventarioCountArgs<ExtArgs>
            result: $Utils.Optional<Producto_inventarioCountAggregateOutputType> | number
          }
        }
      }
      movimiento_inventario: {
        payload: Prisma.$movimiento_inventarioPayload<ExtArgs>
        fields: Prisma.movimiento_inventarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.movimiento_inventarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$movimiento_inventarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.movimiento_inventarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$movimiento_inventarioPayload>
          }
          findFirst: {
            args: Prisma.movimiento_inventarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$movimiento_inventarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.movimiento_inventarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$movimiento_inventarioPayload>
          }
          findMany: {
            args: Prisma.movimiento_inventarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$movimiento_inventarioPayload>[]
          }
          create: {
            args: Prisma.movimiento_inventarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$movimiento_inventarioPayload>
          }
          createMany: {
            args: Prisma.movimiento_inventarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.movimiento_inventarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$movimiento_inventarioPayload>[]
          }
          delete: {
            args: Prisma.movimiento_inventarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$movimiento_inventarioPayload>
          }
          update: {
            args: Prisma.movimiento_inventarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$movimiento_inventarioPayload>
          }
          deleteMany: {
            args: Prisma.movimiento_inventarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.movimiento_inventarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.movimiento_inventarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$movimiento_inventarioPayload>[]
          }
          upsert: {
            args: Prisma.movimiento_inventarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$movimiento_inventarioPayload>
          }
          aggregate: {
            args: Prisma.Movimiento_inventarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMovimiento_inventario>
          }
          groupBy: {
            args: Prisma.movimiento_inventarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<Movimiento_inventarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.movimiento_inventarioCountArgs<ExtArgs>
            result: $Utils.Optional<Movimiento_inventarioCountAggregateOutputType> | number
          }
        }
      }
      gasto_operativo: {
        payload: Prisma.$gasto_operativoPayload<ExtArgs>
        fields: Prisma.gasto_operativoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.gasto_operativoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gasto_operativoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.gasto_operativoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gasto_operativoPayload>
          }
          findFirst: {
            args: Prisma.gasto_operativoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gasto_operativoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.gasto_operativoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gasto_operativoPayload>
          }
          findMany: {
            args: Prisma.gasto_operativoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gasto_operativoPayload>[]
          }
          create: {
            args: Prisma.gasto_operativoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gasto_operativoPayload>
          }
          createMany: {
            args: Prisma.gasto_operativoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.gasto_operativoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gasto_operativoPayload>[]
          }
          delete: {
            args: Prisma.gasto_operativoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gasto_operativoPayload>
          }
          update: {
            args: Prisma.gasto_operativoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gasto_operativoPayload>
          }
          deleteMany: {
            args: Prisma.gasto_operativoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.gasto_operativoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.gasto_operativoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gasto_operativoPayload>[]
          }
          upsert: {
            args: Prisma.gasto_operativoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$gasto_operativoPayload>
          }
          aggregate: {
            args: Prisma.Gasto_operativoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGasto_operativo>
          }
          groupBy: {
            args: Prisma.gasto_operativoGroupByArgs<ExtArgs>
            result: $Utils.Optional<Gasto_operativoGroupByOutputType>[]
          }
          count: {
            args: Prisma.gasto_operativoCountArgs<ExtArgs>
            result: $Utils.Optional<Gasto_operativoCountAggregateOutputType> | number
          }
        }
      }
      categoria_gasto: {
        payload: Prisma.$categoria_gastoPayload<ExtArgs>
        fields: Prisma.categoria_gastoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.categoria_gastoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoria_gastoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.categoria_gastoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoria_gastoPayload>
          }
          findFirst: {
            args: Prisma.categoria_gastoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoria_gastoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.categoria_gastoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoria_gastoPayload>
          }
          findMany: {
            args: Prisma.categoria_gastoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoria_gastoPayload>[]
          }
          create: {
            args: Prisma.categoria_gastoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoria_gastoPayload>
          }
          createMany: {
            args: Prisma.categoria_gastoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.categoria_gastoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoria_gastoPayload>[]
          }
          delete: {
            args: Prisma.categoria_gastoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoria_gastoPayload>
          }
          update: {
            args: Prisma.categoria_gastoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoria_gastoPayload>
          }
          deleteMany: {
            args: Prisma.categoria_gastoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.categoria_gastoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.categoria_gastoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoria_gastoPayload>[]
          }
          upsert: {
            args: Prisma.categoria_gastoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoria_gastoPayload>
          }
          aggregate: {
            args: Prisma.Categoria_gastoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategoria_gasto>
          }
          groupBy: {
            args: Prisma.categoria_gastoGroupByArgs<ExtArgs>
            result: $Utils.Optional<Categoria_gastoGroupByOutputType>[]
          }
          count: {
            args: Prisma.categoria_gastoCountArgs<ExtArgs>
            result: $Utils.Optional<Categoria_gastoCountAggregateOutputType> | number
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
     * Read more in our [docs](https://pris.ly/d/logging).
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
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    cuenta_espacio?: cuenta_espacioOmit
    cuenta_persona?: cuenta_personaOmit
    espacio?: espacioOmit
    huesped?: huespedOmit
    inventario_minibar?: inventario_minibarOmit
    reserva?: reservaOmit
    configuracion_hotel?: configuracion_hotelOmit
    tipo_espacio_config?: tipo_espacio_configOmit
    categoria_inventario?: categoria_inventarioOmit
    proveedor?: proveedorOmit
    producto_inventario?: producto_inventarioOmit
    movimiento_inventario?: movimiento_inventarioOmit
    gasto_operativo?: gasto_operativoOmit
    categoria_gasto?: categoria_gastoOmit
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
   * Count Type EspacioCountOutputType
   */

  export type EspacioCountOutputType = {
    inventario_minibar: number
    reserva: number
  }

  export type EspacioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inventario_minibar?: boolean | EspacioCountOutputTypeCountInventario_minibarArgs
    reserva?: boolean | EspacioCountOutputTypeCountReservaArgs
  }

  // Custom InputTypes
  /**
   * EspacioCountOutputType without action
   */
  export type EspacioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EspacioCountOutputType
     */
    select?: EspacioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EspacioCountOutputType without action
   */
  export type EspacioCountOutputTypeCountInventario_minibarArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: inventario_minibarWhereInput
  }

  /**
   * EspacioCountOutputType without action
   */
  export type EspacioCountOutputTypeCountReservaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reservaWhereInput
  }


  /**
   * Count Type HuespedCountOutputType
   */

  export type HuespedCountOutputType = {
    cuenta_persona: number
    reserva: number
  }

  export type HuespedCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cuenta_persona?: boolean | HuespedCountOutputTypeCountCuenta_personaArgs
    reserva?: boolean | HuespedCountOutputTypeCountReservaArgs
  }

  // Custom InputTypes
  /**
   * HuespedCountOutputType without action
   */
  export type HuespedCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HuespedCountOutputType
     */
    select?: HuespedCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * HuespedCountOutputType without action
   */
  export type HuespedCountOutputTypeCountCuenta_personaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: cuenta_personaWhereInput
  }

  /**
   * HuespedCountOutputType without action
   */
  export type HuespedCountOutputTypeCountReservaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reservaWhereInput
  }


  /**
   * Count Type ReservaCountOutputType
   */

  export type ReservaCountOutputType = {
    cuenta_espacio: number
    cuenta_persona: number
  }

  export type ReservaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cuenta_espacio?: boolean | ReservaCountOutputTypeCountCuenta_espacioArgs
    cuenta_persona?: boolean | ReservaCountOutputTypeCountCuenta_personaArgs
  }

  // Custom InputTypes
  /**
   * ReservaCountOutputType without action
   */
  export type ReservaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReservaCountOutputType
     */
    select?: ReservaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ReservaCountOutputType without action
   */
  export type ReservaCountOutputTypeCountCuenta_espacioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: cuenta_espacioWhereInput
  }

  /**
   * ReservaCountOutputType without action
   */
  export type ReservaCountOutputTypeCountCuenta_personaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: cuenta_personaWhereInput
  }


  /**
   * Count Type ProveedorCountOutputType
   */

  export type ProveedorCountOutputType = {
    productos: number
  }

  export type ProveedorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productos?: boolean | ProveedorCountOutputTypeCountProductosArgs
  }

  // Custom InputTypes
  /**
   * ProveedorCountOutputType without action
   */
  export type ProveedorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProveedorCountOutputType
     */
    select?: ProveedorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProveedorCountOutputType without action
   */
  export type ProveedorCountOutputTypeCountProductosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: producto_inventarioWhereInput
  }


  /**
   * Count Type Producto_inventarioCountOutputType
   */

  export type Producto_inventarioCountOutputType = {
    movimientos: number
  }

  export type Producto_inventarioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movimientos?: boolean | Producto_inventarioCountOutputTypeCountMovimientosArgs
  }

  // Custom InputTypes
  /**
   * Producto_inventarioCountOutputType without action
   */
  export type Producto_inventarioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Producto_inventarioCountOutputType
     */
    select?: Producto_inventarioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Producto_inventarioCountOutputType without action
   */
  export type Producto_inventarioCountOutputTypeCountMovimientosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: movimiento_inventarioWhereInput
  }


  /**
   * Models
   */

  /**
   * Model cuenta_espacio
   */

  export type AggregateCuenta_espacio = {
    _count: Cuenta_espacioCountAggregateOutputType | null
    _avg: Cuenta_espacioAvgAggregateOutputType | null
    _sum: Cuenta_espacioSumAggregateOutputType | null
    _min: Cuenta_espacioMinAggregateOutputType | null
    _max: Cuenta_espacioMaxAggregateOutputType | null
  }

  export type Cuenta_espacioAvgAggregateOutputType = {
    id_item: number | null
    id_reserva: number | null
    cantidad: number | null
    valor_unitario: Decimal | null
    valor_total: Decimal | null
  }

  export type Cuenta_espacioSumAggregateOutputType = {
    id_item: number | null
    id_reserva: number | null
    cantidad: number | null
    valor_unitario: Decimal | null
    valor_total: Decimal | null
  }

  export type Cuenta_espacioMinAggregateOutputType = {
    id_item: number | null
    id_reserva: number | null
    nombre_producto: string | null
    cantidad: number | null
    valor_unitario: Decimal | null
    valor_total: Decimal | null
    estado: string | null
    metodo_pago: string | null
    fecha_registro: Date | null
    anotaciones: string | null
  }

  export type Cuenta_espacioMaxAggregateOutputType = {
    id_item: number | null
    id_reserva: number | null
    nombre_producto: string | null
    cantidad: number | null
    valor_unitario: Decimal | null
    valor_total: Decimal | null
    estado: string | null
    metodo_pago: string | null
    fecha_registro: Date | null
    anotaciones: string | null
  }

  export type Cuenta_espacioCountAggregateOutputType = {
    id_item: number
    id_reserva: number
    nombre_producto: number
    cantidad: number
    valor_unitario: number
    valor_total: number
    estado: number
    metodo_pago: number
    fecha_registro: number
    anotaciones: number
    _all: number
  }


  export type Cuenta_espacioAvgAggregateInputType = {
    id_item?: true
    id_reserva?: true
    cantidad?: true
    valor_unitario?: true
    valor_total?: true
  }

  export type Cuenta_espacioSumAggregateInputType = {
    id_item?: true
    id_reserva?: true
    cantidad?: true
    valor_unitario?: true
    valor_total?: true
  }

  export type Cuenta_espacioMinAggregateInputType = {
    id_item?: true
    id_reserva?: true
    nombre_producto?: true
    cantidad?: true
    valor_unitario?: true
    valor_total?: true
    estado?: true
    metodo_pago?: true
    fecha_registro?: true
    anotaciones?: true
  }

  export type Cuenta_espacioMaxAggregateInputType = {
    id_item?: true
    id_reserva?: true
    nombre_producto?: true
    cantidad?: true
    valor_unitario?: true
    valor_total?: true
    estado?: true
    metodo_pago?: true
    fecha_registro?: true
    anotaciones?: true
  }

  export type Cuenta_espacioCountAggregateInputType = {
    id_item?: true
    id_reserva?: true
    nombre_producto?: true
    cantidad?: true
    valor_unitario?: true
    valor_total?: true
    estado?: true
    metodo_pago?: true
    fecha_registro?: true
    anotaciones?: true
    _all?: true
  }

  export type Cuenta_espacioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cuenta_espacio to aggregate.
     */
    where?: cuenta_espacioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cuenta_espacios to fetch.
     */
    orderBy?: cuenta_espacioOrderByWithRelationInput | cuenta_espacioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: cuenta_espacioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cuenta_espacios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cuenta_espacios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned cuenta_espacios
    **/
    _count?: true | Cuenta_espacioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Cuenta_espacioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Cuenta_espacioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Cuenta_espacioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Cuenta_espacioMaxAggregateInputType
  }

  export type GetCuenta_espacioAggregateType<T extends Cuenta_espacioAggregateArgs> = {
        [P in keyof T & keyof AggregateCuenta_espacio]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCuenta_espacio[P]>
      : GetScalarType<T[P], AggregateCuenta_espacio[P]>
  }




  export type cuenta_espacioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: cuenta_espacioWhereInput
    orderBy?: cuenta_espacioOrderByWithAggregationInput | cuenta_espacioOrderByWithAggregationInput[]
    by: Cuenta_espacioScalarFieldEnum[] | Cuenta_espacioScalarFieldEnum
    having?: cuenta_espacioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Cuenta_espacioCountAggregateInputType | true
    _avg?: Cuenta_espacioAvgAggregateInputType
    _sum?: Cuenta_espacioSumAggregateInputType
    _min?: Cuenta_espacioMinAggregateInputType
    _max?: Cuenta_espacioMaxAggregateInputType
  }

  export type Cuenta_espacioGroupByOutputType = {
    id_item: number
    id_reserva: number
    nombre_producto: string
    cantidad: number
    valor_unitario: Decimal
    valor_total: Decimal | null
    estado: string | null
    metodo_pago: string | null
    fecha_registro: Date | null
    anotaciones: string | null
    _count: Cuenta_espacioCountAggregateOutputType | null
    _avg: Cuenta_espacioAvgAggregateOutputType | null
    _sum: Cuenta_espacioSumAggregateOutputType | null
    _min: Cuenta_espacioMinAggregateOutputType | null
    _max: Cuenta_espacioMaxAggregateOutputType | null
  }

  type GetCuenta_espacioGroupByPayload<T extends cuenta_espacioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Cuenta_espacioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Cuenta_espacioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Cuenta_espacioGroupByOutputType[P]>
            : GetScalarType<T[P], Cuenta_espacioGroupByOutputType[P]>
        }
      >
    >


  export type cuenta_espacioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_item?: boolean
    id_reserva?: boolean
    nombre_producto?: boolean
    cantidad?: boolean
    valor_unitario?: boolean
    valor_total?: boolean
    estado?: boolean
    metodo_pago?: boolean
    fecha_registro?: boolean
    anotaciones?: boolean
    reserva?: boolean | reservaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cuenta_espacio"]>

  export type cuenta_espacioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_item?: boolean
    id_reserva?: boolean
    nombre_producto?: boolean
    cantidad?: boolean
    valor_unitario?: boolean
    valor_total?: boolean
    estado?: boolean
    metodo_pago?: boolean
    fecha_registro?: boolean
    anotaciones?: boolean
    reserva?: boolean | reservaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cuenta_espacio"]>

  export type cuenta_espacioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_item?: boolean
    id_reserva?: boolean
    nombre_producto?: boolean
    cantidad?: boolean
    valor_unitario?: boolean
    valor_total?: boolean
    estado?: boolean
    metodo_pago?: boolean
    fecha_registro?: boolean
    anotaciones?: boolean
    reserva?: boolean | reservaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cuenta_espacio"]>

  export type cuenta_espacioSelectScalar = {
    id_item?: boolean
    id_reserva?: boolean
    nombre_producto?: boolean
    cantidad?: boolean
    valor_unitario?: boolean
    valor_total?: boolean
    estado?: boolean
    metodo_pago?: boolean
    fecha_registro?: boolean
    anotaciones?: boolean
  }

  export type cuenta_espacioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_item" | "id_reserva" | "nombre_producto" | "cantidad" | "valor_unitario" | "valor_total" | "estado" | "metodo_pago" | "fecha_registro" | "anotaciones", ExtArgs["result"]["cuenta_espacio"]>
  export type cuenta_espacioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reserva?: boolean | reservaDefaultArgs<ExtArgs>
  }
  export type cuenta_espacioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reserva?: boolean | reservaDefaultArgs<ExtArgs>
  }
  export type cuenta_espacioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reserva?: boolean | reservaDefaultArgs<ExtArgs>
  }

  export type $cuenta_espacioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "cuenta_espacio"
    objects: {
      reserva: Prisma.$reservaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_item: number
      id_reserva: number
      nombre_producto: string
      cantidad: number
      valor_unitario: Prisma.Decimal
      valor_total: Prisma.Decimal | null
      estado: string | null
      metodo_pago: string | null
      fecha_registro: Date | null
      anotaciones: string | null
    }, ExtArgs["result"]["cuenta_espacio"]>
    composites: {}
  }

  type cuenta_espacioGetPayload<S extends boolean | null | undefined | cuenta_espacioDefaultArgs> = $Result.GetResult<Prisma.$cuenta_espacioPayload, S>

  type cuenta_espacioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<cuenta_espacioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Cuenta_espacioCountAggregateInputType | true
    }

  export interface cuenta_espacioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['cuenta_espacio'], meta: { name: 'cuenta_espacio' } }
    /**
     * Find zero or one Cuenta_espacio that matches the filter.
     * @param {cuenta_espacioFindUniqueArgs} args - Arguments to find a Cuenta_espacio
     * @example
     * // Get one Cuenta_espacio
     * const cuenta_espacio = await prisma.cuenta_espacio.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends cuenta_espacioFindUniqueArgs>(args: SelectSubset<T, cuenta_espacioFindUniqueArgs<ExtArgs>>): Prisma__cuenta_espacioClient<$Result.GetResult<Prisma.$cuenta_espacioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cuenta_espacio that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {cuenta_espacioFindUniqueOrThrowArgs} args - Arguments to find a Cuenta_espacio
     * @example
     * // Get one Cuenta_espacio
     * const cuenta_espacio = await prisma.cuenta_espacio.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends cuenta_espacioFindUniqueOrThrowArgs>(args: SelectSubset<T, cuenta_espacioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__cuenta_espacioClient<$Result.GetResult<Prisma.$cuenta_espacioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cuenta_espacio that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cuenta_espacioFindFirstArgs} args - Arguments to find a Cuenta_espacio
     * @example
     * // Get one Cuenta_espacio
     * const cuenta_espacio = await prisma.cuenta_espacio.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends cuenta_espacioFindFirstArgs>(args?: SelectSubset<T, cuenta_espacioFindFirstArgs<ExtArgs>>): Prisma__cuenta_espacioClient<$Result.GetResult<Prisma.$cuenta_espacioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cuenta_espacio that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cuenta_espacioFindFirstOrThrowArgs} args - Arguments to find a Cuenta_espacio
     * @example
     * // Get one Cuenta_espacio
     * const cuenta_espacio = await prisma.cuenta_espacio.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends cuenta_espacioFindFirstOrThrowArgs>(args?: SelectSubset<T, cuenta_espacioFindFirstOrThrowArgs<ExtArgs>>): Prisma__cuenta_espacioClient<$Result.GetResult<Prisma.$cuenta_espacioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cuenta_espacios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cuenta_espacioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cuenta_espacios
     * const cuenta_espacios = await prisma.cuenta_espacio.findMany()
     * 
     * // Get first 10 Cuenta_espacios
     * const cuenta_espacios = await prisma.cuenta_espacio.findMany({ take: 10 })
     * 
     * // Only select the `id_item`
     * const cuenta_espacioWithId_itemOnly = await prisma.cuenta_espacio.findMany({ select: { id_item: true } })
     * 
     */
    findMany<T extends cuenta_espacioFindManyArgs>(args?: SelectSubset<T, cuenta_espacioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cuenta_espacioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cuenta_espacio.
     * @param {cuenta_espacioCreateArgs} args - Arguments to create a Cuenta_espacio.
     * @example
     * // Create one Cuenta_espacio
     * const Cuenta_espacio = await prisma.cuenta_espacio.create({
     *   data: {
     *     // ... data to create a Cuenta_espacio
     *   }
     * })
     * 
     */
    create<T extends cuenta_espacioCreateArgs>(args: SelectSubset<T, cuenta_espacioCreateArgs<ExtArgs>>): Prisma__cuenta_espacioClient<$Result.GetResult<Prisma.$cuenta_espacioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cuenta_espacios.
     * @param {cuenta_espacioCreateManyArgs} args - Arguments to create many Cuenta_espacios.
     * @example
     * // Create many Cuenta_espacios
     * const cuenta_espacio = await prisma.cuenta_espacio.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends cuenta_espacioCreateManyArgs>(args?: SelectSubset<T, cuenta_espacioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cuenta_espacios and returns the data saved in the database.
     * @param {cuenta_espacioCreateManyAndReturnArgs} args - Arguments to create many Cuenta_espacios.
     * @example
     * // Create many Cuenta_espacios
     * const cuenta_espacio = await prisma.cuenta_espacio.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cuenta_espacios and only return the `id_item`
     * const cuenta_espacioWithId_itemOnly = await prisma.cuenta_espacio.createManyAndReturn({
     *   select: { id_item: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends cuenta_espacioCreateManyAndReturnArgs>(args?: SelectSubset<T, cuenta_espacioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cuenta_espacioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Cuenta_espacio.
     * @param {cuenta_espacioDeleteArgs} args - Arguments to delete one Cuenta_espacio.
     * @example
     * // Delete one Cuenta_espacio
     * const Cuenta_espacio = await prisma.cuenta_espacio.delete({
     *   where: {
     *     // ... filter to delete one Cuenta_espacio
     *   }
     * })
     * 
     */
    delete<T extends cuenta_espacioDeleteArgs>(args: SelectSubset<T, cuenta_espacioDeleteArgs<ExtArgs>>): Prisma__cuenta_espacioClient<$Result.GetResult<Prisma.$cuenta_espacioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cuenta_espacio.
     * @param {cuenta_espacioUpdateArgs} args - Arguments to update one Cuenta_espacio.
     * @example
     * // Update one Cuenta_espacio
     * const cuenta_espacio = await prisma.cuenta_espacio.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends cuenta_espacioUpdateArgs>(args: SelectSubset<T, cuenta_espacioUpdateArgs<ExtArgs>>): Prisma__cuenta_espacioClient<$Result.GetResult<Prisma.$cuenta_espacioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cuenta_espacios.
     * @param {cuenta_espacioDeleteManyArgs} args - Arguments to filter Cuenta_espacios to delete.
     * @example
     * // Delete a few Cuenta_espacios
     * const { count } = await prisma.cuenta_espacio.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends cuenta_espacioDeleteManyArgs>(args?: SelectSubset<T, cuenta_espacioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cuenta_espacios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cuenta_espacioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cuenta_espacios
     * const cuenta_espacio = await prisma.cuenta_espacio.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends cuenta_espacioUpdateManyArgs>(args: SelectSubset<T, cuenta_espacioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cuenta_espacios and returns the data updated in the database.
     * @param {cuenta_espacioUpdateManyAndReturnArgs} args - Arguments to update many Cuenta_espacios.
     * @example
     * // Update many Cuenta_espacios
     * const cuenta_espacio = await prisma.cuenta_espacio.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cuenta_espacios and only return the `id_item`
     * const cuenta_espacioWithId_itemOnly = await prisma.cuenta_espacio.updateManyAndReturn({
     *   select: { id_item: true },
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
    updateManyAndReturn<T extends cuenta_espacioUpdateManyAndReturnArgs>(args: SelectSubset<T, cuenta_espacioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cuenta_espacioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Cuenta_espacio.
     * @param {cuenta_espacioUpsertArgs} args - Arguments to update or create a Cuenta_espacio.
     * @example
     * // Update or create a Cuenta_espacio
     * const cuenta_espacio = await prisma.cuenta_espacio.upsert({
     *   create: {
     *     // ... data to create a Cuenta_espacio
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cuenta_espacio we want to update
     *   }
     * })
     */
    upsert<T extends cuenta_espacioUpsertArgs>(args: SelectSubset<T, cuenta_espacioUpsertArgs<ExtArgs>>): Prisma__cuenta_espacioClient<$Result.GetResult<Prisma.$cuenta_espacioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cuenta_espacios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cuenta_espacioCountArgs} args - Arguments to filter Cuenta_espacios to count.
     * @example
     * // Count the number of Cuenta_espacios
     * const count = await prisma.cuenta_espacio.count({
     *   where: {
     *     // ... the filter for the Cuenta_espacios we want to count
     *   }
     * })
    **/
    count<T extends cuenta_espacioCountArgs>(
      args?: Subset<T, cuenta_espacioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Cuenta_espacioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cuenta_espacio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Cuenta_espacioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Cuenta_espacioAggregateArgs>(args: Subset<T, Cuenta_espacioAggregateArgs>): Prisma.PrismaPromise<GetCuenta_espacioAggregateType<T>>

    /**
     * Group by Cuenta_espacio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cuenta_espacioGroupByArgs} args - Group by arguments.
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
      T extends cuenta_espacioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: cuenta_espacioGroupByArgs['orderBy'] }
        : { orderBy?: cuenta_espacioGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, cuenta_espacioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCuenta_espacioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the cuenta_espacio model
   */
  readonly fields: cuenta_espacioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for cuenta_espacio.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__cuenta_espacioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reserva<T extends reservaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, reservaDefaultArgs<ExtArgs>>): Prisma__reservaClient<$Result.GetResult<Prisma.$reservaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the cuenta_espacio model
   */
  interface cuenta_espacioFieldRefs {
    readonly id_item: FieldRef<"cuenta_espacio", 'Int'>
    readonly id_reserva: FieldRef<"cuenta_espacio", 'Int'>
    readonly nombre_producto: FieldRef<"cuenta_espacio", 'String'>
    readonly cantidad: FieldRef<"cuenta_espacio", 'Int'>
    readonly valor_unitario: FieldRef<"cuenta_espacio", 'Decimal'>
    readonly valor_total: FieldRef<"cuenta_espacio", 'Decimal'>
    readonly estado: FieldRef<"cuenta_espacio", 'String'>
    readonly metodo_pago: FieldRef<"cuenta_espacio", 'String'>
    readonly fecha_registro: FieldRef<"cuenta_espacio", 'DateTime'>
    readonly anotaciones: FieldRef<"cuenta_espacio", 'String'>
  }
    

  // Custom InputTypes
  /**
   * cuenta_espacio findUnique
   */
  export type cuenta_espacioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_espacio
     */
    select?: cuenta_espacioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_espacio
     */
    omit?: cuenta_espacioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_espacioInclude<ExtArgs> | null
    /**
     * Filter, which cuenta_espacio to fetch.
     */
    where: cuenta_espacioWhereUniqueInput
  }

  /**
   * cuenta_espacio findUniqueOrThrow
   */
  export type cuenta_espacioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_espacio
     */
    select?: cuenta_espacioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_espacio
     */
    omit?: cuenta_espacioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_espacioInclude<ExtArgs> | null
    /**
     * Filter, which cuenta_espacio to fetch.
     */
    where: cuenta_espacioWhereUniqueInput
  }

  /**
   * cuenta_espacio findFirst
   */
  export type cuenta_espacioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_espacio
     */
    select?: cuenta_espacioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_espacio
     */
    omit?: cuenta_espacioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_espacioInclude<ExtArgs> | null
    /**
     * Filter, which cuenta_espacio to fetch.
     */
    where?: cuenta_espacioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cuenta_espacios to fetch.
     */
    orderBy?: cuenta_espacioOrderByWithRelationInput | cuenta_espacioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cuenta_espacios.
     */
    cursor?: cuenta_espacioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cuenta_espacios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cuenta_espacios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cuenta_espacios.
     */
    distinct?: Cuenta_espacioScalarFieldEnum | Cuenta_espacioScalarFieldEnum[]
  }

  /**
   * cuenta_espacio findFirstOrThrow
   */
  export type cuenta_espacioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_espacio
     */
    select?: cuenta_espacioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_espacio
     */
    omit?: cuenta_espacioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_espacioInclude<ExtArgs> | null
    /**
     * Filter, which cuenta_espacio to fetch.
     */
    where?: cuenta_espacioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cuenta_espacios to fetch.
     */
    orderBy?: cuenta_espacioOrderByWithRelationInput | cuenta_espacioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cuenta_espacios.
     */
    cursor?: cuenta_espacioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cuenta_espacios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cuenta_espacios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cuenta_espacios.
     */
    distinct?: Cuenta_espacioScalarFieldEnum | Cuenta_espacioScalarFieldEnum[]
  }

  /**
   * cuenta_espacio findMany
   */
  export type cuenta_espacioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_espacio
     */
    select?: cuenta_espacioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_espacio
     */
    omit?: cuenta_espacioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_espacioInclude<ExtArgs> | null
    /**
     * Filter, which cuenta_espacios to fetch.
     */
    where?: cuenta_espacioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cuenta_espacios to fetch.
     */
    orderBy?: cuenta_espacioOrderByWithRelationInput | cuenta_espacioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing cuenta_espacios.
     */
    cursor?: cuenta_espacioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cuenta_espacios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cuenta_espacios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cuenta_espacios.
     */
    distinct?: Cuenta_espacioScalarFieldEnum | Cuenta_espacioScalarFieldEnum[]
  }

  /**
   * cuenta_espacio create
   */
  export type cuenta_espacioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_espacio
     */
    select?: cuenta_espacioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_espacio
     */
    omit?: cuenta_espacioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_espacioInclude<ExtArgs> | null
    /**
     * The data needed to create a cuenta_espacio.
     */
    data: XOR<cuenta_espacioCreateInput, cuenta_espacioUncheckedCreateInput>
  }

  /**
   * cuenta_espacio createMany
   */
  export type cuenta_espacioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many cuenta_espacios.
     */
    data: cuenta_espacioCreateManyInput | cuenta_espacioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * cuenta_espacio createManyAndReturn
   */
  export type cuenta_espacioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_espacio
     */
    select?: cuenta_espacioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_espacio
     */
    omit?: cuenta_espacioOmit<ExtArgs> | null
    /**
     * The data used to create many cuenta_espacios.
     */
    data: cuenta_espacioCreateManyInput | cuenta_espacioCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_espacioIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * cuenta_espacio update
   */
  export type cuenta_espacioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_espacio
     */
    select?: cuenta_espacioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_espacio
     */
    omit?: cuenta_espacioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_espacioInclude<ExtArgs> | null
    /**
     * The data needed to update a cuenta_espacio.
     */
    data: XOR<cuenta_espacioUpdateInput, cuenta_espacioUncheckedUpdateInput>
    /**
     * Choose, which cuenta_espacio to update.
     */
    where: cuenta_espacioWhereUniqueInput
  }

  /**
   * cuenta_espacio updateMany
   */
  export type cuenta_espacioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update cuenta_espacios.
     */
    data: XOR<cuenta_espacioUpdateManyMutationInput, cuenta_espacioUncheckedUpdateManyInput>
    /**
     * Filter which cuenta_espacios to update
     */
    where?: cuenta_espacioWhereInput
    /**
     * Limit how many cuenta_espacios to update.
     */
    limit?: number
  }

  /**
   * cuenta_espacio updateManyAndReturn
   */
  export type cuenta_espacioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_espacio
     */
    select?: cuenta_espacioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_espacio
     */
    omit?: cuenta_espacioOmit<ExtArgs> | null
    /**
     * The data used to update cuenta_espacios.
     */
    data: XOR<cuenta_espacioUpdateManyMutationInput, cuenta_espacioUncheckedUpdateManyInput>
    /**
     * Filter which cuenta_espacios to update
     */
    where?: cuenta_espacioWhereInput
    /**
     * Limit how many cuenta_espacios to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_espacioIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * cuenta_espacio upsert
   */
  export type cuenta_espacioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_espacio
     */
    select?: cuenta_espacioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_espacio
     */
    omit?: cuenta_espacioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_espacioInclude<ExtArgs> | null
    /**
     * The filter to search for the cuenta_espacio to update in case it exists.
     */
    where: cuenta_espacioWhereUniqueInput
    /**
     * In case the cuenta_espacio found by the `where` argument doesn't exist, create a new cuenta_espacio with this data.
     */
    create: XOR<cuenta_espacioCreateInput, cuenta_espacioUncheckedCreateInput>
    /**
     * In case the cuenta_espacio was found with the provided `where` argument, update it with this data.
     */
    update: XOR<cuenta_espacioUpdateInput, cuenta_espacioUncheckedUpdateInput>
  }

  /**
   * cuenta_espacio delete
   */
  export type cuenta_espacioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_espacio
     */
    select?: cuenta_espacioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_espacio
     */
    omit?: cuenta_espacioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_espacioInclude<ExtArgs> | null
    /**
     * Filter which cuenta_espacio to delete.
     */
    where: cuenta_espacioWhereUniqueInput
  }

  /**
   * cuenta_espacio deleteMany
   */
  export type cuenta_espacioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cuenta_espacios to delete
     */
    where?: cuenta_espacioWhereInput
    /**
     * Limit how many cuenta_espacios to delete.
     */
    limit?: number
  }

  /**
   * cuenta_espacio without action
   */
  export type cuenta_espacioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_espacio
     */
    select?: cuenta_espacioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_espacio
     */
    omit?: cuenta_espacioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_espacioInclude<ExtArgs> | null
  }


  /**
   * Model cuenta_persona
   */

  export type AggregateCuenta_persona = {
    _count: Cuenta_personaCountAggregateOutputType | null
    _avg: Cuenta_personaAvgAggregateOutputType | null
    _sum: Cuenta_personaSumAggregateOutputType | null
    _min: Cuenta_personaMinAggregateOutputType | null
    _max: Cuenta_personaMaxAggregateOutputType | null
  }

  export type Cuenta_personaAvgAggregateOutputType = {
    id_item_persona: number | null
    id_huesped: number | null
    id_reserva: number | null
    cantidad: number | null
    valor_unitario: Decimal | null
    valor_total: Decimal | null
  }

  export type Cuenta_personaSumAggregateOutputType = {
    id_item_persona: number | null
    id_huesped: number | null
    id_reserva: number | null
    cantidad: number | null
    valor_unitario: Decimal | null
    valor_total: Decimal | null
  }

  export type Cuenta_personaMinAggregateOutputType = {
    id_item_persona: number | null
    id_huesped: number | null
    nombre_persona: string | null
    id_reserva: number | null
    fecha: Date | null
    descripcion: string | null
    cantidad: number | null
    valor_unitario: Decimal | null
    valor_total: Decimal | null
    estado: string | null
    metodo_pago: string | null
    fecha_registro: Date | null
  }

  export type Cuenta_personaMaxAggregateOutputType = {
    id_item_persona: number | null
    id_huesped: number | null
    nombre_persona: string | null
    id_reserva: number | null
    fecha: Date | null
    descripcion: string | null
    cantidad: number | null
    valor_unitario: Decimal | null
    valor_total: Decimal | null
    estado: string | null
    metodo_pago: string | null
    fecha_registro: Date | null
  }

  export type Cuenta_personaCountAggregateOutputType = {
    id_item_persona: number
    id_huesped: number
    nombre_persona: number
    id_reserva: number
    fecha: number
    descripcion: number
    cantidad: number
    valor_unitario: number
    valor_total: number
    estado: number
    metodo_pago: number
    fecha_registro: number
    _all: number
  }


  export type Cuenta_personaAvgAggregateInputType = {
    id_item_persona?: true
    id_huesped?: true
    id_reserva?: true
    cantidad?: true
    valor_unitario?: true
    valor_total?: true
  }

  export type Cuenta_personaSumAggregateInputType = {
    id_item_persona?: true
    id_huesped?: true
    id_reserva?: true
    cantidad?: true
    valor_unitario?: true
    valor_total?: true
  }

  export type Cuenta_personaMinAggregateInputType = {
    id_item_persona?: true
    id_huesped?: true
    nombre_persona?: true
    id_reserva?: true
    fecha?: true
    descripcion?: true
    cantidad?: true
    valor_unitario?: true
    valor_total?: true
    estado?: true
    metodo_pago?: true
    fecha_registro?: true
  }

  export type Cuenta_personaMaxAggregateInputType = {
    id_item_persona?: true
    id_huesped?: true
    nombre_persona?: true
    id_reserva?: true
    fecha?: true
    descripcion?: true
    cantidad?: true
    valor_unitario?: true
    valor_total?: true
    estado?: true
    metodo_pago?: true
    fecha_registro?: true
  }

  export type Cuenta_personaCountAggregateInputType = {
    id_item_persona?: true
    id_huesped?: true
    nombre_persona?: true
    id_reserva?: true
    fecha?: true
    descripcion?: true
    cantidad?: true
    valor_unitario?: true
    valor_total?: true
    estado?: true
    metodo_pago?: true
    fecha_registro?: true
    _all?: true
  }

  export type Cuenta_personaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cuenta_persona to aggregate.
     */
    where?: cuenta_personaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cuenta_personas to fetch.
     */
    orderBy?: cuenta_personaOrderByWithRelationInput | cuenta_personaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: cuenta_personaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cuenta_personas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cuenta_personas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned cuenta_personas
    **/
    _count?: true | Cuenta_personaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Cuenta_personaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Cuenta_personaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Cuenta_personaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Cuenta_personaMaxAggregateInputType
  }

  export type GetCuenta_personaAggregateType<T extends Cuenta_personaAggregateArgs> = {
        [P in keyof T & keyof AggregateCuenta_persona]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCuenta_persona[P]>
      : GetScalarType<T[P], AggregateCuenta_persona[P]>
  }




  export type cuenta_personaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: cuenta_personaWhereInput
    orderBy?: cuenta_personaOrderByWithAggregationInput | cuenta_personaOrderByWithAggregationInput[]
    by: Cuenta_personaScalarFieldEnum[] | Cuenta_personaScalarFieldEnum
    having?: cuenta_personaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Cuenta_personaCountAggregateInputType | true
    _avg?: Cuenta_personaAvgAggregateInputType
    _sum?: Cuenta_personaSumAggregateInputType
    _min?: Cuenta_personaMinAggregateInputType
    _max?: Cuenta_personaMaxAggregateInputType
  }

  export type Cuenta_personaGroupByOutputType = {
    id_item_persona: number
    id_huesped: number | null
    nombre_persona: string
    id_reserva: number | null
    fecha: Date
    descripcion: string
    cantidad: number
    valor_unitario: Decimal
    valor_total: Decimal | null
    estado: string | null
    metodo_pago: string | null
    fecha_registro: Date | null
    _count: Cuenta_personaCountAggregateOutputType | null
    _avg: Cuenta_personaAvgAggregateOutputType | null
    _sum: Cuenta_personaSumAggregateOutputType | null
    _min: Cuenta_personaMinAggregateOutputType | null
    _max: Cuenta_personaMaxAggregateOutputType | null
  }

  type GetCuenta_personaGroupByPayload<T extends cuenta_personaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Cuenta_personaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Cuenta_personaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Cuenta_personaGroupByOutputType[P]>
            : GetScalarType<T[P], Cuenta_personaGroupByOutputType[P]>
        }
      >
    >


  export type cuenta_personaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_item_persona?: boolean
    id_huesped?: boolean
    nombre_persona?: boolean
    id_reserva?: boolean
    fecha?: boolean
    descripcion?: boolean
    cantidad?: boolean
    valor_unitario?: boolean
    valor_total?: boolean
    estado?: boolean
    metodo_pago?: boolean
    fecha_registro?: boolean
    huesped?: boolean | cuenta_persona$huespedArgs<ExtArgs>
    reserva?: boolean | cuenta_persona$reservaArgs<ExtArgs>
  }, ExtArgs["result"]["cuenta_persona"]>

  export type cuenta_personaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_item_persona?: boolean
    id_huesped?: boolean
    nombre_persona?: boolean
    id_reserva?: boolean
    fecha?: boolean
    descripcion?: boolean
    cantidad?: boolean
    valor_unitario?: boolean
    valor_total?: boolean
    estado?: boolean
    metodo_pago?: boolean
    fecha_registro?: boolean
    huesped?: boolean | cuenta_persona$huespedArgs<ExtArgs>
    reserva?: boolean | cuenta_persona$reservaArgs<ExtArgs>
  }, ExtArgs["result"]["cuenta_persona"]>

  export type cuenta_personaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_item_persona?: boolean
    id_huesped?: boolean
    nombre_persona?: boolean
    id_reserva?: boolean
    fecha?: boolean
    descripcion?: boolean
    cantidad?: boolean
    valor_unitario?: boolean
    valor_total?: boolean
    estado?: boolean
    metodo_pago?: boolean
    fecha_registro?: boolean
    huesped?: boolean | cuenta_persona$huespedArgs<ExtArgs>
    reserva?: boolean | cuenta_persona$reservaArgs<ExtArgs>
  }, ExtArgs["result"]["cuenta_persona"]>

  export type cuenta_personaSelectScalar = {
    id_item_persona?: boolean
    id_huesped?: boolean
    nombre_persona?: boolean
    id_reserva?: boolean
    fecha?: boolean
    descripcion?: boolean
    cantidad?: boolean
    valor_unitario?: boolean
    valor_total?: boolean
    estado?: boolean
    metodo_pago?: boolean
    fecha_registro?: boolean
  }

  export type cuenta_personaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_item_persona" | "id_huesped" | "nombre_persona" | "id_reserva" | "fecha" | "descripcion" | "cantidad" | "valor_unitario" | "valor_total" | "estado" | "metodo_pago" | "fecha_registro", ExtArgs["result"]["cuenta_persona"]>
  export type cuenta_personaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    huesped?: boolean | cuenta_persona$huespedArgs<ExtArgs>
    reserva?: boolean | cuenta_persona$reservaArgs<ExtArgs>
  }
  export type cuenta_personaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    huesped?: boolean | cuenta_persona$huespedArgs<ExtArgs>
    reserva?: boolean | cuenta_persona$reservaArgs<ExtArgs>
  }
  export type cuenta_personaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    huesped?: boolean | cuenta_persona$huespedArgs<ExtArgs>
    reserva?: boolean | cuenta_persona$reservaArgs<ExtArgs>
  }

  export type $cuenta_personaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "cuenta_persona"
    objects: {
      huesped: Prisma.$huespedPayload<ExtArgs> | null
      reserva: Prisma.$reservaPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id_item_persona: number
      id_huesped: number | null
      nombre_persona: string
      id_reserva: number | null
      fecha: Date
      descripcion: string
      cantidad: number
      valor_unitario: Prisma.Decimal
      valor_total: Prisma.Decimal | null
      estado: string | null
      metodo_pago: string | null
      fecha_registro: Date | null
    }, ExtArgs["result"]["cuenta_persona"]>
    composites: {}
  }

  type cuenta_personaGetPayload<S extends boolean | null | undefined | cuenta_personaDefaultArgs> = $Result.GetResult<Prisma.$cuenta_personaPayload, S>

  type cuenta_personaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<cuenta_personaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Cuenta_personaCountAggregateInputType | true
    }

  export interface cuenta_personaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['cuenta_persona'], meta: { name: 'cuenta_persona' } }
    /**
     * Find zero or one Cuenta_persona that matches the filter.
     * @param {cuenta_personaFindUniqueArgs} args - Arguments to find a Cuenta_persona
     * @example
     * // Get one Cuenta_persona
     * const cuenta_persona = await prisma.cuenta_persona.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends cuenta_personaFindUniqueArgs>(args: SelectSubset<T, cuenta_personaFindUniqueArgs<ExtArgs>>): Prisma__cuenta_personaClient<$Result.GetResult<Prisma.$cuenta_personaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cuenta_persona that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {cuenta_personaFindUniqueOrThrowArgs} args - Arguments to find a Cuenta_persona
     * @example
     * // Get one Cuenta_persona
     * const cuenta_persona = await prisma.cuenta_persona.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends cuenta_personaFindUniqueOrThrowArgs>(args: SelectSubset<T, cuenta_personaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__cuenta_personaClient<$Result.GetResult<Prisma.$cuenta_personaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cuenta_persona that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cuenta_personaFindFirstArgs} args - Arguments to find a Cuenta_persona
     * @example
     * // Get one Cuenta_persona
     * const cuenta_persona = await prisma.cuenta_persona.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends cuenta_personaFindFirstArgs>(args?: SelectSubset<T, cuenta_personaFindFirstArgs<ExtArgs>>): Prisma__cuenta_personaClient<$Result.GetResult<Prisma.$cuenta_personaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cuenta_persona that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cuenta_personaFindFirstOrThrowArgs} args - Arguments to find a Cuenta_persona
     * @example
     * // Get one Cuenta_persona
     * const cuenta_persona = await prisma.cuenta_persona.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends cuenta_personaFindFirstOrThrowArgs>(args?: SelectSubset<T, cuenta_personaFindFirstOrThrowArgs<ExtArgs>>): Prisma__cuenta_personaClient<$Result.GetResult<Prisma.$cuenta_personaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cuenta_personas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cuenta_personaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cuenta_personas
     * const cuenta_personas = await prisma.cuenta_persona.findMany()
     * 
     * // Get first 10 Cuenta_personas
     * const cuenta_personas = await prisma.cuenta_persona.findMany({ take: 10 })
     * 
     * // Only select the `id_item_persona`
     * const cuenta_personaWithId_item_personaOnly = await prisma.cuenta_persona.findMany({ select: { id_item_persona: true } })
     * 
     */
    findMany<T extends cuenta_personaFindManyArgs>(args?: SelectSubset<T, cuenta_personaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cuenta_personaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cuenta_persona.
     * @param {cuenta_personaCreateArgs} args - Arguments to create a Cuenta_persona.
     * @example
     * // Create one Cuenta_persona
     * const Cuenta_persona = await prisma.cuenta_persona.create({
     *   data: {
     *     // ... data to create a Cuenta_persona
     *   }
     * })
     * 
     */
    create<T extends cuenta_personaCreateArgs>(args: SelectSubset<T, cuenta_personaCreateArgs<ExtArgs>>): Prisma__cuenta_personaClient<$Result.GetResult<Prisma.$cuenta_personaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cuenta_personas.
     * @param {cuenta_personaCreateManyArgs} args - Arguments to create many Cuenta_personas.
     * @example
     * // Create many Cuenta_personas
     * const cuenta_persona = await prisma.cuenta_persona.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends cuenta_personaCreateManyArgs>(args?: SelectSubset<T, cuenta_personaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cuenta_personas and returns the data saved in the database.
     * @param {cuenta_personaCreateManyAndReturnArgs} args - Arguments to create many Cuenta_personas.
     * @example
     * // Create many Cuenta_personas
     * const cuenta_persona = await prisma.cuenta_persona.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cuenta_personas and only return the `id_item_persona`
     * const cuenta_personaWithId_item_personaOnly = await prisma.cuenta_persona.createManyAndReturn({
     *   select: { id_item_persona: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends cuenta_personaCreateManyAndReturnArgs>(args?: SelectSubset<T, cuenta_personaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cuenta_personaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Cuenta_persona.
     * @param {cuenta_personaDeleteArgs} args - Arguments to delete one Cuenta_persona.
     * @example
     * // Delete one Cuenta_persona
     * const Cuenta_persona = await prisma.cuenta_persona.delete({
     *   where: {
     *     // ... filter to delete one Cuenta_persona
     *   }
     * })
     * 
     */
    delete<T extends cuenta_personaDeleteArgs>(args: SelectSubset<T, cuenta_personaDeleteArgs<ExtArgs>>): Prisma__cuenta_personaClient<$Result.GetResult<Prisma.$cuenta_personaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cuenta_persona.
     * @param {cuenta_personaUpdateArgs} args - Arguments to update one Cuenta_persona.
     * @example
     * // Update one Cuenta_persona
     * const cuenta_persona = await prisma.cuenta_persona.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends cuenta_personaUpdateArgs>(args: SelectSubset<T, cuenta_personaUpdateArgs<ExtArgs>>): Prisma__cuenta_personaClient<$Result.GetResult<Prisma.$cuenta_personaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cuenta_personas.
     * @param {cuenta_personaDeleteManyArgs} args - Arguments to filter Cuenta_personas to delete.
     * @example
     * // Delete a few Cuenta_personas
     * const { count } = await prisma.cuenta_persona.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends cuenta_personaDeleteManyArgs>(args?: SelectSubset<T, cuenta_personaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cuenta_personas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cuenta_personaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cuenta_personas
     * const cuenta_persona = await prisma.cuenta_persona.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends cuenta_personaUpdateManyArgs>(args: SelectSubset<T, cuenta_personaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cuenta_personas and returns the data updated in the database.
     * @param {cuenta_personaUpdateManyAndReturnArgs} args - Arguments to update many Cuenta_personas.
     * @example
     * // Update many Cuenta_personas
     * const cuenta_persona = await prisma.cuenta_persona.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cuenta_personas and only return the `id_item_persona`
     * const cuenta_personaWithId_item_personaOnly = await prisma.cuenta_persona.updateManyAndReturn({
     *   select: { id_item_persona: true },
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
    updateManyAndReturn<T extends cuenta_personaUpdateManyAndReturnArgs>(args: SelectSubset<T, cuenta_personaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cuenta_personaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Cuenta_persona.
     * @param {cuenta_personaUpsertArgs} args - Arguments to update or create a Cuenta_persona.
     * @example
     * // Update or create a Cuenta_persona
     * const cuenta_persona = await prisma.cuenta_persona.upsert({
     *   create: {
     *     // ... data to create a Cuenta_persona
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cuenta_persona we want to update
     *   }
     * })
     */
    upsert<T extends cuenta_personaUpsertArgs>(args: SelectSubset<T, cuenta_personaUpsertArgs<ExtArgs>>): Prisma__cuenta_personaClient<$Result.GetResult<Prisma.$cuenta_personaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cuenta_personas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cuenta_personaCountArgs} args - Arguments to filter Cuenta_personas to count.
     * @example
     * // Count the number of Cuenta_personas
     * const count = await prisma.cuenta_persona.count({
     *   where: {
     *     // ... the filter for the Cuenta_personas we want to count
     *   }
     * })
    **/
    count<T extends cuenta_personaCountArgs>(
      args?: Subset<T, cuenta_personaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Cuenta_personaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cuenta_persona.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Cuenta_personaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Cuenta_personaAggregateArgs>(args: Subset<T, Cuenta_personaAggregateArgs>): Prisma.PrismaPromise<GetCuenta_personaAggregateType<T>>

    /**
     * Group by Cuenta_persona.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {cuenta_personaGroupByArgs} args - Group by arguments.
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
      T extends cuenta_personaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: cuenta_personaGroupByArgs['orderBy'] }
        : { orderBy?: cuenta_personaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, cuenta_personaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCuenta_personaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the cuenta_persona model
   */
  readonly fields: cuenta_personaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for cuenta_persona.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__cuenta_personaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    huesped<T extends cuenta_persona$huespedArgs<ExtArgs> = {}>(args?: Subset<T, cuenta_persona$huespedArgs<ExtArgs>>): Prisma__huespedClient<$Result.GetResult<Prisma.$huespedPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    reserva<T extends cuenta_persona$reservaArgs<ExtArgs> = {}>(args?: Subset<T, cuenta_persona$reservaArgs<ExtArgs>>): Prisma__reservaClient<$Result.GetResult<Prisma.$reservaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the cuenta_persona model
   */
  interface cuenta_personaFieldRefs {
    readonly id_item_persona: FieldRef<"cuenta_persona", 'Int'>
    readonly id_huesped: FieldRef<"cuenta_persona", 'Int'>
    readonly nombre_persona: FieldRef<"cuenta_persona", 'String'>
    readonly id_reserva: FieldRef<"cuenta_persona", 'Int'>
    readonly fecha: FieldRef<"cuenta_persona", 'DateTime'>
    readonly descripcion: FieldRef<"cuenta_persona", 'String'>
    readonly cantidad: FieldRef<"cuenta_persona", 'Int'>
    readonly valor_unitario: FieldRef<"cuenta_persona", 'Decimal'>
    readonly valor_total: FieldRef<"cuenta_persona", 'Decimal'>
    readonly estado: FieldRef<"cuenta_persona", 'String'>
    readonly metodo_pago: FieldRef<"cuenta_persona", 'String'>
    readonly fecha_registro: FieldRef<"cuenta_persona", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * cuenta_persona findUnique
   */
  export type cuenta_personaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_persona
     */
    select?: cuenta_personaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_persona
     */
    omit?: cuenta_personaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_personaInclude<ExtArgs> | null
    /**
     * Filter, which cuenta_persona to fetch.
     */
    where: cuenta_personaWhereUniqueInput
  }

  /**
   * cuenta_persona findUniqueOrThrow
   */
  export type cuenta_personaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_persona
     */
    select?: cuenta_personaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_persona
     */
    omit?: cuenta_personaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_personaInclude<ExtArgs> | null
    /**
     * Filter, which cuenta_persona to fetch.
     */
    where: cuenta_personaWhereUniqueInput
  }

  /**
   * cuenta_persona findFirst
   */
  export type cuenta_personaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_persona
     */
    select?: cuenta_personaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_persona
     */
    omit?: cuenta_personaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_personaInclude<ExtArgs> | null
    /**
     * Filter, which cuenta_persona to fetch.
     */
    where?: cuenta_personaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cuenta_personas to fetch.
     */
    orderBy?: cuenta_personaOrderByWithRelationInput | cuenta_personaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cuenta_personas.
     */
    cursor?: cuenta_personaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cuenta_personas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cuenta_personas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cuenta_personas.
     */
    distinct?: Cuenta_personaScalarFieldEnum | Cuenta_personaScalarFieldEnum[]
  }

  /**
   * cuenta_persona findFirstOrThrow
   */
  export type cuenta_personaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_persona
     */
    select?: cuenta_personaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_persona
     */
    omit?: cuenta_personaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_personaInclude<ExtArgs> | null
    /**
     * Filter, which cuenta_persona to fetch.
     */
    where?: cuenta_personaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cuenta_personas to fetch.
     */
    orderBy?: cuenta_personaOrderByWithRelationInput | cuenta_personaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for cuenta_personas.
     */
    cursor?: cuenta_personaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cuenta_personas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cuenta_personas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cuenta_personas.
     */
    distinct?: Cuenta_personaScalarFieldEnum | Cuenta_personaScalarFieldEnum[]
  }

  /**
   * cuenta_persona findMany
   */
  export type cuenta_personaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_persona
     */
    select?: cuenta_personaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_persona
     */
    omit?: cuenta_personaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_personaInclude<ExtArgs> | null
    /**
     * Filter, which cuenta_personas to fetch.
     */
    where?: cuenta_personaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of cuenta_personas to fetch.
     */
    orderBy?: cuenta_personaOrderByWithRelationInput | cuenta_personaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing cuenta_personas.
     */
    cursor?: cuenta_personaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` cuenta_personas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` cuenta_personas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of cuenta_personas.
     */
    distinct?: Cuenta_personaScalarFieldEnum | Cuenta_personaScalarFieldEnum[]
  }

  /**
   * cuenta_persona create
   */
  export type cuenta_personaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_persona
     */
    select?: cuenta_personaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_persona
     */
    omit?: cuenta_personaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_personaInclude<ExtArgs> | null
    /**
     * The data needed to create a cuenta_persona.
     */
    data: XOR<cuenta_personaCreateInput, cuenta_personaUncheckedCreateInput>
  }

  /**
   * cuenta_persona createMany
   */
  export type cuenta_personaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many cuenta_personas.
     */
    data: cuenta_personaCreateManyInput | cuenta_personaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * cuenta_persona createManyAndReturn
   */
  export type cuenta_personaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_persona
     */
    select?: cuenta_personaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_persona
     */
    omit?: cuenta_personaOmit<ExtArgs> | null
    /**
     * The data used to create many cuenta_personas.
     */
    data: cuenta_personaCreateManyInput | cuenta_personaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_personaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * cuenta_persona update
   */
  export type cuenta_personaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_persona
     */
    select?: cuenta_personaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_persona
     */
    omit?: cuenta_personaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_personaInclude<ExtArgs> | null
    /**
     * The data needed to update a cuenta_persona.
     */
    data: XOR<cuenta_personaUpdateInput, cuenta_personaUncheckedUpdateInput>
    /**
     * Choose, which cuenta_persona to update.
     */
    where: cuenta_personaWhereUniqueInput
  }

  /**
   * cuenta_persona updateMany
   */
  export type cuenta_personaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update cuenta_personas.
     */
    data: XOR<cuenta_personaUpdateManyMutationInput, cuenta_personaUncheckedUpdateManyInput>
    /**
     * Filter which cuenta_personas to update
     */
    where?: cuenta_personaWhereInput
    /**
     * Limit how many cuenta_personas to update.
     */
    limit?: number
  }

  /**
   * cuenta_persona updateManyAndReturn
   */
  export type cuenta_personaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_persona
     */
    select?: cuenta_personaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_persona
     */
    omit?: cuenta_personaOmit<ExtArgs> | null
    /**
     * The data used to update cuenta_personas.
     */
    data: XOR<cuenta_personaUpdateManyMutationInput, cuenta_personaUncheckedUpdateManyInput>
    /**
     * Filter which cuenta_personas to update
     */
    where?: cuenta_personaWhereInput
    /**
     * Limit how many cuenta_personas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_personaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * cuenta_persona upsert
   */
  export type cuenta_personaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_persona
     */
    select?: cuenta_personaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_persona
     */
    omit?: cuenta_personaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_personaInclude<ExtArgs> | null
    /**
     * The filter to search for the cuenta_persona to update in case it exists.
     */
    where: cuenta_personaWhereUniqueInput
    /**
     * In case the cuenta_persona found by the `where` argument doesn't exist, create a new cuenta_persona with this data.
     */
    create: XOR<cuenta_personaCreateInput, cuenta_personaUncheckedCreateInput>
    /**
     * In case the cuenta_persona was found with the provided `where` argument, update it with this data.
     */
    update: XOR<cuenta_personaUpdateInput, cuenta_personaUncheckedUpdateInput>
  }

  /**
   * cuenta_persona delete
   */
  export type cuenta_personaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_persona
     */
    select?: cuenta_personaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_persona
     */
    omit?: cuenta_personaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_personaInclude<ExtArgs> | null
    /**
     * Filter which cuenta_persona to delete.
     */
    where: cuenta_personaWhereUniqueInput
  }

  /**
   * cuenta_persona deleteMany
   */
  export type cuenta_personaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which cuenta_personas to delete
     */
    where?: cuenta_personaWhereInput
    /**
     * Limit how many cuenta_personas to delete.
     */
    limit?: number
  }

  /**
   * cuenta_persona.huesped
   */
  export type cuenta_persona$huespedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the huesped
     */
    select?: huespedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the huesped
     */
    omit?: huespedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: huespedInclude<ExtArgs> | null
    where?: huespedWhereInput
  }

  /**
   * cuenta_persona.reserva
   */
  export type cuenta_persona$reservaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reserva
     */
    select?: reservaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reserva
     */
    omit?: reservaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservaInclude<ExtArgs> | null
    where?: reservaWhereInput
  }

  /**
   * cuenta_persona without action
   */
  export type cuenta_personaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_persona
     */
    select?: cuenta_personaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_persona
     */
    omit?: cuenta_personaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_personaInclude<ExtArgs> | null
  }


  /**
   * Model espacio
   */

  export type AggregateEspacio = {
    _count: EspacioCountAggregateOutputType | null
    _avg: EspacioAvgAggregateOutputType | null
    _sum: EspacioSumAggregateOutputType | null
    _min: EspacioMinAggregateOutputType | null
    _max: EspacioMaxAggregateOutputType | null
  }

  export type EspacioAvgAggregateOutputType = {
    id_espacio: number | null
    capacidad_personas: number | null
    precio_persona_1: Decimal | null
    precio_persona_2: Decimal | null
    precio_adicional: Decimal | null
  }

  export type EspacioSumAggregateOutputType = {
    id_espacio: number | null
    capacidad_personas: number | null
    precio_persona_1: Decimal | null
    precio_persona_2: Decimal | null
    precio_adicional: Decimal | null
  }

  export type EspacioMinAggregateOutputType = {
    id_espacio: number | null
    numero: string | null
    tipo_espacio: string | null
    tipo_habitacion: string | null
    capacidad_personas: number | null
    precio_persona_1: Decimal | null
    precio_persona_2: Decimal | null
    precio_adicional: Decimal | null
    estado_limpieza: string | null
    activo: boolean | null
    tiene_minibar: boolean | null
  }

  export type EspacioMaxAggregateOutputType = {
    id_espacio: number | null
    numero: string | null
    tipo_espacio: string | null
    tipo_habitacion: string | null
    capacidad_personas: number | null
    precio_persona_1: Decimal | null
    precio_persona_2: Decimal | null
    precio_adicional: Decimal | null
    estado_limpieza: string | null
    activo: boolean | null
    tiene_minibar: boolean | null
  }

  export type EspacioCountAggregateOutputType = {
    id_espacio: number
    numero: number
    tipo_espacio: number
    tipo_habitacion: number
    capacidad_personas: number
    precio_persona_1: number
    precio_persona_2: number
    precio_adicional: number
    estado_limpieza: number
    activo: number
    tiene_minibar: number
    _all: number
  }


  export type EspacioAvgAggregateInputType = {
    id_espacio?: true
    capacidad_personas?: true
    precio_persona_1?: true
    precio_persona_2?: true
    precio_adicional?: true
  }

  export type EspacioSumAggregateInputType = {
    id_espacio?: true
    capacidad_personas?: true
    precio_persona_1?: true
    precio_persona_2?: true
    precio_adicional?: true
  }

  export type EspacioMinAggregateInputType = {
    id_espacio?: true
    numero?: true
    tipo_espacio?: true
    tipo_habitacion?: true
    capacidad_personas?: true
    precio_persona_1?: true
    precio_persona_2?: true
    precio_adicional?: true
    estado_limpieza?: true
    activo?: true
    tiene_minibar?: true
  }

  export type EspacioMaxAggregateInputType = {
    id_espacio?: true
    numero?: true
    tipo_espacio?: true
    tipo_habitacion?: true
    capacidad_personas?: true
    precio_persona_1?: true
    precio_persona_2?: true
    precio_adicional?: true
    estado_limpieza?: true
    activo?: true
    tiene_minibar?: true
  }

  export type EspacioCountAggregateInputType = {
    id_espacio?: true
    numero?: true
    tipo_espacio?: true
    tipo_habitacion?: true
    capacidad_personas?: true
    precio_persona_1?: true
    precio_persona_2?: true
    precio_adicional?: true
    estado_limpieza?: true
    activo?: true
    tiene_minibar?: true
    _all?: true
  }

  export type EspacioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which espacio to aggregate.
     */
    where?: espacioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of espacios to fetch.
     */
    orderBy?: espacioOrderByWithRelationInput | espacioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: espacioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` espacios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` espacios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned espacios
    **/
    _count?: true | EspacioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EspacioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EspacioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EspacioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EspacioMaxAggregateInputType
  }

  export type GetEspacioAggregateType<T extends EspacioAggregateArgs> = {
        [P in keyof T & keyof AggregateEspacio]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEspacio[P]>
      : GetScalarType<T[P], AggregateEspacio[P]>
  }




  export type espacioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: espacioWhereInput
    orderBy?: espacioOrderByWithAggregationInput | espacioOrderByWithAggregationInput[]
    by: EspacioScalarFieldEnum[] | EspacioScalarFieldEnum
    having?: espacioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EspacioCountAggregateInputType | true
    _avg?: EspacioAvgAggregateInputType
    _sum?: EspacioSumAggregateInputType
    _min?: EspacioMinAggregateInputType
    _max?: EspacioMaxAggregateInputType
  }

  export type EspacioGroupByOutputType = {
    id_espacio: number
    numero: string
    tipo_espacio: string
    tipo_habitacion: string | null
    capacidad_personas: number | null
    precio_persona_1: Decimal | null
    precio_persona_2: Decimal | null
    precio_adicional: Decimal | null
    estado_limpieza: string | null
    activo: boolean | null
    tiene_minibar: boolean | null
    _count: EspacioCountAggregateOutputType | null
    _avg: EspacioAvgAggregateOutputType | null
    _sum: EspacioSumAggregateOutputType | null
    _min: EspacioMinAggregateOutputType | null
    _max: EspacioMaxAggregateOutputType | null
  }

  type GetEspacioGroupByPayload<T extends espacioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EspacioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EspacioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EspacioGroupByOutputType[P]>
            : GetScalarType<T[P], EspacioGroupByOutputType[P]>
        }
      >
    >


  export type espacioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_espacio?: boolean
    numero?: boolean
    tipo_espacio?: boolean
    tipo_habitacion?: boolean
    capacidad_personas?: boolean
    precio_persona_1?: boolean
    precio_persona_2?: boolean
    precio_adicional?: boolean
    estado_limpieza?: boolean
    activo?: boolean
    tiene_minibar?: boolean
    inventario_minibar?: boolean | espacio$inventario_minibarArgs<ExtArgs>
    reserva?: boolean | espacio$reservaArgs<ExtArgs>
    _count?: boolean | EspacioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["espacio"]>

  export type espacioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_espacio?: boolean
    numero?: boolean
    tipo_espacio?: boolean
    tipo_habitacion?: boolean
    capacidad_personas?: boolean
    precio_persona_1?: boolean
    precio_persona_2?: boolean
    precio_adicional?: boolean
    estado_limpieza?: boolean
    activo?: boolean
    tiene_minibar?: boolean
  }, ExtArgs["result"]["espacio"]>

  export type espacioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_espacio?: boolean
    numero?: boolean
    tipo_espacio?: boolean
    tipo_habitacion?: boolean
    capacidad_personas?: boolean
    precio_persona_1?: boolean
    precio_persona_2?: boolean
    precio_adicional?: boolean
    estado_limpieza?: boolean
    activo?: boolean
    tiene_minibar?: boolean
  }, ExtArgs["result"]["espacio"]>

  export type espacioSelectScalar = {
    id_espacio?: boolean
    numero?: boolean
    tipo_espacio?: boolean
    tipo_habitacion?: boolean
    capacidad_personas?: boolean
    precio_persona_1?: boolean
    precio_persona_2?: boolean
    precio_adicional?: boolean
    estado_limpieza?: boolean
    activo?: boolean
    tiene_minibar?: boolean
  }

  export type espacioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_espacio" | "numero" | "tipo_espacio" | "tipo_habitacion" | "capacidad_personas" | "precio_persona_1" | "precio_persona_2" | "precio_adicional" | "estado_limpieza" | "activo" | "tiene_minibar", ExtArgs["result"]["espacio"]>
  export type espacioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inventario_minibar?: boolean | espacio$inventario_minibarArgs<ExtArgs>
    reserva?: boolean | espacio$reservaArgs<ExtArgs>
    _count?: boolean | EspacioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type espacioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type espacioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $espacioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "espacio"
    objects: {
      inventario_minibar: Prisma.$inventario_minibarPayload<ExtArgs>[]
      reserva: Prisma.$reservaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_espacio: number
      numero: string
      tipo_espacio: string
      tipo_habitacion: string | null
      capacidad_personas: number | null
      precio_persona_1: Prisma.Decimal | null
      precio_persona_2: Prisma.Decimal | null
      precio_adicional: Prisma.Decimal | null
      estado_limpieza: string | null
      activo: boolean | null
      tiene_minibar: boolean | null
    }, ExtArgs["result"]["espacio"]>
    composites: {}
  }

  type espacioGetPayload<S extends boolean | null | undefined | espacioDefaultArgs> = $Result.GetResult<Prisma.$espacioPayload, S>

  type espacioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<espacioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EspacioCountAggregateInputType | true
    }

  export interface espacioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['espacio'], meta: { name: 'espacio' } }
    /**
     * Find zero or one Espacio that matches the filter.
     * @param {espacioFindUniqueArgs} args - Arguments to find a Espacio
     * @example
     * // Get one Espacio
     * const espacio = await prisma.espacio.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends espacioFindUniqueArgs>(args: SelectSubset<T, espacioFindUniqueArgs<ExtArgs>>): Prisma__espacioClient<$Result.GetResult<Prisma.$espacioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Espacio that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {espacioFindUniqueOrThrowArgs} args - Arguments to find a Espacio
     * @example
     * // Get one Espacio
     * const espacio = await prisma.espacio.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends espacioFindUniqueOrThrowArgs>(args: SelectSubset<T, espacioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__espacioClient<$Result.GetResult<Prisma.$espacioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Espacio that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {espacioFindFirstArgs} args - Arguments to find a Espacio
     * @example
     * // Get one Espacio
     * const espacio = await prisma.espacio.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends espacioFindFirstArgs>(args?: SelectSubset<T, espacioFindFirstArgs<ExtArgs>>): Prisma__espacioClient<$Result.GetResult<Prisma.$espacioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Espacio that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {espacioFindFirstOrThrowArgs} args - Arguments to find a Espacio
     * @example
     * // Get one Espacio
     * const espacio = await prisma.espacio.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends espacioFindFirstOrThrowArgs>(args?: SelectSubset<T, espacioFindFirstOrThrowArgs<ExtArgs>>): Prisma__espacioClient<$Result.GetResult<Prisma.$espacioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Espacios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {espacioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Espacios
     * const espacios = await prisma.espacio.findMany()
     * 
     * // Get first 10 Espacios
     * const espacios = await prisma.espacio.findMany({ take: 10 })
     * 
     * // Only select the `id_espacio`
     * const espacioWithId_espacioOnly = await prisma.espacio.findMany({ select: { id_espacio: true } })
     * 
     */
    findMany<T extends espacioFindManyArgs>(args?: SelectSubset<T, espacioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$espacioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Espacio.
     * @param {espacioCreateArgs} args - Arguments to create a Espacio.
     * @example
     * // Create one Espacio
     * const Espacio = await prisma.espacio.create({
     *   data: {
     *     // ... data to create a Espacio
     *   }
     * })
     * 
     */
    create<T extends espacioCreateArgs>(args: SelectSubset<T, espacioCreateArgs<ExtArgs>>): Prisma__espacioClient<$Result.GetResult<Prisma.$espacioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Espacios.
     * @param {espacioCreateManyArgs} args - Arguments to create many Espacios.
     * @example
     * // Create many Espacios
     * const espacio = await prisma.espacio.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends espacioCreateManyArgs>(args?: SelectSubset<T, espacioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Espacios and returns the data saved in the database.
     * @param {espacioCreateManyAndReturnArgs} args - Arguments to create many Espacios.
     * @example
     * // Create many Espacios
     * const espacio = await prisma.espacio.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Espacios and only return the `id_espacio`
     * const espacioWithId_espacioOnly = await prisma.espacio.createManyAndReturn({
     *   select: { id_espacio: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends espacioCreateManyAndReturnArgs>(args?: SelectSubset<T, espacioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$espacioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Espacio.
     * @param {espacioDeleteArgs} args - Arguments to delete one Espacio.
     * @example
     * // Delete one Espacio
     * const Espacio = await prisma.espacio.delete({
     *   where: {
     *     // ... filter to delete one Espacio
     *   }
     * })
     * 
     */
    delete<T extends espacioDeleteArgs>(args: SelectSubset<T, espacioDeleteArgs<ExtArgs>>): Prisma__espacioClient<$Result.GetResult<Prisma.$espacioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Espacio.
     * @param {espacioUpdateArgs} args - Arguments to update one Espacio.
     * @example
     * // Update one Espacio
     * const espacio = await prisma.espacio.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends espacioUpdateArgs>(args: SelectSubset<T, espacioUpdateArgs<ExtArgs>>): Prisma__espacioClient<$Result.GetResult<Prisma.$espacioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Espacios.
     * @param {espacioDeleteManyArgs} args - Arguments to filter Espacios to delete.
     * @example
     * // Delete a few Espacios
     * const { count } = await prisma.espacio.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends espacioDeleteManyArgs>(args?: SelectSubset<T, espacioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Espacios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {espacioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Espacios
     * const espacio = await prisma.espacio.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends espacioUpdateManyArgs>(args: SelectSubset<T, espacioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Espacios and returns the data updated in the database.
     * @param {espacioUpdateManyAndReturnArgs} args - Arguments to update many Espacios.
     * @example
     * // Update many Espacios
     * const espacio = await prisma.espacio.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Espacios and only return the `id_espacio`
     * const espacioWithId_espacioOnly = await prisma.espacio.updateManyAndReturn({
     *   select: { id_espacio: true },
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
    updateManyAndReturn<T extends espacioUpdateManyAndReturnArgs>(args: SelectSubset<T, espacioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$espacioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Espacio.
     * @param {espacioUpsertArgs} args - Arguments to update or create a Espacio.
     * @example
     * // Update or create a Espacio
     * const espacio = await prisma.espacio.upsert({
     *   create: {
     *     // ... data to create a Espacio
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Espacio we want to update
     *   }
     * })
     */
    upsert<T extends espacioUpsertArgs>(args: SelectSubset<T, espacioUpsertArgs<ExtArgs>>): Prisma__espacioClient<$Result.GetResult<Prisma.$espacioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Espacios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {espacioCountArgs} args - Arguments to filter Espacios to count.
     * @example
     * // Count the number of Espacios
     * const count = await prisma.espacio.count({
     *   where: {
     *     // ... the filter for the Espacios we want to count
     *   }
     * })
    **/
    count<T extends espacioCountArgs>(
      args?: Subset<T, espacioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EspacioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Espacio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EspacioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EspacioAggregateArgs>(args: Subset<T, EspacioAggregateArgs>): Prisma.PrismaPromise<GetEspacioAggregateType<T>>

    /**
     * Group by Espacio.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {espacioGroupByArgs} args - Group by arguments.
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
      T extends espacioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: espacioGroupByArgs['orderBy'] }
        : { orderBy?: espacioGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, espacioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEspacioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the espacio model
   */
  readonly fields: espacioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for espacio.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__espacioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inventario_minibar<T extends espacio$inventario_minibarArgs<ExtArgs> = {}>(args?: Subset<T, espacio$inventario_minibarArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$inventario_minibarPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reserva<T extends espacio$reservaArgs<ExtArgs> = {}>(args?: Subset<T, espacio$reservaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reservaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the espacio model
   */
  interface espacioFieldRefs {
    readonly id_espacio: FieldRef<"espacio", 'Int'>
    readonly numero: FieldRef<"espacio", 'String'>
    readonly tipo_espacio: FieldRef<"espacio", 'String'>
    readonly tipo_habitacion: FieldRef<"espacio", 'String'>
    readonly capacidad_personas: FieldRef<"espacio", 'Int'>
    readonly precio_persona_1: FieldRef<"espacio", 'Decimal'>
    readonly precio_persona_2: FieldRef<"espacio", 'Decimal'>
    readonly precio_adicional: FieldRef<"espacio", 'Decimal'>
    readonly estado_limpieza: FieldRef<"espacio", 'String'>
    readonly activo: FieldRef<"espacio", 'Boolean'>
    readonly tiene_minibar: FieldRef<"espacio", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * espacio findUnique
   */
  export type espacioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the espacio
     */
    select?: espacioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the espacio
     */
    omit?: espacioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: espacioInclude<ExtArgs> | null
    /**
     * Filter, which espacio to fetch.
     */
    where: espacioWhereUniqueInput
  }

  /**
   * espacio findUniqueOrThrow
   */
  export type espacioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the espacio
     */
    select?: espacioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the espacio
     */
    omit?: espacioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: espacioInclude<ExtArgs> | null
    /**
     * Filter, which espacio to fetch.
     */
    where: espacioWhereUniqueInput
  }

  /**
   * espacio findFirst
   */
  export type espacioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the espacio
     */
    select?: espacioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the espacio
     */
    omit?: espacioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: espacioInclude<ExtArgs> | null
    /**
     * Filter, which espacio to fetch.
     */
    where?: espacioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of espacios to fetch.
     */
    orderBy?: espacioOrderByWithRelationInput | espacioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for espacios.
     */
    cursor?: espacioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` espacios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` espacios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of espacios.
     */
    distinct?: EspacioScalarFieldEnum | EspacioScalarFieldEnum[]
  }

  /**
   * espacio findFirstOrThrow
   */
  export type espacioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the espacio
     */
    select?: espacioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the espacio
     */
    omit?: espacioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: espacioInclude<ExtArgs> | null
    /**
     * Filter, which espacio to fetch.
     */
    where?: espacioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of espacios to fetch.
     */
    orderBy?: espacioOrderByWithRelationInput | espacioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for espacios.
     */
    cursor?: espacioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` espacios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` espacios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of espacios.
     */
    distinct?: EspacioScalarFieldEnum | EspacioScalarFieldEnum[]
  }

  /**
   * espacio findMany
   */
  export type espacioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the espacio
     */
    select?: espacioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the espacio
     */
    omit?: espacioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: espacioInclude<ExtArgs> | null
    /**
     * Filter, which espacios to fetch.
     */
    where?: espacioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of espacios to fetch.
     */
    orderBy?: espacioOrderByWithRelationInput | espacioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing espacios.
     */
    cursor?: espacioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` espacios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` espacios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of espacios.
     */
    distinct?: EspacioScalarFieldEnum | EspacioScalarFieldEnum[]
  }

  /**
   * espacio create
   */
  export type espacioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the espacio
     */
    select?: espacioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the espacio
     */
    omit?: espacioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: espacioInclude<ExtArgs> | null
    /**
     * The data needed to create a espacio.
     */
    data: XOR<espacioCreateInput, espacioUncheckedCreateInput>
  }

  /**
   * espacio createMany
   */
  export type espacioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many espacios.
     */
    data: espacioCreateManyInput | espacioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * espacio createManyAndReturn
   */
  export type espacioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the espacio
     */
    select?: espacioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the espacio
     */
    omit?: espacioOmit<ExtArgs> | null
    /**
     * The data used to create many espacios.
     */
    data: espacioCreateManyInput | espacioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * espacio update
   */
  export type espacioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the espacio
     */
    select?: espacioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the espacio
     */
    omit?: espacioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: espacioInclude<ExtArgs> | null
    /**
     * The data needed to update a espacio.
     */
    data: XOR<espacioUpdateInput, espacioUncheckedUpdateInput>
    /**
     * Choose, which espacio to update.
     */
    where: espacioWhereUniqueInput
  }

  /**
   * espacio updateMany
   */
  export type espacioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update espacios.
     */
    data: XOR<espacioUpdateManyMutationInput, espacioUncheckedUpdateManyInput>
    /**
     * Filter which espacios to update
     */
    where?: espacioWhereInput
    /**
     * Limit how many espacios to update.
     */
    limit?: number
  }

  /**
   * espacio updateManyAndReturn
   */
  export type espacioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the espacio
     */
    select?: espacioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the espacio
     */
    omit?: espacioOmit<ExtArgs> | null
    /**
     * The data used to update espacios.
     */
    data: XOR<espacioUpdateManyMutationInput, espacioUncheckedUpdateManyInput>
    /**
     * Filter which espacios to update
     */
    where?: espacioWhereInput
    /**
     * Limit how many espacios to update.
     */
    limit?: number
  }

  /**
   * espacio upsert
   */
  export type espacioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the espacio
     */
    select?: espacioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the espacio
     */
    omit?: espacioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: espacioInclude<ExtArgs> | null
    /**
     * The filter to search for the espacio to update in case it exists.
     */
    where: espacioWhereUniqueInput
    /**
     * In case the espacio found by the `where` argument doesn't exist, create a new espacio with this data.
     */
    create: XOR<espacioCreateInput, espacioUncheckedCreateInput>
    /**
     * In case the espacio was found with the provided `where` argument, update it with this data.
     */
    update: XOR<espacioUpdateInput, espacioUncheckedUpdateInput>
  }

  /**
   * espacio delete
   */
  export type espacioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the espacio
     */
    select?: espacioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the espacio
     */
    omit?: espacioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: espacioInclude<ExtArgs> | null
    /**
     * Filter which espacio to delete.
     */
    where: espacioWhereUniqueInput
  }

  /**
   * espacio deleteMany
   */
  export type espacioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which espacios to delete
     */
    where?: espacioWhereInput
    /**
     * Limit how many espacios to delete.
     */
    limit?: number
  }

  /**
   * espacio.inventario_minibar
   */
  export type espacio$inventario_minibarArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the inventario_minibar
     */
    select?: inventario_minibarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the inventario_minibar
     */
    omit?: inventario_minibarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: inventario_minibarInclude<ExtArgs> | null
    where?: inventario_minibarWhereInput
    orderBy?: inventario_minibarOrderByWithRelationInput | inventario_minibarOrderByWithRelationInput[]
    cursor?: inventario_minibarWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Inventario_minibarScalarFieldEnum | Inventario_minibarScalarFieldEnum[]
  }

  /**
   * espacio.reserva
   */
  export type espacio$reservaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reserva
     */
    select?: reservaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reserva
     */
    omit?: reservaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservaInclude<ExtArgs> | null
    where?: reservaWhereInput
    orderBy?: reservaOrderByWithRelationInput | reservaOrderByWithRelationInput[]
    cursor?: reservaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReservaScalarFieldEnum | ReservaScalarFieldEnum[]
  }

  /**
   * espacio without action
   */
  export type espacioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the espacio
     */
    select?: espacioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the espacio
     */
    omit?: espacioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: espacioInclude<ExtArgs> | null
  }


  /**
   * Model huesped
   */

  export type AggregateHuesped = {
    _count: HuespedCountAggregateOutputType | null
    _avg: HuespedAvgAggregateOutputType | null
    _sum: HuespedSumAggregateOutputType | null
    _min: HuespedMinAggregateOutputType | null
    _max: HuespedMaxAggregateOutputType | null
  }

  export type HuespedAvgAggregateOutputType = {
    id_huesped: number | null
  }

  export type HuespedSumAggregateOutputType = {
    id_huesped: number | null
  }

  export type HuespedMinAggregateOutputType = {
    id_huesped: number | null
    nombre_completo: string | null
    telefono: string | null
    documento: string | null
    tipo_documento: string | null
    procedencia: string | null
    firma: string | null
    fecha_creacion: Date | null
  }

  export type HuespedMaxAggregateOutputType = {
    id_huesped: number | null
    nombre_completo: string | null
    telefono: string | null
    documento: string | null
    tipo_documento: string | null
    procedencia: string | null
    firma: string | null
    fecha_creacion: Date | null
  }

  export type HuespedCountAggregateOutputType = {
    id_huesped: number
    nombre_completo: number
    telefono: number
    documento: number
    tipo_documento: number
    procedencia: number
    firma: number
    fecha_creacion: number
    _all: number
  }


  export type HuespedAvgAggregateInputType = {
    id_huesped?: true
  }

  export type HuespedSumAggregateInputType = {
    id_huesped?: true
  }

  export type HuespedMinAggregateInputType = {
    id_huesped?: true
    nombre_completo?: true
    telefono?: true
    documento?: true
    tipo_documento?: true
    procedencia?: true
    firma?: true
    fecha_creacion?: true
  }

  export type HuespedMaxAggregateInputType = {
    id_huesped?: true
    nombre_completo?: true
    telefono?: true
    documento?: true
    tipo_documento?: true
    procedencia?: true
    firma?: true
    fecha_creacion?: true
  }

  export type HuespedCountAggregateInputType = {
    id_huesped?: true
    nombre_completo?: true
    telefono?: true
    documento?: true
    tipo_documento?: true
    procedencia?: true
    firma?: true
    fecha_creacion?: true
    _all?: true
  }

  export type HuespedAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which huesped to aggregate.
     */
    where?: huespedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of huespeds to fetch.
     */
    orderBy?: huespedOrderByWithRelationInput | huespedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: huespedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` huespeds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` huespeds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned huespeds
    **/
    _count?: true | HuespedCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HuespedAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HuespedSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HuespedMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HuespedMaxAggregateInputType
  }

  export type GetHuespedAggregateType<T extends HuespedAggregateArgs> = {
        [P in keyof T & keyof AggregateHuesped]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHuesped[P]>
      : GetScalarType<T[P], AggregateHuesped[P]>
  }




  export type huespedGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: huespedWhereInput
    orderBy?: huespedOrderByWithAggregationInput | huespedOrderByWithAggregationInput[]
    by: HuespedScalarFieldEnum[] | HuespedScalarFieldEnum
    having?: huespedScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HuespedCountAggregateInputType | true
    _avg?: HuespedAvgAggregateInputType
    _sum?: HuespedSumAggregateInputType
    _min?: HuespedMinAggregateInputType
    _max?: HuespedMaxAggregateInputType
  }

  export type HuespedGroupByOutputType = {
    id_huesped: number
    nombre_completo: string
    telefono: string | null
    documento: string | null
    tipo_documento: string | null
    procedencia: string | null
    firma: string | null
    fecha_creacion: Date | null
    _count: HuespedCountAggregateOutputType | null
    _avg: HuespedAvgAggregateOutputType | null
    _sum: HuespedSumAggregateOutputType | null
    _min: HuespedMinAggregateOutputType | null
    _max: HuespedMaxAggregateOutputType | null
  }

  type GetHuespedGroupByPayload<T extends huespedGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HuespedGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HuespedGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HuespedGroupByOutputType[P]>
            : GetScalarType<T[P], HuespedGroupByOutputType[P]>
        }
      >
    >


  export type huespedSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_huesped?: boolean
    nombre_completo?: boolean
    telefono?: boolean
    documento?: boolean
    tipo_documento?: boolean
    procedencia?: boolean
    firma?: boolean
    fecha_creacion?: boolean
    cuenta_persona?: boolean | huesped$cuenta_personaArgs<ExtArgs>
    reserva?: boolean | huesped$reservaArgs<ExtArgs>
    _count?: boolean | HuespedCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["huesped"]>

  export type huespedSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_huesped?: boolean
    nombre_completo?: boolean
    telefono?: boolean
    documento?: boolean
    tipo_documento?: boolean
    procedencia?: boolean
    firma?: boolean
    fecha_creacion?: boolean
  }, ExtArgs["result"]["huesped"]>

  export type huespedSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_huesped?: boolean
    nombre_completo?: boolean
    telefono?: boolean
    documento?: boolean
    tipo_documento?: boolean
    procedencia?: boolean
    firma?: boolean
    fecha_creacion?: boolean
  }, ExtArgs["result"]["huesped"]>

  export type huespedSelectScalar = {
    id_huesped?: boolean
    nombre_completo?: boolean
    telefono?: boolean
    documento?: boolean
    tipo_documento?: boolean
    procedencia?: boolean
    firma?: boolean
    fecha_creacion?: boolean
  }

  export type huespedOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_huesped" | "nombre_completo" | "telefono" | "documento" | "tipo_documento" | "procedencia" | "firma" | "fecha_creacion", ExtArgs["result"]["huesped"]>
  export type huespedInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cuenta_persona?: boolean | huesped$cuenta_personaArgs<ExtArgs>
    reserva?: boolean | huesped$reservaArgs<ExtArgs>
    _count?: boolean | HuespedCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type huespedIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type huespedIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $huespedPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "huesped"
    objects: {
      cuenta_persona: Prisma.$cuenta_personaPayload<ExtArgs>[]
      reserva: Prisma.$reservaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_huesped: number
      nombre_completo: string
      telefono: string | null
      documento: string | null
      tipo_documento: string | null
      procedencia: string | null
      firma: string | null
      fecha_creacion: Date | null
    }, ExtArgs["result"]["huesped"]>
    composites: {}
  }

  type huespedGetPayload<S extends boolean | null | undefined | huespedDefaultArgs> = $Result.GetResult<Prisma.$huespedPayload, S>

  type huespedCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<huespedFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HuespedCountAggregateInputType | true
    }

  export interface huespedDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['huesped'], meta: { name: 'huesped' } }
    /**
     * Find zero or one Huesped that matches the filter.
     * @param {huespedFindUniqueArgs} args - Arguments to find a Huesped
     * @example
     * // Get one Huesped
     * const huesped = await prisma.huesped.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends huespedFindUniqueArgs>(args: SelectSubset<T, huespedFindUniqueArgs<ExtArgs>>): Prisma__huespedClient<$Result.GetResult<Prisma.$huespedPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Huesped that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {huespedFindUniqueOrThrowArgs} args - Arguments to find a Huesped
     * @example
     * // Get one Huesped
     * const huesped = await prisma.huesped.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends huespedFindUniqueOrThrowArgs>(args: SelectSubset<T, huespedFindUniqueOrThrowArgs<ExtArgs>>): Prisma__huespedClient<$Result.GetResult<Prisma.$huespedPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Huesped that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {huespedFindFirstArgs} args - Arguments to find a Huesped
     * @example
     * // Get one Huesped
     * const huesped = await prisma.huesped.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends huespedFindFirstArgs>(args?: SelectSubset<T, huespedFindFirstArgs<ExtArgs>>): Prisma__huespedClient<$Result.GetResult<Prisma.$huespedPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Huesped that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {huespedFindFirstOrThrowArgs} args - Arguments to find a Huesped
     * @example
     * // Get one Huesped
     * const huesped = await prisma.huesped.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends huespedFindFirstOrThrowArgs>(args?: SelectSubset<T, huespedFindFirstOrThrowArgs<ExtArgs>>): Prisma__huespedClient<$Result.GetResult<Prisma.$huespedPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Huespeds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {huespedFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Huespeds
     * const huespeds = await prisma.huesped.findMany()
     * 
     * // Get first 10 Huespeds
     * const huespeds = await prisma.huesped.findMany({ take: 10 })
     * 
     * // Only select the `id_huesped`
     * const huespedWithId_huespedOnly = await prisma.huesped.findMany({ select: { id_huesped: true } })
     * 
     */
    findMany<T extends huespedFindManyArgs>(args?: SelectSubset<T, huespedFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$huespedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Huesped.
     * @param {huespedCreateArgs} args - Arguments to create a Huesped.
     * @example
     * // Create one Huesped
     * const Huesped = await prisma.huesped.create({
     *   data: {
     *     // ... data to create a Huesped
     *   }
     * })
     * 
     */
    create<T extends huespedCreateArgs>(args: SelectSubset<T, huespedCreateArgs<ExtArgs>>): Prisma__huespedClient<$Result.GetResult<Prisma.$huespedPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Huespeds.
     * @param {huespedCreateManyArgs} args - Arguments to create many Huespeds.
     * @example
     * // Create many Huespeds
     * const huesped = await prisma.huesped.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends huespedCreateManyArgs>(args?: SelectSubset<T, huespedCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Huespeds and returns the data saved in the database.
     * @param {huespedCreateManyAndReturnArgs} args - Arguments to create many Huespeds.
     * @example
     * // Create many Huespeds
     * const huesped = await prisma.huesped.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Huespeds and only return the `id_huesped`
     * const huespedWithId_huespedOnly = await prisma.huesped.createManyAndReturn({
     *   select: { id_huesped: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends huespedCreateManyAndReturnArgs>(args?: SelectSubset<T, huespedCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$huespedPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Huesped.
     * @param {huespedDeleteArgs} args - Arguments to delete one Huesped.
     * @example
     * // Delete one Huesped
     * const Huesped = await prisma.huesped.delete({
     *   where: {
     *     // ... filter to delete one Huesped
     *   }
     * })
     * 
     */
    delete<T extends huespedDeleteArgs>(args: SelectSubset<T, huespedDeleteArgs<ExtArgs>>): Prisma__huespedClient<$Result.GetResult<Prisma.$huespedPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Huesped.
     * @param {huespedUpdateArgs} args - Arguments to update one Huesped.
     * @example
     * // Update one Huesped
     * const huesped = await prisma.huesped.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends huespedUpdateArgs>(args: SelectSubset<T, huespedUpdateArgs<ExtArgs>>): Prisma__huespedClient<$Result.GetResult<Prisma.$huespedPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Huespeds.
     * @param {huespedDeleteManyArgs} args - Arguments to filter Huespeds to delete.
     * @example
     * // Delete a few Huespeds
     * const { count } = await prisma.huesped.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends huespedDeleteManyArgs>(args?: SelectSubset<T, huespedDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Huespeds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {huespedUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Huespeds
     * const huesped = await prisma.huesped.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends huespedUpdateManyArgs>(args: SelectSubset<T, huespedUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Huespeds and returns the data updated in the database.
     * @param {huespedUpdateManyAndReturnArgs} args - Arguments to update many Huespeds.
     * @example
     * // Update many Huespeds
     * const huesped = await prisma.huesped.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Huespeds and only return the `id_huesped`
     * const huespedWithId_huespedOnly = await prisma.huesped.updateManyAndReturn({
     *   select: { id_huesped: true },
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
    updateManyAndReturn<T extends huespedUpdateManyAndReturnArgs>(args: SelectSubset<T, huespedUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$huespedPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Huesped.
     * @param {huespedUpsertArgs} args - Arguments to update or create a Huesped.
     * @example
     * // Update or create a Huesped
     * const huesped = await prisma.huesped.upsert({
     *   create: {
     *     // ... data to create a Huesped
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Huesped we want to update
     *   }
     * })
     */
    upsert<T extends huespedUpsertArgs>(args: SelectSubset<T, huespedUpsertArgs<ExtArgs>>): Prisma__huespedClient<$Result.GetResult<Prisma.$huespedPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Huespeds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {huespedCountArgs} args - Arguments to filter Huespeds to count.
     * @example
     * // Count the number of Huespeds
     * const count = await prisma.huesped.count({
     *   where: {
     *     // ... the filter for the Huespeds we want to count
     *   }
     * })
    **/
    count<T extends huespedCountArgs>(
      args?: Subset<T, huespedCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HuespedCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Huesped.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HuespedAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends HuespedAggregateArgs>(args: Subset<T, HuespedAggregateArgs>): Prisma.PrismaPromise<GetHuespedAggregateType<T>>

    /**
     * Group by Huesped.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {huespedGroupByArgs} args - Group by arguments.
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
      T extends huespedGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: huespedGroupByArgs['orderBy'] }
        : { orderBy?: huespedGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, huespedGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHuespedGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the huesped model
   */
  readonly fields: huespedFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for huesped.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__huespedClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cuenta_persona<T extends huesped$cuenta_personaArgs<ExtArgs> = {}>(args?: Subset<T, huesped$cuenta_personaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cuenta_personaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reserva<T extends huesped$reservaArgs<ExtArgs> = {}>(args?: Subset<T, huesped$reservaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reservaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the huesped model
   */
  interface huespedFieldRefs {
    readonly id_huesped: FieldRef<"huesped", 'Int'>
    readonly nombre_completo: FieldRef<"huesped", 'String'>
    readonly telefono: FieldRef<"huesped", 'String'>
    readonly documento: FieldRef<"huesped", 'String'>
    readonly tipo_documento: FieldRef<"huesped", 'String'>
    readonly procedencia: FieldRef<"huesped", 'String'>
    readonly firma: FieldRef<"huesped", 'String'>
    readonly fecha_creacion: FieldRef<"huesped", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * huesped findUnique
   */
  export type huespedFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the huesped
     */
    select?: huespedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the huesped
     */
    omit?: huespedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: huespedInclude<ExtArgs> | null
    /**
     * Filter, which huesped to fetch.
     */
    where: huespedWhereUniqueInput
  }

  /**
   * huesped findUniqueOrThrow
   */
  export type huespedFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the huesped
     */
    select?: huespedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the huesped
     */
    omit?: huespedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: huespedInclude<ExtArgs> | null
    /**
     * Filter, which huesped to fetch.
     */
    where: huespedWhereUniqueInput
  }

  /**
   * huesped findFirst
   */
  export type huespedFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the huesped
     */
    select?: huespedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the huesped
     */
    omit?: huespedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: huespedInclude<ExtArgs> | null
    /**
     * Filter, which huesped to fetch.
     */
    where?: huespedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of huespeds to fetch.
     */
    orderBy?: huespedOrderByWithRelationInput | huespedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for huespeds.
     */
    cursor?: huespedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` huespeds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` huespeds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of huespeds.
     */
    distinct?: HuespedScalarFieldEnum | HuespedScalarFieldEnum[]
  }

  /**
   * huesped findFirstOrThrow
   */
  export type huespedFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the huesped
     */
    select?: huespedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the huesped
     */
    omit?: huespedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: huespedInclude<ExtArgs> | null
    /**
     * Filter, which huesped to fetch.
     */
    where?: huespedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of huespeds to fetch.
     */
    orderBy?: huespedOrderByWithRelationInput | huespedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for huespeds.
     */
    cursor?: huespedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` huespeds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` huespeds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of huespeds.
     */
    distinct?: HuespedScalarFieldEnum | HuespedScalarFieldEnum[]
  }

  /**
   * huesped findMany
   */
  export type huespedFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the huesped
     */
    select?: huespedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the huesped
     */
    omit?: huespedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: huespedInclude<ExtArgs> | null
    /**
     * Filter, which huespeds to fetch.
     */
    where?: huespedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of huespeds to fetch.
     */
    orderBy?: huespedOrderByWithRelationInput | huespedOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing huespeds.
     */
    cursor?: huespedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` huespeds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` huespeds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of huespeds.
     */
    distinct?: HuespedScalarFieldEnum | HuespedScalarFieldEnum[]
  }

  /**
   * huesped create
   */
  export type huespedCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the huesped
     */
    select?: huespedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the huesped
     */
    omit?: huespedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: huespedInclude<ExtArgs> | null
    /**
     * The data needed to create a huesped.
     */
    data: XOR<huespedCreateInput, huespedUncheckedCreateInput>
  }

  /**
   * huesped createMany
   */
  export type huespedCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many huespeds.
     */
    data: huespedCreateManyInput | huespedCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * huesped createManyAndReturn
   */
  export type huespedCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the huesped
     */
    select?: huespedSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the huesped
     */
    omit?: huespedOmit<ExtArgs> | null
    /**
     * The data used to create many huespeds.
     */
    data: huespedCreateManyInput | huespedCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * huesped update
   */
  export type huespedUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the huesped
     */
    select?: huespedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the huesped
     */
    omit?: huespedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: huespedInclude<ExtArgs> | null
    /**
     * The data needed to update a huesped.
     */
    data: XOR<huespedUpdateInput, huespedUncheckedUpdateInput>
    /**
     * Choose, which huesped to update.
     */
    where: huespedWhereUniqueInput
  }

  /**
   * huesped updateMany
   */
  export type huespedUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update huespeds.
     */
    data: XOR<huespedUpdateManyMutationInput, huespedUncheckedUpdateManyInput>
    /**
     * Filter which huespeds to update
     */
    where?: huespedWhereInput
    /**
     * Limit how many huespeds to update.
     */
    limit?: number
  }

  /**
   * huesped updateManyAndReturn
   */
  export type huespedUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the huesped
     */
    select?: huespedSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the huesped
     */
    omit?: huespedOmit<ExtArgs> | null
    /**
     * The data used to update huespeds.
     */
    data: XOR<huespedUpdateManyMutationInput, huespedUncheckedUpdateManyInput>
    /**
     * Filter which huespeds to update
     */
    where?: huespedWhereInput
    /**
     * Limit how many huespeds to update.
     */
    limit?: number
  }

  /**
   * huesped upsert
   */
  export type huespedUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the huesped
     */
    select?: huespedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the huesped
     */
    omit?: huespedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: huespedInclude<ExtArgs> | null
    /**
     * The filter to search for the huesped to update in case it exists.
     */
    where: huespedWhereUniqueInput
    /**
     * In case the huesped found by the `where` argument doesn't exist, create a new huesped with this data.
     */
    create: XOR<huespedCreateInput, huespedUncheckedCreateInput>
    /**
     * In case the huesped was found with the provided `where` argument, update it with this data.
     */
    update: XOR<huespedUpdateInput, huespedUncheckedUpdateInput>
  }

  /**
   * huesped delete
   */
  export type huespedDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the huesped
     */
    select?: huespedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the huesped
     */
    omit?: huespedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: huespedInclude<ExtArgs> | null
    /**
     * Filter which huesped to delete.
     */
    where: huespedWhereUniqueInput
  }

  /**
   * huesped deleteMany
   */
  export type huespedDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which huespeds to delete
     */
    where?: huespedWhereInput
    /**
     * Limit how many huespeds to delete.
     */
    limit?: number
  }

  /**
   * huesped.cuenta_persona
   */
  export type huesped$cuenta_personaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_persona
     */
    select?: cuenta_personaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_persona
     */
    omit?: cuenta_personaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_personaInclude<ExtArgs> | null
    where?: cuenta_personaWhereInput
    orderBy?: cuenta_personaOrderByWithRelationInput | cuenta_personaOrderByWithRelationInput[]
    cursor?: cuenta_personaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Cuenta_personaScalarFieldEnum | Cuenta_personaScalarFieldEnum[]
  }

  /**
   * huesped.reserva
   */
  export type huesped$reservaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reserva
     */
    select?: reservaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reserva
     */
    omit?: reservaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservaInclude<ExtArgs> | null
    where?: reservaWhereInput
    orderBy?: reservaOrderByWithRelationInput | reservaOrderByWithRelationInput[]
    cursor?: reservaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReservaScalarFieldEnum | ReservaScalarFieldEnum[]
  }

  /**
   * huesped without action
   */
  export type huespedDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the huesped
     */
    select?: huespedSelect<ExtArgs> | null
    /**
     * Omit specific fields from the huesped
     */
    omit?: huespedOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: huespedInclude<ExtArgs> | null
  }


  /**
   * Model inventario_minibar
   */

  export type AggregateInventario_minibar = {
    _count: Inventario_minibarCountAggregateOutputType | null
    _avg: Inventario_minibarAvgAggregateOutputType | null
    _sum: Inventario_minibarSumAggregateOutputType | null
    _min: Inventario_minibarMinAggregateOutputType | null
    _max: Inventario_minibarMaxAggregateOutputType | null
  }

  export type Inventario_minibarAvgAggregateOutputType = {
    id_inventario: number | null
    id_espacio: number | null
    cantidad: number | null
    precio_unitario: Decimal | null
  }

  export type Inventario_minibarSumAggregateOutputType = {
    id_inventario: number | null
    id_espacio: number | null
    cantidad: number | null
    precio_unitario: Decimal | null
  }

  export type Inventario_minibarMinAggregateOutputType = {
    id_inventario: number | null
    id_espacio: number | null
    nombre_producto: string | null
    cantidad: number | null
    precio_unitario: Decimal | null
    fecha_vencimiento: Date | null
    fecha_actualizacion: Date | null
  }

  export type Inventario_minibarMaxAggregateOutputType = {
    id_inventario: number | null
    id_espacio: number | null
    nombre_producto: string | null
    cantidad: number | null
    precio_unitario: Decimal | null
    fecha_vencimiento: Date | null
    fecha_actualizacion: Date | null
  }

  export type Inventario_minibarCountAggregateOutputType = {
    id_inventario: number
    id_espacio: number
    nombre_producto: number
    cantidad: number
    precio_unitario: number
    fecha_vencimiento: number
    fecha_actualizacion: number
    _all: number
  }


  export type Inventario_minibarAvgAggregateInputType = {
    id_inventario?: true
    id_espacio?: true
    cantidad?: true
    precio_unitario?: true
  }

  export type Inventario_minibarSumAggregateInputType = {
    id_inventario?: true
    id_espacio?: true
    cantidad?: true
    precio_unitario?: true
  }

  export type Inventario_minibarMinAggregateInputType = {
    id_inventario?: true
    id_espacio?: true
    nombre_producto?: true
    cantidad?: true
    precio_unitario?: true
    fecha_vencimiento?: true
    fecha_actualizacion?: true
  }

  export type Inventario_minibarMaxAggregateInputType = {
    id_inventario?: true
    id_espacio?: true
    nombre_producto?: true
    cantidad?: true
    precio_unitario?: true
    fecha_vencimiento?: true
    fecha_actualizacion?: true
  }

  export type Inventario_minibarCountAggregateInputType = {
    id_inventario?: true
    id_espacio?: true
    nombre_producto?: true
    cantidad?: true
    precio_unitario?: true
    fecha_vencimiento?: true
    fecha_actualizacion?: true
    _all?: true
  }

  export type Inventario_minibarAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which inventario_minibar to aggregate.
     */
    where?: inventario_minibarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of inventario_minibars to fetch.
     */
    orderBy?: inventario_minibarOrderByWithRelationInput | inventario_minibarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: inventario_minibarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` inventario_minibars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` inventario_minibars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned inventario_minibars
    **/
    _count?: true | Inventario_minibarCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Inventario_minibarAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Inventario_minibarSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Inventario_minibarMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Inventario_minibarMaxAggregateInputType
  }

  export type GetInventario_minibarAggregateType<T extends Inventario_minibarAggregateArgs> = {
        [P in keyof T & keyof AggregateInventario_minibar]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInventario_minibar[P]>
      : GetScalarType<T[P], AggregateInventario_minibar[P]>
  }




  export type inventario_minibarGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: inventario_minibarWhereInput
    orderBy?: inventario_minibarOrderByWithAggregationInput | inventario_minibarOrderByWithAggregationInput[]
    by: Inventario_minibarScalarFieldEnum[] | Inventario_minibarScalarFieldEnum
    having?: inventario_minibarScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Inventario_minibarCountAggregateInputType | true
    _avg?: Inventario_minibarAvgAggregateInputType
    _sum?: Inventario_minibarSumAggregateInputType
    _min?: Inventario_minibarMinAggregateInputType
    _max?: Inventario_minibarMaxAggregateInputType
  }

  export type Inventario_minibarGroupByOutputType = {
    id_inventario: number
    id_espacio: number
    nombre_producto: string
    cantidad: number
    precio_unitario: Decimal
    fecha_vencimiento: Date | null
    fecha_actualizacion: Date | null
    _count: Inventario_minibarCountAggregateOutputType | null
    _avg: Inventario_minibarAvgAggregateOutputType | null
    _sum: Inventario_minibarSumAggregateOutputType | null
    _min: Inventario_minibarMinAggregateOutputType | null
    _max: Inventario_minibarMaxAggregateOutputType | null
  }

  type GetInventario_minibarGroupByPayload<T extends inventario_minibarGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Inventario_minibarGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Inventario_minibarGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Inventario_minibarGroupByOutputType[P]>
            : GetScalarType<T[P], Inventario_minibarGroupByOutputType[P]>
        }
      >
    >


  export type inventario_minibarSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_inventario?: boolean
    id_espacio?: boolean
    nombre_producto?: boolean
    cantidad?: boolean
    precio_unitario?: boolean
    fecha_vencimiento?: boolean
    fecha_actualizacion?: boolean
    espacio?: boolean | espacioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inventario_minibar"]>

  export type inventario_minibarSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_inventario?: boolean
    id_espacio?: boolean
    nombre_producto?: boolean
    cantidad?: boolean
    precio_unitario?: boolean
    fecha_vencimiento?: boolean
    fecha_actualizacion?: boolean
    espacio?: boolean | espacioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inventario_minibar"]>

  export type inventario_minibarSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_inventario?: boolean
    id_espacio?: boolean
    nombre_producto?: boolean
    cantidad?: boolean
    precio_unitario?: boolean
    fecha_vencimiento?: boolean
    fecha_actualizacion?: boolean
    espacio?: boolean | espacioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inventario_minibar"]>

  export type inventario_minibarSelectScalar = {
    id_inventario?: boolean
    id_espacio?: boolean
    nombre_producto?: boolean
    cantidad?: boolean
    precio_unitario?: boolean
    fecha_vencimiento?: boolean
    fecha_actualizacion?: boolean
  }

  export type inventario_minibarOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_inventario" | "id_espacio" | "nombre_producto" | "cantidad" | "precio_unitario" | "fecha_vencimiento" | "fecha_actualizacion", ExtArgs["result"]["inventario_minibar"]>
  export type inventario_minibarInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    espacio?: boolean | espacioDefaultArgs<ExtArgs>
  }
  export type inventario_minibarIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    espacio?: boolean | espacioDefaultArgs<ExtArgs>
  }
  export type inventario_minibarIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    espacio?: boolean | espacioDefaultArgs<ExtArgs>
  }

  export type $inventario_minibarPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "inventario_minibar"
    objects: {
      espacio: Prisma.$espacioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_inventario: number
      id_espacio: number
      nombre_producto: string
      cantidad: number
      precio_unitario: Prisma.Decimal
      fecha_vencimiento: Date | null
      fecha_actualizacion: Date | null
    }, ExtArgs["result"]["inventario_minibar"]>
    composites: {}
  }

  type inventario_minibarGetPayload<S extends boolean | null | undefined | inventario_minibarDefaultArgs> = $Result.GetResult<Prisma.$inventario_minibarPayload, S>

  type inventario_minibarCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<inventario_minibarFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Inventario_minibarCountAggregateInputType | true
    }

  export interface inventario_minibarDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['inventario_minibar'], meta: { name: 'inventario_minibar' } }
    /**
     * Find zero or one Inventario_minibar that matches the filter.
     * @param {inventario_minibarFindUniqueArgs} args - Arguments to find a Inventario_minibar
     * @example
     * // Get one Inventario_minibar
     * const inventario_minibar = await prisma.inventario_minibar.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends inventario_minibarFindUniqueArgs>(args: SelectSubset<T, inventario_minibarFindUniqueArgs<ExtArgs>>): Prisma__inventario_minibarClient<$Result.GetResult<Prisma.$inventario_minibarPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Inventario_minibar that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {inventario_minibarFindUniqueOrThrowArgs} args - Arguments to find a Inventario_minibar
     * @example
     * // Get one Inventario_minibar
     * const inventario_minibar = await prisma.inventario_minibar.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends inventario_minibarFindUniqueOrThrowArgs>(args: SelectSubset<T, inventario_minibarFindUniqueOrThrowArgs<ExtArgs>>): Prisma__inventario_minibarClient<$Result.GetResult<Prisma.$inventario_minibarPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Inventario_minibar that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {inventario_minibarFindFirstArgs} args - Arguments to find a Inventario_minibar
     * @example
     * // Get one Inventario_minibar
     * const inventario_minibar = await prisma.inventario_minibar.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends inventario_minibarFindFirstArgs>(args?: SelectSubset<T, inventario_minibarFindFirstArgs<ExtArgs>>): Prisma__inventario_minibarClient<$Result.GetResult<Prisma.$inventario_minibarPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Inventario_minibar that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {inventario_minibarFindFirstOrThrowArgs} args - Arguments to find a Inventario_minibar
     * @example
     * // Get one Inventario_minibar
     * const inventario_minibar = await prisma.inventario_minibar.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends inventario_minibarFindFirstOrThrowArgs>(args?: SelectSubset<T, inventario_minibarFindFirstOrThrowArgs<ExtArgs>>): Prisma__inventario_minibarClient<$Result.GetResult<Prisma.$inventario_minibarPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Inventario_minibars that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {inventario_minibarFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Inventario_minibars
     * const inventario_minibars = await prisma.inventario_minibar.findMany()
     * 
     * // Get first 10 Inventario_minibars
     * const inventario_minibars = await prisma.inventario_minibar.findMany({ take: 10 })
     * 
     * // Only select the `id_inventario`
     * const inventario_minibarWithId_inventarioOnly = await prisma.inventario_minibar.findMany({ select: { id_inventario: true } })
     * 
     */
    findMany<T extends inventario_minibarFindManyArgs>(args?: SelectSubset<T, inventario_minibarFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$inventario_minibarPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Inventario_minibar.
     * @param {inventario_minibarCreateArgs} args - Arguments to create a Inventario_minibar.
     * @example
     * // Create one Inventario_minibar
     * const Inventario_minibar = await prisma.inventario_minibar.create({
     *   data: {
     *     // ... data to create a Inventario_minibar
     *   }
     * })
     * 
     */
    create<T extends inventario_minibarCreateArgs>(args: SelectSubset<T, inventario_minibarCreateArgs<ExtArgs>>): Prisma__inventario_minibarClient<$Result.GetResult<Prisma.$inventario_minibarPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Inventario_minibars.
     * @param {inventario_minibarCreateManyArgs} args - Arguments to create many Inventario_minibars.
     * @example
     * // Create many Inventario_minibars
     * const inventario_minibar = await prisma.inventario_minibar.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends inventario_minibarCreateManyArgs>(args?: SelectSubset<T, inventario_minibarCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Inventario_minibars and returns the data saved in the database.
     * @param {inventario_minibarCreateManyAndReturnArgs} args - Arguments to create many Inventario_minibars.
     * @example
     * // Create many Inventario_minibars
     * const inventario_minibar = await prisma.inventario_minibar.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Inventario_minibars and only return the `id_inventario`
     * const inventario_minibarWithId_inventarioOnly = await prisma.inventario_minibar.createManyAndReturn({
     *   select: { id_inventario: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends inventario_minibarCreateManyAndReturnArgs>(args?: SelectSubset<T, inventario_minibarCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$inventario_minibarPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Inventario_minibar.
     * @param {inventario_minibarDeleteArgs} args - Arguments to delete one Inventario_minibar.
     * @example
     * // Delete one Inventario_minibar
     * const Inventario_minibar = await prisma.inventario_minibar.delete({
     *   where: {
     *     // ... filter to delete one Inventario_minibar
     *   }
     * })
     * 
     */
    delete<T extends inventario_minibarDeleteArgs>(args: SelectSubset<T, inventario_minibarDeleteArgs<ExtArgs>>): Prisma__inventario_minibarClient<$Result.GetResult<Prisma.$inventario_minibarPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Inventario_minibar.
     * @param {inventario_minibarUpdateArgs} args - Arguments to update one Inventario_minibar.
     * @example
     * // Update one Inventario_minibar
     * const inventario_minibar = await prisma.inventario_minibar.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends inventario_minibarUpdateArgs>(args: SelectSubset<T, inventario_minibarUpdateArgs<ExtArgs>>): Prisma__inventario_minibarClient<$Result.GetResult<Prisma.$inventario_minibarPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Inventario_minibars.
     * @param {inventario_minibarDeleteManyArgs} args - Arguments to filter Inventario_minibars to delete.
     * @example
     * // Delete a few Inventario_minibars
     * const { count } = await prisma.inventario_minibar.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends inventario_minibarDeleteManyArgs>(args?: SelectSubset<T, inventario_minibarDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Inventario_minibars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {inventario_minibarUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Inventario_minibars
     * const inventario_minibar = await prisma.inventario_minibar.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends inventario_minibarUpdateManyArgs>(args: SelectSubset<T, inventario_minibarUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Inventario_minibars and returns the data updated in the database.
     * @param {inventario_minibarUpdateManyAndReturnArgs} args - Arguments to update many Inventario_minibars.
     * @example
     * // Update many Inventario_minibars
     * const inventario_minibar = await prisma.inventario_minibar.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Inventario_minibars and only return the `id_inventario`
     * const inventario_minibarWithId_inventarioOnly = await prisma.inventario_minibar.updateManyAndReturn({
     *   select: { id_inventario: true },
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
    updateManyAndReturn<T extends inventario_minibarUpdateManyAndReturnArgs>(args: SelectSubset<T, inventario_minibarUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$inventario_minibarPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Inventario_minibar.
     * @param {inventario_minibarUpsertArgs} args - Arguments to update or create a Inventario_minibar.
     * @example
     * // Update or create a Inventario_minibar
     * const inventario_minibar = await prisma.inventario_minibar.upsert({
     *   create: {
     *     // ... data to create a Inventario_minibar
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Inventario_minibar we want to update
     *   }
     * })
     */
    upsert<T extends inventario_minibarUpsertArgs>(args: SelectSubset<T, inventario_minibarUpsertArgs<ExtArgs>>): Prisma__inventario_minibarClient<$Result.GetResult<Prisma.$inventario_minibarPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Inventario_minibars.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {inventario_minibarCountArgs} args - Arguments to filter Inventario_minibars to count.
     * @example
     * // Count the number of Inventario_minibars
     * const count = await prisma.inventario_minibar.count({
     *   where: {
     *     // ... the filter for the Inventario_minibars we want to count
     *   }
     * })
    **/
    count<T extends inventario_minibarCountArgs>(
      args?: Subset<T, inventario_minibarCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Inventario_minibarCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Inventario_minibar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Inventario_minibarAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Inventario_minibarAggregateArgs>(args: Subset<T, Inventario_minibarAggregateArgs>): Prisma.PrismaPromise<GetInventario_minibarAggregateType<T>>

    /**
     * Group by Inventario_minibar.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {inventario_minibarGroupByArgs} args - Group by arguments.
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
      T extends inventario_minibarGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: inventario_minibarGroupByArgs['orderBy'] }
        : { orderBy?: inventario_minibarGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, inventario_minibarGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInventario_minibarGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the inventario_minibar model
   */
  readonly fields: inventario_minibarFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for inventario_minibar.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__inventario_minibarClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    espacio<T extends espacioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, espacioDefaultArgs<ExtArgs>>): Prisma__espacioClient<$Result.GetResult<Prisma.$espacioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the inventario_minibar model
   */
  interface inventario_minibarFieldRefs {
    readonly id_inventario: FieldRef<"inventario_minibar", 'Int'>
    readonly id_espacio: FieldRef<"inventario_minibar", 'Int'>
    readonly nombre_producto: FieldRef<"inventario_minibar", 'String'>
    readonly cantidad: FieldRef<"inventario_minibar", 'Int'>
    readonly precio_unitario: FieldRef<"inventario_minibar", 'Decimal'>
    readonly fecha_vencimiento: FieldRef<"inventario_minibar", 'DateTime'>
    readonly fecha_actualizacion: FieldRef<"inventario_minibar", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * inventario_minibar findUnique
   */
  export type inventario_minibarFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the inventario_minibar
     */
    select?: inventario_minibarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the inventario_minibar
     */
    omit?: inventario_minibarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: inventario_minibarInclude<ExtArgs> | null
    /**
     * Filter, which inventario_minibar to fetch.
     */
    where: inventario_minibarWhereUniqueInput
  }

  /**
   * inventario_minibar findUniqueOrThrow
   */
  export type inventario_minibarFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the inventario_minibar
     */
    select?: inventario_minibarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the inventario_minibar
     */
    omit?: inventario_minibarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: inventario_minibarInclude<ExtArgs> | null
    /**
     * Filter, which inventario_minibar to fetch.
     */
    where: inventario_minibarWhereUniqueInput
  }

  /**
   * inventario_minibar findFirst
   */
  export type inventario_minibarFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the inventario_minibar
     */
    select?: inventario_minibarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the inventario_minibar
     */
    omit?: inventario_minibarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: inventario_minibarInclude<ExtArgs> | null
    /**
     * Filter, which inventario_minibar to fetch.
     */
    where?: inventario_minibarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of inventario_minibars to fetch.
     */
    orderBy?: inventario_minibarOrderByWithRelationInput | inventario_minibarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for inventario_minibars.
     */
    cursor?: inventario_minibarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` inventario_minibars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` inventario_minibars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of inventario_minibars.
     */
    distinct?: Inventario_minibarScalarFieldEnum | Inventario_minibarScalarFieldEnum[]
  }

  /**
   * inventario_minibar findFirstOrThrow
   */
  export type inventario_minibarFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the inventario_minibar
     */
    select?: inventario_minibarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the inventario_minibar
     */
    omit?: inventario_minibarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: inventario_minibarInclude<ExtArgs> | null
    /**
     * Filter, which inventario_minibar to fetch.
     */
    where?: inventario_minibarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of inventario_minibars to fetch.
     */
    orderBy?: inventario_minibarOrderByWithRelationInput | inventario_minibarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for inventario_minibars.
     */
    cursor?: inventario_minibarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` inventario_minibars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` inventario_minibars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of inventario_minibars.
     */
    distinct?: Inventario_minibarScalarFieldEnum | Inventario_minibarScalarFieldEnum[]
  }

  /**
   * inventario_minibar findMany
   */
  export type inventario_minibarFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the inventario_minibar
     */
    select?: inventario_minibarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the inventario_minibar
     */
    omit?: inventario_minibarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: inventario_minibarInclude<ExtArgs> | null
    /**
     * Filter, which inventario_minibars to fetch.
     */
    where?: inventario_minibarWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of inventario_minibars to fetch.
     */
    orderBy?: inventario_minibarOrderByWithRelationInput | inventario_minibarOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing inventario_minibars.
     */
    cursor?: inventario_minibarWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` inventario_minibars from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` inventario_minibars.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of inventario_minibars.
     */
    distinct?: Inventario_minibarScalarFieldEnum | Inventario_minibarScalarFieldEnum[]
  }

  /**
   * inventario_minibar create
   */
  export type inventario_minibarCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the inventario_minibar
     */
    select?: inventario_minibarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the inventario_minibar
     */
    omit?: inventario_minibarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: inventario_minibarInclude<ExtArgs> | null
    /**
     * The data needed to create a inventario_minibar.
     */
    data: XOR<inventario_minibarCreateInput, inventario_minibarUncheckedCreateInput>
  }

  /**
   * inventario_minibar createMany
   */
  export type inventario_minibarCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many inventario_minibars.
     */
    data: inventario_minibarCreateManyInput | inventario_minibarCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * inventario_minibar createManyAndReturn
   */
  export type inventario_minibarCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the inventario_minibar
     */
    select?: inventario_minibarSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the inventario_minibar
     */
    omit?: inventario_minibarOmit<ExtArgs> | null
    /**
     * The data used to create many inventario_minibars.
     */
    data: inventario_minibarCreateManyInput | inventario_minibarCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: inventario_minibarIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * inventario_minibar update
   */
  export type inventario_minibarUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the inventario_minibar
     */
    select?: inventario_minibarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the inventario_minibar
     */
    omit?: inventario_minibarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: inventario_minibarInclude<ExtArgs> | null
    /**
     * The data needed to update a inventario_minibar.
     */
    data: XOR<inventario_minibarUpdateInput, inventario_minibarUncheckedUpdateInput>
    /**
     * Choose, which inventario_minibar to update.
     */
    where: inventario_minibarWhereUniqueInput
  }

  /**
   * inventario_minibar updateMany
   */
  export type inventario_minibarUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update inventario_minibars.
     */
    data: XOR<inventario_minibarUpdateManyMutationInput, inventario_minibarUncheckedUpdateManyInput>
    /**
     * Filter which inventario_minibars to update
     */
    where?: inventario_minibarWhereInput
    /**
     * Limit how many inventario_minibars to update.
     */
    limit?: number
  }

  /**
   * inventario_minibar updateManyAndReturn
   */
  export type inventario_minibarUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the inventario_minibar
     */
    select?: inventario_minibarSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the inventario_minibar
     */
    omit?: inventario_minibarOmit<ExtArgs> | null
    /**
     * The data used to update inventario_minibars.
     */
    data: XOR<inventario_minibarUpdateManyMutationInput, inventario_minibarUncheckedUpdateManyInput>
    /**
     * Filter which inventario_minibars to update
     */
    where?: inventario_minibarWhereInput
    /**
     * Limit how many inventario_minibars to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: inventario_minibarIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * inventario_minibar upsert
   */
  export type inventario_minibarUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the inventario_minibar
     */
    select?: inventario_minibarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the inventario_minibar
     */
    omit?: inventario_minibarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: inventario_minibarInclude<ExtArgs> | null
    /**
     * The filter to search for the inventario_minibar to update in case it exists.
     */
    where: inventario_minibarWhereUniqueInput
    /**
     * In case the inventario_minibar found by the `where` argument doesn't exist, create a new inventario_minibar with this data.
     */
    create: XOR<inventario_minibarCreateInput, inventario_minibarUncheckedCreateInput>
    /**
     * In case the inventario_minibar was found with the provided `where` argument, update it with this data.
     */
    update: XOR<inventario_minibarUpdateInput, inventario_minibarUncheckedUpdateInput>
  }

  /**
   * inventario_minibar delete
   */
  export type inventario_minibarDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the inventario_minibar
     */
    select?: inventario_minibarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the inventario_minibar
     */
    omit?: inventario_minibarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: inventario_minibarInclude<ExtArgs> | null
    /**
     * Filter which inventario_minibar to delete.
     */
    where: inventario_minibarWhereUniqueInput
  }

  /**
   * inventario_minibar deleteMany
   */
  export type inventario_minibarDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which inventario_minibars to delete
     */
    where?: inventario_minibarWhereInput
    /**
     * Limit how many inventario_minibars to delete.
     */
    limit?: number
  }

  /**
   * inventario_minibar without action
   */
  export type inventario_minibarDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the inventario_minibar
     */
    select?: inventario_minibarSelect<ExtArgs> | null
    /**
     * Omit specific fields from the inventario_minibar
     */
    omit?: inventario_minibarOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: inventario_minibarInclude<ExtArgs> | null
  }


  /**
   * Model reserva
   */

  export type AggregateReserva = {
    _count: ReservaCountAggregateOutputType | null
    _avg: ReservaAvgAggregateOutputType | null
    _sum: ReservaSumAggregateOutputType | null
    _min: ReservaMinAggregateOutputType | null
    _max: ReservaMaxAggregateOutputType | null
  }

  export type ReservaAvgAggregateOutputType = {
    id_reserva: number | null
    id_huesped: number | null
    id_espacio: number | null
    cantidad_adultos: number | null
    cantidad_ninos: number | null
    monto_total: Decimal | null
    monto_pagado: Decimal | null
  }

  export type ReservaSumAggregateOutputType = {
    id_reserva: number | null
    id_huesped: number | null
    id_espacio: number | null
    cantidad_adultos: number | null
    cantidad_ninos: number | null
    monto_total: Decimal | null
    monto_pagado: Decimal | null
  }

  export type ReservaMinAggregateOutputType = {
    id_reserva: number | null
    id_huesped: number | null
    id_espacio: number | null
    tipo_reserva: string | null
    dni_tipo: string | null
    check_in: Date | null
    check_out: Date | null
    cantidad_adultos: number | null
    cantidad_ninos: number | null
    fecha_evento: Date | null
    hora_inicio: Date | null
    hora_fin: Date | null
    estado_reserva: string | null
    monto_total: Decimal | null
    estado_pago: string | null
    metodo_pago: string | null
    monto_pagado: Decimal | null
    anotaciones: string | null
    firma: string | null
    fecha_creacion: Date | null
  }

  export type ReservaMaxAggregateOutputType = {
    id_reserva: number | null
    id_huesped: number | null
    id_espacio: number | null
    tipo_reserva: string | null
    dni_tipo: string | null
    check_in: Date | null
    check_out: Date | null
    cantidad_adultos: number | null
    cantidad_ninos: number | null
    fecha_evento: Date | null
    hora_inicio: Date | null
    hora_fin: Date | null
    estado_reserva: string | null
    monto_total: Decimal | null
    estado_pago: string | null
    metodo_pago: string | null
    monto_pagado: Decimal | null
    anotaciones: string | null
    firma: string | null
    fecha_creacion: Date | null
  }

  export type ReservaCountAggregateOutputType = {
    id_reserva: number
    id_huesped: number
    id_espacio: number
    tipo_reserva: number
    dni_tipo: number
    check_in: number
    check_out: number
    cantidad_adultos: number
    cantidad_ninos: number
    fecha_evento: number
    hora_inicio: number
    hora_fin: number
    estado_reserva: number
    monto_total: number
    estado_pago: number
    metodo_pago: number
    monto_pagado: number
    anotaciones: number
    firma: number
    fecha_creacion: number
    _all: number
  }


  export type ReservaAvgAggregateInputType = {
    id_reserva?: true
    id_huesped?: true
    id_espacio?: true
    cantidad_adultos?: true
    cantidad_ninos?: true
    monto_total?: true
    monto_pagado?: true
  }

  export type ReservaSumAggregateInputType = {
    id_reserva?: true
    id_huesped?: true
    id_espacio?: true
    cantidad_adultos?: true
    cantidad_ninos?: true
    monto_total?: true
    monto_pagado?: true
  }

  export type ReservaMinAggregateInputType = {
    id_reserva?: true
    id_huesped?: true
    id_espacio?: true
    tipo_reserva?: true
    dni_tipo?: true
    check_in?: true
    check_out?: true
    cantidad_adultos?: true
    cantidad_ninos?: true
    fecha_evento?: true
    hora_inicio?: true
    hora_fin?: true
    estado_reserva?: true
    monto_total?: true
    estado_pago?: true
    metodo_pago?: true
    monto_pagado?: true
    anotaciones?: true
    firma?: true
    fecha_creacion?: true
  }

  export type ReservaMaxAggregateInputType = {
    id_reserva?: true
    id_huesped?: true
    id_espacio?: true
    tipo_reserva?: true
    dni_tipo?: true
    check_in?: true
    check_out?: true
    cantidad_adultos?: true
    cantidad_ninos?: true
    fecha_evento?: true
    hora_inicio?: true
    hora_fin?: true
    estado_reserva?: true
    monto_total?: true
    estado_pago?: true
    metodo_pago?: true
    monto_pagado?: true
    anotaciones?: true
    firma?: true
    fecha_creacion?: true
  }

  export type ReservaCountAggregateInputType = {
    id_reserva?: true
    id_huesped?: true
    id_espacio?: true
    tipo_reserva?: true
    dni_tipo?: true
    check_in?: true
    check_out?: true
    cantidad_adultos?: true
    cantidad_ninos?: true
    fecha_evento?: true
    hora_inicio?: true
    hora_fin?: true
    estado_reserva?: true
    monto_total?: true
    estado_pago?: true
    metodo_pago?: true
    monto_pagado?: true
    anotaciones?: true
    firma?: true
    fecha_creacion?: true
    _all?: true
  }

  export type ReservaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which reserva to aggregate.
     */
    where?: reservaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reservas to fetch.
     */
    orderBy?: reservaOrderByWithRelationInput | reservaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: reservaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reservas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reservas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned reservas
    **/
    _count?: true | ReservaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReservaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReservaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReservaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReservaMaxAggregateInputType
  }

  export type GetReservaAggregateType<T extends ReservaAggregateArgs> = {
        [P in keyof T & keyof AggregateReserva]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReserva[P]>
      : GetScalarType<T[P], AggregateReserva[P]>
  }




  export type reservaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reservaWhereInput
    orderBy?: reservaOrderByWithAggregationInput | reservaOrderByWithAggregationInput[]
    by: ReservaScalarFieldEnum[] | ReservaScalarFieldEnum
    having?: reservaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReservaCountAggregateInputType | true
    _avg?: ReservaAvgAggregateInputType
    _sum?: ReservaSumAggregateInputType
    _min?: ReservaMinAggregateInputType
    _max?: ReservaMaxAggregateInputType
  }

  export type ReservaGroupByOutputType = {
    id_reserva: number
    id_huesped: number
    id_espacio: number
    tipo_reserva: string
    dni_tipo: string | null
    check_in: Date | null
    check_out: Date | null
    cantidad_adultos: number | null
    cantidad_ninos: number | null
    fecha_evento: Date | null
    hora_inicio: Date | null
    hora_fin: Date | null
    estado_reserva: string
    monto_total: Decimal | null
    estado_pago: string | null
    metodo_pago: string | null
    monto_pagado: Decimal | null
    anotaciones: string | null
    firma: string | null
    fecha_creacion: Date | null
    _count: ReservaCountAggregateOutputType | null
    _avg: ReservaAvgAggregateOutputType | null
    _sum: ReservaSumAggregateOutputType | null
    _min: ReservaMinAggregateOutputType | null
    _max: ReservaMaxAggregateOutputType | null
  }

  type GetReservaGroupByPayload<T extends reservaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReservaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReservaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReservaGroupByOutputType[P]>
            : GetScalarType<T[P], ReservaGroupByOutputType[P]>
        }
      >
    >


  export type reservaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_reserva?: boolean
    id_huesped?: boolean
    id_espacio?: boolean
    tipo_reserva?: boolean
    dni_tipo?: boolean
    check_in?: boolean
    check_out?: boolean
    cantidad_adultos?: boolean
    cantidad_ninos?: boolean
    fecha_evento?: boolean
    hora_inicio?: boolean
    hora_fin?: boolean
    estado_reserva?: boolean
    monto_total?: boolean
    estado_pago?: boolean
    metodo_pago?: boolean
    monto_pagado?: boolean
    anotaciones?: boolean
    firma?: boolean
    fecha_creacion?: boolean
    cuenta_espacio?: boolean | reserva$cuenta_espacioArgs<ExtArgs>
    cuenta_persona?: boolean | reserva$cuenta_personaArgs<ExtArgs>
    espacio?: boolean | espacioDefaultArgs<ExtArgs>
    huesped?: boolean | huespedDefaultArgs<ExtArgs>
    _count?: boolean | ReservaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reserva"]>

  export type reservaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_reserva?: boolean
    id_huesped?: boolean
    id_espacio?: boolean
    tipo_reserva?: boolean
    dni_tipo?: boolean
    check_in?: boolean
    check_out?: boolean
    cantidad_adultos?: boolean
    cantidad_ninos?: boolean
    fecha_evento?: boolean
    hora_inicio?: boolean
    hora_fin?: boolean
    estado_reserva?: boolean
    monto_total?: boolean
    estado_pago?: boolean
    metodo_pago?: boolean
    monto_pagado?: boolean
    anotaciones?: boolean
    firma?: boolean
    fecha_creacion?: boolean
    espacio?: boolean | espacioDefaultArgs<ExtArgs>
    huesped?: boolean | huespedDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reserva"]>

  export type reservaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_reserva?: boolean
    id_huesped?: boolean
    id_espacio?: boolean
    tipo_reserva?: boolean
    dni_tipo?: boolean
    check_in?: boolean
    check_out?: boolean
    cantidad_adultos?: boolean
    cantidad_ninos?: boolean
    fecha_evento?: boolean
    hora_inicio?: boolean
    hora_fin?: boolean
    estado_reserva?: boolean
    monto_total?: boolean
    estado_pago?: boolean
    metodo_pago?: boolean
    monto_pagado?: boolean
    anotaciones?: boolean
    firma?: boolean
    fecha_creacion?: boolean
    espacio?: boolean | espacioDefaultArgs<ExtArgs>
    huesped?: boolean | huespedDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reserva"]>

  export type reservaSelectScalar = {
    id_reserva?: boolean
    id_huesped?: boolean
    id_espacio?: boolean
    tipo_reserva?: boolean
    dni_tipo?: boolean
    check_in?: boolean
    check_out?: boolean
    cantidad_adultos?: boolean
    cantidad_ninos?: boolean
    fecha_evento?: boolean
    hora_inicio?: boolean
    hora_fin?: boolean
    estado_reserva?: boolean
    monto_total?: boolean
    estado_pago?: boolean
    metodo_pago?: boolean
    monto_pagado?: boolean
    anotaciones?: boolean
    firma?: boolean
    fecha_creacion?: boolean
  }

  export type reservaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_reserva" | "id_huesped" | "id_espacio" | "tipo_reserva" | "dni_tipo" | "check_in" | "check_out" | "cantidad_adultos" | "cantidad_ninos" | "fecha_evento" | "hora_inicio" | "hora_fin" | "estado_reserva" | "monto_total" | "estado_pago" | "metodo_pago" | "monto_pagado" | "anotaciones" | "firma" | "fecha_creacion", ExtArgs["result"]["reserva"]>
  export type reservaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cuenta_espacio?: boolean | reserva$cuenta_espacioArgs<ExtArgs>
    cuenta_persona?: boolean | reserva$cuenta_personaArgs<ExtArgs>
    espacio?: boolean | espacioDefaultArgs<ExtArgs>
    huesped?: boolean | huespedDefaultArgs<ExtArgs>
    _count?: boolean | ReservaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type reservaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    espacio?: boolean | espacioDefaultArgs<ExtArgs>
    huesped?: boolean | huespedDefaultArgs<ExtArgs>
  }
  export type reservaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    espacio?: boolean | espacioDefaultArgs<ExtArgs>
    huesped?: boolean | huespedDefaultArgs<ExtArgs>
  }

  export type $reservaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "reserva"
    objects: {
      cuenta_espacio: Prisma.$cuenta_espacioPayload<ExtArgs>[]
      cuenta_persona: Prisma.$cuenta_personaPayload<ExtArgs>[]
      espacio: Prisma.$espacioPayload<ExtArgs>
      huesped: Prisma.$huespedPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_reserva: number
      id_huesped: number
      id_espacio: number
      tipo_reserva: string
      dni_tipo: string | null
      check_in: Date | null
      check_out: Date | null
      cantidad_adultos: number | null
      cantidad_ninos: number | null
      fecha_evento: Date | null
      hora_inicio: Date | null
      hora_fin: Date | null
      estado_reserva: string
      monto_total: Prisma.Decimal | null
      estado_pago: string | null
      metodo_pago: string | null
      monto_pagado: Prisma.Decimal | null
      anotaciones: string | null
      firma: string | null
      fecha_creacion: Date | null
    }, ExtArgs["result"]["reserva"]>
    composites: {}
  }

  type reservaGetPayload<S extends boolean | null | undefined | reservaDefaultArgs> = $Result.GetResult<Prisma.$reservaPayload, S>

  type reservaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<reservaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReservaCountAggregateInputType | true
    }

  export interface reservaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['reserva'], meta: { name: 'reserva' } }
    /**
     * Find zero or one Reserva that matches the filter.
     * @param {reservaFindUniqueArgs} args - Arguments to find a Reserva
     * @example
     * // Get one Reserva
     * const reserva = await prisma.reserva.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends reservaFindUniqueArgs>(args: SelectSubset<T, reservaFindUniqueArgs<ExtArgs>>): Prisma__reservaClient<$Result.GetResult<Prisma.$reservaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Reserva that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {reservaFindUniqueOrThrowArgs} args - Arguments to find a Reserva
     * @example
     * // Get one Reserva
     * const reserva = await prisma.reserva.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends reservaFindUniqueOrThrowArgs>(args: SelectSubset<T, reservaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__reservaClient<$Result.GetResult<Prisma.$reservaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reserva that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reservaFindFirstArgs} args - Arguments to find a Reserva
     * @example
     * // Get one Reserva
     * const reserva = await prisma.reserva.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends reservaFindFirstArgs>(args?: SelectSubset<T, reservaFindFirstArgs<ExtArgs>>): Prisma__reservaClient<$Result.GetResult<Prisma.$reservaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reserva that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reservaFindFirstOrThrowArgs} args - Arguments to find a Reserva
     * @example
     * // Get one Reserva
     * const reserva = await prisma.reserva.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends reservaFindFirstOrThrowArgs>(args?: SelectSubset<T, reservaFindFirstOrThrowArgs<ExtArgs>>): Prisma__reservaClient<$Result.GetResult<Prisma.$reservaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reservas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reservaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reservas
     * const reservas = await prisma.reserva.findMany()
     * 
     * // Get first 10 Reservas
     * const reservas = await prisma.reserva.findMany({ take: 10 })
     * 
     * // Only select the `id_reserva`
     * const reservaWithId_reservaOnly = await prisma.reserva.findMany({ select: { id_reserva: true } })
     * 
     */
    findMany<T extends reservaFindManyArgs>(args?: SelectSubset<T, reservaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reservaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Reserva.
     * @param {reservaCreateArgs} args - Arguments to create a Reserva.
     * @example
     * // Create one Reserva
     * const Reserva = await prisma.reserva.create({
     *   data: {
     *     // ... data to create a Reserva
     *   }
     * })
     * 
     */
    create<T extends reservaCreateArgs>(args: SelectSubset<T, reservaCreateArgs<ExtArgs>>): Prisma__reservaClient<$Result.GetResult<Prisma.$reservaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reservas.
     * @param {reservaCreateManyArgs} args - Arguments to create many Reservas.
     * @example
     * // Create many Reservas
     * const reserva = await prisma.reserva.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends reservaCreateManyArgs>(args?: SelectSubset<T, reservaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reservas and returns the data saved in the database.
     * @param {reservaCreateManyAndReturnArgs} args - Arguments to create many Reservas.
     * @example
     * // Create many Reservas
     * const reserva = await prisma.reserva.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reservas and only return the `id_reserva`
     * const reservaWithId_reservaOnly = await prisma.reserva.createManyAndReturn({
     *   select: { id_reserva: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends reservaCreateManyAndReturnArgs>(args?: SelectSubset<T, reservaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reservaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Reserva.
     * @param {reservaDeleteArgs} args - Arguments to delete one Reserva.
     * @example
     * // Delete one Reserva
     * const Reserva = await prisma.reserva.delete({
     *   where: {
     *     // ... filter to delete one Reserva
     *   }
     * })
     * 
     */
    delete<T extends reservaDeleteArgs>(args: SelectSubset<T, reservaDeleteArgs<ExtArgs>>): Prisma__reservaClient<$Result.GetResult<Prisma.$reservaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Reserva.
     * @param {reservaUpdateArgs} args - Arguments to update one Reserva.
     * @example
     * // Update one Reserva
     * const reserva = await prisma.reserva.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends reservaUpdateArgs>(args: SelectSubset<T, reservaUpdateArgs<ExtArgs>>): Prisma__reservaClient<$Result.GetResult<Prisma.$reservaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reservas.
     * @param {reservaDeleteManyArgs} args - Arguments to filter Reservas to delete.
     * @example
     * // Delete a few Reservas
     * const { count } = await prisma.reserva.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends reservaDeleteManyArgs>(args?: SelectSubset<T, reservaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reservas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reservaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reservas
     * const reserva = await prisma.reserva.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends reservaUpdateManyArgs>(args: SelectSubset<T, reservaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reservas and returns the data updated in the database.
     * @param {reservaUpdateManyAndReturnArgs} args - Arguments to update many Reservas.
     * @example
     * // Update many Reservas
     * const reserva = await prisma.reserva.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reservas and only return the `id_reserva`
     * const reservaWithId_reservaOnly = await prisma.reserva.updateManyAndReturn({
     *   select: { id_reserva: true },
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
    updateManyAndReturn<T extends reservaUpdateManyAndReturnArgs>(args: SelectSubset<T, reservaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reservaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Reserva.
     * @param {reservaUpsertArgs} args - Arguments to update or create a Reserva.
     * @example
     * // Update or create a Reserva
     * const reserva = await prisma.reserva.upsert({
     *   create: {
     *     // ... data to create a Reserva
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reserva we want to update
     *   }
     * })
     */
    upsert<T extends reservaUpsertArgs>(args: SelectSubset<T, reservaUpsertArgs<ExtArgs>>): Prisma__reservaClient<$Result.GetResult<Prisma.$reservaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reservas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reservaCountArgs} args - Arguments to filter Reservas to count.
     * @example
     * // Count the number of Reservas
     * const count = await prisma.reserva.count({
     *   where: {
     *     // ... the filter for the Reservas we want to count
     *   }
     * })
    **/
    count<T extends reservaCountArgs>(
      args?: Subset<T, reservaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReservaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reserva.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReservaAggregateArgs>(args: Subset<T, ReservaAggregateArgs>): Prisma.PrismaPromise<GetReservaAggregateType<T>>

    /**
     * Group by Reserva.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reservaGroupByArgs} args - Group by arguments.
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
      T extends reservaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: reservaGroupByArgs['orderBy'] }
        : { orderBy?: reservaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, reservaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReservaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the reserva model
   */
  readonly fields: reservaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for reserva.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__reservaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cuenta_espacio<T extends reserva$cuenta_espacioArgs<ExtArgs> = {}>(args?: Subset<T, reserva$cuenta_espacioArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cuenta_espacioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cuenta_persona<T extends reserva$cuenta_personaArgs<ExtArgs> = {}>(args?: Subset<T, reserva$cuenta_personaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$cuenta_personaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    espacio<T extends espacioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, espacioDefaultArgs<ExtArgs>>): Prisma__espacioClient<$Result.GetResult<Prisma.$espacioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    huesped<T extends huespedDefaultArgs<ExtArgs> = {}>(args?: Subset<T, huespedDefaultArgs<ExtArgs>>): Prisma__huespedClient<$Result.GetResult<Prisma.$huespedPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the reserva model
   */
  interface reservaFieldRefs {
    readonly id_reserva: FieldRef<"reserva", 'Int'>
    readonly id_huesped: FieldRef<"reserva", 'Int'>
    readonly id_espacio: FieldRef<"reserva", 'Int'>
    readonly tipo_reserva: FieldRef<"reserva", 'String'>
    readonly dni_tipo: FieldRef<"reserva", 'String'>
    readonly check_in: FieldRef<"reserva", 'DateTime'>
    readonly check_out: FieldRef<"reserva", 'DateTime'>
    readonly cantidad_adultos: FieldRef<"reserva", 'Int'>
    readonly cantidad_ninos: FieldRef<"reserva", 'Int'>
    readonly fecha_evento: FieldRef<"reserva", 'DateTime'>
    readonly hora_inicio: FieldRef<"reserva", 'DateTime'>
    readonly hora_fin: FieldRef<"reserva", 'DateTime'>
    readonly estado_reserva: FieldRef<"reserva", 'String'>
    readonly monto_total: FieldRef<"reserva", 'Decimal'>
    readonly estado_pago: FieldRef<"reserva", 'String'>
    readonly metodo_pago: FieldRef<"reserva", 'String'>
    readonly monto_pagado: FieldRef<"reserva", 'Decimal'>
    readonly anotaciones: FieldRef<"reserva", 'String'>
    readonly firma: FieldRef<"reserva", 'String'>
    readonly fecha_creacion: FieldRef<"reserva", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * reserva findUnique
   */
  export type reservaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reserva
     */
    select?: reservaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reserva
     */
    omit?: reservaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservaInclude<ExtArgs> | null
    /**
     * Filter, which reserva to fetch.
     */
    where: reservaWhereUniqueInput
  }

  /**
   * reserva findUniqueOrThrow
   */
  export type reservaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reserva
     */
    select?: reservaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reserva
     */
    omit?: reservaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservaInclude<ExtArgs> | null
    /**
     * Filter, which reserva to fetch.
     */
    where: reservaWhereUniqueInput
  }

  /**
   * reserva findFirst
   */
  export type reservaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reserva
     */
    select?: reservaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reserva
     */
    omit?: reservaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservaInclude<ExtArgs> | null
    /**
     * Filter, which reserva to fetch.
     */
    where?: reservaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reservas to fetch.
     */
    orderBy?: reservaOrderByWithRelationInput | reservaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for reservas.
     */
    cursor?: reservaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reservas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reservas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of reservas.
     */
    distinct?: ReservaScalarFieldEnum | ReservaScalarFieldEnum[]
  }

  /**
   * reserva findFirstOrThrow
   */
  export type reservaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reserva
     */
    select?: reservaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reserva
     */
    omit?: reservaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservaInclude<ExtArgs> | null
    /**
     * Filter, which reserva to fetch.
     */
    where?: reservaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reservas to fetch.
     */
    orderBy?: reservaOrderByWithRelationInput | reservaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for reservas.
     */
    cursor?: reservaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reservas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reservas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of reservas.
     */
    distinct?: ReservaScalarFieldEnum | ReservaScalarFieldEnum[]
  }

  /**
   * reserva findMany
   */
  export type reservaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reserva
     */
    select?: reservaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reserva
     */
    omit?: reservaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservaInclude<ExtArgs> | null
    /**
     * Filter, which reservas to fetch.
     */
    where?: reservaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reservas to fetch.
     */
    orderBy?: reservaOrderByWithRelationInput | reservaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing reservas.
     */
    cursor?: reservaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reservas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reservas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of reservas.
     */
    distinct?: ReservaScalarFieldEnum | ReservaScalarFieldEnum[]
  }

  /**
   * reserva create
   */
  export type reservaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reserva
     */
    select?: reservaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reserva
     */
    omit?: reservaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservaInclude<ExtArgs> | null
    /**
     * The data needed to create a reserva.
     */
    data: XOR<reservaCreateInput, reservaUncheckedCreateInput>
  }

  /**
   * reserva createMany
   */
  export type reservaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many reservas.
     */
    data: reservaCreateManyInput | reservaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * reserva createManyAndReturn
   */
  export type reservaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reserva
     */
    select?: reservaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the reserva
     */
    omit?: reservaOmit<ExtArgs> | null
    /**
     * The data used to create many reservas.
     */
    data: reservaCreateManyInput | reservaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * reserva update
   */
  export type reservaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reserva
     */
    select?: reservaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reserva
     */
    omit?: reservaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservaInclude<ExtArgs> | null
    /**
     * The data needed to update a reserva.
     */
    data: XOR<reservaUpdateInput, reservaUncheckedUpdateInput>
    /**
     * Choose, which reserva to update.
     */
    where: reservaWhereUniqueInput
  }

  /**
   * reserva updateMany
   */
  export type reservaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update reservas.
     */
    data: XOR<reservaUpdateManyMutationInput, reservaUncheckedUpdateManyInput>
    /**
     * Filter which reservas to update
     */
    where?: reservaWhereInput
    /**
     * Limit how many reservas to update.
     */
    limit?: number
  }

  /**
   * reserva updateManyAndReturn
   */
  export type reservaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reserva
     */
    select?: reservaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the reserva
     */
    omit?: reservaOmit<ExtArgs> | null
    /**
     * The data used to update reservas.
     */
    data: XOR<reservaUpdateManyMutationInput, reservaUncheckedUpdateManyInput>
    /**
     * Filter which reservas to update
     */
    where?: reservaWhereInput
    /**
     * Limit how many reservas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * reserva upsert
   */
  export type reservaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reserva
     */
    select?: reservaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reserva
     */
    omit?: reservaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservaInclude<ExtArgs> | null
    /**
     * The filter to search for the reserva to update in case it exists.
     */
    where: reservaWhereUniqueInput
    /**
     * In case the reserva found by the `where` argument doesn't exist, create a new reserva with this data.
     */
    create: XOR<reservaCreateInput, reservaUncheckedCreateInput>
    /**
     * In case the reserva was found with the provided `where` argument, update it with this data.
     */
    update: XOR<reservaUpdateInput, reservaUncheckedUpdateInput>
  }

  /**
   * reserva delete
   */
  export type reservaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reserva
     */
    select?: reservaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reserva
     */
    omit?: reservaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservaInclude<ExtArgs> | null
    /**
     * Filter which reserva to delete.
     */
    where: reservaWhereUniqueInput
  }

  /**
   * reserva deleteMany
   */
  export type reservaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which reservas to delete
     */
    where?: reservaWhereInput
    /**
     * Limit how many reservas to delete.
     */
    limit?: number
  }

  /**
   * reserva.cuenta_espacio
   */
  export type reserva$cuenta_espacioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_espacio
     */
    select?: cuenta_espacioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_espacio
     */
    omit?: cuenta_espacioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_espacioInclude<ExtArgs> | null
    where?: cuenta_espacioWhereInput
    orderBy?: cuenta_espacioOrderByWithRelationInput | cuenta_espacioOrderByWithRelationInput[]
    cursor?: cuenta_espacioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Cuenta_espacioScalarFieldEnum | Cuenta_espacioScalarFieldEnum[]
  }

  /**
   * reserva.cuenta_persona
   */
  export type reserva$cuenta_personaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the cuenta_persona
     */
    select?: cuenta_personaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the cuenta_persona
     */
    omit?: cuenta_personaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: cuenta_personaInclude<ExtArgs> | null
    where?: cuenta_personaWhereInput
    orderBy?: cuenta_personaOrderByWithRelationInput | cuenta_personaOrderByWithRelationInput[]
    cursor?: cuenta_personaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Cuenta_personaScalarFieldEnum | Cuenta_personaScalarFieldEnum[]
  }

  /**
   * reserva without action
   */
  export type reservaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reserva
     */
    select?: reservaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reserva
     */
    omit?: reservaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservaInclude<ExtArgs> | null
  }


  /**
   * Model configuracion_hotel
   */

  export type AggregateConfiguracion_hotel = {
    _count: Configuracion_hotelCountAggregateOutputType | null
    _avg: Configuracion_hotelAvgAggregateOutputType | null
    _sum: Configuracion_hotelSumAggregateOutputType | null
    _min: Configuracion_hotelMinAggregateOutputType | null
    _max: Configuracion_hotelMaxAggregateOutputType | null
  }

  export type Configuracion_hotelAvgAggregateOutputType = {
    id: number | null
  }

  export type Configuracion_hotelSumAggregateOutputType = {
    id: number | null
  }

  export type Configuracion_hotelMinAggregateOutputType = {
    id: number | null
    nombre_hotel: string | null
    direccion: string | null
    telefono: string | null
    nit: string | null
    email: string | null
    ciudad: string | null
    hora_check_in: string | null
    hora_check_out: string | null
    fecha_actualizacion: Date | null
  }

  export type Configuracion_hotelMaxAggregateOutputType = {
    id: number | null
    nombre_hotel: string | null
    direccion: string | null
    telefono: string | null
    nit: string | null
    email: string | null
    ciudad: string | null
    hora_check_in: string | null
    hora_check_out: string | null
    fecha_actualizacion: Date | null
  }

  export type Configuracion_hotelCountAggregateOutputType = {
    id: number
    nombre_hotel: number
    direccion: number
    telefono: number
    nit: number
    email: number
    ciudad: number
    hora_check_in: number
    hora_check_out: number
    fecha_actualizacion: number
    _all: number
  }


  export type Configuracion_hotelAvgAggregateInputType = {
    id?: true
  }

  export type Configuracion_hotelSumAggregateInputType = {
    id?: true
  }

  export type Configuracion_hotelMinAggregateInputType = {
    id?: true
    nombre_hotel?: true
    direccion?: true
    telefono?: true
    nit?: true
    email?: true
    ciudad?: true
    hora_check_in?: true
    hora_check_out?: true
    fecha_actualizacion?: true
  }

  export type Configuracion_hotelMaxAggregateInputType = {
    id?: true
    nombre_hotel?: true
    direccion?: true
    telefono?: true
    nit?: true
    email?: true
    ciudad?: true
    hora_check_in?: true
    hora_check_out?: true
    fecha_actualizacion?: true
  }

  export type Configuracion_hotelCountAggregateInputType = {
    id?: true
    nombre_hotel?: true
    direccion?: true
    telefono?: true
    nit?: true
    email?: true
    ciudad?: true
    hora_check_in?: true
    hora_check_out?: true
    fecha_actualizacion?: true
    _all?: true
  }

  export type Configuracion_hotelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which configuracion_hotel to aggregate.
     */
    where?: configuracion_hotelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of configuracion_hotels to fetch.
     */
    orderBy?: configuracion_hotelOrderByWithRelationInput | configuracion_hotelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: configuracion_hotelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` configuracion_hotels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` configuracion_hotels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned configuracion_hotels
    **/
    _count?: true | Configuracion_hotelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Configuracion_hotelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Configuracion_hotelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Configuracion_hotelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Configuracion_hotelMaxAggregateInputType
  }

  export type GetConfiguracion_hotelAggregateType<T extends Configuracion_hotelAggregateArgs> = {
        [P in keyof T & keyof AggregateConfiguracion_hotel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConfiguracion_hotel[P]>
      : GetScalarType<T[P], AggregateConfiguracion_hotel[P]>
  }




  export type configuracion_hotelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: configuracion_hotelWhereInput
    orderBy?: configuracion_hotelOrderByWithAggregationInput | configuracion_hotelOrderByWithAggregationInput[]
    by: Configuracion_hotelScalarFieldEnum[] | Configuracion_hotelScalarFieldEnum
    having?: configuracion_hotelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Configuracion_hotelCountAggregateInputType | true
    _avg?: Configuracion_hotelAvgAggregateInputType
    _sum?: Configuracion_hotelSumAggregateInputType
    _min?: Configuracion_hotelMinAggregateInputType
    _max?: Configuracion_hotelMaxAggregateInputType
  }

  export type Configuracion_hotelGroupByOutputType = {
    id: number
    nombre_hotel: string | null
    direccion: string | null
    telefono: string | null
    nit: string | null
    email: string | null
    ciudad: string | null
    hora_check_in: string | null
    hora_check_out: string | null
    fecha_actualizacion: Date | null
    _count: Configuracion_hotelCountAggregateOutputType | null
    _avg: Configuracion_hotelAvgAggregateOutputType | null
    _sum: Configuracion_hotelSumAggregateOutputType | null
    _min: Configuracion_hotelMinAggregateOutputType | null
    _max: Configuracion_hotelMaxAggregateOutputType | null
  }

  type GetConfiguracion_hotelGroupByPayload<T extends configuracion_hotelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Configuracion_hotelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Configuracion_hotelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Configuracion_hotelGroupByOutputType[P]>
            : GetScalarType<T[P], Configuracion_hotelGroupByOutputType[P]>
        }
      >
    >


  export type configuracion_hotelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre_hotel?: boolean
    direccion?: boolean
    telefono?: boolean
    nit?: boolean
    email?: boolean
    ciudad?: boolean
    hora_check_in?: boolean
    hora_check_out?: boolean
    fecha_actualizacion?: boolean
  }, ExtArgs["result"]["configuracion_hotel"]>

  export type configuracion_hotelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre_hotel?: boolean
    direccion?: boolean
    telefono?: boolean
    nit?: boolean
    email?: boolean
    ciudad?: boolean
    hora_check_in?: boolean
    hora_check_out?: boolean
    fecha_actualizacion?: boolean
  }, ExtArgs["result"]["configuracion_hotel"]>

  export type configuracion_hotelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre_hotel?: boolean
    direccion?: boolean
    telefono?: boolean
    nit?: boolean
    email?: boolean
    ciudad?: boolean
    hora_check_in?: boolean
    hora_check_out?: boolean
    fecha_actualizacion?: boolean
  }, ExtArgs["result"]["configuracion_hotel"]>

  export type configuracion_hotelSelectScalar = {
    id?: boolean
    nombre_hotel?: boolean
    direccion?: boolean
    telefono?: boolean
    nit?: boolean
    email?: boolean
    ciudad?: boolean
    hora_check_in?: boolean
    hora_check_out?: boolean
    fecha_actualizacion?: boolean
  }

  export type configuracion_hotelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre_hotel" | "direccion" | "telefono" | "nit" | "email" | "ciudad" | "hora_check_in" | "hora_check_out" | "fecha_actualizacion", ExtArgs["result"]["configuracion_hotel"]>

  export type $configuracion_hotelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "configuracion_hotel"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre_hotel: string | null
      direccion: string | null
      telefono: string | null
      nit: string | null
      email: string | null
      ciudad: string | null
      hora_check_in: string | null
      hora_check_out: string | null
      fecha_actualizacion: Date | null
    }, ExtArgs["result"]["configuracion_hotel"]>
    composites: {}
  }

  type configuracion_hotelGetPayload<S extends boolean | null | undefined | configuracion_hotelDefaultArgs> = $Result.GetResult<Prisma.$configuracion_hotelPayload, S>

  type configuracion_hotelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<configuracion_hotelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Configuracion_hotelCountAggregateInputType | true
    }

  export interface configuracion_hotelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['configuracion_hotel'], meta: { name: 'configuracion_hotel' } }
    /**
     * Find zero or one Configuracion_hotel that matches the filter.
     * @param {configuracion_hotelFindUniqueArgs} args - Arguments to find a Configuracion_hotel
     * @example
     * // Get one Configuracion_hotel
     * const configuracion_hotel = await prisma.configuracion_hotel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends configuracion_hotelFindUniqueArgs>(args: SelectSubset<T, configuracion_hotelFindUniqueArgs<ExtArgs>>): Prisma__configuracion_hotelClient<$Result.GetResult<Prisma.$configuracion_hotelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Configuracion_hotel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {configuracion_hotelFindUniqueOrThrowArgs} args - Arguments to find a Configuracion_hotel
     * @example
     * // Get one Configuracion_hotel
     * const configuracion_hotel = await prisma.configuracion_hotel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends configuracion_hotelFindUniqueOrThrowArgs>(args: SelectSubset<T, configuracion_hotelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__configuracion_hotelClient<$Result.GetResult<Prisma.$configuracion_hotelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Configuracion_hotel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {configuracion_hotelFindFirstArgs} args - Arguments to find a Configuracion_hotel
     * @example
     * // Get one Configuracion_hotel
     * const configuracion_hotel = await prisma.configuracion_hotel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends configuracion_hotelFindFirstArgs>(args?: SelectSubset<T, configuracion_hotelFindFirstArgs<ExtArgs>>): Prisma__configuracion_hotelClient<$Result.GetResult<Prisma.$configuracion_hotelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Configuracion_hotel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {configuracion_hotelFindFirstOrThrowArgs} args - Arguments to find a Configuracion_hotel
     * @example
     * // Get one Configuracion_hotel
     * const configuracion_hotel = await prisma.configuracion_hotel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends configuracion_hotelFindFirstOrThrowArgs>(args?: SelectSubset<T, configuracion_hotelFindFirstOrThrowArgs<ExtArgs>>): Prisma__configuracion_hotelClient<$Result.GetResult<Prisma.$configuracion_hotelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Configuracion_hotels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {configuracion_hotelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Configuracion_hotels
     * const configuracion_hotels = await prisma.configuracion_hotel.findMany()
     * 
     * // Get first 10 Configuracion_hotels
     * const configuracion_hotels = await prisma.configuracion_hotel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const configuracion_hotelWithIdOnly = await prisma.configuracion_hotel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends configuracion_hotelFindManyArgs>(args?: SelectSubset<T, configuracion_hotelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$configuracion_hotelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Configuracion_hotel.
     * @param {configuracion_hotelCreateArgs} args - Arguments to create a Configuracion_hotel.
     * @example
     * // Create one Configuracion_hotel
     * const Configuracion_hotel = await prisma.configuracion_hotel.create({
     *   data: {
     *     // ... data to create a Configuracion_hotel
     *   }
     * })
     * 
     */
    create<T extends configuracion_hotelCreateArgs>(args: SelectSubset<T, configuracion_hotelCreateArgs<ExtArgs>>): Prisma__configuracion_hotelClient<$Result.GetResult<Prisma.$configuracion_hotelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Configuracion_hotels.
     * @param {configuracion_hotelCreateManyArgs} args - Arguments to create many Configuracion_hotels.
     * @example
     * // Create many Configuracion_hotels
     * const configuracion_hotel = await prisma.configuracion_hotel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends configuracion_hotelCreateManyArgs>(args?: SelectSubset<T, configuracion_hotelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Configuracion_hotels and returns the data saved in the database.
     * @param {configuracion_hotelCreateManyAndReturnArgs} args - Arguments to create many Configuracion_hotels.
     * @example
     * // Create many Configuracion_hotels
     * const configuracion_hotel = await prisma.configuracion_hotel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Configuracion_hotels and only return the `id`
     * const configuracion_hotelWithIdOnly = await prisma.configuracion_hotel.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends configuracion_hotelCreateManyAndReturnArgs>(args?: SelectSubset<T, configuracion_hotelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$configuracion_hotelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Configuracion_hotel.
     * @param {configuracion_hotelDeleteArgs} args - Arguments to delete one Configuracion_hotel.
     * @example
     * // Delete one Configuracion_hotel
     * const Configuracion_hotel = await prisma.configuracion_hotel.delete({
     *   where: {
     *     // ... filter to delete one Configuracion_hotel
     *   }
     * })
     * 
     */
    delete<T extends configuracion_hotelDeleteArgs>(args: SelectSubset<T, configuracion_hotelDeleteArgs<ExtArgs>>): Prisma__configuracion_hotelClient<$Result.GetResult<Prisma.$configuracion_hotelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Configuracion_hotel.
     * @param {configuracion_hotelUpdateArgs} args - Arguments to update one Configuracion_hotel.
     * @example
     * // Update one Configuracion_hotel
     * const configuracion_hotel = await prisma.configuracion_hotel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends configuracion_hotelUpdateArgs>(args: SelectSubset<T, configuracion_hotelUpdateArgs<ExtArgs>>): Prisma__configuracion_hotelClient<$Result.GetResult<Prisma.$configuracion_hotelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Configuracion_hotels.
     * @param {configuracion_hotelDeleteManyArgs} args - Arguments to filter Configuracion_hotels to delete.
     * @example
     * // Delete a few Configuracion_hotels
     * const { count } = await prisma.configuracion_hotel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends configuracion_hotelDeleteManyArgs>(args?: SelectSubset<T, configuracion_hotelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Configuracion_hotels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {configuracion_hotelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Configuracion_hotels
     * const configuracion_hotel = await prisma.configuracion_hotel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends configuracion_hotelUpdateManyArgs>(args: SelectSubset<T, configuracion_hotelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Configuracion_hotels and returns the data updated in the database.
     * @param {configuracion_hotelUpdateManyAndReturnArgs} args - Arguments to update many Configuracion_hotels.
     * @example
     * // Update many Configuracion_hotels
     * const configuracion_hotel = await prisma.configuracion_hotel.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Configuracion_hotels and only return the `id`
     * const configuracion_hotelWithIdOnly = await prisma.configuracion_hotel.updateManyAndReturn({
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
    updateManyAndReturn<T extends configuracion_hotelUpdateManyAndReturnArgs>(args: SelectSubset<T, configuracion_hotelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$configuracion_hotelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Configuracion_hotel.
     * @param {configuracion_hotelUpsertArgs} args - Arguments to update or create a Configuracion_hotel.
     * @example
     * // Update or create a Configuracion_hotel
     * const configuracion_hotel = await prisma.configuracion_hotel.upsert({
     *   create: {
     *     // ... data to create a Configuracion_hotel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Configuracion_hotel we want to update
     *   }
     * })
     */
    upsert<T extends configuracion_hotelUpsertArgs>(args: SelectSubset<T, configuracion_hotelUpsertArgs<ExtArgs>>): Prisma__configuracion_hotelClient<$Result.GetResult<Prisma.$configuracion_hotelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Configuracion_hotels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {configuracion_hotelCountArgs} args - Arguments to filter Configuracion_hotels to count.
     * @example
     * // Count the number of Configuracion_hotels
     * const count = await prisma.configuracion_hotel.count({
     *   where: {
     *     // ... the filter for the Configuracion_hotels we want to count
     *   }
     * })
    **/
    count<T extends configuracion_hotelCountArgs>(
      args?: Subset<T, configuracion_hotelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Configuracion_hotelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Configuracion_hotel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Configuracion_hotelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Configuracion_hotelAggregateArgs>(args: Subset<T, Configuracion_hotelAggregateArgs>): Prisma.PrismaPromise<GetConfiguracion_hotelAggregateType<T>>

    /**
     * Group by Configuracion_hotel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {configuracion_hotelGroupByArgs} args - Group by arguments.
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
      T extends configuracion_hotelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: configuracion_hotelGroupByArgs['orderBy'] }
        : { orderBy?: configuracion_hotelGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, configuracion_hotelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConfiguracion_hotelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the configuracion_hotel model
   */
  readonly fields: configuracion_hotelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for configuracion_hotel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__configuracion_hotelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the configuracion_hotel model
   */
  interface configuracion_hotelFieldRefs {
    readonly id: FieldRef<"configuracion_hotel", 'Int'>
    readonly nombre_hotel: FieldRef<"configuracion_hotel", 'String'>
    readonly direccion: FieldRef<"configuracion_hotel", 'String'>
    readonly telefono: FieldRef<"configuracion_hotel", 'String'>
    readonly nit: FieldRef<"configuracion_hotel", 'String'>
    readonly email: FieldRef<"configuracion_hotel", 'String'>
    readonly ciudad: FieldRef<"configuracion_hotel", 'String'>
    readonly hora_check_in: FieldRef<"configuracion_hotel", 'String'>
    readonly hora_check_out: FieldRef<"configuracion_hotel", 'String'>
    readonly fecha_actualizacion: FieldRef<"configuracion_hotel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * configuracion_hotel findUnique
   */
  export type configuracion_hotelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_hotel
     */
    select?: configuracion_hotelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_hotel
     */
    omit?: configuracion_hotelOmit<ExtArgs> | null
    /**
     * Filter, which configuracion_hotel to fetch.
     */
    where: configuracion_hotelWhereUniqueInput
  }

  /**
   * configuracion_hotel findUniqueOrThrow
   */
  export type configuracion_hotelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_hotel
     */
    select?: configuracion_hotelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_hotel
     */
    omit?: configuracion_hotelOmit<ExtArgs> | null
    /**
     * Filter, which configuracion_hotel to fetch.
     */
    where: configuracion_hotelWhereUniqueInput
  }

  /**
   * configuracion_hotel findFirst
   */
  export type configuracion_hotelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_hotel
     */
    select?: configuracion_hotelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_hotel
     */
    omit?: configuracion_hotelOmit<ExtArgs> | null
    /**
     * Filter, which configuracion_hotel to fetch.
     */
    where?: configuracion_hotelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of configuracion_hotels to fetch.
     */
    orderBy?: configuracion_hotelOrderByWithRelationInput | configuracion_hotelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for configuracion_hotels.
     */
    cursor?: configuracion_hotelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` configuracion_hotels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` configuracion_hotels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of configuracion_hotels.
     */
    distinct?: Configuracion_hotelScalarFieldEnum | Configuracion_hotelScalarFieldEnum[]
  }

  /**
   * configuracion_hotel findFirstOrThrow
   */
  export type configuracion_hotelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_hotel
     */
    select?: configuracion_hotelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_hotel
     */
    omit?: configuracion_hotelOmit<ExtArgs> | null
    /**
     * Filter, which configuracion_hotel to fetch.
     */
    where?: configuracion_hotelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of configuracion_hotels to fetch.
     */
    orderBy?: configuracion_hotelOrderByWithRelationInput | configuracion_hotelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for configuracion_hotels.
     */
    cursor?: configuracion_hotelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` configuracion_hotels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` configuracion_hotels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of configuracion_hotels.
     */
    distinct?: Configuracion_hotelScalarFieldEnum | Configuracion_hotelScalarFieldEnum[]
  }

  /**
   * configuracion_hotel findMany
   */
  export type configuracion_hotelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_hotel
     */
    select?: configuracion_hotelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_hotel
     */
    omit?: configuracion_hotelOmit<ExtArgs> | null
    /**
     * Filter, which configuracion_hotels to fetch.
     */
    where?: configuracion_hotelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of configuracion_hotels to fetch.
     */
    orderBy?: configuracion_hotelOrderByWithRelationInput | configuracion_hotelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing configuracion_hotels.
     */
    cursor?: configuracion_hotelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` configuracion_hotels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` configuracion_hotels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of configuracion_hotels.
     */
    distinct?: Configuracion_hotelScalarFieldEnum | Configuracion_hotelScalarFieldEnum[]
  }

  /**
   * configuracion_hotel create
   */
  export type configuracion_hotelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_hotel
     */
    select?: configuracion_hotelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_hotel
     */
    omit?: configuracion_hotelOmit<ExtArgs> | null
    /**
     * The data needed to create a configuracion_hotel.
     */
    data?: XOR<configuracion_hotelCreateInput, configuracion_hotelUncheckedCreateInput>
  }

  /**
   * configuracion_hotel createMany
   */
  export type configuracion_hotelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many configuracion_hotels.
     */
    data: configuracion_hotelCreateManyInput | configuracion_hotelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * configuracion_hotel createManyAndReturn
   */
  export type configuracion_hotelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_hotel
     */
    select?: configuracion_hotelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_hotel
     */
    omit?: configuracion_hotelOmit<ExtArgs> | null
    /**
     * The data used to create many configuracion_hotels.
     */
    data: configuracion_hotelCreateManyInput | configuracion_hotelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * configuracion_hotel update
   */
  export type configuracion_hotelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_hotel
     */
    select?: configuracion_hotelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_hotel
     */
    omit?: configuracion_hotelOmit<ExtArgs> | null
    /**
     * The data needed to update a configuracion_hotel.
     */
    data: XOR<configuracion_hotelUpdateInput, configuracion_hotelUncheckedUpdateInput>
    /**
     * Choose, which configuracion_hotel to update.
     */
    where: configuracion_hotelWhereUniqueInput
  }

  /**
   * configuracion_hotel updateMany
   */
  export type configuracion_hotelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update configuracion_hotels.
     */
    data: XOR<configuracion_hotelUpdateManyMutationInput, configuracion_hotelUncheckedUpdateManyInput>
    /**
     * Filter which configuracion_hotels to update
     */
    where?: configuracion_hotelWhereInput
    /**
     * Limit how many configuracion_hotels to update.
     */
    limit?: number
  }

  /**
   * configuracion_hotel updateManyAndReturn
   */
  export type configuracion_hotelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_hotel
     */
    select?: configuracion_hotelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_hotel
     */
    omit?: configuracion_hotelOmit<ExtArgs> | null
    /**
     * The data used to update configuracion_hotels.
     */
    data: XOR<configuracion_hotelUpdateManyMutationInput, configuracion_hotelUncheckedUpdateManyInput>
    /**
     * Filter which configuracion_hotels to update
     */
    where?: configuracion_hotelWhereInput
    /**
     * Limit how many configuracion_hotels to update.
     */
    limit?: number
  }

  /**
   * configuracion_hotel upsert
   */
  export type configuracion_hotelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_hotel
     */
    select?: configuracion_hotelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_hotel
     */
    omit?: configuracion_hotelOmit<ExtArgs> | null
    /**
     * The filter to search for the configuracion_hotel to update in case it exists.
     */
    where: configuracion_hotelWhereUniqueInput
    /**
     * In case the configuracion_hotel found by the `where` argument doesn't exist, create a new configuracion_hotel with this data.
     */
    create: XOR<configuracion_hotelCreateInput, configuracion_hotelUncheckedCreateInput>
    /**
     * In case the configuracion_hotel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<configuracion_hotelUpdateInput, configuracion_hotelUncheckedUpdateInput>
  }

  /**
   * configuracion_hotel delete
   */
  export type configuracion_hotelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_hotel
     */
    select?: configuracion_hotelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_hotel
     */
    omit?: configuracion_hotelOmit<ExtArgs> | null
    /**
     * Filter which configuracion_hotel to delete.
     */
    where: configuracion_hotelWhereUniqueInput
  }

  /**
   * configuracion_hotel deleteMany
   */
  export type configuracion_hotelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which configuracion_hotels to delete
     */
    where?: configuracion_hotelWhereInput
    /**
     * Limit how many configuracion_hotels to delete.
     */
    limit?: number
  }

  /**
   * configuracion_hotel without action
   */
  export type configuracion_hotelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the configuracion_hotel
     */
    select?: configuracion_hotelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the configuracion_hotel
     */
    omit?: configuracion_hotelOmit<ExtArgs> | null
  }


  /**
   * Model tipo_espacio_config
   */

  export type AggregateTipo_espacio_config = {
    _count: Tipo_espacio_configCountAggregateOutputType | null
    _avg: Tipo_espacio_configAvgAggregateOutputType | null
    _sum: Tipo_espacio_configSumAggregateOutputType | null
    _min: Tipo_espacio_configMinAggregateOutputType | null
    _max: Tipo_espacio_configMaxAggregateOutputType | null
  }

  export type Tipo_espacio_configAvgAggregateOutputType = {
    id: number | null
    precio_base: Decimal | null
    recargo_pareja: Decimal | null
    recargo_adicional: Decimal | null
    max_personas_adicionales: number | null
  }

  export type Tipo_espacio_configSumAggregateOutputType = {
    id: number | null
    precio_base: Decimal | null
    recargo_pareja: Decimal | null
    recargo_adicional: Decimal | null
    max_personas_adicionales: number | null
  }

  export type Tipo_espacio_configMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    precio_base: Decimal | null
    recargo_pareja: Decimal | null
    recargo_adicional: Decimal | null
    max_personas_adicionales: number | null
  }

  export type Tipo_espacio_configMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    precio_base: Decimal | null
    recargo_pareja: Decimal | null
    recargo_adicional: Decimal | null
    max_personas_adicionales: number | null
  }

  export type Tipo_espacio_configCountAggregateOutputType = {
    id: number
    nombre: number
    precio_base: number
    recargo_pareja: number
    recargo_adicional: number
    max_personas_adicionales: number
    _all: number
  }


  export type Tipo_espacio_configAvgAggregateInputType = {
    id?: true
    precio_base?: true
    recargo_pareja?: true
    recargo_adicional?: true
    max_personas_adicionales?: true
  }

  export type Tipo_espacio_configSumAggregateInputType = {
    id?: true
    precio_base?: true
    recargo_pareja?: true
    recargo_adicional?: true
    max_personas_adicionales?: true
  }

  export type Tipo_espacio_configMinAggregateInputType = {
    id?: true
    nombre?: true
    precio_base?: true
    recargo_pareja?: true
    recargo_adicional?: true
    max_personas_adicionales?: true
  }

  export type Tipo_espacio_configMaxAggregateInputType = {
    id?: true
    nombre?: true
    precio_base?: true
    recargo_pareja?: true
    recargo_adicional?: true
    max_personas_adicionales?: true
  }

  export type Tipo_espacio_configCountAggregateInputType = {
    id?: true
    nombre?: true
    precio_base?: true
    recargo_pareja?: true
    recargo_adicional?: true
    max_personas_adicionales?: true
    _all?: true
  }

  export type Tipo_espacio_configAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tipo_espacio_config to aggregate.
     */
    where?: tipo_espacio_configWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tipo_espacio_configs to fetch.
     */
    orderBy?: tipo_espacio_configOrderByWithRelationInput | tipo_espacio_configOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tipo_espacio_configWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tipo_espacio_configs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tipo_espacio_configs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tipo_espacio_configs
    **/
    _count?: true | Tipo_espacio_configCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Tipo_espacio_configAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Tipo_espacio_configSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Tipo_espacio_configMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Tipo_espacio_configMaxAggregateInputType
  }

  export type GetTipo_espacio_configAggregateType<T extends Tipo_espacio_configAggregateArgs> = {
        [P in keyof T & keyof AggregateTipo_espacio_config]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTipo_espacio_config[P]>
      : GetScalarType<T[P], AggregateTipo_espacio_config[P]>
  }




  export type tipo_espacio_configGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tipo_espacio_configWhereInput
    orderBy?: tipo_espacio_configOrderByWithAggregationInput | tipo_espacio_configOrderByWithAggregationInput[]
    by: Tipo_espacio_configScalarFieldEnum[] | Tipo_espacio_configScalarFieldEnum
    having?: tipo_espacio_configScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Tipo_espacio_configCountAggregateInputType | true
    _avg?: Tipo_espacio_configAvgAggregateInputType
    _sum?: Tipo_espacio_configSumAggregateInputType
    _min?: Tipo_espacio_configMinAggregateInputType
    _max?: Tipo_espacio_configMaxAggregateInputType
  }

  export type Tipo_espacio_configGroupByOutputType = {
    id: number
    nombre: string
    precio_base: Decimal
    recargo_pareja: Decimal
    recargo_adicional: Decimal
    max_personas_adicionales: number
    _count: Tipo_espacio_configCountAggregateOutputType | null
    _avg: Tipo_espacio_configAvgAggregateOutputType | null
    _sum: Tipo_espacio_configSumAggregateOutputType | null
    _min: Tipo_espacio_configMinAggregateOutputType | null
    _max: Tipo_espacio_configMaxAggregateOutputType | null
  }

  type GetTipo_espacio_configGroupByPayload<T extends tipo_espacio_configGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Tipo_espacio_configGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Tipo_espacio_configGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Tipo_espacio_configGroupByOutputType[P]>
            : GetScalarType<T[P], Tipo_espacio_configGroupByOutputType[P]>
        }
      >
    >


  export type tipo_espacio_configSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    precio_base?: boolean
    recargo_pareja?: boolean
    recargo_adicional?: boolean
    max_personas_adicionales?: boolean
  }, ExtArgs["result"]["tipo_espacio_config"]>

  export type tipo_espacio_configSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    precio_base?: boolean
    recargo_pareja?: boolean
    recargo_adicional?: boolean
    max_personas_adicionales?: boolean
  }, ExtArgs["result"]["tipo_espacio_config"]>

  export type tipo_espacio_configSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    precio_base?: boolean
    recargo_pareja?: boolean
    recargo_adicional?: boolean
    max_personas_adicionales?: boolean
  }, ExtArgs["result"]["tipo_espacio_config"]>

  export type tipo_espacio_configSelectScalar = {
    id?: boolean
    nombre?: boolean
    precio_base?: boolean
    recargo_pareja?: boolean
    recargo_adicional?: boolean
    max_personas_adicionales?: boolean
  }

  export type tipo_espacio_configOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "precio_base" | "recargo_pareja" | "recargo_adicional" | "max_personas_adicionales", ExtArgs["result"]["tipo_espacio_config"]>

  export type $tipo_espacio_configPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tipo_espacio_config"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
      precio_base: Prisma.Decimal
      recargo_pareja: Prisma.Decimal
      recargo_adicional: Prisma.Decimal
      max_personas_adicionales: number
    }, ExtArgs["result"]["tipo_espacio_config"]>
    composites: {}
  }

  type tipo_espacio_configGetPayload<S extends boolean | null | undefined | tipo_espacio_configDefaultArgs> = $Result.GetResult<Prisma.$tipo_espacio_configPayload, S>

  type tipo_espacio_configCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tipo_espacio_configFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Tipo_espacio_configCountAggregateInputType | true
    }

  export interface tipo_espacio_configDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tipo_espacio_config'], meta: { name: 'tipo_espacio_config' } }
    /**
     * Find zero or one Tipo_espacio_config that matches the filter.
     * @param {tipo_espacio_configFindUniqueArgs} args - Arguments to find a Tipo_espacio_config
     * @example
     * // Get one Tipo_espacio_config
     * const tipo_espacio_config = await prisma.tipo_espacio_config.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tipo_espacio_configFindUniqueArgs>(args: SelectSubset<T, tipo_espacio_configFindUniqueArgs<ExtArgs>>): Prisma__tipo_espacio_configClient<$Result.GetResult<Prisma.$tipo_espacio_configPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tipo_espacio_config that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tipo_espacio_configFindUniqueOrThrowArgs} args - Arguments to find a Tipo_espacio_config
     * @example
     * // Get one Tipo_espacio_config
     * const tipo_espacio_config = await prisma.tipo_espacio_config.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tipo_espacio_configFindUniqueOrThrowArgs>(args: SelectSubset<T, tipo_espacio_configFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tipo_espacio_configClient<$Result.GetResult<Prisma.$tipo_espacio_configPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tipo_espacio_config that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tipo_espacio_configFindFirstArgs} args - Arguments to find a Tipo_espacio_config
     * @example
     * // Get one Tipo_espacio_config
     * const tipo_espacio_config = await prisma.tipo_espacio_config.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tipo_espacio_configFindFirstArgs>(args?: SelectSubset<T, tipo_espacio_configFindFirstArgs<ExtArgs>>): Prisma__tipo_espacio_configClient<$Result.GetResult<Prisma.$tipo_espacio_configPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tipo_espacio_config that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tipo_espacio_configFindFirstOrThrowArgs} args - Arguments to find a Tipo_espacio_config
     * @example
     * // Get one Tipo_espacio_config
     * const tipo_espacio_config = await prisma.tipo_espacio_config.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tipo_espacio_configFindFirstOrThrowArgs>(args?: SelectSubset<T, tipo_espacio_configFindFirstOrThrowArgs<ExtArgs>>): Prisma__tipo_espacio_configClient<$Result.GetResult<Prisma.$tipo_espacio_configPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tipo_espacio_configs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tipo_espacio_configFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tipo_espacio_configs
     * const tipo_espacio_configs = await prisma.tipo_espacio_config.findMany()
     * 
     * // Get first 10 Tipo_espacio_configs
     * const tipo_espacio_configs = await prisma.tipo_espacio_config.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tipo_espacio_configWithIdOnly = await prisma.tipo_espacio_config.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends tipo_espacio_configFindManyArgs>(args?: SelectSubset<T, tipo_espacio_configFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tipo_espacio_configPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tipo_espacio_config.
     * @param {tipo_espacio_configCreateArgs} args - Arguments to create a Tipo_espacio_config.
     * @example
     * // Create one Tipo_espacio_config
     * const Tipo_espacio_config = await prisma.tipo_espacio_config.create({
     *   data: {
     *     // ... data to create a Tipo_espacio_config
     *   }
     * })
     * 
     */
    create<T extends tipo_espacio_configCreateArgs>(args: SelectSubset<T, tipo_espacio_configCreateArgs<ExtArgs>>): Prisma__tipo_espacio_configClient<$Result.GetResult<Prisma.$tipo_espacio_configPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tipo_espacio_configs.
     * @param {tipo_espacio_configCreateManyArgs} args - Arguments to create many Tipo_espacio_configs.
     * @example
     * // Create many Tipo_espacio_configs
     * const tipo_espacio_config = await prisma.tipo_espacio_config.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tipo_espacio_configCreateManyArgs>(args?: SelectSubset<T, tipo_espacio_configCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tipo_espacio_configs and returns the data saved in the database.
     * @param {tipo_espacio_configCreateManyAndReturnArgs} args - Arguments to create many Tipo_espacio_configs.
     * @example
     * // Create many Tipo_espacio_configs
     * const tipo_espacio_config = await prisma.tipo_espacio_config.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tipo_espacio_configs and only return the `id`
     * const tipo_espacio_configWithIdOnly = await prisma.tipo_espacio_config.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends tipo_espacio_configCreateManyAndReturnArgs>(args?: SelectSubset<T, tipo_espacio_configCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tipo_espacio_configPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tipo_espacio_config.
     * @param {tipo_espacio_configDeleteArgs} args - Arguments to delete one Tipo_espacio_config.
     * @example
     * // Delete one Tipo_espacio_config
     * const Tipo_espacio_config = await prisma.tipo_espacio_config.delete({
     *   where: {
     *     // ... filter to delete one Tipo_espacio_config
     *   }
     * })
     * 
     */
    delete<T extends tipo_espacio_configDeleteArgs>(args: SelectSubset<T, tipo_espacio_configDeleteArgs<ExtArgs>>): Prisma__tipo_espacio_configClient<$Result.GetResult<Prisma.$tipo_espacio_configPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tipo_espacio_config.
     * @param {tipo_espacio_configUpdateArgs} args - Arguments to update one Tipo_espacio_config.
     * @example
     * // Update one Tipo_espacio_config
     * const tipo_espacio_config = await prisma.tipo_espacio_config.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tipo_espacio_configUpdateArgs>(args: SelectSubset<T, tipo_espacio_configUpdateArgs<ExtArgs>>): Prisma__tipo_espacio_configClient<$Result.GetResult<Prisma.$tipo_espacio_configPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tipo_espacio_configs.
     * @param {tipo_espacio_configDeleteManyArgs} args - Arguments to filter Tipo_espacio_configs to delete.
     * @example
     * // Delete a few Tipo_espacio_configs
     * const { count } = await prisma.tipo_espacio_config.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tipo_espacio_configDeleteManyArgs>(args?: SelectSubset<T, tipo_espacio_configDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tipo_espacio_configs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tipo_espacio_configUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tipo_espacio_configs
     * const tipo_espacio_config = await prisma.tipo_espacio_config.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tipo_espacio_configUpdateManyArgs>(args: SelectSubset<T, tipo_espacio_configUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tipo_espacio_configs and returns the data updated in the database.
     * @param {tipo_espacio_configUpdateManyAndReturnArgs} args - Arguments to update many Tipo_espacio_configs.
     * @example
     * // Update many Tipo_espacio_configs
     * const tipo_espacio_config = await prisma.tipo_espacio_config.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tipo_espacio_configs and only return the `id`
     * const tipo_espacio_configWithIdOnly = await prisma.tipo_espacio_config.updateManyAndReturn({
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
    updateManyAndReturn<T extends tipo_espacio_configUpdateManyAndReturnArgs>(args: SelectSubset<T, tipo_espacio_configUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tipo_espacio_configPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tipo_espacio_config.
     * @param {tipo_espacio_configUpsertArgs} args - Arguments to update or create a Tipo_espacio_config.
     * @example
     * // Update or create a Tipo_espacio_config
     * const tipo_espacio_config = await prisma.tipo_espacio_config.upsert({
     *   create: {
     *     // ... data to create a Tipo_espacio_config
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tipo_espacio_config we want to update
     *   }
     * })
     */
    upsert<T extends tipo_espacio_configUpsertArgs>(args: SelectSubset<T, tipo_espacio_configUpsertArgs<ExtArgs>>): Prisma__tipo_espacio_configClient<$Result.GetResult<Prisma.$tipo_espacio_configPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tipo_espacio_configs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tipo_espacio_configCountArgs} args - Arguments to filter Tipo_espacio_configs to count.
     * @example
     * // Count the number of Tipo_espacio_configs
     * const count = await prisma.tipo_espacio_config.count({
     *   where: {
     *     // ... the filter for the Tipo_espacio_configs we want to count
     *   }
     * })
    **/
    count<T extends tipo_espacio_configCountArgs>(
      args?: Subset<T, tipo_espacio_configCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Tipo_espacio_configCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tipo_espacio_config.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Tipo_espacio_configAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Tipo_espacio_configAggregateArgs>(args: Subset<T, Tipo_espacio_configAggregateArgs>): Prisma.PrismaPromise<GetTipo_espacio_configAggregateType<T>>

    /**
     * Group by Tipo_espacio_config.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tipo_espacio_configGroupByArgs} args - Group by arguments.
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
      T extends tipo_espacio_configGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tipo_espacio_configGroupByArgs['orderBy'] }
        : { orderBy?: tipo_espacio_configGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, tipo_espacio_configGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTipo_espacio_configGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tipo_espacio_config model
   */
  readonly fields: tipo_espacio_configFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tipo_espacio_config.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tipo_espacio_configClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the tipo_espacio_config model
   */
  interface tipo_espacio_configFieldRefs {
    readonly id: FieldRef<"tipo_espacio_config", 'Int'>
    readonly nombre: FieldRef<"tipo_espacio_config", 'String'>
    readonly precio_base: FieldRef<"tipo_espacio_config", 'Decimal'>
    readonly recargo_pareja: FieldRef<"tipo_espacio_config", 'Decimal'>
    readonly recargo_adicional: FieldRef<"tipo_espacio_config", 'Decimal'>
    readonly max_personas_adicionales: FieldRef<"tipo_espacio_config", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * tipo_espacio_config findUnique
   */
  export type tipo_espacio_configFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipo_espacio_config
     */
    select?: tipo_espacio_configSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipo_espacio_config
     */
    omit?: tipo_espacio_configOmit<ExtArgs> | null
    /**
     * Filter, which tipo_espacio_config to fetch.
     */
    where: tipo_espacio_configWhereUniqueInput
  }

  /**
   * tipo_espacio_config findUniqueOrThrow
   */
  export type tipo_espacio_configFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipo_espacio_config
     */
    select?: tipo_espacio_configSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipo_espacio_config
     */
    omit?: tipo_espacio_configOmit<ExtArgs> | null
    /**
     * Filter, which tipo_espacio_config to fetch.
     */
    where: tipo_espacio_configWhereUniqueInput
  }

  /**
   * tipo_espacio_config findFirst
   */
  export type tipo_espacio_configFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipo_espacio_config
     */
    select?: tipo_espacio_configSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipo_espacio_config
     */
    omit?: tipo_espacio_configOmit<ExtArgs> | null
    /**
     * Filter, which tipo_espacio_config to fetch.
     */
    where?: tipo_espacio_configWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tipo_espacio_configs to fetch.
     */
    orderBy?: tipo_espacio_configOrderByWithRelationInput | tipo_espacio_configOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tipo_espacio_configs.
     */
    cursor?: tipo_espacio_configWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tipo_espacio_configs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tipo_espacio_configs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tipo_espacio_configs.
     */
    distinct?: Tipo_espacio_configScalarFieldEnum | Tipo_espacio_configScalarFieldEnum[]
  }

  /**
   * tipo_espacio_config findFirstOrThrow
   */
  export type tipo_espacio_configFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipo_espacio_config
     */
    select?: tipo_espacio_configSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipo_espacio_config
     */
    omit?: tipo_espacio_configOmit<ExtArgs> | null
    /**
     * Filter, which tipo_espacio_config to fetch.
     */
    where?: tipo_espacio_configWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tipo_espacio_configs to fetch.
     */
    orderBy?: tipo_espacio_configOrderByWithRelationInput | tipo_espacio_configOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tipo_espacio_configs.
     */
    cursor?: tipo_espacio_configWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tipo_espacio_configs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tipo_espacio_configs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tipo_espacio_configs.
     */
    distinct?: Tipo_espacio_configScalarFieldEnum | Tipo_espacio_configScalarFieldEnum[]
  }

  /**
   * tipo_espacio_config findMany
   */
  export type tipo_espacio_configFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipo_espacio_config
     */
    select?: tipo_espacio_configSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipo_espacio_config
     */
    omit?: tipo_espacio_configOmit<ExtArgs> | null
    /**
     * Filter, which tipo_espacio_configs to fetch.
     */
    where?: tipo_espacio_configWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tipo_espacio_configs to fetch.
     */
    orderBy?: tipo_espacio_configOrderByWithRelationInput | tipo_espacio_configOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tipo_espacio_configs.
     */
    cursor?: tipo_espacio_configWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tipo_espacio_configs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tipo_espacio_configs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tipo_espacio_configs.
     */
    distinct?: Tipo_espacio_configScalarFieldEnum | Tipo_espacio_configScalarFieldEnum[]
  }

  /**
   * tipo_espacio_config create
   */
  export type tipo_espacio_configCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipo_espacio_config
     */
    select?: tipo_espacio_configSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipo_espacio_config
     */
    omit?: tipo_espacio_configOmit<ExtArgs> | null
    /**
     * The data needed to create a tipo_espacio_config.
     */
    data: XOR<tipo_espacio_configCreateInput, tipo_espacio_configUncheckedCreateInput>
  }

  /**
   * tipo_espacio_config createMany
   */
  export type tipo_espacio_configCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tipo_espacio_configs.
     */
    data: tipo_espacio_configCreateManyInput | tipo_espacio_configCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tipo_espacio_config createManyAndReturn
   */
  export type tipo_espacio_configCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipo_espacio_config
     */
    select?: tipo_espacio_configSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tipo_espacio_config
     */
    omit?: tipo_espacio_configOmit<ExtArgs> | null
    /**
     * The data used to create many tipo_espacio_configs.
     */
    data: tipo_espacio_configCreateManyInput | tipo_espacio_configCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tipo_espacio_config update
   */
  export type tipo_espacio_configUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipo_espacio_config
     */
    select?: tipo_espacio_configSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipo_espacio_config
     */
    omit?: tipo_espacio_configOmit<ExtArgs> | null
    /**
     * The data needed to update a tipo_espacio_config.
     */
    data: XOR<tipo_espacio_configUpdateInput, tipo_espacio_configUncheckedUpdateInput>
    /**
     * Choose, which tipo_espacio_config to update.
     */
    where: tipo_espacio_configWhereUniqueInput
  }

  /**
   * tipo_espacio_config updateMany
   */
  export type tipo_espacio_configUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tipo_espacio_configs.
     */
    data: XOR<tipo_espacio_configUpdateManyMutationInput, tipo_espacio_configUncheckedUpdateManyInput>
    /**
     * Filter which tipo_espacio_configs to update
     */
    where?: tipo_espacio_configWhereInput
    /**
     * Limit how many tipo_espacio_configs to update.
     */
    limit?: number
  }

  /**
   * tipo_espacio_config updateManyAndReturn
   */
  export type tipo_espacio_configUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipo_espacio_config
     */
    select?: tipo_espacio_configSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tipo_espacio_config
     */
    omit?: tipo_espacio_configOmit<ExtArgs> | null
    /**
     * The data used to update tipo_espacio_configs.
     */
    data: XOR<tipo_espacio_configUpdateManyMutationInput, tipo_espacio_configUncheckedUpdateManyInput>
    /**
     * Filter which tipo_espacio_configs to update
     */
    where?: tipo_espacio_configWhereInput
    /**
     * Limit how many tipo_espacio_configs to update.
     */
    limit?: number
  }

  /**
   * tipo_espacio_config upsert
   */
  export type tipo_espacio_configUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipo_espacio_config
     */
    select?: tipo_espacio_configSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipo_espacio_config
     */
    omit?: tipo_espacio_configOmit<ExtArgs> | null
    /**
     * The filter to search for the tipo_espacio_config to update in case it exists.
     */
    where: tipo_espacio_configWhereUniqueInput
    /**
     * In case the tipo_espacio_config found by the `where` argument doesn't exist, create a new tipo_espacio_config with this data.
     */
    create: XOR<tipo_espacio_configCreateInput, tipo_espacio_configUncheckedCreateInput>
    /**
     * In case the tipo_espacio_config was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tipo_espacio_configUpdateInput, tipo_espacio_configUncheckedUpdateInput>
  }

  /**
   * tipo_espacio_config delete
   */
  export type tipo_espacio_configDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipo_espacio_config
     */
    select?: tipo_espacio_configSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipo_espacio_config
     */
    omit?: tipo_espacio_configOmit<ExtArgs> | null
    /**
     * Filter which tipo_espacio_config to delete.
     */
    where: tipo_espacio_configWhereUniqueInput
  }

  /**
   * tipo_espacio_config deleteMany
   */
  export type tipo_espacio_configDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tipo_espacio_configs to delete
     */
    where?: tipo_espacio_configWhereInput
    /**
     * Limit how many tipo_espacio_configs to delete.
     */
    limit?: number
  }

  /**
   * tipo_espacio_config without action
   */
  export type tipo_espacio_configDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tipo_espacio_config
     */
    select?: tipo_espacio_configSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tipo_espacio_config
     */
    omit?: tipo_espacio_configOmit<ExtArgs> | null
  }


  /**
   * Model categoria_inventario
   */

  export type AggregateCategoria_inventario = {
    _count: Categoria_inventarioCountAggregateOutputType | null
    _avg: Categoria_inventarioAvgAggregateOutputType | null
    _sum: Categoria_inventarioSumAggregateOutputType | null
    _min: Categoria_inventarioMinAggregateOutputType | null
    _max: Categoria_inventarioMaxAggregateOutputType | null
  }

  export type Categoria_inventarioAvgAggregateOutputType = {
    id_categoria: number | null
  }

  export type Categoria_inventarioSumAggregateOutputType = {
    id_categoria: number | null
  }

  export type Categoria_inventarioMinAggregateOutputType = {
    id_categoria: number | null
    nombre: string | null
    activo: boolean | null
    fecha_creacion: Date | null
  }

  export type Categoria_inventarioMaxAggregateOutputType = {
    id_categoria: number | null
    nombre: string | null
    activo: boolean | null
    fecha_creacion: Date | null
  }

  export type Categoria_inventarioCountAggregateOutputType = {
    id_categoria: number
    nombre: number
    activo: number
    fecha_creacion: number
    _all: number
  }


  export type Categoria_inventarioAvgAggregateInputType = {
    id_categoria?: true
  }

  export type Categoria_inventarioSumAggregateInputType = {
    id_categoria?: true
  }

  export type Categoria_inventarioMinAggregateInputType = {
    id_categoria?: true
    nombre?: true
    activo?: true
    fecha_creacion?: true
  }

  export type Categoria_inventarioMaxAggregateInputType = {
    id_categoria?: true
    nombre?: true
    activo?: true
    fecha_creacion?: true
  }

  export type Categoria_inventarioCountAggregateInputType = {
    id_categoria?: true
    nombre?: true
    activo?: true
    fecha_creacion?: true
    _all?: true
  }

  export type Categoria_inventarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which categoria_inventario to aggregate.
     */
    where?: categoria_inventarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categoria_inventarios to fetch.
     */
    orderBy?: categoria_inventarioOrderByWithRelationInput | categoria_inventarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: categoria_inventarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categoria_inventarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categoria_inventarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned categoria_inventarios
    **/
    _count?: true | Categoria_inventarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Categoria_inventarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Categoria_inventarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Categoria_inventarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Categoria_inventarioMaxAggregateInputType
  }

  export type GetCategoria_inventarioAggregateType<T extends Categoria_inventarioAggregateArgs> = {
        [P in keyof T & keyof AggregateCategoria_inventario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategoria_inventario[P]>
      : GetScalarType<T[P], AggregateCategoria_inventario[P]>
  }




  export type categoria_inventarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: categoria_inventarioWhereInput
    orderBy?: categoria_inventarioOrderByWithAggregationInput | categoria_inventarioOrderByWithAggregationInput[]
    by: Categoria_inventarioScalarFieldEnum[] | Categoria_inventarioScalarFieldEnum
    having?: categoria_inventarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Categoria_inventarioCountAggregateInputType | true
    _avg?: Categoria_inventarioAvgAggregateInputType
    _sum?: Categoria_inventarioSumAggregateInputType
    _min?: Categoria_inventarioMinAggregateInputType
    _max?: Categoria_inventarioMaxAggregateInputType
  }

  export type Categoria_inventarioGroupByOutputType = {
    id_categoria: number
    nombre: string
    activo: boolean
    fecha_creacion: Date
    _count: Categoria_inventarioCountAggregateOutputType | null
    _avg: Categoria_inventarioAvgAggregateOutputType | null
    _sum: Categoria_inventarioSumAggregateOutputType | null
    _min: Categoria_inventarioMinAggregateOutputType | null
    _max: Categoria_inventarioMaxAggregateOutputType | null
  }

  type GetCategoria_inventarioGroupByPayload<T extends categoria_inventarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Categoria_inventarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Categoria_inventarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Categoria_inventarioGroupByOutputType[P]>
            : GetScalarType<T[P], Categoria_inventarioGroupByOutputType[P]>
        }
      >
    >


  export type categoria_inventarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_categoria?: boolean
    nombre?: boolean
    activo?: boolean
    fecha_creacion?: boolean
  }, ExtArgs["result"]["categoria_inventario"]>

  export type categoria_inventarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_categoria?: boolean
    nombre?: boolean
    activo?: boolean
    fecha_creacion?: boolean
  }, ExtArgs["result"]["categoria_inventario"]>

  export type categoria_inventarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_categoria?: boolean
    nombre?: boolean
    activo?: boolean
    fecha_creacion?: boolean
  }, ExtArgs["result"]["categoria_inventario"]>

  export type categoria_inventarioSelectScalar = {
    id_categoria?: boolean
    nombre?: boolean
    activo?: boolean
    fecha_creacion?: boolean
  }

  export type categoria_inventarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_categoria" | "nombre" | "activo" | "fecha_creacion", ExtArgs["result"]["categoria_inventario"]>

  export type $categoria_inventarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "categoria_inventario"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id_categoria: number
      nombre: string
      activo: boolean
      fecha_creacion: Date
    }, ExtArgs["result"]["categoria_inventario"]>
    composites: {}
  }

  type categoria_inventarioGetPayload<S extends boolean | null | undefined | categoria_inventarioDefaultArgs> = $Result.GetResult<Prisma.$categoria_inventarioPayload, S>

  type categoria_inventarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<categoria_inventarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Categoria_inventarioCountAggregateInputType | true
    }

  export interface categoria_inventarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['categoria_inventario'], meta: { name: 'categoria_inventario' } }
    /**
     * Find zero or one Categoria_inventario that matches the filter.
     * @param {categoria_inventarioFindUniqueArgs} args - Arguments to find a Categoria_inventario
     * @example
     * // Get one Categoria_inventario
     * const categoria_inventario = await prisma.categoria_inventario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends categoria_inventarioFindUniqueArgs>(args: SelectSubset<T, categoria_inventarioFindUniqueArgs<ExtArgs>>): Prisma__categoria_inventarioClient<$Result.GetResult<Prisma.$categoria_inventarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Categoria_inventario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {categoria_inventarioFindUniqueOrThrowArgs} args - Arguments to find a Categoria_inventario
     * @example
     * // Get one Categoria_inventario
     * const categoria_inventario = await prisma.categoria_inventario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends categoria_inventarioFindUniqueOrThrowArgs>(args: SelectSubset<T, categoria_inventarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__categoria_inventarioClient<$Result.GetResult<Prisma.$categoria_inventarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categoria_inventario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoria_inventarioFindFirstArgs} args - Arguments to find a Categoria_inventario
     * @example
     * // Get one Categoria_inventario
     * const categoria_inventario = await prisma.categoria_inventario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends categoria_inventarioFindFirstArgs>(args?: SelectSubset<T, categoria_inventarioFindFirstArgs<ExtArgs>>): Prisma__categoria_inventarioClient<$Result.GetResult<Prisma.$categoria_inventarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categoria_inventario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoria_inventarioFindFirstOrThrowArgs} args - Arguments to find a Categoria_inventario
     * @example
     * // Get one Categoria_inventario
     * const categoria_inventario = await prisma.categoria_inventario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends categoria_inventarioFindFirstOrThrowArgs>(args?: SelectSubset<T, categoria_inventarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__categoria_inventarioClient<$Result.GetResult<Prisma.$categoria_inventarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categoria_inventarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoria_inventarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categoria_inventarios
     * const categoria_inventarios = await prisma.categoria_inventario.findMany()
     * 
     * // Get first 10 Categoria_inventarios
     * const categoria_inventarios = await prisma.categoria_inventario.findMany({ take: 10 })
     * 
     * // Only select the `id_categoria`
     * const categoria_inventarioWithId_categoriaOnly = await prisma.categoria_inventario.findMany({ select: { id_categoria: true } })
     * 
     */
    findMany<T extends categoria_inventarioFindManyArgs>(args?: SelectSubset<T, categoria_inventarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoria_inventarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Categoria_inventario.
     * @param {categoria_inventarioCreateArgs} args - Arguments to create a Categoria_inventario.
     * @example
     * // Create one Categoria_inventario
     * const Categoria_inventario = await prisma.categoria_inventario.create({
     *   data: {
     *     // ... data to create a Categoria_inventario
     *   }
     * })
     * 
     */
    create<T extends categoria_inventarioCreateArgs>(args: SelectSubset<T, categoria_inventarioCreateArgs<ExtArgs>>): Prisma__categoria_inventarioClient<$Result.GetResult<Prisma.$categoria_inventarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categoria_inventarios.
     * @param {categoria_inventarioCreateManyArgs} args - Arguments to create many Categoria_inventarios.
     * @example
     * // Create many Categoria_inventarios
     * const categoria_inventario = await prisma.categoria_inventario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends categoria_inventarioCreateManyArgs>(args?: SelectSubset<T, categoria_inventarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categoria_inventarios and returns the data saved in the database.
     * @param {categoria_inventarioCreateManyAndReturnArgs} args - Arguments to create many Categoria_inventarios.
     * @example
     * // Create many Categoria_inventarios
     * const categoria_inventario = await prisma.categoria_inventario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categoria_inventarios and only return the `id_categoria`
     * const categoria_inventarioWithId_categoriaOnly = await prisma.categoria_inventario.createManyAndReturn({
     *   select: { id_categoria: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends categoria_inventarioCreateManyAndReturnArgs>(args?: SelectSubset<T, categoria_inventarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoria_inventarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Categoria_inventario.
     * @param {categoria_inventarioDeleteArgs} args - Arguments to delete one Categoria_inventario.
     * @example
     * // Delete one Categoria_inventario
     * const Categoria_inventario = await prisma.categoria_inventario.delete({
     *   where: {
     *     // ... filter to delete one Categoria_inventario
     *   }
     * })
     * 
     */
    delete<T extends categoria_inventarioDeleteArgs>(args: SelectSubset<T, categoria_inventarioDeleteArgs<ExtArgs>>): Prisma__categoria_inventarioClient<$Result.GetResult<Prisma.$categoria_inventarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Categoria_inventario.
     * @param {categoria_inventarioUpdateArgs} args - Arguments to update one Categoria_inventario.
     * @example
     * // Update one Categoria_inventario
     * const categoria_inventario = await prisma.categoria_inventario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends categoria_inventarioUpdateArgs>(args: SelectSubset<T, categoria_inventarioUpdateArgs<ExtArgs>>): Prisma__categoria_inventarioClient<$Result.GetResult<Prisma.$categoria_inventarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categoria_inventarios.
     * @param {categoria_inventarioDeleteManyArgs} args - Arguments to filter Categoria_inventarios to delete.
     * @example
     * // Delete a few Categoria_inventarios
     * const { count } = await prisma.categoria_inventario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends categoria_inventarioDeleteManyArgs>(args?: SelectSubset<T, categoria_inventarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categoria_inventarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoria_inventarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categoria_inventarios
     * const categoria_inventario = await prisma.categoria_inventario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends categoria_inventarioUpdateManyArgs>(args: SelectSubset<T, categoria_inventarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categoria_inventarios and returns the data updated in the database.
     * @param {categoria_inventarioUpdateManyAndReturnArgs} args - Arguments to update many Categoria_inventarios.
     * @example
     * // Update many Categoria_inventarios
     * const categoria_inventario = await prisma.categoria_inventario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categoria_inventarios and only return the `id_categoria`
     * const categoria_inventarioWithId_categoriaOnly = await prisma.categoria_inventario.updateManyAndReturn({
     *   select: { id_categoria: true },
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
    updateManyAndReturn<T extends categoria_inventarioUpdateManyAndReturnArgs>(args: SelectSubset<T, categoria_inventarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoria_inventarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Categoria_inventario.
     * @param {categoria_inventarioUpsertArgs} args - Arguments to update or create a Categoria_inventario.
     * @example
     * // Update or create a Categoria_inventario
     * const categoria_inventario = await prisma.categoria_inventario.upsert({
     *   create: {
     *     // ... data to create a Categoria_inventario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Categoria_inventario we want to update
     *   }
     * })
     */
    upsert<T extends categoria_inventarioUpsertArgs>(args: SelectSubset<T, categoria_inventarioUpsertArgs<ExtArgs>>): Prisma__categoria_inventarioClient<$Result.GetResult<Prisma.$categoria_inventarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categoria_inventarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoria_inventarioCountArgs} args - Arguments to filter Categoria_inventarios to count.
     * @example
     * // Count the number of Categoria_inventarios
     * const count = await prisma.categoria_inventario.count({
     *   where: {
     *     // ... the filter for the Categoria_inventarios we want to count
     *   }
     * })
    **/
    count<T extends categoria_inventarioCountArgs>(
      args?: Subset<T, categoria_inventarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Categoria_inventarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Categoria_inventario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Categoria_inventarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Categoria_inventarioAggregateArgs>(args: Subset<T, Categoria_inventarioAggregateArgs>): Prisma.PrismaPromise<GetCategoria_inventarioAggregateType<T>>

    /**
     * Group by Categoria_inventario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoria_inventarioGroupByArgs} args - Group by arguments.
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
      T extends categoria_inventarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: categoria_inventarioGroupByArgs['orderBy'] }
        : { orderBy?: categoria_inventarioGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, categoria_inventarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoria_inventarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the categoria_inventario model
   */
  readonly fields: categoria_inventarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for categoria_inventario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__categoria_inventarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the categoria_inventario model
   */
  interface categoria_inventarioFieldRefs {
    readonly id_categoria: FieldRef<"categoria_inventario", 'Int'>
    readonly nombre: FieldRef<"categoria_inventario", 'String'>
    readonly activo: FieldRef<"categoria_inventario", 'Boolean'>
    readonly fecha_creacion: FieldRef<"categoria_inventario", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * categoria_inventario findUnique
   */
  export type categoria_inventarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria_inventario
     */
    select?: categoria_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria_inventario
     */
    omit?: categoria_inventarioOmit<ExtArgs> | null
    /**
     * Filter, which categoria_inventario to fetch.
     */
    where: categoria_inventarioWhereUniqueInput
  }

  /**
   * categoria_inventario findUniqueOrThrow
   */
  export type categoria_inventarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria_inventario
     */
    select?: categoria_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria_inventario
     */
    omit?: categoria_inventarioOmit<ExtArgs> | null
    /**
     * Filter, which categoria_inventario to fetch.
     */
    where: categoria_inventarioWhereUniqueInput
  }

  /**
   * categoria_inventario findFirst
   */
  export type categoria_inventarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria_inventario
     */
    select?: categoria_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria_inventario
     */
    omit?: categoria_inventarioOmit<ExtArgs> | null
    /**
     * Filter, which categoria_inventario to fetch.
     */
    where?: categoria_inventarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categoria_inventarios to fetch.
     */
    orderBy?: categoria_inventarioOrderByWithRelationInput | categoria_inventarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categoria_inventarios.
     */
    cursor?: categoria_inventarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categoria_inventarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categoria_inventarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categoria_inventarios.
     */
    distinct?: Categoria_inventarioScalarFieldEnum | Categoria_inventarioScalarFieldEnum[]
  }

  /**
   * categoria_inventario findFirstOrThrow
   */
  export type categoria_inventarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria_inventario
     */
    select?: categoria_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria_inventario
     */
    omit?: categoria_inventarioOmit<ExtArgs> | null
    /**
     * Filter, which categoria_inventario to fetch.
     */
    where?: categoria_inventarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categoria_inventarios to fetch.
     */
    orderBy?: categoria_inventarioOrderByWithRelationInput | categoria_inventarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categoria_inventarios.
     */
    cursor?: categoria_inventarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categoria_inventarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categoria_inventarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categoria_inventarios.
     */
    distinct?: Categoria_inventarioScalarFieldEnum | Categoria_inventarioScalarFieldEnum[]
  }

  /**
   * categoria_inventario findMany
   */
  export type categoria_inventarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria_inventario
     */
    select?: categoria_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria_inventario
     */
    omit?: categoria_inventarioOmit<ExtArgs> | null
    /**
     * Filter, which categoria_inventarios to fetch.
     */
    where?: categoria_inventarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categoria_inventarios to fetch.
     */
    orderBy?: categoria_inventarioOrderByWithRelationInput | categoria_inventarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing categoria_inventarios.
     */
    cursor?: categoria_inventarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categoria_inventarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categoria_inventarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categoria_inventarios.
     */
    distinct?: Categoria_inventarioScalarFieldEnum | Categoria_inventarioScalarFieldEnum[]
  }

  /**
   * categoria_inventario create
   */
  export type categoria_inventarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria_inventario
     */
    select?: categoria_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria_inventario
     */
    omit?: categoria_inventarioOmit<ExtArgs> | null
    /**
     * The data needed to create a categoria_inventario.
     */
    data: XOR<categoria_inventarioCreateInput, categoria_inventarioUncheckedCreateInput>
  }

  /**
   * categoria_inventario createMany
   */
  export type categoria_inventarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many categoria_inventarios.
     */
    data: categoria_inventarioCreateManyInput | categoria_inventarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * categoria_inventario createManyAndReturn
   */
  export type categoria_inventarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria_inventario
     */
    select?: categoria_inventarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the categoria_inventario
     */
    omit?: categoria_inventarioOmit<ExtArgs> | null
    /**
     * The data used to create many categoria_inventarios.
     */
    data: categoria_inventarioCreateManyInput | categoria_inventarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * categoria_inventario update
   */
  export type categoria_inventarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria_inventario
     */
    select?: categoria_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria_inventario
     */
    omit?: categoria_inventarioOmit<ExtArgs> | null
    /**
     * The data needed to update a categoria_inventario.
     */
    data: XOR<categoria_inventarioUpdateInput, categoria_inventarioUncheckedUpdateInput>
    /**
     * Choose, which categoria_inventario to update.
     */
    where: categoria_inventarioWhereUniqueInput
  }

  /**
   * categoria_inventario updateMany
   */
  export type categoria_inventarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update categoria_inventarios.
     */
    data: XOR<categoria_inventarioUpdateManyMutationInput, categoria_inventarioUncheckedUpdateManyInput>
    /**
     * Filter which categoria_inventarios to update
     */
    where?: categoria_inventarioWhereInput
    /**
     * Limit how many categoria_inventarios to update.
     */
    limit?: number
  }

  /**
   * categoria_inventario updateManyAndReturn
   */
  export type categoria_inventarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria_inventario
     */
    select?: categoria_inventarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the categoria_inventario
     */
    omit?: categoria_inventarioOmit<ExtArgs> | null
    /**
     * The data used to update categoria_inventarios.
     */
    data: XOR<categoria_inventarioUpdateManyMutationInput, categoria_inventarioUncheckedUpdateManyInput>
    /**
     * Filter which categoria_inventarios to update
     */
    where?: categoria_inventarioWhereInput
    /**
     * Limit how many categoria_inventarios to update.
     */
    limit?: number
  }

  /**
   * categoria_inventario upsert
   */
  export type categoria_inventarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria_inventario
     */
    select?: categoria_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria_inventario
     */
    omit?: categoria_inventarioOmit<ExtArgs> | null
    /**
     * The filter to search for the categoria_inventario to update in case it exists.
     */
    where: categoria_inventarioWhereUniqueInput
    /**
     * In case the categoria_inventario found by the `where` argument doesn't exist, create a new categoria_inventario with this data.
     */
    create: XOR<categoria_inventarioCreateInput, categoria_inventarioUncheckedCreateInput>
    /**
     * In case the categoria_inventario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<categoria_inventarioUpdateInput, categoria_inventarioUncheckedUpdateInput>
  }

  /**
   * categoria_inventario delete
   */
  export type categoria_inventarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria_inventario
     */
    select?: categoria_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria_inventario
     */
    omit?: categoria_inventarioOmit<ExtArgs> | null
    /**
     * Filter which categoria_inventario to delete.
     */
    where: categoria_inventarioWhereUniqueInput
  }

  /**
   * categoria_inventario deleteMany
   */
  export type categoria_inventarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which categoria_inventarios to delete
     */
    where?: categoria_inventarioWhereInput
    /**
     * Limit how many categoria_inventarios to delete.
     */
    limit?: number
  }

  /**
   * categoria_inventario without action
   */
  export type categoria_inventarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria_inventario
     */
    select?: categoria_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria_inventario
     */
    omit?: categoria_inventarioOmit<ExtArgs> | null
  }


  /**
   * Model proveedor
   */

  export type AggregateProveedor = {
    _count: ProveedorCountAggregateOutputType | null
    _avg: ProveedorAvgAggregateOutputType | null
    _sum: ProveedorSumAggregateOutputType | null
    _min: ProveedorMinAggregateOutputType | null
    _max: ProveedorMaxAggregateOutputType | null
  }

  export type ProveedorAvgAggregateOutputType = {
    id_proveedor: number | null
  }

  export type ProveedorSumAggregateOutputType = {
    id_proveedor: number | null
  }

  export type ProveedorMinAggregateOutputType = {
    id_proveedor: number | null
    nombre: string | null
    nit: string | null
    telefono: string | null
    email: string | null
    direccion: string | null
    ciudad: string | null
    contacto: string | null
    notas: string | null
    activo: boolean | null
    fecha_creacion: Date | null
  }

  export type ProveedorMaxAggregateOutputType = {
    id_proveedor: number | null
    nombre: string | null
    nit: string | null
    telefono: string | null
    email: string | null
    direccion: string | null
    ciudad: string | null
    contacto: string | null
    notas: string | null
    activo: boolean | null
    fecha_creacion: Date | null
  }

  export type ProveedorCountAggregateOutputType = {
    id_proveedor: number
    nombre: number
    nit: number
    telefono: number
    email: number
    direccion: number
    ciudad: number
    contacto: number
    notas: number
    activo: number
    fecha_creacion: number
    _all: number
  }


  export type ProveedorAvgAggregateInputType = {
    id_proveedor?: true
  }

  export type ProveedorSumAggregateInputType = {
    id_proveedor?: true
  }

  export type ProveedorMinAggregateInputType = {
    id_proveedor?: true
    nombre?: true
    nit?: true
    telefono?: true
    email?: true
    direccion?: true
    ciudad?: true
    contacto?: true
    notas?: true
    activo?: true
    fecha_creacion?: true
  }

  export type ProveedorMaxAggregateInputType = {
    id_proveedor?: true
    nombre?: true
    nit?: true
    telefono?: true
    email?: true
    direccion?: true
    ciudad?: true
    contacto?: true
    notas?: true
    activo?: true
    fecha_creacion?: true
  }

  export type ProveedorCountAggregateInputType = {
    id_proveedor?: true
    nombre?: true
    nit?: true
    telefono?: true
    email?: true
    direccion?: true
    ciudad?: true
    contacto?: true
    notas?: true
    activo?: true
    fecha_creacion?: true
    _all?: true
  }

  export type ProveedorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which proveedor to aggregate.
     */
    where?: proveedorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of proveedors to fetch.
     */
    orderBy?: proveedorOrderByWithRelationInput | proveedorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: proveedorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` proveedors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` proveedors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned proveedors
    **/
    _count?: true | ProveedorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProveedorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProveedorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProveedorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProveedorMaxAggregateInputType
  }

  export type GetProveedorAggregateType<T extends ProveedorAggregateArgs> = {
        [P in keyof T & keyof AggregateProveedor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProveedor[P]>
      : GetScalarType<T[P], AggregateProveedor[P]>
  }




  export type proveedorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: proveedorWhereInput
    orderBy?: proveedorOrderByWithAggregationInput | proveedorOrderByWithAggregationInput[]
    by: ProveedorScalarFieldEnum[] | ProveedorScalarFieldEnum
    having?: proveedorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProveedorCountAggregateInputType | true
    _avg?: ProveedorAvgAggregateInputType
    _sum?: ProveedorSumAggregateInputType
    _min?: ProveedorMinAggregateInputType
    _max?: ProveedorMaxAggregateInputType
  }

  export type ProveedorGroupByOutputType = {
    id_proveedor: number
    nombre: string
    nit: string | null
    telefono: string | null
    email: string | null
    direccion: string | null
    ciudad: string | null
    contacto: string | null
    notas: string | null
    activo: boolean
    fecha_creacion: Date
    _count: ProveedorCountAggregateOutputType | null
    _avg: ProveedorAvgAggregateOutputType | null
    _sum: ProveedorSumAggregateOutputType | null
    _min: ProveedorMinAggregateOutputType | null
    _max: ProveedorMaxAggregateOutputType | null
  }

  type GetProveedorGroupByPayload<T extends proveedorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProveedorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProveedorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProveedorGroupByOutputType[P]>
            : GetScalarType<T[P], ProveedorGroupByOutputType[P]>
        }
      >
    >


  export type proveedorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_proveedor?: boolean
    nombre?: boolean
    nit?: boolean
    telefono?: boolean
    email?: boolean
    direccion?: boolean
    ciudad?: boolean
    contacto?: boolean
    notas?: boolean
    activo?: boolean
    fecha_creacion?: boolean
    productos?: boolean | proveedor$productosArgs<ExtArgs>
    _count?: boolean | ProveedorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proveedor"]>

  export type proveedorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_proveedor?: boolean
    nombre?: boolean
    nit?: boolean
    telefono?: boolean
    email?: boolean
    direccion?: boolean
    ciudad?: boolean
    contacto?: boolean
    notas?: boolean
    activo?: boolean
    fecha_creacion?: boolean
  }, ExtArgs["result"]["proveedor"]>

  export type proveedorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_proveedor?: boolean
    nombre?: boolean
    nit?: boolean
    telefono?: boolean
    email?: boolean
    direccion?: boolean
    ciudad?: boolean
    contacto?: boolean
    notas?: boolean
    activo?: boolean
    fecha_creacion?: boolean
  }, ExtArgs["result"]["proveedor"]>

  export type proveedorSelectScalar = {
    id_proveedor?: boolean
    nombre?: boolean
    nit?: boolean
    telefono?: boolean
    email?: boolean
    direccion?: boolean
    ciudad?: boolean
    contacto?: boolean
    notas?: boolean
    activo?: boolean
    fecha_creacion?: boolean
  }

  export type proveedorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_proveedor" | "nombre" | "nit" | "telefono" | "email" | "direccion" | "ciudad" | "contacto" | "notas" | "activo" | "fecha_creacion", ExtArgs["result"]["proveedor"]>
  export type proveedorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productos?: boolean | proveedor$productosArgs<ExtArgs>
    _count?: boolean | ProveedorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type proveedorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type proveedorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $proveedorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "proveedor"
    objects: {
      productos: Prisma.$producto_inventarioPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_proveedor: number
      nombre: string
      nit: string | null
      telefono: string | null
      email: string | null
      direccion: string | null
      ciudad: string | null
      contacto: string | null
      notas: string | null
      activo: boolean
      fecha_creacion: Date
    }, ExtArgs["result"]["proveedor"]>
    composites: {}
  }

  type proveedorGetPayload<S extends boolean | null | undefined | proveedorDefaultArgs> = $Result.GetResult<Prisma.$proveedorPayload, S>

  type proveedorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<proveedorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProveedorCountAggregateInputType | true
    }

  export interface proveedorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['proveedor'], meta: { name: 'proveedor' } }
    /**
     * Find zero or one Proveedor that matches the filter.
     * @param {proveedorFindUniqueArgs} args - Arguments to find a Proveedor
     * @example
     * // Get one Proveedor
     * const proveedor = await prisma.proveedor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends proveedorFindUniqueArgs>(args: SelectSubset<T, proveedorFindUniqueArgs<ExtArgs>>): Prisma__proveedorClient<$Result.GetResult<Prisma.$proveedorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Proveedor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {proveedorFindUniqueOrThrowArgs} args - Arguments to find a Proveedor
     * @example
     * // Get one Proveedor
     * const proveedor = await prisma.proveedor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends proveedorFindUniqueOrThrowArgs>(args: SelectSubset<T, proveedorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__proveedorClient<$Result.GetResult<Prisma.$proveedorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Proveedor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {proveedorFindFirstArgs} args - Arguments to find a Proveedor
     * @example
     * // Get one Proveedor
     * const proveedor = await prisma.proveedor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends proveedorFindFirstArgs>(args?: SelectSubset<T, proveedorFindFirstArgs<ExtArgs>>): Prisma__proveedorClient<$Result.GetResult<Prisma.$proveedorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Proveedor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {proveedorFindFirstOrThrowArgs} args - Arguments to find a Proveedor
     * @example
     * // Get one Proveedor
     * const proveedor = await prisma.proveedor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends proveedorFindFirstOrThrowArgs>(args?: SelectSubset<T, proveedorFindFirstOrThrowArgs<ExtArgs>>): Prisma__proveedorClient<$Result.GetResult<Prisma.$proveedorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Proveedors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {proveedorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Proveedors
     * const proveedors = await prisma.proveedor.findMany()
     * 
     * // Get first 10 Proveedors
     * const proveedors = await prisma.proveedor.findMany({ take: 10 })
     * 
     * // Only select the `id_proveedor`
     * const proveedorWithId_proveedorOnly = await prisma.proveedor.findMany({ select: { id_proveedor: true } })
     * 
     */
    findMany<T extends proveedorFindManyArgs>(args?: SelectSubset<T, proveedorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$proveedorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Proveedor.
     * @param {proveedorCreateArgs} args - Arguments to create a Proveedor.
     * @example
     * // Create one Proveedor
     * const Proveedor = await prisma.proveedor.create({
     *   data: {
     *     // ... data to create a Proveedor
     *   }
     * })
     * 
     */
    create<T extends proveedorCreateArgs>(args: SelectSubset<T, proveedorCreateArgs<ExtArgs>>): Prisma__proveedorClient<$Result.GetResult<Prisma.$proveedorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Proveedors.
     * @param {proveedorCreateManyArgs} args - Arguments to create many Proveedors.
     * @example
     * // Create many Proveedors
     * const proveedor = await prisma.proveedor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends proveedorCreateManyArgs>(args?: SelectSubset<T, proveedorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Proveedors and returns the data saved in the database.
     * @param {proveedorCreateManyAndReturnArgs} args - Arguments to create many Proveedors.
     * @example
     * // Create many Proveedors
     * const proveedor = await prisma.proveedor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Proveedors and only return the `id_proveedor`
     * const proveedorWithId_proveedorOnly = await prisma.proveedor.createManyAndReturn({
     *   select: { id_proveedor: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends proveedorCreateManyAndReturnArgs>(args?: SelectSubset<T, proveedorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$proveedorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Proveedor.
     * @param {proveedorDeleteArgs} args - Arguments to delete one Proveedor.
     * @example
     * // Delete one Proveedor
     * const Proveedor = await prisma.proveedor.delete({
     *   where: {
     *     // ... filter to delete one Proveedor
     *   }
     * })
     * 
     */
    delete<T extends proveedorDeleteArgs>(args: SelectSubset<T, proveedorDeleteArgs<ExtArgs>>): Prisma__proveedorClient<$Result.GetResult<Prisma.$proveedorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Proveedor.
     * @param {proveedorUpdateArgs} args - Arguments to update one Proveedor.
     * @example
     * // Update one Proveedor
     * const proveedor = await prisma.proveedor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends proveedorUpdateArgs>(args: SelectSubset<T, proveedorUpdateArgs<ExtArgs>>): Prisma__proveedorClient<$Result.GetResult<Prisma.$proveedorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Proveedors.
     * @param {proveedorDeleteManyArgs} args - Arguments to filter Proveedors to delete.
     * @example
     * // Delete a few Proveedors
     * const { count } = await prisma.proveedor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends proveedorDeleteManyArgs>(args?: SelectSubset<T, proveedorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Proveedors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {proveedorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Proveedors
     * const proveedor = await prisma.proveedor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends proveedorUpdateManyArgs>(args: SelectSubset<T, proveedorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Proveedors and returns the data updated in the database.
     * @param {proveedorUpdateManyAndReturnArgs} args - Arguments to update many Proveedors.
     * @example
     * // Update many Proveedors
     * const proveedor = await prisma.proveedor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Proveedors and only return the `id_proveedor`
     * const proveedorWithId_proveedorOnly = await prisma.proveedor.updateManyAndReturn({
     *   select: { id_proveedor: true },
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
    updateManyAndReturn<T extends proveedorUpdateManyAndReturnArgs>(args: SelectSubset<T, proveedorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$proveedorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Proveedor.
     * @param {proveedorUpsertArgs} args - Arguments to update or create a Proveedor.
     * @example
     * // Update or create a Proveedor
     * const proveedor = await prisma.proveedor.upsert({
     *   create: {
     *     // ... data to create a Proveedor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Proveedor we want to update
     *   }
     * })
     */
    upsert<T extends proveedorUpsertArgs>(args: SelectSubset<T, proveedorUpsertArgs<ExtArgs>>): Prisma__proveedorClient<$Result.GetResult<Prisma.$proveedorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Proveedors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {proveedorCountArgs} args - Arguments to filter Proveedors to count.
     * @example
     * // Count the number of Proveedors
     * const count = await prisma.proveedor.count({
     *   where: {
     *     // ... the filter for the Proveedors we want to count
     *   }
     * })
    **/
    count<T extends proveedorCountArgs>(
      args?: Subset<T, proveedorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProveedorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Proveedor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProveedorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProveedorAggregateArgs>(args: Subset<T, ProveedorAggregateArgs>): Prisma.PrismaPromise<GetProveedorAggregateType<T>>

    /**
     * Group by Proveedor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {proveedorGroupByArgs} args - Group by arguments.
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
      T extends proveedorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: proveedorGroupByArgs['orderBy'] }
        : { orderBy?: proveedorGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, proveedorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProveedorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the proveedor model
   */
  readonly fields: proveedorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for proveedor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__proveedorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    productos<T extends proveedor$productosArgs<ExtArgs> = {}>(args?: Subset<T, proveedor$productosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$producto_inventarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the proveedor model
   */
  interface proveedorFieldRefs {
    readonly id_proveedor: FieldRef<"proveedor", 'Int'>
    readonly nombre: FieldRef<"proveedor", 'String'>
    readonly nit: FieldRef<"proveedor", 'String'>
    readonly telefono: FieldRef<"proveedor", 'String'>
    readonly email: FieldRef<"proveedor", 'String'>
    readonly direccion: FieldRef<"proveedor", 'String'>
    readonly ciudad: FieldRef<"proveedor", 'String'>
    readonly contacto: FieldRef<"proveedor", 'String'>
    readonly notas: FieldRef<"proveedor", 'String'>
    readonly activo: FieldRef<"proveedor", 'Boolean'>
    readonly fecha_creacion: FieldRef<"proveedor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * proveedor findUnique
   */
  export type proveedorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proveedor
     */
    select?: proveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proveedor
     */
    omit?: proveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proveedorInclude<ExtArgs> | null
    /**
     * Filter, which proveedor to fetch.
     */
    where: proveedorWhereUniqueInput
  }

  /**
   * proveedor findUniqueOrThrow
   */
  export type proveedorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proveedor
     */
    select?: proveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proveedor
     */
    omit?: proveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proveedorInclude<ExtArgs> | null
    /**
     * Filter, which proveedor to fetch.
     */
    where: proveedorWhereUniqueInput
  }

  /**
   * proveedor findFirst
   */
  export type proveedorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proveedor
     */
    select?: proveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proveedor
     */
    omit?: proveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proveedorInclude<ExtArgs> | null
    /**
     * Filter, which proveedor to fetch.
     */
    where?: proveedorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of proveedors to fetch.
     */
    orderBy?: proveedorOrderByWithRelationInput | proveedorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for proveedors.
     */
    cursor?: proveedorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` proveedors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` proveedors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of proveedors.
     */
    distinct?: ProveedorScalarFieldEnum | ProveedorScalarFieldEnum[]
  }

  /**
   * proveedor findFirstOrThrow
   */
  export type proveedorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proveedor
     */
    select?: proveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proveedor
     */
    omit?: proveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proveedorInclude<ExtArgs> | null
    /**
     * Filter, which proveedor to fetch.
     */
    where?: proveedorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of proveedors to fetch.
     */
    orderBy?: proveedorOrderByWithRelationInput | proveedorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for proveedors.
     */
    cursor?: proveedorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` proveedors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` proveedors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of proveedors.
     */
    distinct?: ProveedorScalarFieldEnum | ProveedorScalarFieldEnum[]
  }

  /**
   * proveedor findMany
   */
  export type proveedorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proveedor
     */
    select?: proveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proveedor
     */
    omit?: proveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proveedorInclude<ExtArgs> | null
    /**
     * Filter, which proveedors to fetch.
     */
    where?: proveedorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of proveedors to fetch.
     */
    orderBy?: proveedorOrderByWithRelationInput | proveedorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing proveedors.
     */
    cursor?: proveedorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` proveedors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` proveedors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of proveedors.
     */
    distinct?: ProveedorScalarFieldEnum | ProveedorScalarFieldEnum[]
  }

  /**
   * proveedor create
   */
  export type proveedorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proveedor
     */
    select?: proveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proveedor
     */
    omit?: proveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proveedorInclude<ExtArgs> | null
    /**
     * The data needed to create a proveedor.
     */
    data: XOR<proveedorCreateInput, proveedorUncheckedCreateInput>
  }

  /**
   * proveedor createMany
   */
  export type proveedorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many proveedors.
     */
    data: proveedorCreateManyInput | proveedorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * proveedor createManyAndReturn
   */
  export type proveedorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proveedor
     */
    select?: proveedorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the proveedor
     */
    omit?: proveedorOmit<ExtArgs> | null
    /**
     * The data used to create many proveedors.
     */
    data: proveedorCreateManyInput | proveedorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * proveedor update
   */
  export type proveedorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proveedor
     */
    select?: proveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proveedor
     */
    omit?: proveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proveedorInclude<ExtArgs> | null
    /**
     * The data needed to update a proveedor.
     */
    data: XOR<proveedorUpdateInput, proveedorUncheckedUpdateInput>
    /**
     * Choose, which proveedor to update.
     */
    where: proveedorWhereUniqueInput
  }

  /**
   * proveedor updateMany
   */
  export type proveedorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update proveedors.
     */
    data: XOR<proveedorUpdateManyMutationInput, proveedorUncheckedUpdateManyInput>
    /**
     * Filter which proveedors to update
     */
    where?: proveedorWhereInput
    /**
     * Limit how many proveedors to update.
     */
    limit?: number
  }

  /**
   * proveedor updateManyAndReturn
   */
  export type proveedorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proveedor
     */
    select?: proveedorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the proveedor
     */
    omit?: proveedorOmit<ExtArgs> | null
    /**
     * The data used to update proveedors.
     */
    data: XOR<proveedorUpdateManyMutationInput, proveedorUncheckedUpdateManyInput>
    /**
     * Filter which proveedors to update
     */
    where?: proveedorWhereInput
    /**
     * Limit how many proveedors to update.
     */
    limit?: number
  }

  /**
   * proveedor upsert
   */
  export type proveedorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proveedor
     */
    select?: proveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proveedor
     */
    omit?: proveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proveedorInclude<ExtArgs> | null
    /**
     * The filter to search for the proveedor to update in case it exists.
     */
    where: proveedorWhereUniqueInput
    /**
     * In case the proveedor found by the `where` argument doesn't exist, create a new proveedor with this data.
     */
    create: XOR<proveedorCreateInput, proveedorUncheckedCreateInput>
    /**
     * In case the proveedor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<proveedorUpdateInput, proveedorUncheckedUpdateInput>
  }

  /**
   * proveedor delete
   */
  export type proveedorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proveedor
     */
    select?: proveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proveedor
     */
    omit?: proveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proveedorInclude<ExtArgs> | null
    /**
     * Filter which proveedor to delete.
     */
    where: proveedorWhereUniqueInput
  }

  /**
   * proveedor deleteMany
   */
  export type proveedorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which proveedors to delete
     */
    where?: proveedorWhereInput
    /**
     * Limit how many proveedors to delete.
     */
    limit?: number
  }

  /**
   * proveedor.productos
   */
  export type proveedor$productosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto_inventario
     */
    select?: producto_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the producto_inventario
     */
    omit?: producto_inventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: producto_inventarioInclude<ExtArgs> | null
    where?: producto_inventarioWhereInput
    orderBy?: producto_inventarioOrderByWithRelationInput | producto_inventarioOrderByWithRelationInput[]
    cursor?: producto_inventarioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Producto_inventarioScalarFieldEnum | Producto_inventarioScalarFieldEnum[]
  }

  /**
   * proveedor without action
   */
  export type proveedorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proveedor
     */
    select?: proveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proveedor
     */
    omit?: proveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proveedorInclude<ExtArgs> | null
  }


  /**
   * Model producto_inventario
   */

  export type AggregateProducto_inventario = {
    _count: Producto_inventarioCountAggregateOutputType | null
    _avg: Producto_inventarioAvgAggregateOutputType | null
    _sum: Producto_inventarioSumAggregateOutputType | null
    _min: Producto_inventarioMinAggregateOutputType | null
    _max: Producto_inventarioMaxAggregateOutputType | null
  }

  export type Producto_inventarioAvgAggregateOutputType = {
    id_producto: number | null
    precio_costo: Decimal | null
    precio_venta: Decimal | null
    stock_actual: Decimal | null
    stock_minimo: Decimal | null
    id_proveedor: number | null
  }

  export type Producto_inventarioSumAggregateOutputType = {
    id_producto: number | null
    precio_costo: Decimal | null
    precio_venta: Decimal | null
    stock_actual: Decimal | null
    stock_minimo: Decimal | null
    id_proveedor: number | null
  }

  export type Producto_inventarioMinAggregateOutputType = {
    id_producto: number | null
    nombre: string | null
    descripcion: string | null
    categoria: string | null
    unidad_medida: string | null
    precio_costo: Decimal | null
    precio_venta: Decimal | null
    stock_actual: Decimal | null
    stock_minimo: Decimal | null
    id_proveedor: number | null
    activo: boolean | null
    fecha_creacion: Date | null
  }

  export type Producto_inventarioMaxAggregateOutputType = {
    id_producto: number | null
    nombre: string | null
    descripcion: string | null
    categoria: string | null
    unidad_medida: string | null
    precio_costo: Decimal | null
    precio_venta: Decimal | null
    stock_actual: Decimal | null
    stock_minimo: Decimal | null
    id_proveedor: number | null
    activo: boolean | null
    fecha_creacion: Date | null
  }

  export type Producto_inventarioCountAggregateOutputType = {
    id_producto: number
    nombre: number
    descripcion: number
    categoria: number
    unidad_medida: number
    precio_costo: number
    precio_venta: number
    stock_actual: number
    stock_minimo: number
    id_proveedor: number
    activo: number
    fecha_creacion: number
    _all: number
  }


  export type Producto_inventarioAvgAggregateInputType = {
    id_producto?: true
    precio_costo?: true
    precio_venta?: true
    stock_actual?: true
    stock_minimo?: true
    id_proveedor?: true
  }

  export type Producto_inventarioSumAggregateInputType = {
    id_producto?: true
    precio_costo?: true
    precio_venta?: true
    stock_actual?: true
    stock_minimo?: true
    id_proveedor?: true
  }

  export type Producto_inventarioMinAggregateInputType = {
    id_producto?: true
    nombre?: true
    descripcion?: true
    categoria?: true
    unidad_medida?: true
    precio_costo?: true
    precio_venta?: true
    stock_actual?: true
    stock_minimo?: true
    id_proveedor?: true
    activo?: true
    fecha_creacion?: true
  }

  export type Producto_inventarioMaxAggregateInputType = {
    id_producto?: true
    nombre?: true
    descripcion?: true
    categoria?: true
    unidad_medida?: true
    precio_costo?: true
    precio_venta?: true
    stock_actual?: true
    stock_minimo?: true
    id_proveedor?: true
    activo?: true
    fecha_creacion?: true
  }

  export type Producto_inventarioCountAggregateInputType = {
    id_producto?: true
    nombre?: true
    descripcion?: true
    categoria?: true
    unidad_medida?: true
    precio_costo?: true
    precio_venta?: true
    stock_actual?: true
    stock_minimo?: true
    id_proveedor?: true
    activo?: true
    fecha_creacion?: true
    _all?: true
  }

  export type Producto_inventarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which producto_inventario to aggregate.
     */
    where?: producto_inventarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of producto_inventarios to fetch.
     */
    orderBy?: producto_inventarioOrderByWithRelationInput | producto_inventarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: producto_inventarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` producto_inventarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` producto_inventarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned producto_inventarios
    **/
    _count?: true | Producto_inventarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Producto_inventarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Producto_inventarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Producto_inventarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Producto_inventarioMaxAggregateInputType
  }

  export type GetProducto_inventarioAggregateType<T extends Producto_inventarioAggregateArgs> = {
        [P in keyof T & keyof AggregateProducto_inventario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProducto_inventario[P]>
      : GetScalarType<T[P], AggregateProducto_inventario[P]>
  }




  export type producto_inventarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: producto_inventarioWhereInput
    orderBy?: producto_inventarioOrderByWithAggregationInput | producto_inventarioOrderByWithAggregationInput[]
    by: Producto_inventarioScalarFieldEnum[] | Producto_inventarioScalarFieldEnum
    having?: producto_inventarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Producto_inventarioCountAggregateInputType | true
    _avg?: Producto_inventarioAvgAggregateInputType
    _sum?: Producto_inventarioSumAggregateInputType
    _min?: Producto_inventarioMinAggregateInputType
    _max?: Producto_inventarioMaxAggregateInputType
  }

  export type Producto_inventarioGroupByOutputType = {
    id_producto: number
    nombre: string
    descripcion: string | null
    categoria: string
    unidad_medida: string
    precio_costo: Decimal
    precio_venta: Decimal
    stock_actual: Decimal
    stock_minimo: Decimal
    id_proveedor: number | null
    activo: boolean
    fecha_creacion: Date
    _count: Producto_inventarioCountAggregateOutputType | null
    _avg: Producto_inventarioAvgAggregateOutputType | null
    _sum: Producto_inventarioSumAggregateOutputType | null
    _min: Producto_inventarioMinAggregateOutputType | null
    _max: Producto_inventarioMaxAggregateOutputType | null
  }

  type GetProducto_inventarioGroupByPayload<T extends producto_inventarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Producto_inventarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Producto_inventarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Producto_inventarioGroupByOutputType[P]>
            : GetScalarType<T[P], Producto_inventarioGroupByOutputType[P]>
        }
      >
    >


  export type producto_inventarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_producto?: boolean
    nombre?: boolean
    descripcion?: boolean
    categoria?: boolean
    unidad_medida?: boolean
    precio_costo?: boolean
    precio_venta?: boolean
    stock_actual?: boolean
    stock_minimo?: boolean
    id_proveedor?: boolean
    activo?: boolean
    fecha_creacion?: boolean
    proveedor?: boolean | producto_inventario$proveedorArgs<ExtArgs>
    movimientos?: boolean | producto_inventario$movimientosArgs<ExtArgs>
    _count?: boolean | Producto_inventarioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["producto_inventario"]>

  export type producto_inventarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_producto?: boolean
    nombre?: boolean
    descripcion?: boolean
    categoria?: boolean
    unidad_medida?: boolean
    precio_costo?: boolean
    precio_venta?: boolean
    stock_actual?: boolean
    stock_minimo?: boolean
    id_proveedor?: boolean
    activo?: boolean
    fecha_creacion?: boolean
    proveedor?: boolean | producto_inventario$proveedorArgs<ExtArgs>
  }, ExtArgs["result"]["producto_inventario"]>

  export type producto_inventarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_producto?: boolean
    nombre?: boolean
    descripcion?: boolean
    categoria?: boolean
    unidad_medida?: boolean
    precio_costo?: boolean
    precio_venta?: boolean
    stock_actual?: boolean
    stock_minimo?: boolean
    id_proveedor?: boolean
    activo?: boolean
    fecha_creacion?: boolean
    proveedor?: boolean | producto_inventario$proveedorArgs<ExtArgs>
  }, ExtArgs["result"]["producto_inventario"]>

  export type producto_inventarioSelectScalar = {
    id_producto?: boolean
    nombre?: boolean
    descripcion?: boolean
    categoria?: boolean
    unidad_medida?: boolean
    precio_costo?: boolean
    precio_venta?: boolean
    stock_actual?: boolean
    stock_minimo?: boolean
    id_proveedor?: boolean
    activo?: boolean
    fecha_creacion?: boolean
  }

  export type producto_inventarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_producto" | "nombre" | "descripcion" | "categoria" | "unidad_medida" | "precio_costo" | "precio_venta" | "stock_actual" | "stock_minimo" | "id_proveedor" | "activo" | "fecha_creacion", ExtArgs["result"]["producto_inventario"]>
  export type producto_inventarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    proveedor?: boolean | producto_inventario$proveedorArgs<ExtArgs>
    movimientos?: boolean | producto_inventario$movimientosArgs<ExtArgs>
    _count?: boolean | Producto_inventarioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type producto_inventarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    proveedor?: boolean | producto_inventario$proveedorArgs<ExtArgs>
  }
  export type producto_inventarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    proveedor?: boolean | producto_inventario$proveedorArgs<ExtArgs>
  }

  export type $producto_inventarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "producto_inventario"
    objects: {
      proveedor: Prisma.$proveedorPayload<ExtArgs> | null
      movimientos: Prisma.$movimiento_inventarioPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_producto: number
      nombre: string
      descripcion: string | null
      categoria: string
      unidad_medida: string
      precio_costo: Prisma.Decimal
      precio_venta: Prisma.Decimal
      stock_actual: Prisma.Decimal
      stock_minimo: Prisma.Decimal
      id_proveedor: number | null
      activo: boolean
      fecha_creacion: Date
    }, ExtArgs["result"]["producto_inventario"]>
    composites: {}
  }

  type producto_inventarioGetPayload<S extends boolean | null | undefined | producto_inventarioDefaultArgs> = $Result.GetResult<Prisma.$producto_inventarioPayload, S>

  type producto_inventarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<producto_inventarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Producto_inventarioCountAggregateInputType | true
    }

  export interface producto_inventarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['producto_inventario'], meta: { name: 'producto_inventario' } }
    /**
     * Find zero or one Producto_inventario that matches the filter.
     * @param {producto_inventarioFindUniqueArgs} args - Arguments to find a Producto_inventario
     * @example
     * // Get one Producto_inventario
     * const producto_inventario = await prisma.producto_inventario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends producto_inventarioFindUniqueArgs>(args: SelectSubset<T, producto_inventarioFindUniqueArgs<ExtArgs>>): Prisma__producto_inventarioClient<$Result.GetResult<Prisma.$producto_inventarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Producto_inventario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {producto_inventarioFindUniqueOrThrowArgs} args - Arguments to find a Producto_inventario
     * @example
     * // Get one Producto_inventario
     * const producto_inventario = await prisma.producto_inventario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends producto_inventarioFindUniqueOrThrowArgs>(args: SelectSubset<T, producto_inventarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__producto_inventarioClient<$Result.GetResult<Prisma.$producto_inventarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Producto_inventario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {producto_inventarioFindFirstArgs} args - Arguments to find a Producto_inventario
     * @example
     * // Get one Producto_inventario
     * const producto_inventario = await prisma.producto_inventario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends producto_inventarioFindFirstArgs>(args?: SelectSubset<T, producto_inventarioFindFirstArgs<ExtArgs>>): Prisma__producto_inventarioClient<$Result.GetResult<Prisma.$producto_inventarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Producto_inventario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {producto_inventarioFindFirstOrThrowArgs} args - Arguments to find a Producto_inventario
     * @example
     * // Get one Producto_inventario
     * const producto_inventario = await prisma.producto_inventario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends producto_inventarioFindFirstOrThrowArgs>(args?: SelectSubset<T, producto_inventarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__producto_inventarioClient<$Result.GetResult<Prisma.$producto_inventarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Producto_inventarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {producto_inventarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Producto_inventarios
     * const producto_inventarios = await prisma.producto_inventario.findMany()
     * 
     * // Get first 10 Producto_inventarios
     * const producto_inventarios = await prisma.producto_inventario.findMany({ take: 10 })
     * 
     * // Only select the `id_producto`
     * const producto_inventarioWithId_productoOnly = await prisma.producto_inventario.findMany({ select: { id_producto: true } })
     * 
     */
    findMany<T extends producto_inventarioFindManyArgs>(args?: SelectSubset<T, producto_inventarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$producto_inventarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Producto_inventario.
     * @param {producto_inventarioCreateArgs} args - Arguments to create a Producto_inventario.
     * @example
     * // Create one Producto_inventario
     * const Producto_inventario = await prisma.producto_inventario.create({
     *   data: {
     *     // ... data to create a Producto_inventario
     *   }
     * })
     * 
     */
    create<T extends producto_inventarioCreateArgs>(args: SelectSubset<T, producto_inventarioCreateArgs<ExtArgs>>): Prisma__producto_inventarioClient<$Result.GetResult<Prisma.$producto_inventarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Producto_inventarios.
     * @param {producto_inventarioCreateManyArgs} args - Arguments to create many Producto_inventarios.
     * @example
     * // Create many Producto_inventarios
     * const producto_inventario = await prisma.producto_inventario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends producto_inventarioCreateManyArgs>(args?: SelectSubset<T, producto_inventarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Producto_inventarios and returns the data saved in the database.
     * @param {producto_inventarioCreateManyAndReturnArgs} args - Arguments to create many Producto_inventarios.
     * @example
     * // Create many Producto_inventarios
     * const producto_inventario = await prisma.producto_inventario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Producto_inventarios and only return the `id_producto`
     * const producto_inventarioWithId_productoOnly = await prisma.producto_inventario.createManyAndReturn({
     *   select: { id_producto: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends producto_inventarioCreateManyAndReturnArgs>(args?: SelectSubset<T, producto_inventarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$producto_inventarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Producto_inventario.
     * @param {producto_inventarioDeleteArgs} args - Arguments to delete one Producto_inventario.
     * @example
     * // Delete one Producto_inventario
     * const Producto_inventario = await prisma.producto_inventario.delete({
     *   where: {
     *     // ... filter to delete one Producto_inventario
     *   }
     * })
     * 
     */
    delete<T extends producto_inventarioDeleteArgs>(args: SelectSubset<T, producto_inventarioDeleteArgs<ExtArgs>>): Prisma__producto_inventarioClient<$Result.GetResult<Prisma.$producto_inventarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Producto_inventario.
     * @param {producto_inventarioUpdateArgs} args - Arguments to update one Producto_inventario.
     * @example
     * // Update one Producto_inventario
     * const producto_inventario = await prisma.producto_inventario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends producto_inventarioUpdateArgs>(args: SelectSubset<T, producto_inventarioUpdateArgs<ExtArgs>>): Prisma__producto_inventarioClient<$Result.GetResult<Prisma.$producto_inventarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Producto_inventarios.
     * @param {producto_inventarioDeleteManyArgs} args - Arguments to filter Producto_inventarios to delete.
     * @example
     * // Delete a few Producto_inventarios
     * const { count } = await prisma.producto_inventario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends producto_inventarioDeleteManyArgs>(args?: SelectSubset<T, producto_inventarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Producto_inventarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {producto_inventarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Producto_inventarios
     * const producto_inventario = await prisma.producto_inventario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends producto_inventarioUpdateManyArgs>(args: SelectSubset<T, producto_inventarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Producto_inventarios and returns the data updated in the database.
     * @param {producto_inventarioUpdateManyAndReturnArgs} args - Arguments to update many Producto_inventarios.
     * @example
     * // Update many Producto_inventarios
     * const producto_inventario = await prisma.producto_inventario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Producto_inventarios and only return the `id_producto`
     * const producto_inventarioWithId_productoOnly = await prisma.producto_inventario.updateManyAndReturn({
     *   select: { id_producto: true },
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
    updateManyAndReturn<T extends producto_inventarioUpdateManyAndReturnArgs>(args: SelectSubset<T, producto_inventarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$producto_inventarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Producto_inventario.
     * @param {producto_inventarioUpsertArgs} args - Arguments to update or create a Producto_inventario.
     * @example
     * // Update or create a Producto_inventario
     * const producto_inventario = await prisma.producto_inventario.upsert({
     *   create: {
     *     // ... data to create a Producto_inventario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Producto_inventario we want to update
     *   }
     * })
     */
    upsert<T extends producto_inventarioUpsertArgs>(args: SelectSubset<T, producto_inventarioUpsertArgs<ExtArgs>>): Prisma__producto_inventarioClient<$Result.GetResult<Prisma.$producto_inventarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Producto_inventarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {producto_inventarioCountArgs} args - Arguments to filter Producto_inventarios to count.
     * @example
     * // Count the number of Producto_inventarios
     * const count = await prisma.producto_inventario.count({
     *   where: {
     *     // ... the filter for the Producto_inventarios we want to count
     *   }
     * })
    **/
    count<T extends producto_inventarioCountArgs>(
      args?: Subset<T, producto_inventarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Producto_inventarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Producto_inventario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Producto_inventarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Producto_inventarioAggregateArgs>(args: Subset<T, Producto_inventarioAggregateArgs>): Prisma.PrismaPromise<GetProducto_inventarioAggregateType<T>>

    /**
     * Group by Producto_inventario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {producto_inventarioGroupByArgs} args - Group by arguments.
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
      T extends producto_inventarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: producto_inventarioGroupByArgs['orderBy'] }
        : { orderBy?: producto_inventarioGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, producto_inventarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProducto_inventarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the producto_inventario model
   */
  readonly fields: producto_inventarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for producto_inventario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__producto_inventarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    proveedor<T extends producto_inventario$proveedorArgs<ExtArgs> = {}>(args?: Subset<T, producto_inventario$proveedorArgs<ExtArgs>>): Prisma__proveedorClient<$Result.GetResult<Prisma.$proveedorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    movimientos<T extends producto_inventario$movimientosArgs<ExtArgs> = {}>(args?: Subset<T, producto_inventario$movimientosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$movimiento_inventarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the producto_inventario model
   */
  interface producto_inventarioFieldRefs {
    readonly id_producto: FieldRef<"producto_inventario", 'Int'>
    readonly nombre: FieldRef<"producto_inventario", 'String'>
    readonly descripcion: FieldRef<"producto_inventario", 'String'>
    readonly categoria: FieldRef<"producto_inventario", 'String'>
    readonly unidad_medida: FieldRef<"producto_inventario", 'String'>
    readonly precio_costo: FieldRef<"producto_inventario", 'Decimal'>
    readonly precio_venta: FieldRef<"producto_inventario", 'Decimal'>
    readonly stock_actual: FieldRef<"producto_inventario", 'Decimal'>
    readonly stock_minimo: FieldRef<"producto_inventario", 'Decimal'>
    readonly id_proveedor: FieldRef<"producto_inventario", 'Int'>
    readonly activo: FieldRef<"producto_inventario", 'Boolean'>
    readonly fecha_creacion: FieldRef<"producto_inventario", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * producto_inventario findUnique
   */
  export type producto_inventarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto_inventario
     */
    select?: producto_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the producto_inventario
     */
    omit?: producto_inventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: producto_inventarioInclude<ExtArgs> | null
    /**
     * Filter, which producto_inventario to fetch.
     */
    where: producto_inventarioWhereUniqueInput
  }

  /**
   * producto_inventario findUniqueOrThrow
   */
  export type producto_inventarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto_inventario
     */
    select?: producto_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the producto_inventario
     */
    omit?: producto_inventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: producto_inventarioInclude<ExtArgs> | null
    /**
     * Filter, which producto_inventario to fetch.
     */
    where: producto_inventarioWhereUniqueInput
  }

  /**
   * producto_inventario findFirst
   */
  export type producto_inventarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto_inventario
     */
    select?: producto_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the producto_inventario
     */
    omit?: producto_inventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: producto_inventarioInclude<ExtArgs> | null
    /**
     * Filter, which producto_inventario to fetch.
     */
    where?: producto_inventarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of producto_inventarios to fetch.
     */
    orderBy?: producto_inventarioOrderByWithRelationInput | producto_inventarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for producto_inventarios.
     */
    cursor?: producto_inventarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` producto_inventarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` producto_inventarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of producto_inventarios.
     */
    distinct?: Producto_inventarioScalarFieldEnum | Producto_inventarioScalarFieldEnum[]
  }

  /**
   * producto_inventario findFirstOrThrow
   */
  export type producto_inventarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto_inventario
     */
    select?: producto_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the producto_inventario
     */
    omit?: producto_inventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: producto_inventarioInclude<ExtArgs> | null
    /**
     * Filter, which producto_inventario to fetch.
     */
    where?: producto_inventarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of producto_inventarios to fetch.
     */
    orderBy?: producto_inventarioOrderByWithRelationInput | producto_inventarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for producto_inventarios.
     */
    cursor?: producto_inventarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` producto_inventarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` producto_inventarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of producto_inventarios.
     */
    distinct?: Producto_inventarioScalarFieldEnum | Producto_inventarioScalarFieldEnum[]
  }

  /**
   * producto_inventario findMany
   */
  export type producto_inventarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto_inventario
     */
    select?: producto_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the producto_inventario
     */
    omit?: producto_inventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: producto_inventarioInclude<ExtArgs> | null
    /**
     * Filter, which producto_inventarios to fetch.
     */
    where?: producto_inventarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of producto_inventarios to fetch.
     */
    orderBy?: producto_inventarioOrderByWithRelationInput | producto_inventarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing producto_inventarios.
     */
    cursor?: producto_inventarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` producto_inventarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` producto_inventarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of producto_inventarios.
     */
    distinct?: Producto_inventarioScalarFieldEnum | Producto_inventarioScalarFieldEnum[]
  }

  /**
   * producto_inventario create
   */
  export type producto_inventarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto_inventario
     */
    select?: producto_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the producto_inventario
     */
    omit?: producto_inventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: producto_inventarioInclude<ExtArgs> | null
    /**
     * The data needed to create a producto_inventario.
     */
    data: XOR<producto_inventarioCreateInput, producto_inventarioUncheckedCreateInput>
  }

  /**
   * producto_inventario createMany
   */
  export type producto_inventarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many producto_inventarios.
     */
    data: producto_inventarioCreateManyInput | producto_inventarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * producto_inventario createManyAndReturn
   */
  export type producto_inventarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto_inventario
     */
    select?: producto_inventarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the producto_inventario
     */
    omit?: producto_inventarioOmit<ExtArgs> | null
    /**
     * The data used to create many producto_inventarios.
     */
    data: producto_inventarioCreateManyInput | producto_inventarioCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: producto_inventarioIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * producto_inventario update
   */
  export type producto_inventarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto_inventario
     */
    select?: producto_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the producto_inventario
     */
    omit?: producto_inventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: producto_inventarioInclude<ExtArgs> | null
    /**
     * The data needed to update a producto_inventario.
     */
    data: XOR<producto_inventarioUpdateInput, producto_inventarioUncheckedUpdateInput>
    /**
     * Choose, which producto_inventario to update.
     */
    where: producto_inventarioWhereUniqueInput
  }

  /**
   * producto_inventario updateMany
   */
  export type producto_inventarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update producto_inventarios.
     */
    data: XOR<producto_inventarioUpdateManyMutationInput, producto_inventarioUncheckedUpdateManyInput>
    /**
     * Filter which producto_inventarios to update
     */
    where?: producto_inventarioWhereInput
    /**
     * Limit how many producto_inventarios to update.
     */
    limit?: number
  }

  /**
   * producto_inventario updateManyAndReturn
   */
  export type producto_inventarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto_inventario
     */
    select?: producto_inventarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the producto_inventario
     */
    omit?: producto_inventarioOmit<ExtArgs> | null
    /**
     * The data used to update producto_inventarios.
     */
    data: XOR<producto_inventarioUpdateManyMutationInput, producto_inventarioUncheckedUpdateManyInput>
    /**
     * Filter which producto_inventarios to update
     */
    where?: producto_inventarioWhereInput
    /**
     * Limit how many producto_inventarios to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: producto_inventarioIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * producto_inventario upsert
   */
  export type producto_inventarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto_inventario
     */
    select?: producto_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the producto_inventario
     */
    omit?: producto_inventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: producto_inventarioInclude<ExtArgs> | null
    /**
     * The filter to search for the producto_inventario to update in case it exists.
     */
    where: producto_inventarioWhereUniqueInput
    /**
     * In case the producto_inventario found by the `where` argument doesn't exist, create a new producto_inventario with this data.
     */
    create: XOR<producto_inventarioCreateInput, producto_inventarioUncheckedCreateInput>
    /**
     * In case the producto_inventario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<producto_inventarioUpdateInput, producto_inventarioUncheckedUpdateInput>
  }

  /**
   * producto_inventario delete
   */
  export type producto_inventarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto_inventario
     */
    select?: producto_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the producto_inventario
     */
    omit?: producto_inventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: producto_inventarioInclude<ExtArgs> | null
    /**
     * Filter which producto_inventario to delete.
     */
    where: producto_inventarioWhereUniqueInput
  }

  /**
   * producto_inventario deleteMany
   */
  export type producto_inventarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which producto_inventarios to delete
     */
    where?: producto_inventarioWhereInput
    /**
     * Limit how many producto_inventarios to delete.
     */
    limit?: number
  }

  /**
   * producto_inventario.proveedor
   */
  export type producto_inventario$proveedorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the proveedor
     */
    select?: proveedorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the proveedor
     */
    omit?: proveedorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: proveedorInclude<ExtArgs> | null
    where?: proveedorWhereInput
  }

  /**
   * producto_inventario.movimientos
   */
  export type producto_inventario$movimientosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movimiento_inventario
     */
    select?: movimiento_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the movimiento_inventario
     */
    omit?: movimiento_inventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movimiento_inventarioInclude<ExtArgs> | null
    where?: movimiento_inventarioWhereInput
    orderBy?: movimiento_inventarioOrderByWithRelationInput | movimiento_inventarioOrderByWithRelationInput[]
    cursor?: movimiento_inventarioWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Movimiento_inventarioScalarFieldEnum | Movimiento_inventarioScalarFieldEnum[]
  }

  /**
   * producto_inventario without action
   */
  export type producto_inventarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the producto_inventario
     */
    select?: producto_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the producto_inventario
     */
    omit?: producto_inventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: producto_inventarioInclude<ExtArgs> | null
  }


  /**
   * Model movimiento_inventario
   */

  export type AggregateMovimiento_inventario = {
    _count: Movimiento_inventarioCountAggregateOutputType | null
    _avg: Movimiento_inventarioAvgAggregateOutputType | null
    _sum: Movimiento_inventarioSumAggregateOutputType | null
    _min: Movimiento_inventarioMinAggregateOutputType | null
    _max: Movimiento_inventarioMaxAggregateOutputType | null
  }

  export type Movimiento_inventarioAvgAggregateOutputType = {
    id_movimiento: number | null
    id_producto: number | null
    cantidad: Decimal | null
    stock_antes: Decimal | null
    stock_despues: Decimal | null
    precio_unitario: Decimal | null
    referencia_id: number | null
  }

  export type Movimiento_inventarioSumAggregateOutputType = {
    id_movimiento: number | null
    id_producto: number | null
    cantidad: Decimal | null
    stock_antes: Decimal | null
    stock_despues: Decimal | null
    precio_unitario: Decimal | null
    referencia_id: number | null
  }

  export type Movimiento_inventarioMinAggregateOutputType = {
    id_movimiento: number | null
    id_producto: number | null
    tipo: string | null
    motivo: string | null
    cantidad: Decimal | null
    stock_antes: Decimal | null
    stock_despues: Decimal | null
    precio_unitario: Decimal | null
    referencia_id: number | null
    referencia_tipo: string | null
    notas: string | null
    fecha: Date | null
  }

  export type Movimiento_inventarioMaxAggregateOutputType = {
    id_movimiento: number | null
    id_producto: number | null
    tipo: string | null
    motivo: string | null
    cantidad: Decimal | null
    stock_antes: Decimal | null
    stock_despues: Decimal | null
    precio_unitario: Decimal | null
    referencia_id: number | null
    referencia_tipo: string | null
    notas: string | null
    fecha: Date | null
  }

  export type Movimiento_inventarioCountAggregateOutputType = {
    id_movimiento: number
    id_producto: number
    tipo: number
    motivo: number
    cantidad: number
    stock_antes: number
    stock_despues: number
    precio_unitario: number
    referencia_id: number
    referencia_tipo: number
    notas: number
    fecha: number
    _all: number
  }


  export type Movimiento_inventarioAvgAggregateInputType = {
    id_movimiento?: true
    id_producto?: true
    cantidad?: true
    stock_antes?: true
    stock_despues?: true
    precio_unitario?: true
    referencia_id?: true
  }

  export type Movimiento_inventarioSumAggregateInputType = {
    id_movimiento?: true
    id_producto?: true
    cantidad?: true
    stock_antes?: true
    stock_despues?: true
    precio_unitario?: true
    referencia_id?: true
  }

  export type Movimiento_inventarioMinAggregateInputType = {
    id_movimiento?: true
    id_producto?: true
    tipo?: true
    motivo?: true
    cantidad?: true
    stock_antes?: true
    stock_despues?: true
    precio_unitario?: true
    referencia_id?: true
    referencia_tipo?: true
    notas?: true
    fecha?: true
  }

  export type Movimiento_inventarioMaxAggregateInputType = {
    id_movimiento?: true
    id_producto?: true
    tipo?: true
    motivo?: true
    cantidad?: true
    stock_antes?: true
    stock_despues?: true
    precio_unitario?: true
    referencia_id?: true
    referencia_tipo?: true
    notas?: true
    fecha?: true
  }

  export type Movimiento_inventarioCountAggregateInputType = {
    id_movimiento?: true
    id_producto?: true
    tipo?: true
    motivo?: true
    cantidad?: true
    stock_antes?: true
    stock_despues?: true
    precio_unitario?: true
    referencia_id?: true
    referencia_tipo?: true
    notas?: true
    fecha?: true
    _all?: true
  }

  export type Movimiento_inventarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which movimiento_inventario to aggregate.
     */
    where?: movimiento_inventarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of movimiento_inventarios to fetch.
     */
    orderBy?: movimiento_inventarioOrderByWithRelationInput | movimiento_inventarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: movimiento_inventarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` movimiento_inventarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` movimiento_inventarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned movimiento_inventarios
    **/
    _count?: true | Movimiento_inventarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Movimiento_inventarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Movimiento_inventarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Movimiento_inventarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Movimiento_inventarioMaxAggregateInputType
  }

  export type GetMovimiento_inventarioAggregateType<T extends Movimiento_inventarioAggregateArgs> = {
        [P in keyof T & keyof AggregateMovimiento_inventario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMovimiento_inventario[P]>
      : GetScalarType<T[P], AggregateMovimiento_inventario[P]>
  }




  export type movimiento_inventarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: movimiento_inventarioWhereInput
    orderBy?: movimiento_inventarioOrderByWithAggregationInput | movimiento_inventarioOrderByWithAggregationInput[]
    by: Movimiento_inventarioScalarFieldEnum[] | Movimiento_inventarioScalarFieldEnum
    having?: movimiento_inventarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Movimiento_inventarioCountAggregateInputType | true
    _avg?: Movimiento_inventarioAvgAggregateInputType
    _sum?: Movimiento_inventarioSumAggregateInputType
    _min?: Movimiento_inventarioMinAggregateInputType
    _max?: Movimiento_inventarioMaxAggregateInputType
  }

  export type Movimiento_inventarioGroupByOutputType = {
    id_movimiento: number
    id_producto: number
    tipo: string
    motivo: string
    cantidad: Decimal
    stock_antes: Decimal
    stock_despues: Decimal
    precio_unitario: Decimal
    referencia_id: number | null
    referencia_tipo: string | null
    notas: string | null
    fecha: Date
    _count: Movimiento_inventarioCountAggregateOutputType | null
    _avg: Movimiento_inventarioAvgAggregateOutputType | null
    _sum: Movimiento_inventarioSumAggregateOutputType | null
    _min: Movimiento_inventarioMinAggregateOutputType | null
    _max: Movimiento_inventarioMaxAggregateOutputType | null
  }

  type GetMovimiento_inventarioGroupByPayload<T extends movimiento_inventarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Movimiento_inventarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Movimiento_inventarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Movimiento_inventarioGroupByOutputType[P]>
            : GetScalarType<T[P], Movimiento_inventarioGroupByOutputType[P]>
        }
      >
    >


  export type movimiento_inventarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_movimiento?: boolean
    id_producto?: boolean
    tipo?: boolean
    motivo?: boolean
    cantidad?: boolean
    stock_antes?: boolean
    stock_despues?: boolean
    precio_unitario?: boolean
    referencia_id?: boolean
    referencia_tipo?: boolean
    notas?: boolean
    fecha?: boolean
    producto?: boolean | producto_inventarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["movimiento_inventario"]>

  export type movimiento_inventarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_movimiento?: boolean
    id_producto?: boolean
    tipo?: boolean
    motivo?: boolean
    cantidad?: boolean
    stock_antes?: boolean
    stock_despues?: boolean
    precio_unitario?: boolean
    referencia_id?: boolean
    referencia_tipo?: boolean
    notas?: boolean
    fecha?: boolean
    producto?: boolean | producto_inventarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["movimiento_inventario"]>

  export type movimiento_inventarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_movimiento?: boolean
    id_producto?: boolean
    tipo?: boolean
    motivo?: boolean
    cantidad?: boolean
    stock_antes?: boolean
    stock_despues?: boolean
    precio_unitario?: boolean
    referencia_id?: boolean
    referencia_tipo?: boolean
    notas?: boolean
    fecha?: boolean
    producto?: boolean | producto_inventarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["movimiento_inventario"]>

  export type movimiento_inventarioSelectScalar = {
    id_movimiento?: boolean
    id_producto?: boolean
    tipo?: boolean
    motivo?: boolean
    cantidad?: boolean
    stock_antes?: boolean
    stock_despues?: boolean
    precio_unitario?: boolean
    referencia_id?: boolean
    referencia_tipo?: boolean
    notas?: boolean
    fecha?: boolean
  }

  export type movimiento_inventarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_movimiento" | "id_producto" | "tipo" | "motivo" | "cantidad" | "stock_antes" | "stock_despues" | "precio_unitario" | "referencia_id" | "referencia_tipo" | "notas" | "fecha", ExtArgs["result"]["movimiento_inventario"]>
  export type movimiento_inventarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | producto_inventarioDefaultArgs<ExtArgs>
  }
  export type movimiento_inventarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | producto_inventarioDefaultArgs<ExtArgs>
  }
  export type movimiento_inventarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    producto?: boolean | producto_inventarioDefaultArgs<ExtArgs>
  }

  export type $movimiento_inventarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "movimiento_inventario"
    objects: {
      producto: Prisma.$producto_inventarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_movimiento: number
      id_producto: number
      tipo: string
      motivo: string
      cantidad: Prisma.Decimal
      stock_antes: Prisma.Decimal
      stock_despues: Prisma.Decimal
      precio_unitario: Prisma.Decimal
      referencia_id: number | null
      referencia_tipo: string | null
      notas: string | null
      fecha: Date
    }, ExtArgs["result"]["movimiento_inventario"]>
    composites: {}
  }

  type movimiento_inventarioGetPayload<S extends boolean | null | undefined | movimiento_inventarioDefaultArgs> = $Result.GetResult<Prisma.$movimiento_inventarioPayload, S>

  type movimiento_inventarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<movimiento_inventarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Movimiento_inventarioCountAggregateInputType | true
    }

  export interface movimiento_inventarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['movimiento_inventario'], meta: { name: 'movimiento_inventario' } }
    /**
     * Find zero or one Movimiento_inventario that matches the filter.
     * @param {movimiento_inventarioFindUniqueArgs} args - Arguments to find a Movimiento_inventario
     * @example
     * // Get one Movimiento_inventario
     * const movimiento_inventario = await prisma.movimiento_inventario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends movimiento_inventarioFindUniqueArgs>(args: SelectSubset<T, movimiento_inventarioFindUniqueArgs<ExtArgs>>): Prisma__movimiento_inventarioClient<$Result.GetResult<Prisma.$movimiento_inventarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Movimiento_inventario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {movimiento_inventarioFindUniqueOrThrowArgs} args - Arguments to find a Movimiento_inventario
     * @example
     * // Get one Movimiento_inventario
     * const movimiento_inventario = await prisma.movimiento_inventario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends movimiento_inventarioFindUniqueOrThrowArgs>(args: SelectSubset<T, movimiento_inventarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__movimiento_inventarioClient<$Result.GetResult<Prisma.$movimiento_inventarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Movimiento_inventario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {movimiento_inventarioFindFirstArgs} args - Arguments to find a Movimiento_inventario
     * @example
     * // Get one Movimiento_inventario
     * const movimiento_inventario = await prisma.movimiento_inventario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends movimiento_inventarioFindFirstArgs>(args?: SelectSubset<T, movimiento_inventarioFindFirstArgs<ExtArgs>>): Prisma__movimiento_inventarioClient<$Result.GetResult<Prisma.$movimiento_inventarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Movimiento_inventario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {movimiento_inventarioFindFirstOrThrowArgs} args - Arguments to find a Movimiento_inventario
     * @example
     * // Get one Movimiento_inventario
     * const movimiento_inventario = await prisma.movimiento_inventario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends movimiento_inventarioFindFirstOrThrowArgs>(args?: SelectSubset<T, movimiento_inventarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__movimiento_inventarioClient<$Result.GetResult<Prisma.$movimiento_inventarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Movimiento_inventarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {movimiento_inventarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Movimiento_inventarios
     * const movimiento_inventarios = await prisma.movimiento_inventario.findMany()
     * 
     * // Get first 10 Movimiento_inventarios
     * const movimiento_inventarios = await prisma.movimiento_inventario.findMany({ take: 10 })
     * 
     * // Only select the `id_movimiento`
     * const movimiento_inventarioWithId_movimientoOnly = await prisma.movimiento_inventario.findMany({ select: { id_movimiento: true } })
     * 
     */
    findMany<T extends movimiento_inventarioFindManyArgs>(args?: SelectSubset<T, movimiento_inventarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$movimiento_inventarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Movimiento_inventario.
     * @param {movimiento_inventarioCreateArgs} args - Arguments to create a Movimiento_inventario.
     * @example
     * // Create one Movimiento_inventario
     * const Movimiento_inventario = await prisma.movimiento_inventario.create({
     *   data: {
     *     // ... data to create a Movimiento_inventario
     *   }
     * })
     * 
     */
    create<T extends movimiento_inventarioCreateArgs>(args: SelectSubset<T, movimiento_inventarioCreateArgs<ExtArgs>>): Prisma__movimiento_inventarioClient<$Result.GetResult<Prisma.$movimiento_inventarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Movimiento_inventarios.
     * @param {movimiento_inventarioCreateManyArgs} args - Arguments to create many Movimiento_inventarios.
     * @example
     * // Create many Movimiento_inventarios
     * const movimiento_inventario = await prisma.movimiento_inventario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends movimiento_inventarioCreateManyArgs>(args?: SelectSubset<T, movimiento_inventarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Movimiento_inventarios and returns the data saved in the database.
     * @param {movimiento_inventarioCreateManyAndReturnArgs} args - Arguments to create many Movimiento_inventarios.
     * @example
     * // Create many Movimiento_inventarios
     * const movimiento_inventario = await prisma.movimiento_inventario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Movimiento_inventarios and only return the `id_movimiento`
     * const movimiento_inventarioWithId_movimientoOnly = await prisma.movimiento_inventario.createManyAndReturn({
     *   select: { id_movimiento: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends movimiento_inventarioCreateManyAndReturnArgs>(args?: SelectSubset<T, movimiento_inventarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$movimiento_inventarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Movimiento_inventario.
     * @param {movimiento_inventarioDeleteArgs} args - Arguments to delete one Movimiento_inventario.
     * @example
     * // Delete one Movimiento_inventario
     * const Movimiento_inventario = await prisma.movimiento_inventario.delete({
     *   where: {
     *     // ... filter to delete one Movimiento_inventario
     *   }
     * })
     * 
     */
    delete<T extends movimiento_inventarioDeleteArgs>(args: SelectSubset<T, movimiento_inventarioDeleteArgs<ExtArgs>>): Prisma__movimiento_inventarioClient<$Result.GetResult<Prisma.$movimiento_inventarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Movimiento_inventario.
     * @param {movimiento_inventarioUpdateArgs} args - Arguments to update one Movimiento_inventario.
     * @example
     * // Update one Movimiento_inventario
     * const movimiento_inventario = await prisma.movimiento_inventario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends movimiento_inventarioUpdateArgs>(args: SelectSubset<T, movimiento_inventarioUpdateArgs<ExtArgs>>): Prisma__movimiento_inventarioClient<$Result.GetResult<Prisma.$movimiento_inventarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Movimiento_inventarios.
     * @param {movimiento_inventarioDeleteManyArgs} args - Arguments to filter Movimiento_inventarios to delete.
     * @example
     * // Delete a few Movimiento_inventarios
     * const { count } = await prisma.movimiento_inventario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends movimiento_inventarioDeleteManyArgs>(args?: SelectSubset<T, movimiento_inventarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Movimiento_inventarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {movimiento_inventarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Movimiento_inventarios
     * const movimiento_inventario = await prisma.movimiento_inventario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends movimiento_inventarioUpdateManyArgs>(args: SelectSubset<T, movimiento_inventarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Movimiento_inventarios and returns the data updated in the database.
     * @param {movimiento_inventarioUpdateManyAndReturnArgs} args - Arguments to update many Movimiento_inventarios.
     * @example
     * // Update many Movimiento_inventarios
     * const movimiento_inventario = await prisma.movimiento_inventario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Movimiento_inventarios and only return the `id_movimiento`
     * const movimiento_inventarioWithId_movimientoOnly = await prisma.movimiento_inventario.updateManyAndReturn({
     *   select: { id_movimiento: true },
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
    updateManyAndReturn<T extends movimiento_inventarioUpdateManyAndReturnArgs>(args: SelectSubset<T, movimiento_inventarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$movimiento_inventarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Movimiento_inventario.
     * @param {movimiento_inventarioUpsertArgs} args - Arguments to update or create a Movimiento_inventario.
     * @example
     * // Update or create a Movimiento_inventario
     * const movimiento_inventario = await prisma.movimiento_inventario.upsert({
     *   create: {
     *     // ... data to create a Movimiento_inventario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Movimiento_inventario we want to update
     *   }
     * })
     */
    upsert<T extends movimiento_inventarioUpsertArgs>(args: SelectSubset<T, movimiento_inventarioUpsertArgs<ExtArgs>>): Prisma__movimiento_inventarioClient<$Result.GetResult<Prisma.$movimiento_inventarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Movimiento_inventarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {movimiento_inventarioCountArgs} args - Arguments to filter Movimiento_inventarios to count.
     * @example
     * // Count the number of Movimiento_inventarios
     * const count = await prisma.movimiento_inventario.count({
     *   where: {
     *     // ... the filter for the Movimiento_inventarios we want to count
     *   }
     * })
    **/
    count<T extends movimiento_inventarioCountArgs>(
      args?: Subset<T, movimiento_inventarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Movimiento_inventarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Movimiento_inventario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Movimiento_inventarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Movimiento_inventarioAggregateArgs>(args: Subset<T, Movimiento_inventarioAggregateArgs>): Prisma.PrismaPromise<GetMovimiento_inventarioAggregateType<T>>

    /**
     * Group by Movimiento_inventario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {movimiento_inventarioGroupByArgs} args - Group by arguments.
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
      T extends movimiento_inventarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: movimiento_inventarioGroupByArgs['orderBy'] }
        : { orderBy?: movimiento_inventarioGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, movimiento_inventarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMovimiento_inventarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the movimiento_inventario model
   */
  readonly fields: movimiento_inventarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for movimiento_inventario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__movimiento_inventarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    producto<T extends producto_inventarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, producto_inventarioDefaultArgs<ExtArgs>>): Prisma__producto_inventarioClient<$Result.GetResult<Prisma.$producto_inventarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the movimiento_inventario model
   */
  interface movimiento_inventarioFieldRefs {
    readonly id_movimiento: FieldRef<"movimiento_inventario", 'Int'>
    readonly id_producto: FieldRef<"movimiento_inventario", 'Int'>
    readonly tipo: FieldRef<"movimiento_inventario", 'String'>
    readonly motivo: FieldRef<"movimiento_inventario", 'String'>
    readonly cantidad: FieldRef<"movimiento_inventario", 'Decimal'>
    readonly stock_antes: FieldRef<"movimiento_inventario", 'Decimal'>
    readonly stock_despues: FieldRef<"movimiento_inventario", 'Decimal'>
    readonly precio_unitario: FieldRef<"movimiento_inventario", 'Decimal'>
    readonly referencia_id: FieldRef<"movimiento_inventario", 'Int'>
    readonly referencia_tipo: FieldRef<"movimiento_inventario", 'String'>
    readonly notas: FieldRef<"movimiento_inventario", 'String'>
    readonly fecha: FieldRef<"movimiento_inventario", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * movimiento_inventario findUnique
   */
  export type movimiento_inventarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movimiento_inventario
     */
    select?: movimiento_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the movimiento_inventario
     */
    omit?: movimiento_inventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movimiento_inventarioInclude<ExtArgs> | null
    /**
     * Filter, which movimiento_inventario to fetch.
     */
    where: movimiento_inventarioWhereUniqueInput
  }

  /**
   * movimiento_inventario findUniqueOrThrow
   */
  export type movimiento_inventarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movimiento_inventario
     */
    select?: movimiento_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the movimiento_inventario
     */
    omit?: movimiento_inventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movimiento_inventarioInclude<ExtArgs> | null
    /**
     * Filter, which movimiento_inventario to fetch.
     */
    where: movimiento_inventarioWhereUniqueInput
  }

  /**
   * movimiento_inventario findFirst
   */
  export type movimiento_inventarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movimiento_inventario
     */
    select?: movimiento_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the movimiento_inventario
     */
    omit?: movimiento_inventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movimiento_inventarioInclude<ExtArgs> | null
    /**
     * Filter, which movimiento_inventario to fetch.
     */
    where?: movimiento_inventarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of movimiento_inventarios to fetch.
     */
    orderBy?: movimiento_inventarioOrderByWithRelationInput | movimiento_inventarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for movimiento_inventarios.
     */
    cursor?: movimiento_inventarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` movimiento_inventarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` movimiento_inventarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of movimiento_inventarios.
     */
    distinct?: Movimiento_inventarioScalarFieldEnum | Movimiento_inventarioScalarFieldEnum[]
  }

  /**
   * movimiento_inventario findFirstOrThrow
   */
  export type movimiento_inventarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movimiento_inventario
     */
    select?: movimiento_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the movimiento_inventario
     */
    omit?: movimiento_inventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movimiento_inventarioInclude<ExtArgs> | null
    /**
     * Filter, which movimiento_inventario to fetch.
     */
    where?: movimiento_inventarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of movimiento_inventarios to fetch.
     */
    orderBy?: movimiento_inventarioOrderByWithRelationInput | movimiento_inventarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for movimiento_inventarios.
     */
    cursor?: movimiento_inventarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` movimiento_inventarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` movimiento_inventarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of movimiento_inventarios.
     */
    distinct?: Movimiento_inventarioScalarFieldEnum | Movimiento_inventarioScalarFieldEnum[]
  }

  /**
   * movimiento_inventario findMany
   */
  export type movimiento_inventarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movimiento_inventario
     */
    select?: movimiento_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the movimiento_inventario
     */
    omit?: movimiento_inventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movimiento_inventarioInclude<ExtArgs> | null
    /**
     * Filter, which movimiento_inventarios to fetch.
     */
    where?: movimiento_inventarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of movimiento_inventarios to fetch.
     */
    orderBy?: movimiento_inventarioOrderByWithRelationInput | movimiento_inventarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing movimiento_inventarios.
     */
    cursor?: movimiento_inventarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` movimiento_inventarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` movimiento_inventarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of movimiento_inventarios.
     */
    distinct?: Movimiento_inventarioScalarFieldEnum | Movimiento_inventarioScalarFieldEnum[]
  }

  /**
   * movimiento_inventario create
   */
  export type movimiento_inventarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movimiento_inventario
     */
    select?: movimiento_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the movimiento_inventario
     */
    omit?: movimiento_inventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movimiento_inventarioInclude<ExtArgs> | null
    /**
     * The data needed to create a movimiento_inventario.
     */
    data: XOR<movimiento_inventarioCreateInput, movimiento_inventarioUncheckedCreateInput>
  }

  /**
   * movimiento_inventario createMany
   */
  export type movimiento_inventarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many movimiento_inventarios.
     */
    data: movimiento_inventarioCreateManyInput | movimiento_inventarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * movimiento_inventario createManyAndReturn
   */
  export type movimiento_inventarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movimiento_inventario
     */
    select?: movimiento_inventarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the movimiento_inventario
     */
    omit?: movimiento_inventarioOmit<ExtArgs> | null
    /**
     * The data used to create many movimiento_inventarios.
     */
    data: movimiento_inventarioCreateManyInput | movimiento_inventarioCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movimiento_inventarioIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * movimiento_inventario update
   */
  export type movimiento_inventarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movimiento_inventario
     */
    select?: movimiento_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the movimiento_inventario
     */
    omit?: movimiento_inventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movimiento_inventarioInclude<ExtArgs> | null
    /**
     * The data needed to update a movimiento_inventario.
     */
    data: XOR<movimiento_inventarioUpdateInput, movimiento_inventarioUncheckedUpdateInput>
    /**
     * Choose, which movimiento_inventario to update.
     */
    where: movimiento_inventarioWhereUniqueInput
  }

  /**
   * movimiento_inventario updateMany
   */
  export type movimiento_inventarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update movimiento_inventarios.
     */
    data: XOR<movimiento_inventarioUpdateManyMutationInput, movimiento_inventarioUncheckedUpdateManyInput>
    /**
     * Filter which movimiento_inventarios to update
     */
    where?: movimiento_inventarioWhereInput
    /**
     * Limit how many movimiento_inventarios to update.
     */
    limit?: number
  }

  /**
   * movimiento_inventario updateManyAndReturn
   */
  export type movimiento_inventarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movimiento_inventario
     */
    select?: movimiento_inventarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the movimiento_inventario
     */
    omit?: movimiento_inventarioOmit<ExtArgs> | null
    /**
     * The data used to update movimiento_inventarios.
     */
    data: XOR<movimiento_inventarioUpdateManyMutationInput, movimiento_inventarioUncheckedUpdateManyInput>
    /**
     * Filter which movimiento_inventarios to update
     */
    where?: movimiento_inventarioWhereInput
    /**
     * Limit how many movimiento_inventarios to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movimiento_inventarioIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * movimiento_inventario upsert
   */
  export type movimiento_inventarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movimiento_inventario
     */
    select?: movimiento_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the movimiento_inventario
     */
    omit?: movimiento_inventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movimiento_inventarioInclude<ExtArgs> | null
    /**
     * The filter to search for the movimiento_inventario to update in case it exists.
     */
    where: movimiento_inventarioWhereUniqueInput
    /**
     * In case the movimiento_inventario found by the `where` argument doesn't exist, create a new movimiento_inventario with this data.
     */
    create: XOR<movimiento_inventarioCreateInput, movimiento_inventarioUncheckedCreateInput>
    /**
     * In case the movimiento_inventario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<movimiento_inventarioUpdateInput, movimiento_inventarioUncheckedUpdateInput>
  }

  /**
   * movimiento_inventario delete
   */
  export type movimiento_inventarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movimiento_inventario
     */
    select?: movimiento_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the movimiento_inventario
     */
    omit?: movimiento_inventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movimiento_inventarioInclude<ExtArgs> | null
    /**
     * Filter which movimiento_inventario to delete.
     */
    where: movimiento_inventarioWhereUniqueInput
  }

  /**
   * movimiento_inventario deleteMany
   */
  export type movimiento_inventarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which movimiento_inventarios to delete
     */
    where?: movimiento_inventarioWhereInput
    /**
     * Limit how many movimiento_inventarios to delete.
     */
    limit?: number
  }

  /**
   * movimiento_inventario without action
   */
  export type movimiento_inventarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the movimiento_inventario
     */
    select?: movimiento_inventarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the movimiento_inventario
     */
    omit?: movimiento_inventarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: movimiento_inventarioInclude<ExtArgs> | null
  }


  /**
   * Model gasto_operativo
   */

  export type AggregateGasto_operativo = {
    _count: Gasto_operativoCountAggregateOutputType | null
    _avg: Gasto_operativoAvgAggregateOutputType | null
    _sum: Gasto_operativoSumAggregateOutputType | null
    _min: Gasto_operativoMinAggregateOutputType | null
    _max: Gasto_operativoMaxAggregateOutputType | null
  }

  export type Gasto_operativoAvgAggregateOutputType = {
    id_gasto: number | null
    monto: Decimal | null
    dia_recurrente: number | null
  }

  export type Gasto_operativoSumAggregateOutputType = {
    id_gasto: number | null
    monto: Decimal | null
    dia_recurrente: number | null
  }

  export type Gasto_operativoMinAggregateOutputType = {
    id_gasto: number | null
    categoria: string | null
    descripcion: string | null
    monto: Decimal | null
    fecha: Date | null
    comprobante: string | null
    proveedor_nombre: string | null
    es_recurrente: boolean | null
    dia_recurrente: number | null
    notas: string | null
    activo: boolean | null
    fecha_creacion: Date | null
  }

  export type Gasto_operativoMaxAggregateOutputType = {
    id_gasto: number | null
    categoria: string | null
    descripcion: string | null
    monto: Decimal | null
    fecha: Date | null
    comprobante: string | null
    proveedor_nombre: string | null
    es_recurrente: boolean | null
    dia_recurrente: number | null
    notas: string | null
    activo: boolean | null
    fecha_creacion: Date | null
  }

  export type Gasto_operativoCountAggregateOutputType = {
    id_gasto: number
    categoria: number
    descripcion: number
    monto: number
    fecha: number
    comprobante: number
    proveedor_nombre: number
    es_recurrente: number
    dia_recurrente: number
    notas: number
    activo: number
    fecha_creacion: number
    _all: number
  }


  export type Gasto_operativoAvgAggregateInputType = {
    id_gasto?: true
    monto?: true
    dia_recurrente?: true
  }

  export type Gasto_operativoSumAggregateInputType = {
    id_gasto?: true
    monto?: true
    dia_recurrente?: true
  }

  export type Gasto_operativoMinAggregateInputType = {
    id_gasto?: true
    categoria?: true
    descripcion?: true
    monto?: true
    fecha?: true
    comprobante?: true
    proveedor_nombre?: true
    es_recurrente?: true
    dia_recurrente?: true
    notas?: true
    activo?: true
    fecha_creacion?: true
  }

  export type Gasto_operativoMaxAggregateInputType = {
    id_gasto?: true
    categoria?: true
    descripcion?: true
    monto?: true
    fecha?: true
    comprobante?: true
    proveedor_nombre?: true
    es_recurrente?: true
    dia_recurrente?: true
    notas?: true
    activo?: true
    fecha_creacion?: true
  }

  export type Gasto_operativoCountAggregateInputType = {
    id_gasto?: true
    categoria?: true
    descripcion?: true
    monto?: true
    fecha?: true
    comprobante?: true
    proveedor_nombre?: true
    es_recurrente?: true
    dia_recurrente?: true
    notas?: true
    activo?: true
    fecha_creacion?: true
    _all?: true
  }

  export type Gasto_operativoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which gasto_operativo to aggregate.
     */
    where?: gasto_operativoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of gasto_operativos to fetch.
     */
    orderBy?: gasto_operativoOrderByWithRelationInput | gasto_operativoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: gasto_operativoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` gasto_operativos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` gasto_operativos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned gasto_operativos
    **/
    _count?: true | Gasto_operativoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Gasto_operativoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Gasto_operativoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Gasto_operativoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Gasto_operativoMaxAggregateInputType
  }

  export type GetGasto_operativoAggregateType<T extends Gasto_operativoAggregateArgs> = {
        [P in keyof T & keyof AggregateGasto_operativo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGasto_operativo[P]>
      : GetScalarType<T[P], AggregateGasto_operativo[P]>
  }




  export type gasto_operativoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: gasto_operativoWhereInput
    orderBy?: gasto_operativoOrderByWithAggregationInput | gasto_operativoOrderByWithAggregationInput[]
    by: Gasto_operativoScalarFieldEnum[] | Gasto_operativoScalarFieldEnum
    having?: gasto_operativoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Gasto_operativoCountAggregateInputType | true
    _avg?: Gasto_operativoAvgAggregateInputType
    _sum?: Gasto_operativoSumAggregateInputType
    _min?: Gasto_operativoMinAggregateInputType
    _max?: Gasto_operativoMaxAggregateInputType
  }

  export type Gasto_operativoGroupByOutputType = {
    id_gasto: number
    categoria: string
    descripcion: string
    monto: Decimal
    fecha: Date
    comprobante: string | null
    proveedor_nombre: string | null
    es_recurrente: boolean
    dia_recurrente: number | null
    notas: string | null
    activo: boolean
    fecha_creacion: Date
    _count: Gasto_operativoCountAggregateOutputType | null
    _avg: Gasto_operativoAvgAggregateOutputType | null
    _sum: Gasto_operativoSumAggregateOutputType | null
    _min: Gasto_operativoMinAggregateOutputType | null
    _max: Gasto_operativoMaxAggregateOutputType | null
  }

  type GetGasto_operativoGroupByPayload<T extends gasto_operativoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Gasto_operativoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Gasto_operativoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Gasto_operativoGroupByOutputType[P]>
            : GetScalarType<T[P], Gasto_operativoGroupByOutputType[P]>
        }
      >
    >


  export type gasto_operativoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_gasto?: boolean
    categoria?: boolean
    descripcion?: boolean
    monto?: boolean
    fecha?: boolean
    comprobante?: boolean
    proveedor_nombre?: boolean
    es_recurrente?: boolean
    dia_recurrente?: boolean
    notas?: boolean
    activo?: boolean
    fecha_creacion?: boolean
  }, ExtArgs["result"]["gasto_operativo"]>

  export type gasto_operativoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_gasto?: boolean
    categoria?: boolean
    descripcion?: boolean
    monto?: boolean
    fecha?: boolean
    comprobante?: boolean
    proveedor_nombre?: boolean
    es_recurrente?: boolean
    dia_recurrente?: boolean
    notas?: boolean
    activo?: boolean
    fecha_creacion?: boolean
  }, ExtArgs["result"]["gasto_operativo"]>

  export type gasto_operativoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_gasto?: boolean
    categoria?: boolean
    descripcion?: boolean
    monto?: boolean
    fecha?: boolean
    comprobante?: boolean
    proveedor_nombre?: boolean
    es_recurrente?: boolean
    dia_recurrente?: boolean
    notas?: boolean
    activo?: boolean
    fecha_creacion?: boolean
  }, ExtArgs["result"]["gasto_operativo"]>

  export type gasto_operativoSelectScalar = {
    id_gasto?: boolean
    categoria?: boolean
    descripcion?: boolean
    monto?: boolean
    fecha?: boolean
    comprobante?: boolean
    proveedor_nombre?: boolean
    es_recurrente?: boolean
    dia_recurrente?: boolean
    notas?: boolean
    activo?: boolean
    fecha_creacion?: boolean
  }

  export type gasto_operativoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_gasto" | "categoria" | "descripcion" | "monto" | "fecha" | "comprobante" | "proveedor_nombre" | "es_recurrente" | "dia_recurrente" | "notas" | "activo" | "fecha_creacion", ExtArgs["result"]["gasto_operativo"]>

  export type $gasto_operativoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "gasto_operativo"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id_gasto: number
      categoria: string
      descripcion: string
      monto: Prisma.Decimal
      fecha: Date
      comprobante: string | null
      proveedor_nombre: string | null
      es_recurrente: boolean
      dia_recurrente: number | null
      notas: string | null
      activo: boolean
      fecha_creacion: Date
    }, ExtArgs["result"]["gasto_operativo"]>
    composites: {}
  }

  type gasto_operativoGetPayload<S extends boolean | null | undefined | gasto_operativoDefaultArgs> = $Result.GetResult<Prisma.$gasto_operativoPayload, S>

  type gasto_operativoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<gasto_operativoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Gasto_operativoCountAggregateInputType | true
    }

  export interface gasto_operativoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['gasto_operativo'], meta: { name: 'gasto_operativo' } }
    /**
     * Find zero or one Gasto_operativo that matches the filter.
     * @param {gasto_operativoFindUniqueArgs} args - Arguments to find a Gasto_operativo
     * @example
     * // Get one Gasto_operativo
     * const gasto_operativo = await prisma.gasto_operativo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends gasto_operativoFindUniqueArgs>(args: SelectSubset<T, gasto_operativoFindUniqueArgs<ExtArgs>>): Prisma__gasto_operativoClient<$Result.GetResult<Prisma.$gasto_operativoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Gasto_operativo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {gasto_operativoFindUniqueOrThrowArgs} args - Arguments to find a Gasto_operativo
     * @example
     * // Get one Gasto_operativo
     * const gasto_operativo = await prisma.gasto_operativo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends gasto_operativoFindUniqueOrThrowArgs>(args: SelectSubset<T, gasto_operativoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__gasto_operativoClient<$Result.GetResult<Prisma.$gasto_operativoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Gasto_operativo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {gasto_operativoFindFirstArgs} args - Arguments to find a Gasto_operativo
     * @example
     * // Get one Gasto_operativo
     * const gasto_operativo = await prisma.gasto_operativo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends gasto_operativoFindFirstArgs>(args?: SelectSubset<T, gasto_operativoFindFirstArgs<ExtArgs>>): Prisma__gasto_operativoClient<$Result.GetResult<Prisma.$gasto_operativoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Gasto_operativo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {gasto_operativoFindFirstOrThrowArgs} args - Arguments to find a Gasto_operativo
     * @example
     * // Get one Gasto_operativo
     * const gasto_operativo = await prisma.gasto_operativo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends gasto_operativoFindFirstOrThrowArgs>(args?: SelectSubset<T, gasto_operativoFindFirstOrThrowArgs<ExtArgs>>): Prisma__gasto_operativoClient<$Result.GetResult<Prisma.$gasto_operativoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Gasto_operativos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {gasto_operativoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Gasto_operativos
     * const gasto_operativos = await prisma.gasto_operativo.findMany()
     * 
     * // Get first 10 Gasto_operativos
     * const gasto_operativos = await prisma.gasto_operativo.findMany({ take: 10 })
     * 
     * // Only select the `id_gasto`
     * const gasto_operativoWithId_gastoOnly = await prisma.gasto_operativo.findMany({ select: { id_gasto: true } })
     * 
     */
    findMany<T extends gasto_operativoFindManyArgs>(args?: SelectSubset<T, gasto_operativoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$gasto_operativoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Gasto_operativo.
     * @param {gasto_operativoCreateArgs} args - Arguments to create a Gasto_operativo.
     * @example
     * // Create one Gasto_operativo
     * const Gasto_operativo = await prisma.gasto_operativo.create({
     *   data: {
     *     // ... data to create a Gasto_operativo
     *   }
     * })
     * 
     */
    create<T extends gasto_operativoCreateArgs>(args: SelectSubset<T, gasto_operativoCreateArgs<ExtArgs>>): Prisma__gasto_operativoClient<$Result.GetResult<Prisma.$gasto_operativoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Gasto_operativos.
     * @param {gasto_operativoCreateManyArgs} args - Arguments to create many Gasto_operativos.
     * @example
     * // Create many Gasto_operativos
     * const gasto_operativo = await prisma.gasto_operativo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends gasto_operativoCreateManyArgs>(args?: SelectSubset<T, gasto_operativoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Gasto_operativos and returns the data saved in the database.
     * @param {gasto_operativoCreateManyAndReturnArgs} args - Arguments to create many Gasto_operativos.
     * @example
     * // Create many Gasto_operativos
     * const gasto_operativo = await prisma.gasto_operativo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Gasto_operativos and only return the `id_gasto`
     * const gasto_operativoWithId_gastoOnly = await prisma.gasto_operativo.createManyAndReturn({
     *   select: { id_gasto: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends gasto_operativoCreateManyAndReturnArgs>(args?: SelectSubset<T, gasto_operativoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$gasto_operativoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Gasto_operativo.
     * @param {gasto_operativoDeleteArgs} args - Arguments to delete one Gasto_operativo.
     * @example
     * // Delete one Gasto_operativo
     * const Gasto_operativo = await prisma.gasto_operativo.delete({
     *   where: {
     *     // ... filter to delete one Gasto_operativo
     *   }
     * })
     * 
     */
    delete<T extends gasto_operativoDeleteArgs>(args: SelectSubset<T, gasto_operativoDeleteArgs<ExtArgs>>): Prisma__gasto_operativoClient<$Result.GetResult<Prisma.$gasto_operativoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Gasto_operativo.
     * @param {gasto_operativoUpdateArgs} args - Arguments to update one Gasto_operativo.
     * @example
     * // Update one Gasto_operativo
     * const gasto_operativo = await prisma.gasto_operativo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends gasto_operativoUpdateArgs>(args: SelectSubset<T, gasto_operativoUpdateArgs<ExtArgs>>): Prisma__gasto_operativoClient<$Result.GetResult<Prisma.$gasto_operativoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Gasto_operativos.
     * @param {gasto_operativoDeleteManyArgs} args - Arguments to filter Gasto_operativos to delete.
     * @example
     * // Delete a few Gasto_operativos
     * const { count } = await prisma.gasto_operativo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends gasto_operativoDeleteManyArgs>(args?: SelectSubset<T, gasto_operativoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Gasto_operativos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {gasto_operativoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Gasto_operativos
     * const gasto_operativo = await prisma.gasto_operativo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends gasto_operativoUpdateManyArgs>(args: SelectSubset<T, gasto_operativoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Gasto_operativos and returns the data updated in the database.
     * @param {gasto_operativoUpdateManyAndReturnArgs} args - Arguments to update many Gasto_operativos.
     * @example
     * // Update many Gasto_operativos
     * const gasto_operativo = await prisma.gasto_operativo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Gasto_operativos and only return the `id_gasto`
     * const gasto_operativoWithId_gastoOnly = await prisma.gasto_operativo.updateManyAndReturn({
     *   select: { id_gasto: true },
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
    updateManyAndReturn<T extends gasto_operativoUpdateManyAndReturnArgs>(args: SelectSubset<T, gasto_operativoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$gasto_operativoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Gasto_operativo.
     * @param {gasto_operativoUpsertArgs} args - Arguments to update or create a Gasto_operativo.
     * @example
     * // Update or create a Gasto_operativo
     * const gasto_operativo = await prisma.gasto_operativo.upsert({
     *   create: {
     *     // ... data to create a Gasto_operativo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Gasto_operativo we want to update
     *   }
     * })
     */
    upsert<T extends gasto_operativoUpsertArgs>(args: SelectSubset<T, gasto_operativoUpsertArgs<ExtArgs>>): Prisma__gasto_operativoClient<$Result.GetResult<Prisma.$gasto_operativoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Gasto_operativos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {gasto_operativoCountArgs} args - Arguments to filter Gasto_operativos to count.
     * @example
     * // Count the number of Gasto_operativos
     * const count = await prisma.gasto_operativo.count({
     *   where: {
     *     // ... the filter for the Gasto_operativos we want to count
     *   }
     * })
    **/
    count<T extends gasto_operativoCountArgs>(
      args?: Subset<T, gasto_operativoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Gasto_operativoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Gasto_operativo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Gasto_operativoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Gasto_operativoAggregateArgs>(args: Subset<T, Gasto_operativoAggregateArgs>): Prisma.PrismaPromise<GetGasto_operativoAggregateType<T>>

    /**
     * Group by Gasto_operativo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {gasto_operativoGroupByArgs} args - Group by arguments.
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
      T extends gasto_operativoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: gasto_operativoGroupByArgs['orderBy'] }
        : { orderBy?: gasto_operativoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, gasto_operativoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGasto_operativoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the gasto_operativo model
   */
  readonly fields: gasto_operativoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for gasto_operativo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__gasto_operativoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the gasto_operativo model
   */
  interface gasto_operativoFieldRefs {
    readonly id_gasto: FieldRef<"gasto_operativo", 'Int'>
    readonly categoria: FieldRef<"gasto_operativo", 'String'>
    readonly descripcion: FieldRef<"gasto_operativo", 'String'>
    readonly monto: FieldRef<"gasto_operativo", 'Decimal'>
    readonly fecha: FieldRef<"gasto_operativo", 'DateTime'>
    readonly comprobante: FieldRef<"gasto_operativo", 'String'>
    readonly proveedor_nombre: FieldRef<"gasto_operativo", 'String'>
    readonly es_recurrente: FieldRef<"gasto_operativo", 'Boolean'>
    readonly dia_recurrente: FieldRef<"gasto_operativo", 'Int'>
    readonly notas: FieldRef<"gasto_operativo", 'String'>
    readonly activo: FieldRef<"gasto_operativo", 'Boolean'>
    readonly fecha_creacion: FieldRef<"gasto_operativo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * gasto_operativo findUnique
   */
  export type gasto_operativoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gasto_operativo
     */
    select?: gasto_operativoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the gasto_operativo
     */
    omit?: gasto_operativoOmit<ExtArgs> | null
    /**
     * Filter, which gasto_operativo to fetch.
     */
    where: gasto_operativoWhereUniqueInput
  }

  /**
   * gasto_operativo findUniqueOrThrow
   */
  export type gasto_operativoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gasto_operativo
     */
    select?: gasto_operativoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the gasto_operativo
     */
    omit?: gasto_operativoOmit<ExtArgs> | null
    /**
     * Filter, which gasto_operativo to fetch.
     */
    where: gasto_operativoWhereUniqueInput
  }

  /**
   * gasto_operativo findFirst
   */
  export type gasto_operativoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gasto_operativo
     */
    select?: gasto_operativoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the gasto_operativo
     */
    omit?: gasto_operativoOmit<ExtArgs> | null
    /**
     * Filter, which gasto_operativo to fetch.
     */
    where?: gasto_operativoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of gasto_operativos to fetch.
     */
    orderBy?: gasto_operativoOrderByWithRelationInput | gasto_operativoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for gasto_operativos.
     */
    cursor?: gasto_operativoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` gasto_operativos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` gasto_operativos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of gasto_operativos.
     */
    distinct?: Gasto_operativoScalarFieldEnum | Gasto_operativoScalarFieldEnum[]
  }

  /**
   * gasto_operativo findFirstOrThrow
   */
  export type gasto_operativoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gasto_operativo
     */
    select?: gasto_operativoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the gasto_operativo
     */
    omit?: gasto_operativoOmit<ExtArgs> | null
    /**
     * Filter, which gasto_operativo to fetch.
     */
    where?: gasto_operativoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of gasto_operativos to fetch.
     */
    orderBy?: gasto_operativoOrderByWithRelationInput | gasto_operativoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for gasto_operativos.
     */
    cursor?: gasto_operativoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` gasto_operativos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` gasto_operativos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of gasto_operativos.
     */
    distinct?: Gasto_operativoScalarFieldEnum | Gasto_operativoScalarFieldEnum[]
  }

  /**
   * gasto_operativo findMany
   */
  export type gasto_operativoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gasto_operativo
     */
    select?: gasto_operativoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the gasto_operativo
     */
    omit?: gasto_operativoOmit<ExtArgs> | null
    /**
     * Filter, which gasto_operativos to fetch.
     */
    where?: gasto_operativoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of gasto_operativos to fetch.
     */
    orderBy?: gasto_operativoOrderByWithRelationInput | gasto_operativoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing gasto_operativos.
     */
    cursor?: gasto_operativoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` gasto_operativos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` gasto_operativos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of gasto_operativos.
     */
    distinct?: Gasto_operativoScalarFieldEnum | Gasto_operativoScalarFieldEnum[]
  }

  /**
   * gasto_operativo create
   */
  export type gasto_operativoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gasto_operativo
     */
    select?: gasto_operativoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the gasto_operativo
     */
    omit?: gasto_operativoOmit<ExtArgs> | null
    /**
     * The data needed to create a gasto_operativo.
     */
    data: XOR<gasto_operativoCreateInput, gasto_operativoUncheckedCreateInput>
  }

  /**
   * gasto_operativo createMany
   */
  export type gasto_operativoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many gasto_operativos.
     */
    data: gasto_operativoCreateManyInput | gasto_operativoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * gasto_operativo createManyAndReturn
   */
  export type gasto_operativoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gasto_operativo
     */
    select?: gasto_operativoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the gasto_operativo
     */
    omit?: gasto_operativoOmit<ExtArgs> | null
    /**
     * The data used to create many gasto_operativos.
     */
    data: gasto_operativoCreateManyInput | gasto_operativoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * gasto_operativo update
   */
  export type gasto_operativoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gasto_operativo
     */
    select?: gasto_operativoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the gasto_operativo
     */
    omit?: gasto_operativoOmit<ExtArgs> | null
    /**
     * The data needed to update a gasto_operativo.
     */
    data: XOR<gasto_operativoUpdateInput, gasto_operativoUncheckedUpdateInput>
    /**
     * Choose, which gasto_operativo to update.
     */
    where: gasto_operativoWhereUniqueInput
  }

  /**
   * gasto_operativo updateMany
   */
  export type gasto_operativoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update gasto_operativos.
     */
    data: XOR<gasto_operativoUpdateManyMutationInput, gasto_operativoUncheckedUpdateManyInput>
    /**
     * Filter which gasto_operativos to update
     */
    where?: gasto_operativoWhereInput
    /**
     * Limit how many gasto_operativos to update.
     */
    limit?: number
  }

  /**
   * gasto_operativo updateManyAndReturn
   */
  export type gasto_operativoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gasto_operativo
     */
    select?: gasto_operativoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the gasto_operativo
     */
    omit?: gasto_operativoOmit<ExtArgs> | null
    /**
     * The data used to update gasto_operativos.
     */
    data: XOR<gasto_operativoUpdateManyMutationInput, gasto_operativoUncheckedUpdateManyInput>
    /**
     * Filter which gasto_operativos to update
     */
    where?: gasto_operativoWhereInput
    /**
     * Limit how many gasto_operativos to update.
     */
    limit?: number
  }

  /**
   * gasto_operativo upsert
   */
  export type gasto_operativoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gasto_operativo
     */
    select?: gasto_operativoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the gasto_operativo
     */
    omit?: gasto_operativoOmit<ExtArgs> | null
    /**
     * The filter to search for the gasto_operativo to update in case it exists.
     */
    where: gasto_operativoWhereUniqueInput
    /**
     * In case the gasto_operativo found by the `where` argument doesn't exist, create a new gasto_operativo with this data.
     */
    create: XOR<gasto_operativoCreateInput, gasto_operativoUncheckedCreateInput>
    /**
     * In case the gasto_operativo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<gasto_operativoUpdateInput, gasto_operativoUncheckedUpdateInput>
  }

  /**
   * gasto_operativo delete
   */
  export type gasto_operativoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gasto_operativo
     */
    select?: gasto_operativoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the gasto_operativo
     */
    omit?: gasto_operativoOmit<ExtArgs> | null
    /**
     * Filter which gasto_operativo to delete.
     */
    where: gasto_operativoWhereUniqueInput
  }

  /**
   * gasto_operativo deleteMany
   */
  export type gasto_operativoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which gasto_operativos to delete
     */
    where?: gasto_operativoWhereInput
    /**
     * Limit how many gasto_operativos to delete.
     */
    limit?: number
  }

  /**
   * gasto_operativo without action
   */
  export type gasto_operativoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the gasto_operativo
     */
    select?: gasto_operativoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the gasto_operativo
     */
    omit?: gasto_operativoOmit<ExtArgs> | null
  }


  /**
   * Model categoria_gasto
   */

  export type AggregateCategoria_gasto = {
    _count: Categoria_gastoCountAggregateOutputType | null
    _avg: Categoria_gastoAvgAggregateOutputType | null
    _sum: Categoria_gastoSumAggregateOutputType | null
    _min: Categoria_gastoMinAggregateOutputType | null
    _max: Categoria_gastoMaxAggregateOutputType | null
  }

  export type Categoria_gastoAvgAggregateOutputType = {
    id: number | null
  }

  export type Categoria_gastoSumAggregateOutputType = {
    id: number | null
  }

  export type Categoria_gastoMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    activo: boolean | null
  }

  export type Categoria_gastoMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    activo: boolean | null
  }

  export type Categoria_gastoCountAggregateOutputType = {
    id: number
    nombre: number
    activo: number
    _all: number
  }


  export type Categoria_gastoAvgAggregateInputType = {
    id?: true
  }

  export type Categoria_gastoSumAggregateInputType = {
    id?: true
  }

  export type Categoria_gastoMinAggregateInputType = {
    id?: true
    nombre?: true
    activo?: true
  }

  export type Categoria_gastoMaxAggregateInputType = {
    id?: true
    nombre?: true
    activo?: true
  }

  export type Categoria_gastoCountAggregateInputType = {
    id?: true
    nombre?: true
    activo?: true
    _all?: true
  }

  export type Categoria_gastoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which categoria_gasto to aggregate.
     */
    where?: categoria_gastoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categoria_gastos to fetch.
     */
    orderBy?: categoria_gastoOrderByWithRelationInput | categoria_gastoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: categoria_gastoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categoria_gastos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categoria_gastos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned categoria_gastos
    **/
    _count?: true | Categoria_gastoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Categoria_gastoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Categoria_gastoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Categoria_gastoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Categoria_gastoMaxAggregateInputType
  }

  export type GetCategoria_gastoAggregateType<T extends Categoria_gastoAggregateArgs> = {
        [P in keyof T & keyof AggregateCategoria_gasto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategoria_gasto[P]>
      : GetScalarType<T[P], AggregateCategoria_gasto[P]>
  }




  export type categoria_gastoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: categoria_gastoWhereInput
    orderBy?: categoria_gastoOrderByWithAggregationInput | categoria_gastoOrderByWithAggregationInput[]
    by: Categoria_gastoScalarFieldEnum[] | Categoria_gastoScalarFieldEnum
    having?: categoria_gastoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Categoria_gastoCountAggregateInputType | true
    _avg?: Categoria_gastoAvgAggregateInputType
    _sum?: Categoria_gastoSumAggregateInputType
    _min?: Categoria_gastoMinAggregateInputType
    _max?: Categoria_gastoMaxAggregateInputType
  }

  export type Categoria_gastoGroupByOutputType = {
    id: number
    nombre: string
    activo: boolean
    _count: Categoria_gastoCountAggregateOutputType | null
    _avg: Categoria_gastoAvgAggregateOutputType | null
    _sum: Categoria_gastoSumAggregateOutputType | null
    _min: Categoria_gastoMinAggregateOutputType | null
    _max: Categoria_gastoMaxAggregateOutputType | null
  }

  type GetCategoria_gastoGroupByPayload<T extends categoria_gastoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Categoria_gastoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Categoria_gastoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Categoria_gastoGroupByOutputType[P]>
            : GetScalarType<T[P], Categoria_gastoGroupByOutputType[P]>
        }
      >
    >


  export type categoria_gastoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    activo?: boolean
  }, ExtArgs["result"]["categoria_gasto"]>

  export type categoria_gastoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    activo?: boolean
  }, ExtArgs["result"]["categoria_gasto"]>

  export type categoria_gastoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    activo?: boolean
  }, ExtArgs["result"]["categoria_gasto"]>

  export type categoria_gastoSelectScalar = {
    id?: boolean
    nombre?: boolean
    activo?: boolean
  }

  export type categoria_gastoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "activo", ExtArgs["result"]["categoria_gasto"]>

  export type $categoria_gastoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "categoria_gasto"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
      activo: boolean
    }, ExtArgs["result"]["categoria_gasto"]>
    composites: {}
  }

  type categoria_gastoGetPayload<S extends boolean | null | undefined | categoria_gastoDefaultArgs> = $Result.GetResult<Prisma.$categoria_gastoPayload, S>

  type categoria_gastoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<categoria_gastoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Categoria_gastoCountAggregateInputType | true
    }

  export interface categoria_gastoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['categoria_gasto'], meta: { name: 'categoria_gasto' } }
    /**
     * Find zero or one Categoria_gasto that matches the filter.
     * @param {categoria_gastoFindUniqueArgs} args - Arguments to find a Categoria_gasto
     * @example
     * // Get one Categoria_gasto
     * const categoria_gasto = await prisma.categoria_gasto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends categoria_gastoFindUniqueArgs>(args: SelectSubset<T, categoria_gastoFindUniqueArgs<ExtArgs>>): Prisma__categoria_gastoClient<$Result.GetResult<Prisma.$categoria_gastoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Categoria_gasto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {categoria_gastoFindUniqueOrThrowArgs} args - Arguments to find a Categoria_gasto
     * @example
     * // Get one Categoria_gasto
     * const categoria_gasto = await prisma.categoria_gasto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends categoria_gastoFindUniqueOrThrowArgs>(args: SelectSubset<T, categoria_gastoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__categoria_gastoClient<$Result.GetResult<Prisma.$categoria_gastoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categoria_gasto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoria_gastoFindFirstArgs} args - Arguments to find a Categoria_gasto
     * @example
     * // Get one Categoria_gasto
     * const categoria_gasto = await prisma.categoria_gasto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends categoria_gastoFindFirstArgs>(args?: SelectSubset<T, categoria_gastoFindFirstArgs<ExtArgs>>): Prisma__categoria_gastoClient<$Result.GetResult<Prisma.$categoria_gastoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Categoria_gasto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoria_gastoFindFirstOrThrowArgs} args - Arguments to find a Categoria_gasto
     * @example
     * // Get one Categoria_gasto
     * const categoria_gasto = await prisma.categoria_gasto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends categoria_gastoFindFirstOrThrowArgs>(args?: SelectSubset<T, categoria_gastoFindFirstOrThrowArgs<ExtArgs>>): Prisma__categoria_gastoClient<$Result.GetResult<Prisma.$categoria_gastoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categoria_gastos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoria_gastoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categoria_gastos
     * const categoria_gastos = await prisma.categoria_gasto.findMany()
     * 
     * // Get first 10 Categoria_gastos
     * const categoria_gastos = await prisma.categoria_gasto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoria_gastoWithIdOnly = await prisma.categoria_gasto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends categoria_gastoFindManyArgs>(args?: SelectSubset<T, categoria_gastoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoria_gastoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Categoria_gasto.
     * @param {categoria_gastoCreateArgs} args - Arguments to create a Categoria_gasto.
     * @example
     * // Create one Categoria_gasto
     * const Categoria_gasto = await prisma.categoria_gasto.create({
     *   data: {
     *     // ... data to create a Categoria_gasto
     *   }
     * })
     * 
     */
    create<T extends categoria_gastoCreateArgs>(args: SelectSubset<T, categoria_gastoCreateArgs<ExtArgs>>): Prisma__categoria_gastoClient<$Result.GetResult<Prisma.$categoria_gastoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categoria_gastos.
     * @param {categoria_gastoCreateManyArgs} args - Arguments to create many Categoria_gastos.
     * @example
     * // Create many Categoria_gastos
     * const categoria_gasto = await prisma.categoria_gasto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends categoria_gastoCreateManyArgs>(args?: SelectSubset<T, categoria_gastoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categoria_gastos and returns the data saved in the database.
     * @param {categoria_gastoCreateManyAndReturnArgs} args - Arguments to create many Categoria_gastos.
     * @example
     * // Create many Categoria_gastos
     * const categoria_gasto = await prisma.categoria_gasto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categoria_gastos and only return the `id`
     * const categoria_gastoWithIdOnly = await prisma.categoria_gasto.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends categoria_gastoCreateManyAndReturnArgs>(args?: SelectSubset<T, categoria_gastoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoria_gastoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Categoria_gasto.
     * @param {categoria_gastoDeleteArgs} args - Arguments to delete one Categoria_gasto.
     * @example
     * // Delete one Categoria_gasto
     * const Categoria_gasto = await prisma.categoria_gasto.delete({
     *   where: {
     *     // ... filter to delete one Categoria_gasto
     *   }
     * })
     * 
     */
    delete<T extends categoria_gastoDeleteArgs>(args: SelectSubset<T, categoria_gastoDeleteArgs<ExtArgs>>): Prisma__categoria_gastoClient<$Result.GetResult<Prisma.$categoria_gastoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Categoria_gasto.
     * @param {categoria_gastoUpdateArgs} args - Arguments to update one Categoria_gasto.
     * @example
     * // Update one Categoria_gasto
     * const categoria_gasto = await prisma.categoria_gasto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends categoria_gastoUpdateArgs>(args: SelectSubset<T, categoria_gastoUpdateArgs<ExtArgs>>): Prisma__categoria_gastoClient<$Result.GetResult<Prisma.$categoria_gastoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categoria_gastos.
     * @param {categoria_gastoDeleteManyArgs} args - Arguments to filter Categoria_gastos to delete.
     * @example
     * // Delete a few Categoria_gastos
     * const { count } = await prisma.categoria_gasto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends categoria_gastoDeleteManyArgs>(args?: SelectSubset<T, categoria_gastoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categoria_gastos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoria_gastoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categoria_gastos
     * const categoria_gasto = await prisma.categoria_gasto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends categoria_gastoUpdateManyArgs>(args: SelectSubset<T, categoria_gastoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categoria_gastos and returns the data updated in the database.
     * @param {categoria_gastoUpdateManyAndReturnArgs} args - Arguments to update many Categoria_gastos.
     * @example
     * // Update many Categoria_gastos
     * const categoria_gasto = await prisma.categoria_gasto.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categoria_gastos and only return the `id`
     * const categoria_gastoWithIdOnly = await prisma.categoria_gasto.updateManyAndReturn({
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
    updateManyAndReturn<T extends categoria_gastoUpdateManyAndReturnArgs>(args: SelectSubset<T, categoria_gastoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoria_gastoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Categoria_gasto.
     * @param {categoria_gastoUpsertArgs} args - Arguments to update or create a Categoria_gasto.
     * @example
     * // Update or create a Categoria_gasto
     * const categoria_gasto = await prisma.categoria_gasto.upsert({
     *   create: {
     *     // ... data to create a Categoria_gasto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Categoria_gasto we want to update
     *   }
     * })
     */
    upsert<T extends categoria_gastoUpsertArgs>(args: SelectSubset<T, categoria_gastoUpsertArgs<ExtArgs>>): Prisma__categoria_gastoClient<$Result.GetResult<Prisma.$categoria_gastoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categoria_gastos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoria_gastoCountArgs} args - Arguments to filter Categoria_gastos to count.
     * @example
     * // Count the number of Categoria_gastos
     * const count = await prisma.categoria_gasto.count({
     *   where: {
     *     // ... the filter for the Categoria_gastos we want to count
     *   }
     * })
    **/
    count<T extends categoria_gastoCountArgs>(
      args?: Subset<T, categoria_gastoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Categoria_gastoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Categoria_gasto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Categoria_gastoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Categoria_gastoAggregateArgs>(args: Subset<T, Categoria_gastoAggregateArgs>): Prisma.PrismaPromise<GetCategoria_gastoAggregateType<T>>

    /**
     * Group by Categoria_gasto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoria_gastoGroupByArgs} args - Group by arguments.
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
      T extends categoria_gastoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: categoria_gastoGroupByArgs['orderBy'] }
        : { orderBy?: categoria_gastoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, categoria_gastoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoria_gastoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the categoria_gasto model
   */
  readonly fields: categoria_gastoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for categoria_gasto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__categoria_gastoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the categoria_gasto model
   */
  interface categoria_gastoFieldRefs {
    readonly id: FieldRef<"categoria_gasto", 'Int'>
    readonly nombre: FieldRef<"categoria_gasto", 'String'>
    readonly activo: FieldRef<"categoria_gasto", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * categoria_gasto findUnique
   */
  export type categoria_gastoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria_gasto
     */
    select?: categoria_gastoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria_gasto
     */
    omit?: categoria_gastoOmit<ExtArgs> | null
    /**
     * Filter, which categoria_gasto to fetch.
     */
    where: categoria_gastoWhereUniqueInput
  }

  /**
   * categoria_gasto findUniqueOrThrow
   */
  export type categoria_gastoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria_gasto
     */
    select?: categoria_gastoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria_gasto
     */
    omit?: categoria_gastoOmit<ExtArgs> | null
    /**
     * Filter, which categoria_gasto to fetch.
     */
    where: categoria_gastoWhereUniqueInput
  }

  /**
   * categoria_gasto findFirst
   */
  export type categoria_gastoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria_gasto
     */
    select?: categoria_gastoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria_gasto
     */
    omit?: categoria_gastoOmit<ExtArgs> | null
    /**
     * Filter, which categoria_gasto to fetch.
     */
    where?: categoria_gastoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categoria_gastos to fetch.
     */
    orderBy?: categoria_gastoOrderByWithRelationInput | categoria_gastoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categoria_gastos.
     */
    cursor?: categoria_gastoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categoria_gastos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categoria_gastos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categoria_gastos.
     */
    distinct?: Categoria_gastoScalarFieldEnum | Categoria_gastoScalarFieldEnum[]
  }

  /**
   * categoria_gasto findFirstOrThrow
   */
  export type categoria_gastoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria_gasto
     */
    select?: categoria_gastoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria_gasto
     */
    omit?: categoria_gastoOmit<ExtArgs> | null
    /**
     * Filter, which categoria_gasto to fetch.
     */
    where?: categoria_gastoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categoria_gastos to fetch.
     */
    orderBy?: categoria_gastoOrderByWithRelationInput | categoria_gastoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categoria_gastos.
     */
    cursor?: categoria_gastoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categoria_gastos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categoria_gastos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categoria_gastos.
     */
    distinct?: Categoria_gastoScalarFieldEnum | Categoria_gastoScalarFieldEnum[]
  }

  /**
   * categoria_gasto findMany
   */
  export type categoria_gastoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria_gasto
     */
    select?: categoria_gastoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria_gasto
     */
    omit?: categoria_gastoOmit<ExtArgs> | null
    /**
     * Filter, which categoria_gastos to fetch.
     */
    where?: categoria_gastoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categoria_gastos to fetch.
     */
    orderBy?: categoria_gastoOrderByWithRelationInput | categoria_gastoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing categoria_gastos.
     */
    cursor?: categoria_gastoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categoria_gastos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categoria_gastos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categoria_gastos.
     */
    distinct?: Categoria_gastoScalarFieldEnum | Categoria_gastoScalarFieldEnum[]
  }

  /**
   * categoria_gasto create
   */
  export type categoria_gastoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria_gasto
     */
    select?: categoria_gastoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria_gasto
     */
    omit?: categoria_gastoOmit<ExtArgs> | null
    /**
     * The data needed to create a categoria_gasto.
     */
    data: XOR<categoria_gastoCreateInput, categoria_gastoUncheckedCreateInput>
  }

  /**
   * categoria_gasto createMany
   */
  export type categoria_gastoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many categoria_gastos.
     */
    data: categoria_gastoCreateManyInput | categoria_gastoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * categoria_gasto createManyAndReturn
   */
  export type categoria_gastoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria_gasto
     */
    select?: categoria_gastoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the categoria_gasto
     */
    omit?: categoria_gastoOmit<ExtArgs> | null
    /**
     * The data used to create many categoria_gastos.
     */
    data: categoria_gastoCreateManyInput | categoria_gastoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * categoria_gasto update
   */
  export type categoria_gastoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria_gasto
     */
    select?: categoria_gastoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria_gasto
     */
    omit?: categoria_gastoOmit<ExtArgs> | null
    /**
     * The data needed to update a categoria_gasto.
     */
    data: XOR<categoria_gastoUpdateInput, categoria_gastoUncheckedUpdateInput>
    /**
     * Choose, which categoria_gasto to update.
     */
    where: categoria_gastoWhereUniqueInput
  }

  /**
   * categoria_gasto updateMany
   */
  export type categoria_gastoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update categoria_gastos.
     */
    data: XOR<categoria_gastoUpdateManyMutationInput, categoria_gastoUncheckedUpdateManyInput>
    /**
     * Filter which categoria_gastos to update
     */
    where?: categoria_gastoWhereInput
    /**
     * Limit how many categoria_gastos to update.
     */
    limit?: number
  }

  /**
   * categoria_gasto updateManyAndReturn
   */
  export type categoria_gastoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria_gasto
     */
    select?: categoria_gastoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the categoria_gasto
     */
    omit?: categoria_gastoOmit<ExtArgs> | null
    /**
     * The data used to update categoria_gastos.
     */
    data: XOR<categoria_gastoUpdateManyMutationInput, categoria_gastoUncheckedUpdateManyInput>
    /**
     * Filter which categoria_gastos to update
     */
    where?: categoria_gastoWhereInput
    /**
     * Limit how many categoria_gastos to update.
     */
    limit?: number
  }

  /**
   * categoria_gasto upsert
   */
  export type categoria_gastoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria_gasto
     */
    select?: categoria_gastoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria_gasto
     */
    omit?: categoria_gastoOmit<ExtArgs> | null
    /**
     * The filter to search for the categoria_gasto to update in case it exists.
     */
    where: categoria_gastoWhereUniqueInput
    /**
     * In case the categoria_gasto found by the `where` argument doesn't exist, create a new categoria_gasto with this data.
     */
    create: XOR<categoria_gastoCreateInput, categoria_gastoUncheckedCreateInput>
    /**
     * In case the categoria_gasto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<categoria_gastoUpdateInput, categoria_gastoUncheckedUpdateInput>
  }

  /**
   * categoria_gasto delete
   */
  export type categoria_gastoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria_gasto
     */
    select?: categoria_gastoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria_gasto
     */
    omit?: categoria_gastoOmit<ExtArgs> | null
    /**
     * Filter which categoria_gasto to delete.
     */
    where: categoria_gastoWhereUniqueInput
  }

  /**
   * categoria_gasto deleteMany
   */
  export type categoria_gastoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which categoria_gastos to delete
     */
    where?: categoria_gastoWhereInput
    /**
     * Limit how many categoria_gastos to delete.
     */
    limit?: number
  }

  /**
   * categoria_gasto without action
   */
  export type categoria_gastoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the categoria_gasto
     */
    select?: categoria_gastoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the categoria_gasto
     */
    omit?: categoria_gastoOmit<ExtArgs> | null
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


  export const Cuenta_espacioScalarFieldEnum: {
    id_item: 'id_item',
    id_reserva: 'id_reserva',
    nombre_producto: 'nombre_producto',
    cantidad: 'cantidad',
    valor_unitario: 'valor_unitario',
    valor_total: 'valor_total',
    estado: 'estado',
    metodo_pago: 'metodo_pago',
    fecha_registro: 'fecha_registro',
    anotaciones: 'anotaciones'
  };

  export type Cuenta_espacioScalarFieldEnum = (typeof Cuenta_espacioScalarFieldEnum)[keyof typeof Cuenta_espacioScalarFieldEnum]


  export const Cuenta_personaScalarFieldEnum: {
    id_item_persona: 'id_item_persona',
    id_huesped: 'id_huesped',
    nombre_persona: 'nombre_persona',
    id_reserva: 'id_reserva',
    fecha: 'fecha',
    descripcion: 'descripcion',
    cantidad: 'cantidad',
    valor_unitario: 'valor_unitario',
    valor_total: 'valor_total',
    estado: 'estado',
    metodo_pago: 'metodo_pago',
    fecha_registro: 'fecha_registro'
  };

  export type Cuenta_personaScalarFieldEnum = (typeof Cuenta_personaScalarFieldEnum)[keyof typeof Cuenta_personaScalarFieldEnum]


  export const EspacioScalarFieldEnum: {
    id_espacio: 'id_espacio',
    numero: 'numero',
    tipo_espacio: 'tipo_espacio',
    tipo_habitacion: 'tipo_habitacion',
    capacidad_personas: 'capacidad_personas',
    precio_persona_1: 'precio_persona_1',
    precio_persona_2: 'precio_persona_2',
    precio_adicional: 'precio_adicional',
    estado_limpieza: 'estado_limpieza',
    activo: 'activo',
    tiene_minibar: 'tiene_minibar'
  };

  export type EspacioScalarFieldEnum = (typeof EspacioScalarFieldEnum)[keyof typeof EspacioScalarFieldEnum]


  export const HuespedScalarFieldEnum: {
    id_huesped: 'id_huesped',
    nombre_completo: 'nombre_completo',
    telefono: 'telefono',
    documento: 'documento',
    tipo_documento: 'tipo_documento',
    procedencia: 'procedencia',
    firma: 'firma',
    fecha_creacion: 'fecha_creacion'
  };

  export type HuespedScalarFieldEnum = (typeof HuespedScalarFieldEnum)[keyof typeof HuespedScalarFieldEnum]


  export const Inventario_minibarScalarFieldEnum: {
    id_inventario: 'id_inventario',
    id_espacio: 'id_espacio',
    nombre_producto: 'nombre_producto',
    cantidad: 'cantidad',
    precio_unitario: 'precio_unitario',
    fecha_vencimiento: 'fecha_vencimiento',
    fecha_actualizacion: 'fecha_actualizacion'
  };

  export type Inventario_minibarScalarFieldEnum = (typeof Inventario_minibarScalarFieldEnum)[keyof typeof Inventario_minibarScalarFieldEnum]


  export const ReservaScalarFieldEnum: {
    id_reserva: 'id_reserva',
    id_huesped: 'id_huesped',
    id_espacio: 'id_espacio',
    tipo_reserva: 'tipo_reserva',
    dni_tipo: 'dni_tipo',
    check_in: 'check_in',
    check_out: 'check_out',
    cantidad_adultos: 'cantidad_adultos',
    cantidad_ninos: 'cantidad_ninos',
    fecha_evento: 'fecha_evento',
    hora_inicio: 'hora_inicio',
    hora_fin: 'hora_fin',
    estado_reserva: 'estado_reserva',
    monto_total: 'monto_total',
    estado_pago: 'estado_pago',
    metodo_pago: 'metodo_pago',
    monto_pagado: 'monto_pagado',
    anotaciones: 'anotaciones',
    firma: 'firma',
    fecha_creacion: 'fecha_creacion'
  };

  export type ReservaScalarFieldEnum = (typeof ReservaScalarFieldEnum)[keyof typeof ReservaScalarFieldEnum]


  export const Configuracion_hotelScalarFieldEnum: {
    id: 'id',
    nombre_hotel: 'nombre_hotel',
    direccion: 'direccion',
    telefono: 'telefono',
    nit: 'nit',
    email: 'email',
    ciudad: 'ciudad',
    hora_check_in: 'hora_check_in',
    hora_check_out: 'hora_check_out',
    fecha_actualizacion: 'fecha_actualizacion'
  };

  export type Configuracion_hotelScalarFieldEnum = (typeof Configuracion_hotelScalarFieldEnum)[keyof typeof Configuracion_hotelScalarFieldEnum]


  export const Tipo_espacio_configScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    precio_base: 'precio_base',
    recargo_pareja: 'recargo_pareja',
    recargo_adicional: 'recargo_adicional',
    max_personas_adicionales: 'max_personas_adicionales'
  };

  export type Tipo_espacio_configScalarFieldEnum = (typeof Tipo_espacio_configScalarFieldEnum)[keyof typeof Tipo_espacio_configScalarFieldEnum]


  export const Categoria_inventarioScalarFieldEnum: {
    id_categoria: 'id_categoria',
    nombre: 'nombre',
    activo: 'activo',
    fecha_creacion: 'fecha_creacion'
  };

  export type Categoria_inventarioScalarFieldEnum = (typeof Categoria_inventarioScalarFieldEnum)[keyof typeof Categoria_inventarioScalarFieldEnum]


  export const ProveedorScalarFieldEnum: {
    id_proveedor: 'id_proveedor',
    nombre: 'nombre',
    nit: 'nit',
    telefono: 'telefono',
    email: 'email',
    direccion: 'direccion',
    ciudad: 'ciudad',
    contacto: 'contacto',
    notas: 'notas',
    activo: 'activo',
    fecha_creacion: 'fecha_creacion'
  };

  export type ProveedorScalarFieldEnum = (typeof ProveedorScalarFieldEnum)[keyof typeof ProveedorScalarFieldEnum]


  export const Producto_inventarioScalarFieldEnum: {
    id_producto: 'id_producto',
    nombre: 'nombre',
    descripcion: 'descripcion',
    categoria: 'categoria',
    unidad_medida: 'unidad_medida',
    precio_costo: 'precio_costo',
    precio_venta: 'precio_venta',
    stock_actual: 'stock_actual',
    stock_minimo: 'stock_minimo',
    id_proveedor: 'id_proveedor',
    activo: 'activo',
    fecha_creacion: 'fecha_creacion'
  };

  export type Producto_inventarioScalarFieldEnum = (typeof Producto_inventarioScalarFieldEnum)[keyof typeof Producto_inventarioScalarFieldEnum]


  export const Movimiento_inventarioScalarFieldEnum: {
    id_movimiento: 'id_movimiento',
    id_producto: 'id_producto',
    tipo: 'tipo',
    motivo: 'motivo',
    cantidad: 'cantidad',
    stock_antes: 'stock_antes',
    stock_despues: 'stock_despues',
    precio_unitario: 'precio_unitario',
    referencia_id: 'referencia_id',
    referencia_tipo: 'referencia_tipo',
    notas: 'notas',
    fecha: 'fecha'
  };

  export type Movimiento_inventarioScalarFieldEnum = (typeof Movimiento_inventarioScalarFieldEnum)[keyof typeof Movimiento_inventarioScalarFieldEnum]


  export const Gasto_operativoScalarFieldEnum: {
    id_gasto: 'id_gasto',
    categoria: 'categoria',
    descripcion: 'descripcion',
    monto: 'monto',
    fecha: 'fecha',
    comprobante: 'comprobante',
    proveedor_nombre: 'proveedor_nombre',
    es_recurrente: 'es_recurrente',
    dia_recurrente: 'dia_recurrente',
    notas: 'notas',
    activo: 'activo',
    fecha_creacion: 'fecha_creacion'
  };

  export type Gasto_operativoScalarFieldEnum = (typeof Gasto_operativoScalarFieldEnum)[keyof typeof Gasto_operativoScalarFieldEnum]


  export const Categoria_gastoScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    activo: 'activo'
  };

  export type Categoria_gastoScalarFieldEnum = (typeof Categoria_gastoScalarFieldEnum)[keyof typeof Categoria_gastoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type cuenta_espacioWhereInput = {
    AND?: cuenta_espacioWhereInput | cuenta_espacioWhereInput[]
    OR?: cuenta_espacioWhereInput[]
    NOT?: cuenta_espacioWhereInput | cuenta_espacioWhereInput[]
    id_item?: IntFilter<"cuenta_espacio"> | number
    id_reserva?: IntFilter<"cuenta_espacio"> | number
    nombre_producto?: StringFilter<"cuenta_espacio"> | string
    cantidad?: IntFilter<"cuenta_espacio"> | number
    valor_unitario?: DecimalFilter<"cuenta_espacio"> | Decimal | DecimalJsLike | number | string
    valor_total?: DecimalNullableFilter<"cuenta_espacio"> | Decimal | DecimalJsLike | number | string | null
    estado?: StringNullableFilter<"cuenta_espacio"> | string | null
    metodo_pago?: StringNullableFilter<"cuenta_espacio"> | string | null
    fecha_registro?: DateTimeNullableFilter<"cuenta_espacio"> | Date | string | null
    anotaciones?: StringNullableFilter<"cuenta_espacio"> | string | null
    reserva?: XOR<ReservaScalarRelationFilter, reservaWhereInput>
  }

  export type cuenta_espacioOrderByWithRelationInput = {
    id_item?: SortOrder
    id_reserva?: SortOrder
    nombre_producto?: SortOrder
    cantidad?: SortOrder
    valor_unitario?: SortOrder
    valor_total?: SortOrderInput | SortOrder
    estado?: SortOrderInput | SortOrder
    metodo_pago?: SortOrderInput | SortOrder
    fecha_registro?: SortOrderInput | SortOrder
    anotaciones?: SortOrderInput | SortOrder
    reserva?: reservaOrderByWithRelationInput
  }

  export type cuenta_espacioWhereUniqueInput = Prisma.AtLeast<{
    id_item?: number
    AND?: cuenta_espacioWhereInput | cuenta_espacioWhereInput[]
    OR?: cuenta_espacioWhereInput[]
    NOT?: cuenta_espacioWhereInput | cuenta_espacioWhereInput[]
    id_reserva?: IntFilter<"cuenta_espacio"> | number
    nombre_producto?: StringFilter<"cuenta_espacio"> | string
    cantidad?: IntFilter<"cuenta_espacio"> | number
    valor_unitario?: DecimalFilter<"cuenta_espacio"> | Decimal | DecimalJsLike | number | string
    valor_total?: DecimalNullableFilter<"cuenta_espacio"> | Decimal | DecimalJsLike | number | string | null
    estado?: StringNullableFilter<"cuenta_espacio"> | string | null
    metodo_pago?: StringNullableFilter<"cuenta_espacio"> | string | null
    fecha_registro?: DateTimeNullableFilter<"cuenta_espacio"> | Date | string | null
    anotaciones?: StringNullableFilter<"cuenta_espacio"> | string | null
    reserva?: XOR<ReservaScalarRelationFilter, reservaWhereInput>
  }, "id_item">

  export type cuenta_espacioOrderByWithAggregationInput = {
    id_item?: SortOrder
    id_reserva?: SortOrder
    nombre_producto?: SortOrder
    cantidad?: SortOrder
    valor_unitario?: SortOrder
    valor_total?: SortOrderInput | SortOrder
    estado?: SortOrderInput | SortOrder
    metodo_pago?: SortOrderInput | SortOrder
    fecha_registro?: SortOrderInput | SortOrder
    anotaciones?: SortOrderInput | SortOrder
    _count?: cuenta_espacioCountOrderByAggregateInput
    _avg?: cuenta_espacioAvgOrderByAggregateInput
    _max?: cuenta_espacioMaxOrderByAggregateInput
    _min?: cuenta_espacioMinOrderByAggregateInput
    _sum?: cuenta_espacioSumOrderByAggregateInput
  }

  export type cuenta_espacioScalarWhereWithAggregatesInput = {
    AND?: cuenta_espacioScalarWhereWithAggregatesInput | cuenta_espacioScalarWhereWithAggregatesInput[]
    OR?: cuenta_espacioScalarWhereWithAggregatesInput[]
    NOT?: cuenta_espacioScalarWhereWithAggregatesInput | cuenta_espacioScalarWhereWithAggregatesInput[]
    id_item?: IntWithAggregatesFilter<"cuenta_espacio"> | number
    id_reserva?: IntWithAggregatesFilter<"cuenta_espacio"> | number
    nombre_producto?: StringWithAggregatesFilter<"cuenta_espacio"> | string
    cantidad?: IntWithAggregatesFilter<"cuenta_espacio"> | number
    valor_unitario?: DecimalWithAggregatesFilter<"cuenta_espacio"> | Decimal | DecimalJsLike | number | string
    valor_total?: DecimalNullableWithAggregatesFilter<"cuenta_espacio"> | Decimal | DecimalJsLike | number | string | null
    estado?: StringNullableWithAggregatesFilter<"cuenta_espacio"> | string | null
    metodo_pago?: StringNullableWithAggregatesFilter<"cuenta_espacio"> | string | null
    fecha_registro?: DateTimeNullableWithAggregatesFilter<"cuenta_espacio"> | Date | string | null
    anotaciones?: StringNullableWithAggregatesFilter<"cuenta_espacio"> | string | null
  }

  export type cuenta_personaWhereInput = {
    AND?: cuenta_personaWhereInput | cuenta_personaWhereInput[]
    OR?: cuenta_personaWhereInput[]
    NOT?: cuenta_personaWhereInput | cuenta_personaWhereInput[]
    id_item_persona?: IntFilter<"cuenta_persona"> | number
    id_huesped?: IntNullableFilter<"cuenta_persona"> | number | null
    nombre_persona?: StringFilter<"cuenta_persona"> | string
    id_reserva?: IntNullableFilter<"cuenta_persona"> | number | null
    fecha?: DateTimeFilter<"cuenta_persona"> | Date | string
    descripcion?: StringFilter<"cuenta_persona"> | string
    cantidad?: IntFilter<"cuenta_persona"> | number
    valor_unitario?: DecimalFilter<"cuenta_persona"> | Decimal | DecimalJsLike | number | string
    valor_total?: DecimalNullableFilter<"cuenta_persona"> | Decimal | DecimalJsLike | number | string | null
    estado?: StringNullableFilter<"cuenta_persona"> | string | null
    metodo_pago?: StringNullableFilter<"cuenta_persona"> | string | null
    fecha_registro?: DateTimeNullableFilter<"cuenta_persona"> | Date | string | null
    huesped?: XOR<HuespedNullableScalarRelationFilter, huespedWhereInput> | null
    reserva?: XOR<ReservaNullableScalarRelationFilter, reservaWhereInput> | null
  }

  export type cuenta_personaOrderByWithRelationInput = {
    id_item_persona?: SortOrder
    id_huesped?: SortOrderInput | SortOrder
    nombre_persona?: SortOrder
    id_reserva?: SortOrderInput | SortOrder
    fecha?: SortOrder
    descripcion?: SortOrder
    cantidad?: SortOrder
    valor_unitario?: SortOrder
    valor_total?: SortOrderInput | SortOrder
    estado?: SortOrderInput | SortOrder
    metodo_pago?: SortOrderInput | SortOrder
    fecha_registro?: SortOrderInput | SortOrder
    huesped?: huespedOrderByWithRelationInput
    reserva?: reservaOrderByWithRelationInput
  }

  export type cuenta_personaWhereUniqueInput = Prisma.AtLeast<{
    id_item_persona?: number
    AND?: cuenta_personaWhereInput | cuenta_personaWhereInput[]
    OR?: cuenta_personaWhereInput[]
    NOT?: cuenta_personaWhereInput | cuenta_personaWhereInput[]
    id_huesped?: IntNullableFilter<"cuenta_persona"> | number | null
    nombre_persona?: StringFilter<"cuenta_persona"> | string
    id_reserva?: IntNullableFilter<"cuenta_persona"> | number | null
    fecha?: DateTimeFilter<"cuenta_persona"> | Date | string
    descripcion?: StringFilter<"cuenta_persona"> | string
    cantidad?: IntFilter<"cuenta_persona"> | number
    valor_unitario?: DecimalFilter<"cuenta_persona"> | Decimal | DecimalJsLike | number | string
    valor_total?: DecimalNullableFilter<"cuenta_persona"> | Decimal | DecimalJsLike | number | string | null
    estado?: StringNullableFilter<"cuenta_persona"> | string | null
    metodo_pago?: StringNullableFilter<"cuenta_persona"> | string | null
    fecha_registro?: DateTimeNullableFilter<"cuenta_persona"> | Date | string | null
    huesped?: XOR<HuespedNullableScalarRelationFilter, huespedWhereInput> | null
    reserva?: XOR<ReservaNullableScalarRelationFilter, reservaWhereInput> | null
  }, "id_item_persona">

  export type cuenta_personaOrderByWithAggregationInput = {
    id_item_persona?: SortOrder
    id_huesped?: SortOrderInput | SortOrder
    nombre_persona?: SortOrder
    id_reserva?: SortOrderInput | SortOrder
    fecha?: SortOrder
    descripcion?: SortOrder
    cantidad?: SortOrder
    valor_unitario?: SortOrder
    valor_total?: SortOrderInput | SortOrder
    estado?: SortOrderInput | SortOrder
    metodo_pago?: SortOrderInput | SortOrder
    fecha_registro?: SortOrderInput | SortOrder
    _count?: cuenta_personaCountOrderByAggregateInput
    _avg?: cuenta_personaAvgOrderByAggregateInput
    _max?: cuenta_personaMaxOrderByAggregateInput
    _min?: cuenta_personaMinOrderByAggregateInput
    _sum?: cuenta_personaSumOrderByAggregateInput
  }

  export type cuenta_personaScalarWhereWithAggregatesInput = {
    AND?: cuenta_personaScalarWhereWithAggregatesInput | cuenta_personaScalarWhereWithAggregatesInput[]
    OR?: cuenta_personaScalarWhereWithAggregatesInput[]
    NOT?: cuenta_personaScalarWhereWithAggregatesInput | cuenta_personaScalarWhereWithAggregatesInput[]
    id_item_persona?: IntWithAggregatesFilter<"cuenta_persona"> | number
    id_huesped?: IntNullableWithAggregatesFilter<"cuenta_persona"> | number | null
    nombre_persona?: StringWithAggregatesFilter<"cuenta_persona"> | string
    id_reserva?: IntNullableWithAggregatesFilter<"cuenta_persona"> | number | null
    fecha?: DateTimeWithAggregatesFilter<"cuenta_persona"> | Date | string
    descripcion?: StringWithAggregatesFilter<"cuenta_persona"> | string
    cantidad?: IntWithAggregatesFilter<"cuenta_persona"> | number
    valor_unitario?: DecimalWithAggregatesFilter<"cuenta_persona"> | Decimal | DecimalJsLike | number | string
    valor_total?: DecimalNullableWithAggregatesFilter<"cuenta_persona"> | Decimal | DecimalJsLike | number | string | null
    estado?: StringNullableWithAggregatesFilter<"cuenta_persona"> | string | null
    metodo_pago?: StringNullableWithAggregatesFilter<"cuenta_persona"> | string | null
    fecha_registro?: DateTimeNullableWithAggregatesFilter<"cuenta_persona"> | Date | string | null
  }

  export type espacioWhereInput = {
    AND?: espacioWhereInput | espacioWhereInput[]
    OR?: espacioWhereInput[]
    NOT?: espacioWhereInput | espacioWhereInput[]
    id_espacio?: IntFilter<"espacio"> | number
    numero?: StringFilter<"espacio"> | string
    tipo_espacio?: StringFilter<"espacio"> | string
    tipo_habitacion?: StringNullableFilter<"espacio"> | string | null
    capacidad_personas?: IntNullableFilter<"espacio"> | number | null
    precio_persona_1?: DecimalNullableFilter<"espacio"> | Decimal | DecimalJsLike | number | string | null
    precio_persona_2?: DecimalNullableFilter<"espacio"> | Decimal | DecimalJsLike | number | string | null
    precio_adicional?: DecimalNullableFilter<"espacio"> | Decimal | DecimalJsLike | number | string | null
    estado_limpieza?: StringNullableFilter<"espacio"> | string | null
    activo?: BoolNullableFilter<"espacio"> | boolean | null
    tiene_minibar?: BoolNullableFilter<"espacio"> | boolean | null
    inventario_minibar?: Inventario_minibarListRelationFilter
    reserva?: ReservaListRelationFilter
  }

  export type espacioOrderByWithRelationInput = {
    id_espacio?: SortOrder
    numero?: SortOrder
    tipo_espacio?: SortOrder
    tipo_habitacion?: SortOrderInput | SortOrder
    capacidad_personas?: SortOrderInput | SortOrder
    precio_persona_1?: SortOrderInput | SortOrder
    precio_persona_2?: SortOrderInput | SortOrder
    precio_adicional?: SortOrderInput | SortOrder
    estado_limpieza?: SortOrderInput | SortOrder
    activo?: SortOrderInput | SortOrder
    tiene_minibar?: SortOrderInput | SortOrder
    inventario_minibar?: inventario_minibarOrderByRelationAggregateInput
    reserva?: reservaOrderByRelationAggregateInput
  }

  export type espacioWhereUniqueInput = Prisma.AtLeast<{
    id_espacio?: number
    numero?: string
    AND?: espacioWhereInput | espacioWhereInput[]
    OR?: espacioWhereInput[]
    NOT?: espacioWhereInput | espacioWhereInput[]
    tipo_espacio?: StringFilter<"espacio"> | string
    tipo_habitacion?: StringNullableFilter<"espacio"> | string | null
    capacidad_personas?: IntNullableFilter<"espacio"> | number | null
    precio_persona_1?: DecimalNullableFilter<"espacio"> | Decimal | DecimalJsLike | number | string | null
    precio_persona_2?: DecimalNullableFilter<"espacio"> | Decimal | DecimalJsLike | number | string | null
    precio_adicional?: DecimalNullableFilter<"espacio"> | Decimal | DecimalJsLike | number | string | null
    estado_limpieza?: StringNullableFilter<"espacio"> | string | null
    activo?: BoolNullableFilter<"espacio"> | boolean | null
    tiene_minibar?: BoolNullableFilter<"espacio"> | boolean | null
    inventario_minibar?: Inventario_minibarListRelationFilter
    reserva?: ReservaListRelationFilter
  }, "id_espacio" | "numero">

  export type espacioOrderByWithAggregationInput = {
    id_espacio?: SortOrder
    numero?: SortOrder
    tipo_espacio?: SortOrder
    tipo_habitacion?: SortOrderInput | SortOrder
    capacidad_personas?: SortOrderInput | SortOrder
    precio_persona_1?: SortOrderInput | SortOrder
    precio_persona_2?: SortOrderInput | SortOrder
    precio_adicional?: SortOrderInput | SortOrder
    estado_limpieza?: SortOrderInput | SortOrder
    activo?: SortOrderInput | SortOrder
    tiene_minibar?: SortOrderInput | SortOrder
    _count?: espacioCountOrderByAggregateInput
    _avg?: espacioAvgOrderByAggregateInput
    _max?: espacioMaxOrderByAggregateInput
    _min?: espacioMinOrderByAggregateInput
    _sum?: espacioSumOrderByAggregateInput
  }

  export type espacioScalarWhereWithAggregatesInput = {
    AND?: espacioScalarWhereWithAggregatesInput | espacioScalarWhereWithAggregatesInput[]
    OR?: espacioScalarWhereWithAggregatesInput[]
    NOT?: espacioScalarWhereWithAggregatesInput | espacioScalarWhereWithAggregatesInput[]
    id_espacio?: IntWithAggregatesFilter<"espacio"> | number
    numero?: StringWithAggregatesFilter<"espacio"> | string
    tipo_espacio?: StringWithAggregatesFilter<"espacio"> | string
    tipo_habitacion?: StringNullableWithAggregatesFilter<"espacio"> | string | null
    capacidad_personas?: IntNullableWithAggregatesFilter<"espacio"> | number | null
    precio_persona_1?: DecimalNullableWithAggregatesFilter<"espacio"> | Decimal | DecimalJsLike | number | string | null
    precio_persona_2?: DecimalNullableWithAggregatesFilter<"espacio"> | Decimal | DecimalJsLike | number | string | null
    precio_adicional?: DecimalNullableWithAggregatesFilter<"espacio"> | Decimal | DecimalJsLike | number | string | null
    estado_limpieza?: StringNullableWithAggregatesFilter<"espacio"> | string | null
    activo?: BoolNullableWithAggregatesFilter<"espacio"> | boolean | null
    tiene_minibar?: BoolNullableWithAggregatesFilter<"espacio"> | boolean | null
  }

  export type huespedWhereInput = {
    AND?: huespedWhereInput | huespedWhereInput[]
    OR?: huespedWhereInput[]
    NOT?: huespedWhereInput | huespedWhereInput[]
    id_huesped?: IntFilter<"huesped"> | number
    nombre_completo?: StringFilter<"huesped"> | string
    telefono?: StringNullableFilter<"huesped"> | string | null
    documento?: StringNullableFilter<"huesped"> | string | null
    tipo_documento?: StringNullableFilter<"huesped"> | string | null
    procedencia?: StringNullableFilter<"huesped"> | string | null
    firma?: StringNullableFilter<"huesped"> | string | null
    fecha_creacion?: DateTimeNullableFilter<"huesped"> | Date | string | null
    cuenta_persona?: Cuenta_personaListRelationFilter
    reserva?: ReservaListRelationFilter
  }

  export type huespedOrderByWithRelationInput = {
    id_huesped?: SortOrder
    nombre_completo?: SortOrder
    telefono?: SortOrderInput | SortOrder
    documento?: SortOrderInput | SortOrder
    tipo_documento?: SortOrderInput | SortOrder
    procedencia?: SortOrderInput | SortOrder
    firma?: SortOrderInput | SortOrder
    fecha_creacion?: SortOrderInput | SortOrder
    cuenta_persona?: cuenta_personaOrderByRelationAggregateInput
    reserva?: reservaOrderByRelationAggregateInput
  }

  export type huespedWhereUniqueInput = Prisma.AtLeast<{
    id_huesped?: number
    AND?: huespedWhereInput | huespedWhereInput[]
    OR?: huespedWhereInput[]
    NOT?: huespedWhereInput | huespedWhereInput[]
    nombre_completo?: StringFilter<"huesped"> | string
    telefono?: StringNullableFilter<"huesped"> | string | null
    documento?: StringNullableFilter<"huesped"> | string | null
    tipo_documento?: StringNullableFilter<"huesped"> | string | null
    procedencia?: StringNullableFilter<"huesped"> | string | null
    firma?: StringNullableFilter<"huesped"> | string | null
    fecha_creacion?: DateTimeNullableFilter<"huesped"> | Date | string | null
    cuenta_persona?: Cuenta_personaListRelationFilter
    reserva?: ReservaListRelationFilter
  }, "id_huesped">

  export type huespedOrderByWithAggregationInput = {
    id_huesped?: SortOrder
    nombre_completo?: SortOrder
    telefono?: SortOrderInput | SortOrder
    documento?: SortOrderInput | SortOrder
    tipo_documento?: SortOrderInput | SortOrder
    procedencia?: SortOrderInput | SortOrder
    firma?: SortOrderInput | SortOrder
    fecha_creacion?: SortOrderInput | SortOrder
    _count?: huespedCountOrderByAggregateInput
    _avg?: huespedAvgOrderByAggregateInput
    _max?: huespedMaxOrderByAggregateInput
    _min?: huespedMinOrderByAggregateInput
    _sum?: huespedSumOrderByAggregateInput
  }

  export type huespedScalarWhereWithAggregatesInput = {
    AND?: huespedScalarWhereWithAggregatesInput | huespedScalarWhereWithAggregatesInput[]
    OR?: huespedScalarWhereWithAggregatesInput[]
    NOT?: huespedScalarWhereWithAggregatesInput | huespedScalarWhereWithAggregatesInput[]
    id_huesped?: IntWithAggregatesFilter<"huesped"> | number
    nombre_completo?: StringWithAggregatesFilter<"huesped"> | string
    telefono?: StringNullableWithAggregatesFilter<"huesped"> | string | null
    documento?: StringNullableWithAggregatesFilter<"huesped"> | string | null
    tipo_documento?: StringNullableWithAggregatesFilter<"huesped"> | string | null
    procedencia?: StringNullableWithAggregatesFilter<"huesped"> | string | null
    firma?: StringNullableWithAggregatesFilter<"huesped"> | string | null
    fecha_creacion?: DateTimeNullableWithAggregatesFilter<"huesped"> | Date | string | null
  }

  export type inventario_minibarWhereInput = {
    AND?: inventario_minibarWhereInput | inventario_minibarWhereInput[]
    OR?: inventario_minibarWhereInput[]
    NOT?: inventario_minibarWhereInput | inventario_minibarWhereInput[]
    id_inventario?: IntFilter<"inventario_minibar"> | number
    id_espacio?: IntFilter<"inventario_minibar"> | number
    nombre_producto?: StringFilter<"inventario_minibar"> | string
    cantidad?: IntFilter<"inventario_minibar"> | number
    precio_unitario?: DecimalFilter<"inventario_minibar"> | Decimal | DecimalJsLike | number | string
    fecha_vencimiento?: DateTimeNullableFilter<"inventario_minibar"> | Date | string | null
    fecha_actualizacion?: DateTimeNullableFilter<"inventario_minibar"> | Date | string | null
    espacio?: XOR<EspacioScalarRelationFilter, espacioWhereInput>
  }

  export type inventario_minibarOrderByWithRelationInput = {
    id_inventario?: SortOrder
    id_espacio?: SortOrder
    nombre_producto?: SortOrder
    cantidad?: SortOrder
    precio_unitario?: SortOrder
    fecha_vencimiento?: SortOrderInput | SortOrder
    fecha_actualizacion?: SortOrderInput | SortOrder
    espacio?: espacioOrderByWithRelationInput
  }

  export type inventario_minibarWhereUniqueInput = Prisma.AtLeast<{
    id_inventario?: number
    AND?: inventario_minibarWhereInput | inventario_minibarWhereInput[]
    OR?: inventario_minibarWhereInput[]
    NOT?: inventario_minibarWhereInput | inventario_minibarWhereInput[]
    id_espacio?: IntFilter<"inventario_minibar"> | number
    nombre_producto?: StringFilter<"inventario_minibar"> | string
    cantidad?: IntFilter<"inventario_minibar"> | number
    precio_unitario?: DecimalFilter<"inventario_minibar"> | Decimal | DecimalJsLike | number | string
    fecha_vencimiento?: DateTimeNullableFilter<"inventario_minibar"> | Date | string | null
    fecha_actualizacion?: DateTimeNullableFilter<"inventario_minibar"> | Date | string | null
    espacio?: XOR<EspacioScalarRelationFilter, espacioWhereInput>
  }, "id_inventario">

  export type inventario_minibarOrderByWithAggregationInput = {
    id_inventario?: SortOrder
    id_espacio?: SortOrder
    nombre_producto?: SortOrder
    cantidad?: SortOrder
    precio_unitario?: SortOrder
    fecha_vencimiento?: SortOrderInput | SortOrder
    fecha_actualizacion?: SortOrderInput | SortOrder
    _count?: inventario_minibarCountOrderByAggregateInput
    _avg?: inventario_minibarAvgOrderByAggregateInput
    _max?: inventario_minibarMaxOrderByAggregateInput
    _min?: inventario_minibarMinOrderByAggregateInput
    _sum?: inventario_minibarSumOrderByAggregateInput
  }

  export type inventario_minibarScalarWhereWithAggregatesInput = {
    AND?: inventario_minibarScalarWhereWithAggregatesInput | inventario_minibarScalarWhereWithAggregatesInput[]
    OR?: inventario_minibarScalarWhereWithAggregatesInput[]
    NOT?: inventario_minibarScalarWhereWithAggregatesInput | inventario_minibarScalarWhereWithAggregatesInput[]
    id_inventario?: IntWithAggregatesFilter<"inventario_minibar"> | number
    id_espacio?: IntWithAggregatesFilter<"inventario_minibar"> | number
    nombre_producto?: StringWithAggregatesFilter<"inventario_minibar"> | string
    cantidad?: IntWithAggregatesFilter<"inventario_minibar"> | number
    precio_unitario?: DecimalWithAggregatesFilter<"inventario_minibar"> | Decimal | DecimalJsLike | number | string
    fecha_vencimiento?: DateTimeNullableWithAggregatesFilter<"inventario_minibar"> | Date | string | null
    fecha_actualizacion?: DateTimeNullableWithAggregatesFilter<"inventario_minibar"> | Date | string | null
  }

  export type reservaWhereInput = {
    AND?: reservaWhereInput | reservaWhereInput[]
    OR?: reservaWhereInput[]
    NOT?: reservaWhereInput | reservaWhereInput[]
    id_reserva?: IntFilter<"reserva"> | number
    id_huesped?: IntFilter<"reserva"> | number
    id_espacio?: IntFilter<"reserva"> | number
    tipo_reserva?: StringFilter<"reserva"> | string
    dni_tipo?: StringNullableFilter<"reserva"> | string | null
    check_in?: DateTimeNullableFilter<"reserva"> | Date | string | null
    check_out?: DateTimeNullableFilter<"reserva"> | Date | string | null
    cantidad_adultos?: IntNullableFilter<"reserva"> | number | null
    cantidad_ninos?: IntNullableFilter<"reserva"> | number | null
    fecha_evento?: DateTimeNullableFilter<"reserva"> | Date | string | null
    hora_inicio?: DateTimeNullableFilter<"reserva"> | Date | string | null
    hora_fin?: DateTimeNullableFilter<"reserva"> | Date | string | null
    estado_reserva?: StringFilter<"reserva"> | string
    monto_total?: DecimalNullableFilter<"reserva"> | Decimal | DecimalJsLike | number | string | null
    estado_pago?: StringNullableFilter<"reserva"> | string | null
    metodo_pago?: StringNullableFilter<"reserva"> | string | null
    monto_pagado?: DecimalNullableFilter<"reserva"> | Decimal | DecimalJsLike | number | string | null
    anotaciones?: StringNullableFilter<"reserva"> | string | null
    firma?: StringNullableFilter<"reserva"> | string | null
    fecha_creacion?: DateTimeNullableFilter<"reserva"> | Date | string | null
    cuenta_espacio?: Cuenta_espacioListRelationFilter
    cuenta_persona?: Cuenta_personaListRelationFilter
    espacio?: XOR<EspacioScalarRelationFilter, espacioWhereInput>
    huesped?: XOR<HuespedScalarRelationFilter, huespedWhereInput>
  }

  export type reservaOrderByWithRelationInput = {
    id_reserva?: SortOrder
    id_huesped?: SortOrder
    id_espacio?: SortOrder
    tipo_reserva?: SortOrder
    dni_tipo?: SortOrderInput | SortOrder
    check_in?: SortOrderInput | SortOrder
    check_out?: SortOrderInput | SortOrder
    cantidad_adultos?: SortOrderInput | SortOrder
    cantidad_ninos?: SortOrderInput | SortOrder
    fecha_evento?: SortOrderInput | SortOrder
    hora_inicio?: SortOrderInput | SortOrder
    hora_fin?: SortOrderInput | SortOrder
    estado_reserva?: SortOrder
    monto_total?: SortOrderInput | SortOrder
    estado_pago?: SortOrderInput | SortOrder
    metodo_pago?: SortOrderInput | SortOrder
    monto_pagado?: SortOrderInput | SortOrder
    anotaciones?: SortOrderInput | SortOrder
    firma?: SortOrderInput | SortOrder
    fecha_creacion?: SortOrderInput | SortOrder
    cuenta_espacio?: cuenta_espacioOrderByRelationAggregateInput
    cuenta_persona?: cuenta_personaOrderByRelationAggregateInput
    espacio?: espacioOrderByWithRelationInput
    huesped?: huespedOrderByWithRelationInput
  }

  export type reservaWhereUniqueInput = Prisma.AtLeast<{
    id_reserva?: number
    AND?: reservaWhereInput | reservaWhereInput[]
    OR?: reservaWhereInput[]
    NOT?: reservaWhereInput | reservaWhereInput[]
    id_huesped?: IntFilter<"reserva"> | number
    id_espacio?: IntFilter<"reserva"> | number
    tipo_reserva?: StringFilter<"reserva"> | string
    dni_tipo?: StringNullableFilter<"reserva"> | string | null
    check_in?: DateTimeNullableFilter<"reserva"> | Date | string | null
    check_out?: DateTimeNullableFilter<"reserva"> | Date | string | null
    cantidad_adultos?: IntNullableFilter<"reserva"> | number | null
    cantidad_ninos?: IntNullableFilter<"reserva"> | number | null
    fecha_evento?: DateTimeNullableFilter<"reserva"> | Date | string | null
    hora_inicio?: DateTimeNullableFilter<"reserva"> | Date | string | null
    hora_fin?: DateTimeNullableFilter<"reserva"> | Date | string | null
    estado_reserva?: StringFilter<"reserva"> | string
    monto_total?: DecimalNullableFilter<"reserva"> | Decimal | DecimalJsLike | number | string | null
    estado_pago?: StringNullableFilter<"reserva"> | string | null
    metodo_pago?: StringNullableFilter<"reserva"> | string | null
    monto_pagado?: DecimalNullableFilter<"reserva"> | Decimal | DecimalJsLike | number | string | null
    anotaciones?: StringNullableFilter<"reserva"> | string | null
    firma?: StringNullableFilter<"reserva"> | string | null
    fecha_creacion?: DateTimeNullableFilter<"reserva"> | Date | string | null
    cuenta_espacio?: Cuenta_espacioListRelationFilter
    cuenta_persona?: Cuenta_personaListRelationFilter
    espacio?: XOR<EspacioScalarRelationFilter, espacioWhereInput>
    huesped?: XOR<HuespedScalarRelationFilter, huespedWhereInput>
  }, "id_reserva">

  export type reservaOrderByWithAggregationInput = {
    id_reserva?: SortOrder
    id_huesped?: SortOrder
    id_espacio?: SortOrder
    tipo_reserva?: SortOrder
    dni_tipo?: SortOrderInput | SortOrder
    check_in?: SortOrderInput | SortOrder
    check_out?: SortOrderInput | SortOrder
    cantidad_adultos?: SortOrderInput | SortOrder
    cantidad_ninos?: SortOrderInput | SortOrder
    fecha_evento?: SortOrderInput | SortOrder
    hora_inicio?: SortOrderInput | SortOrder
    hora_fin?: SortOrderInput | SortOrder
    estado_reserva?: SortOrder
    monto_total?: SortOrderInput | SortOrder
    estado_pago?: SortOrderInput | SortOrder
    metodo_pago?: SortOrderInput | SortOrder
    monto_pagado?: SortOrderInput | SortOrder
    anotaciones?: SortOrderInput | SortOrder
    firma?: SortOrderInput | SortOrder
    fecha_creacion?: SortOrderInput | SortOrder
    _count?: reservaCountOrderByAggregateInput
    _avg?: reservaAvgOrderByAggregateInput
    _max?: reservaMaxOrderByAggregateInput
    _min?: reservaMinOrderByAggregateInput
    _sum?: reservaSumOrderByAggregateInput
  }

  export type reservaScalarWhereWithAggregatesInput = {
    AND?: reservaScalarWhereWithAggregatesInput | reservaScalarWhereWithAggregatesInput[]
    OR?: reservaScalarWhereWithAggregatesInput[]
    NOT?: reservaScalarWhereWithAggregatesInput | reservaScalarWhereWithAggregatesInput[]
    id_reserva?: IntWithAggregatesFilter<"reserva"> | number
    id_huesped?: IntWithAggregatesFilter<"reserva"> | number
    id_espacio?: IntWithAggregatesFilter<"reserva"> | number
    tipo_reserva?: StringWithAggregatesFilter<"reserva"> | string
    dni_tipo?: StringNullableWithAggregatesFilter<"reserva"> | string | null
    check_in?: DateTimeNullableWithAggregatesFilter<"reserva"> | Date | string | null
    check_out?: DateTimeNullableWithAggregatesFilter<"reserva"> | Date | string | null
    cantidad_adultos?: IntNullableWithAggregatesFilter<"reserva"> | number | null
    cantidad_ninos?: IntNullableWithAggregatesFilter<"reserva"> | number | null
    fecha_evento?: DateTimeNullableWithAggregatesFilter<"reserva"> | Date | string | null
    hora_inicio?: DateTimeNullableWithAggregatesFilter<"reserva"> | Date | string | null
    hora_fin?: DateTimeNullableWithAggregatesFilter<"reserva"> | Date | string | null
    estado_reserva?: StringWithAggregatesFilter<"reserva"> | string
    monto_total?: DecimalNullableWithAggregatesFilter<"reserva"> | Decimal | DecimalJsLike | number | string | null
    estado_pago?: StringNullableWithAggregatesFilter<"reserva"> | string | null
    metodo_pago?: StringNullableWithAggregatesFilter<"reserva"> | string | null
    monto_pagado?: DecimalNullableWithAggregatesFilter<"reserva"> | Decimal | DecimalJsLike | number | string | null
    anotaciones?: StringNullableWithAggregatesFilter<"reserva"> | string | null
    firma?: StringNullableWithAggregatesFilter<"reserva"> | string | null
    fecha_creacion?: DateTimeNullableWithAggregatesFilter<"reserva"> | Date | string | null
  }

  export type configuracion_hotelWhereInput = {
    AND?: configuracion_hotelWhereInput | configuracion_hotelWhereInput[]
    OR?: configuracion_hotelWhereInput[]
    NOT?: configuracion_hotelWhereInput | configuracion_hotelWhereInput[]
    id?: IntFilter<"configuracion_hotel"> | number
    nombre_hotel?: StringNullableFilter<"configuracion_hotel"> | string | null
    direccion?: StringNullableFilter<"configuracion_hotel"> | string | null
    telefono?: StringNullableFilter<"configuracion_hotel"> | string | null
    nit?: StringNullableFilter<"configuracion_hotel"> | string | null
    email?: StringNullableFilter<"configuracion_hotel"> | string | null
    ciudad?: StringNullableFilter<"configuracion_hotel"> | string | null
    hora_check_in?: StringNullableFilter<"configuracion_hotel"> | string | null
    hora_check_out?: StringNullableFilter<"configuracion_hotel"> | string | null
    fecha_actualizacion?: DateTimeNullableFilter<"configuracion_hotel"> | Date | string | null
  }

  export type configuracion_hotelOrderByWithRelationInput = {
    id?: SortOrder
    nombre_hotel?: SortOrderInput | SortOrder
    direccion?: SortOrderInput | SortOrder
    telefono?: SortOrderInput | SortOrder
    nit?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    ciudad?: SortOrderInput | SortOrder
    hora_check_in?: SortOrderInput | SortOrder
    hora_check_out?: SortOrderInput | SortOrder
    fecha_actualizacion?: SortOrderInput | SortOrder
  }

  export type configuracion_hotelWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: configuracion_hotelWhereInput | configuracion_hotelWhereInput[]
    OR?: configuracion_hotelWhereInput[]
    NOT?: configuracion_hotelWhereInput | configuracion_hotelWhereInput[]
    nombre_hotel?: StringNullableFilter<"configuracion_hotel"> | string | null
    direccion?: StringNullableFilter<"configuracion_hotel"> | string | null
    telefono?: StringNullableFilter<"configuracion_hotel"> | string | null
    nit?: StringNullableFilter<"configuracion_hotel"> | string | null
    email?: StringNullableFilter<"configuracion_hotel"> | string | null
    ciudad?: StringNullableFilter<"configuracion_hotel"> | string | null
    hora_check_in?: StringNullableFilter<"configuracion_hotel"> | string | null
    hora_check_out?: StringNullableFilter<"configuracion_hotel"> | string | null
    fecha_actualizacion?: DateTimeNullableFilter<"configuracion_hotel"> | Date | string | null
  }, "id">

  export type configuracion_hotelOrderByWithAggregationInput = {
    id?: SortOrder
    nombre_hotel?: SortOrderInput | SortOrder
    direccion?: SortOrderInput | SortOrder
    telefono?: SortOrderInput | SortOrder
    nit?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    ciudad?: SortOrderInput | SortOrder
    hora_check_in?: SortOrderInput | SortOrder
    hora_check_out?: SortOrderInput | SortOrder
    fecha_actualizacion?: SortOrderInput | SortOrder
    _count?: configuracion_hotelCountOrderByAggregateInput
    _avg?: configuracion_hotelAvgOrderByAggregateInput
    _max?: configuracion_hotelMaxOrderByAggregateInput
    _min?: configuracion_hotelMinOrderByAggregateInput
    _sum?: configuracion_hotelSumOrderByAggregateInput
  }

  export type configuracion_hotelScalarWhereWithAggregatesInput = {
    AND?: configuracion_hotelScalarWhereWithAggregatesInput | configuracion_hotelScalarWhereWithAggregatesInput[]
    OR?: configuracion_hotelScalarWhereWithAggregatesInput[]
    NOT?: configuracion_hotelScalarWhereWithAggregatesInput | configuracion_hotelScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"configuracion_hotel"> | number
    nombre_hotel?: StringNullableWithAggregatesFilter<"configuracion_hotel"> | string | null
    direccion?: StringNullableWithAggregatesFilter<"configuracion_hotel"> | string | null
    telefono?: StringNullableWithAggregatesFilter<"configuracion_hotel"> | string | null
    nit?: StringNullableWithAggregatesFilter<"configuracion_hotel"> | string | null
    email?: StringNullableWithAggregatesFilter<"configuracion_hotel"> | string | null
    ciudad?: StringNullableWithAggregatesFilter<"configuracion_hotel"> | string | null
    hora_check_in?: StringNullableWithAggregatesFilter<"configuracion_hotel"> | string | null
    hora_check_out?: StringNullableWithAggregatesFilter<"configuracion_hotel"> | string | null
    fecha_actualizacion?: DateTimeNullableWithAggregatesFilter<"configuracion_hotel"> | Date | string | null
  }

  export type tipo_espacio_configWhereInput = {
    AND?: tipo_espacio_configWhereInput | tipo_espacio_configWhereInput[]
    OR?: tipo_espacio_configWhereInput[]
    NOT?: tipo_espacio_configWhereInput | tipo_espacio_configWhereInput[]
    id?: IntFilter<"tipo_espacio_config"> | number
    nombre?: StringFilter<"tipo_espacio_config"> | string
    precio_base?: DecimalFilter<"tipo_espacio_config"> | Decimal | DecimalJsLike | number | string
    recargo_pareja?: DecimalFilter<"tipo_espacio_config"> | Decimal | DecimalJsLike | number | string
    recargo_adicional?: DecimalFilter<"tipo_espacio_config"> | Decimal | DecimalJsLike | number | string
    max_personas_adicionales?: IntFilter<"tipo_espacio_config"> | number
  }

  export type tipo_espacio_configOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    precio_base?: SortOrder
    recargo_pareja?: SortOrder
    recargo_adicional?: SortOrder
    max_personas_adicionales?: SortOrder
  }

  export type tipo_espacio_configWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    nombre?: string
    AND?: tipo_espacio_configWhereInput | tipo_espacio_configWhereInput[]
    OR?: tipo_espacio_configWhereInput[]
    NOT?: tipo_espacio_configWhereInput | tipo_espacio_configWhereInput[]
    precio_base?: DecimalFilter<"tipo_espacio_config"> | Decimal | DecimalJsLike | number | string
    recargo_pareja?: DecimalFilter<"tipo_espacio_config"> | Decimal | DecimalJsLike | number | string
    recargo_adicional?: DecimalFilter<"tipo_espacio_config"> | Decimal | DecimalJsLike | number | string
    max_personas_adicionales?: IntFilter<"tipo_espacio_config"> | number
  }, "id" | "nombre">

  export type tipo_espacio_configOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    precio_base?: SortOrder
    recargo_pareja?: SortOrder
    recargo_adicional?: SortOrder
    max_personas_adicionales?: SortOrder
    _count?: tipo_espacio_configCountOrderByAggregateInput
    _avg?: tipo_espacio_configAvgOrderByAggregateInput
    _max?: tipo_espacio_configMaxOrderByAggregateInput
    _min?: tipo_espacio_configMinOrderByAggregateInput
    _sum?: tipo_espacio_configSumOrderByAggregateInput
  }

  export type tipo_espacio_configScalarWhereWithAggregatesInput = {
    AND?: tipo_espacio_configScalarWhereWithAggregatesInput | tipo_espacio_configScalarWhereWithAggregatesInput[]
    OR?: tipo_espacio_configScalarWhereWithAggregatesInput[]
    NOT?: tipo_espacio_configScalarWhereWithAggregatesInput | tipo_espacio_configScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"tipo_espacio_config"> | number
    nombre?: StringWithAggregatesFilter<"tipo_espacio_config"> | string
    precio_base?: DecimalWithAggregatesFilter<"tipo_espacio_config"> | Decimal | DecimalJsLike | number | string
    recargo_pareja?: DecimalWithAggregatesFilter<"tipo_espacio_config"> | Decimal | DecimalJsLike | number | string
    recargo_adicional?: DecimalWithAggregatesFilter<"tipo_espacio_config"> | Decimal | DecimalJsLike | number | string
    max_personas_adicionales?: IntWithAggregatesFilter<"tipo_espacio_config"> | number
  }

  export type categoria_inventarioWhereInput = {
    AND?: categoria_inventarioWhereInput | categoria_inventarioWhereInput[]
    OR?: categoria_inventarioWhereInput[]
    NOT?: categoria_inventarioWhereInput | categoria_inventarioWhereInput[]
    id_categoria?: IntFilter<"categoria_inventario"> | number
    nombre?: StringFilter<"categoria_inventario"> | string
    activo?: BoolFilter<"categoria_inventario"> | boolean
    fecha_creacion?: DateTimeFilter<"categoria_inventario"> | Date | string
  }

  export type categoria_inventarioOrderByWithRelationInput = {
    id_categoria?: SortOrder
    nombre?: SortOrder
    activo?: SortOrder
    fecha_creacion?: SortOrder
  }

  export type categoria_inventarioWhereUniqueInput = Prisma.AtLeast<{
    id_categoria?: number
    nombre?: string
    AND?: categoria_inventarioWhereInput | categoria_inventarioWhereInput[]
    OR?: categoria_inventarioWhereInput[]
    NOT?: categoria_inventarioWhereInput | categoria_inventarioWhereInput[]
    activo?: BoolFilter<"categoria_inventario"> | boolean
    fecha_creacion?: DateTimeFilter<"categoria_inventario"> | Date | string
  }, "id_categoria" | "nombre">

  export type categoria_inventarioOrderByWithAggregationInput = {
    id_categoria?: SortOrder
    nombre?: SortOrder
    activo?: SortOrder
    fecha_creacion?: SortOrder
    _count?: categoria_inventarioCountOrderByAggregateInput
    _avg?: categoria_inventarioAvgOrderByAggregateInput
    _max?: categoria_inventarioMaxOrderByAggregateInput
    _min?: categoria_inventarioMinOrderByAggregateInput
    _sum?: categoria_inventarioSumOrderByAggregateInput
  }

  export type categoria_inventarioScalarWhereWithAggregatesInput = {
    AND?: categoria_inventarioScalarWhereWithAggregatesInput | categoria_inventarioScalarWhereWithAggregatesInput[]
    OR?: categoria_inventarioScalarWhereWithAggregatesInput[]
    NOT?: categoria_inventarioScalarWhereWithAggregatesInput | categoria_inventarioScalarWhereWithAggregatesInput[]
    id_categoria?: IntWithAggregatesFilter<"categoria_inventario"> | number
    nombre?: StringWithAggregatesFilter<"categoria_inventario"> | string
    activo?: BoolWithAggregatesFilter<"categoria_inventario"> | boolean
    fecha_creacion?: DateTimeWithAggregatesFilter<"categoria_inventario"> | Date | string
  }

  export type proveedorWhereInput = {
    AND?: proveedorWhereInput | proveedorWhereInput[]
    OR?: proveedorWhereInput[]
    NOT?: proveedorWhereInput | proveedorWhereInput[]
    id_proveedor?: IntFilter<"proveedor"> | number
    nombre?: StringFilter<"proveedor"> | string
    nit?: StringNullableFilter<"proveedor"> | string | null
    telefono?: StringNullableFilter<"proveedor"> | string | null
    email?: StringNullableFilter<"proveedor"> | string | null
    direccion?: StringNullableFilter<"proveedor"> | string | null
    ciudad?: StringNullableFilter<"proveedor"> | string | null
    contacto?: StringNullableFilter<"proveedor"> | string | null
    notas?: StringNullableFilter<"proveedor"> | string | null
    activo?: BoolFilter<"proveedor"> | boolean
    fecha_creacion?: DateTimeFilter<"proveedor"> | Date | string
    productos?: Producto_inventarioListRelationFilter
  }

  export type proveedorOrderByWithRelationInput = {
    id_proveedor?: SortOrder
    nombre?: SortOrder
    nit?: SortOrderInput | SortOrder
    telefono?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    direccion?: SortOrderInput | SortOrder
    ciudad?: SortOrderInput | SortOrder
    contacto?: SortOrderInput | SortOrder
    notas?: SortOrderInput | SortOrder
    activo?: SortOrder
    fecha_creacion?: SortOrder
    productos?: producto_inventarioOrderByRelationAggregateInput
  }

  export type proveedorWhereUniqueInput = Prisma.AtLeast<{
    id_proveedor?: number
    AND?: proveedorWhereInput | proveedorWhereInput[]
    OR?: proveedorWhereInput[]
    NOT?: proveedorWhereInput | proveedorWhereInput[]
    nombre?: StringFilter<"proveedor"> | string
    nit?: StringNullableFilter<"proveedor"> | string | null
    telefono?: StringNullableFilter<"proveedor"> | string | null
    email?: StringNullableFilter<"proveedor"> | string | null
    direccion?: StringNullableFilter<"proveedor"> | string | null
    ciudad?: StringNullableFilter<"proveedor"> | string | null
    contacto?: StringNullableFilter<"proveedor"> | string | null
    notas?: StringNullableFilter<"proveedor"> | string | null
    activo?: BoolFilter<"proveedor"> | boolean
    fecha_creacion?: DateTimeFilter<"proveedor"> | Date | string
    productos?: Producto_inventarioListRelationFilter
  }, "id_proveedor">

  export type proveedorOrderByWithAggregationInput = {
    id_proveedor?: SortOrder
    nombre?: SortOrder
    nit?: SortOrderInput | SortOrder
    telefono?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    direccion?: SortOrderInput | SortOrder
    ciudad?: SortOrderInput | SortOrder
    contacto?: SortOrderInput | SortOrder
    notas?: SortOrderInput | SortOrder
    activo?: SortOrder
    fecha_creacion?: SortOrder
    _count?: proveedorCountOrderByAggregateInput
    _avg?: proveedorAvgOrderByAggregateInput
    _max?: proveedorMaxOrderByAggregateInput
    _min?: proveedorMinOrderByAggregateInput
    _sum?: proveedorSumOrderByAggregateInput
  }

  export type proveedorScalarWhereWithAggregatesInput = {
    AND?: proveedorScalarWhereWithAggregatesInput | proveedorScalarWhereWithAggregatesInput[]
    OR?: proveedorScalarWhereWithAggregatesInput[]
    NOT?: proveedorScalarWhereWithAggregatesInput | proveedorScalarWhereWithAggregatesInput[]
    id_proveedor?: IntWithAggregatesFilter<"proveedor"> | number
    nombre?: StringWithAggregatesFilter<"proveedor"> | string
    nit?: StringNullableWithAggregatesFilter<"proveedor"> | string | null
    telefono?: StringNullableWithAggregatesFilter<"proveedor"> | string | null
    email?: StringNullableWithAggregatesFilter<"proveedor"> | string | null
    direccion?: StringNullableWithAggregatesFilter<"proveedor"> | string | null
    ciudad?: StringNullableWithAggregatesFilter<"proveedor"> | string | null
    contacto?: StringNullableWithAggregatesFilter<"proveedor"> | string | null
    notas?: StringNullableWithAggregatesFilter<"proveedor"> | string | null
    activo?: BoolWithAggregatesFilter<"proveedor"> | boolean
    fecha_creacion?: DateTimeWithAggregatesFilter<"proveedor"> | Date | string
  }

  export type producto_inventarioWhereInput = {
    AND?: producto_inventarioWhereInput | producto_inventarioWhereInput[]
    OR?: producto_inventarioWhereInput[]
    NOT?: producto_inventarioWhereInput | producto_inventarioWhereInput[]
    id_producto?: IntFilter<"producto_inventario"> | number
    nombre?: StringFilter<"producto_inventario"> | string
    descripcion?: StringNullableFilter<"producto_inventario"> | string | null
    categoria?: StringFilter<"producto_inventario"> | string
    unidad_medida?: StringFilter<"producto_inventario"> | string
    precio_costo?: DecimalFilter<"producto_inventario"> | Decimal | DecimalJsLike | number | string
    precio_venta?: DecimalFilter<"producto_inventario"> | Decimal | DecimalJsLike | number | string
    stock_actual?: DecimalFilter<"producto_inventario"> | Decimal | DecimalJsLike | number | string
    stock_minimo?: DecimalFilter<"producto_inventario"> | Decimal | DecimalJsLike | number | string
    id_proveedor?: IntNullableFilter<"producto_inventario"> | number | null
    activo?: BoolFilter<"producto_inventario"> | boolean
    fecha_creacion?: DateTimeFilter<"producto_inventario"> | Date | string
    proveedor?: XOR<ProveedorNullableScalarRelationFilter, proveedorWhereInput> | null
    movimientos?: Movimiento_inventarioListRelationFilter
  }

  export type producto_inventarioOrderByWithRelationInput = {
    id_producto?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    categoria?: SortOrder
    unidad_medida?: SortOrder
    precio_costo?: SortOrder
    precio_venta?: SortOrder
    stock_actual?: SortOrder
    stock_minimo?: SortOrder
    id_proveedor?: SortOrderInput | SortOrder
    activo?: SortOrder
    fecha_creacion?: SortOrder
    proveedor?: proveedorOrderByWithRelationInput
    movimientos?: movimiento_inventarioOrderByRelationAggregateInput
  }

  export type producto_inventarioWhereUniqueInput = Prisma.AtLeast<{
    id_producto?: number
    AND?: producto_inventarioWhereInput | producto_inventarioWhereInput[]
    OR?: producto_inventarioWhereInput[]
    NOT?: producto_inventarioWhereInput | producto_inventarioWhereInput[]
    nombre?: StringFilter<"producto_inventario"> | string
    descripcion?: StringNullableFilter<"producto_inventario"> | string | null
    categoria?: StringFilter<"producto_inventario"> | string
    unidad_medida?: StringFilter<"producto_inventario"> | string
    precio_costo?: DecimalFilter<"producto_inventario"> | Decimal | DecimalJsLike | number | string
    precio_venta?: DecimalFilter<"producto_inventario"> | Decimal | DecimalJsLike | number | string
    stock_actual?: DecimalFilter<"producto_inventario"> | Decimal | DecimalJsLike | number | string
    stock_minimo?: DecimalFilter<"producto_inventario"> | Decimal | DecimalJsLike | number | string
    id_proveedor?: IntNullableFilter<"producto_inventario"> | number | null
    activo?: BoolFilter<"producto_inventario"> | boolean
    fecha_creacion?: DateTimeFilter<"producto_inventario"> | Date | string
    proveedor?: XOR<ProveedorNullableScalarRelationFilter, proveedorWhereInput> | null
    movimientos?: Movimiento_inventarioListRelationFilter
  }, "id_producto">

  export type producto_inventarioOrderByWithAggregationInput = {
    id_producto?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    categoria?: SortOrder
    unidad_medida?: SortOrder
    precio_costo?: SortOrder
    precio_venta?: SortOrder
    stock_actual?: SortOrder
    stock_minimo?: SortOrder
    id_proveedor?: SortOrderInput | SortOrder
    activo?: SortOrder
    fecha_creacion?: SortOrder
    _count?: producto_inventarioCountOrderByAggregateInput
    _avg?: producto_inventarioAvgOrderByAggregateInput
    _max?: producto_inventarioMaxOrderByAggregateInput
    _min?: producto_inventarioMinOrderByAggregateInput
    _sum?: producto_inventarioSumOrderByAggregateInput
  }

  export type producto_inventarioScalarWhereWithAggregatesInput = {
    AND?: producto_inventarioScalarWhereWithAggregatesInput | producto_inventarioScalarWhereWithAggregatesInput[]
    OR?: producto_inventarioScalarWhereWithAggregatesInput[]
    NOT?: producto_inventarioScalarWhereWithAggregatesInput | producto_inventarioScalarWhereWithAggregatesInput[]
    id_producto?: IntWithAggregatesFilter<"producto_inventario"> | number
    nombre?: StringWithAggregatesFilter<"producto_inventario"> | string
    descripcion?: StringNullableWithAggregatesFilter<"producto_inventario"> | string | null
    categoria?: StringWithAggregatesFilter<"producto_inventario"> | string
    unidad_medida?: StringWithAggregatesFilter<"producto_inventario"> | string
    precio_costo?: DecimalWithAggregatesFilter<"producto_inventario"> | Decimal | DecimalJsLike | number | string
    precio_venta?: DecimalWithAggregatesFilter<"producto_inventario"> | Decimal | DecimalJsLike | number | string
    stock_actual?: DecimalWithAggregatesFilter<"producto_inventario"> | Decimal | DecimalJsLike | number | string
    stock_minimo?: DecimalWithAggregatesFilter<"producto_inventario"> | Decimal | DecimalJsLike | number | string
    id_proveedor?: IntNullableWithAggregatesFilter<"producto_inventario"> | number | null
    activo?: BoolWithAggregatesFilter<"producto_inventario"> | boolean
    fecha_creacion?: DateTimeWithAggregatesFilter<"producto_inventario"> | Date | string
  }

  export type movimiento_inventarioWhereInput = {
    AND?: movimiento_inventarioWhereInput | movimiento_inventarioWhereInput[]
    OR?: movimiento_inventarioWhereInput[]
    NOT?: movimiento_inventarioWhereInput | movimiento_inventarioWhereInput[]
    id_movimiento?: IntFilter<"movimiento_inventario"> | number
    id_producto?: IntFilter<"movimiento_inventario"> | number
    tipo?: StringFilter<"movimiento_inventario"> | string
    motivo?: StringFilter<"movimiento_inventario"> | string
    cantidad?: DecimalFilter<"movimiento_inventario"> | Decimal | DecimalJsLike | number | string
    stock_antes?: DecimalFilter<"movimiento_inventario"> | Decimal | DecimalJsLike | number | string
    stock_despues?: DecimalFilter<"movimiento_inventario"> | Decimal | DecimalJsLike | number | string
    precio_unitario?: DecimalFilter<"movimiento_inventario"> | Decimal | DecimalJsLike | number | string
    referencia_id?: IntNullableFilter<"movimiento_inventario"> | number | null
    referencia_tipo?: StringNullableFilter<"movimiento_inventario"> | string | null
    notas?: StringNullableFilter<"movimiento_inventario"> | string | null
    fecha?: DateTimeFilter<"movimiento_inventario"> | Date | string
    producto?: XOR<Producto_inventarioScalarRelationFilter, producto_inventarioWhereInput>
  }

  export type movimiento_inventarioOrderByWithRelationInput = {
    id_movimiento?: SortOrder
    id_producto?: SortOrder
    tipo?: SortOrder
    motivo?: SortOrder
    cantidad?: SortOrder
    stock_antes?: SortOrder
    stock_despues?: SortOrder
    precio_unitario?: SortOrder
    referencia_id?: SortOrderInput | SortOrder
    referencia_tipo?: SortOrderInput | SortOrder
    notas?: SortOrderInput | SortOrder
    fecha?: SortOrder
    producto?: producto_inventarioOrderByWithRelationInput
  }

  export type movimiento_inventarioWhereUniqueInput = Prisma.AtLeast<{
    id_movimiento?: number
    AND?: movimiento_inventarioWhereInput | movimiento_inventarioWhereInput[]
    OR?: movimiento_inventarioWhereInput[]
    NOT?: movimiento_inventarioWhereInput | movimiento_inventarioWhereInput[]
    id_producto?: IntFilter<"movimiento_inventario"> | number
    tipo?: StringFilter<"movimiento_inventario"> | string
    motivo?: StringFilter<"movimiento_inventario"> | string
    cantidad?: DecimalFilter<"movimiento_inventario"> | Decimal | DecimalJsLike | number | string
    stock_antes?: DecimalFilter<"movimiento_inventario"> | Decimal | DecimalJsLike | number | string
    stock_despues?: DecimalFilter<"movimiento_inventario"> | Decimal | DecimalJsLike | number | string
    precio_unitario?: DecimalFilter<"movimiento_inventario"> | Decimal | DecimalJsLike | number | string
    referencia_id?: IntNullableFilter<"movimiento_inventario"> | number | null
    referencia_tipo?: StringNullableFilter<"movimiento_inventario"> | string | null
    notas?: StringNullableFilter<"movimiento_inventario"> | string | null
    fecha?: DateTimeFilter<"movimiento_inventario"> | Date | string
    producto?: XOR<Producto_inventarioScalarRelationFilter, producto_inventarioWhereInput>
  }, "id_movimiento">

  export type movimiento_inventarioOrderByWithAggregationInput = {
    id_movimiento?: SortOrder
    id_producto?: SortOrder
    tipo?: SortOrder
    motivo?: SortOrder
    cantidad?: SortOrder
    stock_antes?: SortOrder
    stock_despues?: SortOrder
    precio_unitario?: SortOrder
    referencia_id?: SortOrderInput | SortOrder
    referencia_tipo?: SortOrderInput | SortOrder
    notas?: SortOrderInput | SortOrder
    fecha?: SortOrder
    _count?: movimiento_inventarioCountOrderByAggregateInput
    _avg?: movimiento_inventarioAvgOrderByAggregateInput
    _max?: movimiento_inventarioMaxOrderByAggregateInput
    _min?: movimiento_inventarioMinOrderByAggregateInput
    _sum?: movimiento_inventarioSumOrderByAggregateInput
  }

  export type movimiento_inventarioScalarWhereWithAggregatesInput = {
    AND?: movimiento_inventarioScalarWhereWithAggregatesInput | movimiento_inventarioScalarWhereWithAggregatesInput[]
    OR?: movimiento_inventarioScalarWhereWithAggregatesInput[]
    NOT?: movimiento_inventarioScalarWhereWithAggregatesInput | movimiento_inventarioScalarWhereWithAggregatesInput[]
    id_movimiento?: IntWithAggregatesFilter<"movimiento_inventario"> | number
    id_producto?: IntWithAggregatesFilter<"movimiento_inventario"> | number
    tipo?: StringWithAggregatesFilter<"movimiento_inventario"> | string
    motivo?: StringWithAggregatesFilter<"movimiento_inventario"> | string
    cantidad?: DecimalWithAggregatesFilter<"movimiento_inventario"> | Decimal | DecimalJsLike | number | string
    stock_antes?: DecimalWithAggregatesFilter<"movimiento_inventario"> | Decimal | DecimalJsLike | number | string
    stock_despues?: DecimalWithAggregatesFilter<"movimiento_inventario"> | Decimal | DecimalJsLike | number | string
    precio_unitario?: DecimalWithAggregatesFilter<"movimiento_inventario"> | Decimal | DecimalJsLike | number | string
    referencia_id?: IntNullableWithAggregatesFilter<"movimiento_inventario"> | number | null
    referencia_tipo?: StringNullableWithAggregatesFilter<"movimiento_inventario"> | string | null
    notas?: StringNullableWithAggregatesFilter<"movimiento_inventario"> | string | null
    fecha?: DateTimeWithAggregatesFilter<"movimiento_inventario"> | Date | string
  }

  export type gasto_operativoWhereInput = {
    AND?: gasto_operativoWhereInput | gasto_operativoWhereInput[]
    OR?: gasto_operativoWhereInput[]
    NOT?: gasto_operativoWhereInput | gasto_operativoWhereInput[]
    id_gasto?: IntFilter<"gasto_operativo"> | number
    categoria?: StringFilter<"gasto_operativo"> | string
    descripcion?: StringFilter<"gasto_operativo"> | string
    monto?: DecimalFilter<"gasto_operativo"> | Decimal | DecimalJsLike | number | string
    fecha?: DateTimeFilter<"gasto_operativo"> | Date | string
    comprobante?: StringNullableFilter<"gasto_operativo"> | string | null
    proveedor_nombre?: StringNullableFilter<"gasto_operativo"> | string | null
    es_recurrente?: BoolFilter<"gasto_operativo"> | boolean
    dia_recurrente?: IntNullableFilter<"gasto_operativo"> | number | null
    notas?: StringNullableFilter<"gasto_operativo"> | string | null
    activo?: BoolFilter<"gasto_operativo"> | boolean
    fecha_creacion?: DateTimeFilter<"gasto_operativo"> | Date | string
  }

  export type gasto_operativoOrderByWithRelationInput = {
    id_gasto?: SortOrder
    categoria?: SortOrder
    descripcion?: SortOrder
    monto?: SortOrder
    fecha?: SortOrder
    comprobante?: SortOrderInput | SortOrder
    proveedor_nombre?: SortOrderInput | SortOrder
    es_recurrente?: SortOrder
    dia_recurrente?: SortOrderInput | SortOrder
    notas?: SortOrderInput | SortOrder
    activo?: SortOrder
    fecha_creacion?: SortOrder
  }

  export type gasto_operativoWhereUniqueInput = Prisma.AtLeast<{
    id_gasto?: number
    AND?: gasto_operativoWhereInput | gasto_operativoWhereInput[]
    OR?: gasto_operativoWhereInput[]
    NOT?: gasto_operativoWhereInput | gasto_operativoWhereInput[]
    categoria?: StringFilter<"gasto_operativo"> | string
    descripcion?: StringFilter<"gasto_operativo"> | string
    monto?: DecimalFilter<"gasto_operativo"> | Decimal | DecimalJsLike | number | string
    fecha?: DateTimeFilter<"gasto_operativo"> | Date | string
    comprobante?: StringNullableFilter<"gasto_operativo"> | string | null
    proveedor_nombre?: StringNullableFilter<"gasto_operativo"> | string | null
    es_recurrente?: BoolFilter<"gasto_operativo"> | boolean
    dia_recurrente?: IntNullableFilter<"gasto_operativo"> | number | null
    notas?: StringNullableFilter<"gasto_operativo"> | string | null
    activo?: BoolFilter<"gasto_operativo"> | boolean
    fecha_creacion?: DateTimeFilter<"gasto_operativo"> | Date | string
  }, "id_gasto">

  export type gasto_operativoOrderByWithAggregationInput = {
    id_gasto?: SortOrder
    categoria?: SortOrder
    descripcion?: SortOrder
    monto?: SortOrder
    fecha?: SortOrder
    comprobante?: SortOrderInput | SortOrder
    proveedor_nombre?: SortOrderInput | SortOrder
    es_recurrente?: SortOrder
    dia_recurrente?: SortOrderInput | SortOrder
    notas?: SortOrderInput | SortOrder
    activo?: SortOrder
    fecha_creacion?: SortOrder
    _count?: gasto_operativoCountOrderByAggregateInput
    _avg?: gasto_operativoAvgOrderByAggregateInput
    _max?: gasto_operativoMaxOrderByAggregateInput
    _min?: gasto_operativoMinOrderByAggregateInput
    _sum?: gasto_operativoSumOrderByAggregateInput
  }

  export type gasto_operativoScalarWhereWithAggregatesInput = {
    AND?: gasto_operativoScalarWhereWithAggregatesInput | gasto_operativoScalarWhereWithAggregatesInput[]
    OR?: gasto_operativoScalarWhereWithAggregatesInput[]
    NOT?: gasto_operativoScalarWhereWithAggregatesInput | gasto_operativoScalarWhereWithAggregatesInput[]
    id_gasto?: IntWithAggregatesFilter<"gasto_operativo"> | number
    categoria?: StringWithAggregatesFilter<"gasto_operativo"> | string
    descripcion?: StringWithAggregatesFilter<"gasto_operativo"> | string
    monto?: DecimalWithAggregatesFilter<"gasto_operativo"> | Decimal | DecimalJsLike | number | string
    fecha?: DateTimeWithAggregatesFilter<"gasto_operativo"> | Date | string
    comprobante?: StringNullableWithAggregatesFilter<"gasto_operativo"> | string | null
    proveedor_nombre?: StringNullableWithAggregatesFilter<"gasto_operativo"> | string | null
    es_recurrente?: BoolWithAggregatesFilter<"gasto_operativo"> | boolean
    dia_recurrente?: IntNullableWithAggregatesFilter<"gasto_operativo"> | number | null
    notas?: StringNullableWithAggregatesFilter<"gasto_operativo"> | string | null
    activo?: BoolWithAggregatesFilter<"gasto_operativo"> | boolean
    fecha_creacion?: DateTimeWithAggregatesFilter<"gasto_operativo"> | Date | string
  }

  export type categoria_gastoWhereInput = {
    AND?: categoria_gastoWhereInput | categoria_gastoWhereInput[]
    OR?: categoria_gastoWhereInput[]
    NOT?: categoria_gastoWhereInput | categoria_gastoWhereInput[]
    id?: IntFilter<"categoria_gasto"> | number
    nombre?: StringFilter<"categoria_gasto"> | string
    activo?: BoolFilter<"categoria_gasto"> | boolean
  }

  export type categoria_gastoOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    activo?: SortOrder
  }

  export type categoria_gastoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    nombre?: string
    AND?: categoria_gastoWhereInput | categoria_gastoWhereInput[]
    OR?: categoria_gastoWhereInput[]
    NOT?: categoria_gastoWhereInput | categoria_gastoWhereInput[]
    activo?: BoolFilter<"categoria_gasto"> | boolean
  }, "id" | "nombre">

  export type categoria_gastoOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    activo?: SortOrder
    _count?: categoria_gastoCountOrderByAggregateInput
    _avg?: categoria_gastoAvgOrderByAggregateInput
    _max?: categoria_gastoMaxOrderByAggregateInput
    _min?: categoria_gastoMinOrderByAggregateInput
    _sum?: categoria_gastoSumOrderByAggregateInput
  }

  export type categoria_gastoScalarWhereWithAggregatesInput = {
    AND?: categoria_gastoScalarWhereWithAggregatesInput | categoria_gastoScalarWhereWithAggregatesInput[]
    OR?: categoria_gastoScalarWhereWithAggregatesInput[]
    NOT?: categoria_gastoScalarWhereWithAggregatesInput | categoria_gastoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"categoria_gasto"> | number
    nombre?: StringWithAggregatesFilter<"categoria_gasto"> | string
    activo?: BoolWithAggregatesFilter<"categoria_gasto"> | boolean
  }

  export type cuenta_espacioCreateInput = {
    nombre_producto: string
    cantidad?: number
    valor_unitario: Decimal | DecimalJsLike | number | string
    valor_total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    metodo_pago?: string | null
    fecha_registro?: Date | string | null
    anotaciones?: string | null
    reserva: reservaCreateNestedOneWithoutCuenta_espacioInput
  }

  export type cuenta_espacioUncheckedCreateInput = {
    id_item?: number
    id_reserva: number
    nombre_producto: string
    cantidad?: number
    valor_unitario: Decimal | DecimalJsLike | number | string
    valor_total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    metodo_pago?: string | null
    fecha_registro?: Date | string | null
    anotaciones?: string | null
  }

  export type cuenta_espacioUpdateInput = {
    nombre_producto?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    anotaciones?: NullableStringFieldUpdateOperationsInput | string | null
    reserva?: reservaUpdateOneRequiredWithoutCuenta_espacioNestedInput
  }

  export type cuenta_espacioUncheckedUpdateInput = {
    id_item?: IntFieldUpdateOperationsInput | number
    id_reserva?: IntFieldUpdateOperationsInput | number
    nombre_producto?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    anotaciones?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type cuenta_espacioCreateManyInput = {
    id_item?: number
    id_reserva: number
    nombre_producto: string
    cantidad?: number
    valor_unitario: Decimal | DecimalJsLike | number | string
    valor_total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    metodo_pago?: string | null
    fecha_registro?: Date | string | null
    anotaciones?: string | null
  }

  export type cuenta_espacioUpdateManyMutationInput = {
    nombre_producto?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    anotaciones?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type cuenta_espacioUncheckedUpdateManyInput = {
    id_item?: IntFieldUpdateOperationsInput | number
    id_reserva?: IntFieldUpdateOperationsInput | number
    nombre_producto?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    anotaciones?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type cuenta_personaCreateInput = {
    nombre_persona: string
    fecha?: Date | string
    descripcion: string
    cantidad?: number
    valor_unitario: Decimal | DecimalJsLike | number | string
    valor_total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    metodo_pago?: string | null
    fecha_registro?: Date | string | null
    huesped?: huespedCreateNestedOneWithoutCuenta_personaInput
    reserva?: reservaCreateNestedOneWithoutCuenta_personaInput
  }

  export type cuenta_personaUncheckedCreateInput = {
    id_item_persona?: number
    id_huesped?: number | null
    nombre_persona: string
    id_reserva?: number | null
    fecha?: Date | string
    descripcion: string
    cantidad?: number
    valor_unitario: Decimal | DecimalJsLike | number | string
    valor_total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    metodo_pago?: string | null
    fecha_registro?: Date | string | null
  }

  export type cuenta_personaUpdateInput = {
    nombre_persona?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    descripcion?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    huesped?: huespedUpdateOneWithoutCuenta_personaNestedInput
    reserva?: reservaUpdateOneWithoutCuenta_personaNestedInput
  }

  export type cuenta_personaUncheckedUpdateInput = {
    id_item_persona?: IntFieldUpdateOperationsInput | number
    id_huesped?: NullableIntFieldUpdateOperationsInput | number | null
    nombre_persona?: StringFieldUpdateOperationsInput | string
    id_reserva?: NullableIntFieldUpdateOperationsInput | number | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    descripcion?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type cuenta_personaCreateManyInput = {
    id_item_persona?: number
    id_huesped?: number | null
    nombre_persona: string
    id_reserva?: number | null
    fecha?: Date | string
    descripcion: string
    cantidad?: number
    valor_unitario: Decimal | DecimalJsLike | number | string
    valor_total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    metodo_pago?: string | null
    fecha_registro?: Date | string | null
  }

  export type cuenta_personaUpdateManyMutationInput = {
    nombre_persona?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    descripcion?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type cuenta_personaUncheckedUpdateManyInput = {
    id_item_persona?: IntFieldUpdateOperationsInput | number
    id_huesped?: NullableIntFieldUpdateOperationsInput | number | null
    nombre_persona?: StringFieldUpdateOperationsInput | string
    id_reserva?: NullableIntFieldUpdateOperationsInput | number | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    descripcion?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type espacioCreateInput = {
    numero: string
    tipo_espacio: string
    tipo_habitacion?: string | null
    capacidad_personas?: number | null
    precio_persona_1?: Decimal | DecimalJsLike | number | string | null
    precio_persona_2?: Decimal | DecimalJsLike | number | string | null
    precio_adicional?: Decimal | DecimalJsLike | number | string | null
    estado_limpieza?: string | null
    activo?: boolean | null
    tiene_minibar?: boolean | null
    inventario_minibar?: inventario_minibarCreateNestedManyWithoutEspacioInput
    reserva?: reservaCreateNestedManyWithoutEspacioInput
  }

  export type espacioUncheckedCreateInput = {
    id_espacio?: number
    numero: string
    tipo_espacio: string
    tipo_habitacion?: string | null
    capacidad_personas?: number | null
    precio_persona_1?: Decimal | DecimalJsLike | number | string | null
    precio_persona_2?: Decimal | DecimalJsLike | number | string | null
    precio_adicional?: Decimal | DecimalJsLike | number | string | null
    estado_limpieza?: string | null
    activo?: boolean | null
    tiene_minibar?: boolean | null
    inventario_minibar?: inventario_minibarUncheckedCreateNestedManyWithoutEspacioInput
    reserva?: reservaUncheckedCreateNestedManyWithoutEspacioInput
  }

  export type espacioUpdateInput = {
    numero?: StringFieldUpdateOperationsInput | string
    tipo_espacio?: StringFieldUpdateOperationsInput | string
    tipo_habitacion?: NullableStringFieldUpdateOperationsInput | string | null
    capacidad_personas?: NullableIntFieldUpdateOperationsInput | number | null
    precio_persona_1?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    precio_persona_2?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    precio_adicional?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado_limpieza?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    tiene_minibar?: NullableBoolFieldUpdateOperationsInput | boolean | null
    inventario_minibar?: inventario_minibarUpdateManyWithoutEspacioNestedInput
    reserva?: reservaUpdateManyWithoutEspacioNestedInput
  }

  export type espacioUncheckedUpdateInput = {
    id_espacio?: IntFieldUpdateOperationsInput | number
    numero?: StringFieldUpdateOperationsInput | string
    tipo_espacio?: StringFieldUpdateOperationsInput | string
    tipo_habitacion?: NullableStringFieldUpdateOperationsInput | string | null
    capacidad_personas?: NullableIntFieldUpdateOperationsInput | number | null
    precio_persona_1?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    precio_persona_2?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    precio_adicional?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado_limpieza?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    tiene_minibar?: NullableBoolFieldUpdateOperationsInput | boolean | null
    inventario_minibar?: inventario_minibarUncheckedUpdateManyWithoutEspacioNestedInput
    reserva?: reservaUncheckedUpdateManyWithoutEspacioNestedInput
  }

  export type espacioCreateManyInput = {
    id_espacio?: number
    numero: string
    tipo_espacio: string
    tipo_habitacion?: string | null
    capacidad_personas?: number | null
    precio_persona_1?: Decimal | DecimalJsLike | number | string | null
    precio_persona_2?: Decimal | DecimalJsLike | number | string | null
    precio_adicional?: Decimal | DecimalJsLike | number | string | null
    estado_limpieza?: string | null
    activo?: boolean | null
    tiene_minibar?: boolean | null
  }

  export type espacioUpdateManyMutationInput = {
    numero?: StringFieldUpdateOperationsInput | string
    tipo_espacio?: StringFieldUpdateOperationsInput | string
    tipo_habitacion?: NullableStringFieldUpdateOperationsInput | string | null
    capacidad_personas?: NullableIntFieldUpdateOperationsInput | number | null
    precio_persona_1?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    precio_persona_2?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    precio_adicional?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado_limpieza?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    tiene_minibar?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type espacioUncheckedUpdateManyInput = {
    id_espacio?: IntFieldUpdateOperationsInput | number
    numero?: StringFieldUpdateOperationsInput | string
    tipo_espacio?: StringFieldUpdateOperationsInput | string
    tipo_habitacion?: NullableStringFieldUpdateOperationsInput | string | null
    capacidad_personas?: NullableIntFieldUpdateOperationsInput | number | null
    precio_persona_1?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    precio_persona_2?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    precio_adicional?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado_limpieza?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    tiene_minibar?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type huespedCreateInput = {
    nombre_completo: string
    telefono?: string | null
    documento?: string | null
    tipo_documento?: string | null
    procedencia?: string | null
    firma?: string | null
    fecha_creacion?: Date | string | null
    cuenta_persona?: cuenta_personaCreateNestedManyWithoutHuespedInput
    reserva?: reservaCreateNestedManyWithoutHuespedInput
  }

  export type huespedUncheckedCreateInput = {
    id_huesped?: number
    nombre_completo: string
    telefono?: string | null
    documento?: string | null
    tipo_documento?: string | null
    procedencia?: string | null
    firma?: string | null
    fecha_creacion?: Date | string | null
    cuenta_persona?: cuenta_personaUncheckedCreateNestedManyWithoutHuespedInput
    reserva?: reservaUncheckedCreateNestedManyWithoutHuespedInput
  }

  export type huespedUpdateInput = {
    nombre_completo?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    documento?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_documento?: NullableStringFieldUpdateOperationsInput | string | null
    procedencia?: NullableStringFieldUpdateOperationsInput | string | null
    firma?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_creacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cuenta_persona?: cuenta_personaUpdateManyWithoutHuespedNestedInput
    reserva?: reservaUpdateManyWithoutHuespedNestedInput
  }

  export type huespedUncheckedUpdateInput = {
    id_huesped?: IntFieldUpdateOperationsInput | number
    nombre_completo?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    documento?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_documento?: NullableStringFieldUpdateOperationsInput | string | null
    procedencia?: NullableStringFieldUpdateOperationsInput | string | null
    firma?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_creacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cuenta_persona?: cuenta_personaUncheckedUpdateManyWithoutHuespedNestedInput
    reserva?: reservaUncheckedUpdateManyWithoutHuespedNestedInput
  }

  export type huespedCreateManyInput = {
    id_huesped?: number
    nombre_completo: string
    telefono?: string | null
    documento?: string | null
    tipo_documento?: string | null
    procedencia?: string | null
    firma?: string | null
    fecha_creacion?: Date | string | null
  }

  export type huespedUpdateManyMutationInput = {
    nombre_completo?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    documento?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_documento?: NullableStringFieldUpdateOperationsInput | string | null
    procedencia?: NullableStringFieldUpdateOperationsInput | string | null
    firma?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_creacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type huespedUncheckedUpdateManyInput = {
    id_huesped?: IntFieldUpdateOperationsInput | number
    nombre_completo?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    documento?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_documento?: NullableStringFieldUpdateOperationsInput | string | null
    procedencia?: NullableStringFieldUpdateOperationsInput | string | null
    firma?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_creacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type inventario_minibarCreateInput = {
    nombre_producto: string
    cantidad?: number
    precio_unitario: Decimal | DecimalJsLike | number | string
    fecha_vencimiento?: Date | string | null
    fecha_actualizacion?: Date | string | null
    espacio: espacioCreateNestedOneWithoutInventario_minibarInput
  }

  export type inventario_minibarUncheckedCreateInput = {
    id_inventario?: number
    id_espacio: number
    nombre_producto: string
    cantidad?: number
    precio_unitario: Decimal | DecimalJsLike | number | string
    fecha_vencimiento?: Date | string | null
    fecha_actualizacion?: Date | string | null
  }

  export type inventario_minibarUpdateInput = {
    nombre_producto?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precio_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fecha_vencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fecha_actualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    espacio?: espacioUpdateOneRequiredWithoutInventario_minibarNestedInput
  }

  export type inventario_minibarUncheckedUpdateInput = {
    id_inventario?: IntFieldUpdateOperationsInput | number
    id_espacio?: IntFieldUpdateOperationsInput | number
    nombre_producto?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precio_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fecha_vencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fecha_actualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type inventario_minibarCreateManyInput = {
    id_inventario?: number
    id_espacio: number
    nombre_producto: string
    cantidad?: number
    precio_unitario: Decimal | DecimalJsLike | number | string
    fecha_vencimiento?: Date | string | null
    fecha_actualizacion?: Date | string | null
  }

  export type inventario_minibarUpdateManyMutationInput = {
    nombre_producto?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precio_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fecha_vencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fecha_actualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type inventario_minibarUncheckedUpdateManyInput = {
    id_inventario?: IntFieldUpdateOperationsInput | number
    id_espacio?: IntFieldUpdateOperationsInput | number
    nombre_producto?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precio_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fecha_vencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fecha_actualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reservaCreateInput = {
    tipo_reserva?: string
    dni_tipo?: string | null
    check_in?: Date | string | null
    check_out?: Date | string | null
    cantidad_adultos?: number | null
    cantidad_ninos?: number | null
    fecha_evento?: Date | string | null
    hora_inicio?: Date | string | null
    hora_fin?: Date | string | null
    estado_reserva?: string
    monto_total?: Decimal | DecimalJsLike | number | string | null
    estado_pago?: string | null
    metodo_pago?: string | null
    monto_pagado?: Decimal | DecimalJsLike | number | string | null
    anotaciones?: string | null
    firma?: string | null
    fecha_creacion?: Date | string | null
    cuenta_espacio?: cuenta_espacioCreateNestedManyWithoutReservaInput
    cuenta_persona?: cuenta_personaCreateNestedManyWithoutReservaInput
    espacio: espacioCreateNestedOneWithoutReservaInput
    huesped: huespedCreateNestedOneWithoutReservaInput
  }

  export type reservaUncheckedCreateInput = {
    id_reserva?: number
    id_huesped: number
    id_espacio: number
    tipo_reserva?: string
    dni_tipo?: string | null
    check_in?: Date | string | null
    check_out?: Date | string | null
    cantidad_adultos?: number | null
    cantidad_ninos?: number | null
    fecha_evento?: Date | string | null
    hora_inicio?: Date | string | null
    hora_fin?: Date | string | null
    estado_reserva?: string
    monto_total?: Decimal | DecimalJsLike | number | string | null
    estado_pago?: string | null
    metodo_pago?: string | null
    monto_pagado?: Decimal | DecimalJsLike | number | string | null
    anotaciones?: string | null
    firma?: string | null
    fecha_creacion?: Date | string | null
    cuenta_espacio?: cuenta_espacioUncheckedCreateNestedManyWithoutReservaInput
    cuenta_persona?: cuenta_personaUncheckedCreateNestedManyWithoutReservaInput
  }

  export type reservaUpdateInput = {
    tipo_reserva?: StringFieldUpdateOperationsInput | string
    dni_tipo?: NullableStringFieldUpdateOperationsInput | string | null
    check_in?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    check_out?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cantidad_adultos?: NullableIntFieldUpdateOperationsInput | number | null
    cantidad_ninos?: NullableIntFieldUpdateOperationsInput | number | null
    fecha_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_inicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_fin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado_reserva?: StringFieldUpdateOperationsInput | string
    monto_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado_pago?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    monto_pagado?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    anotaciones?: NullableStringFieldUpdateOperationsInput | string | null
    firma?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_creacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cuenta_espacio?: cuenta_espacioUpdateManyWithoutReservaNestedInput
    cuenta_persona?: cuenta_personaUpdateManyWithoutReservaNestedInput
    espacio?: espacioUpdateOneRequiredWithoutReservaNestedInput
    huesped?: huespedUpdateOneRequiredWithoutReservaNestedInput
  }

  export type reservaUncheckedUpdateInput = {
    id_reserva?: IntFieldUpdateOperationsInput | number
    id_huesped?: IntFieldUpdateOperationsInput | number
    id_espacio?: IntFieldUpdateOperationsInput | number
    tipo_reserva?: StringFieldUpdateOperationsInput | string
    dni_tipo?: NullableStringFieldUpdateOperationsInput | string | null
    check_in?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    check_out?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cantidad_adultos?: NullableIntFieldUpdateOperationsInput | number | null
    cantidad_ninos?: NullableIntFieldUpdateOperationsInput | number | null
    fecha_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_inicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_fin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado_reserva?: StringFieldUpdateOperationsInput | string
    monto_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado_pago?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    monto_pagado?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    anotaciones?: NullableStringFieldUpdateOperationsInput | string | null
    firma?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_creacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cuenta_espacio?: cuenta_espacioUncheckedUpdateManyWithoutReservaNestedInput
    cuenta_persona?: cuenta_personaUncheckedUpdateManyWithoutReservaNestedInput
  }

  export type reservaCreateManyInput = {
    id_reserva?: number
    id_huesped: number
    id_espacio: number
    tipo_reserva?: string
    dni_tipo?: string | null
    check_in?: Date | string | null
    check_out?: Date | string | null
    cantidad_adultos?: number | null
    cantidad_ninos?: number | null
    fecha_evento?: Date | string | null
    hora_inicio?: Date | string | null
    hora_fin?: Date | string | null
    estado_reserva?: string
    monto_total?: Decimal | DecimalJsLike | number | string | null
    estado_pago?: string | null
    metodo_pago?: string | null
    monto_pagado?: Decimal | DecimalJsLike | number | string | null
    anotaciones?: string | null
    firma?: string | null
    fecha_creacion?: Date | string | null
  }

  export type reservaUpdateManyMutationInput = {
    tipo_reserva?: StringFieldUpdateOperationsInput | string
    dni_tipo?: NullableStringFieldUpdateOperationsInput | string | null
    check_in?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    check_out?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cantidad_adultos?: NullableIntFieldUpdateOperationsInput | number | null
    cantidad_ninos?: NullableIntFieldUpdateOperationsInput | number | null
    fecha_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_inicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_fin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado_reserva?: StringFieldUpdateOperationsInput | string
    monto_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado_pago?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    monto_pagado?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    anotaciones?: NullableStringFieldUpdateOperationsInput | string | null
    firma?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_creacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reservaUncheckedUpdateManyInput = {
    id_reserva?: IntFieldUpdateOperationsInput | number
    id_huesped?: IntFieldUpdateOperationsInput | number
    id_espacio?: IntFieldUpdateOperationsInput | number
    tipo_reserva?: StringFieldUpdateOperationsInput | string
    dni_tipo?: NullableStringFieldUpdateOperationsInput | string | null
    check_in?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    check_out?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cantidad_adultos?: NullableIntFieldUpdateOperationsInput | number | null
    cantidad_ninos?: NullableIntFieldUpdateOperationsInput | number | null
    fecha_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_inicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_fin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado_reserva?: StringFieldUpdateOperationsInput | string
    monto_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado_pago?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    monto_pagado?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    anotaciones?: NullableStringFieldUpdateOperationsInput | string | null
    firma?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_creacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type configuracion_hotelCreateInput = {
    nombre_hotel?: string | null
    direccion?: string | null
    telefono?: string | null
    nit?: string | null
    email?: string | null
    ciudad?: string | null
    hora_check_in?: string | null
    hora_check_out?: string | null
    fecha_actualizacion?: Date | string | null
  }

  export type configuracion_hotelUncheckedCreateInput = {
    id?: number
    nombre_hotel?: string | null
    direccion?: string | null
    telefono?: string | null
    nit?: string | null
    email?: string | null
    ciudad?: string | null
    hora_check_in?: string | null
    hora_check_out?: string | null
    fecha_actualizacion?: Date | string | null
  }

  export type configuracion_hotelUpdateInput = {
    nombre_hotel?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    nit?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    ciudad?: NullableStringFieldUpdateOperationsInput | string | null
    hora_check_in?: NullableStringFieldUpdateOperationsInput | string | null
    hora_check_out?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_actualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type configuracion_hotelUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre_hotel?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    nit?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    ciudad?: NullableStringFieldUpdateOperationsInput | string | null
    hora_check_in?: NullableStringFieldUpdateOperationsInput | string | null
    hora_check_out?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_actualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type configuracion_hotelCreateManyInput = {
    id?: number
    nombre_hotel?: string | null
    direccion?: string | null
    telefono?: string | null
    nit?: string | null
    email?: string | null
    ciudad?: string | null
    hora_check_in?: string | null
    hora_check_out?: string | null
    fecha_actualizacion?: Date | string | null
  }

  export type configuracion_hotelUpdateManyMutationInput = {
    nombre_hotel?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    nit?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    ciudad?: NullableStringFieldUpdateOperationsInput | string | null
    hora_check_in?: NullableStringFieldUpdateOperationsInput | string | null
    hora_check_out?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_actualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type configuracion_hotelUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre_hotel?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    nit?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    ciudad?: NullableStringFieldUpdateOperationsInput | string | null
    hora_check_in?: NullableStringFieldUpdateOperationsInput | string | null
    hora_check_out?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_actualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type tipo_espacio_configCreateInput = {
    nombre: string
    precio_base: Decimal | DecimalJsLike | number | string
    recargo_pareja: Decimal | DecimalJsLike | number | string
    recargo_adicional: Decimal | DecimalJsLike | number | string
    max_personas_adicionales?: number
  }

  export type tipo_espacio_configUncheckedCreateInput = {
    id?: number
    nombre: string
    precio_base: Decimal | DecimalJsLike | number | string
    recargo_pareja: Decimal | DecimalJsLike | number | string
    recargo_adicional: Decimal | DecimalJsLike | number | string
    max_personas_adicionales?: number
  }

  export type tipo_espacio_configUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    precio_base?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    recargo_pareja?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    recargo_adicional?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    max_personas_adicionales?: IntFieldUpdateOperationsInput | number
  }

  export type tipo_espacio_configUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    precio_base?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    recargo_pareja?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    recargo_adicional?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    max_personas_adicionales?: IntFieldUpdateOperationsInput | number
  }

  export type tipo_espacio_configCreateManyInput = {
    id?: number
    nombre: string
    precio_base: Decimal | DecimalJsLike | number | string
    recargo_pareja: Decimal | DecimalJsLike | number | string
    recargo_adicional: Decimal | DecimalJsLike | number | string
    max_personas_adicionales?: number
  }

  export type tipo_espacio_configUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    precio_base?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    recargo_pareja?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    recargo_adicional?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    max_personas_adicionales?: IntFieldUpdateOperationsInput | number
  }

  export type tipo_espacio_configUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    precio_base?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    recargo_pareja?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    recargo_adicional?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    max_personas_adicionales?: IntFieldUpdateOperationsInput | number
  }

  export type categoria_inventarioCreateInput = {
    nombre: string
    activo?: boolean
    fecha_creacion?: Date | string
  }

  export type categoria_inventarioUncheckedCreateInput = {
    id_categoria?: number
    nombre: string
    activo?: boolean
    fecha_creacion?: Date | string
  }

  export type categoria_inventarioUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type categoria_inventarioUncheckedUpdateInput = {
    id_categoria?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type categoria_inventarioCreateManyInput = {
    id_categoria?: number
    nombre: string
    activo?: boolean
    fecha_creacion?: Date | string
  }

  export type categoria_inventarioUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type categoria_inventarioUncheckedUpdateManyInput = {
    id_categoria?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type proveedorCreateInput = {
    nombre: string
    nit?: string | null
    telefono?: string | null
    email?: string | null
    direccion?: string | null
    ciudad?: string | null
    contacto?: string | null
    notas?: string | null
    activo?: boolean
    fecha_creacion?: Date | string
    productos?: producto_inventarioCreateNestedManyWithoutProveedorInput
  }

  export type proveedorUncheckedCreateInput = {
    id_proveedor?: number
    nombre: string
    nit?: string | null
    telefono?: string | null
    email?: string | null
    direccion?: string | null
    ciudad?: string | null
    contacto?: string | null
    notas?: string | null
    activo?: boolean
    fecha_creacion?: Date | string
    productos?: producto_inventarioUncheckedCreateNestedManyWithoutProveedorInput
  }

  export type proveedorUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    nit?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    ciudad?: NullableStringFieldUpdateOperationsInput | string | null
    contacto?: NullableStringFieldUpdateOperationsInput | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
    productos?: producto_inventarioUpdateManyWithoutProveedorNestedInput
  }

  export type proveedorUncheckedUpdateInput = {
    id_proveedor?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    nit?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    ciudad?: NullableStringFieldUpdateOperationsInput | string | null
    contacto?: NullableStringFieldUpdateOperationsInput | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
    productos?: producto_inventarioUncheckedUpdateManyWithoutProveedorNestedInput
  }

  export type proveedorCreateManyInput = {
    id_proveedor?: number
    nombre: string
    nit?: string | null
    telefono?: string | null
    email?: string | null
    direccion?: string | null
    ciudad?: string | null
    contacto?: string | null
    notas?: string | null
    activo?: boolean
    fecha_creacion?: Date | string
  }

  export type proveedorUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    nit?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    ciudad?: NullableStringFieldUpdateOperationsInput | string | null
    contacto?: NullableStringFieldUpdateOperationsInput | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type proveedorUncheckedUpdateManyInput = {
    id_proveedor?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    nit?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    ciudad?: NullableStringFieldUpdateOperationsInput | string | null
    contacto?: NullableStringFieldUpdateOperationsInput | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type producto_inventarioCreateInput = {
    nombre: string
    descripcion?: string | null
    categoria: string
    unidad_medida?: string
    precio_costo?: Decimal | DecimalJsLike | number | string
    precio_venta?: Decimal | DecimalJsLike | number | string
    stock_actual?: Decimal | DecimalJsLike | number | string
    stock_minimo?: Decimal | DecimalJsLike | number | string
    activo?: boolean
    fecha_creacion?: Date | string
    proveedor?: proveedorCreateNestedOneWithoutProductosInput
    movimientos?: movimiento_inventarioCreateNestedManyWithoutProductoInput
  }

  export type producto_inventarioUncheckedCreateInput = {
    id_producto?: number
    nombre: string
    descripcion?: string | null
    categoria: string
    unidad_medida?: string
    precio_costo?: Decimal | DecimalJsLike | number | string
    precio_venta?: Decimal | DecimalJsLike | number | string
    stock_actual?: Decimal | DecimalJsLike | number | string
    stock_minimo?: Decimal | DecimalJsLike | number | string
    id_proveedor?: number | null
    activo?: boolean
    fecha_creacion?: Date | string
    movimientos?: movimiento_inventarioUncheckedCreateNestedManyWithoutProductoInput
  }

  export type producto_inventarioUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: StringFieldUpdateOperationsInput | string
    unidad_medida?: StringFieldUpdateOperationsInput | string
    precio_costo?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    precio_venta?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_actual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_minimo?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
    proveedor?: proveedorUpdateOneWithoutProductosNestedInput
    movimientos?: movimiento_inventarioUpdateManyWithoutProductoNestedInput
  }

  export type producto_inventarioUncheckedUpdateInput = {
    id_producto?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: StringFieldUpdateOperationsInput | string
    unidad_medida?: StringFieldUpdateOperationsInput | string
    precio_costo?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    precio_venta?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_actual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_minimo?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    id_proveedor?: NullableIntFieldUpdateOperationsInput | number | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
    movimientos?: movimiento_inventarioUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type producto_inventarioCreateManyInput = {
    id_producto?: number
    nombre: string
    descripcion?: string | null
    categoria: string
    unidad_medida?: string
    precio_costo?: Decimal | DecimalJsLike | number | string
    precio_venta?: Decimal | DecimalJsLike | number | string
    stock_actual?: Decimal | DecimalJsLike | number | string
    stock_minimo?: Decimal | DecimalJsLike | number | string
    id_proveedor?: number | null
    activo?: boolean
    fecha_creacion?: Date | string
  }

  export type producto_inventarioUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: StringFieldUpdateOperationsInput | string
    unidad_medida?: StringFieldUpdateOperationsInput | string
    precio_costo?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    precio_venta?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_actual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_minimo?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type producto_inventarioUncheckedUpdateManyInput = {
    id_producto?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: StringFieldUpdateOperationsInput | string
    unidad_medida?: StringFieldUpdateOperationsInput | string
    precio_costo?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    precio_venta?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_actual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_minimo?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    id_proveedor?: NullableIntFieldUpdateOperationsInput | number | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type movimiento_inventarioCreateInput = {
    tipo: string
    motivo: string
    cantidad: Decimal | DecimalJsLike | number | string
    stock_antes: Decimal | DecimalJsLike | number | string
    stock_despues: Decimal | DecimalJsLike | number | string
    precio_unitario?: Decimal | DecimalJsLike | number | string
    referencia_id?: number | null
    referencia_tipo?: string | null
    notas?: string | null
    fecha?: Date | string
    producto: producto_inventarioCreateNestedOneWithoutMovimientosInput
  }

  export type movimiento_inventarioUncheckedCreateInput = {
    id_movimiento?: number
    id_producto: number
    tipo: string
    motivo: string
    cantidad: Decimal | DecimalJsLike | number | string
    stock_antes: Decimal | DecimalJsLike | number | string
    stock_despues: Decimal | DecimalJsLike | number | string
    precio_unitario?: Decimal | DecimalJsLike | number | string
    referencia_id?: number | null
    referencia_tipo?: string | null
    notas?: string | null
    fecha?: Date | string
  }

  export type movimiento_inventarioUpdateInput = {
    tipo?: StringFieldUpdateOperationsInput | string
    motivo?: StringFieldUpdateOperationsInput | string
    cantidad?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_antes?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_despues?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    precio_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    referencia_id?: NullableIntFieldUpdateOperationsInput | number | null
    referencia_tipo?: NullableStringFieldUpdateOperationsInput | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    producto?: producto_inventarioUpdateOneRequiredWithoutMovimientosNestedInput
  }

  export type movimiento_inventarioUncheckedUpdateInput = {
    id_movimiento?: IntFieldUpdateOperationsInput | number
    id_producto?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    motivo?: StringFieldUpdateOperationsInput | string
    cantidad?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_antes?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_despues?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    precio_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    referencia_id?: NullableIntFieldUpdateOperationsInput | number | null
    referencia_tipo?: NullableStringFieldUpdateOperationsInput | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type movimiento_inventarioCreateManyInput = {
    id_movimiento?: number
    id_producto: number
    tipo: string
    motivo: string
    cantidad: Decimal | DecimalJsLike | number | string
    stock_antes: Decimal | DecimalJsLike | number | string
    stock_despues: Decimal | DecimalJsLike | number | string
    precio_unitario?: Decimal | DecimalJsLike | number | string
    referencia_id?: number | null
    referencia_tipo?: string | null
    notas?: string | null
    fecha?: Date | string
  }

  export type movimiento_inventarioUpdateManyMutationInput = {
    tipo?: StringFieldUpdateOperationsInput | string
    motivo?: StringFieldUpdateOperationsInput | string
    cantidad?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_antes?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_despues?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    precio_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    referencia_id?: NullableIntFieldUpdateOperationsInput | number | null
    referencia_tipo?: NullableStringFieldUpdateOperationsInput | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type movimiento_inventarioUncheckedUpdateManyInput = {
    id_movimiento?: IntFieldUpdateOperationsInput | number
    id_producto?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    motivo?: StringFieldUpdateOperationsInput | string
    cantidad?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_antes?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_despues?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    precio_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    referencia_id?: NullableIntFieldUpdateOperationsInput | number | null
    referencia_tipo?: NullableStringFieldUpdateOperationsInput | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type gasto_operativoCreateInput = {
    categoria: string
    descripcion: string
    monto: Decimal | DecimalJsLike | number | string
    fecha: Date | string
    comprobante?: string | null
    proveedor_nombre?: string | null
    es_recurrente?: boolean
    dia_recurrente?: number | null
    notas?: string | null
    activo?: boolean
    fecha_creacion?: Date | string
  }

  export type gasto_operativoUncheckedCreateInput = {
    id_gasto?: number
    categoria: string
    descripcion: string
    monto: Decimal | DecimalJsLike | number | string
    fecha: Date | string
    comprobante?: string | null
    proveedor_nombre?: string | null
    es_recurrente?: boolean
    dia_recurrente?: number | null
    notas?: string | null
    activo?: boolean
    fecha_creacion?: Date | string
  }

  export type gasto_operativoUpdateInput = {
    categoria?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    comprobante?: NullableStringFieldUpdateOperationsInput | string | null
    proveedor_nombre?: NullableStringFieldUpdateOperationsInput | string | null
    es_recurrente?: BoolFieldUpdateOperationsInput | boolean
    dia_recurrente?: NullableIntFieldUpdateOperationsInput | number | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type gasto_operativoUncheckedUpdateInput = {
    id_gasto?: IntFieldUpdateOperationsInput | number
    categoria?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    comprobante?: NullableStringFieldUpdateOperationsInput | string | null
    proveedor_nombre?: NullableStringFieldUpdateOperationsInput | string | null
    es_recurrente?: BoolFieldUpdateOperationsInput | boolean
    dia_recurrente?: NullableIntFieldUpdateOperationsInput | number | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type gasto_operativoCreateManyInput = {
    id_gasto?: number
    categoria: string
    descripcion: string
    monto: Decimal | DecimalJsLike | number | string
    fecha: Date | string
    comprobante?: string | null
    proveedor_nombre?: string | null
    es_recurrente?: boolean
    dia_recurrente?: number | null
    notas?: string | null
    activo?: boolean
    fecha_creacion?: Date | string
  }

  export type gasto_operativoUpdateManyMutationInput = {
    categoria?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    comprobante?: NullableStringFieldUpdateOperationsInput | string | null
    proveedor_nombre?: NullableStringFieldUpdateOperationsInput | string | null
    es_recurrente?: BoolFieldUpdateOperationsInput | boolean
    dia_recurrente?: NullableIntFieldUpdateOperationsInput | number | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type gasto_operativoUncheckedUpdateManyInput = {
    id_gasto?: IntFieldUpdateOperationsInput | number
    categoria?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    monto?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    comprobante?: NullableStringFieldUpdateOperationsInput | string | null
    proveedor_nombre?: NullableStringFieldUpdateOperationsInput | string | null
    es_recurrente?: BoolFieldUpdateOperationsInput | boolean
    dia_recurrente?: NullableIntFieldUpdateOperationsInput | number | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type categoria_gastoCreateInput = {
    nombre: string
    activo?: boolean
  }

  export type categoria_gastoUncheckedCreateInput = {
    id?: number
    nombre: string
    activo?: boolean
  }

  export type categoria_gastoUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type categoria_gastoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type categoria_gastoCreateManyInput = {
    id?: number
    nombre: string
    activo?: boolean
  }

  export type categoria_gastoUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type categoria_gastoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
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

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
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

  export type ReservaScalarRelationFilter = {
    is?: reservaWhereInput
    isNot?: reservaWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type cuenta_espacioCountOrderByAggregateInput = {
    id_item?: SortOrder
    id_reserva?: SortOrder
    nombre_producto?: SortOrder
    cantidad?: SortOrder
    valor_unitario?: SortOrder
    valor_total?: SortOrder
    estado?: SortOrder
    metodo_pago?: SortOrder
    fecha_registro?: SortOrder
    anotaciones?: SortOrder
  }

  export type cuenta_espacioAvgOrderByAggregateInput = {
    id_item?: SortOrder
    id_reserva?: SortOrder
    cantidad?: SortOrder
    valor_unitario?: SortOrder
    valor_total?: SortOrder
  }

  export type cuenta_espacioMaxOrderByAggregateInput = {
    id_item?: SortOrder
    id_reserva?: SortOrder
    nombre_producto?: SortOrder
    cantidad?: SortOrder
    valor_unitario?: SortOrder
    valor_total?: SortOrder
    estado?: SortOrder
    metodo_pago?: SortOrder
    fecha_registro?: SortOrder
    anotaciones?: SortOrder
  }

  export type cuenta_espacioMinOrderByAggregateInput = {
    id_item?: SortOrder
    id_reserva?: SortOrder
    nombre_producto?: SortOrder
    cantidad?: SortOrder
    valor_unitario?: SortOrder
    valor_total?: SortOrder
    estado?: SortOrder
    metodo_pago?: SortOrder
    fecha_registro?: SortOrder
    anotaciones?: SortOrder
  }

  export type cuenta_espacioSumOrderByAggregateInput = {
    id_item?: SortOrder
    id_reserva?: SortOrder
    cantidad?: SortOrder
    valor_unitario?: SortOrder
    valor_total?: SortOrder
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

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
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

  export type HuespedNullableScalarRelationFilter = {
    is?: huespedWhereInput | null
    isNot?: huespedWhereInput | null
  }

  export type ReservaNullableScalarRelationFilter = {
    is?: reservaWhereInput | null
    isNot?: reservaWhereInput | null
  }

  export type cuenta_personaCountOrderByAggregateInput = {
    id_item_persona?: SortOrder
    id_huesped?: SortOrder
    nombre_persona?: SortOrder
    id_reserva?: SortOrder
    fecha?: SortOrder
    descripcion?: SortOrder
    cantidad?: SortOrder
    valor_unitario?: SortOrder
    valor_total?: SortOrder
    estado?: SortOrder
    metodo_pago?: SortOrder
    fecha_registro?: SortOrder
  }

  export type cuenta_personaAvgOrderByAggregateInput = {
    id_item_persona?: SortOrder
    id_huesped?: SortOrder
    id_reserva?: SortOrder
    cantidad?: SortOrder
    valor_unitario?: SortOrder
    valor_total?: SortOrder
  }

  export type cuenta_personaMaxOrderByAggregateInput = {
    id_item_persona?: SortOrder
    id_huesped?: SortOrder
    nombre_persona?: SortOrder
    id_reserva?: SortOrder
    fecha?: SortOrder
    descripcion?: SortOrder
    cantidad?: SortOrder
    valor_unitario?: SortOrder
    valor_total?: SortOrder
    estado?: SortOrder
    metodo_pago?: SortOrder
    fecha_registro?: SortOrder
  }

  export type cuenta_personaMinOrderByAggregateInput = {
    id_item_persona?: SortOrder
    id_huesped?: SortOrder
    nombre_persona?: SortOrder
    id_reserva?: SortOrder
    fecha?: SortOrder
    descripcion?: SortOrder
    cantidad?: SortOrder
    valor_unitario?: SortOrder
    valor_total?: SortOrder
    estado?: SortOrder
    metodo_pago?: SortOrder
    fecha_registro?: SortOrder
  }

  export type cuenta_personaSumOrderByAggregateInput = {
    id_item_persona?: SortOrder
    id_huesped?: SortOrder
    id_reserva?: SortOrder
    cantidad?: SortOrder
    valor_unitario?: SortOrder
    valor_total?: SortOrder
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

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type Inventario_minibarListRelationFilter = {
    every?: inventario_minibarWhereInput
    some?: inventario_minibarWhereInput
    none?: inventario_minibarWhereInput
  }

  export type ReservaListRelationFilter = {
    every?: reservaWhereInput
    some?: reservaWhereInput
    none?: reservaWhereInput
  }

  export type inventario_minibarOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type reservaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type espacioCountOrderByAggregateInput = {
    id_espacio?: SortOrder
    numero?: SortOrder
    tipo_espacio?: SortOrder
    tipo_habitacion?: SortOrder
    capacidad_personas?: SortOrder
    precio_persona_1?: SortOrder
    precio_persona_2?: SortOrder
    precio_adicional?: SortOrder
    estado_limpieza?: SortOrder
    activo?: SortOrder
    tiene_minibar?: SortOrder
  }

  export type espacioAvgOrderByAggregateInput = {
    id_espacio?: SortOrder
    capacidad_personas?: SortOrder
    precio_persona_1?: SortOrder
    precio_persona_2?: SortOrder
    precio_adicional?: SortOrder
  }

  export type espacioMaxOrderByAggregateInput = {
    id_espacio?: SortOrder
    numero?: SortOrder
    tipo_espacio?: SortOrder
    tipo_habitacion?: SortOrder
    capacidad_personas?: SortOrder
    precio_persona_1?: SortOrder
    precio_persona_2?: SortOrder
    precio_adicional?: SortOrder
    estado_limpieza?: SortOrder
    activo?: SortOrder
    tiene_minibar?: SortOrder
  }

  export type espacioMinOrderByAggregateInput = {
    id_espacio?: SortOrder
    numero?: SortOrder
    tipo_espacio?: SortOrder
    tipo_habitacion?: SortOrder
    capacidad_personas?: SortOrder
    precio_persona_1?: SortOrder
    precio_persona_2?: SortOrder
    precio_adicional?: SortOrder
    estado_limpieza?: SortOrder
    activo?: SortOrder
    tiene_minibar?: SortOrder
  }

  export type espacioSumOrderByAggregateInput = {
    id_espacio?: SortOrder
    capacidad_personas?: SortOrder
    precio_persona_1?: SortOrder
    precio_persona_2?: SortOrder
    precio_adicional?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type Cuenta_personaListRelationFilter = {
    every?: cuenta_personaWhereInput
    some?: cuenta_personaWhereInput
    none?: cuenta_personaWhereInput
  }

  export type cuenta_personaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type huespedCountOrderByAggregateInput = {
    id_huesped?: SortOrder
    nombre_completo?: SortOrder
    telefono?: SortOrder
    documento?: SortOrder
    tipo_documento?: SortOrder
    procedencia?: SortOrder
    firma?: SortOrder
    fecha_creacion?: SortOrder
  }

  export type huespedAvgOrderByAggregateInput = {
    id_huesped?: SortOrder
  }

  export type huespedMaxOrderByAggregateInput = {
    id_huesped?: SortOrder
    nombre_completo?: SortOrder
    telefono?: SortOrder
    documento?: SortOrder
    tipo_documento?: SortOrder
    procedencia?: SortOrder
    firma?: SortOrder
    fecha_creacion?: SortOrder
  }

  export type huespedMinOrderByAggregateInput = {
    id_huesped?: SortOrder
    nombre_completo?: SortOrder
    telefono?: SortOrder
    documento?: SortOrder
    tipo_documento?: SortOrder
    procedencia?: SortOrder
    firma?: SortOrder
    fecha_creacion?: SortOrder
  }

  export type huespedSumOrderByAggregateInput = {
    id_huesped?: SortOrder
  }

  export type EspacioScalarRelationFilter = {
    is?: espacioWhereInput
    isNot?: espacioWhereInput
  }

  export type inventario_minibarCountOrderByAggregateInput = {
    id_inventario?: SortOrder
    id_espacio?: SortOrder
    nombre_producto?: SortOrder
    cantidad?: SortOrder
    precio_unitario?: SortOrder
    fecha_vencimiento?: SortOrder
    fecha_actualizacion?: SortOrder
  }

  export type inventario_minibarAvgOrderByAggregateInput = {
    id_inventario?: SortOrder
    id_espacio?: SortOrder
    cantidad?: SortOrder
    precio_unitario?: SortOrder
  }

  export type inventario_minibarMaxOrderByAggregateInput = {
    id_inventario?: SortOrder
    id_espacio?: SortOrder
    nombre_producto?: SortOrder
    cantidad?: SortOrder
    precio_unitario?: SortOrder
    fecha_vencimiento?: SortOrder
    fecha_actualizacion?: SortOrder
  }

  export type inventario_minibarMinOrderByAggregateInput = {
    id_inventario?: SortOrder
    id_espacio?: SortOrder
    nombre_producto?: SortOrder
    cantidad?: SortOrder
    precio_unitario?: SortOrder
    fecha_vencimiento?: SortOrder
    fecha_actualizacion?: SortOrder
  }

  export type inventario_minibarSumOrderByAggregateInput = {
    id_inventario?: SortOrder
    id_espacio?: SortOrder
    cantidad?: SortOrder
    precio_unitario?: SortOrder
  }

  export type Cuenta_espacioListRelationFilter = {
    every?: cuenta_espacioWhereInput
    some?: cuenta_espacioWhereInput
    none?: cuenta_espacioWhereInput
  }

  export type HuespedScalarRelationFilter = {
    is?: huespedWhereInput
    isNot?: huespedWhereInput
  }

  export type cuenta_espacioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type reservaCountOrderByAggregateInput = {
    id_reserva?: SortOrder
    id_huesped?: SortOrder
    id_espacio?: SortOrder
    tipo_reserva?: SortOrder
    dni_tipo?: SortOrder
    check_in?: SortOrder
    check_out?: SortOrder
    cantidad_adultos?: SortOrder
    cantidad_ninos?: SortOrder
    fecha_evento?: SortOrder
    hora_inicio?: SortOrder
    hora_fin?: SortOrder
    estado_reserva?: SortOrder
    monto_total?: SortOrder
    estado_pago?: SortOrder
    metodo_pago?: SortOrder
    monto_pagado?: SortOrder
    anotaciones?: SortOrder
    firma?: SortOrder
    fecha_creacion?: SortOrder
  }

  export type reservaAvgOrderByAggregateInput = {
    id_reserva?: SortOrder
    id_huesped?: SortOrder
    id_espacio?: SortOrder
    cantidad_adultos?: SortOrder
    cantidad_ninos?: SortOrder
    monto_total?: SortOrder
    monto_pagado?: SortOrder
  }

  export type reservaMaxOrderByAggregateInput = {
    id_reserva?: SortOrder
    id_huesped?: SortOrder
    id_espacio?: SortOrder
    tipo_reserva?: SortOrder
    dni_tipo?: SortOrder
    check_in?: SortOrder
    check_out?: SortOrder
    cantidad_adultos?: SortOrder
    cantidad_ninos?: SortOrder
    fecha_evento?: SortOrder
    hora_inicio?: SortOrder
    hora_fin?: SortOrder
    estado_reserva?: SortOrder
    monto_total?: SortOrder
    estado_pago?: SortOrder
    metodo_pago?: SortOrder
    monto_pagado?: SortOrder
    anotaciones?: SortOrder
    firma?: SortOrder
    fecha_creacion?: SortOrder
  }

  export type reservaMinOrderByAggregateInput = {
    id_reserva?: SortOrder
    id_huesped?: SortOrder
    id_espacio?: SortOrder
    tipo_reserva?: SortOrder
    dni_tipo?: SortOrder
    check_in?: SortOrder
    check_out?: SortOrder
    cantidad_adultos?: SortOrder
    cantidad_ninos?: SortOrder
    fecha_evento?: SortOrder
    hora_inicio?: SortOrder
    hora_fin?: SortOrder
    estado_reserva?: SortOrder
    monto_total?: SortOrder
    estado_pago?: SortOrder
    metodo_pago?: SortOrder
    monto_pagado?: SortOrder
    anotaciones?: SortOrder
    firma?: SortOrder
    fecha_creacion?: SortOrder
  }

  export type reservaSumOrderByAggregateInput = {
    id_reserva?: SortOrder
    id_huesped?: SortOrder
    id_espacio?: SortOrder
    cantidad_adultos?: SortOrder
    cantidad_ninos?: SortOrder
    monto_total?: SortOrder
    monto_pagado?: SortOrder
  }

  export type configuracion_hotelCountOrderByAggregateInput = {
    id?: SortOrder
    nombre_hotel?: SortOrder
    direccion?: SortOrder
    telefono?: SortOrder
    nit?: SortOrder
    email?: SortOrder
    ciudad?: SortOrder
    hora_check_in?: SortOrder
    hora_check_out?: SortOrder
    fecha_actualizacion?: SortOrder
  }

  export type configuracion_hotelAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type configuracion_hotelMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre_hotel?: SortOrder
    direccion?: SortOrder
    telefono?: SortOrder
    nit?: SortOrder
    email?: SortOrder
    ciudad?: SortOrder
    hora_check_in?: SortOrder
    hora_check_out?: SortOrder
    fecha_actualizacion?: SortOrder
  }

  export type configuracion_hotelMinOrderByAggregateInput = {
    id?: SortOrder
    nombre_hotel?: SortOrder
    direccion?: SortOrder
    telefono?: SortOrder
    nit?: SortOrder
    email?: SortOrder
    ciudad?: SortOrder
    hora_check_in?: SortOrder
    hora_check_out?: SortOrder
    fecha_actualizacion?: SortOrder
  }

  export type configuracion_hotelSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type tipo_espacio_configCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    precio_base?: SortOrder
    recargo_pareja?: SortOrder
    recargo_adicional?: SortOrder
    max_personas_adicionales?: SortOrder
  }

  export type tipo_espacio_configAvgOrderByAggregateInput = {
    id?: SortOrder
    precio_base?: SortOrder
    recargo_pareja?: SortOrder
    recargo_adicional?: SortOrder
    max_personas_adicionales?: SortOrder
  }

  export type tipo_espacio_configMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    precio_base?: SortOrder
    recargo_pareja?: SortOrder
    recargo_adicional?: SortOrder
    max_personas_adicionales?: SortOrder
  }

  export type tipo_espacio_configMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    precio_base?: SortOrder
    recargo_pareja?: SortOrder
    recargo_adicional?: SortOrder
    max_personas_adicionales?: SortOrder
  }

  export type tipo_espacio_configSumOrderByAggregateInput = {
    id?: SortOrder
    precio_base?: SortOrder
    recargo_pareja?: SortOrder
    recargo_adicional?: SortOrder
    max_personas_adicionales?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type categoria_inventarioCountOrderByAggregateInput = {
    id_categoria?: SortOrder
    nombre?: SortOrder
    activo?: SortOrder
    fecha_creacion?: SortOrder
  }

  export type categoria_inventarioAvgOrderByAggregateInput = {
    id_categoria?: SortOrder
  }

  export type categoria_inventarioMaxOrderByAggregateInput = {
    id_categoria?: SortOrder
    nombre?: SortOrder
    activo?: SortOrder
    fecha_creacion?: SortOrder
  }

  export type categoria_inventarioMinOrderByAggregateInput = {
    id_categoria?: SortOrder
    nombre?: SortOrder
    activo?: SortOrder
    fecha_creacion?: SortOrder
  }

  export type categoria_inventarioSumOrderByAggregateInput = {
    id_categoria?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type Producto_inventarioListRelationFilter = {
    every?: producto_inventarioWhereInput
    some?: producto_inventarioWhereInput
    none?: producto_inventarioWhereInput
  }

  export type producto_inventarioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type proveedorCountOrderByAggregateInput = {
    id_proveedor?: SortOrder
    nombre?: SortOrder
    nit?: SortOrder
    telefono?: SortOrder
    email?: SortOrder
    direccion?: SortOrder
    ciudad?: SortOrder
    contacto?: SortOrder
    notas?: SortOrder
    activo?: SortOrder
    fecha_creacion?: SortOrder
  }

  export type proveedorAvgOrderByAggregateInput = {
    id_proveedor?: SortOrder
  }

  export type proveedorMaxOrderByAggregateInput = {
    id_proveedor?: SortOrder
    nombre?: SortOrder
    nit?: SortOrder
    telefono?: SortOrder
    email?: SortOrder
    direccion?: SortOrder
    ciudad?: SortOrder
    contacto?: SortOrder
    notas?: SortOrder
    activo?: SortOrder
    fecha_creacion?: SortOrder
  }

  export type proveedorMinOrderByAggregateInput = {
    id_proveedor?: SortOrder
    nombre?: SortOrder
    nit?: SortOrder
    telefono?: SortOrder
    email?: SortOrder
    direccion?: SortOrder
    ciudad?: SortOrder
    contacto?: SortOrder
    notas?: SortOrder
    activo?: SortOrder
    fecha_creacion?: SortOrder
  }

  export type proveedorSumOrderByAggregateInput = {
    id_proveedor?: SortOrder
  }

  export type ProveedorNullableScalarRelationFilter = {
    is?: proveedorWhereInput | null
    isNot?: proveedorWhereInput | null
  }

  export type Movimiento_inventarioListRelationFilter = {
    every?: movimiento_inventarioWhereInput
    some?: movimiento_inventarioWhereInput
    none?: movimiento_inventarioWhereInput
  }

  export type movimiento_inventarioOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type producto_inventarioCountOrderByAggregateInput = {
    id_producto?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    categoria?: SortOrder
    unidad_medida?: SortOrder
    precio_costo?: SortOrder
    precio_venta?: SortOrder
    stock_actual?: SortOrder
    stock_minimo?: SortOrder
    id_proveedor?: SortOrder
    activo?: SortOrder
    fecha_creacion?: SortOrder
  }

  export type producto_inventarioAvgOrderByAggregateInput = {
    id_producto?: SortOrder
    precio_costo?: SortOrder
    precio_venta?: SortOrder
    stock_actual?: SortOrder
    stock_minimo?: SortOrder
    id_proveedor?: SortOrder
  }

  export type producto_inventarioMaxOrderByAggregateInput = {
    id_producto?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    categoria?: SortOrder
    unidad_medida?: SortOrder
    precio_costo?: SortOrder
    precio_venta?: SortOrder
    stock_actual?: SortOrder
    stock_minimo?: SortOrder
    id_proveedor?: SortOrder
    activo?: SortOrder
    fecha_creacion?: SortOrder
  }

  export type producto_inventarioMinOrderByAggregateInput = {
    id_producto?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    categoria?: SortOrder
    unidad_medida?: SortOrder
    precio_costo?: SortOrder
    precio_venta?: SortOrder
    stock_actual?: SortOrder
    stock_minimo?: SortOrder
    id_proveedor?: SortOrder
    activo?: SortOrder
    fecha_creacion?: SortOrder
  }

  export type producto_inventarioSumOrderByAggregateInput = {
    id_producto?: SortOrder
    precio_costo?: SortOrder
    precio_venta?: SortOrder
    stock_actual?: SortOrder
    stock_minimo?: SortOrder
    id_proveedor?: SortOrder
  }

  export type Producto_inventarioScalarRelationFilter = {
    is?: producto_inventarioWhereInput
    isNot?: producto_inventarioWhereInput
  }

  export type movimiento_inventarioCountOrderByAggregateInput = {
    id_movimiento?: SortOrder
    id_producto?: SortOrder
    tipo?: SortOrder
    motivo?: SortOrder
    cantidad?: SortOrder
    stock_antes?: SortOrder
    stock_despues?: SortOrder
    precio_unitario?: SortOrder
    referencia_id?: SortOrder
    referencia_tipo?: SortOrder
    notas?: SortOrder
    fecha?: SortOrder
  }

  export type movimiento_inventarioAvgOrderByAggregateInput = {
    id_movimiento?: SortOrder
    id_producto?: SortOrder
    cantidad?: SortOrder
    stock_antes?: SortOrder
    stock_despues?: SortOrder
    precio_unitario?: SortOrder
    referencia_id?: SortOrder
  }

  export type movimiento_inventarioMaxOrderByAggregateInput = {
    id_movimiento?: SortOrder
    id_producto?: SortOrder
    tipo?: SortOrder
    motivo?: SortOrder
    cantidad?: SortOrder
    stock_antes?: SortOrder
    stock_despues?: SortOrder
    precio_unitario?: SortOrder
    referencia_id?: SortOrder
    referencia_tipo?: SortOrder
    notas?: SortOrder
    fecha?: SortOrder
  }

  export type movimiento_inventarioMinOrderByAggregateInput = {
    id_movimiento?: SortOrder
    id_producto?: SortOrder
    tipo?: SortOrder
    motivo?: SortOrder
    cantidad?: SortOrder
    stock_antes?: SortOrder
    stock_despues?: SortOrder
    precio_unitario?: SortOrder
    referencia_id?: SortOrder
    referencia_tipo?: SortOrder
    notas?: SortOrder
    fecha?: SortOrder
  }

  export type movimiento_inventarioSumOrderByAggregateInput = {
    id_movimiento?: SortOrder
    id_producto?: SortOrder
    cantidad?: SortOrder
    stock_antes?: SortOrder
    stock_despues?: SortOrder
    precio_unitario?: SortOrder
    referencia_id?: SortOrder
  }

  export type gasto_operativoCountOrderByAggregateInput = {
    id_gasto?: SortOrder
    categoria?: SortOrder
    descripcion?: SortOrder
    monto?: SortOrder
    fecha?: SortOrder
    comprobante?: SortOrder
    proveedor_nombre?: SortOrder
    es_recurrente?: SortOrder
    dia_recurrente?: SortOrder
    notas?: SortOrder
    activo?: SortOrder
    fecha_creacion?: SortOrder
  }

  export type gasto_operativoAvgOrderByAggregateInput = {
    id_gasto?: SortOrder
    monto?: SortOrder
    dia_recurrente?: SortOrder
  }

  export type gasto_operativoMaxOrderByAggregateInput = {
    id_gasto?: SortOrder
    categoria?: SortOrder
    descripcion?: SortOrder
    monto?: SortOrder
    fecha?: SortOrder
    comprobante?: SortOrder
    proveedor_nombre?: SortOrder
    es_recurrente?: SortOrder
    dia_recurrente?: SortOrder
    notas?: SortOrder
    activo?: SortOrder
    fecha_creacion?: SortOrder
  }

  export type gasto_operativoMinOrderByAggregateInput = {
    id_gasto?: SortOrder
    categoria?: SortOrder
    descripcion?: SortOrder
    monto?: SortOrder
    fecha?: SortOrder
    comprobante?: SortOrder
    proveedor_nombre?: SortOrder
    es_recurrente?: SortOrder
    dia_recurrente?: SortOrder
    notas?: SortOrder
    activo?: SortOrder
    fecha_creacion?: SortOrder
  }

  export type gasto_operativoSumOrderByAggregateInput = {
    id_gasto?: SortOrder
    monto?: SortOrder
    dia_recurrente?: SortOrder
  }

  export type categoria_gastoCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    activo?: SortOrder
  }

  export type categoria_gastoAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type categoria_gastoMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    activo?: SortOrder
  }

  export type categoria_gastoMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    activo?: SortOrder
  }

  export type categoria_gastoSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type reservaCreateNestedOneWithoutCuenta_espacioInput = {
    create?: XOR<reservaCreateWithoutCuenta_espacioInput, reservaUncheckedCreateWithoutCuenta_espacioInput>
    connectOrCreate?: reservaCreateOrConnectWithoutCuenta_espacioInput
    connect?: reservaWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type reservaUpdateOneRequiredWithoutCuenta_espacioNestedInput = {
    create?: XOR<reservaCreateWithoutCuenta_espacioInput, reservaUncheckedCreateWithoutCuenta_espacioInput>
    connectOrCreate?: reservaCreateOrConnectWithoutCuenta_espacioInput
    upsert?: reservaUpsertWithoutCuenta_espacioInput
    connect?: reservaWhereUniqueInput
    update?: XOR<XOR<reservaUpdateToOneWithWhereWithoutCuenta_espacioInput, reservaUpdateWithoutCuenta_espacioInput>, reservaUncheckedUpdateWithoutCuenta_espacioInput>
  }

  export type huespedCreateNestedOneWithoutCuenta_personaInput = {
    create?: XOR<huespedCreateWithoutCuenta_personaInput, huespedUncheckedCreateWithoutCuenta_personaInput>
    connectOrCreate?: huespedCreateOrConnectWithoutCuenta_personaInput
    connect?: huespedWhereUniqueInput
  }

  export type reservaCreateNestedOneWithoutCuenta_personaInput = {
    create?: XOR<reservaCreateWithoutCuenta_personaInput, reservaUncheckedCreateWithoutCuenta_personaInput>
    connectOrCreate?: reservaCreateOrConnectWithoutCuenta_personaInput
    connect?: reservaWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type huespedUpdateOneWithoutCuenta_personaNestedInput = {
    create?: XOR<huespedCreateWithoutCuenta_personaInput, huespedUncheckedCreateWithoutCuenta_personaInput>
    connectOrCreate?: huespedCreateOrConnectWithoutCuenta_personaInput
    upsert?: huespedUpsertWithoutCuenta_personaInput
    disconnect?: huespedWhereInput | boolean
    delete?: huespedWhereInput | boolean
    connect?: huespedWhereUniqueInput
    update?: XOR<XOR<huespedUpdateToOneWithWhereWithoutCuenta_personaInput, huespedUpdateWithoutCuenta_personaInput>, huespedUncheckedUpdateWithoutCuenta_personaInput>
  }

  export type reservaUpdateOneWithoutCuenta_personaNestedInput = {
    create?: XOR<reservaCreateWithoutCuenta_personaInput, reservaUncheckedCreateWithoutCuenta_personaInput>
    connectOrCreate?: reservaCreateOrConnectWithoutCuenta_personaInput
    upsert?: reservaUpsertWithoutCuenta_personaInput
    disconnect?: reservaWhereInput | boolean
    delete?: reservaWhereInput | boolean
    connect?: reservaWhereUniqueInput
    update?: XOR<XOR<reservaUpdateToOneWithWhereWithoutCuenta_personaInput, reservaUpdateWithoutCuenta_personaInput>, reservaUncheckedUpdateWithoutCuenta_personaInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type inventario_minibarCreateNestedManyWithoutEspacioInput = {
    create?: XOR<inventario_minibarCreateWithoutEspacioInput, inventario_minibarUncheckedCreateWithoutEspacioInput> | inventario_minibarCreateWithoutEspacioInput[] | inventario_minibarUncheckedCreateWithoutEspacioInput[]
    connectOrCreate?: inventario_minibarCreateOrConnectWithoutEspacioInput | inventario_minibarCreateOrConnectWithoutEspacioInput[]
    createMany?: inventario_minibarCreateManyEspacioInputEnvelope
    connect?: inventario_minibarWhereUniqueInput | inventario_minibarWhereUniqueInput[]
  }

  export type reservaCreateNestedManyWithoutEspacioInput = {
    create?: XOR<reservaCreateWithoutEspacioInput, reservaUncheckedCreateWithoutEspacioInput> | reservaCreateWithoutEspacioInput[] | reservaUncheckedCreateWithoutEspacioInput[]
    connectOrCreate?: reservaCreateOrConnectWithoutEspacioInput | reservaCreateOrConnectWithoutEspacioInput[]
    createMany?: reservaCreateManyEspacioInputEnvelope
    connect?: reservaWhereUniqueInput | reservaWhereUniqueInput[]
  }

  export type inventario_minibarUncheckedCreateNestedManyWithoutEspacioInput = {
    create?: XOR<inventario_minibarCreateWithoutEspacioInput, inventario_minibarUncheckedCreateWithoutEspacioInput> | inventario_minibarCreateWithoutEspacioInput[] | inventario_minibarUncheckedCreateWithoutEspacioInput[]
    connectOrCreate?: inventario_minibarCreateOrConnectWithoutEspacioInput | inventario_minibarCreateOrConnectWithoutEspacioInput[]
    createMany?: inventario_minibarCreateManyEspacioInputEnvelope
    connect?: inventario_minibarWhereUniqueInput | inventario_minibarWhereUniqueInput[]
  }

  export type reservaUncheckedCreateNestedManyWithoutEspacioInput = {
    create?: XOR<reservaCreateWithoutEspacioInput, reservaUncheckedCreateWithoutEspacioInput> | reservaCreateWithoutEspacioInput[] | reservaUncheckedCreateWithoutEspacioInput[]
    connectOrCreate?: reservaCreateOrConnectWithoutEspacioInput | reservaCreateOrConnectWithoutEspacioInput[]
    createMany?: reservaCreateManyEspacioInputEnvelope
    connect?: reservaWhereUniqueInput | reservaWhereUniqueInput[]
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type inventario_minibarUpdateManyWithoutEspacioNestedInput = {
    create?: XOR<inventario_minibarCreateWithoutEspacioInput, inventario_minibarUncheckedCreateWithoutEspacioInput> | inventario_minibarCreateWithoutEspacioInput[] | inventario_minibarUncheckedCreateWithoutEspacioInput[]
    connectOrCreate?: inventario_minibarCreateOrConnectWithoutEspacioInput | inventario_minibarCreateOrConnectWithoutEspacioInput[]
    upsert?: inventario_minibarUpsertWithWhereUniqueWithoutEspacioInput | inventario_minibarUpsertWithWhereUniqueWithoutEspacioInput[]
    createMany?: inventario_minibarCreateManyEspacioInputEnvelope
    set?: inventario_minibarWhereUniqueInput | inventario_minibarWhereUniqueInput[]
    disconnect?: inventario_minibarWhereUniqueInput | inventario_minibarWhereUniqueInput[]
    delete?: inventario_minibarWhereUniqueInput | inventario_minibarWhereUniqueInput[]
    connect?: inventario_minibarWhereUniqueInput | inventario_minibarWhereUniqueInput[]
    update?: inventario_minibarUpdateWithWhereUniqueWithoutEspacioInput | inventario_minibarUpdateWithWhereUniqueWithoutEspacioInput[]
    updateMany?: inventario_minibarUpdateManyWithWhereWithoutEspacioInput | inventario_minibarUpdateManyWithWhereWithoutEspacioInput[]
    deleteMany?: inventario_minibarScalarWhereInput | inventario_minibarScalarWhereInput[]
  }

  export type reservaUpdateManyWithoutEspacioNestedInput = {
    create?: XOR<reservaCreateWithoutEspacioInput, reservaUncheckedCreateWithoutEspacioInput> | reservaCreateWithoutEspacioInput[] | reservaUncheckedCreateWithoutEspacioInput[]
    connectOrCreate?: reservaCreateOrConnectWithoutEspacioInput | reservaCreateOrConnectWithoutEspacioInput[]
    upsert?: reservaUpsertWithWhereUniqueWithoutEspacioInput | reservaUpsertWithWhereUniqueWithoutEspacioInput[]
    createMany?: reservaCreateManyEspacioInputEnvelope
    set?: reservaWhereUniqueInput | reservaWhereUniqueInput[]
    disconnect?: reservaWhereUniqueInput | reservaWhereUniqueInput[]
    delete?: reservaWhereUniqueInput | reservaWhereUniqueInput[]
    connect?: reservaWhereUniqueInput | reservaWhereUniqueInput[]
    update?: reservaUpdateWithWhereUniqueWithoutEspacioInput | reservaUpdateWithWhereUniqueWithoutEspacioInput[]
    updateMany?: reservaUpdateManyWithWhereWithoutEspacioInput | reservaUpdateManyWithWhereWithoutEspacioInput[]
    deleteMany?: reservaScalarWhereInput | reservaScalarWhereInput[]
  }

  export type inventario_minibarUncheckedUpdateManyWithoutEspacioNestedInput = {
    create?: XOR<inventario_minibarCreateWithoutEspacioInput, inventario_minibarUncheckedCreateWithoutEspacioInput> | inventario_minibarCreateWithoutEspacioInput[] | inventario_minibarUncheckedCreateWithoutEspacioInput[]
    connectOrCreate?: inventario_minibarCreateOrConnectWithoutEspacioInput | inventario_minibarCreateOrConnectWithoutEspacioInput[]
    upsert?: inventario_minibarUpsertWithWhereUniqueWithoutEspacioInput | inventario_minibarUpsertWithWhereUniqueWithoutEspacioInput[]
    createMany?: inventario_minibarCreateManyEspacioInputEnvelope
    set?: inventario_minibarWhereUniqueInput | inventario_minibarWhereUniqueInput[]
    disconnect?: inventario_minibarWhereUniqueInput | inventario_minibarWhereUniqueInput[]
    delete?: inventario_minibarWhereUniqueInput | inventario_minibarWhereUniqueInput[]
    connect?: inventario_minibarWhereUniqueInput | inventario_minibarWhereUniqueInput[]
    update?: inventario_minibarUpdateWithWhereUniqueWithoutEspacioInput | inventario_minibarUpdateWithWhereUniqueWithoutEspacioInput[]
    updateMany?: inventario_minibarUpdateManyWithWhereWithoutEspacioInput | inventario_minibarUpdateManyWithWhereWithoutEspacioInput[]
    deleteMany?: inventario_minibarScalarWhereInput | inventario_minibarScalarWhereInput[]
  }

  export type reservaUncheckedUpdateManyWithoutEspacioNestedInput = {
    create?: XOR<reservaCreateWithoutEspacioInput, reservaUncheckedCreateWithoutEspacioInput> | reservaCreateWithoutEspacioInput[] | reservaUncheckedCreateWithoutEspacioInput[]
    connectOrCreate?: reservaCreateOrConnectWithoutEspacioInput | reservaCreateOrConnectWithoutEspacioInput[]
    upsert?: reservaUpsertWithWhereUniqueWithoutEspacioInput | reservaUpsertWithWhereUniqueWithoutEspacioInput[]
    createMany?: reservaCreateManyEspacioInputEnvelope
    set?: reservaWhereUniqueInput | reservaWhereUniqueInput[]
    disconnect?: reservaWhereUniqueInput | reservaWhereUniqueInput[]
    delete?: reservaWhereUniqueInput | reservaWhereUniqueInput[]
    connect?: reservaWhereUniqueInput | reservaWhereUniqueInput[]
    update?: reservaUpdateWithWhereUniqueWithoutEspacioInput | reservaUpdateWithWhereUniqueWithoutEspacioInput[]
    updateMany?: reservaUpdateManyWithWhereWithoutEspacioInput | reservaUpdateManyWithWhereWithoutEspacioInput[]
    deleteMany?: reservaScalarWhereInput | reservaScalarWhereInput[]
  }

  export type cuenta_personaCreateNestedManyWithoutHuespedInput = {
    create?: XOR<cuenta_personaCreateWithoutHuespedInput, cuenta_personaUncheckedCreateWithoutHuespedInput> | cuenta_personaCreateWithoutHuespedInput[] | cuenta_personaUncheckedCreateWithoutHuespedInput[]
    connectOrCreate?: cuenta_personaCreateOrConnectWithoutHuespedInput | cuenta_personaCreateOrConnectWithoutHuespedInput[]
    createMany?: cuenta_personaCreateManyHuespedInputEnvelope
    connect?: cuenta_personaWhereUniqueInput | cuenta_personaWhereUniqueInput[]
  }

  export type reservaCreateNestedManyWithoutHuespedInput = {
    create?: XOR<reservaCreateWithoutHuespedInput, reservaUncheckedCreateWithoutHuespedInput> | reservaCreateWithoutHuespedInput[] | reservaUncheckedCreateWithoutHuespedInput[]
    connectOrCreate?: reservaCreateOrConnectWithoutHuespedInput | reservaCreateOrConnectWithoutHuespedInput[]
    createMany?: reservaCreateManyHuespedInputEnvelope
    connect?: reservaWhereUniqueInput | reservaWhereUniqueInput[]
  }

  export type cuenta_personaUncheckedCreateNestedManyWithoutHuespedInput = {
    create?: XOR<cuenta_personaCreateWithoutHuespedInput, cuenta_personaUncheckedCreateWithoutHuespedInput> | cuenta_personaCreateWithoutHuespedInput[] | cuenta_personaUncheckedCreateWithoutHuespedInput[]
    connectOrCreate?: cuenta_personaCreateOrConnectWithoutHuespedInput | cuenta_personaCreateOrConnectWithoutHuespedInput[]
    createMany?: cuenta_personaCreateManyHuespedInputEnvelope
    connect?: cuenta_personaWhereUniqueInput | cuenta_personaWhereUniqueInput[]
  }

  export type reservaUncheckedCreateNestedManyWithoutHuespedInput = {
    create?: XOR<reservaCreateWithoutHuespedInput, reservaUncheckedCreateWithoutHuespedInput> | reservaCreateWithoutHuespedInput[] | reservaUncheckedCreateWithoutHuespedInput[]
    connectOrCreate?: reservaCreateOrConnectWithoutHuespedInput | reservaCreateOrConnectWithoutHuespedInput[]
    createMany?: reservaCreateManyHuespedInputEnvelope
    connect?: reservaWhereUniqueInput | reservaWhereUniqueInput[]
  }

  export type cuenta_personaUpdateManyWithoutHuespedNestedInput = {
    create?: XOR<cuenta_personaCreateWithoutHuespedInput, cuenta_personaUncheckedCreateWithoutHuespedInput> | cuenta_personaCreateWithoutHuespedInput[] | cuenta_personaUncheckedCreateWithoutHuespedInput[]
    connectOrCreate?: cuenta_personaCreateOrConnectWithoutHuespedInput | cuenta_personaCreateOrConnectWithoutHuespedInput[]
    upsert?: cuenta_personaUpsertWithWhereUniqueWithoutHuespedInput | cuenta_personaUpsertWithWhereUniqueWithoutHuespedInput[]
    createMany?: cuenta_personaCreateManyHuespedInputEnvelope
    set?: cuenta_personaWhereUniqueInput | cuenta_personaWhereUniqueInput[]
    disconnect?: cuenta_personaWhereUniqueInput | cuenta_personaWhereUniqueInput[]
    delete?: cuenta_personaWhereUniqueInput | cuenta_personaWhereUniqueInput[]
    connect?: cuenta_personaWhereUniqueInput | cuenta_personaWhereUniqueInput[]
    update?: cuenta_personaUpdateWithWhereUniqueWithoutHuespedInput | cuenta_personaUpdateWithWhereUniqueWithoutHuespedInput[]
    updateMany?: cuenta_personaUpdateManyWithWhereWithoutHuespedInput | cuenta_personaUpdateManyWithWhereWithoutHuespedInput[]
    deleteMany?: cuenta_personaScalarWhereInput | cuenta_personaScalarWhereInput[]
  }

  export type reservaUpdateManyWithoutHuespedNestedInput = {
    create?: XOR<reservaCreateWithoutHuespedInput, reservaUncheckedCreateWithoutHuespedInput> | reservaCreateWithoutHuespedInput[] | reservaUncheckedCreateWithoutHuespedInput[]
    connectOrCreate?: reservaCreateOrConnectWithoutHuespedInput | reservaCreateOrConnectWithoutHuespedInput[]
    upsert?: reservaUpsertWithWhereUniqueWithoutHuespedInput | reservaUpsertWithWhereUniqueWithoutHuespedInput[]
    createMany?: reservaCreateManyHuespedInputEnvelope
    set?: reservaWhereUniqueInput | reservaWhereUniqueInput[]
    disconnect?: reservaWhereUniqueInput | reservaWhereUniqueInput[]
    delete?: reservaWhereUniqueInput | reservaWhereUniqueInput[]
    connect?: reservaWhereUniqueInput | reservaWhereUniqueInput[]
    update?: reservaUpdateWithWhereUniqueWithoutHuespedInput | reservaUpdateWithWhereUniqueWithoutHuespedInput[]
    updateMany?: reservaUpdateManyWithWhereWithoutHuespedInput | reservaUpdateManyWithWhereWithoutHuespedInput[]
    deleteMany?: reservaScalarWhereInput | reservaScalarWhereInput[]
  }

  export type cuenta_personaUncheckedUpdateManyWithoutHuespedNestedInput = {
    create?: XOR<cuenta_personaCreateWithoutHuespedInput, cuenta_personaUncheckedCreateWithoutHuespedInput> | cuenta_personaCreateWithoutHuespedInput[] | cuenta_personaUncheckedCreateWithoutHuespedInput[]
    connectOrCreate?: cuenta_personaCreateOrConnectWithoutHuespedInput | cuenta_personaCreateOrConnectWithoutHuespedInput[]
    upsert?: cuenta_personaUpsertWithWhereUniqueWithoutHuespedInput | cuenta_personaUpsertWithWhereUniqueWithoutHuespedInput[]
    createMany?: cuenta_personaCreateManyHuespedInputEnvelope
    set?: cuenta_personaWhereUniqueInput | cuenta_personaWhereUniqueInput[]
    disconnect?: cuenta_personaWhereUniqueInput | cuenta_personaWhereUniqueInput[]
    delete?: cuenta_personaWhereUniqueInput | cuenta_personaWhereUniqueInput[]
    connect?: cuenta_personaWhereUniqueInput | cuenta_personaWhereUniqueInput[]
    update?: cuenta_personaUpdateWithWhereUniqueWithoutHuespedInput | cuenta_personaUpdateWithWhereUniqueWithoutHuespedInput[]
    updateMany?: cuenta_personaUpdateManyWithWhereWithoutHuespedInput | cuenta_personaUpdateManyWithWhereWithoutHuespedInput[]
    deleteMany?: cuenta_personaScalarWhereInput | cuenta_personaScalarWhereInput[]
  }

  export type reservaUncheckedUpdateManyWithoutHuespedNestedInput = {
    create?: XOR<reservaCreateWithoutHuespedInput, reservaUncheckedCreateWithoutHuespedInput> | reservaCreateWithoutHuespedInput[] | reservaUncheckedCreateWithoutHuespedInput[]
    connectOrCreate?: reservaCreateOrConnectWithoutHuespedInput | reservaCreateOrConnectWithoutHuespedInput[]
    upsert?: reservaUpsertWithWhereUniqueWithoutHuespedInput | reservaUpsertWithWhereUniqueWithoutHuespedInput[]
    createMany?: reservaCreateManyHuespedInputEnvelope
    set?: reservaWhereUniqueInput | reservaWhereUniqueInput[]
    disconnect?: reservaWhereUniqueInput | reservaWhereUniqueInput[]
    delete?: reservaWhereUniqueInput | reservaWhereUniqueInput[]
    connect?: reservaWhereUniqueInput | reservaWhereUniqueInput[]
    update?: reservaUpdateWithWhereUniqueWithoutHuespedInput | reservaUpdateWithWhereUniqueWithoutHuespedInput[]
    updateMany?: reservaUpdateManyWithWhereWithoutHuespedInput | reservaUpdateManyWithWhereWithoutHuespedInput[]
    deleteMany?: reservaScalarWhereInput | reservaScalarWhereInput[]
  }

  export type espacioCreateNestedOneWithoutInventario_minibarInput = {
    create?: XOR<espacioCreateWithoutInventario_minibarInput, espacioUncheckedCreateWithoutInventario_minibarInput>
    connectOrCreate?: espacioCreateOrConnectWithoutInventario_minibarInput
    connect?: espacioWhereUniqueInput
  }

  export type espacioUpdateOneRequiredWithoutInventario_minibarNestedInput = {
    create?: XOR<espacioCreateWithoutInventario_minibarInput, espacioUncheckedCreateWithoutInventario_minibarInput>
    connectOrCreate?: espacioCreateOrConnectWithoutInventario_minibarInput
    upsert?: espacioUpsertWithoutInventario_minibarInput
    connect?: espacioWhereUniqueInput
    update?: XOR<XOR<espacioUpdateToOneWithWhereWithoutInventario_minibarInput, espacioUpdateWithoutInventario_minibarInput>, espacioUncheckedUpdateWithoutInventario_minibarInput>
  }

  export type cuenta_espacioCreateNestedManyWithoutReservaInput = {
    create?: XOR<cuenta_espacioCreateWithoutReservaInput, cuenta_espacioUncheckedCreateWithoutReservaInput> | cuenta_espacioCreateWithoutReservaInput[] | cuenta_espacioUncheckedCreateWithoutReservaInput[]
    connectOrCreate?: cuenta_espacioCreateOrConnectWithoutReservaInput | cuenta_espacioCreateOrConnectWithoutReservaInput[]
    createMany?: cuenta_espacioCreateManyReservaInputEnvelope
    connect?: cuenta_espacioWhereUniqueInput | cuenta_espacioWhereUniqueInput[]
  }

  export type cuenta_personaCreateNestedManyWithoutReservaInput = {
    create?: XOR<cuenta_personaCreateWithoutReservaInput, cuenta_personaUncheckedCreateWithoutReservaInput> | cuenta_personaCreateWithoutReservaInput[] | cuenta_personaUncheckedCreateWithoutReservaInput[]
    connectOrCreate?: cuenta_personaCreateOrConnectWithoutReservaInput | cuenta_personaCreateOrConnectWithoutReservaInput[]
    createMany?: cuenta_personaCreateManyReservaInputEnvelope
    connect?: cuenta_personaWhereUniqueInput | cuenta_personaWhereUniqueInput[]
  }

  export type espacioCreateNestedOneWithoutReservaInput = {
    create?: XOR<espacioCreateWithoutReservaInput, espacioUncheckedCreateWithoutReservaInput>
    connectOrCreate?: espacioCreateOrConnectWithoutReservaInput
    connect?: espacioWhereUniqueInput
  }

  export type huespedCreateNestedOneWithoutReservaInput = {
    create?: XOR<huespedCreateWithoutReservaInput, huespedUncheckedCreateWithoutReservaInput>
    connectOrCreate?: huespedCreateOrConnectWithoutReservaInput
    connect?: huespedWhereUniqueInput
  }

  export type cuenta_espacioUncheckedCreateNestedManyWithoutReservaInput = {
    create?: XOR<cuenta_espacioCreateWithoutReservaInput, cuenta_espacioUncheckedCreateWithoutReservaInput> | cuenta_espacioCreateWithoutReservaInput[] | cuenta_espacioUncheckedCreateWithoutReservaInput[]
    connectOrCreate?: cuenta_espacioCreateOrConnectWithoutReservaInput | cuenta_espacioCreateOrConnectWithoutReservaInput[]
    createMany?: cuenta_espacioCreateManyReservaInputEnvelope
    connect?: cuenta_espacioWhereUniqueInput | cuenta_espacioWhereUniqueInput[]
  }

  export type cuenta_personaUncheckedCreateNestedManyWithoutReservaInput = {
    create?: XOR<cuenta_personaCreateWithoutReservaInput, cuenta_personaUncheckedCreateWithoutReservaInput> | cuenta_personaCreateWithoutReservaInput[] | cuenta_personaUncheckedCreateWithoutReservaInput[]
    connectOrCreate?: cuenta_personaCreateOrConnectWithoutReservaInput | cuenta_personaCreateOrConnectWithoutReservaInput[]
    createMany?: cuenta_personaCreateManyReservaInputEnvelope
    connect?: cuenta_personaWhereUniqueInput | cuenta_personaWhereUniqueInput[]
  }

  export type cuenta_espacioUpdateManyWithoutReservaNestedInput = {
    create?: XOR<cuenta_espacioCreateWithoutReservaInput, cuenta_espacioUncheckedCreateWithoutReservaInput> | cuenta_espacioCreateWithoutReservaInput[] | cuenta_espacioUncheckedCreateWithoutReservaInput[]
    connectOrCreate?: cuenta_espacioCreateOrConnectWithoutReservaInput | cuenta_espacioCreateOrConnectWithoutReservaInput[]
    upsert?: cuenta_espacioUpsertWithWhereUniqueWithoutReservaInput | cuenta_espacioUpsertWithWhereUniqueWithoutReservaInput[]
    createMany?: cuenta_espacioCreateManyReservaInputEnvelope
    set?: cuenta_espacioWhereUniqueInput | cuenta_espacioWhereUniqueInput[]
    disconnect?: cuenta_espacioWhereUniqueInput | cuenta_espacioWhereUniqueInput[]
    delete?: cuenta_espacioWhereUniqueInput | cuenta_espacioWhereUniqueInput[]
    connect?: cuenta_espacioWhereUniqueInput | cuenta_espacioWhereUniqueInput[]
    update?: cuenta_espacioUpdateWithWhereUniqueWithoutReservaInput | cuenta_espacioUpdateWithWhereUniqueWithoutReservaInput[]
    updateMany?: cuenta_espacioUpdateManyWithWhereWithoutReservaInput | cuenta_espacioUpdateManyWithWhereWithoutReservaInput[]
    deleteMany?: cuenta_espacioScalarWhereInput | cuenta_espacioScalarWhereInput[]
  }

  export type cuenta_personaUpdateManyWithoutReservaNestedInput = {
    create?: XOR<cuenta_personaCreateWithoutReservaInput, cuenta_personaUncheckedCreateWithoutReservaInput> | cuenta_personaCreateWithoutReservaInput[] | cuenta_personaUncheckedCreateWithoutReservaInput[]
    connectOrCreate?: cuenta_personaCreateOrConnectWithoutReservaInput | cuenta_personaCreateOrConnectWithoutReservaInput[]
    upsert?: cuenta_personaUpsertWithWhereUniqueWithoutReservaInput | cuenta_personaUpsertWithWhereUniqueWithoutReservaInput[]
    createMany?: cuenta_personaCreateManyReservaInputEnvelope
    set?: cuenta_personaWhereUniqueInput | cuenta_personaWhereUniqueInput[]
    disconnect?: cuenta_personaWhereUniqueInput | cuenta_personaWhereUniqueInput[]
    delete?: cuenta_personaWhereUniqueInput | cuenta_personaWhereUniqueInput[]
    connect?: cuenta_personaWhereUniqueInput | cuenta_personaWhereUniqueInput[]
    update?: cuenta_personaUpdateWithWhereUniqueWithoutReservaInput | cuenta_personaUpdateWithWhereUniqueWithoutReservaInput[]
    updateMany?: cuenta_personaUpdateManyWithWhereWithoutReservaInput | cuenta_personaUpdateManyWithWhereWithoutReservaInput[]
    deleteMany?: cuenta_personaScalarWhereInput | cuenta_personaScalarWhereInput[]
  }

  export type espacioUpdateOneRequiredWithoutReservaNestedInput = {
    create?: XOR<espacioCreateWithoutReservaInput, espacioUncheckedCreateWithoutReservaInput>
    connectOrCreate?: espacioCreateOrConnectWithoutReservaInput
    upsert?: espacioUpsertWithoutReservaInput
    connect?: espacioWhereUniqueInput
    update?: XOR<XOR<espacioUpdateToOneWithWhereWithoutReservaInput, espacioUpdateWithoutReservaInput>, espacioUncheckedUpdateWithoutReservaInput>
  }

  export type huespedUpdateOneRequiredWithoutReservaNestedInput = {
    create?: XOR<huespedCreateWithoutReservaInput, huespedUncheckedCreateWithoutReservaInput>
    connectOrCreate?: huespedCreateOrConnectWithoutReservaInput
    upsert?: huespedUpsertWithoutReservaInput
    connect?: huespedWhereUniqueInput
    update?: XOR<XOR<huespedUpdateToOneWithWhereWithoutReservaInput, huespedUpdateWithoutReservaInput>, huespedUncheckedUpdateWithoutReservaInput>
  }

  export type cuenta_espacioUncheckedUpdateManyWithoutReservaNestedInput = {
    create?: XOR<cuenta_espacioCreateWithoutReservaInput, cuenta_espacioUncheckedCreateWithoutReservaInput> | cuenta_espacioCreateWithoutReservaInput[] | cuenta_espacioUncheckedCreateWithoutReservaInput[]
    connectOrCreate?: cuenta_espacioCreateOrConnectWithoutReservaInput | cuenta_espacioCreateOrConnectWithoutReservaInput[]
    upsert?: cuenta_espacioUpsertWithWhereUniqueWithoutReservaInput | cuenta_espacioUpsertWithWhereUniqueWithoutReservaInput[]
    createMany?: cuenta_espacioCreateManyReservaInputEnvelope
    set?: cuenta_espacioWhereUniqueInput | cuenta_espacioWhereUniqueInput[]
    disconnect?: cuenta_espacioWhereUniqueInput | cuenta_espacioWhereUniqueInput[]
    delete?: cuenta_espacioWhereUniqueInput | cuenta_espacioWhereUniqueInput[]
    connect?: cuenta_espacioWhereUniqueInput | cuenta_espacioWhereUniqueInput[]
    update?: cuenta_espacioUpdateWithWhereUniqueWithoutReservaInput | cuenta_espacioUpdateWithWhereUniqueWithoutReservaInput[]
    updateMany?: cuenta_espacioUpdateManyWithWhereWithoutReservaInput | cuenta_espacioUpdateManyWithWhereWithoutReservaInput[]
    deleteMany?: cuenta_espacioScalarWhereInput | cuenta_espacioScalarWhereInput[]
  }

  export type cuenta_personaUncheckedUpdateManyWithoutReservaNestedInput = {
    create?: XOR<cuenta_personaCreateWithoutReservaInput, cuenta_personaUncheckedCreateWithoutReservaInput> | cuenta_personaCreateWithoutReservaInput[] | cuenta_personaUncheckedCreateWithoutReservaInput[]
    connectOrCreate?: cuenta_personaCreateOrConnectWithoutReservaInput | cuenta_personaCreateOrConnectWithoutReservaInput[]
    upsert?: cuenta_personaUpsertWithWhereUniqueWithoutReservaInput | cuenta_personaUpsertWithWhereUniqueWithoutReservaInput[]
    createMany?: cuenta_personaCreateManyReservaInputEnvelope
    set?: cuenta_personaWhereUniqueInput | cuenta_personaWhereUniqueInput[]
    disconnect?: cuenta_personaWhereUniqueInput | cuenta_personaWhereUniqueInput[]
    delete?: cuenta_personaWhereUniqueInput | cuenta_personaWhereUniqueInput[]
    connect?: cuenta_personaWhereUniqueInput | cuenta_personaWhereUniqueInput[]
    update?: cuenta_personaUpdateWithWhereUniqueWithoutReservaInput | cuenta_personaUpdateWithWhereUniqueWithoutReservaInput[]
    updateMany?: cuenta_personaUpdateManyWithWhereWithoutReservaInput | cuenta_personaUpdateManyWithWhereWithoutReservaInput[]
    deleteMany?: cuenta_personaScalarWhereInput | cuenta_personaScalarWhereInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type producto_inventarioCreateNestedManyWithoutProveedorInput = {
    create?: XOR<producto_inventarioCreateWithoutProveedorInput, producto_inventarioUncheckedCreateWithoutProveedorInput> | producto_inventarioCreateWithoutProveedorInput[] | producto_inventarioUncheckedCreateWithoutProveedorInput[]
    connectOrCreate?: producto_inventarioCreateOrConnectWithoutProveedorInput | producto_inventarioCreateOrConnectWithoutProveedorInput[]
    createMany?: producto_inventarioCreateManyProveedorInputEnvelope
    connect?: producto_inventarioWhereUniqueInput | producto_inventarioWhereUniqueInput[]
  }

  export type producto_inventarioUncheckedCreateNestedManyWithoutProveedorInput = {
    create?: XOR<producto_inventarioCreateWithoutProveedorInput, producto_inventarioUncheckedCreateWithoutProveedorInput> | producto_inventarioCreateWithoutProveedorInput[] | producto_inventarioUncheckedCreateWithoutProveedorInput[]
    connectOrCreate?: producto_inventarioCreateOrConnectWithoutProveedorInput | producto_inventarioCreateOrConnectWithoutProveedorInput[]
    createMany?: producto_inventarioCreateManyProveedorInputEnvelope
    connect?: producto_inventarioWhereUniqueInput | producto_inventarioWhereUniqueInput[]
  }

  export type producto_inventarioUpdateManyWithoutProveedorNestedInput = {
    create?: XOR<producto_inventarioCreateWithoutProveedorInput, producto_inventarioUncheckedCreateWithoutProveedorInput> | producto_inventarioCreateWithoutProveedorInput[] | producto_inventarioUncheckedCreateWithoutProveedorInput[]
    connectOrCreate?: producto_inventarioCreateOrConnectWithoutProveedorInput | producto_inventarioCreateOrConnectWithoutProveedorInput[]
    upsert?: producto_inventarioUpsertWithWhereUniqueWithoutProveedorInput | producto_inventarioUpsertWithWhereUniqueWithoutProveedorInput[]
    createMany?: producto_inventarioCreateManyProveedorInputEnvelope
    set?: producto_inventarioWhereUniqueInput | producto_inventarioWhereUniqueInput[]
    disconnect?: producto_inventarioWhereUniqueInput | producto_inventarioWhereUniqueInput[]
    delete?: producto_inventarioWhereUniqueInput | producto_inventarioWhereUniqueInput[]
    connect?: producto_inventarioWhereUniqueInput | producto_inventarioWhereUniqueInput[]
    update?: producto_inventarioUpdateWithWhereUniqueWithoutProveedorInput | producto_inventarioUpdateWithWhereUniqueWithoutProveedorInput[]
    updateMany?: producto_inventarioUpdateManyWithWhereWithoutProveedorInput | producto_inventarioUpdateManyWithWhereWithoutProveedorInput[]
    deleteMany?: producto_inventarioScalarWhereInput | producto_inventarioScalarWhereInput[]
  }

  export type producto_inventarioUncheckedUpdateManyWithoutProveedorNestedInput = {
    create?: XOR<producto_inventarioCreateWithoutProveedorInput, producto_inventarioUncheckedCreateWithoutProveedorInput> | producto_inventarioCreateWithoutProveedorInput[] | producto_inventarioUncheckedCreateWithoutProveedorInput[]
    connectOrCreate?: producto_inventarioCreateOrConnectWithoutProveedorInput | producto_inventarioCreateOrConnectWithoutProveedorInput[]
    upsert?: producto_inventarioUpsertWithWhereUniqueWithoutProveedorInput | producto_inventarioUpsertWithWhereUniqueWithoutProveedorInput[]
    createMany?: producto_inventarioCreateManyProveedorInputEnvelope
    set?: producto_inventarioWhereUniqueInput | producto_inventarioWhereUniqueInput[]
    disconnect?: producto_inventarioWhereUniqueInput | producto_inventarioWhereUniqueInput[]
    delete?: producto_inventarioWhereUniqueInput | producto_inventarioWhereUniqueInput[]
    connect?: producto_inventarioWhereUniqueInput | producto_inventarioWhereUniqueInput[]
    update?: producto_inventarioUpdateWithWhereUniqueWithoutProveedorInput | producto_inventarioUpdateWithWhereUniqueWithoutProveedorInput[]
    updateMany?: producto_inventarioUpdateManyWithWhereWithoutProveedorInput | producto_inventarioUpdateManyWithWhereWithoutProveedorInput[]
    deleteMany?: producto_inventarioScalarWhereInput | producto_inventarioScalarWhereInput[]
  }

  export type proveedorCreateNestedOneWithoutProductosInput = {
    create?: XOR<proveedorCreateWithoutProductosInput, proveedorUncheckedCreateWithoutProductosInput>
    connectOrCreate?: proveedorCreateOrConnectWithoutProductosInput
    connect?: proveedorWhereUniqueInput
  }

  export type movimiento_inventarioCreateNestedManyWithoutProductoInput = {
    create?: XOR<movimiento_inventarioCreateWithoutProductoInput, movimiento_inventarioUncheckedCreateWithoutProductoInput> | movimiento_inventarioCreateWithoutProductoInput[] | movimiento_inventarioUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: movimiento_inventarioCreateOrConnectWithoutProductoInput | movimiento_inventarioCreateOrConnectWithoutProductoInput[]
    createMany?: movimiento_inventarioCreateManyProductoInputEnvelope
    connect?: movimiento_inventarioWhereUniqueInput | movimiento_inventarioWhereUniqueInput[]
  }

  export type movimiento_inventarioUncheckedCreateNestedManyWithoutProductoInput = {
    create?: XOR<movimiento_inventarioCreateWithoutProductoInput, movimiento_inventarioUncheckedCreateWithoutProductoInput> | movimiento_inventarioCreateWithoutProductoInput[] | movimiento_inventarioUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: movimiento_inventarioCreateOrConnectWithoutProductoInput | movimiento_inventarioCreateOrConnectWithoutProductoInput[]
    createMany?: movimiento_inventarioCreateManyProductoInputEnvelope
    connect?: movimiento_inventarioWhereUniqueInput | movimiento_inventarioWhereUniqueInput[]
  }

  export type proveedorUpdateOneWithoutProductosNestedInput = {
    create?: XOR<proveedorCreateWithoutProductosInput, proveedorUncheckedCreateWithoutProductosInput>
    connectOrCreate?: proveedorCreateOrConnectWithoutProductosInput
    upsert?: proveedorUpsertWithoutProductosInput
    disconnect?: proveedorWhereInput | boolean
    delete?: proveedorWhereInput | boolean
    connect?: proveedorWhereUniqueInput
    update?: XOR<XOR<proveedorUpdateToOneWithWhereWithoutProductosInput, proveedorUpdateWithoutProductosInput>, proveedorUncheckedUpdateWithoutProductosInput>
  }

  export type movimiento_inventarioUpdateManyWithoutProductoNestedInput = {
    create?: XOR<movimiento_inventarioCreateWithoutProductoInput, movimiento_inventarioUncheckedCreateWithoutProductoInput> | movimiento_inventarioCreateWithoutProductoInput[] | movimiento_inventarioUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: movimiento_inventarioCreateOrConnectWithoutProductoInput | movimiento_inventarioCreateOrConnectWithoutProductoInput[]
    upsert?: movimiento_inventarioUpsertWithWhereUniqueWithoutProductoInput | movimiento_inventarioUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: movimiento_inventarioCreateManyProductoInputEnvelope
    set?: movimiento_inventarioWhereUniqueInput | movimiento_inventarioWhereUniqueInput[]
    disconnect?: movimiento_inventarioWhereUniqueInput | movimiento_inventarioWhereUniqueInput[]
    delete?: movimiento_inventarioWhereUniqueInput | movimiento_inventarioWhereUniqueInput[]
    connect?: movimiento_inventarioWhereUniqueInput | movimiento_inventarioWhereUniqueInput[]
    update?: movimiento_inventarioUpdateWithWhereUniqueWithoutProductoInput | movimiento_inventarioUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: movimiento_inventarioUpdateManyWithWhereWithoutProductoInput | movimiento_inventarioUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: movimiento_inventarioScalarWhereInput | movimiento_inventarioScalarWhereInput[]
  }

  export type movimiento_inventarioUncheckedUpdateManyWithoutProductoNestedInput = {
    create?: XOR<movimiento_inventarioCreateWithoutProductoInput, movimiento_inventarioUncheckedCreateWithoutProductoInput> | movimiento_inventarioCreateWithoutProductoInput[] | movimiento_inventarioUncheckedCreateWithoutProductoInput[]
    connectOrCreate?: movimiento_inventarioCreateOrConnectWithoutProductoInput | movimiento_inventarioCreateOrConnectWithoutProductoInput[]
    upsert?: movimiento_inventarioUpsertWithWhereUniqueWithoutProductoInput | movimiento_inventarioUpsertWithWhereUniqueWithoutProductoInput[]
    createMany?: movimiento_inventarioCreateManyProductoInputEnvelope
    set?: movimiento_inventarioWhereUniqueInput | movimiento_inventarioWhereUniqueInput[]
    disconnect?: movimiento_inventarioWhereUniqueInput | movimiento_inventarioWhereUniqueInput[]
    delete?: movimiento_inventarioWhereUniqueInput | movimiento_inventarioWhereUniqueInput[]
    connect?: movimiento_inventarioWhereUniqueInput | movimiento_inventarioWhereUniqueInput[]
    update?: movimiento_inventarioUpdateWithWhereUniqueWithoutProductoInput | movimiento_inventarioUpdateWithWhereUniqueWithoutProductoInput[]
    updateMany?: movimiento_inventarioUpdateManyWithWhereWithoutProductoInput | movimiento_inventarioUpdateManyWithWhereWithoutProductoInput[]
    deleteMany?: movimiento_inventarioScalarWhereInput | movimiento_inventarioScalarWhereInput[]
  }

  export type producto_inventarioCreateNestedOneWithoutMovimientosInput = {
    create?: XOR<producto_inventarioCreateWithoutMovimientosInput, producto_inventarioUncheckedCreateWithoutMovimientosInput>
    connectOrCreate?: producto_inventarioCreateOrConnectWithoutMovimientosInput
    connect?: producto_inventarioWhereUniqueInput
  }

  export type producto_inventarioUpdateOneRequiredWithoutMovimientosNestedInput = {
    create?: XOR<producto_inventarioCreateWithoutMovimientosInput, producto_inventarioUncheckedCreateWithoutMovimientosInput>
    connectOrCreate?: producto_inventarioCreateOrConnectWithoutMovimientosInput
    upsert?: producto_inventarioUpsertWithoutMovimientosInput
    connect?: producto_inventarioWhereUniqueInput
    update?: XOR<XOR<producto_inventarioUpdateToOneWithWhereWithoutMovimientosInput, producto_inventarioUpdateWithoutMovimientosInput>, producto_inventarioUncheckedUpdateWithoutMovimientosInput>
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

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
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

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type reservaCreateWithoutCuenta_espacioInput = {
    tipo_reserva?: string
    dni_tipo?: string | null
    check_in?: Date | string | null
    check_out?: Date | string | null
    cantidad_adultos?: number | null
    cantidad_ninos?: number | null
    fecha_evento?: Date | string | null
    hora_inicio?: Date | string | null
    hora_fin?: Date | string | null
    estado_reserva?: string
    monto_total?: Decimal | DecimalJsLike | number | string | null
    estado_pago?: string | null
    metodo_pago?: string | null
    monto_pagado?: Decimal | DecimalJsLike | number | string | null
    anotaciones?: string | null
    firma?: string | null
    fecha_creacion?: Date | string | null
    cuenta_persona?: cuenta_personaCreateNestedManyWithoutReservaInput
    espacio: espacioCreateNestedOneWithoutReservaInput
    huesped: huespedCreateNestedOneWithoutReservaInput
  }

  export type reservaUncheckedCreateWithoutCuenta_espacioInput = {
    id_reserva?: number
    id_huesped: number
    id_espacio: number
    tipo_reserva?: string
    dni_tipo?: string | null
    check_in?: Date | string | null
    check_out?: Date | string | null
    cantidad_adultos?: number | null
    cantidad_ninos?: number | null
    fecha_evento?: Date | string | null
    hora_inicio?: Date | string | null
    hora_fin?: Date | string | null
    estado_reserva?: string
    monto_total?: Decimal | DecimalJsLike | number | string | null
    estado_pago?: string | null
    metodo_pago?: string | null
    monto_pagado?: Decimal | DecimalJsLike | number | string | null
    anotaciones?: string | null
    firma?: string | null
    fecha_creacion?: Date | string | null
    cuenta_persona?: cuenta_personaUncheckedCreateNestedManyWithoutReservaInput
  }

  export type reservaCreateOrConnectWithoutCuenta_espacioInput = {
    where: reservaWhereUniqueInput
    create: XOR<reservaCreateWithoutCuenta_espacioInput, reservaUncheckedCreateWithoutCuenta_espacioInput>
  }

  export type reservaUpsertWithoutCuenta_espacioInput = {
    update: XOR<reservaUpdateWithoutCuenta_espacioInput, reservaUncheckedUpdateWithoutCuenta_espacioInput>
    create: XOR<reservaCreateWithoutCuenta_espacioInput, reservaUncheckedCreateWithoutCuenta_espacioInput>
    where?: reservaWhereInput
  }

  export type reservaUpdateToOneWithWhereWithoutCuenta_espacioInput = {
    where?: reservaWhereInput
    data: XOR<reservaUpdateWithoutCuenta_espacioInput, reservaUncheckedUpdateWithoutCuenta_espacioInput>
  }

  export type reservaUpdateWithoutCuenta_espacioInput = {
    tipo_reserva?: StringFieldUpdateOperationsInput | string
    dni_tipo?: NullableStringFieldUpdateOperationsInput | string | null
    check_in?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    check_out?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cantidad_adultos?: NullableIntFieldUpdateOperationsInput | number | null
    cantidad_ninos?: NullableIntFieldUpdateOperationsInput | number | null
    fecha_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_inicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_fin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado_reserva?: StringFieldUpdateOperationsInput | string
    monto_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado_pago?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    monto_pagado?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    anotaciones?: NullableStringFieldUpdateOperationsInput | string | null
    firma?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_creacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cuenta_persona?: cuenta_personaUpdateManyWithoutReservaNestedInput
    espacio?: espacioUpdateOneRequiredWithoutReservaNestedInput
    huesped?: huespedUpdateOneRequiredWithoutReservaNestedInput
  }

  export type reservaUncheckedUpdateWithoutCuenta_espacioInput = {
    id_reserva?: IntFieldUpdateOperationsInput | number
    id_huesped?: IntFieldUpdateOperationsInput | number
    id_espacio?: IntFieldUpdateOperationsInput | number
    tipo_reserva?: StringFieldUpdateOperationsInput | string
    dni_tipo?: NullableStringFieldUpdateOperationsInput | string | null
    check_in?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    check_out?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cantidad_adultos?: NullableIntFieldUpdateOperationsInput | number | null
    cantidad_ninos?: NullableIntFieldUpdateOperationsInput | number | null
    fecha_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_inicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_fin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado_reserva?: StringFieldUpdateOperationsInput | string
    monto_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado_pago?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    monto_pagado?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    anotaciones?: NullableStringFieldUpdateOperationsInput | string | null
    firma?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_creacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cuenta_persona?: cuenta_personaUncheckedUpdateManyWithoutReservaNestedInput
  }

  export type huespedCreateWithoutCuenta_personaInput = {
    nombre_completo: string
    telefono?: string | null
    documento?: string | null
    tipo_documento?: string | null
    procedencia?: string | null
    firma?: string | null
    fecha_creacion?: Date | string | null
    reserva?: reservaCreateNestedManyWithoutHuespedInput
  }

  export type huespedUncheckedCreateWithoutCuenta_personaInput = {
    id_huesped?: number
    nombre_completo: string
    telefono?: string | null
    documento?: string | null
    tipo_documento?: string | null
    procedencia?: string | null
    firma?: string | null
    fecha_creacion?: Date | string | null
    reserva?: reservaUncheckedCreateNestedManyWithoutHuespedInput
  }

  export type huespedCreateOrConnectWithoutCuenta_personaInput = {
    where: huespedWhereUniqueInput
    create: XOR<huespedCreateWithoutCuenta_personaInput, huespedUncheckedCreateWithoutCuenta_personaInput>
  }

  export type reservaCreateWithoutCuenta_personaInput = {
    tipo_reserva?: string
    dni_tipo?: string | null
    check_in?: Date | string | null
    check_out?: Date | string | null
    cantidad_adultos?: number | null
    cantidad_ninos?: number | null
    fecha_evento?: Date | string | null
    hora_inicio?: Date | string | null
    hora_fin?: Date | string | null
    estado_reserva?: string
    monto_total?: Decimal | DecimalJsLike | number | string | null
    estado_pago?: string | null
    metodo_pago?: string | null
    monto_pagado?: Decimal | DecimalJsLike | number | string | null
    anotaciones?: string | null
    firma?: string | null
    fecha_creacion?: Date | string | null
    cuenta_espacio?: cuenta_espacioCreateNestedManyWithoutReservaInput
    espacio: espacioCreateNestedOneWithoutReservaInput
    huesped: huespedCreateNestedOneWithoutReservaInput
  }

  export type reservaUncheckedCreateWithoutCuenta_personaInput = {
    id_reserva?: number
    id_huesped: number
    id_espacio: number
    tipo_reserva?: string
    dni_tipo?: string | null
    check_in?: Date | string | null
    check_out?: Date | string | null
    cantidad_adultos?: number | null
    cantidad_ninos?: number | null
    fecha_evento?: Date | string | null
    hora_inicio?: Date | string | null
    hora_fin?: Date | string | null
    estado_reserva?: string
    monto_total?: Decimal | DecimalJsLike | number | string | null
    estado_pago?: string | null
    metodo_pago?: string | null
    monto_pagado?: Decimal | DecimalJsLike | number | string | null
    anotaciones?: string | null
    firma?: string | null
    fecha_creacion?: Date | string | null
    cuenta_espacio?: cuenta_espacioUncheckedCreateNestedManyWithoutReservaInput
  }

  export type reservaCreateOrConnectWithoutCuenta_personaInput = {
    where: reservaWhereUniqueInput
    create: XOR<reservaCreateWithoutCuenta_personaInput, reservaUncheckedCreateWithoutCuenta_personaInput>
  }

  export type huespedUpsertWithoutCuenta_personaInput = {
    update: XOR<huespedUpdateWithoutCuenta_personaInput, huespedUncheckedUpdateWithoutCuenta_personaInput>
    create: XOR<huespedCreateWithoutCuenta_personaInput, huespedUncheckedCreateWithoutCuenta_personaInput>
    where?: huespedWhereInput
  }

  export type huespedUpdateToOneWithWhereWithoutCuenta_personaInput = {
    where?: huespedWhereInput
    data: XOR<huespedUpdateWithoutCuenta_personaInput, huespedUncheckedUpdateWithoutCuenta_personaInput>
  }

  export type huespedUpdateWithoutCuenta_personaInput = {
    nombre_completo?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    documento?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_documento?: NullableStringFieldUpdateOperationsInput | string | null
    procedencia?: NullableStringFieldUpdateOperationsInput | string | null
    firma?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_creacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reserva?: reservaUpdateManyWithoutHuespedNestedInput
  }

  export type huespedUncheckedUpdateWithoutCuenta_personaInput = {
    id_huesped?: IntFieldUpdateOperationsInput | number
    nombre_completo?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    documento?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_documento?: NullableStringFieldUpdateOperationsInput | string | null
    procedencia?: NullableStringFieldUpdateOperationsInput | string | null
    firma?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_creacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reserva?: reservaUncheckedUpdateManyWithoutHuespedNestedInput
  }

  export type reservaUpsertWithoutCuenta_personaInput = {
    update: XOR<reservaUpdateWithoutCuenta_personaInput, reservaUncheckedUpdateWithoutCuenta_personaInput>
    create: XOR<reservaCreateWithoutCuenta_personaInput, reservaUncheckedCreateWithoutCuenta_personaInput>
    where?: reservaWhereInput
  }

  export type reservaUpdateToOneWithWhereWithoutCuenta_personaInput = {
    where?: reservaWhereInput
    data: XOR<reservaUpdateWithoutCuenta_personaInput, reservaUncheckedUpdateWithoutCuenta_personaInput>
  }

  export type reservaUpdateWithoutCuenta_personaInput = {
    tipo_reserva?: StringFieldUpdateOperationsInput | string
    dni_tipo?: NullableStringFieldUpdateOperationsInput | string | null
    check_in?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    check_out?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cantidad_adultos?: NullableIntFieldUpdateOperationsInput | number | null
    cantidad_ninos?: NullableIntFieldUpdateOperationsInput | number | null
    fecha_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_inicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_fin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado_reserva?: StringFieldUpdateOperationsInput | string
    monto_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado_pago?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    monto_pagado?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    anotaciones?: NullableStringFieldUpdateOperationsInput | string | null
    firma?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_creacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cuenta_espacio?: cuenta_espacioUpdateManyWithoutReservaNestedInput
    espacio?: espacioUpdateOneRequiredWithoutReservaNestedInput
    huesped?: huespedUpdateOneRequiredWithoutReservaNestedInput
  }

  export type reservaUncheckedUpdateWithoutCuenta_personaInput = {
    id_reserva?: IntFieldUpdateOperationsInput | number
    id_huesped?: IntFieldUpdateOperationsInput | number
    id_espacio?: IntFieldUpdateOperationsInput | number
    tipo_reserva?: StringFieldUpdateOperationsInput | string
    dni_tipo?: NullableStringFieldUpdateOperationsInput | string | null
    check_in?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    check_out?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cantidad_adultos?: NullableIntFieldUpdateOperationsInput | number | null
    cantidad_ninos?: NullableIntFieldUpdateOperationsInput | number | null
    fecha_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_inicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_fin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado_reserva?: StringFieldUpdateOperationsInput | string
    monto_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado_pago?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    monto_pagado?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    anotaciones?: NullableStringFieldUpdateOperationsInput | string | null
    firma?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_creacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cuenta_espacio?: cuenta_espacioUncheckedUpdateManyWithoutReservaNestedInput
  }

  export type inventario_minibarCreateWithoutEspacioInput = {
    nombre_producto: string
    cantidad?: number
    precio_unitario: Decimal | DecimalJsLike | number | string
    fecha_vencimiento?: Date | string | null
    fecha_actualizacion?: Date | string | null
  }

  export type inventario_minibarUncheckedCreateWithoutEspacioInput = {
    id_inventario?: number
    nombre_producto: string
    cantidad?: number
    precio_unitario: Decimal | DecimalJsLike | number | string
    fecha_vencimiento?: Date | string | null
    fecha_actualizacion?: Date | string | null
  }

  export type inventario_minibarCreateOrConnectWithoutEspacioInput = {
    where: inventario_minibarWhereUniqueInput
    create: XOR<inventario_minibarCreateWithoutEspacioInput, inventario_minibarUncheckedCreateWithoutEspacioInput>
  }

  export type inventario_minibarCreateManyEspacioInputEnvelope = {
    data: inventario_minibarCreateManyEspacioInput | inventario_minibarCreateManyEspacioInput[]
    skipDuplicates?: boolean
  }

  export type reservaCreateWithoutEspacioInput = {
    tipo_reserva?: string
    dni_tipo?: string | null
    check_in?: Date | string | null
    check_out?: Date | string | null
    cantidad_adultos?: number | null
    cantidad_ninos?: number | null
    fecha_evento?: Date | string | null
    hora_inicio?: Date | string | null
    hora_fin?: Date | string | null
    estado_reserva?: string
    monto_total?: Decimal | DecimalJsLike | number | string | null
    estado_pago?: string | null
    metodo_pago?: string | null
    monto_pagado?: Decimal | DecimalJsLike | number | string | null
    anotaciones?: string | null
    firma?: string | null
    fecha_creacion?: Date | string | null
    cuenta_espacio?: cuenta_espacioCreateNestedManyWithoutReservaInput
    cuenta_persona?: cuenta_personaCreateNestedManyWithoutReservaInput
    huesped: huespedCreateNestedOneWithoutReservaInput
  }

  export type reservaUncheckedCreateWithoutEspacioInput = {
    id_reserva?: number
    id_huesped: number
    tipo_reserva?: string
    dni_tipo?: string | null
    check_in?: Date | string | null
    check_out?: Date | string | null
    cantidad_adultos?: number | null
    cantidad_ninos?: number | null
    fecha_evento?: Date | string | null
    hora_inicio?: Date | string | null
    hora_fin?: Date | string | null
    estado_reserva?: string
    monto_total?: Decimal | DecimalJsLike | number | string | null
    estado_pago?: string | null
    metodo_pago?: string | null
    monto_pagado?: Decimal | DecimalJsLike | number | string | null
    anotaciones?: string | null
    firma?: string | null
    fecha_creacion?: Date | string | null
    cuenta_espacio?: cuenta_espacioUncheckedCreateNestedManyWithoutReservaInput
    cuenta_persona?: cuenta_personaUncheckedCreateNestedManyWithoutReservaInput
  }

  export type reservaCreateOrConnectWithoutEspacioInput = {
    where: reservaWhereUniqueInput
    create: XOR<reservaCreateWithoutEspacioInput, reservaUncheckedCreateWithoutEspacioInput>
  }

  export type reservaCreateManyEspacioInputEnvelope = {
    data: reservaCreateManyEspacioInput | reservaCreateManyEspacioInput[]
    skipDuplicates?: boolean
  }

  export type inventario_minibarUpsertWithWhereUniqueWithoutEspacioInput = {
    where: inventario_minibarWhereUniqueInput
    update: XOR<inventario_minibarUpdateWithoutEspacioInput, inventario_minibarUncheckedUpdateWithoutEspacioInput>
    create: XOR<inventario_minibarCreateWithoutEspacioInput, inventario_minibarUncheckedCreateWithoutEspacioInput>
  }

  export type inventario_minibarUpdateWithWhereUniqueWithoutEspacioInput = {
    where: inventario_minibarWhereUniqueInput
    data: XOR<inventario_minibarUpdateWithoutEspacioInput, inventario_minibarUncheckedUpdateWithoutEspacioInput>
  }

  export type inventario_minibarUpdateManyWithWhereWithoutEspacioInput = {
    where: inventario_minibarScalarWhereInput
    data: XOR<inventario_minibarUpdateManyMutationInput, inventario_minibarUncheckedUpdateManyWithoutEspacioInput>
  }

  export type inventario_minibarScalarWhereInput = {
    AND?: inventario_minibarScalarWhereInput | inventario_minibarScalarWhereInput[]
    OR?: inventario_minibarScalarWhereInput[]
    NOT?: inventario_minibarScalarWhereInput | inventario_minibarScalarWhereInput[]
    id_inventario?: IntFilter<"inventario_minibar"> | number
    id_espacio?: IntFilter<"inventario_minibar"> | number
    nombre_producto?: StringFilter<"inventario_minibar"> | string
    cantidad?: IntFilter<"inventario_minibar"> | number
    precio_unitario?: DecimalFilter<"inventario_minibar"> | Decimal | DecimalJsLike | number | string
    fecha_vencimiento?: DateTimeNullableFilter<"inventario_minibar"> | Date | string | null
    fecha_actualizacion?: DateTimeNullableFilter<"inventario_minibar"> | Date | string | null
  }

  export type reservaUpsertWithWhereUniqueWithoutEspacioInput = {
    where: reservaWhereUniqueInput
    update: XOR<reservaUpdateWithoutEspacioInput, reservaUncheckedUpdateWithoutEspacioInput>
    create: XOR<reservaCreateWithoutEspacioInput, reservaUncheckedCreateWithoutEspacioInput>
  }

  export type reservaUpdateWithWhereUniqueWithoutEspacioInput = {
    where: reservaWhereUniqueInput
    data: XOR<reservaUpdateWithoutEspacioInput, reservaUncheckedUpdateWithoutEspacioInput>
  }

  export type reservaUpdateManyWithWhereWithoutEspacioInput = {
    where: reservaScalarWhereInput
    data: XOR<reservaUpdateManyMutationInput, reservaUncheckedUpdateManyWithoutEspacioInput>
  }

  export type reservaScalarWhereInput = {
    AND?: reservaScalarWhereInput | reservaScalarWhereInput[]
    OR?: reservaScalarWhereInput[]
    NOT?: reservaScalarWhereInput | reservaScalarWhereInput[]
    id_reserva?: IntFilter<"reserva"> | number
    id_huesped?: IntFilter<"reserva"> | number
    id_espacio?: IntFilter<"reserva"> | number
    tipo_reserva?: StringFilter<"reserva"> | string
    dni_tipo?: StringNullableFilter<"reserva"> | string | null
    check_in?: DateTimeNullableFilter<"reserva"> | Date | string | null
    check_out?: DateTimeNullableFilter<"reserva"> | Date | string | null
    cantidad_adultos?: IntNullableFilter<"reserva"> | number | null
    cantidad_ninos?: IntNullableFilter<"reserva"> | number | null
    fecha_evento?: DateTimeNullableFilter<"reserva"> | Date | string | null
    hora_inicio?: DateTimeNullableFilter<"reserva"> | Date | string | null
    hora_fin?: DateTimeNullableFilter<"reserva"> | Date | string | null
    estado_reserva?: StringFilter<"reserva"> | string
    monto_total?: DecimalNullableFilter<"reserva"> | Decimal | DecimalJsLike | number | string | null
    estado_pago?: StringNullableFilter<"reserva"> | string | null
    metodo_pago?: StringNullableFilter<"reserva"> | string | null
    monto_pagado?: DecimalNullableFilter<"reserva"> | Decimal | DecimalJsLike | number | string | null
    anotaciones?: StringNullableFilter<"reserva"> | string | null
    firma?: StringNullableFilter<"reserva"> | string | null
    fecha_creacion?: DateTimeNullableFilter<"reserva"> | Date | string | null
  }

  export type cuenta_personaCreateWithoutHuespedInput = {
    nombre_persona: string
    fecha?: Date | string
    descripcion: string
    cantidad?: number
    valor_unitario: Decimal | DecimalJsLike | number | string
    valor_total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    metodo_pago?: string | null
    fecha_registro?: Date | string | null
    reserva?: reservaCreateNestedOneWithoutCuenta_personaInput
  }

  export type cuenta_personaUncheckedCreateWithoutHuespedInput = {
    id_item_persona?: number
    nombre_persona: string
    id_reserva?: number | null
    fecha?: Date | string
    descripcion: string
    cantidad?: number
    valor_unitario: Decimal | DecimalJsLike | number | string
    valor_total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    metodo_pago?: string | null
    fecha_registro?: Date | string | null
  }

  export type cuenta_personaCreateOrConnectWithoutHuespedInput = {
    where: cuenta_personaWhereUniqueInput
    create: XOR<cuenta_personaCreateWithoutHuespedInput, cuenta_personaUncheckedCreateWithoutHuespedInput>
  }

  export type cuenta_personaCreateManyHuespedInputEnvelope = {
    data: cuenta_personaCreateManyHuespedInput | cuenta_personaCreateManyHuespedInput[]
    skipDuplicates?: boolean
  }

  export type reservaCreateWithoutHuespedInput = {
    tipo_reserva?: string
    dni_tipo?: string | null
    check_in?: Date | string | null
    check_out?: Date | string | null
    cantidad_adultos?: number | null
    cantidad_ninos?: number | null
    fecha_evento?: Date | string | null
    hora_inicio?: Date | string | null
    hora_fin?: Date | string | null
    estado_reserva?: string
    monto_total?: Decimal | DecimalJsLike | number | string | null
    estado_pago?: string | null
    metodo_pago?: string | null
    monto_pagado?: Decimal | DecimalJsLike | number | string | null
    anotaciones?: string | null
    firma?: string | null
    fecha_creacion?: Date | string | null
    cuenta_espacio?: cuenta_espacioCreateNestedManyWithoutReservaInput
    cuenta_persona?: cuenta_personaCreateNestedManyWithoutReservaInput
    espacio: espacioCreateNestedOneWithoutReservaInput
  }

  export type reservaUncheckedCreateWithoutHuespedInput = {
    id_reserva?: number
    id_espacio: number
    tipo_reserva?: string
    dni_tipo?: string | null
    check_in?: Date | string | null
    check_out?: Date | string | null
    cantidad_adultos?: number | null
    cantidad_ninos?: number | null
    fecha_evento?: Date | string | null
    hora_inicio?: Date | string | null
    hora_fin?: Date | string | null
    estado_reserva?: string
    monto_total?: Decimal | DecimalJsLike | number | string | null
    estado_pago?: string | null
    metodo_pago?: string | null
    monto_pagado?: Decimal | DecimalJsLike | number | string | null
    anotaciones?: string | null
    firma?: string | null
    fecha_creacion?: Date | string | null
    cuenta_espacio?: cuenta_espacioUncheckedCreateNestedManyWithoutReservaInput
    cuenta_persona?: cuenta_personaUncheckedCreateNestedManyWithoutReservaInput
  }

  export type reservaCreateOrConnectWithoutHuespedInput = {
    where: reservaWhereUniqueInput
    create: XOR<reservaCreateWithoutHuespedInput, reservaUncheckedCreateWithoutHuespedInput>
  }

  export type reservaCreateManyHuespedInputEnvelope = {
    data: reservaCreateManyHuespedInput | reservaCreateManyHuespedInput[]
    skipDuplicates?: boolean
  }

  export type cuenta_personaUpsertWithWhereUniqueWithoutHuespedInput = {
    where: cuenta_personaWhereUniqueInput
    update: XOR<cuenta_personaUpdateWithoutHuespedInput, cuenta_personaUncheckedUpdateWithoutHuespedInput>
    create: XOR<cuenta_personaCreateWithoutHuespedInput, cuenta_personaUncheckedCreateWithoutHuespedInput>
  }

  export type cuenta_personaUpdateWithWhereUniqueWithoutHuespedInput = {
    where: cuenta_personaWhereUniqueInput
    data: XOR<cuenta_personaUpdateWithoutHuespedInput, cuenta_personaUncheckedUpdateWithoutHuespedInput>
  }

  export type cuenta_personaUpdateManyWithWhereWithoutHuespedInput = {
    where: cuenta_personaScalarWhereInput
    data: XOR<cuenta_personaUpdateManyMutationInput, cuenta_personaUncheckedUpdateManyWithoutHuespedInput>
  }

  export type cuenta_personaScalarWhereInput = {
    AND?: cuenta_personaScalarWhereInput | cuenta_personaScalarWhereInput[]
    OR?: cuenta_personaScalarWhereInput[]
    NOT?: cuenta_personaScalarWhereInput | cuenta_personaScalarWhereInput[]
    id_item_persona?: IntFilter<"cuenta_persona"> | number
    id_huesped?: IntNullableFilter<"cuenta_persona"> | number | null
    nombre_persona?: StringFilter<"cuenta_persona"> | string
    id_reserva?: IntNullableFilter<"cuenta_persona"> | number | null
    fecha?: DateTimeFilter<"cuenta_persona"> | Date | string
    descripcion?: StringFilter<"cuenta_persona"> | string
    cantidad?: IntFilter<"cuenta_persona"> | number
    valor_unitario?: DecimalFilter<"cuenta_persona"> | Decimal | DecimalJsLike | number | string
    valor_total?: DecimalNullableFilter<"cuenta_persona"> | Decimal | DecimalJsLike | number | string | null
    estado?: StringNullableFilter<"cuenta_persona"> | string | null
    metodo_pago?: StringNullableFilter<"cuenta_persona"> | string | null
    fecha_registro?: DateTimeNullableFilter<"cuenta_persona"> | Date | string | null
  }

  export type reservaUpsertWithWhereUniqueWithoutHuespedInput = {
    where: reservaWhereUniqueInput
    update: XOR<reservaUpdateWithoutHuespedInput, reservaUncheckedUpdateWithoutHuespedInput>
    create: XOR<reservaCreateWithoutHuespedInput, reservaUncheckedCreateWithoutHuespedInput>
  }

  export type reservaUpdateWithWhereUniqueWithoutHuespedInput = {
    where: reservaWhereUniqueInput
    data: XOR<reservaUpdateWithoutHuespedInput, reservaUncheckedUpdateWithoutHuespedInput>
  }

  export type reservaUpdateManyWithWhereWithoutHuespedInput = {
    where: reservaScalarWhereInput
    data: XOR<reservaUpdateManyMutationInput, reservaUncheckedUpdateManyWithoutHuespedInput>
  }

  export type espacioCreateWithoutInventario_minibarInput = {
    numero: string
    tipo_espacio: string
    tipo_habitacion?: string | null
    capacidad_personas?: number | null
    precio_persona_1?: Decimal | DecimalJsLike | number | string | null
    precio_persona_2?: Decimal | DecimalJsLike | number | string | null
    precio_adicional?: Decimal | DecimalJsLike | number | string | null
    estado_limpieza?: string | null
    activo?: boolean | null
    tiene_minibar?: boolean | null
    reserva?: reservaCreateNestedManyWithoutEspacioInput
  }

  export type espacioUncheckedCreateWithoutInventario_minibarInput = {
    id_espacio?: number
    numero: string
    tipo_espacio: string
    tipo_habitacion?: string | null
    capacidad_personas?: number | null
    precio_persona_1?: Decimal | DecimalJsLike | number | string | null
    precio_persona_2?: Decimal | DecimalJsLike | number | string | null
    precio_adicional?: Decimal | DecimalJsLike | number | string | null
    estado_limpieza?: string | null
    activo?: boolean | null
    tiene_minibar?: boolean | null
    reserva?: reservaUncheckedCreateNestedManyWithoutEspacioInput
  }

  export type espacioCreateOrConnectWithoutInventario_minibarInput = {
    where: espacioWhereUniqueInput
    create: XOR<espacioCreateWithoutInventario_minibarInput, espacioUncheckedCreateWithoutInventario_minibarInput>
  }

  export type espacioUpsertWithoutInventario_minibarInput = {
    update: XOR<espacioUpdateWithoutInventario_minibarInput, espacioUncheckedUpdateWithoutInventario_minibarInput>
    create: XOR<espacioCreateWithoutInventario_minibarInput, espacioUncheckedCreateWithoutInventario_minibarInput>
    where?: espacioWhereInput
  }

  export type espacioUpdateToOneWithWhereWithoutInventario_minibarInput = {
    where?: espacioWhereInput
    data: XOR<espacioUpdateWithoutInventario_minibarInput, espacioUncheckedUpdateWithoutInventario_minibarInput>
  }

  export type espacioUpdateWithoutInventario_minibarInput = {
    numero?: StringFieldUpdateOperationsInput | string
    tipo_espacio?: StringFieldUpdateOperationsInput | string
    tipo_habitacion?: NullableStringFieldUpdateOperationsInput | string | null
    capacidad_personas?: NullableIntFieldUpdateOperationsInput | number | null
    precio_persona_1?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    precio_persona_2?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    precio_adicional?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado_limpieza?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    tiene_minibar?: NullableBoolFieldUpdateOperationsInput | boolean | null
    reserva?: reservaUpdateManyWithoutEspacioNestedInput
  }

  export type espacioUncheckedUpdateWithoutInventario_minibarInput = {
    id_espacio?: IntFieldUpdateOperationsInput | number
    numero?: StringFieldUpdateOperationsInput | string
    tipo_espacio?: StringFieldUpdateOperationsInput | string
    tipo_habitacion?: NullableStringFieldUpdateOperationsInput | string | null
    capacidad_personas?: NullableIntFieldUpdateOperationsInput | number | null
    precio_persona_1?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    precio_persona_2?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    precio_adicional?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado_limpieza?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    tiene_minibar?: NullableBoolFieldUpdateOperationsInput | boolean | null
    reserva?: reservaUncheckedUpdateManyWithoutEspacioNestedInput
  }

  export type cuenta_espacioCreateWithoutReservaInput = {
    nombre_producto: string
    cantidad?: number
    valor_unitario: Decimal | DecimalJsLike | number | string
    valor_total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    metodo_pago?: string | null
    fecha_registro?: Date | string | null
    anotaciones?: string | null
  }

  export type cuenta_espacioUncheckedCreateWithoutReservaInput = {
    id_item?: number
    nombre_producto: string
    cantidad?: number
    valor_unitario: Decimal | DecimalJsLike | number | string
    valor_total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    metodo_pago?: string | null
    fecha_registro?: Date | string | null
    anotaciones?: string | null
  }

  export type cuenta_espacioCreateOrConnectWithoutReservaInput = {
    where: cuenta_espacioWhereUniqueInput
    create: XOR<cuenta_espacioCreateWithoutReservaInput, cuenta_espacioUncheckedCreateWithoutReservaInput>
  }

  export type cuenta_espacioCreateManyReservaInputEnvelope = {
    data: cuenta_espacioCreateManyReservaInput | cuenta_espacioCreateManyReservaInput[]
    skipDuplicates?: boolean
  }

  export type cuenta_personaCreateWithoutReservaInput = {
    nombre_persona: string
    fecha?: Date | string
    descripcion: string
    cantidad?: number
    valor_unitario: Decimal | DecimalJsLike | number | string
    valor_total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    metodo_pago?: string | null
    fecha_registro?: Date | string | null
    huesped?: huespedCreateNestedOneWithoutCuenta_personaInput
  }

  export type cuenta_personaUncheckedCreateWithoutReservaInput = {
    id_item_persona?: number
    id_huesped?: number | null
    nombre_persona: string
    fecha?: Date | string
    descripcion: string
    cantidad?: number
    valor_unitario: Decimal | DecimalJsLike | number | string
    valor_total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    metodo_pago?: string | null
    fecha_registro?: Date | string | null
  }

  export type cuenta_personaCreateOrConnectWithoutReservaInput = {
    where: cuenta_personaWhereUniqueInput
    create: XOR<cuenta_personaCreateWithoutReservaInput, cuenta_personaUncheckedCreateWithoutReservaInput>
  }

  export type cuenta_personaCreateManyReservaInputEnvelope = {
    data: cuenta_personaCreateManyReservaInput | cuenta_personaCreateManyReservaInput[]
    skipDuplicates?: boolean
  }

  export type espacioCreateWithoutReservaInput = {
    numero: string
    tipo_espacio: string
    tipo_habitacion?: string | null
    capacidad_personas?: number | null
    precio_persona_1?: Decimal | DecimalJsLike | number | string | null
    precio_persona_2?: Decimal | DecimalJsLike | number | string | null
    precio_adicional?: Decimal | DecimalJsLike | number | string | null
    estado_limpieza?: string | null
    activo?: boolean | null
    tiene_minibar?: boolean | null
    inventario_minibar?: inventario_minibarCreateNestedManyWithoutEspacioInput
  }

  export type espacioUncheckedCreateWithoutReservaInput = {
    id_espacio?: number
    numero: string
    tipo_espacio: string
    tipo_habitacion?: string | null
    capacidad_personas?: number | null
    precio_persona_1?: Decimal | DecimalJsLike | number | string | null
    precio_persona_2?: Decimal | DecimalJsLike | number | string | null
    precio_adicional?: Decimal | DecimalJsLike | number | string | null
    estado_limpieza?: string | null
    activo?: boolean | null
    tiene_minibar?: boolean | null
    inventario_minibar?: inventario_minibarUncheckedCreateNestedManyWithoutEspacioInput
  }

  export type espacioCreateOrConnectWithoutReservaInput = {
    where: espacioWhereUniqueInput
    create: XOR<espacioCreateWithoutReservaInput, espacioUncheckedCreateWithoutReservaInput>
  }

  export type huespedCreateWithoutReservaInput = {
    nombre_completo: string
    telefono?: string | null
    documento?: string | null
    tipo_documento?: string | null
    procedencia?: string | null
    firma?: string | null
    fecha_creacion?: Date | string | null
    cuenta_persona?: cuenta_personaCreateNestedManyWithoutHuespedInput
  }

  export type huespedUncheckedCreateWithoutReservaInput = {
    id_huesped?: number
    nombre_completo: string
    telefono?: string | null
    documento?: string | null
    tipo_documento?: string | null
    procedencia?: string | null
    firma?: string | null
    fecha_creacion?: Date | string | null
    cuenta_persona?: cuenta_personaUncheckedCreateNestedManyWithoutHuespedInput
  }

  export type huespedCreateOrConnectWithoutReservaInput = {
    where: huespedWhereUniqueInput
    create: XOR<huespedCreateWithoutReservaInput, huespedUncheckedCreateWithoutReservaInput>
  }

  export type cuenta_espacioUpsertWithWhereUniqueWithoutReservaInput = {
    where: cuenta_espacioWhereUniqueInput
    update: XOR<cuenta_espacioUpdateWithoutReservaInput, cuenta_espacioUncheckedUpdateWithoutReservaInput>
    create: XOR<cuenta_espacioCreateWithoutReservaInput, cuenta_espacioUncheckedCreateWithoutReservaInput>
  }

  export type cuenta_espacioUpdateWithWhereUniqueWithoutReservaInput = {
    where: cuenta_espacioWhereUniqueInput
    data: XOR<cuenta_espacioUpdateWithoutReservaInput, cuenta_espacioUncheckedUpdateWithoutReservaInput>
  }

  export type cuenta_espacioUpdateManyWithWhereWithoutReservaInput = {
    where: cuenta_espacioScalarWhereInput
    data: XOR<cuenta_espacioUpdateManyMutationInput, cuenta_espacioUncheckedUpdateManyWithoutReservaInput>
  }

  export type cuenta_espacioScalarWhereInput = {
    AND?: cuenta_espacioScalarWhereInput | cuenta_espacioScalarWhereInput[]
    OR?: cuenta_espacioScalarWhereInput[]
    NOT?: cuenta_espacioScalarWhereInput | cuenta_espacioScalarWhereInput[]
    id_item?: IntFilter<"cuenta_espacio"> | number
    id_reserva?: IntFilter<"cuenta_espacio"> | number
    nombre_producto?: StringFilter<"cuenta_espacio"> | string
    cantidad?: IntFilter<"cuenta_espacio"> | number
    valor_unitario?: DecimalFilter<"cuenta_espacio"> | Decimal | DecimalJsLike | number | string
    valor_total?: DecimalNullableFilter<"cuenta_espacio"> | Decimal | DecimalJsLike | number | string | null
    estado?: StringNullableFilter<"cuenta_espacio"> | string | null
    metodo_pago?: StringNullableFilter<"cuenta_espacio"> | string | null
    fecha_registro?: DateTimeNullableFilter<"cuenta_espacio"> | Date | string | null
    anotaciones?: StringNullableFilter<"cuenta_espacio"> | string | null
  }

  export type cuenta_personaUpsertWithWhereUniqueWithoutReservaInput = {
    where: cuenta_personaWhereUniqueInput
    update: XOR<cuenta_personaUpdateWithoutReservaInput, cuenta_personaUncheckedUpdateWithoutReservaInput>
    create: XOR<cuenta_personaCreateWithoutReservaInput, cuenta_personaUncheckedCreateWithoutReservaInput>
  }

  export type cuenta_personaUpdateWithWhereUniqueWithoutReservaInput = {
    where: cuenta_personaWhereUniqueInput
    data: XOR<cuenta_personaUpdateWithoutReservaInput, cuenta_personaUncheckedUpdateWithoutReservaInput>
  }

  export type cuenta_personaUpdateManyWithWhereWithoutReservaInput = {
    where: cuenta_personaScalarWhereInput
    data: XOR<cuenta_personaUpdateManyMutationInput, cuenta_personaUncheckedUpdateManyWithoutReservaInput>
  }

  export type espacioUpsertWithoutReservaInput = {
    update: XOR<espacioUpdateWithoutReservaInput, espacioUncheckedUpdateWithoutReservaInput>
    create: XOR<espacioCreateWithoutReservaInput, espacioUncheckedCreateWithoutReservaInput>
    where?: espacioWhereInput
  }

  export type espacioUpdateToOneWithWhereWithoutReservaInput = {
    where?: espacioWhereInput
    data: XOR<espacioUpdateWithoutReservaInput, espacioUncheckedUpdateWithoutReservaInput>
  }

  export type espacioUpdateWithoutReservaInput = {
    numero?: StringFieldUpdateOperationsInput | string
    tipo_espacio?: StringFieldUpdateOperationsInput | string
    tipo_habitacion?: NullableStringFieldUpdateOperationsInput | string | null
    capacidad_personas?: NullableIntFieldUpdateOperationsInput | number | null
    precio_persona_1?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    precio_persona_2?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    precio_adicional?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado_limpieza?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    tiene_minibar?: NullableBoolFieldUpdateOperationsInput | boolean | null
    inventario_minibar?: inventario_minibarUpdateManyWithoutEspacioNestedInput
  }

  export type espacioUncheckedUpdateWithoutReservaInput = {
    id_espacio?: IntFieldUpdateOperationsInput | number
    numero?: StringFieldUpdateOperationsInput | string
    tipo_espacio?: StringFieldUpdateOperationsInput | string
    tipo_habitacion?: NullableStringFieldUpdateOperationsInput | string | null
    capacidad_personas?: NullableIntFieldUpdateOperationsInput | number | null
    precio_persona_1?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    precio_persona_2?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    precio_adicional?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado_limpieza?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: NullableBoolFieldUpdateOperationsInput | boolean | null
    tiene_minibar?: NullableBoolFieldUpdateOperationsInput | boolean | null
    inventario_minibar?: inventario_minibarUncheckedUpdateManyWithoutEspacioNestedInput
  }

  export type huespedUpsertWithoutReservaInput = {
    update: XOR<huespedUpdateWithoutReservaInput, huespedUncheckedUpdateWithoutReservaInput>
    create: XOR<huespedCreateWithoutReservaInput, huespedUncheckedCreateWithoutReservaInput>
    where?: huespedWhereInput
  }

  export type huespedUpdateToOneWithWhereWithoutReservaInput = {
    where?: huespedWhereInput
    data: XOR<huespedUpdateWithoutReservaInput, huespedUncheckedUpdateWithoutReservaInput>
  }

  export type huespedUpdateWithoutReservaInput = {
    nombre_completo?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    documento?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_documento?: NullableStringFieldUpdateOperationsInput | string | null
    procedencia?: NullableStringFieldUpdateOperationsInput | string | null
    firma?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_creacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cuenta_persona?: cuenta_personaUpdateManyWithoutHuespedNestedInput
  }

  export type huespedUncheckedUpdateWithoutReservaInput = {
    id_huesped?: IntFieldUpdateOperationsInput | number
    nombre_completo?: StringFieldUpdateOperationsInput | string
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    documento?: NullableStringFieldUpdateOperationsInput | string | null
    tipo_documento?: NullableStringFieldUpdateOperationsInput | string | null
    procedencia?: NullableStringFieldUpdateOperationsInput | string | null
    firma?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_creacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cuenta_persona?: cuenta_personaUncheckedUpdateManyWithoutHuespedNestedInput
  }

  export type producto_inventarioCreateWithoutProveedorInput = {
    nombre: string
    descripcion?: string | null
    categoria: string
    unidad_medida?: string
    precio_costo?: Decimal | DecimalJsLike | number | string
    precio_venta?: Decimal | DecimalJsLike | number | string
    stock_actual?: Decimal | DecimalJsLike | number | string
    stock_minimo?: Decimal | DecimalJsLike | number | string
    activo?: boolean
    fecha_creacion?: Date | string
    movimientos?: movimiento_inventarioCreateNestedManyWithoutProductoInput
  }

  export type producto_inventarioUncheckedCreateWithoutProveedorInput = {
    id_producto?: number
    nombre: string
    descripcion?: string | null
    categoria: string
    unidad_medida?: string
    precio_costo?: Decimal | DecimalJsLike | number | string
    precio_venta?: Decimal | DecimalJsLike | number | string
    stock_actual?: Decimal | DecimalJsLike | number | string
    stock_minimo?: Decimal | DecimalJsLike | number | string
    activo?: boolean
    fecha_creacion?: Date | string
    movimientos?: movimiento_inventarioUncheckedCreateNestedManyWithoutProductoInput
  }

  export type producto_inventarioCreateOrConnectWithoutProveedorInput = {
    where: producto_inventarioWhereUniqueInput
    create: XOR<producto_inventarioCreateWithoutProveedorInput, producto_inventarioUncheckedCreateWithoutProveedorInput>
  }

  export type producto_inventarioCreateManyProveedorInputEnvelope = {
    data: producto_inventarioCreateManyProveedorInput | producto_inventarioCreateManyProveedorInput[]
    skipDuplicates?: boolean
  }

  export type producto_inventarioUpsertWithWhereUniqueWithoutProveedorInput = {
    where: producto_inventarioWhereUniqueInput
    update: XOR<producto_inventarioUpdateWithoutProveedorInput, producto_inventarioUncheckedUpdateWithoutProveedorInput>
    create: XOR<producto_inventarioCreateWithoutProveedorInput, producto_inventarioUncheckedCreateWithoutProveedorInput>
  }

  export type producto_inventarioUpdateWithWhereUniqueWithoutProveedorInput = {
    where: producto_inventarioWhereUniqueInput
    data: XOR<producto_inventarioUpdateWithoutProveedorInput, producto_inventarioUncheckedUpdateWithoutProveedorInput>
  }

  export type producto_inventarioUpdateManyWithWhereWithoutProveedorInput = {
    where: producto_inventarioScalarWhereInput
    data: XOR<producto_inventarioUpdateManyMutationInput, producto_inventarioUncheckedUpdateManyWithoutProveedorInput>
  }

  export type producto_inventarioScalarWhereInput = {
    AND?: producto_inventarioScalarWhereInput | producto_inventarioScalarWhereInput[]
    OR?: producto_inventarioScalarWhereInput[]
    NOT?: producto_inventarioScalarWhereInput | producto_inventarioScalarWhereInput[]
    id_producto?: IntFilter<"producto_inventario"> | number
    nombre?: StringFilter<"producto_inventario"> | string
    descripcion?: StringNullableFilter<"producto_inventario"> | string | null
    categoria?: StringFilter<"producto_inventario"> | string
    unidad_medida?: StringFilter<"producto_inventario"> | string
    precio_costo?: DecimalFilter<"producto_inventario"> | Decimal | DecimalJsLike | number | string
    precio_venta?: DecimalFilter<"producto_inventario"> | Decimal | DecimalJsLike | number | string
    stock_actual?: DecimalFilter<"producto_inventario"> | Decimal | DecimalJsLike | number | string
    stock_minimo?: DecimalFilter<"producto_inventario"> | Decimal | DecimalJsLike | number | string
    id_proveedor?: IntNullableFilter<"producto_inventario"> | number | null
    activo?: BoolFilter<"producto_inventario"> | boolean
    fecha_creacion?: DateTimeFilter<"producto_inventario"> | Date | string
  }

  export type proveedorCreateWithoutProductosInput = {
    nombre: string
    nit?: string | null
    telefono?: string | null
    email?: string | null
    direccion?: string | null
    ciudad?: string | null
    contacto?: string | null
    notas?: string | null
    activo?: boolean
    fecha_creacion?: Date | string
  }

  export type proveedorUncheckedCreateWithoutProductosInput = {
    id_proveedor?: number
    nombre: string
    nit?: string | null
    telefono?: string | null
    email?: string | null
    direccion?: string | null
    ciudad?: string | null
    contacto?: string | null
    notas?: string | null
    activo?: boolean
    fecha_creacion?: Date | string
  }

  export type proveedorCreateOrConnectWithoutProductosInput = {
    where: proveedorWhereUniqueInput
    create: XOR<proveedorCreateWithoutProductosInput, proveedorUncheckedCreateWithoutProductosInput>
  }

  export type movimiento_inventarioCreateWithoutProductoInput = {
    tipo: string
    motivo: string
    cantidad: Decimal | DecimalJsLike | number | string
    stock_antes: Decimal | DecimalJsLike | number | string
    stock_despues: Decimal | DecimalJsLike | number | string
    precio_unitario?: Decimal | DecimalJsLike | number | string
    referencia_id?: number | null
    referencia_tipo?: string | null
    notas?: string | null
    fecha?: Date | string
  }

  export type movimiento_inventarioUncheckedCreateWithoutProductoInput = {
    id_movimiento?: number
    tipo: string
    motivo: string
    cantidad: Decimal | DecimalJsLike | number | string
    stock_antes: Decimal | DecimalJsLike | number | string
    stock_despues: Decimal | DecimalJsLike | number | string
    precio_unitario?: Decimal | DecimalJsLike | number | string
    referencia_id?: number | null
    referencia_tipo?: string | null
    notas?: string | null
    fecha?: Date | string
  }

  export type movimiento_inventarioCreateOrConnectWithoutProductoInput = {
    where: movimiento_inventarioWhereUniqueInput
    create: XOR<movimiento_inventarioCreateWithoutProductoInput, movimiento_inventarioUncheckedCreateWithoutProductoInput>
  }

  export type movimiento_inventarioCreateManyProductoInputEnvelope = {
    data: movimiento_inventarioCreateManyProductoInput | movimiento_inventarioCreateManyProductoInput[]
    skipDuplicates?: boolean
  }

  export type proveedorUpsertWithoutProductosInput = {
    update: XOR<proveedorUpdateWithoutProductosInput, proveedorUncheckedUpdateWithoutProductosInput>
    create: XOR<proveedorCreateWithoutProductosInput, proveedorUncheckedCreateWithoutProductosInput>
    where?: proveedorWhereInput
  }

  export type proveedorUpdateToOneWithWhereWithoutProductosInput = {
    where?: proveedorWhereInput
    data: XOR<proveedorUpdateWithoutProductosInput, proveedorUncheckedUpdateWithoutProductosInput>
  }

  export type proveedorUpdateWithoutProductosInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    nit?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    ciudad?: NullableStringFieldUpdateOperationsInput | string | null
    contacto?: NullableStringFieldUpdateOperationsInput | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type proveedorUncheckedUpdateWithoutProductosInput = {
    id_proveedor?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    nit?: NullableStringFieldUpdateOperationsInput | string | null
    telefono?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    direccion?: NullableStringFieldUpdateOperationsInput | string | null
    ciudad?: NullableStringFieldUpdateOperationsInput | string | null
    contacto?: NullableStringFieldUpdateOperationsInput | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type movimiento_inventarioUpsertWithWhereUniqueWithoutProductoInput = {
    where: movimiento_inventarioWhereUniqueInput
    update: XOR<movimiento_inventarioUpdateWithoutProductoInput, movimiento_inventarioUncheckedUpdateWithoutProductoInput>
    create: XOR<movimiento_inventarioCreateWithoutProductoInput, movimiento_inventarioUncheckedCreateWithoutProductoInput>
  }

  export type movimiento_inventarioUpdateWithWhereUniqueWithoutProductoInput = {
    where: movimiento_inventarioWhereUniqueInput
    data: XOR<movimiento_inventarioUpdateWithoutProductoInput, movimiento_inventarioUncheckedUpdateWithoutProductoInput>
  }

  export type movimiento_inventarioUpdateManyWithWhereWithoutProductoInput = {
    where: movimiento_inventarioScalarWhereInput
    data: XOR<movimiento_inventarioUpdateManyMutationInput, movimiento_inventarioUncheckedUpdateManyWithoutProductoInput>
  }

  export type movimiento_inventarioScalarWhereInput = {
    AND?: movimiento_inventarioScalarWhereInput | movimiento_inventarioScalarWhereInput[]
    OR?: movimiento_inventarioScalarWhereInput[]
    NOT?: movimiento_inventarioScalarWhereInput | movimiento_inventarioScalarWhereInput[]
    id_movimiento?: IntFilter<"movimiento_inventario"> | number
    id_producto?: IntFilter<"movimiento_inventario"> | number
    tipo?: StringFilter<"movimiento_inventario"> | string
    motivo?: StringFilter<"movimiento_inventario"> | string
    cantidad?: DecimalFilter<"movimiento_inventario"> | Decimal | DecimalJsLike | number | string
    stock_antes?: DecimalFilter<"movimiento_inventario"> | Decimal | DecimalJsLike | number | string
    stock_despues?: DecimalFilter<"movimiento_inventario"> | Decimal | DecimalJsLike | number | string
    precio_unitario?: DecimalFilter<"movimiento_inventario"> | Decimal | DecimalJsLike | number | string
    referencia_id?: IntNullableFilter<"movimiento_inventario"> | number | null
    referencia_tipo?: StringNullableFilter<"movimiento_inventario"> | string | null
    notas?: StringNullableFilter<"movimiento_inventario"> | string | null
    fecha?: DateTimeFilter<"movimiento_inventario"> | Date | string
  }

  export type producto_inventarioCreateWithoutMovimientosInput = {
    nombre: string
    descripcion?: string | null
    categoria: string
    unidad_medida?: string
    precio_costo?: Decimal | DecimalJsLike | number | string
    precio_venta?: Decimal | DecimalJsLike | number | string
    stock_actual?: Decimal | DecimalJsLike | number | string
    stock_minimo?: Decimal | DecimalJsLike | number | string
    activo?: boolean
    fecha_creacion?: Date | string
    proveedor?: proveedorCreateNestedOneWithoutProductosInput
  }

  export type producto_inventarioUncheckedCreateWithoutMovimientosInput = {
    id_producto?: number
    nombre: string
    descripcion?: string | null
    categoria: string
    unidad_medida?: string
    precio_costo?: Decimal | DecimalJsLike | number | string
    precio_venta?: Decimal | DecimalJsLike | number | string
    stock_actual?: Decimal | DecimalJsLike | number | string
    stock_minimo?: Decimal | DecimalJsLike | number | string
    id_proveedor?: number | null
    activo?: boolean
    fecha_creacion?: Date | string
  }

  export type producto_inventarioCreateOrConnectWithoutMovimientosInput = {
    where: producto_inventarioWhereUniqueInput
    create: XOR<producto_inventarioCreateWithoutMovimientosInput, producto_inventarioUncheckedCreateWithoutMovimientosInput>
  }

  export type producto_inventarioUpsertWithoutMovimientosInput = {
    update: XOR<producto_inventarioUpdateWithoutMovimientosInput, producto_inventarioUncheckedUpdateWithoutMovimientosInput>
    create: XOR<producto_inventarioCreateWithoutMovimientosInput, producto_inventarioUncheckedCreateWithoutMovimientosInput>
    where?: producto_inventarioWhereInput
  }

  export type producto_inventarioUpdateToOneWithWhereWithoutMovimientosInput = {
    where?: producto_inventarioWhereInput
    data: XOR<producto_inventarioUpdateWithoutMovimientosInput, producto_inventarioUncheckedUpdateWithoutMovimientosInput>
  }

  export type producto_inventarioUpdateWithoutMovimientosInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: StringFieldUpdateOperationsInput | string
    unidad_medida?: StringFieldUpdateOperationsInput | string
    precio_costo?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    precio_venta?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_actual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_minimo?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
    proveedor?: proveedorUpdateOneWithoutProductosNestedInput
  }

  export type producto_inventarioUncheckedUpdateWithoutMovimientosInput = {
    id_producto?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: StringFieldUpdateOperationsInput | string
    unidad_medida?: StringFieldUpdateOperationsInput | string
    precio_costo?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    precio_venta?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_actual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_minimo?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    id_proveedor?: NullableIntFieldUpdateOperationsInput | number | null
    activo?: BoolFieldUpdateOperationsInput | boolean
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type inventario_minibarCreateManyEspacioInput = {
    id_inventario?: number
    nombre_producto: string
    cantidad?: number
    precio_unitario: Decimal | DecimalJsLike | number | string
    fecha_vencimiento?: Date | string | null
    fecha_actualizacion?: Date | string | null
  }

  export type reservaCreateManyEspacioInput = {
    id_reserva?: number
    id_huesped: number
    tipo_reserva?: string
    dni_tipo?: string | null
    check_in?: Date | string | null
    check_out?: Date | string | null
    cantidad_adultos?: number | null
    cantidad_ninos?: number | null
    fecha_evento?: Date | string | null
    hora_inicio?: Date | string | null
    hora_fin?: Date | string | null
    estado_reserva?: string
    monto_total?: Decimal | DecimalJsLike | number | string | null
    estado_pago?: string | null
    metodo_pago?: string | null
    monto_pagado?: Decimal | DecimalJsLike | number | string | null
    anotaciones?: string | null
    firma?: string | null
    fecha_creacion?: Date | string | null
  }

  export type inventario_minibarUpdateWithoutEspacioInput = {
    nombre_producto?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precio_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fecha_vencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fecha_actualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type inventario_minibarUncheckedUpdateWithoutEspacioInput = {
    id_inventario?: IntFieldUpdateOperationsInput | number
    nombre_producto?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precio_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fecha_vencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fecha_actualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type inventario_minibarUncheckedUpdateManyWithoutEspacioInput = {
    id_inventario?: IntFieldUpdateOperationsInput | number
    nombre_producto?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    precio_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    fecha_vencimiento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fecha_actualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reservaUpdateWithoutEspacioInput = {
    tipo_reserva?: StringFieldUpdateOperationsInput | string
    dni_tipo?: NullableStringFieldUpdateOperationsInput | string | null
    check_in?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    check_out?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cantidad_adultos?: NullableIntFieldUpdateOperationsInput | number | null
    cantidad_ninos?: NullableIntFieldUpdateOperationsInput | number | null
    fecha_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_inicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_fin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado_reserva?: StringFieldUpdateOperationsInput | string
    monto_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado_pago?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    monto_pagado?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    anotaciones?: NullableStringFieldUpdateOperationsInput | string | null
    firma?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_creacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cuenta_espacio?: cuenta_espacioUpdateManyWithoutReservaNestedInput
    cuenta_persona?: cuenta_personaUpdateManyWithoutReservaNestedInput
    huesped?: huespedUpdateOneRequiredWithoutReservaNestedInput
  }

  export type reservaUncheckedUpdateWithoutEspacioInput = {
    id_reserva?: IntFieldUpdateOperationsInput | number
    id_huesped?: IntFieldUpdateOperationsInput | number
    tipo_reserva?: StringFieldUpdateOperationsInput | string
    dni_tipo?: NullableStringFieldUpdateOperationsInput | string | null
    check_in?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    check_out?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cantidad_adultos?: NullableIntFieldUpdateOperationsInput | number | null
    cantidad_ninos?: NullableIntFieldUpdateOperationsInput | number | null
    fecha_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_inicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_fin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado_reserva?: StringFieldUpdateOperationsInput | string
    monto_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado_pago?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    monto_pagado?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    anotaciones?: NullableStringFieldUpdateOperationsInput | string | null
    firma?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_creacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cuenta_espacio?: cuenta_espacioUncheckedUpdateManyWithoutReservaNestedInput
    cuenta_persona?: cuenta_personaUncheckedUpdateManyWithoutReservaNestedInput
  }

  export type reservaUncheckedUpdateManyWithoutEspacioInput = {
    id_reserva?: IntFieldUpdateOperationsInput | number
    id_huesped?: IntFieldUpdateOperationsInput | number
    tipo_reserva?: StringFieldUpdateOperationsInput | string
    dni_tipo?: NullableStringFieldUpdateOperationsInput | string | null
    check_in?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    check_out?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cantidad_adultos?: NullableIntFieldUpdateOperationsInput | number | null
    cantidad_ninos?: NullableIntFieldUpdateOperationsInput | number | null
    fecha_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_inicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_fin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado_reserva?: StringFieldUpdateOperationsInput | string
    monto_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado_pago?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    monto_pagado?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    anotaciones?: NullableStringFieldUpdateOperationsInput | string | null
    firma?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_creacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type cuenta_personaCreateManyHuespedInput = {
    id_item_persona?: number
    nombre_persona: string
    id_reserva?: number | null
    fecha?: Date | string
    descripcion: string
    cantidad?: number
    valor_unitario: Decimal | DecimalJsLike | number | string
    valor_total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    metodo_pago?: string | null
    fecha_registro?: Date | string | null
  }

  export type reservaCreateManyHuespedInput = {
    id_reserva?: number
    id_espacio: number
    tipo_reserva?: string
    dni_tipo?: string | null
    check_in?: Date | string | null
    check_out?: Date | string | null
    cantidad_adultos?: number | null
    cantidad_ninos?: number | null
    fecha_evento?: Date | string | null
    hora_inicio?: Date | string | null
    hora_fin?: Date | string | null
    estado_reserva?: string
    monto_total?: Decimal | DecimalJsLike | number | string | null
    estado_pago?: string | null
    metodo_pago?: string | null
    monto_pagado?: Decimal | DecimalJsLike | number | string | null
    anotaciones?: string | null
    firma?: string | null
    fecha_creacion?: Date | string | null
  }

  export type cuenta_personaUpdateWithoutHuespedInput = {
    nombre_persona?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    descripcion?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reserva?: reservaUpdateOneWithoutCuenta_personaNestedInput
  }

  export type cuenta_personaUncheckedUpdateWithoutHuespedInput = {
    id_item_persona?: IntFieldUpdateOperationsInput | number
    nombre_persona?: StringFieldUpdateOperationsInput | string
    id_reserva?: NullableIntFieldUpdateOperationsInput | number | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    descripcion?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type cuenta_personaUncheckedUpdateManyWithoutHuespedInput = {
    id_item_persona?: IntFieldUpdateOperationsInput | number
    nombre_persona?: StringFieldUpdateOperationsInput | string
    id_reserva?: NullableIntFieldUpdateOperationsInput | number | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    descripcion?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reservaUpdateWithoutHuespedInput = {
    tipo_reserva?: StringFieldUpdateOperationsInput | string
    dni_tipo?: NullableStringFieldUpdateOperationsInput | string | null
    check_in?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    check_out?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cantidad_adultos?: NullableIntFieldUpdateOperationsInput | number | null
    cantidad_ninos?: NullableIntFieldUpdateOperationsInput | number | null
    fecha_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_inicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_fin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado_reserva?: StringFieldUpdateOperationsInput | string
    monto_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado_pago?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    monto_pagado?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    anotaciones?: NullableStringFieldUpdateOperationsInput | string | null
    firma?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_creacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cuenta_espacio?: cuenta_espacioUpdateManyWithoutReservaNestedInput
    cuenta_persona?: cuenta_personaUpdateManyWithoutReservaNestedInput
    espacio?: espacioUpdateOneRequiredWithoutReservaNestedInput
  }

  export type reservaUncheckedUpdateWithoutHuespedInput = {
    id_reserva?: IntFieldUpdateOperationsInput | number
    id_espacio?: IntFieldUpdateOperationsInput | number
    tipo_reserva?: StringFieldUpdateOperationsInput | string
    dni_tipo?: NullableStringFieldUpdateOperationsInput | string | null
    check_in?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    check_out?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cantidad_adultos?: NullableIntFieldUpdateOperationsInput | number | null
    cantidad_ninos?: NullableIntFieldUpdateOperationsInput | number | null
    fecha_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_inicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_fin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado_reserva?: StringFieldUpdateOperationsInput | string
    monto_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado_pago?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    monto_pagado?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    anotaciones?: NullableStringFieldUpdateOperationsInput | string | null
    firma?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_creacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cuenta_espacio?: cuenta_espacioUncheckedUpdateManyWithoutReservaNestedInput
    cuenta_persona?: cuenta_personaUncheckedUpdateManyWithoutReservaNestedInput
  }

  export type reservaUncheckedUpdateManyWithoutHuespedInput = {
    id_reserva?: IntFieldUpdateOperationsInput | number
    id_espacio?: IntFieldUpdateOperationsInput | number
    tipo_reserva?: StringFieldUpdateOperationsInput | string
    dni_tipo?: NullableStringFieldUpdateOperationsInput | string | null
    check_in?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    check_out?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    cantidad_adultos?: NullableIntFieldUpdateOperationsInput | number | null
    cantidad_ninos?: NullableIntFieldUpdateOperationsInput | number | null
    fecha_evento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_inicio?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    hora_fin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado_reserva?: StringFieldUpdateOperationsInput | string
    monto_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado_pago?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    monto_pagado?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    anotaciones?: NullableStringFieldUpdateOperationsInput | string | null
    firma?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_creacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type cuenta_espacioCreateManyReservaInput = {
    id_item?: number
    nombre_producto: string
    cantidad?: number
    valor_unitario: Decimal | DecimalJsLike | number | string
    valor_total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    metodo_pago?: string | null
    fecha_registro?: Date | string | null
    anotaciones?: string | null
  }

  export type cuenta_personaCreateManyReservaInput = {
    id_item_persona?: number
    id_huesped?: number | null
    nombre_persona: string
    fecha?: Date | string
    descripcion: string
    cantidad?: number
    valor_unitario: Decimal | DecimalJsLike | number | string
    valor_total?: Decimal | DecimalJsLike | number | string | null
    estado?: string | null
    metodo_pago?: string | null
    fecha_registro?: Date | string | null
  }

  export type cuenta_espacioUpdateWithoutReservaInput = {
    nombre_producto?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    anotaciones?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type cuenta_espacioUncheckedUpdateWithoutReservaInput = {
    id_item?: IntFieldUpdateOperationsInput | number
    nombre_producto?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    anotaciones?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type cuenta_espacioUncheckedUpdateManyWithoutReservaInput = {
    id_item?: IntFieldUpdateOperationsInput | number
    nombre_producto?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    anotaciones?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type cuenta_personaUpdateWithoutReservaInput = {
    nombre_persona?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    descripcion?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    huesped?: huespedUpdateOneWithoutCuenta_personaNestedInput
  }

  export type cuenta_personaUncheckedUpdateWithoutReservaInput = {
    id_item_persona?: IntFieldUpdateOperationsInput | number
    id_huesped?: NullableIntFieldUpdateOperationsInput | number | null
    nombre_persona?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    descripcion?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type cuenta_personaUncheckedUpdateManyWithoutReservaInput = {
    id_item_persona?: IntFieldUpdateOperationsInput | number
    id_huesped?: NullableIntFieldUpdateOperationsInput | number | null
    nombre_persona?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    descripcion?: StringFieldUpdateOperationsInput | string
    cantidad?: IntFieldUpdateOperationsInput | number
    valor_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    valor_total?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    estado?: NullableStringFieldUpdateOperationsInput | string | null
    metodo_pago?: NullableStringFieldUpdateOperationsInput | string | null
    fecha_registro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type producto_inventarioCreateManyProveedorInput = {
    id_producto?: number
    nombre: string
    descripcion?: string | null
    categoria: string
    unidad_medida?: string
    precio_costo?: Decimal | DecimalJsLike | number | string
    precio_venta?: Decimal | DecimalJsLike | number | string
    stock_actual?: Decimal | DecimalJsLike | number | string
    stock_minimo?: Decimal | DecimalJsLike | number | string
    activo?: boolean
    fecha_creacion?: Date | string
  }

  export type producto_inventarioUpdateWithoutProveedorInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: StringFieldUpdateOperationsInput | string
    unidad_medida?: StringFieldUpdateOperationsInput | string
    precio_costo?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    precio_venta?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_actual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_minimo?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
    movimientos?: movimiento_inventarioUpdateManyWithoutProductoNestedInput
  }

  export type producto_inventarioUncheckedUpdateWithoutProveedorInput = {
    id_producto?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: StringFieldUpdateOperationsInput | string
    unidad_medida?: StringFieldUpdateOperationsInput | string
    precio_costo?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    precio_venta?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_actual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_minimo?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
    movimientos?: movimiento_inventarioUncheckedUpdateManyWithoutProductoNestedInput
  }

  export type producto_inventarioUncheckedUpdateManyWithoutProveedorInput = {
    id_producto?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    categoria?: StringFieldUpdateOperationsInput | string
    unidad_medida?: StringFieldUpdateOperationsInput | string
    precio_costo?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    precio_venta?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_actual?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_minimo?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    fecha_creacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type movimiento_inventarioCreateManyProductoInput = {
    id_movimiento?: number
    tipo: string
    motivo: string
    cantidad: Decimal | DecimalJsLike | number | string
    stock_antes: Decimal | DecimalJsLike | number | string
    stock_despues: Decimal | DecimalJsLike | number | string
    precio_unitario?: Decimal | DecimalJsLike | number | string
    referencia_id?: number | null
    referencia_tipo?: string | null
    notas?: string | null
    fecha?: Date | string
  }

  export type movimiento_inventarioUpdateWithoutProductoInput = {
    tipo?: StringFieldUpdateOperationsInput | string
    motivo?: StringFieldUpdateOperationsInput | string
    cantidad?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_antes?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_despues?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    precio_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    referencia_id?: NullableIntFieldUpdateOperationsInput | number | null
    referencia_tipo?: NullableStringFieldUpdateOperationsInput | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type movimiento_inventarioUncheckedUpdateWithoutProductoInput = {
    id_movimiento?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    motivo?: StringFieldUpdateOperationsInput | string
    cantidad?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_antes?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_despues?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    precio_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    referencia_id?: NullableIntFieldUpdateOperationsInput | number | null
    referencia_tipo?: NullableStringFieldUpdateOperationsInput | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type movimiento_inventarioUncheckedUpdateManyWithoutProductoInput = {
    id_movimiento?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    motivo?: StringFieldUpdateOperationsInput | string
    cantidad?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_antes?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stock_despues?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    precio_unitario?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    referencia_id?: NullableIntFieldUpdateOperationsInput | number | null
    referencia_tipo?: NullableStringFieldUpdateOperationsInput | string | null
    notas?: NullableStringFieldUpdateOperationsInput | string | null
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
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