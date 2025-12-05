/**
 * AWS Services Integration for StockPilot
 * 
 * This file provides utilities for integrating with the 9 AWS services:
 * 1. AWS Amplify - Frontend (configured in Amplify Console)
 * 2. Amazon EC2 - This server runs on EC2
 * 3. Amazon RDS - Database (configured via DATABASE_URL)
 * 4. Amazon S3 - Image storage
 * 5. Amazon CloudFront - CDN (configured in AWS Console)
 * 6. Amazon Cognito - User authentication
 * 7. Amazon CloudWatch - Logging and monitoring
 * 8. AWS Systems Manager Parameter Store - Secrets management
 * 9. Amazon SNS - Notifications and alerts
 */

import { 
  S3Client, 
  PutObjectCommand, 
  GetObjectCommand, 
  DeleteObjectCommand 
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { SSMClient, GetParameterCommand, GetParametersByPathCommand } from "@aws-sdk/client-ssm";
import { 
  CloudWatchLogsClient, 
  PutLogEventsCommand,
  CreateLogStreamCommand,
  DescribeLogStreamsCommand
} from "@aws-sdk/client-cloudwatch-logs";
import { 
  CognitoIdentityProviderClient, 
  GetUserCommand,
  AdminGetUserCommand
} from "@aws-sdk/client-cognito-identity-provider";

// AWS Configuration
const AWS_REGION = process.env.AWS_REGION || "us-east-1";

// ============================================
// 4️⃣ AMAZON S3 - Image Storage
// ============================================
const s3Client = new S3Client({ region: AWS_REGION });

export interface S3UploadResult {
  key: string;
  url: string;
  bucket: string;
}

/**
 * Upload a file to S3
 * @param file - File buffer
 * @param key - S3 object key (path/filename)
 * @param contentType - MIME type of the file
 */
export const uploadToS3 = async (
  file: Buffer,
  key: string,
  contentType: string = "image/png"
): Promise<S3UploadResult> => {
  const bucket = process.env.S3_BUCKET_NAME!;
  
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: file,
    ContentType: contentType,
  });
  
  await s3Client.send(command);
  
  return {
    key,
    bucket,
    url: getS3Url(key),
  };
};

/**
 * Get public S3 URL for an object
 */
export const getS3Url = (key: string): string => {
  const bucket = process.env.S3_BUCKET_NAME;
  const region = AWS_REGION;
  
  // If CloudFront is configured, use CloudFront URL
  if (process.env.CLOUDFRONT_DOMAIN) {
    return `https://${process.env.CLOUDFRONT_DOMAIN}/${key}`;
  }
  
  // Otherwise use S3 URL
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
};

/**
 * Generate a presigned URL for secure upload
 * @param key - S3 object key
 * @param expiresIn - URL expiration in seconds (default 1 hour)
 */
export const getPresignedUploadUrl = async (
  key: string,
  expiresIn: number = 3600
): Promise<string> => {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
  });
  
  return getSignedUrl(s3Client, command, { expiresIn });
};

/**
 * Delete an object from S3
 */
export const deleteFromS3 = async (key: string): Promise<void> => {
  const command = new DeleteObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
  });
  
  await s3Client.send(command);
};

// ============================================
// 9️⃣ AMAZON SNS - Notifications
// ============================================
const snsClient = new SNSClient({ region: AWS_REGION });

export type NotificationType = "stock_alert" | "system_error" | "order_notification";

/**
 * Send a notification via SNS
 * @param type - Type of notification
 * @param subject - Email subject
 * @param message - Message body
 */
export const sendNotification = async (
  type: NotificationType,
  subject: string,
  message: string
): Promise<void> => {
  const topicArns: Record<NotificationType, string | undefined> = {
    stock_alert: process.env.SNS_STOCK_ALERTS_TOPIC_ARN,
    system_error: process.env.SNS_SYSTEM_ALERTS_TOPIC_ARN,
    order_notification: process.env.SNS_ORDER_NOTIFICATIONS_TOPIC_ARN,
  };
  
  const topicArn = topicArns[type];
  
  if (!topicArn) {
    console.warn(`SNS topic ARN not configured for type: ${type}`);
    return;
  }
  
  const command = new PublishCommand({
    TopicArn: topicArn,
    Subject: subject,
    Message: message,
  });
  
  await snsClient.send(command);
};

/**
 * Send a low stock alert
 */
export const sendStockAlert = async (
  productName: string,
  currentStock: number,
  threshold: number = 10
): Promise<void> => {
  await sendNotification(
    "stock_alert",
    `🚨 Low Stock Alert: ${productName}`,
    `Warning: ${productName} has only ${currentStock} units left in stock.\n\n` +
    `Threshold: ${threshold} units\n` +
    `Action Required: Please reorder soon to avoid stockouts.\n\n` +
    `---\nStockPilot Inventory Management`
  );
};

/**
 * Send a system error alert
 */
export const sendSystemAlert = async (
  errorType: string,
  errorMessage: string,
  additionalInfo?: string
): Promise<void> => {
  await sendNotification(
    "system_error",
    `⚠️ System Alert: ${errorType}`,
    `Error Type: ${errorType}\n` +
    `Message: ${errorMessage}\n` +
    `Timestamp: ${new Date().toISOString()}\n` +
    (additionalInfo ? `\nAdditional Info:\n${additionalInfo}` : "") +
    `\n\n---\nStockPilot System Monitoring`
  );
};

// ============================================
// 8️⃣ AWS SYSTEMS MANAGER PARAMETER STORE
// ============================================
const ssmClient = new SSMClient({ region: AWS_REGION });

/**
 * Get a single parameter from Parameter Store
 * @param name - Full parameter name (e.g., /stockpilot/production/db/url)
 * @param withDecryption - Decrypt SecureString parameters
 */
export const getParameter = async (
  name: string,
  withDecryption: boolean = true
): Promise<string | undefined> => {
  try {
    const command = new GetParameterCommand({
      Name: name,
      WithDecryption: withDecryption,
    });
    
    const response = await ssmClient.send(command);
    return response.Parameter?.Value;
  } catch (error) {
    console.error(`Failed to get parameter ${name}:`, error);
    return undefined;
  }
};

/**
 * Get multiple parameters by path prefix
 * @param path - Path prefix (e.g., /stockpilot/production/)
 */
export const getParametersByPath = async (
  path: string
): Promise<Record<string, string>> => {
  try {
    const command = new GetParametersByPathCommand({
      Path: path,
      WithDecryption: true,
      Recursive: true,
    });
    
    const response = await ssmClient.send(command);
    const params: Record<string, string> = {};
    
    response.Parameters?.forEach((param) => {
      if (param.Name && param.Value) {
        // Extract the key from the full path
        const key = param.Name.replace(path, "").replace(/^\//, "");
        params[key] = param.Value;
      }
    });
    
    return params;
  } catch (error) {
    console.error(`Failed to get parameters by path ${path}:`, error);
    return {};
  }
};

/**
 * Load all StockPilot configuration from Parameter Store
 */
export const loadConfig = async (): Promise<Record<string, string>> => {
  const environment = process.env.NODE_ENV === "production" ? "production" : "development";
  return getParametersByPath(`/stockpilot/${environment}/`);
};

// ============================================
// 7️⃣ AMAZON CLOUDWATCH - Logging
// ============================================
const cloudWatchLogsClient = new CloudWatchLogsClient({ region: AWS_REGION });

let sequenceToken: string | undefined;

/**
 * Initialize CloudWatch log stream for this instance
 */
export const initializeCloudWatchLogs = async (): Promise<void> => {
  const logGroupName = process.env.CLOUDWATCH_LOG_GROUP || "/stockpilot/backend";
  const instanceId = process.env.EC2_INSTANCE_ID || `local-${Date.now()}`;
  
  try {
    // Create log stream for this instance
    const createCommand = new CreateLogStreamCommand({
      logGroupName,
      logStreamName: instanceId,
    });
    
    await cloudWatchLogsClient.send(createCommand);
  } catch (error: any) {
    // Stream might already exist
    if (error.name !== "ResourceAlreadyExistsException") {
      console.error("Failed to create CloudWatch log stream:", error);
    }
  }
};

export type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG";

/**
 * Send log event to CloudWatch
 */
export const logToCloudWatch = async (
  level: LogLevel,
  message: string,
  metadata?: Record<string, any>
): Promise<void> => {
  const logGroupName = process.env.CLOUDWATCH_LOG_GROUP || "/stockpilot/backend";
  const instanceId = process.env.EC2_INSTANCE_ID || `local-${Date.now()}`;
  
  try {
    const logEvent = {
      timestamp: Date.now(),
      message: JSON.stringify({
        level,
        message,
        metadata,
        timestamp: new Date().toISOString(),
      }),
    };
    
    const command = new PutLogEventsCommand({
      logGroupName,
      logStreamName: instanceId,
      logEvents: [logEvent],
      sequenceToken,
    });
    
    const response = await cloudWatchLogsClient.send(command);
    sequenceToken = response.nextSequenceToken;
  } catch (error) {
    // Fall back to console logging
    console.error("CloudWatch logging failed:", error);
    console.log(`[${level}] ${message}`, metadata);
  }
};

/**
 * Convenience logging functions
 */
export const logger = {
  info: (message: string, metadata?: Record<string, any>) => 
    logToCloudWatch("INFO", message, metadata),
  warn: (message: string, metadata?: Record<string, any>) => 
    logToCloudWatch("WARN", message, metadata),
  error: (message: string, metadata?: Record<string, any>) => 
    logToCloudWatch("ERROR", message, metadata),
  debug: (message: string, metadata?: Record<string, any>) => 
    logToCloudWatch("DEBUG", message, metadata),
};

// ============================================
// 6️⃣ AMAZON COGNITO - Authentication
// ============================================
const cognitoClient = new CognitoIdentityProviderClient({ region: AWS_REGION });

export interface CognitoUser {
  username: string;
  email?: string;
  emailVerified: boolean;
  attributes: Record<string, string>;
}

/**
 * Validate a Cognito access token and get user info
 * @param accessToken - JWT access token from Cognito
 */
export const validateCognitoToken = async (
  accessToken: string
): Promise<CognitoUser | null> => {
  try {
    const command = new GetUserCommand({
      AccessToken: accessToken,
    });
    
    const response = await cognitoClient.send(command);
    
    const attributes: Record<string, string> = {};
    response.UserAttributes?.forEach((attr) => {
      if (attr.Name && attr.Value) {
        attributes[attr.Name] = attr.Value;
      }
    });
    
    return {
      username: response.Username || "",
      email: attributes.email,
      emailVerified: attributes.email_verified === "true",
      attributes,
    };
  } catch (error) {
    console.error("Cognito token validation failed:", error);
    return null;
  }
};

/**
 * Get user details by username (admin operation)
 */
export const getCognitoUser = async (
  username: string
): Promise<CognitoUser | null> => {
  try {
    const command = new AdminGetUserCommand({
      UserPoolId: process.env.COGNITO_USER_POOL_ID!,
      Username: username,
    });
    
    const response = await cognitoClient.send(command);
    
    const attributes: Record<string, string> = {};
    response.UserAttributes?.forEach((attr) => {
      if (attr.Name && attr.Value) {
        attributes[attr.Name] = attr.Value;
      }
    });
    
    return {
      username: response.Username || "",
      email: attributes.email,
      emailVerified: attributes.email_verified === "true",
      attributes,
    };
  } catch (error) {
    console.error("Failed to get Cognito user:", error);
    return null;
  }
};

// ============================================
// MIDDLEWARE FOR EXPRESS
// ============================================

/**
 * Express middleware to validate Cognito JWT tokens
 * Use this to protect API routes
 */
export const cognitoAuthMiddleware = async (
  req: any,
  res: any,
  next: any
): Promise<void> => {
  // Skip auth in development if not configured
  if (!process.env.COGNITO_USER_POOL_ID) {
    return next();
  }
  
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }
  
  const token = authHeader.substring(7);
  const user = await validateCognitoToken(token);
  
  if (!user) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
  
  req.cognitoUser = user;
  next();
};

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all AWS services
 * Call this when the server starts
 */
export const initializeAWSServices = async (): Promise<void> => {
  console.log("🚀 Initializing AWS Services...");
  
  // Initialize CloudWatch logging
  if (process.env.CLOUDWATCH_LOG_GROUP) {
    await initializeCloudWatchLogs();
    console.log("✅ CloudWatch Logs initialized");
  }
  
  // Load configuration from Parameter Store
  if (process.env.USE_PARAMETER_STORE === "true") {
    const config = await loadConfig();
    console.log(`✅ Loaded ${Object.keys(config).length} parameters from Parameter Store`);
  }
  
  console.log("✅ AWS Services initialization complete");
};

// Export all clients for advanced usage
export {
  s3Client,
  snsClient,
  ssmClient,
  cloudWatchLogsClient,
  cognitoClient,
};
