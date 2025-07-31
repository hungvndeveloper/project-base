## Đây là một câu hỏi rất hay và quan trọng để hiểu cách middleware hoạt động trong Express.js. Mình sẽ giải thích rõ ràng từng phần để bạn nắm vững.

### 🔄 Tổng quan về Middleware trong Express.js
#### Middleware là gì?
- Middleware là một hàm có 3 tham số: (req, res, next) dùng để xử lý một số logic trước khi request đi đến hàm xử lý chính.
- Ví dụ: xác thực, kiểm tra dữ liệu, logging, phân quyền,...

#### ✅ Phân tích chi tiết đoạn code bạn đưa
- Router: router.put('/:id', validateObjectId, validateBody(todoUpdateSchema), todoController.updateTodo);
- Nghĩa là:
  - Middleware validateObjectId chạy trước → kiểm tra req.params.id.
  - Middleware validateBody(todoUpdateSchema) chạy tiếp → kiểm tra req.body.
  - Nếu cả 2 đều ok, mới chạy todoController.updateTodo.

- Hàm validateObjectId:
  ```
  function validateObjectId(req, res, next) {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          return res.status(400).json({ message: 'Invalid ID' });
      }
      next(); // Nếu hợp lệ thì tiếp tục
  }
  ```

  - Đây là một middleware đơn giản.
  - Nó kiểm tra id trong params.
  - Nếu sai thì return res.status... và không gọi next(), nên request dừng tại đó.
  - Nếu hợp lệ thì gọi next() để tiếp tục.

- Hàm validateBody(schema)
  ```
  function validateBody(schema) {
      return (req, res, next) => {
          const { error } = schema.validate(req.body);
          if (error) {
              return res.status(400).json({ message: error.details[0].message });
          }
          next(); // hợp lệ thì cho đi tiếp
      };
  }
  ```

  - Đây không phải middleware trực tiếp, mà là một factory function:
      - Nó nhận vào schema và trả về một middleware.
      - Middleware được return có dạng (req, res, next).
  
  📌 Vì vậy: validateBody(todoUpdateSchema) → là một middleware, trả về hàm (req, res, next) cụ thể.

#### ❓Tại sao có chỗ dùng return function(req, res, next) mà chỗ khác chỉ là (req, res, next)?

  | Trường hợp	                        | Mục đích                                                    |
  |-------------------------------------|-------------------------------------------------------------|
  | function(req, res, next)	          | Là một middleware cụ thể, thực thi ngay.                    |
  | return function(req, res, next)	    | Là hàm trả về middleware — khi bạn cần truyền thêm tham số. |

**Ví dụ:**
  - **✅ Middleware đơn:**
    ```
    function logger(req, res, next) {
      console.log(req.url);
      next();
    }
    ```

  - **✅ Middleware cần tham số → phải trả về một middleware:**
    ```
    function validateBody(schema) {
      return function (req, res, next) {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next(); // hợp lệ thì cho đi tiếp
      };
    }
    ```
    → Gọi như này: app.use(validateBody(mySchema)); // phải gọi ra để nhận được middleware

**📌 Kết luận**
  - **validateObjectId: là middleware trực tiếp.**
  - **validateBody(schema): là hàm trả về middleware (vì cần schema làm tham số).**
  - **next() luôn là thứ kích hoạt bước tiếp theo trong chuỗi xử lý. Nếu bạn không gọi next() hoặc không gửi response, request sẽ bị treo.**

---

# 📦 Express Async Middleware Wrapper

## 🧩 Mục đích

Trong Express.js, các hàm xử lý route (`controller`) thường là **async function** để sử dụng `await` với các thao tác như truy vấn database, đọc file, v.v.

Tuy nhiên, nếu bạn không xử lý lỗi bằng `try/catch` trong từng route, khi có lỗi xảy ra (do `await`, hoặc lỗi bất đồng bộ), ứng dụng có thể bị treo hoặc không trả lỗi đúng cách cho client.

### ✅ Giải pháp:
Tạo một **middleware wrapper** để **tự động bắt lỗi** trong các controller async và chuyển lỗi về middleware xử lý lỗi toàn cục.

---

## 🛠️ Hàm Wrapper Cơ Bản

```js
// utils/asyncHandler.js
module.exports = fn => (req, res, next) => {
    return Promise
        .resolve(fn(req, res, next))
        .catch(next);
};
```

### 🧠 Cách hoạt động:

1. Nhận vào một hàm xử lý (`fn`) — có thể là async hoặc không.
2. Trả về một middleware `(req, res, next) => { ... }` theo chuẩn Express.
3. `fn(req, res, next)` được gọi và ép thành Promise (bằng `Promise.resolve()`).
4. Nếu `fn` có lỗi (trong async), `.catch(next)` sẽ đẩy lỗi sang middleware xử lý lỗi cuối cùng.

---

## ✅ Ví dụ sử dụng với Async Function

```js
const asyncHandler = require('./utils/asyncHandler');

app.get('/users/:id', asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) throw new Error('User not found');
    res.json(user);
}));
```

📌 Nếu `User.findById()` bị lỗi hoặc trả về null → `throw` sẽ được `.catch(next)` và đi vào middleware xử lý lỗi.

---

## ⚠️ Trường Hợp Dùng Với Hàm Thường

### Ví dụ 1: Không có lỗi – Vẫn chạy được

```js
app.get('/', asyncHandler((req, res) => {
    res.send('Hello world');
}));
```

✅ Trường hợp này **vẫn chạy tốt**, vì `fn` trả về `undefined` → `Promise.resolve(undefined)` vẫn hợp lệ → không lỗi.

---

### Ví dụ 2: `throw` trong hàm thường – Không bắt được lỗi

```js
app.get('/error', asyncHandler((req, res) => {
    throw new Error('Lỗi đồng bộ!');
}));
```

❌ **Lỗi xảy ra ngay tại thời điểm gọi hàm `fn(...)`**, **trước khi Promise được tạo**, nên `.catch(...)` **không bắt được lỗi** → Express sẽ không xử lý đúng.

---

## ✅ Giải pháp an toàn hơn: Bắt cả lỗi async và lỗi đồng bộ

```js
// utils/asyncHandler.js
module.exports = fn => (req, res, next) => {
    try {
        Promise.resolve(fn(req, res, next)).catch(next);
    } catch (err) {
        next(err); // Bắt được cả lỗi đồng bộ (synchronous error)
    }
};
```

### 📌 Ưu điểm:
- Bắt được lỗi trong cả `async function` và hàm thường (synchronous).
- An toàn hơn, tránh app bị crash vì lỗi không được xử lý.

---

## 🧪 So sánh các trường hợp

| Trường hợp                        | Wrapper gốc bắt được? | Wrapper an toàn bắt được? |
|----------------------------------|------------------------|----------------------------|
| `async function`                 | ✅ Có                 | ✅ Có                     |
| Hàm thường (không lỗi)           | ✅ Không cần thiết     | ✅ Không cần thiết         |
| Hàm thường có `throw`            | ❌ Không               | ✅ Có                     |

---

## 🧩 Middleware xử lý lỗi mẫu

Để middleware hoạt động hiệu quả, bạn cần thêm middleware xử lý lỗi vào cuối các route:

```js
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message || 'Internal Server Error' });
});
```

---

## 🎯 Kết luận

- Hàm wrapper giúp đơn giản hóa controller `async` mà vẫn đảm bảo xử lý lỗi đúng cách.
- Dùng phiên bản wrapper có `try/catch` để đảm bảo bắt được cả lỗi đồng bộ.
- Tránh dùng wrapper cho các route thuần synchronous không có khả năng `throw`.

```js
// Nên dùng cho các route async
app.get('/data', asyncHandler(async (req, res) => {
    const data = await fetchData();
    res.json(data);
}));
```

---
