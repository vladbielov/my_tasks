# resource "aws_route53_record" "www3" {
#   zone_id = "Z06200681BUTUUNUEE4C5"
#   name    = "jenkins.tridentfe.com"
#   type    = "A"
#   ttl     = "30"
#   records = ["${aws_instance.web_jenkins.public_ip}"]
# }