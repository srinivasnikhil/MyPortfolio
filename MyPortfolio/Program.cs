using MyPortfolio.Models;
using MyPortfolio.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
});

//configure dependency injection
builder.Services.AddSingleton<DapperContext>();
builder.Services.AddScoped<IPortfolioRepository, PortfolioRepository>();

var app = builder.Build();

app.UseResponseCompression();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles(new StaticFileOptions { 
    OnPrepareResponse = ctx => 
    { 
        ctx.Context.Response.Headers.Append("Cache-Control", "public,max-age=86400");    
    }
});

app.UseRouting();

app.UseAuthorization();

app.MapGet("/health", () => "OK");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
