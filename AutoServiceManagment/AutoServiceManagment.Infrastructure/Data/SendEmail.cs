//using AutoServiceManagment.Models;
//using System.IO;
//using System.Net;
//using System.Net.Mail;

//namespace AutoServiceManagment.Infrastructure.Data
//{
//    public static class SendEmail
//    {
//        public static bool SendEmailForVerify(User user, string link)
//        {
//            MailMessage msg = new MailMessage();

//            msg.From = new MailAddress("", "");

//            msg.To.Add(user.Email);

//            msg.Body = $"";

//            msg.Subject = "";

//            msg.IsBodyHtml = true;

//            SmtpClient smtp = new SmtpClient();

//            smtp.Host = "smtp.gmail.com";

//            smtp.Port = 587;

//            smtp.EnableSsl = true;

//            smtp.Credentials = new NetworkCredential("", "");

//            smtp.Send(msg);

//            return true;
//        }
//    }
//}
