using Microsoft.AspNetCore.Mvc;

namespace TalStromApi.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok("test");
    }
}
