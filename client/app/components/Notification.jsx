import React, { Component } from 'react';
import { observer } from 'mobx-react';
import close from '../img/no.png';
import IconButton from './IconButton';

export default class Notification extends Component {
    constructor(props) {
      super(props);
      this.state = {
        hidden: false
      };
    }

    componentDidMount() {
      if(this.props.hideAfter) {
        window.setTimeout(() => {
          this.setState({
            ...this.state,
            hidden: true
          });
        }, this.props.hideAfter)
      }
    }

    render() {

      let className = this.props.lock ? 'notification lock' : 'notification';

      if(this.state.hidden || this.props.hidden === true)
        className += ' hidden';

      return (
        <div className={ className }>
          { (this.props.lock && !this.props.fixed) ? (<IconButton src={ close } className="close" onClick={ this.props.onClose }/>) : ''}
          <div className="content">
            { this.props.children }
          </div>
        </div>
      );
    }
}
