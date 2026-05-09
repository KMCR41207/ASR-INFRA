import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { AnimatedSelect } from "../ui/AnimatedSelect";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CheckCircle, MessageCircle, LayoutDashboard, X } from "lucide-react";
import { toast } from "sonner";

// AI-generated WhatsApp message from form data
function generateWhatsAppMessage(data: Record<string, string>): string {
  const serviceLabel = data.serviceType.replace(/-/g, " ").toUpperCase();
  let details = "";

  if (data.steelType) details += `\n🔩 Steel Type: ${data.steelType} | Grade: ${data.steelGrade}`;
  if (data.sandType) details += `\n🏖️ Sand Type: ${data.sandType} | Grade: ${data.sandGrade}`;
  if (data.materialType) details += `\n📦 Material: ${data.materialType}`;
  if (data.vehicleType) details += `\n🚛 Vehicle: ${data.vehicleType}`;
  if (data.quantity) details += `\n⚖️ Quantity: ${data.quantity} ${data.unit}`;

  return encodeURIComponent(
`🏗️ *ASR INFRA — New Quote Request*

Hello! I'd like to request a quote for the following:

━━━━━━━━━━━━━━━━━━━
👤 *Customer Details*
Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
━━━━━━━━━━━━━━━━━━━
🚚 *Service Details*
Service: ${serviceLabel}${details}
Pickup: ${data.pickupLocation}
Delivery: ${data.deliveryLocation}
Preferred Date: ${data.preferredDate}
━━━━━━━━━━━━━━━━━━━
📝 *Load Details*
${data.loadDetails}
━━━━━━━━━━━━━━━━━━━

Please provide a quote at your earliest convenience. Thank you! 🙏`
  );
}

export function QuotePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const [pendingData, setPendingData] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem("userAuth");
    if (!auth) navigate("/login");
    
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
    setPendingData({ ...formData });
    setShowChoiceModal(true);
  };

  const submitToWebsite = () => {
    if (!pendingData) return;
    const existing = JSON.parse(localStorage.getItem("quoteRequests") || "[]");
    const newRequest = {
      id: Date.now(),
      ...pendingData,
      createdAt: new Date().toISOString(),
      status: "new",
    };
    localStorage.setItem("quoteRequests", JSON.stringify([...existing, newRequest]));
    setShowChoiceModal(false);
    toast.success("Quote submitted! We'll contact you shortly.");
    resetForm();
  };

  const submitViaWhatsApp = () => {
    if (!pendingData) return;
    // Also save to admin panel
    const existing = JSON.parse(localStorage.getItem("quoteRequests") || "[]");
    const newRequest = {
      id: Date.now(),
      ...pendingData,
      createdAt: new Date().toISOString(),
      status: "new",
      sentViaWhatsApp: true,
    };
    localStorage.setItem("quoteRequests", JSON.stringify([...existing, newRequest]));
    
    const message = generateWhatsAppMessage(pendingData);
    window.open(`https://wa.me/918142452633?text=${message}`, "_blank");
    setShowChoiceModal(false);
    toast.success("Opening WhatsApp with your quote details!");
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      pickupLocation: "", deliveryLocation: "", serviceType: "",
      loadDetails: "", preferredDate: "", quantity: "", unit: "",
      steelType: "", steelGrade: "", sandType: "", sandGrade: "",
      materialType: "", vehicleType: "", name: "", phone: "", email: "",
    });
    setPendingData(null);
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
      {/* Choice Modal */}
      {showChoiceModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-primary px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-white font-bold text-xl">How to send your quote?</h2>
                <p className="text-[#a8c0d6] text-sm mt-0.5">Choose your preferred method</p>
              </div>
              <button onClick={() => setShowChoiceModal(false)} className="text-white/70 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 gap-4">
              {/* Website option */}
              <button
                onClick={submitToWebsite}
                className="flex items-start gap-4 p-5 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left group"
              >
                <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <LayoutDashboard className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-primary text-base">Submit via Website</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Your request goes directly into the admin control panel. We'll review and contact you.
                  </p>
                </div>
              </button>

              {/* WhatsApp option */}
              <button
                onClick={submitViaWhatsApp}
                className="flex items-start gap-4 p-5 rounded-xl border-2 border-border hover:border-green-500 hover:bg-green-50 transition-all text-left group"
              >
                <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-green-700 text-base">Send via WhatsApp</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    An AI-generated message with all your details will open in WhatsApp to send directly to admin.
                  </p>
                </div>
              </button>
            </div>
            <div className="px-6 pb-5 text-center text-xs text-muted-foreground">
              Both options also save your request to the admin panel
            </div>
          </div>
        </div>
      )}

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
                      <div className="mt-2">
                        <AnimatedSelect
                          value={formData.serviceType}
                          onChange={(value) => setFormData({ ...formData, serviceType: value })}
                          options={[
                            { value: "transportation", label: "Transportation" },
                            { value: "goods-carrier", label: "Goods Carrier" },
                            { value: "raw-material-import", label: "Raw Material Import" },
                            { value: "sand-supply", label: "Sand Supply" },
                            { value: "steel-supply", label: "Steel Supply" },
                            { value: "construction-material", label: "Construction Material" },
                            { value: "heavy-equipment", label: "Heavy Equipment Transport" },
                            { value: "other", label: "Other" },
                          ]}
                          placeholder="Select service type"
                          required
                        />
                      </div>
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
