
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import LeadDetails from "../components/leads/LeadDetails";

const LeadDetailsPage = () => {
  const { leadId } = useParams<{ leadId: string }>();
  const { leads, users } = useAppContext();
  const navigate = useNavigate();
  
  const lead = leads.find((l) => l.id === leadId);
  
  const handleClose = () => {
    navigate("/kanban");
  };
  
  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-xl font-semibold mb-2">Lead not found</h2>
        <p className="text-muted-foreground mb-4">
          The lead you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate("/kanban")}
          className="text-primary hover:underline"
        >
          Return to Kanban Board
        </button>
      </div>
    );
  }
  
  return <LeadDetails lead={lead} users={users} onClose={handleClose} />;
};

export default LeadDetailsPage;
