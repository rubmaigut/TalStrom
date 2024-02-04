using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using TalStromApi.DTO;
using TalStromApi.Models;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace AzureFullstackPractice.Data;

public class BlobStorageService
{
    private readonly BlobServiceClient _client;

    public BlobStorageService(BlobServiceClient client)
    {
        _client = client;
    }

    public async Task<VideoBlobResponseDTO> UploadFileAsync(string containerName, string filePath, string userSub)
    {
        var blobContainer = _client.GetBlobContainerClient(containerName);
        await blobContainer.CreateIfNotExistsAsync();
        var blobClient = blobContainer.GetBlobClient(Path.GetFileName(filePath));
        var blobHttpHeader = new BlobHttpHeaders { ContentType = "video/mp4" };
        
        await blobClient.UploadAsync(filePath, new BlobUploadOptions { HttpHeaders = blobHttpHeader });

        Dictionary<string, string> metadata = new Dictionary<string, string>();
        metadata.Add("userId", userSub);
        await blobClient.SetMetadataAsync(metadata);

        var blobs = blobContainer.GetBlobs(BlobTraits.Metadata);
        var video = blobs.FirstOrDefault(blob => blob.Name == filePath);

        // //Create a thumbnail and add to separate blob storage
        // Stream stream = new MemoryStream(video.Properties.ContentHash);
        // await AddThumbnailToStorage(stream, filePath);
        
        var filePathSplit = filePath.Split('.');
        
        return await Task.FromResult(new VideoBlobResponseDTO(filePathSplit.First(), video.Properties.ContentType,
            blobClient.Uri.ToString()));
    }

    public async Task DeleteFileAsync(string containerName, string filePath)
    {
        var blobContainer = _client.GetBlobContainerClient(containerName);
        await blobContainer.CreateIfNotExistsAsync();
        var blobClient = blobContainer.GetBlobClient(Path.GetFileName(filePath));
        await blobClient.DeleteAsync();
    }
}