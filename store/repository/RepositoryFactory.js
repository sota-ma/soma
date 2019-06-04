import ArticleRepository from './ArticleRepository'

const repositories = {
  article: ArticleRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
