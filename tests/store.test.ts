import { describe, test, expect, beforeEach } from "bun:test";
import {
  listTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  clearTodos,
} from "../src/store";

beforeEach(() => {
  clearTodos();
});

describe("store", () => {
  test("listTodos returns empty array initially", () => {
    expect(listTodos()).toEqual([]);
  });

  test("createTodo creates a todo with defaults", async () => {
    const todo = await createTodo("Buy groceries");
    expect(todo.title).toBe("Buy groceries");
    expect(todo.completed).toBe(false);
    expect(todo.color).toBe("#ffffff");
    expect(todo.id).toBeDefined();
  });

  test("getTodo retrieves a created todo", async () => {
    const created = await createTodo("Test");
    const found = getTodo(created.id);
    expect(found).toEqual(created);
  });

  test("getTodo returns undefined for missing id", () => {
    expect(getTodo("nonexistent")).toBeUndefined();
  });

  test("updateTodo updates fields", async () => {
    const created = await createTodo("Original");
    const updated = await updateTodo(created.id, {
      color: "#ff0000",
      title: "Updated",
    });
    expect(updated?.color).toBe("#ff0000");
    expect(updated?.title).toBe("Updated");
    expect(updated?.completed).toBe(false);
  });

  test("updateTodo returns undefined for missing id", async () => {
    expect(
      await updateTodo("nonexistent", { color: "#ff0000" })
    ).toBeUndefined();
  });

  test("deleteTodo removes the todo", async () => {
    const created = await createTodo("To delete");
    const result = await deleteTodo(created.id);
    expect(result).toBe(true);
    expect(getTodo(created.id)).toBeUndefined();
  });

  test("deleteTodo returns false for missing id", async () => {
    expect(await deleteTodo("nonexistent")).toBe(false);
  });

  test("listTodos returns all created todos", async () => {
    await createTodo("First");
    await createTodo("Second");
    expect(listTodos()).toHaveLength(2);
  });
});
