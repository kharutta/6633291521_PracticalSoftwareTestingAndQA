*** Setting ***
Resource    ../../../keywords/ui/common/commonKeywords.robot
Resource    ../../../testdata/environment.robot
Resource    ../../../testdata/test_data_hotel_booking.robot

*** Keywords ***
Open browser registration form
    Open Browser    ${WEB_URL}    ${WEB_BROWSER}
    Maximize Browser Window
    Sleep    2

Wait registration load complete
    Wait Until Element Is Visible    //*[@id="comp-lt33fcq1"]

Scroll to bottom and wait
    Execute Javascript    window.scrollTo(0, document.body.scrollHeight)
    Sleep    2s

Verify firstname is empty
   ${firstname}    Get Value    //*[@id="input_comp-lt33fcq41"]
    Should Be Equal    ${firstname}    ${EMPTY}

Input and verify firstname
    Input text    //*[@id="input_comp-lt33fcq41"]    ${hotel_booking_firstname}
    ${firstname}=    Get Value    //*[@id="input_comp-lt33fcq41"]
    Should Be Equal    ${firstname}    ${hotel_booking_firstname}

Verify lastname is empty
    ${lastName}=    Get Value    //*[@id="input_comp-lt33fcs1"]
    Should Be Equal    ${lastName}    ${EMPTY}

Input and verify lastname
    Input text    //*[@id="input_comp-lt33fcs1"]    ${hotel_booking_lastname}
    ${lastName}=    Get Value    //*[@id="input_comp-lt33fcs1"]
    Should Be Equal    ${lastName}    ${hotel_booking_lastname}

Verify phone is empty
    ${phone}=    Get Value    //*[@id="input_comp-lt33fcsi1"]
    Should Be Equal    ${phone}    ${EMPTY}

Input and verify phone
    Input text    //*[@id="input_comp-lt33fcsi1"]    ${hotel_booking_mobile_phone}
    ${phone}=    Get Value    //*[@id="input_comp-lt33fcsi1"]
    Should Be Equal    ${phone}    ${hotel_booking_mobile_phone}

Verify email is empty
    ${emailAddress}=    Get Value    //*[@id="input_comp-lt33fcsf1"]
    Should Be Equal    ${emailAddress}    ${EMPTY}

Input and verify email
    Input text    //*[@id="input_comp-lt33fcsf1"]    ${hotel_booking_email}
    ${emailAddress}=    Get Value    //*[@id="input_comp-lt33fcsf1"]
    Should Be Equal    ${emailAddress}    ${hotel_booking_email}

Input and verify email with format check
    Input text    //*[@id="input_comp-lt33fcsf1"]    ${hotel_booking_email_invalid}
    ${emailAddress}=    Get Value    //*[@id="input_comp-lt33fcsf1"]
    ${isValid}=    Run Keyword And Return Status    Should Match Regexp    ${emailAddress}    ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$
    Should Be True    ${isValid}    Email format is invalid: ${emailAddress}

Verify numberOfAdult is empty
    ${numberOfAdult}=    Get Value    //*[@id="collection_comp-lt33fcsl1"]
    Should Be Equal    ${numberOfAdult}    ${EMPTY}

Select and verify numberOfAdult
    Click Element    //*[@id="collection_comp-lt33fcsl1"]
    Wait Until Element Contains   //*[@id="menuitem-1"]    2
    Click Element    //*[@id="menuitem-1"]
    ${numberOfAdult}=    Get Value    //*[@id="collection_comp-lt33fcsl1"]
    Should Be Equal    ${numberOfAdult}    ${number_of_adults}

Select pet option
    Click Element    //div[@data-testid="radioGroup"]//*[text()="Yes"]

Select and verify note
    Input text    //*[@id="input_comp-lt33fct3"]    ${hotel_booking_note}
    ${note}=    Get Value    //*[@id="input_comp-lt33fct3"]
    Should Be Equal    ${note}    ${hotel_booking_note}

Click accept term
    Click Element  //*[@id="comp-ltubl84u"]

Click submit form
    Click Element  //*[@class="l7_2fn wixui-button__label"]

Verify success submit message
    Wait Until Element Contains    xpath=//*[contains(text(),'Thanks for submitting!')]    ${test_data_sccess_submit_message}

Verify missing input message
    [Arguments]    ${element_id}    ${expected_message}
    ${message}=    Execute Javascript    return document.getElementById("${element_id}").validationMessage;
    Should Be Equal    ${message}    ${expected_message}
