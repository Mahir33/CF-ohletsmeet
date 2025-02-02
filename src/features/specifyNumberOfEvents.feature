Feature: Specify number of events

  Scenario: User does not type in the number-of-events field
    Given I am a user
    When I do not type in the number-of-events field
    Then the default number of events should be shown

  Scenario: User types in the number-of-events field
    Given I am a user
    When I type a number on number-of-events field
    Then I should be able to see a list of events with the number I typed as the length