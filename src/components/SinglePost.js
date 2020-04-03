import React, { Component } from 'react'
import axios from 'axios';
import { Image } from 'react-bootstrap';

export default class SinglePost extends Component {

    state = {
        post: null
    }
    componentDidMount(){
        this.getPost(this.props.match.params.post_id);
    }

    render() {
        return (
            <div className="container">

                <div className="row">

                    <div className="col s12">

                        {this.state.post ? (
                            <div className="post">
                                <h4 className="post__title center">{this.state.post.title.rendered}</h4>
                                <Image src={this.state.post._embedded['wp:featuredmedia'][0].source_url} fluid className="post__img" />
                                <p className="post__content" dangerouslySetInnerHTML={{ __html: this.state.post.content.rendered }}></p>
                            </div>
                        ) : (
                            <div className="center">Loading post...</div>
                        )}

                    </div>

                </div>

            </div>
        )
    }

    getPost = (post_id=0) => {
        axios.get(`/posts/${post_id}?_embed`)
            .then(response => {

                this.setState({ post: response.data });

            })
            .catch(error => {
                console.log(error);
            })
    }
}
