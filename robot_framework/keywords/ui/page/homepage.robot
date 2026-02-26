*** Setting ***
Resource    ../../../keywords/ui/common/commonKeywords.robot
Resource    ../../../testdata/environment.robot
Resource    ../../../testdata/test_data.robot

*** Keywords ***
Open browser student registration form
    Open Browser    ${WEB_URL}    ${WEB_BROWSER}
    Maximize Browser Window
    Sleep    2

Wait student registration load complete
    Wait Until Element Contains    //*[@id='header_1']    ${test_data_form_name} 

Verify firstname is empty
   ${firstname}    Get Value    //*[@id='input_48']
    Should Be Equal    ${firstname}    ${EMPTY}

Input and verify firstname
    Input text    //*[@id='input_48']    ${test_data_firstname} 
    ${firstname}    Get Value    //*[@id='input_48']
    Should Be Equal    ${firstname}    ${test_data_firstname} 

Input and verify lastname
    Input text    //*[@id='input_49']    ${test_data_firstname}
    ${lastname}    Get Value    //*[@id='input_49']
    Should Be Equal    ${lastname}    ${test_data_firstname}

Input and verify gender with male
    Select From List by Value    //*[@id='input_3']    ${test_data_gender}
    ${gender}    Get Value    //*[@id='input_3']
    Should Be Equal    ${gender}    ${test_data_gender}

Input and verify student_id
    Input text    //*[@id='input_14']    ${test_data_student_id}
    ${student_id}    Get Value    //*[@id='input_14']
    Should Be Equal    ${student_id}    ${test_data_student_id}

Input and verify mobile_number
    Input text    //*[@id='input_27_full']    ${test_data_mobile_number}
    ${mobile_number}    Get Value    //*[@id='input_27_full']
    Should Be Equal    ${mobile_number}    (089) 999-9999

Input and verify email
    Input text    //*[@id='input_6']    ${test_data_email} 
    ${email}    Get Value    //*[@id='input_6']
    Should Be Equal    ${email}    ${test_data_email} 

Select and verify courses
    Select From List by Value    //*[@id='input_46']    ${test_data_courses}
    ${courses}    Get Value    //*[@id='input_46']
    Should Be Equal    ${courses}    ${test_data_courses}

Click study time
    Click Element  //*[@id='label_input_51_0']

Click submit application
    Wait Until Element Is Visible    //*[@id='form-pagebreak-next_76']
    Click Element  //*[@id='form-pagebreak-next_76']

Verify firstname display error message
    Wait Until Element Contains    //*[@id='cid_48']//*[@class='form-error-message']    ${test_data_error_message}

Verify lastname display error message
    Wait Until Element Contains    //*[@id='cid_49']//*[@class='form-error-message']    ${test_data_error_message}

Verify gender display error message
    Wait Until Element Contains    //*[@id='cid_3']//*[@class='form-error-message']    ${test_data_error_message}

Verify student_id display error message
    Wait Until Element Contains    //*[@id='id_14']//*[@class='form-error-message']    ${test_data_error_message}

Verify mobile display error message
    Wait Until Element Contains    //*[@id='cid_27']//*[@class='form-error-message']    ${test_data_error_message}

Verify email display error message
    Wait Until Element Contains    //*[@id='cid_6']//*[@class='form-error-message']    ${test_data_error_message}

Verify study time display error message
    Wait Until Element Contains    //*[@id='cid_51']//*[@class='form-error-message']    ${test_data_error_message}

Verify message after click submit form
    Wait Until Element Contains    //*[@id='cid_84']    ${test_data_sccess_submit_message} 