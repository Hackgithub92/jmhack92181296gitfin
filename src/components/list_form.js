import React from 'react';
import axios from 'axios';

const API_BASE = 'https://todo-api-jmhack.herokuapp.com/';


class ListForm extends React.Component {

  constructor(props) {

    const id = props.match.params.id;
    const createMode = (props.match.path.endsWith("create")) ? true: false;
    super(props);
    this.state = {
      title: "",
      body: "",
      user_id: id,
      list_id: createMode ? 0 : props.match.params.pid,
      createMode: createMode
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    // load the post if are editing.
    if (!createMode) {
      axios
      .get(`${API_BASE}/users/${this.state.user_id}/lists/${this.state.list_id}`)
      .then(res => {
        console.log("list fetched");
        this.setState({
          title: res.data.title,
          body: res.data.body
        })
      })
      .catch(err => console.log(err));
    }
  }

  addList(newList) {
    console.log(`posting list with title ${newList.title}`);
    axios
    .post(`${API_BASE}/users/${newList.user_id}/lists`, newList)
    .then(res => {
      //this.props.history.replace(`/users/${this.state.user_id}/lists`);
      console.log('List created!');
      this.props.history.goBack();
    })
    .catch(err => console.log(err));
  }

  updateList(list) {
    axios
    .put(`${API_BASE}/users/${list.user_id}/lists/${list.list_id}`, list)
    .then(res => {
      this.props.history.goBack();
    })
    .catch(err => console.log(err));
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event)
  {
    const list = {
      title: this.state.title,
      body: this.state.body,
      user_id: this.state.user_id,
      list_id: this.state.list_id
    }
    if (this.state.createMode) {
      this.addList(list);
    } else {
      this.updateList(list);
    }
    event.preventDefault();
  }

  handleCancel(event)
  {
    console.log("canceled pressed.")
    this.props.history.goBack();
    event.preventDefault();
  }

  render()  {
   return (
     <div>
       <h1>
         {this.state.createMode ? "Create List" : "Edit List"}
       </h1>
       <div className="user-form">
         <form onSubmit={this.handleSubmit}>
           <div className="form-group">
             <label>Title</label>
             <input type="text" className="form-control" name="title" id="title" placeholder="Enter title" value={this.state.title} onChange={this.handleInputChange}/>
           </div>
           <div className="form-group">
             <label htmlFor="body">Body</label>
             <textarea className="form-control" name="body" id="body" value={this.state.body} onChange={this.handleInputChange} rows="6"></textarea>
           </div>
           <div className="form-group">
             <button type="submit" className="btn btn-primary">{this.state.createMode ? "Create" : "Save"}</button>
             <button type="submit" className="btn btn-danger" onClick={this.handleCancel} >Cancel</button>
           </div>
         </form>
       </div>
     </div>
   );
 }

}

export default ListForm;