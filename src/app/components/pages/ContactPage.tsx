import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent } from "../ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save to localStorage so admin can see it
    const existing = JSON.parse(localStorage.getItem("contactRequests") || "[]");
    const newRequest = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
      status: "new",
    };
    localStorage.setItem("contactRequests", JSON.stringify([...existing, newRequest]));

    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({
      name: "",
      phone: "",
      email: "",
      serviceType: "",
      message: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const mapsLink = "https://maps.app.goo.gl/2rSo8xU6HY3yaSQr8";

  const contactInfo = [
    {
      icon: <Phone className="w-8 h-8 text-accent" />,
      title: "Phone",
      details: ["+91 98765 43210", "+91 98765 43211"],
    },
    {
      icon: <Mail className="w-8 h-8 text-accent" />,
      title: "Email",
      details: ["info@asrinfra.com", "sales@asrinfra.com"],
    },
    {
      icon: <MapPin className="w-8 h-8 text-accent" />,
      title: "Address",
      details: ["C5M4+W24, Bommakal Rd, Krishna Nagar", "Housing Board Colony, Karimnagar", "Bommakal, Telangana 505002"],
      link: mapsLink,
    },
    {
      icon: <Clock className="w-8 h-8 text-accent" />,
      title: "Business Hours",
      details: ["Mon - Sat: 8:00 AM - 8:00 PM", "Sun: 9:00 AM - 5:00 PM"],
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl mb-12 text-center">Contact Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Address */}
            <div className="flex items-start gap-4">
              <MapPin className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
              <div>
                <p className="text-lg font-semibold mb-2">Address</p>
                <p className="text-[#c8d9e8]">C5M4+W24, Bommakal Rd, Krishna Nagar</p>
                <p className="text-[#c8d9e8]">Housing Board Colony, Karimnagar</p>
                <p className="text-[#c8d9e8]">Bommakal, Telangana 505002</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <Phone className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
              <div>
                <p className="text-lg font-semibold mb-2">Phone</p>
                <p className="text-[#c8d9e8]">+91 98765 43210</p>
                <p className="text-[#c8d9e8]">+91 98765 43211</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <Mail className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
              <div>
                <p className="text-lg font-semibold mb-2">Email</p>
                <p className="text-[#c8d9e8]">info@asrinfra.com</p>
                <p className="text-[#c8d9e8]">sales@asrinfra.com</p>
              </div>
            </div>
          </div>

          {/* Map Button */}
          <div className="mt-12 text-center">
            <a 
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: '#E8500A' }}
              className="inline-block hover:opacity-90 text-white font-semibold py-3 px-8 rounded-lg transition-all shadow-lg"
            >
              📍 View on Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 px-4 bg-[#e8f0f7]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card 
                key={index} 
                className={`text-center hover:shadow-xl transition-shadow ${info.link ? 'cursor-pointer' : ''}`}
                onClick={() => info.link && window.open(info.link, '_blank')}
              >
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">{info.icon}</div>
                  <h3 className="mb-3 text-primary">{info.title}</h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className={`${info.link ? 'hover:text-accent transition-colors' : 'text-muted-foreground'}`}>
                      {detail}
                    </p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl mb-6 text-primary">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="serviceType">Service Type *</Label>
                  <Select
                    value={formData.serviceType}
                    onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                    required
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="transportation">Goods Transportation</SelectItem>
                      <SelectItem value="trucking">Trucking Services</SelectItem>
                      <SelectItem value="sand">Sand Supply</SelectItem>
                      <SelectItem value="steel">Steel Supply</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Message / Order Details *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your requirements"
                    rows={5}
                    className="mt-2"
                  />
                </div>

                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-3xl mb-6 text-primary">Our Location</h2>
              <a 
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#c8d9e8] rounded-lg h-[500px] flex items-center justify-center hover:bg-[#a8c0d6] transition-colors cursor-pointer"
              >
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-16 h-16 mx-auto mb-4 text-accent" />
                  <p className="text-lg font-semibold">Click to View on Google Maps</p>
                  <p className="text-sm mt-2">C5M4+W24, Bommakal Rd, Krishna Nagar</p>
                  <p className="text-sm">Housing Board Colony, Karimnagar</p>
                  <p className="text-sm">Bommakal, Telangana 505002</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl mb-6">Book Your Service Now</h2>
          <p className="text-xl mb-8 text-[#c8d9e8]">
            Ready to get started? Request a quote and we'll respond within 24 hours.
          </p>
        </div>
      </section>
    </div>
  );
}
