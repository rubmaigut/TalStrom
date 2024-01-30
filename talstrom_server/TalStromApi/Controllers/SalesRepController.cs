using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TalStromApi.Models;

namespace TalStromApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesRepController : ControllerBase
    {
        private readonly TalStromDbContext _context;

        public SalesRepController(TalStromDbContext context)
        {
            _context = context;
        }

        // GET: api/SalesRep
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SalesRep>>> GetSalesRep()
        {
            return await _context.SalesRep.ToListAsync();
        }

        // GET: api/SalesRep/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SalesRep>> GetSalesRep(int id)
        {
            var salesRep = await _context.SalesRep.FindAsync(id);

            if (salesRep == null)
            {
                return NotFound();
            }

            return salesRep;
        }

        // PUT: api/SalesRep/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSalesRep(int id, SalesRep salesRep)
        {
            if (id != salesRep.Id)
            {
                return BadRequest();
            }

            _context.Entry(salesRep).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalesRepExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/SalesRep
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SalesRep>> PostSalesRep(SalesRep salesRep)
        {
            _context.SalesRep.Add(salesRep);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSalesRep", new { id = salesRep.Id }, salesRep);
        }

        // DELETE: api/SalesRep/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSalesRep(int id)
        {
            var salesRep = await _context.SalesRep.FindAsync(id);
            if (salesRep == null)
            {
                return NotFound();
            }

            _context.SalesRep.Remove(salesRep);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SalesRepExists(int id)
        {
            return _context.SalesRep.Any(e => e.Id == id);
        }
    }
}
