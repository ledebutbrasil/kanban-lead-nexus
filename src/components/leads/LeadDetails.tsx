
import React, { useState } from "react";
import { Lead, User, Task } from "../../types";
import { useAppContext } from "../../context/AppContext";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import LeadTaskForm from "./LeadTaskForm";
import LeadTaskItem from "./LeadTaskItem";
import { Check, Plus } from "lucide-react";

interface LeadDetailsProps {
  lead: Lead;
  users: User[];
  onClose: () => void;
}

const LeadDetails: React.FC<LeadDetailsProps> = ({ lead, users, onClose }) => {
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const { updateLeadColumn } = useAppContext();

  const responsible = users.find(user => user.id === lead.responsibleId);
  const completedTasks = lead.tasks.filter(task => task.done).length;
  const totalTasks = lead.tasks.length;

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{lead.name}</h1>
          <div className="flex items-center gap-2 mt-1">
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
            <span className="text-sm text-muted-foreground">
              Created on {format(new Date(lead.createdAt), "MMM d, yyyy")}
            </span>
          </div>
        </div>
        <Button variant="outline" onClick={onClose}>
          Back to board
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{lead.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p>{lead.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Source</p>
              <p>{lead.source}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Current Status</p>
              <p>{lead.column}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tags</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {lead.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Responsible</p>
              {responsible && (
                <div className="flex items-center gap-2 mt-1">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>
                      {responsible.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{responsible.name}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="col-span-1 lg:col-span-2">
          <Tabs defaultValue="tasks">
            <TabsList className="mb-4">
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tasks" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Tasks</h3>
                  <p className="text-sm text-muted-foreground">
                    {completedTasks}/{totalTasks} completed
                  </p>
                </div>
                <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" /> Add Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Task</DialogTitle>
                    </DialogHeader>
                    <LeadTaskForm 
                      leadId={lead.id} 
                      onClose={() => setTaskDialogOpen(false)} 
                    />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-2">
                {lead.tasks.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    No tasks added yet
                  </p>
                ) : (
                  lead.tasks.map(task => (
                    <LeadTaskItem
                      key={task.id}
                      task={task}
                      leadId={lead.id}
                      users={users}
                    />
                  ))
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Activity History</h3>
              </div>
              <div className="space-y-4">
                {lead.history.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    No history available
                  </p>
                ) : (
                  lead.history.map((item, index) => (
                    <div key={item.id} className="relative pl-8 pb-4">
                      {index < lead.history.length - 1 && (
                        <div className="absolute left-3 top-3 h-full w-px bg-border" />
                      )}
                      <div className="absolute left-0 top-0 h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                        <Check className="h-3 w-3" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {item.userName}{" "}
                          <span className="font-normal text-muted-foreground">
                            {item.action}
                          </span>
                        </p>
                        {item.details && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.details}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(item.timestamp), "MMM d, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
