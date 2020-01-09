import Pager from "../utils/pager";

class Search {
  static search(q) {
    const pager = new Pager({
      url: 'search?q=' + q,
    })
    return pager.getNextPageData()
  }
}

export default Search