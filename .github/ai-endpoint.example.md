I am looking to extend this Recurly NestJS API wrapper to include Transaction

API documentation: https://recurly.com/developers/api/v2021-02-25/#tag/transaction 
Local swagger downloaded version: `./recurly-api-spec.yaml`

Before starting the work you should create a branch `api-endpoint-transaction` and ensure all development happens on that feature branch.

You should use `src/v3/plan/*` as a template

1. Create a new folder `src/v3/transaction` for the new files
2. Create the `src/v3/transaction/transaction.types.ts` using the response entities from the API documentation. All type names should start with Recurly to help differentiate them in the clients applications. 
3. Create the `src/v3/transaction/transaction.dtos.ts` using the API request Query/Body data from the API documentation. All DTOs names should start with Recurly to help differentiate them in the clients applications. 
4. Create the `src/v3/transaction/transaction.service.ts` creating the actions for each endpoint in the API documentation, using the types, dtos etc, each endpoint should have a corresponding function, also accept API key as a param if clients want to pass at runtime. 
5. Create the `src/v3/transaction/transaction.module.ts` for bringing everything together.
6. Create the `src/v3/transaction/transaction.test.spec.ts` creating tests for each of the functions in the service file, ensure the tests pass successfully. Test should be created in the following CRUD order (create, read, update, delete) to ensure each service has data to pass to the others. Updates & Deletes should also read to ensure the change happened. Tests should call the relevant service functions and NOT mock responses. 
7. Include the new module in the main `src/v3/v3.module.ts` file as an import and export
8. Add the new service, types and DTOs as exports to the main `src/index.ts` file
9. Run lint and fix any linting issues (`npm run lint`)
10. Run prettier (`npm run format`)
11. Run build and make sure the application builds (`npm run build`)
12. Run the test suite to ensure tests still pass (`npm run test`)
13. Commit the code with a good commit message, push the branch to github.
14. Create a PR for this new module from your feature branch to main using the Github CLI.
15. Switch back to the main branch to close the loop.