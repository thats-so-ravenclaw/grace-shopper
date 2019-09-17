const {expect} = require('chai')
const db = require('../index')
const Wig = db.model('wig')

describe('Wig model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
})
