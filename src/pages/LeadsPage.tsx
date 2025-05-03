
import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import LeadForm from "../components/leads/LeadForm";
import { format } from "date-fns";
import { Plus, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LeadsPage = () => {
  const { leads, users, currentCompany } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [open, setOpen] = useState(false);

  // Filter leads based on search term and status
  const filteredLeads = leads.filter(
    (lead) => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm);
      
      const matchesStatus = statusFilter ? lead.column === statusFilter : true;
      
      return matchesSearch && matchesStatus;
    }
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">
            View and manage all your leads
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Lead
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
            </DialogHeader>
            <LeadForm onClose={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search leads by name, email, or phone..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-[200px]">
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All statuses</SelectItem>
              {currentCompany?.defaultColumns.map(column => (
                <SelectItem key={column} value={column}>
                  {column}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Responsible</TableHead>
              <TableHead className="text-right">Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24">
                  No leads found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead) => {
                const responsible = users.find(
                  (user) => user.id === lead.responsibleId
                );
                
                return (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <Link to={`/lead/${lead.id}`} className="hover:underline">
                        {lead.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{lead.email}</div>
                      <div className="text-sm text-muted-foreground">
                        {lead.phone}
                      </div>
                    </TableCell>
                    <TableCell>{lead.source}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          lead.column === "AI em atendimento"
                            ? "bg-status-ai/10 text-status-ai border-status-ai/20"
                            : lead.column === "Lead qualificado"
                            ? "bg-status-qualified/10 text-status-qualified border-status-qualified/20"
                            : lead.column === "Contato iniciado"
                            ? "bg-status-contacted/10 text-status-contacted border-status-contacted/20"
                            : lead.column === "Follow up"
                            ? "bg-status-followup/10 text-status-followup border-status-followup/20"
                            : lead.column === "Venda realizada"
                            ? "bg-status-closed/10 text-status-closed border-status-closed/20"
                            : "bg-status-discard/10 text-status-discard border-status-discard/20"
                        }
                      >
                        {lead.column}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(new Date(lead.createdAt), "MMM d, yyyy")}</TableCell>
                    <TableCell>{responsible?.name || "Unassigned"}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="outline"
                        className={
                          lead.priority === "high"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : lead.priority === "medium"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-green-50 text-green-700 border-green-200"
                        }
                      >
                        {lead.priority}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeadsPage;
