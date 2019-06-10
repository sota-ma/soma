import WriterList from '../../../store/model/WriterList'

const USER_1 = {
  fields: {
    handleName: 'テスト ハンドルネーム-1',
    institution: 'テスト インスティチューション-1',
    nameEn: 'Test English Name-1',
    nameJa: 'テスト 日本語名-1'
  }
}

const USER_2 = {
  fields: {
    handleName: 'テスト ハンドルネーム-2',
    institution: 'テスト インスティチューション-2',
    nameEn: 'Test English Name-2',
    nameJa: 'テスト 日本語名-2'
  }
}

describe('writer mpdel', () => {
  describe('正常系', () => {
    test('複数件', () => {
      const writeList = new WriterList([USER_1, USER_2]).list
      expect(writeList.length).toBe(2)
    })
  })

  describe('0件時はNOT FOUNDエラー', () => {
    expect(() => {
      const writeList = new WriterList([]).list
      expect(writeList.length).toBe(0)
    }).toThrow(new Error('invalid params for WriterList model'))
  })
})
