import cron from "node-cron";
import { sendEmail } from "../../shared/mailer/send-mail.service";
import BookLoanModel from "../database/mongo/book-loan.schema";
import {
  calculateLateReturnDate,
  calculateUpcomingDueDate,
} from "../helpers/reminders-date.helper";

// Every day at 12 -> "0 0 12 * * *"
// Every 10 seconds -> "*/10 * * * * *"
export const handleReminders = cron.schedule("0 0 12 * * *", async () => {
  console.log("Reviewing loans...");

  const today = new Date();
  const upcomingDueDate = calculateUpcomingDueDate();
  const lateReturnDate = calculateLateReturnDate();

  try {
    const loans = await BookLoanModel.find({
      returnDate: { $exists: false },
      $or: [
        {
          dueDate: {
            $gte: upcomingDueDate.startOfDay,
            $lt: upcomingDueDate.endOfDay,
          },
        },
        { dueDate: { $lt: lateReturnDate } },
      ],
    });
    console.log(`Sending reminders for ${loans.length} loans`);

    for (const loan of loans) {
      const subject = `Book Return Reminder: ${loan.book}`;
      let message = `Hello, remember that you need to return the book in two days.`;

      if (loan.dueDate < today) {
        message = `You are overdue on returning the book. Please return it as soon as possible.`;
      }

      await sendEmail(loan.user, subject, message);
    }
  } catch (error) {
    console.error("Error processing loans for email sending: ", error);
  }
});
