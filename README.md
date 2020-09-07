# ShopifyWinter2021
[![CircleCI](https://circleci.com/gh/madhur4444/ShopifyWinter2021.svg?style=shield)](https://circleci.com/gh/madhur4444/ShopifyWinter2021)

Infrastructure challenge for Shopify Winter 2021
Image repositary written in typescript, containerized API deployed on Google Cloud Run using CircleCI pipeline

Public Endpoint of API for CloudRun deployment for testing - https://shc2021-r5zo3s34ua-uc.a.run.app/

Public Production deployment Endpoint on Google Kubernetes Engine with 2 replica pods of API (Load balancer configured) - http://34.122.25.66/

Endpoints -

/upload

Supports single and multiple image upload (attach images as file in body)

/download/:id

downloads image by name

/search/:id

Returns all possible images starting with given id


For local testing on device switch to dev-testing branch and build API locally,

```
docker-compose build && docker-compose up
```

