import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";

const App = () =>  {
  const userEmail = 'yoanna.text.com';

  const [ tasks, setTasks ] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
      const json = await response.json();
      setTasks(json);
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => getData, [])

  //sort by date 
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="app">
      <ListHeader listName={' Holiday tick list'} getData={getData}/>
      {
        sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)
      }
    </div>
  );
}

export default App;
