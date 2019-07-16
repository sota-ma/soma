import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import Article from './Article'

const ORDER_BY_NEW_POST_DAY = 1
const ORDER_BY_OLD_POST_DAY = 2
const ORDER_BY_NEW_PUBLISHED_DAY = 3
const ORDER_BY_OLD_PUBLISHED_DAY = 4
const SORT_OPTIONS = [ORDER_BY_NEW_POST_DAY, ORDER_BY_OLD_POST_DAY, ORDER_BY_NEW_PUBLISHED_DAY, ORDER_BY_OLD_PUBLISHED_DAY]

class ArticleList {
  constructor(items) {
    this.list = items.map((item) => {
      return new Article(item)
    })
  }

  length() {
    return this.list.length
  }

  getAll() {
    return this.list
  }

  _isIncludedWord({ text, word }) {
    return text.toLowerCase().indexOf(word.toLowerCase()) !== -1
  }

  getFilteredArticles({ filteringDepartment, filteringWords }) {
    const slicedList = this.list.filter(
      article => filteringDepartment !== '' ? article.departments.includes(filteringDepartment) : true
    ).slice()
    return slicedList.filter(
      article => filteringWords.every(word => this._isIncludedWord({ text: article.titleJa, word }) ||
      this._isIncludedWord({ text: article.titleEn, word }) ||
      this._isIncludedWord({ text: documentToHtmlString(article.abstractEn), word }) ||
      this._isIncludedWord({ text: documentToHtmlString(article.abstractJa), word }))
    )
  }

  filteredAndSortedArtcles({ filteringWords, sortOption }) {
    // TODO: implement
    if (!SORT_OPTIONS.includes(sortOption)) {
      throw new Error('invalid sort option: ' + sortOption)
    }
  }
}

export default ArticleList
