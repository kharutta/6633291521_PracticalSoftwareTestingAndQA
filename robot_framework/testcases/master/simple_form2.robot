*** Settings ***
Library    SeleniumLibrary
Test Teardown    Close All Browsers

*** Test Cases ***
Verify registration form with all input field
    [Tags]    All Input
    Open Browser    https://form.jotform.com/212934779973474     chrome
    Maximize Browser Window

    #Input firstname
    Wait Until Element Contains    //*[@id='header_1']    Student Registration Form
    Input text    //*[@id='input_48']    studentFirstName
    ${firstname}=    Get Value    //*[@id='input_48']
    Should Be Equal    ${firstname}    studentFirstName

    #Input lastname
    Input text    //*[@id='input_49']    studentLastName
    ${lastname}    Get Value    //*[@id='input_49']
    Should Be Equal    ${lastname}    studentLastName

    #Select gender
    Select From List by Value    //*[@id='input_3']    Male
    ${gender}    Get Value    //*[@id='input_3']
    Should Be Equal    ${gender}    Male

    #Input student id
    Input text    //*[@id='input_14']    6299999999
    ${student_id}    Get Value    //*[@id='input_14']
    Should Be Equal    ${student_id}    6299999999

    #Input mobile phone
    Input text    //*[@id='input_27_full']    0899999999
    ${mobile_number}    Get Value    //*[@id='input_27_full']
    Should Be Equal    ${mobile_number}    (089) 999-9999

    #Input email
    Input text    //*[@id='input_6']    studentName@chula.ac.th
    ${email}    Get Value    //*[@id='input_6']
    Should Be Equal    ${email}    studentName@chula.ac.th

    #Select study time
    Click Element  //*[@id='label_input_51_0']

    #Click submit
    Wait Until Element Is Visible    //*[@id='form-pagebreak-next_76']
    Click Element  //*[@id='form-pagebreak-next_76']

    #Verify message when registeration complete
    Wait Until Element Contains     //*[@id='text_84']    Your registration has been completed

# Verify registration form with single fault firstname
#     [Tags]     single fault firstname
#     Open Browser    https://form.jotform.com/212934779973474     chrome
#     Maximize Browser Window
#     Sleep    5
#     Wait Until Element Contains    //*[@id='header_1']    Student Registration Form
#     ${firstname}    Get Value    //*[@id='input_48']
#     Should Be Equal    ${firstname}    ${EMPTY}
#     Input text    //*[@id='input_49']    studentLastName
#     ${lastname}    Get Value    //*[@id='input_49']
#     Should Be Equal    ${lastname}    studentLastName
#     Select From List by Value    //*[@id='input_3']    Male
#     ${gender}    Get Value    //*[@id='input_3']
#     Should Be Equal    ${gender}    Male
#     Input text    //*[@id='input_14']    6299999999
#     ${student_id}    Get Value    //*[@id='input_14']
#     Should Be Equal    ${student_id}    6299999999
#     Input text    //*[@id='input_27_full']    0899999999
#     ${mobile_number}    Get Value    //*[@id='input_27_full']
#     Should Be Equal    ${mobile_number}    (089) 999-9999
#     Input text    //*[@id='input_6']    studentName@chula.ac.th
#     ${email}    Get Value    //*[@id='input_6']
#     Should Be Equal    ${email}    studentName@chula.ac.th
#     Sleep    5
#     Click Element  //*[@id='form-pagebreak-next_76']
#     Wait Until Element Contains    //*[@id='cid_48']//*[@class='form-error-message']    This field is required.
