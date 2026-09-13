# Building engine settings for terraform
terraform {
  required_version = ">= 1.16.2"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.64.0"
    }
  }
}

# AWS variables


# 1. Creating the S3 bucket
resource "aws_s3_bucket" "file_storage" {
  bucket = var.s3_bucket

  tags = {
    Name : "Scopelancer Session Storage"
    Environment : var.environment
    ManagedBy = "Terraform"
  }
}

# 2. Blocking all public access
resource "aws_s3_bucket_public_access_block" "file_storage_block" {
  bucket = aws_s3_bucket.file_storage.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# 3. Configuring CORS
resource "aws_s3_bucket_cors_configuration" "file_storage_cors" {
  bucket = aws_s3_bucket.file_storage.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST"]
    allowed_origins = ["http://localhost:3000", "https://yourdomain.com"]
    max_age_seconds = 3000
  }
}

# 4. AWS region provider
provider "aws" {
    region = var.aws_region
}