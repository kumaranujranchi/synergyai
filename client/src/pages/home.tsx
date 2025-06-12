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
  MessageCircle
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
              <img src="https://imagizer.imageshack.com/img924/5789/CC6b4R.png" alt="Synergy Brand Architect Logo" className="h-10 w-auto" />
              <span className="font-bold text-xl text-foreground">Synergy Brand Architect</span>
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
              <div className="space-y-1">
                <div className="w-5 h-0.5 bg-foreground"></div>
                <div className="w-5 h-0.5 bg-foreground"></div>
                <div className="w-5 h-0.5 bg-foreground"></div>
              </div>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 bg-gradient-to-br from-background via-muted/20 to-background">
        {/* Floating elements */}
        <div className="absolute top-20 left-10 animate-pulse opacity-30">
          <Brain className="w-16 h-16 text-primary" />
        </div>
        <div className="absolute top-40 right-20 animate-bounce opacity-20">
          <Code className="w-12 h-12 text-secondary" />
        </div>
        <div className="absolute bottom-40 left-20 animate-pulse opacity-25">
          <Zap className="w-14 h-14 text-primary" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              India's First{" "}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                AI-Driven
              </span>{" "}
              IT Solutions Company
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
              Websites, Mobile Apps, CRM & SaaS Solutions — Delivered in{" "}
              <span className="font-bold text-primary">Hours, Not Months</span>
            </p>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-12 font-medium">
              <span className="text-blue-600">AI Builds It.</span>{" "}
              <span className="text-primary">Humans Perfect It.</span>{" "}
              <span className="text-foreground">You Scale It.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button 
                onClick={scrollToContact}
                size="lg" 
                className="text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Get Instant Quote
              </Button>
              
              <Button 
                onClick={handleCall}
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 transform hover:scale-105 transition-all"
              >
                <Phone className="mr-2 h-5 w-5" />
                Talk to Us Now
              </Button>
            </div>

            <Card className="backdrop-blur-md bg-background/75 max-w-5xl mx-auto">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">2 Hour Delivery</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Lowest Pricing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">Bug-Free Code</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="font-medium">Human Verified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RotateCcw className="h-4 w-4 text-cyan-500" />
                    <span className="font-medium">Free CI/CD</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">Transparent</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-lg text-muted-foreground mt-8 italic font-medium">
              "Sun ke aaya na maza — Ye hai AI ka kamal!" 🚀
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Services We Offer</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">From simple landing pages to complex enterprise solutions, powered by AI and perfected by experts.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`bg-gradient-to-br ${service.gradient} ${service.border} hover:shadow-xl transition-all transform hover:scale-105 h-full`}>
                  <CardContent className="p-8">
                    <service.icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-2xl font-bold text-foreground mb-4">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <div className="mb-4">
                      <span className="text-sm text-muted-foreground">Delivery: </span>
                      <p className="font-bold text-lg text-primary">{service.delivery}</p>
                    </div>
                    <div className="mb-6">
                      <span className="text-3xl font-bold text-green-600">{service.price}</span>
                      <span className="text-muted-foreground"> onwards</span>
                    </div>
                    <Button className="w-full">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
      <section className="py-20 bg-background">
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
      <section className="py-20 bg-muted/30">
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
      <section id="contact" className="py-20 bg-background">
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
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <img src="https://imagizer.imageshack.com/img924/5789/CC6b4R.png" alt="Synergy Brand Architect Logo" className="h-10 w-auto brightness-0 invert" />
                <span className="font-bold text-xl">Synergy Brand Architect</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">India's First AI-Powered Full Stack IT Solution Provider. Delivering websites, mobile apps, and SaaS solutions in hours, not months.</p>
              
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <div className="w-6 h-6">📘</div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <div className="w-6 h-6">🐦</div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <div className="w-6 h-6">💼</div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <div className="w-6 h-6">📷</div>
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Services</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Website Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile Apps</a></li>
                <li><a href="#" className="hover:text-white transition-colors">SaaS Platforms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">CRM/HRMS</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Landing Pages</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-300">
                <li>+91 9525 230232</li>
                <li>hello@synergybrandarchitect.in</li>
                <li>synergybrandarchitect.in</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
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
              <p className="text-gray-400 text-sm">© 2024 Synergy Brand Architect. All rights reserved. | Powered by AI + Human Excellence</p>
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
