import { useState } from 'react'
import { secretkey, publishkey } from 'src/@core/utils/stripekey/stripekey'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'

const CheckoutForm = ({ newProduct, NewPrice,SupId,Invo }) => {

  const [priceKey, setPriceKey] = useState('')

  const handleCheckout = async () => {
    if (!newProduct || !NewPrice) {
      console.error('Product or price is missing.')

      return
    }

    const stripe = require('stripe')(secretkey)

    try {
      const price = await stripe.prices.create({
        unit_amount: NewPrice * 100,
        currency: 'thb',
        product: 'prod_PDnunZLALu4JjW',
        nickname: newProduct
      })

      console.log('Price created:', price.id)
      setPriceKey(String(price.id))

      const stripePromise = loadStripe(publishkey)
      const stripeInstance = await stripePromise

      const result = await stripeInstance.redirectToCheckout({
        lineItems: [{ price: price.id, quantity: 1 }],
        mode: 'payment',
        successUrl: `http://shop.digital2day.com/member/order/pay_success/?sub_id=${SupId}&invoice_id=${Invo}`,
        cancelUrl: `http://shop.digital2day.com/member/order/?sub_id=${SupId}&invoice_id=${Invo}`
      })

      if (result.error) {
        console.error(result.error.message)
      }
    } catch (error) {
      console.error('Error creating price:', error)
    }
  }

  return (
    <Button fullWidth variant='contained' color='primary' onClick={handleCheckout}>
      Checkout
    </Button>
  )
}

export default CheckoutForm
