
export interface User {
  id: string;
  email: string;
  name: string;
  companies: string[];
  role?: "admin" | "collaborator";
}

export interface Company {
  id: string;
  name: string;
  defaultColumns: string[];
  creatorId: string;
}

export interface Task {
  id: string;
  leadId: string;
  description: string;
  done: boolean;
  dueDate: string;
  responsibleId: string;
}

export interface HistoryItem {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  details?: string;
}

export interface Lead {
  id: string;
  companyId: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  column: string;
  responsibleId: string;
  createdAt: string;
  priority: "high" | "medium" | "low";
  tags: string[];
  history: HistoryItem[];
  tasks: Task[];
}

export interface KanbanColumn {
  id: string;
  title: string;
  colorClass: string;
  leadIds: string[];
}
