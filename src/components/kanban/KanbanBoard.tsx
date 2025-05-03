
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import KanbanColumn from './KanbanColumn';
import LeadForm from '../leads/LeadForm';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from 'lucide-react';

const KanbanBoard: React.FC = () => {
  const { kanbanColumns, leads } = useAppContext();
  const [open, setOpen] = useState(false);

  const handleDragStart = (e: React.DragEvent, leadId: string, sourceColumn: string) => {
    e.dataTransfer.setData('leadId', leadId);
    e.dataTransfer.setData('sourceColumn', sourceColumn);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lead Board</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Lead
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Lead</DialogTitle>
              <DialogDescription>
                Create a new lead with the form below.
              </DialogDescription>
            </DialogHeader>
            <LeadForm onClose={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex-1 overflow-x-auto">
        <div className="flex h-full gap-4 pb-4">
          {kanbanColumns.map((column) => {
            const columnLeads = leads.filter((lead) => 
              column.leadIds.includes(lead.id)
            );
            
            return (
              <KanbanColumn 
                key={column.id}
                column={column}
                leads={columnLeads}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
