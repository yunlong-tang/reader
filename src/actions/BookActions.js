import * as types from '../constants/ActionTypes';
import BookService from '../services/book.js'

export function searchBook(name) {
  return dispatch => {
    return BookService.searchBook(name).then(res => {
      dispatch({type: types.SEARCH_BOOK, books: res.data.books})
    });
  }
}

export function getBookDetailById(id) {
  return dispatch => {
    return BookService.getBookDetailById(id).then(res => {
      dispatch({type: types.BOOK_DETAIL, book: res.data})
    });
  }
}