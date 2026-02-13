import { useState } from 'react'
import { X, Heart, Check, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { createCheckoutSession, FUND_TYPE_LABELS } from '@/services/donations'
import type { FundType, DonationFormData } from '@/types/donations'

interface DonationModalProps {
  isOpen: boolean
  onClose: () => void
}

const PRESET_AMOUNTS = [10, 25, 50, 100, 250, 500]

const GIFT_AID_DECLARATION = `I am a UK taxpayer and understand that if I pay less Income Tax and/or Capital Gains Tax in the current tax year than the amount of Gift Aid claimed on all my donations it is my responsibility to pay any difference.

I want Masjid Al-Madina to reclaim 25p of tax on every £1 that I have given.`

const GIFT_AID_VERSION = '2024-01'

const DonationModal = ({ isOpen, onClose }: DonationModalProps) => {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<DonationFormData>({
    amount: 50,
    fundType: 'general',
    isRecurring: false,
    giftAid: false,
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postcode: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()

  const resetForm = () => {
    setStep(1)
    setFormData({
      amount: 50,
      fundType: 'general',
      isRecurring: false,
      giftAid: false,
      fullName: '',
      email: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      postcode: '',
    })
    setErrors({})
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.amount || formData.amount < 1) {
      newErrors.amount = 'Please enter a valid amount (minimum £1)'
    }
    if (formData.amount > 50000) {
      newErrors.amount = 'For donations over £50,000, please contact us directly'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Gift Aid requires full UK address
    if (formData.giftAid) {
      if (!formData.addressLine1?.trim()) {
        newErrors.addressLine1 = 'Address is required for Gift Aid'
      }
      if (!formData.city?.trim()) {
        newErrors.city = 'City is required for Gift Aid'
      }
      if (!formData.postcode?.trim()) {
        newErrors.postcode = 'Postcode is required for Gift Aid'
      } else if (!/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i.test(formData.postcode)) {
        newErrors.postcode = 'Please enter a valid UK postcode'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const { url } = await createCheckoutSession({
        amount: formData.amount * 100, // Convert to pence
        fundType: formData.fundType,
        isRecurring: formData.isRecurring,
        giftAid: formData.giftAid,
        donor: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          postcode: formData.postcode,
        },
        successUrl: `${window.location.origin}/donation/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/donation/cancelled`,
      })

      // Redirect to Stripe Checkout
      window.location.href = url
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to process donation. Please try again.',
        variant: 'destructive',
      })
      setIsSubmitting(false)
    }
  }

  const giftAidAmount = formData.giftAid ? Math.round(formData.amount * 0.25 * 100) / 100 : 0
  const totalImpact = formData.amount + giftAidAmount

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-background rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-primary text-primary-foreground">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            <div>
              <h2 className="text-xl font-bold">Support Our Mosque</h2>
              <p className="text-sm opacity-80">Step {step} of 3</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="text-primary-foreground hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-muted">
          <div 
            className="h-full bg-gold transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Step 1: Amount & Fund Selection */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Donation Type Toggle */}
              <div>
                <Label className="text-base font-semibold mb-3 block">Donation Type</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={!formData.isRecurring ? 'default' : 'outline'}
                    onClick={() => setFormData({ ...formData, isRecurring: false })}
                    className={!formData.isRecurring ? 'mosque-button' : ''}
                  >
                    One-time
                  </Button>
                  <Button
                    type="button"
                    variant={formData.isRecurring ? 'default' : 'outline'}
                    onClick={() => setFormData({ ...formData, isRecurring: true })}
                    className={formData.isRecurring ? 'mosque-button' : ''}
                  >
                    Monthly
                  </Button>
                </div>
              </div>

              {/* Preset Amounts */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Select Amount {formData.isRecurring && '(per month)'}
                </Label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {PRESET_AMOUNTS.map((amount) => (
                    <Button
                      key={amount}
                      type="button"
                      variant={formData.amount === amount ? 'default' : 'outline'}
                      onClick={() => setFormData({ ...formData, amount, customAmount: undefined })}
                      className={formData.amount === amount ? 'mosque-button' : ''}
                    >
                      £{amount}
                    </Button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
                  <Input
                    type="number"
                    placeholder="Custom amount"
                    value={formData.customAmount || ''}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0
                      setFormData({ ...formData, amount: value, customAmount: value })
                    }}
                    className="pl-8"
                    min="1"
                    max="50000"
                  />
                </div>
                {errors.amount && (
                  <p className="text-sm text-red-500 mt-1">{errors.amount}</p>
                )}
              </div>

              {/* Fund Type Selection */}
              <div>
                <Label className="text-base font-semibold mb-3 block">Designate Your Donation</Label>
                <div className="grid grid-cols-1 gap-2">
                  {(Object.keys(FUND_TYPE_LABELS) as FundType[]).map((fundType) => {
                    const fund = FUND_TYPE_LABELS[fundType]
                    const isSelected = formData.fundType === fundType
                    return (
                      <Card
                        key={fundType}
                        className={`cursor-pointer transition-all ${
                          isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-accent'
                        }`}
                        onClick={() => setFormData({ ...formData, fundType })}
                      >
                        <CardContent className="p-3 flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{fund.label}</span>
                              <span className="text-sm font-arabic text-gold">{fund.arabic}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{fund.description}</p>
                          </div>
                          {isSelected && (
                            <Check className="w-5 h-5 text-primary" />
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Donor Information */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-primary">Your Information</h3>
                
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    className={errors.fullName ? 'border-red-500' : ''}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              {/* Gift Aid Section */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="giftAid"
                    checked={formData.giftAid}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, giftAid: checked as boolean })
                    }
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor="giftAid" className="text-base font-semibold cursor-pointer">
                      Add Gift Aid (worth £{giftAidAmount.toFixed(2)})
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Increase your donation by 25% at no extra cost to you
                    </p>
                  </div>
                </div>

                {formData.giftAid && (
                  <div className="space-y-4 pl-7">
                    {/* Gift Aid Declaration */}
                    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
                            Gift Aid Declaration
                          </p>
                          <p className="text-xs text-amber-700 dark:text-amber-300 mt-1 whitespace-pre-line">
                            {GIFT_AID_DECLARATION}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* UK Address Fields */}
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        A UK address is required to claim Gift Aid
                      </p>
                      
                      <div>
                        <Label htmlFor="addressLine1">Address Line 1 *</Label>
                        <Input
                          id="addressLine1"
                          value={formData.addressLine1}
                          onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                          placeholder="Street address"
                          className={errors.addressLine1 ? 'border-red-500' : ''}
                        />
                        {errors.addressLine1 && (
                          <p className="text-sm text-red-500 mt-1">{errors.addressLine1}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="addressLine2">Address Line 2</Label>
                        <Input
                          id="addressLine2"
                          value={formData.addressLine2}
                          onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                          placeholder="Apartment, suite, etc. (optional)"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            placeholder="City"
                            className={errors.city ? 'border-red-500' : ''}
                          />
                          {errors.city && (
                            <p className="text-sm text-red-500 mt-1">{errors.city}</p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="postcode">Postcode *</Label>
                          <Input
                            id="postcode"
                            value={formData.postcode}
                            onChange={(e) => setFormData({ ...formData, postcode: e.target.value.toUpperCase() })}
                            placeholder="GL50 1AA"
                            className={errors.postcode ? 'border-red-500' : ''}
                          />
                          {errors.postcode && (
                            <p className="text-sm text-red-500 mt-1">{errors.postcode}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Review & Confirm */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="font-semibold text-primary text-lg">Review Your Donation</h3>

              {/* Summary Card */}
              <Card className="bg-muted/50">
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Donation Amount</span>
                    <span className="font-semibold text-lg">£{formData.amount.toFixed(2)}</span>
                  </div>

                  {formData.isRecurring && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Frequency</span>
                      <span className="font-medium">Monthly</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Fund</span>
                    <span className="font-medium">{FUND_TYPE_LABELS[formData.fundType].label}</span>
                  </div>

                  {formData.giftAid && (
                    <>
                      <div className="flex justify-between items-center text-green-600">
                        <span>Gift Aid (25%)</span>
                        <span className="font-medium">+ £{giftAidAmount.toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-3 flex justify-between items-center">
                        <span className="font-semibold">Total Impact</span>
                        <span className="font-bold text-xl text-primary">£{totalImpact.toFixed(2)}</span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Donor Summary */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">Donor Information</h4>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p>{formData.fullName}</p>
                    <p>{formData.email}</p>
                    {formData.giftAid && (
                      <p>
                        {formData.addressLine1}, {formData.city}, {formData.postcode}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Security Note */}
              <div className="text-center text-sm text-muted-foreground">
                <p>🔒 Secure payment powered by Stripe</p>
                <p className="mt-1">
                  You will be redirected to complete your payment securely
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-muted/30 flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep((step - 1) as 1 | 2)}>
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button onClick={handleNextStep} className="mosque-button">
              Continue
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="mosque-button min-w-[150px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Donate £{formData.amount.toFixed(2)}
                  {formData.isRecurring && '/month'}
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default DonationModal