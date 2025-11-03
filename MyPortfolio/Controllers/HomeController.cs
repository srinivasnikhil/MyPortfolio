using System.Diagnostics;
using System.Net.Mail;
using Microsoft.AspNetCore.Mvc;
using MyPortfolio.Models;

namespace MyPortfolio.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public IActionResult SendMessage(string FullName, string Subject, string Email, string MobileNo, string Message)
        {
            try
            {
                using (MailMessage mail = new MailMessage())
                {
                    mail.From = new MailAddress("nikhilmallempatiadmissions@gmail.com");
                    mail.To.Add("srinivasnikhil38@gmail.com");
                    mail.Subject = "New Message from Contact Form";
                    mail.Body = $"A Recruiter or Employer has sent you a message:\n\nName: {FullName}\nSubject: {Subject}\nEmail: {Email}\nMobile Number: {MobileNo}\nMessage: {Message}\n\nMr. Nikhil Respond to him immediately.";
                    mail.IsBodyHtml = false;

                    using (SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587))
                    {
                        smtp.Credentials = new System.Net.NetworkCredential("nikhilmallempatiadmissions@gmail.com", "bfyp xbac slcg vbqx");
                        smtp.EnableSsl = true;
                        smtp.Send(mail);
                    }
                }
            }
            catch (Exception ex)
            {
                return Json("Error");
            }

            return Json("Success");
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
