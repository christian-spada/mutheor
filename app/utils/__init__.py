# ===== VALIDATION =====
def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


def validation_errors_to_dict(validation_errors):
    return {k: v for k in validation_errors for v in validation_errors[k]}


def entity_not_found(entity):
    return {"errors": f"{entity} not found"}, 400


def not_authorized():
    return {"errors": "You are not authorized for this action"}, 403


def bad_request(errors):
    return {"errors": validation_errors_to_dict(errors)}, 400


def attach_csrf_token(form, request):
    form["csrf_token"].data = request.cookies["csrf_token"]


# ===== GENERAL =====
def logger(label, item):
    print("============== * ===============")
    print(label.upper() + " ->", item)
    print("============== * ===============")
