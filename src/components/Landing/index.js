import React, { Component } from 'react';

import { withAuthorization } from '../Session';

const INITIAL_STATE = {
  name: '',
  points: '',
}

class AddPoints extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { name, points } = this.state;
    console.log(this.state)
    this.props.firebase
      .user(points)
      .set({
        // name: name,
        points: points,
      })
      .then(authUser => {
        return this.props.firebase
          .user(points)
          .set({
            username: authUser.user.uid
          })
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { name, points } = this.state
    return (
      <div>
        <h1>Host a Run</h1>
        <form onSubmit={this.onSubmit}>
          <input value={name} type="text" name="name" onChange={this.onChange} placeholder="Name" />
          <input value={points} type="text" name="points" onChange={this.onChange} placeholder="Points" />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AddPoints);