*** Settings ***
Library    SeleniumLibrary
Test Teardown    Close All Browsers

*** Test Cases ***
Verify registration form with all input field
    [Tags]    All Input
    Open Browser    https://panaryco.wixsite.com/myhotel    safari
    Maximize Browser Window
    sleep    5
    
    Wait Until Element Is Visible    //*[@id="comp-lt33fcq1"]

    Input text    //*[@id="input_comp-lt33fcq41"]    firstName
    ${firstname}=    Get Value    //*[@id="input_comp-lt33fcq41"]
    Should Be Equal    ${firstname}    firstName

    Input text    //*[@id="input_comp-lt33fcs1"]    lastName
    ${lastName}=    Get Value    //*[@id="input_comp-lt33fcs1"]
    Should Be Equal    ${lastName}    lastName

    Input text    //*[@id="input_comp-lt33fcsi1"]    000000000
    ${phone}=    Get Value    //*[@id="input_comp-lt33fcsi1"]
    Should Be Equal    ${phone}    000000000

    Input text    //*[@id="input_comp-lt33fcsf1"]    studentName@chula.ac.th
    ${emailAddress}=    Get Value    //*[@id="input_comp-lt33fcsf1"]
    Should Be Equal    ${emailAddress}    studentName@chula.ac.th

    Execute Javascript    window.scrollTo(0, document.body.scrollHeight)
    Sleep    1s

    Click Element    //*[@id="collection_comp-lt33fcsl1"]
    Wait Until Element Contains    //*[@id="menuitem-1"]    2
    Click Element    //*[@id="menuitem-1"]

    Click Element    //div[@data-testid="radioGroup"]//*[text()="Yes"]

    Input text    //*[@id="input_comp-lt33fct3"]    note
    ${note}=    Get Value    //*[@id="input_comp-lt33fct3"]
    Should Be Equal    ${note}    note

    # accept term
    Click Element  //*[@id="comp-ltubl84u"]

    # submit
    Click Element  //*[@class="l7_2fn wixui-button__label"]
