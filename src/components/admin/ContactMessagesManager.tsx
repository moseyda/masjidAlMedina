import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { Trash2, Mail } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  created_at: string
}

const ContactMessagesManager = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMessages(data)
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load messages', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return

    try {
      const { error } = await supabase.from('contact_messages').delete().eq('id', id)
      if (error) throw error
      setMessages(messages.filter((m) => m.id !== id))
      toast({ title: 'Message deleted' })
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) return <p>Loading messages...</p>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Contact Messages</h2>
        <Badge variant="secondary">{messages.length} messages</Badge>
      </div>

      {messages.length === 0 ? (
        <p className="text-muted-foreground">No messages yet.</p>
      ) : (
        <div className="grid gap-4">
          {messages.map((message) => (
            <Card key={message.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{message.name}</h3>
                      {message.subject && <Badge variant="outline">{message.subject}</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{message.message}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {message.email}
                      </span>
                      {message.phone && <span>📞 {message.phone}</span>}
                      <span>{formatDate(message.created_at)}</span>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(message.id)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default ContactMessagesManager