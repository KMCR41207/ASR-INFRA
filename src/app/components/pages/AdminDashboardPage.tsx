import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { LogOut, Mail, Phone, User, Calendar, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface ContactRequest {
  id: number;
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  message: string;
  createdAt: string;
  status: "new" | "contacted" | "completed";
}

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<ContactRequest[]>([
    {
      id: 1,
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      email: "rajesh@example.com",
      serviceType: "Goods Transportation",
      message: "Need to transport construction materials from Mumbai to Pune",
      createdAt: "2026-03-19T10:30:00",
      status: "new"
    },
    {
      id: 2,
      name: "Priya Sharma",
      phone: "+91 98765 43211",
      email: "priya@example.com",
      serviceType: "Sand Supply",
      message: "Require 50 tons of sand for construction project",
      createdAt: "2026-03-18T14:20:00",
      status: "new"
    },
    {
      id: 3,
      name: "Amit Patel",
      phone: "+91 98765 43212",
      email: "amit@example.com",
      serviceType: "Steel Supply",
      message: "Need steel rods and beams for building construction",
      createdAt: "2026-03-17T09:15:00",
      status: "contacted"
    }
  ]);

  useEffect(() => {
    // Check if admin is logged in
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const updateStatus = (id: number, newStatus: "new" | "contacted" | "completed") => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
    toast.success("Status updated!");
  };

  const deleteRequest = (id: number) => {
    setRequests(requests.filter(req => req.id !== id));
    toast.success("Request deleted!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-500";
      case "contacted": return "bg-yellow-500";
      case "completed": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white py-4 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-gray-300">Manage service requests</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="bg-white text-primary hover:bg-gray-100"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-500">{requests.filter(r => r.status === "new").length}</p>
                <p className="text-muted-foreground mt-2">New Requests</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500">{requests.filter(r => r.status === "contacted").length}</p>
                <p className="text-muted-foreground mt-2">Contacted</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">{requests.filter(r => r.status === "completed").length}</p>
                <p className="text-muted-foreground mt-2">Completed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Requests List */}
        <h2 className="text-2xl font-bold mb-4">Service Requests</h2>
        <div className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <User className="w-5 h-5 text-accent" />
                      {request.name}
                    </h3>
                    <Badge className={`${getStatusColor(request.status)} text-white mt-2`}>
                      {request.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={request.status}
                      onChange={(e) => updateStatus(request.id, e.target.value as any)}
                      className="px-3 py-1 border rounded-md text-sm"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="completed">Completed</option>
                    </select>
                    <Button
                      onClick={() => deleteRequest(request.id)}
                      variant="destructive"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-accent" />
                      <span>{request.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-accent" />
                      <span>{request.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span>{formatDate(request.createdAt)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">Service Type:</p>
                    <p className="text-sm text-muted-foreground mb-3">{request.serviceType}</p>
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold">Message:</p>
                        <p className="text-sm text-muted-foreground">{request.message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
