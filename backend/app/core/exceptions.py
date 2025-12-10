from fastapi import HTTPException, status


class UnauthorizedException(HTTPException):
    """
    Exception raised for authentication and authorization failures.
    Returns 401 Unauthorized status code.
    """
    def __init__(self, detail: str = "Not authenticated"):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=detail,
            headers={"WWW-Authenticate": "Bearer"},
        )


class NotFoundException(HTTPException):
    """
    Exception raised when a requested resource is not found.
    Returns 404 Not Found status code.
    """
    def __init__(self, detail: str = "Resource not found"):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=detail,
        )


class BadRequestException(HTTPException):
    """
    Exception raised for invalid client requests.
    Returns 400 Bad Request status code.
    """
    def __init__(self, detail: str = "Bad request"):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=detail,
        )


class ForbiddenException(HTTPException):
    """
    Exception raised when user lacks required permissions.
    Returns 403 Forbidden status code.
    """
    def __init__(self, detail: str = "Forbidden"):
        super().__init__(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=detail,
        )


class InternalServerErrorException(HTTPException):
    """
    Exception raised for unexpected server errors.
    Returns 500 Internal Server Error status code.
    """
    def __init__(self, detail: str = "Internal server error"):
        super().__init__(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=detail,
        )
