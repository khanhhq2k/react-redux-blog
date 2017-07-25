import React, { Component} from 'react';
import {Field, reduxForm} from 'redux-form';
// reduxForm is a function similar to connect redux, a connect helper
class PostsNew extends Component {
  renderField (field){
    return(
      <div className='form-group'>
        <label>{field.label}</label>
        <input
          className='form-control'
          type='text'
          {...field.input}
        />
      </div>
    );
  }
  render(){
    return (
      <form>
        <Field
          label='Title'
          name='title'
          component={this.renderField}
        />
        <Field
          label='Categories'
          name='categories'
          component={this.renderField}
        />
        <Field
          label='Post Content'
          name='content'
          component={this.renderField}
        />
      </form>
    );
  }
}

function validate(values){
  //console.log(values) -> {title: 'aaa', categories: 'dasdasda', content: 'dasdada'}
  const errors = {};
  //validate input from values object
  if(!values.title){
    errors.title = "Enter a title!";
  }
  if(!values.categories){
    errors.categories = "Enter categories!";
  }
  if(!values.content){
    errors.categories = "Enter a post content!";
  }
  //return validation object
  return errors;
}
export default reduxForm({
  // name for the form
  form: 'PostsNewForm',
  //validation
  validate: validate
})(PostsNew);
