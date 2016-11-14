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

        public BlobHelper() : this("krunkds") { }

        public BlobHelper(string ContainerName)
        {
            _storageAccount = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting("StorageConnectionString"));
            _blobClient = _storageAccount.CreateCloudBlobClient();
            _container = _blobClient.GetContainerReference(ContainerName);
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

        public byte[] GetBlob(string FileName)
        {
            try
            {
                CloudBlockBlob blockBlob = _container.GetBlockBlobReference(FileName);
                blockBlob.FetchAttributes();

                byte[] bytes = new byte[blockBlob.Properties.Length];

                blockBlob.DownloadRangeToByteArray(bytes, 0, 0, blockBlob.Properties.Length);
                return bytes;
            }
            catch (Exception)
            {
                return new byte[] { };
            }
            
        }

        public byte[] GetProfilePicture(string FileName)
        {
            if(string.IsNullOrEmpty(FileName))
            {
                FileName = "avatar.jpg";
            }

            return this.GetBlob(FileName);
        }

        public void DeleteBlob(string FileName)
        {
            try
            {
                CloudBlockBlob blockBlob = _container.GetBlockBlobReference(FileName);
                blockBlob.Delete();
            }
            catch (Exception) { }
        }
    }
}
