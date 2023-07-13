def entity_not_found(entity):
    return {"errors": f"{entity} not found"}, 400


def not_authorized():
    return {"errors": "You are not authorized for this action"}, 403
