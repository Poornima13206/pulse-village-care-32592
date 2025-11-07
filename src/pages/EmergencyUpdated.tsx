import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  CheckCircle,
  Search
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Emergency = () => {
  const { toast } = useToast();
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [ambulanceStatus, setAmbulanceStatus] = useState<'idle' | 'requested' | 'dispatched' | 'arriving'>('idle');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [emergencyContacts, setEmergencyContacts] = useState<any[]>([]);
  const [nearbyHospitals, setNearbyHospitals] = useState<any[]>([]);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          loadNearbyDoctors(location);
          loadNearbyHospitals(location);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location Access Required",
            description: "Please enable location services to find nearby healthcare facilities",
            variant: "destructive",
          });
        }
      );
    }
  }, []);

  const loadNearbyDoctors = (location: { lat: number; lng: number }) => {
    // In real app, this would fetch from an API based on location
    setEmergencyContacts([
      { 
        name: "Emergency Hotline", 
        number: "108", 
        icon: Phone, 
        available: true,
        distance: "N/A"
      },
      { 
        name: "Dr. Sharma (On-Call)", 
        number: "+91 98765 43211", 
        icon: User, 
        available: true,
        distance: "2.5 km"
      },
      { 
        name: "Dr. Patel (Emergency)", 
        number: "+91 98765 43212", 
        icon: User, 
        available: true,
        distance: "3.1 km"
      },
    ]);
  };

  const loadNearbyHospitals = (location: { lat: number; lng: number }) => {
    // In real app, this would fetch from Google Places API or similar
    setNearbyHospitals([
      { 
        name: "District Hospital", 
        distance: "2.5 km", 
        time: "8 min", 
        beds: "Available",
        lat: location.lat + 0.01,
        lng: location.lng + 0.01
      },
      { 
        name: "Primary Health Center", 
        distance: "1.2 km", 
        time: "4 min", 
        beds: "Limited",
        lat: location.lat + 0.005,
        lng: location.lng + 0.005
      },
      { 
        name: "Community Clinic", 
        distance: "0.8 km", 
        time: "3 min", 
        beds: "Available",
        lat: location.lat + 0.003,
        lng: location.lng + 0.003
      },
    ]);
  };

  const handleEmergencyRequest = () => {
    if (!userLocation) {
      toast({
        title: "Location Required",
        description: "Please enable location services to request emergency assistance",
        variant: "destructive",
      });
      return;
    }

    setIsEmergencyActive(true);
    setAmbulanceStatus('requested');
    
    toast({
      title: "Emergency Alert Sent!",
      description: "Help is on the way. Stay calm and wait for assistance.",
      variant: "default",
    });

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

  const handleVoiceSearch = (text: string) => {
    setSearchQuery(text);
    handleSearch(text);
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) return;

    const filteredHospitals = nearbyHospitals.filter(hospital =>
      hospital.name.toLowerCase().includes(query.toLowerCase())
    );

    const filteredDoctors = emergencyContacts.filter(contact =>
      contact.name.toLowerCase().includes(query.toLowerCase())
    );

    toast({
      title: "Search Results",
      description: `Found ${filteredHospitals.length} facilities and ${filteredDoctors.length} doctors`,
    });
  };

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

        {/* Voice Search Section */}
        <Card className="p-6 mb-8 bg-gradient-primary shadow-primary">
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">Search Doctors & Facilities</h2>
          </div>
          <p className="text-white/90 mb-4">Speak or type to find nearby healthcare</p>
          <VoiceInput 
            onTranscript={handleVoiceSearch}
            placeholder="Say or type: 'Find doctors near me' or 'Search hospital'..."
          />
        </Card>

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
            
            {userLocation && (
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emergency" />
                  <span className="text-sm">Location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}</span>
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
            )}

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
          </Card>

          {/* Emergency Contacts */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Phone className="w-6 h-6 text-primary" />
              Emergency Contacts
              {userLocation && <span className="text-sm text-muted-foreground ml-auto">Near You</span>}
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
                      {contact.distance && contact.distance !== "N/A" && (
                        <div className="text-xs text-accent">{contact.distance} away</div>
                      )}
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <MapPin className="w-6 h-6 text-accent" />
              Nearby Healthcare Facilities
            </h2>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search facilities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                className="w-64"
              />
              <Button size="sm" onClick={() => handleSearch(searchQuery)}>
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {nearbyHospitals.map((hospital, index) => {
              const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${hospital.lat},${hospital.lng}`;
              
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
                    onClick={() => window.open(googleMapsUrl, '_blank')}
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
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Emergency;
