resource "aws_key_pair" "nagios_class" {
  key_name   = "nagios_class-key"
  public_key = "${file("~/.ssh/id_rsa.pub")}"
}