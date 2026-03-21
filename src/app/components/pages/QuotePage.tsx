import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";

export function QuotePage() {
  const [formData, setFormData] = useState({
    pickupLocation: "",
    deliveryLocation: "",
    serviceType: "",
    loadDetails: "",
    preferredDate: "",
    name: "",
    phone: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Quote request submitted! We'll contact you shortly with pricing details.");
    setFormData({
      pickupLocation: "",
      deliveryLocation: "",
      serviceType: "",
      loadDetails: "",
      preferredDate: "",
      name: "",
      phone: "",
      email: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const benefits = [
    "Instant quote estimation",
    "No hidden charges",
    "24/7 customer support",
    "Real-time tracking",
    "Flexible scheduling",
    "Verified and insured",
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl mb-6">Request a Quote</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Get a competitive quote for your transportation or supply needs in minutes
          </p>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Service Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Service Type */}
                    <div>
                      <Label htmlFor="serviceType">Service Type *</Label>
                      <Select
                        value={formData.serviceType}
                        onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                        required
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="transportation">Transportation</SelectItem>
                          <SelectItem value="goods-carrier">Goods Carrier</SelectItem>
                          <SelectItem value="raw-material-import">Raw Material Import</SelectItem>
                          <SelectItem value="sand-supply">Sand Supply</SelectItem>
                          <SelectItem value="steel-supply">Steel Supply</SelectItem>
                          <SelectItem value="construction-material">Construction Material</SelectItem>
                          <SelectItem value="heavy-equipment">Heavy Equipment Transport</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Pickup Location */}
                    <div>
                      <Label htmlFor="pickupLocation">Pickup Location *</Label>
                      <Input
                        id="pickupLocation"
                        name="pickupLocation"
                        value={formData.pickupLocation}
                        onChange={handleChange}
                        required
                        placeholder="Enter pickup address"
                        className="mt-2"
                      />
                    </div>

                    {/* Delivery Location */}
                    <div>
                      <Label htmlFor="deliveryLocation">Delivery Location *</Label>
                      <Input
                        id="deliveryLocation"
                        name="deliveryLocation"
                        value={formData.deliveryLocation}
                        onChange={handleChange}
                        required
                        placeholder="Enter delivery address"
                        className="mt-2"
                      />
                    </div>

                    {/* Load Details */}
                    <div>
                      <Label htmlFor="loadDetails">Load Details *</Label>
                      <Textarea
                        id="loadDetails"
                        name="loadDetails"
                        value={formData.loadDetails}
                        onChange={handleChange}
                        required
                        placeholder="Describe your load (type, quantity, weight, etc.)"
                        rows={4}
                        className="mt-2"
                      />
                    </div>

                    {/* Preferred Date */}
                    <div>
                      <Label htmlFor="preferredDate">Preferred Date *</Label>
                      <Input
                        id="preferredDate"
                        name="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="mt-2"
                      />
                    </div>

                    <div className="border-t pt-6 mt-6">
                      <h3 className="text-lg font-semibold mb-4 text-primary">Contact Information</h3>

                      <div className="space-y-4">
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
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-accent hover:bg-accent/90 text-white"
                      size="lg"
                    >
                      Get Quote
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Benefits Sidebar */}
            <div className="space-y-6">
              <Card className="bg-primary text-white">
                <CardHeader>
                  <CardTitle>Why Choose Us?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-accent border-2">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3 text-primary">Need Immediate Assistance?</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Call us directly for urgent requirements
                  </p>
                  <a href="tel:+919876543210" className="block">
                    <Button className="w-full bg-accent hover:bg-accent/90 text-white">
                      Call +91 98765 43210
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3 text-primary">Response Time</h3>
                  <p className="text-muted-foreground text-sm">
                    We typically respond to quote requests within <strong>2-4 hours</strong> during business hours.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4 text-primary">Trusted by Industry Leaders</h2>
            <p className="text-muted-foreground text-lg">
              Join hundreds of satisfied clients who trust ASR INFRA for their logistics needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-accent mb-2">98%</div>
                <p className="text-muted-foreground">Customer Satisfaction</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-accent mb-2">24/7</div>
                <p className="text-muted-foreground">Support Available</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-accent mb-2">5000+</div>
                <p className="text-muted-foreground">Successful Deliveries</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
