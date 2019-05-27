using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Models
{
    public class ContactsRepository
    {
        private static List<Contact> _db = new List<Contact>();

        static ContactsRepository()
        {
            _db.AddRange(new Contact[] {
                new Contact
                {
                    Id = 1,
                    Name = "Aleksandr A. Davydenko"
                },
                new Contact
                {
                    Id = 2,
                    Name = "Bill Gates",
                    Address = "California, ..."
                },
                new Contact
                {
                    Id = 3,
                    Name = "Name",
                    Address = "Unknown"
                }
             });
        }
        public IQueryable<Contact> GetAll()
        {
            return _db.AsQueryable();
        }
        public void Add(Contact x)
        {
            _db.Add(x);
        }
        public int RemoveById(int id)
        {
            return _db.RemoveAll(x => x.Id == id);
        }
        public void Update(Contact x)
        {
            _db[x.Id] = x;
        }
    }
}
