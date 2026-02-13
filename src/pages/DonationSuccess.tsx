import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { CheckCircle, Heart, Download, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const DonationSuccess = () => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)
  const [donation, setDonation] = useState<any>(null)

  useEffect(() => {
    if (sessionId) {
      // Fetch donation details
      fetch(`/api/donations/session/${sessionId}`)
        .then(res => res.json())
        .then(data => {
          setDonation(data)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [sessionId])

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardContent className="p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold text-primary mb-2">
            JazakAllah Khair!
          </h1>
          <p className="font-arabic text-xl text-gold mb-4">جزاك الله خيرا</p>

          <p className="text-muted-foreground mb-6">
            Your donation has been received successfully. May Allah accept your generosity and reward you abundantly.
          </p>

          {donation && (
            <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold mb-2">Donation Details</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium">£{(donation.amount / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fund</span>
                  <span className="font-medium">{donation.fund_type}</span>
                </div>
                {donation.gift_aid_claimed && (
                  <div className="flex justify-between text-green-600">
                    <span>Gift Aid</span>
                    <span>+ £{(donation.gift_aid_amount / 100).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reference</span>
                  <span className="font-mono text-xs">{donation.receipt_number}</span>
                </div>
              </div>
            </div>
          )}

          <p className="text-sm text-muted-foreground mb-6">
            A confirmation email with your receipt has been sent to your email address.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" asChild>
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Link>
            </Button>
            <Button className="mosque-button">
              <Heart className="w-4 h-4 mr-2" />
              Donate Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DonationSuccess