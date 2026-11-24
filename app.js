/* =========================================================
   Мобильный тренажёр «Слепая печать и синтаксис»
   Автономное PWA-приложение. Данные хранятся в localStorage.
   ========================================================= */

'use strict';

/* ---------- Учебные данные ---------- */
const LANGS = {
  python: {
    name: 'Python',
    tokens: {
      1: ['print("hello")', 'x = 10', 'if x > 5:', 'for i in range(10):', 'def main():', 'return True', 'import os', 'from math import sqrt', 'x += 1', 'len(items)', 'items.append(x)', 'd = {}', 'd["key"] = 1', '# comment', 'None', 'True', 'False', 'elif x == 0:', 'else:', 'while n > 0:', 'str(x)', 'int("42")', 'f"{name}"', 'isinstance(x, int)'],
      2: ['class User:', 'def __init__(self, name):', 'self.name = name', '@property', '@staticmethod', 'try:', 'except ValueError as e:', 'finally:', 'raise ValueError("bad")', '[x for x in items if x > 0]', '{k: v for k, v in pairs}', 'lambda x: x * 2', 'sorted(items, key=str.lower)', 'enumerate(items)', 'zip(a, b)', 'json.loads(text)', 'json.dumps(data)', 'pathlib.Path("data")', 'dict.get("key", 0)', 'is not None', 'not x', '**kwargs', 'async def fetch():', 'await response.json()', 'yield x'],
      3: ['@dataclass', '@lru_cache(maxsize=128)', 'async with session.get(url) as r:', 'async for chunk in stream:', 'Optional[str]', '-> dict[str, int]', 'defaultdict(list)', 'suppress(FileNotFoundError)', 'reduce(lambda a, b: a + b, items)', 're.match(r"^\\d+$", text)', 'asyncio.gather(t1, t2)', 'inspect.signature(func)', '@abstractmethod', 'logging.getLogger(__name__)', 'raise RuntimeError("failed") from e', 'asdict(obj)', 'typing.TypeVar("T")', 'Protocol', 'functools.wraps(func)', 'contextmanager']
    },
    code: {
      1: ['print("Hello, world!")', 'total = sum(prices)', 'if user.is_active: print(user.name)', 'for file in os.listdir("."): print(file)', 'numbers = [int(x) for x in input().split()]', 'def square(n): return n * n', 'name = input("Name: ").strip()', 'with open("data.txt", encoding="utf-8") as f: text = f.read()', 'result = {"ok": True, "count": len(items)}', 'print(f"{name}: {score}")'],
      2: ['data = json.loads(response.text)', 'values = [x.value for x in items if x.active]', 'user = int(raw) if raw.isdigit() else 0', 'sorted(users, key=lambda u: u.created_at, reverse=True)', 'config = dict.fromkeys(["host", "port"], "")', 'if not path.exists(): path.mkdir(parents=True)', 'headers = {"Authorization": f"Bearer {token}"}', 'for key, value in config.items(): print(key, value)', 'result = [x for x in range(1, 11) if x % 2 == 0]', 'payload = {k: v for k, v in pairs if v is not None}'],
      3: ['with ThreadPoolExecutor(max_workers=4) as pool: results = list(pool.map(fetch, urls))', 'async def get_user(user_id): return await db.fetch_one(user_id)', 'data = {k: v for k, v in payload.items() if v is not None}', 'client = httpx.Client(base_url=BASE_URL, timeout=10)', 'model = UserModel(**payload).dict(exclude={"password"})', 'logger.exception("Failed to load %s", path)', 'return [row["id"] for row in rows if row.get("active")]', 'with suppress(KeyError): del cache[key]', 'asyncio.run(main())', 'current = asyncio.current_task()']
    }
  },
  javascript: {
    name: 'JavaScript',
    tokens: {
      1: ['console.log("hi")', 'let x = 10;', 'const y = 2;', 'if (x > 0) {', '}', 'function add(a, b) {', 'return a + b;', 'for (let i = 0; i < 10; i++) {', 'arr.push(x);', 'obj.name', 'true', 'false', 'null', 'typeof x', '==', '===', '&&', '||', 'let sum = 0;', 'const items = [];', 'x += 1;'],
      2: ['=>', 'const f = x => x * 2;', 'arr.map(x => x.id)', 'arr.filter(x => x > 0)', 'arr.reduce((a, b) => a + b, 0)', 'obj?.prop', 'x ?? 0', '...args', '`Hello ${name}`', 'new Date()', 'JSON.parse(text)', 'JSON.stringify(data)', 'Promise.resolve(x)', 'catch (e) {', 'throw new Error("bad");', 'Object.keys(obj)', 'Object.values(obj)', 'Array.isArray(arr)', 'let { id, name } = user;', 'import React from "react";', 'export const config = {};'],
      3: ['async function load() {', 'await fetch(url)', 'Promise.all([a, b])', 'export default class User {', '??=', '?.()', 'structuredClone(data)', 'new Intl.NumberFormat("ru-RU")', 'new AbortController()', 'queueMicrotask(fn)', 'Object.freeze(config)', 'Reflect.ownKeys(obj)', 'new Proxy(target, handler)', 'Symbol.iterator', 'new Map()', 'new Set()', 'for (const [k, v] of map) {', 'import.meta.url', 'process.env.NODE_ENV', 'await import("./module.js")']
    },
    code: {
      1: ['const sum = prices.reduce((a, b) => a + b, 0);', 'console.log("User:", user.name);', 'function add(a, b) { return a + b; }', 'if (user.age >= 18) { user.canVote = true; }', 'for (let i = 0; i < items.length; i++) console.log(items[i]);', 'const names = users.map(u => u.name);', 'document.querySelector("#app").textContent = message;', 'const total = items.length * price;', 'let counter = 0; counter += 1;', 'const enabled = flag === true;'],
      2: ['const active = users.filter(u => u.isActive).map(u => u.email);', 'const config = { host: "localhost", port: 8080 };', 'try { JSON.parse(raw); } catch (e) { console.error(e); }', 'const user = { id: 1, name: "Ann", role: "admin" };', 'setTimeout(() => console.log("done"), 1000);', 'const copy = { ...defaults, ...options };', 'if (!res.ok) throw new Error("Request failed");', 'localStorage.setItem("token", token);', 'const ids = new Set(items.map(item => item.id));', 'export default function calculate(value) { return value * 2; }'],
      3: ['const res = await fetch("/api/users", { headers: { Authorization: `Bearer ${token}` } });', 'export const getUser = async id => (await db.query("SELECT * FROM users WHERE id = ?", [id])).rows[0];', 'const result = await Promise.allSettled(tasks.map(t => t.run()));', 'app.use((err, req, res, next) => res.status(500).json({ error: err.message }));', 'const controller = new AbortController(); fetch(url, { signal: controller.signal });', 'module.exports = { createUser, findUser, deleteUser };', 'const [{ id }] = await db.query("SELECT id FROM users LIMIT 1");', 'const cache = new Map(); cache.set(key, value);', 'process.on("SIGTERM", () => server.close());', 'const clone = structuredClone(payload);']
    }
  },
  java: {
    name: 'Java',
    tokens: {
      1: ['public class Main {', '}', 'public static void main(String[] args) {', 'System.out.println("Hi");', 'int x = 5;', 'if (x > 0) {', 'return;', 'return x;', 'String s = "test";', 'new Scanner(System.in)', 'args.length', 'null', 'true', '==', '&&', 'for (int i = 0; i < n; i++) {', 'final int N = 10;', 'private int count;', 'void run() {', 'import java.util.List;'],
      2: ['public class User {', 'private final String name;', 'public User(String name) {', 'this.name = name;', '@Override', 'public String toString() {', 'List<String> list = new ArrayList<>();', 'Map<String, Integer> map = new HashMap<>();', 'Optional.ofNullable(x).orElse(0)', 'Objects.requireNonNull(value)', 'String.join(", ", items)', 's.equals("test")', 's.isEmpty()', 'list.add(value)', 'list.stream()', 'Collectors.toList()', 'try {', '} catch (IOException e) {', 'throw new IllegalArgumentException("bad");', 'import java.util.Map;', 'int port = 8080;'],
      3: ['public <T> T find(Class<T> type, int id) {', 'CompletableFuture.supplyAsync(() -> load())', 'try (Stream<String> lines = Files.lines(path)) {', 'StandardCharsets.UTF_8', 'Files.readString(path, UTF_8)', '"\\\\s+"', 'String.format("%s: %d", name, count)', 'new BigDecimal("19.99")', 'LocalDateTime.now()', 'Duration.ofSeconds(30)', '@Transactional', '@Autowired', '@RestController', '@GetMapping("/users")', 'ResponseEntity.ok(list)', 'logger.info("Loaded {} users", size)', 'parallelStream()', 'Objects.equals(a, b)', 'Collectors.groupingBy(User::getRole)', 'PageRequest.of(page, size)']
    },
    code: {
      1: ['System.out.println("Hello, world!");', 'int sum = a + b;', 'if (score >= 60) { passed = true; }', 'for (int i = 0; i < 10; i++) { total += i; }', 'String greeting = "Hello, " + name;', 'List<String> names = Arrays.asList("Ann", "Bob");', 'int max = Math.max(a, b);', 'boolean valid = email != null && !email.isEmpty();', 'double average = (double) sum / items.size();', 'user.setName(input.trim());'],
      2: ['List<String> active = users.stream().filter(User::isActive).map(User::getEmail).collect(Collectors.toList());', 'Map<String, Integer> counts = new HashMap<>();', 'Optional<User> user = repository.findById(id);', 'String result = String.join(", ", names);', 'try { Files.readString(path); } catch (IOException e) { logger.error("read failed", e); }', 'Objects.requireNonNull(config, "config");', 'int port = Integer.parseInt(System.getenv("PORT"));', 'Collections.sort(items, Comparator.comparing(Item::getName));', 'if (!s.isBlank()) { list.add(s.trim()); }', 'return users.stream().mapToInt(User::getAge).sum();'],
      3: ['users.stream().collect(Collectors.groupingBy(User::getRole, Collectors.counting()));', 'CompletableFuture<User> future = CompletableFuture.supplyAsync(() -> service.load(id));', 'try (BufferedReader reader = Files.newBufferedReader(path, UTF_8)) { return reader.lines().count(); }', '@GetMapping("/users/{id}") public User get(@PathVariable long id) { return service.find(id); }', 'BigDecimal total = items.stream().map(Item::getPrice).reduce(BigDecimal.ZERO, BigDecimal::add);', 'ResponseEntity.ok(service.findAll(PageRequest.of(page, size)));', 'String normalized = input.trim().replaceAll("\\\\s+", " ");', 'LOCK.lock(); try { cache.put(key, value); } finally { LOCK.unlock(); }', 'return Optional.ofNullable(map.get(id)).orElseThrow();', 'timer.scheduleAtFixedRate(task, 0, 1000);']
    }
  },
  cpp: {
    name: 'C++',
    tokens: {
      1: ['#include <iostream>', 'int main() {', 'return 0;', 'std::cout <<', '<< std::endl;', 'int x = 5;', 'if (x > 0) {', '}', 'std::cin >> x;', 'std::string s = "abc";', "char c = 'a';", 'for (int i = 0; i < n; i++) {', 'x += 1;', 'bool ok = true;', 'nullptr', 'const int N = 10;', '#include <vector>', 'using namespace std;', 'double pi = 3.14;', 'auto value = 42;'],
      2: ['std::vector<int> v;', 'for (auto x : v) {', 'const int n = 10;', 'v.push_back(x);', 'v.size()', 'std::map<std::string, int> m;', 'm["key"] = 1;', 'std::unique_ptr<int> p = std::make_unique<int>(5);', 'new int[5]', 'delete[] p;', '==', '&&', 'std::sort(v.begin(), v.end());', 'std::find(v.begin(), v.end(), x)', 'std::to_string(n)', 'struct Point {', 'public:', 'std::pair<int, int> p;', '#include <algorithm>', 'std::string name = "Ann";'],
      3: ['template <typename T> T max(T a, T b) {', 'std::shared_ptr<User> u = std::make_shared<User>();', 'auto f = [](int x) { return x * 2; };', 'std::lock_guard<std::mutex> lock(mtx);', 'std::optional<int> value = get();', 'std::filesystem::path p("data.txt");', 'std::chrono::steady_clock::now()', 'std::thread t(fn); t.join();', 'std::function<void(int)> cb;', 'std::move(value)', 'std::array<int, 3> a = {1, 2, 3};', 'std::unordered_map<std::string, int> cache;', 'std::numeric_limits<int>::max()', 'std::accumulate(v.begin(), v.end(), 0)', 'std::enable_if_t<true, int>', 'std::string_view sv = "text";', '#include <optional>', 'constexpr int k = 10;', 'std::atomic<int> counter{0};', 'std::reverse(v.begin(), v.end());']
    },
    code: {
      1: ['std::cout << "Hello, world!" << std::endl;', 'int sum = a + b;', 'if (x > 0) { x = -x; }', 'for (int i = 0; i < 10; ++i) { std::cout << i; }', 'std::vector<int> v = {1, 2, 3};', 'std::string name = "Ann";', 'int value = std::stoi(text);', 'bool ready = x != 0 && y != 0;', 'auto squared = x * x;', 'std::cin >> age;'],
      2: ['std::sort(v.begin(), v.end());', 'for (const auto& item : items) { std::cout << item.name << std::endl; }', 'auto it = std::find(v.begin(), v.end(), target);', 'std::map<std::string, int> counts; counts["a"] = 1;', 'std::unique_ptr<int> p = std::make_unique<int>(42);', 'std::string joined = s1 + " " + s2;', 'if (ptr != nullptr) { ptr->run(); }', 'std::vector<int> evens; for (int x : v) if (x % 2 == 0) evens.push_back(x);', 'std::string upper = std::toupper(c);', 'v.erase(std::remove(v.begin(), v.end(), 0), v.end());'],
      3: ['auto sum = std::accumulate(v.begin(), v.end(), 0);', 'std::lock_guard<std::mutex> lock(mutex_);', 'auto result = std::max_element(v.begin(), v.end());', 'std::optional<int> parsed = parse(input);', 'std::transform(v.begin(), v.end(), v.begin(), [](int x) { return x * 2; });', 'std::filesystem::create_directories(path.parent_path());', 'std::shared_ptr<User> user = std::make_shared<User>("Ann");', 'std::sort(users.begin(), users.end(), [](const User& a, const User& b) { return a.age < b.age; });', 'std::atomic<int> counter{0}; counter.fetch_add(1);', 'auto now = std::chrono::steady_clock::now();']
    }
  },
  sql: {
    name: 'SQL',
    tokens: {
      1: ['SELECT * FROM users;', 'SELECT id, name FROM users;', 'WHERE age > 18', "INSERT INTO users (name) VALUES ('Ann');", 'UPDATE users SET active = 1;', "DELETE FROM orders WHERE id = 5;", 'LIMIT 10;', 'ORDER BY created_at DESC;', 'COUNT(*)', 'AS total', 'GROUP BY role', 'IS NOT NULL', "LIKE '%ann%'", 'AND', 'OR', 'NOT', 'DISTINCT', 'IN (1, 2, 3)', 'BETWEEN 1 AND 10;', 'SELECT NOW();'],
      2: ['SELECT u.name, o.total FROM users u JOIN orders o ON u.id = o.user_id;', 'LEFT JOIN', 'INNER JOIN', 'ON u.id = o.user_id', 'GROUP BY', 'HAVING COUNT(*) > 1', 'ORDER BY total DESC LIMIT 5;', 'COALESCE(price, 0)', 'SUM(amount)', 'AVG(score)', 'MAX(created_at)', 'CASE WHEN active THEN 1 ELSE 0 END', 'EXISTS (SELECT 1 FROM logs)', 'UNION ALL', 'WITH recent AS (', 'PRIMARY KEY', 'FOREIGN KEY', 'AUTO_INCREMENT', 'DEFAULT 0', 'CHECK (age >= 0)'],
      3: ['CREATE TABLE users (id INT PRIMARY KEY, email VARCHAR(255) UNIQUE);', 'ALTER TABLE users ADD COLUMN created_at TIMESTAMP;', 'CREATE INDEX idx_users_email ON users (email);', 'SELECT * FROM orders WHERE user_id IN (SELECT id FROM users WHERE active = 1);', 'INSERT INTO logs (user_id, action) VALUES (?, ?);', 'UPDATE inventory SET qty = qty - ? WHERE sku = ?;', 'SELECT role, COUNT(*) AS cnt FROM users GROUP BY role HAVING cnt > 5;', 'DELETE FROM sessions WHERE expires_at < NOW();', 'TRUNCATE TABLE cache;', 'BEGIN TRANSACTION;', 'COMMIT;', 'ROLLBACK;', 'GRANT SELECT ON users TO reader;', 'EXPLAIN ANALYZE SELECT * FROM users;', 'CREATE VIEW active_users AS SELECT * FROM users WHERE active = 1;', 'DROP TABLE IF EXISTS tmp;', 'SERIAL', 'REFERENCES users(id)', 'ON CONFLICT DO NOTHING;', 'RETURNING id;']
    },
    code: {
      1: ['SELECT name, email FROM users WHERE active = 1;', "INSERT INTO users (name, email) VALUES ('Ann', 'ann@example.com');", 'UPDATE users SET last_login = NOW() WHERE id = 5;', 'DELETE FROM cart WHERE user_id = 5;', "SELECT COUNT(*) FROM orders WHERE status = 'paid';", 'SELECT * FROM products ORDER BY price DESC LIMIT 10;', 'SELECT id FROM users WHERE email IS NOT NULL;', "SELECT * FROM logs WHERE action LIKE '%login%';", 'SELECT MIN(price), MAX(price) FROM products;', 'SELECT DISTINCT category FROM products;'],
      2: ['SELECT u.name, COUNT(o.id) AS orders FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.name;', 'SELECT * FROM orders WHERE total BETWEEN 100 AND 500 ORDER BY created_at DESC;', 'SELECT DISTINCT role FROM users WHERE active = 1;', "UPDATE products SET price = price * 1.1 WHERE category = 'sale';", "SELECT name FROM users WHERE email LIKE '%@gmail.com';", 'SELECT user_id, SUM(total) FROM orders GROUP BY user_id HAVING SUM(total) > 1000;', 'SELECT COALESCE(discount, 0) AS discount FROM orders;', "SELECT * FROM users WHERE created_at >= '2026-01-01';", 'SELECT role, AVG(score) FROM users GROUP BY role ORDER BY role;', 'SELECT * FROM products WHERE stock > 0 AND price < 100;'],
      3: ['WITH active AS (SELECT id FROM users WHERE active = 1) SELECT o.* FROM orders o JOIN active a ON o.user_id = a.id;', 'CREATE TABLE sessions (id SERIAL PRIMARY KEY, user_id INT REFERENCES users(id), token TEXT UNIQUE);', 'EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 42;', "INSERT INTO logs (user_id, action) SELECT id, 'login' FROM users WHERE last_login IS NOT NULL;", 'ALTER TABLE users ADD CONSTRAINT users_email_key UNIQUE (email);', "SELECT date_trunc('day', created_at) AS day, COUNT(*) FROM orders GROUP BY day ORDER BY day;", 'SELECT * FROM orders WHERE user_id IN (SELECT id FROM users WHERE active = 1) ORDER BY total DESC LIMIT 20;', 'UPDATE inventory SET qty = qty - 1 WHERE sku = ? RETURNING qty;', 'SELECT u.name FROM users u WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);', 'CREATE INDEX idx_orders_user ON orders (user_id, created_at DESC);']
    }
  }
};

const KEY_GROUPS = {
  1: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'asdf', 'jkl;', 'fjkd', 'asl;', 'sad;', 'fkjl', 'lka;', 'jfkd', 'adas', 'kjkl', 'sfjl', 'dk;l'],
  2: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'qwer', 'tyui', 'poiu', 'zxcv', 'mnbv', 'asdfgh', 'qwerty', 'poiuy', 'mnbvc', 'lkjh', 'wert', 'uiop', 'zxc', 'bnm'],
  3: ['()', '{}', '[]', '<>', '==', '!=', '>=', '<=', '&&', '||', '/*', '*/', '::', '->', '=>', '?', '~', '++', '--', '+=', '-=', '**', '//', '::=', '</>', '${}', '#!', '@', '\\', '|']
};

const LEVELS = { 1: 'Уровень 1', 2: 'Уровень 2', 3: 'Уровень 3' };
const TIMES = [30, 60, 120];

const ACHIEVEMENTS = [
  { id: 'first', icon: '01', name: 'Первый шаг', desc: 'Завершить первое занятие' },
  { id: 'speed50', icon: '02', name: 'Разгон', desc: '50 символов в минуту' },
  { id: 'speed100', icon: '03', name: 'Скорость', desc: '100 символов в минуту' },
  { id: 'acc95', icon: '04', name: 'Точно', desc: 'Точность 95% и выше' },
  { id: 'code10', icon: '05', name: 'Практик', desc: '10 занятий в режиме «Код»' },
  { id: 'syntax20', icon: '06', name: 'Знаток синтаксиса', desc: '20 занятий в режиме «Синтаксис»' },
  { id: 'week', icon: '07', name: 'Неделя подряд', desc: 'Заниматься 7 дней подряд' }
];

/* ---------- Хранилище: локальный кэш + IndexedDB ---------- */
const KEY = 'blindtype_v1';
const AUTH_KEY = 'blindtype_auth';
const DB_NAME = 'blindtype_db';
const DB_VERSION = 1;
const DEFAULT_STATE = {
  sessions: [],
  problemKeys: {},
  achievements: [],
  settings: { lang: 'python', level: 1, time: 60 }
};

let db = null;
let currentUser = null;

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_STATE));
    const s = JSON.parse(raw);
    return Object.assign(JSON.parse(JSON.stringify(DEFAULT_STATE)), s);
  } catch (e) {
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }
}

function save() {
  localStorage.setItem(KEY, JSON.stringify(state));
  if (currentUser && db) saveProfile(currentUser, state).catch(() => {});
}

function openDB() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) return reject(new Error('IndexedDB недоступен'));
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const d = req.result;
      if (!d.objectStoreNames.contains('users')) {
        d.createObjectStore('users', { keyPath: 'login' });
      }
      if (!d.objectStoreNames.contains('profiles')) {
        d.createObjectStore('profiles', { keyPath: 'userId' });
      }
    };
    req.onsuccess = () => { db = req.result; resolve(db); };
    req.onerror = () => reject(req.error);
  });
}

function tx(store, mode, fn) {
  return new Promise((resolve, reject) => {
    const t = db.transaction(store, mode);
    const r = fn(t.objectStore(store));
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}

const getUser = login => tx('users', 'readonly', s => s.get(login));
const addUser = rec => tx('users', 'readwrite', s => s.put(rec));
const getProfile = userId => tx('profiles', 'readonly', s => s.get(userId));
const saveProfile = (userId, data) => tx('profiles', 'readwrite', s => s.put({ userId, data }));

function toHex(buf) {
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hashPassword(password, saltHex) {
  if (!window.crypto || !crypto.subtle) {
    throw new Error('Браузер не поддерживает защищённое хранение паролей');
  }
  const enc = new TextEncoder();
  const salt = saltHex
    ? new Uint8Array(saltHex.match(/../g).map(h => parseInt(h, 16)))
    : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' }, key, 256
  );
  return { salt: toHex(salt), hash: toHex(bits) };
}

let state = load();
let session = null;
let timerId = null;

/* ---------- Аутентификация ---------- */
function authError(msg) {
  const el = $('authError');
  el.textContent = msg || '';
  el.classList.toggle('show', !!msg);
}

function setAuthTab(mode) {
  document.querySelectorAll('.auth-tab').forEach(b =>
    b.classList.toggle('active', b.dataset.auth === mode));
  $('confirmWrap').classList.toggle('hidden', mode !== 'register');
  $('btnAuth').textContent = mode === 'register' ? 'СОЗДАТЬ АККАУНТ' : 'ВОЙТИ';
  $('page-auth').dataset.mode = mode;
  authError('');
}

async function restoreUser(login) {
  currentUser = login;
  const prof = await getProfile(login);
  state = prof
    ? Object.assign(JSON.parse(JSON.stringify(DEFAULT_STATE)), prof.data)
    : JSON.parse(JSON.stringify(DEFAULT_STATE));
  localStorage.setItem(KEY, JSON.stringify(state));
  $('statusUser').textContent = login.toUpperCase();
  document.body.classList.remove('auth-mode');
  showPage('home');
}

async function doLogin(login, password) {
  login = login.trim();
  const u = await getUser(login);
  if (!u) throw new Error('Пользователь с таким логином не найден');
  const { hash } = await hashPassword(password, u.salt);
  if (hash !== u.hash) throw new Error('Неверный пароль');
  const token = toHex(crypto.getRandomValues(new Uint8Array(16)));
  await addUser(Object.assign({}, u, { token }));
  localStorage.setItem(AUTH_KEY, JSON.stringify({ login, token }));
  await restoreUser(login);
}

async function doRegister(login, password, password2) {
  login = login.trim();
  if (login.length < 3) throw new Error('Логин должен быть не короче 3 символов');
  if (password.length < 6) throw new Error('Пароль должен быть не короче 6 символов');
  if (password !== password2) throw new Error('Пароли не совпадают');
  if (await getUser(login)) throw new Error('Этот логин уже занят');

  const { salt, hash } = await hashPassword(password);
  await addUser({ login, salt, hash, createdAt: new Date().toISOString() });

  let data = JSON.parse(JSON.stringify(DEFAULT_STATE));
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const anon = JSON.parse(raw);
      if (anon.sessions && anon.sessions.length) data = anon;
    }
  } catch (e) {}
  await saveProfile(login, data);
  await doLogin(login, password);
}

function doLogout() {
  currentUser = null;
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(KEY);
  state = JSON.parse(JSON.stringify(DEFAULT_STATE));
  $('statusUser').textContent = 'ГОСТЬ';
  $('authLogin').value = '';
  $('authPass').value = '';
  $('authPass2').value = '';
  document.body.classList.add('auth-mode');
  showPage('auth');
  setAuthTab('login');
}

async function initAuth() {
  try {
    await openDB();
  } catch (e) {
    authError('Не удалось открыть базу данных браузера');
    return;
  }
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      const u = await getUser(saved.login);
      if (u && u.token === saved.token) {
        await restoreUser(saved.login);
        return;
      }
    }
  } catch (e) {}
  document.body.classList.add('auth-mode');
  showPage('auth');
  setAuthTab('login');
}

/* ---------- Утилиты ---------- */
const $ = id => document.getElementById(id);
const today = () => new Date().toISOString().slice(0, 10);
const rand = arr => arr[Math.floor(Math.random() * arr.length)];

function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  $('page-' + name).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const nav = document.querySelector('[data-page="' + name + '"]');
  if (nav) nav.classList.add('active');
  if (name === 'stats') renderStats();
  if (name === 'achievements') renderAchievements();
  if (name === 'settings') renderSettings();
  if (name === 'home') renderHome();
}

/* ---------- Генерация задания ---------- */
/* Последние задания запоминаются, чтобы один и тот же фрагмент
   не попадался снова в нескольких занятиях подряд. */
const recentItems = {};

function pickFresh(pool, used, key) {
  const recent = recentItems[key] || [];
  let candidates = pool.filter(x => !used.has(x) && !recent.includes(x));
  if (!candidates.length) candidates = pool.filter(x => !used.has(x));
  if (!candidates.length) candidates = pool.filter(x => !recent.includes(x));
  if (!candidates.length) candidates = pool.slice();
  return rand(candidates);
}

function rememberItems(key, used) {
  const limit = key.indexOf('code') === 0 ? 9 : 12;
  const prev = recentItems[key] || [];
  recentItems[key] = prev.concat(Array.from(used)).slice(-limit);
}

function buildExercise(mode) {
  const lang = state.settings.lang;
  const lvl = state.settings.level;
  const rk = mode === 'keys' ? 'keys-' + lvl : mode + '-' + lang + '-' + lvl;
  const problems = Object.keys(state.problemKeys).filter(k => state.problemKeys[k] >= 2);
  const used = new Set();
  const parts = [];

  if (mode === 'keys') {
    const pool = KEY_GROUPS[lvl].slice();
    if (problems.length) pool.push(...problems.filter(p => p.length <= 4));
    for (let i = 0; i < 30; i++) {
      const item = pickFresh(pool, used, rk);
      used.add(item);
      parts.push(item);
    }
    rememberItems(rk, used);
    return parts.join(' ');
  }

  if (mode === 'syntax') {
    const pool = LANGS[lang].tokens[lvl].slice();
    if (problems.length) {
      pool.forEach(p => problems.forEach(k => { if (p.includes(k)) pool.push(p); }));
    }
    for (let i = 0; i < 22; i++) {
      const item = pickFresh(pool, used, rk);
      used.add(item);
      parts.push(item);
    }
    rememberItems(rk, used);
    return parts.join(' ');
  }

  const pool = LANGS[lang].code[lvl];
  const first = pickFresh(pool, used, rk);
  used.add(first);
  let text = first;
  if (state.settings.time >= 120 && pool.length > 1) {
    const second = pickFresh(pool, used, rk);
    used.add(second);
    text += ' ' + second;
  }
  rememberItems(rk, used);
  return text;
}

/* ---------- Тренировка ---------- */
function startTraining(mode) {
  const expected = buildExercise(mode);
  session = {
    mode, expected, pos: 0, typed: 0, correct: 0, errors: 0,
    started: 0, remaining: state.settings.time, finished: false,
    wrongKeys: {}
  };
  $('trainLang').textContent = LANGS[state.settings.lang].name;
  $('trainLevel').textContent = LEVELS[state.settings.level];
  $('hudWpm').textContent = '0';
  $('hudAcc').textContent = '100%';
  $('hudTime').textContent = session.remaining;
  $('hintLine').textContent = '';
  $('keyboardTip').textContent = 'Начните печатать — таймер запустится сам';
  $('typeInput').value = '';
  $('typeInput').disabled = false;
  renderText();
  showPage('train');
  setTimeout(() => $('typeInput').focus(), 100);
}

function renderText() {
  const view = $('textView');
  view.innerHTML = '';
  const exp = session.expected;
  for (let i = 0; i < exp.length; i++) {
    const span = document.createElement('span');
    span.className = 'ch';
    span.textContent = exp[i];
    if (i < session.pos) span.classList.add(session.lastWrong && session.lastWrongIndex === i ? 'wrong' : 'done');
    else if (i === session.pos) span.classList.add('cur');
    view.appendChild(span);
  }
  const cur = view.querySelector('.cur');
  if (cur) {
    const box = $('textCard').getBoundingClientRect();
    const r = cur.getBoundingClientRect();
    if (r.bottom > box.bottom - 10 || r.top < box.top + 10) {
      cur.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }
}

function onInput(e) {
  if (!session || session.finished) return;
  const val = e.target.value;
  if (!session.started) {
    session.started = Date.now();
    timerId = setInterval(tick, 1000);
    $('keyboardTip').textContent = 'Не смотрите на клавиатуру';
  }
  const exp = session.expected;
  session.pos = Math.min(val.length, exp.length);
  session.typed = val.length;

  let correct = 0;
  for (let i = 0; i < session.pos; i++) {
    if (val[i] === exp[i]) correct++;
    else { session.wrongKeys[exp[i]] = (session.wrongKeys[exp[i]] || 0) + 1; }
  }
  session.correct = correct;
  session.errors = session.pos - correct;
  session.lastWrong = session.errors > 0;
  session.lastWrongIndex = session.errors > 0 ? val.length - 1 : -1;

  updateHud();
  renderText();

  if (session.pos >= exp.length) finish('done');
}

function tick() {
  if (!session || session.finished) return;
  session.remaining--;
  $('hudTime').textContent = Math.max(0, session.remaining);
  updateHud();
  if (session.remaining <= 0) finish('time');
}

function updateHud() {
  const mins = Math.max((Date.now() - session.started) / 60000, 1 / 60);
  const wpm = Math.round(session.correct / mins);
  const acc = session.typed ? Math.round(session.correct / session.typed * 100) : 100;
  $('hudWpm').textContent = isFinite(wpm) ? wpm : 0;
  $('hudAcc').textContent = acc + '%';
}

function finish(reason) {
  if (session.finished) return;
  session.finished = true;
  clearInterval(timerId);
  $('typeInput').disabled = true;

  const elapsed = Math.max((Date.now() - session.started) / 1000, 1);
  const wpm = Math.round(session.correct / (elapsed / 60));
  const acc = session.typed ? Math.round(session.correct / session.typed * 100) : 0;

  const rec = {
    date: today(), wpm: isFinite(wpm) ? wpm : 0, acc,
    mode: session.mode, lang: state.settings.lang,
    level: state.settings.level, seconds: Math.round(elapsed)
  };
  state.sessions.push(rec);

  Object.entries(session.wrongKeys).forEach(([k, v]) => {
    state.problemKeys[k] = (state.problemKeys[k] || 0) + v;
  });

  const newAch = checkAchievements(rec);
  save();

  $('resWpm').textContent = rec.wpm;
  $('resAcc').textContent = rec.acc + '%';
  $('resTime').textContent = rec.seconds;
  $('resultMark').textContent = acc >= 95 ? '> ОТЛИЧНО' : (wpm >= 50 ? '> ХОРОШО' : '> ГОТОВО');
  $('resultNote').textContent = newAch.length
    ? 'Новое достижение: ' + newAch.map(a => a.name).join(', ')
    : (reason === 'time' ? 'Время вышло. Продолжайте тренироваться!' : 'Отличная работа!');
  $('resultModal').classList.add('show');
}

function checkAchievements(rec) {
  const got = [];
  const has = id => state.achievements.includes(id);
  const add = id => { if (!has(id)) { state.achievements.push(id); got.push(ACHIEVEMENTS.find(a => a.id === id)); } };

  if (state.sessions.length >= 1) add('first');
  if (rec.wpm >= 50) add('speed50');
  if (rec.wpm >= 100) add('speed100');
  if (rec.acc >= 95) add('acc95');
  if (state.sessions.filter(s => s.mode === 'code').length >= 10) add('code10');
  if (state.sessions.filter(s => s.mode === 'syntax').length >= 20) add('syntax20');
  if (calcStreak() >= 7) add('week');
  return got;
}

function calcStreak() {
  const days = [...new Set(state.sessions.map(s => s.date))].sort().reverse();
  if (!days.length) return 0;
  let d = new Date(days[0] + 'T00:00:00'), n = 0;
  const cur = new Date(today() + 'T00:00:00');
  if ((cur - d) / 86400000 > 1) return 0;
  for (const day of days) {
    const x = new Date(day + 'T00:00:00');
    if ((d - x) / 86400000 > 1) break;
    n++; d = x;
  }
  return n;
}

/* ---------- Экраны ---------- */
function renderHome() {
  const todaySessions = state.sessions.filter(s => s.date === today());
  const minutes = Math.round(todaySessions.reduce((a, s) => a + s.seconds, 0) / 60);
  $('goalNow').textContent = minutes;
  $('goalBar').style.width = Math.min(100, minutes / 5 * 100) + '%';
  $('streakValue').textContent = calcStreak();

  const last = state.sessions.slice(-1)[0];
  $('homeWpm').textContent = last ? last.wpm : 0;
  $('homeAcc').textContent = last ? last.acc + '%' : '0%';
  $('homeSessions').textContent = state.sessions.length;
}

function renderStats() {
  const data = state.sessions.slice(-10).map(s => s.wpm);
  const c = $('chart'), ctx = c.getContext('2d');
  ctx.clearRect(0, 0, c.width, c.height);
  if (!data.length) {
    ctx.fillStyle = '#78838f'; ctx.font = '18px Arial'; ctx.textAlign = 'center';
    ctx.fillText('Нет данных', c.width / 2, c.height / 2);
    return;
  }
  const max = Math.max(...data, 10) * 1.2;
  const bw = c.width / data.length;
  data.forEach((v, i) => {
    const h = (v / max) * (c.height - 40);
    ctx.fillStyle = '#2f7de1';
    ctx.fillRect(i * bw + 8, c.height - 25 - h, bw - 16, h);
    ctx.fillStyle = '#1b2430'; ctx.font = '14px Arial'; ctx.textAlign = 'center';
    ctx.fillText(v, i * bw + bw / 2, c.height - 32 - h);
    ctx.fillStyle = '#78838f'; ctx.font = '12px Arial';
    ctx.fillText(i + 1, i * bw + bw / 2, c.height - 6);
  });

  const box = $('problemKeys');
  const keys = Object.entries(state.problemKeys).filter(([, v]) => v >= 2)
    .sort((a, b) => b[1] - a[1]).slice(0, 12);
  box.innerHTML = '';
  if (!keys.length) { box.textContent = 'Пока нет данных — потренируйтесь'; return; }
  keys.forEach(([k, v]) => {
    const el = document.createElement('span');
    el.className = 'chip';
    el.textContent = k === ' ' ? 'пробел · ' + v : k + ' · ' + v;
    box.appendChild(el);
  });
}

function renderAchievements() {
  const box = $('achievementList');
  box.innerHTML = '';
  ACHIEVEMENTS.forEach(a => {
    const unlocked = state.achievements.includes(a.id);
    const el = document.createElement('div');
    el.className = 'ach' + (unlocked ? '' : ' locked');
    el.innerHTML = '<div class="ach-icon">' + a.icon + '</div><div><b>' + a.name + '</b><small>' + a.desc + '</small></div>';
    box.appendChild(el);
  });
}

function renderSettings() {
  function fill(container, items, current, onPick) {
    container.innerHTML = '';
    items.forEach(it => {
      const b = document.createElement('button');
      b.className = 'opt' + (it.value === current ? ' sel' : '');
      b.textContent = it.label;
      b.onclick = () => { onPick(it.value); save(); renderSettings(); };
      container.appendChild(b);
    });
  }
  fill($('langOptions'), Object.entries(LANGS).map(([k, v]) => ({ value: k, label: v.name })),
    state.settings.lang, v => state.settings.lang = v);
  fill($('levelOptions'), Object.entries(LEVELS).map(([k, v]) => ({ value: +k, label: v })),
    state.settings.level, v => state.settings.level = v);
  fill($('timeOptions'), TIMES.map(t => ({ value: t, label: t + ' сек' })),
    state.settings.time, v => state.settings.time = v);
}

/* ---------- События ---------- */
document.querySelectorAll('.nav-item').forEach(b => b.onclick = () => showPage(b.dataset.page));
document.querySelectorAll('.mode-btn').forEach(b => b.onclick = () => startTraining(b.dataset.mode));
$('btnBack').onclick = () => { clearInterval(timerId); if (session) session.finished = true; showPage('home'); };
$('btnRestart').onclick = () => startTraining(session ? session.mode : 'syntax');
$('btnSkip').onclick = () => startTraining(session ? session.mode : 'syntax');
$('btnResultOk').onclick = () => { $('resultModal').classList.remove('show'); showPage('home'); };
$('typeInput').addEventListener('input', onInput);
$('btnReset').onclick = () => {
  if (!confirm('Очистить всю статистику?')) return;
  state = JSON.parse(JSON.stringify(DEFAULT_STATE));
  save(); renderStats(); renderHome();
};

$('btnLogout').onclick = () => {
  if (confirm('Выйти из аккаунта?')) doLogout();
};

document.querySelectorAll('.auth-tab').forEach(b => {
  b.onclick = () => setAuthTab(b.dataset.auth);
});

$('btnAuth').onclick = async () => {
  const login = $('authLogin').value;
  const pass = $('authPass').value;
  const pass2 = $('authPass2').value;
  const isReg = $('page-auth').dataset.mode === 'register';
  authError('');
  $('btnAuth').disabled = true;
  try {
    if (isReg) await doRegister(login, pass, pass2);
    else await doLogin(login, pass);
  } catch (e) {
    authError(e.message);
  } finally {
    $('btnAuth').disabled = false;
  }
};

['authLogin', 'authPass', 'authPass2'].forEach(id => {
  $(id).addEventListener('keydown', e => {
    if (e.key === 'Enter') $('btnAuth').click();
  });
});

/* ---------- Регистрация Service Worker ---------- */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

initAuth();
