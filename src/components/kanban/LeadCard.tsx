
import React from 'react';
import { Lead } from '../../types';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAppContext } from '../../context/AppContext';
import { format } from 'date-fns';

interface LeadCardProps {
  lead: Lead;
  onDragStart: (e: React.DragEvent) => void;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, onDragStart }) => {
  const { users } = useAppContext();
  
  // Find the responsible user
  const responsible = users.find(user => user.id === lead.responsibleId);
  
  // Count incomplete tasks
  const incompleteTasks = lead.tasks.filter(task => !task.done).length;
  
  // Format date
  const formattedDate = format(new Date(lead.createdAt), 'MMM d');

  return (
    <Link to={`/lead/${lead.id}`}>
      <div
        className="kanban-lead-card"
        draggable
        onDragStart={onDragStart}
      >
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium text-sm">{lead.name}</h4>
          <Badge
            variant="outline"
            className={cn({
              "bg-red-50 text-red-700 border-red-200": lead.priority === "high",
              "bg-amber-50 text-amber-700 border-amber-200": lead.priority === "medium",
              "bg-green-50 text-green-700 border-green-200": lead.priority === "low",
            })}
          >
            {lead.priority}
          </Badge>
        </div>
        
        <div className="text-xs text-muted-foreground mb-3">
          {lead.phone} • {lead.email}
        </div>
        
        <div className="flex gap-1 mb-3 flex-wrap">
          {lead.tags.map((tag, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          <Badge variant="outline" className="text-xs">
            {lead.source}
          </Badge>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <div className="text-xs text-muted-foreground">
            {formattedDate}
          </div>
          
          <div className="flex items-center space-x-2">
            {incompleteTasks > 0 && (
              <Badge variant="outline" className="text-xs">
                {incompleteTasks} task{incompleteTasks !== 1 ? 's' : ''}
              </Badge>
            )}
            
            {responsible && (
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">
                  {responsible.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LeadCard;
