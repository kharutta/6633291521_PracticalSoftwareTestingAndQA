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
    Verify missing input message

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
    Verify missing input message

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
    Verify missing input message

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
    Verify missing input message

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
    Verify missing input message