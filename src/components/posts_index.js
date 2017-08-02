import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';

import {fetchPosts} from '../actions/index';

class PostsIndex extends Component {
  componentDidMount(){
    //dataflow: 2. we call action creator to fetch list of posts,
    // data will go through action creator -> posts index reducer -> state -> component props via mapStateToProps
    // so we will be able to call this.props.posts
    this.props.fetchPosts();
  }
  renderPosts(){
    return _.map(this.props.posts, post => {
      return (
        <li className='list-group-item' key={post.id}>
          <Link to={`/posts/${post.id}`}>
            {post.title}
          </Link>

        </li>
      );
    });

  }
  render(){
    return (
      <div>
        <div className='text-xs-right'>
          <Link className='btn btn-primary' to='/posts/new'>
            Add a Post
          </Link>
        </div>
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
//dataflow: 1. we hook component and the action creator fetchPosts(not call it yet)
export default connect(mapStateToProps, {fetchPosts: fetchPosts})(PostsIndex);
