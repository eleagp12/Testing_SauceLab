Feature: login functionality

Scenario: Succesful login
    Given I am on the login page 
    When I enter valid credentials 
    Then I check for any emergency windows
    Then I add a product to the cart
    Then I verify the cart contains the product

Scenario: User enter invalid credentials
    Given I am in the login page 
    When I enter invalid credentials 
    Then I should see an error message 
 