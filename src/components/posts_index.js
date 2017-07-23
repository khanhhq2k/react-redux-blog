import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {fetchPosts} from '../actions/index';

class PostsIndex extends Component {
  componentDidMount(){
    this.props.fetchPosts();
  }
  renderPosts(){
    return _.map(this.props.posts, post => {
      return (
        <li className='list-group-item' key={post.id}>
          {post.title}
        </li>
      );
    });

  }
  render(){
    console.log(this.props.posts);
    return (
      <div>
        <h3>Posts</h3>
        <ul className='list-group'>
          { this.renderPosts() }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {posts: state.posts}
}
//another way to pass action creator instead of dispatch
export default connect(mapStateToProps, {fetchPosts: fetchPosts})(PostsIndex);
