import axios from "axios";
import LazyLoad from "../helpers/LazyLoad";
import lozad from 'lozad'

// export const deletePost = (id) => {
//     return { type: "DELETE_POST", payload: id }
// }

export const deletePost = (id) => {
  return (dispatch, getState) => {
    // make async call to database
    console.log('Calling ajax...')
    dispatch({ type: "DELETE_POST", payload:id });
  }
};

export const getPosts = () => {

    return ( dispatch, getState) => {

        axios
          .get(
            `/posts?_embed=1&per_page=20&page=1&order=asc&orderby=id`
          )
          .then(response => {

            dispatch({ type: "GET_POSTS", payload: response.data });
            // LazyLoad.init();
            const observer = lozad(); // lazy loads elements with default selector as '.lozad'
            observer.observe();
          })
          .catch(error => {
            console.log(error);
          });

        // async call to get posts axios



    }
};
