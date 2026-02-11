import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getEvents, Event } from '@/services/events'

interface EventCalendarModalProps {
  isOpen: boolean
  onClose: () => void
}

const EventCalendarModal = ({ isOpen, onClose }: EventCalendarModalProps) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<Event[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [loading, setLoading] = useState(true)

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  useEffect(() => {
    if (!isOpen) return

    const fetchEvents = async () => {
      setLoading(true)
      try {
        const data = await getEvents()
        setEvents(data)
      } catch (error) {
        console.error('Failed to fetch events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [isOpen])

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    setSelectedDate(null)
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    setSelectedDate(null)
  }

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return events.filter(event => event.date === dateStr)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const getCategoryColor = (category: string | undefined) => {
    const colors: { [key: string]: string } = {
      Community: 'bg-primary',
      Education: 'bg-gold',
      Sports: 'bg-green-500',
      Charity: 'bg-red-500'
    }
    return colors[category || ''] || 'bg-primary'
  }

  const renderCalendar = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    const today = new Date()

    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12 sm:h-20"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const dayEvents = getEventsForDate(date)
      const isToday = 
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      const isSelected = selectedDate?.toDateString() === date.toDateString()

      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-12 sm:h-20 p-1 border border-border rounded-lg transition-all duration-200 flex flex-col items-center justify-start hover:bg-accent ${
            isToday ? 'bg-primary/10 border-primary' : ''
          } ${isSelected ? 'ring-2 ring-primary bg-primary/5' : ''}`}
        >
          <span className={`text-sm font-medium ${isToday ? 'text-primary font-bold' : ''}`}>
            {day}
          </span>
          {dayEvents.length > 0 && (
            <div className="flex flex-wrap gap-0.5 mt-1 justify-center">
              {dayEvents.slice(0, 3).map((event, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full ${getCategoryColor(event.category)}`}
                  title={event.title}
                ></div>
              ))}
              {dayEvents.length > 3 && (
                <span className="text-xs text-muted-foreground">+{dayEvents.length - 3}</span>
              )}
            </div>
          )}
        </button>
      )
    }

    return days
  }

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-background rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-primary text-primary-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <h2 className="text-xl font-bold">Event Calendar</h2>
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

        <div className="flex flex-col lg:flex-row">
          {/* Calendar */}
          <div className="flex-1 p-4">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" size="icon" onClick={handlePrevMonth}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h3 className="text-lg font-semibold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <Button variant="outline" size="icon" onClick={handleNextMonth}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map(day => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-1">
                {renderCalendar()}
              </div>
            )}

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span>Community</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-gold"></div>
                <span>Education</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Sports</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Charity</span>
              </div>
            </div>
          </div>

          {/* Selected Date Events */}
          <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l p-4 bg-muted/30 overflow-y-auto max-h-[50vh] lg:max-h-[70vh]">
            <h4 className="font-semibold mb-4">
              {selectedDate 
                ? formatDate(selectedDate.toISOString())
                : 'Select a date'
              }
            </h4>

            {!selectedDate && (
              <p className="text-sm text-muted-foreground">
                Click on a date to see events
              </p>
            )}

            {selectedDate && selectedDateEvents.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No events on this date
              </p>
            )}

            <div className="space-y-3">
              {selectedDateEvents.map(event => (
                <Card key={event.id} className="prayer-time-card">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-semibold text-primary text-sm">{event.title}</h5>
                      {event.category && (
                        <Badge className={`${getCategoryColor(event.category)} text-white text-xs`}>
                          {event.category}
                        </Badge>
                      )}
                    </div>
                    {event.arabic && (
                      <p className="text-xs font-arabic text-gold mb-2">{event.arabic}</p>
                    )}
                    {event.description && (
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{event.time}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCalendarModal