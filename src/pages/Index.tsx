import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { 
  Heart, 
  Phone, 
  Pill, 
  FileText, 
  BookOpen, 
  Users, 
  Wifi,
  MessageSquare,
  Video,
  Shield,
  MapPin
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: FileText,
      title: "Digital Health Records",
      description: "Access and update patient records even offline. Data syncs automatically when connection is restored.",
      color: "text-primary",
      bg: "bg-primary/10"
    },
    {
      icon: Phone,
      title: "Emergency Services",
      description: "Request ambulances instantly with GPS tracking, real-time ETA updates via SMS or app.",
      color: "text-emergency",
      bg: "bg-emergency/10"
    },
    {
      icon: Pill,
      title: "Medicine Delivery",
      description: "Order medicines and track delivery status. Simple text updates for basic phones.",
      color: "text-accent",
      bg: "bg-accent/10"
    },
    {
      icon: Video,
      title: "Video Consultations",
      description: "Connect with doctors via video, phone, or text. Adaptive bandwidth technology for weak connections.",
      color: "text-secondary",
      bg: "bg-secondary/10"
    },
    {
      icon: Shield,
      title: "AI-Assisted Triage",
      description: "Smart symptom checker suggests next steps and flags emergencies for instant escalation.",
      color: "text-info",
      bg: "bg-info/10"
    },
    {
      icon: BookOpen,
      title: "Health Education",
      description: "Voice and text-based health tips, preventive care, and reminders in local languages.",
      color: "text-warning",
      bg: "bg-warning/10"
    }
  ];

  const stats = [
    { value: "10K+", label: "Villagers Served" },
    { value: "500+", label: "Health Workers" },
    { value: "50+", label: "Villages Connected" },
    { value: "24/7", label: "Support Available" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-medium">
              <Wifi className="w-4 h-4" />
              <span>Works Offline • SMS Enabled • Low Bandwidth</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Healthcare for
              <span className="block bg-gradient-hero bg-clip-text text-transparent">
                Every Village
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connecting rural communities with quality healthcare through offline-first technology, 
              multi-modal communication, and AI-powered support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/dashboard">
                <Button size="lg" className="text-lg px-8 h-14 shadow-primary">
                  <Heart className="w-5 h-5 mr-2" />
                  Access Dashboard
                </Button>
              </Link>
              <Link to="/emergency">
                <Button variant="outline" size="lg" className="text-lg px-8 h-14 border-2 border-emergency text-emergency hover:bg-emergency hover:text-white">
                  <Phone className="w-5 h-5 mr-2" />
                  Emergency Help
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-in fade-in slide-in-from-bottom-4 duration-1000" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/90 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Comprehensive Healthcare Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Designed for low-connectivity environments with offline-first capabilities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const getRoute = (title: string) => {
                if (title.includes('Records')) return '/records';
                if (title.includes('Emergency')) return '/emergency';
                if (title.includes('Medicine')) return '/medicine';
                if (title.includes('Video') || title.includes('Consultation')) return '/dashboard';
                if (title.includes('Triage') || title.includes('AI')) return '/dashboard';
                if (title.includes('Education')) return '/education';
                return '/dashboard';
              };
              
              return (
                <Link to={getRoute(feature.title)} key={index}>
                  <Card 
                    className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 cursor-pointer group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`w-14 h-14 ${feature.bg} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`w-7 h-7 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Simple. Reliable. Accessible.
            </h2>
            <p className="text-xl text-muted-foreground">
              Three ways to connect with healthcare
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => window.open('sms:108?body=HELP I need medical assistance', '_self')}>
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-primary group-hover:scale-110 transition-transform">
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Text/SMS</h3>
              <p className="text-muted-foreground">
                Send simple text commands even from basic phones. No internet required.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => window.open('tel:108', '_self')}>
              <div className="w-20 h-20 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Phone className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Voice Calls</h3>
              <p className="text-muted-foreground">
                Speak directly with health workers or use voice commands for hands-free access.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => { 
                    alert('Video consultation feature - In a real app, this would open a video call interface');
                  }}>
              <div className="w-20 h-20 bg-gradient-emergency rounded-full flex items-center justify-center mx-auto mb-6 shadow-emergency group-hover:scale-110 transition-transform">
                <Video className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Video Chat</h3>
              <p className="text-muted-foreground">
                Connect face-to-face with doctors. Adapts automatically to your connection speed.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-12 bg-gradient-hero text-center">
            <Users className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Join Our Healthcare Network
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Whether you're a patient, health worker, or community leader, 
              HealthConnect is here to serve you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" variant="secondary" className="text-lg px-8 h-14">
                  Get Started
                </Button>
              </Link>
              <Link to="/education">
                <Button size="lg" variant="outline" className="text-lg px-8 h-14 bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Learn More
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-primary">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-foreground">HealthConnect</span>
            </div>
            <p className="text-muted-foreground text-center">
              © 2025 HealthConnect. Connecting communities with healthcare.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Serving rural communities worldwide</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile padding for bottom nav */}
      <div className="h-20 md:hidden" />
    </div>
  );
};

export default Index;
