import React, { Component} from 'react';
import {Field, reduxForm} from 'redux-form';
// reduxForm is a function similar to connect redux, a connect helper
class PostsNew extends Component {
  render(){
    return (
      <form>
        <Field
          name='title'
          component={}
        />
      </form>
    );
  }
}

export default reduxForm({
  // name for the form
  form: 'PostsNewForm'
})(PostsNew);
