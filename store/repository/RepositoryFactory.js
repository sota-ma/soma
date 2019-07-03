import ArticleRepository from './ArticleRepository'
import ColumnRepository from './ColumnRepository'

const repositories = {
  article: ArticleRepository,
  column: ColumnRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
