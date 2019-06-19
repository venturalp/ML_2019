import express from 'express'
import fetch from 'isomorphic-fetch'

const router = express.Router()

const getAmount = value => Math.floor(value)
const getDecimal = value => parseInt((value - getAmount(value)).toFixed(2).substring(2), 10)

router.get('/items', async (req, res) => {
  const query = req.query.q
  const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`, {
    method: 'GET',
  })
  const searchResult = await response.json()
  const products = searchResult.results.slice(0, 4)
  const categories = []
  const items = []
  products.map((p) => {
    categories.push(p.category_id)
    const amount = getAmount(p.price)
    const decimals = getDecimal(p.price)

    items.push({
      id: p.id,
      title: p.title,
      price: {
        currency: p.currency_id,
        amount,
        decimals,
      },
      picture: p.thumbnail,
      condition: p.condition,
      free_shipping: p.shipping ? p.shipping.free_shipping : false,
    })

    return null
  })
  const result = {
    author: 'Guilherme',
    lastname: 'Ventura de Souza',
    categories,
    items,
  }

  res.send(result)
})

router.get('/items/:id', async (req, res) => {
  const { params: { id } = {} } = req

  const responseItem = await fetch(`https://api.mercadolibre.com/items/${id}`, {
    method: 'GET',
  })
  const itemInfo = await responseItem.json()

  if (itemInfo.status) {
    res.send({
      status: itemInfo.status,
      message: itemInfo.message,
      error: itemInfo.error,
    })
  }

  const responseDescription = await fetch(`https://api.mercadolibre.com/items/${id}/description`, {
    method: 'GET',
  })
  const itemDescription = await responseDescription.json()

  const amount = getAmount(itemInfo.price)
  const decimals = getDecimal(itemInfo.price)

  const result = {
    author: 'Guilherme',
    lastname: 'Ventura de Souza',
    item: {
      id: itemInfo.id,
      title: itemInfo.title,
      price: {
        currency: itemInfo.currency_id,
        amount,
        decimals,
      },
      picture: itemInfo.pictures[0] ? itemInfo.pictures[0].secure_url : '',
      condition: itemInfo.condition,
      free_shipping: itemInfo.shipping ? itemInfo.shipping.free_shipping : false,
      sold_quantity: itemInfo.sold_quantity,
      description: itemDescription.plain_text,
    },
  }

  res.send(result)
})

export default router
