import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";

export function QuotePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const auth = localStorage.getItem("userAuth");
    if (!auth) navigate("/login");
    
    // Pre-select service type from URL parameter
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      setFormData(prev => ({ ...prev, serviceType: serviceParam }));
    }
  }, [navigate, searchParams]);
  const [formData, setFormData] = useState({
    pickupLocation: "",
    deliveryLocation: "",
    serviceType: "",
    loadDetails: "",
    preferredDate: "",
    // Dynamic fields
    quantity: "",
    unit: "",
    steelType: "",
    steelGrade: "",
    sandType: "",
    sandGrade: "",
    materialType: "",
    vehicleType: "",
    name: "",
    phone: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save to localStorage so admin can see it
    const existing = JSON.parse(localStorage.getItem("quoteRequests") || "[]");
    const newRequest = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
      status: "new",
    };
    localStorage.setItem("quoteRequests", JSON.stringify([...existing, newRequest]));

    toast.success("Quote request submitted! We'll contact you shortly with pricing details.");
    setFormData({
      pickupLocation: "",
      deliveryLocation: "",
      serviceType: "",
      loadDetails: "",
      preferredDate: "",
      quantity: "",
      unit: "",
      steelType: "",
      steelGrade: "",
      sandType: "",
      sandGrade: "",
      materialType: "",
      vehicleType: "",
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
          <p className="text-xl text-[#c8d9e8] max-w-3xl mx-auto">
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

                    {/* Dynamic Fields for Steel Supply */}
                    {formData.serviceType === "steel-supply" && (
                      <div className="space-y-4 p-4 bg-[#e8f0f7] rounded-lg">
                        <h4 className="font-semibold text-primary">Steel Details</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="steelType">Steel Type *</Label>
                            <Select
                              value={formData.steelType}
                              onValueChange={(value) => setFormData({ ...formData, steelType: value })}
                              required
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="tmt-bars">TMT Bars</SelectItem>
                                <SelectItem value="angles">Angles</SelectItem>
                                <SelectItem value="channels">Channels</SelectItem>
                                <SelectItem value="beams">Beams</SelectItem>
                                <SelectItem value="plates">Plates</SelectItem>
                                <SelectItem value="sheets">Sheets</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="steelGrade">Grade *</Label>
                            <Select
                              value={formData.steelGrade}
                              onValueChange={(value) => setFormData({ ...formData, steelGrade: value })}
                              required
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Select grade" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="fe-415">Fe 415</SelectItem>
                                <SelectItem value="fe-500">Fe 500</SelectItem>
                                <SelectItem value="fe-550">Fe 550</SelectItem>
                                <SelectItem value="fe-600">Fe 600</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="quantity">Quantity *</Label>
                            <Input
                              id="quantity"
                              name="quantity"
                              type="number"
                              value={formData.quantity}
                              onChange={handleChange}
                              required
                              placeholder="Enter quantity"
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label htmlFor="unit">Unit *</Label>
                            <Select
                              value={formData.unit}
                              onValueChange={(value) => setFormData({ ...formData, unit: value })}
                              required
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Select unit" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="tons">Tons</SelectItem>
                                <SelectItem value="kg">Kilograms</SelectItem>
                                <SelectItem value="pieces">Pieces</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Dynamic Fields for Sand Supply */}
                    {formData.serviceType === "sand-supply" && (
                      <div className="space-y-4 p-4 bg-[#e8f0f7] rounded-lg">
                        <h4 className="font-semibold text-primary">Sand Details</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="sandType">Sand Type *</Label>
                            <Select
                              value={formData.sandType}
                              onValueChange={(value) => setFormData({ ...formData, sandType: value })}
                              required
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="river-sand">River Sand</SelectItem>
                                <SelectItem value="m-sand">M-Sand (Manufactured)</SelectItem>
                                <SelectItem value="p-sand">P-Sand (Plastering)</SelectItem>
                                <SelectItem value="coarse-sand">Coarse Sand</SelectItem>
                                <SelectItem value="fine-sand">Fine Sand</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="sandGrade">Grade *</Label>
                            <Select
                              value={formData.sandGrade}
                              onValueChange={(value) => setFormData({ ...formData, sandGrade: value })}
                              required
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Select grade" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="grade-1">Grade 1 (Premium)</SelectItem>
                                <SelectItem value="grade-2">Grade 2 (Standard)</SelectItem>
                                <SelectItem value="grade-3">Grade 3 (Economy)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="quantity">Quantity *</Label>
                            <Input
                              id="quantity"
                              name="quantity"
                              type="number"
                              value={formData.quantity}
                              onChange={handleChange}
                              required
                              placeholder="Enter quantity"
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label htmlFor="unit">Unit *</Label>
                            <Select
                              value={formData.unit}
                              onValueChange={(value) => setFormData({ ...formData, unit: value })}
                              required
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Select unit" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="tons">Tons</SelectItem>
                                <SelectItem value="cubic-meters">Cubic Meters</SelectItem>
                                <SelectItem value="loads">Loads</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Dynamic Fields for Raw Material Import */}
                    {formData.serviceType === "raw-material-import" && (
                      <div className="space-y-4 p-4 bg-[#e8f0f7] rounded-lg">
                        <h4 className="font-semibold text-primary">Material Details</h4>
                        <div>
                          <Label htmlFor="materialType">Material Type *</Label>
                          <Input
                            id="materialType"
                            name="materialType"
                            value={formData.materialType}
                            onChange={handleChange}
                            required
                            placeholder="e.g., Iron Ore, Coal, Cement, etc."
                            className="mt-2"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="quantity">Quantity *</Label>
                            <Input
                              id="quantity"
                              name="quantity"
                              type="number"
                              value={formData.quantity}
                              onChange={handleChange}
                              required
                              placeholder="Enter quantity"
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label htmlFor="unit">Unit *</Label>
                            <Select
                              value={formData.unit}
                              onValueChange={(value) => setFormData({ ...formData, unit: value })}
                              required
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Select unit" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="tons">Tons</SelectItem>
                                <SelectItem value="kg">Kilograms</SelectItem>
                                <SelectItem value="containers">Containers</SelectItem>
                                <SelectItem value="pallets">Pallets</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Dynamic Fields for Transportation/Goods Carrier */}
                    {(formData.serviceType === "transportation" || formData.serviceType === "goods-carrier") && (
                      <div className="space-y-4 p-4 bg-[#e8f0f7] rounded-lg">
                        <h4 className="font-semibold text-primary">Transport Details</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="vehicleType">Vehicle Type *</Label>
                            <Select
                              value={formData.vehicleType}
                              onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}
                              required
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Select vehicle" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="mini-truck">Mini Truck (1-2 Tons)</SelectItem>
                                <SelectItem value="medium-truck">Medium Truck (3-6 Tons)</SelectItem>
                                <SelectItem value="large-truck">Large Truck (7-12 Tons)</SelectItem>
                                <SelectItem value="trailer">Trailer (12+ Tons)</SelectItem>
                                <SelectItem value="container">Container Truck</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="quantity">Estimated Weight *</Label>
                            <Input
                              id="quantity"
                              name="quantity"
                              type="number"
                              value={formData.quantity}
                              onChange={handleChange}
                              required
                              placeholder="Enter weight"
                              className="mt-2"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="unit">Unit *</Label>
                          <Select
                            value={formData.unit}
                            onValueChange={(value) => setFormData({ ...formData, unit: value })}
                            required
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tons">Tons</SelectItem>
                              <SelectItem value="kg">Kilograms</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

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
      <section className="py-20 px-4 bg-[#e8f0f7]">
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
