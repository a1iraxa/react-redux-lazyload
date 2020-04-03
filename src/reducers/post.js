import axios from 'axios';
import { POST_URL } from '../config/constants';
axios.defaults.baseURL = POST_URL;

const initState = {
    posts: []
}

const postReducer = (state = initState, action) => {

    if(action.type === "GET_POSTS") {

        return {
          ...state,
          posts: action.payload
        };
    }

    if(action.type === "DELETE_POST") {
        const posts = state.posts.filter( post => post.id !== action.payload);

        return {
            ...state,
            posts: posts
        }
    }

    return state;
}

export default postReducer
