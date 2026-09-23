import {
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const required=[
  "AWS_REGION",
  "AWS_ENDPOINT_URL_S3",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY"
] as const;

export function storageConfigured(){
  return required.every(key=>Boolean(process.env[key]));
}

export function maxUploadBytes(){
  const configured=Number(process.env.STORAGE_MAX_UPLOAD_BYTES??"52428800");
  return Number.isFinite(configured)&&configured>0?configured:52_428_800;
}

let client:S3Client|undefined;

export function getStorageClient(){
  if(!storageConfigured()) throw new Error("Object storage is not configured.");
  if(!client){
    client=new S3Client({
      region:process.env.AWS_REGION!,
      endpoint:process.env.AWS_ENDPOINT_URL_S3!,
      credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY!
      },
      forcePathStyle:true,
      requestChecksumCalculation:"WHEN_REQUIRED"
    });
  }
  return client;
}

export async function presignUpload(input:{
  bucket:string;
  key:string;
  contentType:string;
  expiresIn?:number;
}){
  const url=await getSignedUrl(
    getStorageClient(),
    new PutObjectCommand({
      Bucket:input.bucket,
      Key:input.key,
      ContentType:input.contentType
    }),
    {expiresIn:input.expiresIn??300}
  );
  return {
    url,
    method:"PUT" as const,
    headers:{"Content-Type":input.contentType}
  };
}

export async function presignDownload(input:{
  bucket:string;
  key:string;
  fileName?:string|null;
  expiresIn?:number;
}){
  return getSignedUrl(
    getStorageClient(),
    new GetObjectCommand({
      Bucket:input.bucket,
      Key:input.key,
      ResponseContentDisposition:input.fileName
        ? `inline; filename*=UTF-8''${encodeURIComponent(input.fileName)}`
        : undefined
    }),
    {expiresIn:input.expiresIn??300}
  );
}

export async function headObject(input:{bucket:string;key:string}){
  return getStorageClient().send(new HeadObjectCommand({
    Bucket:input.bucket,
    Key:input.key
  }));
}
