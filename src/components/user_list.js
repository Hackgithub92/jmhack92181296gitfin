import React from 'react';
import { Link } from 'react-router-dom';

const UserListItem  = (props) =>  {
  return (
    <tr>
      <td className="col-md-4">{props.fname}</td>
      <td className="col-md-4">{props.lname}</td>
      <td className="col-md-4 btn-toolbar">
        <Link to={`/users/${props.id}/lists`}>
        <button className="btn btn-success btn-sm">
          <i className="glyphicon glyphicon-list"></i> Lists
        </button>
      </Link>
      <button className="btn btn-success btn-sm" onClick={event => props.onEdit("edit",props.id)}>
        <i className="glyphicon glyphicon-pencil"></i> Edit
      </button>
      <button className="btn btn-danger btn-sm" onClick={event => props.onDelete(props.id)}>
        <i className="glyphicon glyphicon-remove"></i> Delete
      </button>
    </td>
  </tr>
);
}

const UserList = (props) => {
  const userItems = props.users.map((user)  => {
    return (
      <UserListItem
        fname={user.fname}
        lname={user.lname}
        id={user.id}
        key={user.id}
        onDelete={props.onDelete}
        onEdit={props.onEdit}
      />
    )
  });

  return (
    <div className="user-list">
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="col-md-3">First Name</th>
            <th className="col-md-3">Last Name</th>
            <th className="col-md-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userItems}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;