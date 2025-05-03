
import { User, Company, Lead, KanbanColumn } from "../types";

// Sample Users
export const mockUsers: User[] = [
  {
    id: "user1",
    email: "admin@example.com",
    name: "Admin User",
    companies: ["company1"],
    role: "admin"
  },
  {
    id: "user2",
    email: "john@example.com",
    name: "John Doe",
    companies: ["company1"],
    role: "collaborator"
  },
  {
    id: "user3",
    email: "sarah@example.com",
    name: "Sarah Smith",
    companies: ["company1"],
    role: "collaborator"
  }
];

// Sample Companies
export const mockCompanies: Company[] = [
  {
    id: "company1",
    name: "Acme Inc",
    defaultColumns: [
      "AI em atendimento",
      "Lead qualificado",
      "Contato iniciado",
      "Follow up",
      "Venda realizada",
      "Descarte"
    ],
    creatorId: "user1"
  }
];

// Sample Leads
export const mockLeads: Lead[] = [
  {
    id: "lead1",
    companyId: "company1",
    name: "Maria Souza",
    phone: "71999999999",
    email: "maria@email.com",
    source: "Instagram",
    column: "AI em atendimento",
    responsibleId: "user2",
    createdAt: "2025-05-01T10:00:00Z",
    priority: "high",
    tags: ["quente", "Instagram"],
    history: [
      {
        id: "hist1",
        timestamp: "2025-05-01T10:00:00Z",
        userId: "user1",
        userName: "Admin User",
        action: "created",
        details: "Lead created from Instagram form"
      }
    ],
    tasks: [
      {
        id: "task1",
        leadId: "lead1",
        description: "Ligar para confirmar interesse",
        done: false,
        dueDate: "2025-05-04",
        responsibleId: "user2"
      }
    ]
  },
  {
    id: "lead2",
    companyId: "company1",
    name: "João Silva",
    phone: "11888888888",
    email: "joao@email.com",
    source: "Website",
    column: "Lead qualificado",
    responsibleId: "user3",
    createdAt: "2025-05-02T14:30:00Z",
    priority: "medium",
    tags: ["website"],
    history: [
      {
        id: "hist2",
        timestamp: "2025-05-02T14:30:00Z",
        userId: "user1",
        userName: "Admin User",
        action: "created",
        details: "Lead created from website contact form"
      },
      {
        id: "hist3",
        timestamp: "2025-05-02T15:45:00Z",
        userId: "user3",
        userName: "Sarah Smith",
        action: "qualification",
        details: "Lead qualified - interested in premium plan"
      }
    ],
    tasks: [
      {
        id: "task2",
        leadId: "lead2",
        description: "Enviar proposta comercial",
        done: false,
        dueDate: "2025-05-05",
        responsibleId: "user3"
      }
    ]
  },
  {
    id: "lead3",
    companyId: "company1",
    name: "Ana Pereira",
    phone: "21777777777",
    email: "ana@email.com",
    source: "Referral",
    column: "Contato iniciado",
    responsibleId: "user2",
    createdAt: "2025-04-28T09:15:00Z",
    priority: "low",
    tags: ["referral", "follow-up"],
    history: [
      {
        id: "hist4",
        timestamp: "2025-04-28T09:15:00Z",
        userId: "user2",
        userName: "John Doe",
        action: "created",
        details: "Lead created from client referral"
      },
      {
        id: "hist5",
        timestamp: "2025-04-29T11:20:00Z",
        userId: "user2",
        userName: "John Doe",
        action: "contacted",
        details: "Initial phone call made - client interested"
      }
    ],
    tasks: [
      {
        id: "task3",
        leadId: "lead3",
        description: "Agendar demonstração do produto",
        done: true,
        dueDate: "2025-04-30",
        responsibleId: "user2"
      },
      {
        id: "task4",
        leadId: "lead3",
        description: "Enviar material adicional sobre features",
        done: false,
        dueDate: "2025-05-05",
        responsibleId: "user2"
      }
    ]
  },
  {
    id: "lead4",
    companyId: "company1",
    name: "Carlos Eduardo",
    phone: "11922222222",
    email: "carlos@email.com",
    source: "LinkedIn",
    column: "Follow up",
    responsibleId: "user3",
    createdAt: "2025-04-25T16:00:00Z",
    priority: "high",
    tags: ["urgente", "LinkedIn"],
    history: [
      {
        id: "hist6",
        timestamp: "2025-04-25T16:00:00Z",
        userId: "user1",
        userName: "Admin User",
        action: "created",
        details: "Lead created from LinkedIn campaign"
      },
      {
        id: "hist7",
        timestamp: "2025-04-26T10:30:00Z",
        userId: "user3",
        userName: "Sarah Smith",
        action: "contacted",
        details: "Initial email sent"
      },
      {
        id: "hist8",
        timestamp: "2025-04-28T14:15:00Z",
        userId: "user3",
        userName: "Sarah Smith",
        action: "follow-up",
        details: "Client requested more information about pricing"
      }
    ],
    tasks: [
      {
        id: "task5",
        leadId: "lead4",
        description: "Enviar tabela de preços atualizada",
        done: true,
        dueDate: "2025-04-29",
        responsibleId: "user3"
      },
      {
        id: "task6",
        leadId: "lead4",
        description: "Ligar para confirmar recebimento",
        done: false,
        dueDate: "2025-05-03",
        responsibleId: "user3"
      }
    ]
  },
  {
    id: "lead5",
    companyId: "company1",
    name: "Paulo Mendes",
    phone: "21933333333",
    email: "paulo@email.com",
    source: "Google Ads",
    column: "Venda realizada",
    responsibleId: "user2",
    createdAt: "2025-04-15T08:45:00Z",
    priority: "medium",
    tags: ["Google", "fechado"],
    history: [
      {
        id: "hist9",
        timestamp: "2025-04-15T08:45:00Z",
        userId: "user2",
        userName: "John Doe",
        action: "created",
        details: "Lead created from Google Ads campaign"
      },
      {
        id: "hist10",
        timestamp: "2025-04-16T13:20:00Z",
        userId: "user2",
        userName: "John Doe",
        action: "contacted",
        details: "Initial call made - client interested in basic plan"
      },
      {
        id: "hist11",
        timestamp: "2025-04-20T09:30:00Z",
        userId: "user2",
        userName: "John Doe",
        action: "proposal",
        details: "Sent commercial proposal"
      },
      {
        id: "hist12",
        timestamp: "2025-04-30T14:00:00Z",
        userId: "user2",
        userName: "John Doe",
        action: "closed",
        details: "Client signed contract - 12 month plan"
      }
    ],
    tasks: [
      {
        id: "task7",
        leadId: "lead5",
        description: "Enviar contrato para assinatura",
        done: true,
        dueDate: "2025-04-25",
        responsibleId: "user2"
      },
      {
        id: "task8",
        leadId: "lead5",
        description: "Agendar reunião de onboarding",
        done: true,
        dueDate: "2025-05-10",
        responsibleId: "user2"
      },
      {
        id: "task9",
        leadId: "lead5",
        description: "Preparar material de boas-vindas",
        done: false,
        dueDate: "2025-05-08",
        responsibleId: "user2"
      }
    ]
  },
  {
    id: "lead6",
    companyId: "company1",
    name: "Amanda Costa",
    phone: "11944444444",
    email: "amanda@email.com",
    source: "Facebook",
    column: "Descarte",
    responsibleId: "user3",
    createdAt: "2025-04-10T11:30:00Z",
    priority: "low",
    tags: ["Facebook"],
    history: [
      {
        id: "hist13",
        timestamp: "2025-04-10T11:30:00Z",
        userId: "user3",
        userName: "Sarah Smith",
        action: "created",
        details: "Lead created from Facebook ad"
      },
      {
        id: "hist14",
        timestamp: "2025-04-12T10:45:00Z",
        userId: "user3",
        userName: "Sarah Smith",
        action: "contacted",
        details: "Initial call made - left voicemail"
      },
      {
        id: "hist15",
        timestamp: "2025-04-18T16:20:00Z",
        userId: "user3",
        userName: "Sarah Smith",
        action: "follow-up",
        details: "Second attempt - no answer"
      },
      {
        id: "hist16",
        timestamp: "2025-04-25T09:00:00Z",
        userId: "user3",
        userName: "Sarah Smith",
        action: "discard",
        details: "Lead unresponsive after multiple attempts"
      }
    ],
    tasks: [
      {
        id: "task10",
        leadId: "lead6",
        description: "Tentar contato por WhatsApp",
        done: true,
        dueDate: "2025-04-15",
        responsibleId: "user3"
      },
      {
        id: "task11",
        leadId: "lead6",
        description: "Enviar email final de tentativa",
        done: true,
        dueDate: "2025-04-20",
        responsibleId: "user3"
      }
    ]
  }
];

// Generate Kanban Columns
export const generateKanbanColumns = (): KanbanColumn[] => {
  const defaultColumns = mockCompanies[0].defaultColumns;
  const colorClasses = {
    "AI em atendimento": "tag-status-ai",
    "Lead qualificado": "tag-status-qualified",
    "Contato iniciado": "tag-status-contacted",
    "Follow up": "tag-status-followup",
    "Venda realizada": "tag-status-closed",
    "Descarte": "tag-status-discard"
  };

  return defaultColumns.map((columnTitle, index) => {
    const columnLeads = mockLeads.filter(lead => lead.column === columnTitle);
    return {
      id: `column-${index + 1}`,
      title: columnTitle,
      colorClass: colorClasses[columnTitle as keyof typeof colorClasses],
      leadIds: columnLeads.map(lead => lead.id)
    };
  });
};
