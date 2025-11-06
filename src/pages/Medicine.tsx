import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import VoiceInput from "@/components/VoiceInput";
import { 
  Pill, 
  Search, 
  ShoppingCart,
  Package,
  Clock,
  CheckCircle,
  MapPin,
  Plus,
  Minus,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Medicine = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<{[key: string]: number}>({});

  const handleVoiceSearch = (text: string) => {
    toast({
      title: "Searching medicines",
      description: `Looking for: "${text}"`,
    });
  };

  const addToCart = (medicineName: string) => {
    setCart(prev => ({
      ...prev,
      [medicineName]: (prev[medicineName] || 0) + 1
    }));
    toast({
      title: "Added to cart",
      description: `${medicineName} added successfully`,
    });
  };

  const removeFromCart = (medicineName: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[medicineName] > 1) {
        newCart[medicineName]--;
      } else {
        delete newCart[medicineName];
      }
      return newCart;
    });
  };

  const commonMedicines = [
    { 
      name: "Paracetamol 500mg", 
      price: "₹20", 
      stock: "In Stock",
      description: "Pain relief and fever reducer",
      prescription: false
    },
    { 
      name: "Amoxicillin 250mg", 
      price: "₹45", 
      stock: "In Stock",
      description: "Antibiotic for infections",
      prescription: true
    },
    { 
      name: "Vitamin D3", 
      price: "₹80", 
      stock: "Low Stock",
      description: "Daily supplement",
      prescription: false
    },
    { 
      name: "Blood Pressure Med", 
      price: "₹120", 
      stock: "In Stock",
      description: "Hypertension management",
      prescription: true
    },
    { 
      name: "Diabetes Tablets", 
      price: "₹150", 
      stock: "In Stock",
      description: "Blood sugar control",
      prescription: true
    },
    { 
      name: "Cough Syrup", 
      price: "₹35", 
      stock: "In Stock",
      description: "Cold and cough relief",
      prescription: false
    },
  ];

  const activeOrders = [
    { 
      id: "ORD001", 
      items: "Paracetamol, Vitamin D3", 
      status: "Out for Delivery",
      eta: "Today, 5:00 PM",
      track: "Last mile delivery"
    },
    { 
      id: "ORD002", 
      items: "Blood Pressure Med", 
      status: "Processing",
      eta: "Tomorrow",
      track: "Preparing order"
    },
  ];

  const upcomingRefills = [
    { medicine: "Blood Pressure Med", daysLeft: 5, autoRefill: true },
    { medicine: "Diabetes Tablets", daysLeft: 12, autoRefill: true },
  ];

  const cartTotal = Object.entries(cart).reduce((total, [name, qty]) => {
    const medicine = commonMedicines.find(m => m.name === name);
    if (medicine) {
      return total + (parseInt(medicine.price.replace('₹', '')) * qty);
    }
    return total;
  }, 0);

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Pill className="w-10 h-10 text-accent" />
            <h1 className="text-4xl font-bold text-foreground">Medicine Orders</h1>
          </div>
          <p className="text-muted-foreground text-lg">Order medicines and track deliveries</p>
        </div>

        {/* Voice Search */}
        <Card className="p-6 mb-8 bg-gradient-primary shadow-primary">
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">Search Medicines</h2>
          </div>
          <p className="text-white/90 mb-4">Say or type medicine name</p>
          <VoiceInput 
            onTranscript={handleVoiceSearch}
            placeholder="Search for medicines..."
          />
        </Card>

        {/* Shopping Cart */}
        {Object.keys(cart).length > 0 && (
          <Card className="p-6 mb-8 border-2 border-accent">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-accent" />
                Your Cart ({Object.values(cart).reduce((a, b) => a + b, 0)} items)
              </h2>
              <div className="text-2xl font-bold text-foreground">₹{cartTotal}</div>
            </div>
            <div className="space-y-3 mb-4">
              {Object.entries(cart).map(([name, qty]) => (
                <div key={name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">{name}</span>
                  <div className="flex items-center gap-3">
                    <Button size="sm" variant="outline" onClick={() => removeFromCart(name)}>
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-bold">{qty}</span>
                    <Button size="sm" variant="outline" onClick={() => addToCart(name)}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full h-12" size="lg">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Place Order - ₹{cartTotal}
            </Button>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Available Medicines */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Available Medicines</h2>
            <div className="space-y-3">
              {commonMedicines.map((medicine, index) => (
                <Card 
                  key={index} 
                  className="p-5 hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1"
                  onClick={() => addToCart(medicine.name)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-foreground">{medicine.name}</h3>
                        {medicine.prescription && (
                          <span className="text-xs bg-warning/10 text-warning px-2 py-1 rounded-full">
                            Rx Required
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{medicine.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-bold text-foreground text-lg">{medicine.price}</span>
                        <span className={`${
                          medicine.stock === 'Low Stock' ? 'text-warning' : 'text-secondary'
                        }`}>
                          {medicine.stock}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(medicine.name);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Orders and Refills */}
          <div className="space-y-8">
            {/* Active Orders */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Package className="w-6 h-6 text-primary" />
                Active Orders
              </h2>
              <div className="space-y-3">
                {activeOrders.map((order, index) => (
                  <Card 
                    key={index} 
                    className="p-5 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
                    onClick={() => toast({
                      title: `Order #${order.id}`,
                      description: `Status: ${order.status} - ${order.track}`
                    })}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-bold text-foreground mb-1">Order #{order.id}</div>
                        <div className="text-sm text-muted-foreground mb-2">{order.items}</div>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        order.status === 'Out for Delivery' 
                          ? 'bg-secondary/10 text-secondary' 
                          : 'bg-accent/10 text-accent'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm mb-3">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>ETA: {order.eta}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{order.track}</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        toast({
                          title: "Tracking Order",
                          description: `Opening tracking for order #${order.id}`
                        });
                      }}
                    >
                      Track Order
                    </Button>
                  </Card>
                ))}
              </div>
            </div>

            {/* Upcoming Refills */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-accent" />
                Upcoming Refills
              </h2>
              <div className="space-y-3">
                {upcomingRefills.map((refill, index) => (
                  <Card 
                    key={index} 
                    className="p-5 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
                    onClick={() => toast({
                      title: refill.medicine,
                      description: `Refill scheduled in ${refill.daysLeft} days`
                    })}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-bold text-foreground">{refill.medicine}</div>
                        <div className="text-sm text-muted-foreground">
                          Refill in {refill.daysLeft} days
                        </div>
                      </div>
                      {refill.autoRefill && (
                        <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Auto-refill
                        </span>
                      )}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(refill.medicine);
                      }}
                    >
                      Refill Now
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SMS Order Info */}
        <Card className="p-6 bg-info/5 border-info/20">
          <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
            <Pill className="w-5 h-5 text-info" />
            Order via SMS
          </h2>
          <p className="text-muted-foreground mb-4">
            No internet? Send SMS to track orders or request refills:
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <span><strong>TRACK [Order ID]</strong> - Get delivery status</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <span><strong>REFILL [Medicine Name]</strong> - Request prescription refill</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <span><strong>Send to: +91 98765 00000</strong></span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Medicine;
