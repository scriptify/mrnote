import React, { Component } from 'react';

export default class Checkbox extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="checkbox">
        <div className="squaredFour" onClick={ this.props.onChange }>
          <input type="checkbox" value="None" id="squaredFour" name="check" checked={ this.props.checked } { ...this.props } />
          <label for="squaredFour"></label>
        </div>
        <p>{ this.props.text || '' }</p>
      </div>
    );
  }

}
