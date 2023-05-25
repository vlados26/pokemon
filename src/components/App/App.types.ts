import { TicketDto } from "../../types/api";

export type AppState = {
    tickets?: TicketDto[];
    search: string;
    filteredTickets?: TicketDto[];
  };