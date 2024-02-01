using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace AzureFullstackPractice.Data;

public class BlobStorageService
{
  private readonly BlobServiceClient _client;

  public BlobStorageService(BlobServiceClient client)
  {
    _client = client;
  }

  public async Task UploadFileAsync(string containerName, string filePath, string userSub)
  {
    var blobContainer = _client.GetBlobContainerClient(containerName);
    await blobContainer.CreateIfNotExistsAsync();
    var blobClient = blobContainer.GetBlobClient(Path.GetFileName(filePath));
    await blobClient.UploadAsync(filePath, true);

    Dictionary<string, string> metadata = new Dictionary<string, string>();
    metadata.Add("userId", userSub);
    blobClient.SetMetadata(metadata);
  }

  public async Task deleteFileAsync(string containerName, string filePath)
  {
    var blobContainer = _client.GetBlobContainerClient(containerName);
    await blobContainer.CreateIfNotExistsAsync();
    var blobClient = blobContainer.GetBlobClient(Path.GetFileName(filePath));
    await blobClient.DeleteAsync();
  }
}