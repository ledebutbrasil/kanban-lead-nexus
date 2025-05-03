
import React from "react";
import { useAppContext } from "../context/AppContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, Users, Folder } from "lucide-react";

const DashboardPage = () => {
  const { leads, users, currentUser, currentCompany } = useAppContext();

  // Calculate dashboard stats
  const totalLeads = leads.length;
  const activeLeads = leads.filter(lead => lead.column !== "Venda realizada" && lead.column !== "Descarte").length;
  const closedLeads = leads.filter(lead => lead.column === "Venda realizada").length;
  const discardedLeads = leads.filter(lead => lead.column === "Descarte").length;
  
  // Sort leads by creation date (newest first)
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
    
  const metrics = [
    { title: "Total Leads", value: totalLeads, icon: Folder, color: "text-primary bg-primary/10" },
    { title: "Active Leads", value: activeLeads, icon: Users, color: "text-blue-600 bg-blue-50" },
    { title: "Closed Sales", value: closedLeads, icon: User, color: "text-green-600 bg-green-50" },
    { title: "Discarded Leads", value: discardedLeads, icon: Calendar, color: "text-gray-600 bg-gray-50" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        {currentUser && (
          <p className="text-muted-foreground">
            Welcome back, {currentUser.name}
          </p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`rounded-full p-2 ${metric.color}`}>
                  <metric.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Latest Leads</CardTitle>
            <CardDescription>
              Your most recently added leads
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  No leads available
                </p>
              ) : (
                recentLeads.map((lead) => (
                  <div key={lead.id} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-sm text-muted-foreground">{lead.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{lead.column}</p>
                      <p className="text-xs text-muted-foreground">{lead.source}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Stats</CardTitle>
            <CardDescription>
              Lead conversion statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Qualification Rate</p>
                  <p className="text-sm font-medium">
                    {Math.round((leads.filter(l => l.column !== "AI em atendimento").length / totalLeads) * 100)}%
                  </p>
                </div>
                <div className="rounded-full h-2 bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${Math.round((leads.filter(l => l.column !== "AI em atendimento").length / totalLeads) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Contact Rate</p>
                  <p className="text-sm font-medium">
                    {Math.round((leads.filter(l => l.column === "Contato iniciado" || l.column === "Follow up" || l.column === "Venda realizada").length / totalLeads) * 100)}%
                  </p>
                </div>
                <div className="rounded-full h-2 bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{
                      width: `${Math.round((leads.filter(l => l.column === "Contato iniciado" || l.column === "Follow up" || l.column === "Venda realizada").length / totalLeads) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Sales Rate</p>
                  <p className="text-sm font-medium">
                    {Math.round((closedLeads / totalLeads) * 100)}%
                  </p>
                </div>
                <div className="rounded-full h-2 bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{
                      width: `${Math.round((closedLeads / totalLeads) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
