using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

public class FormFileOperationFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        var formFileParameters = context.MethodInfo.GetParameters()
            .Where(p => p.ParameterType == typeof(IFormFile))
            .ToList();
// || p.ParameterType == typeof(string)
        if (formFileParameters.Any())
        {
            operation.RequestBody = new OpenApiRequestBody
            {
                Content =
                {
                    ["multipart/form-data"] = new OpenApiMediaType()
                    {
                        Schema = new OpenApiSchema
                        {
                            Type = "object",
                            Properties = formFileParameters.ToDictionary(
                                p => p.Name,
                                p => new OpenApiSchema
                                {
                                    Type = p.ParameterType == typeof(IFormFile) ? "string" : "string",
                                    Format = p.ParameterType == typeof(IFormFile) ? "binary" : null
                                })
                        }
                    },
                    ["application/json"] = new OpenApiMediaType()
                    {
                        Schema = new OpenApiSchema
                        {
                            Type = "object",
                            Properties = formFileParameters.ToDictionary(
                                p => p.Name,
                                p => new OpenApiSchema
                                {
                                    Type = "string",
                                    Format = "binary"
                                })
                        }
                    },
                    
                }
            };
        }
    }
}