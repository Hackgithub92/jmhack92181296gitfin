import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
const API_BASE = 'https://todo-api-jmhack.herokuapp.com/';

const ListItem  = (props) =>  {
  return (
    <tr>
      <td className="col-md-4">{props.title}</td>
      <td className="col-md-4">{props.body}</td>
      <td className="col-md-4 btn-toolbar">
        <Link to={`/users/${props.user_id}/lists/${props.id}`}>
            <button className="btn btn-success btn-sm">
              <i className="glyphicon glyphicon-pencil"></i> Edit
            </button>
        </Link>
        <button className="btn btn-danger btn-sm" onClick={event => props.onDelete(props.id)}>
          <i className="glyphicon glyphicon-remove"></i> Delete
        </button>
      </td>
    </tr>
  );
}

class Lists extends React.Component {

  constructor(props) {
    super(props);
    const id = props.match.params.id;
    this.state = {
      lists: [],
      user_id: id,
      user: {}
    };

    this.loadLists = this.loadLists.bind(this);
    this.deleteList = this.deleteList.bind(this);
  }

  loadLists() {
    axios
    .get(`${API_BASE}/users/${this.state.user_id}/lists`)
    .then(res => {
      this.setState({ lists: res.data });
      console.log(`Data loaded! = ${this.state.lists}`)
    })
    .catch(err => console.log(err));

    axios
    .get(`${API_BASE}/users/${this.state.user_id}`)
    .then(res => {
      this.setState({ user: res.data });
      console.log(`Data loaded! = ${this.state.lists}`)
    })
    .catch(err => console.log(err));
  }

  deleteList(id) {
    let filteredArray = this.state.lists.filter(item => item.id !== id)
    this.setState({lists: filteredArray});
    axios
    .delete(`${API_BASE}/users/${this.state.user_id}/lists/${id}`)
    .then(res => {
      console.log(`Record Deleted`);
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    console.log('Lists mounted!')
    this.loadLists();
  }

  render() {

    const listItems = this.state.lists.map((list)  => {
      return (
        <ListItem
          title={list.title}
          body={list.body}
          user_id = {list.user_id}
          id={list.id}
          key={list.id}
          onDelete={this.deleteList}
        />
      )
    });

    const headerString = (this.state.lists.count === 0)
      ? "Loading..." : `Lists by ${this.state.user.fname} ${this.state.user.lname}`
    return (
      <div className="lists">
        <h1> {headerString} </h1>
        <div className="user-list">
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="col-md-3">Title</th>
                <th className="col-md-3">Body</th>
              </tr>
            </thead>
            <tbody>
              {listItems}
            </tbody>
          </table>
          <Link to={`/users/${this.state.user_id}/lists/create`}>
              <button className="btn btn-success btn-sm">
                <i className="glyphicon glyphicon-plus"></i> Create
              </button>
          </Link>
          <button className="btn btn-danger btn-sm" onClick={() => this.props.history.goBack()}>
            <i className="glyphicon glyphicon-menu-left"></i> Back
          </button>
        </div>
      </div>
    );
  }
}

export default Lists;