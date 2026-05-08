import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { LogOut, Mail, Phone, User, Calendar, MessageSquare, MapPin, Package, Trash2, Tag, Plus, IndianRupee, ArrowLeftRight, CheckCircle, XCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { getOffers, createOffer, adminRespondToOffer, type Offer } from "../../lib/offerStore";

interface QuoteRequest {
  id: number;
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  pickupLocation: string;
  deliveryLocation: string;
  loadDetails: string;
  preferredDate: string;
  quantity: string;
  unit: string;
  steelType?: string;
  steelGrade?: string;
  sandType?: string;
  sandGrade?: string;
  materialType?: string;
  vehicleType?: string;
  createdAt: string;
  status: "new" | "contacted" | "completed";
  adminNote?: string;
  offer?: string;
}

interface ContactRequest {
  id: number;
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  message: string;
  createdAt: string;
  status: "new" | "contacted" | "completed";
  adminNote?: string;
}

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"quotes" | "contacts" | "offers">("quotes");
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [showNewOffer, setShowNewOffer] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [newOffer, setNewOffer] = useState({ userId: "", userName: "", title: "", description: "", originalAmount: "", adminNotes: "", expiryDate: "" });
  const [reviseAmount, setReviseAmount] = useState("");
  const [reviseMessage, setReviseMessage] = useState("");
  const [editingNote, setEditingNote] = useState<number | null>(null);
  const [editingOffer, setEditingOffer] = useState<number | null>(null);
  const [noteText, setNoteText] = useState("");
  const [offerText, setOfferText] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("adminAuth")) navigate("/admin/login");
    loadData();
  }, [navigate]);

  const loadData = () => {
    setQuoteRequests(JSON.parse(localStorage.getItem("quoteRequests") || "[]"));
    setContactRequests(JSON.parse(localStorage.getItem("contactRequests") || "[]"));
    setOffers(getOffers());
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const updateQuoteStatus = (id: number, status: QuoteRequest["status"]) => {
    const updated = quoteRequests.map(r => r.id === id ? { ...r, status } : r);
    setQuoteRequests(updated);
    localStorage.setItem("quoteRequests", JSON.stringify(updated));
    toast.success("Status updated!");
  };

  const updateContactStatus = (id: number, status: ContactRequest["status"]) => {
    const updated = contactRequests.map(r => r.id === id ? { ...r, status } : r);
    setContactRequests(updated);
    localStorage.setItem("contactRequests", JSON.stringify(updated));
    toast.success("Status updated!");
  };

  const saveNote = (id: number, type: "quote" | "contact") => {
    if (type === "quote") {
      const updated = quoteRequests.map(r => r.id === id ? { ...r, adminNote: noteText } : r);
      setQuoteRequests(updated);
      localStorage.setItem("quoteRequests", JSON.stringify(updated));
    } else {
      const updated = contactRequests.map(r => r.id === id ? { ...r, adminNote: noteText } : r);
      setContactRequests(updated);
      localStorage.setItem("contactRequests", JSON.stringify(updated));
    }
    setEditingNote(null);
    setNoteText("");
    toast.success("Note saved!");
  };

  const saveOffer = (id: number) => {
    const request = quoteRequests.find(r => r.id === id);
    if (!request) return;
    
    // Save the offer to localStorage
    const updated = quoteRequests.map(r => r.id === id ? { ...r, offer: offerText } : r);
    setQuoteRequests(updated);
    localStorage.setItem("quoteRequests", JSON.stringify(updated));
    setEditingOffer(null);
    setOfferText("");
    
    // Extract phone number (remove any non-digit characters)
    const phoneNumber = request.phone.replace(/\D/g, '');
    
    // Create WhatsApp message with professional template
    const message = `🏗️ ASR INFRA – Offer Details

Hello 👋

Thank you for choosing ASR Infra. We truly appreciate the opportunity to serve you and are glad to assist with your requirements. Our team is committed to providing reliable, professional, and high-quality infrastructure services.

We look forward to building a strong and successful working relationship with you. 🤝

━━━━━━━━━━━━━━━━━━━
👤 Customer Details
Name: ${request.name}
━━━━━━━━━━━━━━━━━━━
🚚 Load Details
Pickup Location: ${request.pickupLocation || 'As discussed'}
Drop Location: ${request.deliveryLocation || 'As discussed'}
Material Type: ${request.serviceType.replace(/-/g, ' ').toUpperCase()}${request.steelType ? ` - ${request.steelType}` : ''}${request.sandType ? ` - ${request.sandType}` : ''}${request.materialType ? ` - ${request.materialType}` : ''}
Weight / Quantity: ${request.quantity ? `${request.quantity} ${request.unit}` : 'As per requirement'}
Vehicle Required: ${request.vehicleType || 'As per load requirement'}
━━━━━━━━━━━━━━━━━━━
💰 Our Offer
Offered Price: ${offerText}
Additional Notes: ${request.loadDetails || 'Please contact us for any clarifications'}
━━━━━━━━━━━━━━━━━━━

If you would like to proceed or discuss the offer further, please feel free to reply to this message. We are happy to assist you.

Thank you once again for trusting ASR Infra. We look forward to working with you. 🙏`;
    
    // Open WhatsApp
    const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast.success("Opening WhatsApp to send offer!");
  };

  const deleteQuote = (id: number) => {
    const updated = quoteRequests.filter(r => r.id !== id);
    setQuoteRequests(updated);
    localStorage.setItem("quoteRequests", JSON.stringify(updated));
    toast.success("Deleted!");
  };

  const deleteContact = (id: number) => {
    const updated = contactRequests.filter(r => r.id !== id);
    setContactRequests(updated);
    localStorage.setItem("contactRequests", JSON.stringify(updated));
    toast.success("Deleted!");
  };

  const statusColor = (status: string) => {
    if (status === "new") return "bg-blue-500";
    if (status === "contacted") return "bg-yellow-500";
    return "bg-green-500";
  };

  const formatDate = (d: string) => new Date(d).toLocaleString();

  const allRequests = [...quoteRequests, ...contactRequests];

  return (
    <div className="min-h-screen bg-[#e8f0f7]">
      {/* Header */}
      <header className="bg-primary text-white py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">ASR INFRA — Admin Dashboard</h1>
            <p className="text-sm text-[#a8c0d6]">Manage quote & contact requests</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="bg-white text-primary hover:bg-[#dce8f2]">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card><CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-blue-500">{allRequests.filter(r => r.status === "new").length}</p>
            <p className="text-sm text-muted-foreground mt-1">New</p>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-yellow-500">{allRequests.filter(r => r.status === "contacted").length}</p>
            <p className="text-sm text-muted-foreground mt-1">Contacted</p>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-green-500">{allRequests.filter(r => r.status === "completed").length}</p>
            <p className="text-sm text-muted-foreground mt-1">Completed</p>
          </CardContent></Card>
          <Card><CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">{allRequests.length}</p>
            <p className="text-sm text-muted-foreground mt-1">Total</p>
          </CardContent></Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("quotes")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${activeTab === "quotes" ? "bg-primary text-white" : "bg-white text-primary border border-primary"}`}
          >
            Quote Requests ({quoteRequests.length})
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${activeTab === "contacts" ? "bg-primary text-white" : "bg-white text-primary border border-primary"}`}
          >
            Contact Requests ({contactRequests.length})
          </button>
          <button
            onClick={() => setActiveTab("offers")}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${activeTab === "offers" ? "bg-accent text-white" : "bg-white text-accent border border-accent"}`}
          >
            Offers ({offers.length})
          </button>
        </div>

        {/* Quote Requests */}
        {activeTab === "quotes" && (
          <div className="space-y-4">
            {quoteRequests.length === 0 && (
              <Card><CardContent className="p-8 text-center text-muted-foreground">No quote requests yet.</CardContent></Card>
            )}
            {quoteRequests.map((r) => (
              <Card key={r.id} className="border-l-4 border-l-accent">
                <CardHeader>
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-accent" />
                      <div>
                        <p className="font-bold text-lg">{r.name}</p>
                        <Badge className={`${statusColor(r.status)} text-white text-xs`}>{r.status.toUpperCase()}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <select
                        value={r.status}
                        onChange={(e) => updateQuoteStatus(r.id, e.target.value as any)}
                        className="px-3 py-1 border rounded text-sm"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="completed">Completed</option>
                      </select>
                      <Button onClick={() => deleteQuote(r.id)} variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Info */}
                    <div className="space-y-2">
                      <p className="font-semibold text-primary mb-2">Contact Info</p>
                      <div className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4 text-accent" />{r.phone}</div>
                      <div className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4 text-accent" />{r.email}</div>
                      <div className="flex items-center gap-2 text-sm"><Calendar className="w-4 h-4 text-accent" />{formatDate(r.createdAt)}</div>
                      {r.preferredDate && <div className="flex items-center gap-2 text-sm"><Calendar className="w-4 h-4 text-accent" />Preferred: {r.preferredDate}</div>}
                    </div>

                    {/* Service Info */}
                    <div className="space-y-2">
                      <p className="font-semibold text-primary mb-2">Service Info</p>
                      <div className="flex items-center gap-2 text-sm"><Package className="w-4 h-4 text-accent" /><span className="capitalize">{r.serviceType?.replace(/-/g, " ")}</span></div>
                      {r.pickupLocation && <div className="flex items-center gap-2 text-sm"><MapPin className="w-4 h-4 text-accent" />From: {r.pickupLocation}</div>}
                      {r.deliveryLocation && <div className="flex items-center gap-2 text-sm"><MapPin className="w-4 h-4 text-accent" />To: {r.deliveryLocation}</div>}
                      {r.quantity && <div className="text-sm">Quantity: <strong>{r.quantity} {r.unit}</strong></div>}
                      {r.steelType && <div className="text-sm">Steel Type: <strong>{r.steelType}</strong> | Grade: <strong>{r.steelGrade}</strong></div>}
                      {r.sandType && <div className="text-sm">Sand Type: <strong>{r.sandType}</strong> | Grade: <strong>{r.sandGrade}</strong></div>}
                      {r.materialType && <div className="text-sm">Material: <strong>{r.materialType}</strong></div>}
                      {r.vehicleType && <div className="text-sm">Vehicle: <strong>{r.vehicleType}</strong></div>}
                      {r.loadDetails && <div className="flex items-start gap-2 text-sm"><MessageSquare className="w-4 h-4 text-accent mt-0.5" />{r.loadDetails}</div>}
                    </div>
                  </div>

                  {/* Offer Section */}
                  <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-accent flex items-center gap-2"><Tag className="w-4 h-4" />Offer / Quote Price</p>
                      <Button size="sm" variant="outline" onClick={() => { setEditingOffer(r.id); setOfferText(r.offer || ""); }}>
                        {r.offer ? "Edit Offer" : "Add Offer"}
                      </Button>
                    </div>
                    {editingOffer === r.id ? (
                      <div className="flex gap-2">
                        <Input value={offerText} onChange={(e) => setOfferText(e.target.value)} placeholder="e.g. ₹15,000 for 10 tons delivered in 3 days" className="flex-1" />
                        <Button size="sm" className="bg-accent text-white" onClick={() => saveOffer(r.id)}>Send Offer</Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingOffer(null)}>Cancel</Button>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">{r.offer || "No offer added yet."}</p>
                    )}
                  </div>

                  {/* Admin Note */}
                  <div className="mt-3 p-3 bg-[#e8f0f7] rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-sm">Admin Note</p>
                      <Button size="sm" variant="outline" onClick={() => { setEditingNote(r.id); setNoteText(r.adminNote || ""); }}>
                        {r.adminNote ? "Edit" : "Add Note"}
                      </Button>
                    </div>
                    {editingNote === r.id ? (
                      <div className="flex gap-2">
                        <Textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="Add internal note..." rows={2} className="flex-1" />
                        <div className="flex flex-col gap-1">
                          <Button size="sm" className="bg-primary text-white" onClick={() => saveNote(r.id, "quote")}>Save</Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingNote(null)}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">{r.adminNote || "No notes yet."}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Contact Requests */}
        {activeTab === "contacts" && (
          <div className="space-y-4">
            {contactRequests.length === 0 && (
              <Card><CardContent className="p-8 text-center text-muted-foreground">No contact requests yet.</CardContent></Card>
            )}
            {contactRequests.map((r) => (
              <Card key={r.id} className="border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-accent" />
                      <div>
                        <p className="font-bold text-lg">{r.name}</p>
                        <Badge className={`${statusColor(r.status)} text-white text-xs`}>{r.status.toUpperCase()}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <select
                        value={r.status}
                        onChange={(e) => updateContactStatus(r.id, e.target.value as any)}
                        className="px-3 py-1 border rounded text-sm"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="completed">Completed</option>
                      </select>
                      <Button onClick={() => deleteContact(r.id)} variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm"><Phone className="w-4 h-4 text-accent" />{r.phone}</div>
                      <div className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4 text-accent" />{r.email}</div>
                      <div className="flex items-center gap-2 text-sm"><Calendar className="w-4 h-4 text-accent" />{formatDate(r.createdAt)}</div>
                      <div className="flex items-center gap-2 text-sm"><Package className="w-4 h-4 text-accent" /><span className="capitalize">{r.serviceType}</span></div>
                    </div>
                    <div>
                      <div className="flex items-start gap-2 text-sm"><MessageSquare className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />{r.message}</div>
                    </div>
                  </div>

                  {/* Admin Note */}
                  <div className="mt-3 p-3 bg-[#e8f0f7] rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-sm">Admin Note</p>
                      <Button size="sm" variant="outline" onClick={() => { setEditingNote(r.id); setNoteText(r.adminNote || ""); }}>
                        {r.adminNote ? "Edit" : "Add Note"}
                      </Button>
                    </div>
                    {editingNote === r.id ? (
                      <div className="flex gap-2">
                        <Textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="Add internal note..." rows={2} className="flex-1" />
                        <div className="flex flex-col gap-1">
                          <Button size="sm" className="bg-primary text-white" onClick={() => saveNote(r.id, "contact")}>Save</Button>
                          <Button size="sm" variant="outline" onClick={() => setEditingNote(null)}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">{r.adminNote || "No notes yet."}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {/* Offers Tab */}
        {activeTab === "offers" && (
          <div className="space-y-6">
            {/* Create New Offer */}
            <Card className="border-l-4 border-l-accent">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-primary flex items-center gap-2">
                    <Tag className="w-5 h-5 text-accent" /> Offer Management
                  </p>
                  <Button
                    onClick={() => { setShowNewOffer(!showNewOffer); setSelectedOffer(null); }}
                    className="bg-accent text-white hover:bg-accent/90 gap-2"
                    size="sm"
                  >
                    <Plus className="w-4 h-4" /> {showNewOffer ? "Cancel" : "Create New Offer"}
                  </Button>
                </div>
              </CardHeader>
              {showNewOffer && (
                <CardContent>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newOffer.userId || !newOffer.title || !newOffer.originalAmount) {
                        toast.error("Fill in all required fields");
                        return;
                      }
                      createOffer({
                        userId: newOffer.userId,
                        userName: newOffer.userName,
                        title: newOffer.title,
                        description: newOffer.description,
                        originalAmount: Number(newOffer.originalAmount),
                        adminNotes: newOffer.adminNotes,
                        expiryDate: newOffer.expiryDate || undefined,
                      });
                      toast.success("Offer created and sent to user!");
                      setNewOffer({ userId: "", userName: "", title: "", description: "", originalAmount: "", adminNotes: "", expiryDate: "" });
                      setShowNewOffer(false);
                      loadData();
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div>
                      <Label>User Contact (phone/email) *</Label>
                      <Input className="mt-1" value={newOffer.userId} onChange={e => setNewOffer(p => ({ ...p, userId: e.target.value }))} placeholder="e.g. 9876543210 or user@email.com" required />
                    </div>
                    <div>
                      <Label>User Name</Label>
                      <Input className="mt-1" value={newOffer.userName} onChange={e => setNewOffer(p => ({ ...p, userName: e.target.value }))} placeholder="Customer name" />
                    </div>
                    <div>
                      <Label>Offer Title *</Label>
                      <Input className="mt-1" value={newOffer.title} onChange={e => setNewOffer(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Steel Supply — 10 Tons" required />
                    </div>
                    <div>
                      <Label>Offer Amount (₹) *</Label>
                      <div className="relative mt-1">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input className="pl-9" type="number" min={1} value={newOffer.originalAmount} onChange={e => setNewOffer(p => ({ ...p, originalAmount: e.target.value }))} placeholder="150000" required />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <Label>Description</Label>
                      <Textarea className="mt-1" rows={2} value={newOffer.description} onChange={e => setNewOffer(p => ({ ...p, description: e.target.value }))} placeholder="Describe the offer details..." />
                    </div>
                    <div>
                      <Label>Admin Notes (internal)</Label>
                      <Input className="mt-1" value={newOffer.adminNotes} onChange={e => setNewOffer(p => ({ ...p, adminNotes: e.target.value }))} placeholder="Internal notes..." />
                    </div>
                    <div>
                      <Label>Expiry Date (optional)</Label>
                      <Input className="mt-1" type="date" value={newOffer.expiryDate} onChange={e => setNewOffer(p => ({ ...p, expiryDate: e.target.value }))} />
                    </div>
                    <div className="md:col-span-2">
                      <Button type="submit" className="bg-accent text-white hover:bg-accent/90 gap-2">
                        <Send className="w-4 h-4" /> Send Offer to User
                      </Button>
                    </div>
                  </form>
                </CardContent>
              )}
            </Card>

            {/* Offer Detail / Negotiation View */}
            {selectedOffer && (
              <Card className="border-2 border-accent">
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <p className="font-bold text-primary text-lg">{selectedOffer.title}</p>
                      <p className="text-sm text-muted-foreground">{selectedOffer.userName || selectedOffer.userId}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                        selectedOffer.status === "pending" ? "bg-yellow-100 text-yellow-700 border-yellow-200" :
                        selectedOffer.status === "counter_sent" ? "bg-blue-100 text-blue-700 border-blue-200" :
                        selectedOffer.status === "accepted" ? "bg-green-100 text-green-700 border-green-200" :
                        "bg-red-100 text-red-700 border-red-200"
                      }`}>{selectedOffer.status.replace("_", " ").toUpperCase()}</span>
                      <Button size="sm" variant="outline" onClick={() => setSelectedOffer(null)}>Close</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Negotiation History */}
                  <div className="bg-[#e8f0f7] rounded-xl p-4 space-y-3 max-h-72 overflow-y-auto">
                    {selectedOffer.history.map((entry, i) => {
                      const isAdmin = entry.author === "admin";
                      return (
                        <div key={i} className={`flex gap-3 ${isAdmin ? "" : "flex-row-reverse"}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold ${isAdmin ? "bg-primary" : "bg-accent"}`}>
                            {isAdmin ? "A" : "U"}
                          </div>
                          <div className={`max-w-[70%]`}>
                            <div className={`rounded-2xl px-4 py-3 ${isAdmin ? "bg-white rounded-tl-none" : "bg-primary text-white rounded-tr-none"}`}>
                              {entry.amount && (
                                <p className={`font-bold text-base mb-1 ${isAdmin ? "text-primary" : "text-accent"}`}>
                                  ₹{entry.amount.toLocaleString()}
                                </p>
                              )}
                              <p className={`text-sm ${isAdmin ? "text-[#4a6580]" : "text-[#a8c0d6]"}`}>{entry.message}</p>
                            </div>
                            <p className="text-xs text-[#4a6580] mt-1 px-1">
                              {isAdmin ? "Admin" : "User"} · {new Date(entry.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Admin Response Actions */}
                  {(selectedOffer.status === "pending" || selectedOffer.status === "counter_sent") && (
                    <div className="space-y-3">
                      <p className="font-semibold text-primary text-sm">Respond to Offer</p>
                      <div className="flex gap-2 flex-wrap">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white gap-1"
                          onClick={() => {
                            adminRespondToOffer(selectedOffer.id, "accept", undefined, "Offer accepted by admin.");
                            toast.success("Offer accepted!");
                            loadData();
                            setSelectedOffer(null);
                          }}
                        >
                          <CheckCircle className="w-4 h-4" /> Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-50 gap-1"
                          onClick={() => {
                            adminRespondToOffer(selectedOffer.id, "reject", undefined, "Offer rejected by admin.");
                            toast.success("Offer rejected.");
                            loadData();
                            setSelectedOffer(null);
                          }}
                        >
                          <XCircle className="w-4 h-4" /> Reject
                        </Button>
                      </div>
                      <div className="flex gap-2 items-end">
                        <div className="flex-1">
                          <Label className="text-xs">Revised Amount (₹)</Label>
                          <div className="relative mt-1">
                            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input className="pl-9" type="number" min={1} value={reviseAmount} onChange={e => setReviseAmount(e.target.value)} placeholder="New amount" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <Label className="text-xs">Message</Label>
                          <Input className="mt-1" value={reviseMessage} onChange={e => setReviseMessage(e.target.value)} placeholder="Revision note..." />
                        </div>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white gap-1"
                          onClick={() => {
                            if (!reviseAmount) { toast.error("Enter revised amount"); return; }
                            adminRespondToOffer(selectedOffer.id, "revise", Number(reviseAmount), reviseMessage || "Revised offer sent.");
                            toast.success("Revised offer sent!");
                            setReviseAmount("");
                            setReviseMessage("");
                            loadData();
                            setSelectedOffer(null);
                          }}
                        >
                          <ArrowLeftRight className="w-4 h-4" /> Revise
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Offers Table */}
            {offers.length === 0 ? (
              <Card><CardContent className="p-8 text-center text-muted-foreground">No offers created yet. Use the button above to create one.</CardContent></Card>
            ) : (
              <Card>
                <CardContent className="p-0 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#e8f0f7] text-primary">
                      <tr>
                        <th className="text-left px-4 py-3 font-semibold">User</th>
                        <th className="text-left px-4 py-3 font-semibold">Title</th>
                        <th className="text-right px-4 py-3 font-semibold">Original (₹)</th>
                        <th className="text-right px-4 py-3 font-semibold">Counter (₹)</th>
                        <th className="text-center px-4 py-3 font-semibold">Status</th>
                        <th className="text-left px-4 py-3 font-semibold">Date</th>
                        <th className="text-center px-4 py-3 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...offers].reverse().map((offer, i) => (
                        <tr key={offer.id} className={`border-t border-border ${i % 2 === 0 ? "bg-white" : "bg-[#f5f9fc]"}`}>
                          <td className="px-4 py-3">
                            <p className="font-semibold text-primary">{offer.userName || "—"}</p>
                            <p className="text-xs text-muted-foreground">{offer.userId}</p>
                          </td>
                          <td className="px-4 py-3 font-medium">{offer.title}</td>
                          <td className="px-4 py-3 text-right font-semibold">₹{offer.originalAmount.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right text-blue-600 font-semibold">
                            {offer.counterAmount ? `₹${offer.counterAmount.toLocaleString()}` : "—"}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${
                              offer.status === "pending" ? "bg-yellow-100 text-yellow-700 border-yellow-200" :
                              offer.status === "counter_sent" ? "bg-blue-100 text-blue-700 border-blue-200" :
                              offer.status === "accepted" ? "bg-green-100 text-green-700 border-green-200" :
                              "bg-red-100 text-red-700 border-red-200"
                            }`}>{offer.status.replace("_", " ")}</span>
                          </td>
                          <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(offer.createdAt).toLocaleDateString()}</td>
                          <td className="px-4 py-3 text-center">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => { setSelectedOffer(offer); setShowNewOffer(false); }}
                              className="text-xs gap-1"
                            >
                              <ArrowLeftRight className="w-3 h-3" /> View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
