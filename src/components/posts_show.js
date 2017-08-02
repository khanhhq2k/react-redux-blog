import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost} from '../actions/index';

class PostsShow extends Component {
  componentDidMount() {
    const post_id = this.props.match.params.id //from Router
    // or even better const {id} = this.props.match.params
    this.props.fetchPost(post_id);
  }
  render(){
    const {post} = this.props;
    //prevent null property
    if (!post) {
      return <div>Loading...</div>;
    }
    return(
        <div>
          <h3>{post.title}</h3>
          <h6>Categories: {post.categories}</h6>
          <p>{post.content}</p>
        </div>
    );
  }
}

//ownProps = this.props
function mapStateToProps({posts}, ownProps) { //only get posts part of application state
  return {post: posts[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchPost: fetchPost})(PostsShow);
