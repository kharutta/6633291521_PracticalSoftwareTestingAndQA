import re

def valid_email(email):
    
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
    emailFormat = None
    # pass the regular expression
    # and the string into the fullmatch() method
    if(re.fullmatch(regex, email)):
        print("Valid Email")
        emailFormat == "valid"
        return True
    else:
        print("Invalid Email")
        emailFormat == "invalid"
        return False

    