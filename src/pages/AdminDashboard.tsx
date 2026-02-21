import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, LogOut, Calendar, Megaphone, Clock, FileText, LetterTextIcon } from 'lucide-react'
import EventsManager from '@/components/admin/EventsManager'
import AnnouncementsManager from '@/components/admin/AnnouncementsManager'
import PrayerTimesManager from '@/components/admin/PrayerTimesManager'
import EventProposalsManager from '@/components/admin/EventProposalsManager'
import ContactMessagesManager from '@/components/admin/ContactMessagesManager'
import NewsletterAdminDashboard from '@/components/admin/NewsletterAdminDashboard'

const AdminDashboard = () => {
  const { user, signOut, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login')
    }
  }, [user, loading, navigate])

  const handleSignOut = async () => {
    await signOut()
    navigate('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Masjid Al-Madina</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="proposals" className="space-y-6">
          <TabsList className="grid grid-cols-6 w-full max-w-5xl">
            <TabsTrigger value="proposals" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Proposals</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>
            <TabsTrigger value="announcements" className="flex items-center gap-2">
              <Megaphone className="w-4 h-4" />
              <span className="hidden sm:inline">Announcements</span>
            </TabsTrigger>
            <TabsTrigger value="prayer-times" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">Prayer Times</span>
            </TabsTrigger>
            <TabsTrigger value="contact-messages" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Contact Messages</span>
            </TabsTrigger>
            <TabsTrigger value="newsletter" className="flex items-center gap-2">
              <LetterTextIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Newsletter</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="proposals">
            <Card>
              <CardHeader>
                <CardTitle>Event Proposals</CardTitle>
              </CardHeader>
              <CardContent>
                <EventProposalsManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Manage Events</CardTitle>
              </CardHeader>
              <CardContent>
                <EventsManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="announcements">
            <Card>
              <CardHeader>
                <CardTitle>Manage Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <AnnouncementsManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prayer-times">
            <Card>
              <CardHeader>
                <CardTitle>Manage Prayer Times</CardTitle>
              </CardHeader>
              <CardContent>
                <PrayerTimesManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact-messages">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactMessagesManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="newsletter">
            <Card>
              <CardHeader>
                <CardTitle>Newsletter</CardTitle>
              </CardHeader>
              <CardContent>
                <NewsletterAdminDashboard />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default AdminDashboard