export type DriveUploadInput = {
  filename: string;
  mimeType: string;
  base64Data: string;
  targetFolderId?: string | null;
};

export type DriveUploadResult = {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  webContentLink?: string;
};

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env ${name}`);
  return value;
}

export async function uploadImageToDrive(input: DriveUploadInput): Promise<DriveUploadResult> {
  const accessToken = requireEnv('GOOGLE_DRIVE_ACCESS_TOKEN');
  const folderId = input.targetFolderId ?? process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;
  const metadata = {
    name: input.filename,
    mimeType: input.mimeType,
    ...(folderId ? { parents: [folderId] } : {})
  };
  const boundary = `eden_${Date.now()}`;
  const imageBytes = Buffer.from(input.base64Data, 'base64');
  const body = Buffer.concat([
    Buffer.from(`--${boundary}\r\ncontent-type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n`),
    Buffer.from(`--${boundary}\r\ncontent-type: ${input.mimeType}\r\n\r\n`),
    imageBytes,
    Buffer.from(`\r\n--${boundary}--`)
  ]);

  const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,webViewLink,webContentLink', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
      'content-type': `multipart/related; boundary=${boundary}`
    },
    body
  });

  if (!response.ok) {
    throw new Error(`Drive upload failed: ${response.status} ${await response.text()}`);
  }

  return response.json() as Promise<DriveUploadResult>;
}
