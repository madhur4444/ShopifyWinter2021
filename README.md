# ShopifyWinter2021
[![CircleCI](https://circleci.com/gh/madhur4444/ShopifyWinter2021.svg?style=shield)](https://circleci.com/gh/madhur4444/ShopifyWinter2021)

Infrastructure challenge for Shopify Winter 2021
Image repositary written in typescript, containerized API deployed on Google Cloud Run using CircleCI pipeline

Public Endpoint of API - https://shc2021-r5zo3s34ua-uc.a.run.app/

Endpoints -
/upload
Supports single and multiple image upload

/download/:id
downloads image by name

/search/:id
Returns all possible images starting with given id

For local testing switch to dev-testing branch,

```
docker-compose build && docker-compose up
```

