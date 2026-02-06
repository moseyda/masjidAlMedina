import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, MessageSquare, Clock, LogOut, Plus } from 'lucide-react'
import EventsManager from '@/components/admin/EventsManager'
import AnnouncementsManager from '@/components/admin/AnnouncementsManager'
import PrayerTimesManager from '@/components/admin/PrayerTimesManager'
import ContactMessagesManager from '@/components/admin/ContactMessagesManager'

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
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm opacity-80">Masjid Al Medina</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">{user.email}</span>
            <Button variant="secondary" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="announcements" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Announcements
            </TabsTrigger>
            <TabsTrigger value="prayer-times" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Prayer Times
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <EventsManager />
          </TabsContent>

          <TabsContent value="announcements">
            <AnnouncementsManager />
          </TabsContent>

          <TabsContent value="prayer-times">
            <PrayerTimesManager />
          </TabsContent>

          <TabsContent value="messages">
            <ContactMessagesManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default AdminDashboard