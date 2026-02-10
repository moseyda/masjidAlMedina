import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { createEventProposal } from '@/services/eventProposals'

interface EventProposalModalProps {
  isOpen: boolean
  onClose: () => void
}

const EventProposalModal = ({ isOpen, onClose }: EventProposalModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    arabic: '',
    proposer_name: '',
    proposer_email: '',
    proposer_phone: '',
  })
  const { toast } = useToast()

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: '',
      arabic: '',
      proposer_name: '',
      proposer_email: '',
      proposer_phone: '',
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await createEventProposal(formData)
      toast({
        title: 'Proposal Submitted!',
        description: 'Your event proposal has been submitted for review. We will contact you soon.',
      })
      resetForm()
      onClose()
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit proposal',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-background rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-primary text-primary-foreground">
          <div>
            <h2 className="text-xl font-bold">Submit Event Proposal</h2>
            <p className="text-sm opacity-80">Share your event idea with the community</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="text-primary-foreground hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 overflow-y-auto max-h-[70vh]">
          {/* Contact Information */}
          <div className="space-y-4 pb-4 border-b">
            <h3 className="font-semibold text-primary">Your Information</h3>
            <div>
              <label className="text-sm font-medium mb-1 block">Your Name *</label>
              <Input
                value={formData.proposer_name}
                onChange={(e) => setFormData({ ...formData, proposer_name: e.target.value })}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Email *</label>
                <Input
                  type="email"
                  value={formData.proposer_email}
                  onChange={(e) => setFormData({ ...formData, proposer_email: e.target.value })}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Phone</label>
                <Input
                  type="tel"
                  value={formData.proposer_phone}
                  onChange={(e) => setFormData({ ...formData, proposer_phone: e.target.value })}
                  placeholder="Optional"
                />
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-primary">Event Details</h3>
            <div>
              <label className="text-sm font-medium mb-1 block">Event Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter event title"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Arabic Title</label>
              <Input
                value={formData.arabic}
                onChange={(e) => setFormData({ ...formData, arabic: e.target.value })}
                className="font-arabic"
                dir="rtl"
                placeholder="اختياري"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your event..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Proposed Date *</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Proposed Time *</label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Location</label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Main Hall, Prayer Hall"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Category</label>
              <Input
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Community, Education, Sports, Charity"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="mosque-button">
              {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EventProposalModal