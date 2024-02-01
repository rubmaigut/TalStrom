using Azure.Storage.Blobs;

namespace AzureFullstackPractice.Data;

public class BlobStorageService
{
    private readonly BlobServiceClient _client;

    public BlobStorageService(BlobServiceClient client)
    {
        _client = client;
    }
}