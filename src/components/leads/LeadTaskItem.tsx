
import React from 'react';
import { Task, User } from '../../types';
import { useAppContext } from '../../context/AppContext';
import { format } from 'date-fns';
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';

interface LeadTaskItemProps {
  task: Task;
  leadId: string;
  users: User[];
}

const LeadTaskItem: React.FC<LeadTaskItemProps> = ({ task, leadId, users }) => {
  const { updateTask, deleteTask } = useAppContext();
  
  const responsible = users.find(user => user.id === task.responsibleId);
  const isDueSoon = new Date(task.dueDate) <= new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const isOverdue = new Date(task.dueDate) < new Date() && !task.done;
  
  const handleCheckboxChange = (checked: boolean) => {
    updateTask(leadId, task.id, { done: checked });
  };
  
  const handleDelete = () => {
    deleteTask(leadId, task.id);
  };

  return (
    <div className={`p-3 border rounded-md flex items-center justify-between ${
      task.done 
        ? "bg-muted/20" 
        : isOverdue 
          ? "bg-red-50 border-red-200" 
          : isDueSoon 
            ? "bg-amber-50 border-amber-200" 
            : "bg-white"
    }`}>
      <div className="flex items-center gap-3 flex-1">
        <Checkbox 
          checked={task.done} 
          onCheckedChange={handleCheckboxChange}
        />
        
        <div className="flex flex-col">
          <span className={`text-sm ${task.done ? "line-through text-muted-foreground" : ""}`}>
            {task.description}
          </span>
          <span className="text-xs text-muted-foreground">
            Due: {format(new Date(task.dueDate), "MMM d")}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {responsible && (
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs">
              {responsible.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8" 
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default LeadTaskItem;
