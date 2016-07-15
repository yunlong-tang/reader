import request from '../lib/request.js'
import config from '../config.js'

let book_service = config.base_host + config.book_endpoint;
let chapter_service = config.base_host + config.chapter_endpoint;
let image_service = config.base_host + config.image_endpoint;
if (__PROD__) {
  host = config.prod_host;
}


const BookService = {
  searchBook(name) {
    const url = `${book_service}/book/fuzzy-search?query=${name}`;
    return request.get(url);
  },

  getBookDetailById(id) {
    const url = `${book_service}/book/${id}`;
    return request.get(url);
  },

  getBookResourcesById(id) {
    const url = `${book_service}/toc?view=summary&book=${id}`;
    return request.get(url);
  },

  getBookChaptersByResource(resourceId) {
    const url = `${book_service}/toc/${resourceId}?view=chapters`;
    return request.get(url);
  },

  getChapterContent(chapterUrl) {
    chapterUrl = encodeURIComponent(chapterUrl);
    const url = `${chapter_service}/chapter/${chapterUrl}`;
    return request.get(url).then(res => {
      return res.data.chapter.body;
    });
  },

  getBookImage(url) {
    if (!url) {
      return null;
    }
    url = url.replace('/agent/', '');
    // url = encodeURIComponent(url);
    return image_service + '?uri=' + url;
  }
};

module.exports = BookService;
