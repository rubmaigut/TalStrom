using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using TalStromApi.DTO;

namespace TalStromApi.Services;

public class BlobStorageService(BlobServiceClient client)
{
    public async Task<VideoBlobResponseDTO> UploadFileAsync(string containerName, string filePath, string userSub)
    {
        var blobContainer = client.GetBlobContainerClient(containerName);
        await blobContainer.CreateIfNotExistsAsync();
        
        var blobClient = blobContainer.GetBlobClient(Path.GetFileName(filePath));
        var blobHttpHeader = new BlobHttpHeaders { ContentType = "video/mp4" };
        await blobClient.UploadAsync(filePath, new BlobUploadOptions { HttpHeaders = blobHttpHeader });

        // Add metadata
        var metadata = new Dictionary<string, string>();
        metadata.Add("userId", userSub);
        await blobClient.SetMetadataAsync(metadata);

        var video = blobContainer.GetBlobs(BlobTraits.Metadata)
            .FirstOrDefault(blob => blob.Name == filePath);
        var fileName = filePath.Split('.')
            .First();

        return await Task.FromResult(new VideoBlobResponseDTO(fileName, video.Properties.ContentType,
            blobClient.Uri.ToString()));
    }

    public async Task DeleteFileAsync(string containerName, string filePath)
    {
        try
        {
            var blobContainer = client.GetBlobContainerClient(containerName);
            var blobClient = blobContainer.GetBlobClient(Path.GetFileName(filePath));
            await blobClient.DeleteAsync();
        }
        catch (FileNotFoundException error)
        {
            throw error;
        }
    }
}