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
        var contentType = filePath.EndsWith(".mp4") ? "video/mp4" : filePath.EndsWith(".jpg") ? "image/jpg" : "";
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
    
    public async Task<string> UploadPdfAsync(string containerName, IFormFile pdfFile, string userSub)
    {
        var blobContainer = client.GetBlobContainerClient(containerName);
        await blobContainer.CreateIfNotExistsAsync(PublicAccessType.Blob);

        var blobClient = blobContainer.GetBlobClient(pdfFile.FileName);
        var contentType = "application/pdf";
        await using (var stream = pdfFile.OpenReadStream())
        {
            await blobClient.UploadAsync(stream, new BlobUploadOptions { HttpHeaders = new BlobHttpHeaders { ContentType = contentType } });
        }

        // Add metadata
        var metadata = new Dictionary<string, string> { { "userId", userSub } };
        await blobClient.SetMetadataAsync(metadata);

        return blobClient.Uri.ToString();
    }
}