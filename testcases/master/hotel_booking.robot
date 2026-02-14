*** Settings ***
Library    SeleniumLibrary
Resource    ../../testdata/environment.robot
Resource    ../../testdata/test_data_hotel_booking.robot
Test Teardown    Close All Browsers

*** Test Cases ***
Verify registration form with all input field
    [Tags]    All Input
    Open Browser    ${WEB_URL}     ${WEB_BROWSER}
    Maximize Browser Window
    
    Wait Until Element Is Visible    //*[@id="comp-lt33fcq1"]

    Input text    //*[@id="input_comp-lt33fcq41"]    firstName
    ${firstname}=    Get Value    //*[@id="input_comp-lt33fcq41"]
    Should Be Equal    ${firstname}    ${hotel_booking_firstname}

    Input text    //*[@id="input_comp-lt33fcs1"]    lastName
    ${lastName}=    Get Value    //*[@id="input_comp-lt33fcs1"]
    Should Be Equal    ${lastName}    ${hotel_booking_lastname}

    Input text    //*[@id="input_comp-lt33fcsi1"]    000000000
    ${phone}=    Get Value    //*[@id="input_comp-lt33fcsi1"]
    Should Be Equal    ${phone}    ${hotel_booking_mobile_phone}

    Input text    //*[@id="input_comp-lt33fcsf1"]    studentName@chula.ac.th
    ${emailAddress}=    Get Value    //*[@id="input_comp-lt33fcsf1"]
    Should Be Equal    ${emailAddress}    ${hotel_booking_email}

    Execute Javascript    window.scrollTo(0, document.body.scrollHeight)
    Sleep    2s

    Click Element    //*[@id="collection_comp-lt33fcsl1"]
    Wait Until Element Is Visible    //*[@id="menuitem-1"]
    Click Element    //*[@id="menuitem-1"]
    ${numberOfAdult}=    Get Value    //*[@id="collection_comp-lt33fcsl1"]
    Should Be Equal    ${numberOfAdult}    ${number_of_adults}

    Click Element    //div[@data-testid="radioGroup"]//*[text()="Yes"]

    Input text    //*[@id="input_comp-lt33fct3"]    note
    ${note}=    Get Value    //*[@id="input_comp-lt33fct3"]
    Should Be Equal    ${note}    ${hotel_booking_note}

    # accept term
    Click Element  //*[@id="comp-ltubl84u"]

    # submit
    Click Element  //*[@class="l7_2fn wixui-button__label"]
    Wait Until Element Contains     //*[@class="wixui-rich-text__text wixui-rich-text__text wixui-rich-text__text"]    ${test_data_sccess_submit_message}