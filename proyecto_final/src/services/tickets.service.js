import {
  BadRequestError,
  NotFoundError,
  ServerError,
} from "../utils/error.util";

class TicketService {
  constructor(dao) {
    this.dao = dao;
  }

  async getAllTickets() {
    const tickets = await this.dao.get({});
    return tickets;
  }

  async getTicketById(id) {
    try {
      const ticket = await this.dao.getOne({ _id: id });

      if (!ticket) {
        throw new NotFoundError("Ticket not found");
      }

      return ticket;
    } catch (error) {
      if (error.name === "CastError") {
        throw new BadRequestError(error.message);
      }

      if (error.name === "NotFoundError") {
        throw error;
      }

      throw new ServerError(error);
    }
  }

  async createTicket(ticket) {
    try {
      const newTicket = await this.dao.create(ticket);

      return newTicket;
    } catch (error) {
      if (error.name === "ValidationError") {
        throw new BadRequestError(error.message);
      }

      throw new ServerError(error);
    }
  }
}

export default TicketService;
