# nearform-automated-tests
UI Tests for NearForm.com using [Playwright](https://playwright.dev/).

## How to install Playwright
Steps can be found [here](https://playwright.dev/docs/intro#installing-playwright)

## How to execute tests
- Running all tests:  
`npx playwright test`
- Running a single test file:  
`npx playwright test tests/<file_name>`

## How to view the test report
- To open last HTML report run:  
`npx playwright show-report`

## Screenshots 
Screenshots are captured after each test failure and can be found at **/test-results** folder.