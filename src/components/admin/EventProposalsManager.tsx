import { useEffect, useState } from 'react'
import { Check, X, Trash2, Calendar, Clock, MapPin, User, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { 
  getEventProposals, 
  updateProposalStatus, 
  deleteEventProposal,
  EventProposal 
} from '@/services/eventProposals'
import { createEvent } from '@/services/events'

const EventProposalsManager = () => {
  const [proposals, setProposals] = useState<EventProposal[]>([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchProposals = async () => {
    try {
      const data = await getEventProposals()
      setProposals(data)
    } catch (error) {
      console.error('Failed to fetch proposals:', error)
      toast({
        title: 'Error',
        description: 'Failed to load event proposals',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProposals()
  }, [])

  const handleApprove = async (proposal: EventProposal) => {
    setProcessingId(proposal.id)
    try {
      // Create the event from proposal
      await createEvent({
        title: proposal.title,
        description: proposal.description || '',
        date: proposal.date,
        time: proposal.time,
        location: proposal.location || '',
        category: proposal.category || '',
        arabic: proposal.arabic || '',
      })

      // Update proposal status
      await updateProposalStatus(proposal.id, 'approved')

      toast({
        title: 'Proposal Approved',
        description: 'Event has been created and is now visible to the public.',
      })

      fetchProposals()
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to approve proposal',
        variant: 'destructive',
      })
    } finally {
      setProcessingId(null)
    }
  }

  const handleDecline = async (id: string) => {
    setProcessingId(id)
    try {
      await updateProposalStatus(id, 'declined')
      toast({
        title: 'Proposal Declined',
        description: 'The proposal has been declined.',
      })
      fetchProposals()
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to decline proposal',
        variant: 'destructive',
      })
    } finally {
      setProcessingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this proposal?')) return

    setProcessingId(id)
    try {
      await deleteEventProposal(id)
      toast({
        title: 'Proposal Deleted',
        description: 'The proposal has been removed.',
      })
      fetchProposals()
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete proposal',
        variant: 'destructive',
      })
    } finally {
      setProcessingId(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Approved</Badge>
      case 'declined':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Declined</Badge>
      default:
        return null
    }
  }

  const pendingProposals = proposals.filter(p => p.status === 'pending')
  const processedProposals = proposals.filter(p => p.status !== 'pending')

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Pending Proposals */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          Pending Proposals
          {pendingProposals.length > 0 && (
            <Badge className="bg-yellow-500">{pendingProposals.length}</Badge>
          )}
        </h3>

        {pendingProposals.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No pending proposals
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {pendingProposals.map((proposal) => (
              <Card key={proposal.id} className="border-l-4 border-l-yellow-500">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{proposal.title}</CardTitle>
                      {proposal.arabic && (
                        <p className="text-sm font-arabic text-gold">{proposal.arabic}</p>
                      )}
                    </div>
                    {getStatusBadge(proposal.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {proposal.description && (
                    <p className="text-muted-foreground">{proposal.description}</p>
                  )}

                  {/* Event Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{formatDate(proposal.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{proposal.time}</span>
                    </div>
                    {proposal.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{proposal.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Proposer Info */}
                  <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Submitted by</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span>{proposal.proposer_name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <a href={`mailto:${proposal.proposer_email}`} className="text-primary hover:underline">
                          {proposal.proposer_email}
                        </a>
                      </div>
                      {proposal.proposer_phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <a href={`tel:${proposal.proposer_phone}`} className="text-primary hover:underline">
                            {proposal.proposer_phone}
                          </a>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Submitted on {formatDate(proposal.created_at)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2 pt-2 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDecline(proposal.id)}
                      disabled={processingId === proposal.id}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Decline
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleApprove(proposal)}
                      disabled={processingId === proposal.id}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Approve & Publish
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Processed Proposals */}
      {processedProposals.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Processed Proposals</h3>
          <div className="grid gap-4">
            {processedProposals.map((proposal) => (
              <Card key={proposal.id} className={`opacity-75 ${
                proposal.status === 'approved' ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-500'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{proposal.title}</h4>
                        {getStatusBadge(proposal.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        by {proposal.proposer_name} • {formatDate(proposal.created_at)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(proposal.id)}
                      disabled={processingId === proposal.id}
                      className="text-muted-foreground hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default EventProposalsManager