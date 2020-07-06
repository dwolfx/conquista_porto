# Cypress & Percy

[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/racheltodo/sciensa-conquista)

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

Running the following command will install the essential libraries. Also, go read the project's main [README](https://bitbucket.org/sciensa/conquista-react-front/src/develop/README.md) file.

```bash
yarn install
sudo npm i -g puppeteer
sudo apt-get install libnss3-dev libxss1
```

## Setting up Percy

You will need access to the Percy dashboard to see the results. Please contact any team member so we can add you as a contributor.

### For Windows

```bash
set PERCY_TOKEN=<TOKEN_HERE>
```

### For Linux

```bash
export PERCY_TOKEN=<TOKEN_HERE>
```

## Running the tests

### Cypress

Opening the test runner.

```bash
yarn cy:open
```

## Built With

* [Cypress](https://www.cypress.io/) - The E2E test framework
* [Percy](https://www.cypress.io/) - visual testing all-in-one library/platform. 

## Contributing

N/A.
