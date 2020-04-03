import React, { Component } from 'react'
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { deletePost, getPosts } from "../actions/postActions";

class Post extends Component {

    render() {

        const { posts } = this.props;

        const dateFormat = {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric"
        };

        return (
          <React.Fragment>
            <Container>
              <Row>
                <Col xs={12}>
                  <h1 className="text-center">Posts From Redux</h1>
                  <div className="skelton"></div>
                </Col>
              </Row>
              {posts.length < 1 && (
                <Row
                  xs={12}
                  dangerouslySetInnerHTML={{
                    __html: this.showPlaceHolders()
                  }}
                ></Row>
              )}
              {console.log(posts)}
              <Row>

                {posts &&
                  posts.map((post, index) => (
                    <Col xs={4} key={post.id}>
                      <div className={`post post-holder post-${post.id}`}>
                        <div className="card">
                          <div className="card-image">
                            <div className="post__image-placeholder">
                              <picture className="post__image lozad" data-iesrc={post._embedded["wp:featuredmedia"][0].media_details.sizes['full']['source_url']} data-alt={post._embedded["wp:featuredmedia"][0].alt_text} >
                                  <source srcSet={`${post._embedded["wp:featuredmedia"][0].media_details.sizes['nav']['source_url']} 1x, ${post._embedded["wp:featuredmedia"][0].media_details.sizes['product-single-thumbnail']['source_url']} 2x`} media="(max-width: 300px)" />
                                  <source srcSet={`${post._embedded["wp:featuredmedia"][0].media_details.sizes['testimonial']['source_url']} 1x, ${post._embedded["wp:featuredmedia"][0].media_details.sizes['thumbnail']['source_url']} 2x`} media="(max-width: 600px)" />
                                  <source srcSet={`${post._embedded["wp:featuredmedia"][0].media_details.sizes['product-single-normal']['source_url']} 1x, ${post._embedded["wp:featuredmedia"][0].media_details.sizes['blog-post']['source_url']} 2x`} media="(max-width: 900px)" />
                                  <source srcSet={`${post._embedded["wp:featuredmedia"][0].media_details.sizes['medium_large']['source_url']} 1x, ${post._embedded["wp:featuredmedia"][0].media_details.sizes['full']['source_url']} 2x`} media="(max-width: 1200px)" />
                                  <source srcSet={`${post._embedded["wp:featuredmedia"][0].media_details.sizes['medium_large']['source_url']} 1x, ${post._embedded["wp:featuredmedia"][0].media_details.sizes['full']['source_url']} 2x`} media="(max-width: 4200px)" />
                                </picture>
                            </div>
                          </div>
                          {/* <div className="card-image">
                            <div
                              className="js-lazy-image"
                              data-src={
                                post._embedded["wp:featuredmedia"][0].source_url
                              }
                            >
                              <div className="post__img js-lazy-image-content"></div>
                            </div>
                            <span
                              data-src={
                                post._embedded["wp:featuredmedia"][0].source_url
                              }
                              className="js-lazy-image"
                            ></span>
                            <span className="card-title blue-grey darken-4">
                              {post.title.rendered}
                            </span>
                          </div> */}
                          <div className="card-content">
                            <p
                              className="post__excerpt"
                              dangerouslySetInnerHTML={{
                                __html: post.excerpt.rendered
                              }}
                            ></p>
                          </div>
                          <div className="card-action">
                            <Link to={"/" + post.id}>Read more...</Link>
                            <div className="post__meta">
                              <p className="post__meta post__meta-title post__meta-title_author">
                                Posted by{" "}
                                <span className="post__meta post__meta-value post__meta-value_author">
                                  {post._embedded.author[0].name}{" "}
                                </span>
                              </p>
                              <p className="post__meta post__meta-title post__meta-title_category">
                                , in{" "}
                                <span className="post__meta post__meta-value post__meta-value_category">
                                  {post._embedded["wp:term"][0][0].name}
                                </span>
                              </p>
                              <p className="post__meta post__meta-title post__meta-title_date">
                                , at{" "}
                                <span className="post__meta post__meta-value post__meta-value_date">
                                  {new Date(post.date).toLocaleDateString(
                                    "en-US",
                                    dateFormat
                                  )}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
              </Row>
              <Row>
                <Col xs={12}>
                  <iframe className="lozad" width="560" height="315" data-src="https://www.youtube.com/embed/Hhjj8ZYP80w" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </Col>
              </Row>
            </Container>
          </React.Fragment>
        );
    }

    showPlaceHolders = () => {
    let palceholder = '';

    for (let i = 0; i < 9; i++) {
      palceholder += '<div class="col-4"><div class="post__placeholder"></div></div>';
    }
    return palceholder
  }

    handleDelete = (id) => {
        this.props.deletePost(id);
    }
    handleRefeshPosts = () => {
        this.props.getPosts();
    }
    componentDidMount = () => {
        this.props.getPosts();
    }
}

const mapStateToPorps = (state) => {
    return {
        posts: state.postReducer.posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      // deletePost: (id) => { dispatch(deletePost(id))},
      deletePost: id => dispatch(deletePost(id)),
      getPosts: () => dispatch(getPosts())
    };
}

export default connect(mapStateToPorps, mapDispatchToProps)(Post);
