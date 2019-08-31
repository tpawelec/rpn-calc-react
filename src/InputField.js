import React, { Component } from 'react';

class InputField extends Component {

    render() {
        return (
            <input type="text" name={this.props.name} id={this.props.id} className={`calculator__input col-${this.props.col}`}  value={this.props.value}/>
        )
    }
}
export default InputField;