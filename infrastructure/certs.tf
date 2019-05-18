provider "aws" {
  region = "us-east-1"
  alias  = "certs"
}

module "cert_kyeotic" {
  source = "github.com/azavea/terraform-aws-acm-certificate?ref=1.1.0"

  providers = {
    aws.acm_account     = "aws.certs"
    aws.route53_account = "aws"
  }

  domain_name               = "${local.site_name}"
  hosted_zone_id            = "${data.aws_route53_zone.kyeotic_com.zone_id}"
  validation_record_ttl     = "60"
}
