import Writer from '../../../store/model/Writer'

const HANDLE_NAME = 'テスト ハンドルネーム'
const INSTITUTION = 'テスト インスティチューション'
const NAME_EN = 'Test English Name'
const NAME_JA = 'テスト 日本語名-1'

describe('writer model', () => {
  let writer

  beforeEach(() => {
    writer = new Writer({
      handleName: HANDLE_NAME,
      institution: INSTITUTION,
      nameEn: NAME_EN,
      nameJa: NAME_JA
    })
  })

  test('日本語敬称は[さん]付けで', () => {
    expect(writer.jaTitle()).toBe(NAME_JA + 'さん')
  })
})
