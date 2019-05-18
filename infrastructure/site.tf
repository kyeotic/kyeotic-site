data "aws_route53_zone" "kyeotic_com" {
  name = "kyeotic.com."
}

resource "aws_route53_record" "site" {
  name    = "${local.site_name}"
  zone_id = "${data.aws_route53_zone.kyeotic_com.zone_id}"
  type    = "A"

  alias {
    name                   = "${module.site.cloudfront_domain}"
    zone_id                = "${module.site.cloudfront_hosted_zone_id}"
    evaluate_target_health = false
  }
}

module "site" {
  source    = "github.com/kyeotic/terraform-s3-cloudfront-site?ref=1.0.0"
  site_name = "${local.site_name}"
  cert_arn  = "${module.cert_kyeotic.arn}"
}

