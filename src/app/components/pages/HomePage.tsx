import { Link } from "react-router";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import FlowingMenu from "../ui/FlowingMenu";
import GradientText from "../ui/GradientText";
import {
  Clock,
  DollarSign,
  ShieldCheck,
  Headphones,
  Phone,
  FileText,
  CheckCircle,
  Truck,
} from "lucide-react";

export function HomePage() {
  const services = [
    {
      link: '/services',
      text: 'Transportation',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&h=400&fit=crop',
    },
    {
      link: '/services',
      text: 'Goods Carrier',
      image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&h=400&fit=crop',
    },
    {
      link: '/services',
      text: 'Raw Material Import',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
    },
    {
      link: '/services',
      text: 'Steel Supply',
      image: '/steel.jpg',
    },
  ];

  const whyChooseUs = [
    {
      icon: <Clock className="w-10 h-10 text-accent" />,
      title: "Timely Delivery",
      description: "We ensure on-time delivery for all your shipments",
    },
    {
      icon: <DollarSign className="w-10 h-10 text-accent" />,
      title: "Affordable Pricing",
      description: "Competitive rates without compromising quality",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-accent" />,
      title: "Verified Drivers",
      description: "All our drivers are verified and experienced",
    },
    {
      icon: <Headphones className="w-10 h-10 text-accent" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support at your service",
    },
  ];

  const processSteps = [
    { icon: <Phone />, title: "Contact Us", description: "Reach out via phone, email, or website" },
    { icon: <FileText />, title: "Get a Quote", description: "Receive a competitive quote instantly" },
    { icon: <CheckCircle />, title: "Confirm Order", description: "Confirm your order and schedule pickup" },
    { icon: <Truck />, title: "Delivery", description: "Track and receive your shipment on time" },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "Kumar Constructions",
      text: "ASR INFRA has been our go-to partner for sand and steel supply. Their reliability and timely delivery are unmatched.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    },
    {
      name: "Priya Sharma",
      company: "Sharma Logistics",
      text: "Excellent trucking services! The team is professional and the pricing is very competitive. Highly recommended.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    },
    {
      name: "Amit Patel",
      company: "Patel Industries",
      text: "We've been working with ASR INFRA for over 2 years. Their 24/7 support and verified drivers give us peace of mind.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1766561994067-dbd575e1cff2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwdHJ1Y2slMjBoaWdod2F5JTIwbG9naXN0aWNzfGVufDF8fHx8MTc3MzkzNzUwOHww&ixlib=rb-4.1.0&q=80&w=1080')`,
          }}
        >
          <div className="absolute inset-0 bg-primary/80" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl px-4">
          <h1 className="text-5xl md:text-6xl mb-6">
            <GradientText
              colors={["#ffffff", "#E8500A", "#ffb347", "#E8500A", "#ffffff"]}
              animationSpeed={6}
              showBorder={false}
              className="text-5xl md:text-6xl font-bold"
            >
              ASR INFRA – Reliable Transportation & Supply Services
            </GradientText>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-[#c8d9e8]">
            Fast, secure, and affordable trucking, sand & steel supply solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8">
                Request Service
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white px-8">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-[#e8f0f7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-primary">Our Services</h2>
            <p className="text-muted-foreground text-lg">
              Comprehensive solutions for all your transportation and supply needs
            </p>
          </div>
        </div>
        <div style={{ height: '350px', position: 'relative' }}>
          <FlowingMenu
            items={services}
            speed={15}
            textColor="#ffffff"
            bgColor="#0F2A44"
            marqueeBgColor="#E8500A"
            marqueeTextColor="#ffffff"
            borderColor="#ffffff"
          />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-primary">Why Choose ASR INFRA</h2>
            <p className="text-muted-foreground text-lg">
              Experience the difference with our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="mb-2 text-primary">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-[#e8f0f7]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-primary">How It Works</h2>
            <p className="text-muted-foreground text-lg">
              Simple and efficient process to get your service started
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-accent text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="mb-2 text-primary">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-accent/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-primary">What Our Clients Say</h2>
            <p className="text-muted-foreground text-lg">
              Trusted by businesses across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="text-primary">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">&ldquo;{testimonial.text}&rdquo;</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-[#c8d9e8]">
            Contact us today for a free quote and experience reliable service
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8">
              Request a Quote Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
