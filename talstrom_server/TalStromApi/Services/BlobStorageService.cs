using Azure.Storage.Blobs;

namespace AzureFullstackPractice.Data;

public class BlobStorageService
{
    private readonly BlobServiceClient _client;

    public BlobStorageService(BlobServiceClient client)
    {
        _client = client;
    }

    public async Task UploadFileAsync(string containerName, string filePath)
    {
        var blobContainer = _client.GetBlobContainerClient(containerName);
        await blobContainer.CreateIfNotExistsAsync();
        var blobClient = blobContainer.GetBlobClient(Path.GetFileName(filePath));
        await blobClient.UploadAsync(filePath, true);
    }
}