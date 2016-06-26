import React, { Component } from 'react';

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ''
    };
  }

  render() {
    return (
      <div className="start">
        <p>The board key is required :)</p>
        <input placeholder="Board key..." type="text" className="text-field margin" onChange={e => {
          this.setState({
            ...this.state,
            password: e.target.value
          });
        }}/>
        <input type="submit" value="Enter" className="margin" onClick={e => {
          e.preventDefault();
          if(this.state.password === '')
            return;
          this.props.onSubmit(this.state.password);
        }}/>
      </div>
    );
  }
}
