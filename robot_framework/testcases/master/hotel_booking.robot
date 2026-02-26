*** Settings ***
Library    SeleniumLibrary
Resource    ../../testdata/environment.robot
Resource    ../../testdata/test_data_hotel_booking.robot
Resource    ../../keywords/ui/page/hotel_booking.robot
Test Teardown    Close All Browsers

*** Test Cases ***
Verify registration form with all input field
    [Tags]    All Input
    Open browser registration form
    Wait registration load complete
    Input and verify firstname
    Input and verify lastname
    Input and verify phone
    Input and verify email
    Scroll to bottom and wait
    Select and verify numberOfAdult
    Select pet option
    Select and verify note
    Click accept term
    Click submit form
    Verify success submit message

Verify registration form with single fault firstname
    [Tags]     single fault firstname
    Open browser registration form
    Wait registration load complete
    Verify firstname is empty
    Input and verify lastname
    Input and verify phone
    Input and verify email
    Scroll to bottom and wait
    Verify numberOfAdult is empty
    Click accept term
    Click submit form
    Verify missing input message    input_comp-lt33fcq41    ${test_data_missing_input_message}

Verify registration form with single fault lastname
    [Tags]     single fault lastname
    Open browser registration form
    Wait registration load complete
    Input and verify firstname
    Verify lastname is empty
    Input and verify phone
    Input and verify email
    Scroll to bottom and wait
    Verify numberOfAdult is empty
    Click accept term
    Click submit form
    Verify Missing Input message    input_comp-lt33fcs1    ${test_data_missing_input_message}

Verify registration form with single fault phone
    [Tags]     single fault phone
    Open browser registration form
    Wait registration load complete
    Input and verify firstname
    Input and verify lastname
    Verify phone is empty
    Input and verify email
    Scroll to bottom and wait
    Verify numberOfAdult is empty
    Click accept term
    Click submit form
    Verify missing input message    input_comp-lt33fcsi1    ${test_data_missing_input_message}

Verify registration form with single fault email
    [Tags]     single fault email
    Open browser registration form
    Wait registration load complete
    Input and verify firstname
    Input and verify lastname
    Input and verify phone
    Verify email is empty
    Scroll to bottom and wait
    Verify numberOfAdult is empty
    Click accept term
    Click submit form
    Verify missing input message    input_comp-lt33fcsf1    ${test_data_missing_input_message}

Verify registration form with single fault numberOfAdult
    [Tags]     single fault numberOfAdult
    Open browser registration form
    Wait registration load complete
    Input and verify firstname
    Input and verify lastname
    Input and verify phone
    Input and verify email
    Scroll to bottom and wait
    Verify numberOfAdult is empty
    Click accept term
    Click submit form
    Verify missing input message   collection_comp-lt33fcsl1    ${test_data_missing_dropdown_option_message}

Verify registration form with wrong email format
    [Tags]    All Input
    Open browser registration form
    Wait registration load complete
    Input and verify firstname
    Input and verify lastname
    Input and verify phone
    Input and verify email with format check
    Scroll to bottom and wait
    Select and verify numberOfAdult
    Select pet option
    Select and verify note
    Click accept term
    Click submit form
    Verify missing input message    input_comp-lt33fcsf1    ${test_data_invalid_email_message}