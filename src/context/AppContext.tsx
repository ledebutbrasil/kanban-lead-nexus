
import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { User, Company, Lead, KanbanColumn, Task } from '../types';
import { mockUsers, mockLeads, mockCompanies, generateKanbanColumns } from '../services/mockData';
import { toast } from "sonner";

interface AppContextType {
  currentUser: User | null;
  users: User[];
  companies: Company[];
  currentCompany: Company | null;
  leads: Lead[];
  kanbanColumns: KanbanColumn[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setCurrentCompany: (companyId: string) => void;
  updateLeadColumn: (leadId: string, columnId: string) => void;
  updateLead: (lead: Lead) => void;
  addLead: (lead: Partial<Lead>) => void;
  addTask: (leadId: string, task: Partial<Task>) => void;
  updateTask: (leadId: string, taskId: string, updates: Partial<Task>) => void;
  deleteTask: (leadId: string, taskId: string) => void;
  addHistoryItem: (leadId: string, action: string, details?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users] = useState<User[]>(mockUsers);
  const [companies] = useState<Company[]>(mockCompanies);
  const [currentCompany, setCurrentCompany] = useState<Company | null>(null);
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [kanbanColumns, setKanbanColumns] = useState<KanbanColumn[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Initialize kanban columns
    if (currentCompany) {
      setKanbanColumns(generateKanbanColumns());
    }
  }, [currentCompany]);

  const login = async (email: string, password: string): Promise<void> => {
    // In a real app, this would make an API call
    const user = users.find(u => u.email === email);
    
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      // Set default company
      if (user.companies.length > 0) {
        const defaultCompany = companies.find(c => c.id === user.companies[0]);
        if (defaultCompany) setCurrentCompany(defaultCompany);
      }
      
      toast.success("Login successful!");
    } else {
      toast.error("Invalid email or password");
      throw new Error("Invalid email or password");
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setCurrentCompany(null);
    toast.info("Logged out successfully");
  };

  const setCompany = (companyId: string) => {
    const company = companies.find(c => c.id === companyId);
    if (company) {
      setCurrentCompany(company);
      setKanbanColumns(generateKanbanColumns());
    }
  };

  const updateLeadColumn = (leadId: string, columnTitle: string) => {
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId 
          ? { ...lead, column: columnTitle } 
          : lead
      )
    );

    // Update kanban columns
    setKanbanColumns(prevColumns => {
      const updatedColumns = [...prevColumns];
      
      // Remove lead from all columns
      updatedColumns.forEach(col => {
        col.leadIds = col.leadIds.filter(id => id !== leadId);
      });
      
      // Add lead to new column
      const targetColumn = updatedColumns.find(col => col.title === columnTitle);
      if (targetColumn) {
        targetColumn.leadIds.push(leadId);
      }
      
      return updatedColumns;
    });
    
    // Add history item
    addHistoryItem(leadId, "moved", `Moved to ${columnTitle}`);
    toast.success("Lead updated successfully");
  };

  const updateLead = (updatedLead: Lead) => {
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === updatedLead.id 
          ? updatedLead 
          : lead
      )
    );
    toast.success("Lead updated successfully");
  };

  const addLead = (lead: Partial<Lead>) => {
    const newLead: Lead = {
      id: `lead${leads.length + 1}`,
      companyId: currentCompany?.id || "",
      name: lead.name || "",
      phone: lead.phone || "",
      email: lead.email || "",
      source: lead.source || "",
      column: lead.column || currentCompany?.defaultColumns[0] || "",
      responsibleId: lead.responsibleId || currentUser?.id || "",
      createdAt: new Date().toISOString(),
      priority: lead.priority || "medium",
      tags: lead.tags || [],
      history: [
        {
          id: `hist-new-${Date.now()}`,
          timestamp: new Date().toISOString(),
          userId: currentUser?.id || "",
          userName: currentUser?.name || "",
          action: "created",
          details: "Lead created manually"
        }
      ],
      tasks: []
    };

    setLeads(prevLeads => [...prevLeads, newLead]);
    
    // Update kanban columns
    setKanbanColumns(prevColumns => {
      return prevColumns.map(col => {
        if (col.title === newLead.column) {
          return {
            ...col,
            leadIds: [...col.leadIds, newLead.id]
          };
        }
        return col;
      });
    });

    toast.success("New lead added successfully");
  };

  const addTask = (leadId: string, task: Partial<Task>) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      leadId,
      description: task.description || "",
      done: task.done || false,
      dueDate: task.dueDate || new Date().toISOString(),
      responsibleId: task.responsibleId || currentUser?.id || ""
    };

    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId 
          ? { ...lead, tasks: [...lead.tasks, newTask] } 
          : lead
      )
    );

    // Add history item
    addHistoryItem(leadId, "task-added", `New task: ${newTask.description}`);
    toast.success("Task added successfully");
  };

  const updateTask = (leadId: string, taskId: string, updates: Partial<Task>) => {
    setLeads(prevLeads => 
      prevLeads.map(lead => {
        if (lead.id !== leadId) return lead;
        
        const updatedTasks = lead.tasks.map(task => 
          task.id === taskId 
            ? { ...task, ...updates } 
            : task
        );
        
        return { ...lead, tasks: updatedTasks };
      })
    );

    // Add history item if task status changes
    if (updates.done !== undefined) {
      const action = updates.done ? "task-completed" : "task-reopened";
      const task = leads.find(l => l.id === leadId)?.tasks.find(t => t.id === taskId);
      if (task) {
        addHistoryItem(leadId, action, `Task: ${task.description}`);
      }
    }

    toast.success("Task updated successfully");
  };

  const deleteTask = (leadId: string, taskId: string) => {
    setLeads(prevLeads => 
      prevLeads.map(lead => {
        if (lead.id !== leadId) return lead;
        
        const task = lead.tasks.find(t => t.id === taskId);
        const updatedTasks = lead.tasks.filter(task => task.id !== taskId);
        
        // Add history item
        if (task) {
          addHistoryItem(leadId, "task-deleted", `Deleted task: ${task.description}`);
        }
        
        return { ...lead, tasks: updatedTasks };
      })
    );

    toast.success("Task deleted successfully");
  };

  const addHistoryItem = (leadId: string, action: string, details?: string) => {
    setLeads(prevLeads => 
      prevLeads.map(lead => {
        if (lead.id !== leadId) return lead;
        
        const newHistoryItem = {
          id: `hist-${Date.now()}`,
          timestamp: new Date().toISOString(),
          userId: currentUser?.id || "",
          userName: currentUser?.name || "",
          action,
          details
        };
        
        return { 
          ...lead, 
          history: [...lead.history, newHistoryItem] 
        };
      })
    );
  };

  const value = {
    currentUser,
    users,
    companies,
    currentCompany,
    leads,
    kanbanColumns,
    isAuthenticated,
    login,
    logout,
    setCurrentCompany: setCompany,
    updateLeadColumn,
    updateLead,
    addLead,
    addTask,
    updateTask,
    deleteTask,
    addHistoryItem
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
