resource "aws_instance" "db" {
  ami           = "${data.aws_ami.centos.id}" 
  instance_type = "t2.micro"
  key_name  = "${aws_key_pair.class.key_name}"
  vpc_security_group_ids = ["${aws_security_group.provisioner_db.id}"]
  user_data     = "${file("userdata_db.sh")}"
  availability_zone = "${aws_subnet.public2.id}"
}
