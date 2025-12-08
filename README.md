# MyPortfolio
⚡ Personal Developer Portfolio — ASP.NET Core MVC + Azure CI/CD

A modern, production-ready developer portfolio designed, engineered, and deployed fully by me to showcase my .NET development, cloud engineering, and DevOps capabilities.

🚀 Project Purpose

I developed this portfolio to demonstrate full-cycle engineering skills—from backend architecture to cloud deployment. The goal was to create a professional-grade, scalable, and secure web application that I can share with employers as part of my job search.

This project reflects my capabilities in:

Full-stack .NET development

SQL Server + Dapper ORM integration

Responsive UI/UX engineering

CI/CD automation

Azure cloud deployment

Security-focused development and configuration

Real-world, production-ready application engineering

🛠️ How I Developed This Project (End-to-End Engineering Process)
1️⃣ Planning & System Design

I started by outlining the features and structure of a high-quality personal portfolio:

Home, About, Skills, Career Timeline, and Portfolio Sections

Contact form with backend email integration

Admin-friendly structure (data-driven models)

Scalable architecture suitable for cloud hosting

Fully responsive UI with mobile-first design

I prepared a modular system architecture using:

ASP.NET Core MVC for structured separation of concerns

Model → Repository → Controller → View design

Dapper ORM for lightweight, high-performance database queries

SQL Server to store dynamic content (skills, projects, experience)

2️⃣ Backend Engineering (ASP.NET Core MVC)

I built the core backend using C# and ASP.NET Core features:

✔ Structured Models

Users

Skills

Projects

Contact Form

Work Experience

Education

✔ Repository Pattern

Prepared a clean code structure to separate:

Data access

Business logic

UI rendering

✔ Dapper-based Database Connectivity

Built a fast database layer using:

using (var connection = _context.CreateConnection()) {
    // SQL queries with Dapper
}

✔ Contact Form Email Feature

Implemented SMTP-based automated mail sending functionality for employers or visitors.

3️⃣ Frontend Development & UI/UX Engineering

The site includes clean, modern, efficient UI design:

🎨 Technologies Used

HTML5 / CSS3

Bootstrap 5

Custom JavaScript

Font Awesome

Toastr for notifications

✨ Features Implemented

Interactive side navigation

Scroll-based animations

Portfolio filter system

Image gallery with zoom + modal viewer

Fully responsive across desktop, tablet, mobile

4️⃣ Database Design (SQL Server)

Designed normalized tables for:

Users

Skills

Projects

Experience

Education

Included Dapper mappings and stored procedures for better performance.

5️⃣ Cloud Deployment → Azure App Service

After development, I deployed the project to Microsoft Azure App Service.

✔ Deployment Steps

Created Azure App Service (Linux/Windows hosting plan)

Set environment variables (connection string, SMTP settings) in Azure Configuration

Configured SQL Server endpoint

Deployed through GitHub Actions CI/CD

6️⃣ CI/CD Pipeline (GitHub Actions)

I automated the build & deployment pipeline using GitHub Actions.

🎯 CI/CD Workflow Includes

Build ASP.NET Core project

Restore NuGet packages

Run tests (if enabled)

Publish build artifacts

Deploy to Azure App Service

✔ Sample Workflow Structure
name: Build & Deploy .NET to Azure

on:
  push:
    branches:
      - master

jobs:
  build:
    runs-on: windows-latest

    steps:
    - uses: actions/checkout@v3
    - name: Setup .NET
      uses: actions/setup-dotnet@v2
      with:
        dotnet-version: '8.0.x'
    - name: Restore Dependencies
      run: dotnet restore

    - name: Build
      run: dotnet build --configuration Release --no-restore

    - name: Publish
      run: dotnet publish -c Release -o publish_output

  deploy:
    runs-on: windows-latest
    needs: build

    steps:
    - name: Deploy to Azure
      uses: azure/webapps-deploy@v2
      with:
        app-name: '<YOUR_AZURE_APP_NAME>'
        publish-profile: ${{ secrets.AZURE_PUBLISH_PROFILE }}
        package: publish_output

📚 Key Features to Showcase to Employers
Category	Features
Backend	ASP.NET Core MVC, Repository Pattern, Dapper, SQL Server, Model Binding
Frontend	Bootstrap 5, Responsive UI, JS Animations, Modal Image Viewer
DevOps	GitHub Actions CI/CD, Azure Deployment, Automated Build/Deploy
Cloud	Azure App Service, App Configuration, Logging, Environment Management
Security	SMTP security, environment-secrets, connection string protection
Architecture	Clean layered structure, scalable design, production-ready
🔧 Local Setup Instructions
Prerequisites

.NET 8 SDK

SQL Server

Visual Studio or VS Code

Steps

Clone repo:

git clone https://github.com/srinivasnikhil/MyPortfolio.git


Update connection string in appsettings.json

Update SMTP email settings

Build & run:

dotnet build
dotnet run

🌐 Live Deployment

This application is deployed on Azure App Service and automatically updated whenever I commit to the main/master branch thanks to GitHub Actions CI/CD.
