using AutoServiceManagment.DomainModels.Entities;
using System.IO;
using System.Net;
using System.Net.Mail;

namespace AutoServiceManagment.Repository.Data
{
    public static class SendEmail
    {
        public static bool SendEmailForNotify(Customer customer, Discount discount)
        {
            MailMessage msg = new MailMessage();

            msg.From = new MailAddress("CarToolNetwork@gmail.com", "New Discount");

            msg.To.Add(customer.Email);

            msg.Body = $"Attention! come and use the new Discount: \"{discount}\"";

            msg.Subject = "Advertisement";

            msg.IsBodyHtml = true;

            SmtpClient smtp = new SmtpClient();

            smtp.Host = "smtp.gmail.com";

            smtp.Port = 587;

            smtp.EnableSsl = true;

            smtp.Credentials = new NetworkCredential("servicecartoolnetwork@gmail.com", "servicecartoolnetwork123");

            smtp.Send(msg);

            return true;
        }
    }
}
