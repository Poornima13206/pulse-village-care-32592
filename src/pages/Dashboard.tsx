import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VoiceInput from "@/components/VoiceInput";
import { 
  Heart, 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  Phone,
  Pill,
  Calendar,
  TrendingUp,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { toast } = useToast();

  const handleVoiceInput = (text: string) => {
    toast({
      title: "Voice input received",
      description: `Processing: "${text}"`,
    });
  };

  const healthMetrics = [
    { label: "Heart Rate", value: "72 bpm", icon: Heart, color: "text-emergency", trend: "normal" },
    { label: "Blood Pressure", value: "120/80", icon: Activity, color: "text-primary", trend: "normal" },
    { label: "Temperature", value: "98.6°F", icon: AlertCircle, color: "text-secondary", trend: "normal" },
    { label: "Oxygen Level", value: "98%", icon: TrendingUp, color: "text-accent", trend: "good" },
  ];

  const recentActivities = [
    { 
      title: "Checkup Completed", 
      time: "2 hours ago", 
      icon: CheckCircle, 
      color: "text-secondary",
      description: "Annual health screening"
    },
    { 
      title: "Medicine Delivered", 
      time: "Yesterday", 
      icon: Pill, 
      color: "text-accent",
      description: "Monthly prescription refill"
    },
    { 
      title: "Video Consultation", 
      time: "3 days ago", 
      icon: Phone, 
      color: "text-primary",
      description: "Dr. Sharma - Follow-up"
    },
  ];

  const upcomingAppointments = [
    { 
      title: "Health Worker Visit", 
      date: "Tomorrow, 10:00 AM",
      doctor: "Nurse Priya",
      type: "Home Visit"
    },
    { 
      title: "Video Consultation", 
      date: "May 15, 3:00 PM",
      doctor: "Dr. Kumar",
      type: "Follow-up"
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Health Dashboard</h1>
          <p className="text-muted-foreground text-lg">Welcome back! Here's your health overview.</p>
        </div>

        {/* Voice Input Section */}
        <Card className="p-6 mb-8 bg-gradient-primary shadow-primary">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">Quick Actions</h2>
          </div>
          <p className="text-white/90 mb-4">Speak or type your request</p>
          <VoiceInput 
            onTranscript={handleVoiceInput}
            placeholder="Say or type: 'Check my records' or 'Order medicine'..."
          />
        </Card>

        {/* Health Metrics */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Current Vitals</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {healthMetrics.map((metric, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1"
                onClick={() => toast({
                  title: metric.label,
                  description: `Current reading: ${metric.value} - Status: ${metric.trend}`
                })}
              >
                <div className="flex items-center justify-between mb-3">
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    metric.trend === 'normal' ? 'bg-secondary/10 text-secondary' : 'bg-accent/10 text-accent'
                  }`}>
                    {metric.trend}
                  </span>
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Activities */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6 text-primary" />
              Recent Activities
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className={`w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0`}>
                    <activity.icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-foreground">{activity.title}</div>
                    <div className="text-sm text-muted-foreground">{activity.description}</div>
                    <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Appointments */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-accent" />
              Upcoming Appointments
            </h2>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <div key={index} className="p-4 rounded-lg border-2 border-border hover:border-primary transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-semibold text-foreground">{appointment.title}</div>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {appointment.type}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">{appointment.doctor}</div>
                  <div className="text-sm font-medium text-foreground">{appointment.date}</div>
                </div>
              ))}
              <Button className="w-full" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule New Appointment
              </Button>
            </div>
          </Card>
        </div>

        {/* Quick Access Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <Link to="/emergency" className="block">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-emergency/5 border-emergency/20">
              <Phone className="w-8 h-8 text-emergency mb-3" />
              <h3 className="text-xl font-bold text-foreground mb-2">Emergency</h3>
              <p className="text-muted-foreground">Request immediate help</p>
            </Card>
          </Link>
          
          <Link to="/medicine" className="block">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <Pill className="w-8 h-8 text-accent mb-3" />
              <h3 className="text-xl font-bold text-foreground mb-2">Order Medicine</h3>
              <p className="text-muted-foreground">Refill prescriptions</p>
            </Card>
          </Link>
          
          <Link to="/records" className="block">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <Heart className="w-8 h-8 text-primary mb-3" />
              <h3 className="text-xl font-bold text-foreground mb-2">Health Records</h3>
              <p className="text-muted-foreground">View medical history</p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
