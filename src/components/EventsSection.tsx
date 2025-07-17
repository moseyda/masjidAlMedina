import { Calendar, Clock, MapPin, Users, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const EventsSection = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Community Iftar",
      date: "2024-03-15",
      time: "7:30 PM",
      location: "Main Prayer Hall",
      description: "Join us for a community iftar during Ramadan. All families welcome.",
      category: "Community",
      attendees: 120,
      arabic: "إفطار جماعي"
    },
    {
      id: 2,
      title: "Islamic History Lecture",
      date: "2024-03-20",
      time: "7:00 PM",
      location: "Education Room",
      description: "Learn about the Golden Age of Islam with Dr. Ahmed Hassan.",
      category: "Education",
      attendees: 45,
      arabic: "محاضرة التاريخ الإسلامي"
    },
    {
      id: 3,
      title: "Youth Football Tournament",
      date: "2024-03-25",
      time: "2:00 PM",
      location: "Cheltenham Sports Centre",
      description: "Annual football tournament for youth aged 12-18.",
      category: "Sports",
      attendees: 60,
      arabic: "بطولة كرة القدم للشباب"
    },
    {
      id: 4,
      title: "Charity Fundraiser Dinner",
      date: "2024-03-30",
      time: "6:00 PM",
      location: "Main Hall",
      description: "Fundraising dinner for our local food bank initiative.",
      category: "Charity",
      attendees: 200,
      arabic: "عشاء خيري"
    }
  ];

  const announcements = [
    {
      title: "Ramadan Schedule 2024",
      date: "March 10, 2024",
      content: "Ramadan prayer times and iftar schedule now available. Please check the notice board for detailed timings.",
      urgent: true
    },
    {
      title: "New Arabic Classes Starting",
      date: "March 8, 2024",
      content: "Beginner Arabic classes for adults starting next month. Registration is now open.",
      urgent: false
    },
    {
      title: "Parking Notice",
      date: "March 5, 2024",
      content: "Please be mindful of our neighbours when parking. Use designated areas only.",
      urgent: false
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Community: 'bg-primary',
      Education: 'bg-gold',
      Sports: 'bg-green-500',
      Charity: 'bg-red-500'
    };
    return colors[category] || 'bg-muted';
  };

  return (
    <section id="events" className="py-16 bg-muted/30">
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
            
            <div className="space-y-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="prayer-time-card group hover:scale-[1.02]">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg text-primary group-hover:text-primary-light transition-colors">
                          {event.title}
                        </CardTitle>
                        <p className="text-sm font-arabic text-gold">{event.arabic}</p>
                      </div>
                      <Badge className={`${getCategoryColor(event.category)} text-white w-fit`}>
                        {event.category}
                      </Badge>
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
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees} registered</span>
                      </div>
                      <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Learn More
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
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
            
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <Card key={index} className={`prayer-time-card ${announcement.urgent ? 'border-l-4 border-l-red-500' : ''}`}>
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
                      {announcement.date}
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
                <Button className="w-full mosque-button">
                  Submit Event Proposal
                </Button>
                <Button variant="outline" className="w-full">
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
    </section>
  );
};

export default EventsSection;