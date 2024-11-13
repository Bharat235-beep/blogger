import fs from 'fs'

const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete file at ${filePath}:`, err.message);
      } else {
        console.log(`File deleted successfully at ${filePath}`);
      }
    });
  };
  export default deleteFile