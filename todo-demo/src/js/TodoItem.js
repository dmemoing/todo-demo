import React from 'react';
import classNames from 'classnames';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      editText: ''
    }
  }

  handleEdit(){
    this.setState({
      editing: true,
      editText: this.props.todo.title
    });
  }

  handleSubmit(event){
    if(this.state.editing){
      let val = this.state.editText.trim();
      if(val){
        this.props.onSave(val);
      }else{
        this.props.onDestroy();
      }
      this.setState({
        editing: false
      });
    }
  }

  handleChange(event){
    if(this.state.editing){
      this.setState({editText: event.target.value})
    }
  }

  handleKeyDown(event){
    if(event.which === ESCAPE_KEY){
      this.setState({editing: false});
    }else if(event.which === ENTER_KEY){
      this.handleSubmit(event);
    }
  }

  componentDidUpdate(){
    this.input.focus();
  }

  render() {
    return (
      <li 
        className={classNames({
          'completed': this.props.todo.completed,
          'editing': this.state.editing
        })}
      >
        <div className='view'>
          <input 
            className='toggle'
            type='checkbox'
            checked={this.props.todo.completed} 
            onChange={this.props.onToggle}
          />
          <label onDoubleClick={this.handleEdit.bind(this)}>
            {this.props.todo.title}
          </label>
          <button 
            className='destroy'
            onClick={this.props.onDestroy}
          />
        </div>
        <input 
          ref={(input) => {this.input=input;}}
          className='edit'
          value={this.state.editText}
          onBlur={this.handleSubmit.bind(this)}
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
        />
      </li>
    );
  }
}

export default TodoItem;