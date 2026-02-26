*** Settings ***
Library    SeleniumLibrary
Resource    ../../testdata/environment.robot
Resource    ../../keywords/ui/page/homepage.robot
Test Teardown    Close All Browsers

*** Test Cases ***
Verify registration form with all input
    [Tags]    valid
    Open browser student registration form
    Wait student registration load complete
    Input and verify firstname
    Input and verify lastname
    Input and verify gender with male
    Input and verify student_id
    Input and verify mobile_number
    Input and verify email
    Click study time
    Click submit application
    Verify message after click submit form
    Reload Page

Verify registration form with single fault
# Verify registration form with single fault firstname
    [Tags]     invalid
    Open browser student registration form
    Wait student registration load complete
    Verify firstname is empty
    Input and verify lastname
    Input and verify gender with male
    Input and verify student_id
    Input and verify mobile_number
    Input and verify email
    Click study time
    Click submit application
    Verify require field firstname
    Reload Page

# Verify registration form with single fault lastname
    Wait student registration load complete
    Input and verify firstname
    Verify lastname is empty
    Input and verify gender with male
    Input and verify student_id
    Input and verify mobile_number
    Input and verify email
    Click study time
    Click submit application
    Verify require field lastname
    Reload Page

# Verify registration form with single fault gender
    Wait student registration load complete
    Input and verify firstname
    Input and verify lastname
    Input and verify student_id
    Input and verify mobile_number
    Input and verify email
    Click study time
    Click submit application
    Verify require field gender
    Reload Page

# Verify registration form with single fault student id
    Wait student registration load complete
    Input and verify firstname
    Input and verify lastname
    Input and verify gender with male
    Input and verify mobile_number
    Input and verify email
    Click study time
    Click submit application
    Verify require field student id
    Reload Page

# Verify registration form with single fault mobile number
    Wait student registration load complete
    Input and verify firstname
    Input and verify lastname
    Input and verify gender with male
    Input and verify student_id
    Input and verify email
    Click study time
    Click submit application
    Verify require field mobile number
    Reload Page

# Verify registration form with single fault email
    Wait student registration load complete
    Input and verify firstname
    Input and verify lastname
    Input and verify gender with male
    Input and verify mobile_number
    Input and verify student_id
    Click study time
    Click submit application
    Verify require field email
    Reload Page

# Verify registration form with single fault study time
    Wait student registration load complete
    Input and verify firstname
    Input and verify lastname
    Input and verify gender with male
    Input and verify mobile_number
    Input and verify student_id
    Input and verify email
    Click submit application
    Verify require field study time
    Reload Page
