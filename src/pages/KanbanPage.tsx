
import React from "react";
import KanbanBoard from "../components/kanban/KanbanBoard";

const KanbanPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <KanbanBoard />
    </div>
  );
};

export default KanbanPage;
