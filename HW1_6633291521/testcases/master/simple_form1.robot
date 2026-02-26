*** Settings ***
Library    SeleniumLibrary
Test Teardown    Close All Browsers

*** Test Cases ***
Verify registration form with all input field
    [Tags]    All Input
    Open Browser    https://form.jotform.com/212934779973474    chrome
    Maximize Browser Window

    #Input firstname
    Wait Until Element Contains    //*[@id='header_1']    Student Registration Form
    Input text    //*[@id='input_48']    studentFirstName
    ${firstname}=    Get Value    //*[@id='input_48']
    Should Be Equal    ${firstname}    studentFirstName
