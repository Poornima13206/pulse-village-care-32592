import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VoiceInput from "@/components/VoiceInput";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  BookOpen, 
  Play,
  Volume2,
  VolumeX,
  Heart,
  Droplet,
  Apple,
  Activity,
  Baby,
  Sun,
  Shield,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ttsService, SUPPORTED_LANGUAGES } from "@/utils/textToSpeech";

const Education = () => {
  const { toast } = useToast();
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      ttsService.stop();
    };
  }, []);

  const handleVoiceQuery = (text: string) => {
    toast({
      title: "Searching health topics",
      description: `Looking for information about: "${text}"`,
    });
  };

  const handleReadArticle = (article: any) => {
    setSelectedArticle(article);
    setIsDialogOpen(true);
  };

  const handlePlayAudio = async (article: any) => {
    if (isSpeaking) {
      ttsService.stop();
      setIsSpeaking(false);
      toast({
        title: "Audio stopped",
        description: "Audio playback has been stopped",
      });
      return;
    }

    try {
      setIsSpeaking(true);
      const textToSpeak = `${article.title}. ${article.description}`;
      
      // Use the article's language code if available, otherwise use selected language
      const audioLanguage = article.languageCode || selectedLanguage;
      
      toast({
        title: "Playing audio",
        description: `Speaking in ${article.language || SUPPORTED_LANGUAGES.find(l => l.code === audioLanguage)?.label}`,
      });

      await ttsService.speak(textToSpeak, audioLanguage);
      setIsSpeaking(false);
    } catch (error) {
      console.error("Text-to-speech error:", error);
      setIsSpeaking(false);
      toast({
        title: "Audio playback failed",
        description: "Please check your device settings and try again",
        variant: "destructive",
      });
    }
  };

  const categories = [
    { 
      icon: Heart, 
      title: "Heart Health", 
      color: "text-emergency", 
      bg: "bg-emergency/10",
      articles: 12 
    },
    { 
      icon: Droplet, 
      title: "Diabetes Care", 
      color: "text-primary", 
      bg: "bg-primary/10",
      articles: 15 
    },
    { 
      icon: Apple, 
      title: "Nutrition", 
      color: "text-secondary", 
      bg: "bg-secondary/10",
      articles: 20 
    },
    { 
      icon: Activity, 
      title: "Exercise", 
      color: "text-accent", 
      bg: "bg-accent/10",
      articles: 18 
    },
    { 
      icon: Baby, 
      title: "Maternal Health", 
      color: "text-warning", 
      bg: "bg-warning/10",
      articles: 10 
    },
    { 
      icon: Shield, 
      title: "Preventive Care", 
      color: "text-info", 
      bg: "bg-info/10",
      articles: 14 
    },
  ];

  const allArticles = [
    // Heart Health Articles
    {
      title: "Managing High Blood Pressure",
      category: "Heart Health",
      duration: "5 min read",
      audioAvailable: true,
      language: "English",
      languageCode: "en-US",
      description: "Essential tips for controlling hypertension through diet and lifestyle changes."
    },
    {
      title: "Understanding Cholesterol Levels",
      category: "Heart Health",
      duration: "6 min read",
      audioAvailable: true,
      language: "English",
      languageCode: "en-US",
      description: "Learn about good vs bad cholesterol and how to maintain healthy levels."
    },
    {
      title: "Heart-Healthy Foods",
      category: "Heart Health",
      duration: "4 min read",
      audioAvailable: true,
      language: "English",
      languageCode: "en-US",
      description: "Discover the best foods for cardiovascular health and heart disease prevention."
    },
    // Diabetes Care Articles
    {
      title: "Understanding Diabetes",
      category: "Diabetes Care",
      duration: "7 min read",
      audioAvailable: true,
      language: "English",
      languageCode: "en-US",
      description: "Learn about blood sugar management, symptoms, and daily care routines."
    },
    {
      title: "Diabetic Meal Planning",
      category: "Diabetes Care",
      duration: "6 min read",
      audioAvailable: true,
      language: "English",
      languageCode: "en-US",
      description: "Create balanced meal plans that help control blood sugar levels effectively."
    },
    {
      title: "Preventing Diabetes Complications",
      category: "Diabetes Care",
      duration: "5 min read",
      audioAvailable: true,
      language: "English",
      languageCode: "en-US",
      description: "Key strategies to prevent long-term complications from diabetes."
    },
    // Nutrition Articles
    {
      title: "Nutrition for Rural Communities",
      category: "Nutrition",
      duration: "4 min read",
      audioAvailable: true,
      language: "English",
      languageCode: "en-US",
      description: "Affordable and nutritious meal planning with locally available foods."
    },
    {
      title: "Essential Vitamins and Minerals",
      category: "Nutrition",
      duration: "5 min read",
      audioAvailable: true,
      language: "English",
      languageCode: "en-US",
      description: "Understanding micronutrients your body needs for optimal health."
    },
    {
      title: "Healthy Eating on a Budget",
      category: "Nutrition",
      duration: "4 min read",
      audioAvailable: true,
      language: "English",
      languageCode: "en-US",
      description: "Smart shopping tips and affordable nutrition strategies for families."
    },
    // Exercise Articles
    {
      title: "Exercise for Beginners",
      category: "Exercise",
      duration: "5 min read",
      audioAvailable: true,
      language: "English",
      languageCode: "en-US",
      description: "Start your fitness journey with simple, effective exercises."
    },
    {
      title: "Yoga for Daily Wellness",
      category: "Exercise",
      duration: "6 min read",
      audioAvailable: true,
      language: "English",
      languageCode: "en-US",
      description: "Basic yoga poses and breathing exercises for physical and mental health."
    },
    {
      title: "Walking for Better Health",
      category: "Exercise",
      duration: "4 min read",
      audioAvailable: true,
      language: "English",
      languageCode: "en-US",
      description: "How a daily walking routine can transform your health and energy levels."
    },
    // Maternal Health Articles
    {
      title: "Pregnancy Nutrition",
      category: "Maternal Health",
      duration: "6 min read",
      audioAvailable: true,
      language: "English",
      languageCode: "en-US",
      description: "Essential nutrients and diet tips during pregnancy."
    },
    {
      title: "Prenatal Care Basics",
      category: "Maternal Health",
      duration: "7 min read",
      audioAvailable: true,
      language: "English",
      languageCode: "en-US",
      description: "Important checkups and care guidelines throughout your pregnancy journey."
    },
    {
      title: "Postpartum Recovery Guide",
      category: "Maternal Health",
      duration: "5 min read",
      audioAvailable: true,
      language: "English",
      languageCode: "en-US",
      description: "Self-care tips for new mothers during the postpartum period."
    },
    // Preventive Care Articles
    {
      title: "Vaccination Schedule",
      category: "Preventive Care",
      duration: "5 min read",
      audioAvailable: true,
      language: "English",
      languageCode: "en-US",
      description: "Complete guide to immunizations for children and adults."
    },
    {
      title: "Regular Health Screenings",
      category: "Preventive Care",
      duration: "6 min read",
      audioAvailable: true,
      language: "English",
      languageCode: "en-US",
      description: "Essential health checkups and when you should get them done."
    },
    {
      title: "Disease Prevention Strategies",
      category: "Preventive Care",
      duration: "5 min read",
      audioAvailable: true,
      language: "English",
      languageCode: "en-US",
      description: "Practical steps to prevent common diseases and maintain good health."
    },
  ];

  const featuredArticles = selectedCategory 
    ? allArticles.filter(article => article.category === selectedCategory)
    : allArticles.slice(0, 3);

  const handleCategoryClick = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
    toast({
      title: "Category selected",
      description: `Showing articles for ${categoryTitle}`,
    });
  };

  const dailyTips = [
    {
      icon: Sun,
      tip: "Drink 8 glasses of water daily",
      category: "Wellness"
    },
    {
      icon: Apple,
      tip: "Include more fruits and vegetables in your diet",
      category: "Nutrition"
    },
    {
      icon: Activity,
      tip: "Walk for at least 30 minutes daily",
      category: "Exercise"
    },
  ];

  const emergencyInfo = [
    { 
      symptom: "Chest Pain", 
      action: "Call emergency immediately", 
      severity: "Critical" 
    },
    { 
      symptom: "Severe Headache", 
      action: "Seek immediate medical attention", 
      severity: "Urgent" 
    },
    { 
      symptom: "High Fever (>103°F)", 
      action: "Contact health worker", 
      severity: "Important" 
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-10 h-10 text-accent" />
            <h1 className="text-4xl font-bold text-foreground">Health Education</h1>
          </div>
          <p className="text-muted-foreground text-lg">Learn about health topics in your language</p>
        </div>

        {/* Voice Search & Language Selection */}
        <Card className="p-6 mb-8 bg-gradient-secondary shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <Volume2 className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">Ask About Health Topics</h2>
          </div>
          <p className="text-white/90 mb-4">Voice-enabled search in local languages</p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <VoiceInput 
                onTranscript={handleVoiceQuery}
                placeholder="Ask: 'How to control diabetes?' or 'Healthy diet tips'..."
              />
            </div>
            <div className="w-full sm:w-48">
              <Label htmlFor="audio-language" className="text-white text-sm mb-2 block">
                Audio Language
              </Label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger id="audio-language" className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Health Topics</h2>
            {selectedCategory && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                Show All Topics
              </Button>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Card 
                key={index} 
                className={`p-5 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                  selectedCategory === category.title ? 'ring-2 ring-primary shadow-lg' : ''
                }`}
                onClick={() => handleCategoryClick(category.title)}
              >
                <div className={`w-14 h-14 ${category.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <category.icon className={`w-7 h-7 ${category.color}`} />
                </div>
                <h3 className="font-bold text-foreground mb-1">{category.title}</h3>
                <p className="text-xs text-muted-foreground">{category.articles} articles</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Articles */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            {selectedCategory ? `${selectedCategory} Articles` : 'Featured Articles'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
                onClick={() => handleReadArticle(article)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-2">
                    <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                      {article.category}
                    </span>
                    <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full font-medium">
                      {article.language}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {article.audioAvailable && (
                      <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Volume2 className="w-4 h-4 text-secondary" />
                      </div>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">{article.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{article.description}</p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span>{article.duration}</span>
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReadArticle(article);
                    }}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Read
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayAudio(article);
                    }}
                  >
                    {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Daily Health Tips */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Sun className="w-6 h-6 text-accent" />
              Daily Health Tips
            </h2>
            <div className="space-y-4">
              {dailyTips.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-accent/5 to-transparent">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground mb-1">{item.tip}</p>
                    <span className="text-xs text-muted-foreground">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              Get More Tips
            </Button>
          </Card>

          {/* Emergency Warning Signs */}
          <Card className="p-6 bg-emergency/5 border-emergency/20">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-emergency" />
              Warning Signs
            </h2>
            <div className="space-y-3">
              {emergencyInfo.map((info, index) => (
                <div key={index} className="p-4 rounded-lg bg-card border-2 border-border">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-foreground">{info.symptom}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      info.severity === 'Critical' ? 'bg-emergency/10 text-emergency' :
                      info.severity === 'Urgent' ? 'bg-warning/10 text-warning' :
                      'bg-info/10 text-info'
                    }`}>
                      {info.severity}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{info.action}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Offline Access Info */}
        <Card className="p-6 bg-secondary/5 border-secondary/20">
          <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-secondary" />
            Offline Learning
          </h2>
          <p className="text-muted-foreground mb-4">
            All health education content is cached for offline access. Audio versions can be downloaded for listening without internet.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-secondary" />
              </div>
              <span>Text articles saved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                <Volume2 className="w-4 h-4 text-secondary" />
              </div>
              <span>Audio versions available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                <Play className="w-4 h-4 text-secondary" />
              </div>
              <span>Video tutorials cached</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Article Reading Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedArticle?.title}</DialogTitle>
            <DialogDescription>
              <span className="text-primary font-medium">{selectedArticle?.category}</span>
              {" • "}
              <span>{selectedArticle?.duration}</span>
              {" • "}
              <span className="text-accent font-medium">{selectedArticle?.language}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <p className="text-foreground">{selectedArticle?.description}</p>
            
            <div className="prose prose-sm max-w-none">
              <h3 className="text-lg font-semibold text-foreground">Overview</h3>
              <p className="text-muted-foreground">
                This comprehensive guide provides essential information about {selectedArticle?.title.toLowerCase()}. 
                Learn about symptoms, causes, prevention strategies, and management techniques.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6">Key Points</h3>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Regular monitoring and early detection are crucial</li>
                <li>Lifestyle modifications can significantly improve outcomes</li>
                <li>Consult healthcare professionals for personalized advice</li>
                <li>Stay informed about latest treatment options</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6">When to Seek Help</h3>
              <p className="text-muted-foreground">
                If you experience severe or persistent symptoms, contact your healthcare provider immediately. 
                Early intervention can prevent complications and improve long-term health outcomes.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex gap-2">
                <Button 
                  className="flex-1"
                  onClick={() => handlePlayAudio(selectedArticle)}
                  variant={isSpeaking ? "destructive" : "default"}
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-4 h-4 mr-2" />
                      Stop Audio
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 mr-2" />
                      Listen in {selectedArticle?.language}
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Education;
