import React, { useEffect, useState } from 'react'

const App: React.FC = function () {
  // React 全部都是js

  // 使用ts
  // 自定义变量的类型
  // 宿主环境（浏览器，Node)环境内的变量类型
  // 第三方数据类型
  // 泛型  类型推导  熟练使用工具函数Omit,Pick，Partial等函数

  interface Todo {
    title: string
    done: boolean
  }

  type inputEvent = React.ChangeEvent<HTMLInputElement>
  let [val, setVal] = useState<string>('')
  let [todos, setTodos] = useState<Todo[]>([{ title: '打王者', done: false }])
  let active = todos.filter((todo) => todo.done).length

  function handleAdd(): void {
    setTodos([...todos, { title: val, done: false }])
    setVal('')
  }

  function handleSetTodo(e: inputEvent, i: number) {
    const nextTodos = [...todos]
    nextTodos[i].done = e.target.checked
    setTodos(nextTodos)
  }

  let [allDone, setAllDone] = useState(false)

  function handleToggleAll(e: inputEvent) {
    const nextTodos = [...todos]
    nextTodos.forEach((todo) => (todo.done = e.target.checked))
    setTodos(nextTodos)
    setAllDone(e.target.checked)
  }
  function handleRemoveTodo(i: number) {
    const nextTodos = [...todos]
    nextTodos.splice(i, 1)
    setTodos(nextTodos)
  }
  function handleClear() {
    setTodos(todos.filter((todo) => !todo.done))
  }
  useEffect(() => {
    setAllDone(active == todos.length)
  }, [todos])
  return (
    <div>
      <input
        type="text"
        value={val}
        onChange={(e) => setVal((val = e.target.value))}
      ></input>
      <button onClick={handleAdd}>添加</button>
      <button onClick={handleClear}>清理</button>

      {todos.length ? (
        <ul>
          {todos.map((todo, i) => {
            return (
              <li key={i}>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={(e) => {
                    handleSetTodo(e, i)
                  }}
                />
                <span>{todo.title}</span>
                <span
                  onClick={(e) => {
                    handleRemoveTodo(i)
                  }}
                >
                  ❌
                </span>
              </li>
            )
          })}
        </ul>
      ) : (
        <div>小老弟，暂无数据</div>
      )}

      <div>
        全选
        <input
          type="checkbox"
          checked={allDone}
          onChange={(e) => handleToggleAll(e)}
        />
        <span>
          {active} / {todos.length}
        </span>
      </div>
    </div>
  )
}
export default App
