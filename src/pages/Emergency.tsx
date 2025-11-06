import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VoiceInput from "@/components/VoiceInput";
import { 
  Phone, 
  MapPin, 
  AlertTriangle, 
  Clock,
  Ambulance,
  Heart,
  User,
  Navigation as NavigationIcon,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Emergency = () => {
  const { toast } = useToast();
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [ambulanceStatus, setAmbulanceStatus] = useState<'idle' | 'requested' | 'dispatched' | 'arriving'>('idle');

  const handleEmergencyRequest = () => {
    setIsEmergencyActive(true);
    setAmbulanceStatus('requested');
    
    toast({
      title: "Emergency Alert Sent!",
      description: "Help is on the way. Stay calm and wait for assistance.",
      variant: "default",
    });

    // Simulate ambulance dispatch
    setTimeout(() => {
      setAmbulanceStatus('dispatched');
      toast({
        title: "Ambulance Dispatched",
        description: "ETA: 15 minutes. GPS tracking enabled.",
      });
    }, 2000);

    setTimeout(() => {
      setAmbulanceStatus('arriving');
      toast({
        title: "Ambulance Arriving Soon",
        description: "ETA: 5 minutes. Prepare patient for transport.",
      });
    }, 5000);
  };

  const handleVoiceEmergency = (text: string) => {
    toast({
      title: "Processing emergency request",
      description: `Analyzing: "${text}"`,
    });
    
    if (text.toLowerCase().includes('help') || text.toLowerCase().includes('emergency')) {
      handleEmergencyRequest();
    }
  };

  const emergencyContacts = [
    { name: "Emergency Hotline", number: "108", icon: Phone, available: true },
    { name: "Local Health Center", number: "+91 98765 43210", icon: Heart, available: true },
    { name: "Dr. Sharma (On-Call)", number: "+91 98765 43211", icon: User, available: true },
  ];

  const nearbyHospitals = [
    { name: "District Hospital", distance: "12 km", time: "15 min", beds: "Available" },
    { name: "Primary Health Center", distance: "5 km", time: "8 min", beds: "Limited" },
    { name: "Community Clinic", distance: "3 km", time: "5 min", beds: "Available" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-10 h-10 text-emergency" />
            <h1 className="text-4xl font-bold text-foreground">Emergency Services</h1>
          </div>
          <p className="text-muted-foreground text-lg">Request immediate medical assistance</p>
        </div>

        {/* Emergency Status */}
        {isEmergencyActive && (
          <Card className="p-6 mb-8 bg-emergency/10 border-2 border-emergency animate-pulse">
            <div className="flex items-center gap-4 mb-4">
              <Ambulance className="w-8 h-8 text-emergency" />
              <div>
                <h2 className="text-2xl font-bold text-foreground">Emergency Active</h2>
                <p className="text-muted-foreground">
                  {ambulanceStatus === 'requested' && 'Processing your request...'}
                  {ambulanceStatus === 'dispatched' && 'Ambulance dispatched - ETA 15 minutes'}
                  {ambulanceStatus === 'arriving' && 'Ambulance arriving soon - ETA 5 minutes'}
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emergency" />
                <span className="text-sm">Location: Village Center</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emergency" />
                <span className="text-sm">Response Time: 15 min</span>
              </div>
              <div className="flex items-center gap-2">
                <NavigationIcon className="w-5 h-5 text-emergency" />
                <span className="text-sm">GPS Tracking Active</span>
              </div>
            </div>

            <div className="h-2 bg-emergency/20 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-emergency transition-all duration-1000 ${
                  ambulanceStatus === 'requested' ? 'w-1/3' : 
                  ambulanceStatus === 'dispatched' ? 'w-2/3' : 'w-full'
                }`}
              />
            </div>
          </Card>
        )}

        {/* Voice Emergency Request */}
        <Card className="p-6 mb-8 bg-gradient-emergency shadow-emergency">
          <div className="flex items-center gap-3 mb-4">
            <Phone className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">Voice Emergency Request</h2>
          </div>
          <p className="text-white/90 mb-4">
            Say "Help" or "Emergency" to request immediate assistance
          </p>
          <VoiceInput 
            onTranscript={handleVoiceEmergency}
            placeholder="Say 'Help' or 'Emergency' or describe the situation..."
          />
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Quick Emergency Button */}
          <Card className="p-8 text-center">
            <AlertTriangle className="w-20 h-20 text-emergency mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Request Ambulance
            </h2>
            <p className="text-muted-foreground mb-8">
              Tap button to send emergency alert with your GPS location
            </p>
            <Button 
              size="lg" 
              className="w-full h-16 text-xl bg-gradient-emergency hover:shadow-emergency"
              onClick={handleEmergencyRequest}
              disabled={isEmergencyActive}
            >
              {isEmergencyActive ? (
                <>
                  <CheckCircle className="w-6 h-6 mr-2" />
                  Emergency Active
                </>
              ) : (
                <>
                  <Ambulance className="w-6 h-6 mr-2" />
                  Send Emergency Alert
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              Works via SMS if no internet connection
            </p>
          </Card>

          {/* Emergency Contacts */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Phone className="w-6 h-6 text-primary" />
              Emergency Contacts
            </h2>
            <div className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <contact.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{contact.name}</div>
                      <div className="text-sm text-muted-foreground">{contact.number}</div>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="gap-2"
                    onClick={() => window.open(`tel:${contact.number}`, '_self')}
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Nearby Hospitals */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-accent" />
            Nearby Healthcare Facilities
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {nearbyHospitals.map((hospital, index) => {
              // Example coordinates - in a real app, these would come from your data
              const hospitalCoords = {
                "District Hospital": { lat: 15.3647, lng: 75.1240 },
                "Primary Health Center": { lat: 15.3650, lng: 75.1250 },
                "Community Clinic": { lat: 15.3655, lng: 75.1260 }
              };
              
              const coords = hospitalCoords[hospital.name as keyof typeof hospitalCoords];
              // Updated Google Maps URL format
              const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`;
              
              return (
                <Card key={index} className="p-5 border-2 border-border hover:border-primary transition-colors">
                  <div className="font-bold text-lg text-foreground mb-3">{hospital.name}</div>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{hospital.distance} away</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{hospital.time} by ambulance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      <span>Beds: {hospital.beds}</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      console.log('Opening Google Maps:', googleMapsUrl);
                      window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    <NavigationIcon className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </Card>
              );
            })}
          </div>
        </Card>

        {/* Emergency Tips */}
        <Card className="p-6 mt-8 bg-accent/5 border-accent/20">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-accent" />
            Emergency Tips
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <span>Stay calm and ensure the patient is in a safe location</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <span>Share your exact location and describe the emergency clearly</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <span>If no internet, send SMS with "HELP" to 108 with your location</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <span>Keep patient comfortable and monitor vital signs until help arrives</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Emergency;
