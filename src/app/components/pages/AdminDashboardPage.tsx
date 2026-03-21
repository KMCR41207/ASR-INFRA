import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { LogOut, Mail, Phone, User, Calendar, MessageSquare, MapPin, Package, Trash2, Tag } from "lucide-react";
import { toast } from "sonner";

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
  const [activeTab, setActiveTab] = useState<"quotes" | "contacts">("quotes");
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
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
    const updated = quoteRequests.map(r => r.id === id ? { ...r, offer: offerText } : r);
    setQuoteRequests(updated);
    localStorage.setItem("quoteRequests", JSON.stringify(updated));
    setEditingOffer(null);
    setOfferText("");
    toast.success("Offer saved!");
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
                        <Button size="sm" className="bg-accent text-white" onClick={() => saveOffer(r.id)}>Save</Button>
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
      </div>
    </div>
  );
}
