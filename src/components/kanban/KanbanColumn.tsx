
import React from 'react';
import { KanbanColumn as KanbanColumnType, Lead } from '../../types';
import { useAppContext } from '../../context/AppContext';
import LeadCard from './LeadCard';
import { cn } from '@/lib/utils';
import { Badge } from "@/components/ui/badge";

interface KanbanColumnProps {
  column: KanbanColumnType;
  leads: Lead[];
  onDragStart: (e: React.DragEvent, leadId: string, sourceColumn: string) => void;
  onDragOver: (e: React.DragEvent) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, leads, onDragStart, onDragOver }) => {
  const { updateLeadColumn } = useAppContext();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('leadId');
    const sourceColumn = e.dataTransfer.getData('sourceColumn');
    
    if (sourceColumn !== column.title) {
      updateLeadColumn(leadId, column.title);
    }
  };

  return (
    <div
      className="kanban-column"
      onDragOver={onDragOver}
      onDrop={handleDrop}
    >
      <div className="kanban-column-header">
        <div className="flex items-center">
          <h3 className="text-sm font-semibold">{column.title}</h3>
          <Badge variant="outline" className="ml-2">
            {leads.length}
          </Badge>
        </div>
        <div className={cn("w-2 h-2 rounded-full", {
          "bg-status-ai": column.colorClass === "tag-status-ai",
          "bg-status-qualified": column.colorClass === "tag-status-qualified",
          "bg-status-contacted": column.colorClass === "tag-status-contacted",
          "bg-status-followup": column.colorClass === "tag-status-followup",
          "bg-status-closed": column.colorClass === "tag-status-closed",
          "bg-status-discard": column.colorClass === "tag-status-discard",
        })} />
      </div>
      <div className="flex-1 overflow-y-auto">
        {leads.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            onDragStart={(e) => onDragStart(e, lead.id, column.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
