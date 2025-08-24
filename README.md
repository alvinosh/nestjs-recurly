<p align="center">
  <a href="https://juicyllama.com/" target="_blank">
    <img src="https://juicyllama.com/assets/images/icon.png" width="100" alt="JuicyLlama Logo" />
  </a>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
A NestJS app for integrating with Recurly
</p>

<h2 align="center">
Sponsored By
</h2>

<p align="center">
  <a href="https://clicktech.com/" target="_blank">
    <img src="https://clicktech.com/wp-content/uploads/2024/07/clicktech-logo.png" alt="ClickTech Logo" />
  </a>
</p>
<p align="center">
Clicktech help businesses succeed online.
</p>
<p align="center">
Their mission is to make digital marketing accessible and more cost-effective for all businesses, regardless of size.
</p>
<p align="center">
Through their network of platforms, integrated partners, and educational resources, they aim to create a meaningful economic impact by helping millions of businesses succeed online.
</p>

## Install

```bash
npm i @juicyllama/nestjs-recurly
```

## Usage

1a. Add your API key to your .env if running a single-recurly account with key `RECURLY_API_KEY`
1b. Pass your recurly API key with each request (this takes priority) if running a single or multiple recurly accounts.
2. Integrate your NestJS application with the relevant modules (e.g. endpoints) required

You can checkout the [Sandbox](./src/sandbox/) for an example implementation.

## Types

We have typed each resource type and have exported them for your use. 

You can import them into your code and reuse them.

## Testing

We are using a Recurly sandbox account to run all tests locally and in our CI/CD. If you want to run the test suite, you should create an account with Recurly.

### Limitations

Standard accounts don't come with features:

* account_hierarchy
* external_resource_tracking
* wallet feature

Therefore some tests have been disabled