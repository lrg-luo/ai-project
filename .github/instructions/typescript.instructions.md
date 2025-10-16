# TypeScript 编码规范

## 目录
- [命名规范](#命名规范)
- [类型定义](#类型定义)
- [接口与类型别名](#接口与类型别名)
- [函数](#函数)
- [类](#类)
- [枚举](#枚举)
- [泛型](#泛型)
- [模块导入导出](#模块导入导出)
- [错误处理](#错误处理)
- [注释](#注释)
- [最佳实践](#最佳实践)

---

## 命名规范

### 变量和函数
使用 **camelCase**（驼峰命名法）

```typescript
// ✅ 推荐
const userName = 'John'
const isActive = true
function getUserById(id: number) {}
const calculateTotal = (price: number, quantity: number) => {}

// ❌ 避免
const user_name = 'John'
const UserName = 'John'
```

### 常量
使用 **UPPER_SNAKE_CASE**（大写蛇形命名法）

```typescript
// ✅ 推荐
const MAX_RETRY_COUNT = 3
const API_BASE_URL = 'https://api.example.com'
const DEFAULT_TIMEOUT = 5000

// ❌ 避免
const maxRetryCount = 3
const apiBaseUrl = 'https://api.example.com'
```

### 类型、接口、类、枚举
使用 **PascalCase**（帕斯卡命名法）

```typescript
// ✅ 推荐
interface User {}
type UserRole = 'admin' | 'user'
class UserService {}
enum UserStatus {}

// ❌ 避免
interface user {}
type userRole = 'admin' | 'user'
```

### 类型参数（泛型）
使用单个大写字母或以 T 开头的 PascalCase

```typescript
// ✅ 推荐
function identity<T>(value: T): T {}
function map<TInput, TOutput>(items: TInput[]): TOutput[] {}

// ❌ 避免
function identity<type>(value: type): type {}
```

### 私有成员
使用 `#` 或 `_` 前缀

```typescript
// ✅ 推荐
class User {
  #password: string
  private _email: string
  
  constructor(password: string, email: string) {
    this.#password = password
    this._email = email
  }
}
```

---

## 类型定义

### 始终显式声明类型

```typescript
// ✅ 推荐 - 显式类型声明
function calculateTotal(price: number, quantity: number): number {
  return price * quantity
}

const user: User = {
  id: 1,
  name: 'John'
}

// ❌ 避免 - 隐式 any
function calculateTotal(price, quantity) {
  return price * quantity
}
```

### 避免使用 any
尽可能使用具体类型，必要时使用 `unknown`

```typescript
// ✅ 推荐
function processData(data: unknown): void {
  if (typeof data === 'string') {
    console.log(data.toUpperCase())
  }
}

// 使用泛型
function identity<T>(value: T): T {
  return value
}

// ❌ 避免
function processData(data: any): void {
  console.log(data.toUpperCase())
}
```

### 使用联合类型而非 any

```typescript
// ✅ 推荐
type Status = 'pending' | 'success' | 'error'
type Response = User | Error | null

// ❌ 避免
let status: any
let response: any
```

### 使用字面量类型

```typescript
// ✅ 推荐
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
type Size = 'small' | 'medium' | 'large'

function request(method: HttpMethod, url: string) {}

// ❌ 避免
function request(method: string, url: string) {}
```

---

## 接口与类型别名

### 接口用于对象形状，类型别名用于联合类型

```typescript
// ✅ 推荐 - 接口用于对象
interface User {
  id: number
  name: string
  email: string
}

// ✅ 推荐 - 类型别名用于联合类型
type Status = 'active' | 'inactive'
type ID = string | number

// 类型别名用于复杂类型
type AsyncFunction<T> = () => Promise<T>
```

### 接口可扩展，优先使用接口

```typescript
// ✅ 推荐
interface Animal {
  name: string
}

interface Dog extends Animal {
  breed: string
}

// 也可以
interface Cat extends Animal {
  color: string
}
```

### 使用 readonly 和 optional

```typescript
// ✅ 推荐
interface User {
  readonly id: number          // 只读属性
  name: string
  email?: string               // 可选属性
  readonly createdAt: Date
}

// 只读数组
const numbers: readonly number[] = [1, 2, 3]
const users: ReadonlyArray<User> = []
```

### 索引签名

```typescript
// ✅ 推荐
interface Dictionary<T> {
  [key: string]: T
}

interface StringMap {
  [key: string]: string
}

const config: StringMap = {
  apiUrl: 'https://api.example.com',
  timeout: '5000'
}
```

---

## 函数

### 函数类型注解

```typescript
// ✅ 推荐 - 完整的类型注解
function add(a: number, b: number): number {
  return a + b
}

// 箭头函数
const multiply = (a: number, b: number): number => a * b

// 函数类型
type MathOperation = (a: number, b: number) => number
const divide: MathOperation = (a, b) => a / b
```

### 可选参数和默认参数

```typescript
// ✅ 推荐
function greet(name: string, greeting?: string): string {
  return `${greeting ?? 'Hello'}, ${name}!`
}

// 默认参数
function createUser(name: string, age: number = 18): User {
  return { name, age }
}

// ❌ 避免 - 可选参数在必需参数之前
function greet(greeting?: string, name: string): string {}
```

### 剩余参数

```typescript
// ✅ 推荐
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, num) => acc + num, 0)
}

function logMessages(prefix: string, ...messages: string[]): void {
  messages.forEach(msg => console.log(`${prefix}: ${msg}`))
}
```

### 函数重载

```typescript
// ✅ 推荐
function parseValue(value: string): string
function parseValue(value: number): number
function parseValue(value: boolean): boolean
function parseValue(value: string | number | boolean): string | number | boolean {
  return value
}

// 更实际的例子
function createElement(tag: 'div'): HTMLDivElement
function createElement(tag: 'span'): HTMLSpanElement
function createElement(tag: string): HTMLElement
function createElement(tag: string): HTMLElement {
  return document.createElement(tag)
}
```

### 异步函数

```typescript
// ✅ 推荐
async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}

// 错误处理
async function fetchUserSafe(id: number): Promise<User | null> {
  try {
    const response = await fetch(`/api/users/${id}`)
    if (!response.ok) {
      throw new Error('User not found')
    }
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return null
  }
}
```

---

## 类

### 类定义

```typescript
// ✅ 推荐
class User {
  // 属性声明
  readonly id: number
  private password: string
  protected email: string
  public name: string

  constructor(id: number, name: string, email: string, password: string) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
  }

  // 方法
  public getDisplayName(): string {
    return this.name
  }

  private hashPassword(password: string): string {
    return `hashed_${password}`
  }
}
```

### 参数属性简写

```typescript
// ✅ 推荐 - 简洁写法
class User {
  constructor(
    public readonly id: number,
    public name: string,
    private password: string
  ) {}
}
```

### 抽象类

```typescript
// ✅ 推荐
abstract class Shape {
  constructor(protected color: string) {}

  abstract getArea(): number
  
  public getColor(): string {
    return this.color
  }
}

class Circle extends Shape {
  constructor(
    color: string,
    private radius: number
  ) {
    super(color)
  }

  getArea(): number {
    return Math.PI * this.radius ** 2
  }
}
```

### 访问器（Getters/Setters）

```typescript
// ✅ 推荐
class User {
  private _age: number = 0

  get age(): number {
    return this._age
  }

  set age(value: number) {
    if (value < 0) {
      throw new Error('Age cannot be negative')
    }
    this._age = value
  }
}
```

---

## 枚举

### 数字枚举

```typescript
// ✅ 推荐
enum Direction {
  Up = 0,
  Down = 1,
  Left = 2,
  Right = 3
}

// 自动递增
enum Status {
  Pending,      // 0
  Active,       // 1
  Completed     // 2
}
```

### 字符串枚举（推荐）

```typescript
// ✅ 推荐 - 更安全和可读
enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}
```

### 常量枚举（性能优化）

```typescript
// ✅ 推荐 - 编译时内联
const enum LogLevel {
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  DEBUG = 'DEBUG'
}

function log(level: LogLevel, message: string) {
  console.log(`[${level}] ${message}`)
}
```

### 使用联合类型替代枚举

```typescript
// ✅ 推荐 - 更轻量级
type Direction = 'up' | 'down' | 'left' | 'right'
type Status = 'pending' | 'active' | 'completed'

// 配合常量使用
const DIRECTION = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right'
} as const

type Direction = typeof DIRECTION[keyof typeof DIRECTION]
```

---

## 泛型

### 基本泛型

```typescript
// ✅ 推荐
function identity<T>(value: T): T {
  return value
}

// 泛型接口
interface Response<T> {
  data: T
  status: number
  message: string
}

// 泛型类型别名
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E }
```

### 泛型约束

```typescript
// ✅ 推荐
interface Lengthwise {
  length: number
}

function logLength<T extends Lengthwise>(item: T): void {
  console.log(item.length)
}

// 使用 keyof 约束
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const user = { name: 'John', age: 30 }
const name = getProperty(user, 'name')  // string
```

### 泛型工具类型

```typescript
// ✅ 推荐 - 使用内置工具类型
interface User {
  id: number
  name: string
  email: string
  password: string
}

// Partial - 所有属性可选
type PartialUser = Partial<User>

// Required - 所有属性必需
type RequiredUser = Required<User>

// Pick - 选择部分属性
type UserPreview = Pick<User, 'id' | 'name'>

// Omit - 排除部分属性
type UserWithoutPassword = Omit<User, 'password'>

// Readonly - 所有属性只读
type ReadonlyUser = Readonly<User>

// Record - 创建对象类型
type UserMap = Record<string, User>
```

### 自定义工具类型

```typescript
// ✅ 推荐
// 深度只读
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P]
}

// 非空类型
type NonNullable<T> = T extends null | undefined ? never : T

// 提取 Promise 的返回值类型
type Unpromise<T> = T extends Promise<infer U> ? U : T
```

---

## 模块导入导出

### 命名导出（推荐）

```typescript
// ✅ 推荐 - user.ts
export interface User {
  id: number
  name: string
}

export function createUser(name: string): User {
  return { id: Date.now(), name }
}

export class UserService {
  // ...
}

// 导入
import { User, createUser, UserService } from './user'
```

### 默认导出

```typescript
// ✅ 推荐 - 仅用于主要导出
// logger.ts
class Logger {
  log(message: string) {
    console.log(message)
  }
}

export default Logger

// 导入
import Logger from './logger'
```

### 类型导入导出

```typescript
// ✅ 推荐 - 明确标识类型导入
import type { User, UserRole } from './types'
import { createUser } from './user'

// 导出类型
export type { User, UserRole }
export type { RequestConfig } from './types'
```

### 命名空间导入

```typescript
// ✅ 推荐 - 避免命名冲突
import * as UserUtils from './user-utils'
import * as DateUtils from './date-utils'

UserUtils.formatName('John')
DateUtils.formatDate(new Date())
```

### 重新导出

```typescript
// ✅ 推荐 - index.ts 聚合导出
export { User, createUser } from './user'
export { Post, createPost } from './post'
export type { Comment } from './comment'
```

---

## 错误处理

### 自定义错误类

```typescript
// ✅ 推荐
class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public data?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

class ValidationError extends Error {
  constructor(
    message: string,
    public field: string
  ) {
    super(message)
    this.name = 'ValidationError'
  }
}
```

### 类型安全的错误处理

```typescript
// ✅ 推荐
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E }

async function fetchUser(id: number): Promise<Result<User>> {
  try {
    const response = await fetch(`/api/users/${id}`)
    if (!response.ok) {
      return { success: false, error: new Error('User not found') }
    }
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error : new Error('Unknown error')
    }
  }
}

// 使用
const result = await fetchUser(1)
if (result.success) {
  console.log(result.data.name)
} else {
  console.error(result.error.message)
}
```

### 类型守卫用于错误检查

```typescript
// ✅ 推荐
function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}

try {
  // some code
} catch (error) {
  if (isApiError(error)) {
    console.error(`API Error ${error.statusCode}: ${error.message}`)
  } else if (error instanceof Error) {
    console.error(error.message)
  } else {
    console.error('Unknown error')
  }
}
```

---

## 注释

### JSDoc 注释

```typescript
// ✅ 推荐
/**
 * 计算两个数字的和
 * @param a - 第一个数字
 * @param b - 第二个数字
 * @returns 两个数字的和
 * @example
 * ```ts
 * const result = add(1, 2) // 3
 * ```
 */
function add(a: number, b: number): number {
  return a + b
}

/**
 * 用户接口
 * @interface User
 */
interface User {
  /** 用户唯一标识符 */
  id: number
  /** 用户名称 */
  name: string
  /** 用户邮箱（可选） */
  email?: string
}
```

### TODO 注释

```typescript
// ✅ 推荐
// TODO: 实现缓存机制
// FIXME: 修复边界情况处理
// NOTE: 这里使用特殊算法提高性能
// HACK: 临时解决方案，需要重构
```

---

## 最佳实践

### 1. 使用严格模式

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}
```

### 2. 避免类型断言，使用类型守卫

```typescript
// ❌ 避免
const user = data as User

// ✅ 推荐
function isUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data
  )
}

if (isUser(data)) {
  console.log(data.name) // 类型安全
}
```

### 3. 使用 const 断言

```typescript
// ✅ 推荐
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
} as const

// config 的类型为:
// {
//   readonly apiUrl: "https://api.example.com"
//   readonly timeout: 5000
// }
```

### 4. 使用可辨识联合

```typescript
// ✅ 推荐
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number }
  | { kind: 'rectangle'; width: number; height: number }

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2
    case 'square':
      return shape.size ** 2
    case 'rectangle':
      return shape.width * shape.height
  }
}
```

### 5. 使用模板字面量类型

```typescript
// ✅ 推荐
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
type Endpoint = `/api/${string}`
type ApiRoute = `${HttpMethod} ${Endpoint}`

// 类型为: "GET /api/users" | "POST /api/users" | ...
```

### 6. 避免魔法数字和字符串

```typescript
// ❌ 避免
if (status === 200) {}
if (role === 'admin') {}

// ✅ 推荐
const HTTP_STATUS = {
  OK: 200,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
} as const

const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest'
} as const

if (status === HTTP_STATUS.OK) {}
if (role === USER_ROLES.ADMIN) {}
```

### 7. 使用类型别名简化复杂类型

```typescript
// ✅ 推荐
type ID = string | number
type Nullable<T> = T | null
type Optional<T> = T | undefined
type AsyncResult<T> = Promise<Result<T>>

// 使用
function getUserById(id: ID): Promise<Nullable<User>> {
  // ...
}
```

### 8. 组织代码结构

```typescript
// ✅ 推荐的文件组织
// types/user.ts
export interface User {
  id: number
  name: string
}

// services/user.service.ts
import type { User } from '@/types/user'

export class UserService {
  async getUser(id: number): Promise<User> {
    // ...
  }
}

// composables/useUser.ts
import { ref } from 'vue'
import type { User } from '@/types/user'

export function useUser() {
  const user = ref<User | null>(null)
  // ...
  return { user }
}
```

### 9. 性能优化技巧

```typescript
// ✅ 推荐 - 使用类型收窄减少运行时检查
function processValue(value: string | number) {
  if (typeof value === 'string') {
    return value.toUpperCase()
  }
  return value.toFixed(2)
}

// ✅ 推荐 - 使用常量枚举
const enum LogLevel {
  ERROR,
  WARN,
  INFO
}
```

### 10. 代码风格一致性

```typescript
// ✅ 推荐 - 使用 ESLint 和 Prettier
// .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error'
  }
}
```

---

## 总结

遵循这些 TypeScript 编码规范可以：

✅ **提高代码质量** - 更少的运行时错误  
✅ **增强可维护性** - 清晰的类型定义和结构  
✅ **改善协作** - 统一的代码风格  
✅ **提升开发体验** - 更好的 IDE 支持和自动补全  
✅ **优化性能** - 编译时优化和类型检查  

记住：**类型安全不是负担，而是保护代码质量的护盾！** 🛡️
