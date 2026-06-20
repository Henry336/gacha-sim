// I have no idea how any of these works at the moment. 
// The description is given below if anyone wants to read:

// This file provides two functions: encryptToken and decryptToken. 
// They use AES-256-CBC encryption to securely encrypt and decrypt the Canvas API token. 
// The encryption key is derived from the ENCRYPTION_KEY environment variable, 
// which should be a 32-byte hex string. 
// Each encrypted token includes a randomly generated Initialization Vector (IV) 
// to ensure that the same token will produce different encrypted outputs each time, enhancing security. 
// The IV is stored alongside the encrypted token, allowing for proper decryption later on.

const crypto = require('crypto');

// AES-256 requires a 32-byte key. We convert your hex string from .env into a Buffer.
const algorithm = 'aes-256-cbc';
const secretKey = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');

const encryptToken = (plainTextToken) => {
  // Generate a random Initialization Vector (IV) for every single encryption
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  
  let encrypted = cipher.update(plainTextToken, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  // Store both the IV and the encrypted text together, separated by a colon
  return iv.toString('hex') + ':' + encrypted;
};

const decryptToken = (encryptedData) => {
  const parts = encryptedData.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedText = parts[1];
  
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
};

module.exports = { encryptToken, decryptToken };