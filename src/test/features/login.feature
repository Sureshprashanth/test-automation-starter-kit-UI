Feature: User Authentication
  As a user
  I want to be able to log in to the application
  So that I can access my account

  Background:
    Given User is on the login page

  @smoke @login @critical
  Scenario: Successful login with valid credentials
    When User enters username "student"
    And User enters password "Password123"
    And User clicks the login button
    Then User should see the dashboard

  @regression @login
  Scenario: Login page is displayed correctly
    Then Login page should be visible
    And Login page should contain username field
    And Login page should contain password field
    And Login page should contain login button
