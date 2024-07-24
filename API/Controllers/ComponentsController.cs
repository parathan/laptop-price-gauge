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

    // dummy method to test the connection
    [HttpGet("hello")]
    public string Test()
    {
        return "Hello World!";
    }
}