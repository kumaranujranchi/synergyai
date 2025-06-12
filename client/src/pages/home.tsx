import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import InteractiveBackground from "@/components/InteractiveBackground";
import { 
  Rocket, 
  Phone, 
  CheckCircle, 
  Shield, 
  Zap, 
  DollarSign, 
  Users, 
  Target,
  Brain,
  Code,
  Smartphone,
  Settings,
  Briefcase,
  TrendingUp,
  RotateCcw,
  Star,
  Clock,
  Award,
  Globe,
  Mail,
  MessageCircle,
  Calculator
} from "lucide-react";

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  projectDetails: string;
  budgetRange?: string;
}

const services = [
  {
    icon: Globe,
    title: "Website Development",
    description: "Corporate Websites, Portfolio Sites, Product Landing Pages, eCommerce Stores",
    delivery: "2 to 24 hours",
    price: "₹2,000",
    gradient: "from-blue-50 to-cyan-50",
    border: "border-blue-100"
  },
  {
    icon: Smartphone,
    title: "Mobile App Development", 
    description: "Android & iOS Hybrid Apps using AI-assisted rapid development",
    delivery: "Fast delivery with expert quality checks",
    price: "₹10,000",
    gradient: "from-purple-50 to-pink-50",
    border: "border-purple-100"
  },
  {
    icon: Settings,
    title: "Complex Web Applications",
    description: "SaaS Platforms, Customer Portals, Business Dashboards, AI Tools",
    delivery: "AI-speed & human precision",
    price: "₹50,000",
    gradient: "from-green-50 to-emerald-50",
    border: "border-green-100"
  },
  {
    icon: Briefcase,
    title: "CRM / HRMS / Sales Management",
    description: "Complete Business Automation with AI-optimized templates",
    delivery: "Sales CRM, HRMS, Attendance, Payroll",
    price: "₹25,000",
    gradient: "from-yellow-50 to-orange-50",
    border: "border-yellow-100"
  },
  {
    icon: TrendingUp,
    title: "High-Converting Landing Pages",
    description: "Short-term campaigns, product launches, seasonal offers",
    delivery: "Fully responsive & SEO-friendly",
    price: "₹1,000",
    gradient: "from-red-50 to-pink-50",
    border: "border-red-100"
  },
  {
    icon: RotateCcw,
    title: "Free CI/CD Pipeline",
    description: "Automated Deployment, Testing & Updates",
    delivery: "Zero Cost Continuous Delivery Setup",
    price: "FREE",
    gradient: "from-gray-50 to-slate-50",
    border: "border-gray-200"
  }
];

const benefits = [
  { icon: DollarSign, title: "Save 50% to 80% on Development Cost", description: "Our AI-powered development significantly reduces time and cost while maintaining high quality standards." },
  { icon: Zap, title: "Get Live Solutions Within Hours", description: "From concept to deployment in hours, not months. Experience the power of AI-accelerated development." },
  { icon: Clock, title: "No Lengthy Agency Delays", description: "Skip the bureaucracy and endless meetings. Get straight to building your digital solutions." },
  { icon: MessageCircle, title: "Free Consultation & Scope Planning", description: "We help you plan and scope your project requirements before you commit to anything." },
  { icon: Target, title: "Fully Managed Deployment & Support", description: "From development to deployment and ongoing support, we handle everything end-to-end." },
  { icon: Shield, title: "100% Manual Code Audit", description: "Every line of AI-generated code is reviewed by expert developers for security and performance." }
];

const qualityFeatures = [
  { icon: CheckCircle, title: "Expert Code Review", description: "Every AI-generated code is reviewed by expert developers", color: "green" },
  { icon: Shield, title: "Bug-Free Delivery", description: "Bugs fixed manually before final delivery", color: "blue" },
  { icon: Award, title: "Security First", description: "Security patches applied to avoid vulnerabilities", color: "red" },
  { icon: Zap, title: "Performance Optimized", description: "Optimized for performance & scalability", color: "purple" }
];

const targetAudiences = [
  { icon: Rocket, title: "Startups" },
  { icon: Briefcase, title: "MSMEs" },
  { icon: Target, title: "Corporate MVPs" },
  { icon: Users, title: "Individuals" },
  { icon: Code, title: "SaaS Founders" },
  { icon: TrendingUp, title: "eCommerce Entrepreneurs" },
  { icon: Star, title: "Agencies" }
];

export default function Home() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    projectDetails: "",
    budgetRange: ""
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted!",
        description: "We'll get back to you within 2 hours with a detailed quote.",
      });
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        service: "",
        projectDetails: "",
        budgetRange: ""
      });
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly via WhatsApp.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.service || !formData.projectDetails) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hi! I am interested in your AI-powered development services. Can we discuss my project?');
    const phoneNumber = '919525230232';
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+919525230232';
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-md border-b z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img src="https://imagizer.imageshack.com/img924/5789/CC6b4R.png" alt="Synergy Brand Architect Logo" className="h-8 md:h-10 w-auto" />
              <div className="flex flex-col">
                <span className="font-bold text-sm sm:text-lg md:text-xl text-foreground leading-tight">Synergy Brand Architect</span>
                <span className="text-xs text-muted-foreground hidden sm:block">AI-Powered Solutions</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Services</a>
              <a href="#why-us" className="text-muted-foreground hover:text-primary transition-colors">Why Us</a>
              <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
              <Button onClick={scrollToContact} className="font-medium">
                Get Quote
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className={`space-y-1 transition-all ${isMobileMenuOpen ? 'rotate-45' : ''}`}>
                <div className={`w-5 h-0.5 bg-foreground transition-all ${isMobileMenuOpen ? 'rotate-90 translate-y-1.5' : ''}`}></div>
                <div className={`w-5 h-0.5 bg-foreground transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-5 h-0.5 bg-foreground transition-all ${isMobileMenuOpen ? '-rotate-90 -translate-y-1.5' : ''}`}></div>
              </div>
            </Button>
          </div>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t bg-background/95 backdrop-blur-md"
            >
              <div className="px-4 py-6 space-y-4">
                <a href="#services" className="block text-muted-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
                <a href="#why-us" className="block text-muted-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Why Us</a>
                <a href="#pricing" className="block text-muted-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
                <a href="#contact" className="block text-muted-foreground hover:text-primary transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
                <Button onClick={() => { scrollToContact(); setIsMobileMenuOpen(false); }} className="w-full font-medium mt-4">
                  Get Quote
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-10 bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
        {/* Interactive Background */}
        <InteractiveBackground />
        
        {/* Animated geometric shapes - hidden on mobile for performance */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <div className="absolute top-20 left-10 animate-pulse opacity-30">
            <Brain className="w-16 h-16 text-primary" />
          </div>
          <div className="absolute top-40 right-20 animate-bounce opacity-20">
            <Code className="w-12 h-12 text-secondary" />
          </div>
          <div className="absolute bottom-40 left-20 animate-pulse opacity-25">
            <Zap className="w-14 h-14 text-primary" />
          </div>
          
          {/* Floating geometric shapes - optimized */}
          <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full animate-float"></div>
          <div className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-lg rotate-45 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/6 w-10 h-10 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-6 md:space-y-8"
          >
            <div className="space-y-4 md:space-y-6">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-primary font-semibold animate-pulse-slow">
                Beyond Templates, Beyond Drag-and-Drop
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-primary via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  AI-Architected
                </span>{" "}
                <br className="hidden sm:block" />
                Digital Experiences
              </h1>
            </div>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              While Others Build Websites, We{" "}
              <span className="font-bold text-primary">Architect Digital Ecosystems</span>{" "}
              with AI Intelligence
            </p>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground font-medium">
              <span className="text-blue-600 animate-pulse">AI Analyzes.</span>{" "}
              <span className="text-primary animate-pulse" style={{ animationDelay: '1s' }}>Humans Create.</span>{" "}
              <span className="text-foreground animate-pulse" style={{ animationDelay: '2s' }}>You Dominate.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button 
                onClick={scrollToContact}
                size="lg" 
                className="w-full sm:w-auto text-sm sm:text-base md:text-lg px-6 md:px-8 py-3 md:py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary"
              >
                <Brain className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                <span className="hidden sm:inline">Experience AI-Powered Brand Architecture</span>
                <span className="sm:hidden">Get AI-Powered Quote</span>
              </Button>
              
              <Button 
                onClick={handleCall}
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto text-sm sm:text-base md:text-lg px-6 md:px-8 py-3 md:py-4 transform hover:scale-105 transition-all border-primary hover:bg-primary/10"
              >
                <Zap className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                <span className="hidden sm:inline">See How AI Transforms Your Digital Presence</span>
                <span className="sm:hidden">See AI in Action</span>
              </Button>
            </div>

            <Card className="backdrop-blur-md bg-background/75 max-w-5xl mx-auto border border-primary/20 mt-8">
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div className="flex items-center space-x-1 sm:space-x-2 group hover:scale-105 transition-transform">
                    <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 group-hover:animate-pulse flex-shrink-0" />
                    <span className="font-medium">2 Hour Delivery</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 group hover:scale-105 transition-transform">
                    <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 group-hover:animate-pulse flex-shrink-0" />
                    <span className="font-medium">Lowest Pricing</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 group hover:scale-105 transition-transform">
                    <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500 group-hover:animate-pulse flex-shrink-0" />
                    <span className="font-medium">Bug-Free Code</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 group hover:scale-105 transition-transform">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500 group-hover:animate-pulse flex-shrink-0" />
                    <span className="font-medium">Human Verified</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 group hover:scale-105 transition-transform">
                    <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-500 group-hover:animate-pulse flex-shrink-0" />
                    <span className="font-medium">Free CI/CD</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 group hover:scale-105 transition-transform">
                    <Award className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500 group-hover:animate-pulse flex-shrink-0" />
                    <span className="font-medium">Transparent</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-base sm:text-lg text-muted-foreground mt-6 sm:mt-8 italic font-medium px-4 sm:px-0">
              "Sun ke aaya na maza — Ye hai AI ka kamal!" 🚀
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-8 sm:py-12 lg:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 px-4 sm:px-0">Services We Offer</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4 sm:px-0">From simple landing pages to complex enterprise solutions, powered by AI and perfected by experts.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="mx-2 sm:mx-0"
              >
                <Card className={`bg-gradient-to-br ${service.gradient} ${service.border} hover:shadow-xl transition-all transform hover:scale-105 h-full`}>
                  <CardContent className="p-4 sm:p-6 lg:p-8">
                    <service.icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-3 sm:mb-4" />
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-3 sm:mb-4">{service.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">{service.description}</p>
                    <div className="mb-3 sm:mb-4">
                      <span className="text-xs sm:text-sm text-muted-foreground">Delivery: </span>
                      <p className="font-bold text-sm sm:text-base lg:text-lg text-primary">{service.delivery}</p>
                    </div>
                    <div className="mb-4 sm:mb-6">
                      <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">{service.price}</span>
                      <span className="text-sm sm:text-base text-muted-foreground"> onwards</span>
                    </div>
                    <Button className="w-full text-sm sm:text-base">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Three-Way Comparison Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 px-4 sm:px-0 leading-tight">
              Why Choose <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">AI Over Traditional</span> Methods?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4 sm:px-0">Compare and discover the revolutionary advantage of AI-powered development</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Traditional Method */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-2 sm:mx-0"
            >
              <Card className="h-full bg-red-50 border-red-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-red-700 mb-2">Traditional Method</h3>
                    <p className="text-red-600 text-xs sm:text-sm">Outdated & Slow</p>
                  </div>
                  
                  <ul className="space-y-3 sm:space-y-4">
                    <li className="flex items-start space-x-2 sm:space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                      <span className="text-red-700 text-sm sm:text-base">Manual coding and development</span>
                    </li>
                    <li className="flex items-start space-x-2 sm:space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                      <span className="text-red-700 text-sm sm:text-base">Weeks to months for completion</span>
                    </li>
                    <li className="flex items-start space-x-2 sm:space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                      <span className="text-red-700 text-sm sm:text-base">Limited scalability</span>
                    </li>
                    <li className="flex items-start space-x-2 sm:space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                      <span className="text-red-700 text-sm sm:text-base">High ongoing maintenance costs</span>
                    </li>
                    <li className="flex items-start space-x-2 sm:space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                      <span className="text-red-700 text-sm sm:text-base">Generic solutions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Drag-and-Drop Builders */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full bg-yellow-50 border-yellow-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500"></div>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Settings className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-yellow-700 mb-2">Drag-and-Drop Builders</h3>
                    <p className="text-yellow-600 text-sm">Limited & Generic</p>
                  </div>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-yellow-700">Template-based limitations</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-yellow-700">Cookie-cutter designs</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-yellow-700">No intelligent optimization</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-yellow-700">Poor performance metrics</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-yellow-700">DIY approach with no strategy</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* AI-Powered Solutions */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="h-full bg-gradient-to-br from-green-50 to-blue-50 border-green-200 relative overflow-hidden animate-glow">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500"></div>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Brain className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-blue-700 bg-clip-text text-transparent mb-2">AI-Powered Solutions</h3>
                    <p className="text-green-600 text-sm font-semibold">Revolutionary & Smart</p>
                  </div>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-green-700 font-medium">Intelligent design automation</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-green-700 font-medium">Data-driven optimization</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-green-700 font-medium">Continuous learning and improvement</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-green-700 font-medium">Predictive analytics integration</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-green-700 font-medium">Strategic brand architecture</span>
                    </li>
                  </ul>
                  
                  <div className="mt-8">
                    <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
                      <Rocket className="mr-2 h-4 w-4" />
                      Discover the AI Advantage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI in Action Interactive Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Watch <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">AI Transform</span> Your Brand in Real-Time
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Experience the power of AI-driven brand transformation</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-gradient-to-br from-primary/5 to-blue-600/5 border-primary/20 p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Live AI Analysis Dashboard</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">Performance Optimization</span>
                    </div>
                    <span className="text-green-600 font-bold">+247%</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">User Engagement</span>
                    </div>
                    <span className="text-blue-600 font-bold">+189%</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">Conversion Rate</span>
                    </div>
                    <span className="text-purple-600 font-bold">+156%</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">Load Speed</span>
                    </div>
                    <span className="text-orange-600 font-bold">+312%</span>
                  </div>
                </div>
                
                <Button className="w-full mt-6 bg-gradient-to-r from-primary to-blue-600">
                  <Brain className="mr-2 h-4 w-4" />
                  Get Your AI Brand Analysis Now
                </Button>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Card className="p-6 hover:shadow-lg transition-all transform hover:scale-105">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground">Before/After Transformation</h4>
                    <p className="text-muted-foreground text-sm">See instant AI-powered improvements</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all transform hover:scale-105">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground">Competitor Analysis</h4>
                    <p className="text-muted-foreground text-sm">Real-time AI competitor insights</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all transform hover:scale-105">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground">Live Metrics Dashboard</h4>
                    <p className="text-muted-foreground text-sm">Performance tracking in real-time</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all transform hover:scale-105">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground">AI Strategy Preview</h4>
                    <p className="text-muted-foreground text-sm">Generated brand strategy insights</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-blue-600/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Calculate Your <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">AI Investment Return</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">See how AI-powered solutions can transform your business metrics and ROI</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 bg-background border-primary/20">
                <h3 className="text-2xl font-bold text-foreground mb-6">AI ROI Calculator</h3>
                
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-medium">Current Monthly Marketing Spend</Label>
                    <div className="relative mt-2">
                      <span className="absolute left-3 top-3 text-muted-foreground">₹</span>
                      <Input className="pl-8" placeholder="50,000" />
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-base font-medium">Expected Growth Target (%)</Label>
                    <Input className="mt-2" placeholder="200" />
                  </div>
                  
                  <div>
                    <Label className="text-base font-medium">Current Team Size</Label>
                    <Input className="mt-2" placeholder="5" />
                  </div>
                  
                  <div>
                    <Label className="text-base font-medium">Project Timeline (months)</Label>
                    <Input className="mt-2" placeholder="3" />
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-lg py-3">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Calculate My AI-Powered ROI
                  </Button>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <h4 className="text-xl font-bold text-green-800 mb-4">Projected Savings with AI</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">Time Reduction</span>
                    <span className="text-2xl font-bold text-green-600">75%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">Cost Savings</span>
                    <span className="text-2xl font-bold text-green-600">₹2,40,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">Revenue Increase</span>
                    <span className="text-2xl font-bold text-green-600">+180%</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <h4 className="text-xl font-bold text-blue-800 mb-4">Performance Improvements</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-blue-700">Automated optimization processes</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-blue-700">Real-time performance monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-blue-700">Predictive analytics insights</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-blue-700">Scalable infrastructure</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                <h4 className="text-xl font-bold text-purple-800 mb-4">Competitive Advantage</h4>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">10x</div>
                  <p className="text-purple-700">Faster than traditional methods</p>
                  <div className="text-3xl font-bold text-purple-600 mb-2 mt-4">95%</div>
                  <p className="text-purple-700">Client satisfaction rate</p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Success Stories Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">AI Success Stories</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Real transformations, measurable results</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="p-8 h-full hover:shadow-xl transition-all transform hover:scale-105 bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">E-commerce Platform</h3>
                  <p className="text-muted-foreground text-sm">Fashion Retailer</p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Implementation</span>
                    <span className="font-bold text-green-600">2 Days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Revenue Growth</span>
                    <span className="font-bold text-green-600">+340%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cost Reduction</span>
                    <span className="font-bold text-green-600">-65%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">User Engagement</span>
                    <span className="font-bold text-green-600">+280%</span>
                  </div>
                </div>
                
                <blockquote className="text-sm text-muted-foreground italic border-l-4 border-green-500 pl-4">
                  "AI transformed our entire business model. We're now processing 10x more orders with the same team."
                </blockquote>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8 h-full hover:shadow-xl transition-all transform hover:scale-105 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">SaaS Platform</h3>
                  <p className="text-muted-foreground text-sm">B2B Software</p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Launch Time</span>
                    <span className="font-bold text-blue-600">6 Hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">User Acquisition</span>
                    <span className="font-bold text-blue-600">+420%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Conversion Rate</span>
                    <span className="font-bold text-blue-600">+190%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Performance</span>
                    <span className="font-bold text-blue-600">+380%</span>
                  </div>
                </div>
                
                <blockquote className="text-sm text-muted-foreground italic border-l-4 border-blue-500 pl-4">
                  "We launched in hours what would have taken months. AI gave us the competitive edge we needed."
                </blockquote>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="p-8 h-full hover:shadow-xl transition-all transform hover:scale-105 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Healthcare App</h3>
                  <p className="text-muted-foreground text-sm">Medical Technology</p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Development</span>
                    <span className="font-bold text-purple-600">4 Hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Patient Satisfaction</span>
                    <span className="font-bold text-purple-600">+290%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Efficiency Gain</span>
                    <span className="font-bold text-purple-600">+250%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Error Reduction</span>
                    <span className="font-bold text-purple-600">-85%</span>
                  </div>
                </div>
                
                <blockquote className="text-sm text-muted-foreground italic border-l-4 border-purple-500 pl-4">
                  "AI helped us create a life-saving platform that processes patient data with unprecedented accuracy."
                </blockquote>
              </Card>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary px-12 py-4 text-lg">
              <Star className="mr-2 h-5 w-5" />
              Join Our Success Stories
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Human-AI Collaboration Section */}
      <section className="py-20 bg-gradient-to-br from-muted/20 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              The Perfect Synergy: <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">AI Intelligence + Human Creativity</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Where artificial intelligence meets human ingenuity for unparalleled results</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 transform hover:scale-105 transition-all">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-800 mb-2">AI Handles</h3>
                    <ul className="space-y-2 text-blue-700">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span>Data analysis and optimization</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span>Performance monitoring</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span>Automated testing and deployment</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        <span>Predictive analytics</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200 transform hover:scale-105 transition-all">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">Humans Provide</h3>
                    <ul className="space-y-2 text-green-700">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Creative direction and strategy</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Brand vision and storytelling</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Quality assurance and refinement</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Strategic business insights</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 bg-gradient-to-br from-primary/5 to-blue-600/5 border-primary/20 text-center">
                <div className="mb-8">
                  <div className="w-24 h-24 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="flex items-center space-x-2">
                      <Brain className="w-8 h-8 text-white" />
                      <span className="text-white font-bold text-xl">+</span>
                      <Users className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-4">Superior Results</h3>
                  <p className="text-lg text-muted-foreground mb-8">Combined approach delivers outcomes that neither AI nor humans could achieve alone</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">10x</div>
                    <p className="text-sm text-muted-foreground">Faster Development</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">99%</div>
                    <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                    <p className="text-sm text-muted-foreground">Continuous Learning</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
                    <p className="text-sm text-muted-foreground">Scalability</p>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-primary to-blue-600 text-lg py-3">
                  <Zap className="mr-2 h-5 w-5" />
                  Experience Human-AI Collaboration
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Urgency and Scarcity Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse">
              <Clock className="w-4 h-4 mr-2" />
              Limited Time Offer
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Limited <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">AI Onboarding Spots</span> Available
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Join the AI revolution before your competitors do. Exclusive opportunities for early adopters.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="p-8 text-center bg-gradient-to-br from-red-100 to-orange-100 border-red-200 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-red-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-red-800 mb-2">Monthly Capacity</h3>
                  <div className="text-4xl font-bold text-red-600 mb-2">15</div>
                  <p className="text-red-700">New clients only</p>
                  <div className="mt-4 bg-red-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full animate-pulse" style={{ width: '73%' }}></div>
                  </div>
                  <p className="text-xs text-red-600 mt-2">11 spots filled • 4 remaining</p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8 text-center bg-gradient-to-br from-orange-100 to-yellow-100 border-orange-200 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-orange-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-orange-800 mb-2">Early Adopter Bonus</h3>
                  <div className="text-4xl font-bold text-orange-600 mb-2">50%</div>
                  <p className="text-orange-700">Discount on setup</p>
                  <div className="mt-4 bg-orange-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-xs text-orange-600 mt-2">Valid for next 48 hours</p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="p-8 text-center bg-gradient-to-br from-yellow-100 to-green-100 border-yellow-200 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-500 rounded-full opacity-20 animate-pulse"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-yellow-800 mb-2">Exclusive Access</h3>
                  <div className="text-4xl font-bold text-yellow-600 mb-2">24h</div>
                  <p className="text-yellow-700">Priority support</p>
                  <div className="mt-4 bg-yellow-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full animate-pulse" style={{ width: '90%' }}></div>
                  </div>
                  <p className="text-xs text-yellow-600 mt-2">Lifetime benefit</p>
                </div>
              </Card>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-4 sm:p-6 lg:p-8 rounded-2xl max-w-4xl mx-auto mb-8">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">🚨 Act Fast - Limited Time Only!</h3>
              <p className="text-base sm:text-lg lg:text-xl mb-4 sm:mb-6">Join 500+ forward-thinking brands who've already secured their AI advantage</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-red-600 hover:bg-gray-100 hover:text-red-700 text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 font-bold border-0"
                  onClick={scrollToContact}
                >
                  <Rocket className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="text-center">Secure My AI Consultation Spot</span>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-red-600 text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 transition-all"
                  onClick={scrollToContact}
                >
                  <Clock className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="text-center">View Remaining Spots</span>
                </Button>
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm">
              ⚡ Get ahead with AI - Limited time offer expires in <span className="font-bold text-red-600">47 hours</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Future-Proof Your Business Section */}
      <section className="py-20 bg-gradient-to-br from-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Future-Proof</span> Your Business
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Stay ahead of the curve with scalable AI solutions designed for tomorrow's challenges</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Emerging AI Trends</h3>
                    <p className="text-muted-foreground">Stay ahead with cutting-edge AI technologies and industry innovations that shape the future of digital experiences.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Scalability Advantages</h3>
                    <p className="text-muted-foreground">Built-in scalability ensures your AI solutions grow seamlessly with your business without performance compromises.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Adaptive Technology</h3>
                    <p className="text-muted-foreground">Self-improving AI systems that learn and adapt to changing market conditions and user behaviors automatically.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Rocket className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Long-term Growth Potential</h3>
                    <p className="text-muted-foreground">Invest once in AI infrastructure that delivers compounding returns and competitive advantages for years to come.</p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="bg-gradient-to-r from-primary to-blue-600 text-lg px-8 py-4">
                <Shield className="mr-2 h-5 w-5" />
                Future-Proof My Business with AI
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <Card className="p-8 bg-gradient-to-br from-primary/10 to-blue-600/10 border-primary/20">
                <h3 className="text-2xl font-bold text-foreground mb-8">AI Evolution Timeline</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">Phase 1: Foundation (Month 1)</div>
                      <div className="text-sm text-muted-foreground">AI system deployment and initial optimization</div>
                    </div>
                    <div className="text-green-600 font-bold">✓ Complete</div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">Phase 2: Learning (Month 2-3)</div>
                      <div className="text-sm text-muted-foreground">Data collection and pattern recognition</div>
                    </div>
                    <div className="text-blue-600 font-bold">In Progress</div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-purple-300 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">Phase 3: Optimization (Month 4-6)</div>
                      <div className="text-sm text-muted-foreground">Advanced analytics and performance tuning</div>
                    </div>
                    <div className="text-purple-600 font-bold">Upcoming</div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 bg-orange-300 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">Phase 4: Scale (Month 6+)</div>
                      <div className="text-sm text-muted-foreground">Enterprise-level AI capabilities</div>
                    </div>
                    <div className="text-orange-600 font-bold">Future</div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-lg">
                  <h4 className="font-bold text-foreground mb-2">Projected ROI by Year 2</h4>
                  <div className="text-3xl font-bold text-primary">+450%</div>
                  <p className="text-sm text-muted-foreground">Based on current client performance data</p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Why Businesses Trust Us?</h2>
            <div className="flex justify-center mb-8">
              <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400" alt="AI technology abstract visualization" className="rounded-2xl shadow-lg max-w-md w-full h-auto" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-background hover:shadow-xl transition-all h-full">
                  <CardContent className="p-8">
                    <benefit.icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-2xl font-bold text-foreground mb-4">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=600" alt="Modern business team collaborating" className="rounded-2xl shadow-xl mx-auto max-w-4xl w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-8 sm:py-12 lg:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">🛡️ Quality Assurance & Security</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">AI Speed + Developer Assurance = 100% Peace of Mind</p>
          </motion.div>

          <Card className="bg-gradient-to-r from-primary/5 to-blue-500/5 p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400" alt="Modern web development workspace" className="rounded-2xl shadow-lg w-full h-auto" />
              </div>

              <div className="space-y-6">
                {qualityFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className={`bg-${feature.color}-100 p-3 rounded-lg`}>
                      <feature.icon className={`text-${feature.color}-600 text-xl w-6 h-6`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="mt-16 bg-yellow-50 border-yellow-200">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">⚠️</div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Important Note for Clients</h3>
                  <p className="text-lg text-foreground mb-4">
                    <strong>AI is powerful but not magical.</strong> We request all clients to provide complete & detailed requirements during order placement.
                  </p>
                  <p className="text-base text-muted-foreground">
                    Final pricing may vary depending on complexity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-8 sm:py-12 lg:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Perfect Solution For</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Whether you're a startup or enterprise, we have the right solution for your needs.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {targetAudiences.map((audience, index) => (
              <motion.div
                key={audience.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-background p-6 text-center hover:shadow-lg transition-all transform hover:scale-105">
                  <CardContent className="p-0">
                    <audience.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-bold text-foreground">{audience.title}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Limited Time Offer */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">🚀 Limited Period Offer</h2>
            
            <Card className="bg-white/20 backdrop-blur-md border-white/30 mb-8">
              <CardContent className="p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  🎯 Website Live in 2 Hours
                </h3>
                <p className="text-xl md:text-2xl text-white/90 mb-6">
                  Starting <span className="font-bold text-yellow-300">₹2,000 Only</span>
                </p>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                onClick={scrollToContact}
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4 shadow-lg transform hover:scale-105 transition-all"
              >
                <CheckCircle className="mr-2 h-5 w-5" />
                Book Your Project Now
              </Button>
              
              <Button 
                onClick={handleWhatsApp}
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-lg px-8 py-4 shadow-lg transform hover:scale-105 transition-all"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Instant Consultation on WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-8 sm:py-12 lg:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Get In Touch</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Ready to transform your ideas into reality? Let's discuss your project requirements.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <Card className="bg-gradient-to-br from-primary/5 to-blue-500/5">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Synergy Brand Architect</h3>
                  <p className="text-lg text-muted-foreground mb-6">India's First AI-Powered Full Stack IT Solution Provider</p>
                  <p className="text-muted-foreground mb-8">Website Development | Mobile Apps | SaaS Products | Automation Tools</p>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">+91 9525 230232</p>
                        <p className="text-muted-foreground">Call us anytime</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">hello@synergybrandarchitect.in</p>
                        <p className="text-muted-foreground">Send us an email</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">synergybrandarchitect.in</p>
                        <p className="text-muted-foreground">Visit our website</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div>
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400" alt="Modern development workspace setup" className="rounded-2xl shadow-lg w-full h-auto" />
              </div>
            </motion.div>

            {/* Quote Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-muted/30">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Request a Custom Quote</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="service">Service Required *</Label>
                      <Select value={formData.service} onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">Website Development</SelectItem>
                          <SelectItem value="mobile">Mobile App Development</SelectItem>
                          <SelectItem value="webapp">Complex Web Applications</SelectItem>
                          <SelectItem value="crm">CRM/HRMS Software</SelectItem>
                          <SelectItem value="landing">Landing Pages</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="projectDetails">Project Details *</Label>
                      <Textarea
                        id="projectDetails"
                        rows={4}
                        placeholder="Describe your project requirements in detail..."
                        value={formData.projectDetails}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectDetails: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="budgetRange">Budget Range</Label>
                      <Select value={formData.budgetRange || ""} onValueChange={(value) => setFormData(prev => ({ ...prev, budgetRange: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1000-5000">₹1,000 - ₹5,000</SelectItem>
                          <SelectItem value="5000-15000">₹5,000 - ₹15,000</SelectItem>
                          <SelectItem value="15000-50000">₹15,000 - ₹50,000</SelectItem>
                          <SelectItem value="50000+">₹50,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full text-lg py-4" 
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? "Submitting..." : "Get My Quote"}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <p className="text-muted-foreground mb-4">Or get instant consultation</p>
                    <Button 
                      onClick={handleWhatsApp}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <img src="https://imagizer.imageshack.com/img924/5789/CC6b4R.png" alt="Synergy Brand Architect Logo" className="h-8 sm:h-10 w-auto brightness-0 invert" />
                <div className="flex flex-col">
                  <span className="font-bold text-sm sm:text-lg lg:text-xl leading-tight">Synergy Brand Architect</span>
                  <span className="text-xs text-gray-400">AI-Powered Solutions</span>
                </div>
              </div>
              <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6 max-w-md">India's First AI-Powered Full Stack IT Solution Provider. Delivering websites, mobile apps, and SaaS solutions in hours, not months.</p>
              
              <div className="flex space-x-3 sm:space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <div className="w-5 h-5 sm:w-6 sm:h-6">📘</div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <div className="w-5 h-5 sm:w-6 sm:h-6">🐦</div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <div className="w-5 h-5 sm:w-6 sm:h-6">💼</div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <div className="w-5 h-5 sm:w-6 sm:h-6">📷</div>
                </a>
              </div>
            </div>

            <div className="col-span-1">
              <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">Services</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-gray-300 text-xs sm:text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Website Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile Apps</a></li>
                <li><a href="#" className="hover:text-white transition-colors">SaaS Platforms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">CRM/HRMS</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Landing Pages</a></li>
              </ul>
            </div>

            <div className="col-span-1">
              <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">Contact</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-gray-300 text-xs sm:text-sm">
                <li>+91 9525 230232</li>
                <li>hello@synergybrandarchitect.in</li>
                <li>synergybrandarchitect.in</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 text-xs sm:text-sm">
                <a 
                  href="https://synergybrandarchitect.in/privacy-policy" 
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
                <a 
                  href="https://synergybrandarchitect.in/terms-of-service" 
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms and Conditions
                </a>
                <a 
                  href="https://synergybrandarchitect.in/refund-policy" 
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Refund Policy
                </a>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLocation("/admin-login")}
                  className="text-gray-400 hover:text-white p-0 h-auto font-normal"
                >
                  Admin Login
                </Button>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-right">© 2024 Synergy Brand Architect. All rights reserved. | Powered by AI + Human Excellence</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <Button
        onClick={handleWhatsApp}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 animate-pulse"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
}
