const {expect} = require('chai')
const db = require('../index')
const Wig = db.model('wig')

describe('Wig model', () => {
  before(() => {
    return db.sync({force: true})
  })

  let wig
  beforeEach(() => {
    wig = Wig.build({
      name: 'Fancy Wig',
      image:
        'https://images.vexels.com/media/users/3/158261/isolated/preview/c2fb2b3ccc7cf70c9132a719adb6ef3c-straight-woman-hair-silhouette-by-vexels.png',
      price: 39.99,
      quantity: 2,
      description: 'This is a beautiful, fancy wig.',
      length: 'medium',
      material: 'human',
      color: 'black'
    })
  })

  describe('attribute definitions', () => {
    it('includes name, image, price, quantity, description, length, material, color ', async () => {
      const savedWig = await wig.save()
      expect(savedWig.name).to.equal('Fancy Wig')
      expect(savedWig.image).to.equal(
        'https://images.vexels.com/media/users/3/158261/isolated/preview/c2fb2b3ccc7cf70c9132a719adb6ef3c-straight-woman-hair-silhouette-by-vexels.png'
      )
      expect(savedWig.price).to.equal(39.99)
      expect(savedWig.quantity).to.equal(2)
      expect(savedWig.description).to.equal('This is a beautiful, fancy wig.')
      expect(savedWig.length).to.equal('medium')
      expect(savedWig.material).to.equal('human')
      expect(savedWig.color).to.equal('black')
    })
  })
})
