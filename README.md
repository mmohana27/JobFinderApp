# JobFinderApp – DevOps Intern Assignment

This repository contains a Dockerized React Native Web application, deployed on AWS EC2 as part of the DevOps Intern assignment.
Title: Dockerize and Deploy a Web App on AWS EC2 with Basic Automation

Objective:To evaluate your ability to use AWS for infrastructure provisioning and app deployment usingDevOps principles.


🧾 Features Covered
1)Setup and GitHub Repo
2)Dockerize the Application
3)Docker build and local run verified
4)Launch and Configure AWS EC2
5)Used IAM role to enable S3 access from EC2
6)cloud-init 
7)Created `deploy.sh` script to automate manual setup


Dockerfile

```Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install -g expo-cli && npm install

COPY . .

EXPOSE 8081
CMD ["npx", "expo", "start", "--web"]



Build the image:

docker build -t jobfinderapp .



Run the container:

docker run -p 8081:8081 jobfinderapp



Open in browser:

http://localhost:8081

 Launch on AWS EC2
- Instance Details
AMI: Ubuntu Server 22.04 (Free tier eligible)
Instance Type: t3.micro
Key pair: jobfinder-key.pem



-Steps to Deploy on EC2

SSH into the EC2 instance:

ssh -i "jobfinder-key.pem" ubuntu@13.60.229.47



Clone the repo:

git clone https://github.com/mmohana27/JobFinderApp.git
cd JobFinderApp



Build Docker image:

sudo docker build -t jobfinderapp .

Run Docker container:

sudo docker run -d -p 80:8081 jobfinderapp

Visited  app at:

http://@13.60.229.47


⚙️ Bonus Features
🟢 IAM Role for S3 Access
Created IAM Role EC2S3AccessRole with AmazonS3ReadOnlyAccess
Attached it to EC2


🟡 cloud-init Automation

🟣 deploy.sh Script