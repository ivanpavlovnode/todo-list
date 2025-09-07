import { useState, useEffect, useMemo} from 'react';
import styled from 'styled-components';
import './App.css';

//Интерфейсы
interface Note{
  date: number;
  text: string;
  done: boolean;
}

function App() {
  
  const [sort, setSort] = useState<string>('all');
  const [history, setHistory] = useState<Note[]>([]);
  const [description, setDescription] = useState<string>('');

  //Первичная загрузка истории из localStorage
  useEffect(() => {
    const a = localStorage.getItem('history');
    if(a !== null) {
      try{
        const parsed = JSON.parse(a) as Note[];
        if(parsed.length !== 0){
          setHistory(parsed);
        }
      }
      catch{
        setHistory([]);
      }
    }
  }, []);

  //Сортированная и фильтрованная история для рендеринга
  const memoHistory = useMemo<Note[]>(() => {
    let arr = [...history].sort((a, b) => b.date - a.date);
    if(sort === 'all') return arr;
    return arr.filter(elem => elem.done === (sort === 'done'));
  }, [history, sort]);

  //Эффект для обновления localStorage после изменения history
  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  //Функция для удаления выполненных задач
  const ClearDone = () => {
    setHistory(history.filter(elem => elem.done === false));
  }

  //Функция для добавления задачи
  const AddTask = () => {
    if(description === '') return;
    const prev = [...history];
    prev.push({
      date: Date.now(),
      text: description,
      done: false
    });
    setHistory(prev);
  }

  //Функция для отметки задачи как выполненной
  const ChangeDone = (date: number) => {
    setHistory(prev => prev.map(elem => elem.date === date ? 
      {...elem, done: !elem.done} : elem));
  }
  return (
    <AppBlock>
      <BackgroundText>
{`> sudo initialize_nexus --protocol=skynet_v7.2

[warn] root access detected. bypassing cerberus firewall...
[ok] tunnel established. quantum entropy source: active.

> run diagnostics --full

[**] memory fragmentation: 87.4%. allocator corruption likely.
[err] std::bad_alloc at 0x7ffd3098f1a0: failed to allocate 0xfeedf00d bytes.
[err] segmentation fault (core dumped) in module 'synthetic_consciousness.dll'
[inf] neural-link buffer overflow at sector 0xdeadbeef.
[critical] void pointer dereference in void manipulate_memory(mem_addr_t): nullptr
[warn] stack smashing detected. terminating process: 7347. signal 11.

> inject --payload=black_ice.mem --addr=0xc0ffee

[**] injecting... syntax error: unexpected token in json at position 666.
[err] type mismatch: cannot convert 'double' to 'human soul'.
[err] linter failed: reality distortion threshold exceeded.
[inf] spawning 0xfa zombies... success.
[debug] heartbeat: 147 bpm. adrenaline levels critical.
[notice] //sys/core/temp:  99°c - cooling failure

> access mainframe --user=null --pass=" or 1=1--"

[alert] intrusion detected. trace started. ice intensifying.

[err] exception 0xe0bfu9f3: access violation writing location 0x0000000c.
[err] kernel panic - not syncing: attempted to kill the idle task!
`}</BackgroundText>
  <Title>TODOS</Title>
  <SortBlock>
    <SortButton style={{color: "rgba(255, 255, 255, 1)"}}>SHOW:</SortButton>
    <SortButton 
      style={{color: sort === 'all'? "rgb(59, 147, 255)" : "rgba(255, 255, 255, 1)"}}
      onClick = {() => setSort('all')}
      >ALL</SortButton>
    <SortButton 
      style={{color: sort === 'done' ? "rgb(59, 147, 255)" : "rgba(255, 255, 255, 1)"}}
      onClick = {() => setSort('done')}
      >DONE</SortButton>
    <SortButton 
    style={{color: sort === 'undone' ? "rgb(59, 147, 255)" : "rgba(255, 255, 255, 1)"}}
    onClick = {() => setSort('undone')}
    >UNDONE</SortButton>
  </SortBlock>
  <EnterBlock>
    <EnterInput 
      placeholder ="Next task’s description..."
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    ></EnterInput>
    <EnterButton onClick = {() => {AddTask(); setDescription('')}}>ADD</EnterButton>
  </EnterBlock>
  <TaskBlock>
    {memoHistory && memoHistory.map((elem, index) => 
      <Task 
        key = {index}
        onClick = {() => ChangeDone(elem.date)}
        style = {{
          color: elem.done? "rgb(59, 147, 255)" : "rgb(255, 255, 255)",
          backgroundColor: elem.done? "rgba(59, 147, 255, 0.1)" : "rgba(255, 255, 255, 0.05)",
          textDecoration: elem.done? "line-through" : "initial"
        }}
      >{elem.text}</Task>)}
  </TaskBlock>
  <Counter>
    <p style = {{color: "rgb(255, 255, 255)"}}>LEFT:</p>
    <p style = {{color: "rgb(59, 147, 255)"}}>
      {history.filter(elem => elem.done === false).length}/{history.length}
    </p>
    </Counter>
    <ClearButton onClick = {() => ClearDone()}>Clear Done</ClearButton>
    </AppBlock>
  );
}

export default App
//Блок на полный экран
const AppBlock = styled.div`
  z-index: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url("background.jpg");
  background-size: cover;
  background-position: center;
  background-color: #1b1b1b;
  &::before{
    content: '';
    position: absolute;
    z-index: 0;
    background-color: rgba(14, 14, 14, 0.9);
    min-height: 100%;
    min-width: 100%;
    backdrop-filter: blur(3px);
  }
`;
//Декоративнй текст на фоне
const BackgroundText = styled.p`
  top: 0;
  left: 0;
  min-height: 100%;
  min-width: 100%;
  color: rgba(255, 255, 255, 0.04);
  font-family: 'MajorMono';
  font-size: 1.7vh;
  letter-spacing: 1vw;
  white-space: pre;
  line-height: 2;
`;
//Заголовок TODOS
const Title = styled.h1`
  color: rgba(255, 255, 255, 1);
  font-size: 7vh;
  width: 100%;
  top: 0%;
  text-align: center;
`;
//Блок с Show: и кнопками сортировки
const SortBlock = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  top: 10%;
  backdrop-filter: blur(1.5px);
`;
// Кнопки сортировки, Show тоже сделан как кнопка для простоты
const SortButton = styled.button`
  position: relative;
  font-size: 3vh;
  font-weight: bold;
`;
//Блок с инпутом и кнопкой ADD
const EnterBlock = styled.div`
  display: flex;
  flex-direction: row;
  top: 16%;
  width: 98%;
  height: 7%;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 0 3vh 3vh 0;
  backdrop-filter: blur(1.5px);
`;
//Инпут для новых записок
const EnterInput = styled.input`
  position: relative;
  flex: 4;
  color: rgb(255, 255, 255);
  font-family: 'Jura';
  font-size: 3vh;
  padding-left: 2vw;
`;
//Кнопка ADD сохранения записки
const EnterButton = styled.button`
  position: relative;
  flex: 1;
  background-color: rgba(59, 147, 255, 0.1);
  color: rgb(59, 147, 255);
  border-radius: 0 3vh 3vh 0;
  font-size: 3vh;
`;
//Блок с записками со скроллом
const TaskBlock = styled.div`
  top: 24%;
  right: 0;
  width: 98%;
  height: 68%;
  overflow: scroll;
  &::-webkit-scrollbar{
    display: none;
  }

`;
//Одна записка
const Task = styled.button`
  position: relative;
  white-space: normal;
  overflow-wrap: break-word;
  width: 100%;
  min-height: 8%;
  margin: 1vh 0;
  padding: 0 0 0 2vw;
  border-radius: 3vh 0 0 3vh;
  font-size: 3vh;
  font-family: 'Jura';
  text-align: center;
  backdrop-filter: blur(1.5px);
`;
//Слева снизу счетчик записок
const Counter = styled.div`
  display: flex;
  flex-direction: row;
  width: 56%;
  top: 94%;
  left: 4%;
  overflow: hidden;
  p{
    font-size: 3vh;
    position: relative;
  }
`;
//Справа снизу кнопка удаления выполненных записок
const ClearButton = styled.button`
  width: 40%;
  height: 7%;
  bottom: 0;
  right: 0;
  font-size: 3vh;
  border-radius: 4vh 0 0 0;
  background-color: rgba(229, 73, 75, 0.1);
  color: rgb(229, 73, 75);
`;