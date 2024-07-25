using Data;
using Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace API.Controllers;

[ApiController]
[Route("api/")]
public class ComponentsController : ControllerBase
{
    private readonly ComponentContext _context;
    
    public ComponentsController(ComponentContext context) 
    {
        _context = context;
    }

    // GET: api/components
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Component>>> GetComponents()
    {
        return await _context.Components.ToListAsync();
    }

    // Get: api/health/apicheck
    [HttpGet("health/apicheck")]
    public IActionResult CheckAPIHealth()
    {
        return Ok(new { Status = "API is running" });
    }

    // Get: api/health/dbcheck
    [HttpGet("health/dbcheck")]
    public async Task<IActionResult> CheckDatabaseHealth() 
    {
        try
        {
            var canCon = await _context.Database.CanConnectAsync();
            if (canCon)
            {
                return Ok(new { Status = "Database connection is active" });
            }
            else
            {
                return StatusCode(500, new { Status = "Couldn't connect to database" });
            }
        }
        catch (Exception e)
        {
            return StatusCode(500, new { Status = "Database connection check failed", Error = e.Message });
        }
    }
}