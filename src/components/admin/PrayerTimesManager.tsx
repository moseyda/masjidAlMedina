import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase'

const PrayerTimesManager = () => {
  const [date, setDate] = useState('')
  const [times, setTimes] = useState({
    fajr: '',
    sunrise: '',
    dhuhr: '',
    asr: '',
    maghrib: '',
    isha: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('prayer_times')
        .upsert({ date, ...times }, { onConflict: 'date' })

      if (error) throw error

      toast({ title: 'Prayer times saved' })
      setDate('')
      setTimes({ fajr: '', sunrise: '', dhuhr: '', asr: '', maghrib: '', isha: '' })
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Manage Prayer Times</h2>

      <Card>
        <CardHeader>
          <CardTitle>Add/Update Prayer Times</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Date</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(times).map(([prayer, time]) => (
                <div key={prayer}>
                  <label className="text-sm font-medium mb-1 block capitalize">{prayer}</label>
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTimes({ ...times, [prayer]: e.target.value })}
                    required
                  />
                </div>
              ))}
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Prayer Times'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default PrayerTimesManager