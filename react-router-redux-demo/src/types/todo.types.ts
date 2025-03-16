/**
 * Interface định nghĩa cấu trúc của một Todo item
 * @interface Todo
 */
export interface Todo {
  /** ID duy nhất của todo, sử dụng timestamp */
  id: number;
  /** Nội dung của todo */
  text: string;
  /** Trạng thái hoàn thành của todo */
  completed: boolean;
}

/**
 * Interface định nghĩa cấu trúc state của todos trong Redux store
 * @interface TodoState
 */
export interface TodoState {
  /** Mảng chứa tất cả các todos */
  todos: Todo[];
  /** Trạng thái loading của todos */
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  /** Thông báo lỗi nếu có */
  error: string | null;
} 