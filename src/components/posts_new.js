import React, { Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
// reduxForm is a function similar to connect redux, a connect helper
// reduxForm is for validation and form state only, not taking data, submit etc
import {connect} from 'react-redux';
import {createPost} from '../actions/index';
class PostsNew extends Component {
  renderField (field){
    // grab meta from field(destructure)
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    return(
      <div className={className}>
        <label>{field.label}</label>
        <input
          className='form-control'
          type='text'
          {...field.input}
        />
        <div className='text-help'>
          {touched ? error : ''}
        </div>
      </div>
    );
  }
  onSubmit(values){
    this.props.createPost(values, () => {
      //props.history is passed into component by Route in src/index
      this.props.history.push('/'); //navigate to index page
    });
  }
  render(){
    // pull handleSubmit(passed to component on behalf of reduxForm) from props
    // because we have connect PostsNew form to reduxForm at the end of this file
    const { handleSubmit } = this.props;
    return (
      //handleSubmit comes first, if everything ok(valid), this.Onsubmit(our callback function) will process
      // We have to bind this to onSubmit because this.onSubmit is a callback function,
      //->when it runs the context would have already changed
      //=> to make sure we still have access to Postsnew.onSubmit
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
        <button type='submit' className='btn btn-primary'>Submit</button>
        <Link to='/' className='btn btn-danger'>Cancel</Link>
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
    errors.content = "Enter a post content!";
  }
  //return validation object
  return errors;
}
export default reduxForm({
  // name for the form
  form: 'PostsNewForm',
  //validation
  validate: validate
})(
  //bind action creator form actions/index
  connect(null, {createPost})(PostsNew)
);
