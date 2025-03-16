# Giải thích về Ứng dụng React Todo với Redux và Router

## Cấu trúc thư mục
```
src/
  ├── components/         # Các component có thể tái sử dụng
  │   ├── Layout.tsx     # Layout chung cho ứng dụng
  │   └── TodoItem.tsx   # Component hiển thị một todo
  ├── pages/             # Các trang trong ứng dụng
  │   ├── TodoPage.tsx   # Trang chính với danh sách todo
  │   └── AboutPage.tsx  # Trang giới thiệu
  ├── store/             # Redux store và slices
  │   ├── index.ts       # Cấu hình store
  │   └── todo/
  │       └── todoSlice.ts # Slice quản lý state của todos
  ├── types/             # Các type definitions
  │   └── todo.types.ts  # Types cho Todo
  ├── App.tsx           # Component gốc với cấu hình routing
  └── main.tsx          # Entry point
```

## React Router DOM
React Router DOM được sử dụng để quản lý routing trong ứng dụng:

1. **Cấu hình Router**:
   - Sử dụng `BrowserRouter` trong `App.tsx`
   - Định nghĩa routes với component `Routes` và `Route`
   - Sử dụng nested routes để tạo layout chung

2. **Layout và Navigation**:
   - Layout chung được áp dụng thông qua `Outlet` component
   - Navigation sử dụng `Link` components từ Material-UI
   - Menu điều hướng nằm trong AppBar

## Redux Toolkit
Redux Toolkit được sử dụng để quản lý state của ứng dụng:

1. **Store Configuration** (`store/index.ts`):
   - Sử dụng `configureStore` để tạo store
   - Kết hợp các reducers từ các slices khác nhau

2. **Todo Slice** (`store/todo/todoSlice.ts`):
   - Sử dụng `createSlice` để tạo reducer và actions
   - Định nghĩa các actions:
     - `addTodo`: Thêm todo mới
     - `toggleTodo`: Chuyển đổi trạng thái hoàn thành
     - `removeTodo`: Xóa todo

3. **Hooks sử dụng**:
   - `useSelector`: Lấy state từ store
   - `useDispatch`: Dispatch actions

## TypeScript Integration
TypeScript được sử dụng để đảm bảo type safety:

1. **Types** (`types/todo.types.ts`):
```typescript
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
```

2. **Component Props**:
   - Định nghĩa interface cho props của components
   - Sử dụng generic types cho hooks Redux

## Material-UI Components
Material-UI được sử dụng để tạo giao diện người dùng:

1. **Layout Components**:
   - `Container`: Giới hạn chiều rộng nội dung
   - `AppBar` và `Toolbar`: Tạo thanh điều hướng
   - `Paper`: Tạo các khối nội dung với đổ bóng

2. **Form Components**:
   - `TextField`: Input cho todo mới
   - `Button`: Các nút tương tác
   - `List` và `ListItem`: Hiển thị danh sách todos

3. **Styling**:
   - Sử dụng `sx` prop cho styling inline
   - Theme system cho màu sắc và spacing nhất quán

## Các tính năng chính

1. **Quản lý Todos**:
   - Thêm todo mới
   - Đánh dấu todo đã hoàn thành
   - Xóa todo

2. **Routing**:
   - Trang chính (/) hiển thị danh sách todos
   - Trang About (/about) hiển thị thông tin ứng dụng

3. **State Management**:
   - Lưu trữ todos trong Redux store
   - State được cập nhật thông qua actions
   - Tự động cập nhật UI khi state thay đổi

## Best Practices

1. **Code Organization**:
   - Tách biệt components, pages, và logic
   - Sử dụng TypeScript để đảm bảo type safety
   - Tái sử dụng components

2. **Performance**:
   - Sử dụng memo khi cần thiết
   - Tối ưu renders với proper key props
   - Lazy loading cho routes (có thể thêm sau)

3. **Maintainability**:
   - Clean code với meaningful names
   - Consistent code style
   - Proper type definitions 

## Chi tiết về Redux và Luồng Ứng dụng

### 1. Kiến trúc Redux
Redux hoạt động theo mô hình một chiều (one-way data flow):
```
Action -> Reducer -> Store -> View -> Action
```

#### a. Store
- Là nơi lưu trữ state tập trung của ứng dụng
- Trong ứng dụng Todo, store được cấu hình như sau:
```typescript
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todo/todoSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});
```

#### b. Actions
- Là các sự kiện mô tả những thay đổi sẽ xảy ra với state
- Trong Redux Toolkit, actions được tự động tạo ra từ reducers trong createSlice:
```typescript
// store/todo/todoSlice.ts
export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      // Action creator tự động được tạo
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      // Action creator tự động được tạo
    },
    // ...
  },
});
```

#### c. Reducers
- Là pure functions xử lý logic thay đổi state
- Nhận vào state hiện tại và action, trả về state mới
- Không được thay đổi state trực tiếp (immutable)

### 2. Luồng Dữ Liệu trong Ứng Dụng

#### a. Khởi tạo Store
1. Ứng dụng bắt đầu với việc khởi tạo Redux store
2. Store được wrap xung quanh app thông qua Provider:
```typescript
// App.tsx
<Provider store={store}>
  <App />
</Provider>
```

#### b. Đọc State
1. Components sử dụng useSelector để đọc state:
```typescript
// TodoPage.tsx
const todos = useSelector((state: RootState) => state.todos.todos);
```
2. Mỗi khi state thay đổi, components sẽ tự động re-render

#### c. Thay đổi State
1. User tương tác (ví dụ: thêm todo mới)
2. Component dispatch một action:
```typescript
// TodoPage.tsx
const dispatch = useDispatch();
dispatch(addTodo(newTodoText));
```
3. Reducer xử lý action và cập nhật state:
```typescript
addTodo: (state, action: PayloadAction<string>) => {
  const newTodo: Todo = {
    id: Date.now(),
    text: action.payload,
    completed: false,
  };
  state.todos.push(newTodo);
},
```
4. Store cập nhật state mới
5. Các components đang subscribe sẽ re-render

### 3. Ví dụ Luồng Hoàn Chỉnh

#### Thêm Todo mới:
1. User nhập text và click "Add"
2. Component gọi handleSubmit:
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (newTodo.trim()) {
    dispatch(addTodo(newTodo.trim())); // Dispatch action
    setNewTodo('');
  }
};
```
3. Action addTodo được gửi đến reducer
4. Reducer tạo todo mới và cập nhật state
5. TodoList component nhận state mới và re-render

#### Toggle Todo:
1. User click vào checkbox
2. TodoItem component dispatch action:
```typescript
<Checkbox
  checked={todo.completed}
  onChange={() => dispatch(toggleTodo(todo.id))}
/>
```
3. Reducer cập nhật trạng thái completed của todo
4. UI tự động cập nhật để phản ánh thay đổi

### 4. Best Practices khi Sử dụng Redux

#### a. State Structure
- Tổ chức state phẳng (normalized state)
- Tránh lưu trữ dữ liệu trùng lặp
- Tách biệt các concerns khác nhau vào các slices riêng

#### b. Action Handling
- Sử dụng createSlice để giảm boilerplate code
- Đặt tên actions rõ ràng, dễ hiểu
- Xử lý lỗi và loading states

#### c. Performance
- Sử dụng memorized selectors cho các tính toán phức tạp
- Chỉ dispatch actions khi thực sự cần thiết
- Tránh re-renders không cần thiết bằng cách chọn đúng state cần subscribe

#### d. TypeScript Integration
- Định nghĩa types cho state và actions
- Sử dụng RootState và AppDispatch types
- Tận dụng type inference của Redux Toolkit 

## So sánh với Context API và Redux Thuần

### 1. Sử dụng Context API

```typescript
// TodoContext.tsx
import { createContext, useContext, useReducer, ReactNode } from 'react';

// Types
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

interface TodoContextType {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
}

// Actions
type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'REMOVE_TODO'; payload: number };

// Context
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Reducer
const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
          },
        ],
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

// Provider Component
export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, { todos: [] });

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom Hook
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};
```

Sử dụng trong component:
```typescript
// TodoPage.tsx với Context
const TodoPage = () => {
  const { state, dispatch } = useTodo();
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTodo.trim() });
      setNewTodo('');
    }
  };

  return (
    // ... UI code ...
  );
};
```

### 2. Sử dụng Redux Thuần (không có Redux Toolkit)

```typescript
// types.ts
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

// actions.ts
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';

interface AddTodoAction {
  type: typeof ADD_TODO;
  payload: string;
}

interface ToggleTodoAction {
  type: typeof TOGGLE_TODO;
  payload: number;
}

interface RemoveTodoAction {
  type: typeof REMOVE_TODO;
  payload: number;
}

export type TodoActionTypes = AddTodoAction | ToggleTodoAction | RemoveTodoAction;

// Action Creators
export const addTodo = (text: string): AddTodoAction => ({
  type: ADD_TODO,
  payload: text,
});

export const toggleTodo = (id: number): ToggleTodoAction => ({
  type: TOGGLE_TODO,
  payload: id,
});

export const removeTodo = (id: number): RemoveTodoAction => ({
  type: REMOVE_TODO,
  payload: id,
});

// reducer.ts
const initialState: TodoState = {
  todos: [],
};

const todoReducer = (
  state = initialState,
  action: TodoActionTypes
): TodoState => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
          },
        ],
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

// store.ts
import { createStore } from 'redux';
export const store = createStore(todoReducer);
```

### 3. So sánh các phương pháp

#### Context API
**Ưu điểm:**
- Được tích hợp sẵn trong React
- Setup đơn giản, ít boilerplate code
- Phù hợp với ứng dụng nhỏ và trung bình
- Không cần cài thêm thư viện

**Nhược điểm:**
- Khó tối ưu performance với state phức tạp
- Không có DevTools mạnh mẽ
- Không có middleware
- Re-render không tối ưu khi state thay đổi

#### Redux Thuần
**Ưu điểm:**
- Flow dữ liệu rõ ràng, predictable
- DevTools mạnh mẽ
- Middleware system (thunk, saga, etc.)
- Cộng đồng lớn, nhiều resources

**Nhược điểm:**
- Nhiều boilerplate code
- Setup phức tạp
- Learning curve cao
- Cần viết nhiều code lặp lại

#### Redux Toolkit (Current Implementation)
**Ưu điểm:**
- Giảm thiểu boilerplate code
- Tích hợp các best practices
- DevTools và middleware có sẵn
- Immutable update logic đơn giản với createSlice
- TypeScript support tốt

**Nhược điểm:**
- Bundle size lớn hơn Context
- Vẫn cần setup nhiều hơn Context
- Overkill cho ứng dụng nhỏ

### 4. Khi nào sử dụng cái nào?

1. **Sử dụng Context khi:**
   - Ứng dụng nhỏ, state đơn giản
   - Cần chia sẻ state cho một phần nhỏ của ứng dụng
   - Không cần middleware hay DevTools
   - Muốn setup nhanh và đơn giản

2. **Sử dụng Redux Thuần khi:**
   - Cần kiểm soát tối đa về flow dữ liệu
   - Dự án legacy đã sử dụng Redux
   - Team quen thuộc với Redux patterns
   - Cần tùy chỉnh nhiều về structure

3. **Sử dụng Redux Toolkit khi:**
   - Ứng dụng lớn với state phức tạp
   - Cần middleware và DevTools
   - Muốn có TypeScript support tốt
   - Cần performance tốt với ít boilerplate
   - Cần tính năng của Redux nhưng muốn code ít hơn 

## Chi tiết Luồng Ứng Dụng với Các Phương Pháp Khác Nhau

### 1. Luồng Ứng Dụng với Context API

#### a. Khởi tạo và Setup
```typescript
// index.tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TodoProvider>
      <App />
    </TodoProvider>
  </React.StrictMode>
);
```

#### b. Luồng Dữ Liệu
1. **Khởi tạo State**:
```typescript
const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Khởi tạo state với useReducer
  const [state, dispatch] = useReducer(todoReducer, { todos: [] });
  
  // Cung cấp state và dispatch function cho toàn bộ ứng dụng
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
```

2. **Truy cập State trong Components**:
```typescript
const TodoList = () => {
  // Sử dụng custom hook để truy cập context
  const { state } = useTodo();
  
  return (
    <List>
      {state.todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </List>
  );
};
```

3. **Cập nhật State**:
```typescript
const AddTodoForm = () => {
  const { dispatch } = useTodo();
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dispatch action trực tiếp đến context
    dispatch({ type: 'ADD_TODO', payload: text });
    setText('');
  };
  // ...
};
```

4. **Re-render Flow**:
```
User Action → dispatch → Context Provider → Re-render affected components
```

#### c. Quản lý Side Effects
```typescript
const TodoList = () => {
  const { state, dispatch } = useTodo();

  // Side effects phải được xử lý trong components
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const response = await fetch('/api/todos');
        const todos = await response.json();
        dispatch({ type: 'SET_TODOS', payload: todos });
      } catch (error) {
        console.error('Failed to load todos:', error);
      }
    };

    loadTodos();
  }, []);

  return // ...
};
```

### 2. Luồng Ứng Dụng với Redux Thuần

#### a. Khởi tạo và Setup
```typescript
// store/configureStore.ts
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// index.tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

#### b. Luồng Dữ Liệu
1. **Action Creators và Types**:
```typescript
// actions/todoActions.ts
export const ADD_TODO = 'ADD_TODO';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string | null;
}

// Action creator với side effect
export const addTodoAsync = (text: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: { 'Content-Type': 'application/json' },
      });
      const newTodo = await response.json();
      dispatch({ type: ADD_TODO, payload: newTodo });
    } catch (error) {
      dispatch(setError('Failed to add todo'));
    } finally {
      dispatch(setLoading(false));
    }
  };
};
```

2. **Reducers**:
```typescript
// reducers/todoReducer.ts
const todoReducer = (state = initialState, action: TodoActionTypes): TodoState => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
```

3. **Selectors**:
```typescript
// selectors/todoSelectors.ts
import { createSelector } from 'reselect';

export const selectTodos = (state: RootState) => state.todos.todos;
export const selectLoading = (state: RootState) => state.todos.loading;
export const selectError = (state: RootState) => state.todos.error;

// Memorized selector cho filtered todos
export const selectCompletedTodos = createSelector(
  selectTodos,
  (todos) => todos.filter(todo => todo.completed)
);
```

4. **Component Integration**:
```typescript
const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <List>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </List>
  );
};
```

#### c. Middleware và Side Effects
```typescript
// middleware/loggingMiddleware.ts
export const loggingMiddleware: Middleware = (store) => (next) => (action) => {
  console.log('Dispatching:', action);
  const result = next(action);
  console.log('Next State:', store.getState());
  return result;
};

// middleware/apiMiddleware.ts
export const apiMiddleware: Middleware = (store) => (next) => async (action) => {
  if (!action.api) return next(action);

  const { url, method, data, onSuccess, onError } = action.api;
  
  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    store.dispatch(onSuccess(result));
  } catch (error) {
    store.dispatch(onError(error.message));
  }
};
```

### 3. So sánh Luồng Xử lý

#### a. Xử lý Side Effects

**Context API**:
- Side effects thường được xử lý trong components
- Không có middleware system
- Cần tự implement error handling và loading states
- Khó tái sử dụng logic xử lý side effects

```typescript
// Với Context API
const TodoList = () => {
  const { dispatch } = useTodo();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddTodo = async (text: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ text }),
      });
      const newTodo = await response.json();
      dispatch({ type: 'ADD_TODO', payload: newTodo });
    } catch (err) {
      setError('Failed to add todo');
    } finally {
      setLoading(false);
    }
  };
  // ...
};
```

**Redux Thuần**:
- Side effects được xử lý qua middleware
- Có thể tái sử dụng logic qua action creators
- Dễ dàng theo dõi và debug với DevTools
- Có thể tách biệt hoàn toàn logic xử lý side effects

```typescript
// Với Redux Thuần
// actions/todoActions.ts
export const addTodo = (text: string) => ({
  type: 'API_REQUEST',
  api: {
    url: '/api/todos',
    method: 'POST',
    data: { text },
    onSuccess: (todo) => ({ type: ADD_TODO, payload: todo }),
    onError: (error) => ({ type: SET_ERROR, payload: error }),
  },
});

// components/TodoList.tsx
const TodoList = () => {
  const dispatch = useDispatch();
  // State được quản lý tập trung trong store
  const { todos, loading, error } = useSelector(state => state.todos);

  const handleAddTodo = (text: string) => {
    dispatch(addTodo(text));
  };
  // ...
};
```

#### b. Performance Optimization

**Context API**:
```typescript
// Tối ưu với useMemo và useCallback
const TodoList = () => {
  const { state } = useTodo();
  
  // Memorize filtered todos
  const completedTodos = useMemo(
    () => state.todos.filter(todo => todo.completed),
    [state.todos]
  );

  // Memorize handlers
  const handleToggle = useCallback((id: number) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, [dispatch]);

  return // ...
};
```

**Redux**:
```typescript
// Tối ưu với reselect và memoization
const selectVisibleTodos = createSelector(
  [selectTodos, selectVisibilityFilter],
  (todos, filter) => {
    switch (filter) {
      case 'SHOW_COMPLETED':
        return todos.filter(todo => todo.completed);
      case 'SHOW_ACTIVE':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }
);

const TodoList = () => {
  // Selectors tự động memoize kết quả
  const visibleTodos = useSelector(selectVisibleTodos);
  const dispatch = useDispatch();

  // Actions được memoize tự động bởi useDispatch
  const boundActions = useMemo(
    () => bindActionCreators({ toggleTodo, deleteTodo }, dispatch),
    [dispatch]
  );

  return // ...
};
```

### 4. Testing

#### a. Testing với Context API
```typescript
// TodoContext.test.tsx
describe('TodoContext', () => {
  it('should add todo', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TodoProvider>{children}</TodoProvider>
    );

    const { result } = renderHook(() => useTodo(), { wrapper });

    act(() => {
      result.current.dispatch({ type: 'ADD_TODO', payload: 'Test Todo' });
    });

    expect(result.current.state.todos).toHaveLength(1);
    expect(result.current.state.todos[0].text).toBe('Test Todo');
  });
});
```

#### b. Testing với Redux Thuần
```typescript
// todoReducer.test.ts
describe('todoReducer', () => {
  it('should handle ADD_TODO', () => {
    const initialState = { todos: [] };
    const action = {
      type: ADD_TODO,
      payload: { id: 1, text: 'Test Todo', completed: false },
    };

    const nextState = todoReducer(initialState, action);

    expect(nextState.todos).toHaveLength(1);
    expect(nextState.todos[0].text).toBe('Test Todo');
  });
});

// todoActions.test.ts
describe('todoActions', () => {
  it('should create an action to add a todo', () => {
    const text = 'Test Todo';
    const expectedAction = {
      type: ADD_TODO,
      payload: text,
    };
    expect(addTodo(text)).toEqual(expectedAction);
  });
}); 
```

## Chi Tiết Triển Khai Các Phương Pháp Quản Lý State

### 1. Triển khai với Context API

#### a. Cấu trúc file cần thiết
```
src/
  ├── contexts/
  │   ├── TodoContext/
  │   │   ├── TodoContext.tsx     # Context và Provider
  │   │   ├── TodoReducer.ts     # Reducer và Actions
  │   │   ├── TodoTypes.ts       # Type definitions
  │   │   └── index.ts           # Export tất cả
  │   └── index.ts               # Export các contexts
  ├── hooks/
  │   └── useTodo.ts             # Custom hook để sử dụng context
  └── providers/
      └── AppProviders.tsx       # Wrapper cho tất cả providers
```

#### b. Chi tiết từng file

1. **TodoTypes.ts** - Định nghĩa types
```typescript
// contexts/TodoContext/TodoTypes.ts
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

export type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

export interface TodoContextType {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
  addTodo: (text: string) => Promise<void>;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}
```

2. **TodoReducer.ts** - Logic xử lý state
```typescript
// contexts/TodoContext/TodoReducer.ts
import { TodoState, TodoAction } from './TodoTypes';

export const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
          },
        ],
      };
    // ... other cases
    default:
      return state;
  }
};
```

3. **TodoContext.tsx** - Context và Provider
```typescript
// contexts/TodoContext/TodoContext.tsx
import { createContext, useReducer, useCallback } from 'react';
import { TodoContextType, TodoState } from './TodoTypes';
import { todoReducer, initialState } from './TodoReducer';

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Tạo các methods để abstract hóa logic
  const addTodo = useCallback(async (text: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // API call có thể được thêm vào đây
      dispatch({ type: 'ADD_TODO', payload: text });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const toggleTodo = useCallback((id: number) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, []);

  const removeTodo = useCallback((id: number) => {
    dispatch({ type: 'REMOVE_TODO', payload: id });
  }, []);

  const value = {
    state,
    dispatch,
    addTodo,
    toggleTodo,
    removeTodo,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
```

4. **useTodo.ts** - Custom hook
```typescript
// hooks/useTodo.ts
import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within TodoProvider');
  }
  return context;
};
```

5. **AppProviders.tsx** - Provider wrapper
```typescript
// providers/AppProviders.tsx
import { TodoProvider } from '../contexts/TodoContext';
// Import các providers khác

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  return (
    <TodoProvider>
      {/* Các providers khác */}
      {children}
    </TodoProvider>
  );
};
```

#### c. Sử dụng trong components
```typescript
// components/TodoList.tsx
import { useTodo } from '../hooks/useTodo';

export const TodoList = () => {
  const { state, addTodo, toggleTodo, removeTodo } = useTodo();
  const { todos, loading, error } = state;

  // Sử dụng các methods trực tiếp
  const handleAdd = (text: string) => {
    addTodo(text);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <List>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => toggleTodo(todo.id)}
          onRemove={() => removeTodo(todo.id)}
        />
      ))}
    </List>
  );
};
```

### 2. Triển khai với Redux Thuần

#### a. Cấu trúc file cần thiết
```
src/
  ├── store/
  │   ├── types/
  │   │   └── todo.types.ts      # Type definitions
  │   ├── actions/
  │   │   ├── todoActions.ts     # Action creators
  │   │   └── actionTypes.ts     # Action type constants
  │   ├── reducers/
  │   │   ├── todoReducer.ts     # Todo reducer
  │   │   └── index.ts           # Root reducer
  │   ├── middleware/
  │   │   ├── api.middleware.ts  # API handling
  │   │   └── logger.middleware.ts# Logging
  │   └── index.ts               # Store configuration
  └── selectors/
      └── todoSelectors.ts       # Memorized selectors
```

#### b. Chi tiết từng file

1. **todo.types.ts** - Type definitions
```typescript
// store/types/todo.types.ts
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}
```

2. **actionTypes.ts** - Action constants
```typescript
// store/actions/actionTypes.ts
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

export interface AddTodoAction {
  type: typeof ADD_TODO;
  payload: Todo;
}

// ... other action interfaces

export type TodoActionTypes = 
  | AddTodoAction 
  | ToggleTodoAction 
  | RemoveTodoAction;
```

3. **todoActions.ts** - Action creators
```typescript
// store/actions/todoActions.ts
import { Dispatch } from 'redux';
import { 
  ADD_TODO, 
  SET_LOADING, 
  SET_ERROR,
  AddTodoAction 
} from './actionTypes';

export const addTodo = (text: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ text }),
      });
      const todo = await response.json();
      dispatch({
        type: ADD_TODO,
        payload: todo,
      });
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// ... other action creators
```

4. **todoReducer.ts** - Reducer
```typescript
// store/reducers/todoReducer.ts
import { TodoState } from '../types/todo.types';
import { TodoActionTypes, ADD_TODO } from '../actions/actionTypes';

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const todoReducer = (
  state = initialState,
  action: TodoActionTypes
): TodoState => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    // ... other cases
    default:
      return state;
  }
};
```

5. **api.middleware.ts** - API middleware
```typescript
// store/middleware/api.middleware.ts
import { Middleware } from 'redux';

export const apiMiddleware: Middleware = store => next => async action => {
  if (!action.api) return next(action);

  const { url, method, data, onSuccess, onError } = action.api;
  
  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    store.dispatch(onSuccess(result));
  } catch (error) {
    store.dispatch(onError(error.message));
  }
};
```

6. **store/index.ts** - Store configuration
```typescript
// store/index.ts
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers';
import { apiMiddleware } from './middleware/api.middleware';
import { loggerMiddleware } from './middleware/logger.middleware';

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, apiMiddleware, loggerMiddleware)
  )
);
```

#### c. Sử dụng trong components
```typescript
// components/TodoList.tsx
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, removeTodo } from '../store/actions/todoActions';
import { selectTodos, selectLoading, selectError } from '../store/selectors/todoSelectors';

export const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const handleAdd = (text: string) => {
    dispatch(addTodo(text));
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <List>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => dispatch(toggleTodo(todo.id))}
          onRemove={() => dispatch(removeTodo(todo.id))}
        />
      ))}
    </List>
  );
};
```

### 3. Triển khai với Redux Toolkit

#### a. Cấu trúc file cần thiết
```
src/
  ├── store/
  │   ├── slices/
  │   │   └── todoSlice.ts       # RTK slice
  │   ├── services/
  │   │   └── todoApi.ts         # RTK Query API
  │   └── index.ts               # Store configuration
  └── hooks/
      └── redux.ts               # Typed hooks
```

#### b. Chi tiết từng file

1. **todoSlice.ts** - Redux Toolkit slice
```typescript
// store/slices/todoSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await fetch('/api/todos');
    return response.json();
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    loading: false,
    error: null,
  } as TodoState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    // ... other reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
```

2. **todoApi.ts** - RTK Query API
```typescript
// store/services/todoApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => 'todos',
    }),
    addTodo: builder.mutation<Todo, string>({
      query: (text) => ({
        url: 'todos',
        method: 'POST',
        body: { text },
      }),
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation } = todoApi;
```

3. **store/index.ts** - Store configuration
```typescript
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import { todoApi } from './services/todoApi';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

4. **redux.ts** - Typed hooks
```typescript
// hooks/redux.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

#### c. Sử dụng trong components
```typescript
// components/TodoList.tsx
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { addTodo, toggleTodo, removeTodo } from '../store/slices/todoSlice';
import { useGetTodosQuery } from '../store/services/todoApi';

export const TodoList = () => {
  const dispatch = useAppDispatch();
  const { data: todos, isLoading, error } = useGetTodosQuery();

  const handleAdd = (text: string) => {
    dispatch(addTodo(text));
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <List>
      {todos?.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => dispatch(toggleTodo(todo.id))}
          onRemove={() => dispatch(removeTodo(todo.id))}
        />
      ))}
    </List>
  );
};
```

### 4. So sánh cách triển khai

1. **Context API**:
   - Setup đơn giản, ít boilerplate
   - Phù hợp cho state cục bộ
   - Cần tự xử lý optimization
   - Dễ hiểu và maintain cho team nhỏ

2. **Redux Thuần**:
   - Setup phức tạp, nhiều boilerplate
   - Cấu trúc rõ ràng, dễ scale
   - Tích hợp sẵn nhiều tools
   - Phù hợp cho team lớn

3. **Redux Toolkit**:
   - Setup trung bình
   - Giảm boilerplate đáng kể
   - Tích hợp best practices
   - Phù hợp cho mọi kích thước dự án

### 5. Lưu ý khi triển khai

1. **Context API**:
   - Tách nhỏ contexts theo chức năng
   - Sử dụng useMemo cho value
   - Implement error boundary
   - Cân nhắc re-render impact

2. **Redux**:
   - Chuẩn hóa state structure
   - Tách logic phức tạp vào middleware
   - Sử dụng selectors
   - Implement proper error handling

3. **Redux Toolkit**:
   - Tận dụng createAsyncThunk
   - Sử dụng RTK Query cho API calls
   - Implement proper TypeScript
   - Tận dụng immer cho mutations
</rewritten_file>