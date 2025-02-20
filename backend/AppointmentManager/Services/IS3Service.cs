namespace AppointmentManager.Services;

public interface IS3Service
{
    Task<string> UploadImageAsync(Stream fileStream, string fileName, string contentType);
}