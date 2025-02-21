import axios from "axios";

async function getBlogs(){
  const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
  return response.data;
}

interface ITodo{
  title: string;
  completed: boolean;
}

function Todo({title , completed} : ITodo){
  return <div>
    {title} {completed ? "Done" : "Not done"}
  </div>
}


export default async function Home() {
  const blogs  = await getBlogs();                // When this page is requested, in React, empty page is sent and then the data is fetched and rendered(client side rendering) whereas in Next, when the page is requested
                                                  // The blogs are fetched and the dom manipulation is done and the html is sent(server side rendering) . Looking at the network tab and the first html page, the blogs will be displayed
  return (
    <div>
      {blogs.map((blog: ITodo, index: number) => <Todo key={index} title={blog.title} completed={blog.completed} />)}
    </div>
  );
}
