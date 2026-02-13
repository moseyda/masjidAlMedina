import { Link } from 'react-router-dom'
import { XCircle, Home, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const DonationCancelled = () => {
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardContent className="p-8 text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-amber-600" />
          </div>

          <h1 className="text-2xl font-bold text-primary mb-4">
            Donation Cancelled
          </h1>

          <p className="text-muted-foreground mb-6">
            Your donation was not completed. No payment has been taken from your account.
          </p>

          <p className="text-sm text-muted-foreground mb-6">
            If you experienced any issues or have questions, please don't hesitate to contact us.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" asChild>
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Link>
            </Button>
            <Button className="mosque-button" asChild>
              <Link to="/#home">
                <Heart className="w-4 h-4 mr-2" />
                Try Again
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DonationCancelled