import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {createPost} from '../actions/postAction';

class PostForm extends Component {
  constructor(props){
      super(props);
      this.state = {
          title:'',
          body:''
      };
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e){
    console.log("on change")
    this.setState({[e.target.name]:e.target.value});
  }

  onSubmit(e){
    e.preventDefault();
    const post = {
        title:this.state.title,
        body:this.state.body
    }
    this.props.createPost(post)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.newPost){
        if(nextProps.newPost.title){
            this.setState({title:nextProps.newPost.title, body: nextProps.newPost.body})
            console.log("set state")
        }
    }
}

  render() {
      console.log('render form');
    return (
      <div>
        <h1>Add post </h1>
        <form onSubmit={this.onSubmit}>
            <div>
                <label>Title:</label><br/>
                <input type="text" name="title" onChange={this.onChange} value={this.state.title}/>
            </div>
            <br/>
            <div>
                <label>Body:</label><br/>
                <textarea name="body" onChange={this.onChange} value={this.state.body}/>
            </div> 
            <br />
            <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

PostForm.propTypes = {
    createPost: PropTypes.func.isRequired,
    newPost:PropTypes.object,
}

const mapStateToProps = state =>({
    newPost: state.posts.item,

});

export default connect(mapStateToProps,{createPost})(PostForm);
