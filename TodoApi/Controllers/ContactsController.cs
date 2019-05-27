using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TodoApi.Controllers
{
    [Produces("application/json")]
    [Route("api/contacts")]
    public class ContactsController : Controller
    {
        ContactsRepository db = new ContactsRepository();

        //=======================================================
        // GET api/contacts
        [HttpGet]
        public IEnumerable<Contact> Get()
        {
            return db.GetAll();
        }

        // GET api/contact/{id}
        [HttpGet("~/api/contact/{id}")]
        public Contact Get(int id)
        {
            Contact x = db.GetAll()
                .FirstOrDefault(c => c.Id == id);
            return x;
        }
        //=======================================================
        // Post api/contact
        [HttpPost("~/api/contact")]
        public void Post([FromBody]Contact contact)
        {
            db.Add(contact);
        }
        // Post api/contacts
        [HttpPost("~/api/contacts")]
        public void Post([FromBody]IEnumerable<Contact> contacts)
        {
            foreach (var c in contacts)
            {
                db.Add(c);
            }
        }
        //=======================================================
        // Put api/contact/
        [HttpPut("~/api/contact")]
        public IActionResult Put([FromBody]Contact contact)
        {
            if (contact == null)
            {
                return BadRequest();
            }
            if (!db.GetAll().Any(x => x.Id == contact.Id))
            {
                return NotFound();
            }
            db.RemoveById(contact.Id);
            db.Add(contact);
            return Ok(contact.Id);
            //db.Update(contact);
        }
        //=======================================================
        // Delete api/contact/id
        /// <summary>
        /// Deletes a Contact.
        /// </summary>
        [HttpDelete("~/api/contact/{id}")]
        public IActionResult Delete(int id)
        {
            if (!db.GetAll().Any(x => x.Id == id))
            {
                return NotFound(id);
            }

            int count = db.RemoveById(id);
            return Ok(count);
        }
    }
}
