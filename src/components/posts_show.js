import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from '../actions/index';

class PostsShow extends Component {
  componentDidMount() {
    const post_id = this.props.match.params.id; //from Router
    // or even better const {id} = this.props.match.params
    this.props.fetchPost(post_id);
  }

  onDeleteClick(){
    const post_id = this.props.match.params.id;
    this.props.deletePost(post_id, () => {
      this.props.history.push('/');
    });
  }
  render(){
    const {post} = this.props;
    //prevent null property
    if (!post) {
      return <div>Loading...</div>;
    }
    return(
        <div>
          <Link to='/'>Back</Link>
          <button
            className='btn btn-danger pull-xs-right'
            onClick={this.onDeleteClick.bind(this)}
          >
            Delete
          </button>
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

export default connect(mapStateToProps, {fetchPost: fetchPost, deletePost: deletePost})(PostsShow);
