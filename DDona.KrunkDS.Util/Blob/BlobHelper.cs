using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System.IO;

namespace DDona.KrunkDS.Util.Blob
{
    /// <summary>
    /// <seealso cref="https://azure.microsoft.com/pt-br/documentation/articles/storage-dotnet-how-to-use-blobs/"/>
    /// </summary>
    public class BlobHelper
    {
        private CloudStorageAccount _storageAccount;
        private CloudBlobClient _blobClient;
        private CloudBlobContainer _container;

        public List<string> Errors { get; set; }

        public BlobHelper()
        {
            _storageAccount = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting("StorageConnectionString"));
            _blobClient = _storageAccount.CreateCloudBlobClient();
            _container = _blobClient.GetContainerReference("krunkds");
        }

        public bool UploadBlob(byte[] File, string FileName)
        {
            CloudBlockBlob blockBlob = _container.GetBlockBlobReference(FileName);
            try
            {
                blockBlob.UploadFromByteArray(File, 0, File.Length);
                return true;
            } catch(Exception ex)
            {
                Errors.Add(ex.Message);
                return false;
            }
        }
    }
}
