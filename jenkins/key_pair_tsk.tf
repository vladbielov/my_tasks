resource "aws_key_pair" "jenkins_class" {
  key_name   = "jenkins_class-key"
  public_key = "${file("~/.ssh/id_rsa.pub")}"
}