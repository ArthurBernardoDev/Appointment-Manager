namespace AppointmentManager.Services;

using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using Microsoft.Extensions.Configuration;

public class S3Service : IS3Service
{
    private readonly IAmazonS3 _s3Client;
    private readonly string? _bucketName;

      public S3Service(IConfiguration config)
    {
        var accessKey = config["AWS:AccessKey"];
        var secretKey = config["AWS:SecretKey"];
        _bucketName = config["AWS:BucketName"];
        var region = RegionEndpoint.GetBySystemName(config["AWS:Region"]);
        _s3Client = new AmazonS3Client(accessKey, secretKey, region);
    }

    public async Task<string> UploadImageAsync(Stream fileStream, string fileName, string contentType)
    {
        if (fileStream == null || fileStream.Length == 0)
            throw new ArgumentException("Arquivo inválido.");

        var fileKey = $"{Guid.NewGuid()}-{fileName}";
        var uploadRequest = new TransferUtilityUploadRequest
        {
            InputStream = fileStream,
            Key = fileKey,
            BucketName = _bucketName,
            ContentType = contentType
        };

        using var transferUtility = new TransferUtility(_s3Client);
        await transferUtility.UploadAsync(uploadRequest);

        return $"https://{_bucketName}.s3.amazonaws.com/{fileKey}";
    }
}