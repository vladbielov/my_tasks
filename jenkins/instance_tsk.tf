resource "aws_instance" "web_jenkins" {
  ami           = "${data.aws_ami.centos.id}" 
  instance_type = "t2.micro"
  key_name  = "${aws_key_pair.jenkins_class.key_name}"
  vpc_security_group_ids = ["${aws_security_group.jenkins_s_group.id}"]
}