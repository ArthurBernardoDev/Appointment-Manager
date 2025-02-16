using System;

namespace AppointmentManager.Exceptions
{
    public class JwtKeyNotFoundException() : Exception("JWT Key is missing in configuration.");

    public class UserAlreadyExistsException(string email) : Exception($"A user with email '{email}' already exists.");

    public class InvalidCredentialsException() : Exception("Invalid email or password.");
}