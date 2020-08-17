resource "aws_key_pair" "r1_class" {
  key_name   = "r1_class-key"
  public_key = "${file("~/.ssh/id_rsa.pub")}"
}