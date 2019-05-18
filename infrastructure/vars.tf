variable "region" {
  default = "us-west-2"
}

data "aws_caller_identity" "current" {}

provider "aws" {
  region = "${var.region}"
}

terraform {
  backend "s3" {
    bucket               = "tyrsius-terraform-state"
    key                  = "kyeotic-animate"
    workspace_key_prefix = "kyeotic-animate"
    region               = "us-west-2"
  }
}

locals {
  site_name = "k.kyeotic.com"
}
