import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colours from './utils/colours';

const TodoInput = styled.input`
  display: block;
  position: relative;
  height: 4rem;
  font-family: 'Georgia';
  font-size: 2rem;
  background: ${colours.greyf2};
  outline: none;
  border: none;
  width: 50%;
`;

const TodoItemText = styled.span`
  --actionSize: 2ch;
  --halfActionSize: calc(var(--actionSize) / 2);
  text-align: left;
  margin-bottom: 1rem;
  span {
    display: inline-block;
    position: relative;
    background-color: ${colours.accent30};
    margin-right: 1ch;
    height: var(--actionSize);
    width: ${window.innerWidth > 800 ? 'var(--actionSize)' : 'calc(var(--actionSize) * 3)'};
    border-radius: var(--halfActionSize);
    vertical-align: middle;
    transition: ${window.innerWidth > 800 ? 'all 0.3s ease-out' : 'none'};
    transition-property: width, background-color;
    button {
      font-size: ${window.innerWidth > 800 ? '0' : 'auto'};
      vertical-align: middle;
      svg {
        fill: black;
      }
    }
    ${
      window.innerWidth > 800
        ? ':hover,:focus,:focus-within {background-color: ${colours.accent};width: 5ch;button {font-size: 1ch;svg {height: 100%;width: 100%;position: relative;top: 0.5ch;'
        : 'none'
    }
      }
    }
  }
  }
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 2rem;
  @media only screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const ToDoList = styled.ul`
  margin: 0;
  border-right: 1px solid ${colours.grey66};
  h3 {
    text-align: right;
    @media only screen and (max-width: 800px) {
      border-right: none;
      text-align: left;
    }
  }
`;
const CompletedList = styled.ul`
  margin: 0;
  font-size: 0.9rem;
  border-left: 1px solid ${colours.grey66};
  @media only screen and (max-width: 800px) {
    border-left: none;
    text-align: left;
  }
  li span {
    color: gray;
  }
`;

const ActionButton = styled.button`
  background: transparent;
  color: white;
  position: relative;
  border: none;
  width: 50%;
  vertical-align: middle;
  margin-bottom: 1rem;
  svg {
    height: ${window.innerWidth > 800 ? '0px' : '1ch'};
    width: ${window.innerWidth > 800 ? '0px' : '1ch'};
  }
`;

export default () => {
  const [newItem, setNewItem] = useState();
  const [list, setList] = useState([]);
  const [totalTodo, setTotalTodo] = useState();
  const [totalCompleted, setTotalCompleted] = useState();

  useEffect(() => {
    loopItems();
  });

  function loopItems() {
    let tt = 0;
    let tc = 0;
    list.map(i => (i.type === 't' ? tt++ : tc++));
    setTotalTodo(tt);
    setTotalCompleted(tc);
  }

  const handleSubmit = e => {
    e.preventDefault();
    let newObj = { thing: newItem, type: 't' };
    let newArray = [newObj, ...list];
    setList(newArray);
    setNewItem('');
    document.querySelector('#inputfield').value = '';
  };

  function removeItem(i) {
    let items = [...list];
    items.splice(i, 1);
    setList(items);
  }

  function completeItem(i) {
    let items = [...list];
    let item = { ...items[i] };
    item.type === 't' ? (item.type = 'c') : (item.type = 't');
    items[i] = item;
    setList(items);
  }

  return (
    <div>
      <form
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <TodoInput
          style={{ width: '80%', margin: '0 auto' }}
          type='text'
          id='inputfield'
          onChange={e => {
            setNewItem(e.target.value);
          }}
        />
      </form>
      <ListContainer>
        <ToDoList>
          <h3 style={{ paddingRight: '40px' }}>
            {totalTodo} {totalTodo === 1 ? 'Task' : 'Tasks'} To Do
          </h3>
          {list.map((item, i) =>
            item.type === 't' ? (
              <li key={i} style={{ display: 'flex' }}>
                <TodoItemText>
                  <span tabIndex='0'>
                    <ActionButton
                      completed
                      onMouseDown={e => {
                        completeItem(i);
                      }}
                      title='completed'
                    >
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                        <path
                          fill='white'
                          d='M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z'
                        />
                      </svg>
                    </ActionButton>
                    <ActionButton
                      onMouseDown={() => {
                        removeItem(i);
                      }}
                      title='remove'
                    >
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                        <path
                          fill='white'
                          d='M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z'
                        />
                      </svg>
                    </ActionButton>
                  </span>
                  {item.thing}
                </TodoItemText>
              </li>
            ) : null
          )}
        </ToDoList>
        <CompletedList>
          <h3 style={{ textAlign: 'left' }}>
            {totalCompleted} {totalCompleted === 1 ? 'Task' : 'Tasks'} Completed
          </h3>
          {list.map((item, i) =>
            item.type === 'c' ? (
              <li key={i} style={{ display: 'flex' }}>
                <TodoItemText>
                  <span tabIndex='0'>
                    <ActionButton
                      completed
                      onMouseDown={e => {
                        completeItem(i);
                      }}
                      title='restore'
                    >
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                        <path
                          fill='white'
                          d='M13.427 3.021h-7.427v-3.021l-6 5.39 6 5.61v-3h7.427c3.071 0 5.561 2.356 5.561 5.427 0 3.071-2.489 5.573-5.561 5.573h-7.427v5h7.427c5.84 0 10.573-4.734 10.573-10.573s-4.733-10.406-10.573-10.406z'
                        />
                      </svg>
                    </ActionButton>
                    <ActionButton
                      onMouseDown={() => {
                        removeItem(i);
                      }}
                      title='remove'
                    >
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                        <path
                          fill='white'
                          d='M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z'
                        />
                      </svg>
                    </ActionButton>
                  </span>
                  {item.thing}
                </TodoItemText>
              </li>
            ) : null
          )}
        </CompletedList>
      </ListContainer>
    </div>
  );
};
