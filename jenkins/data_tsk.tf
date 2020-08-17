
data "aws_ami" "centos" {
  most_recent = true
  owners      = ["125523088429"]

  filter {
    name   = "state"
    values = ["available"]
  }

  filter {
    name   = "name"
    values = ["CentOS 7.8.2003 x86_64"]
  }
}


output "centos" {
  value = "${data.aws_ami.centos.id}"
}
