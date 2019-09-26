# Oxee

## The serverless server

>**oxymoron** _/ˌäksəˈmôrˌän/_ : a figure of speech in which apparently contradictory terms appear in conjunction

## What is this?

A docker image which leverages [MinIO](https://min.io/) and [NGINX](https://www.nginx.com/) to help developers setup a scalable object bucket with SSL/HTTPS in order to gain back some control over their serverless architecture.

When you spin up Oxee in cluster solutions such as AWS ECS, you are able to control scalability, load balancing, SSL certificates and much more.

This is a work in progress, and the goal is to have a production ready image which you deploy, feed it a list of domains, and it automagically sets up bucket end-points and fetches letsencrypt SSL certificates for you.

_TLDR; If you feel S3 buckets and CloudFront take too much control away from you or are giving you problems to setup SSL certificates or the like, then Oxee is for you. BUT, It's still in pre-alpha!_