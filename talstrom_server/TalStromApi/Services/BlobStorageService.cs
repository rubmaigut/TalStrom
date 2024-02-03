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

    private async Task AddThumbnailToStorage(Stream myBlob, string name)
    {
        // var blobContainer = _client.GetBlobContainerClient("thumbnails");
        // await blobContainer.CreateIfNotExistsAsync();
        // TODO - Create a jpeg snapshot of frame
        Stream thumbnail = await GenerateThumbnail(myBlob, 30, 30, true);
        string thumbnailPath = "/";
        using (BinaryWriter bw = new BinaryWriter(new FileStream(thumbnailPath, FileMode.Create, FileAccess.Write)))
        {
            bw.Write(ReadStream(thumbnail));
        }
        // await using (var stream = File.Create($"{name}.jpg"))
        // {
        //     await thumbnail.CopyToAsync(stream);
        // }

        // var blobClient = blobContainer.GetBlobClient(Path.GetFileName(name));
        // await blobClient.UploadAsync(name, true);
    }

    private async Task<Stream> GenerateThumbnail(Stream videoStream, int width, int height, bool smartCropping)
    {
        ComputerVisionClient cvClient =
            new ComputerVisionClient(new ApiKeyServiceClientCredentials("2d59e32ce43f4a49b0191d5b07bb09bc"))
                { Endpoint = "https://talstromcomputervision.cognitiveservices.azure.com/" };
        return await cvClient.GenerateThumbnailInStreamAsync(width, height, videoStream, smartCropping);
    }

    private byte[] ReadStream(Stream input)
    {
        byte[] buffer = new byte[16 * 1024];
        using (MemoryStream memoryStream = new MemoryStream())
        {
            int read;
            while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
            {
                memoryStream.Write(buffer, 0, read);
            }

            return memoryStream.ToArray();
        }
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

        var blobs = blobContainer.GetBlobs(BlobTraits.Metadata);
        var video = blobs.FirstOrDefault(blob => blob.Name == filePath);

        // //Create a thumbnail and add to separate blob storage
        // Stream stream = new MemoryStream(video.Properties.ContentHash);
        // await AddThumbnailToStorage(stream, filePath);

        // Return video data to controller
        var filePathSplit = filePath.Split('.');
        var fileName = filePathSplit.First();
        var fileFormat = $".{filePathSplit.Last()}";

        Console.WriteLine($"BLOB URL: {blobClient.Uri}");
        return await Task.FromResult(new VideoBlobResponseDTO(fileName, fileFormat,
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