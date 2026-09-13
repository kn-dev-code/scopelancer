output "s3_bucket_name" {
  description = "Name of the S3 bucket"
  value       = aws_s3_bucket.file_storage.id
}

output "s3_bucket_arn" {
  description = "ARN of the S3 bucket"
  value       = aws_s3_bucket.file_storage.arn
}

output "s3_bucket_region" {
  description = "Region of the S3 bucket"
  value       = aws_s3_bucket.file_storage.region
}