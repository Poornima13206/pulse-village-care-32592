import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download,
  Calendar,
  User,
  Activity,
  AlertCircle,
  CheckCircle,
  Pill,
  TestTube,
  Heart
} from "lucide-react";

const Records = () => {
  const patientInfo = {
    name: "Ramesh Kumar",
    age: 45,
    bloodType: "O+",
    allergies: "Penicillin",
    chronicConditions: "Hypertension, Type 2 Diabetes",
    lastVisit: "May 1, 2025"
  };

  const vitalsHistory = [
    { date: "May 1, 2025", bp: "130/85", sugar: "140 mg/dL", weight: "72 kg", temp: "98.4°F" },
    { date: "Apr 15, 2025", bp: "128/82", sugar: "135 mg/dL", weight: "71 kg", temp: "98.6°F" },
    { date: "Apr 1, 2025", bp: "135/88", sugar: "145 mg/dL", weight: "72 kg", temp: "98.5°F" },
  ];

  const medications = [
    { 
      name: "Amlodipine 5mg", 
      frequency: "Once daily", 
      startDate: "Jan 2025",
      status: "Active",
      condition: "Hypertension"
    },
    { 
      name: "Metformin 500mg", 
      frequency: "Twice daily", 
      startDate: "Jan 2025",
      status: "Active",
      condition: "Diabetes"
    },
    { 
      name: "Vitamin D3", 
      frequency: "Once daily", 
      startDate: "Mar 2025",
      status: "Active",
      condition: "Supplement"
    },
  ];

  const labReports = [
    {
      test: "Complete Blood Count",
      date: "Apr 28, 2025",
      status: "Normal",
      file: "CBC_Report.pdf"
    },
    {
      test: "Lipid Profile",
      date: "Apr 28, 2025",
      status: "Attention Needed",
      file: "Lipid_Report.pdf"
    },
    {
      test: "HbA1c Test",
      date: "Apr 15, 2025",
      status: "Normal",
      file: "HbA1c_Report.pdf"
    },
  ];

  const consultations = [
    {
      date: "May 1, 2025",
      doctor: "Dr. Sharma",
      type: "Follow-up",
      diagnosis: "Hypertension monitoring",
      notes: "Blood pressure controlled. Continue current medication."
    },
    {
      date: "Apr 15, 2025",
      doctor: "Dr. Kumar",
      type: "Routine",
      diagnosis: "Diabetes checkup",
      notes: "HbA1c levels improved. Diet compliance good."
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Health Records</h1>
          </div>
          <p className="text-muted-foreground text-lg">Complete medical history and records</p>
        </div>

        {/* Patient Summary Card */}
        <Card className="p-6 mb-8 bg-gradient-primary shadow-primary">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{patientInfo.name}</h2>
                <p className="text-white/90">Age: {patientInfo.age} • Blood Type: {patientInfo.bloodType}</p>
              </div>
            </div>
            <Button variant="secondary" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Records
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-white/80 text-sm mb-1">Allergies</div>
              <div className="text-white font-semibold">{patientInfo.allergies}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-white/80 text-sm mb-1">Chronic Conditions</div>
              <div className="text-white font-semibold">{patientInfo.chronicConditions}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-white/80 text-sm mb-1">Last Visit</div>
              <div className="text-white font-semibold">{patientInfo.lastVisit}</div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Vitals History */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6 text-primary" />
              Vitals History
            </h2>
            <div className="space-y-3">
              {vitalsHistory.map((record, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-foreground">{record.date}</span>
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">BP:</span>
                      <span className="ml-2 font-medium">{record.bp}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Sugar:</span>
                      <span className="ml-2 font-medium">{record.sugar}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Weight:</span>
                      <span className="ml-2 font-medium">{record.weight}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Temp:</span>
                      <span className="ml-2 font-medium">{record.temp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Current Medications */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Pill className="w-6 h-6 text-accent" />
              Current Medications
            </h2>
            <div className="space-y-3">
              {medications.map((med, index) => (
                <div key={index} className="p-4 rounded-lg border-2 border-border hover:border-accent transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-foreground">{med.name}</h3>
                    <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                      {med.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>Frequency: {med.frequency}</div>
                    <div>For: {med.condition}</div>
                    <div>Since: {med.startDate}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Lab Reports */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <TestTube className="w-6 h-6 text-info" />
            Lab Reports
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {labReports.map((report, index) => (
              <Card 
                key={index} 
                className="p-5 hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1"
                onClick={() => alert(`Opening ${report.file}...`)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{report.test}</h3>
                    <p className="text-sm text-muted-foreground">{report.date}</p>
                  </div>
                  {report.status === "Normal" ? (
                    <CheckCircle className="w-5 h-5 text-secondary" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-warning" />
                  )}
                </div>
                <div className={`text-sm font-medium mb-3 ${
                  report.status === "Normal" ? "text-secondary" : "text-warning"
                }`}>
                  {report.status}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert(`Downloading ${report.file}...`);
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </Card>
            ))}
          </div>
        </Card>

        {/* Consultation History */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Heart className="w-6 h-6 text-emergency" />
            Consultation History
          </h2>
          <div className="space-y-4">
            {consultations.map((consultation, index) => (
              <div key={index} className="p-5 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">{consultation.doctor}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{consultation.date}</span>
                      <span>•</span>
                      <span>{consultation.type}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Diagnosis: </span>
                    <span className="text-sm text-foreground">{consultation.diagnosis}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Notes: </span>
                    <span className="text-sm text-foreground">{consultation.notes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Offline Access Info */}
        <Card className="p-6 mt-8 bg-secondary/5 border-secondary/20">
          <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-secondary" />
            Offline Access
          </h2>
          <p className="text-muted-foreground mb-4">
            Your health records are automatically cached for offline access. Updates will sync when you're back online.
          </p>
          <div className="flex items-center gap-2 text-sm text-secondary">
            <CheckCircle className="w-4 h-4" />
            <span>All records available offline</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Records;
