using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using TalStromApi.DTO;
using TalStromApi.Models;

namespace AzureFullstackPractice.Data;

public class BlobStorageService
{
    private readonly BlobServiceClient _client;

    public BlobStorageService(BlobServiceClient client)
    {
        _client = client;
    }

    public Task<List<Video>> GetAllVideos(string containerName)
    {
        // var blobContainer = _client.GetBlobContainerClient(containerName);
        // var blobs = blobContainer.GetBlobs();
        //
        // var videos = blobs.Select(blob => new Video(blob.Name, blob.Properties.ContentLength,
        //     blob.Properties.ContentType,
        //     blob.Properties.ContentHash, blob.Metadata["userId"])).ToList();
        //
        // return Task.FromResult(videos);
        throw new NotImplementedException();
    }

    public Task<List<Video>> GetVideosById(string containerName, string userId)
    {
        // //userID is currently set to being user SUB.
        // var blobContainer = _client.GetBlobContainerClient(containerName);
        // var blobs = blobContainer.GetBlobs(BlobTraits.Metadata);
        //
        // var videos = blobs.Where(blob => blob.Metadata.Values.Contains(userId)).Select(blob => new Video(blob.Name,
        //     blob.Properties.ContentLength, blob.Properties.ContentType,
        //     blob.Properties.ContentHash, blob.Metadata["userId"])).ToList();
        //
        // return Task.FromResult(videos);
        throw new NotImplementedException();
    }

    public async Task<VideoBlobResponseDTO> UploadFileAsync(string containerName, string filePath, string userSub)
    {
        var blobContainer = _client.GetBlobContainerClient(containerName);
        await blobContainer.CreateIfNotExistsAsync();
        var blobClient = blobContainer.GetBlobClient(Path.GetFileName(filePath));
        await blobClient.UploadAsync(filePath, true);

        Dictionary<string, string> metadata = new Dictionary<string, string>();
        metadata.Add("userId", userSub);
        await blobClient.SetMetadataAsync(metadata);

        // Return video data to controller
        var blobs = blobContainer.GetBlobs(BlobTraits.Metadata);

        var video = blobs.FirstOrDefault(blob => blob.Name == filePath);
        var filePathsplit = filePath.Split('.');
        var fileName = filePathsplit.First();
        var fileformat = $".{filePathsplit.First()}";


        return await Task.FromResult(new VideoBlobResponseDTO(fileName,
            video.Properties.ContentLength, fileformat,
            video.Properties.ContentHash));
    }

    public async Task DeleteFileAsync(string containerName, string filePath)
    {
        var blobContainer = _client.GetBlobContainerClient(containerName);
        await blobContainer.CreateIfNotExistsAsync();
        var blobClient = blobContainer.GetBlobClient(Path.GetFileName(filePath));
        await blobClient.DeleteAsync();
    }
}