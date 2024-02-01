
using System.Text.Json.Serialization;
using Azure.Storage.Blobs;
using AzureFullstackPractice.Data;
using AzureFullstackPractice.Services;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<TalStromDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("TALSTROM_CONNECTIONSTRING") ?? throw new InvalidOperationException("Connection string 'TALSTROM_CONNECTIONSTRING' not found.")));

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

// Configure the video file size limit HERE.
builder.Services.Configure<KestrelServerOptions>(options =>
{
    options.Limits.MaxRequestBodySize  = int.MaxValue; 
});

var ccDbString = builder.Configuration["ConnectionStrings:TALSTROM_CONNECTIONSTRING"];
var azureBlobSecret = builder.Configuration["ConnectionStrings:AzureBlobStorage"];
string azureBlobConnectionString = builder.Configuration.GetConnectionString("AzureBlobStorage"); 

builder.Services.AddScoped<BlobServiceClient>(x => new BlobServiceClient(azureBlobConnectionString));
builder.Services.AddScoped<BlobStorageService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "TalStrom", Version = "v1" });
    c.OperationFilter<FormFileOperationFilter>();
});

    var app = builder.Build();
app.UseCors(policy =>
{
    policy.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader(); 
});

// Configure the HTTP request pipeline.

    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    });

    app.UseHttpsRedirection();

    app.MapControllers();

    app.Run();