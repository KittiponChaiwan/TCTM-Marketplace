import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const StripeSuccess = () => {
  const router = useRouter()
  const [seconds, setSeconds] = useState(2) // Initial countdown time in seconds

  useEffect(() => {
    const { sub_id, invoice_id } = router.query

    if (sub_id && invoice_id) {
      const data = {
        sub_id: sub_id,
        invoice_file_name: '12.pdf',
        invoice_id: invoice_id
      }

      const sendDataToAPI = async () => {
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API}TCTM.invoice.send_proof`, data)
          console.log('API Response:', response.data)

          // Start the countdown after successful API call
          const timer = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1)
          }, 1000) // Update countdown every 1 second (1000 milliseconds)

          // Redirect when countdown reaches 0
          setTimeout(() => {
            clearInterval(timer) // Stop the interval
            router.push('/member/logistic/') // Replace '/your-new-page' with your desired URL
          }, seconds * 1000) // Redirect after 'seconds' time
        } catch (error) {
          console.error('API Error:', error)
        }
      }

      sendDataToAPI()
    }
  }, [router.query.sub_id, router.query.invoice_id]) // Add router.query as dependencies

  return (
    <div>
      <p>Redirecting in {seconds} seconds...</p>
      {/* Additional content if needed */}
    </div>
  )
}

export default StripeSuccess
