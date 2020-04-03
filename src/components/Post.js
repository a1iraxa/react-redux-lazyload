import React, { Component } from 'react'
import axios from 'axios';
import TimeAgo from '../components/TimeAgo';
import { Container, Row, Col, Spinner, Button, Image } from 'react-bootstrap';
import { POST_URL } from '../config/constants.js';
import { Link } from "react-router-dom";

axios.defaults.baseURL = POST_URL;

export default class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            currentPage:1,
            showNextPageBtn: false,
            posts: []
        }
    }

    render() {
        const { posts } = this.state;

        const ids = posts.filter(post => post.author== 1).map( post => post.id);

        const dateFormat = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

        return (

            <React.Fragment>

                {this.state.isLoading && (
                    <Spinner className="post-loading" animation="border" variant="danger" />
                )}

                <Container>

                    <Row>

                        {posts.map((post, index) => (
                            <Col xs={6} key={post.id}>
                                <div className={`post post-holder post-${post.id}`}>
                                    <Image src={post._embedded['wp:featuredmedia'][0].source_url} fluid className="post__img" />
                                    <Link to={'/'+ post.id}>
                                        <h2 className="post__title">{post.title.rendered}</h2>
                                    </Link>
                                    <p className="post__excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></p>
                                    <div className="post__meta">
                                        <p className="post__meta post__meta-title post__meta-title_author">
                                            Posted by <span className="post__meta post__meta-value post__meta-value_author">{post._embedded.author[0].name} </span>
                                        </p>
                                        <p className="post__meta post__meta-title post__meta-title_category">
                                            , in <span className="post__meta post__meta-value post__meta-value_category">{post._embedded['wp:term'][0][0].name}</span>
                                        </p>
                                        <p className="post__meta post__meta-title post__meta-title_date">
                                            , at <span className="post__meta post__meta-value post__meta-value_date">{(new Date(post.date)).toLocaleDateString('en-US', dateFormat)}</span>
                                        </p>

                                    </div>
                                </div>


                            </Col>)
                        )}

                    </Row>

                    {this.state.showNextPageBtn && (
                        <Row>
                            <Col>
                                <Button className="post__next" variant="primary" onClick={this.getNextPage}> Load more...</Button>
                            </Col>
                        </Row>
                    )}


                </Container>
            </React.Fragment>
        )
    }
    componentDidMount(){
        this.setState({ isLoading: !this.state.isLoading });
        this.getPosts()
    }
    getNextPage = () => {
        this.setState({ isLoading: !this.state.isLoading });
        this.getPosts()
    }
    getPosts = ()=> {
        axios.get(`/posts?_embed=1&per_page=10&page=${this.state.currentPage}&order=asc&orderby=id`)
        .then( response => {

            this.setState({ posts: this.state.posts.concat(response.data), currentPage: this.state.currentPage + 1, isLoading: !this.state.isLoading, showNextPageBtn: true });

            if (this.state.posts.length === parseInt(response.headers['x-wp-total'])) {
                this.setState({ showNextPageBtn: !this.state.showNextPageBtn });
            }

        })
        .catch(error => {
            console.log(error);
        })
    }
}
