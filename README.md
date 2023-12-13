# Micro Frontends for Java Microservices Example

This example uses JHipster 8 to generate a micro frontends and reactive microservice architecture. See [Micro Frontends for Java Microservices][blog] to see how it was built.

**Prerequisites:** 

- [Java](https://sdkman.io/) 17+
- [Node.js](https://nodejs.com/) 18+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [JHipster](https://www.jhipster.tech/installation/) 8

> [Auth0](https://auth0.com) is an easy-to-implement, adaptable authentication and authorization platform.
Basically, we make your login box awesome.

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To install this example, run the following commands:

```bash
git clone https://github.com/oktadev/auth0-micro-frontends-jhipster-example.git micro-frontends-for-java
cd micro-frontends-for-java
```

## Configure for Auth0

JHipster ships with Keycloak when you choose OAuth 2.0 / OIDC as the authentication type. However, you can easily change it to another identity provider, like Auth0!

First, you'll need to register a regular web application. Log in to your Auth0 account (or [sign up](https://auth0.com/signup) if you don't have an account). You should have a unique domain like `dev-xxx.us.auth0.com`.

Select **Create Application** in the [Applications section](https://manage.auth0.com/#/applications). Use a name like `Micro Frontends`, select **Regular Web Applications**, and click **Create**.

Switch to the **Settings** tab and configure your application settings:

- Allowed Callback URLs: `http://localhost:8080/login/oauth2/code/oidc`
- Allowed Logout URLs: `http://localhost:8080/`

Scroll to the bottom and click **Save Changes**.

In the [roles](https://manage.auth0.com/#/roles) section, create new roles named `ROLE_ADMIN` and `ROLE_USER`.

Create a new user account in the [users](https://manage.auth0.com/#/users) section. Click the **Role** tab to assign the roles you just created to the new account.

_Make sure your new user's email is verified before attempting to log in!_

Next, head to **Actions** > **Flows** and select **Login**. Create a new action named `Add Roles` and use the default trigger and runtime. Change the `onExecutePostLogin` handler to be as follows:

```js
exports.onExecutePostLogin = async (event, api) => {
  const namespace = 'https://www.jhipster.tech';
  if (event.authorization) {
    api.idToken.setCustomClaim('preferred_username', event.user.email);
    api.idToken.setCustomClaim(`${namespace}/roles`, event.authorization.roles);
    api.accessToken.setCustomClaim(`${namespace}/roles`, event.authorization.roles);
  }
}
```

This code adds the user's roles to a custom claim (prefixed with `https://www.jhipster.tech/roles`). This claim is mapped to Spring Security authorities in `SecurityUtils.java` in the gateway app.

Select **Deploy** and drag the `Add Roles` action to your Login flow.

Edit `docker-compose/central-server-config/application.yml` and append the following YAML block to add your Auth0 settings.

```yaml
jhipster:
  security:
    oauth2:
      audience: https://<your-auth0-domain>/api/v2/

spring:
  security:
    oauth2:
      client:
        provider:
          oidc:
            issuer-uri: https://<your-auth0-domain>/ # make sure to include the trailing slash!
        registration:
          oidc:
            client-id: <your-client-id>
            client-secret: <your-client-secret>
```

Build all the Docker images for each application by running the following command from the root directory.

```shell
npm run java:docker
```

The command is slightly different if you're using a Mac with Apple Silicon.

```shell
npm run java:docker:arm64
```

Navigate to the `docker-compose` directory and start your microservices stack.

```shell
cd docker-compose
docker compose up
```

Now, Spring Security will be configured to use Auth0, and Consul will distribute these settings to all your microservices. When everything is started, navigate to `http://localhost:8080` and click **sign in**. You will be prompted for your Auth0 credentials.

If you'd like to use Okta for your identity provider, see [JHipster's documentation](https://www.jhipster.tech/security/#okta).

## Links

This example uses the following open source libraries:

* [Consul](https://www.consul.io/)
* [JHipster](https://www.jhipster.tech)
* [Spring Boot](https://spring.io/projects/spring-boot)
* [Spring Cloud](https://spring.io/projects/spring-cloud)
* [Spring Cloud Gateway](https://spring.io/projects/spring-cloud-gateway)
* [Spring Security](https://spring.io/projects/spring-security)

## Help

Please post any questions as comments on [this example's blog post][blog], or on the [Okta Developer Forums](https://devforum.okta.com/).

## License

Apache 2.0, see [LICENSE](LICENSE).

[blog]: https://auth0.com/blog/micro-frontends-for-java-microservices/
