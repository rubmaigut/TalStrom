using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace TalStromApi.Helpers;

public class FormFileOperationFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        var formFileParameters = context.MethodInfo.GetParameters()
            .Where(p => p.ParameterType == typeof(IFormFile))
            .ToList();
        
        if (formFileParameters.Any())
        {
            Dictionary<string, OpenApiSchema> dictionary = new ();
            foreach (var parameter in formFileParameters) dictionary.Add(parameter.Name, new OpenApiSchema { Type = "string", Format = "binary" });
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
                                    Type = "string",
                                    Format = p.ParameterType == typeof(IFormFile) ? "binary" : null
                                })
                        }
                    },
                    ["application/json"] = new OpenApiMediaType()
                    {
                        Schema = new OpenApiSchema
                        {
                            Type = "object",
                            Properties = dictionary
                        }
                    },
                    
                }
            };
        }
    }
}