import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { LogOut, Users, Mail, Phone, Calendar, FileText, DollarSign } from "lucide-react";
import { useLocation } from "wouter";

interface ContactSubmission {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  projectDetails: string;
  budgetRange: string | null;
  createdAt: string;
}

interface AuthStatus {
  isAuthenticated: boolean;
}

export default function Admin() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Check authentication status
  const { data: authStatus, isLoading: authLoading } = useQuery<AuthStatus>({
    queryKey: ['/api/admin/status'],
    retry: false,
  });

  // Fetch contact submissions
  const { data: submissions, isLoading: submissionsLoading, refetch } = useQuery<ContactSubmission[]>({
    queryKey: ['/api/contact-submissions'],
    enabled: authStatus?.isAuthenticated,
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/admin/logout", {});
    },
    onSuccess: () => {
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully.",
      });
      setLocation("/admin-login");
    },
    onError: () => {
      toast({
        title: "Logout Failed",
        description: "There was an error logging out.",
        variant: "destructive",
      });
    },
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !authStatus?.isAuthenticated) {
      setLocation("/admin-login");
    }
  }, [authStatus, authLoading, setLocation]);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getServiceBadgeVariant = (service: string) => {
    const serviceMap: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      "Website Development": "default",
      "Mobile App Development": "secondary",
      "Complex Web Applications": "destructive",
      "CRM / HRMS / Sales Management": "outline",
      "High-Converting Landing Pages": "default",
    };
    return serviceMap[service] || "default";
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!authStatus?.isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <img 
                src="https://imagizer.imageshack.com/img924/5789/CC6b4R.png" 
                alt="Synergy Brand Architect Logo" 
                className="h-8 w-auto" 
              />
              <div>
                <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Synergy Brand Architect</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => setLocation("/")}>
                View Site
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                <LogOut className="mr-2 h-4 w-4" />
                {logoutMutation.isPending ? "Logging out..." : "Logout"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
                  <p className="text-2xl font-bold">{Array.isArray(submissions) ? submissions.length : 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Today's Leads</p>
                  <p className="text-2xl font-bold">
                    {Array.isArray(submissions) ? submissions.filter((s: ContactSubmission) => 
                      new Date(s.createdAt).toDateString() === new Date().toDateString()
                    ).length : 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Week</p>
                  <p className="text-2xl font-bold">
                    {Array.isArray(submissions) ? submissions.filter((s: ContactSubmission) => {
                      const submissionDate = new Date(s.createdAt);
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return submissionDate >= weekAgo;
                    }).length : 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">High Budget</p>
                  <p className="text-2xl font-bold">
                    {Array.isArray(submissions) ? submissions.filter((s: ContactSubmission) => 
                      s.budgetRange && !s.budgetRange.includes("1000") && !s.budgetRange.includes("5000")
                    ).length : 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Submissions Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">Contact Submissions</CardTitle>
              <Button onClick={() => refetch()} variant="outline" size="sm">
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {submissionsLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p>Loading submissions...</p>
              </div>
            ) : submissions && Array.isArray(submissions) && submissions.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Project Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission: ContactSubmission) => (
                      <TableRow key={submission.id}>
                        <TableCell className="whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{formatDate(submission.createdAt)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {submission.fullName}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              <a 
                                href={`mailto:${submission.email}`}
                                className="text-sm text-primary hover:underline"
                              >
                                {submission.email}
                              </a>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              <a 
                                href={`tel:${submission.phone}`}
                                className="text-sm text-primary hover:underline"
                              >
                                {submission.phone}
                              </a>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getServiceBadgeVariant(submission.service)}>
                            {submission.service}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {submission.budgetRange ? (
                            <Badge variant="outline">{submission.budgetRange}</Badge>
                          ) : (
                            <span className="text-muted-foreground text-sm">Not specified</span>
                          )}
                        </TableCell>
                        <TableCell className="max-w-md">
                          <div className="flex items-start space-x-2">
                            <FileText className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <p className="text-sm line-clamp-3">{submission.projectDetails}</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No submissions yet</h3>
                <p className="text-muted-foreground">Contact form submissions will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}