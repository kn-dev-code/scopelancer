
# VARIABLES 

variable "s3_bucket" {
  type        = string
  description = "S3 bucket for files"
  default     = "scopelancer-dev-audio-uploads"
}

variable "environment" {
  type        = string
  description = "Deployment environment (dev, staging, prod)"
  default     = "dev"
}
variable "aws_region" {
  type        = string
  description = "AWS region for provisioning resources"
  default     = "us-east-1"
}