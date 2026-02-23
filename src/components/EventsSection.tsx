import { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Users, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getEvents, Event } from '@/services/events';
import { getAnnouncements, subscribeToAnnouncements, Announcement } from '@/services/announcements';
import EventProposalModal from './EventProposalModal';
import EventCalendarModal from './EventCalendarModal';

const EventsSection = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [eventsData, announcementsData] = await Promise.all([
          getEvents(),
          getAnnouncements()
        ]);
        setUpcomingEvents(eventsData);
        setAnnouncements(announcementsData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    const unsubscribe = subscribeToAnnouncements(setAnnouncements);
    return () => unsubscribe();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string | undefined) => {
    const colors: { [key: string]: string } = {
      Community: 'bg-primary',
      Education: 'bg-gold',
      Sports: 'bg-green-500',
      Charity: 'bg-red-500'
    };
    return colors[category || ''] || 'bg-muted';
  };

  return (
    <section id="events" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Events & Announcements
          </h2>
          <p className="font-arabic text-lg text-gold mb-4">الفعاليات والإعلانات</p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay connected with our community through regular events, educational programs, and important announcements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Events */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-2" />
              Upcoming Events
            </h3>
            
            {loading && (
              <p className="text-muted-foreground">Loading events...</p>
            )}

            {error && (
              <p className="text-red-500">{error}</p>
            )}

            {!loading && !error && upcomingEvents.length === 0 && (
              <p className="text-muted-foreground">No upcoming events</p>
            )}

            <div className="space-y-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="prayer-time-card group hover:scale-[1.02]">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg text-primary group-hover:text-primary-light transition-colors">
                          {event.title}
                        </CardTitle>
                        {event.arabic && (
                          <p className="text-sm font-arabic text-gold">{event.arabic}</p>
                        )}
                      </div>
                      {event.category && (
                        <Badge className={`${getCategoryColor(event.category)} text-white w-fit`}>
                          {event.category}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {event.description}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-6">
              Announcements
            </h3>
            
            {loading && (
              <p className="text-muted-foreground">Loading announcements...</p>
            )}

            {!loading && announcements.length === 0 && (
              <p className="text-muted-foreground">No announcements</p>
            )}

            <div className="space-y-4">
              {announcements.map((announcement) => (
                <Card key={announcement.id} className={`prayer-time-card ${announcement.urgent ? 'border-l-4 border-l-red-500' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-primary">{announcement.title}</h4>
                      {announcement.urgent && (
                        <Badge variant="destructive" className="text-xs">
                          Urgent
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {announcement.content}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(announcement.created_at)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="prayer-time-card mt-6">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full mosque-button"
                  onClick={() => setShowProposalModal(true)}
                >
                  Submit Event Proposal
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowCalendarModal(true)}
                >
                  View Event Calendar
                </Button>
                <Button variant="outline" className="w-full">
                  Subscribe to Updates
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Event Proposal Modal */}
      <EventProposalModal 
        isOpen={showProposalModal} 
        onClose={() => setShowProposalModal(false)} 
      />

      {/* Event Calendar Modal */}
      <EventCalendarModal 
        isOpen={showCalendarModal} 
        onClose={() => setShowCalendarModal(false)} 
      />
    </section>
  );
};

export default EventsSection;