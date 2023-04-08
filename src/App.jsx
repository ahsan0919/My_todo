import { Component } from "react";
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FcStart } from 'react-icons/fc';


class App extends Component{
  constructor(){
    super()
    this.state = {
      value : "",
      todo:[]
    }
  }
  handlechg = (val) => {
    this.setState({
      value: val
    })

  }

  setdata = () => {
    // console.log(this.state.value)
    let obj = {
      title: this.state.value,
      s: 0
    }
    this.state.todo = [...this.state.todo, obj]
    localStorage.setItem("Todo_List", JSON.stringify(this.state.todo))
    this.setState({
      value: ""
    })
    // console.log(this.state.todo)
  }
  edit = (ind) => {
    for (var i = 0; i < this.state.todo.length; i++) {
      this.state.todo[i].s = 0
    }

    this.state.todo[ind].s = 1
    this.setState({})
  }

  setnewtext = (val, ind) => {
    this.state.todo[ind].title = val
    this.setState({})
  }

  update = (i) => {
    this.state.todo[i].s = 0
    localStorage.setItem("Todo_List", JSON.stringify(this.state.todo))
    this.setState({

    })
  }
  delete = (e) => {
    this.state.todo.splice(e,1)
    this.setState({})
    localStorage.setItem("Todo_List", JSON.stringify(this.state.todo))
  }

  componentDidMount(){
    let data = localStorage.getItem('Todo_List')
    this.state.todo = JSON.parse(data)
    this.setState({})
    if(data == null){
      this.state.todo = []
    }else{
      this.state.todo = JSON.parse(data)
      this.setState({})
    }
  }


  render() {
    return (
      <div>
          <h1>My Todo App</h1>
  
          <input value={this.state.value} onChange={(e) => this.handlechg(e.target.value)} type="text" />
          <button style={{ margin: 3 + "px" }} onClick={() => this.setdata()}>
          <IoIosAddCircleOutline color="red" />
          </button>
          {
            this.state.todo.map((v,i)=>{
              return(
                v.s == 0 ?
                
                <li key={i} style={{ listStyle:"none",margin: 12+"px"}}>
                  <i><FcStart/></i>
                  {v.title}
                  <button style={{ margin: 3 + "px" }} onClick={() => this.edit(i)}>edit</button>
                  <button style={{ margin: 3 + "px" }} onClick={() => this.delete(i)}>delete</button>
                </li>
                :
                <li key={i} style={{ listStyle: "none", margin: 12 + "px" }}>
                  <i><FcStart /></i>
                  <input type="text" value={v.title} onChange={(e) => this.setnewtext(e.target.value, i)} />
                  <button style={{ margin: 3 + "px" }} onClick={() => this.update(i)}>update</button>
                </li>
                
              )
            })
          }
      </div>
    )
  }
}



export default App;
