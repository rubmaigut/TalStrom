using Microsoft.AspNetCore.Mvc;

namespace TalStromApi.Controllers;

[ApiController]
[Route("[controller]")]
public class TestController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok("a new testaaaa");
    }
}
