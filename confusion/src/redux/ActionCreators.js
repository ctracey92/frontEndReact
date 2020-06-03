import { actionTypes } from "react-redux-form";
import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  const newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment,
  };
  newComment.date = new Date().toISOString();

  return fetch(baseUrl + "comments", {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then(
      (res) => {
        if (res.ok) {
          return res;
        } else {
          let err = new Error(`Error ${res.status}: ${res.statusText}`);
          err.res = res;
          throw err;
        }
      },
      (error) => {
        let errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((res) => res.json())
    .then((res) => dispatch(addComment(res)))
    .catch((err) => {
      console.log("POST COMMENTS ", err.message);
      alert("Your comment could not be poster\nError: " + err.message);
    });
};

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));

  return fetch(baseUrl + "dishes")
    .then(
      (res) => {
        if (res.ok) {
          return res;
        } else {
          let err = new Error(`Error ${res.status}: ${res.statusText}`);
          err.res = res;
          throw err;
        }
      },
      (error) => {
        let errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((res) => res.json())
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((err) => dispatch(dishesFailed(err.message)));
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errmess) => ({
  type: actionTypes.DISHES_FAILED,
  payload: errmess,
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + "comments")
    .then(
      (res) => {
        if (res.ok) {
          return res;
        } else {
          let err = new Error(`Error ${res.status}: ${res.statusText}`);
          err.res = res;
          throw err;
        }
      },
      (error) => {
        let errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((res) => res.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((err) => dispatch(commentsFailed(err.message)));
};

export const commentsFailed = (errmess) => ({
  type: actionTypes.COMMENTS_FAILED,
  payload: errmess,
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading(true));
  return fetch(baseUrl + "promotions")
    .then(
      (res) => {
        if (res.ok) {
          return res;
        } else {
          let err = new Error(`Error ${res.status}: ${res.statusText}`);
          err.res = res;
          throw err;
        }
      },
      (error) => {
        let errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((res) => res.json())
    .then((promos) => dispatch(addPromos(promos)))
    .catch((err) => dispatch(promosFailed(err.message)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = (errmess) => ({
  type: actionTypes.PROMOS_FAILED,
  payload: errmess,
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
});

export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading(true));
  return fetch(baseUrl + "leaders")
    .then(
      (res) => {
        if (res.ok) {
          return res;
        } else {
          let err = new Error(`Error ${res.status}: ${res.statusText}`);
          err.res = res;
          throw err;
        }
      },
      (error) => {
        let errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then((res) => res.json())
    .then((leaders) => dispatch(addLeaders(leaders)))
    .catch((err) => dispatch(leadersFailed(err.message)));
};

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,
});

export const leadersFailed = (errmess) => ({
  type: actionTypes.LEADERS_FAILED,
  payload: errmess,
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders,
});
